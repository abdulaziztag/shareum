import {StyleSheet, View} from 'react-native';
import {AppInput} from '@/components/AppInput';
import {useActiveColor} from '@/hooks/useActiveColor';
import {UploadImage} from '@/screens/CreateCode/components/UploadImage';
import {AppButton} from '@/components/AppButton';
import {Controller, useForm} from 'react-hook-form';
import {IPromoCodeForm} from '@/interfaces/IPromoCode';
import {useGetBalanceQuery} from '@/store/api/balance';
import {useCreatePromoCodeMutation} from '@/store/api/promoCode';
import {CreateFormTypes} from '@/screens/CreateCode/types';
import * as RootNavigation from '@/utils/RootNavigation';
import Toast from 'react-native-toast-message';

export default ({chosenCryptoId}: { chosenCryptoId: number }) => {
	const activeTheme = useActiveColor()
	const {data} = useGetBalanceQuery()
	const [createCodeMutation, {isLoading}] = useCreatePromoCodeMutation()
	const crypto = data.find(crypto => crypto.crypto.id === chosenCryptoId)
	const {watch, control, handleSubmit, formState: {errors}} = useForm<IPromoCodeForm>({
		defaultValues: {
			balance: '',
			per_user: '',
			name: '',
			description: '',
			keyword: ''
		}
	})

	const createPromo = async ({balance, per_user, description, name, keyword}: IPromoCodeForm) => {
		try {
			await createCodeMutation({balance, per_user, name, description, crypto_network: chosenCryptoId, keyword}).unwrap()
			RootNavigation.navigate('QrList', {})
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
				name="balance"
				rules={{
					required: 'This field is required',
					min: 0
				}}
				render={({field: {value, onChange}}) => (
					<AppInput
						value={value}
						onChangeText={onChange}
						placeholder={'Please enter total amount'}
						label={'Total amount'}
						hint={`≈ ${(+value * crypto.crypto.price).toFixed(2)} USD \n Available: ${crypto.available} ${crypto.crypto.slug}`}
						type={'numeric'}
						appendText={crypto.crypto.slug}
						clearButton={false}
						containerStyles={{marginTop: 20, paddingHorizontal: 10}}
						errorMessage={errors.balance && errors.balance.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name="per_user"
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
						hint={`≈ ${(+value * crypto.crypto.price).toFixed(2)} USD\n Total scans: ${+watch('balance') != 0 && +value != 0 ? Math.floor(+watch('balance') / +value) : 0}`}
						appendText={crypto.crypto.slug}
						containerStyles={{paddingHorizontal: 10,}}
						clearButton={false}
						errorMessage={errors.per_user && errors.per_user.message}
					/>
				)}
			/>
			<View style={[styles.divider, {backgroundColor: activeTheme.mainColor}]}/>
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
						placeholder="Please enter name"
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
						placeholder="Please enter description"
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
			<Controller
				control={control}
				name="keyword"
				render={({field: {value, onChange, ref}}) => (
					<AppInput
						value={value}
						onChangeText={onChange}
						label="Keyword (Optional)"
						containerStyles={{marginTop: 20, paddingHorizontal: 10,}}
						placeholder="Please keyword"
					/>
				)}
			/>
			<View style={[styles.divider, {backgroundColor: activeTheme.mainColor}]}/>
			<UploadImage/>
			<AppButton
				loader={isLoading}
				title={'Create promo'}
				onClick={handleSubmit(createPromo)}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	divider: {
		width: '100%',
		height: 3,
		marginVertical: 10
	}
})