import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useParams, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  House,
  Compass,
  CalendarBlank,
  User,
  CaretLeft,
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
    if (params.screen && ['onboarding', 'login', 'register', 'feed', 'discover', 'bookings', 'profile'].includes(params.screen)) {
      return params.screen as ScreenType;
    }
    const pathParts = location.pathname.split('/').filter(Boolean);
    const sub = pathParts[0] === 'mobile' ? pathParts[1] : undefined;
    if (sub && ['onboarding', 'login', 'register', 'feed', 'discover', 'bookings', 'profile'].includes(sub)) {
      return sub as ScreenType;
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

  useEffect(() => {
    const screenFromUrl = getScreenFromUrl();
    setActiveScreenState(screenFromUrl);
    if (['feed', 'discover', 'bookings', 'profile'].includes(screenFromUrl)) {
      setActiveTabState(screenFromUrl as TabType);
    }
  }, [location.pathname, params.screen]);

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
    navigate(`/mobile/${tab}`);
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
      subtext: 'Instant mobile scheduling with digital passes & mood tracking.',
      buttonColor: '#6FD352',
      buttonText: 'Get Started',
      accentGradient: 'linear-gradient(180deg, #3CF033 0%, rgba(255, 255, 255, 0) 100%)',
    },
  ];

  const handleDemoLogin = (type: 'client' | 'corporate') => {
    if (type === 'corporate') {
      setRegName('Alex Morgan (Corporate Client)');
    } else {
      setRegName('Sophia Chen (Individual Client)');
    }
    setActiveScreen('feed');
    setActiveTab('feed');
  };

  const toggleSaveActivity = (id: string) => {
    setSavedActivityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleLikePost = (id: string) => {
    setLikedPostIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          regAccountType={regAccountType}
          setRegAccountType={setRegAccountType}
          setPlanCategory={setPlanCategory}
          setOrgSize={setOrgSize}
          orgSize={orgSize}
          companyNameInput={companyNameInput}
          setCompanyNameInput={setCompanyNameInput}
          industryInput={industryInput}
          setIndustryInput={setIndustryInput}
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
            toggleLikePost={toggleLikePost}
          />
        )}

        {/* TAB 2: DISCOVER */}
        {activeTab === 'discover' && (
          <MobileDiscoverScreen
            selectedBrandId={selectedBrandId}
            setSelectedBrandId={setSelectedBrandId}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedPlanId={selectedPlanId}
            setSelectedActivity={setSelectedActivity}
            savedActivityIds={savedActivityIds}
            toggleSaveActivity={toggleSaveActivity}
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
          />
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

        {/* ACTIVITY DETAIL SCREEN */}
        <MobileActivityDetailView
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          savedActivityIds={savedActivityIds}
          toggleSaveActivity={toggleSaveActivity}
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
          setSelectedBrandId={setSelectedBrandId}
          setActiveTab={setActiveTab}
        />
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

      {/* MOBILE APPLICATION CONTAINER */}
      <div className="w-full max-w-[402px] h-[874px] max-h-[calc(100vh-65px)] bg-white text-slate-900 rounded-none shadow-2xl overflow-hidden relative flex flex-col border border-slate-800/60 shrink-0">
        <div className="flex-1 overflow-hidden relative">
          {renderMobileScreenContent()}
        </div>
      </div>
    </div>
  );
}
