import i18next from 'i18next';
import { getLangFromCookie } from './lang';

import en from '../locales/en.json';
import fr from '../locales/fr.json';
import es from '../locales/es.json';

i18next.init({
  lng: getLangFromCookie() || 'fr',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;