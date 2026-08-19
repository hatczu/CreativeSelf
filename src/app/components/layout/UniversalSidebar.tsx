import React from 'react';
import { Link, useLocation } from 'react-router';
import { SquaresFour as LayoutDashboard, Compass, CalendarBlank as CalendarDays, Gear as Settings, SignOut as LogOut, Users, DeviceMobile } from '@phosphor-icons/react';
import { RoleSwitcher } from './RoleSwitcher';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logoIcon from '@/imports/Logo.png';

export function UniversalSidebar() {
  const { pathname } = useLocation();

  const isHomeActive = pathname === '/dashboard' || pathname === '/corporate';
  const isDiscoverActive = pathname === '/discover/services' || pathname.startsWith('/discover/services/');
  const isBookingsActive = pathname.startsWith('/bookings');
  const isMobileActive = pathname.startsWith('/mobile');

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#33c4f0]/15 bg-white/90 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex">
      <Link
        to="/"
        title="CreativeSelf Home"
        aria-label="CreativeSelf Home"
        className="grid h-10 w-10 place-items-center transition-transform hover:scale-105"
      >
        <ImageWithFallback src={logoIcon} alt="CreativeSelf Logo" className="h-full w-full object-contain" />
      </Link>

      <nav className="mt-10 flex flex-col gap-3" aria-label="Universal navigation">
        {/* Module 1: Home */}
        <Link
          to="/dashboard"
          title="Home"
          aria-label="Home"
          className={`grid h-10 w-10 place-items-center rounded-full transition ${
            isHomeActive
              ? 'bg-[#33c4f0] text-[#1a1a28] shadow-sm'
              : 'text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]'
          }`}
        >
          <LayoutDashboard size={18} />
        </Link>

        {/* Module 2: Discover Services */}
        <Link
          to="/discover/services"
          title="Discover Services"
          aria-label="Discover Services"
          className={`grid h-10 w-10 place-items-center rounded-full transition ${
            isDiscoverActive
              ? 'bg-[#33c4f0] text-[#1a1a28] shadow-sm'
              : 'text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]'
          }`}
        >
          <Compass size={18} />
        </Link>

        {/* Module 3: Bookings */}
        <Link
          to="/bookings"
          title="Bookings"
          aria-label="Bookings"
          className={`grid h-10 w-10 place-items-center rounded-full transition ${
            isBookingsActive
              ? 'bg-[#33c4f0] text-[#1a1a28] shadow-sm'
              : 'text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]'
          }`}
        >
          <CalendarDays size={18} />
        </Link>

        {/* Module 4: Client Mobile App */}
        <Link
          to="/mobile"
          title="Client Mobile App"
          aria-label="Client Mobile App"
          className={`grid h-10 w-10 place-items-center rounded-full transition ${
            isMobileActive
              ? 'bg-[#147c9e] text-white shadow-sm'
              : 'text-[#147c9e] bg-[#e8f9ff] hover:bg-[#33c4f0] hover:text-[#1a1a28]'
          }`}
        >
          <DeviceMobile size={18} weight="bold" />
        </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <button
          type="button"
          title="Settings"
          aria-label="Settings"
          className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
        >
          <Settings size={18} />
        </button>
        <Link
          to="/"
          title="Log out"
          aria-label="Log out"
          className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#1a1a28] hover:text-white"
        >
          <LogOut size={18} />
        </Link>
        <RoleSwitcher activeRole="client" />
      </div>
    </aside>
  );
}
