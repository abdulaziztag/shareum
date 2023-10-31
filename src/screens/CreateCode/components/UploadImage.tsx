import * as ImagePicker from 'expo-image-picker';
import {View, Image} from 'react-native';
import {useState} from 'react';
import {AppButton} from '@/components/AppButton';
import {useActiveColor} from '@/hooks/useActiveColor';
import {AppIconButton} from '@/components/AppIconButton';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export const UploadImage = ({pickedImage}: {pickedImage: (imgUrl: Blob) => void}) => {
	const activeTheme = useActiveColor()
	const [image, setImage] = useState(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: false,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			const getImg = await fetch(result.assets[0].uri)
			const blob = await getImg.blob()
			pickedImage(blob)
			setImage(result.assets[0].uri)
		}
	};

	const removeImage = () => {
		pickedImage(null)
		setImage(null)
	}

	return (
		<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
			<View style={{justifyContent: 'flex-start', flexDirection: 'row', flex: 1}}>
				<AppButton title="Select image" onClick={pickImage}
									 btnStyles={{flex: 0, paddingHorizontal: 10, backgroundColor: activeTheme.textPrimary}}
									 textStyles={{fontSize: 16, color: activeTheme.backgroundPrimary}} />
				{image && <AppIconButton onClick={removeImage} iconBtnStyles={{backgroundColor: activeTheme.error}}
												containerStyles={{flex: 0}}>
					<MaterialCommunityIcons name={'delete'} size={30} color={'#fff'}/>
				</AppIconButton>}
			</View>
			{image && <Image source={{uri: image}} style={{
				width: 75,
				height: 75,
				borderRadius: 100,
				marginHorizontal: 10,
				borderColor: activeTheme.textPrimary,
				borderWidth: 1
			}}/>}
		</View>
	)
}