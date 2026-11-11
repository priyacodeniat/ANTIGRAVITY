import React, { useState } from 'react';
import { CropDiseaseForm, DiseaseFormValues } from '../components/disease/CropDiseaseForm.js';
import { DiseaseResultCard } from '../components/disease/DiseaseResultCard.js';
import { apiClient } from '../services/api.js';
import { DiseaseDetectionResponse } from '../types/index.js';
import { ErrorMessage } from '../components/common/ErrorMessage.js';
import { ScanHeart } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext.js';

export const DiseaseDetectionPage: React.FC = () => {
  const { language } = useTranslation();
  const [result, setResult] = useState<DiseaseDetectionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (values: DiseaseFormValues, imageFile: File) => {
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('cropName', values.cropName);
    if (values.growthStage) formData.append('growthStage', values.growthStage);
    if (values.plantPartAffected) formData.append('plantPartAffected', values.plantPartAffected);
    if (values.symptomsObserved) formData.append('symptomsObserved', values.symptomsObserved);
    if (values.additionalObservations) formData.append('additionalObservations', values.additionalObservations);
    formData.append('language', language);

    try {
      const response = await apiClient.post('/advisory/disease-detection', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.success && response.data?.data?.result) {
        setResult(response.data.data.result);
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to analyze crop image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <ScanHeart className="w-7 h-7 text-rose-600" />
          Crop Disease & Pest Diagnostic Lab
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Upload or capture plant photos for instant visual pathogen identification and dual organic & chemical IPM treatment protocols.
        </p>
      </div>

      {errorMsg && (
        <ErrorMessage
          title="Disease Analysis Failed"
          message={errorMsg}
          onRetry={() => setErrorMsg(null)}
        />
      )}

      <CropDiseaseForm onSubmit={handleSubmit} isLoading={loading} />

      {result && <DiseaseResultCard data={result} />}
    </div>
  );
};

