import {createSlice} from '@reduxjs/toolkit';

type utilsType = {
	isLoggedIn: boolean
	error: string
}

const initialState: utilsType = {
	isLoggedIn: false,
	error: ''
}

export const utilsSlice = createSlice({
	name: 'utils',
	initialState,
	reducers: {
		changeIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload
		},
		changeError: (state, action) => {
			state.error = action.payload
		}
	}
})

export const {changeIsLoggedIn, changeError} = utilsSlice.actions