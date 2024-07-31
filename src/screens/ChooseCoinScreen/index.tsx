import { useState } from 'react';
import { FlatList, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ListHeader } from './Partials/ListHeader';
import { ListItem } from './Partials/ListItem';

import { useActiveTheme } from '@/hooks/_index';
import { ICryptoWithNetwork } from '@/interfaces/_index';
import { useGetCryptoListQuery } from '@/store/api/crypto';

export const ChooseCoinScreen = () => {
  const activeTheme = useActiveTheme();
  const [searchInput, setSearchInput] = useState<string>('');
  const { data, isLoading, isFetching, refetch } = useGetCryptoListQuery();
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{ backgroundColor: activeTheme.backgroundPrimary, flex: 1 }}>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList<ICryptoWithNetwork>
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <ListHeader inputHandler={setSearchInput} inputValue={searchInput} />
          }
          renderItem={({ item }) => <ListItem crypto={item} key={item.id} />}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          keyboardDismissMode="on-drag"
          style={{
            paddingTop: 10,
            paddingHorizontal: 10,
          }}
        />
      )}
    </SafeAreaView>
  );
};
