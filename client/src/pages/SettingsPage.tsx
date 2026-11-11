import React from 'react';
import { useTranslation } from '../context/LanguageContext.js';
import { useAuth } from '../context/AuthContext.js';
import { Settings, Globe, Shield, Bell } from 'lucide-react';
import { SupportedLanguage } from '../types/index.js';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const { user, profile } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-7 h-7 text-emerald-600" />
          Settings & Preferences
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Configure regional language, interface preferences, and security settings
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        {/* Language Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Application & AI Advisory Language</h3>
          </div>
          <p className="text-xs text-slate-500">
            Select your preferred regional language for both the user interface and the AI advice responses.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { code: 'en', native: 'English', label: 'English' },
              { code: 'hi', native: 'हिन्दी', label: 'Hindi' },
              { code: 'kn', native: 'ಕನ್ನಡ', label: 'Kannada' },
              { code: 'te', native: 'తెలుగు', label: 'Telugu' },
              { code: 'ta', native: 'தமிழ்', label: 'Tamil' },
              { code: 'ml', native: 'മലയാളം', label: 'Malayalam' },
              { code: 'mr', native: 'मराठी', label: 'Marathi' },
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code as SupportedLanguage)}
                className={`p-3 rounded-xl border text-left transition ${
                  language === lang.code
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <p className="text-sm font-bold">{lang.native}</p>
                <p className="text-[11px] text-slate-500">{lang.label}</p>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Security / Account Overview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Account Security</h3>
          </div>
          <p className="text-xs text-slate-500">
            Authenticated via Supabase Auth. All agricultural data is isolated with PostgreSQL Row Level Security (RLS).
          </p>
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 mt-2">
            <p><span className="font-semibold text-slate-800">Email:</span> {user?.email || 'Demo account'}</p>
            <p className="mt-1"><span className="font-semibold text-slate-800">User ID:</span> {user?.id || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

