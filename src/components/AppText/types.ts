import { ReactNode } from 'react';
import { TextProps, TextStyle } from 'react-native';

export type AppTextProps = {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  bold?: boolean;
  secondary?: boolean;
  translatable?: boolean;
} & TextProps;
