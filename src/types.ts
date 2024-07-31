export type RootStackType = {
  Login: undefined;
  Registration: undefined;
  Main: undefined;
  Withdraw: undefined;
  Deposit: undefined;
  ChooseCoin: {
    nextScreen: string;
    codeType?: string;
  };
  CodesList: undefined;
  CreateCode: {
    chosenCrypto: string;
    codeType: string;
  };
  Regions: undefined;
  QrCodeDetails: {
    codeId: string;
  };
  PromoCodeDetails: {
    codeId: string;
  };
};
