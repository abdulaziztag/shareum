import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';
import { ITab } from '@/interfaces/ITab';
import { HomeScreen, ProfileScreen, ScanScreen } from '@/screens/_index';

const Tab = createBottomTabNavigator();

const Tabs: ITab[] = [
  {
    name: 'home',
    component: HomeScreen,
    iconName: 'home',
    iconNameOutlined: 'home-outline',
  },
  {
    name: 'scan',
    component: ScanScreen,
    iconName: 'qr-code',
    iconNameOutlined: 'qr-code-outline',
  },
  {
    name: 'profile',
    component: ProfileScreen,
    iconName: 'person',
    iconNameOutlined: 'person-outline',
  },
];

SplashScreen.preventAutoHideAsync().then();

export default () => {
  const activeTheme = useActiveTheme();

  const TabBarIcon = ({ focused, tab }: { focused: boolean; tab: ITab }) => {
    const textAnimationValue = useSharedValue(0);
    const iconAnimationValue = useSharedValue(25);

    useEffect(() => {
      textAnimationValue.value = focused ? 1 : 0;
      iconAnimationValue.value = focused ? 10 : 25;
    }, [focused]);

    const config = {
      duration: 250,
    };

    const animatedIconStyle = useAnimatedStyle(() => {
      return {
        marginTop: withTiming(iconAnimationValue.value, config),
      };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(textAnimationValue.value, config),
      };
    });

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Animated.View style={animatedIconStyle}>
          <Ionicons
            name={focused ? tab.iconName : tab.iconNameOutlined}
            size={25}
            color={activeTheme.textPrimary}
          />
        </Animated.View>
        <Animated.View style={animatedTextStyle}>
          <AppText translatable>{tab.name}</AppText>
        </Animated.View>
      </View>
    );
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}
        sceneContainerStyle={{
          backgroundColor: activeTheme.backgroundPrimary,
        }}>
        {Tabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} tab={tab} />,
              tabBarShowLabel: false,
              tabBarItemStyle: {},
              tabBarStyle: {
                height: '10%',
                borderTopWidth: 0,
                backgroundColor: activeTheme.backgroundSecondary,
              },
              unmountOnBlur: tab.name === 'scan',
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};
