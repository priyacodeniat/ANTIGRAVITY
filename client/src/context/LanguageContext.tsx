import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types/index.js';
import en from '../i18n/en.json';
import hi from '../i18n/hi.json';
import kn from '../i18n/kn.json';
import te from '../i18n/te.json';
import ta from '../i18n/ta.json';
import ml from '../i18n/ml.json';
import mr from '../i18n/mr.json';

const translations: Record<SupportedLanguage, Record<string, unknown>> = {
  en,
  hi,
  kn,
  te,
  ta,
  ml,
  mr,
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('agri_pref_lang');
    return (saved as SupportedLanguage) || 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('agri_pref_lang', lang);
  };

  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: unknown = translations[language] || translations['en'];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[key];
      } else {
        // Fallback to English if missing in target language
        let fallbackVal: unknown = translations['en'];
        for (const fKey of keys) {
          if (fallbackVal && typeof fallbackVal === 'object' && fKey in (fallbackVal as Record<string, unknown>)) {
            fallbackVal = (fallbackVal as Record<string, unknown>)[fKey];
          } else {
            return fallback || path;
          }
        }
        return typeof fallbackVal === 'string' ? fallbackVal : fallback || path;
      }
    }

    return typeof current === 'string' ? current : fallback || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

