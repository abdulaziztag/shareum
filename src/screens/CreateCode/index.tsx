import {useActiveColor} from '@/hooks/useActiveColor';
import {Platform, ScrollView, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackType} from '@/types';
import QrScreen from '@/screens/CreateCode/QrScreen';
import PromoScreen from '@/screens/CreateCode/PromoScreen';
import APIScreen from '@/screens/CreateCode/APIScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

export default () => {
	const activeTheme = useActiveColor()
	// @ts-ignore
	const { params: {codeType, chosenCrypto} } = useRoute<RouteProp<RootStackType>>()

	const defineScreen = () => {
		if (codeType === 'QR') {
			return <QrScreen chosenCryptoId={chosenCrypto} />
		} else if (codeType === 'Promo') {
			return <PromoScreen chosenCryptoId={chosenCrypto} />
		} else if (codeType === 'API') {
			return <APIScreen chosenCryptoId={chosenCrypto} />
		}
	}

	return (
		<SafeAreaView edges={['left', 'right']} style={{backgroundColor: activeTheme.backgroundPrimary, flex: 1, paddingTop: Platform.OS === 'android' ? 55: 0}}>
			<ScrollView keyboardDismissMode="on-drag">
				{defineScreen()}
			</ScrollView>
		</SafeAreaView>
	)
}