import React from 'react';
import { IrrigationResponse } from '../../types/index.js';
import {
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Layers,
  ShieldAlert,
  Info,
} from 'lucide-react';

export const IrrigationResultCard: React.FC<{ data: IrrigationResponse }> = ({ data }) => {
  return (
    <div className="space-y-6 mt-8">
      {/* Overview Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Crop: {data.crop_name} • Water Requirement: {data.water_requirement.toUpperCase()}
            </span>
            <h3 className="text-base font-bold text-emerald-950 mt-2">{data.assessment}</h3>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Droplets className="w-4 h-4 text-emerald-600" />
          <span>Recommended Method: {data.recommended_irrigation_method}</span>
        </div>
      </div>

      {/* Monitoring & Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Soil Moisture Monitoring */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900">Soil Moisture Field Monitoring</h4>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
            {data.soil_moisture_monitoring}
          </p>

          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-2">
            Actionable Irrigation Schedule:
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {data.irrigation_guidance?.map((guidance, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{guidance}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Water Conservation */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">Water Conservation Techniques</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {data.water_conservation_methods?.map((method, i) => (
              <li key={i} className="flex items-start gap-2 p-2 bg-indigo-50/50 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                <span>{method}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual Diagnostic Indicators: Overwatering vs Underwatering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Signs of Under-irrigation */}
        <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Signs of Moisture Stress (Under-irrigation)
          </h4>
          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
            {data.underwatering_signs?.map((sign, i) => (
              <li key={i}>{sign}</li>
            ))}
          </ul>
        </div>

        {/* Signs of Over-irrigation */}
        <div className="bg-white border border-rose-200 rounded-2xl p-5 shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Signs of Waterlogging (Over-irrigation)
          </h4>
          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
            {data.overwatering_signs?.map((sign, i) => (
              <li key={i}>{sign}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

