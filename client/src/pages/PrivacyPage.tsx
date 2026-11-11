import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
          <Shield className="w-8 h-8 text-emerald-600" />
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Last updated: November 2026</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs space-y-5 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
        <p>
          We collect information you provide directly to AgriAssist AI, including:
          name, phone number, geographical location (state, district, village), farm land size, soil classifications, uploaded crop photographs, and advisory queries.
        </p>

        <h2 className="text-base font-bold text-slate-900">2. How We Use Agricultural Data</h2>
        <p>
          Your agricultural information is strictly used to:
          provide tailored crop recommendations, calculate fertilizer schedules, run visual disease diagnostics via Gemini AI, and display historical advisory logs. We do not sell your personal data.
        </p>

        <h2 className="text-base font-bold text-slate-900">3. Artificial Intelligence Processing</h2>
        <p>
          Crop images and agricultural queries are processed server-side through Google Gemini APIs. No personally identifiable information (passwords, tokens, phone numbers) is transmitted into model prompts.
        </p>

        <h2 className="text-base font-bold text-slate-900">4. Data Isolation & Security</h2>
        <p>
          Your account data is secured via Supabase PostgreSQL Row Level Security (RLS). Only authenticated owners can read, update, or delete their farm parcels and advisory reports.
        </p>
      </div>
    </div>
  );
};

