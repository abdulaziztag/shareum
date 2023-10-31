import {api} from '@/store/api/api';
import {ICryptoWithNetwork} from '@/interfaces/ICrypto';

export const cryptoApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCryptoList: build.query<ICryptoWithNetwork[], void>({
			query: () => '/common/crypto-network/',
			extraOptions: {
				retry: 2
			},
			providesTags: ['Crypto']
		})
	})
})

export const {useGetCryptoListQuery} = cryptoApi