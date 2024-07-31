import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ListHeaderProps } from '../types';

import { AppInput } from '@/components/AppInput';
import { AppText } from '@/components/_index';
import { useActiveTheme, useAppDispatch, useAppSelector } from '@/hooks/_index';
import { changeAll } from '@/store/features/regionsSlice';

export const ListHeader = ({ inputHandler, inputValue }: ListHeaderProps) => {
  const activeTheme = useActiveTheme();
  const dispatch = useAppDispatch();
  const regions = useAppSelector((state) => state.region.regions);

  const checkboxHandler = () => {
    const isAllChecked = regions.every((region) => region.state);
    if (isAllChecked) dispatch(changeAll(false));
    else dispatch(changeAll(true));
  };

  return (
    <>
      <AppInput
        value={inputValue}
        name="search"
        placeholder="Search"
        onChangeText={inputHandler}
        prependIcon="search1"
        containerStyles={{
          marginHorizontal: 10,
        }}
      />
      <TouchableOpacity
        style={[styles.allBtn, { backgroundColor: activeTheme.backgroundSecondary }]}
        onPress={checkboxHandler}
        activeOpacity={0.7}>
        <AppText style={styles.allText}>Select All</AppText>
        {regions.every((region) => region.state) && (
          <MaterialCommunityIcons name="check" size={25} style={{ color: 'orange' }} />
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  allBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  allText: {
    fontSize: 20,
  },
});
