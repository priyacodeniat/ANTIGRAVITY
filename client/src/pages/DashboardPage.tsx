import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { useTranslation } from '../context/LanguageContext.js';
import { apiClient } from '../services/api.js';
import { AdvisoryHistoryItem } from '../types/index.js';
import {
  Sprout,
  ScanHeart,
  Droplets,
  FlaskConical,
  MessageSquare,
  ArrowRight,
  MapPin,
  Layers,
  History,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { LoadingSpinner } from '../components/common/LoadingSpinner.js';

export const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { t } = useTranslation();
  const [recentAdvisories, setRecentAdvisories] = useState<AdvisoryHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentHistory = async () => {
      try {
        const response = await apiClient.get('/history?pageSize=5');
        if (response.data?.success && response.data?.data?.items) {
          setRecentAdvisories(response.data.data.items);
        }
      } catch (err) {
        console.warn('Could not load history items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentHistory();
  }, []);

  const getAdvisoryIcon = (type: string) => {
    switch (type) {
      case 'crop_recommendation':
        return <Sprout className="w-4 h-4 text-emerald-600" />;
      case 'disease_detection':
        return <ScanHeart className="w-4 h-4 text-rose-600" />;
      case 'fertilizer_advisory':
        return <FlaskConical className="w-4 h-4 text-amber-600" />;
      case 'irrigation_advisory':
        return <Droplets className="w-4 h-4 text-blue-600" />;
      default:
        return <History className="w-4 h-4 text-slate-600" />;
    }
  };

  const getAdvisoryTitle = (type: string) => {
    switch (type) {
      case 'crop_recommendation':
        return 'Crop Suitability Recommendation';
      case 'disease_detection':
        return 'Disease & Pest Diagnostic Scan';
      case 'fertilizer_advisory':
        return 'Fertilizer & Nutrition Schedule';
      case 'irrigation_advisory':
        return 'Precision Irrigation Guidance';
      default:
        return 'Advisory Report';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome & Farmer Profile Overview Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/80 px-2 py-0.5 rounded-full">
                Farmer Command Center
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1">
                {t('dashboard.welcome')}, {profile?.full_name || 'Farmer'}!
              </h2>
            </div>
            <Link
              to="/profile"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold backdrop-blur transition"
            >
              Edit Profile
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-emerald-700/60 text-xs">
            <div>
              <p className="text-emerald-300 text-[10px] font-medium uppercase">Location</p>
              <p className="font-bold text-white flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {profile?.district ? `${profile.district}, ${profile.state}` : 'Not configured'}
              </p>
            </div>
            <div>
              <p className="text-emerald-300 text-[10px] font-medium uppercase">Soil Classification</p>
              <p className="font-bold text-white flex items-center gap-1 mt-0.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                {profile?.soil_type || 'Loamy soil'}
              </p>
            </div>
            <div>
              <p className="text-emerald-300 text-[10px] font-medium uppercase">Land Holding</p>
              <p className="font-bold text-white mt-0.5">
                {profile?.land_area ? `${profile.land_area} ${profile.land_area_unit || 'acres'}` : 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-emerald-300 text-[10px] font-medium uppercase">Active Copilot</p>
              <p className="font-bold text-white mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Google Gemini 2.5
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Advisory Modules */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
          {t('dashboard.quick_actions')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/crop-recommendation"
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-emerald-400 hover:shadow-sm transition group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Crop Suitability</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Recommend crops for your soil chemistry, season & water.
              </p>
            </div>
          </Link>

          <Link
            to="/disease-detection"
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-rose-400 hover:shadow-sm transition group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition">
              <ScanHeart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Disease Lab</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Scan leaf or plant photos with Gemini Multimodal Vision.
              </p>
            </div>
          </Link>

          <Link
            to="/fertilizer-advisory"
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-amber-400 hover:shadow-sm transition group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Fertilizer Plan</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Calculate stage-specific organic and chemical NPK dosing.
              </p>
            </div>
          </Link>

          <Link
            to="/irrigation-advisory"
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-blue-400 hover:shadow-sm transition group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Irrigation Plan</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Evaluate water depletion and optimize delivery intervals.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Kisan AI Assistant Banner Shortcut */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-emerald-950">
              Have an Agricultural Question? Ask Kisan AI Copilot
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Speak or type questions in Hindi, Kannada, Telugu, Tamil, Malayalam, Marathi, or English.
            </p>
          </div>
        </div>

        <Link
          to="/chatbot"
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex-shrink-0"
        >
          Open Kisan AI Copilot
        </Link>
      </div>

      {/* Recent Advisories History */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-600" />
            {t('dashboard.recent_advisories')}
          </h3>
          <Link
            to="/history"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            {t('dashboard.view_all')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner message="Retrieving recent farm advisories..." />
        ) : recentAdvisories.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            {t('dashboard.no_recent')}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentAdvisories.map((item) => (
              <Link
                key={item.id}
                to={`/history/${item.id}`}
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    {getAdvisoryIcon(item.advisory_type)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {getAdvisoryTitle(item.advisory_type)}
                    </h5>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {new Date(item.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

