import { AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { ScrollView, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { AppButton, AppInput, AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';
import { useDepositQuery } from '@/store/api/balance';

export const DepositScreen = () => {
  const activeTheme = useActiveTheme();
  const { data, isLoading, error, isError } = useDepositQuery();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data?.address || 'Error occured');
    Toast.show({
      type: 'success',
      text1: 'Copied!',
    });
  };

  if (isError) {
    return (
      <View style={{ flex: 1, backgroundColor: activeTheme.backgroundPrimary }}>
        <AppText style={{ fontSize: 28, alignSelf: 'center' }}>An error occurred!</AppText>
      </View>
    );
  }

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={{ backgroundColor: activeTheme.backgroundPrimary, flex: 1 }}>
      {isLoading && !data ? (
        <AppText>Loading</AppText>
      ) : (
        <ScrollView style={{ paddingTop: 10, marginHorizontal: 10 }}>
          <View
            style={{
              alignSelf: 'center',
              borderRadius: 10,
              marginTop: 10,
              overflow: 'hidden',
              borderColor: 'red',
            }}>
            <QRCode value={data?.address} size={190} quietZone={5} />
          </View>
          <AppText secondary style={{ marginVertical: 10 }}>
            <AntDesign name="infocirlce" /> Scan QR above or click the button below to copy your
            address
          </AppText>
          <AppText style={{ color: activeTheme.warning, marginBottom: 20 }}>
            <AntDesign name="infocirlce" /> Currently, we support the BNB chain Testnet only.
          </AppText>
          <AppInput
            name="address"
            disabled
            label="Your address"
            value={data?.address}
            clearButton={false}
            isTextArea
          />
          <AppButton title="Click to copy" onClick={copyToClipboard} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
