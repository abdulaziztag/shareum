import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/legacy';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, View } from 'react-native';
import {
  GestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton, AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';
import { PromoModal } from '@/screens/ScanScreen/components/promoModal';
import { QrModal } from '@/screens/ScanScreen/components/qrModal';
import { Square } from '@/screens/ScanScreen/components/square';
import { useGetQrPrizeMutation } from '@/store/api/qrCode';

const MIN_ZOOM = 0.0;
const MAX_ZOOM = 1.0;

export const ScanScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const activeTheme = useActiveTheme();
  const [scanned, setScanned] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [promoModalVisible, setPromoModalVisible] = useState(false);
  const [getPrizeMutation, { isLoading, isSuccess, data, error }] = useGetQrPrizeMutation();
  const [ratio, setRatio] = useState('4:3'); // default is 4:3
  const [camera, setCamera] = useState<typeof CameraView | null>(null);
  const [imagePadding, setImagePadding] = useState(0);
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (!permission) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
        <AppText>Camera loading</AppText>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppText style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </AppText>
        <AppButton onClick={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: any) => {
    try {
      setScanned(true);
      setQrModalVisible(true);
      await getPrizeMutation({ code: data }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  const closeModal = async () => {
    setQrModalVisible(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setScanned(false);
  };

  const prepareRatio = async () => {
    let desiredRatio: string = '4:3';
    if (Platform.OS === 'android') {
      const ratios = ['1:1'];
      const distances: Record<string, number> = {};
      const realRatios: Record<string, number> = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0], 10) / parseInt(parts[1], 10);
        realRatios[ratio] = realRatio;
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      desiredRatio = minDistance as string;
      const remainder = Math.floor((height - realRatios[desiredRatio] * width) / 2);
      setImagePadding(remainder / 2);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  };
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const changeZoom = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
    const zoomChange = (event.nativeEvent.scale - 1) * 0.01; // Adjust the multiplier (0.1) for sensitivity
    const newZoom = zoom + zoomChange;
    const clampedZoom = Math.max(MIN_ZOOM, Math.min(newZoom, MAX_ZOOM));
    setZoom(clampedZoom);
  };

  return (
    <SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: activeTheme.backgroundPrimary }}>
      <QrModal
        modalVisible={qrModalVisible}
        closeModal={closeModal}
        crypto_slug={data?.crypto_slug || ''}
        description={data?.description || ''}
        error={error as { data: { detail: string } }}
        isLoading={isLoading}
        isSuccess={isSuccess}
        per_user={data?.per_user || 0}
      />
      <PromoModal modalVisible={promoModalVisible} closeModal={() => setPromoModalVisible(false)} />
      <PinchGestureHandler onGestureEvent={(event) => changeZoom(event)}>
        <View style={{ flex: 1 }}>
          <CameraView
            style={{ flex: 1, marginTop: imagePadding, marginBottom: imagePadding }}
            zoom={zoom}
            onCameraReady={setCameraReady}
            type={CameraType.back}
            barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ref={(ref: any) => {
              setCamera(ref);
            }}
          />
          <Square />
        </View>
      </PinchGestureHandler>
      <AppButton
        title="enterPromo"
        translatable
        onClick={() => {
          setPromoModalVisible(true);
        }}
        btnStyles={{ position: 'absolute', zIndex: 5, bottom: 0, left: 0, right: 0 }}
      />
    </SafeAreaView>
  );
};
