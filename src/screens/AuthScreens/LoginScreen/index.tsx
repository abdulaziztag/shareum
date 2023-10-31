import {ScrollView, StyleSheet, View} from 'react-native';
import {useActiveColor} from '@/hooks/useActiveColor';
import {AppInput} from '@/components/AppInput';
import {Controller, useForm} from 'react-hook-form';
import {LoginForm} from './types';
import {AppButton} from '@/components/AppButton';
import {useAppDispatch} from '@/hooks/storeHooks';
import {changeIsLoggedIn} from '@/store/features/utilsSlice';
import {useLoginMutation} from '@/store/api/auth';
import {setTokens} from '@/helpers/tokens';
import Toast from 'react-native-toast-message';
import {AppText} from '@/components/AppText';

export default ({navigation}) => {
	const activeTheme = useActiveColor()
	const dispatch = useAppDispatch()
	const [loginMutation, {isLoading}] = useLoginMutation()
	const {control, handleSubmit, formState: {errors}} = useForm<LoginForm>({
		defaultValues: {
			password: '',
			phoneNumber: ''
		}
	})

	const submitData = async (formData: LoginForm) => {
		try {
			const result = await loginMutation(formData).unwrap()
			const {access, refresh} = result as { access: string; refresh: string };
			dispatch(changeIsLoggedIn(true))
			await setTokens(access, refresh)
		} catch (e) {
			Toast.show({type: 'error', text1: e.data.detail ?? 'Something went wrong :('})
		}
	}

	return (
		<View style={{backgroundColor: activeTheme.backgroundPrimary, flex: 1}}>
			<ScrollView contentContainerStyle={styles.container}>
				<AppText style={styles.headerText}>Login</AppText>
				<Controller
					control={control}
					name="phoneNumber"
					rules={{
						required: 'This field is required',
						min: 0
					}}
					render={({field: {value, onChange}}) => (
						<AppInput
							label="Phone number"
							value={value}
							onChangeText={onChange}
							placeholder="Enter phone number"
							containerStyles={{minHeight: 85}}
							type={'phone-pad'}
							errorMessage={errors?.phoneNumber?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="password"
					rules={{
						required: 'This field is required',
						min: 0
					}}
					render={({field: {value, onChange}}) => (
						<AppInput
							label="Password"
							value={value}
							onChangeText={onChange}
							placeholder="Enter password"
							containerStyles={{minHeight: 85}}
							secureText={true}
							errorMessage={errors?.password?.message}
						/>
					)}
				/>
				<AppButton
					title={'Enter'}
					onClick={handleSubmit(submitData)}
					btnStyles={styles.loginBtn}
					loader={isLoading}
				/>
				<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
					<View style={[styles.divider, {backgroundColor: activeTheme.textSecondary}]}></View>
					<AppText style={{marginHorizontal: 10}}>Don't have an account?</AppText>
					<View style={[styles.divider, {backgroundColor: activeTheme.textSecondary}]}></View>
				</View>
				<AppButton
					title={'Sign up'}
					onClick={() => {
						navigation.navigate('SignUp')
					}}
					btnStyles={{borderColor: activeTheme.textSecondary, ...styles.signUpBtn}}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 10,
		justifyContent: 'center',
	},
	headerText: {
		textAlign: 'center',
		fontSize: 30,
		marginBottom: 20
	},
	divider: {
		height: 1,
		flex: 1,
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