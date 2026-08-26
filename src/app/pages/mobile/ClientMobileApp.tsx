import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useParams, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  House,
  Compass,
  CalendarBlank,
  User,
  X,
} from '@phosphor-icons/react';
import { PostData } from '@/app/data/postsData';
import { mockVendors, mockActivities, Activity } from '@/app/data/subscriptionData';

import { MobileOnboardingScreen, OnboardingSlide } from './MobileOnboardingScreen';
import { MobileLoginScreen } from './MobileLoginScreen';
import { MobileRegisterScreen } from './MobileRegisterScreen';
import { MobileFeedScreen } from './MobileFeedScreen';
import { MobileDiscoverScreen } from './MobileDiscoverScreen';
import { MobileBookingsScreen } from './MobileBookingsScreen';
import { MobileProfileScreen } from './MobileProfileScreen';
import { MobileActivityDetailView } from './MobileActivityDetailView';
import { MobilePostDetailView } from './MobilePostDetailView';
import { MobileStoryViewerModal } from './MobileStoryViewerModal';

export type ScreenType = 'onboarding' | 'login' | 'register' | 'feed' | 'discover' | 'bookings' | 'profile';
export type TabType = 'feed' | 'discover' | 'bookings' | 'profile';
export type NavBarStyle = 'liquid-glass-icon' | 'liquid-glass-text' | 'liquid-glass-dark' | 'classic';

export const brandStories = [
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
  const location = useLocation();
  const params = useParams<{ screen?: string }>();
  const [searchParams] = useSearchParams();

  const getScreenFromUrl = (): ScreenType => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const mobileIdx = pathParts.indexOf('mobile');
    const screenPart = mobileIdx !== -1 ? pathParts[mobileIdx + 1] : pathParts[0];

    if (screenPart && ['onboarding', 'login', 'register', 'feed', 'discover', 'bookings', 'profile'].includes(screenPart)) {
      return screenPart as ScreenType;
    }
    if (params.screen && ['onboarding', 'login', 'register', 'feed', 'discover', 'bookings', 'profile'].includes(params.screen)) {
      return params.screen as ScreenType;
    }
    const qParam = searchParams.get('screen') as ScreenType;
    if (qParam && ['onboarding', 'login', 'register', 'feed', 'discover', 'bookings', 'profile'].includes(qParam)) {
      return qParam;
    }
    return 'onboarding';
  };

  const initialScreen = getScreenFromUrl();
  const [activeScreen, setActiveScreenState] = useState<ScreenType>(initialScreen);
  const [activeTab, setActiveTabState] = useState<TabType>(
    ['feed', 'discover', 'bookings', 'profile'].includes(initialScreen) ? (initialScreen as TabType) : 'feed'
  );

  // Client App states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [selectedQrPass, setSelectedQrPass] = useState<any | null>(null);
  const [savedActivityIds, setSavedActivityIds] = useState<string[]>(['beginner-painting-workshop', 'desk-to-mat-yoga']);
  const [likedPostIds, setLikedPostIds] = useState<string[]>(['breathe', 'colour']);
  const [postDetailImgIdx, setPostDetailImgIdx] = useState<number>(0);
  const [postDetailCommentText, setPostDetailCommentText] = useState<string>('');
  const [postDetailComments, setPostDetailComments] = useState<Record<string, any[]>>({});
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);

  // Mobile Nav Bar Style preference (liquid glass icon-only, with text, dark glass, classic)
  const [navBarStyle, setNavBarStyleState] = useState<NavBarStyle>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cs_mobile_navbar_style') : null;
    return (saved as NavBarStyle) || 'liquid-glass-icon';
  });

  const setNavBarStyle = (style: NavBarStyle) => {
    setNavBarStyleState(style);
    try {
      localStorage.setItem('cs_mobile_navbar_style', style);
    } catch {}
  };

  // Extended Routing Handlers for Mobile Discover
  const handleSetSelectedBrandId = (brandId: string | null) => {
    setSelectedBrandId(brandId);
    if (brandId) {
      navigate(`/mobile/discover/${brandId}`);
    } else {
      navigate('/mobile/discover');
    }
  };

  const handleSetSelectedActivity = (act: Activity | null) => {
    setSelectedActivity(act);
    if (act) {
      const bId = act.vendorId || selectedBrandId || 'services';
      navigate(`/mobile/discover/${bId}/${act.id}`);
    } else if (selectedBrandId) {
      navigate(`/mobile/discover/${selectedBrandId}`);
    } else {
      navigate('/mobile/discover');
    }
  };

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const mobileIdx = pathParts.indexOf('mobile');
    const screenPart = mobileIdx !== -1 ? pathParts[mobileIdx + 1] : pathParts[0];

    if (screenPart === 'discover') {
      setActiveScreenState('discover');
      setActiveTabState('discover');

      const brandPart = mobileIdx !== -1 ? pathParts[mobileIdx + 2] : pathParts[1];
      const servicePart = mobileIdx !== -1 ? pathParts[mobileIdx + 3] : pathParts[2];

      if (brandPart) {
        setSelectedBrandId(brandPart);
      } else {
        setSelectedBrandId(null);
      }

      if (servicePart) {
        const foundAct = mockActivities.find((a) => a.id === servicePart) || null;
        setSelectedActivity(foundAct);
      } else {
        setSelectedActivity(null);
      }
    } else if (screenPart && ['feed', 'discover', 'bookings', 'profile'].includes(screenPart)) {
      setActiveScreenState(screenPart as ScreenType);
      setActiveTabState(screenPart as TabType);
      setSelectedBrandId(null);
      setSelectedActivity(null);
    }
  }, [location.pathname]);

  const setActiveScreen = (screen: ScreenType) => {
    setActiveScreenState(screen);
    if (['feed', 'discover', 'bookings', 'profile'].includes(screen)) {
      setActiveTabState(screen as TabType);
    }
    navigate(`/mobile/${screen}`);
  };

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    setActiveScreenState(tab as ScreenType);
    if (tab === 'discover' && selectedBrandId) {
      navigate(`/mobile/discover/${selectedBrandId}`);
    } else {
      navigate(`/mobile/${tab}`);
    }
  };

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Auth state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [jobTitleInput] = useState('');
  const [regStep, setRegStep] = useState(1);
  const [regName, setRegName] = useState('');
  const [regAccountType, setRegAccountType] = useState<'individual' | 'corporate'>('individual');
  const [orgSize, setOrgSize] = useState('just-me');
  const [companyNameInput, setCompanyNameInput] = useState('');
  const [industryInput, setIndustryInput] = useState('Technology & Design');
  const [, setPlanCategory] = useState<'individual' | 'corporate'>('individual');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('advanced-creative');

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

  const onboardingSlides: OnboardingSlide[] = [
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
      subtext: 'Scan QR tickets at studios and monitor your creative rhythm over time.',
      buttonColor: '#6FD352',
      buttonText: 'Get Started',
      accentGradient: 'linear-gradient(180deg, #6FD352 0%, rgba(255, 255, 255, 0) 100%)',
    },
  ];

  const handleDemoLogin = (type: 'client' | 'corporate' | string) => {
    if (type === 'corporate') {
      setRegName('Alex Morgan (Corporate Client)');
    } else {
      setRegName('Sophia Chen (Individual Client)');
    }
    if (typeof type === 'string' && type.includes('@')) {
      setEmailInput(type);
    } else {
      setEmailInput('sophia.chen@example.com');
    }
    setActiveScreen('feed');
  };

  const handleConfirmBooking = (act: Activity) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      activityName: act.name,
      vendorName: act.vendorName,
      date: bookingSelectedSlot.split('•')[0]?.trim() || 'Tomorrow',
      time: bookingSelectedSlot.split('•')[1]?.trim() || '2:00 PM - 3:30 PM',
      location: act.location,
      status: 'Confirmed',
      seats: 1,
      color: act.color || '#33C4F0',
      symbol: act.symbol || '🎨',
      qrCode: `CS-${act.vendorId.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}-2026`,
      image: act.image,
    };

    setMyBookings([newBooking, ...myBookings]);
    setBookingSuccessMsg(`Successfully booked "${act.name}"!`);
    handleSetSelectedActivity(null);
    setTimeout(() => setBookingSuccessMsg(null), 4000);
  };

  // SCREEN ROUTER RENDER LOGIC
  const renderMobileScreenContent = () => {
    if (activeScreen === 'onboarding') {
      return (
        <MobileOnboardingScreen
          onboardingStep={onboardingStep}
          setOnboardingStep={setOnboardingStep}
          onboardingSlides={onboardingSlides}
          handleDemoLogin={handleDemoLogin}
          setActiveScreen={setActiveScreen}
          setRegStep={setRegStep}
        />
      );
    }

    if (activeScreen === 'login') {
      return (
        <MobileLoginScreen
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          setActiveScreen={setActiveScreen}
          handleDemoLogin={handleDemoLogin}
        />
      );
    }

    if (activeScreen === 'register') {
      return (
        <MobileRegisterScreen
          regStep={regStep}
          setRegStep={setRegStep}
          regName={regName}
          setRegName={setRegName}
          regAccountType={regAccountType}
          setRegAccountType={setRegAccountType}
          setPlanCategory={setPlanCategory}
          setOrgSize={setOrgSize}
          orgSize={orgSize}
          companyNameInput={companyNameInput}
          setCompanyNameInput={setCompanyNameInput}
          industryInput={industryInput}
          setIndustryInput={setIndustryInput}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          selectedPlanId={selectedPlanId}
          setSelectedPlanId={setSelectedPlanId}
          setActiveScreen={setActiveScreen}
          handleDemoLogin={handleDemoLogin}
        />
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
          <MobileFeedScreen
            brandStories={brandStories}
            setActiveStoryIdx={setActiveStoryIdx}
            setSelectedPost={setSelectedPost}
            likedPostIds={likedPostIds}
            toggleLikePost={(id) => {
              if (likedPostIds.includes(id)) {
                setLikedPostIds(likedPostIds.filter((item) => item !== id));
              } else {
                setLikedPostIds([...likedPostIds, id]);
              }
            }}
          />
        )}

        {/* TAB 2: DISCOVER */}
        {activeTab === 'discover' && (
          <MobileDiscoverScreen
            selectedBrandId={selectedBrandId}
            setSelectedBrandId={handleSetSelectedBrandId}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedPlanId={selectedPlanId}
            setSelectedActivity={handleSetSelectedActivity}
            savedActivityIds={savedActivityIds}
            toggleSaveActivity={(id) => {
              if (savedActivityIds.includes(id)) {
                setSavedActivityIds(savedActivityIds.filter((item) => item !== id));
              } else {
                setSavedActivityIds([...savedActivityIds, id]);
              }
            }}
          />
        )}

        {/* TAB 3: BOOKINGS */}
        {activeTab === 'bookings' && (
          <MobileBookingsScreen
            myBookings={myBookings}
            setActiveTab={setActiveTab}
            setSelectedQrPass={setSelectedQrPass}
          />
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <MobileProfileScreen
            regName={regName}
            emailInput={emailInput}
            jobTitleInput={jobTitleInput}
            companyNameInput={companyNameInput}
            industryInput={industryInput}
            setRegStep={setRegStep}
            savedActivityIds={savedActivityIds}
            setActiveTab={setActiveTab}
            setActiveScreen={setActiveScreen}
            navBarStyle={navBarStyle}
            setNavBarStyle={setNavBarStyle}
          />
        )}

        {/* BOTTOM NAVIGATION BAR */}
        {(() => {
          const navItems = [
            { id: 'feed', label: 'Feed', icon: House },
            { id: 'discover', label: 'Discover', icon: Compass },
            { id: 'bookings', label: 'Bookings', icon: CalendarBlank, badge: myBookings.length },
            { id: 'profile', label: 'Profile', icon: User },
          ];

          if (navBarStyle === 'classic') {
            return (
              <div className="bg-white/95 backdrop-blur-md border-t border-slate-100 px-3 py-2 flex items-center justify-around absolute bottom-0 inset-x-0 z-30 shadow-lg">
                {navItems.map((tab) => {
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
                      <Icon size={20} weight={isActive ? 'fill' : 'regular'} color={isActive ? '#33C4F0' : '#6A7282'} />
                      <span className="text-[10px]" style={{ color: isActive ? '#33C4F0' : '#6A7282' }}>
                        {tab.label}
                      </span>
                      {tab.badge ? (
                        <span className="absolute top-0 right-2.5 w-4 h-4 bg-[#33C4F0] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                          {tab.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            );
          }

          const isDark = navBarStyle === 'liquid-glass-dark';
          const isIconOnly = navBarStyle === 'liquid-glass-icon';
          const containerHeight = isIconOnly ? '65px' : '66px';
          const buttonHeight = isIconOnly ? '48px' : '49px';
          const iconSize = isIconOnly ? 24 : 20;

          return (
            <nav
              style={{
                position: 'absolute',
                bottom: '26px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 32px)',
                maxWidth: '368px',
                height: containerHeight,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 30,
                pointerEvents: 'auto',
              }}
            >
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 10px',
                  width: '100%',
                  height: containerHeight,
                  background: isDark ? 'rgba(26, 26, 40, 0.85)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #F1F5F9',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.7)',
                  borderRadius: '60px',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 8px 32px rgba(31, 38, 135, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                {navItems.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const iconColor = isActive ? '#33C4F0' : isDark ? '#94A3B8' : '#6A7282';
                  const textColor = isActive ? '#33C4F0' : isDark ? '#94A3B8' : '#6A7282';

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '6px 8px',
                        gap: '2px',
                        flex: '1 1 0%',
                        maxWidth: '72px',
                        height: buttonHeight,
                        background: isActive
                          ? isDark
                            ? 'rgba(255, 255, 255, 0.12)'
                            : 'rgba(0, 0, 0, 0.06)'
                          : 'transparent',
                        borderRadius: '25.6px',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                        isolation: 'isolate',
                      }}
                    >
                      <div
                        style={{
                          width: `${iconSize}px`,
                          height: `${iconSize}px`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 'none',
                          flexGrow: 0,
                          zIndex: 0,
                        }}
                      >
                        <Icon size={iconSize} color={iconColor} weight={isActive ? 'fill' : 'regular'} />
                      </div>

                      {!isIconOnly && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '0px',
                            height: '15px',
                            flex: 'none',
                            flexGrow: 0,
                            zIndex: 1,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontStyle: 'normal',
                              fontWeight: isActive ? 600 : 500,
                              fontSize: '10px',
                              lineHeight: '15px',
                              textAlign: 'center',
                              color: textColor,
                              display: 'block',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {tab.label}
                          </span>
                        </div>
                      )}

                      {tab.badge ? (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px',
                            position: 'absolute',
                            width: '16px',
                            height: '16px',
                            right: '12px',
                            top: isIconOnly ? '6px' : '2px',
                            background: '#33C4F0',
                            borderRadius: '33554432px',
                            flex: 'none',
                            zIndex: 2,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontStyle: 'normal',
                              fontWeight: 700,
                              fontSize: '9px',
                              lineHeight: '14px',
                              textAlign: 'center',
                              color: '#FFFFFF',
                            }}
                          >
                            {tab.badge}
                          </span>
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </nav>
          );
        })()}

        {/* ACTIVITY DETAIL SCREEN */}
        <MobileActivityDetailView
          selectedActivity={selectedActivity}
          setSelectedActivity={handleSetSelectedActivity}
          savedActivityIds={savedActivityIds}
          toggleSaveActivity={(id) => {
            if (savedActivityIds.includes(id)) {
              setSavedActivityIds(savedActivityIds.filter((item) => item !== id));
            } else {
              setSavedActivityIds([...savedActivityIds, id]);
            }
          }}
          bookingSelectedSlot={bookingSelectedSlot}
          setBookingSelectedSlot={setBookingSelectedSlot}
          handleConfirmBooking={handleConfirmBooking}
        />

        {/* POST DETAIL SCREEN & QR CODE PASS MODAL */}
        <MobilePostDetailView
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          likedPostIds={likedPostIds}
          setLikedPostIds={setLikedPostIds}
          postDetailImgIdx={postDetailImgIdx}
          setPostDetailImgIdx={setPostDetailImgIdx}
          postDetailCommentText={postDetailCommentText}
          setPostDetailCommentText={setPostDetailCommentText}
          postDetailComments={postDetailComments}
          setPostDetailComments={setPostDetailComments}
          regName={regName}
          myBookings={myBookings}
          setMyBookings={setMyBookings}
          setBookingSuccessMsg={setBookingSuccessMsg}
          selectedQrPass={selectedQrPass}
          setSelectedQrPass={setSelectedQrPass}
        />

        {/* STORY VIEWER MODAL */}
        <MobileStoryViewerModal
          activeStoryIdx={activeStoryIdx}
          setActiveStoryIdx={setActiveStoryIdx}
          brandStories={brandStories}
          setSelectedBrandId={handleSetSelectedBrandId}
          setActiveTab={setActiveTab}
        />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen h-dvh bg-white text-slate-900 font-sans relative overflow-hidden flex flex-col items-center justify-center">
      {/* MOBILE APPLICATION CONTAINER */}
      <div className="w-full h-full max-w-md mx-auto bg-white text-slate-900 overflow-hidden relative flex flex-col shrink-0">
        <div className="flex-1 overflow-hidden relative">
          {renderMobileScreenContent()}
        </div>
      </div>
    </div>
  );
}
