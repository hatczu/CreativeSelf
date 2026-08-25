import React from 'react';
import { motion } from 'motion/react';
import { CaretLeft, Check, User, EnvelopeSimple, LockKey, Buildings } from '@phosphor-icons/react';
import kaleidoscope from '@/imports/CS_Kaleidescope_Juice_Drop.png';

interface MobileRegisterScreenProps {
  regStep: number;
  setRegStep: (step: number) => void;
  regName: string;
  setRegName: (val: string) => void;
  emailInput: string;
  setEmailInput: (val: string) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  regAccountType: 'individual' | 'corporate';
  setRegAccountType: (val: 'individual' | 'corporate') => void;
  setPlanCategory: (val: 'individual' | 'corporate') => void;
  setOrgSize: (val: string) => void;
  orgSize: string;
  companyNameInput: string;
  setCompanyNameInput: (val: string) => void;
  industryInput: string;
  setIndustryInput: (val: string) => void;
  selectedPlanId: string;
  setSelectedPlanId: (val: string) => void;
  setActiveScreen: (screen: any) => void;
  handleDemoLogin: (type: 'client' | 'corporate') => void;
}

export function MobileRegisterScreen({
  regStep,
  setRegStep,
  regName,
  setRegName,
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
  regAccountType,
  setRegAccountType,
  setPlanCategory,
  setOrgSize,
  orgSize,
  companyNameInput,
  setCompanyNameInput,
  industryInput,
  setIndustryInput,
  selectedPlanId,
  setSelectedPlanId,
  setActiveScreen,
  handleDemoLogin,
}: MobileRegisterScreenProps) {
  return (
    <div className="relative flex flex-col h-full bg-[#F7FCFF] text-[#1A1A28] justify-between p-5 overflow-hidden font-sans isolate">
      {/* Inverted Prism Kaleidoscope Top Graphic */}
      <div className="absolute top-[-598px] left-[-437px] w-[839px] h-[839px] pointer-events-none z-0 flex items-center justify-center">
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={kaleidoscope}
            alt="CreativeSelf Inverted Prism"
            className="w-full h-full object-cover scale-110 rotate-[-139.79deg]"
          />
        </div>
      </div>

      {/* Soft Cyan Blur Overlay */}
      <div
        className="absolute top-[-40px] left-0 right-0 h-[180px] pointer-events-none z-2"
        style={{
          background: 'linear-gradient(180deg, rgba(218, 250, 255, 0.88) 0%, rgba(218, 250, 255, 0.52) 60%, rgba(247, 252, 255, 0) 100%)',
          filter: 'blur(65px)',
        }}
      />

      {/* Top Navigation Row */}
      <div className="relative z-10 space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (regStep > 1) {
                setRegStep(regStep - 1);
              } else {
                setActiveScreen('onboarding');
              }
            }}
            className="w-9 h-9 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#1A1A28] hover:bg-slate-200 transition shadow-2xs"
          >
            <CaretLeft size={18} weight="bold" />
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen('login')}
            className="text-[14px] font-semibold text-[#33C4F0] hover:underline"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Log in
          </button>
        </div>

        {/* 4-Segment Line Progress Bar */}
        <div className="flex items-center gap-2 w-full h-1">
          <div className={`h-1 flex-1 rounded-full transition-all ${regStep >= 1 ? 'bg-[#33C4F0]' : 'bg-[#E5E7EB]'}`} />
          <div className={`h-1 flex-1 rounded-full transition-all ${regStep >= 2 ? 'bg-[#33C4F0]' : 'bg-[#E5E7EB]'}`} />
          <div className={`h-1 flex-1 rounded-full transition-all ${regStep >= 3 ? 'bg-[#33C4F0]' : 'bg-[#E5E7EB]'}`} />
          <div className={`h-1 flex-1 rounded-full transition-all ${regStep >= 4 ? 'bg-[#33C4F0]' : 'bg-[#E5E7EB]'}`} />
        </div>
      </div>

      {/* Step Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-10 pb-4 sm:pt-12 space-y-4">
        {regStep === 1 ? (
          /* Step 1: Enter Username & Details */
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <h1 className="text-[24px] font-bold text-[#1A1A28] leading-[29px] font-sans" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
                Enter Username
              </h1>
              <p className="text-[12px] font-normal text-[#6A7282] leading-[18px] mt-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                This will be your public handle and part of your unique page link, fans will use this to support you.
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A28] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Full Name</label>
                <div className="relative flex items-center">
                  <User size={18} className="absolute left-3.5 text-[#99A1AF]" />
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] text-xs font-normal text-[#1A1A28] focus:outline-none focus:border-[#33C4F0] placeholder-[#2A2A3A]/50 shadow-2xs"
                    style={{ borderRadius: '14px 14px 32px 14px', fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#1A1A28] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Email</label>
                <div className="relative flex items-center">
                  <EnvelopeSimple size={18} className="absolute left-3.5 text-[#99A1AF]" />
                  <input
                    type="email"
                    placeholder="youname@email.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] text-xs font-normal text-[#1A1A28] focus:outline-none focus:border-[#33C4F0] placeholder-[#2A2A3A]/50 shadow-2xs"
                    style={{ borderRadius: '14px 14px 32px 14px', fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#1A1A28] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Password</label>
                <div className="relative flex items-center">
                  <LockKey size={18} className="absolute left-3.5 text-[#99A1AF]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] text-xs font-normal text-[#1A1A28] focus:outline-none focus:border-[#33C4F0] placeholder-[#2A2A3A]/50 shadow-2xs"
                    style={{ borderRadius: '14px 14px 32px 14px', fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : regStep === 2 ? (
          /* Step 2: Account Purpose */
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <h1 className="text-[24px] font-bold text-[#1A1A28] leading-[29px]" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
                How will you use CreativeSelf?
              </h1>
              <p className="text-[12px] font-normal text-[#6A7282] leading-[18px] mt-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Select your account type to configure individual or corporate features.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div
                onClick={() => {
                  setRegAccountType('individual');
                  setPlanCategory('individual');
                  setOrgSize('just-me');
                }}
                className={`cursor-pointer p-4 border text-left flex items-center justify-between transition-all ${
                  regAccountType === 'individual'
                    ? 'border-[#33C4F0] bg-white shadow-xs ring-1 ring-[#33C4F0]/30'
                    : 'border-[#E5E7EB] bg-white'
                }`}
                style={{ borderRadius: '14px 14px 32px 14px' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ECFEFF] text-[#007595] flex items-center justify-center">
                    <User size={20} weight="bold" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A1A28]">Individual Explorer</p>
                    <p className="text-[11px] text-[#6A7282]">Personal creative wellness & AI</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  regAccountType === 'individual' ? 'bg-[#33C4F0] border-[#33C4F0] text-white' : 'border-slate-300'
                }`}>
                  {regAccountType === 'individual' && <Check size={12} weight="bold" />}
                </div>
              </div>

              <div
                onClick={() => {
                  setRegAccountType('corporate');
                  setPlanCategory('corporate');
                  if (orgSize === 'just-me') setOrgSize('0-50');
                }}
                className={`cursor-pointer p-4 border text-left flex items-center justify-between transition-all ${
                  regAccountType === 'corporate'
                    ? 'border-[#33C4F0] bg-white shadow-xs ring-1 ring-[#33C4F0]/30'
                    : 'border-[#E5E7EB] bg-white'
                }`}
                style={{ borderRadius: '14px 14px 32px 14px' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Buildings size={20} weight="bold" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A1A28]">Corporate & Team</p>
                    <p className="text-[11px] text-[#6A7282]">Employee credits & analytics</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  regAccountType === 'corporate' ? 'bg-[#33C4F0] border-[#33C4F0] text-white' : 'border-slate-300'
                }`}>
                  {regAccountType === 'corporate' && <Check size={12} weight="bold" />}
                </div>
              </div>
            </div>
          </motion.div>
        ) : regStep === 3 ? (
          /* Step 3: Organization Details */
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <h1 className="text-[24px] font-bold text-[#1A1A28] leading-[29px]" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
                Tell us about your organization
              </h1>
              <p className="text-[12px] font-normal text-[#6A7282] leading-[18px] mt-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Provide your organization details to customize your workspace.
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A28] mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Creative Agency"
                  value={companyNameInput}
                  onChange={(e) => setCompanyNameInput(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-xs font-normal text-[#1A1A28] focus:outline-none focus:border-[#33C4F0] shadow-2xs"
                  style={{ borderRadius: '14px 14px 32px 14px', fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#1A1A28] mb-1">Industry / Focus Area</label>
                <select
                  value={industryInput}
                  onChange={(e) => setIndustryInput(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-xs font-normal text-[#1A1A28] focus:outline-none focus:border-[#33C4F0] shadow-2xs"
                  style={{ borderRadius: '14px 14px 32px 14px', fontFamily: 'Poppins, sans-serif' }}
                >
                  <option value="Technology & Design">Technology & Design</option>
                  <option value="Creative Arts & Media">Creative Arts & Media</option>
                  <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                  <option value="Education & Non-Profit">Education & Non-Profit</option>
                  <option value="Corporate & Financial Services">Corporate & Financial Services</option>
                </select>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Step 4: Plan Selection */
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <h1 className="text-[24px] font-bold text-[#1A1A28] leading-[29px]" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
                Select your CreativeSelf plan
              </h1>
              <p className="text-[12px] font-normal text-[#6A7282] leading-[18px] mt-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Tailored learning & wellness packages to elevate your creative growth.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {[
                {
                  id: 'basic-creative',
                  title: 'Basic Creative',
                  price: '$7',
                  period: '/month',
                  popular: false,
                  features: ['1 service brand', '2 activities'],
                },
                {
                  id: 'advanced-creative',
                  title: 'Advanced Creative',
                  price: '$18',
                  period: '/month',
                  popular: true,
                  features: ['2 service brands', '4 activities'],
                },
                {
                  id: 'elite-creative',
                  title: 'Elite Creative',
                  price: '$35',
                  period: '/month',
                  popular: false,
                  features: ['Unlimited service brands', 'Unlimited activities'],
                },
              ].map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`cursor-pointer p-4 sm:p-4.5 transition-all relative border ${
                    plan.popular
                      ? 'bg-[#00B0D9] text-white shadow-md border-[#00B0D9]'
                      : selectedPlanId === plan.id
                      ? 'bg-white border-[#33C4F0] text-[#1A1A28] ring-1 ring-[#33C4F0]'
                      : 'bg-white border-[#E5E7EB] text-[#1A1A28]'
                  }`}
                  style={{ borderRadius: '16px 16px 36px 16px' }}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 right-4 bg-amber-400 text-slate-950 font-semibold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
                      + Most Popular
                    </span>
                  )}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className={`text-[11px] font-extrabold uppercase tracking-wider ${plan.popular ? 'text-white' : 'text-slate-500'}`}>
                        {plan.title}
                      </p>
                      <p className="text-2xl font-black leading-none">{plan.price} <span className="text-xs font-medium opacity-80">{plan.period}</span></p>

                      <div className="pt-2 space-y-1">
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[12px]">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-white/20 text-white' : 'bg-[#ECFEFF] text-[#007595]'}`}>
                              <Check size={10} weight="bold" />
                            </div>
                            <span className={plan.popular ? 'text-white/90 font-medium' : 'text-[#6A7282] font-medium'}>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      selectedPlanId === plan.id ? (plan.popular ? 'bg-white text-[#00B0D9] border-white' : 'bg-[#33C4F0] text-white border-[#33C4F0]') : 'border-slate-300'
                    }`}>
                      {selectedPlanId === plan.id && <Check size={12} weight="bold" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Pinned Bottom Action Group */}
      <div className="relative z-20 shrink-0 pt-3 pb-1 space-y-2 bg-[#F7FCFF]">
        <button
          type="button"
          onClick={() => {
            if (regStep < 4) {
              setRegStep(regStep + 1);
            } else {
              handleDemoLogin('client');
            }
          }}
          className="w-full h-[46px] flex items-center justify-center text-white text-[14px] font-bold shadow-md transition-all duration-200 active:scale-[0.99] hover:opacity-95"
          style={{
            backgroundColor: '#33C4F0',
            borderRadius: '26px 26px 62px 26px',
            fontFamily: 'Century Gothic, Poppins, sans-serif',
          }}
        >
          {regStep === 4 ? 'Complete Registration' : 'Continue'}
        </button>

        {regStep > 1 ? (
          <button
            type="button"
            onClick={() => setRegStep(regStep - 1)}
            className="w-full h-[46px] flex items-center justify-center bg-[#F0F9FF] text-[#33C4F0] text-[14px] font-bold transition hover:bg-[#E0F2FE] active:scale-[0.99]"
            style={{
              borderRadius: '26px 26px 62px 26px',
              fontFamily: 'Century Gothic, Poppins, sans-serif',
            }}
          >
            Back
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setActiveScreen('login')}
            className="w-full text-center text-[14px] font-semibold text-[#6A7282] hover:text-[#1A1A28] transition py-1"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Already have an account? <span className="text-[#33C4F0] font-semibold underline">Log in</span>
          </button>
        )}
      </div>
    </div>
  );
}
