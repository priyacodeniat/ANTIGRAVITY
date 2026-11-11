import React from 'react';
import { FertilizerResponse } from '../../types/index.js';
import {
  FlaskConical,
  Sprout,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const FertilizerResultCard: React.FC<{ data: FertilizerResponse }> = ({ data }) => {
  return (
    <div className="space-y-6 mt-8">
      {/* Overview Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Crop: {data.crop_name} • Data Sufficiency: {data.data_sufficiency.toUpperCase()}
            </span>
            <h3 className="text-base font-bold text-emerald-950 mt-2">{data.assessment}</h3>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>Timing & Application Stage: {data.timing}</span>
        </div>
      </div>

      {/* Nutrient Observations */}
      {data.nutrient_observations && data.nutrient_observations.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Nutrient Status & Observations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.nutrient_observations.map((obs, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{obs.nutrient}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    obs.status === 'adequate'
                      ? 'bg-emerald-100 text-emerald-800'
                      : obs.status === 'deficient'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {obs.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">{obs.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fertilizer Options: Organic vs Chemical */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Organic Options */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <h4 className="text-sm font-bold text-emerald-950">Organic & Bio-fertilizer Options</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {data.organic_options?.map((opt, i) => (
              <li key={i} className="flex items-start gap-2 p-2 bg-emerald-50/50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chemical/Inorganic Options */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">Synthetic / Chemical Nutrient Options</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {data.fertilizer_options?.map((opt, i) => (
              <li key={i} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Application Guidance & Precautions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Field Application Guidance & Safety Precautions
        </h4>
        <div className="space-y-2 text-xs text-slate-700">
          {data.application_guidance?.map((guidance, i) => (
            <p key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
              <span>{guidance}</span>
            </p>
          ))}
        </div>

        {data.precautions && data.precautions.length > 0 && (
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mt-4 text-xs text-amber-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Important Precautions:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-amber-800">
              {data.precautions.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

