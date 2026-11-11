import React, { useState } from 'react';
import { FertilizerForm, FertilizerFormValues } from '../components/fertilizer/FertilizerForm.js';
import { FertilizerResultCard } from '../components/fertilizer/FertilizerResultCard.js';
import { apiClient } from '../services/api.js';
import { FertilizerResponse } from '../types/index.js';
import { ErrorMessage } from '../components/common/ErrorMessage.js';
import { FlaskConical } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext.js';

export const FertilizerAdvisoryPage: React.FC = () => {
  const { language } = useTranslation();
  const [result, setResult] = useState<FertilizerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (values: FertilizerFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await apiClient.post('/advisory/fertilizer', {
        ...values,
        language,
      });

      if (response.data?.success && response.data?.data?.result) {
        setResult(response.data.data.result);
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to calculate fertilizer recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <FlaskConical className="w-7 h-7 text-amber-600" />
          Fertilizer & Soil Nutrition Advisory
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Optimize crop nutrient supply by combining organic amendments with balanced chemical NPK application.
        </p>
      </div>

      {errorMsg && (
        <ErrorMessage
          title="Fertilizer Calculation Failed"
          message={errorMsg}
          onRetry={() => setErrorMsg(null)}
        />
      )}

      <FertilizerForm onSubmit={handleSubmit} isLoading={loading} />

      {result && <FertilizerResultCard data={result} />}
    </div>
  );
};

