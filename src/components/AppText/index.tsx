import {StyleSheet, Text} from 'react-native'
import {AppTextProps} from '@/components/AppText/types';
import {useActiveColor} from '@/hooks/useActiveColor';

export const AppText = ({children, style, bold, secondary}: AppTextProps) => {
	const activeTheme = useActiveColor()

	const styles = StyleSheet.create({
		text: {
			fontFamily: bold ? 'Poppins_600SemiBold' : 'Poppins_400Regular',
			fontSize: 16,
			color: secondary ? activeTheme.textSecondary : activeTheme.textPrimary,
		}
	})

	return (
		<Text style={[styles.text, style]}>
			{children}
		</Text>
	)
}