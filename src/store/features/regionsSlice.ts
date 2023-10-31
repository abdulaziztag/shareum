import {IRegion} from '@/interfaces/IRegion';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: { regions: Array<IRegion & {state: boolean}> } = {
	regions: [
		{
			name: 'Uzbekistan',
			id: 1,
			slug: 'uz',
			phoneCode: '+998',
			state: true
		},
		{
			name: 'Russia',
			id: 2,
			slug: 'ru',
			phoneCode: '+7',
			state: true
		}
	]
}

export const regionsSlice = createSlice({
	name: 'regions',
	initialState,
	reducers: {
		changeAll: (state, action: PayloadAction<boolean>) => {
			state.regions = state.regions.map(region => ({...region, state: action.payload}))
		},
		changeOne: (state, action: PayloadAction<number>) => {
			const regionIndex = state.regions.findIndex(region => region.id === action.payload)
			const newState = [...state.regions]
			newState[regionIndex].state = !newState[regionIndex].state
			state.regions = newState
		}
	}
})

export const {changeAll, changeOne} = regionsSlice.actions