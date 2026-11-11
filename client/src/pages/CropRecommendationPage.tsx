import React, { useState } from 'react';
import { CropRecommendationForm, CropFormValues } from '../components/crops/CropRecommendationForm.js';
import { CropRecommendationResults } from '../components/crops/CropRecommendationCard.js';
import { apiClient } from '../services/api.js';
import { CropRecommendationResponse } from '../types/index.js';
import { ErrorMessage } from '../components/common/ErrorMessage.js';
import { Sprout } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext.js';

export const CropRecommendationPage: React.FC = () => {
  const { language } = useTranslation();
  const [result, setResult] = useState<CropRecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (values: CropFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await apiClient.post('/advisory/crop-recommendation', {
        ...values,
        language,
      });

      if (response.data?.success && response.data?.data?.result) {
        setResult(response.data.data.result);
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate crop recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Sprout className="w-7 h-7 text-emerald-600" />
          AI-Based Crop Recommendation
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Match your agricultural conditions with the most resilient, high-yield crops suited for your local soil & climate.
        </p>
      </div>

      {errorMsg && (
        <ErrorMessage
          title="Crop Analysis Failed"
          message={errorMsg}
          onRetry={() => setErrorMsg(null)}
        />
      )}

      <CropRecommendationForm onSubmit={handleSubmit} isLoading={loading} />

      {result && <CropRecommendationResults data={result} />}
    </div>
  );
};

