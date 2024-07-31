import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton, AppButtonToggle, AppText } from '@/components/_index';
import { deleteTokens } from '@/helpers/_index';
import { useAppDispatch } from '@/hooks/_index';
import { setTokensAction } from '@/store/features/authSlice';
import { changeIsLoggedIn } from '@/store/features/utilsSlice';

const languages = [
  {
    title: '🇬🇧 English',
    id: 'en',
  },
  {
    title: '🇺🇿 O\'zbek',
    id: 'uz',
  },
  {
    title: '🇷🇺 Русский',
    id: 'ru',
  },
];

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const changeLanguage = async (activeId: number) => {
    await i18n.changeLanguage(languages[activeId].id);
    await SecureStore.setItemAsync('lang', languages[activeId].id);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
      <AppButton
        translatable
        title="logOut"
        onClick={async () => {
          await deleteTokens();
          dispatch(changeIsLoggedIn(false));
          dispatch(setTokensAction({ access: '', refresh: '' }));
        }}
      />
      <AppButtonToggle
        onChange={changeLanguage}
        initialActiveButtonId={languages.findIndex((lang) => i18n.language === lang.id)}>
        {languages.map((lang) => (
          <AppText key={lang.id}>{lang.title}</AppText>
        ))}
      </AppButtonToggle>
    </SafeAreaView>
  );
};
