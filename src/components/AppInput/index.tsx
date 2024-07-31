import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Controller, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppInputProps } from './types';

import { AppText } from '@/components/AppText';
import { useActiveTheme } from '@/hooks/_index';

export const AppInput = <TFieldValues extends Record<string, any>>({
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
  onClearClicked,
  control,
  name,
  translatable,
  rules,
  disabled = false,
}: AppInputProps<TFieldValues>) => {
  const activeTheme = useActiveTheme();
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();

  const inputPlaceholder = translatable && placeholder ? t(placeholder) : placeholder;

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const secondaryColorActive = isFocused ? activeTheme.textPrimary : activeTheme.textSecondary;

  const inputStyle = StyleSheet.create({
    input: {
      flex: 1,
      height: isTextArea ? 100 : 45,
      borderColor: secondaryColorActive,
      borderWidth: 1,
      paddingLeft: prependIcon ? 35 : 15,
      paddingRight: typeof appendText === 'string' && appendText ? appendText.length * 10 + 12 : 35,
      fontFamily: 'Poppins_400Regular',
      borderRadius: isTextArea ? 10 : 100,
      fontSize: 16,
      color: activeTheme.textPrimary,
      alignSelf: 'flex-start',
      textAlignVertical: 'center',
      ...inputStyles,
    },
  });

  if (control) {
    return (
      <Controller
        name={name as Path<TFieldValues>}
        control={control}
        rules={rules}
        render={({ field: { value, onChange } }) => (
          <View style={[styles.container, containerStyles]}>
            {!!label && (
              <AppText translatable={translatable} secondary={!isFocused}>
                {label}
              </AppText>
            )}
            <View style={styles.inputContainer}>
              {!!prependIcon && (
                <AntDesign
                  style={styles.inputIcon}
                  name={prependIcon}
                  color={secondaryColorActive}
                  size={20}
                />
              )}
              <TextInput
                style={inputStyle.input}
                placeholder={inputPlaceholder}
                placeholderTextColor={activeTheme.textSecondary}
                secureTextEntry={secureText || false}
                value={value}
                onChangeText={onChange}
                editable={!disabled}
                selectTextOnFocus={!disabled}
                multiline={isTextArea}
                keyboardType={type || 'default'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {!!appendText && (
                <AppText style={styles.appendText} translatable>
                  {appendText}
                </AppText>
              )}
              {!!inputValue && clearButton && (
                <Pressable
                  style={styles.clearInput}
                  onPress={onClearClicked ? onClearClicked : () => setInputValue('')}>
                  <AntDesign name="closecircle" size={18} color={secondaryColorActive} />
                </Pressable>
              )}
            </View>
            <View style={styles.underInputContainer}>
              {!!errorMessage && (
                <AppText style={{ color: activeTheme.error }} translatable>
                  {errorMessage}
                </AppText>
              )}
              {!!hint && (
                <AppText style={styles.hint} secondary={!isFocused} translatable>
                  {hint}
                </AppText>
              )}
            </View>
          </View>
        )}
      />
    );
  } else {
    return (
      <View style={[styles.container, containerStyles]}>
        {!!label && (
          <AppText secondary={!isFocused} translatable>
            {label}
          </AppText>
        )}
        <View style={styles.inputContainer}>
          {!!prependIcon && (
            <AntDesign
              style={styles.inputIcon}
              name={prependIcon}
              color={secondaryColorActive}
              size={20}
            />
          )}
          <TextInput
            style={inputStyle.input}
            placeholder={inputPlaceholder}
            placeholderTextColor={activeTheme.textSecondary}
            secureTextEntry={secureText || false}
            value={value}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            onChangeText={onChangeText}
            multiline={isTextArea}
            keyboardType={type || 'default'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {!!appendText && (
            <AppText style={styles.appendText} translatable>
              {appendText}
            </AppText>
          )}
          {!!inputValue && clearButton && (
            <Pressable
              style={styles.clearInput}
              onPress={onClearClicked ? onClearClicked : () => setInputValue('')}>
              <AntDesign name="closecircle" size={18} color={secondaryColorActive} />
            </Pressable>
          )}
        </View>
        <View style={styles.underInputContainer}>
          {!!hint && (
            <AppText style={styles.hint} secondary={!isFocused} translatable={translatable}>
              {hint}
            </AppText>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    minHeight: 70,
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    opacity: 0.7,
  },
  clearInput: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  appendText: {
    position: 'absolute',
    right: 12,
  },
  underInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  hint: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginLeft: 10,
    flex: 4,
  },
});
