import { useState, useEffect, useCallback } from 'react';
import { SupportedLanguage } from '../types/index.js';

const languageVoiceMap: Record<SupportedLanguage, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
};

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (text: string, lang: SupportedLanguage = 'en') => {
      if (!isSupported) {
        console.warn('Speech synthesis is not supported on this browser.');
        return;
      }

      // Cancel any ongoing speech
      stop();

      const cleanText = text.replace(/[*_#`[\]()]/g, '').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = languageVoiceMap[lang] || 'en-IN';
      utterance.rate = 0.95; // Slightly slower for clear rural comprehension
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [isSupported, stop]
  );

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
  };
};
