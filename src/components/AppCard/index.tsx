import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppCardType } from './types';

import { useActiveTheme } from '@/hooks/_index';

export const AppCard: FC<AppCardType> = ({ children, style, onPress }) => {
  const activeTheme = useActiveTheme();

  const styles = StyleSheet.create({
    card: {
      borderRadius: 7,
      padding: 10,
      flexDirection: 'column',
      backgroundColor: activeTheme.backgroundSecondary,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
      marginHorizontal: 10,
    },
  });

  return onPress ? (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.6}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[styles.card, style]}>{children}</View>
  );
};
