import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useActiveColor} from '@/hooks/useActiveColor';
import {AppInput} from '@/components/AppInput';
import {AppButton} from '@/components/AppButton';
import {AppText} from '@/components/AppText';
import {Controller, useForm} from 'react-hook-form';
import {RegistrationForm} from '@/screens/AuthScreens/RegistrationScreen/types';
import {useRegisterMutation} from '@/store/api/auth';
import Toast from 'react-native-toast-message';

export default ({navigation}) => {
	const activeTheme = useActiveColor()
	const [registrationMutation, {isLoading}] = useRegisterMutation()
	const {control, handleSubmit, watch, formState: {errors}} = useForm<RegistrationForm>({
		defaultValues: {
			first_name: '',
			last_name: '',
			phone_number: '',
			password: '',
			confirmPassword: ''
		}
	})

	const password = watch("password", "");

	const submitForm = async ({confirmPassword, ...form}: RegistrationForm) => {
		try {
			const result = await registrationMutation(form).unwrap()
			Toast.show({type: 'success', text1: 'Account created successfully', text2: 'Please log in'})
			navigation.navigate('Login')
		} catch (e) {
			console.log(e)
			Toast.show({type: 'error', text1: e.data.detail || 'Something went wrong!'})
		}
	}

	return (
		<SafeAreaProvider style={{backgroundColor: activeTheme.backgroundPrimary}}>
			<ScrollView contentContainerStyle={styles.container}>
				<AppText style={styles.headerText}>Sign Up</AppText>
				<Controller
					control={control}
					rules={{
						required: 'This field is required',
						min: 0
					}}
					name={'first_name'}
					render={({field: {value, onChange}}) => (
						<AppInput
							label={'First name'}
							placeholder={'Please enter first name'}
							value={value}
							clearButton={false}
							errorMessage={errors?.first_name?.message}
							containerStyles={{minHeight: 90}}
							onChangeText={onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					render={({field: {value, onChange}}) => (
						<AppInput
							label={'Last name'}
							placeholder={'Please enter last name'}
							value={value}
							clearButton={false}
							containerStyles={{minHeight: 75}}
							onChangeText={onChange}
						/>
					)}
					name={'last_name'}
				/>
				<Controller
					control={control}
					rules={{
						required: 'This field is required'
					}}
					render={({field: {value, onChange}}) => (
						<AppInput
							label={'Phone number'}
							placeholder={'Please phone number'}
							value={value}
							clearButton={false}
							containerStyles={{minHeight: 90}}
							errorMessage={errors?.phone_number?.message}
							onChangeText={onChange}
							type={'phone-pad'}
						/>
					)}
					name={'phone_number'}
				/>
				<Controller
					control={control}
					rules={{
						required: 'This field is required'
					}}
					render={({field: {value, onChange}}) => (
						<AppInput
							label={'Password'}
							placeholder={'Please enter password'}
							value={value}
							clearButton={false}
							containerStyles={{minHeight: 90}}
							errorMessage={errors?.password?.message}
							onChangeText={onChange}
							secureText={true}
						/>
					)}
					name={'password'}
				/>
				<Controller
					control={control}
					rules={{
						validate: (value) =>
							value === password || "The passwords do not match"
					}}
					render={({field: {value, onChange}}) => (
						<AppInput
							label={'Confirm password'}
							placeholder={'Please enter password'}
							value={value}
							clearButton={false}
							containerStyles={{minHeight: 90}}
							errorMessage={errors?.confirmPassword?.message}
							onChangeText={onChange}
							secureText={true}
						/>
					)}
					name={'confirmPassword'}
				/>
				<AppButton
					title={'Enter'}
					onClick={handleSubmit(submitForm)}
					btnStyles={styles.loginBtn}
					loader={isLoading}
				/>
				<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
					<View style={{backgroundColor: activeTheme.textSecondary, ...styles.divider}}></View>
					<AppText style={styles.textMini}>Don't have an account?</AppText>
					<View style={{backgroundColor: activeTheme.textSecondary, ...styles.divider}}></View>
				</View>
				<AppButton
					title={'Sign in'}
					onClick={() => {
						navigation.navigate('Login')
					}}
					btnStyles={{borderColor: activeTheme.textSecondary, ...styles.signUpBtn}}
				/>
			</ScrollView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	headerText: {
		textAlign: 'center',
		fontSize: 30,
		marginBottom: 20
	},
	container: {
		flex: 1,
		marginHorizontal: 10,
		justifyContent: 'center',
	},
	divider: {
		height: 1,
		flex: 1,
	},
	textMini: {
		marginHorizontal: 10
	},
	signUpBtn: {
		flex: 0,
		backgroundColor: 'transparent',
		borderWidth: 2,
		marginHorizontal: 0,
		borderRadius: 100,
	},
	loginBtn: {
		flex: 0,
		marginHorizontal: 0,
		borderRadius: 100,
		marginTop: 40
	}
})