import {StyleSheet, View, Text, ImageBackground, StatusBar} from 'react-native';

export const Card = ({total, available}: {total: number, available: number}) => {
	return (
		<ImageBackground style={styles.card} source={require('../../../assets/cardBackground2.jpg')}
										 imageStyle={{borderRadius: 13, resizeMode: 'center'}}>
			<View style={{alignItems: 'center'}}>
				<Text style={styles.cardItemTitle}>Total</Text>
				<Text style={styles.cardItemNumber}>${total.toFixed(2)}</Text>
			</View>
			<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
				<View style={{alignItems: 'center'}}>
					<Text style={styles.cardItemTitle}>Available</Text>
					<Text style={styles.cardItemNumber}>${available.toFixed(2)}</Text>
				</View>
				<View style={{alignItems: 'center'}}>
					<Text style={styles.cardItemTitle}>Withdrawn</Text>
					<Text style={styles.cardItemNumber}>0</Text>
				</View>
			</View>
		</ImageBackground>
 	)
}

const styles = StyleSheet.create({
	card: {
		height: 200,
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'space-around',
		marginTop: 20
	},
	cardItemTitle: {
		color: '#fff',
		fontFamily: 'Poppins_400Regular',
		fontSize: 16,
		opacity: .8
	},
	cardItemNumber: {
		color: '#fff',
		fontSize: 28,
		fontFamily: 'Poppins_600SemiBold',
		fontWeight: 'bold'
	}
})