import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CaretLeft,
  Check,
  Clock,
  MapPin,
  Users,
  QrCode,
  CalendarBlank,
  ShareNetwork,
  Info,
  Sparkle,
  ShieldCheck,
  X,
  CalendarPlus,
  Compass,
  Trash,
  CaretRight,
  UserPlus,
} from '@phosphor-icons/react';
import { MobileBookingRosterView } from './MobileBookingRosterView';

interface MobileBookingDetailViewProps {
  selectedBooking: any | null;
  setSelectedBooking: (booking: any | null) => void;
  setSelectedQrPass: (pass: any) => void;
  onCancelBooking?: (bookingId: string) => void;
}

export function MobileBookingDetailView({
  selectedBooking,
  setSelectedBooking,
  setSelectedQrPass,
  onCancelBooking,
}: MobileBookingDetailViewProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRosterPage, setShowRosterPage] = useState(false);

  if (!selectedBooking) return null;

  const brandColor = selectedBooking.color || '#33C4F0';

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const highlights = selectedBooking.highlights || [
    'Guided by certified movement & creative practitioners',
    'All equipment, mats, and materials fully provided',
    'Restorative soundscapes & post-session herbal tea',
    'Designed for all experience and mobility levels',
  ];

  const agendaSteps = selectedBooking.agenda || [
    { time: '10 min before', title: 'Arrival & Check-in', detail: 'Scan your QR pass at studio reception.' },
    { time: 'First 15 min', title: 'Welcome & Warmup', detail: 'Gentle posture alignment & breathwork.' },
    { time: 'Main 45 min', title: 'Guided Session', detail: 'Core activity flow and hands-on practice.' },
    { time: 'Final 10 min', title: 'Cool Down & Tea', detail: 'Restorative stretch and herbal refreshments.' },
  ];

  const sampleAvatars = ['👩‍🎨', '👩‍💼', '👨‍💻', '👩‍🔬', '👨‍💼'];

  return (
    <>
      <AnimatePresence>
        {selectedBooking && (
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
                onClick={() => setSelectedBooking(null)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition cursor-pointer"
              >
                <CaretLeft size={16} weight="bold" /> Back to Schedule
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-[#10B981] bg-[#ECFDF5] border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Check size={12} weight="bold" /> {selectedBooking.status || 'Confirmed'}
                </span>
                <button
                  type="button"
                  onClick={() => showToast('🔗 Booking link copied to clipboard!')}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                  title="Share"
                >
                  <ShareNetwork size={16} weight="bold" />
                </button>
              </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
              {toastMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#1A1A28] text-white text-xs font-bold px-4 py-2.5 text-center sticky top-[53px] z-30 shadow-md"
                >
                  {toastMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Scrollable Content */}
            <div className="pb-28 flex-1 space-y-4 divide-y divide-slate-100">
              {/* Hero Image Section */}
              <div className="p-4 space-y-3">
                {selectedBooking.image && (
                  <div
                    className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 shadow-xs"
                    style={{ borderRadius: '24px 24px 64px 24px' }}
                  >
                    <img
                      src={selectedBooking.image}
                      alt={selectedBooking.activityName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span
                        className="text-xs font-extrabold text-white px-3 py-1 rounded-full shadow-md backdrop-blur-md flex items-center gap-1.5"
                        style={{ backgroundColor: brandColor }}
                      >
                        <span>{selectedBooking.symbol || '✨'}</span> Confirmed Booking
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedQrPass(selectedBooking)}
                        className="text-xs font-extrabold bg-white text-[#1A1A28] px-3 py-1 rounded-full shadow-md flex items-center gap-1 hover:bg-slate-100 transition cursor-pointer"
                      >
                        <QrCode size={14} weight="bold" /> Show Pass
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-1 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-extrabold text-[#33C4F0]">{selectedBooking.vendorName}</p>
                    <ShieldCheck size={14} className="text-[#33C4F0]" weight="fill" />
                  </div>
                  <h1 className="text-xl font-black text-slate-900 leading-snug tracking-tight">
                    {selectedBooking.activityName}
                  </h1>
                </div>

                {/* Digital Check-in Ticket Card */}
                <div
                  className="bg-[#E8F9FF] border border-[#33C4F0]/40 p-4 space-y-3 relative overflow-hidden"
                  style={{ borderRadius: '20px 20px 48px 20px' }}
                >
                  <div className="flex items-center justify-between text-xs font-extrabold text-[#147C9E]">
                    <span className="flex items-center gap-1.5">
                      <QrCode size={18} className="text-[#33C4F0]" /> Mobile Check-in Pass
                    </span>
                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#A2F4FD] text-[10px] text-slate-800">
                      {selectedBooking.qrCode || `CS-PASS-${Date.now()}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#33C4F0]/20">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Date</span>
                      <span className="font-extrabold text-slate-800">{selectedBooking.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Time</span>
                      <span className="font-extrabold text-slate-800">{selectedBooking.time}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedQrPass(selectedBooking)}
                    className="w-full py-2.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white text-xs font-extrabold rounded-full shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <QrCode size={16} weight="bold" /> Present QR Ticket at Venue
                  </button>
                </div>
              </div>

              {/* TEAM SLOTS & ROSTER SUMMARY CARD (CLICK REDIRECTS TO SUB-PAGE) */}
              <div className="p-4">
                <div
                  onClick={() => setShowRosterPage(true)}
                  className="bg-white p-4 border border-slate-100 shadow-xs hover:shadow-md transition duration-200 cursor-pointer group space-y-3"
                  style={{ borderRadius: '20px 20px 48px 20px' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E] block">
                        Team Roster & Capacity
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                        Occupied & Vacant Slots
                      </h3>
                    </div>
                    <span className="text-xs font-extrabold text-[#33C4F0] bg-[#E8F9FF] px-3 py-1 rounded-full group-hover:bg-[#33C4F0] group-hover:text-white transition flex items-center gap-1">
                      Manage Roster <CaretRight size={12} weight="bold" />
                    </span>
                  </div>

                  {/* Avatars & Counts Summary Row */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        {sampleAvatars.map((av, idx) => (
                          <span
                            key={idx}
                            className="inline-flex h-7 w-7 rounded-full bg-slate-100 text-xs items-center justify-center ring-2 ring-white"
                          >
                            {av}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        7 / 10 Slots Occupied
                      </span>
                    </div>

                    <span className="text-[11px] font-extrabold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-emerald-200">
                      3 Vacant Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Metadata Grid */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Clock size={16} className="text-[#33C4F0]" />
                      <span>Session Time</span>
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">{selectedBooking.time}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Users size={16} className="text-[#33C4F0]" />
                      <span>Reserved Seats</span>
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">
                      7/10 Slots Occupied
                    </p>
                  </div>
                </div>

                {/* Location Box */}
                <div className="mt-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <MapPin size={16} className="text-[#33C4F0]" />
                      <span>Venue Location</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('📍 Opening studio location in Maps...')}
                      className="text-[10px] font-extrabold text-[#33C4F0] hover:underline"
                    >
                      Get Directions
                    </button>
                  </div>
                  <p className="text-xs font-extrabold text-slate-900">{selectedBooking.location}</p>
                  <p className="text-[11px] text-slate-500 pt-0.5">
                    Please arrive 10 minutes prior to session start. Show your QR pass upon check-in.
                  </p>
                </div>
              </div>

              {/* Highlights Section */}
              <div className="p-4 space-y-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E] block">
                  Session Highlights
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">What to Expect</h3>
                <div className="space-y-2 pt-1">
                  {highlights.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3 border border-slate-100"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58] mt-0.5">
                        <Check size={12} weight="bold" />
                      </span>
                      <span className="text-xs font-semibold text-slate-800 leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Timeline / Agenda */}
              <div className="p-4 space-y-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0] block">
                  Schedule Breakdown
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">Session Timeline</h3>
                <div className="space-y-2 pt-1">
                  {agendaSteps.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="shrink-0 rounded-lg bg-[#E8F9FF] px-2 py-1 font-mono text-[10px] font-bold text-[#147C9E]">
                        {step.time}
                      </span>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">{step.title}</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Add to Calendar & Cancel */}
              <div className="p-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => showToast('📅 Added session to your calendar!')}
                  className="w-full py-3 bg-[#1A1A28] text-white hover:bg-black text-xs font-extrabold rounded-full shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarPlus size={16} weight="bold" /> Add to Phone Calendar
                </button>

                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="w-full py-2.5 border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash size={14} /> Cancel or Reschedule Booking
                </button>
              </div>
            </div>

            {/* CANCEL CONFIRMATION MODAL */}
            {showCancelModal && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl w-full max-w-xs p-5 text-center space-y-4 shadow-2xl">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-xl mx-auto">
                    <Trash size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Cancel Booking?</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Are you sure you want to cancel "{selectedBooking.activityName}"? Your pass credit will be refunded.
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCancelModal(false)}
                      className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
                    >
                      Keep Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCancelModal(false);
                        if (onCancelBooking) {
                          onCancelBooking(selectedBooking.id);
                        }
                        setSelectedBooking(null);
                      }}
                      className="flex-1 py-2.5 bg-rose-500 text-white text-xs font-bold rounded-xl hover:bg-rose-600"
                    >
                      Confirm Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEDICATED TEAM ROSTER SUB-PAGE */}
      <MobileBookingRosterView
        booking={selectedBooking}
        isOpen={showRosterPage}
        onClose={() => setShowRosterPage(false)}
      />
    </>
  );
}
