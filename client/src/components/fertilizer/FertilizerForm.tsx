import React from 'react';
import { useForm } from 'react-hook-form';
import { FlaskConical } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

export interface FertilizerFormValues {
  cropName: string;
  growthStage: string;
  soilType: string;
  soilPh?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  landArea: number;
  landAreaUnit: 'acre' | 'hectare' | 'bigha' | 'guntha';
  previousFertilizerUsage?: string;
  fertilizerPreference: 'organic' | 'conventional' | 'integrated';
}

interface FertilizerFormProps {
  onSubmit: (values: FertilizerFormValues) => void;
  isLoading: boolean;
}

export const FertilizerForm: React.FC<FertilizerFormProps> = ({ onSubmit, isLoading }) => {
  const { profile } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<FertilizerFormValues>({
    defaultValues: {
      cropName: 'Wheat',
      growthStage: 'Tillering (20-25 days after sowing)',
      soilType: profile?.soil_type || 'Loamy soil',
      soilPh: 6.5,
      nitrogen: 220,
      phosphorus: 20,
      potassium: 150,
      landArea: profile?.land_area || 2,
      landAreaUnit: (profile?.land_area_unit as any) || 'acre',
      previousFertilizerUsage: 'Basal DAP applied at sowing (50 kg/acre)',
      fertilizerPreference: 'integrated',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-600" />
            Fertilizer & Balanced Nutrient Prescription
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Calculate crop stage-specific nutrient requirements (Organic, Bio, & Chemical NPK)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Target Crop *</label>
          <input
            type="text"
            {...register('cropName', { required: 'Crop name is required' })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. Wheat, Rice, Cotton, Tomato"
          />
          {errors.cropName && <p className="text-[11px] text-red-600 mt-1">{errors.cropName.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Current Growth Stage *</label>
          <input
            type="text"
            {...register('growthStage', { required: 'Growth stage is required' })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. Sowing / Tillering / Flowering"
          />
          {errors.growthStage && <p className="text-[11px] text-red-600 mt-1">{errors.growthStage.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Soil Classification *</label>
          <select
            {...register('soilType', { required: true })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option value="Loamy soil">Loamy soil</option>
            <option value="Alluvial soil">Alluvial soil</option>
            <option value="Black soil">Black soil</option>
            <option value="Red soil">Red soil</option>
            <option value="Sandy loam">Sandy loam</option>
            <option value="Clay loam">Clay loam</option>
          </select>
        </div>
      </div>

      {/* Soil Nutrients */}
      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
        <p className="text-xs font-bold text-slate-800 mb-2">Soil Test Parameters (Optional)</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Soil pH</label>
            <input
              type="number"
              step="0.1"
              {...register('soilPh', { valueAsNumber: true })}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
              placeholder="e.g. 6.8"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Nitrogen (kg/ha)</label>
            <input
              type="number"
              {...register('nitrogen', { valueAsNumber: true })}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
              placeholder="e.g. 250"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Phosphorus (kg/ha)</label>
            <input
              type="number"
              {...register('phosphorus', { valueAsNumber: true })}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
              placeholder="e.g. 22"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Potassium (kg/ha)</label>
            <input
              type="number"
              {...register('potassium', { valueAsNumber: true })}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
              placeholder="e.g. 175"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Land Area *</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              {...register('landArea', { required: true, valueAsNumber: true, min: 0.1 })}
              className="w-2/3 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="2"
            />
            <select
              {...register('landAreaUnit')}
              className="w-1/3 px-2 py-2 text-sm border border-slate-200 rounded-lg bg-white"
            >
              <option value="acre">Acres</option>
              <option value="hectare">Hectares</option>
              <option value="bigha">Bigha</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Management Preference *</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 'integrated', label: 'Integrated (Organic + Chemical)' },
              { val: 'organic', label: 'Organic Only (Bio-fertilizers)' },
              { val: 'conventional', label: 'Conventional' },
            ].map((m) => (
              <label
                key={m.val}
                className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 text-xs font-medium"
              >
                <input
                  type="radio"
                  value={m.val}
                  {...register('fertilizerPreference')}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Prior Fertilizer Applications</label>
        <input
          type="text"
          {...register('previousFertilizerUsage')}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          placeholder="e.g. Applied FYM at ploughing, 1 bag Urea at first watering"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? (
            <span>Computing Fertilizer Dosing with Gemini AI...</span>
          ) : (
            <>
              <FlaskConical className="w-5 h-5" />
              Calculate Fertilizer & Nutrition Plan
            </>
          )}
        </button>
      </div>
    </form>
  );
};

