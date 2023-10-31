import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {useActiveColor} from '@/hooks/useActiveColor';
import {useState} from 'react';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const Square = () => {
	const [height, setHeight] = useState(0)
	const activeTheme = useActiveColor()
	const onLayout=(event)=> {
		const {height} = event.nativeEvent.layout;
		setHeight(height)
	}
	return (
		<View onLayout={onLayout} style={{position: 'absolute', top: 0, bottom: 0, left:0, right: 0}}>
			<View style={{
				height: 250,
				width: 250,
				bottom: (height) / 2 - 125,
				left: screenWidth / 2 - 125,
				position: 'absolute',
				zIndex: 5,
			}}>
				<View style={{
					width: 25,
					height: 25,
					top: -3,
					left: -3,
					borderTopLeftRadius: 7,
					borderLeftWidth: 3,
					borderTopWidth: 3,
					borderColor: activeTheme.warning
				}}></View>
				<View style={{
					width: 25,
					height: 25,
					borderLeftWidth: 3,
					borderBottomWidth: 3,
					borderBottomLeftRadius: 7,
					left: -3,
					bottom: -3,
					position: 'absolute',
					borderColor: activeTheme.warning
				}}></View>
				<View style={{
					width: 25,
					height: 25,
					borderRightWidth: 3,
					borderTopWidth: 3,
					borderTopRightRadius: 7,
					right: -3,
					top: -3,
					position: 'absolute',
					borderColor: activeTheme.warning
				}}></View>
				<View style={{
					width: 25,
					height: 25,
					borderRightWidth: 3,
					borderBottomWidth: 3,
					borderBottomRightRadius: 7,
					right: -3,
					bottom: -3,
					position: 'absolute',
					borderColor: activeTheme.warning
				}}></View>
			</View>

			<View
				style={{
					backgroundColor: 'rgba(0, 0, 0, .5)',
					flex: 1
				}}
			>
			</View>
			<View style={{height: 250, flexDirection: 'row'}}>
				<View style={{flex:1, backgroundColor: 'rgba(0, 0, 0, .5)',}}></View>
				<View style={{width: 250, backgroundColor: 'transparent'}}></View>
				<View style={{flex:1, backgroundColor: 'rgba(0, 0, 0, .5)',}}></View>
			</View>
			<View
				style={{
					backgroundColor: 'rgba(0, 0, 0, .5)',
					flex: 1
				}}
			>
			</View>

			{/*<View style={[styles.qrOverlayX, {top: 0}]}/>
			<View style={[styles.qrOverlayX, {bottom: 0, height: (screenHeight - 158) / 2 - 125}]}/>
			<View style={[styles.qrOverlayY, {left: 0}]}/>
			<View style={[styles.qrOverlayY, {right: 0}]}/>*/}
		</View>
	)
}

const styles = StyleSheet.create({
	qrOverlayX: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: screenHeight / 2 - 125,
		backgroundColor: 'rgba(0, 0, 0, .5)',
	},
	qrOverlayY: {
		position: 'absolute',
		top: screenHeight / 2 - 125,
		height: 250,
		backgroundColor: 'rgba(0, 0, 0, .5)',
		width: screenWidth / 2 - 125,
	},
})