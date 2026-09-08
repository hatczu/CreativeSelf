import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  House,
  Package,
  CalendarBlank,
  Image as ImageIcon,
  User,
  QrCode,
  Plus,
} from '@phosphor-icons/react';

import { ProviderMobileHomeScreen } from './ProviderMobileHomeScreen';
import { ProviderMobileServicesScreen } from './ProviderMobileServicesScreen';
import { ProviderMobileBookingsScreen } from './ProviderMobileBookingsScreen';
import { ProviderMobileContentScreen } from './ProviderMobileContentScreen';
import { ProviderMobileProfileScreen } from './ProviderMobileProfileScreen';
import {
  ProviderMobileServiceModal,
  ProviderMobileBookingModal,
  ProviderMobileQRScannerModal,
  ProviderMobileStoryComposerModal,
} from './ProviderMobileModals';
import { NavBarStyle, brandStories as defaultBrandStories } from './ClientMobileApp';

export type ProviderTabType = 'home' | 'services' | 'bookings' | 'profile';

const sampleProviderListings = [
  {
    id: 'watercolour',
    title: 'Watercolour without perfection',
    format: '90 min · Team workshop',
    price: '$45/person',
    views: '264',
    bookings: '8',
    published: true,
    color: '#EF4444',
    emoji: '🎨',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Thoughtful art experience for teams that need an expressive creative reset.',
  },
  {
    id: 'behind-scenes',
    title: 'Colour as a way to reset',
    format: '60 min · Pop-up session',
    price: '$35/person',
    views: '187',
    bookings: '5',
    published: true,
    color: '#F59E0B',
    emoji: '🖌️',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    description: 'Quick desk-side color workshop designed for remote & hybrid teams.',
  },
];

const sampleBookingsList = [
  { id: 'b1', company: 'Northstar Studio', session: 'Watercolour without perfection', date: 'Thu, Aug 8 · 3:00 PM', group: '12 guests', status: 'Confirmed', color: '#EF4444', emoji: '🎨' },
  { id: 'b2', company: 'HiNote Consulting', session: 'Colour as a way to reset', date: 'Tue, Aug 13 · 10:30 AM', group: '18 guests', status: 'Needs response', color: '#F59E0B', emoji: '🖌️' },
  { id: 'b3', company: 'Mosaic Labs', session: 'Playful portrait workshop', date: 'Fri, Aug 16 · 2:00 PM', group: '10 guests', status: 'Confirmed', color: '#8B5CF6', emoji: '✨' },
];

export function ProviderMobileApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ screen?: string }>();

  const getInitialTab = (): ProviderTabType => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    if (['home', 'services', 'bookings', 'content', 'profile'].includes(lastPart)) {
      return lastPart as ProviderTabType;
    }
    return 'home';
  };

  const [activeTab, setActiveTabState] = useState<ProviderTabType>(getInitialTab());
  const [servicesList, setServicesList] = useState(sampleProviderListings);
  const [bookingsList, setBookingsList] = useState(sampleBookingsList);
  const [brandStories, setBrandStories] = useState(defaultBrandStories);

  // Modals state
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showStoryComposer, setShowStoryComposer] = useState(false);

  // Nav bar preference
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

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    if (['home', 'services', 'bookings', 'content', 'profile'].includes(lastPart)) {
      setActiveTabState(lastPart as ProviderTabType);
    }
  }, [location.pathname]);

  const setActiveTab = (tab: ProviderTabType) => {
    setActiveTabState(tab);
    if (location.pathname.startsWith('/vendor/mobile')) {
      navigate(`/vendor/mobile/${tab}`);
    } else {
      navigate(`/mobile/provider/${tab}`);
    }
  };

  const handleSaveService = (newSvc: any) => {
    setServicesList((prev) => [newSvc, ...prev]);
  };

  const handleBookingStatusChange = (bookingId: string, status: 'Confirmed' | 'Declined') => {
    setBookingsList((prev) =>
      prev.map((b) => ((b.id === bookingId || b.session === bookingId) ? { ...b, status } : b))
    );
  };

  const handlePostCreated = (newStory: any) => {
    setBrandStories((prev) => [newStory, ...prev]);
  };

  const pendingBookingCount = bookingsList.filter((b) => b.status === 'Needs response').length;

  const tabs: { id: ProviderTabType; label: string; icon: any; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: CalendarBlank, badge: pendingBookingCount || undefined },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="w-full min-h-screen h-dvh bg-white text-slate-900 font-sans relative overflow-hidden flex flex-col items-center justify-center">
      {/* MOBILE APPLICATION CONTAINER */}
      <div className="w-full h-full max-w-md mx-auto bg-white text-slate-900 overflow-hidden relative flex flex-col shrink-0">
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* TAB CONTENT SCREEN RENDER */}
          {activeTab === 'home' && (
            <ProviderMobileHomeScreen
              onOpenNewService={() => setShowServiceModal(true)}
              onOpenStoryComposer={() => setShowStoryComposer(true)}
              onOpenQRScanner={() => setShowQRScanner(true)}
              onSelectBooking={(b) => setSelectedBooking(b)}
              bookings={bookingsList}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'services' && (
            <ProviderMobileServicesScreen
              onOpenNewService={() => setShowServiceModal(true)}
              servicesList={servicesList}
            />
          )}

          {activeTab === 'bookings' && (
            <ProviderMobileBookingsScreen
              onOpenQRScanner={() => setShowQRScanner(true)}
              onSelectBooking={(b) => setSelectedBooking(b)}
              bookings={bookingsList}
            />
          )}

          {activeTab === 'profile' && (
            <ProviderMobileProfileScreen
              navBarStyle={navBarStyle}
              setNavBarStyle={setNavBarStyle}
              setActiveScreen={setActiveTab}
              brandStories={brandStories}
              onOpenStoryComposer={() => setShowStoryComposer(true)}
              servicesList={servicesList}
              onOpenNewService={() => setShowServiceModal(true)}
            />
          )}

          {/* LIQUID GLASS BOTTOM NAVIGATION BAR */}
          {(() => {
            const isDark = navBarStyle === 'liquid-glass-dark';
            const isClassic = navBarStyle === 'classic';
            const isIconOnly = navBarStyle === 'liquid-glass-icon' || isDark;

            let navContainerClass = 'fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40';
            let glassInnerStyle: React.CSSProperties = {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: isIconOnly ? '6px 12px' : '6px 8px',
              height: isIconOnly ? '64px' : '68px',
              background: isClassic
                ? '#FFFFFF'
                : isDark
                ? 'rgba(21, 52, 61, 0.85)'
                : 'rgba(255, 255, 255, 0.78)',
              boxShadow: isClassic
                ? '0 10px 30px rgba(0, 0, 0, 0.08)'
                : isDark
                ? '0px 20px 40px rgba(0, 0, 0, 0.4), inset 0px 1px 1px rgba(255, 255, 255, 0.15)'
                : '0px 20px 40px rgba(28, 118, 155, 0.12), inset 0px 1px 1px rgba(255, 255, 255, 0.6)',
              backdropFilter: isClassic ? 'none' : 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: isClassic ? 'none' : 'blur(20px) saturate(180%)',
              borderRadius: '33554432px',
              border: isClassic
                ? '1px solid #E2E8F0'
                : isDark
                ? '1px solid rgba(255, 255, 255, 0.12)'
                : '1px solid rgba(255, 255, 255, 0.55)',
            };

            return (
              <nav className={navContainerClass} aria-label="Provider Mobile Bottom Navigation">
                <div style={glassInnerStyle}>
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const IconComponent = tab.icon;

                    let iconColor = isDark
                      ? isActive
                        ? '#33C4F0'
                        : 'rgba(255, 255, 255, 0.45)'
                      : isActive
                      ? '#007595'
                      : '#64748B';

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '4px',
                          gap: '2px',
                          flex: 1,
                          height: '100%',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: isIconOnly ? '40px' : '36px',
                            height: isIconOnly ? '40px' : '32px',
                            borderRadius: '33554432px',
                            background: isActive
                              ? isDark
                                ? 'rgba(51, 196, 240, 0.15)'
                                : 'rgba(51, 196, 240, 0.18)'
                              : 'transparent',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <IconComponent
                            size={isIconOnly ? 22 : 20}
                            weight={isActive ? 'fill' : 'regular'}
                            style={{ color: iconColor }}
                          />
                        </div>

                        {!isIconOnly && (
                          <span
                            style={{
                              fontFamily: 'Century Gothic, Poppins, sans-serif',
                              fontWeight: isActive ? 700 : 500,
                              fontSize: '10px',
                              lineHeight: '12px',
                              textAlign: 'center',
                              color: iconColor,
                            }}
                          >
                            {tab.label}
                          </span>
                        )}

                        {tab.badge ? (
                          <div
                            style={{
                              position: 'absolute',
                              right: '12px',
                              top: isIconOnly ? '6px' : '4px',
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              background: '#EF4444',
                              color: '#FFFFFF',
                              fontSize: '9px',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)',
                            }}
                          >
                            {tab.badge}
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </nav>
            );
          })()}

          {/* MODALS */}
          <ProviderMobileServiceModal
            isOpen={showServiceModal}
            onClose={() => setShowServiceModal(false)}
            onSave={handleSaveService}
          />

          <ProviderMobileBookingModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onStatusChange={handleBookingStatusChange}
          />

          <ProviderMobileQRScannerModal
            isOpen={showQRScanner}
            onClose={() => setShowQRScanner(false)}
          />

          <ProviderMobileStoryComposerModal
            isOpen={showStoryComposer}
            onClose={() => setShowStoryComposer(false)}
            onPostCreated={handlePostCreated}
          />
        </div>
      </div>
    </div>
  );
}
