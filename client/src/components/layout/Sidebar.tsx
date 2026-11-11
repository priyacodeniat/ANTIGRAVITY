import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext.js';
import {
  LayoutDashboard,
  Sprout,
  ScanHeart,
  Droplets,
  FlaskConical,
  MessageSquare,
  History,
  User,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: '/crop-recommendation', label: t('nav.crop_recommendation'), icon: Sprout },
    { to: '/disease-detection', label: t('nav.disease_detection'), icon: ScanHeart },
    { to: '/fertilizer-advisory', label: t('nav.fertilizer_advisory'), icon: FlaskConical },
    { to: '/irrigation-advisory', label: t('nav.irrigation_advisory'), icon: Droplets },
    { to: '/chatbot', label: t('nav.chatbot'), icon: MessageSquare },
    { to: '/history', label: t('nav.history'), icon: History },
    { to: '/profile', label: t('nav.profile'), icon: User },
    { to: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 z-40 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Advisory Modules
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3">
          <p className="text-xs font-semibold text-emerald-900">Emergency Kisan Helpline</p>
          <p className="text-[11px] text-emerald-700 mt-0.5">Toll-free: 1800-180-1551</p>
        </div>
      </aside>
    </>
  );
};

