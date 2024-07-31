import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import { AppText } from '@/components/AppText';
import { useActiveTheme } from '@/hooks/_index';
import { ICryptoWithNetwork } from '@/interfaces/_index';
import { BASE_URL } from '@/store/api/api';
import { RootStackType } from '@/types';

export const BaseListItem = ({ crypto }: { crypto: ICryptoWithNetwork }) => {
  const { params } = useRoute<RouteProp<RootStackType>>();
  const navigation = useNavigation<NavigationProp<RootStackType>>();
  const activeTheme = useActiveTheme();

  const clickHandler = () => {
    const nextScreen = (params as { nextScreen: 'CreateCode' }).nextScreen;

    navigation.navigate(nextScreen, {
      chosenCrypto: crypto.crypto.id.toString(),
      codeType: params && 'codeType' in params ? params.codeType || '1' : '1',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.listItem, { borderBottomColor: activeTheme.backgroundSecondary }]}
      onPress={clickHandler}>
      <Image source={{ uri: BASE_URL + '/media/' + crypto.crypto.logo, width: 40, height: 40 }} />
      <View style={styles.cryptoInfo}>
        <AppText style={styles.cryptoId}>{crypto.crypto.slug}</AppText>
        <AppText secondary style={styles.cryptoName}>
          {crypto.crypto.name}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export const ListItem = memo(BaseListItem);

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  cryptoInfo: {
    marginLeft: 15,
  },
  cryptoId: {
    fontSize: 20,
  },
  cryptoName: {},
});
