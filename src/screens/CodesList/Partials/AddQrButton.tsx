import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInRight,
  FadeOutRight,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';
import { RootStackType } from '@/types';

export const AddQrButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackType>>();
  const activeTheme = useActiveTheme();
  const btnAnimateValue = useSharedValue<string>('0deg');
  const [pressed, setPressed] = useState(false);

  const config = {
    duration: 300,
  };

  useEffect(() => {
    if (pressed) {
      btnAnimateValue.value = '-135deg';
    } else {
      btnAnimateValue.value = '0deg';
    }
  }, [pressed]);

  const btnAnimate = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: withTiming(btnAnimateValue.value, config) }],
    };
  });

  return (
    <>
      {pressed && (
        <Animated.View
          entering={FadeInRight}
          layout={Layout.springify()}
          exiting={FadeOutRight}
          style={[styles.list, { backgroundColor: activeTheme.backgroundPrimary }]}>
          <TouchableOpacity
            style={[
              styles.listItem,
              { borderBottomWidth: 1, borderColor: activeTheme.backgroundSecondary },
            ]}
            onPressOut={() => {
              setPressed(false);
              navigation.navigate('ChooseCoin', { codeType: 'QR' });
            }}>
            <AppText numberOfLines={1} style={styles.listText}>
              Qr Code
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.listItem,
              { borderBottomWidth: 1, borderColor: activeTheme.backgroundSecondary },
            ]}
            onPressOut={() => {
              setPressed(false);
              navigation.navigate('ChooseCoin', { codeType: 'Promo' });
            }}>
            <AppText numberOfLines={1} style={styles.listText}>
              Promo Code
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPressOut={() => {
              setPressed(false);
              navigation.navigate('ChooseCoin', { codeType: 'API' });
            }}>
            <AppText numberOfLines={1} style={styles.listText}>
              API
            </AppText>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Animated.View
        style={[styles.button, { backgroundColor: activeTheme.warning }, btnAnimate]}
        onTouchEnd={() => {
          setPressed((prevState) => !prevState);
        }}>
        <AntDesign name="plus" size={30} color="#fff" />
      </Animated.View>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    padding: 12,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    position: 'absolute',
    right: 30,
    bottom: 90,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listText: {
    fontSize: 20,
  },
});
