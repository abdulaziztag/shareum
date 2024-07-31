import * as SecureStore from 'expo-secure-store';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../assets/languages/en.json';
import ru from '../../assets/languages/ru.json';
import uz from '../../assets/languages/uz.json';

const resources = {
  en: {
    translation: en,
  },
  uz: {
    translation: uz,
  },
  ru: {
    translation: ru,
  },
};

const defineLang = async () => {
  let storeLang = await SecureStore.getItemAsync('lang');
  if (!storeLang) {
    storeLang = 'en';
  }
  return storeLang;
};

defineLang().then((lng) => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng,
      fallbackLng: 'en',

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
});
