import * as SecureStore from 'expo-secure-store';

export const setTokens = async (access, refresh) => {
	await SecureStore.setItemAsync('accessToken', access)
	await SecureStore.setItemAsync('refreshToken', refresh)
}

export const deleteTokens = async () => {
	await SecureStore.deleteItemAsync('accessToken')
	await SecureStore.deleteItemAsync('refreshToken')
}

export const changeToken = async (type, token) => {
	await SecureStore.setItemAsync(type, token)
}

export const getTokens = async () => {
	const access = await SecureStore.getItemAsync('accessToken')
	const refresh = await SecureStore.getItemAsync('refreshToken')
	return {access, refresh}
}