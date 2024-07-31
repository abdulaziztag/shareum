import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { View, Image, Platform } from 'react-native';

import { AppIconButton, AppButton } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';

export const UploadImage = ({
  pickedImage,
}: {
  pickedImage: (img: { uri: string; imgName: string; type: string } | null) => void;
}) => {
  const activeTheme = useActiveTheme();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri =
        Platform.OS === 'ios' ? result.assets[0].uri.replace('file://', '') : result.assets[0].uri;
      const match = /\.(\w+)$/.exec(imageUri || 'image/jpg');
      const type = match ? `image/${match[1]}` : 'image';
      const imgName = imageUri?.split('/').pop() || 'image.jpg';
      pickedImage({ uri: imageUri, type, imgName });
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    pickedImage(null);
    setImage(null);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
      }}>
      <View style={{ justifyContent: 'flex-start', flexDirection: 'row', flex: 1 }}>
        <AppButton
          title="Select image"
          onClick={pickImage}
          btnStyles={{ flex: 0, paddingHorizontal: 10, backgroundColor: activeTheme.textPrimary }}
          textStyles={{ fontSize: 16, color: activeTheme.backgroundPrimary }}
        />
        {image && (
          <AppIconButton
            onClick={removeImage}
            iconBtnStyles={{ backgroundColor: activeTheme.error }}
            containerStyles={{ flex: 0 }}>
            <MaterialCommunityIcons name="delete" size={30} color="#fff" />
          </AppIconButton>
        )}
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 100,
            marginHorizontal: 10,
            borderColor: activeTheme.textPrimary,
            borderWidth: 1,
          }}
        />
      )}
    </View>
  );
};
