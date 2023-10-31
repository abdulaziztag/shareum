import {ActivityIndicator, Image, Platform, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/AppText';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackType} from '@/types';
import {useActiveColor} from '@/hooks/useActiveColor';
import {AntDesign} from '@expo/vector-icons';
import {calculate} from '@/utils/calculateFloats';
import {
	downloadExcel,
	saveInCacheAndShare, saveInStorage,
	useGetPromoByIdQuery, usePromoStatisticsQuery
} from '@/store/api/promoCode';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {AppIconButton} from '@/components/AppIconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getWeekDates} from '@/utils/getWeekDates';
import {Statistics} from '@/screens/CodeDetails/components/statistics';


export default () => {
	const activeTheme = useActiveColor()
	const {params} = useRoute<RouteProp<RootStackType>>()
	const [downloadingLoader, setDownloadingLoader] = useState(false)
	const [selectedDays, setSelectedDays] = useState(getWeekDates(new Date()))
	const {
		isLoading: mainDataLoading,
		data: mainData,
		isSuccess: mainDataSuccess,
		error: mainDataError,
		refetch: mainDataRefetch,
		isFetching: mainDataFetching
	} = useGetPromoByIdQuery('codeId' in params && params.codeId)
	const {
		isLoading: statisticsLoading,
		data: statisticsData,
		isError: statisticsIsError,
		refetch: statisticsRefetch,
		isFetching: statisticsFetching
	} = usePromoStatisticsQuery({
		codeId: 'codeId' in params && params.codeId,
		start_date: selectedDays[0],
		end_date: selectedDays[6]
	}, {skip: !mainDataSuccess})

	const share = async () => {
		const codeId = 'codeId' in params && params.codeId
		try {
			setDownloadingLoader(true)
			const blob = await downloadExcel(codeId)
			await saveInCacheAndShare(mainData.name, blob)
			setDownloadingLoader(false)
		} catch (e) {
			setDownloadingLoader(false)
			Toast.show({type: 'error', text1: e.message})
		}
	}

	const save = async () => {
		const codeId = 'codeId' in params && params.codeId
		try {
			setDownloadingLoader(true)
			const blob = await downloadExcel(codeId)
			await saveInStorage(mainData.name, blob)
		} catch (e) {
			setDownloadingLoader(false)
			Toast.show({type: 'error', text1: e.message})
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
						<View style={styles.actions}>
							{
								Platform.OS === 'android' ?
									<>
										<AppIconButton onClick={save} text={'Download'} loading={downloadingLoader}>
											<AntDesign name={'download'} size={25} color={activeTheme.backgroundPrimary} />
										</AppIconButton>
										<AppIconButton onClick={share} text={'Share'} loading={downloadingLoader}>
											<AntDesign name={'sharealt'} size={25} color={activeTheme.backgroundPrimary} />
										</AppIconButton>
									</> :
									<AppIconButton onClick={share} text={'Download and share'} loading={downloadingLoader} >
										<AntDesign name={'sharealt'} size={25}/>
									</AppIconButton>
							}
						</View>
						<AppText style={styles.name} bold>{mainData?.name}</AppText>
						<AppText style={styles.description} secondary>{mainData?.description || 'No description'}</AppText>

						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Total amount</AppText>
							<AppText
								style={styles.value}>{mainData?.balance} {mainData?.crypto_network?.crypto?.slug}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Shared</AppText>
							<AppText
								style={styles.value}>{mainData && calculate(mainData.balance, mainData.current_balance, '-')} {mainData?.crypto_network?.crypto?.slug}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Available</AppText>
							<AppText
								style={styles.value}>{mainData?.current_balance} {mainData?.crypto_network?.crypto?.slug}</AppText>
						</View>
						<View style={[styles.divider, {backgroundColor: activeTheme.mainColor}]}/>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Per scan</AppText>
							<AppText
								style={styles.value}>{mainData?.per_user} {mainData?.crypto_network?.crypto?.slug}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Total activations</AppText>
							<AppText
								style={styles.value}>{Number(mainData?.current_balance / mainData?.per_user).toFixed()}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Activated</AppText>
							<AppText style={styles.value}>{mainData.activated}</AppText>
						</View>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key} secondary>Available</AppText>
							<AppText style={styles.value}>{Number(mainData?.current_balance / mainData?.per_user).toFixed()}</AppText>
						</View>
						<View style={[styles.divider, {backgroundColor: activeTheme.mainColor}]}/>
						<View style={styles.justifyBetween}>
							<AppText style={styles.key}>Image</AppText>
							<Image source={require('@/assets/cardBackground2.jpg')}
										 style={[styles.image, {borderColor: activeTheme.textPrimary}]}/>
						</View>
						{mainDataSuccess &&
              <Statistics
                graphData={statisticsData && selectedDays.map(date => statisticsData[date] || 0)}
                loader={statisticsLoading}
                isError={statisticsIsError}
                refetch={statisticsRefetch}
                selectedDaysProp={(days) => setSelectedDays(days)}
              />
						}
					</>
				}
			</ScrollView>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
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
	image: {
		width: 75,
		height: 75,
		borderRadius: 100,
		borderWidth: 1
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 75,
		marginBottom: 10
	}
})