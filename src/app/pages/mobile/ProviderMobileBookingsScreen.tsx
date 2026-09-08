import React, { useState } from 'react';
import {
  QrCode,
  CalendarBlank,
  CalendarDots,
  CaretLeft,
  CaretRight,
  CaretDown,
  CaretUp,
  Users,
  Building,
  ListNumbers,
  X,
  MagnifyingGlass,
  SlidersHorizontal,
  Clock,
  MapPin,
  CheckCircle,
  ChatCircleDots,
} from '@phosphor-icons/react';

interface ProviderMobileBookingsScreenProps {
  onOpenQRScanner: () => void;
  onSelectBooking: (booking: any) => void;
  bookings: any[];
}

export function ProviderMobileBookingsScreen({
  onOpenQRScanner,
  onSelectBooking,
  bookings,
}: ProviderMobileBookingsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'needs-response' | 'confirmed'>('all');
  const [selectedDateNum, setSelectedDateNum] = useState<number | null>(null);
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(2); // Default August 2026
  const [isFullCalendarOpen, setIsFullCalendarOpen] = useState(false);
  const [selectedRosterBooking, setSelectedRosterBooking] = useState<any | null>(null);

  // Sample attendee avatars matching Client Mobile Bookings styling
  const sampleAttendees = [
    { id: 'att-1', name: 'Alex R.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { id: 'att-2', name: 'Sarah C.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
    { id: 'att-3', name: 'Marcus V.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
  ];

  // Calendar dates structure broken into weekly strips across months
  const weeksList = [
    // August 2026
    [
      { day: 'Mon', date: 3, month: 'August', year: 2026, hasBooking: false },
      { day: 'Tue', date: 4, month: 'August', year: 2026, hasBooking: false },
      { day: 'Wed', date: 5, month: 'August', year: 2026, hasBooking: false },
      { day: 'Thu', date: 6, month: 'August', year: 2026, hasBooking: false },
      { day: 'Fri', date: 7, month: 'August', year: 2026, hasBooking: false },
      { day: 'Sat', date: 8, month: 'August', year: 2026, hasBooking: true },
      { day: 'Sun', date: 9, month: 'August', year: 2026, hasBooking: false },
    ],
    [
      { day: 'Mon', date: 10, month: 'August', year: 2026, hasBooking: false },
      { day: 'Tue', date: 11, month: 'August', year: 2026, hasBooking: false },
      { day: 'Wed', date: 12, month: 'August', year: 2026, hasBooking: false },
      { day: 'Thu', date: 13, month: 'August', year: 2026, hasBooking: true },
      { day: 'Fri', date: 14, month: 'August', year: 2026, hasBooking: false },
      { day: 'Sat', date: 15, month: 'August', year: 2026, hasBooking: false },
      { day: 'Sun', date: 16, month: 'August', year: 2026, hasBooking: true },
    ],
    // Mid August
    [
      { day: 'Mon', date: 17, month: 'August', year: 2026, hasBooking: false },
      { day: 'Tue', date: 18, month: 'August', year: 2026, hasBooking: false },
      { day: 'Wed', date: 19, month: 'August', year: 2026, hasBooking: false },
      { day: 'Thu', date: 20, month: 'August', year: 2026, hasBooking: false },
      { day: 'Fri', date: 21, month: 'August', year: 2026, hasBooking: true },
      { day: 'Sat', date: 22, month: 'August', year: 2026, hasBooking: false },
      { day: 'Sun', date: 23, month: 'August', year: 2026, hasBooking: false },
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
  ];

  const currentWeek = weeksList[currentWeekIndex] || weeksList[1];

  const handlePrevMonth = () => {
    if (currentWeekIndex > 0) setCurrentWeekIndex((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (currentWeekIndex < weeksList.length - 1) setCurrentWeekIndex((prev) => prev + 1);
  };

  const filteredBookings = bookings.filter((b) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      b.session?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.group?.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    let matchesStatus = true;
    if (selectedCategoryTab === 'needs-response') matchesStatus = b.status === 'Needs response';
    if (selectedCategoryTab === 'confirmed') matchesStatus = b.status === 'Confirmed';

    // Date filter
    let matchesDate = true;
    if (selectedDateNum !== null) {
      matchesDate = b.date?.includes(`${selectedDateNum}`);
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const toggleExpand = (id: string) => {
    setExpandedBookingId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex-1 h-full overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* TOP HEADER BLOCK */}
      <div
        className="w-full px-4 pt-5 pb-4 space-y-3 border-b border-slate-100/80"
        style={{
          background: 'linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 60%, #FFFFFF 100%)',
        }}
      >
        {/* Header Row: Active Count Badge, Title, and Teardrop Calendar Button */}
        <div className="flex items-start justify-between">
          <div>
            {/* Active Bookings Badge */}
            <div className="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full w-fit mb-2">
              <span
                className="text-[10px] font-semibold text-[#007595] leading-[15px]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {bookings.length} {bookings.length === 1 ? 'Booking Request' : 'Booking Requests'}
              </span>
            </div>

            {/* Bookings Heading */}
            <h2
              className="text-[18px] font-semibold text-[#1A1A28] leading-tight"
              style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
            >
              Team Bookings & Requests
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Calendar Icon Teardrop Button */}
            <button
              type="button"
              onClick={() => setIsFullCalendarOpen(!isFullCalendarOpen)}
              className={`w-[44px] h-[40px] border flex items-center justify-center transition shrink-0 cursor-pointer ${
                isFullCalendarOpen
                  ? 'bg-[#007595] border-[#007595] text-white shadow-xs'
                  : 'bg-[#F8FDFF] border-[#33C4F0] text-[#147C9E] hover:bg-[#E8F9FF]'
              }`}
              style={{ borderRadius: '20px 20px 48px 20px' }}
              title={isFullCalendarOpen ? 'Hide Booking Dates' : 'View Booking Dates'}
            >
              <CalendarDots size={18} weight={isFullCalendarOpen ? 'fill' : 'regular'} />
            </button>

            {/* QR Scanner Shortcut Button */}
            <button
              type="button"
              onClick={onOpenQRScanner}
              className="h-[40px] px-3 bg-[#1AB0DC] hover:bg-[#007595] text-white text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
              style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
            >
              <QrCode size={16} weight="bold" />
              <span className="hidden sm:inline">Scan Pass</span>
            </button>
          </div>
        </div>

        {/* Month Navigator Row (Teardrop Radius) */}
        <div
          className="bg-[#F8FAFC] px-3 py-2 flex items-center justify-between border border-[#E2E8F0]/60 h-[44px]"
          style={{ borderRadius: '16px 16px 36px 16px' }}
        >
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={currentWeekIndex === 0}
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
            disabled={currentWeekIndex === weeksList.length - 1}
            className="w-7 h-7 flex items-center justify-center text-[#45556C] hover:text-slate-900 disabled:opacity-30 transition cursor-pointer"
            title="Next Month"
          >
            <CaretRight size={14} weight="bold" />
          </button>
        </div>

        {/* CALENDAR DISPLAY: INLINE FULL MONTH GRID OR HORIZONTAL WEEK STRIP */}
        {isFullCalendarOpen ? (
          /* INLINE FULL MONTH CALENDAR VIEW (Borderless with Scheduled Dot) */
          <div className="bg-white/90 p-3.5 border border-slate-100/80 space-y-2.5 rounded-2xl animate-in fade-in duration-200 shadow-2xs">
            <div className="grid grid-cols-7 gap-1 text-center">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
                <span
                  key={d}
                  className="text-[9px] font-semibold text-[#64748B]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {d}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
                const isSelected = selectedDateNum === dayNum;
                const hasBookingOnDate = weeksList.some((w) =>
                  w.some(
                    (item) =>
                      item.month === currentWeek[0].month &&
                      item.date === dayNum &&
                      item.hasBooking
                  )
                );

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => setSelectedDateNum(isSelected ? null : dayNum)}
                    className={`h-10 flex flex-col items-center justify-center text-[13px] font-bold transition relative cursor-pointer border-0 ${
                      isSelected
                        ? 'bg-[#1AB0DC] text-white shadow-xs'
                        : hasBookingOnDate
                        ? 'bg-[#ECFEFF] text-[#007595] hover:bg-[#E0F2FE]'
                        : 'bg-transparent text-[#1A1A28] hover:bg-slate-100'
                    }`}
                    style={{ borderRadius: '14px 14px 28px 14px', fontFamily: 'Century Gothic, sans-serif' }}
                  >
                    <span>{dayNum}</span>
                    {hasBookingOnDate && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                          isSelected ? 'bg-white' : 'bg-[#EF4444]'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
              {selectedDateNum !== null ? (
                <button
                  type="button"
                  onClick={() => setSelectedDateNum(null)}
                  className="text-[#007595] font-semibold hover:underline cursor-pointer"
                >
                  Clear Filter ({currentWeek[0].month} {selectedDateNum})
                </button>
              ) : (
                <span className="text-[10px] text-slate-400">Tap a date to filter bookings</span>
              )}
              <button
                type="button"
                onClick={() => setIsFullCalendarOpen(false)}
                className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition cursor-pointer"
              >
                Collapse
              </button>
            </div>
          </div>
        ) : (
          /* HORIZONTAL WEEKLY STRIP */
          <div className="flex items-center gap-1.5 justify-between pt-0.5">
            <button
              type="button"
              onClick={() => setCurrentWeekIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentWeekIndex === 0}
              className="w-4 h-7 p-0 bg-transparent border-0 flex items-center justify-center text-[#45556C] hover:text-[#0F172B] disabled:opacity-30 transition shrink-0 cursor-pointer"
              title="Previous Week"
            >
              <CaretLeft size={16} weight="bold" />
            </button>

            <div className="flex items-center gap-1 overflow-x-auto py-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1 justify-between">
              {currentWeek.slice(0, 7).map((item) => {
                const isSelected = selectedDateNum === item.date;
                const hasBooking = item.hasBooking;
                return (
                  <button
                    key={`${item.month}-${item.date}`}
                    type="button"
                    onClick={() => setSelectedDateNum(isSelected ? null : item.date)}
                    className={`flex flex-col items-center justify-center flex-1 min-w-[42px] max-w-[52px] h-[58px] pt-[6px] pb-[8px] transition relative shrink-0 cursor-pointer border-0 ${
                      isSelected
                        ? 'bg-[#1AB0DC] text-white shadow-xs'
                        : 'bg-white hover:bg-slate-50'
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
                    {hasBooking && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                          isSelected ? 'bg-white' : 'bg-[#EF4444]'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setCurrentWeekIndex((prev) => Math.min(weeksList.length - 1, prev + 1))}
              disabled={currentWeekIndex === weeksList.length - 1}
              className="w-4 h-7 p-0 bg-transparent border-0 flex items-center justify-center text-[#45556C] hover:text-[#0F172B] disabled:opacity-30 transition shrink-0 cursor-pointer"
              title="Next Week"
            >
              <CaretRight size={16} weight="bold" />
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
            placeholder="Search bookings, companies, guests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-transparent text-[12px] font-medium text-slate-900 placeholder:text-[#90A1B9] focus:outline-none"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#90A1B9] hover:text-slate-700 transition p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pt-1 pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { id: 'all', label: 'All Bookings', count: bookings.length },
            { id: 'needs-response', label: 'Needs Response', count: bookings.filter((b) => b.status === 'Needs response').length },
            { id: 'confirmed', label: 'Confirmed Bookings', count: bookings.filter((b) => b.status === 'Confirmed').length },
          ].map((tab) => {
            const isActive = selectedCategoryTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategoryTab(tab.id as any)}
                style={{ borderRadius: '20px 20px 48px 20px' }}
                className={`h-[30.5px] px-3.5 text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#1AB0DC] text-white shadow-xs'
                    : 'bg-white text-[#45556C] border border-[#E2E8F0] hover:border-slate-300'
                }`}
              >
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {tab.label} ({tab.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOOKINGS CONTENT LIST */}
      <div className="p-2.5 space-y-2.5 relative z-10 pb-6">
        {filteredBookings.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-medium text-xs">
            No team bookings match the selected date or filter.
          </div>
        ) : (
          filteredBookings.map((bk) => {
            const isExpanded = expandedBookingId === (bk.id || bk.session);
            const isConfirmed = bk.status === 'Confirmed';

            return (
              <div
                key={bk.id || bk.session}
                onClick={() => toggleExpand(bk.id || bk.session)}
                className="bg-white border border-[#E2E8F0] p-4 shadow-2xs hover:border-[#1AB0DC] transition cursor-pointer space-y-3 group"
                style={{ borderRadius: '20px 20px 48px 20px' }}
              >
                {/* Main Card Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Emoji Category Avatar */}
                    <div
                      className="w-[46px] h-[46px] rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-2xs"
                      style={{
                        borderRadius: '14px 14px 32px 14px',
                        background: `${bk.color || '#1AB0DC'}18`,
                      }}
                    >
                      {bk.emoji || '🎨'}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: bk.color || '#007595' }}
                      >
                        {bk.date}
                      </p>
                      <h3
                        className="text-[15px] font-bold text-[#1A1A28] leading-tight mt-0.5 truncate"
                        style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
                      >
                        {bk.session}
                      </h3>
                      <p className="text-[11px] text-[#6A7282] font-medium flex items-center gap-1.5 mt-0.5">
                        <Building size={13} className="text-[#1AB0DC]" />
                        <span>{bk.company} · {bk.group}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isConfirmed
                          ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]'
                          : 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]'
                      }`}
                    >
                      {bk.status}
                    </span>
                    <button
                      type="button"
                      className="text-slate-400 group-hover:text-slate-700 transition p-1"
                    >
                      {isExpanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* EXPANDABLE DETAILS BOX */}
                {isExpanded && (
                  <div className="bg-[#F8FAFC] p-3.5 border border-[#E2E8F0]/80 rounded-2xl space-y-3 animate-in fade-in duration-150">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 text-[#45556C]">
                        <Clock size={15} className="text-[#1AB0DC]" />
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">BOOKING TIME SLOT</p>
                          <p className="font-bold text-[#1A1A28] text-[11px]">3:00 PM – 4:30 PM</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[#45556C]">
                        <MapPin size={15} className="text-[#1AB0DC]" />
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">SESSION LOCATION</p>
                          <p className="font-bold text-[#1A1A28] text-[11px]">Studio Lumen HQ</p>
                        </div>
                      </div>
                    </div>

                    {/* Attendee Avatar Cluster */}
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2 overflow-hidden">
                          {sampleAttendees.map((att) => (
                            <img
                              key={att.id}
                              src={att.image}
                              alt={att.name}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-semibold text-[#6A7282]">
                          + {bk.group || '12 guests'}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                        Est. Payout: $675.00
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom Action Controls */}
                <div
                  className="flex items-center gap-2 pt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {!isConfirmed ? (
                    <button
                      type="button"
                      onClick={() => onSelectBooking(bk)}
                      className="flex-1 py-2 bg-[#EF4444] hover:bg-rose-600 text-white text-[11px] font-semibold transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                      style={{ borderRadius: '14px 14px 28px 14px', fontFamily: 'Poppins, sans-serif' }}
                    >
                      Review Request
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedRosterBooking(bk)}
                      className="flex-1 py-2 bg-[#F8FAFC] hover:bg-[#E8F9FF] hover:text-[#007595] text-slate-700 text-[11px] font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer border border-[#E2E8F0]"
                      style={{ borderRadius: '14px 14px 28px 14px', fontFamily: 'Poppins, sans-serif' }}
                    >
                      <ListNumbers size={14} />
                      <span>View Guest Roster</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onOpenQRScanner}
                    className="px-3.5 py-2 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-[11px] font-semibold transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                    style={{ borderRadius: '14px 14px 28px 14px' }}
                    title="Scan Pass"
                  >
                    <QrCode size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ROSTER MODAL DRAWER */}
      {selectedRosterBooking && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
          <div
            className="w-full max-w-md bg-white p-5 shadow-2xl relative animate-in slide-in-from-bottom duration-250 max-h-[85vh] flex flex-col"
            style={{ borderRadius: '24px 24px 0 0' }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#007595]">
                  Attendee Roster
                </p>
                <h3 className="text-sm font-bold text-[#1A1A28]">
                  {selectedRosterBooking.company} ({selectedRosterBooking.group})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRosterBooking(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X size={15} weight="bold" />
              </button>
            </div>

            <div className="mt-3 space-y-2 overflow-y-auto pr-1 flex-1">
              {[
                { name: 'Alex Rivera (Team Lead)', role: 'Creative Director', status: 'Checked In' },
                { name: 'Sarah Chen', role: 'UX Designer', status: 'Confirmed' },
                { name: 'Marcus Vance', role: 'Frontend Engineer', status: 'Confirmed' },
                { name: 'Elena Rostova', role: 'Brand Strategist', status: 'Checked In' },
                { name: 'Derrick Wu', role: 'Product Manager', status: 'Confirmed' },
              ].map((guest) => (
                <div
                  key={guest.name}
                  className="bg-slate-50 p-2.5 border border-slate-100 flex items-center justify-between text-xs"
                  style={{ borderRadius: '12px 12px 24px 12px' }}
                >
                  <div>
                    <p className="font-semibold text-[#1A1A28]">{guest.name}</p>
                    <p className="text-[10px] text-slate-400">{guest.role}</p>
                  </div>
                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                      guest.status === 'Checked In'
                        ? 'bg-[#ECFDF5] text-[#047857]'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {guest.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
