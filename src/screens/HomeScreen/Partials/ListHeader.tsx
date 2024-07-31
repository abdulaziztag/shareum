import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useColorScheme, View } from 'react-native';

import { Card } from './Card';

import { AppIconButton } from '@/components/_index';
import { RootStackType } from '@/types';
import { colors } from '@/utils/colors';

export const ListHeader = ({ total, available }: { total: number; available: number }) => {
  const navigation = useNavigation<NavigationProp<RootStackType>>();
  const colorScheme = useColorScheme();
  const activeTheme = colors[colorScheme || 'dark'];

  return (
    <>
      <Card total={total} available={available} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
          marginBottom: 20,
        }}>
        <AppIconButton
          text="withdraw"
          translatable
          onClick={() => navigation.navigate('ChooseCoin', { nextScreen: 'Withdraw' })}>
          <MaterialCommunityIcons
            color={activeTheme.backgroundPrimary}
            size={20}
            name="arrow-expand-up"
          />
        </AppIconButton>
        <AppIconButton
          text="deposit"
          translatable
          onClick={() => navigation.navigate('ChooseCoin', { nextScreen: 'Deposit' })}>
          <MaterialCommunityIcons
            color={activeTheme.backgroundPrimary}
            size={20}
            name="arrow-collapse-down"
          />
        </AppIconButton>
        <AppIconButton text="share" onClick={() => navigation.navigate('CodesList')} translatable>
          <MaterialCommunityIcons
            color={activeTheme.backgroundPrimary}
            size={20}
            name="share-variant"
          />
        </AppIconButton>
      </View>
    </>
  );
};
