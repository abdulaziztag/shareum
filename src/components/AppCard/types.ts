import {ViewStyle} from 'react-native';

export type AppCardType = {
	style?: ViewStyle,
	children?: JSX.Element | JSX.Element[],
	onPress?: () => void
}