import { ICryptoWithNetwork } from '@/interfaces/ICrypto';

export interface IListPromoCode {
  id: number;
  name: string;
  balance: number;
  current_balance: number;
  per_user: number;
  status: 'a' | 'd';
  crypto_network: ICryptoWithNetwork;
}

export interface IPromoCode extends IListPromoCode {
  description?: string;
  image_url?: string;
  created: string;
  updated: string;
  keyword: number;
  activated: number;
}

export interface IPromoCodeForm {
  balance: string;
  per_user: string;
  crypto_network: number;
  name: string;
  description: string;
  keyword: string;
}
