import { FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import { ListItem } from './ListItem';

import { AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';
import { useGetPromoCodesListQuery } from '@/store/api/promoCode';

export const PromoCodesList = () => {
  const activeColor = useActiveTheme();
  const { data, isError, isLoading, refetch, isFetching } = useGetPromoCodesListQuery();

  if (isError) {
    Toast.show({ type: 'error', text1: 'Some error' });
  }

  return isLoading ? (
    <ActivityIndicator style={{ marginTop: 20 }} color={activeColor.textPrimary} size="large" />
  ) : !data?.length ? (
    <AppText style={{ alignSelf: 'center', marginTop: 20, fontSize: 24 }}>No data</AppText>
  ) : (
    <FlatList
      data={data}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      renderItem={({ item }) => <ListItem code={item} />}
    />
  );
};
