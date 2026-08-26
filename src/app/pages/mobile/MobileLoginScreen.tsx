import React from 'react';
import { motion } from 'motion/react';
import { CaretLeft, EnvelopeSimple, LockKey } from '@phosphor-icons/react';
import kaleidoscope from '@/imports/CS_Kaleidescope_Juice_Drop.png';

interface MobileLoginScreenProps {
  emailInput: string;
  setEmailInput: (val: string) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  setActiveScreen: (screen: any) => void;
  handleDemoLogin: (type: 'client' | 'corporate') => void;
}

export function MobileLoginScreen({
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
  setActiveScreen,
  handleDemoLogin,
}: MobileLoginScreenProps) {
  return (
    <div className="relative flex flex-col h-full bg-[#F7FCFF] text-[#1A1A28] justify-between p-5 overflow-hidden font-sans isolate">
      {/* Inverted Prism Kaleidoscope Top Graphic */}
      <div className="absolute top-[-598px] left-[-437px] w-[839px] h-[839px] pointer-events-none z-0 flex items-center justify-center">
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={kaleidoscope}
            alt="CreativeSelf Inverted Prism"
            className="w-full h-full object-cover scale-110 rotate-[-139.79deg]"
            style={{ opacity: 0.2 }}
          />
        </div>
      </div>

      {/* Soft Gradient Overlay (Subtly stronger for contrast) */}
      <div
        className="absolute top-[-40px] left-0 right-0 h-[220px] pointer-events-none z-2"
        style={{
          background: 'linear-gradient(180deg, rgba(247, 252, 255, 0.92) 0%, rgba(247, 252, 255, 0.7) 55%, rgba(247, 252, 255, 0) 100%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Top Navigation Row */}
      <div className="relative z-10 space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveScreen('onboarding')}
            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-2xs border border-gray-200/60 flex items-center justify-center text-gray-700 hover:bg-white transition"
          >
            <CaretLeft size={18} weight="bold" />
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('client')}
            className="text-[12px] font-semibold text-[#00B0D9] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#33C4F0]/30 shadow-2xs"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Quick Demo
          </button>
        </div>
      </div>

      {/* Login Form Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-14 pb-4 sm:pt-16 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#1A1A28] leading-[29px]" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
              Welcome Back 👋
            </h1>
            <p className="text-[12px] font-normal text-[#6A7282] leading-[18px] mt-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Sign in to access your creative wellness workspace and manage bookings.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5 pt-1">
            {/* Email / Username */}
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A28] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Email or Username
              </label>
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[12px] font-medium text-[#1A1A28]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Password
                </label>
                <button type="button" className="text-[11px] font-semibold text-[#33C4F0] hover:underline" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Forgot Password?
                </button>
              </div>
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
      </div>

      {/* Fixed Bottom Action Container */}
      <div className="relative z-20 shrink-0 pt-3 pb-1 space-y-2.5 bg-[#F7FCFF]">
        <button
          type="button"
          onClick={() => handleDemoLogin('client')}
          className="w-full h-[46px] flex items-center justify-center font-bold text-[14px] text-white bg-gradient-to-r from-[#33C4F0] to-[#00B0D9] shadow-md shadow-[#33C4F0]/30 hover:opacity-95 transition active:scale-[0.99]"
          style={{ borderRadius: '26px 26px 62px 26px', fontFamily: 'Poppins, sans-serif' }}
        >
          Log In
        </button>

        <button
          type="button"
          onClick={() => setActiveScreen('register')}
          className="w-full text-center text-[14px] font-semibold text-[#6A7282] hover:text-[#1A1A28] transition py-1"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Don't have an account? <span className="text-[#33C4F0] font-semibold underline">Create Account</span>
        </button>
      </div>
    </div>
  );
}
