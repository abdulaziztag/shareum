import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';
import { IBalance } from '@/interfaces/_index';
import { ListHeader } from '@/screens/HomeScreen/Partials/ListHeader';
import { ListItem } from '@/screens/HomeScreen/Partials/ListItem';
import { useGetBalanceQuery } from '@/store/api/balance';

export const HomeScreen = () => {
  const activeTheme = useActiveTheme();
  const { data, error, isLoading, isError, isFetching, refetch, isSuccess } = useGetBalanceQuery();

  if (isError) {
    console.log(error);
  }

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{ flex: 1, backgroundColor: activeTheme.backgroundPrimary }}>
      {isLoading || isError ? (
        <AppText>Loading</AppText>
      ) : (
        <FlatList<IBalance>
          data={data}
          style={{ paddingLeft: 15, paddingRight: 15 }}
          ListHeaderComponent={
            <ListHeader
              total={
                isSuccess ? data.reduce((acc, curr) => acc + curr.total * curr.crypto.price, 0) : 0
              }
              available={
                isSuccess
                  ? data.reduce((acc, curr) => acc + curr.available * curr.crypto.price, 0)
                  : 0
              }
            />
          }
          renderItem={({ item }) => <ListItem balancesListItem={item} />}
          keyExtractor={(item) => item.crypto.slug}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        />
      )}
    </SafeAreaView>
  );
};
