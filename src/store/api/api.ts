import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { deleteTokens, getTokens, setTokens } from '@/helpers/_index';
import { setTokensAction } from '@/store/features/authSlice';
import { changeIsLoggedIn } from '@/store/features/utilsSlice';

export const BASE_URL = 'http://158.160.86.200:1337/';

const reservedHost: string = 'https://change.swttoken.com/kenai/host/';

type RefreshResponse = {
  access: string;
  refresh: string;
};

type BaseQueryResult<T> = {
  data?: T;
  error?: FetchBaseQueryError;
};

const fetchReservedHost = async () => {
  try {
    const response = await fetch(reservedHost);
    const data = await response.json();
    return data.name2; // Assuming the response contains the new host URL in the 'name2' property
  } catch (error) {
    console.error('Failed to fetch reserved host:', error);
    return null;
  }
};

const createBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, { getState }) => {
      const tokens = await getTokens();
      if (tokens.access) {
        headers.set('Authorization', `Bearer ${tokens.access}`);
      }
      return headers;
    },
  });

let currentBaseQuery = createBaseQuery(BASE_URL);

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await currentBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 'FETCH_ERROR') {
    const newHost = await fetchReservedHost();
    if (newHost) {
      currentBaseQuery = createBaseQuery(newHost); // Update the base query with the new base URL
      result = await currentBaseQuery(args, api, extraOptions);
    }
  }

  if (result.error && result.error.status === 401) {
    const { refresh } = await getTokens();
    const refreshResult = (await currentBaseQuery(
      {
        url: '/api/token/refresh/',
        method: 'POST',
        body: {
          refresh,
        },
      },
      api,
      extraOptions
    )) as BaseQueryResult<RefreshResponse>;

    if (refreshResult.data) {
      api.dispatch(setTokensAction(refreshResult.data));
      await setTokens(refreshResult.data.access, refresh as string);
      result = await currentBaseQuery(args, api, extraOptions);
    } else {
      await deleteTokens();
      api.dispatch(changeIsLoggedIn(false));
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Balance', 'Crypto', 'PromoCode', 'QrCode'],
  endpoints: () => ({}),
});
