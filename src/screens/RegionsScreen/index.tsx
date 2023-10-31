import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Platform,
	StatusBar,
	FlatList,
	TouchableOpacity
} from 'react-native';
import {useActiveColor} from '@/hooks/useActiveColor';
import {useState} from 'react';
import {ListHeader} from './Partials/ListHeader';
import {ListItem} from './Partials/ListItem';
import {IRegion} from '@/interfaces/IRegion';
import {useAppSelector} from '@/hooks/storeHooks';
import {AppButton} from '@/components/AppButton';
import {useNavigation} from '@react-navigation/native';

export default () => {
	const activeTheme = useActiveColor()
	const navigation = useNavigation()
	const [searchInput, setSearchInput] = useState('')
	const regions = useAppSelector(state => state.region.regions)

	const styles = StyleSheet.create({
		AndroidSafeArea: {
			flex: 1,
			paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
			backgroundColor: activeTheme.backgroundPrimary,
		},
		button: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: 10,
			marginHorizontal: 10,
			marginBottom: 10,
			borderRadius: 5,
			backgroundColor: 'orange'
		},
		btnText: {
			fontSize: 18,
			fontFamily: 'Poppins_400Regular',
			color: activeTheme.textPrimary
		},
	})

	const confirmSelection = () => {
		regions.filter(region => region.state).length && navigation.goBack()
	}

	return (
		<SafeAreaView style={styles.AndroidSafeArea}>
			<FlatList
				renderItem={
					({item}: { item: IRegion & { state: boolean } }) =>
						<ListItem
							key={item.id}
							name={item.name}
							id={item.id}
							state={item.state}
							slug={item.slug}
							phoneCode={item.phoneCode}
						/>
				}
				ListHeaderComponent={
					<ListHeader
						inputHandler={setSearchInput}
						inputValue={searchInput}
					/>
				}
				data={regions}
				style={{
					paddingTop: 10
				}}
			/>
			<View style={{flexDirection: 'row'}}>
				<AppButton
					title={regions.filter(region => region.state).length ? 'Confirm' : 'Select at least one region'}
					onClick={confirmSelection}
					disabled={!regions.filter(region => region.state).length}
				/>
			</View>
		</SafeAreaView>
	)
}