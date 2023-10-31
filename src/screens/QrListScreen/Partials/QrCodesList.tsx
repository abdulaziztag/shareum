import {ActivityIndicator, FlatList, RefreshControl, Text, View} from 'react-native';
import {ListItem} from '@/screens/QrListScreen/Partials/ListItem';
import Toast from 'react-native-toast-message';
import {useGetQrCodesListQuery} from '@/store/api/qrCode';
import {useActiveColor} from '@/hooks/useActiveColor';
import {AppText} from '@/components/AppText';

export const QrCodesList = () => {
	const activeColor = useActiveColor()
	const {data, isError, isLoading, refetch, isFetching} = useGetQrCodesListQuery()

	if (isError) {
		Toast.show({type: 'error', text1: 'Some error'})
	}

	return (
		isLoading ?
			<ActivityIndicator style={{marginTop: 20}} color={activeColor.textPrimary} size={'large'}/> :
			!data.length ?
				<AppText style={{alignSelf: 'center', marginTop: 20, fontSize: 24}}>No data</AppText> :
				<FlatList
					data={data}
					refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
					renderItem={({item}) =>
						<ListItem code={item}/>
					}
				/>
	)
}