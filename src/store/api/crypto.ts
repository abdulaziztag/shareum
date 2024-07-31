import { ICryptoWithNetwork } from '@/interfaces/_index';
import { api } from '@/store/api/api';

export const cryptoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCryptoList: build.query<ICryptoWithNetwork[], void>({
      query: () => '/common/crypto-network/',
      extraOptions: {
        retry: 2,
      },
      providesTags: ['Crypto'],
    }),
  }),
});

export const { useGetCryptoListQuery } = cryptoApi;
