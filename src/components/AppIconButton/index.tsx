import { FC } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppIconButtonProps } from '@/components/AppIconButton/types';
import { AppText } from '@/components/AppText';
import { useActiveTheme } from '@/hooks/_index';

export const AppIconButton: FC<AppIconButtonProps> = ({
  children,
  containerStyles,
  iconBtnStyles,
  loading,
  disabled,
  text,
  onClick,
  translatable,
  ...rest
}) => {
  const activeTheme = useActiveTheme();

  return (
    <TouchableOpacity
      style={[styles.iconButton, containerStyles]}
      onPress={loading || disabled ? () => {} : onClick}
      activeOpacity={disabled || loading ? 1 : 0.8}
      {...rest}>
      <View
        style={[styles.iconContent, { backgroundColor: activeTheme.textPrimary }, iconBtnStyles]}>
        {!loading ? children : <ActivityIndicator size={25} />}
      </View>
      {text && (
        <AppText style={styles.iconText} translatable={translatable}>
          {text}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
  iconContent: {
    padding: 10,
    borderRadius: 100,
  },
  iconText: {
    marginTop: 5,
  },
});
