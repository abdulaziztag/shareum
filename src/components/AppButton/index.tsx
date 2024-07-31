import { FC } from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';

import { AppButtonProps } from './types';

import { AppText } from '@/components/AppText';
import { useActiveTheme } from '@/hooks/_index';

export const AppButton: FC<AppButtonProps> = ({
  title,
  onClick,
  textStyles,
  btnStyles,
  activeOpacity,
  disabled,
  loader,
  active,
  fullWidth,
  translatable,
}) => {
  const activeTheme = useActiveTheme();

  const styles = StyleSheet.create({
    button: {
      flex: fullWidth ? 1 : 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: disabled || loader ? activeTheme.textSecondary : activeTheme.warning,
      margin: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      ...btnStyles,
    },
    text: {
      fontSize: 20,
      ...textStyles,
    },
    activeOverlay: {
      backgroundColor: 'rgba(0, 0, 0, .4)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  return (
    <TouchableOpacity
      onPress={loader || disabled ? () => {} : onClick}
      style={styles.button}
      activeOpacity={disabled || loader ? 1 : activeOpacity || 0.8}>
      {active && <View style={styles.activeOverlay} />}
      {loader ? (
        <ActivityIndicator color="white" />
      ) : (
        <AppText style={styles.text} translatable={translatable}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};
