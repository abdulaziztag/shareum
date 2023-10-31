import {useCallback, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import {useActiveColor} from '@/hooks/useActiveColor';
import BottomTabs from '@/BottomTabs';
import ChooseCoinScreen from '@/screens/ChooseCoinScreen';
import RegionsScreen from '@/screens/RegionsScreen';
import LoginScreen from '@/screens/AuthScreens/LoginScreen';
import QrListScreen from '@/screens/QrListScreen';
import {navigationRef} from '@/utils/RootNavigation';
import {useCustomFonts} from '@/hooks/useCustomFonts';
import {RootStackType} from '@/types';
import SignUpScreen from '@/screens/AuthScreens/RegistrationScreen';
import {useAppDispatch, useAppSelector} from '@/hooks/storeHooks';
import {changeIsLoggedIn} from '@/store/features/utilsSlice';
import {getTokens} from '@/helpers/tokens';
import {setTokens} from '@/store/features/authSlice';
import Toast from 'react-native-toast-message';
import CreateCode from '@/screens/CreateCode';
import QrDetails from '@/screens/CodeDetails/QrDetails';
import PromoDetails from '@/screens/CodeDetails/PromoDetails';
import {StatusBar, useColorScheme} from 'react-native';

const Stack = createNativeStackNavigator<RootStackType>()

export default () => {
	const theme = useColorScheme()
	const activeTheme = useActiveColor()
	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector((state) => state.utils.isLoggedIn)

	const checkTokens = async () => {
		const tokens = await getTokens()
		if (tokens.refresh) {
			dispatch(setTokens(tokens))
			dispatch(changeIsLoggedIn(true))
		}
	}

	useEffect(() => {
		checkTokens().then()
	}, [])

	const defaultScreenOptions = {
		headerStyle: {
			backgroundColor: activeTheme.backgroundSecondary,
		},
		headerTintColor: activeTheme.textPrimary,
		headerBackTitle: 'Back',
		headerBackTitleStyle: {
			fontFamily: 'Poppins_600SemiBold',
		},
		headerTitleStyle: {
			fontFamily: 'Poppins_600SemiBold',
		}
	}

	const [fontsLoaded] = useCustomFonts()

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer
			onReady={onLayoutRootView}
			ref={navigationRef}
		>
			<StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={activeTheme.backgroundPrimary}/>
			<Stack.Navigator>
				{
					!isLoggedIn ?
						<>
							<Stack.Screen
								name="Login"
								component={LoginScreen}
								options={{headerShown: false}}
							/>
							<Stack.Screen
								name="SignUp"
								component={SignUpScreen}
								options={{headerShown: false}}
							/>
						</> :
						<>
							<Stack.Screen
								name="Main"
								component={BottomTabs}
								options={{headerShown: false}}
							/>
							<Stack.Screen
								name="ChooseCoin"
								component={ChooseCoinScreen}
								options={{
									headerTitle: 'Choose coin',
									...defaultScreenOptions
								}}
							/>
							<Stack.Screen
								name="QrCodeDetails"
								component={QrDetails}
								options={{
									headerTitle: 'QR Details',
									...defaultScreenOptions
								}}
							/>
							<Stack.Screen
								name="PromoCodeDetails"
								component={PromoDetails}
								options={{
									headerTitle: 'Promo Details',
									...defaultScreenOptions
								}}
							/>
							<Stack.Screen
								name="QrList"
								component={QrListScreen}
								options={{headerTitle: 'Created QR\'s', ...defaultScreenOptions}}
							/>
							<Stack.Screen
								name="CreateCode"
								component={CreateCode}
								options={{
									headerTitle: 'Create code',
									...defaultScreenOptions
								}}
							/>
							<Stack.Screen
								name="Regions"
								component={RegionsScreen}
								options={{
									gestureEnabled: false,
									headerBackVisible: false,
									...defaultScreenOptions
								}}
							/>
						</>
				}
			</Stack.Navigator>
			<Toast/>
		</NavigationContainer>
	);
};