import {FlatList, RefreshControl, View, Text} from 'react-native';
import {useState} from 'react';
import {useActiveColor} from '@/hooks/useActiveColor';
import {ListItem} from './Partials/ListItem';
import {ListHeader} from './Partials/ListHeader';
import {useGetCryptoListQuery} from '@/store/api/crypto';
import {ICrypto, ICryptoWithNetwork} from '@/interfaces/ICrypto';
import {SafeAreaView} from 'react-native-safe-area-context';

export default () => {
	const activeTheme = useActiveColor()
	const [searchInput, setSearchInput] = useState<string>('')
	const {data, error, isLoading, isError, isFetching, refetch} = useGetCryptoListQuery()
	return (
			<SafeAreaView edges={['left', 'right']} style={{backgroundColor: activeTheme.backgroundPrimary, flex: 1}}>
				{isLoading ?
					<Text>Loading</Text> :
					<FlatList<ICryptoWithNetwork>
						data={data}
						ListHeaderComponent={<ListHeader inputHandler={setSearchInput} inputValue={searchInput}/>}
						renderItem={({item}) => <ListItem crypto={item} key={item.id}/>}
						refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
						keyboardDismissMode="on-drag"
						style={{
							paddingTop: 10,
							paddingHorizontal: 10,
						}}
					/>}
			</SafeAreaView>
	)
}