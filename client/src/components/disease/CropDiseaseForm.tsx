import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageUploader } from './ImageUploader.js';
import { ScanHeart } from 'lucide-react';

export interface DiseaseFormValues {
  cropName: string;
  growthStage?: string;
  plantPartAffected?: string;
  symptomsObserved?: string;
  additionalObservations?: string;
}

interface CropDiseaseFormProps {
  onSubmit: (values: DiseaseFormValues, image: File) => void;
  isLoading: boolean;
}

export const CropDiseaseForm: React.FC<CropDiseaseFormProps> = ({ onSubmit, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<DiseaseFormValues>({
    defaultValues: {
      cropName: 'Tomato',
      growthStage: 'Vegetative / Flowering',
      plantPartAffected: 'Leaves',
      symptomsObserved: 'Brown concentric spots with yellow halos on lower leaves',
    },
  });

  const onFormSubmit = (data: DiseaseFormValues) => {
    if (!selectedImage) {
      alert('Please select or capture a plant image to diagnose.');
      return;
    }
    onSubmit(data, selectedImage);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ScanHeart className="w-5 h-5 text-emerald-600" />
            Crop Disease & Pest Diagnostic Lab
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Gemini Multimodal Vision analyzes lesion patterns and prescribes organic and IPM remedies
          </p>
        </div>
      </div>

      {/* Image Uploader */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">Crop Image *</label>
        <ImageUploader
          selectedImage={selectedImage}
          onImageSelected={(file) => setSelectedImage(file)}
          onClear={() => setSelectedImage(null)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Crop Name *</label>
          <input
            type="text"
            {...register('cropName', { required: 'Crop name is required' })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. Tomato, Cotton, Wheat, Rice"
          />
          {errors.cropName && <p className="text-[11px] text-red-600 mt-1">{errors.cropName.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Growth Stage</label>
          <select
            {...register('growthStage')}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option value="Seedling / Germination">Seedling / Germination</option>
            <option value="Vegetative">Vegetative</option>
            <option value="Tillering / Branching">Tillering / Branching</option>
            <option value="Flowering">Flowering</option>
            <option value="Fruiting / Pod Formation">Fruiting / Pod Formation</option>
            <option value="Grain Filling / Maturity">Grain Filling / Maturity</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Plant Part Affected</label>
          <select
            {...register('plantPartAffected')}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          >
            <option value="Leaves">Leaves</option>
            <option value="Stem & Branches">Stem & Branches</option>
            <option value="Fruit / Grain / Pod">Fruit / Grain / Pod</option>
            <option value="Roots / Collar">Roots / Collar</option>
            <option value="Entire Plant">Entire Plant</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Observed Symptoms</label>
        <textarea
          rows={2}
          {...register('symptomsObserved')}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          placeholder="Describe lesions, color changes, wilting, curling, insect presence, etc."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? (
            <span>Diagnosing Plant Image with Gemini Multimodal AI...</span>
          ) : (
            <>
              <ScanHeart className="w-5 h-5" />
              Analyze Image & Diagnose Disease
            </>
          )}
        </button>
      </div>
    </form>
  );
};

