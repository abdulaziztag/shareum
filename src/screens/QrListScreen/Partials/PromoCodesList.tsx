import {View, Text, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {useGetPromoCodesListQuery} from '@/store/api/promoCode';
import Toast from 'react-native-toast-message';
import {ListItem} from '@/screens/QrListScreen/Partials/ListItem';
import {AppText} from '@/components/AppText';
import {useActiveColor} from '@/hooks/useActiveColor';

export const PromoCodesList = () => {
	const activeColor = useActiveColor()
	const {data, isError, isLoading, refetch, isFetching} = useGetPromoCodesListQuery()

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
					refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
					renderItem={({item}) =>
						<ListItem code={item} />
					}
				/>
	)
}