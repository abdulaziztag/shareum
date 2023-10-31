import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
	RefreshControl,
	ActivityIndicator, Platform
} from 'react-native';
import {AppText} from '@/components/AppText';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackType} from '@/types';
import {useActiveColor} from '@/hooks/useActiveColor';
import QRCode from 'react-native-qrcode-svg';
import {AntDesign} from '@expo/vector-icons';
import {calculate} from '@/utils/calculateFloats';
import {useGetQrByIdQuery, useQrStatisticsQuery} from '@/store/api/qrCode';
import {captureRef} from 'react-native-view-shot';
import {useRef, useState} from 'react';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import {AppIconButton} from '@/components/AppIconButton';
import {getWeekDates} from '@/utils/getWeekDates';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Statistics} from '@/screens/CodeDetails/components/statistics';


export default () => {
	const activeTheme = useActiveColor()
	const qrCapture = useRef()
	const {params} = useRoute<RouteProp<RootStackType>>()
	const [actionsLoader, setActionsLoader] = useState(false)
	const [selectedDays, setSelectedDays] = useState(() => getWeekDates(new Date()))

	const {
		isLoading: mainDataLoading,
		data: mainData,
		isSuccess: mainDataSuccess,
		error: mainDataError,
		refetch: mainDataRefetch,
		isFetching: mainDataFetching
	} = useGetQrByIdQuery({codeId: 'codeId' in params && params.codeId})
	const {
		isLoading: statisticsLoading,
		data: statisticsData,
		isError: statisticsIsError,
		refetch: statisticsRefetch,
		isFetching: statisticsFetching,
		error
	} = useQrStatisticsQuery({
		codeId: 'codeId' in params && params.codeId,
		start_date: selectedDays[0],
		end_date: selectedDays[6]
	}, {skip: !mainDataSuccess})

	const share = async () => {
		try {
			setActionsLoader(true)
			const imgUri = await captureRef(qrCapture)
			await Sharing.shareAsync('file://' + imgUri, {
				dialogTitle: `This is QR for ${mainData.name}`
			})
			setActionsLoader(false)
		} catch (e) {
			setActionsLoader(false)
			Toast.show({type: 'error', text1: 'Error while sharing'})
		}
	}

	const copy = async () => {
		try {
			const imgUri = await captureRef(qrCapture)
			const base64Image = await FileSystem.readAsStringAsync(imgUri, {
				encoding: FileSystem.EncodingType.Base64,
			});
			await Clipboard.setImageAsync(base64Image);
			Toast.show({type: 'success', text1: 'QR successfully copied to clipboard'})
		} catch (e) {
			Toast.show({type: 'error', text1: 'Error while copying QR code.'})
		}
	}

	return (
		<SafeAreaView edges={['left', 'right']} style={{backgroundColor: activeTheme.backgroundPrimary, flex: 1, paddingTop: Platform.OS === 'android' ? 55: 0}}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl
					refreshing={mainDataFetching}
					onRefresh={() => {
						mainDataRefetch()
						statisticsRefetch()
					}}/>}
			>
				{mainDataLoading || mainDataError ?
					<ActivityIndicator style={{marginTop: 20}} color={activeTheme.textPrimary} size={'large'}/> :
					<>
						<View ref={qrCapture} style={[styles.qrCode, {borderColor: activeTheme.textPrimary}]}>
							<QRCode size={190} value={`${mainData?.code}`}/>
						</View>
						<View style={styles.actions}>
							<AppIconButton text={'Download'} loading={actionsLoader}>
								<AntDesign name={'download'} size={25} color={activeTheme.backgroundPrimary} />
							</AppIconButton>
							<AppIconButton onClick={share} text={'Share'} loading={actionsLoader}>
								<AntDesign name={'sharealt'} size={25} color={activeTheme.backgroundPrimary} />
							</AppIconButton>
							<AppIconButton onClick={copy} text={'Copy'} loading={actionsLoader}>
								<AntDesign name={'copy1'} size={25} color={activeTheme.backgroundPrimary} />
							</AppIconButton>
						</View>
						<AppText style={styles.name} bold>{mainData?.name}</AppText>
						<AppText style={styles.description} secondary>{mainData?.description || 'No description'}</AppText>

						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Total amount</AppText>
							<AppText
								style={styles.value}>{mainData?.balance} {mainData?.crypto_network.crypto.slug}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Shared</AppText>
							<AppText
								style={styles.value}>{mainData && calculate(mainData.balance, mainData.current_balance, '-')} {mainData?.crypto_network.crypto.slug}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Available</AppText>
							<AppText
								style={styles.value}>{mainData?.current_balance} {mainData?.crypto_network.crypto.slug}</AppText>
						</View>
						<View style={[styles.divider, {backgroundColor: activeTheme.mainColor}]}/>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Per scan</AppText>
							<AppText
								style={styles.value}>{mainData?.per_user} {mainData?.crypto_network.crypto.slug}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Total scans</AppText>
							<AppText
								style={styles.value}>{Number(mainData?.current_balance / mainData?.per_user + mainData?.scanned).toFixed()}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Scanned</AppText>
							<AppText style={styles.value}>{mainData?.scanned}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Available</AppText>
							<AppText style={styles.value}>{Number(mainData?.current_balance / mainData?.per_user).toFixed()}</AppText>
						</View>
						<View style={[styles.divider, {backgroundColor: activeTheme.mainColor}]}/>
						<TouchableOpacity style={[styles.regionsButton, {backgroundColor: activeTheme.backgroundSecondary}]}>
							<AppText style={styles.value}>Regions</AppText>
							<AntDesign name="right" size={20} color={activeTheme.textPrimary}/>
						</TouchableOpacity>
						<View style={[styles.justifyBetween, {alignItems: 'flex-start'}]}>
							<AppText style={styles.key}>Image</AppText>
							<Image source={require('@/assets/cardBackground2.jpg')}
										 style={[styles.image, {borderColor: activeTheme.textPrimary}]}/>
						</View>
					</>
				}
				{mainDataSuccess &&
					<Statistics
						graphData={statisticsData && selectedDays.map(date => statisticsData[date] || 0)}
						loader={statisticsLoading}
						isError={statisticsIsError}
						refetch={statisticsRefetch}
						selectedDaysProp={(days) => setSelectedDays(days)}
					/>
				}
			</ScrollView>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	qrCode: {
		marginTop: 20,
		width: 200,
		height: 200,
		alignSelf: 'center',
		borderRadius: 10,
		overflow: 'hidden',
		borderWidth: 5
	},
	name: {
		fontSize: 24,
		textAlign: 'center',
		marginTop: 10
	},
	description: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 10
	},
	justifyBetween: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
		paddingHorizontal: 10
	},
	key: {
		fontSize: 18,
	},
	value: {
		fontSize: 18,
	},
	divider: {
		width: '100%',
		height: 3,
		marginVertical: 10
	},
	regionsButton: {
		marginVertical: 5,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	image: {
		width: 75,
		height: 75,
		borderRadius: 100,
		borderWidth: 1
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		marginBottom: 10
	}
})