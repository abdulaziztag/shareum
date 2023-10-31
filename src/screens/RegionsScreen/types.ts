import {IRegion} from '../../interfaces/IRegion';

export type selectAllTypes = 'all' | 'partial' | 'none'

export type ListItemProps = {
	state: boolean
} & IRegion

export type ListHeaderProps = {
	inputHandler: (value: string) => void,
	inputValue: string,
}