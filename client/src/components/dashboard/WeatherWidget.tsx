import React, { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Calendar,
} from 'lucide-react';

interface WeatherDay {
  day: string;
  date: string;
  temp: number;
  humidity: number;
  rainProb: number;
  windSpeed: number;
  sprayStatus: 'OPTIMAL' | 'CAUTION' | 'PROHIBITED';
  condition: string;
}

const mockForecast: WeatherDay[] = [
  {
    day: 'Today',
    date: '13 Nov',
    temp: 29,
    humidity: 58,
    rainProb: 10,
    windSpeed: 8,
    sprayStatus: 'OPTIMAL',
    condition: 'Sunny & Clear',
  },
  {
    day: 'Tomorrow',
    date: '14 Nov',
    temp: 31,
    humidity: 54,
    rainProb: 15,
    windSpeed: 11,
    sprayStatus: 'OPTIMAL',
    condition: 'Partly Cloudy',
  },
  {
    day: 'Friday',
    date: '15 Nov',
    temp: 28,
    humidity: 74,
    rainProb: 45,
    windSpeed: 17,
    sprayStatus: 'CAUTION',
    condition: 'Overcast & Humid',
  },
  {
    day: 'Saturday',
    date: '16 Nov',
    temp: 26,
    humidity: 88,
    rainProb: 80,
    windSpeed: 24,
    sprayStatus: 'PROHIBITED',
    condition: 'Thunderstorms Expected',
  },
  {
    day: 'Sunday',
    date: '17 Nov',
    temp: 27,
    humidity: 72,
    rainProb: 30,
    windSpeed: 12,
    sprayStatus: 'CAUTION',
    condition: 'Scattered Showers',
  },
];

export const WeatherWidget: React.FC<{ district?: string; state?: string }> = ({
  district = 'Nashik',
  state = 'Maharashtra',
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const current = mockForecast[selectedDayIndex];

  const getSprayBadge = (status: WeatherDay['sprayStatus']) => {
    switch (status) {
      case 'OPTIMAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Optimal Spray Window
          </span>
        );
      case 'CAUTION':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" /> Spray with Caution
          </span>
        );
      case 'PROHIBITED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Spraying Prohibited
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
      {/* Widget Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Agro-Meteorological Forecast
          </span>
          <h3 className="text-lg font-black text-slate-900 mt-0.5 flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-amber-500" />
            {district}, {state}
          </h3>
        </div>
        <div>{getSprayBadge(current.sprayStatus)}</div>
      </div>

      {/* Current Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center">
          <p className="text-[11px] font-semibold text-slate-500">Air Temperature</p>
          <p className="text-xl font-black text-slate-900 mt-0.5">{current.temp}°C</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{current.condition}</p>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center">
          <p className="text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-blue-500" /> Humidity
          </p>
          <p className="text-xl font-black text-slate-900 mt-0.5">{current.humidity}%</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Relative Moisture</p>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center">
          <p className="text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-1">
            <CloudRain className="w-3.5 h-3.5 text-cyan-600" /> Rain Probability
          </p>
          <p className="text-xl font-black text-slate-900 mt-0.5">{current.rainProb}%</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Precipitation Risk</p>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center">
          <p className="text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-1">
            <Wind className="w-3.5 h-3.5 text-emerald-600" /> Wind Velocity
          </p>
          <p className="text-xl font-black text-slate-900 mt-0.5">{current.windSpeed} km/h</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Drift Safety</p>
        </div>
      </div>

      {/* Sprayability Recommendation Callout */}
      <div className={`p-4 rounded-2xl text-xs leading-relaxed border ${
        current.sprayStatus === 'OPTIMAL'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : current.sprayStatus === 'CAUTION'
          ? 'bg-amber-50 border-amber-200 text-amber-900'
          : 'bg-rose-50 border-rose-200 text-rose-900'
      }`}>
        <p className="font-bold flex items-center gap-1.5 mb-1">
          {current.sprayStatus === 'OPTIMAL' ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          )}
          Spray Window Intelligence:
        </p>
        {current.sprayStatus === 'OPTIMAL' && (
          <p>
            Low wind velocity ({current.windSpeed} km/h) and minimal rain probability ({current.rainProb}%) provide safe morning spraying conditions (06:30 AM - 09:30 AM). Minimal chemical drift and zero washout risk.
          </p>
        )}
        {current.sprayStatus === 'CAUTION' && (
          <p>
            Moderate wind or rain probability detected ({current.rainProb}%). Delay chemical spraying until midday cloud cover clears or use drift-reduction nozzles.
          </p>
        )}
        {current.sprayStatus === 'PROHIBITED' && (
          <p>
            High rainfall probability ({current.rainProb}%) and strong gusting winds ({current.windSpeed} km/h) will cause immediate chemical pesticide washout into water bodies. Do not spray today.
          </p>
        )}
      </div>

      {/* 5-Day Horizontal Forecast Bar */}
      <div>
        <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" /> 5-Day Agro-Weather Outlook
        </p>
        <div className="grid grid-cols-5 gap-2">
          {mockForecast.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedDayIndex(idx)}
              className={`p-2.5 rounded-xl border text-center transition ${
                selectedDayIndex === idx
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
              }`}
            >
              <p className="text-[11px] font-bold">{item.day}</p>
              <p className="text-[10px] text-slate-400">{item.date}</p>
              <p className="text-xs font-black text-slate-800 mt-1">{item.temp}°</p>
              <p className="text-[9px] font-semibold text-cyan-600">{item.rainProb}% rain</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
