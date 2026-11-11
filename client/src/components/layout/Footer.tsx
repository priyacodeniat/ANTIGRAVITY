import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">AgriAssist AI</span>
          </div>
          <p className="text-slate-400 max-w-sm">
            AI-Powered Agriculture Crop Advisory Assistant for Indian Farmers. Providing science-backed crop suitability, disease diagnostic vision screening, fertilizer balancing, and irrigation schedules.
          </p>
          <div className="flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 max-w-md">
            <ShieldAlert className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-slate-400">
              Disclaimer: AgriAssist AI provides advisory screening. Visual assessments and recommendations do not replace certified soil laboratories or local agricultural extension officers.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">Advisories</h4>
          <ul className="space-y-2">
            <li><Link to="/crop-recommendation" className="hover:text-emerald-400 transition">Crop Selection</Link></li>
            <li><Link to="/disease-detection" className="hover:text-emerald-400 transition">Plant Disease Diagnostic</Link></li>
            <li><Link to="/fertilizer-advisory" className="hover:text-emerald-400 transition">Fertilizer Schedule</Link></li>
            <li><Link to="/irrigation-advisory" className="hover:text-emerald-400 transition">Irrigation Optimization</Link></li>
            <li><Link to="/chatbot" className="hover:text-emerald-400 transition">Kisan Chatbot</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">Platform & Legal</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-emerald-400 transition">About the Platform</Link></li>
            <li><Link to="/privacy" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400 transition">Terms & Safety Standards</Link></li>
            <li><a href="https://icar.org.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">ICAR Knowledge Portal</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px]">
        © {new Date().getFullYear()} AgriAssist AI. Built with Google Gemini & Supabase for Indian Agriculture.
      </div>
    </footer>
  );
};

