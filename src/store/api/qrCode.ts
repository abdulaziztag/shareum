import {api} from '@/store/api/api';
import {IListQrCode, IQRCode, IQrCodeForm} from '@/interfaces/IQRCode';

export const qrCodeApi = api.injectEndpoints({
	endpoints: (build) => ({
		getQrCodesList: build.query<IListQrCode[], void>({
			query: () => 'qr/myqr/',
			extraOptions: {
				retry: 2
			},
			providesTags: ['QrCode']
		}),
		createQrCode: build.mutation<IQRCode, FormData>({
			query: (qrCodeForm: FormData) => {
				return {
					url: 'qr/create/',
					method: 'POST',
					body: qrCodeForm,
					headers: {
						'Content-Type': 'multipart/form-data;',
					}
				}
			},
			invalidatesTags: ['QrCode', 'Balance']
		}),
		getQrById: build.query<IQRCode, { codeId: string }>({
			query: ({codeId}) => `qr/myqr/${codeId}/`,
			extraOptions: {
				retry: 2
			}
		}),
		getQrPrize: build.mutation<{per_user: number, description:string, crypto_slug: string}, { code: string }>({
			query: ({code}) => ({
				url: `qr/scan/${code}/`,
				method: 'GET'
			})
		}),
		changeQrStatus: build.mutation<{ status: 'a' | 'p' }, { codeId: number }>({
			query: ({codeId}) =>({
				url: `qr/myqr/${codeId}/`,
				method: 'PATCH'
			})
		}),
		qrStatistics: build.query<any, {codeId: string, start_date: string, end_date: string}>({
			query: ({codeId, start_date, end_date}) => ({
				url: `qr/myqr/${codeId}/statistics/`,
				params: {
					start_date,
					end_date
				}
			})
		})
	}),
	overrideExisting: true
})

export const {
	useGetQrCodesListQuery,
	useCreateQrCodeMutation,
	useGetQrByIdQuery,
	useGetQrPrizeMutation,
	useChangeQrStatusMutation,
	useQrStatisticsQuery
} = qrCodeApi