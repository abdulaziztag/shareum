import {Text, View} from 'react-native';
import {AppButton} from '@/components/AppButton';
import {deleteTokens} from '@/helpers/tokens';
import {useAppDispatch} from '@/hooks/storeHooks';
import {changeIsLoggedIn} from '@/store/features/utilsSlice';
import {setTokens} from '@/store/features/authSlice';

export default ({navigation, name}) => {
	const dispatch = useAppDispatch()

	return (<View style={{flex: 1, paddingTop: 30}}>
		<Text>This is Nice's profile</Text>
		<AppButton
			title={'Log out'}
			onClick={async () => {
				await deleteTokens()
				dispatch(changeIsLoggedIn(false))
				dispatch(setTokens({access: '', refresh: ''}))
			}
		} />
	</View>);
};