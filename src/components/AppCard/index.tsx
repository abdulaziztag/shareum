import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useActiveColor} from '@/hooks/useActiveColor';
import {AppCardType} from '@/components/AppCard/types';

export const AppCard = ({children, style, onPress}: AppCardType) => {
	const activeTheme = useActiveColor()

	const styles = StyleSheet.create({
		card: {
			borderRadius: 7,
			padding: 10,
			flexDirection: 'column',
			backgroundColor: activeTheme.backgroundSecondary,
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowOpacity: 0.29,
			shadowRadius: 4.65,

			elevation: 7,
			marginHorizontal: 10,
		}
	})
	return onPress ? (
		<TouchableOpacity
			style={[styles.card, style]}
			onPress={onPress}
			activeOpacity={.6}
		>
			{children}
		</TouchableOpacity>
	) : (
		<View style={[styles.card, style]}>
			{children}
		</View>
	)
}