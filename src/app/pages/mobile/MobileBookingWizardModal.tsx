import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CaretLeft,
  CaretRight,
  Check,
  Clock,
  CalendarBlank,
  Users,
  Sparkle,
  X,
  Plus,
  UserPlus,
  Trash,
  ShieldCheck,
  Info,
  CalendarCheck,
  Envelope,
  Receipt,
  Ticket,
} from '@phosphor-icons/react';

interface MobileBookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  provider: string;
  vendorId?: string;
  symbol?: string;
  image?: string;
  color?: string;
  onCompleteBooking: (bookingData: any) => void;
}

export function MobileBookingWizardModal({
  isOpen,
  onClose,
  title,
  provider,
  symbol = '🎨',
  image = '',
  color = '#33C4F0',
  onCompleteBooking,
}: MobileBookingWizardModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // STEP 1: DATE RANGE & CALENDAR SELECTION
  const [selectionType, setSelectionType] = useState<'single' | 'range'>('single');
  const [selectedStartDate, setSelectedStartDate] = useState<number>(8); // Aug 8
  const [selectedEndDate, setSelectedEndDate] = useState<number>(10); // Aug 10
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('02:00 PM - 03:30 PM');

  // Simulated calendar days for August 2026
  const occupiedDates = [5, 12, 15, 19, 22, 26]; // Occupied / Fully Booked dates

  // STEP 2: TEAM RANGE & CAPACITY SELECTION
  const [teamRangePreset, setTeamRangePreset] = useState<'small' | 'medium' | 'large' | 'custom'>('small');
  const [seatsCount, setSeatsCount] = useState<number>(5);

  // STEP 3: BULK INVITES & ROSTER MANAGEMENT
  const [bulkEmailText, setBulkEmailText] = useState<string>('');
  const [invitedEmails, setInvitedEmails] = useState<string[]>([
    'sarah.j@company.com',
    'david.k@company.com',
    'elena.r@company.com',
  ]);
  const [singleEmailInput, setSingleEmailInput] = useState<string>('');

  if (!isOpen) return null;

  const monthName = 'August';
  const year = 2026;

  const handleDateClick = (dayNum: number) => {
    if (occupiedDates.includes(dayNum)) return; // Unselectable if occupied

    if (selectionType === 'single') {
      setSelectedStartDate(dayNum);
      setSelectedEndDate(dayNum);
    } else {
      if (dayNum < selectedStartDate) {
        setSelectedStartDate(dayNum);
      } else {
        setSelectedEndDate(dayNum);
      }
    }
  };

  const isDateSelected = (dayNum: number) => {
    if (selectionType === 'single') return selectedStartDate === dayNum;
    return dayNum >= selectedStartDate && dayNum <= selectedEndDate;
  };

  const handlePresetSelect = (preset: 'small' | 'medium' | 'large') => {
    setTeamRangePreset(preset);
    if (preset === 'small') setSeatsCount(5);
    if (preset === 'medium') setSeatsCount(10);
    if (preset === 'large') setSeatsCount(20);
  };

  const handleParseBulkEmails = () => {
    if (!bulkEmailText.trim()) return;
    const extracted = bulkEmailText
      .split(/[\n,;]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.includes('@') && !invitedEmails.includes(e));

    if (extracted.length > 0) {
      setInvitedEmails([...invitedEmails, ...extracted]);
      setBulkEmailText('');
    }
  };

  const handleAddSingleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = singleEmailInput.trim().toLowerCase();
    if (clean && clean.includes('@') && !invitedEmails.includes(clean)) {
      setInvitedEmails([...invitedEmails, clean]);
      setSingleEmailInput('');
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setInvitedEmails(invitedEmails.filter((e) => e !== emailToRemove));
  };

  const formattedDateString =
    selectedStartDate === selectedEndDate
      ? `${monthName} ${selectedStartDate}, ${year}`
      : `${monthName} ${selectedStartDate} – ${selectedEndDate}, ${year}`;

  const handleFinalConfirm = () => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      activityName: title,
      vendorName: provider,
      date: formattedDateString,
      time: selectedTimeSlot,
      location: 'Creative Hub • Studio Studio 4B',
      status: 'Confirmed',
      seats: seatsCount,
      color: color,
      symbol: symbol,
      qrCode: `CS-PASS-${Date.now()}`,
      image: image,
      invitedEmails: invitedEmails,
    };

    onCompleteBooking(newBooking);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* Top Sticky Screen Header */}
        <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
          <button
            type="button"
            onClick={step > 1 ? () => setStep((s) => (s - 1) as any) : onClose}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition cursor-pointer"
          >
            <CaretLeft size={16} weight="bold" /> {step > 1 ? 'Back' : 'Cancel'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#147C9E] bg-[#E8F9FF] px-2.5 py-1 rounded-full">
              Step {step} of 4
            </span>
            <span className="text-xs font-bold text-slate-500">
              {step === 1 && 'Date & Time'}
              {step === 2 && 'Team Range'}
              {step === 3 && 'Bulk Invites'}
              {step === 4 && 'Review Summary'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

          {/* Progress Indicator Line */}
          <div className="w-full bg-slate-100 h-1">
            <div
              className="bg-[#33C4F0] h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Step Body Content */}
          <div className="p-4 space-y-4 flex-1">
            {/* STEP 1: DATE RANGE & CALENDAR SELECTION */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">
                    Select Availability
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    Pick Date Range & Time Slot
                  </h3>
                  <p className="text-xs text-slate-500">
                    Occupied dates are highlighted in red and unavailable for booking.
                  </p>
                </div>

                {/* Single vs Range Toggle */}
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setSelectionType('single')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                      selectionType === 'single'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Single Date
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectionType('range')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                      selectionType === 'range'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Date Range Selection
                  </button>
                </div>

                {/* Interactive Calendar Month Grid */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">
                      {monthName} {year}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-bold">
                      <span className="flex items-center gap-1 text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Available
                      </span>
                      <span className="flex items-center gap-1 text-rose-500">
                        <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Occupied
                      </span>
                    </div>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-extrabold text-slate-400">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                    <span>S</span>
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
                      const isOccupied = occupiedDates.includes(dayNum);
                      const isSelected = isDateSelected(dayNum);

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => handleDateClick(dayNum)}
                          className={`h-8 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition relative ${
                            isOccupied
                              ? 'bg-rose-50 text-rose-300 border border-rose-100 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#33C4F0] text-white shadow-xs'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-100'
                          }`}
                        >
                          <span>{dayNum}</span>
                          {isOccupied && (
                            <span className="w-1 h-1 rounded-full bg-rose-400 absolute bottom-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Date Range Preview */}
                <div className="bg-[#E8F9FF] p-3 rounded-2xl border border-[#33C4F0]/30 flex items-center justify-between text-xs text-[#147C9E]">
                  <span className="font-bold">Selected Dates:</span>
                  <span className="font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-full border border-[#A2F4FD]">
                    {formattedDateString}
                  </span>
                </div>

                {/* Time Slot Picker */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { slot: '09:30 AM - 11:00 AM', label: 'Morning Session' },
                      { slot: '02:00 PM - 03:30 PM', label: 'Afternoon Session' },
                      { slot: '04:30 PM - 06:00 PM', label: 'Evening Sunset Flow' },
                    ].map((t) => (
                      <button
                        key={t.slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(t.slot)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition ${
                          selectedTimeSlot === t.slot
                            ? 'border-[#33C4F0] bg-white ring-2 ring-[#33C4F0]/30 text-slate-900 font-extrabold'
                            : 'border-slate-200 bg-slate-50 text-slate-600 font-medium hover:bg-white'
                        }`}
                      >
                        <div>
                          <p className="font-extrabold">{t.slot}</p>
                          <p className="text-[10px] text-slate-400">{t.label}</p>
                        </div>
                        <span className="text-[10px] font-extrabold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                          Open
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: TEAM RANGE & CAPACITY SELECTION */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">
                    Seat Allocation
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    Pick Team Range & Capacity
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select your team size range to calculate pass credits required.
                  </p>
                </div>

                {/* Preset Team Ranges Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'small', label: 'Small Team', range: '2 – 5 seats', count: 5 },
                    { id: 'medium', label: 'Medium Team', range: '6 – 10 seats', count: 10 },
                    { id: 'large', label: 'Large Team', range: '11 – 20 seats', count: 20 },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePresetSelect(p.id as any)}
                      className={`p-3 rounded-2xl border text-center transition ${
                        teamRangePreset === p.id
                          ? 'border-[#33C4F0] bg-[#E8F9FF] text-[#147C9E] font-extrabold shadow-2xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <p className="text-xs font-extrabold">{p.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{p.range}</p>
                    </button>
                  ))}
                </div>

                {/* Seat Counter Stepper */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">Exact Allocated Seats:</span>
                    <div className="flex items-center gap-3 bg-white p-1 rounded-2xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setSeatsCount(Math.max(1, seatsCount - 1))}
                        className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span className="text-base font-black text-slate-900 w-6 text-center">
                        {seatsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSeatsCount(Math.min(25, seatsCount + 1))}
                        className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pass Credit Calculation Card */}
                <div
                  className="bg-[#1A1A28] p-4 text-white space-y-2.5 shadow-md"
                  style={{ borderRadius: '20px 20px 40px 20px' }}
                >
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="text-[#33C4F0] flex items-center gap-1">
                      <Sparkle size={15} weight="fill" /> Pass Credits Required
                    </span>
                    <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {seatsCount} Pass Credits
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-white/50 block">Your Account Entitlement</span>
                      <span className="font-extrabold text-emerald-400">12 Active Credits</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block">Balance After Booking</span>
                      <span className="font-extrabold text-white">{12 - seatsCount} Credits</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: BULK INVITES & ROSTER MANAGEMENT */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">
                    Roster Allocation
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    Manage Bulk Invites
                  </h3>
                  <p className="text-xs text-slate-500">
                    Paste multiple colleague emails at once to assign your {seatsCount} allocated slots.
                  </p>
                </div>

                {/* Slot Allocation Counter */}
                <div className="bg-[#E8F9FF] p-3 rounded-2xl border border-[#33C4F0]/40 flex items-center justify-between text-xs text-[#147C9E]">
                  <span className="font-extrabold">Assigned Slots:</span>
                  <span className="font-extrabold text-slate-900 bg-white px-3 py-1 rounded-full border border-[#A2F4FD]">
                    {invitedEmails.length} of {seatsCount} Seats Assigned
                  </span>
                </div>

                {/* Bulk Email Paste Box */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Paste Bulk Emails (comma or line separated)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. alex@acme.com, marcus@acme.co, chris@acme.co"
                    value={bulkEmailText}
                    onChange={(e) => setBulkEmailText(e.target.value)}
                    className="w-full p-3 bg-slate-50 rounded-2xl text-xs text-slate-900 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#33C4F0]"
                  />
                  <button
                    type="button"
                    disabled={!bulkEmailText.trim()}
                    onClick={handleParseBulkEmails}
                    className="w-full py-2 bg-[#1A1A28] text-white text-xs font-extrabold rounded-xl hover:bg-[#33C4F0] hover:text-[#1A1A28] transition disabled:opacity-40"
                  >
                    + Add Bulk Emails to Roster
                  </button>
                </div>

                {/* Single Add Email Form */}
                <form onSubmit={handleAddSingleEmail} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Add single colleague email..."
                    value={singleEmailInput}
                    onChange={(e) => setSingleEmailInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-slate-50 rounded-xl text-xs text-slate-900 border border-slate-200 focus:outline-none focus:bg-white"
                  />
                  <button
                    type="submit"
                    disabled={!singleEmailInput.trim()}
                    className="px-4 py-2 bg-[#33C4F0] text-white text-xs font-extrabold rounded-xl hover:bg-[#1AB0DC] disabled:opacity-40"
                  >
                    Add
                  </button>
                </form>

                {/* Invited Emails Roster Chips */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Invited Colleagues ({invitedEmails.length})
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-100">
                    {invitedEmails.map((email) => (
                      <span
                        key={email}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-800 border border-slate-200 shadow-2xs"
                      >
                        <Envelope size={12} className="text-[#33C4F0]" />
                        <span>{email}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEmail(email)}
                          className="text-slate-400 hover:text-rose-500 ml-1"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {invitedEmails.length === 0 && (
                      <p className="text-xs text-slate-400 py-2 text-center w-full">
                        No emails added yet. Paste emails above or send invites later.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW SUMMARY & CONFIRMATION */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">
                    Final Review
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    Review Booking Summary
                  </h3>
                  <p className="text-xs text-slate-500">
                    Confirm your details to instantly reserve your team session.
                  </p>
                </div>

                {/* Summary Card */}
                <div
                  className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3"
                  style={{ borderRadius: '20px 20px 48px 20px' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 bg-white rounded-2xl shadow-2xs">{symbol}</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{title}</h4>
                      <p className="text-xs font-bold text-[#33C4F0]">{provider}</p>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-200/60 text-xs font-semibold text-slate-700">
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-400">Date Range</span>
                      <span className="font-extrabold text-slate-900">{formattedDateString}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-400">Time Slot</span>
                      <span className="font-extrabold text-slate-900">{selectedTimeSlot}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-400">Allocated Seats</span>
                      <span className="font-extrabold text-slate-900">{seatsCount} Pass Seats</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-400">Bulk Invites</span>
                      <span className="font-extrabold text-[#10B981]">{invitedEmails.length} Emails Sent</span>
                    </div>
                  </div>
                </div>

                {/* Instant Redemption Notice */}
                <div className="bg-[#ECFDF5] p-3 rounded-2xl border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
                  <Check size={18} className="text-emerald-600 shrink-0" weight="bold" />
                  <span>Instant confirmation with your CreativeSelf corporate pass.</span>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-extrabold text-slate-700 transition flex items-center gap-1 cursor-pointer"
              >
                <CaretLeft size={14} weight="bold" /> Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-extrabold text-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as any)}
                className="px-6 py-2.5 rounded-full bg-[#33C4F0] hover:bg-[#1AB0DC] text-white text-xs font-extrabold shadow-md transition flex items-center gap-1 cursor-pointer ml-auto"
              >
                Next <CaretRight size={14} weight="bold" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalConfirm}
                className="px-6 py-2.5 rounded-full bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold shadow-md transition flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <Sparkle size={15} weight="fill" className="text-amber-400" /> Confirm & Complete Booking
              </button>
            )}
          </div>
        </motion.div>
    </AnimatePresence>
  );
}
