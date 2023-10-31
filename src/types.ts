export type RootStackType = {
	Login: undefined
	SignUp: undefined
	Main: undefined
	ChooseCoin: {
		codeType: string
	}
	QrList: undefined
	CreateCode: {
		chosenCrypto: string
		codeType: string
	}
	Regions: undefined
	QrCodeDetails: {
		codeId: string
	},
	PromoCodeDetails: {
		codeId: string
	}
}