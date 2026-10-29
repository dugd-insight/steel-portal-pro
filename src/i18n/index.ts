import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import ru from './locales/ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      es: { translation: es },
      fr: { translation: fr },
      ar: { translation: ar },
      ru: { translation: ru },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // 默认中文：优先读用户已保存的选择，否则按 html lang="zh" 回退中文
      order: ['localStorage', 'htmlTag'],
      caches: ['localStorage'],
    },
    returnObjects: true,
    react: {
      useSuspense: false,
    },
  });

export default i18n;
