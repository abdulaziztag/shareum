import { RouteProp, useRoute } from '@react-navigation/native';
import { Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';
import APIScreen from '@/screens/CreateCode/APIScreen';
import PromoScreen from '@/screens/CreateCode/PromoScreen';
import QrScreen from '@/screens/CreateCode/QrScreen';
import { RootStackType } from '@/types';

export const CreateCode = () => {
  const activeTheme = useActiveTheme();
  const { params } = useRoute<RouteProp<RootStackType>>();
  const codeType = params && 'codeType' in params && params.codeType;
  const chosenCrypto = (params && 'chosenCrypto' in params && +params.chosenCrypto) || 0;

  const defineScreen = () => {
    if (codeType === 'QR') {
      return <QrScreen chosenCryptoId={chosenCrypto} />;
    } else if (codeType === 'Promo') {
      return <PromoScreen chosenCryptoId={chosenCrypto} />;
    } else if (codeType === 'API') {
      return (
        <View>
          <AppText style={{ alignSelf: 'center', marginTop: 10, fontSize: 32 }}>
            Coming soon!
          </AppText>
        </View>
      );
    }
  };

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{
        backgroundColor: activeTheme.backgroundPrimary,
        flex: 1,
      }}>
      <ScrollView keyboardDismissMode="on-drag">{defineScreen()}</ScrollView>
    </SafeAreaView>
  );
};
