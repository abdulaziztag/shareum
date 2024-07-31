import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { useActiveTheme } from '@/hooks/_index';

export const Graph = ({ graphData }: { graphData: number[] }) => {
  const activeTheme = useActiveTheme();
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: graphData,
        color: (opacity = 1) => activeTheme.warning,
        strokeWidth: 2, // optional
      },
    ],
  };

  /*const [selectedData, setSelectedData] = React.useState(null);*/

  return (
    <View
      style={{
        width: Dimensions.get('window').width - 20,
        overflow: 'hidden',
        right: -20,
        borderRadius: 10,
      }}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        withShadow
        chartConfig={{
          propsForHorizontalLabels: {
            strokeWidth: 10,
          },
          backgroundGradientFrom: activeTheme.backgroundSecondary,
          backgroundGradientTo: activeTheme.mainColor,
          decimalPlaces: 1,
          color: (opacity = 1) => activeTheme.textPrimary,
          labelColor: (opacity = 1) => activeTheme.textPrimary,
          propsForDots: {
            r: '3',
            strokeWidth: '1',
            stroke: '#ffa726',
          },
        }}
        style={{
          left: -20,
          borderRadius: 10,
          overflow: 'hidden',
        }}
        bezier
        yLabelsOffset={25}
        formatYLabel={(label) => `${Math.trunc(+label)}`}
        /*onDataPointClick={({ value, dataset, getColor }) =>
          setSelectedData(`Day ${dataset.data.indexOf(value) + 1}: ${value} scans`)
        }*/
      />
    </View>
  );
};
