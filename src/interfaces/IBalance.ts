import {ICryptoWithNetwork} from '@/interfaces/ICrypto';

export interface IBalance extends ICryptoWithNetwork {
	total: number
	available: number
}