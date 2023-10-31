import {Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import {Card} from './Card';
import {colors} from '@/utils/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as RootNavigation from '@/utils/RootNavigation';
import {AppSkeletonComponent} from '@/components/AppSkeletonLoader';

export const ListHeader = ({total, available}: {total: number, available: number}) => {
	const colorScheme = useColorScheme();
	const activeTheme = colors[colorScheme]

	const styles = StyleSheet.create({
		cardText: {
			color: activeTheme.textPrimary,
			fontFamily: 'Poppins_400Regular',
			fontSize: 22,
			marginTop: 20,
			marginBottom: 15,
		},
		iconButton: {
			alignItems: 'center'
		},
		icon: {
			backgroundColor: activeTheme.textPrimary,
			borderRadius: 100,
			padding: 15,
		},
		buttonText: {
			color: activeTheme.textPrimary,
			fontFamily: 'Poppins_400Regular',
			fontSize: 16,
			marginTop: 5
		}
	})

	return (
		<>
			<Card total={total} available={available} />
			<View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 20}}>
				<Pressable style={styles.iconButton}>
					<View style={styles.icon}>
						<MaterialCommunityIcons color={activeTheme.backgroundPrimary} size={20} name="arrow-expand-up"/>
					</View>
					<Text style={styles.buttonText}>Withdraw</Text>
				</Pressable>
				<Pressable style={styles.iconButton}>
					<View style={styles.icon}>
						<MaterialCommunityIcons color={activeTheme.backgroundPrimary} size={20} name="arrow-collapse-down"/>
					</View>
					<Text style={styles.buttonText}>Deposit</Text>
				</Pressable>
				<TouchableOpacity style={styles.iconButton} onPress={() => RootNavigation.navigate('QrList', {})}>
					<View style={styles.icon}>
						<MaterialCommunityIcons color={activeTheme.backgroundPrimary} size={20} name="share-variant"/>
					</View>
					<Text style={styles.buttonText}>Share</Text>
				</TouchableOpacity>
			</View>
		</>
	)
}