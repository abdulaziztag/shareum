import {ICryptoWithNetwork} from '@/interfaces/ICrypto';

export interface IListQrCode {
	id: number
	code: number
	name: string
	balance: number
	current_balance: number
	per_user: number
	status: 'a' | 'd'
	crypto_network: ICryptoWithNetwork
}

export interface IQRCode extends IListQrCode{
	description?: string
	image_url?: string
	created: string
	updated: string
	scanned: number
}

export interface IQrCodeForm {
	balance: number
	per_user: number
	crypto_network: number
	countries: number[]
	name: string
	description?: string
}