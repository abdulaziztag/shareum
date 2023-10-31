import {AppCard} from '@/components/AppCard';
import {ActivityIndicator, Image, StyleSheet, Switch, Text, View} from 'react-native';
import {IListQrCode} from '@/interfaces/IQRCode';
import React, {useState} from 'react';
import {IListPromoCode} from '@/interfaces/IPromoCode';
import {AppText} from '@/components/AppText';
import * as RootNavigation from '@/utils/RootNavigation'
import {useChangeQrStatusMutation} from '@/store/api/qrCode';
import Toast from 'react-native-toast-message';
import {useChangePromoStatusMutation} from '@/store/api/promoCode';

type componentPropsType = {
	code: IListQrCode | IListPromoCode,
}

export const ListItem = ({code}: componentPropsType) => {
	const [codeStatus, setCodeStatus] = useState(code.status === 'a')
	const [changeQrStatusMutation, qrReqData] = useChangeQrStatusMutation()
	const [changePromoStatusMutation, promoReqData] = useChangePromoStatusMutation()

	const openDetails = () => {
		const isQr = 'code' in code
		if (isQr) {
			RootNavigation.navigate('QrCodeDetails', {codeId: code.id})
		} else {
			RootNavigation.navigate('PromoCodeDetails', {codeId: code.id})
		}
	}

	const changeStatus = async () => {
		try {
			if ('code' in code) {
				const res = await changeQrStatusMutation({codeId: code.id}).unwrap()
				setCodeStatus(res && res?.status === 'a')
			} else {
				const res = await changePromoStatusMutation({codeId: code.id}).unwrap()
				setCodeStatus(res.status === 'a')
			}
		} catch (e) {
			Toast.show({type: 'error', text1: e.data.detail})
		}
	}

	return (
		<AppCard
			style={styles.card}
			onPress={openDetails}
		>
			<View style={[styles.spaceBetween, {marginTop: 0}]}>
				<AppText style={styles.qrName} bold>{code.name}</AppText>
				<View style={styles.spaceBetween}>
					<View
						style={[styles.badge, {backgroundColor: codeStatus ? 'rgba(22, 163, 74, .3)' : 'rgba(220, 38, 38, .5)',}]}>
						<Text style={[styles.badgeText, {color: codeStatus ? '#4ade80' : '#f87171'}]}>
							{codeStatus ? 'active' : 'disabled'}
						</Text>
					</View>
					{qrReqData.isLoading || promoReqData.isLoading ?
						<ActivityIndicator size={31}/> :
						<Switch
							value={codeStatus}
							onChange={changeStatus}
						/>}
				</View>
			</View>
			<View style={styles.spaceBetween}>
				<AppText style={styles.textSecondary} secondary>{code.crypto_network.crypto.slug}</AppText>
				<Image source={{uri: 'http://167.99.240.68:1337' + code.crypto_network.crypto.logo, width: 30, height: 30}}/>
			</View>
			<View style={styles.spaceBetween}>
				<AppText style={styles.textSecondary} secondary>Total amount</AppText>
				<AppText style={styles.textPrimary}>{code.balance} {code.crypto_network.crypto.slug}</AppText>
			</View>
			<View style={styles.spaceBetween}>
				<AppText style={styles.textSecondary} secondary>Available</AppText>
				<AppText style={styles.textPrimary}>{code.current_balance} {code.crypto_network.crypto.slug}</AppText>
			</View>
		</AppCard>
	)
}

const styles = StyleSheet.create({
	card: {
		marginTop: 15
	},
	spaceBetween: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 7
	},
	qrName: {
		fontSize: 20
	},
	textPrimary: {
		fontSize: 16,
	},
	textSecondary: {
		fontSize: 16,
		marginTop: 5,
	},
	badge: {
		marginRight: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	badgeText: {
		textTransform: 'capitalize',
	}
})