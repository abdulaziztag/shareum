import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';

import BottomTabs from '@/BottomTabs';
import { getTokens } from '@/helpers/_index';
import { useActiveTheme, useAppDispatch, useAppSelector, useCustomFonts } from '@/hooks/_index';
import {
  ChooseCoinScreen,
  CodesList,
  CreateCode,
  DepositScreen,
  LoginScreen,
  PromoDetails,
  QrDetails,
  RegionsScreen,
  RegistrationScreen,
  WithdrawScreen,
} from '@/screens/_index';
import { setTokensAction } from '@/store/features/authSlice';
import { changeIsLoggedIn } from '@/store/features/utilsSlice';
import { RootStackType } from '@/types';

const Stack = createNativeStackNavigator<RootStackType>();
const navigationRef = createNavigationContainerRef<NavigationContainerProps>();
SplashScreen.preventAutoHideAsync();

export default () => {
  const theme = useColorScheme();
  const [fontsLoaded] = useCustomFonts();
  const activeTheme = useActiveTheme();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.utils.isLoggedIn);
  const { t } = useTranslation();

  useEffect(() => {
    const checkAndInitialize = async () => {
      await checkTokens();
      if (fontsLoaded && typeof isLoggedIn === 'boolean') {
        await SplashScreen.hideAsync();
      }
    };

    checkAndInitialize();
  }, [fontsLoaded, isLoggedIn]);

  const checkTokens = async () => {
    const tokens = await getTokens();
    if (tokens.refresh) {
      dispatch(setTokensAction(tokens));
      dispatch(changeIsLoggedIn(true));
    } else {
      dispatch(changeIsLoggedIn(false));
    }
  };

  if (!fontsLoaded || typeof isLoggedIn !== 'boolean') {
    return null;
  }

  const defaultScreenOptions = {
    headerStyle: {
      backgroundColor: activeTheme.backgroundSecondary,
    },
    headerTintColor: activeTheme.textPrimary,
    headerBackTitle: t('back'),
    headerBackTitleStyle: {
      fontFamily: 'Poppins_600SemiBold',
    },
    headerTitleStyle: {
      fontFamily: 'Poppins_600SemiBold',
    },
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={activeTheme.backgroundPrimary}
      />
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: activeTheme.backgroundPrimary },
              }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="Withdraw"
              component={WithdrawScreen}
              options={defaultScreenOptions}
            />
            <Stack.Screen name="Deposit" component={DepositScreen} options={defaultScreenOptions} />
            <Stack.Screen
              name="CodesList"
              component={CodesList}
              options={{ headerTitle: t('createdCodes'), ...defaultScreenOptions }}
            />
            <Stack.Screen
              name="ChooseCoin"
              component={ChooseCoinScreen}
              options={{
                headerTitle: 'Choose coin',
                ...defaultScreenOptions,
              }}
            />
            <Stack.Screen
              name="QrCodeDetails"
              component={QrDetails}
              options={{
                headerTitle: 'QR Details',
                ...defaultScreenOptions,
              }}
            />
            <Stack.Screen
              name="PromoCodeDetails"
              component={PromoDetails}
              options={{
                headerTitle: 'Promo Details',
                ...defaultScreenOptions,
              }}
            />
            <Stack.Screen
              name="CreateCode"
              component={CreateCode}
              options={{
                headerTitle: 'Create code',
                ...defaultScreenOptions,
              }}
            />
            <Stack.Screen
              name="Regions"
              component={RegionsScreen}
              options={{
                gestureEnabled: false,
                headerBackVisible: false,
                ...defaultScreenOptions,
              }}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};
