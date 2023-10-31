import {useActiveColor} from '@/hooks/useActiveColor';
import {AddQrButton} from '@/screens/QrListScreen/Partials/AddQrButton';
import {QrCodesList} from './Partials/QrCodesList';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {PromoCodesList} from '@/screens/QrListScreen/Partials/PromoCodesList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
const Tab = createMaterialTopTabNavigator();

export default () => {
	const activeTheme = useActiveColor()

	return (
		<SafeAreaView edges={['left', 'right']} style={{flex: 1, backgroundColor: activeTheme.backgroundPrimary, paddingTop: Platform.OS === 'android' ? 55: 0}}
		>
			<Tab.Navigator
				sceneContainerStyle={{
					backgroundColor: activeTheme.backgroundPrimary
				}}
				screenOptions={{
					tabBarStyle: {
						backgroundColor: activeTheme.backgroundSecondary
					},
					tabBarLabelStyle: {
						color: activeTheme.textPrimary
					},
					tabBarIndicatorStyle: {
						backgroundColor: activeTheme.textPrimary
					}
				}}
			>
				<Tab.Screen
					name="QRs"
					component={QrCodesList}
				/>
				<Tab.Screen
					name={'PromoCodes'}
					component={PromoCodesList}
				/>
			</Tab.Navigator>
			<AddQrButton/>
		</SafeAreaView>
	)
}