import {AppInput} from '@/components/AppInput';
import {Platform} from 'react-native';

export const ListHeader = ({inputHandler, inputValue}: {inputHandler: (value: string) => void, inputValue: string}) => {
	return (
		<>
			<AppInput
				value={inputValue}
				placeholder="Search"
				onChangeText={inputHandler}
				prependIcon="search1"
				containerStyles={{
					paddingTop: Platform.OS === 'android' ? 55: 0,
					marginBottom: 10
				}}
			/>
		</>
	)
}