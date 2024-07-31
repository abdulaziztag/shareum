import { AntDesign } from '@expo/vector-icons';
import { Control } from 'react-hook-form';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { KeyboardType, TextStyle, ViewStyle } from 'react-native';

export type AppInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control?: Control<TFieldValues>;
  name: TName | string;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  label?: string;
  type?: KeyboardType;
  containerStyles?: ViewStyle;
  disabled?: boolean;
  inputStyles?: TextStyle;
  prependIcon?: keyof typeof AntDesign.glyphMap;
  hint?: string;
  clearButton?: boolean;
  onClearClicked?: () => void;
  appendText?: JSX.Element | string;
  isTextArea?: boolean;
  errorMessage?: string;
  secureText?: boolean;
  translatable?: boolean;
};
