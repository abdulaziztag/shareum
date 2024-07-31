import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Graph } from './graph';

import { AppText, AppIconButton } from '@/components/_index';
import { getWeekDates, formatDateRange } from '@/helpers/_index';
import { useActiveTheme } from '@/hooks/_index';

type StatisticsProps = {
  graphData: number[] | undefined;
  loader: boolean;
  isError: boolean;
  refetch: () => void;
  selectedDaysProp: (days: string[]) => void;
};

export const Statistics = ({
  graphData,
  isError,
  refetch,
  loader,
  selectedDaysProp,
}: StatisticsProps) => {
  const activeTheme = useActiveTheme();
  const [selectedDays, setSelectedDays] = useState(() => getWeekDates(new Date()));

  useEffect(() => {
    selectedDaysProp(selectedDays);
  }, [selectedDays]);

  const changeWeek = (to: number) => {
    setSelectedDays((prev) => {
      const startWeek = new Date(prev[0]);
      startWeek.setDate(startWeek.getDate() + to * 7);
      return getWeekDates(startWeek);
    });
  };

  if (isError) {
    Toast.show({
      type: 'error',
      text1: 'Error while getting statistics!',
      text2: 'Press button below to refresh',
    });
    return (
      <View>
        <AppIconButton onClick={refetch} text="Statistics retry">
          <Ionicons name="refresh" size={30} />
        </AppIconButton>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 50 }}>
      <AppText style={{ fontSize: 24, marginLeft: 10 }}>Statistics</AppText>
      <View style={[styles.justifyBetween]}>
        <AppIconButton onClick={() => changeWeek(-1)} style={{ flex: 0 }}>
          <AntDesign name="left" size={25} color={activeTheme.backgroundPrimary} />
        </AppIconButton>
        <AppText style={{ fontSize: 22 }}>{formatDateRange(selectedDays)}</AppText>
        <AppIconButton onClick={() => changeWeek(+1)} style={{ flex: 0 }}>
          <AntDesign name="right" size={25} color={activeTheme.backgroundPrimary} />
        </AppIconButton>
      </View>
      {loader ? (
        <ActivityIndicator style={{ marginTop: 10 }} color={activeTheme.textPrimary} size="large" />
      ) : (
        <Graph graphData={graphData || []} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  justifyBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
});
