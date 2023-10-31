import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useGetQrPrizeMutation} from '@/store/api/qrCode';
import * as ScreenOrientation from 'expo-screen-orientation';
import {QrModal} from '@/screens/ScanScreen/components/qrModal';
import {PromoModal} from '@/screens/ScanScreen/components/promoModal';
import {AppText} from '@/components/AppText';
import {Camera, CameraType} from 'expo-camera';

export default () => {
	const [hasPermission, setHasPermission] = useState(null);
	const [permission, requestPermission] = Camera.useCameraPermissions()
	const [scanned, setScanned] = useState(false);
	const [qrModalVisible, setQrModalVisible] = useState(false);
	const [promoModalVisible, setPromoModalVisible] = useState(false);
	const [getPrizeMutation, {isLoading, isSuccess, data, error}] = useGetQrPrizeMutation()

	useEffect(() => {
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
		return () => {
			ScreenOrientation.unlockAsync();
		}
	}, []);

	//console.log(permission)

	const handleBarCodeScanned = async ({type, data}) => {
		try {
			setScanned(true);
			setQrModalVisible(true)
			await getPrizeMutation({code: data}).unwrap()
		} catch (e) {
			console.log(e)
		}
	}

	const closeModal = async () => {
		setQrModalVisible(false)
		await new Promise(resolve => setTimeout(resolve, 2000))
		setScanned(false)
	}

	/*if (hasPermission === null) {
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<ActivityIndicator size={'large'} />
				<AppText>Camera loading</AppText>
			</View>
		);
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}*/

	return (
		<View style={{flex: 1,borderWidth: 2, borderColor: 'white'}}>
			{/*<QrModal
				modalVisible={qrModalVisible}
				closeModal={closeModal}
				crypto_slug={data?.crypto_slug}
				description={data?.description}
				error={error as { data: { detail: string } }}
				isLoading={isLoading}
				isSuccess={isSuccess}
				per_user={data?.per_user}
			/>
			<PromoModal modalVisible={promoModalVisible} closeModal={() => setPromoModalVisible(false)} />*/}
			<Camera style={{flex: 1, borderWidth: 2, borderColor: 'red'}} type={CameraType.back} onCameraReady={() => console.log('Camera ready')}
			>

			</Camera>
			{/*<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			<Square/>
			<AppButton title={'Enter promo'} onClick={() => {setPromoModalVisible(true)
			}} btnStyles={{position: 'absolute', zIndex: 5, bottom: 0, left: 0, right: 0}}/>*/}
		</View>
	)
}

const styles = StyleSheet.create({})