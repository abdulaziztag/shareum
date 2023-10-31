import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/store';
import {setTokens} from '@/store/features/authSlice';
import {changeError, changeIsLoggedIn} from '@/store/features/utilsSlice';
import {deleteTokens, getTokens} from '@/helpers/tokens';
import {setTokens as ff} from '@/helpers/tokens'

export const BASE_URL = 'http://167.99.240.68:1337/'

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	prepareHeaders: async (headers, {getState}) => {
		const tokens = await getTokens()
		if (tokens.access) {
			headers.set('Authorization', `Bearer ${tokens.access}`)
		}
		return headers
	}
})

const baseQueryWithReAuth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)
	//console.log(JSON.stringify(result))
	if	(result.error) {
		//api.dispatch(changeError('WTF!!!'))
	}
	if (result.error && result.error.status === 401) {
		api.dispatch(changeIsLoggedIn(false))
		await deleteTokens()
		api.dispatch(changeError('Unauthorized please login again'))
		// try to get a new token
		const refreshResult = await baseQuery('/api/token/refresh/', api, extraOptions)
		if (refreshResult.data) {
			// store the new token
			api.dispatch(setTokens(refreshResult.data))
			await ff(refreshResult.data?.access, refreshResult.data.refresh)
			// retry the initial query
			result = await baseQuery(args, api, extraOptions)
		} else {
			await deleteTokens()
			api.dispatch(changeIsLoggedIn(false))
		}
	}
	return result
}
export const api = createApi({
	baseQuery: baseQueryWithReAuth,
	tagTypes: ['Balance', 'Crypto', 'PromoCode', 'QrCode'],
	endpoints: () => ({})
})