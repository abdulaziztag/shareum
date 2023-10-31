import {AppInputProps} from './types';
import {Pressable, StyleSheet, TextInput, View, Text} from 'react-native';
import {useActiveColor} from '@/hooks/useActiveColor';
import {AntDesign} from '@expo/vector-icons';
import {useEffect, useState} from 'react';

export const AppInput = (
	{
		placeholder,
		value,
		onChangeText,
		containerStyles,
		prependIcon,
		type,
		hint,
		label,
		clearButton = true,
		appendText,
		isTextArea = false,
		inputStyles,
		errorMessage,
		secureText,
		onClearClicked
	}: AppInputProps
) => {
	const activeTheme = useActiveColor()
	const [inputValue, setInputValue] = useState(value)
	const [isFocused, setIsFocused] = useState(false)

	useEffect(() => {
		setInputValue(value)
	}, [value])

	const secondaryColorActive = isFocused ? activeTheme.textPrimary : activeTheme.textSecondary

	const styles = StyleSheet.create({
		container: {
			minHeight: 70,
			justifyContent: 'center',
			...containerStyles
		},
		inputContainer: {
			flex: 1,
			marginVertical: 5,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'relative',
		},
		input: {
			flex: 1,
			height: isTextArea ? 100 : 50,
			borderColor: secondaryColorActive,
			borderWidth: 2,
			paddingLeft: !!prependIcon ? 35 : 15,
			paddingRight: !!appendText ? (appendText.length * 10) + 12 : 35,
			fontFamily: 'Poppins_400Regular',
			borderRadius: isTextArea ? 10 : 100,
			fontSize: 18,
			color: activeTheme.textPrimary,
			textAlignVertical: 'center',
			...inputStyles
		},
		inputLabel: {
			fontFamily: 'Poppins_400Regular',
			color: secondaryColorActive,
			fontSize: 16
		},
		inputIcon: {
			position: 'absolute',
			left: 10,
			opacity: .7
		},
		clearInput: {
			position: 'absolute',
			right: 0,
			width: 40,
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			opacity: .7
		},
		prependText: {
			position: 'absolute',
			right: 12,
			color: activeTheme.textPrimary
		},
		underInputContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			flexWrap: 'wrap'
		},
		hint: {
			fontFamily: 'Poppins_400Regular',
			color: secondaryColorActive,
			fontSize: 16,
			alignSelf: 'flex-end',
			textAlign: 'right',
			marginLeft: 10,
			flex: 4
		}
	})

	return (
		<View style={styles.container}>
			{!!label && <Text style={styles.inputLabel}>{label}</Text>}
			<View style={styles.inputContainer}>
				{!!prependIcon &&
          <AntDesign style={styles.inputIcon} name={prependIcon} color={secondaryColorActive} size={20}/>}
				<TextInput
					style={styles.input}
					placeholder={placeholder}
					placeholderTextColor={activeTheme.textSecondary}
					secureTextEntry={secureText || false}
					value={inputValue}
					onChangeText={onChangeText}
					multiline={isTextArea}
					keyboardType={type || 'default'}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				>
				</TextInput>
				{!!appendText && <Text style={styles.prependText}>{appendText}</Text>}
				{!!inputValue && clearButton &&
          <Pressable style={styles.clearInput} onPress={!!onClearClicked ? onClearClicked : () => setInputValue('')}>
            <AntDesign name="closecircle" size={18} color={secondaryColorActive}/>
          </Pressable>}
			</View>
			<View style={styles.underInputContainer}>
				{!!errorMessage && <Text style={{...styles.inputLabel, color: activeTheme.error, flex: 6}}>{errorMessage}</Text>}
				{!!hint && <Text style={styles.hint}>{hint}</Text>}
			</View>
		</View>
	)
}
