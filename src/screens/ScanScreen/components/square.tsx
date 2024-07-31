import * as _ from 'lodash';
import { useState } from 'react';
import { Dimensions, LayoutChangeEvent, StyleSheet, View } from 'react-native';

import { useActiveTheme } from '@/hooks/_index';

const screenWidth = Dimensions.get('window').width;

export const Square = () => {
  const [height, setHeight] = useState(0);
  const activeTheme = useActiveTheme();
  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  const SquareBorders = ({ vertical, horizontal }: { vertical: string; horizontal: string }) => {
    const borderRadius = `border${_.capitalize(vertical)}${_.capitalize(horizontal)}Radius`;
    const borderVerWidth = `border${_.capitalize(vertical)}Width`;
    const borderHorWidth = `border${_.capitalize(horizontal)}Width`;

    return (
      <View
        style={{
          width: 25,
          height: 25,
          position: 'absolute',
          [vertical]: -3,
          [horizontal]: -3,
          [borderRadius]: 7,
          [borderVerWidth]: 3,
          [borderHorWidth]: 3,
          borderColor: activeTheme.warning,
        }}
      />
    );
  };

  return (
    <View onLayout={onLayout} style={styles.container}>
      <View style={[styles.bigSquare, { bottom: height / 2 - 125 }]}>
        <SquareBorders vertical="top" horizontal="left" />
        <SquareBorders vertical="bottom" horizontal="left" />
        <SquareBorders vertical="top" horizontal="right" />
        <SquareBorders vertical="bottom" horizontal="right" />
      </View>

      <View style={styles.overlay} />
      <View style={{ height: 250, flexDirection: 'row' }}>
        <View style={styles.overlay} />
        <View style={{ width: 250, backgroundColor: 'transparent' }} />
        <View style={styles.overlay} />
      </View>
      <View style={styles.overlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bigSquare: {
    height: 250,
    width: 250,
    left: screenWidth / 2 - 125,
    position: 'absolute',
    zIndex: 5,
  },
});
