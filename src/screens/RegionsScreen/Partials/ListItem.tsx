import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { ListItemProps } from '../types';

import { AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';
import { changeOne } from '@/store/features/regionsSlice';

export const ListItem = ({ name, id, state, flag, phone_code }: ListItemProps) => {
  const activeTheme = useActiveTheme();
  const dispatch = useDispatch();

  const changeCheckboxState = () => {
    dispatch(changeOne(id));
  };

  return (
    <Pressable
      style={({ pressed }) => ({
        ...styles.listItem,
        backgroundColor: pressed ? activeTheme.backgroundSecondary : activeTheme.backgroundPrimary,
      })}
      onPress={changeCheckboxState}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppText>{flag}</AppText>
        <AppText style={styles.regionName}>{phone_code}</AppText>
        <AppText style={styles.regionName}>{name}</AppText>
      </View>
      {state && <MaterialCommunityIcons name="check" size={25} style={{ color: 'orange' }} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 20,
  },
  regionName: {
    fontSize: 20,
    marginLeft: 20,
  },
});
