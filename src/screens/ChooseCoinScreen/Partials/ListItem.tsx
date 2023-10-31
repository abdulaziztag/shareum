import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useActiveColor} from '@/hooks/useActiveColor';
import {ICryptoWithNetwork} from '@/interfaces/ICrypto';
import * as RootNavigation from '@/utils/RootNavigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackType} from '@/types';
import React from 'react';
import {AppText} from '@/components/AppText';

export const ListItem = ({crypto}: { crypto: ICryptoWithNetwork }) => {
	const {params} = useRoute<RouteProp<RootStackType>>()
	const activeTheme = useActiveColor()

	const clickHandler = () => {
		RootNavigation.navigate('CreateCode', {chosenCrypto: crypto.crypto.id, codeType: 'codeType' in params && params.codeType})
	}

	return (
		<TouchableOpacity
			style={[styles.listItem, {borderBottomColor: activeTheme.backgroundSecondary}]}
			onPress={clickHandler}
		>
			<Image source={{uri: crypto.crypto.logo, width: 40, height: 40}}/>
			<View style={styles.cryptoInfo}>
				<AppText style={styles.cryptoId}>{crypto.crypto.slug}</AppText>
				<AppText secondary style={styles.cryptoName}>{crypto.crypto.name}</AppText>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	listItem: {
		borderBottomWidth: 1,
		paddingVertical: 15,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10
	},
	cryptoInfo: {
		marginLeft: 15,
	},
	cryptoId: {
		fontSize: 20
	},
	cryptoName: {
	}
})