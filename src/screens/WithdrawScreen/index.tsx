import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton, AppInput, AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';

export const WithdrawScreen = () => {
  const activeTheme = useActiveTheme();

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={{ backgroundColor: activeTheme.backgroundPrimary, flex: 1 }}>
      <ScrollView style={{ paddingTop: 10 }}>
        <AppText style={{ fontSize: 28, paddingHorizontal: 10 }}>Send BTC</AppText>
        <AppText style={{ fontSize: 18, paddingHorizontal: 10 }} secondary>
          Send BTC to crypto address
        </AppText>
        <AppInput
          name="Address"
          label="Address/Invoice"
          placeholder="Long press to paste"
          containerStyles={{ marginHorizontal: 10, marginTop: 20 }}
        />
        <AppInput
          name="Network"
          disabled
          label="Network"
          placeholder="BNB"
          appendText={
            <Ionicons name="chevron-forward" size={22} color={activeTheme.textSecondary} />
          }
          containerStyles={{ marginHorizontal: 10, marginTop: 20 }}
        />
        <AppInput
          name="Amount"
          label="Amount"
          type="numeric"
          containerStyles={{ marginHorizontal: 10, marginTop: 20 }}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          borderTopWidth: 2,
          borderTopColor: activeTheme.backgroundSecondary,
          paddingTop: 10,
        }}>
        <AppText style={{ flex: 0.7 }}>SMTH</AppText>
        <AppButton title="Send" onClick={() => {}} btnStyles={{ flex: 0.3 }} />
      </View>
    </SafeAreaView>
  );
};
