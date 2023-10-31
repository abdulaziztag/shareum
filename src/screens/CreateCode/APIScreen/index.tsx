import {AppInput} from '@/components/AppInput';
import {useActiveColor} from '@/hooks/useActiveColor';
import {UploadImage} from '@/screens/CreateCode/components/UploadImage';
import {AppButton} from '@/components/AppButton';
import {Cryptos} from '@/mock/Cryptos';
import {Controller, useForm} from 'react-hook-form';
import {CreateFormTypes} from '@/screens/CreateCode/types';

export default ({chosenCryptoId}: { chosenCryptoId: number }) => {
	const activeTheme = useActiveColor()
	const crypto = Cryptos.find(crypto => crypto.id === chosenCryptoId)

	const {control, handleSubmit, formState: {errors}} = useForm<CreateFormTypes & { keyword }>({
		defaultValues: {
			totalAmount: '',
			perScanAmount: '',
			name: '',
			description: '',
			keyword: ''
		}
	})

	return (
		<>
			<Controller
				control={control}
				name="totalAmount"
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
						hint={`≈ ${(+value * crypto.price).toFixed(2)} USD \n Available: 10 ${crypto.crypto.slug}`}
						type={'numeric'}
						appendText={crypto.crypto.slug}
						clearButton={false}
						containerStyles={{marginTop: 20, paddingHorizontal: 10}}
						errorMessage={errors.totalAmount && errors.totalAmount.message}
					/>
				)}
			/>
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
			<UploadImage/>
			<AppButton title={'Create promo'} onClick={() => {
			}}/>
		</>
	)
}