import React from 'react';
import { useTranslation } from '../../context/LanguageContext.js';
import { SupportedLanguage } from '../../types/index.js';
import { Globe } from 'lucide-react';

const languages: { code: SupportedLanguage; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm">
      <Globe className="w-4 h-4 text-emerald-700" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
        className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
        aria-label="Select Language"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {compact ? l.native : `${l.native} (${l.label})`}
          </option>
        ))}
      </select>
    </div>
  );
};

