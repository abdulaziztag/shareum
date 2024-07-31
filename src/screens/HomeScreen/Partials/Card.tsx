import Constants from 'expo-constants';
import { StyleSheet, View, ImageBackground } from 'react-native';

import { AppText } from '@/components/_index';

export const Card = ({ total, available }: { total: number; available: number }) => {
  return (
    <ImageBackground
      style={styles.card}
      resizeMode="cover"
      source={require('../../../../assets/cardBackground2.jpg')}
      imageStyle={{ borderRadius: 13 }}>
      <View style={{ alignItems: 'center' }}>
        <AppText style={styles.cardItemTitle} translatable>
          totalBalance
        </AppText>
        <AppText style={styles.cardItemNumber} bold>
          ${total.toFixed(2)}
        </AppText>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ alignItems: 'center' }}>
          <AppText style={styles.cardItemTitle} translatable>
            available
          </AppText>
          <AppText style={styles.cardItemNumber} bold>
            ${available.toFixed(2)}
          </AppText>
        </View>
        <View style={{ alignItems: 'center' }}>
          <AppText style={styles.cardItemTitle} translatable>
            withdrawn
          </AppText>
          <AppText style={styles.cardItemNumber} bold>
            0
          </AppText>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: Constants.statusBarHeight,
  },
  cardItemTitle: {
    color: '#fff',
    opacity: 0.8,
  },
  cardItemNumber: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
