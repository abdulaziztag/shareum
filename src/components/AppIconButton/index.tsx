import {AppIconButtonProps} from '@/components/AppIconButton/types';
import {useActiveColor} from '@/hooks/useActiveColor';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '@/components/AppText';
import {FC} from 'react';

export const AppIconButton: FC<AppIconButtonProps> = ({children, containerStyles,  iconBtnStyles, loading, disabled, text, onClick, ...rest}) => {
	const activeTheme = useActiveColor()

	return (
		<TouchableOpacity
			style={[styles.iconButton, containerStyles]}
			onPress={loading || disabled ?
				() => {} :
				onClick
		}
			activeOpacity={disabled || loading ? 1 : .8}
			{...rest}
		>
			<View style={[styles.iconContent, {backgroundColor: activeTheme.textPrimary}, iconBtnStyles]}>
				{
					!loading ?
						children :
						<ActivityIndicator size={25}/>
				}
			</View>
			{text && <AppText style={styles.iconText}>{text}</AppText>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	iconButton: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
		overflow: 'hidden'
	},
	iconContent: {
		padding: 10,
		borderRadius: 100,
	},
	iconText: {
		marginTop: 5
	}
})