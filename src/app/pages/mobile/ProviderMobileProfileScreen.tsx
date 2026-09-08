import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CaretRight,
  SignOut,
  Desktop,
  DeviceMobile,
  Plus,
  Image as ImageIcon,
  Star,
  MapPin,
  PencilSimple,
  Bell,
  Question,
  Eye,
  Users,
  Check,
} from '@phosphor-icons/react';
import { NavBarStyle } from './ClientMobileApp';

interface ProviderMobileProfileScreenProps {
  navBarStyle?: NavBarStyle;
  setNavBarStyle?: (style: NavBarStyle) => void;
  setActiveScreen: (screen: any) => void;
  brandStories?: any[];
  onOpenStoryComposer?: () => void;
  servicesList?: any[];
  onOpenNewService?: () => void;
}

export function ProviderMobileProfileScreen({
  navBarStyle,
  setNavBarStyle,
  setActiveScreen,
  brandStories = [],
  onOpenStoryComposer,
  servicesList = [],
  onOpenNewService,
}: ProviderMobileProfileScreenProps) {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="flex-1 h-full overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* TOP APP HEADER BAR */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between bg-white border-b border-slate-100">
        <span
          className="text-lg font-black text-[#1A1A28] tracking-tight lowercase flex items-center gap-1"
          style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
        >
          creativeself <span className="w-2 h-2 rounded-full bg-[#1AB0DC] inline-block" />
        </span>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-8 h-8 text-slate-600 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 flex items-center justify-center transition cursor-pointer"
          style={{ borderRadius: '10px 10px 20px 10px' }}
          title="Log Out"
        >
          <SignOut size={16} weight="bold" />
        </button>
      </div>

      {/* STUDIO PROFILE HEADER CARD */}
      <div className="px-3.5 pt-3 space-y-3">
        <div
          className="bg-white border border-slate-200/80 p-4 shadow-2xs space-y-3"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#B91C1C] text-2xl flex items-center justify-center shadow-xs shrink-0 ring-2 ring-slate-100"
              style={{ borderRadius: '14px 14px 32px 14px' }}
            >
              🎨
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2
                  className="text-[16px] font-bold text-[#1A1A28] leading-tight"
                  style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
                >
                  Studio Lumen
                </h2>
                <span
                  className="text-[9px] font-bold text-[#007595] bg-[#ECFEFF] border border-[#A2F4FD] px-2 py-0.5"
                  style={{ borderRadius: '8px 8px 16px 8px' }}
                >
                  Verified Studio ✓
                </span>
              </div>
              <p className="text-[11px] text-[#007595] font-semibold mt-0.5">
                Heart of Art Studio · Creative Workshops
              </p>
              <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <MapPin size={11} className="text-[#1AB0DC]" />
                <span>Orchard Art District, Singapore</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="bg-slate-50 p-2 border border-slate-100 rounded-xl">
              <div className="flex items-center justify-center gap-0.5 text-amber-500 text-[11px] font-bold">
                <Star size={11} weight="fill" />
                <span>4.95</span>
              </div>
              <p className="text-[8px] font-semibold text-slate-400 uppercase mt-0.5">RATING</p>
            </div>

            <div className="bg-slate-50 p-2 border border-slate-100 rounded-xl">
              <p className="text-[12px] font-bold text-[#1A1A28]">84</p>
              <p className="text-[8px] font-semibold text-slate-400 uppercase mt-0.5">BOOKINGS</p>
            </div>

            <div className="bg-slate-50 p-2 border border-slate-100 rounded-xl">
              <p className="text-[12px] font-bold text-[#007595]">{servicesList.length}</p>
              <p className="text-[8px] font-semibold text-slate-400 uppercase mt-0.5">SERVICES</p>
            </div>
          </div>
        </div>

        {/* POSTED SERVICES LIST */}
        <div
          className="bg-white border border-slate-200/80 p-4 shadow-2xs space-y-3"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-[#007595] uppercase tracking-wider">
                Catalog
              </span>
              <h3
                className="text-[14px] font-bold text-[#1A1A28] mt-0.5"
                style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
              >
                Posted Services ({servicesList.length})
              </h3>
            </div>

            {onOpenNewService && (
              <button
                type="button"
                onClick={onOpenNewService}
                className="py-1 px-3 bg-[#1AB0DC] hover:bg-[#007595] text-white text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shadow-2xs"
                style={{ borderRadius: '12px 12px 24px 12px', fontFamily: 'Poppins, sans-serif' }}
              >
                <Plus size={13} weight="bold" />
                <span>+ Add Service</span>
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {servicesList.map((svc) => (
              <div
                key={svc.id}
                className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl flex items-center justify-between gap-3 hover:border-[#1AB0DC] transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 flex items-center justify-center text-xl border border-slate-200"
                    style={{ borderRadius: '10px 10px 20px 10px' }}
                  >
                    {svc.image ? (
                      <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>{svc.emoji || '🎨'}</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4
                        className="text-[12px] font-bold text-[#1A1A28] truncate"
                        style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
                      >
                        {svc.title}
                      </h4>
                      <span
                        className={`text-[8px] font-bold px-1.5 py-0.2 rounded-full ${
                          svc.published
                            ? 'bg-[#ECFDF5] text-[#047857]'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {svc.published ? 'Active' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                      {svc.format} · <span className="font-bold text-[#007595]">{svc.price}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveScreen('services')}
                  className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:text-[#007595] text-[10px] font-bold transition shrink-0 cursor-pointer"
                  style={{ borderRadius: '8px 8px 16px 8px' }}
                >
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK CONTENT & WORKSPACE ACTIONS */}
        <div
          className="bg-white border border-slate-200/80 p-4 shadow-2xs space-y-2.5"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Quick Actions
          </span>

          {onOpenStoryComposer && (
            <button
              type="button"
              onClick={onOpenStoryComposer}
              className="w-full p-2.5 bg-slate-50 hover:bg-[#ECFEFF] border border-slate-200 text-[#1A1A28] flex items-center justify-between text-[11px] font-semibold transition cursor-pointer"
              style={{ borderRadius: '12px 12px 24px 12px' }}
            >
              <div className="flex items-center gap-2">
                <ImageIcon size={16} className="text-[#1AB0DC]" />
                <span>Post Brand Story / Feed Update</span>
              </div>
              <CaretRight size={13} className="text-slate-400" />
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate('/mobile')}
            className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#1A1A28] flex items-center justify-between text-[11px] font-semibold transition cursor-pointer"
            style={{ borderRadius: '12px 12px 24px 12px' }}
          >
            <div className="flex items-center gap-2">
              <DeviceMobile size={16} className="text-[#1AB0DC]" />
              <span>Switch to Client Mobile App</span>
            </div>
            <CaretRight size={13} className="text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/vendor')}
            className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#1A1A28] flex items-center justify-between text-[11px] font-semibold transition cursor-pointer"
            style={{ borderRadius: '12px 12px 24px 12px' }}
          >
            <div className="flex items-center gap-2">
              <Desktop size={16} className="text-[#1AB0DC]" />
              <span>Switch to Desktop Vendor Portal</span>
            </div>
            <CaretRight size={13} className="text-slate-400" />
          </button>
        </div>

        {/* NAVIGATION BAR STYLE PREFERENCE */}
        {navBarStyle && setNavBarStyle && (
          <div
            className="bg-white border border-slate-200/80 p-4 shadow-2xs space-y-2.5"
            style={{ borderRadius: '20px 20px 48px 20px' }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Mobile Navigation Theme
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'liquid-glass-icon', label: 'Liquid Glass (Icon)' },
                { id: 'liquid-glass-text', label: 'Liquid Glass (Text)' },
                { id: 'liquid-glass-dark', label: 'Dark Glass' },
                { id: 'classic', label: 'Classic Solid' },
              ].map((styleOption) => (
                <button
                  key={styleOption.id}
                  type="button"
                  onClick={() => setNavBarStyle(styleOption.id as NavBarStyle)}
                  className={`p-2.5 border text-left font-semibold transition flex items-center justify-between cursor-pointer ${
                    navBarStyle === styleOption.id
                      ? 'border-[#1AB0DC] bg-[#ECFEFF] text-[#007595]'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                  style={{ borderRadius: '10px 10px 20px 10px' }}
                >
                  <span className="text-[11px] truncate">{styleOption.label}</span>
                  {navBarStyle === styleOption.id && <Check size={14} weight="bold" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TOGGLE */}
        <div
          className="bg-white border border-slate-200/80 p-4 shadow-2xs flex items-center justify-between text-xs font-semibold text-[#1A1A28]"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-[#1AB0DC]" />
            <span>Booking Notifications</span>
          </div>
          <button
            type="button"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
              notificationsEnabled ? 'bg-[#1AB0DC]' : 'bg-slate-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="text-center pt-4 pb-6">
        <p className="text-[11px] font-semibold text-slate-400">
          Provider Mobile v2.4.0
        </p>
      </div>
    </div>
  );
}
