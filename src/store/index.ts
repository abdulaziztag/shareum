import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {regionsSlice} from './features/regionsSlice';
import {utilsSlice} from './features/utilsSlice';
import {api} from '@/store/api/api';


const reducer = combineReducers({
	[api.reducerPath]: api.reducer,
	region: regionsSlice.reducer,
	utils: utilsSlice.reducer,
})

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([api.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch