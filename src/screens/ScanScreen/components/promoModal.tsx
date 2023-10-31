import {Modal, StyleSheet, View} from 'react-native';
import {AppCard} from '@/components/AppCard';
import {AppText} from '@/components/AppText';
import {AppButton} from '@/components/AppButton';
import {AppInput} from '@/components/AppInput';
import {useGetPromoPrizeMutation} from '@/store/api/promoCode';
import {useActiveColor} from '@/hooks/useActiveColor';
import {Controller, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';

export const PromoModal = ({modalVisible, closeModal}: { modalVisible: boolean, closeModal: () => void }) => {
	const activeTheme = useActiveColor()
	const [codeSubmitMutation, {isLoading}] = useGetPromoPrizeMutation()

	const {control, setValue, handleSubmit, formState: {errors}} = useForm<{code: string, keyword: string}>({
		defaultValues: {
			code: '',
			keyword: ''
		}
	})

	const submit = async ({code, keyword}) => {
		try {
			const res = await codeSubmitMutation({code, keyword}).unwrap()
			console.log(res)
			Toast.show({type: 'success', text1: 'Successfully got a prize!'})
			setValue('code', '')
		} catch (e) {
			Toast.show({type: 'error', text1: e.data.detail})
		}
	}

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
		>
			<View style={styles.overlay}>
				<Toast />
				<AppCard style={{
					alignSelf: 'center',
					borderRadius: 10,
					width: '90%',
					flexDirection: 'column',
					padding: 0
				}}>
					<AppText style={styles.title} bold>Get prize now!</AppText>
					<Controller
						control={control}
						rules={{
							required: 'This field is required',
							min: 0
						}}
						render={({field: {value, onChange}}) => (
							<AppInput
								value={value}
								placeholder={'Code'}
								onChangeText={onChange}
								onClearClicked={() => setValue('code', '')}
								containerStyles={{marginHorizontal: 10}}
								errorMessage={errors?.code?.message}
							/>
						)}
						name={'code'}
					/>
					<Controller
						control={control}
						rules={{
							required: 'This field is required',
							min: 0
						}}
						render={({field: {value, onChange}}) => (
							<AppInput
								value={value}
								placeholder={'Keyword'}
								onClearClicked={() => setValue('keyword', '')}
								onChangeText={onChange}
								containerStyles={{marginHorizontal: 10}}
								errorMessage={errors?.keyword?.message}
							/>
						)}
						name={'keyword'}
					/>
					<View style={styles.actions}>
						<AppButton onClick={closeModal} title={'Close'} btnStyles={{borderBottomLeftRadius: 10, backgroundColor: activeTheme.backgroundPrimary, ...styles.btnStyles}} />
						<AppButton
							onClick={handleSubmit(submit)}
							title={'Submit'}
							loader={isLoading}
							btnStyles={{borderBottomRightRadius: 10, ...styles.btnStyles}}
						/>
					</View>
				</AppCard>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, .6)',
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		marginVertical: 20,
		fontSize: 25,
		alignSelf: 'center'
	},
	actions: {
		marginTop: 20,
		flexDirection: 'row',
		padding: 0,
	},
	btnStyles: {
		margin: 0,
		borderRadius: 0
	},
	divider: {
		position: 'absolute',
		top: 5,
		width: 50,
		height: 10,
		borderRadius: 10,
		backgroundColor: '#969494'
	}
})