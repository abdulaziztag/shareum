import {useEffect, useState} from 'react';
import {
	StyleSheet,
	Pressable,
	View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {AntDesign} from '@expo/vector-icons';
import {useAppSelector} from '@/hooks/storeHooks';
import {AppInput} from '@/components/AppInput'
import {useActiveColor} from '@/hooks/useActiveColor';
import * as RootNavigation from '@/utils/RootNavigation';
import {CreateFormTypes} from '@/screens/CreateCode/types';
import {AppButton} from '@/components/AppButton';
import Toast from 'react-native-toast-message';
import {UploadImage} from '../components/UploadImage';
import {AppText} from '@/components/AppText';
import {useCreateQrCodeMutation} from '@/store/api/qrCode';
import {useGetBalanceQuery} from '@/store/api/balance';

export default ({chosenCryptoId}: { chosenCryptoId: number }) => {
	const activeTheme = useActiveColor()
	const {data} = useGetBalanceQuery()
	const [createCodeMutation, {isLoading}] = useCreateQrCodeMutation()
	const regions = useAppSelector(state => state.region.regions)
	const crypto = data.find(crypto => crypto.crypto.id === chosenCryptoId)
	const {watch, control, handleSubmit, formState: {errors}} = useForm<CreateFormTypes>({
		defaultValues: {
			totalAmount: '',
			perScanAmount: '',
			name: '',
			description: ''
		}
	});
	const [selectedRegions, setSelectedRegions] = useState('')
	const [imageUri, setImageUri] = useState(null)

	useEffect(() => {
		const selectedRegions = regions.filter(region => region.state)
		const isAll = regions.every(region => region.state)

		if (isAll) setSelectedRegions('All regions selected')
		else if (selectedRegions.length <= 7) {
			setSelectedRegions(selectedRegions.map(region => region.name).join(' ,'))
		} else {
			setSelectedRegions(selectedRegions
				.map(region => region.name)
				.splice(7)
				.join(',') +
				` and ${selectedRegions.length - 7} regions`)
		}
	}, [regions])

	const createQr = async ({totalAmount, perScanAmount, description, name}: CreateFormTypes) => {
		try {
			const qrFormData = new FormData()
			qrFormData.append('balance', totalAmount)
			qrFormData.append('per_user', perScanAmount)
			qrFormData.append('name', name)
			qrFormData.append('description', description)
			qrFormData.append('crypto_network', chosenCryptoId.toString())
			//qrFormData.append('countries', '[]')
			qrFormData.append('image', imageUri, 'image.jpg')
			console.log(imageUri)
			await createCodeMutation(qrFormData).unwrap()
			RootNavigation.navigate('QrList', {})
			//{balance: +totalAmount, per_user: +perScanAmount, name, description, crypto_network: chosenCryptoId, countries: []}
			Toast.show({type: 'success', text1: 'Code created successfully!', text2: 'Check it out in list of codes!'})
		} catch (e) {
			console.log(e)
			Toast.show({
				type: 'error',
				text1: e.data.detail
			})
		}
	}

	return (
		<>
			<Controller
				control={control}
				name="totalAmount"
				rules={{
					required: 'This field is required',
					min: 0
				}}
				render={({field: {onChange, value}}) => (
					<AppInput
						value={value}
						onChangeText={onChange}
						label="Total amount"
						placeholder="Please enter total amount"
						type="numeric"
						hint={`≈ ${(+value * crypto.crypto.price).toFixed(2)} USD \n Available: ${crypto.available} ${crypto.crypto.slug}`}
						appendText={crypto.crypto.slug}
						containerStyles={{marginTop: 20, paddingHorizontal: 10}}
						clearButton={false}
						errorMessage={errors.totalAmount && errors.totalAmount.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name="perScanAmount"
				rules={{
					required: 'This field is required',
					min: 0
				}}
				render={({field: {value, onChange}}) => (
					<AppInput
						value={value}
						onChangeText={onChange}
						label="Per scan"
						placeholder="Please enter amount per scan"
						type="numeric"
						hint={`≈ ${(+value * crypto.crypto.price).toFixed(2)} USD\n Total scans: ${+watch('totalAmount') != 0 && +value != 0 ? Math.floor(+watch('totalAmount') / +value) : 0}`}
						appendText={crypto.crypto.slug}
						containerStyles={{paddingHorizontal: 10,}}
						clearButton={false}
						errorMessage={errors.perScanAmount && errors.perScanAmount.message}
					/>
				)}
			/>
			<View style={[styles.divider, {backgroundColor: activeTheme.textSecondary}]}/>
			<Controller
				control={control}
				name="name"
				rules={{
					required: 'This field is required',
					minLength: 0
				}}
				render={({field: {value, onChange, ref}}) => (
					<AppInput
						value={value}
						onChangeText={onChange}
						label="Name"
						containerStyles={{marginBottom: 20, paddingHorizontal: 10,}}
						placeholder="Please enter QR name"
						errorMessage={errors.name && errors.name.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name="description"
				render={({field: {value, onChange}}) => (
					<AppInput
						value={value}
						onChangeText={onChange}
						label="Description (Optional)"
						placeholder="Please enter QR description"
						isTextArea={true}
						containerStyles={{
							paddingHorizontal: 10,
						}}
						inputStyles={{
							paddingLeft: 10
						}}
					/>
				)}
			/>
			<View style={[styles.divider, {backgroundColor: activeTheme.textSecondary}]}/>
			<Pressable
				style={({pressed}) => ({
					...styles.countriesContainer,
					backgroundColor: pressed ? activeTheme.backgroundSecondary : activeTheme.backgroundPrimary
				})}
				onPress={() => RootNavigation.navigate('Regions', {})}
			>
				<AppText style={styles.countriesTitle}>Available regions</AppText>
				<AntDesign name="right" size={20} color={activeTheme.textPrimary}/>
			</Pressable>
			<View style={{flexDirection: 'row', paddingHorizontal: 10, flexWrap: 'wrap'}}>
				<AppText style={styles.countriesText} secondary>{selectedRegions}</AppText>
			</View>
			<UploadImage pickedImage={setImageUri} />
			<AppButton
				title="Create QR"
				loader={isLoading}
				onClick={handleSubmit(createQr)}
				btnStyles={{marginBottom: 40}}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	divider: {
		width: '100%',
		height: 3,
		marginVertical: 10
	},
	countriesContainer: {
		marginVertical: 5,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	countriesTitle: {
		fontSize: 18
	},
	countriesText: {
		paddingRight: 5,
	}
})