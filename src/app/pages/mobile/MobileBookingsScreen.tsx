import React, { useState } from 'react';
import {
  CalendarBlank,
  Clock,
  MapPin,
  QrCode,
  MagnifyingGlass,
  Check,
  Eye,
  Ticket,
  Sparkle,
} from '@phosphor-icons/react';
import { useSubscription } from '@/app/context/SubscriptionContext';

interface MobileBookingsScreenProps {
  myBookings: any[];
  setActiveTab: (tab: any) => void;
  setSelectedQrPass: (pass: any) => void;
}

export function MobileBookingsScreen({
  myBookings,
  setActiveTab,
  setSelectedQrPass,
}: MobileBookingsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Try to read active plan name from SubscriptionContext if available
  let planName = 'Pass Active';
  try {
    const subContext = useSubscription();
    if (subContext?.planName) {
      planName = subContext.planName;
    }
  } catch (e) {
    /* fallback to default */
  }

  const filteredBookings = myBookings.filter((bk) => {
    const matchesSearch =
      !searchQuery ||
      bk.activityName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bk.vendorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bk.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedStatus === 'all' ||
      (selectedStatus === 'confirmed' && bk.status?.toLowerCase() === 'confirmed') ||
      (selectedStatus === 'pass' && bk.qrCode);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* TOP HEADER BLOCK (Aligned exactly to Mobile Discover Screen) */}
      <div className="bg-white px-4 pt-5 pb-4 space-y-3">
        <div className="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full w-fit mb-2.5">
          <span
            className="text-[10px] font-semibold text-[#007595] leading-[15px]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {myBookings.length} {myBookings.length === 1 ? 'Active Booking' : 'Active Bookings'}
          </span>
        </div>

        <h2
          className="text-[16px] font-semibold text-[#1A1A28] leading-tight"
          style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
        >
          My Bookings & Passes
        </h2>

        <p
          className="text-[12px] text-[#6A7282] font-normal leading-relaxed"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Access your active mobile passes, ticket QR codes, and scheduled workshop sessions.
        </p>

        {/* Search Input Box */}
        <div
          className="w-full h-[40px] bg-white border border-[#E2E8F0] flex items-center px-[12px] pr-[20px] gap-[8px] transition focus-within:border-[#33C4F0]"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <MagnifyingGlass size={16} className="text-[#90A1B9] shrink-0" />
          <input
            type="text"
            placeholder="Search bookings, vendor, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-transparent text-[12px] font-medium text-slate-900 placeholder:text-[#90A1B9] focus:outline-none"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          />
        </div>

        {/* Status & Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pt-1 pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { id: 'all', label: 'All Bookings', symbol: '🎟️' },
            { id: 'confirmed', label: 'Confirmed', symbol: '✅' },
            { id: 'pass', label: 'Mobile Pass QR', symbol: '📲' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              style={{ borderRadius: '20px 20px 48px 20px' }}
              className={`py-1.5 px-3.5 text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap transition ${
                selectedStatus === tab.id
                  ? 'bg-[#1AB0DC] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{tab.symbol}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* BOOKINGS CONTENT LIST (Aligned to Mobile Discover Content List) */}
      <div className="pt-2">
        <div className="space-y-2 pb-4">
          {filteredBookings.map((bk) => (
            <div key={bk.id} className="w-full bg-white rounded-none p-4 space-y-3.5">
              {/* Main Booking Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#E8F9FF] border border-[#33C4F0]/30 flex items-center justify-center text-[18px] shrink-0">
                    {bk.symbol || '🎟️'}
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span
                      className="text-[10px] font-semibold text-[#64748B] truncate uppercase tracking-wider"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {bk.vendorName}
                    </span>
                    <h4
                      className="text-[13px] font-semibold text-[#0F172B] leading-[18px] truncate"
                      style={{ fontFamily: 'Century Gothic, sans-serif' }}
                    >
                      {bk.activityName}
                    </h4>
                  </div>
                </div>
                <span
                  className="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] border border-[#10B981]/25 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Check size={11} /> {bk.status || 'Confirmed'}
                </span>
              </div>

              {/* Media Image Banner */}
              {bk.image && (
                <div
                  className="relative h-[160px] w-full bg-slate-100 overflow-hidden isolate shadow-2xs cursor-pointer group"
                  style={{ borderRadius: '20px' }}
                  onClick={() => setSelectedQrPass(bk)}
                >
                  <img
                    src={bk.image}
                    alt={bk.activityName}
                    className="w-full h-full object-cover relative z-0 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div
                    className="absolute inset-0 z-[1]"
                    style={{
                      background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  />

                  {/* Pass Status Badge Top-Left */}
                  <div className="absolute top-3 left-3 z-[2]">
                    <span
                      className="text-[10px] font-semibold text-[#10B981] bg-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Check size={11} /> Active Pass
                    </span>
                  </div>

                  {/* Ticket Count Badge Top-Right */}
                  <div className="absolute top-3 right-3 z-[2]">
                    <span
                      className="text-[10px] font-semibold text-[#147C9E] bg-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Ticket size={12} className="text-[#33C4F0]" /> {bk.seats || 1} {bk.seats === 1 ? 'Ticket' : 'Tickets'}
                    </span>
                  </div>

                  {/* Bottom Overlay Badges */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-[3]">
                    <span
                      className="text-[10px] font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Clock size={12} className="text-[#33C4F0]" /> {bk.date}
                    </span>
                    <span
                      className="text-[10px] font-semibold text-white bg-[#33C4F0]/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <QrCode size={12} /> Entry QR Ready
                    </span>
                  </div>
                </div>
              )}

              {/* Details Row: Clock & Location matching Discover */}
              <div
                className="flex items-center justify-between text-[11px] font-semibold text-[#717182] pt-0.5"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-[#33C4F0]" /> {bk.date} • {bk.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#33C4F0]" /> {bk.location}
                </span>
              </div>

              {bk.qrCode && (
                <div className="rounded-xl bg-[#E8F9FF] border border-[#33C4F0]/30 p-2.5 flex items-center justify-between text-[11px] text-[#147C9E]">
                  <span className="flex items-center gap-1.5 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <QrCode size={15} className="text-[#33C4F0]" /> Pass Code:
                  </span>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#A2F4FD] text-[10px]">
                    {bk.qrCode}
                  </span>
                </div>
              )}

              {/* CTA Buttons Row matching Discover */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('discover')}
                  className="flex-1 h-[36px] bg-[#F8FDFF] border border-[#33C4F0]/40 text-[#147C9E] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition hover:bg-[#E8F9FF]"
                  style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                >
                  <Eye size={15} className="text-[#147C9E]" />
                  Explore More
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedQrPass(bk)}
                  className="flex-1 h-[36px] bg-[#33C4F0] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition hover:opacity-90 shadow-xs"
                  style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                >
                  <QrCode size={15} />
                  Show Mobile Pass
                </button>
              </div>
            </div>
          ))}

          {/* Empty State / Zero Results View */}
          {filteredBookings.length === 0 && (
            <div className="bg-white p-8 text-center space-y-3.5 my-2">
              <div className="w-14 h-14 rounded-full bg-[#E8F9FF] border border-[#A2F4FD] flex items-center justify-center text-[#1AB0DC] mx-auto shadow-xs">
                <CalendarBlank size={28} />
              </div>
              <div>
                <h4
                  className="text-base font-semibold text-[#1A1A28]"
                  style={{ fontFamily: 'Century Gothic, sans-serif' }}
                >
                  {searchQuery ? 'No Matching Bookings' : 'No Active Bookings'}
                </h4>
                <p
                  className="text-xs text-[#6A7282] max-w-xs mx-auto mt-1 leading-relaxed"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {searchQuery
                    ? `We couldn't find any bookings matching "${searchQuery}". Try searching for another session or location.`
                    : 'Discover upcoming creative sessions, workshops, and wellness experiences to book your first pass.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('discover')}
                className="px-6 py-2.5 bg-[#33C4F0] text-white text-xs font-semibold hover:opacity-90 transition shadow-xs inline-flex items-center gap-1.5"
                style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
              >
                <Sparkle size={15} />
                Discover Sessions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
