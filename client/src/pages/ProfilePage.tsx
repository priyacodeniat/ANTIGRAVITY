import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { apiClient } from '../services/api.js';
import { User, MapPin, Layers, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [state, setState] = useState(profile?.state || 'Maharashtra');
  const [district, setDistrict] = useState(profile?.district || 'Nashik');
  const [village, setVillage] = useState(profile?.village || '');
  const [landArea, setLandArea] = useState<number>(profile?.land_area || 3);
  const [landAreaUnit, setLandAreaUnit] = useState<string>(profile?.land_area_unit || 'acre');
  const [soilType, setSoilType] = useState(profile?.soil_type || 'Black Soil');
  const [irrigationAvailability, setIrrigationAvailability] = useState(profile?.irrigation_availability || 'Drip & Borewell');
  const [farmingExperience, setFarmingExperience] = useState(profile?.farming_experience || '10 years');
  const [preferredLanguage, setPreferredLanguage] = useState(profile?.preferred_language || 'en');

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setErrorMsg(null);

    try {
      const response = await apiClient.put('/profile', {
        fullName,
        phone,
        state,
        district,
        village,
        landArea,
        landAreaUnit,
        soilType,
        irrigationAvailability,
        farmingExperience,
        preferredLanguage,
      });

      if (response.data?.success) {
        setSavedSuccess(true);
        await refreshProfile();
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <User className="w-7 h-7 text-emerald-600" />
          Farmer Agricultural Profile
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Maintain your personal and agricultural holding details for contextual, localized AI recommendations.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-900 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Profile updated successfully!
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-xs text-red-900">
          <AlertCircle className="w-4 h-4 text-red-600" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        {/* Personal Details */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
            Personal & Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
            Geographical Location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">District *</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Village / Locality</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Agricultural Holding Details */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
            Farm Holding & Soil Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Land Area *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={landArea}
                  onChange={(e) => setLandArea(parseFloat(e.target.value) || 0)}
                  required
                  className="w-2/3 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <select
                  value={landAreaUnit}
                  onChange={(e) => setLandAreaUnit(e.target.value)}
                  className="w-1/3 px-2 py-2 text-sm border border-slate-200 rounded-xl bg-white"
                >
                  <option value="acre">Acres</option>
                  <option value="hectare">Hectares</option>
                  <option value="bigha">Bigha</option>
                  <option value="guntha">Guntha</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Soil Type</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              >
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Black Soil">Black Soil (Regur)</option>
                <option value="Red & Yellow Soil">Red & Yellow Soil</option>
                <option value="Laterite Soil">Laterite Soil</option>
                <option value="Sandy Loam">Sandy Loam</option>
                <option value="Loamy soil">Loamy soil</option>
                <option value="Clayey Loam">Clayey Loam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Water / Irrigation Source</label>
              <input
                type="text"
                value={irrigationAvailability}
                onChange={(e) => setIrrigationAvailability(e.target.value)}
                placeholder="e.g. Drip, Borewell, Canal"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold rounded-xl shadow-xs transition text-sm"
          >
            {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

