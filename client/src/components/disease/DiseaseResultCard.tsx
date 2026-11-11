import React, { useState } from 'react';
import { DiseaseDetectionResponse } from '../../types/index.js';
import {
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Leaf,
  Bug,
  Activity,
  ChevronRight,
  Info,
} from 'lucide-react';

export const DiseaseResultCard: React.FC<{ data: DiseaseDetectionResponse }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'conditions' | 'steps' | 'prevention'>('conditions');

  const getConditionColor = (type: string) => {
    switch (type) {
      case 'disease':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'pest':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'nutrient_deficiency':
        return 'text-blue-800 bg-blue-50 border-blue-200';
      default:
        return 'text-slate-800 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Diagnostic Report
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Crop: {data.crop_name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
              data.image_quality === 'good' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              Image Quality: {data.image_quality}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          {data.overall_assessment}
        </p>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-4 pt-2">
          <button
            onClick={() => setActiveTab('conditions')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition ${
              activeTab === 'conditions'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Suspected Conditions ({data.possible_conditions?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition ${
              activeTab === 'steps'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Immediate Remedial Steps
          </button>
          <button
            onClick={() => setActiveTab('prevention')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition ${
              activeTab === 'prevention'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Long-term Prevention & Cultural Control
          </button>
        </div>

        {/* Tab 1: Possible Conditions */}
        {activeTab === 'conditions' && (
          <div className="space-y-4 pt-2">
            {data.possible_conditions?.map((cond, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getConditionColor(cond.condition_type)}`}>
                      {cond.condition_type.replace('_', ' ')}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{cond.name}</h4>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    cond.confidence === 'high' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {cond.confidence.toUpperCase()} CONFIDENCE
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{cond.explanation}</p>

                {cond.observed_symptoms && cond.observed_symptoms.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold text-slate-700 mb-1">Visual Symptoms Supporting Assessment:</p>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                      {cond.observed_symptoms.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {cond.recommended_actions && cond.recommended_actions.length > 0 && (
                  <div className="bg-emerald-50/80 p-3 rounded-lg border border-emerald-100">
                    <p className="text-[11px] font-bold text-emerald-950 mb-1">Recommended Treatments (Organic & IPM):</p>
                    <ul className="list-disc list-inside text-xs text-emerald-900 space-y-1">
                      {cond.recommended_actions.map((act, idx) => (
                        <li key={idx}>{act}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Immediate Steps */}
        {activeTab === 'steps' && (
          <div className="pt-2 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Immediate Field Actions:</h4>
            {data.immediate_steps?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Prevention */}
        {activeTab === 'prevention' && (
          <div className="pt-2 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Preventive Cultural Practices:</h4>
            {data.preventive_measures?.map((prev, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-700">
                <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{prev}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">Agricultural Advisory Notice: </span>
          {data.disclaimer}
          {data.expert_consultation_recommended && (
            <p className="font-semibold mt-1">
              Field inspection by a local Krishi Vigyan Kendra (KVK) or plant pathologist is strongly recommended.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

