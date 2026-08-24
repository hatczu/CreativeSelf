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
  Users,
  PaperPlaneRight,
  PaperPlaneRight as Send,
  Images as PhotosIcon,
} from '@phosphor-icons/react';
import { samplePostsData, PostData } from '../data/postsData';
import { mockVendors, mockActivities, themeCategories, Activity } from '../data/subscriptionData';

type ScreenType = 'onboarding' | 'login' | 'register' | 'feed' | 'discover' | 'bookings' | 'profile';
type TabType = 'feed' | 'discover' | 'bookings' | 'profile';

const brandStories = [
  {
    id: 'art',
    name: 'Art',
    emoji: '🎨',
    vendorId: 'abc-creative-studio',
    vendorName: 'ABC Creative Studio',
    title: 'Watercolour & Expressive Painting Masterclass',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-purple-500 via-pink-400 to-[#33C4F0]',
    quote: 'Express yourself freely without worrying about perfection.',
    category: 'Heart of Art',
  },
  {
    id: 'yoga',
    name: 'Yoga',
    emoji: '🧘',
    vendorId: 'maya-ellison-studio',
    vendorName: 'Maya Ellison Mindful Movement',
    title: 'Restorative Desk-to-Mat Yoga Flow',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-[#33C4F0] via-teal-400 to-emerald-400',
    quote: 'Reset your spine and calm your thoughts with daily breathwork.',
    category: 'Athletic Fanatics',
  },
  {
    id: 'tasting',
    name: 'Tasting',
    emoji: '🍫',
    vendorId: 'cocoa-collective',
    vendorName: 'Cocoa Collective',
    title: 'Artisanal Dark Chocolate & Cocoa Bean Pairing',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-amber-400 via-orange-400 to-rose-400',
    quote: 'Savor rich cocoa aromas and learn bean-to-bar tempering secrets.',
    category: 'Chowdown',
  },
  {
    id: 'rhythm',
    name: 'Rhythm',
    emoji: '💃',
    vendorId: 'rhythm-room',
    vendorName: 'The Rhythm Room',
    title: 'Expressive Dance & Vinyl DJ Jam Sessions',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-purple-500 via-indigo-500 to-sky-400',
    quote: 'Unlock high energy and joy through improvisational movement.',
    category: 'Moves & Grooves',
  },
  {
    id: 'robotics',
    name: 'Robotics',
    emoji: '🤖',
    vendorId: 'digital-makers-lab',
    vendorName: 'Technut Makers Studio',
    title: 'Creative Robotics & 3D Printed Prototyping',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    quote: 'Build interactive electronic widgets with code & hands-on assembly.',
    category: 'Technut',
  },
  {
    id: 'photo',
    name: 'Photo',
    emoji: '📸',
    vendorId: 'outward-exploration-co',
    vendorName: 'Outward Exploration Co.',
    title: 'Urban Heritage & Mobile Portrait Walk',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-rose-400 via-[#33C4F0] to-purple-500',
    quote: 'Capture secret architectural angles and natural light contrasts.',
    category: 'Trip and Tell',
  },
];

export function ClientMobileApp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initial screen from query param or default to onboarding
  const initialScreen = (searchParams.get('screen') as ScreenType) || 'onboarding';

  const [activeScreen, setActiveScreen] = useState<ScreenType>(initialScreen);
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Auth state
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [jobTitleInput, setJobTitleInput] = useState('');
  const [regStep, setRegStep] = useState(1);
  const [regName, setRegName] = useState('');
  const [regAccountType, setRegAccountType] = useState<'individual' | 'corporate'>('individual');
  const [orgSize, setOrgSize] = useState('just-me');
  const [companyNameInput, setCompanyNameInput] = useState('');
  const [industryInput, setIndustryInput] = useState('Technology & Design');
  const [websiteInput, setWebsiteInput] = useState('');
  const [planCategory, setPlanCategory] = useState<'individual' | 'corporate'>('individual');
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('advanced-creative');
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
  const [postDetailImgIdx, setPostDetailImgIdx] = useState<number>(0);
  const [postDetailCommentText, setPostDetailCommentText] = useState<string>('');
  const [postDetailComments, setPostDetailComments] = useState<Record<string, any[]>>({});
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);

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

    // 3. REGISTER SCREEN (Aligned 1-to-1 with RegisterPage Fields in Light Mode CreativeSelf Design System)
    if (activeScreen === 'register') {
      return (
        <div className="flex flex-col h-full bg-[#F8FAFC] text-[#1A1A28] justify-between p-5 overflow-y-auto font-sans relative">
          <div>
            {/* Top Bar Navigation */}
            <div className="flex items-center justify-between pt-1 mb-3">
              {regStep === 4 ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#33C4F0]/15 flex items-center justify-center text-[#1AB0DC]">
                    <Sparkle size={18} weight="fill" />
                  </div>
                  <span className="text-xs font-black tracking-wider text-[#1A1A28] uppercase">CreativeSelf</span>
                </div>
              ) : regStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setRegStep(regStep - 1)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#1A1A28] hover:bg-slate-200 transition"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveScreen('login')}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#1A1A28] hover:bg-slate-200 transition"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>
              )}

              {regStep < 4 ? (
                <span className="text-[11px] font-extrabold text-[#717182] uppercase tracking-wider">
                  Step {regStep} of 4
                </span>
              ) : null}

              {regStep === 4 ? (
                <button
                  type="button"
                  onClick={() => handleDemoLogin('client')}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#1A1A28] hover:bg-slate-200 transition"
                >
                  <X size={16} weight="bold" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveScreen('login')}
                  className="text-xs font-semibold text-[#717182] hover:text-[#1A1A28]"
                >
                  Log in
                </button>
              )}
            </div>

            {/* Segmented Line Progress Bar (for Steps 1-3) */}
            {regStep < 4 && (
              <div className="grid grid-cols-4 gap-1.5 mb-5">
                {[1, 2, 3, 4].map((sNum) => (
                  <div
                    key={sNum}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      regStep >= sNum ? 'bg-[#1A1A28]' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            )}

            {regStep === 1 ? (
              /* Step 1: Personal Details */
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A28] tracking-tight mb-1">
                  Enter Your Details
                </h1>
                <p className="text-xs text-[#717182] leading-relaxed mb-4">
                  Create your personal profile to unlock curated activity recommendations.
                </p>

                <div className="space-y-3 mb-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1A28] mb-1 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-3 rounded-full border border-slate-200 text-xs font-medium text-[#1A1A28] focus:outline-none focus:border-[#1A1A28] bg-white placeholder-slate-400 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1A28] mb-1 ml-1">Work / Personal Email</label>
                    <input
                      type="email"
                      placeholder="alex@company.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-full border border-slate-200 text-xs font-medium text-[#1A1A28] focus:outline-none focus:border-[#1A1A28] bg-white placeholder-slate-400 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1A28] mb-1 ml-1">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-full border border-slate-200 text-xs font-medium text-[#1A1A28] focus:outline-none focus:border-[#1A1A28] bg-white placeholder-slate-400 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1A28] mb-1 ml-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-full border border-slate-200 text-xs font-medium text-[#1A1A28] focus:outline-none focus:border-[#1A1A28] bg-white placeholder-slate-400 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1A28] mb-1 ml-1">Job Title / Role (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Creative Lead, Founder"
                      value={jobTitleInput}
                      onChange={(e) => setJobTitleInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-full border border-slate-200 text-xs font-medium text-[#1A1A28] focus:outline-none focus:border-[#1A1A28] bg-white placeholder-slate-400 shadow-2xs"
                    />
                  </div>
                </div>
              </motion.div>
            ) : regStep === 2 ? (
              /* Step 2: Team Scale & Purpose */
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A28] tracking-tight mb-1">
                  How will you use CreativeSelf?
                </h1>
                <p className="text-xs text-[#717182] leading-relaxed mb-4">
                  Choose your scale so we can configure individual or corporate features for you.
                </p>

                <div className="space-y-3 mb-5">
                  <div
                    onClick={() => {
                      setRegAccountType('individual');
                      setPlanCategory('individual');
                      setOrgSize('just-me');
                    }}
                    className={`cursor-pointer p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                      regAccountType === 'individual'
                        ? 'border-[#1A1A28] bg-white ring-1 ring-[#1A1A28] shadow-sm'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[#1A1A28]">
                        <User size={18} weight="bold" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1A1A28]">Individual Explorer</p>
                        <p className="text-[10px] text-[#717182]">Personal creative activities & AI coaching</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      regAccountType === 'individual' ? 'bg-[#1A1A28] border-[#1A1A28] text-white' : 'border-slate-300'
                    }`}>
                      {regAccountType === 'individual' && <Check size={10} weight="bold" />}
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setRegAccountType('corporate');
                      setPlanCategory('corporate');
                      if (orgSize === 'just-me') setOrgSize('0-50');
                    }}
                    className={`cursor-pointer p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                      regAccountType === 'corporate'
                        ? 'border-[#1A1A28] bg-white ring-1 ring-[#1A1A28] shadow-sm'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Buildings size={18} weight="bold" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1A1A28]">Corporate & Team Benefits</p>
                        <p className="text-[10px] text-[#717182]">Employee wellness credits & team analytics</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      regAccountType === 'corporate' ? 'bg-[#1A1A28] border-[#1A1A28] text-white' : 'border-slate-300'
                    }`}>
                      {regAccountType === 'corporate' && <Check size={10} weight="bold" />}
                    </div>
                  </div>
                </div>

                {regAccountType === 'corporate' && (
                  <div className="mb-5 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <label className="block text-[11px] font-bold text-[#1A1A28] mb-2">Select Team Employee Count:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: '0-50', label: '0 - 50 employees' },
                        { id: '51-200', label: '51 - 200 employees' },
                        { id: '201-500', label: '201 - 500 employees' },
                        { id: '500+', label: '500+ employees' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setOrgSize(opt.id)}
                          className={`py-2 px-2 text-[11px] font-medium rounded-full transition border ${
                            orgSize === opt.id
                              ? 'bg-[#1A1A28] text-white border-[#1A1A28]'
                              : 'bg-slate-50 text-[#1A1A28] border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : regStep === 3 ? (
              /* Step 3: Organization Details */
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A28] tracking-tight mb-1">
                  Tell us about your organization
                </h1>
                <p className="text-xs text-[#717182] leading-relaxed mb-4">
                  Provide your organization details to customize your workspace.
                </p>

                <div className="space-y-3.5 mb-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1A28] mb-1 ml-1">Company / Organization Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Creative Agency"
                      value={companyNameInput}
                      onChange={(e) => setCompanyNameInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-full border border-slate-200 text-xs font-medium text-[#1A1A28] focus:outline-none focus:border-[#1A1A28] bg-white placeholder-slate-400 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1A28] mb-1 ml-1">Industry / Focus Area</label>
                    <select
                      value={industryInput}
                      onChange={(e) => setIndustryInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-full border border-slate-200 text-xs font-medium text-[#1A1A28] focus:outline-none focus:border-[#1A1A28] bg-white shadow-2xs"
                    >
                      <option value="Technology & Design">Technology & Design</option>
                      <option value="Creative Arts & Media">Creative Arts & Media</option>
                      <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                      <option value="Education & Non-Profit">Education & Non-Profit</option>
                      <option value="Corporate & Financial Services">Corporate & Financial Services</option>
                      <option value="Freelance / Individual">Freelance / Individual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1A28] mb-1 ml-1">Company Website (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://company.com"
                      value={websiteInput}
                      onChange={(e) => setWebsiteInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-full border border-slate-200 text-xs font-medium text-[#1A1A28] focus:outline-none focus:border-[#1A1A28] bg-white placeholder-slate-400 shadow-2xs"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Step 4: Light Mode CreativeSelf Paywall (Cover Carousel + Stacked Cards) */
              (() => {
                const planDetailsMap: Record<string, {
                  title: string;
                  btnText: string;
                  benefits: { icon: string; text: string }[];
                }> = {
                  'advanced-creative': {
                    title: 'Level up your growth with the Pro plan',
                    btnText: 'Upgrade to Pro',
                    benefits: [
                      { icon: '🎧', text: 'Unlimited, 24/7 activity reservations*' },
                      { icon: '🪐', text: 'Explore 100+ workshops & wellness experiences' },
                      { icon: '🧠', text: 'Acumen AI personalized coaching & recommendations' },
                      { icon: '✨', text: 'Priority booking, VIP masterclasses & more' },
                    ],
                  },
                  'basic-creative': {
                    title: 'Level up your growth with the Pro Monthly plan',
                    btnText: 'Subscribe to Pro',
                    benefits: [
                      { icon: '🎧', text: 'Flexible month-to-month reservation access*' },
                      { icon: '🪐', text: 'Access to 100+ workshops & experiences' },
                      { icon: '🧠', text: 'Acumen AI personalized insights & guidance' },
                      { icon: '✨', text: 'Cancel anytime in App Store' },
                    ],
                  },
                  'elite-creative': {
                    title: 'Level up your growth with the Lifetime VIP plan',
                    btnText: 'Upgrade to Lifetime VIP',
                    benefits: [
                      { icon: '👑', text: 'Permanent lifetime unlimited access*' },
                      { icon: '🪐', text: 'Unlimited access to all present & future brands' },
                      { icon: '🧠', text: '1-on-1 dedicated mentor & executive coaching' },
                      { icon: '✨', text: 'Executive VIP events & priority reservations' },
                    ],
                  },
                };

                const currentPlan = planDetailsMap[selectedPlanId] || planDetailsMap['advanced-creative'];

                return (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    {/* Cover Art Cards Horizontal Carousel (CreativeSelf Pastel Theme) */}
                    <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-none">
                      <div className="w-24 sm:w-28 h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 p-3 flex flex-col justify-between shrink-0 shadow-sm border border-amber-300 relative overflow-hidden">
                        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                        <span className="text-[10px] font-black text-[#1A1A28] bg-white/90 px-1.5 py-0.5 rounded-md self-start relative z-10">Ceramics</span>
                        <p className="text-xs font-black text-white relative z-10">Potting & Clay</p>
                      </div>

                      <div className="w-24 sm:w-28 h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-[#33C4F0] to-[#1AB0DC] p-3 flex flex-col justify-between shrink-0 shadow-sm border border-cyan-300 relative overflow-hidden">
                        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                        <span className="text-[10px] font-black text-[#1A1A28] bg-white/90 px-1.5 py-0.5 rounded-md self-start relative z-10">Art</span>
                        <p className="text-xs font-black text-white relative z-10">Oil Painting</p>
                      </div>

                      <div className="w-24 sm:w-28 h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 flex flex-col justify-between shrink-0 shadow-sm border border-emerald-400 relative overflow-hidden">
                        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                        <span className="text-[10px] font-black text-[#1A1A28] bg-white/90 px-1.5 py-0.5 rounded-md self-start relative z-10">Wellness</span>
                        <p className="text-xs font-black text-white relative z-10">Mindfulness</p>
                      </div>

                      <div className="w-24 sm:w-28 h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 p-3 flex flex-col justify-between shrink-0 shadow-sm border border-rose-400 relative overflow-hidden">
                        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                        <span className="text-[10px] font-black text-[#1A1A28] bg-white/90 px-1.5 py-0.5 rounded-md self-start relative z-10">Culinary</span>
                        <p className="text-xs font-black text-white relative z-10">Artisan Bread</p>
                      </div>
                    </div>

                    {/* Headline Title & Icon Benefit List (Light Mode) */}
                    <div>
                      <h1 className="text-lg sm:text-xl font-extrabold text-[#1A1A28] tracking-tight leading-snug mb-3">
                        {currentPlan.title}
                      </h1>

                      <div className="space-y-2 text-xs text-[#1A1A28]">
                        {currentPlan.benefits.map((b, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <span className="text-sm shrink-0 leading-none">{b.icon}</span>
                            <span className="font-semibold text-slate-700 text-[11px] leading-tight">{b.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vertical Stacked Subscription Cards (Light Mode CreativeSelf Style) */}
                    <div className="space-y-2.5 pt-1">
                      {/* Card 1: Pro Yearly */}
                      <div
                        onClick={() => setSelectedPlanId('advanced-creative')}
                        className={`cursor-pointer p-3.5 rounded-2xl transition-all relative ${
                          selectedPlanId === 'advanced-creative'
                            ? 'bg-white border-2 border-[#1AB0DC] ring-2 ring-[#33C4F0]/20 shadow-sm text-[#1A1A28]'
                            : 'bg-white border border-slate-200 text-[#1A1A28] hover:border-slate-300'
                        }`}
                      >
                        {/* MOST POPULAR Amber Badge */}
                        <div className="absolute -top-2.5 right-4 bg-amber-400 text-slate-900 font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
                          MOST POPULAR
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-extrabold text-[#1A1A28]">Pro Yearly</p>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-base font-black text-[#1A1A28]">$39.00</span>
                              <span className="text-[10px] text-[#717182] font-semibold">/ yr</span>
                            </div>
                            <p className="text-[10px] text-[#717182] mt-1 font-medium">
                              Best value — $3.25/mo, paid annually.
                            </p>
                          </div>

                          {/* Checkmark Circle */}
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            selectedPlanId === 'advanced-creative' ? 'bg-[#1AB0DC] text-white' : 'border border-slate-300 text-transparent'
                          }`}>
                            <Check size={11} weight="bold" />
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Pro Monthly */}
                      <div
                        onClick={() => setSelectedPlanId('basic-creative')}
                        className={`cursor-pointer p-3.5 rounded-2xl transition-all relative ${
                          selectedPlanId === 'basic-creative'
                            ? 'bg-white border-2 border-[#1AB0DC] ring-2 ring-[#33C4F0]/20 shadow-sm text-[#1A1A28]'
                            : 'bg-white border border-slate-200 text-[#1A1A28] hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-extrabold text-[#1A1A28]">Pro Monthly</p>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-base font-black text-[#1A1A28]">$49.00</span>
                              <span className="text-[10px] text-[#717182] font-semibold">/ mo</span>
                            </div>
                            <p className="text-[10px] text-[#717182] mt-1 font-medium">
                              Flexible access — billed monthly.
                            </p>
                          </div>

                          {/* Checkmark Circle */}
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            selectedPlanId === 'basic-creative' ? 'bg-[#1AB0DC] text-white' : 'border border-slate-300 text-transparent'
                          }`}>
                            <Check size={11} weight="bold" />
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Lifetime VIP */}
                      <div
                        onClick={() => setSelectedPlanId('elite-creative')}
                        className={`cursor-pointer p-3.5 rounded-2xl transition-all relative ${
                          selectedPlanId === 'elite-creative'
                            ? 'bg-white border-2 border-[#1AB0DC] ring-2 ring-[#33C4F0]/20 shadow-sm text-[#1A1A28]'
                            : 'bg-white border border-slate-200 text-[#1A1A28] hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-extrabold text-[#1A1A28]">Lifetime VIP</p>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-base font-black text-[#1A1A28]">$99.00</span>
                              <span className="text-[10px] text-[#717182] font-semibold">one-time</span>
                            </div>
                            <p className="text-[10px] text-[#717182] mt-1 font-medium">
                              Pay once — permanent unlimited access.
                            </p>
                          </div>

                          {/* Checkmark Circle */}
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            selectedPlanId === 'elite-creative' ? 'bg-[#1AB0DC] text-white' : 'border border-slate-300 text-transparent'
                          }`}>
                            <Check size={11} weight="bold" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()
            )}
          </div>

          {/* Action Buttons & CreativeSelf Dark Pill CTA */}
          <div className="pt-3 space-y-2">
            {regStep < 4 ? (
              <button
                type="button"
                onClick={() => setRegStep(regStep + 1)}
                className="w-full py-3.5 rounded-full font-bold text-xs text-white bg-[#1A1A28] hover:bg-black shadow-md transition active:scale-[0.99]"
              >
                Continue
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('client')}
                  className="w-full py-3.5 rounded-full font-extrabold text-xs text-white bg-[#1A1A28] hover:bg-black transition active:scale-[0.99] text-center shadow-md mb-2"
                >
                  {selectedPlanId === 'elite-creative' ? 'Upgrade to Lifetime VIP' : 'Upgrade to Pro'}
                </button>

                <p className="text-center text-[10px] text-[#717182] font-medium">
                  Cancel anytime in App Store
                </p>
              </div>
            )}

            {regStep > 1 && regStep < 4 ? (
              <button
                type="button"
                onClick={() => setRegStep(regStep - 1)}
                className="w-full py-2.5 rounded-full font-semibold text-xs text-[#717182] bg-slate-100 hover:bg-slate-200 transition text-center"
              >
                Back
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    // MAIN CLIENT APP CONTENT (Tabs: Feed, Discover, Bookings, Profile)
    return (
      <div className="flex flex-col h-full bg-white justify-between relative overflow-hidden">
        {/* NOTIFICATION TOAST */}
        <AnimatePresence>
          {bookingSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-14 inset-x-3 z-50 bg-[#10B981] text-white p-3.5 shadow-xl text-xs font-bold flex items-center justify-between rounded-2xl"
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
          <div className="flex-1 overflow-y-auto pb-20">
            {/* THE EXPLORER ARCHETYPE & SUBSCRIPTION FEATURE CARD (PASTEL LIGHT GLASS TEARDROP) */}
            <div className="p-4 pb-2">
              <div
                onClick={() => navigate('/test')}
                className="bg-gradient-to-br from-[#E8F9FF] via-[#F3E8FF]/60 to-[#E0F2FE] text-slate-900 p-4.5 border border-[#33C4F0]/30 shadow-xs cursor-pointer hover:border-[#33C4F0]/60 hover:scale-[1.005] transition-all duration-200 relative overflow-hidden group space-y-3"
                style={{ borderRadius: '28px 28px 84px 28px' }}
              >
                {/* Background ambient glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#33C4F0]/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge Row */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#33C4F0] px-2.5 py-0.5 rounded-full shadow-2xs">
                      Pass Active
                    </span>
                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100/90 px-2.5 py-0.5 rounded-full border border-purple-200">
                      Verified Archetype
                    </span>
                  </div>
                  <CaretRight size={18} className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-transform" weight="bold" />
                </div>

                {/* Content Row */}
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#33C4F0]/25 shadow-xs flex items-center justify-center text-2xl shrink-0">
                    🧭
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-tight flex items-center gap-1.5">
                      The Explorer 🧭
                    </h3>
                    <p className="text-xs font-normal text-slate-600 mt-0.5 leading-snug">
                      New places & creative experiences to keep your inspiration moving.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICE BRAND STORIES SECTION (FRAMELESS HORIZONTAL CAROUSEL) */}
            <div className="py-3 border-b border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between px-4">
                <h3 className="text-[11px] font-extrabold text-[#717182] uppercase tracking-wider">
                  SERVICE BRAND STORIES
                </h3>
                <span className="text-xs font-bold text-[#33C4F0]">
                  {brandStories.length} Active Studios
                </span>
              </div>

              <div className="grid grid-cols-6 gap-1 px-3 py-1 text-center">
                {brandStories.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => setActiveStoryIdx(idx)}
                    className="flex flex-col items-center shrink-0 group focus:outline-none"
                  >
                    <div className={`p-[2px] rounded-full bg-gradient-to-tr ${story.gradient} shadow-xs group-hover:scale-105 transition-transform duration-200`}>
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-xl border border-white shadow-xs">
                        {story.emoji}
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#1A1A28] mt-1 text-center tracking-tight truncate w-full">
                      {story.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* FEED SECTION HEADER */}
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Community Feed
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">{samplePostsData.length} Stories</span>
            </div>

            {/* FEED POST LIST (FRAMELESS NATIVE MOBILE LIST) */}
            <div className="divide-y divide-slate-100">
              {samplePostsData.map((post) => {
                const isLiked = likedPostIds.includes(post.id);
                return (
                  <div key={post.id} className="py-4 space-y-3">
                    {/* Post Header */}
                    <div className="px-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl p-1 bg-slate-100 rounded-full">{post.emoji}</span>
                        <div>
                          <p className="text-xs font-extrabold text-slate-900">{post.provider}</p>
                          <p className="text-[11px] text-slate-400">{post.category}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#1AB0DC] bg-[#E8F9FF] px-2 py-0.5 rounded-full">
                        {post.duration}
                      </span>
                    </div>

                    {/* Post Teardrop Preview Image (NO Title Overlay) */}
                    {post.image && (
                      <div className="px-4">
                        <div
                          className="h-52 w-full overflow-hidden relative cursor-pointer shadow-xs transition-transform hover:scale-[1.01]"
                          style={{ borderRadius: '24px 24px 72px 24px' }}
                          onClick={() => setSelectedPost(post)}
                        >
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}

                    {/* Post Title, Body & Actions */}
                    <div className="px-4 space-y-2">
                      <h3
                        onClick={() => setSelectedPost(post)}
                        className="text-base font-black text-slate-900 leading-snug tracking-tight cursor-pointer hover:text-[#1AB0DC] transition"
                      >
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {post.copy}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="flex items-center gap-4 text-slate-400">
                          <button
                            onClick={() => toggleLikePost(post.id)}
                            className={`flex items-center gap-1 font-bold transition ${
                              isLiked ? 'text-[#EF4444]' : 'hover:text-slate-700'
                            }`}
                          >
                            <Heart size={16} weight={isLiked ? 'fill' : 'regular'} />
                            <span>{post.likes + (isLiked ? 1 : 0)}</span>
                          </button>
                          <button
                            onClick={() => setSelectedPost(post)}
                            className="flex items-center gap-1 font-bold hover:text-slate-700 transition"
                          >
                            <ChatCircle size={16} />
                            <span>{post.comments}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => setSelectedPost(post)}
                          className="text-[11px] font-bold text-[#1AB0DC] hover:underline flex items-center gap-0.5"
                        >
                          Read More <CaretRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: DISCOVER */}
        {activeTab === 'discover' && (
          <div className="flex-1 overflow-y-auto pb-20">
            {selectedBrandId === null ? (
              /* VIEW 1: SERVICE BRANDS LIST (FRAMELESS NATIVE MOBILE) */
              <div className="space-y-4">
                {/* Header Banner */}
                <div className="px-4 pt-3 pb-3 border-b border-slate-100 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-purple-600 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full w-fit">
                    <Sparkle size={12} className="text-purple-600 animate-pulse" />
                    Acumen AI Service Brand Engine
                  </div>
                  <h2 className="text-base font-black text-slate-900 leading-tight">
                    Choose a Service Brand for your Pro Plan
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Select a service brand below to access all included workshops & activities.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <MagnifyingGlass size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search service brands, specialty, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#33C4F0] shadow-xs transition"
                  />
                </div>

                {/* Theme Category Pills */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {themeCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`py-1.5 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
                        selectedCategory === cat.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>{cat.symbol}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Service Brands List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Service Brands ({mockVendors.length})
                    </h3>
                    <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      1 Brand Entitlement
                    </span>
                  </div>

                  {mockVendors
                    .filter((vendor) => {
                      const matchesCat = selectedCategory === 'all' || vendor.theme.toLowerCase().includes(selectedCategory.toLowerCase()) || vendor.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
                      const matchesSearch = !searchQuery || vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
                      return matchesCat && matchesSearch;
                    })
                    .map((vendor) => {
                      const vendorActivities = mockActivities.filter((a) => a.vendorId === vendor.id);
                      const aiMatchScore = vendor.id === 'studio-lumen' ? 98 : vendor.id === 'cocoa-collective' ? 95 : 92;

                      return (
                        <div key={vendor.id} className="py-4 border-b border-slate-100 space-y-3">
                          {/* Brand Cover Image */}
                          <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                            <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Acumen AI Badge */}
                            <div className="absolute top-3 right-3 bg-purple-900/80 backdrop-blur text-purple-200 border border-purple-400/30 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                              <Sparkle size={11} className="text-purple-300 fill-purple-300" />
                              {aiMatchScore}% Acumen Match
                            </div>

                            {/* Brand Header overlay */}
                            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center text-xl shrink-0">
                                  {vendor.avatar}
                                </div>
                                <div className="min-w-0">
                                  <span className="text-[9px] font-extrabold text-white bg-white/20 px-2 py-0.5 rounded-md uppercase backdrop-blur">
                                    {vendor.theme}
                                  </span>
                                  <h3 className="text-sm font-black text-white truncate">{vendor.name}</h3>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Brand Body */}
                          <div className="px-4 space-y-3">
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                              <span className="flex items-center gap-1 text-[#F59E0B] font-extrabold">
                                <Star size={13} weight="fill" /> {vendor.rating} ({vendor.reviewsCount} reviews)
                              </span>
                              <span className="flex items-center gap-1 text-slate-600">
                                <MapPin size={13} className="text-slate-400" /> {vendor.location}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              {vendor.specialty}
                            </p>

                            {/* Included Services Photo Preview */}
                            <div className="pt-1">
                              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#717182] mb-2">
                                Included Services Preview ({vendorActivities.length} available):
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                {vendorActivities.slice(0, 3).map((act) => (
                                  <div
                                    key={act.id}
                                    onClick={() => setSelectedActivity(act)}
                                    className="cursor-pointer bg-slate-50 rounded-xl overflow-hidden border border-slate-100 hover:border-[#33C4F0] transition group"
                                  >
                                    <div className="h-14 w-full relative">
                                      <img src={act.image} alt={act.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                                    </div>
                                    <p className="text-[10px] font-extrabold text-slate-900 truncate p-1">
                                      {act.name}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Button: View Brand Services */}
                            <button
                              type="button"
                              onClick={() => setSelectedBrandId(vendor.id)}
                              className="w-full py-3 bg-[#1A1A28] text-white hover:bg-black text-xs font-extrabold rounded-full transition shadow-xs flex items-center justify-center gap-1.5 mt-1"
                            >
                              View Brand Services & Workshops ({vendorActivities.length}) →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              (() => {
                const selectedVendor = mockVendors.find((v) => v.id === selectedBrandId) || mockVendors[0];
                const vendorActivities = mockActivities.filter((a) => a.vendorId === selectedVendor.id);

                return (
                  <div className="space-y-4">
                    {/* Back to All Brands Navigation Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedBrandId(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs hover:bg-slate-50 transition"
                    >
                      <CaretLeft size={16} weight="bold" /> Back to All Service Brands
                    </button>

                    {/* Brand Banner Header Card */}
                    <div
                      className="bg-white border border-slate-100 shadow-sm overflow-hidden"
                      style={{ borderRadius: '20px 20px 54px 20px' }}
                    >
                      <div className="relative h-44 w-full">
                        <img src={selectedVendor.image} alt={selectedVendor.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-white text-2xl flex items-center justify-center shadow-md">
                              {selectedVendor.avatar}
                            </div>
                            <div>
                              <span className="text-[10px] font-extrabold uppercase bg-white/20 px-2 py-0.5 rounded-md backdrop-blur">
                                {selectedVendor.theme}
                              </span>
                              <h1 className="text-base font-black truncate">{selectedVendor.name}</h1>
                            </div>
                          </div>
                          <span className="text-xs font-black text-amber-400 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur">
                            ★ {selectedVendor.rating}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {selectedVendor.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold border-t border-slate-100 pt-2">
                          <span>📍 {selectedVendor.location}</span>
                          <span className="text-[#10B981]">{vendorActivities.length} Included Sessions</span>
                        </div>
                      </div>
                    </div>

                    {/* Available Services Subheader */}
                    <div className="flex items-center justify-between pt-1">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Available Services & Workshops ({vendorActivities.length})
                      </h3>
                      <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                        Included in Pass
                      </span>
                    </div>

                    {/* Vendor Activities List */}
                    <div className="space-y-3.5">
                      {vendorActivities.map((act) => {
                        const isSaved = savedActivityIds.includes(act.id);
                        return (
                          <div
                            key={act.id}
                            className="bg-white border border-slate-100 shadow-sm overflow-hidden hover:border-[#33C4F0]/40 transition"
                            style={{ borderRadius: '20px 20px 54px 20px' }}
                          >
                            <div className="relative h-36 w-full">
                              <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                              <button
                                onClick={() => toggleSaveActivity(act.id)}
                                className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm transition ${
                                  isSaved ? 'text-[#EF4444]' : 'text-slate-600'
                                }`}
                              >
                                <BookmarkSimple size={16} weight={isSaved ? 'fill' : 'regular'} />
                              </button>
                              <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                                <span>{act.symbol}</span> {act.category}
                              </div>
                            </div>

                            <div className="p-3.5">
                              <div className="flex items-start justify-between mb-1">
                                <h4 className="text-xs font-extrabold text-slate-900 line-clamp-1">{act.name}</h4>
                                <span className="text-[11px] font-bold text-[#F59E0B] flex items-center gap-0.5 shrink-0 ml-2">
                                  <Star size={12} weight="fill" /> {act.rating}
                                </span>
                              </div>

                              <p className="text-[11px] text-slate-500 font-medium mb-2.5">{act.vendorName}</p>

                              <div className="flex items-center gap-3 text-[11px] text-slate-600 mb-3">
                                <span className="flex items-center gap-1">
                                  <Clock size={13} className="text-slate-400" /> {act.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin size={13} className="text-slate-400" /> {act.location}
                                </span>
                              </div>

                              <div className="flex items-center justify-between pt-2.5 border-t border-slate-50">
                                <span className="text-[11px] font-extrabold text-[#10B981]">
                                  Included in Subscription
                                </span>
                                <button
                                  onClick={() => setSelectedActivity(act)}
                                  className="py-1.5 px-3.5 bg-[#33C4F0] text-white text-xs font-bold shadow-xs hover:bg-[#1AB0DC] transition"
                                  style={{ borderRadius: '12px 12px 28px 12px' }}
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
                );
              })()
            )}
          </div>
        )}

        {/* TAB 3: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                My Mobile Passes ({myBookings.length})
              </h3>
              <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                Active Passes
              </span>
            </div>

            {myBookings.length === 0 ? (
              <div className="text-center py-12 px-4">
                <CalendarBlank size={36} className="text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-900">No Bookings Yet</p>
                <p className="text-[11px] text-slate-500 mb-4">Discover sessions and book your first experience.</p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="py-2 px-5 bg-[#33C4F0] text-white text-xs font-bold rounded-full shadow-xs"
                >
                  Explore Sessions
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {myBookings.map((bk) => (
                  <div key={bk.id} className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                        style={{ backgroundColor: `${bk.color}15` }}
                      >
                        {bk.symbol}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                            {bk.status}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">{bk.seats} Ticket</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{bk.activityName}</h4>
                        <p className="text-[11px] text-slate-500">{bk.vendorName}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl space-y-1 text-[11px]">
                      <div className="flex items-center justify-between text-slate-800 font-medium">
                        <span className="flex items-center gap-1 text-slate-400"><Clock size={12} /> Date & Time:</span>
                        <span>{bk.date} • {bk.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-800 font-medium">
                        <span className="flex items-center gap-1 text-slate-400"><MapPin size={12} /> Location:</span>
                        <span className="truncate max-w-[160px]">{bk.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedQrPass(bk)}
                      className="w-full py-3 px-3 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center gap-1.5 shadow-xs hover:bg-slate-800 transition"
                    >
                      <QrCode size={16} /> Show Mobile Pass
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="flex-1 overflow-y-auto pb-20">
            {/* User Header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#33C4F0] to-[#1AB0DC] text-white flex items-center justify-center text-xl font-bold shadow-xs shrink-0">
                🧭
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-sm font-extrabold text-slate-900 truncate">{regName || 'Alex Morgan'}</h3>
                  <span className="text-[10px] font-extrabold text-[#1AB0DC] bg-[#E8F9FF] px-2 py-0.5 rounded-full shrink-0">
                    The Explorer 🧭
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium truncate">{emailInput || 'alex@company.com'}</p>
                <p className="text-[11px] text-[#10B981] font-bold">Active Pro Annual Subscriber</p>
              </div>
            </div>

            {/* Account Details Section */}
            <div className="p-4 border-b border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between pb-1">
                <h4 className="text-xs font-black uppercase text-[#1A1A28] tracking-wider">Account & Organization</h4>
                <span className="text-[10px] font-bold text-[#1AB0DC] bg-[#E8F9FF] px-2 py-0.5 rounded-md">Verified Profile</span>
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
                  <p className="text-[10px] text-slate-500 font-medium">$39.00 / yr • Renews Aug 2027</p>
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

            {/* Native Mobile Settings Action List */}
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
        )}

        {/* BOTTOM NAVIGATION BAR */}
        <div className="bg-white/95 backdrop-blur-md border-t border-slate-100 px-3 py-2 flex items-center justify-around absolute bottom-0 inset-x-0 z-30 shadow-lg">
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
                className={`flex flex-col items-center gap-0.5 py-1 px-3.5 rounded-xl transition relative ${
                  isActive ? 'text-[#33C4F0] font-bold' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                <span className="text-[10px]">{tab.label}</span>
                {tab.badge ? (
                  <span className="absolute top-0 right-2.5 w-4 h-4 bg-[#33C4F0] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* FULL PAGE VIEW: ACTIVITY DETAIL SCREEN */}
        <AnimatePresence>
          {selectedActivity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-[#F8FAFC] z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans"
            >
              {/* Sticky Header Navigation */}
              <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition"
                >
                  <CaretLeft size={16} weight="bold" /> Back to Discover
                </button>

                <button
                  type="button"
                  onClick={() => toggleSaveActivity(selectedActivity.id)}
                  className={`p-2 rounded-full border transition ${
                    savedActivityIds.includes(selectedActivity.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <BookmarkSimple size={16} weight={savedActivityIds.includes(selectedActivity.id) ? 'fill' : 'regular'} />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-4 space-y-4 pb-12 flex-1">
                {/* Hero Card */}
                <div className="bg-white p-4.5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="relative h-52 sm:h-60 w-full rounded-2xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200">
                    <img src={selectedActivity.image} alt={selectedActivity.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Category Pill Tag */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-[#1A1A28] text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <span>{selectedActivity.symbol}</span> {selectedActivity.category}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star size={13} weight="fill" /> {selectedActivity.rating}
                    </div>
                  </div>

                  <div>
                    <h1 className="text-lg font-black text-[#1A1A28] leading-snug tracking-tight">{selectedActivity.name}</h1>
                    <div className="flex items-center gap-1.5 mt-1">
                      <p className="text-xs font-extrabold text-[#1AB0DC]">Hosted by {selectedActivity.vendorName}</p>
                      <ShieldCheck size={14} className="text-[#33C4F0]" weight="fill" />
                    </div>
                  </div>

                  {/* Metadata Specs Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
                    <div className="bg-slate-50 p-2.5 rounded-2xl flex items-center gap-2 border border-slate-100">
                      <Clock size={16} className="text-[#33C4F0]" />
                      <div>
                        <p className="text-[9px] text-[#717182] font-bold">DURATION</p>
                        <p className="text-xs font-black text-[#1A1A28]">{selectedActivity.duration}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-2xl flex items-center gap-2 border border-slate-100">
                      <MapPin size={16} className="text-[#33C4F0]" />
                      <div>
                        <p className="text-[9px] text-[#717182] font-bold">LOCATION</p>
                        <p className="text-xs font-black text-[#1A1A28] truncate">{selectedActivity.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description & Overview */}
                <div className="bg-white p-4.5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
                  <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">
                    About This Experience
                  </h2>
                  <p className="text-xs text-[#525266] leading-relaxed font-medium">
                    {selectedActivity.description}
                  </p>
                </div>

                {/* Session Highlights */}
                <div className="bg-white p-4.5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E]">
                    What's Included in Your Session
                  </h3>
                  <div className="space-y-2">
                    {selectedActivity.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5 rounded-2xl bg-[#F8FCFF] p-3 border border-[#33C4F0]/15"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58] mt-0.5">
                          <Check size={12} weight="bold" />
                        </span>
                        <span className="text-xs font-semibold text-[#1A1A28] leading-tight">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Slot Picker & Instant Booking Card */}
                <div className="bg-gradient-to-br from-[#E8F9FF] via-white to-sky-50 p-4.5 rounded-3xl border border-[#33C4F0]/30 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-[#1A1A28]">Select Date & Time</p>
                      <p className="text-[10px] text-[#717182]">Instant confirmation with your Pro Pass</p>
                    </div>
                    <span className="text-xs font-black text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-emerald-200">
                      Included with Pass
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedActivity.schedule.map((sch) => (
                      <button
                        key={sch.id}
                        type="button"
                        onClick={() => setBookingSelectedSlot(`${sch.date} • ${sch.time}`)}
                        className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition ${
                          bookingSelectedSlot.includes(sch.date)
                            ? 'border-[#33C4F0] bg-white ring-2 ring-[#33C4F0]/30 text-[#1A1A28] font-black shadow-2xs'
                            : 'border-slate-200 bg-white text-[#1A1A28] font-semibold hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{sch.date}</p>
                          <p className="text-[10px] text-[#717182] font-medium">{sch.time}</p>
                        </div>
                        <span className="text-[10px] font-extrabold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                          {sch.seatsLeft} seats left
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleConfirmBooking(selectedActivity)}
                    className="w-full py-3 bg-[#1A1A28] text-white hover:bg-black text-xs font-extrabold rounded-full shadow-md transition active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
                  >
                    <Sparkle size={16} weight="fill" className="text-amber-400" />
                    Confirm & Redeem
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FULL PAGE VIEW: POST DETAIL SCREEN */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans"
            >
              {/* Sticky Top Header Navigation */}
              <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPost(null);
                    setPostDetailImgIdx(0);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition"
                >
                  <CaretLeft size={16} weight="bold" /> Back
                </button>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1AB0DC] bg-[#E8F9FF] px-2.5 py-1 rounded-full">
                    {selectedPost.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (likedPostIds.includes(selectedPost.id)) {
                        setLikedPostIds(likedPostIds.filter((id) => id !== selectedPost.id));
                      } else {
                        setLikedPostIds([...likedPostIds, selectedPost.id]);
                      }
                    }}
                    className={`p-2 rounded-full border transition ${
                      likedPostIds.includes(selectedPost.id)
                        ? 'bg-rose-50 border-rose-200 text-rose-500'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <Heart size={16} weight={likedPostIds.includes(selectedPost.id) ? 'fill' : 'bold'} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Body (Frameless Native Mobile Article View) */}
              <div className="pb-16 flex-1 divide-y divide-slate-100">
                {/* Header & Hero Image Section */}
                <div className="p-4 space-y-3">
                  {/* Provider Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#E8F9FF] text-[#147C9E] flex items-center justify-center text-xl shadow-xs">
                        {selectedPost.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-extrabold text-[#1A1A28]">{selectedPost.provider}</p>
                          <ShieldCheck size={14} className="text-[#33C4F0]" weight="fill" />
                        </div>
                        <p className="text-[10px] text-[#717182]">
                          {selectedPost.handle || `@${selectedPost.provider.toLowerCase().replace(/\s+/g, '')}`} • {selectedPost.date || 'Today'}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {(selectedPost as any).readTime || '3 min read'}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-xl font-black text-slate-900 leading-snug tracking-tight pt-1">
                    {selectedPost.title}
                  </h1>

                  {/* Teardrop Hero Image / Multi-Photo Carousel */}
                  {(() => {
                    const postImages = selectedPost.images && selectedPost.images.length > 0
                      ? selectedPost.images
                      : selectedPost.image
                      ? [selectedPost.image]
                      : [];

                    if (postImages.length === 0) return null;

                    const safeIndex = postDetailImgIdx % postImages.length;

                    return (
                      <div className="space-y-2 pt-1">
                        <div
                          className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 shadow-xs"
                          style={{ borderRadius: '24px 24px 72px 24px' }}
                        >
                          <img
                            src={postImages[safeIndex]}
                            alt={selectedPost.title}
                            className="w-full h-full object-cover transition-all duration-300"
                          />

                          {/* Image Counter Badge */}
                          {postImages.length > 1 && (
                            <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                              <PhotosIcon size={12} />
                              <span>{safeIndex + 1} of {postImages.length}</span>
                            </div>
                          )}

                          {/* Carousel Chevrons */}
                          {postImages.length > 1 && (
                            <>
                              <button
                                type="button"
                                onClick={() => setPostDetailImgIdx(safeIndex === 0 ? postImages.length - 1 : safeIndex - 1)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1A1A28] shadow-md flex items-center justify-center hover:bg-white transition"
                              >
                                <CaretLeft size={16} weight="bold" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setPostDetailImgIdx(safeIndex === postImages.length - 1 ? 0 : safeIndex + 1)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1A1A28] shadow-md flex items-center justify-center hover:bg-white transition"
                              >
                                <CaretRight size={16} weight="bold" />
                              </button>
                            </>
                          )}
                        </div>

                        {/* Thumbnail Strip */}
                        {postImages.length > 1 && (
                          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {postImages.map((imgUrl, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setPostDetailImgIdx(idx)}
                                className={`relative h-12 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition ${
                                  safeIndex === idx
                                    ? 'border-[#33C4F0] scale-105 shadow-2xs'
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* The Story & Narrative Section */}
                <div className="p-4 space-y-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0] block">
                    Session Narrative
                  </span>
                  <h2 className="text-base font-black text-slate-900 leading-snug">
                    The Story Behind the Session
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {selectedPost.copy}
                  </p>

                  {selectedPost.fullStory && (
                    <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pt-2 border-t border-slate-50">
                      {selectedPost.fullStory}
                    </div>
                  )}

                  {/* Metadata Tags Row */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-extrabold">
                    {selectedPost.duration && (
                      <span className="rounded-full bg-[#F2FBFE] px-3 py-1.5 text-[#147C9E] flex items-center gap-1.5">
                        <Clock size={14} />
                        {selectedPost.duration}
                      </span>
                    )}
                    {selectedPost.seats && (
                      <span className="rounded-full bg-[#F2FBFE] px-3 py-1.5 text-[#147C9E] flex items-center gap-1.5">
                        <Users size={14} />
                        {selectedPost.seats}
                      </span>
                    )}
                    {selectedPost.service && (
                      <span className="rounded-full bg-[#E8F9FF] px-3 py-1.5 text-[#147C9E]">
                        🎨 {selectedPost.service}
                      </span>
                    )}
                  </div>
                </div>

                {/* Experience Highlights Section */}
                {selectedPost.highlights && selectedPost.highlights.length > 0 && (
                  <div className="p-4 space-y-2.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E] block">
                      Key Highlights
                    </span>
                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      What Makes This Experience Special
                    </h3>
                    <div className="space-y-2 pt-1">
                      {selectedPost.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3 border border-slate-100"
                        >
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58] mt-0.5">
                            <Check size={12} weight="bold" />
                          </span>
                          <span className="text-xs font-semibold text-slate-800 leading-tight">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Session Booking Section */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900">Book This Session</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Included with your CreativeSelf Pro Pass</p>
                    </div>
                    <span className="text-xs font-black text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-emerald-200">
                      1 Pass Credit
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setMyBookings([
                        {
                          id: `bk-${Date.now()}`,
                          activityName: selectedPost.title,
                          vendorName: selectedPost.provider,
                          date: 'Tomorrow, 10:00 AM',
                          time: '10:00 AM - 11:00 AM',
                          location: 'Creative Hub • Studio 4B',
                          status: 'Confirmed',
                          seats: 1,
                          color: '#33C4F0',
                          symbol: selectedPost.emoji || '✨',
                          qrCode: `CS-PASS-${Date.now()}`,
                          image: selectedPost.image || '',
                        },
                        ...myBookings,
                      ]);
                      setBookingSuccessMsg(`Successfully booked "${selectedPost.title}"! Added to your Bookings tab.`);
                      setSelectedPost(null);
                    }}
                    className="w-full py-3 bg-[#1A1A28] text-white hover:bg-black text-xs font-extrabold rounded-full shadow-xs transition active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <Sparkle size={16} weight="fill" className="text-amber-400" />
                    Reserve Experience Now
                  </button>
                </div>

                {/* Interactive Comments Section */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <ChatCircle size={18} className="text-[#33C4F0]" weight="bold" />
                      Comments ({postDetailComments[selectedPost.id]?.length ?? (selectedPost.commentsList?.length || selectedPost.comments || 0)})
                    </h3>
                  </div>

                  {/* List of Comments */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {(postDetailComments[selectedPost.id] || selectedPost.commentsList || [
                      { id: 'c1', user: 'Sophia Lin', avatar: '👩‍🎨', time: '2h ago', text: 'This session looks absolutely incredible! Can wait for next week.' },
                      { id: 'c2', user: 'Marcus Vance', avatar: '🧘‍♂️', time: '5h ago', text: 'Loved the ceramic grounding technique. High quality instruction!' },
                    ]).map((c: any) => (
                      <div key={c.id} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <span className="text-lg shrink-0">{c.avatar || '👤'}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold text-[#1A1A28]">{c.user}</p>
                            <span className="text-[9px] text-[#717182]">{c.time}</span>
                          </div>
                          <p className="text-xs text-[#525266] mt-0.5 leading-snug">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Comment Input */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!postDetailCommentText.trim()) return;

                      const currentList = postDetailComments[selectedPost.id] || selectedPost.commentsList || [
                        { id: 'c1', user: 'Sophia Lin', avatar: '👩‍🎨', time: '2h ago', text: 'This session looks absolutely incredible! Can wait for next week.' },
                        { id: 'c2', user: 'Marcus Vance', avatar: '🧘‍♂️', time: '5h ago', text: 'Loved the ceramic grounding technique. High quality instruction!' },
                      ];

                      setPostDetailComments({
                        ...postDetailComments,
                        [selectedPost.id]: [
                          ...currentList,
                          {
                            id: `cm-${Date.now()}`,
                            user: regName || 'Alex Morgan',
                            avatar: '✨',
                            time: 'Just now',
                            text: postDetailCommentText.trim(),
                          },
                        ],
                      });
                      setPostDetailCommentText('');
                    }}
                    className="flex items-center gap-2 pt-2 border-t border-slate-100"
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={postDetailCommentText}
                      onChange={(e) => setPostDetailCommentText(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 bg-slate-100 rounded-full text-xs font-medium text-[#1A1A28] focus:outline-none focus:bg-white border border-transparent focus:border-[#33C4F0]"
                    />
                    <button
                      type="submit"
                      className="p-2.5 bg-[#33C4F0] text-white rounded-full hover:bg-[#1AB0DC] transition shadow-xs shrink-0"
                    >
                      <PaperPlaneRight size={14} weight="bold" />
                    </button>
                  </form>
                </div>
              </div>
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

        {/* FULL SCREEN INTERACTIVE STORY VIEWER MODAL */}
        <AnimatePresence>
          {activeStoryIdx !== null && (() => {
            const currentStory = brandStories[activeStoryIdx];
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between overflow-hidden text-white font-sans"
              >
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={currentStory.image}
                    alt={currentStory.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
                </div>

                {/* Top Navigation & Segmented Progress Bars */}
                <div className="relative z-10 p-4 pt-3 space-y-3">
                  {/* Progress Bar Segments */}
                  <div className="flex items-center gap-1.5">
                    {brandStories.map((s, idx) => (
                      <div
                        key={s.id}
                        className="flex-1 h-1 rounded-full overflow-hidden bg-white/30"
                      >
                        <div
                          className={`h-full transition-all duration-300 ${
                            idx === activeStoryIdx
                              ? 'bg-white w-full'
                              : idx < activeStoryIdx
                              ? 'bg-white w-full'
                              : 'w-0'
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-[2px] rounded-full bg-gradient-to-tr ${currentStory.gradient}`}>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-base">
                          {currentStory.emoji}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-black tracking-wide text-white leading-tight">{currentStory.vendorName}</p>
                        <p className="text-[10px] text-sky-300 font-semibold">{currentStory.category} • Active Story</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveStoryIdx(null)}
                      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/20 transition"
                    >
                      <X size={16} weight="bold" />
                    </button>
                  </div>
                </div>

                {/* Touch/Click Navigation Areas (Left = Prev, Right = Next) */}
                <div className="absolute inset-0 z-10 flex">
                  <div
                    onClick={() => setActiveStoryIdx(activeStoryIdx > 0 ? activeStoryIdx - 1 : null)}
                    className="w-1/3 h-full cursor-pointer"
                  />
                  <div
                    onClick={() => setActiveStoryIdx(activeStoryIdx < brandStories.length - 1 ? activeStoryIdx + 1 : null)}
                    className="w-2/3 h-full cursor-pointer"
                  />
                </div>

                {/* Bottom Story Card Overlay */}
                <div className="relative z-20 p-5 space-y-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#33C4F0] text-slate-950 inline-block shadow-sm">
                      {currentStory.name} Studio Experience
                    </span>
                    <h2 className="text-xl font-black text-white leading-tight drop-shadow-md">
                      {currentStory.title}
                    </h2>
                    <p className="text-xs text-slate-200 font-medium italic border-l-2 border-[#33C4F0] pl-3 py-0.5">
                      "{currentStory.quote}"
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        setSelectedBrandId(currentStory.vendorId);
                        setActiveTab('discover');
                        setActiveStoryIdx(null);
                      }}
                      className="flex-1 py-3.5 px-4 bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] text-white text-xs font-black rounded-2xl shadow-lg shadow-[#33C4F0]/30 hover:opacity-95 transition flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      <Sparkle size={15} weight="fill" /> View Studio & Book Session
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-2 sm:p-6 text-slate-100 font-sans relative overflow-x-hidden">
      {/* Top Banner Control Bar */}
      <div className="w-full max-w-[440px] flex items-center justify-between mb-3 px-1 z-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 shadow-sm"
        >
          <CaretLeft size={16} /> Exit to Desktop Web App
        </Link>
        <span className="text-xs font-semibold text-slate-400">
          CreativeSelf Mobile
        </span>
      </div>

      {/* MOBILE APPLICATION CONTAINER (NO MOCKUP FRAME, FLAT CORNERS, WIDTH 440px) */}
      <div className="w-full max-w-[440px] h-[820px] max-h-[calc(100vh-80px)] bg-white text-slate-900 rounded-none shadow-2xl overflow-hidden relative flex flex-col border border-slate-800/60">
        <div className="flex-1 overflow-hidden relative">
          {renderMobileScreenContent()}
        </div>
      </div>
    </div>
  );
}
