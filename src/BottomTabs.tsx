import {FlatList, Platform, SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import Animated, {
	FadeInRight, FadeOutRight, Layout,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import {Ionicons} from '@expo/vector-icons'

import {ITab} from '@/interfaces/ITab';

import {useActiveColor} from '@/hooks/useActiveColor';

import ScanScreen from '@/screens/ScanScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import HomeScreen from '@/screens/HomeScreen';
import {AppText} from '@/components/AppText';

const Tab = createBottomTabNavigator();

const Tabs: Array<ITab> = [
	{
		name: 'Home',
		component: HomeScreen,
		iconName: 'md-home',
		iconNameOutlined: 'md-home-outline'
	},
	{
		name: 'Scan',
		component: ScanScreen,
		iconName: 'md-qr-code',
		iconNameOutlined: 'md-qr-code-outline'
	},
	{
		name: 'Profile',
		component: ProfileScreen,
		iconName: 'md-person',
		iconNameOutlined: 'md-person-outline'
	}
]

SplashScreen.preventAutoHideAsync()

export default () => {
	const activeTheme = useActiveColor()

	const tabBarIcon = ({focused, tab}) => (
		<>
			<Ionicons name={focused ? tab.iconName : tab.iconNameOutlined} size={25}
								color={activeTheme.textPrimary} />
			{focused && <AppText>{tab.name}</AppText>}
		</>)

	return (
		<>
			<Tab.Navigator
				initialRouteName="home"
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor: activeTheme.backgroundSecondary,
						height: '10%',
						paddingTop: Platform.OS === 'ios' ? 15 : 0,
						borderTopWidth: 0,
					}
				}}
				sceneContainerStyle={{
					backgroundColor: activeTheme.backgroundPrimary
				}}
			>
				{
					Tabs.map((tab) => (
						<Tab.Screen
							key={tab.name}
							name={tab.name}
							component={tab.component}
							options={{
								tabBarIcon: ({focused}) => tabBarIcon({focused, tab}),
								tabBarShowLabel: false,
								unmountOnBlur: tab.name === 'Scan'
							}}
						/>
					))
				}
			</Tab.Navigator>
		</>
	)
}