import { useColorScheme } from 'react-native';

import { colors } from '@/utils/colors';

export const useActiveTheme = () => {
  const colorScheme = useColorScheme();
  return colors[colorScheme || 'dark'];
};
