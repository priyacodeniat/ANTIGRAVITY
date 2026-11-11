import React from 'react';
import { useForm } from 'react-hook-form';
import { Droplets } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

export interface IrrigationFormValues {
  cropName: string;
  growthStage: string;
  soilType: string;
  waterAvailability: 'low' | 'medium' | 'high';
  irrigationMethod: 'drip' | 'sprinkler' | 'surface_flood' | 'furrow' | 'rain_fed';
  recentRainfall?: string;
  weatherConditions?: string;
}

interface IrrigationFormProps {
  onSubmit: (values: IrrigationFormValues) => void;
  isLoading: boolean;
}

export const IrrigationForm: React.FC<IrrigationFormProps> = ({ onSubmit, isLoading }) => {
  const { profile } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<IrrigationFormValues>({
    defaultValues: {
      cropName: 'Tomato',
      growthStage: 'Flowering & Early Fruit Set',
      soilType: profile?.soil_type || 'Loamy soil',
      waterAvailability: 'medium',
      irrigationMethod: 'drip',
      recentRainfall: 'No rain in last 7 days',
      weatherConditions: 'Warm, dry, 31°C afternoon',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-emerald-600" />
            Crop-Specific Precision Irrigation Advisory
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Optimize water delivery intervals, monitor root-zone moisture, and prevent waterlogging
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
            placeholder="e.g. Tomato, Cotton, Wheat, Sugarcane"
          />
          {errors.cropName && <p className="text-[11px] text-red-600 mt-1">{errors.cropName.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Growth Stage *</label>
          <input
            type="text"
            {...register('growthStage', { required: 'Growth stage is required' })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. Flowering / Vegetative / Grain Filling"
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
            <option value="Black soil">Black soil (High water retention)</option>
            <option value="Red soil">Red soil</option>
            <option value="Sandy loam">Sandy loam (High drainage)</option>
            <option value="Clay loam">Clay loam</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Water Availability Level *</label>
          <select
            {...register('waterAvailability')}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option value="high">High (Adequate Borewell / Perennial Canal)</option>
            <option value="medium">Medium (Rotational Canal / Normal Borewell)</option>
            <option value="low">Low (Water Scarcity / Rainfed Only)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Irrigation Method *</label>
          <select
            {...register('irrigationMethod')}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option value="drip">Drip Irrigation (High efficiency)</option>
            <option value="sprinkler">Sprinkler Irrigation</option>
            <option value="furrow">Furrow Irrigation</option>
            <option value="surface_flood">Surface Flood Irrigation</option>
            <option value="rain_fed">Rainfed / Dryland</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Recent Rainfall</label>
          <input
            type="text"
            {...register('recentRainfall')}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. Heavy rain 2 days ago, or Dry for 10 days"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Current Weather Condition</label>
          <input
            type="text"
            {...register('weatherConditions')}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. Sunny and hot (34°C), or Cloudy with high humidity"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? (
            <span>Evaluating Crop Water Requirement with Gemini AI...</span>
          ) : (
            <>
              <Droplets className="w-5 h-5" />
              Generate Smart Irrigation Guidance
            </>
          )}
        </button>
      </div>
    </form>
  );
};

