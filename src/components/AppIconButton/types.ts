import { TouchableOpacityProps, ViewStyle } from 'react-native';

export type AppIconButtonProps = {
  children: JSX.Element;
  text?: string;
  containerStyles?: ViewStyle;
  loading?: boolean;
  iconBtnStyles?: ViewStyle;
  onClick?: () => void;
  disabled?: boolean;
  translatable?: boolean;
} & TouchableOpacityProps;
