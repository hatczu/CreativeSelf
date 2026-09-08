import React from 'react';
import {
  Plus,
  QrCode,
  Sparkle,
  CaretRight,
  TrendUp,
  CalendarBlank,
  Users,
  Clock,
  Eye,
  Star,
  Check,
  Bell,
  Image as ImageIcon,
  Building,
  ChatCircleText,
} from '@phosphor-icons/react';

interface ProviderMobileHomeScreenProps {
  onOpenNewService: () => void;
  onOpenStoryComposer: () => void;
  onOpenQRScanner: () => void;
  onSelectBooking: (booking: any) => void;
  bookings: any[];
  setActiveTab: (tab: any) => void;
}

export function ProviderMobileHomeScreen({
  onOpenNewService,
  onOpenStoryComposer,
  onOpenQRScanner,
  onSelectBooking,
  bookings,
  setActiveTab,
}: ProviderMobileHomeScreenProps) {
  const pendingCount = bookings.filter((b) => b.status === 'Needs response').length;
  const pendingBooking = bookings.find((b) => b.status === 'Needs response');

  return (
    <div className="flex-1 h-full overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* 1. TOP HEADER BLOCK (Matching CreativeSelf Client Mobile Discover Header) */}
      <div
        className="w-full px-4 pt-5 pb-4 space-y-3 border-b border-slate-100/80 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 60%, #FFFFFF 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Workspace Badge */}
          <div className="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full">
            <span
              className="text-[10px] font-semibold text-[#007595] leading-[15px]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Provider Studio Portal
            </span>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenQRScanner}
              className="w-8 h-8 rounded-full bg-white text-slate-700 hover:bg-[#E8F9FF] hover:text-[#007595] border border-slate-200/80 flex items-center justify-center transition cursor-pointer shadow-2xs"
              title="Scan Attendee QR"
            >
              <QrCode size={16} weight="bold" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bookings')}
              className="w-8 h-8 rounded-full bg-white text-slate-700 hover:bg-[#E8F9FF] hover:text-[#007595] border border-slate-200/80 flex items-center justify-center transition relative cursor-pointer shadow-2xs"
              title="Notifications"
            >
              <Bell size={16} weight="bold" />
              {pendingCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#EF4444] text-white text-[8px] font-extrabold flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Studio Branding Title */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-[#EF4444] text-2xl flex items-center justify-center shadow-xs shrink-0 ring-2 ring-white">
            🎨
          </div>
          <div>
            <h1
              className="text-[20px] font-bold text-[#1A1A28] leading-tight"
              style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
            >
              Studio Lumen
            </h1>
            <p className="text-[12px] text-[#6A7282] font-normal">
              Heart of Art Studio · Live on Marketplace
            </p>
          </div>
        </div>

        {/* Quick Studio Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onOpenNewService}
            className="flex-1 py-2 px-3 bg-[#1AB0DC] hover:bg-[#007595] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
          >
            <Plus size={14} weight="bold" />
            <span>New Service</span>
          </button>

          <button
            type="button"
            onClick={onOpenStoryComposer}
            className="flex-1 py-2 px-3 bg-white border border-slate-200 text-slate-700 hover:border-[#1AB0DC] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
          >
            <ImageIcon size={14} className="text-[#1AB0DC]" />
            <span>Post Story</span>
          </button>

          <button
            type="button"
            onClick={onOpenQRScanner}
            className="py-2 px-3 bg-white border border-slate-200 text-slate-700 hover:border-[#1AB0DC] text-[11px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs"
            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
            title="Scan QR Pass"
          >
            <QrCode size={15} className="text-[#007595]" />
          </button>
        </div>
      </div>

      <div className="p-3.5 space-y-3.5">
        {/* 2. MARKETPLACE PULSE STATS CARD (Matching Archetype Card in MobileFeedScreen) */}
        <div
          className="w-full bg-white border border-slate-100/80 p-4 shadow-2xs relative overflow-hidden space-y-3"
          style={{ borderRadius: '28px 28px 84px 28px' }}
        >
          {/* Subtle Background Glow Accent */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: '120px',
              height: '120px',
              right: '-20px',
              top: '-30px',
              backgroundColor: 'rgba(51, 196, 240, 0.12)',
              filter: 'blur(36px)',
            }}
          />

          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <span className="text-[10px] font-bold text-[#007595] uppercase tracking-wider">
                Marketplace Pulse
              </span>
              <h2
                className="text-[14px] font-bold text-[#1A1A28] mt-0.5"
                style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
              >
                Studio Performance (30 Days)
              </h2>
            </div>
            <span className="text-[10px] font-semibold text-[#007595] bg-[#ECFEFF] border border-[#A2F4FD] px-2.5 py-0.5 rounded-full">
              +18% Views
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div
              className="bg-slate-50/80 p-2.5 border border-slate-100"
              style={{ borderRadius: '14px 14px 28px 14px' }}
            >
              <p className="text-[18px] font-extrabold text-[#1AB0DC]">451</p>
              <p className="text-[10px] font-semibold text-[#6A7282] mt-0.5">Profile Views</p>
            </div>

            <div
              className="bg-slate-50/80 p-2.5 border border-slate-100"
              style={{ borderRadius: '14px 14px 28px 14px' }}
            >
              <p className="text-[18px] font-extrabold text-[#1AB0DC]">13</p>
              <p className="text-[10px] font-semibold text-[#6A7282] mt-0.5">Booking Requests</p>
            </div>

            <div
              className="bg-slate-50/80 p-2.5 border border-slate-100"
              style={{ borderRadius: '14px 14px 28px 14px' }}
            >
              <p className="text-[18px] font-extrabold text-[#1AB0DC]">4.9 ★</p>
              <p className="text-[10px] font-semibold text-[#6A7282] mt-0.5">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* 3. PENDING BOOKING REQUEST ALERT CARD */}
        {pendingBooking && (
          <div
            className="w-full bg-[#FFFBEB] border border-[#FDE68A] p-4 shadow-2xs flex items-center justify-between"
            style={{ borderRadius: '20px 20px 48px 20px' }}
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                {pendingCount}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#92400E] uppercase tracking-wider">
                  Action Required
                </span>
                <h3 className="text-[13px] font-bold text-[#78350F] truncate mt-0.5">
                  {pendingBooking.company} Booking Request
                </h3>
                <p className="text-[11px] text-[#B45309] font-medium truncate">
                  {pendingBooking.session} ({pendingBooking.group})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectBooking(pendingBooking)}
              className="px-3.5 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-[11px] font-semibold transition shrink-0 cursor-pointer shadow-xs"
              style={{ borderRadius: '14px 14px 28px 14px', fontFamily: 'Poppins, sans-serif' }}
            >
              Review
            </button>
          </div>
        )}

        {/* 4. UPCOMING TEAM SESSIONS LIST */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h2
              className="text-[14px] font-bold text-[#1A1A28]"
              style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
            >
              Upcoming Team Sessions
            </h2>
            <button
              type="button"
              onClick={() => setActiveTab('bookings')}
              className="text-[11px] font-semibold text-[#007595] hover:underline"
            >
              View all ({bookings.length})
            </button>
          </div>

          <div className="space-y-2.5">
            {bookings.map((b) => (
              <div
                key={b.session}
                onClick={() => onSelectBooking(b)}
                className="bg-white border border-slate-100/80 p-3.5 shadow-2xs hover:border-[#1AB0DC] transition cursor-pointer space-y-2.5"
                style={{ borderRadius: '20px 20px 48px 20px' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${b.color || '#1AB0DC'}18` }}
                    >
                      {b.emoji}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: b.color || '#007595' }}
                      >
                        {b.date}
                      </p>
                      <h3 className="text-[13px] font-bold text-[#1A1A28] truncate mt-0.5">
                        {b.session}
                      </h3>
                      <p className="text-[11px] text-[#6A7282] font-medium flex items-center gap-1 mt-0.5">
                        <Building size={12} className="text-[#1AB0DC]" />
                        <span>{b.company} · {b.group}</span>
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                      b.status === 'Confirmed'
                        ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]'
                        : 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. ACUMEN SUGGESTION CARD (Matching Upgrade Banner Token Style) */}
        <div
          className="w-full bg-[#1A1A28] text-white p-4 shadow-md flex items-center justify-between relative overflow-hidden"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          {/* Cyan Glow Effect */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#33C4F0]/20 rounded-full blur-xl pointer-events-none" />

          <div className="pr-2 min-w-0 z-10">
            <div className="flex items-center gap-1.5">
              <Sparkle size={15} className="text-[#33C4F0]" weight="fill" />
              <h3
                className="text-xs font-bold text-white uppercase tracking-wider"
                style={{ fontFamily: 'Century Gothic, sans-serif' }}
              >
                Acumen Recommendation
              </h3>
            </div>
            <p className="text-[11px] text-slate-300 font-medium leading-snug mt-1 max-w-[210px]">
              Add a 45-minute express workshop format for lunchtime team resets.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenNewService}
            className="px-3.5 py-2 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] font-bold text-[11px] transition flex items-center gap-1 cursor-pointer shrink-0 shadow-md z-10"
            style={{ borderRadius: '14px 14px 28px 14px', fontFamily: 'Poppins, sans-serif' }}
          >
            <span>Create</span>
            <CaretRight size={12} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
