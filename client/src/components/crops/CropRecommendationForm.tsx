import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from '../../context/LanguageContext.js';
import { useAuth } from '../../context/AuthContext.js';
import { VoiceInputButton } from '../common/VoiceInputButton.js';
import { Sprout } from 'lucide-react';

export interface CropFormValues {
  state: string;
  district: string;
  village?: string;
  soilType: string;
  soilPh?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  landArea: number;
  landAreaUnit: 'acre' | 'hectare' | 'bigha' | 'guntha';
  waterAvailability: 'low' | 'medium' | 'high';
  season: 'kharif' | 'rabi' | 'zaid' | 'other';
  temperature?: number;
  rainfall?: number;
  farmingPreference: 'organic' | 'conventional' | 'mixed';
}

interface CropFormProps {
  onSubmit: (values: CropFormValues) => void;
  isLoading: boolean;
}

export const CropRecommendationForm: React.FC<CropFormProps> = ({ onSubmit, isLoading }) => {
  const { t, language } = useTranslation();
  const { profile } = useAuth();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CropFormValues>({
    defaultValues: {
      state: profile?.state || 'Maharashtra',
      district: profile?.district || 'Nashik',
      village: profile?.village || '',
      soilType: profile?.soil_type || 'Black Soil',
      soilPh: 6.8,
      nitrogen: 280,
      phosphorus: 25,
      potassium: 160,
      landArea: profile?.land_area || 3,
      landAreaUnit: (profile?.land_area_unit as any) || 'acre',
      waterAvailability: 'medium',
      season: 'kharif',
      farmingPreference: 'conventional',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            Land & Agro-Climatic Parameters
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in your field characteristics for precise, crop-suitability calculations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* State */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
          <input
            type="text"
            {...register('state', { required: 'State is required' })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. Punjab, Maharashtra"
          />
          {errors.state && <p className="text-[11px] text-red-600 mt-1">{errors.state.message}</p>}
        </div>

        {/* District */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">District *</label>
          <input
            type="text"
            {...register('district', { required: 'District is required' })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. Ludhiana, Pune"
          />
          {errors.district && <p className="text-[11px] text-red-600 mt-1">{errors.district.message}</p>}
        </div>

        {/* Village */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Village (Optional)</label>
          <input
            type="text"
            {...register('village')}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. Rampur"
          />
        </div>
      </div>

      {/* Soil Characteristics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Soil Classification *</label>
          <select
            {...register('soilType', { required: 'Soil type is required' })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option value="Alluvial Soil">Alluvial Soil</option>
            <option value="Black Soil">Black Soil (Regur)</option>
            <option value="Red & Yellow Soil">Red & Yellow Soil</option>
            <option value="Laterite Soil">Laterite Soil</option>
            <option value="Sandy Loam">Sandy Loam</option>
            <option value="Clayey Loam">Clayey Loam</option>
            <option value="Saline Soil">Saline Soil</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Soil pH (0 - 14)</label>
          <input
            type="number"
            step="0.1"
            {...register('soilPh', { valueAsNumber: true, min: 0, max: 14 })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. 6.5"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Water Availability *</label>
          <select
            {...register('waterAvailability')}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option value="low">Low (Rainfed / Scanty)</option>
            <option value="medium">Medium (Canal / Sprinkler)</option>
            <option value="high">High (Perennial / Drip)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Cropping Season *</label>
          <select
            {...register('season')}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option value="kharif">Kharif (Monsoon: Jun - Oct)</option>
            <option value="rabi">Rabi (Winter: Oct - Mar)</option>
            <option value="zaid">Zaid (Summer: Mar - Jun)</option>
            <option value="other">Perennial / Annual</option>
          </select>
        </div>
      </div>

      {/* Optional NPK Test parameters */}
      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
        <p className="text-xs font-bold text-slate-800 mb-2">Soil Nutrient Test Levels (Optional - kg/ha)</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Nitrogen (N)</label>
            <input
              type="number"
              {...register('nitrogen', { valueAsNumber: true })}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
              placeholder="e.g. 280"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Phosphorus (P)</label>
            <input
              type="number"
              {...register('phosphorus', { valueAsNumber: true })}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
              placeholder="e.g. 25"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Potassium (K)</label>
            <input
              type="number"
              {...register('potassium', { valueAsNumber: true })}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
              placeholder="e.g. 180"
            />
          </div>
        </div>
      </div>

      {/* Area & Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Land Area *</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              {...register('landArea', { required: true, valueAsNumber: true, min: 0.1 })}
              className="w-2/3 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="3"
            />
            <select
              {...register('landAreaUnit')}
              className="w-1/3 px-2 py-2 text-sm border border-slate-200 rounded-lg bg-white"
            >
              <option value="acre">Acres</option>
              <option value="hectare">Hectares</option>
              <option value="bigha">Bigha</option>
              <option value="guntha">Guntha</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Farming Preference *</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 'conventional', label: 'Conventional' },
              { val: 'organic', label: 'Certified Organic' },
              { val: 'mixed', label: 'Integrated / Mixed' },
            ].map((opt) => (
              <label
                key={opt.val}
                className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 text-xs font-medium"
              >
                <input
                  type="radio"
                  value={opt.val}
                  {...register('farmingPreference')}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? (
            <span>Analyzing Agro-Climatic Data with Gemini...</span>
          ) : (
            <>
              <Sprout className="w-5 h-5" />
              Analyze Land & Recommend Suitable Crops
            </>
          )}
        </button>
      </div>
    </form>
  );
};

