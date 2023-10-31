import {View, StyleSheet, Image} from 'react-native';
import React from 'react'
import {useActiveColor} from '@/hooks/useActiveColor';
import {IBalance} from '@/interfaces/IBalance';
import {AppText} from '@/components/AppText';

export const ListItem = ({balancesListItem}: { balancesListItem: IBalance }) => {
	const activeTheme = useActiveColor()

	return (
		<View style={[styles.listContainer, {borderBottomColor: activeTheme.backgroundSecondary}]}>
			<View style={{flexDirection: 'row'}}>
				<View style={styles.listItemIcon}>
					<Image source={{uri: 'http://167.99.240.68:1337/' + balancesListItem.crypto.logo, width: 40, height: 40 }} />
				</View>
				<View style={{flexDirection: 'column'}}>
					<AppText style={styles.textH3}>{balancesListItem.crypto.slug}</AppText>
					<AppText secondary>${balancesListItem.crypto.price}</AppText>
					<AppText style={styles.textNormal}>Available</AppText>
					<AppText secondary>{parseFloat(Number(balancesListItem.available).toFixed(6))}</AppText>
				</View>
			</View>
			<View style={{alignItems: 'flex-end'}}>
				<AppText style={styles.textH3}>{parseFloat(Number(balancesListItem.total).toFixed(6))}</AppText>
				<AppText secondary>${Number((balancesListItem.total * balancesListItem.crypto.price).toFixed(2))}</AppText>
				<AppText style={styles.textNormal}>Freeze</AppText>
				<AppText secondary>{balancesListItem.total - balancesListItem.available}</AppText>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	listContainer: {
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	listItemIcon: {
		marginRight: 10,
	},
	textH3: {
		fontSize: 22,
	},
	textNormal: {
		fontSize: 16,
		marginTop: 10
	},
})