import React from 'react';
import { CropRecommendationResponse, CropRecommendationItem } from '../../types/index.js';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Droplets,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const CropRecommendationResults: React.FC<{ data: CropRecommendationResponse }> = ({ data }) => {
  return (
    <div className="space-y-6 mt-8">
      {/* Summary Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Data Sufficiency: {data.data_sufficiency.toUpperCase()}
            </span>
            <h3 className="text-base font-bold text-emerald-950 mt-2">{data.summary}</h3>
          </div>
        </div>

        {data.missing_information && data.missing_information.length > 0 && (
          <div className="mt-3 text-xs text-amber-800 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Missing soil parameters: </span>
              {data.missing_information.join(', ')}
            </div>
          </div>
        )}
      </div>

      {/* Recommended Crops Cards */}
      <div>
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
          Recommended Crops ({data.recommendations.length})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.recommendations.map((crop, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-300 transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {crop.category}
                  </span>
                  <h5 className="text-lg font-bold text-slate-900">{crop.crop_name}</h5>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-emerald-600">
                    {crop.suitability_score}%
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    Suitability
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{crop.reason}</p>

              {/* Meta metrics */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" /> Duration
                  </p>
                  <p className="font-bold text-slate-800">{crop.growing_duration_days} days</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Droplets className="w-3 h-3" /> Water
                  </p>
                  <p className="font-bold text-slate-800 capitalize">{crop.water_requirement}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3" /> Season
                  </p>
                  <p className="font-bold text-slate-800">{crop.suitable_season}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-slate-800">🌱 Planting: </span>
                  <span className="text-slate-600">{crop.planting_guidance}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800">🌾 Harvesting: </span>
                  <span className="text-slate-600">{crop.harvesting_guidance}</span>
                </div>
                {crop.risks && crop.risks.length > 0 && (
                  <div className="text-amber-800 bg-amber-50/60 p-2 rounded-lg">
                    <span className="font-semibold">⚠️ Potential Risks: </span>
                    <span>{crop.risks.join('; ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Precautions Footer */}
      {data.precautions && data.precautions.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1.5">
          <p className="font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            General Agronomic Precautions:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            {data.precautions.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

