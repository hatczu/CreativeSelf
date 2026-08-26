import React from 'react';
import { motion } from 'motion/react';
import kaleidoscope from '@/imports/CS_Kaleidescope_Juice_Drop.png';
import logoIcon from '@/imports/Logo.png';

export interface OnboardingSlide {
  titlePrefix: string;
  titleHighlight: string;
  highlightColor: string;
  subtext: string;
  buttonColor: string;
  buttonText: string;
  accentGradient: string;
}

interface MobileOnboardingScreenProps {
  onboardingStep: number;
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>;
  onboardingSlides: OnboardingSlide[];
  handleDemoLogin: (type: 'client' | 'corporate') => void;
  setActiveScreen: (screen: any) => void;
  setRegStep: (step: number) => void;
}

export function MobileOnboardingScreen({
  onboardingStep,
  setOnboardingStep,
  onboardingSlides,
  handleDemoLogin,
  setActiveScreen,
  setRegStep,
}: MobileOnboardingScreenProps) {
  const slide = onboardingSlides[onboardingStep];

  return (
    <div className="relative flex flex-col h-full bg-[#F7FCFF] text-[#1A1A28] justify-between overflow-hidden font-sans isolate">
      {/* 1. BOTTOM LAYER: Prism Kaleidoscope Top Graphic */}
      <div className="absolute top-[-260px] sm:top-[-280px] left-1/2 -translate-x-1/2 w-[560px] h-[560px] sm:w-[660px] sm:h-[660px] pointer-events-none z-10 flex items-center justify-center">
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={kaleidoscope}
            alt="CreativeSelf Kaleidoscope Prism"
            className="w-full h-full object-cover scale-110 rotate-[2.3deg]"
          />
        </div>
      </div>

      {/* 2. MIDDLE LAYER: Soft Cyan Blur Overlay */}
      <div
        className="absolute top-[-40px] left-0 right-0 h-[220px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(180deg, rgba(247, 252, 255, 0.92) 0%, rgba(247, 252, 255, 0.7) 55%, rgba(247, 252, 255, 0) 100%)',
          filter: 'blur(45px)',
        }}
      />

      {/* 3. TOP LAYER: CreativeSelf Logo */}
      <div className="absolute top-[40px] sm:top-[50px] left-1/2 -translate-x-1/2 pointer-events-none z-30 flex items-center justify-center">
        <img
          src={logoIcon}
          alt="CreativeSelf Logo"
          className="w-16 h-16 sm:w-18 sm:h-18 object-contain drop-shadow-lg"
        />
      </div>

      {/* Bottom Gradient Accent Row */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[135px] pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, #33C4F0 0%, rgba(255, 255, 255, 0) 100%)',
          opacity: 0.2,
          transform: 'scaleY(-1)',
        }}
      />

      {/* Upper Right Teardrop Watermark Shape */}
      <div
        className="absolute left-[285px] bottom-[395px] w-[135px] h-[135px] pointer-events-none z-5 transition-all duration-500"
        style={{
          background: slide.accentGradient,
          opacity: 0.25,
          borderRadius: '999px 0px 999px 999px',
        }}
      />

      {/* Top Skip Button Header */}
      <div className="relative z-30 flex items-center justify-end p-5 pt-3">
        <button
          onClick={() => handleDemoLogin('client')}
          className="text-[14px] font-medium text-white transition py-1 px-3 rounded-full hover:opacity-80 drop-shadow-md"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Skip
        </button>
      </div>

      {/* Spacer positioning text lower down */}
      <div className="h-[265px] sm:h-[285px] shrink-0 z-3 pointer-events-none" />

      {/* Middle Onboarding Content Box */}
      <div className="relative z-10 flex flex-col justify-start items-center px-6 flex-1 text-center overflow-y-auto">
        {/* Title & Subtext Group */}
        <div className="space-y-2.5 w-full max-w-[320px] pt-2">
          <motion.h2
            key={`title-${onboardingStep}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[24px] font-bold text-[#1A1A28] leading-[29px] tracking-tight"
            style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
          >
            {slide.titlePrefix}
            <span style={{ color: slide.highlightColor }}>{slide.titleHighlight}</span>
          </motion.h2>

          <motion.p
            key={`sub-${onboardingStep}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-[14px] font-normal text-[#6A7282] leading-[21px]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {slide.subtext}
          </motion.p>
        </div>
      </div>

      {/* Pinned Bottom Action Group */}
      <div className="relative z-20 shrink-0 px-6 pb-6 pt-2 flex flex-col items-center gap-3 w-full">
        {/* Row of 4 Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 h-2 mb-1">
          {onboardingSlides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setOnboardingStep(idx)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: idx === onboardingStep ? s.buttonColor : '#D9D9D9',
              }}
              aria-label={`Go to onboarding slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Main Action Button */}
        <button
          onClick={() => {
            if (onboardingStep < onboardingSlides.length - 1) {
              setOnboardingStep((prev) => prev + 1);
            } else {
              setRegStep(1);
              setActiveScreen('register');
            }
          }}
          className="w-full max-w-[340px] h-[46px] flex items-center justify-center text-white text-[14px] font-bold transition-all duration-200 active:scale-[0.99] hover:opacity-95"
          style={{
            backgroundColor: slide.buttonColor,
            borderRadius: '26px 26px 62px 26px',
            boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            fontFamily: 'Century Gothic, Poppins, sans-serif',
          }}
        >
          {slide.buttonText}
        </button>

        {/* Footer Login Link */}
        <button
          onClick={() => setActiveScreen('login')}
          className="text-[14px] font-medium text-[#6A7282] hover:text-[#1A1A28] transition"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Already have an account? <span className="text-[#00B0D9] font-medium underline">Log in</span>
        </button>
      </div>
    </div>
  );
}
