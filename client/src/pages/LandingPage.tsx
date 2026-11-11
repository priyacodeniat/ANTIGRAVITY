import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  Sprout,
  ScanHeart,
  Droplets,
  FlaskConical,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user, signInWithDemo } = useAuth();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span>Next-Generation Agricultural AI for Indian Farmers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Precision Crop Advisory, Soil Balancing & Disease Diagnosis Powered by <span className="text-emerald-700">Google Gemini AI</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Eliminate guesswork in your fields. Ingest soil characteristics, scan diseased leaves, calculate balanced NPK fertilizer schedules, and chat with our vernacular Kisan AI Copilot.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {user ? (
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2"
            >
              Open Farmer Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2"
              >
                Register as Farmer <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={signInWithDemo}
                className="px-6 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm rounded-xl shadow-xs transition"
              >
                Explore Demo Account
              </button>
            </>
          )}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-slate-900">Comprehensive Advisory Modules</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Science-backed agronomic intelligence built for Indian field realities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Crop Recommendation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find the top five optimal crops based on state, district, soil classification, water availability, and season.
            </p>
            <Link to="/crop-recommendation" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800">
              Try Module <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 bg-rose-100 text-rose-700 rounded-xl flex items-center justify-center">
              <ScanHeart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Disease Vision Lab</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload photos of damaged plant leaves or stems. Gemini Vision identifies symptoms and provides biological & IPM chemical remedies.
            </p>
            <Link to="/disease-detection" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800">
              Try Module <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Fertilizer Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate balanced nutrition plans according to phenological growth stage, minimizing chemical overuse and soil acidification.
            </p>
            <Link to="/fertilizer-advisory" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800">
              Try Module <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Irrigation Advisory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prevent moisture stress and waterlogging. Receive water conservation protocols and visual symptoms of drought vs overwatering.
            </p>
            <Link to="/irrigation-advisory" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800">
              Try Module <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Multilingual & Scientific Safety Section */}
      <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            Designed for Bharat
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Available in 7 Indian Languages with Voice & Speech Recognition
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Accessible to small-scale farmers in Hindi, Kannada, Telugu, Tamil, Malayalam, Marathi, and English. Clear, jargon-free explanations designed for outdoor field readability.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold">
            {['हिन्दी', 'ಕನ್ನಡ', 'తెలుగు', 'தமிழ்', 'മലയാളം', 'मराठी', 'English'].map((lang) => (
              <span key={lang} className="px-3 py-1 bg-emerald-800/80 rounded-full border border-emerald-700">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

