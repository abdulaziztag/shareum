import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useActiveColor} from '@/hooks/useActiveColor';
import Animated, {
  FadeInRight, FadeOutRight, Layout,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import * as RootNavigation from '@/utils/RootNavigation';

export const AddQrButton = () => {
	const activeTheme = useActiveColor()
	const btnAnimateValue = useSharedValue<string>('0deg')
	const [pressed, setPressed] = useState(false)

	const config = {
		duration: 300,
	};

	useEffect(() => {
		if (pressed) {
			btnAnimateValue.value = '-135deg'
		} else {
			btnAnimateValue.value = '0deg'
		}
	}, [pressed])

	const btnAnimate = useAnimatedStyle(() => {
		return {
			transform: [{rotateZ: withTiming(btnAnimateValue.value, config)}],
		};
	});

	const styles = StyleSheet.create({
		button: {
			position: 'absolute',
			bottom: 30,
			right: 30,
			padding: 12,
			borderRadius: 100,
			backgroundColor: activeTheme.warning,
			justifyContent: 'center',
			alignItems: 'center',
		},
		list: {
			position: 'absolute',
			right: 30,
			bottom: 90,
			backgroundColor: activeTheme.backgroundPrimary,
			borderRadius: 10,
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowOpacity: 0.29,
			shadowRadius: 4.65,
			elevation: 7,
		},
		listItem: {
			paddingHorizontal:  20,
			paddingVertical: 10,
		},
		listText: {
			fontFamily: 'Poppins_400Regular',
			color: activeTheme.textPrimary,
			fontSize: 20,
		},
	})

	return (
		<>
			{pressed && <Animated.View
				entering={FadeInRight}
				layout={Layout.springify()}
				exiting={FadeOutRight}
				style={[styles.list]}
			>
				<TouchableOpacity
					style={[styles.listItem, {borderBottomWidth: 1, borderColor: activeTheme.backgroundSecondary}]}
					onPressOut={() => {
						setPressed(false)
						RootNavigation.navigate('ChooseCoin', {codeType: 'QR'})
					}}
				>
					<Text numberOfLines={1} style={styles.listText}>Qr Code</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.listItem, {borderBottomWidth: 1, borderColor: activeTheme.backgroundSecondary}]}
          onPressOut={() => {
						setPressed(false)
						RootNavigation.navigate('ChooseCoin', {codeType: 'Promo'})
					}}
				>
					<Text numberOfLines={1} style={styles.listText}>Promo Code</Text>
				</TouchableOpacity>
        <TouchableOpacity
          style={styles.listItem}
          onPressOut={() => {
						setPressed(false)
						RootNavigation.navigate('ChooseCoin', {codeType: 'API'})
					}}
        >
          <Text numberOfLines={1} style={styles.listText}>API</Text>
        </TouchableOpacity>
			</Animated.View>}
			<Animated.View
				style={[styles.button, btnAnimate]}
				onTouchEnd={() => {
					setPressed((prevState) => !prevState)
				}}
			>
				<AntDesign name="plus" size={30} color="#fff"/>
			</Animated.View>
		</>
	)
}