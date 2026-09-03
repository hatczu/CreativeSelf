import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CaretLeft,
  BookmarkSimple,
  Star,
  ShieldCheck,
  Clock,
  MapPin,
  Check,
  Sparkle,
  Eye,
  CheckCircle,
  CalendarBlank,
  Users,
  QrCode,
  Plus,
  X,
  CalendarPlus,
} from '@phosphor-icons/react';
import { Activity, mockVendors } from '@/app/data/subscriptionData';
import { useSubscription } from '@/app/context/SubscriptionContext';

interface MobileActivityDetailViewProps {
  selectedActivity: Activity | null;
  setSelectedActivity: (act: Activity | null) => void;
  savedActivityIds: string[];
  toggleSaveActivity: (id: string) => void;
  bookingSelectedSlot: string;
  setBookingSelectedSlot: (slot: string) => void;
  handleConfirmBooking: (act: Activity) => void;
}

export function MobileActivityDetailView({
  selectedActivity,
  setSelectedActivity,
  savedActivityIds,
  toggleSaveActivity,
  bookingSelectedSlot,
  setBookingSelectedSlot,
  handleConfirmBooking,
}: MobileActivityDetailViewProps) {
  const { planName, selectedBrand, selectBrand } = useSubscription();

  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number | null>(0);
  const [customDate, setCustomDate] = useState<string | null>(null);
  const [showCustomDatePicker, setShowCustomDatePicker] = useState<boolean>(false);
  const [selectedCustomDay, setSelectedCustomDay] = useState<number>(14);
  const [selectedCustomTime, setSelectedCustomTime] = useState<string>('02:00 PM - 03:30 PM');
  const [seatsCount, setSeatsCount] = useState<number>(1);
  const [isBookedSuccess, setIsBookedSuccess] = useState<boolean>(false);

  if (!selectedActivity) return null;

  const isSubscribedToBrand = selectedBrand?.id === selectedActivity.vendorId;

  const handleSimpleBooking = () => {
    if (!isSubscribedToBrand) {
      const vendor = mockVendors.find((v) => v.id === selectedActivity.vendorId);
      if (vendor) {
        selectBrand({
          id: vendor.id,
          name: vendor.name,
          rating: vendor.rating,
          specialty: vendor.specialty,
          color: vendor.color,
          avatar: vendor.avatar,
        });
      }
    }
    handleConfirmBooking(selectedActivity);
    setIsBookedSuccess(true);
  };

  const handleSelectCustomDate = () => {
    const formatted = `Aug ${selectedCustomDay}, 2026 • ${selectedCustomTime}`;
    setCustomDate(formatted);
    setSelectedSlotIdx(null);
    setShowCustomDatePicker(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* Sticky Header Navigation */}
        <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
          <button
            type="button"
            onClick={() => setSelectedActivity(null)}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition cursor-pointer"
          >
            <CaretLeft size={16} weight="bold" /> Back to Discover
          </button>

          <button
            type="button"
            onClick={() => toggleSaveActivity(selectedActivity.id)}
            className={`p-2 rounded-full border transition cursor-pointer ${
              savedActivityIds.includes(selectedActivity.id)
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookmarkSimple size={16} weight={savedActivityIds.includes(selectedActivity.id) ? 'fill' : 'regular'} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="pb-28 flex-1 divide-y divide-slate-100">
          {/* Preview Mode Notice */}
          {!isSubscribedToBrand && (
            <div className="bg-[#E8F9FF] border-b border-[#33C4F0]/30 px-4 py-2.5 flex items-center justify-between text-xs text-[#147C9E] font-semibold">
              <span className="flex items-center gap-2">
                <Eye size={16} className="text-[#33C4F0] shrink-0" />
                Preview Mode — Subscribe to {selectedActivity.vendorName} to redeem.
              </span>
            </div>
          )}

          {/* Hero Section */}
          <div className="p-4 space-y-3">
            <div
              className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 shadow-2xs"
              style={{ borderRadius: '20px 20px 48px 20px' }}
            >
              <img src={selectedActivity.image} alt={selectedActivity.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#1A1A28] text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <span>{selectedActivity.symbol}</span> {selectedActivity.category}
              </div>

              <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <Star size={13} weight="fill" /> {selectedActivity.rating}
              </div>
            </div>

            <div className="pt-1 space-y-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-extrabold text-[#33C4F0]">{selectedActivity.vendorName}</p>
                <ShieldCheck size={14} className="text-[#33C4F0]" weight="fill" />
              </div>
              <h1 className="text-xl font-black text-[#1A1A28] leading-snug tracking-tight">
                {selectedActivity.name}
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
              <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-2.5 border border-slate-100">
                <Clock size={18} className="text-[#33C4F0] shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">DURATION</p>
                  <p className="text-xs font-extrabold text-[#1A1A28]">{selectedActivity.duration}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-2.5 border border-slate-100">
                <MapPin size={18} className="text-[#33C4F0] shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">LOCATION</p>
                  <p className="text-xs font-extrabold text-[#1A1A28] truncate">{selectedActivity.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="p-4 space-y-2">
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">
              About This Experience
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              {selectedActivity.description}
            </p>
          </div>

          {/* Session Highlights */}
          <div className="p-4 space-y-3">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E]">
              What's Included in Your Session
            </h3>
            <div className="space-y-2">
              {selectedActivity.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3 border border-slate-100"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58] mt-0.5">
                    <Check size={12} weight="bold" />
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A28] leading-tight">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STREAMLINED BOOKING SECTION WITH OTHER DATES OPTION */}
          <div className="p-4 space-y-3">
            <div
              className="bg-[#1A1A28] p-5 text-white shadow-xl relative overflow-hidden space-y-4"
              style={{ borderRadius: '20px 20px 48px 20px' }}
            >
              {isBookedSuccess ? (
                /* INSTANT SUCCESS CONFIRMATION DISPLAY */
                <div className="py-4 text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center text-2xl">
                    <CheckCircle size={32} weight="fill" />
                  </div>
                  <h3 className="text-base font-extrabold text-white">Booking Confirmed!</h3>
                  <p className="text-xs text-white/70">
                    Your seat for "{selectedActivity.name}" is confirmed for {customDate || 'your selected slot'}. View check-in ticket in My Bookings.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsBookedSuccess(false)}
                    className="px-4 py-2 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] text-xs font-extrabold rounded-full transition cursor-pointer"
                  >
                    Book Another Slot
                  </button>
                </div>
              ) : (
                /* SIMPLE SLOT PICKER + SELECT OTHER DATES */
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">
                        Reserve Session
                      </span>
                      <h3 className="text-base font-extrabold text-white mt-0.5">
                        Select Date & Schedule
                      </h3>
                    </div>
                    <span className="text-[10px] font-extrabold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full">
                      Instant Confirmation
                    </span>
                  </div>

                  {/* Standard Schedule Slots List */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-white/60 uppercase tracking-wider block">
                      Available Upcoming Dates
                    </label>
                    <div className="space-y-2">
                      {selectedActivity.schedule.map((sch, idx) => {
                        const isSelected = selectedSlotIdx === idx && !customDate;
                        return (
                          <button
                            key={sch.id}
                            type="button"
                            onClick={() => {
                              setSelectedSlotIdx(idx);
                              setCustomDate(null);
                            }}
                            className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition cursor-pointer ${
                              isSelected
                                ? 'border-[#33C4F0] bg-white/15 text-white font-extrabold ring-2 ring-[#33C4F0]'
                                : 'border-white/10 bg-white/5 text-white/80 font-medium hover:bg-white/10'
                            }`}
                          >
                            <div>
                              <p className="font-extrabold text-white">{sch.date}</p>
                              <p className="text-[10px] text-white/60">{sch.time}</p>
                            </div>
                            <span className="text-[10px] font-extrabold text-[#33C4F0] bg-[#33C4F0]/15 px-2 py-0.5 rounded-full border border-[#33C4F0]/30">
                              {sch.seatsLeft} slots left
                            </span>
                          </button>
                        );
                      })}

                      {/* Display Custom Date Slot if selected */}
                      {customDate && (
                        <div className="w-full p-3 rounded-2xl border border-[#33C4F0] bg-[#33C4F0]/20 text-white flex items-center justify-between text-xs ring-2 ring-[#33C4F0]">
                          <div>
                            <p className="font-extrabold text-white flex items-center gap-1.5">
                              <Sparkle size={14} className="text-amber-300" weight="fill" /> {customDate.split('•')[0]}
                            </p>
                            <p className="text-[10px] text-[#A2F4FD]">{customDate.split('•')[1]}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomDate(null);
                              setSelectedSlotIdx(0);
                            }}
                            className="text-xs text-white/70 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SELECT OTHER DATES BUTTON */}
                  <button
                    type="button"
                    onClick={() => setShowCustomDatePicker(true)}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-[#33C4F0] border border-[#33C4F0]/40 text-xs font-extrabold rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CalendarPlus size={16} weight="bold" />
                    Select Other Dates / Custom Calendar →
                  </button>

                  {/* Seat Quantity Stepper */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                    <span className="font-extrabold text-white/80">Number of Seats:</span>
                    <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-2xl border border-white/10">
                      <button
                        type="button"
                        onClick={() => setSeatsCount(Math.max(1, seatsCount - 1))}
                        className="w-6 h-6 rounded-lg bg-white/10 text-white font-black flex items-center justify-center hover:bg-white/20"
                      >
                        -
                      </button>
                      <span className="font-black text-white w-4 text-center">{seatsCount}</span>
                      <button
                        type="button"
                        onClick={() => setSeatsCount(Math.min(10, seatsCount + 1))}
                        className="w-6 h-6 rounded-lg bg-white/10 text-white font-black flex items-center justify-center hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <button
                    type="button"
                    onClick={handleSimpleBooking}
                    className="w-full py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] text-xs font-black rounded-full shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Sparkle size={16} weight="fill" className="text-[#1A1A28]" />
                    {isSubscribedToBrand
                      ? `Confirm & Book (${seatsCount} ${seatsCount === 1 ? 'Seat' : 'Seats'})`
                      : `Subscribe to ${selectedActivity.vendorName} & Book`}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* CUSTOM DATE SELECTION MODAL / DRAWER */}
        {showCustomDatePicker && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-xs p-5 text-left space-y-4 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setShowCustomDatePicker(false)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
                <X size={16} />
              </button>

              <div>
                <span className="text-[10px] font-extrabold text-[#33C4F0] uppercase tracking-wider">Custom Booking</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">Select Other Date</h3>
                <p className="text-xs text-slate-500">Pick any preferred date for August 2026.</p>
              </div>

              {/* Month Days Grid */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                  <span>August 2026</span>
                  <span className="text-[10px] font-bold text-[#33C4F0]">Select Day</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                    const isSelected = selectedCustomDay === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedCustomDay(d)}
                        className={`h-7 rounded-lg text-xs font-bold transition ${
                          isSelected
                            ? 'bg-[#33C4F0] text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-100'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Picker */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {['09:30 AM - 11:00 AM', '02:00 PM - 03:30 PM', '05:00 PM - 06:30 PM'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedCustomTime(t)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                        selectedCustomTime === t
                          ? 'border-[#33C4F0] bg-[#E8F9FF] text-[#147C9E]'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSelectCustomDate}
                className="w-full py-3 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] font-extrabold text-xs rounded-full shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <Check size={16} weight="bold" /> Confirm Custom Date
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
