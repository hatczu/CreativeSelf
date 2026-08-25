import React from 'react';
import { useNavigate } from 'react-router';
import { Sparkle, CaretRight, BookmarkSimple, Buildings, Desktop, SignOut } from '@phosphor-icons/react';

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

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 space-y-4 px-4 pt-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header Title */}
      <div className="pb-2 border-b border-slate-100">
        <h2 className="text-[20px] font-extrabold text-[#1A1A28] leading-tight" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
          Account Profile
        </h2>
        <p className="text-[12px] text-[#6A7282] font-semibold">Manage your personal details, workspace, and plan options.</p>
      </div>

      {/* User Header */}
      <div className="pb-3 border-b border-slate-100 flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#33C4F0] to-[#1AB0DC] text-white flex items-center justify-center text-xl font-bold shadow-xs shrink-0">
          🧭
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-base font-extrabold text-slate-900 truncate">{regName || 'Alex Morgan'}</h3>
            <span className="text-[10px] font-semibold text-[#1AB0DC] bg-[#E8F9FF] px-2 py-0.5 rounded-full shrink-0">
              The Explorer 🧭
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium truncate">{emailInput || 'alex@company.com'}</p>
          <p className="text-[11px] text-[#10B981] font-bold">Active Pro Annual Subscriber</p>
        </div>
      </div>

      {/* Account Details Section */}
      <div className="pb-3 border-b border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between pb-1">
          <h3 className="text-[13px] font-extrabold uppercase text-[#1A1A28] tracking-wider">Account & Organization</h3>
          <span className="text-[10px] font-semibold text-[#1AB0DC] bg-[#E8F9FF] px-2 py-0.5 rounded-md">Verified Profile</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400">FULL NAME</p>
            <p className="font-extrabold text-slate-900 truncate">{regName || 'Alex Morgan'}</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400">ROLE / TITLE</p>
            <p className="font-extrabold text-slate-900 truncate">{jobTitleInput || 'Creative Lead'}</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400">COMPANY</p>
            <p className="font-extrabold text-slate-900 truncate">{companyNameInput || 'Acme Agency'}</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400">INDUSTRY</p>
            <p className="font-extrabold text-slate-900 truncate">{industryInput || 'Technology & Design'}</p>
          </div>
        </div>
      </div>

      {/* Subscription & Pass Balance Section */}
      <div className="p-4 border-b border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-[#1A1A28]">Pro Annual Plan</p>
            <p className="text-[10px] text-slate-500 font-semibold">$39.00 / yr • Renews Aug 2027</p>
          </div>
          <span className="text-xs font-black text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-emerald-200">
            4 Pass Credits Left
          </span>
        </div>

        <button
          type="button"
          onClick={() => setRegStep(4)}
          className="w-full py-2.5 bg-[#1A1A28] text-white hover:bg-black text-xs font-bold rounded-xl transition text-center shadow-xs"
        >
          Manage Subscription / Upgrade Plan
        </button>
      </div>

      {/* Wellness Stats Row */}
      <div className="p-4 border-b border-slate-100 grid grid-cols-3 gap-2">
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
          <p className="text-lg font-black text-[#33C4F0]">12</p>
          <p className="text-[10px] font-bold text-slate-400">Sessions</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
          <p className="text-lg font-black text-[#8B5CF6]">18.5h</p>
          <p className="text-[10px] font-bold text-slate-400">Mindful Hours</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
          <p className="text-lg font-black text-[#10B981]">5 Days</p>
          <p className="text-[10px] font-bold text-slate-400">Streak 🔥</p>
        </div>
      </div>

      {/* Action List */}
      <div className="divide-y divide-slate-100 text-xs">
        <button
          onClick={() => navigate('/test')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left transition"
        >
          <div className="flex items-center gap-3 text-slate-900 font-bold">
            <Sparkle size={18} className="text-[#8B5CF6]" />
            <span>Personality Type Details & Archetype</span>
          </div>
          <CaretRight size={16} className="text-slate-400" />
        </button>

        <button
          onClick={() => setActiveTab('discover')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left transition"
        >
          <div className="flex items-center gap-3 text-slate-900 font-bold">
            <BookmarkSimple size={18} className="text-[#EF4444]" />
            <span>Saved Activities ({savedActivityIds.length})</span>
          </div>
          <CaretRight size={16} className="text-slate-400" />
        </button>

        <button
          onClick={() => navigate('/invites')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left transition"
        >
          <div className="flex items-center gap-3 text-slate-900 font-bold">
            <Buildings size={18} className="text-[#10B981]" />
            <span>Corporate Subscription & Invites</span>
          </div>
          <CaretRight size={16} className="text-slate-400" />
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left text-[#1AB0DC] transition"
        >
          <div className="flex items-center gap-3 font-bold">
            <Desktop size={18} />
            <span>Switch to Desktop Version</span>
          </div>
          <CaretRight size={16} />
        </button>

        <button
          onClick={() => setActiveScreen('login')}
          className="w-full p-4 flex items-center justify-between hover:bg-red-50 text-left text-[#EF4444] transition"
        >
          <div className="flex items-center gap-3 font-bold">
            <SignOut size={18} />
            <span>Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}
