import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../services/api.js';
import { AdvisoryHistoryItem } from '../types/index.js';
import { LoadingSpinner } from '../components/common/LoadingSpinner.js';
import { EmptyState } from '../components/common/EmptyState.js';
import { ErrorMessage } from '../components/common/ErrorMessage.js';
import {
  History,
  Sprout,
  ScanHeart,
  FlaskConical,
  Droplets,
  Trash2,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const HistoryListPage: React.FC = () => {
  const [items, setItems] = useState<AdvisoryHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      let url = `/history?page=${page}&pageSize=10`;
      if (selectedType !== 'all') {
        url += `&advisoryType=${selectedType}`;
      }

      const response = await apiClient.get(url);
      if (response.data?.success && response.data?.data) {
        setItems(response.data.data.items);
        setTotalPages(response.data.data.pagination.totalPages);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to load advisory history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, selectedType]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this advisory report?')) return;

    try {
      await apiClient.delete(`/history/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert(`Could not delete record: ${err.message}`);
    }
  };

  const getAdvisoryIcon = (type: string) => {
    switch (type) {
      case 'crop_recommendation':
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'disease_detection':
        return <ScanHeart className="w-5 h-5 text-rose-600" />;
      case 'fertilizer_advisory':
        return <FlaskConical className="w-5 h-5 text-amber-600" />;
      case 'irrigation_advisory':
        return <Droplets className="w-5 h-5 text-blue-600" />;
      default:
        return <History className="w-5 h-5 text-slate-600" />;
    }
  };

  const getAdvisoryTitle = (type: string) => {
    switch (type) {
      case 'crop_recommendation':
        return 'Crop Suitability Advisory';
      case 'disease_detection':
        return 'Disease & Pest Diagnostic Report';
      case 'fertilizer_advisory':
        return 'Fertilizer Application Plan';
      case 'irrigation_advisory':
        return 'Water & Irrigation Advisory';
      default:
        return 'Agricultural Advisory';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <History className="w-7 h-7 text-emerald-600" />
            Advisory Records & History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Access previous AI crop recommendations, disease scans, and fertilizer guides
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPage(1);
            }}
            className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="all">All Advisory Types</option>
            <option value="crop_recommendation">Crop Recommendation</option>
            <option value="disease_detection">Disease Detection</option>
            <option value="fertilizer_advisory">Fertilizer Advisory</option>
            <option value="irrigation_advisory">Irrigation Advisory</option>
          </select>
        </div>
      </div>

      {errorMsg && (
        <ErrorMessage title="Error" message={errorMsg} onRetry={fetchHistory} />
      )}

      {loading ? (
        <LoadingSpinner message="Retrieving previous advisory records..." />
      ) : items.length === 0 ? (
        <EmptyState
          title="No Advisory Records Found"
          description="You haven't generated any advisory reports matching this filter yet."
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-emerald-300 transition flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                  {getAdvisoryIcon(item.advisory_type)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {getAdvisoryTitle(item.advisory_type)}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span>
                      {new Date(item.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span>•</span>
                    <span className="uppercase text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/history/${item.id}`}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center gap-1"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={(e) => handleDelete(item.id, e)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 rounded-lg disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs text-slate-600 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 rounded-lg disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

