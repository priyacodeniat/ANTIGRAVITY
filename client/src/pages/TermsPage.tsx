import React from 'react';
import { FileText, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
          <FileText className="w-8 h-8 text-emerald-600" />
          Terms of Service & Agronomic Safety
        </h1>
        <p className="text-xs text-slate-500">Effective Date: November 2026</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs space-y-5 text-sm text-slate-700 leading-relaxed">
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <strong>Critical Safety Warning:</strong> Chemical pest treatments and fertilizer dosages provided by this AI tool are advisory suggestions. Users must strictly verify chemical label directions, Pre-Harvest Intervals (PHI), Personal Protective Equipment (PPE), and statutory local regulations before applying any agricultural chemicals.
          </div>
        </div>

        <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
        <p>
          By creating an account or using AgriAssist AI, you agree to comply with and be bound by these Terms.
        </p>

        <h2 className="text-base font-bold text-slate-900">2. Nature of Advisory Service</h2>
        <p>
          AgriAssist AI provides computational estimations based on farmer-supplied data and artificial intelligence models. It does not provide certified scientific warranties or guarantees of crop yields, profitability, or disease cure.
        </p>

        <h2 className="text-base font-bold text-slate-900">3. User Responsibility</h2>
        <p>
          Farmers and agricultural workers retain full responsibility for verifying field conditions, calibrating spraying equipment, and adhering to safe environmental and water protection practices.
        </p>
      </div>
    </div>
  );
};

