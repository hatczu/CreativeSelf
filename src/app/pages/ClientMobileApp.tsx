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
import kaleidoscope from '../../imports/CS_Kaleidescope_Juice_Drop.png';
import logoIcon from '../../imports/Logo.png';

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
      titlePrefix: 'Discover ',
      titleHighlight: 'Creative Wellness',
      highlightColor: '#33C4F0',
      subtext: 'Nurture your mind, body & soul through curated artistic experiences.',
      buttonColor: '#00B0D9',
      buttonText: 'Next',
      accentGradient: 'linear-gradient(180deg, #33C4F0 0%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      titlePrefix: 'Personalized ',
      titleHighlight: 'Archetypes',
      highlightColor: '#A5289E',
      subtext: 'Tailored recommendations based on your personality test results.',
      buttonColor: '#A5289E',
      buttonText: 'Next',
      accentGradient: 'linear-gradient(180deg, #ED33F0 0%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      titlePrefix: 'Corporate ',
      titleHighlight: 'Benefits',
      highlightColor: '#FE7A03',
      subtext: 'Seamlessly redeem company wellbeing allowances & join team sessions.',
      buttonColor: '#FE7A03',
      buttonText: 'Next',
      accentGradient: 'linear-gradient(180deg, #F0D733 0%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      titlePrefix: 'Book & Track ',
      titleHighlight: 'Growth',
      highlightColor: '#6FD352',
      subtext: 'Instant mobile scheduling with digital passes & mood tracking.',
      buttonColor: '#6FD352',
      buttonText: 'Get Started',
      accentGradient: 'linear-gradient(180deg, #3CF033 0%, rgba(255, 255, 255, 0) 100%)',
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
    // 1. ONBOARDING SCREEN (EXACT FIGMA 4-SLIDE DESIGN MATCH)
    if (activeScreen === 'onboarding') {
      const slide = onboardingSlides[onboardingStep];
      return (
        <div className="relative flex flex-col h-full bg-[#F7FCFF] text-[#1A1A28] justify-between overflow-hidden font-sans isolate">
          {/* 1. BOTTOM LAYER: Prism Kaleidoscope Top Graphic (Shifted higher for bigger gap) */}
          <div className="absolute top-[-260px] sm:top-[-280px] left-1/2 -translate-x-1/2 w-[560px] h-[560px] sm:w-[660px] sm:h-[660px] pointer-events-none z-10 flex items-center justify-center">
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={kaleidoscope}
                alt="CreativeSelf Kaleidoscope Prism"
                className="w-full h-full object-cover scale-110 rotate-[2.3deg]"
              />
            </div>
          </div>

          {/* 2. MIDDLE LAYER: Soft Cyan Blur Overlay (Shifted higher up near top edge) */}
          <div
            className="absolute top-[-40px] left-0 right-0 h-[180px] pointer-events-none z-20"
            style={{
              background: 'linear-gradient(180deg, rgba(218, 250, 255, 0.88) 0%, rgba(218, 250, 255, 0.52) 60%, rgba(247, 252, 255, 0) 100%)',
              filter: 'blur(65px)',
            }}
          />

          {/* 3. TOP LAYER: CreativeSelf Logo (z-30) */}
          <div className="absolute top-[40px] sm:top-[50px] left-1/2 -translate-x-1/2 pointer-events-none z-30 flex items-center justify-center">
            <img
              src={logoIcon}
              alt="CreativeSelf Logo"
              className="w-16 h-16 sm:w-18 sm:h-18 object-contain drop-shadow-lg"
            />
          </div>

          {/* Bottom Gradient Accent Row (Rectangle 3: 135px height, 0.2 opacity, inverted matrix) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[135px] pointer-events-none z-0"
            style={{
              background: 'linear-gradient(180deg, #33C4F0 0%, rgba(255, 255, 255, 0) 100%)',
              opacity: 0.2,
              transform: 'scaleY(-1)',
            }}
          />

          {/* Bottom Right Teardrop Watermark Shape (Rectangle 2: 135px x 135px, left 247px, bottom 310px) */}
          <div
            className="absolute left-[247px] bottom-[310px] w-[135px] h-[135px] pointer-events-none z-5 transition-all duration-500"
            style={{
              background: slide.accentGradient,
              opacity: 0.2,
              borderRadius: '999px 0px 999px 999px',
            }}
          />

          {/* Top Skip Button Header (Redirects directly to Mobile Homepage) */}
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

          {/* Pinned Bottom Action Group (Fixed at bottom) */}
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

    // 2. LOGIN SCREEN (ALIGNED TO CURRENT DESIGN SYSTEM)
    if (activeScreen === 'login') {
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

          {/* Top Navigation Row (Back Button & Demo shortcut) */}
          <div className="relative z-10 space-y-3 pt-1">
            <div className="flex items-center justify-between">
              {/* Circular Back Button */}
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
                className="text-[12px] font-bold text-[#00B0D9] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#33C4F0]/30 shadow-2xs"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Quick Demo
              </button>
            </div>
          </div>

          {/* Login Form Main Content (Pushed down to match exact vertical title height of Registration screens) */}
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
                    <button type="button" className="text-[11px] font-medium text-[#33C4F0] hover:underline" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
              className="w-full text-center text-[14px] font-medium text-[#6A7282] hover:text-[#1A1A28] transition py-1"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Don't have an account? <span className="text-[#33C4F0] font-medium underline">Create Account</span>
            </button>
          </div>
        </div>
      );
    }

    // 3. REGISTER SCREEN (EXACT FIGMA 4-STEP SPEC MATCH)
    if (activeScreen === 'register') {
      return (
        <div className="relative flex flex-col h-full bg-[#F7FCFF] text-[#1A1A28] justify-between p-5 overflow-hidden font-sans isolate">
          {/* Inverted Prism Kaleidoscope Top Graphic (Figma Spec - Smooth Circular Overflow Clip) */}
          <div className="absolute top-[-598px] left-[-437px] w-[839px] h-[839px] pointer-events-none z-0 flex items-center justify-center">
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={kaleidoscope}
                alt="CreativeSelf Inverted Prism"
                className="w-full h-full object-cover scale-110 rotate-[-139.79deg]"
              />
            </div>
          </div>

          {/* Soft Cyan Blur Overlay (Shifted higher up near top edge) */}
          <div
            className="absolute top-[-40px] left-0 right-0 h-[180px] pointer-events-none z-2"
            style={{
              background: 'linear-gradient(180deg, rgba(218, 250, 255, 0.88) 0%, rgba(218, 250, 255, 0.52) 60%, rgba(247, 252, 255, 0) 100%)',
              filter: 'blur(65px)',
            }}
          />

          {/* Top Navigation Row (Back Button, 4 Segment Progress Bars, Log in Link) */}
          <div className="relative z-10 space-y-3 pt-1">
            <div className="flex items-center justify-between">
              {/* Circular Back Button */}
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

              {/* Step indicator link on right */}
              <button
                type="button"
                onClick={() => setActiveScreen('login')}
                className="text-[14px] font-medium text-[#33C4F0] hover:underline"
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

          {/* Step Main Content (Identical top height offset pt-10 sm:pt-12 across all steps) */}
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
                  {/* Full Name */}
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

                  {/* Email */}
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

                  {/* Password */}
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
                        <span className="absolute -top-2.5 right-4 bg-amber-400 text-slate-950 font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
                          + Most Popular
                        </span>
                      )}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className={`text-[11px] font-extrabold uppercase tracking-wider ${plan.popular ? 'text-white' : 'text-slate-500'}`}>
                            {plan.title}
                          </p>
                          <p className="text-2xl font-black leading-none">{plan.price} <span className="text-xs font-medium opacity-80">{plan.period}</span></p>

                          {/* Feature List (Brands & Services) */}
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

          {/* Pinned Bottom Action Group (Fixed at bottom) */}
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
                className="w-full text-center text-[14px] font-medium text-[#6A7282] hover:text-[#1A1A28] transition py-1"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Already have an account? <span className="text-[#33C4F0] font-medium underline">Log in</span>
              </button>
            )}
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
            {/* THE EXPLORER ARCHETYPE FEATURE CARD (EXACT FIGMA PIXEL PERFECT MATCH) */}
            <div className="p-4 pb-2">
              <div
                onClick={() => navigate('/test')}
                className="w-full h-[126px] bg-white border border-[#F3F4F6] cursor-pointer hover:shadow-xs transition-all duration-200 relative overflow-hidden group shrink-0"
                style={{ borderRadius: '28px 28px 84px 28px' }}
              >
                {/* Background Glow 1 (Top Right): left 317px, top -39px, w: 128px, h: 128px */}
                <div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: '128px',
                    height: '128px',
                    right: '-10px',
                    top: '-39px',
                    backgroundColor: 'rgba(51, 196, 240, 0.15)',
                    filter: 'blur(40px)',
                  }}
                />

                {/* Background Glow 2 (Bottom Left): left -39px, top 25px, w: 128px, h: 128px */}
                <div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: '128px',
                    height: '128px',
                    left: '-39px',
                    top: '25px',
                    backgroundColor: 'rgba(178, 223, 255, 0.2)',
                    filter: 'blur(40px)',
                  }}
                />

                {/* Rectangle 2 Watermark (Clean Figma Gradient Shape) */}
                <div
                  className="absolute pointer-events-none opacity-20"
                  style={{
                    width: '49px',
                    height: '49px',
                    left: '174px',
                    bottom: '46px',
                    background: 'linear-gradient(180deg, #33B4F0 0%, rgba(255, 255, 255, 0) 100%)',
                    borderRadius: '362.6px 0px 362.6px 362.6px',
                  }}
                />

                {/* Top Row Container: top 19px, left 19px, right 19px, height 21px */}
                <div
                  className="absolute left-[19px] right-[19px] top-[19px] h-[21px] flex items-center justify-between z-10"
                >
                  {/* Badge Text */}
                  <div
                    className="flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px]"
                    style={{ borderRadius: '9999px' }}
                  >
                    <span
                      className="text-[10px] font-medium text-[#007595] leading-[15px]"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Pass Active
                    </span>
                  </div>

                  {/* Icon Vector Chevron */}
                  <CaretRight size={18} className="text-[#90A1B9] group-hover:text-[#0F172B] transition-colors" />
                </div>

                {/* Content Container: top 52px, left 19px, right 19px, height 55px, gap 14px */}
                <div
                  className="absolute left-[19px] right-[19px] top-[52px] h-[55px] flex items-center gap-[14px] z-10"
                >
                  {/* Icon Container 48x48 */}
                  <div
                    className="w-[48px] h-[48px] bg-white rounded-[16px] flex items-center justify-center shrink-0"
                    style={{
                      boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <span
                      className="text-[24px] leading-[32px] text-[#0F172B]"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      🧭
                    </span>
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-col items-start justify-center flex-1 min-w-0 h-[55px]">
                    {/* Heading 3 */}
                    <div className="flex items-center gap-[6px] h-[20px] w-full">
                      <h3
                        className="text-[16px] font-bold text-[#0F172B] leading-[20px] truncate"
                        style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
                      >
                        The Explorer 🧭
                      </h3>
                    </div>

                    {/* Paragraph */}
                    <div className="pt-[2px] w-full">
                      <p
                        className="text-[12px] font-normal text-[#90A1B9] leading-[16px] line-clamp-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        New places & creative experiences to keep your inspiration moving.
                      </p>
                    </div>
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
      <div className="w-full max-w-[402px] flex items-center justify-between mb-2.5 px-1 z-10">
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

      {/* MOBILE APPLICATION CONTAINER (NATIVE 402px RATIO) */}
      <div className="w-full max-w-[402px] h-[874px] max-h-[calc(100vh-65px)] bg-white text-slate-900 rounded-none shadow-2xl overflow-hidden relative flex flex-col border border-slate-800/60 shrink-0">
        <div className="flex-1 overflow-hidden relative">
          {renderMobileScreenContent()}
        </div>
      </div>
    </div>
  );
}
