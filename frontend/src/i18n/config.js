import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import my from './locales/my.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      my: { translation: my },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'my'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// Ensure lang attribute is set after i18n initialization
i18n.on('initialized', () => {
  document.documentElement.lang = i18n.language;
});

// Set initial lang attribute (fallback)
if (document.documentElement.lang !== i18n.language) {
  document.documentElement.lang = i18n.language;
}

export default i18n;
