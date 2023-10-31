import {AntDesign} from '@expo/vector-icons';
import {KeyboardType, StyleProp, TextStyle, ViewStyle} from 'react-native';

export type AppInputProps = {
	placeholder?: string
	value: string
	onChangeText: (value: string) => void
	label?: string
	type?: KeyboardType
	containerStyles?: ViewStyle
	inputStyles?: TextStyle
	prependIcon?: keyof typeof AntDesign.glyphMap
	hint?: string
	clearButton?: boolean
	onClearClicked?: () => void
	appendText?: string
	isTextArea?: boolean
	errorMessage?: string
	secureText?: boolean
}