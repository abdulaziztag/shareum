import { IBalance } from '@/interfaces/_index';
import { api } from '@/store/api/api';

export const balanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBalance: build.query<IBalance[], void>({
      query: () => '/balance/get/',
      extraOptions: {
        retry: 2,
      },
      providesTags: ['Balance'],
    }),
    deposit: build.query<{ address: string }, void>({
      /* TODO: 1 is hard coded, need to change to another network */
      query: () => '/wallet/get_address/1',
      extraOptions: {
        retry: 1,
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetBalanceQuery, useDepositQuery } = balanceApi;
