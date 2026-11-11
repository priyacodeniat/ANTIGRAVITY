import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api.js';
import { AdvisoryHistoryItem } from '../types/index.js';
import { CropRecommendationResults } from '../components/crops/CropRecommendationCard.js';
import { DiseaseResultCard } from '../components/disease/DiseaseResultCard.js';
import { FertilizerResultCard } from '../components/fertilizer/FertilizerResultCard.js';
import { IrrigationResultCard } from '../components/irrigation/IrrigationResultCard.js';
import { LoadingSpinner } from '../components/common/LoadingSpinner.js';
import { ErrorMessage } from '../components/common/ErrorMessage.js';
import { ArrowLeft, Clock, Trash2, Printer } from 'lucide-react';

export const HistoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [record, setRecord] = useState<AdvisoryHistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await apiClient.get(`/history/${id}`);
        if (response.data?.success && response.data?.data) {
          setRecord(response.data.data);
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to retrieve advisory detail.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this advisory record?')) return;
    try {
      await apiClient.delete(`/history/${id}`);
      navigate('/history');
    } catch (err: any) {
      alert(`Could not delete record: ${err.message}`);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading advisory report details..." className="h-64" />;
  }

  if (errorMsg || !record) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <ErrorMessage title="Error" message={errorMsg || 'Record not found.'} />
        <Link to="/history" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
          <ArrowLeft className="w-4 h-4" /> Back to History
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/history"
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition text-slate-700"
            title="Back to history"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl font-black text-slate-900 capitalize">
              {record.advisory_type.replace('_', ' ')}
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              Generated on{' '}
              {new Date(record.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              via {record.ai_model || 'Gemini 2.5'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" /> Print Report
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>

      {/* Render matching view */}
      {record.advisory_type === 'crop_recommendation' && (
        <CropRecommendationResults data={record.response_data as any} />
      )}

      {record.advisory_type === 'disease_detection' && (
        <DiseaseResultCard data={record.response_data as any} />
      )}

      {record.advisory_type === 'fertilizer_advisory' && (
        <FertilizerResultCard data={record.response_data as any} />
      )}

      {record.advisory_type === 'irrigation_advisory' && (
        <IrrigationResultCard data={record.response_data as any} />
      )}
    </div>
  );
};

