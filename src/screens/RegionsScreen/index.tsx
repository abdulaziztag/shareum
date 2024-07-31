import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ListHeader } from './Partials/ListHeader';
import { ListItem } from './Partials/ListItem';

import { AppButton } from '@/components/_index';
import { useActiveTheme, useAppDispatch, useAppSelector } from '@/hooks/_index';
import { IRegion } from '@/interfaces/_index';
import { useGetRegionsQuery } from '@/store/api/regions';
import { setRegions } from '@/store/features/regionsSlice';

export const RegionsScreen = () => {
  const activeTheme = useActiveTheme();
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const regions = useAppSelector((state) => state.region.regions);
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetRegionsQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setRegions(data));
    }
  }, [isSuccess, data, dispatch]);

  const confirmSelection = () => {
    regions.filter((region) => region.state).length && navigation.goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor: activeTheme.backgroundPrimary, flex: 1 }}>
      <FlatList
        renderItem={({ item }: { item: IRegion & { state: boolean } }) => (
          <ListItem
            key={item.id}
            name={item.name}
            id={item.id}
            state={item.state}
            code={item.code}
            phone_code={item.phone_code}
            flag={item.flag}
          />
        )}
        ListHeaderComponent={<ListHeader inputHandler={setSearchInput} inputValue={searchInput} />}
        data={regions}
        style={{
          paddingTop: 10,
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <AppButton
          fullWidth
          title={
            regions.filter((region) => region.state).length
              ? 'Confirm'
              : 'Select at least one region'
          }
          onClick={confirmSelection}
          disabled={!regions.filter((region) => region.state).length}
        />
      </View>
    </SafeAreaView>
  );
};
