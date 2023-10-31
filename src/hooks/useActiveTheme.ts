import {useColorScheme} from 'react-native';
import {colors} from '@/utils/colors';

export const useActiveColor = () => {
	const colorScheme = useColorScheme();
	return colors[colorScheme]
}