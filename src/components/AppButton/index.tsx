import {TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {AppButtonProps} from './types';
import {useActiveColor} from '@/hooks/useActiveColor';

export const AppButton = ({title, onClick, textStyles, btnStyles, activeOpacity, disabled, loader}: AppButtonProps) => {
	const activeTheme = useActiveColor()

	const styles = StyleSheet.create({
		button: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 5,
			backgroundColor: disabled || loader ? activeTheme.textSecondary : activeTheme.warning,
			margin: 10,
			paddingVertical: 10,
			...btnStyles
		},
		text: {
			fontFamily: 'Poppins_400Regular',
			fontSize: 20,
			color: activeTheme.textPrimary,
			...textStyles
		}
	})

	return (
		<TouchableOpacity
			onPress={loader || disabled ? () => {} : onClick}
			style={styles.button}
			activeOpacity={disabled || loader ? 1 : activeOpacity || .8}
		>
			{loader ? <ActivityIndicator color={'white'}/> : <Text style={styles.text}>{title}</Text>}
		</TouchableOpacity>
	)
}