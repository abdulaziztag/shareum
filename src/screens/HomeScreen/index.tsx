import {FlatList, RefreshControl} from 'react-native';
import {ListHeader} from '@/screens/HomeScreen/Partials/ListHeader';
import {ListItem} from '@/screens/HomeScreen/Partials/ListItem';
import {useActiveColor} from '@/hooks/useActiveColor';
import {useGetBalanceQuery} from '@/store/api/balance';
import {IBalance} from '@/interfaces/IBalance';
import {AppText} from '@/components/AppText';
import {SafeAreaView} from 'react-native-safe-area-context';

export default () => {
	const activeTheme = useActiveColor()
	const {data, error, isLoading, isError, isFetching, refetch} = useGetBalanceQuery()

	if (isError) {
		console.log(error)
	}

	return (
		<SafeAreaView
			style={{flex: 1, backgroundColor: activeTheme.backgroundPrimary}}
		>
			{isLoading || isError ?
				<AppText>Loading</AppText> :
				<FlatList<IBalance>
					data={data}
					style={{paddingLeft: 15, paddingRight: 15}}
					ListHeaderComponent={<ListHeader
						total={data.reduce((acc, curr) => acc + curr.total * curr.crypto.price, 0)}
						available={data.reduce((acc, curr) => acc + (curr.available * curr.crypto.price), 0)}
					/>}
					renderItem={({item}) => <ListItem balancesListItem={item}/>}
					keyExtractor={item => item.crypto.slug}
					refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
				/>
			}
		</SafeAreaView>
	)
}