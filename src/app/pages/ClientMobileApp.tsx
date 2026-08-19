import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  DeviceMobile,
  Sparkle,
  Compass,
  CalendarBlank,
  User,
  House,
  MagnifyingGlass,
  CaretRight,
  CaretLeft,
  ArrowRight,
  CheckCircle,
  QrCode,
  Star,
  MapPin,
  Clock,
  Heart,
  ChatCircle,
  BookmarkSimple,
  ShareNetwork,
  Buildings,
  LockKey,
  EnvelopeSimple,
  Phone,
  ShieldCheck,
  X,
  Desktop,
  Check,
  Ticket,
  Smiley,
  ArrowsLeftRight,
  SlidersHorizontal,
  Bell,
  Gear,
  SignOut,
  Lightning,
  Palette,
  Flower,
  Moon,
} from '@phosphor-icons/react';
import { samplePostsData, PostData } from '../data/postsData';
import { mockActivities, themeCategories, Activity } from '../data/subscriptionData';

type ScreenType = 'onboarding' | 'login' | 'register' | 'feed' | 'discover' | 'bookings' | 'profile';
type TabType = 'feed' | 'discover' | 'bookings' | 'profile';

export function ClientMobileApp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initial screen from query param or default to onboarding
  const initialScreen = (searchParams.get('screen') as ScreenType) || 'onboarding';

  const [activeScreen, setActiveScreen] = useState<ScreenType>(initialScreen);
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [viewMode, setViewMode] = useState<'mockup' | 'fullscreen'>('mockup');

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Auth state
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [regStep, setRegStep] = useState(1);
  const [regName, setRegName] = useState('');
  const [regAccountType, setRegAccountType] = useState<'individual' | 'corporate'>('individual');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Mindfulness & Calm', 'Creative Expression']);

  // Client App states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [selectedQrPass, setSelectedQrPass] = useState<any | null>(null);
  const [moodCheckIn, setMoodCheckIn] = useState<string | null>('😌 Calm');
  const [savedActivityIds, setSavedActivityIds] = useState<string[]>(['beginner-painting-workshop', 'desk-to-mat-yoga']);
  const [likedPostIds, setLikedPostIds] = useState<string[]>(['breathe', 'colour']);

  // Bookings list state
  const [myBookings, setMyBookings] = useState([
    {
      id: 'bk-101',
      activityName: 'Desk-to-Mat Restorative Yoga',
      vendorName: 'Maya Ellison Mindful Movement',
      date: 'Wed, Aug 21, 2026',
      time: '12:15 PM - 1:00 PM',
      location: 'Ortigas Studio • Room 302',
      status: 'Confirmed',
      seats: 1,
      color: '#10B981',
      symbol: '🧘',
      qrCode: 'CS-YOGA-8921-2026',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'bk-102',
      activityName: 'Watercolour Without Perfection',
      vendorName: 'Studio Lumen',
      date: 'Fri, Aug 23, 2026',
      time: '3:00 PM - 4:30 PM',
      location: 'Shoreditch Studio',
      status: 'Confirmed',
      seats: 2,
      color: '#EF4444',
      symbol: '🎨',
      qrCode: 'CS-ART-4412-2026',
      image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=800&q=80',
    },
  ]);

  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);
  const [bookingSelectedSlot, setBookingSelectedSlot] = useState<string>('');

  const onboardingSlides = [
    {
      title: 'Discover Creative Wellness',
      subtitle: 'Nurture your mind, body & soul through curated artistic experiences.',
      desc: 'Connect with verified sound healers, watercolour studios, movement coaches, and culinary crafts.',
      icon: '🎨',
      bgGradient: 'from-[#33C4F0]/20 via-[#E8F9FF] to-[#FFF]',
      accentColor: '#33C4F0',
    },
    {
      title: 'Personalized Archetypes',
      subtitle: 'Tailored recommendations based on your personality test results.',
      desc: 'Whether you are a Harmonious Creator or an Energetic Explorer, unlock sessions crafted for your vibe.',
      icon: '✨',
      bgGradient: 'from-[#8B5CF6]/20 via-[#F3E8FF] to-[#FFF]',
      accentColor: '#8B5CF6',
    },
    {
      title: 'Corporate Benefits',
      subtitle: 'Seamlessly redeem company wellbeing allowances & join team sessions.',
      desc: 'Use corporate credits for personal retreats or sync with coworkers for group movement breaks.',
      icon: '🏛️',
      bgGradient: 'from-[#10B981]/20 via-[#ECFDF5] to-[#FFF]',
      accentColor: '#10B981',
    },
    {
      title: 'Book & Track Growth',
      subtitle: 'Instant mobile scheduling with digital passes & mood tracking.',
      desc: 'Check in with a single QR code, save favorite practitioners, and watch your creative streak blossom.',
      icon: '📱',
      bgGradient: 'from-[#F59E0B]/20 via-[#FEF3C7] to-[#FFF]',
      accentColor: '#F59E0B',
    },
  ];

  // Quick Demo Login Handler
  const handleDemoLogin = (type: 'client' | 'corporate') => {
    if (type === 'corporate') {
      setRegName('Alex Morgan (Corporate Client)');
    } else {
      setRegName('Sophia Chen (Individual Client)');
    }
    setActiveScreen('feed');
    setActiveTab('feed');
  };

  // Toggle Save Activity
  const toggleSaveActivity = (id: string) => {
    setSavedActivityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Like Post
  const toggleLikePost = (id: string) => {
    setLikedPostIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle Book Session
  const handleConfirmBooking = (activity: Activity) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      activityName: activity.name,
      vendorName: activity.vendorName,
      date: activity.schedule[0]?.date || 'Upcoming Date',
      time: bookingSelectedSlot || activity.schedule[0]?.time || '2:00 PM - 3:30 PM',
      location: activity.location,
      status: 'Confirmed',
      seats: 1,
      color: activity.color,
      symbol: activity.symbol,
      qrCode: `CS-BOOK-${Math.floor(1000 + Math.random() * 9000)}-2026`,
      image: activity.image,
    };
    setMyBookings([newBooking, ...myBookings]);
    setSelectedActivity(null);
    setBookingSuccessMsg(`🎉 Successfully booked "${activity.name}"!`);
    setTimeout(() => setBookingSuccessMsg(null), 4000);
    setActiveScreen('bookings');
    setActiveTab('bookings');
  };

  // Render Inner Content of Mobile Screen
  const renderMobileScreenContent = () => {
    // 1. ONBOARDING SCREEN
    if (activeScreen === 'onboarding') {
      const slide = onboardingSlides[onboardingStep];
      return (
        <div className={`flex flex-col h-full bg-gradient-to-b ${slide.bgGradient} justify-between p-6 overflow-y-auto`}>
          {/* Top Bar */}
          <div className="flex items-center justify-between pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#1AB0DC] bg-white/80 border border-[#33C4F0]/30 shadow-sm">
              <Sparkle size={12} weight="fill" /> CreativeSelf Mobile
            </span>
            <button
              onClick={() => setActiveScreen('login')}
              className="text-xs font-bold text-[#717182] hover:text-[#1A1A28] transition py-1 px-3 rounded-full hover:bg-white/60"
            >
              Skip
            </button>
          </div>

          {/* Center Graphic & Info */}
          <div className="flex flex-col items-center text-center my-auto py-6">
            <motion.div
              key={onboardingStep}
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative mb-6"
            >
              <div
                className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl shadow-xl border border-white/60"
                style={{
                  background: `linear-gradient(135deg, white 0%, ${slide.accentColor}20 100%)`,
                  boxShadow: `0 20px 40px ${slide.accentColor}30`,
                }}
              >
                {slide.icon}
              </div>
              <div
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                style={{ backgroundColor: slide.accentColor }}
              >
                {onboardingStep + 1}
              </div>
            </motion.div>

            <motion.h2
              key={`t-${onboardingStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-extrabold text-[#1A1A28] mb-2 leading-tight"
            >
              {slide.title}
            </motion.h2>

            <p className="text-xs font-semibold text-[#1AB0DC] mb-3 px-2">
              {slide.subtitle}
            </p>

            <p className="text-xs text-[#555566] leading-relaxed max-w-xs px-2">
              {slide.desc}
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-4 pb-2">
            {/* Dots */}
            <div className="flex justify-center gap-2">
              {onboardingSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setOnboardingStep(idx)}
                  className={`h-2 rounded-full transition-all ${
                    onboardingStep === idx
                      ? 'w-6 bg-[#33C4F0]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            {onboardingStep < onboardingSlides.length - 1 ? (
              <button
                onClick={() => setOnboardingStep((prev) => prev + 1)}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] shadow-lg shadow-[#33C4F0]/30 hover:opacity-95 flex items-center justify-center gap-2 transition active:scale-[0.99]"
              >
                Continue <CaretRight size={16} weight="bold" />
              </button>
            ) : (
              <button
                onClick={() => setActiveScreen('login')}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] shadow-lg shadow-[#33C4F0]/30 hover:opacity-95 flex items-center justify-center gap-2 transition active:scale-[0.99]"
              >
                Get Started Now <Sparkle size={16} weight="fill" />
              </button>
            )}

            <button
              onClick={() => setActiveScreen('login')}
              className="text-xs text-center font-semibold text-[#717182] hover:text-[#1A1A28]"
            >
              Already have an account? <span className="text-[#1AB0DC] underline font-bold">Log In</span>
            </button>
          </div>
        </div>
      );
    }

    // 2. LOGIN SCREEN
    if (activeScreen === 'login') {
      return (
        <div className="flex flex-col h-full bg-white justify-between p-6 overflow-y-auto">
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between pt-2 mb-6">
              <button
                onClick={() => setActiveScreen('onboarding')}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <span className="text-xs font-extrabold text-[#717182] uppercase tracking-wider">Client Mobile Login</span>
              <button
                onClick={() => handleDemoLogin('client')}
                className="text-xs font-bold text-[#1AB0DC] bg-[#E8F9FF] px-2.5 py-1 rounded-full border border-[#33C4F0]/30"
              >
                Demo
              </button>
            </div>

            <h1 className="text-2xl font-black text-[#1A1A28] mb-1">Welcome Back 👋</h1>
            <p className="text-xs text-[#717182] mb-6">Sign in to manage your bookings and access creative wellbeing.</p>

            {/* Auth Method Tabs */}
            <div className="flex rounded-xl bg-gray-100 p-1 mb-5">
              <button
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  authMethod === 'phone'
                    ? 'bg-white text-[#1A1A28] shadow-sm'
                    : 'text-[#717182] hover:text-[#1A1A28]'
                }`}
              >
                Phone (OTP)
              </button>
              <button
                onClick={() => setAuthMethod('email')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  authMethod === 'email'
                    ? 'bg-white text-[#1A1A28] shadow-sm'
                    : 'text-[#717182] hover:text-[#1A1A28]'
                }`}
              >
                Email & Password
              </button>
            </div>

            {/* Input Form */}
            {authMethod === 'phone' ? (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-[#717182] mb-1.5 uppercase">Mobile Phone Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-gray-500">+1</span>
                    <input
                      type="tel"
                      placeholder="(555) 000-1234"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-[#1A1A28] focus:outline-none focus:border-[#33C4F0]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-[#717182] mb-1.5 uppercase">Email Address</label>
                  <input
                    type="email"
                    placeholder="alex.morgan@company.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-[#1A1A28] focus:outline-none focus:border-[#33C4F0]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-[#717182] uppercase">Password</label>
                    <button type="button" className="text-[10px] font-bold text-[#1AB0DC]">Forgot?</button>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-[#1A1A28] focus:outline-none focus:border-[#33C4F0]"
                  />
                </div>
              </div>
            )}

            {/* Login Action */}
            <button
              onClick={() => handleDemoLogin('client')}
              className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] shadow-md shadow-[#33C4F0]/30 hover:opacity-95 transition mb-4 active:scale-[0.99]"
            >
              Sign In to App
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[10px] font-bold text-gray-400 uppercase">Or continue with</span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                type="button"
                onClick={() => handleDemoLogin('corporate')}
                className="py-2.5 px-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-xs font-semibold text-[#1A1A28] hover:bg-gray-50 transition"
              >
                <Buildings size={16} className="text-[#10B981]" /> Corporate SSO
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('client')}
                className="py-2.5 px-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-xs font-semibold text-[#1A1A28] hover:bg-gray-50 transition"
              >
                <span className="font-bold text-xs">G</span> Google
              </button>
            </div>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="bg-[#E8F9FF]/60 rounded-2xl p-3.5 border border-[#33C4F0]/20 mb-4">
            <p className="text-[11px] font-extrabold text-[#147C9E] mb-2 flex items-center gap-1">
              <Sparkle size={13} weight="fill" /> Quick Demo Test Accounts:
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDemoLogin('client')}
                className="flex-1 py-2 px-2 bg-white rounded-lg text-[10px] font-bold text-[#1A1A28] border border-gray-200 hover:border-[#33C4F0] shadow-2xs text-center"
              >
                👤 Individual Client
              </button>
              <button
                onClick={() => handleDemoLogin('corporate')}
                className="flex-1 py-2 px-2 bg-white rounded-lg text-[10px] font-bold text-[#10B981] border border-gray-200 hover:border-[#10B981] shadow-2xs text-center"
              >
                🏢 Corporate Employee
              </button>
            </div>
          </div>

          {/* Switch to Register */}
          <div className="text-center pb-2">
            <p className="text-xs text-[#717182]">
              Don't have a CreativeSelf account?{' '}
              <button
                onClick={() => setActiveScreen('register')}
                className="text-[#1AB0DC] font-bold underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      );
    }

    // 3. REGISTER SCREEN
    if (activeScreen === 'register') {
      return (
        <div className="flex flex-col h-full bg-white justify-between p-6 overflow-y-auto">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pt-2 mb-4">
              <button
                onClick={() => setActiveScreen('login')}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <span className="text-xs font-extrabold text-[#717182] uppercase tracking-wider">Step {regStep} of 2</span>
              <div className="w-9" />
            </div>

            <h1 className="text-2xl font-black text-[#1A1A28] mb-1">Create Account 🚀</h1>
            <p className="text-xs text-[#717182] mb-5">Start your personalized creative wellbeing journey.</p>

            {regStep === 1 ? (
              <div className="space-y-3.5 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-[#717182] mb-1 uppercase">Full Name</label>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-[#1A1A28] focus:outline-none focus:border-[#33C4F0]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#717182] mb-1 uppercase">Email or Mobile Number</label>
                  <input
                    type="text"
                    placeholder="alex@company.com or +1 (555) 000-1234"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-[#1A1A28] focus:outline-none focus:border-[#33C4F0]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#717182] mb-1 uppercase">Account Type</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setRegAccountType('individual')}
                      className={`p-3 rounded-xl border text-left transition ${
                        regAccountType === 'individual'
                          ? 'border-[#33C4F0] bg-[#E8F9FF] text-[#147C9E]'
                          : 'border-gray-200 bg-white text-[#717182]'
                      }`}
                    >
                      <User size={20} className="mb-1" />
                      <p className="text-xs font-bold">Individual</p>
                      <p className="text-[10px] opacity-80">Personal account</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegAccountType('corporate')}
                      className={`p-3 rounded-xl border text-left transition ${
                        regAccountType === 'corporate'
                          ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46]'
                          : 'border-gray-200 bg-white text-[#717182]'
                      }`}
                    >
                      <Buildings size={20} className="mb-1" />
                      <p className="text-xs font-bold">Corporate</p>
                      <p className="text-[10px] opacity-80">Employee credits</p>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-[#717182] mb-2 uppercase">Select Your Wellbeing Goals</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Mindfulness & Calm 🧘',
                      'Creative Expression 🎨',
                      'Movement & Flow 💃',
                      'Chocolate & Culinary 🍫',
                      'Tech & Making 🤖',
                      'Outward Exploration ⛰️',
                      'Stress Reset 🌿',
                      'Team Connection 🤝',
                    ].map((goal) => {
                      const isSelected = selectedGoals.includes(goal);
                      return (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => {
                            setSelectedGoals((prev) =>
                              isSelected ? prev.filter((g) => g !== goal) : [...prev, goal]
                            );
                          }}
                          className={`py-2 px-3 rounded-full text-xs font-bold border transition ${
                            isSelected
                              ? 'bg-[#33C4F0] text-white border-[#33C4F0] shadow-2xs'
                              : 'bg-gray-50 text-[#555566] border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {isSelected && '✓ '}
                          {goal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {regAccountType === 'corporate' && (
                  <div className="bg-[#ECFDF5] p-3.5 rounded-xl border border-[#10B981]/30">
                    <label className="block text-[10px] font-bold text-[#065F46] uppercase mb-1">Company Code (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. ACME-WELLNESS-2026"
                      className="w-full px-3 py-2 rounded-lg border border-[#10B981]/30 text-xs font-semibold text-[#1A1A28] bg-white focus:outline-none"
                    />
                    <p className="text-[10px] text-[#047857] mt-1">Unlocks instant $250 quarterly wellness credits.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div>
            {regStep === 1 ? (
              <button
                onClick={() => setRegStep(2)}
                className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] shadow-md shadow-[#33C4F0]/30 hover:opacity-95 transition mb-3 active:scale-[0.99]"
              >
                Next Step: Select Goals →
              </button>
            ) : (
              <button
                onClick={() => handleDemoLogin('client')}
                className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] shadow-md shadow-[#33C4F0]/30 hover:opacity-95 transition mb-3 active:scale-[0.99]"
              >
                Complete Registration 🎉
              </button>
            )}

            <p className="text-center text-xs text-[#717182]">
              Already have an account?{' '}
              <button onClick={() => setActiveScreen('login')} className="text-[#1AB0DC] font-bold underline">
                Log In
              </button>
            </p>
          </div>
        </div>
      );
    }

    // MAIN CLIENT APP CONTENT (Tabs: Feed, Discover, Bookings, Profile)
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] justify-between relative overflow-hidden">
        {/* TOP STATUS / HEADER BAR */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#33C4F0] to-[#1AB0DC] flex items-center justify-center text-white font-bold text-xs shadow-2xs">
              {regName ? regName.charAt(0) : 'A'}
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A28] leading-none">
                {regName || 'Alex Morgan'}
              </p>
              <p className="text-[10px] text-[#1AB0DC] font-semibold">Harmonious Creator 🎨</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('bookings')}
              className="relative p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-xs"
              title="Notifications & Passes"
            >
              <Bell size={16} />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#EF4444] rounded-full" />
            </button>
            <button
              onClick={() => setViewMode((mode) => (mode === 'mockup' ? 'fullscreen' : 'mockup'))}
              className="p-1.5 px-2.5 rounded-full bg-[#E8F9FF] text-[#147C9E] text-[10px] font-bold border border-[#33C4F0]/30 hover:bg-[#33C4F0]/20 transition flex items-center gap-1"
              title="Toggle View Mode"
            >
              <Desktop size={13} /> {viewMode === 'mockup' ? 'Full' : 'Frame'}
            </button>
          </div>
        </div>

        {/* NOTIFICATION TOAST */}
        <AnimatePresence>
          {bookingSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-14 inset-x-3 z-50 bg-[#10B981] text-white p-3 rounded-xl shadow-xl text-xs font-bold flex items-center justify-between"
            >
              <span>{bookingSuccessMsg}</span>
              <button onClick={() => setBookingSuccessMsg(null)}>
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB 1: FEED / HOME */}
        {activeTab === 'feed' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            {/* Daily Mood Check-In Widget */}
            <div className="bg-gradient-to-r from-[#33C4F0]/15 to-[#1AB0DC]/10 p-3.5 rounded-2xl border border-[#33C4F0]/25">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-extrabold text-[#1A1A28] flex items-center gap-1">
                  <Smiley size={16} className="text-[#1AB0DC]" /> Daily Mood Check-in
                </p>
                <span className="text-[10px] font-bold text-[#1AB0DC] bg-white px-2 py-0.5 rounded-full shadow-2xs">
                  {moodCheckIn}
                </span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { label: '😌 Calm', icon: Flower },
                  { label: '⚡ Energized', icon: Lightning },
                  { label: '🎨 Creative', icon: Palette },
                  { label: '🧘 Grounded', icon: Sparkle },
                  { label: '😴 Rested', icon: Moon },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setMoodCheckIn(item.label)}
                    className={`py-1.5 px-2.5 rounded-xl text-[11px] font-bold flex items-center gap-1 whitespace-nowrap transition ${
                      moodCheckIn === item.label
                        ? 'bg-[#33C4F0] text-white shadow-2xs'
                        : 'bg-white text-[#555566] hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Corporate Credit Allowance Banner */}
            <div className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white p-3.5 rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider opacity-90">Corporate Wellbeing Allowance</p>
                <p className="text-lg font-black leading-tight">$150.00 / $250</p>
                <p className="text-[10px] opacity-80">Q3 Allowance expires Sept 30</p>
              </div>
              <button
                onClick={() => setActiveTab('discover')}
                className="py-2 px-3 bg-white text-[#047857] text-xs font-bold rounded-xl shadow-2xs hover:bg-gray-100 transition"
              >
                Use Credits
              </button>
            </div>

            {/* Personality Test CTA Banner */}
            <div
              onClick={() => navigate('/test')}
              className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs cursor-pointer hover:border-[#33C4F0] transition flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center text-xl shrink-0">
                ✨
              </div>
              <div className="flex-1">
                <p className="text-xs font-extrabold text-[#1A1A28]">Wellness Personality Test</p>
                <p className="text-[11px] text-[#717182]">Discover your archetype & unlock tailored sessions</p>
              </div>
              <CaretRight size={16} className="text-gray-400" />
            </div>

            {/* Trending Feed Header */}
            <div className="flex items-center justify-between pt-1">
              <h3 className="text-xs font-black text-[#1A1A28] uppercase tracking-wider">
                Trending Creative Feed
              </h3>
              <span className="text-[10px] font-bold text-[#1AB0DC]">{samplePostsData.length} Posts</span>
            </div>

            {/* Feed Post List */}
            {samplePostsData.map((post) => {
              const isLiked = likedPostIds.includes(post.id);
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden"
                >
                  {/* Post Header */}
                  <div className="p-3 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{post.emoji}</span>
                      <div>
                        <p className="text-xs font-bold text-[#1A1A28]">{post.provider}</p>
                        <p className="text-[10px] text-[#717182]">{post.handle} • {post.category}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#1AB0DC] bg-[#E8F9FF] px-2 py-0.5 rounded-full">
                      {post.duration}
                    </span>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div
                      className="h-40 w-full overflow-hidden relative cursor-pointer"
                      onClick={() => setSelectedPost(post)}
                    >
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                        <p className="text-white text-xs font-bold line-clamp-1">{post.title}</p>
                      </div>
                    </div>
                  )}

                  {/* Post Body & Actions */}
                  <div className="p-3">
                    <p className="text-xs text-[#555566] line-clamp-2 mb-3 leading-relaxed">
                      {post.copy}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-50">
                      <div className="flex items-center gap-4 text-[#717182]">
                        <button
                          onClick={() => toggleLikePost(post.id)}
                          className={`flex items-center gap-1 font-bold ${
                            isLiked ? 'text-[#EF4444]' : 'hover:text-[#1A1A28]'
                          }`}
                        >
                          <Heart size={16} weight={isLiked ? 'fill' : 'regular'} />
                          <span>{post.likes + (isLiked ? 1 : 0)}</span>
                        </button>
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="flex items-center gap-1 font-bold hover:text-[#1A1A28]"
                        >
                          <ChatCircle size={16} />
                          <span>{post.comments}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-[11px] font-bold text-[#1AB0DC] hover:underline"
                      >
                        Read Full Story →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: DISCOVER */}
        {activeTab === 'discover' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            {/* Search Input */}
            <div className="relative">
              <MagnifyingGlass size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search watercolour, sound bath, yoga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-xs font-semibold text-[#1A1A28] focus:outline-none focus:border-[#33C4F0] shadow-2xs"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {themeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-1.5 px-3 rounded-full text-xs font-bold flex items-center gap-1 whitespace-nowrap transition ${
                    selectedCategory === cat.id
                      ? 'bg-[#1A1A28] text-white shadow-2xs'
                      : 'bg-white text-[#717182] border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span>{cat.symbol}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Activities List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-[#1A1A28] uppercase tracking-wider">
                  Available Sessions ({mockActivities.length})
                </h3>
                <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                  Corporate Eligible
                </span>
              </div>

              {mockActivities
                .filter((act) => {
                  const matchesCat = selectedCategory === 'all' || act.vendorName.toLowerCase().includes(selectedCategory.toLowerCase()) || act.category.toLowerCase().includes(selectedCategory.toLowerCase());
                  const matchesSearch = !searchQuery || act.name.toLowerCase().includes(searchQuery.toLowerCase()) || act.description.toLowerCase().includes(searchQuery.toLowerCase());
                  return matchesCat && matchesSearch;
                })
                .map((act) => {
                  const isSaved = savedActivityIds.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden hover:border-[#33C4F0]/40 transition"
                    >
                      <div className="relative h-36 w-full">
                        <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleSaveActivity(act.id)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md ${
                            isSaved ? 'text-[#EF4444]' : 'text-gray-600'
                          }`}
                        >
                          <BookmarkSimple size={16} weight={isSaved ? 'fill' : 'regular'} />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <span>{act.symbol}</span> {act.category}
                        </div>
                      </div>

                      <div className="p-3">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-xs font-extrabold text-[#1A1A28] line-clamp-1">{act.name}</h4>
                          <span className="text-[11px] font-bold text-[#F59E0B] flex items-center gap-0.5 shrink-0 ml-2">
                            <Star size={12} weight="fill" /> {act.rating}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#717182] font-semibold mb-2">{act.vendorName}</p>

                        <div className="flex items-center gap-3 text-[10px] text-[#555566] mb-3">
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {act.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {act.location}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                          <span className="text-[10px] font-extrabold text-[#10B981]">
                            1 Corporate Credit or $45
                          </span>
                          <button
                            onClick={() => setSelectedActivity(act)}
                            className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] text-white text-xs font-bold shadow-2xs hover:opacity-95 transition"
                          >
                            Book Session
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-[#1A1A28] uppercase tracking-wider">
                My Mobile Passes ({myBookings.length})
              </h3>
              <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                Active Passes
              </span>
            </div>

            {myBookings.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 p-6">
                <CalendarBlank size={36} className="text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-[#1A1A28]">No Bookings Yet</p>
                <p className="text-[11px] text-[#717182] mb-3">Discover sessions and book your first experience.</p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="py-2 px-4 bg-[#33C4F0] text-white text-xs font-bold rounded-xl"
                >
                  Explore Sessions
                </button>
              </div>
            ) : (
              myBookings.map((bk) => (
                <div key={bk.id} className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-3.5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ backgroundColor: `${bk.color}20` }}
                    >
                      {bk.symbol}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                          {bk.status}
                        </span>
                        <span className="text-[10px] font-bold text-[#717182]">{bk.seats} Ticket</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#1A1A28] truncate mt-0.5">{bk.activityName}</h4>
                      <p className="text-[11px] text-[#717182]">{bk.vendorName}</p>
                    </div>
                  </div>

                  <div className="bg-[#F8FAFC] p-2.5 rounded-xl space-y-1 text-[11px]">
                    <div className="flex items-center justify-between text-[#1A1A28] font-semibold">
                      <span className="flex items-center gap-1 text-gray-500"><Clock size={12} /> Date & Time:</span>
                      <span>{bk.date} • {bk.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#1A1A28] font-semibold">
                      <span className="flex items-center gap-1 text-gray-500"><MapPin size={12} /> Location:</span>
                      <span className="truncate max-w-[160px]">{bk.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setSelectedQrPass(bk)}
                      className="flex-1 py-2 px-3 bg-[#1A1A28] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs hover:bg-[#2A2A3E] transition"
                    >
                      <QrCode size={16} /> Show Mobile Pass
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            {/* User Info Header */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#33C4F0] to-[#1AB0DC] text-white flex items-center justify-center text-xl font-bold shadow-md">
                {regName ? regName.charAt(0) : 'A'}
              </div>
              <div>
                <h3 className="text-sm font-black text-[#1A1A28]">{regName || 'Alex Morgan'}</h3>
                <p className="text-xs text-[#1AB0DC] font-semibold">Harmonious Creator 🎨</p>
                <p className="text-[10px] text-[#717182]">Acme Corp • Senior Designer</p>
              </div>
            </div>

            {/* Wellness Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center">
                <p className="text-lg font-black text-[#33C4F0]">12</p>
                <p className="text-[10px] font-bold text-[#717182]">Sessions</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center">
                <p className="text-lg font-black text-[#8B5CF6]">18.5h</p>
                <p className="text-[10px] font-bold text-[#717182]">Mindful Hours</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center">
                <p className="text-lg font-black text-[#10B981]">5 Days</p>
                <p className="text-[10px] font-bold text-[#717182]">Streak 🔥</p>
              </div>
            </div>

            {/* Quick Actions List */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 text-xs">
              <button
                onClick={() => navigate('/test')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-left"
              >
                <div className="flex items-center gap-2.5 text-[#1A1A28] font-bold">
                  <Sparkle size={18} className="text-[#8B5CF6]" />
                  <span>Personality Test Results</span>
                </div>
                <CaretRight size={16} className="text-gray-400" />
              </button>

              <button
                onClick={() => setActiveTab('discover')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-left"
              >
                <div className="flex items-center gap-2.5 text-[#1A1A28] font-bold">
                  <BookmarkSimple size={18} className="text-[#EF4444]" />
                  <span>Saved Activities ({savedActivityIds.length})</span>
                </div>
                <CaretRight size={16} className="text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/invites')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-left"
              >
                <div className="flex items-center gap-2.5 text-[#1A1A28] font-bold">
                  <Buildings size={18} className="text-[#10B981]" />
                  <span>Corporate Perks & Invites</span>
                </div>
                <CaretRight size={16} className="text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-left text-[#1AB0DC]"
              >
                <div className="flex items-center gap-2.5 font-extrabold">
                  <Desktop size={18} />
                  <span>Switch to Desktop Version</span>
                </div>
                <CaretRight size={16} />
              </button>

              <button
                onClick={() => setActiveScreen('login')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-red-50 text-left text-[#EF4444]"
              >
                <div className="flex items-center gap-2.5 font-bold">
                  <SignOut size={18} />
                  <span>Log Out</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION BAR */}
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 px-3 py-2 flex items-center justify-around absolute bottom-0 inset-x-0 z-30 shadow-lg">
          {[
            { id: 'feed', label: 'Feed', icon: House },
            { id: 'discover', label: 'Discover', icon: Compass },
            { id: 'bookings', label: 'Bookings', icon: CalendarBlank, badge: myBookings.length },
            { id: 'profile', label: 'Profile', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition relative ${
                  isActive ? 'text-[#33C4F0] font-bold' : 'text-[#717182] hover:text-[#1A1A28]'
                }`}
              >
                <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                <span className="text-[10px]">{tab.label}</span>
                {tab.badge ? (
                  <span className="absolute top-0 right-2 w-4 h-4 bg-[#33C4F0] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* MODAL: ACTIVITY DETAIL & BOOKING SHEET */}
        <AnimatePresence>
          {selectedActivity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end justify-center"
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="bg-white rounded-t-3xl w-full max-h-[85%] overflow-y-auto p-5 space-y-4 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center gap-2 text-xs font-bold text-[#33C4F0]">
                  <span>{selectedActivity.symbol}</span> {selectedActivity.category}
                </div>

                <h2 className="text-base font-black text-[#1A1A28] leading-snug">
                  {selectedActivity.name}
                </h2>
                <p className="text-xs font-semibold text-[#717182]">{selectedActivity.vendorName}</p>

                <div className="h-40 rounded-2xl overflow-hidden">
                  <img src={selectedActivity.image} alt={selectedActivity.name} className="w-full h-full object-cover" />
                </div>

                <p className="text-xs text-[#555566] leading-relaxed">{selectedActivity.description}</p>

                {/* Highlights */}
                <div>
                  <p className="text-[11px] font-extrabold text-[#1A1A28] uppercase mb-2">Highlights</p>
                  <ul className="space-y-1.5">
                    {selectedActivity.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-[#555566] flex items-start gap-2">
                        <CheckCircle size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Time Slot Picker */}
                <div>
                  <p className="text-[11px] font-extrabold text-[#1A1A28] uppercase mb-2">Available Slot</p>
                  <div className="space-y-2">
                    {selectedActivity.schedule.map((sch) => (
                      <button
                        key={sch.id}
                        onClick={() => setBookingSelectedSlot(`${sch.date} • ${sch.time}`)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                          bookingSelectedSlot.includes(sch.date)
                            ? 'border-[#33C4F0] bg-[#E8F9FF] text-[#147C9E] font-bold'
                            : 'border-gray-200 bg-white text-[#1A1A28] font-semibold'
                        }`}
                      >
                        <div>
                          <p>{sch.date}</p>
                          <p className="text-[10px] text-[#717182]">{sch.time}</p>
                        </div>
                        <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                          {sch.seatsLeft} seats left
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Book Action Button */}
                <button
                  onClick={() => handleConfirmBooking(selectedActivity)}
                  className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] shadow-lg shadow-[#33C4F0]/30 hover:opacity-95 transition active:scale-[0.99]"
                >
                  Confirm & Redeem Mobile Booking →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL: POST DETAIL VIEW */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end justify-center"
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="bg-white rounded-t-3xl w-full max-h-[85%] overflow-y-auto p-5 space-y-4 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedPost.emoji}</span>
                  <div>
                    <p className="text-xs font-bold text-[#1A1A28]">{selectedPost.provider}</p>
                    <p className="text-[10px] text-[#717182]">{selectedPost.category}</p>
                  </div>
                </div>

                <h2 className="text-base font-black text-[#1A1A28] leading-snug">{selectedPost.title}</h2>

                {selectedPost.image && (
                  <div className="h-44 rounded-2xl overflow-hidden">
                    <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <p className="text-xs text-[#555566] leading-relaxed whitespace-pre-line">
                  {selectedPost.fullStory || selectedPost.copy}
                </p>

                {selectedPost.highlights && (
                  <div className="bg-[#F8FAFC] p-3 rounded-xl border border-gray-100">
                    <p className="text-[11px] font-extrabold text-[#1A1A28] mb-1.5 uppercase">Highlights</p>
                    <ul className="space-y-1 text-xs text-[#555566]">
                      {selectedPost.highlights.map((h, idx) => (
                        <li key={idx}>• {h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL: QR CODE CHECK-IN PASS */}
        <AnimatePresence>
          {selectedQrPass && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl w-full max-w-xs p-5 text-center space-y-4 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedQrPass(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                >
                  <X size={16} />
                </button>

                <div className="w-12 h-12 rounded-full bg-[#E8F9FF] text-[#147C9E] flex items-center justify-center text-2xl mx-auto">
                  {selectedQrPass.symbol}
                </div>

                <div>
                  <p className="text-xs font-bold text-[#10B981]">Confirmed Mobile Pass</p>
                  <h3 className="text-sm font-black text-[#1A1A28] line-clamp-1">{selectedQrPass.activityName}</h3>
                  <p className="text-[11px] text-[#717182]">{selectedQrPass.vendorName}</p>
                </div>

                {/* Simulated QR Code */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col items-center justify-center">
                  <QrCode size={120} className="text-[#1A1A28]" />
                  <p className="text-[10px] font-mono font-bold text-gray-500 mt-2">{selectedQrPass.qrCode}</p>
                </div>

                <div className="text-[11px] text-[#717182] space-y-0.5">
                  <p>📅 {selectedQrPass.date}</p>
                  <p>⏰ {selectedQrPass.time}</p>
                  <p>📍 {selectedQrPass.location}</p>
                </div>

                <button
                  onClick={() => setSelectedQrPass(null)}
                  className="w-full py-2.5 bg-[#1A1A28] text-white text-xs font-bold rounded-xl"
                >
                  Done
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-2 sm:p-6 text-slate-100 font-sans relative overflow-x-hidden">
      {/* Top Banner Control Bar (Outside Phone) */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 px-2 z-10">
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700"
          >
            <CaretLeft size={16} /> Exit to Desktop Web App
          </Link>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
            CreativeSelf Mobile Edition • Client Focus
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-800/90 p-1 rounded-full border border-slate-700">
          <button
            onClick={() => setViewMode('mockup')}
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
              viewMode === 'mockup'
                ? 'bg-[#33C4F0] text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DeviceMobile size={14} /> iPhone Frame
          </button>
          <button
            onClick={() => setViewMode('fullscreen')}
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
              viewMode === 'fullscreen'
                ? 'bg-[#33C4F0] text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Desktop size={14} /> Full Screen
          </button>
        </div>
      </div>

      {/* RENDER MOCKUP VS FULLSCREEN */}
      {viewMode === 'mockup' ? (
        /* PHONE CONTAINER MOCKUP */
        <div className="relative my-auto">
          {/* External Ambient Glow */}
          <div className="absolute -inset-4 rounded-[60px] bg-gradient-to-r from-[#33C4F0]/30 to-[#8B5CF6]/30 blur-2xl opacity-75" />

          {/* Smartphone Hardware Frame */}
          <div className="relative w-[360px] h-[740px] bg-[#1E293B] rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-slate-700/80 flex flex-col">
            {/* Top Notch / Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-40 flex items-center justify-between px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <div className="w-2 h-2 rounded-full bg-[#10B981]/80" />
            </div>

            {/* Mobile Screen Surface */}
            <div className="w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col relative pt-5 shadow-inner">
              {/* iOS Status Bar */}
              <div className="h-6 px-6 flex items-center justify-between text-[11px] font-bold text-slate-900 z-30 select-none pointer-events-none">
                <span>09:41</span>
                <div className="flex items-center gap-1 text-[10px]">
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-slate-800 rounded-xs p-0.5 flex items-center">
                    <div className="w-full h-full bg-slate-900 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-hidden relative">
                {renderMobileScreenContent()}
              </div>

              {/* iOS Home Bar */}
              <div className="h-4 bg-white flex items-center justify-center z-30">
                <div className="w-32 h-1 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* FULLSCREEN RESPONSIVE CONTAINER */
        <div className="w-full max-w-md h-[780px] bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden relative flex flex-col border border-slate-800">
          <div className="flex-1 overflow-hidden relative">
            {renderMobileScreenContent()}
          </div>
        </div>
      )}
    </div>
  );
}
