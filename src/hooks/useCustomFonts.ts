import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  return useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
};
