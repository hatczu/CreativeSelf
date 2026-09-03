import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CaretLeft,
  CaretRight,
  Sun,
  Globe,
  Bell,
  Star,
  Question,
  ShareNetwork,
  Info,
  FileText,
  ShieldCheck,
  SignOut,
  ArrowUp,
  Sparkle,
  Gear,
  CreditCard,
  Medal,
  Buildings,
  LockKey,
  Desktop,
  BookmarkSimple,
} from '@phosphor-icons/react';
import { NavBarStyle } from './ClientMobileApp';

interface MobileProfileScreenProps {
  regName: string;
  emailInput: string;
  jobTitleInput: string;
  companyNameInput: string;
  industryInput: string;
  setRegStep: (step: number) => void;
  savedActivityIds: string[];
  setActiveTab: (tab: any) => void;
  setActiveScreen: (screen: any) => void;
  navBarStyle?: NavBarStyle;
  setNavBarStyle?: (style: NavBarStyle) => void;
}

export function MobileProfileScreen({
  regName,
  emailInput,
  jobTitleInput,
  companyNameInput,
  industryInput,
  setRegStep,
  savedActivityIds,
  setActiveTab,
  setActiveScreen,
  navBarStyle,
  setNavBarStyle,
}: MobileProfileScreenProps) {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'menu' | 'profile-details' | 'settings'>('menu');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [themeMode, setThemeMode] = useState<'System' | 'Light' | 'Dark'>('System');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // SUBVIEW: PROFILE DETAILS
  if (activeView === 'profile-details') {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Top Header */}
        <div className="bg-white px-4 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveView('menu')}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          <h2
            className="text-base font-extrabold text-[#1A1A28]"
            style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
          >
            Profile Details
          </h2>
          <div className="w-8" />
        </div>

        <div className="p-4 space-y-3">
          <div
            className="bg-white p-5 shadow-2xs border border-slate-100/80 space-y-4"
            style={{ borderRadius: '20px 20px 48px 20px' }}
          >
            <div className="flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-[#33C4F0]/30 shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-[#1A1A28]">{regName || 'Eugenia Babajanyan'}</h3>
                <p className="text-xs text-slate-500 font-medium">{emailInput || 'eugenia.bj@gmail.com'}</p>
                <span
                  className="inline-block mt-1 text-[10px] font-extrabold text-[#007595] bg-[#E8F9FF] border border-[#A2F4FD] px-2.5 py-0.5"
                  style={{ borderRadius: '12px 12px 24px 12px' }}
                >
                  The Explorer 🧭
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div
                className="bg-slate-50 p-3"
                style={{ borderRadius: '14px 14px 28px 14px' }}
              >
                <p className="text-[9px] font-extrabold text-slate-400 uppercase">ROLE / TITLE</p>
                <p className="font-extrabold text-[#1A1A28] truncate mt-0.5">{jobTitleInput || 'Creative Lead'}</p>
              </div>
              <div
                className="bg-slate-50 p-3"
                style={{ borderRadius: '14px 14px 28px 14px' }}
              >
                <p className="text-[9px] font-extrabold text-slate-400 uppercase">COMPANY</p>
                <p className="font-extrabold text-[#1A1A28] truncate mt-0.5">{companyNameInput || 'Acme Agency'}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveView('menu')}
            className="w-full py-3 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold transition cursor-pointer shadow-xs"
            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // MAIN VIEW: MATCHING REFERENCE PROFILE IMAGE WITH CREATIVESELF SYSTEM UI TOKENS
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Top Navigation Bar */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <span
          className="text-xl font-black text-[#1A1A28] tracking-tight lowercase flex items-center gap-1"
          style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
        >
          creativeself <span className="w-2 h-2 rounded-full bg-[#33C4F0] inline-block" />
        </span>

        <button
          type="button"
          onClick={() => setActiveScreen('login')}
          className="w-9 h-9 text-slate-700 bg-white hover:bg-rose-50 hover:text-rose-600 border border-slate-100 flex items-center justify-center transition cursor-pointer shadow-2xs"
          style={{ borderRadius: '12px 12px 24px 12px' }}
          title="Sign Out"
        >
          <SignOut size={18} weight="bold" />
        </button>
      </div>

      {/* User Profile Avatar & Header (Centered with Archetype Tag) */}
      <div
        onClick={() => setActiveView('profile-details')}
        className="py-4 flex flex-col items-center text-center cursor-pointer group"
      >
        <div className="relative mb-2.5">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
            alt="Profile Avatar"
            className="w-20 h-20 rounded-full object-cover shadow-sm ring-4 ring-[#33C4F0]/20 group-hover:ring-[#33C4F0] group-hover:scale-105 transition duration-200"
          />
        </div>

        <h2
          className="text-base font-extrabold text-[#1A1A28] tracking-tight"
          style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
        >
          {regName || 'Eugenia Babajanyan'}
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {emailInput || 'eugenia.bj@gmail.com'}
        </p>

        <span
          className="mt-2 text-[10px] font-extrabold text-[#007595] bg-[#E8F9FF] border border-[#A2F4FD] px-3 py-0.5 flex items-center gap-1 shadow-2xs"
          style={{ borderRadius: '12px 12px 24px 12px' }}
        >
          The Explorer 🧭
        </span>
      </div>

      {/* Upgrade to Pro Banner Card (System Design Token Styled) */}
      <div className="px-4 my-2">
        <div
          className="w-full bg-[#1A1A28] text-white p-4.5 shadow-md flex items-center justify-between relative overflow-hidden"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          {/* Cyan Glow Effect */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#33C4F0]/20 rounded-full blur-xl pointer-events-none" />

          <div className="pr-2 min-w-0 z-10">
            <div className="flex items-center gap-1.5">
              <Sparkle size={15} className="text-[#33C4F0]" weight="fill" />
              <h3
                className="text-sm font-extrabold text-white"
                style={{ fontFamily: 'Century Gothic, sans-serif' }}
              >
                Upgrade to Pro
              </h3>
            </div>
            <p className="text-[11px] text-slate-300 font-medium leading-snug mt-1 line-clamp-2 max-w-[210px]">
              Unlock full-body AI avatar, advanced try-on and unlimited looks
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRegStep(4)}
            className="px-3.5 py-1.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md z-10"
            style={{ borderRadius: '14px 14px 28px 14px' }}
          >
            <span className="w-4 h-4 rounded-full bg-[#1A1A28]/15 flex items-center justify-center">
              <ArrowUp size={10} weight="bold" />
            </span>
            <span>Upgrade</span>
          </button>
        </div>
      </div>

      {/* Settings Card Group 1: Preferences (Mode, Language, Notifications) */}
      <div className="px-4 my-3">
        <div
          className="bg-white border border-slate-100/80 shadow-2xs overflow-hidden divide-y divide-slate-100/80"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          {/* Mode */}
          <div className="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28] hover:bg-slate-50/50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <Sun size={18} className="text-[#33C4F0]" />
              <span>Mode</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setThemeMode(themeMode === 'System' ? 'Light' : themeMode === 'Light' ? 'Dark' : 'System')
              }
              className="flex items-center gap-1 text-[#147C9E] font-bold hover:underline"
            >
              <span>{themeMode}</span>
              <CaretRight size={14} />
            </button>
          </div>

          {/* Language */}
          <div className="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28] hover:bg-slate-50/50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-[#33C4F0]" />
              <span>Language</span>
            </div>
            <div className="flex items-center gap-1 text-[#147C9E] font-bold">
              <span>{selectedLanguage}</span>
              <CaretRight size={14} />
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28]">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-[#33C4F0]" />
              <span>Notifications</span>
            </div>
            <button
              type="button"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                notificationsEnabled ? 'bg-[#33C4F0]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Card Group 2: Engagement (Rate Us, Help Center, Share) */}
      <div className="px-4 my-3">
        <div
          className="bg-white border border-slate-100/80 shadow-2xs overflow-hidden divide-y divide-slate-100/80"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <div className="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28] hover:bg-slate-50/50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <Star size={18} className="text-[#33C4F0]" />
              <span>Rate Us</span>
            </div>
            <CaretRight size={14} className="text-slate-400" />
          </div>

          <div
            onClick={() => navigate('/support')}
            className="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28] hover:bg-slate-50/50 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Question size={18} className="text-[#33C4F0]" />
              <span>Help Center</span>
            </div>
            <CaretRight size={14} className="text-slate-400" />
          </div>

          <div className="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28] hover:bg-slate-50/50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <ShareNetwork size={18} className="text-[#33C4F0]" />
              <span>Share</span>
            </div>
            <CaretRight size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* Settings Card Group 3: About & Legal */}
      <div className="px-4 my-3">
        <div
          className="bg-white border border-slate-100/80 shadow-2xs overflow-hidden divide-y divide-slate-100/80"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <div className="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28] hover:bg-slate-50/50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <Info size={18} className="text-[#33C4F0]" />
              <span>About CreativeSelf</span>
            </div>
            <CaretRight size={14} className="text-slate-400" />
          </div>

          <div className="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28] hover:bg-slate-50/50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-[#33C4F0]" />
              <span>Terms of Service</span>
            </div>
            <CaretRight size={14} className="text-slate-400" />
          </div>

          <div className="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28] hover:bg-slate-50/50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-[#33C4F0]" />
              <span>Privacy Policy</span>
            </div>
            <CaretRight size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* App Version Label Footer */}
      <div className="text-center pt-2 pb-6">
        <p className="text-[11px] font-extrabold text-slate-400">
          Version 2.4.0 (Build 412)
        </p>
      </div>
    </div>
  );
}
