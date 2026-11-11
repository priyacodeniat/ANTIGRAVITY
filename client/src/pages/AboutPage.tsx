import React from 'react';
import { Sprout, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
          <Sprout className="w-8 h-8 text-emerald-600" />
          About AgriAssist AI
        </h1>
        <p className="text-sm text-slate-600">
          Democratizing precision agriculture for smallholder and medium-scale farmers across India.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-lg font-bold text-slate-900">Our Core Mission</h2>
        <p>
          Indian agriculture is the backbone of the nation, yet millions of farmers face unpredictable climate shifts, soil fertility depletion, disease outbreaks, and water stress. AgriAssist AI was built to put cutting-edge artificial intelligence—specifically multimodal computer vision and agronomic reasoning—directly into farmers' hands via accessible, vernacular-first interfaces.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">How It Works</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Crop Recommendation:</strong> Leverages agro-climatic databases and soil chemistry to recommend crops with verified regional adaptability.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Disease Vision Screening:</strong> Processes leaf photographs using Gemini Vision to detect fungal, bacterial, viral, and pest symptoms.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Balanced Soil Nutrition:</strong> Formulates stage-specific NPK balances to prevent soil degradation and groundwater leaching.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Vernacular Kisan Copilot:</strong> Translates agricultural science into natural conversation across 7 Indian languages.
            </span>
          </li>
        </ul>

        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-start gap-3 mt-6">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <strong>Important Agronomic Disclaimer:</strong> AgriAssist AI is an advisory support tool. It does not replace physical inspection by certified agricultural extension workers, soil testing laboratories, or plant pathologists. Always follow statutory label guidelines for agricultural inputs.
          </div>
        </div>
      </div>
    </div>
  );
};

