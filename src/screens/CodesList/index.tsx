import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddQrButton } from './Partials/AddQrButton';
import { PromoCodesList } from './Partials/PromoCodesList';
import { QrCodesList } from './Partials/QrCodesList';

import { useActiveTheme } from '@/hooks/_index';

const Tab = createMaterialTopTabNavigator();

export const CodesList = () => {
  const activeTheme = useActiveTheme();

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{
        flex: 1,
        backgroundColor: activeTheme.backgroundPrimary,
      }}>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: activeTheme.backgroundPrimary,
        }}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
          },
          tabBarLabelStyle: {
            color: activeTheme.textPrimary,
          },
          tabBarIndicatorStyle: {
            backgroundColor: activeTheme.textPrimary,
          },
        }}>
        <Tab.Screen name="QR" component={QrCodesList} />
        <Tab.Screen name="PromoCodes" component={PromoCodesList} />
      </Tab.Navigator>
      <AddQrButton />
    </SafeAreaView>
  );
};
