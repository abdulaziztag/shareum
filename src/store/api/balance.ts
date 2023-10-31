import {api} from '@/store/api/api';
import {IBalance} from '@/interfaces/IBalance';


export const balanceApi = api.injectEndpoints({
	endpoints: (build) => ({
		getBalance: build.query<IBalance[], void>({
			query: () => 'balance/get/',
			extraOptions: {
				retry: 2
			},
			providesTags: ['Balance']
		})
	})
})

export const {useGetBalanceQuery} = balanceApi