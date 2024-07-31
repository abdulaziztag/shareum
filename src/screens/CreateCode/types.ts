export type CreateFormTypes = {
  totalAmount: string;
  perScanAmount: string;
  name: string;
  description: string;
};

export type PromoCreateFormTypes = CreateFormTypes & {
  keyword: string;
};
