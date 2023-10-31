import {AppInput} from '@/components/AppInput';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useActiveColor} from '@/hooks/useActiveColor';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ListHeaderProps} from '../types';
import {useAppDispatch, useAppSelector} from '@/hooks/storeHooks';
import {changeAll} from '@/store/features/regionsSlice';

export const ListHeader = ({inputHandler, inputValue}: ListHeaderProps) => {
	const activeTheme = useActiveColor()
	const dispatch = useAppDispatch()
	const regions = useAppSelector(state => state.region.regions)

	const styles = StyleSheet.create({
		allBtn: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingRight: 20,
			paddingHorizontal: 10,
			backgroundColor: activeTheme.backgroundSecondary,
			paddingVertical: 10,
			marginVertical: 5
		},
		allText: {
			color: activeTheme.textPrimary,
			fontFamily: 'Poppins_400Regular',
			fontSize: 20
		}
	})

	const checkboxHandler = () => {
		const isAllChecked = regions.every(region => region.state === true)
		if (isAllChecked) dispatch(changeAll(false))
		else dispatch(changeAll(true))
	}

	return (
		<>
			<AppInput
				value={inputValue}
				placeholder="Search"
				onChangeText={inputHandler}
				prependIcon="search1"
				containerStyles={{
					marginHorizontal: 10
				}}
			/>
			<TouchableOpacity style={styles.allBtn} onPress={checkboxHandler} activeOpacity={.7}>
				<Text style={styles.allText}>Select All</Text>
				{regions.every(region => region.state === true) && <MaterialCommunityIcons name="check" size={25} style={{color: 'orange'}}/>}
			</TouchableOpacity>
		</>
	)
}