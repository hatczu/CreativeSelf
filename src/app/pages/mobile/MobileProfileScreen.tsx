import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CaretLeft,
  CaretRight,
  Gear,
  CreditCard,
  Medal,
  Buildings,
  LockKey,
  Desktop,
  BookmarkSimple,
  Question,
  Globe,
  SignOut,
  MagnifyingGlass,
  Sparkle,
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
}: MobileProfileScreenProps) {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'menu' | 'profile-details' | 'settings'>('menu');
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  // VIEW 2: PROFILE DETAILS SUBVIEW
  if (activeView === 'profile-details') {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Top Header */}
        <div className="bg-white px-4 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveView('menu')}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <div>
              <h2
                className="text-[17px] font-semibold text-[#1A1A28] leading-tight"
                style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
              >
                Profile Details
              </h2>
              <p className="text-[12px] text-[#6A7282] font-normal">
                Personal & organization profile information
              </p>
            </div>
          </div>
        </div>

        {/* Content Cards (Full Width, No Outline) */}
        <div className="space-y-2 pt-2">
          {/* User Hero Section */}
          <div className="w-full bg-white p-4 space-y-3">
            <div className="flex items-center gap-3.5">
              <div
                className="w-14 h-14 bg-gradient-to-tr from-[#33C4F0] to-[#1AB0DC] text-white flex items-center justify-center text-2xl shrink-0"
                style={{ borderRadius: '20px 20px 48px 20px' }}
              >
                🧭
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-[#1A1A28] truncate">{regName || 'Alex Morgan'}</h3>
                  <span
                    className="text-[10px] font-semibold text-[#007595] bg-[#E8F9FF] border border-[#A2F4FD] px-2.5 py-0.5 shrink-0"
                    style={{ borderRadius: '20px 20px 48px 20px' }}
                  >
                    The Explorer 🧭
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{emailInput || 'alex@company.com'}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span className="text-[11px] text-[#10B981] font-semibold">Active Pro Annual Subscriber</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details & Organization Section */}
          <div className="w-full bg-white p-4 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="text-[12px] font-semibold uppercase text-[#1A1A28] tracking-wider">Work Details</h3>
              <span
                className="text-[10px] font-semibold text-[#007595] bg-[#ECFEFF] border border-[#A2F4FD] px-2.5 py-0.5"
                style={{ borderRadius: '20px 20px 48px 20px' }}
              >
                Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div
                className="bg-slate-50 p-3 border-none"
                style={{ borderRadius: '16px 16px 36px 16px' }}
              >
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">FULL NAME</p>
                <p className="font-semibold text-slate-900 truncate mt-0.5">{regName || 'Alex Morgan'}</p>
              </div>
              <div
                className="bg-slate-50 p-3 border-none"
                style={{ borderRadius: '16px 16px 36px 16px' }}
              >
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">ROLE / TITLE</p>
                <p className="font-semibold text-slate-900 truncate mt-0.5">{jobTitleInput || 'Creative Lead'}</p>
              </div>
              <div
                className="bg-slate-50 p-3 border-none"
                style={{ borderRadius: '16px 16px 36px 16px' }}
              >
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">COMPANY</p>
                <p className="font-semibold text-slate-900 truncate mt-0.5">{companyNameInput || 'Acme Agency'}</p>
              </div>
              <div
                className="bg-slate-50 p-3 border-none"
                style={{ borderRadius: '16px 16px 36px 16px' }}
              >
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">INDUSTRY</p>
                <p className="font-semibold text-slate-900 truncate mt-0.5">{industryInput || 'Technology & Design'}</p>
              </div>
            </div>
          </div>

          {/* Wellness Stats Section */}
          <div className="w-full bg-white p-4 space-y-3">
            <h3 className="text-[12px] font-semibold uppercase text-[#1A1A28] tracking-wider pb-1 border-b border-slate-100">
              Wellness Stats & Activity
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div
                className="bg-slate-50 p-3 border-none text-center"
                style={{ borderRadius: '16px 16px 36px 16px' }}
              >
                <p className="text-lg font-semibold text-[#33C4F0]">12</p>
                <p className="text-[10px] font-medium text-slate-400">Sessions</p>
              </div>
              <div
                className="bg-slate-50 p-3 border-none text-center"
                style={{ borderRadius: '16px 16px 36px 16px' }}
              >
                <p className="text-lg font-semibold text-[#8B5CF6]">18.5h</p>
                <p className="text-[10px] font-medium text-slate-400">Mindful Hours</p>
              </div>
              <div
                className="bg-slate-50 p-3 border-none text-center"
                style={{ borderRadius: '16px 16px 36px 16px' }}
              >
                <p className="text-lg font-semibold text-[#10B981]">5 Days</p>
                <p className="text-[10px] font-medium text-slate-400">Streak 🔥</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 3: SETTINGS SUBVIEW
  if (activeView === 'settings') {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Top Header */}
        <div className="bg-white px-4 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveView('menu')}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <div>
              <h2
                className="text-[17px] font-semibold text-[#1A1A28] leading-tight"
                style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
              >
                Settings
              </h2>
              <p className="text-[12px] text-[#6A7282] font-normal">
                Account preferences, security & app options
              </p>
            </div>
          </div>
        </div>

        {/* Settings options list */}
        <div className="space-y-2 pt-2">
          <div className="w-full bg-white divide-y divide-slate-100 text-xs">
            <div className="px-4 py-3 bg-slate-50/50">
              <h3 className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">Preferences</h3>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Push Notifications</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Receive session reminders & updates</p>
              </div>
              <button
                type="button"
                className="w-11 h-6 bg-[#33C4F0] rounded-full p-1 transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full bg-white translate-x-5 transition-transform" />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Biometric Authentication</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Fingerprint or Face ID login</p>
              </div>
              <button
                type="button"
                onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                  biometricsEnabled ? 'bg-[#10B981]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="w-full bg-white divide-y divide-slate-100 text-xs">
            <div className="px-4 py-3 bg-slate-50/50">
              <h3 className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">About</h3>
            </div>
            <div className="p-4 flex items-center justify-between text-slate-600">
              <span className="font-medium">App Version</span>
              <span className="font-semibold text-slate-900">v2.4.0 (Build 412)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 1: MAIN PROFILE HUB (Signature Teardrop + Full Width Cards + No Border + Semibold Text)
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Top Header Bar */}
      <div className="bg-white px-4 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between relative">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
        >
          <CaretLeft size={16} weight="bold" />
        </button>

        <h2
          className="text-[17px] font-semibold text-[#1A1A28] absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
        >
          Profile
        </h2>

        <button
          type="button"
          className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
        >
          <MagnifyingGlass size={16} weight="bold" />
        </button>
      </div>

      {/* Main List Sections (Full Width, No Outer Container Padding, space-y-2) */}
      <div className="space-y-2 pt-2">
        {/* User Profile Card Row */}
        <div
          onClick={() => setActiveView('profile-details')}
          className="w-full bg-white p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="w-12 h-12 bg-gradient-to-tr from-[#33C4F0] to-[#1AB0DC] text-white flex items-center justify-center text-xl shrink-0"
              style={{ borderRadius: '16px 16px 36px 16px' }}
            >
              🧭
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-[#1A1A28] truncate">{regName || 'Alex Morgan'}</h3>
              <p className="text-xs text-slate-500 font-medium truncate">{emailInput || 'alex@company.com'}</p>
            </div>
          </div>
          <CaretRight size={18} className="text-slate-400 shrink-0" />
        </div>

        {/* Upgrade / Active Plan Teardrop Banner */}
        <div className="px-4 py-1 bg-white">
          <div
            className="w-full bg-[#1A1A28] text-white p-4 flex items-center justify-between relative overflow-hidden"
            style={{ borderRadius: '24px 24px 64px 24px' }}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#33C4F0]/20 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start gap-3 min-w-0 pr-2">
              <div
                className="w-8 h-8 bg-[#33C4F0]/20 text-[#33C4F0] flex items-center justify-center shrink-0 mt-0.5"
                style={{ borderRadius: '12px 12px 24px 12px' }}
              >
                <Sparkle size={18} weight="fill" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-white">Upgrade to Pro</h4>
                <p className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5 line-clamp-2">
                  Unlock shared budgets, AI insights, and custom wellness analytics.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setRegStep(4)}
              className="px-3.5 py-1.5 bg-[#33C4F0] hover:bg-[#28b3de] text-white text-[11px] font-semibold transition whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1 shadow-xs"
              style={{ borderRadius: '20px 20px 48px 20px' }}
            >
              <span>Upgrade</span>
              <CaretRight size={12} />
            </button>
          </div>
        </div>

        {/* First Menu Group Card (Settings, Plan, Badges, Corporate, Biometrics) */}
        <div className="w-full bg-white divide-y divide-slate-100 text-xs">
          <button
            onClick={() => setActiveView('settings')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 text-left transition cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <Gear size={20} className="text-slate-500" />
              <span>Settings</span>
            </div>
            <CaretRight size={16} className="text-slate-400" />
          </button>

          <button
            onClick={() => setRegStep(4)}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 text-left transition cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <CreditCard size={20} className="text-slate-500" />
              <span>Plan & Subscription</span>
            </div>
            <CaretRight size={16} className="text-slate-400" />
          </button>

          <button
            onClick={() => navigate('/test')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 text-left transition cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <Medal size={20} className="text-slate-500" />
              <span>Badges & Archetype</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="text-[10px] font-semibold text-[#007595] bg-[#E8F9FF] border border-[#A2F4FD] px-2.5 py-0.5"
                style={{ borderRadius: '20px 20px 48px 20px' }}
              >
                The Explorer 🧭
              </span>
              <CaretRight size={16} className="text-slate-400" />
            </div>
          </button>

          <button
            onClick={() => navigate('/invites')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 text-left transition cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <Buildings size={20} className="text-slate-500" />
              <span>Corporate Subscription & Invites</span>
            </div>
            <CaretRight size={16} className="text-slate-400" />
          </button>

          <div className="w-full p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <LockKey size={20} className="text-slate-500" />
              <span>Enable Fingerprint / Face ID</span>
            </div>
            <button
              type="button"
              onClick={() => setBiometricsEnabled(!biometricsEnabled)}
              className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                biometricsEnabled ? 'bg-[#10B981]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Second Menu Group Card (Saved Activities, Desktop switch, Help) */}
        <div className="w-full bg-white divide-y divide-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('discover')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 text-left transition cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <BookmarkSimple size={20} className="text-slate-500" />
              <span>Saved Activities</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5"
                style={{ borderRadius: '20px 20px 48px 20px' }}
              >
                {savedActivityIds.length}
              </span>
              <CaretRight size={16} className="text-slate-400" />
            </div>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 text-left text-[#1AB0DC] transition cursor-pointer"
          >
            <div className="flex items-center gap-3 font-semibold">
              <Desktop size={20} />
              <span>Switch to Desktop Version</span>
            </div>
            <CaretRight size={16} />
          </button>

          <button
            type="button"
            onClick={() => navigate('/support')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 text-left transition cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <Question size={20} className="text-slate-500" />
              <span>Help & Support</span>
            </div>
            <CaretRight size={16} className="text-slate-400" />
          </button>
        </div>

        {/* Third Menu Group Card (Language, Logout) */}
        <div className="w-full bg-white divide-y divide-slate-100 text-xs">
          <div className="w-full p-4 flex items-center justify-between text-slate-800 font-semibold">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-slate-500" />
              <span>Language</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 font-medium text-xs">
              <span>English</span>
              <CaretRight size={16} />
            </div>
          </div>

          <button
            onClick={() => setActiveScreen('login')}
            className="w-full p-4 flex items-center justify-between hover:bg-red-50/80 text-left text-[#EF4444] transition cursor-pointer"
          >
            <div className="flex items-center gap-3 font-semibold">
              <SignOut size={20} />
              <span>Log Out</span>
            </div>
            <CaretRight size={16} className="text-red-300" />
          </button>
        </div>
      </div>
    </div>
  );
}




