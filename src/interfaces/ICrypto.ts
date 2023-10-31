
export interface ICrypto {
	id: number
	name: string
	slug: string
	logo: string
	price: number
}

export interface INetwork {
	id: number
	name: string
	slug: string
}

export interface ICryptoWithNetwork {
	id: number
	crypto: ICrypto
	network: INetwork
}
