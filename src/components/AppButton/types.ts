import {TextStyle, ViewStyle} from 'react-native';

export type AppButtonProps = {
	title: JSX.Element | string,
	onClick: () => void,
	activeOpacity?: number,
	btnStyles?: ViewStyle,
	textStyles?: TextStyle,
	disabled?: boolean,
	loader?: boolean
}