import React, { useState } from 'react';
import {
  CalendarBlank,
  CalendarDots,
  Clock,
  MapPin,
  QrCode,
  MagnifyingGlass,
  CaretLeft,
  CaretRight,
  CaretDown,
  CaretUp,
  SlidersHorizontal,
  Check,
  Eye,
  Ticket,
  Sparkle,
  ChatCircleDots,
  X,
} from '@phosphor-icons/react';

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
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'sessions' | 'workshops' | 'passes'>('sessions');
  const [selectedDateNum, setSelectedDateNum] = useState<number | null>(null);
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(2); // Default to August 2026
  const [isFullCalendarOpen, setIsFullCalendarOpen] = useState(false);

  // Calendar dates list broken into weekly strips across months
  const weeksList = [
    // July 2026
    [
      { day: 'Mon', date: 20, month: 'July', year: 2026, hasBooking: false },
      { day: 'Tue', date: 21, month: 'July', year: 2026, hasBooking: false },
      { day: 'Wed', date: 22, month: 'July', year: 2026, hasBooking: true },
      { day: 'Thu', date: 23, month: 'July', year: 2026, hasBooking: false },
      { day: 'Fri', date: 24, month: 'July', year: 2026, hasBooking: false },
      { day: 'Sat', date: 25, month: 'July', year: 2026, hasBooking: false },
      { day: 'Sun', date: 26, month: 'July', year: 2026, hasBooking: false },
    ],
    [
      { day: 'Mon', date: 27, month: 'July', year: 2026, hasBooking: false },
      { day: 'Tue', date: 28, month: 'July', year: 2026, hasBooking: false },
      { day: 'Wed', date: 29, month: 'July', year: 2026, hasBooking: false },
      { day: 'Thu', date: 30, month: 'July', year: 2026, hasBooking: false },
      { day: 'Fri', date: 31, month: 'July', year: 2026, hasBooking: true },
      { day: 'Sat', date: 1, month: 'August', year: 2026, hasBooking: false },
      { day: 'Sun', date: 2, month: 'August', year: 2026, hasBooking: false },
    ],
    // August 2026
    [
      { day: 'Mon', date: 17, month: 'August', year: 2026, hasBooking: false },
      { day: 'Tue', date: 18, month: 'August', year: 2026, hasBooking: false },
      { day: 'Wed', date: 19, month: 'August', year: 2026, hasBooking: false },
      { day: 'Thu', date: 20, month: 'August', year: 2026, hasBooking: false },
      { day: 'Fri', date: 21, month: 'August', year: 2026, hasBooking: true },
      { day: 'Sat', date: 22, month: 'August', year: 2026, hasBooking: false },
      { day: 'Sun', date: 23, month: 'August', year: 2026, hasBooking: true },
    ],
    [
      { day: 'Mon', date: 24, month: 'August', year: 2026, hasBooking: false },
      { day: 'Tue', date: 25, month: 'August', year: 2026, hasBooking: false },
      { day: 'Wed', date: 26, month: 'August', year: 2026, hasBooking: false },
      { day: 'Thu', date: 27, month: 'August', year: 2026, hasBooking: false },
      { day: 'Fri', date: 28, month: 'August', year: 2026, hasBooking: false },
      { day: 'Sat', date: 29, month: 'August', year: 2026, hasBooking: false },
      { day: 'Sun', date: 30, month: 'August', year: 2026, hasBooking: false },
    ],
    // September 2026
    [
      { day: 'Mon', date: 31, month: 'August', year: 2026, hasBooking: false },
      { day: 'Tue', date: 1, month: 'September', year: 2026, hasBooking: false },
      { day: 'Wed', date: 2, month: 'September', year: 2026, hasBooking: false },
      { day: 'Thu', date: 3, month: 'September', year: 2026, hasBooking: true },
      { day: 'Fri', date: 4, month: 'September', year: 2026, hasBooking: false },
      { day: 'Sat', date: 5, month: 'September', year: 2026, hasBooking: false },
      { day: 'Sun', date: 6, month: 'September', year: 2026, hasBooking: false },
    ],
    [
      { day: 'Mon', date: 7, month: 'September', year: 2026, hasBooking: false },
      { day: 'Tue', date: 8, month: 'September', year: 2026, hasBooking: false },
      { day: 'Wed', date: 9, month: 'September', year: 2026, hasBooking: false },
      { day: 'Thu', date: 10, month: 'September', year: 2026, hasBooking: false },
      { day: 'Fri', date: 11, month: 'September', year: 2026, hasBooking: true },
      { day: 'Sat', date: 12, month: 'September', year: 2026, hasBooking: false },
      { day: 'Sun', date: 13, month: 'September', year: 2026, hasBooking: false },
    ],
    // October 2026
    [
      { day: 'Mon', date: 28, month: 'September', year: 2026, hasBooking: false },
      { day: 'Tue', date: 29, month: 'September', year: 2026, hasBooking: false },
      { day: 'Wed', date: 30, month: 'September', year: 2026, hasBooking: false },
      { day: 'Thu', date: 1, month: 'October', year: 2026, hasBooking: false },
      { day: 'Fri', date: 2, month: 'October', year: 2026, hasBooking: true },
      { day: 'Sat', date: 3, month: 'October', year: 2026, hasBooking: false },
      { day: 'Sun', date: 4, month: 'October', year: 2026, hasBooking: false },
    ],
  ];

  const currentWeek = weeksList[currentWeekIndex] || weeksList[2];

  // Month navigation handlers
  const handlePrevMonth = () => {
    const currentMonthName = currentWeek[0].month;
    for (let i = currentWeekIndex - 1; i >= 0; i--) {
      if (weeksList[i][0].month !== currentMonthName) {
        const targetMonth = weeksList[i][0].month;
        const firstWeekIdx = weeksList.findIndex((w) => w[0].month === targetMonth);
        setCurrentWeekIndex(firstWeekIdx !== -1 ? firstWeekIdx : i);
        return;
      }
    }
  };

  const handleNextMonth = () => {
    const currentMonthName = currentWeek[0].month;
    const nextMonthIdx = weeksList.findIndex(
      (w, idx) => idx > currentWeekIndex && w[0].month !== currentMonthName
    );
    if (nextMonthIdx !== -1) {
      setCurrentWeekIndex(nextMonthIdx);
    }
  };

  const canPrevMonth = weeksList.slice(0, currentWeekIndex).some((w) => w[0].month !== currentWeek[0].month);
  const canNextMonth = weeksList.slice(currentWeekIndex + 1).some((w) => w[0].month !== currentWeek[0].month);

  // Sample attendee avatars for schedule card cluster matching the reference mockup
  const sampleAttendees = [
    { id: 'att-1', name: 'Sarah J.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
    { id: 'att-2', name: 'Marcus V.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { id: 'att-3', name: 'Elena R.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  ];

  const filteredBookings = myBookings.filter((bk) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      bk.activityName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bk.vendorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bk.location?.toLowerCase().includes(searchQuery.toLowerCase());

    // Date filter
    let matchesDate = true;
    if (selectedDateNum !== null) {
      matchesDate = bk.date?.includes(`${selectedDateNum}`);
    }

    // Category tab filter
    let matchesTab = true;
    if (selectedCategoryTab === 'passes') {
      matchesTab = Boolean(bk.qrCode);
    } else if (selectedCategoryTab === 'workshops') {
      matchesTab = bk.activityName?.toLowerCase().includes('watercolour') || bk.activityName?.toLowerCase().includes('workshop');
    } else if (selectedCategoryTab === 'sessions') {
      matchesTab = true;
    }

    return matchesSearch && matchesDate && matchesTab;
  });

  const toggleExpand = (id: string) => {
    setExpandedBookingId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* TOP HEADER BLOCK (Matching Mobile Discover Header Spacing & Layout) */}
      <div className="bg-white px-4 pt-5 pb-4 space-y-3 border-b border-slate-100">
        {/* Header Row: Title & Active Bookings Count & Calendar Teardrop Action Button */}
        <div className="flex items-start justify-between">
          <div>
            {/* Active Bookings Badge */}
            <div className="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full w-fit mb-2.5">
              <span
                className="text-[10px] font-semibold text-[#007595] leading-[15px]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {myBookings.length} {myBookings.length === 1 ? 'Active Booking' : 'Active Bookings'}
              </span>
            </div>

            {/* Schedule Heading */}
            <h2
              className="text-[18px] font-semibold text-[#1A1A28] leading-tight"
              style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
            >
              Schedule
            </h2>
          </div>

          {/* Calendar Icon Button with Teardrop Radius (Toggles Inline Full Calendar View) */}
          <button
            type="button"
            onClick={() => setIsFullCalendarOpen(!isFullCalendarOpen)}
            className={`w-[44px] h-[40px] border flex items-center justify-center pr-[2px] transition shrink-0 cursor-pointer ${
              isFullCalendarOpen
                ? 'bg-[#007595] border-[#007595] text-white shadow-xs'
                : 'bg-[#F8FDFF] border-[#33C4F0] text-[#147C9E] hover:bg-[#E8F9FF]'
            }`}
            style={{ borderRadius: '20px 20px 48px 20px' }}
            title={isFullCalendarOpen ? "Hide Full Calendar" : "View Full Calendar"}
          >
            <CalendarDots size={18} weight={isFullCalendarOpen ? "fill" : "regular"} />
          </button>
        </div>

        {/* Month Navigator Row (Teardrop Radius) */}
        <div
          className="bg-[#F8FAFC] px-3 py-2 flex items-center justify-between border border-[#E2E8F0]/60 h-[46px]"
          style={{ borderRadius: '16px 16px 36px 16px' }}
        >
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={!canPrevMonth}
            className="w-7 h-7 flex items-center justify-center text-[#45556C] hover:text-slate-900 disabled:opacity-30 transition cursor-pointer"
            title="Previous Month"
          >
            <CaretLeft size={14} weight="bold" />
          </button>
          <span
            className="text-[13px] font-bold text-[#0F172B] leading-[20px]"
            style={{ fontFamily: 'Century Gothic, sans-serif' }}
          >
            {currentWeek[0].month} {currentWeek[0].year}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            disabled={!canNextMonth}
            className="w-7 h-7 flex items-center justify-center text-[#45556C] hover:text-slate-900 disabled:opacity-30 transition cursor-pointer"
            title="Next Month"
          >
            <CaretRight size={14} weight="bold" />
          </button>
        </div>

        {/* CALENDAR DISPLAY: INLINE FULL MONTH GRID OR HORIZONTAL WEEK STRIP */}
        {isFullCalendarOpen ? (
          /* INLINE FULL MONTH CALENDAR VIEW (Native Mobile Layout) */
          <div className="bg-[#F8FAFC]/80 p-3 border border-[#E2E8F0] space-y-2.5 rounded-2xl animate-in fade-in duration-200">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
                <span key={d} className="text-[9px] font-semibold text-[#64748B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {d}
                </span>
              ))}
            </div>

            {/* Date Cells Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
                const isSelected = selectedDateNum === dayNum;
                const hasBookingOnDate = weeksList.some((w) =>
                  w.some((item) => item.month === currentWeek[0].month && item.date === dayNum && item.hasBooking)
                );

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => setSelectedDateNum(isSelected ? null : dayNum)}
                    className={`h-9 flex flex-col items-center justify-center text-[12px] font-bold transition relative cursor-pointer ${
                      isSelected
                        ? 'bg-[#1AB0DC] text-white shadow-xs'
                        : hasBookingOnDate
                        ? 'bg-[#ECFEFF] text-[#1AB0DC] border border-[#A2F4FD]'
                        : 'bg-white text-[#314158] border border-slate-200/60 hover:bg-slate-100'
                    }`}
                    style={{ borderRadius: '10px 10px 22px 10px', fontFamily: 'Century Gothic, sans-serif' }}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {/* Inline Footer Controls */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60 text-[11px]">
              {selectedDateNum !== null ? (
                <button
                  type="button"
                  onClick={() => setSelectedDateNum(null)}
                  className="text-[#007595] font-semibold hover:underline cursor-pointer"
                >
                  Clear Filter ({currentWeek[0].month} {selectedDateNum})
                </button>
              ) : (
                <span className="text-[10px] text-slate-400">Tap a date to filter schedule</span>
              )}
              <button
                type="button"
                onClick={() => setIsFullCalendarOpen(false)}
                className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-200/80 hover:bg-slate-300 rounded-full transition cursor-pointer"
              >
                Collapse Calendar
              </button>
            </div>
          </div>
        ) : (
          /* Horizontal Date Selector Strip (6 Days visible for spacious layout) */
          <div className="flex items-center gap-1.5 justify-between pt-0.5">
            <button
              type="button"
              onClick={() => setCurrentWeekIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentWeekIndex === 0}
              className="w-7 h-7 bg-white border border-[#E2E8F0] flex items-center justify-center text-[#45556C] hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition shrink-0 self-center cursor-pointer"
              style={{ borderRadius: '10px 10px 22px 10px' }}
              title="Previous Week"
            >
              <CaretLeft size={14} weight="bold" />
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1 justify-between">
              {currentWeek.slice(0, 6).map((item) => {
                const isSelected = selectedDateNum === item.date;
                const hasBooking = item.hasBooking;
                return (
                  <button
                    key={`${item.month}-${item.date}`}
                    type="button"
                    onClick={() => setSelectedDateNum(isSelected ? null : item.date)}
                    className={`flex flex-col items-center justify-center flex-1 min-w-[42px] max-w-[52px] h-[61px] pt-[8px] pb-[14px] transition relative shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1AB0DC] text-white shadow-xs'
                        : 'bg-white border border-[#E2E8F0]/80 hover:border-slate-300'
                    }`}
                    style={{ borderRadius: '14px 14px 34px 14px' }}
                  >
                    <span
                      className={`text-[9px] font-semibold uppercase ${
                        isSelected
                          ? 'text-white opacity-90'
                          : hasBooking
                          ? 'text-[#1AB0DC]'
                          : 'text-[#314158] opacity-80'
                      }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {item.day}
                    </span>
                    <span
                      className={`text-[14px] font-bold mt-0.5 ${
                        isSelected
                          ? 'text-white'
                          : hasBooking
                          ? 'text-[#1AB0DC]'
                          : 'text-[#314158]'
                      }`}
                      style={{ fontFamily: 'Century Gothic, sans-serif' }}
                    >
                      {item.date}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setCurrentWeekIndex((prev) => Math.min(weeksList.length - 1, prev + 1))}
              disabled={currentWeekIndex === weeksList.length - 1}
              className="w-7 h-7 bg-white border border-[#E2E8F0] flex items-center justify-center text-[#45556C] hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition shrink-0 self-center cursor-pointer"
              style={{ borderRadius: '10px 10px 22px 10px' }}
              title="Next Week"
            >
              <CaretRight size={14} weight="bold" />
            </button>
          </div>
        )}

        {/* Search Input Box */}
        <div
          className="w-full h-[40px] bg-white border border-[#E2E8F0] flex items-center px-[12px] gap-[8px] transition focus-within:border-[#33C4F0]"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <MagnifyingGlass size={16} className="text-[#90A1B9] shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-transparent text-[12px] font-medium text-slate-900 placeholder:text-[#90A1B9] focus:outline-none"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          />
          <button
            type="button"
            onClick={() => {
              if (searchQuery) setSearchQuery('');
            }}
            className="text-[#90A1B9] hover:text-slate-700 transition p-1"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pt-1 pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { id: 'sessions', label: 'Sessions', icon: ChatCircleDots },
            { id: 'workshops', label: 'Events & Workshops', icon: CalendarBlank },
            { id: 'passes', label: 'Mobile Passes', icon: QrCode },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = selectedCategoryTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategoryTab(tab.id as any)}
                style={{ borderRadius: '20px 20px 48px 20px' }}
                className={`h-[30.5px] px-3.5 text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap transition ${
                  isActive
                    ? 'bg-[#1AB0DC] text-white shadow-xs'
                    : 'bg-white text-[#45556C] border border-[#E2E8F0] hover:border-slate-300'
                }`}
              >
                <TabIcon size={15} className={isActive ? 'text-white' : 'text-[#45556C]'} />
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SCHEDULE BOOKINGS CONTENT LIST */}
      <div className="p-4 space-y-3.5 relative z-10">
        {filteredBookings.map((bk) => {
          const isExpanded = expandedBookingId === bk.id;
          return (
            <div
              key={bk.id}
              className="w-full bg-white p-4 space-y-3 border border-slate-100 shadow-2xs hover:shadow-xs transition"
              style={{ borderRadius: '24px 24px 60px 24px' }}
            >
              {/* Card Header Row (Matching Feed Card Header Style) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {bk.vendorLogo ? (
                    <img
                      src={bk.vendorLogo}
                      alt={bk.vendorName}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <span className="text-xl p-1 bg-slate-100 rounded-full flex items-center justify-center w-8 h-8 shrink-0">
                      {bk.symbol || '🎨'}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">{bk.vendorName}</p>
                    <p className="text-[11px] text-slate-400 truncate">Host & Studio Partner</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleExpand(bk.id)}
                  className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition shrink-0 cursor-pointer"
                >
                  {isExpanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
                </button>
              </div>

              {/* Media Image Banner goes FIRST right after header */}
              {bk.image && (
                <div
                  className="relative h-[150px] w-full bg-slate-100 overflow-hidden isolate shadow-2xs cursor-pointer group"
                  style={{ borderRadius: '20px 20px 50px 20px' }}
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
                      background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  />

                  {/* Top-Right Status Badge (Confirmed) */}
                  <div className="absolute top-2.5 right-2.5 z-[2]">
                    <span
                      className="text-[10px] font-semibold text-[#10B981] bg-white/95 backdrop-blur-md px-2.5 py-0.5 shadow-sm flex items-center gap-1"
                      style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Check size={11} className="text-[#10B981]" /> {bk.status || 'Confirmed'}
                    </span>
                  </div>

                  {/* Bottom Date Overlay */}
                  <div className="absolute bottom-2.5 left-3 z-[2]">
                    <span
                      className="text-[10px] font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-0.5 flex items-center gap-1"
                      style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Clock size={12} className="text-[#33C4F0]" /> {bk.date}
                    </span>
                  </div>
                </div>
              )}

              {/* Activity Details: Title & Time BELOW the image */}
              <div className="pt-0.5 space-y-0.5">
                <h4
                  className="text-[16px] font-semibold text-[#0F172B] leading-[22px] truncate"
                  style={{ fontFamily: 'Century Gothic, sans-serif' }}
                >
                  {bk.activityName}
                </h4>
                <p
                  className="text-[11px] font-medium text-[#64748B] flex items-center gap-1"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Clock size={13} className="text-[#33C4F0] shrink-0" />
                  <span>{bk.time}</span>
                </p>
              </div>

              {/* Attendee / Participant Avatars Row */}
              <div className="flex items-center justify-between pt-0.5 pb-0.5">
                <div className="flex items-center">
                  <div className="flex -space-x-2 overflow-hidden">
                    {sampleAttendees.map((att) => (
                      <img
                        key={att.id}
                        src={att.image}
                        alt={att.name}
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-2xs"
                      />
                    ))}
                  </div>
                  <span
                    className="ml-2 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5"
                    style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
                  >
                    +{bk.seats + 2} going
                  </span>
                </div>
              </div>

              {/* Bottom Card Footer: Location */}
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 pt-1">
                <span className="flex items-center gap-1 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <MapPin size={13} className="text-[#33C4F0] shrink-0" />
                  <span className="truncate">{bk.location}</span>
                </span>
              </div>

              {/* Expandable Section / Action Panel */}
              {isExpanded && (
                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  {bk.qrCode && (
                    <div
                      className="bg-[#E8F9FF] border border-[#33C4F0]/30 p-2.5 flex items-center justify-between text-[11px] text-[#147C9E]"
                      style={{ borderRadius: '16px 16px 36px 16px' }}
                    >
                      <span className="flex items-center gap-1.5 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <QrCode size={15} className="text-[#33C4F0]" /> Pass Code:
                      </span>
                      <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#A2F4FD] text-[10px]">
                        {bk.qrCode}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-0.5">
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
              )}

              {!isExpanded && (
                <button
                  type="button"
                  onClick={() => setSelectedQrPass(bk)}
                  className="w-full h-[36px] bg-[#33C4F0] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition hover:opacity-90 shadow-xs mt-1"
                  style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                >
                  <QrCode size={15} />
                  Show Mobile Pass
                </button>
              )}
            </div>
          );
        })}

        {/* Empty State / Zero Results View (Teardrop Card Shape) */}
        {filteredBookings.length === 0 && (
          <div
            className="bg-white p-8 text-center space-y-3.5 my-2 border border-slate-100 shadow-2xs"
            style={{ borderRadius: '28px 28px 84px 28px' }}
          >
            <div className="w-14 h-14 rounded-full bg-[#E8F9FF] border border-[#A2F4FD] flex items-center justify-center text-[#1AB0DC] mx-auto shadow-xs">
              <CalendarBlank size={28} />
            </div>
            <div>
              <h4
                className="text-base font-semibold text-[#1A1A28]"
                style={{ fontFamily: 'Century Gothic, sans-serif' }}
              >
                {searchQuery || selectedDateNum ? 'No Matching Sessions' : 'No Active Bookings'}
              </h4>
              <p
                className="text-xs text-[#6A7282] max-w-xs mx-auto mt-1 leading-relaxed"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {searchQuery || selectedDateNum
                  ? `No bookings found for your selected date or search term. Try resetting your filter.`
                  : 'Discover upcoming creative sessions, workshops, and wellness experiences to book your first pass.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedDateNum(null);
                setSearchQuery('');
                setActiveTab('discover');
              }}
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
  );
}
