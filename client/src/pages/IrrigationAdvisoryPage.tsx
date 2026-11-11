import React, { useState } from 'react';
import { IrrigationForm, IrrigationFormValues } from '../components/irrigation/IrrigationForm.js';
import { IrrigationResultCard } from '../components/irrigation/IrrigationResultCard.js';
import { apiClient } from '../services/api.js';
import { IrrigationResponse } from '../types/index.js';
import { ErrorMessage } from '../components/common/ErrorMessage.js';
import { Droplets } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext.js';

export const IrrigationAdvisoryPage: React.FC = () => {
  const { language } = useTranslation();
  const [result, setResult] = useState<IrrigationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (values: IrrigationFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await apiClient.post('/advisory/irrigation', {
        ...values,
        language,
      });

      if (response.data?.success && response.data?.data?.result) {
        setResult(response.data.data.result);
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate irrigation advice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Droplets className="w-7 h-7 text-blue-600" />
          Precision Crop Irrigation Advisory
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Conserve water and maximize root hydration based on your crop growth stage, soil type, and climate.
        </p>
      </div>

      {errorMsg && (
        <ErrorMessage
          title="Irrigation Planning Failed"
          message={errorMsg}
          onRetry={() => setErrorMsg(null)}
        />
      )}

      <IrrigationForm onSubmit={handleSubmit} isLoading={loading} />

      {result && <IrrigationResultCard data={result} />}
    </div>
  );
};

