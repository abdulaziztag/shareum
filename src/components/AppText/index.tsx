import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';

import { AppTextProps } from '@/components/AppText/types';
import { useActiveTheme } from '@/hooks/_index';

export const AppText: FC<AppTextProps> = ({
  children,
  style,
  bold,
  secondary,
  translatable,
  ...rest
}) => {
  const activeTheme = useActiveTheme();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    text: {
      fontFamily: bold ? 'Poppins_600SemiBold' : 'Poppins_400Regular',
      fontSize: 16,
      color: secondary ? activeTheme.textSecondary : activeTheme.textPrimary,
    },
  });

  return (
    <Text style={[styles.text, style]} {...rest}>
      {typeof children === 'string' && translatable ? t(children) : children}
    </Text>
  );
};
