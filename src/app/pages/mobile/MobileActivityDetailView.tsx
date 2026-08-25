import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, BookmarkSimple, Star, ShieldCheck, Clock, MapPin, Check, Sparkle, Eye } from '@phosphor-icons/react';
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

  if (!selectedActivity) return null;

  const isSubscribedToBrand = selectedBrand?.id === selectedActivity.vendorId;

  const handleBookingAction = () => {
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
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans"
      >
        {/* Sticky Header Navigation */}
        <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSelectedActivity(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition"
          >
            <CaretLeft size={16} weight="bold" /> Back
          </button>

          <button
            type="button"
            onClick={() => toggleSaveActivity(selectedActivity.id)}
            className={`p-2 rounded-full border transition ${
              savedActivityIds.includes(selectedActivity.id)
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <BookmarkSimple size={16} weight={savedActivityIds.includes(selectedActivity.id) ? 'fill' : 'regular'} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="pb-16 flex-1 divide-y divide-slate-100">
          {/* Preview Mode / Subscribed Status Notice */}
          {!isSubscribedToBrand && (
            <div className="bg-[#E8F9FF] border-b border-[#33C4F0]/30 px-4 py-2.5 flex items-center justify-between text-xs text-[#147C9E] font-semibold">
              <span className="flex items-center gap-2">
                <Eye size={16} className="text-[#33C4F0] shrink-0" />
                Preview Mode — Subscribe to {selectedActivity.vendorName} to book.
              </span>
              <button
                type="button"
                onClick={() => {
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
                }}
                className="bg-[#1A1A28] hover:bg-[#33C4F0] text-white text-[11px] font-semibold px-3 py-1 rounded-full transition"
              >
                Subscribe Brand
              </button>
            </div>
          )}

          {/* Hero Section */}
          <div className="p-4 space-y-3">
            <div
              className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-100 shadow-2xs"
              style={{ borderRadius: '20px 20px 50px 20px' }}
            >
              <img src={selectedActivity.image} alt={selectedActivity.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-[#1A1A28] text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <span>{selectedActivity.symbol}</span> {selectedActivity.category}
              </div>

              <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <Star size={13} weight="fill" /> {selectedActivity.rating}
              </div>
            </div>

            <div>
              <h1 className="text-xl font-semibold text-[#1A1A28] leading-snug tracking-tight">{selectedActivity.name}</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <p className="text-xs font-semibold text-[#1AB0DC]">Hosted by {selectedActivity.vendorName}</p>
                <ShieldCheck size={14} className="text-[#33C4F0]" weight="fill" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
              <div className="bg-slate-50 p-2.5 rounded-2xl flex items-center gap-2 border border-slate-100">
                <Clock size={16} className="text-[#33C4F0]" />
                <div>
                  <p className="text-[9px] text-[#717182] font-semibold">DURATION</p>
                  <p className="text-xs font-semibold text-[#1A1A28]">{selectedActivity.duration}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-2xl flex items-center gap-2 border border-slate-100">
                <MapPin size={16} className="text-[#33C4F0]" />
                <div>
                  <p className="text-[9px] text-[#717182] font-semibold">LOCATION</p>
                  <p className="text-xs font-semibold text-[#1A1A28] truncate">{selectedActivity.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="p-4 space-y-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-[#33C4F0]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
              About This Experience
            </h2>
            <p className="text-xs text-[#525266] leading-relaxed font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {selectedActivity.description}
            </p>
          </div>

          {/* Session Highlights */}
          <div className="p-4 space-y-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#147C9E]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
              What's Included in Your Session
            </h3>
            <div className="space-y-2">
              {selectedActivity.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 rounded-2xl bg-[#F8FCFF] p-3 border border-[#33C4F0]/15"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58] mt-0.5">
                    <Check size={12} weight="bold" />
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A28] leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slot Picker & Instant Booking */}
          <div className="p-4 space-y-3">
            <div className="bg-gradient-to-br from-[#E8F9FF] via-white to-sky-50 p-4 rounded-3xl border border-[#33C4F0]/30 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#1A1A28]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>Select Date & Time</p>
                  <p className="text-[10px] text-[#717182]" style={{ fontFamily: 'Poppins, sans-serif' }}>Instant confirmation with your {planName || 'Pass'}</p>
                </div>
                {isSubscribedToBrand ? (
                  <span className="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-emerald-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Included with Pass
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Brand Subscription Needed
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {selectedActivity.schedule.map((sch) => (
                  <button
                    key={sch.id}
                    type="button"
                    onClick={() => setBookingSelectedSlot(`${sch.date} • ${sch.time}`)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition ${
                      bookingSelectedSlot.includes(sch.date)
                        ? 'border-[#33C4F0] bg-white ring-2 ring-[#33C4F0]/30 text-[#1A1A28] font-semibold shadow-2xs'
                        : 'border-slate-200 bg-white text-[#1A1A28] font-semibold hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{sch.date}</p>
                      <p className="text-[10px] text-[#717182] font-medium">{sch.time}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      {sch.seatsLeft} seats left
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleBookingAction}
                className={`w-full py-3 text-white text-xs font-semibold rounded-full shadow-md transition active:scale-[0.99] flex items-center justify-center gap-2 mt-2 ${
                  isSubscribedToBrand ? 'bg-[#33C4F0] hover:bg-[#1AB0DC]' : 'bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28]'
                }`}
                style={{ fontFamily: 'Century Gothic, sans-serif' }}
              >
                <Sparkle size={16} weight="fill" className="text-amber-300" />
                {isSubscribedToBrand ? 'Confirm & Redeem' : `Subscribe to ${selectedActivity.vendorName} & Book`}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
