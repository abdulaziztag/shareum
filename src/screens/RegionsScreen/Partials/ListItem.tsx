import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useActiveColor} from '@/hooks/useActiveColor';
import {AppIcon} from '@/components/AppIcon';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ListItemProps} from '../types';
import {useDispatch} from 'react-redux';
import {changeOne} from '@/store/features/regionsSlice';

export const ListItem = ({name, id, slug, state}: ListItemProps) => {
	const activeTheme = useActiveColor()
	const dispatch = useDispatch()

	const styles = StyleSheet.create({
		listItem: {
			alignItems: 'center',
			flexDirection: 'row',
			marginTop: 5,
			paddingVertical: 10,
			justifyContent: 'space-between',
			paddingLeft: 10,
			paddingRight: 20
		},
		regionName: {
			fontSize: 20,
			fontFamily: 'Poppins_400Regular',
			color: activeTheme.textPrimary,
			marginLeft: 20
		}
	})

	const changeCheckboxState = () => {
		dispatch(changeOne(id))
	}

 	return (
		<Pressable
			style={
				({pressed}) => ({
					...styles.listItem,
					backgroundColor: pressed ? activeTheme.backgroundSecondary : activeTheme.backgroundPrimary
				})
			}
			onPress={changeCheckboxState}
		>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<AppIcon id={slug} size={35}/>
				<Text style={styles.regionName}>{name}</Text>
			</View>
			{state && <MaterialCommunityIcons name="check" size={25} style={{color: 'orange'}} />}
		</Pressable>
	)
}