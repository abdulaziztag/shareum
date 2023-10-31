import {ReactNode} from 'react';
import {TextStyle} from 'react-native';

export type AppTextProps = {
	children: ReactNode,
	style?: TextStyle | TextStyle[],
	bold?: boolean,
	secondary?: boolean
}