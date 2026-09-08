import React, { useState } from 'react';
import {
  X,
  Check,
  Sparkle,
  CalendarBlank,
  Users,
  Clock,
  CurrencyCircleDollar,
  QrCode,
  PaperPlaneRight,
  Plus,
  Image as ImageIcon,
  CheckCircle,
  Video,
  ChatCircleText,
  Building,
  Lightning,
} from '@phosphor-icons/react';

// ==========================================
// 1. CREATE / EDIT SERVICE MODAL
// ==========================================
interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (serviceData: any) => void;
}

export function ProviderMobileServiceModal({ isOpen, onClose, onSave }: ServiceModalProps) {
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState('90 min · Team workshop');
  const [price, setPrice] = useState('45');
  const [maxGuests, setMaxGuests] = useState('20');
  const [category, setCategory] = useState('Art & Creativity');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSave({
        id: `svc-${Date.now()}`,
        title: title || 'New Creative Session',
        format,
        price: `$${price}/person`,
        maxGuests,
        category,
        description,
        published: true,
        views: '1',
        bookings: '0',
        color: '#33C4F0',
        emoji: '✨',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      });
      setSubmitted(false);
      setTitle('');
      setDescription('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
      <div
        className="w-full max-w-md bg-white p-6 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-250"
        style={{ borderRadius: '24px 24px 0 0' }}
      >
        {/* Top Handle bar */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 shrink-0 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E]">
              Studio Offering
            </p>
            <h3
              className="text-lg font-extrabold text-[#1A1A28]"
              style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
            >
              New Service Package
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-4">
              <CheckCircle size={36} weight="fill" />
            </div>
            <h4 className="text-xl font-extrabold text-[#1A1A28]">Service Published!</h4>
            <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
              Your service is now live on the CreativeSelf marketplace for team leaders to discover.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1">
            <div>
              <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">
                SERVICE TITLE
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Expressive Watercolor & Tea Tasting"
                className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-bold text-[#1A1A28] focus:bg-white focus:border-[#33C4F0] focus:outline-hidden"
                style={{ borderRadius: '12px 12px 24px 12px' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">
                  PRICE / GUEST
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-extrabold text-slate-400">$</span>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 pl-7 p-3 text-xs font-bold text-[#1A1A28] focus:bg-white focus:border-[#33C4F0] focus:outline-hidden"
                    style={{ borderRadius: '12px 12px 24px 12px' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">
                  MAX GROUP SIZE
                </label>
                <input
                  type="number"
                  required
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-bold text-[#1A1A28] focus:bg-white focus:border-[#33C4F0] focus:outline-hidden"
                  style={{ borderRadius: '12px 12px 24px 12px' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">
                SESSION FORMAT
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-bold text-[#1A1A28] focus:bg-white focus:border-[#33C4F0] focus:outline-hidden"
                style={{ borderRadius: '12px 12px 24px 12px' }}
              >
                <option value="60 min · Express Workshop">60 min · Express Workshop</option>
                <option value="90 min · Team Workshop">90 min · Team Workshop</option>
                <option value="120 min · Deep Dive Masterclass">120 min · Deep Dive Masterclass</option>
                <option value="Half-day Retreat">Half-day Retreat</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">
                DESCRIPTION
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what teams will experience and learn..."
                className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-medium text-[#1A1A28] focus:bg-white focus:border-[#33C4F0] focus:outline-hidden"
                style={{ borderRadius: '12px 12px 24px 12px' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4"
              style={{ borderRadius: '16px 16px 36px 16px', fontFamily: 'Century Gothic, sans-serif' }}
            >
              <Sparkle size={16} weight="fill" className="text-[#33C4F0]" />
              <span>Publish Service Listing</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. REVIEW BOOKING REQUEST MODAL
// ==========================================
interface BookingModalProps {
  booking: any;
  onClose: () => void;
  onStatusChange: (bookingId: string, status: 'Confirmed' | 'Declined') => void;
}

export function ProviderMobileBookingModal({ booking, onClose, onStatusChange }: BookingModalProps) {
  const [confirmedSuccess, setConfirmedSuccess] = useState(false);

  if (!booking) return null;

  const handleConfirm = () => {
    setConfirmedSuccess(true);
    setTimeout(() => {
      onStatusChange(booking.id || booking.session, 'Confirmed');
      setConfirmedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleDecline = () => {
    onStatusChange(booking.id || booking.session, 'Declined');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
      <div
        className="w-full max-w-md bg-white p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-250"
        style={{ borderRadius: '24px 24px 0 0' }}
      >
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#007595] bg-[#E8F9FF] px-2.5 py-0.5 rounded-full border border-[#A2F4FD]">
              Booking Request
            </span>
            <h3
              className="text-lg font-extrabold text-[#1A1A28] mt-1"
              style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
            >
              {booking.company || 'Corporate Team'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {confirmedSuccess ? (
          <div className="py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto flex items-center justify-center mb-3">
              <Check size={28} weight="bold" />
            </div>
            <h4 className="text-lg font-extrabold text-[#1A1A28]">Booking Confirmed!</h4>
            <p className="text-xs text-slate-500 mt-1">
              Confirmation and QR pass details sent to {booking.company}.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="bg-slate-50 p-4 border border-slate-100 space-y-3" style={{ borderRadius: '16px 16px 36px 16px' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${booking.color || '#33C4F0'}20` }}
                >
                  {booking.emoji || '🎨'}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#1A1A28]">{booking.session}</h4>
                  <p className="text-xs text-slate-500 font-medium">{booking.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">ATTENDEES</p>
                  <p className="font-extrabold text-[#1A1A28] flex items-center gap-1 mt-0.5">
                    <Users size={14} className="text-[#33C4F0]" />
                    <span>{booking.group || '15 guests'}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">ESTIMATED REVENUE</p>
                  <p className="font-extrabold text-[#087E58] flex items-center gap-1 mt-0.5">
                    <CurrencyCircleDollar size={14} />
                    <span>$675.00</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/60 p-3.5 border border-blue-100 flex items-start gap-2.5" style={{ borderRadius: '14px 14px 28px 14px' }}>
              <ChatCircleText size={18} className="text-[#007595] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-snug">
                <span className="font-extrabold text-[#1A1A28]">Note from Team Lead:</span> "Looking forward to this creative reset for our design squad!"
              </p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                style={{ borderRadius: '14px 14px 28px 14px' }}
              >
                <Check size={16} weight="bold" />
                <span>Accept Booking</span>
              </button>

              <button
                type="button"
                onClick={handleDecline}
                className="px-4 py-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                style={{ borderRadius: '14px 14px 28px 14px' }}
              >
                Decline
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. QR CODE SCANNER SIMULATOR MODAL
// ==========================================
interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProviderMobileQRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
  const [scannedResult, setScannedResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScannedResult({
      code: 'CS-PAS-88219',
      guestName: 'Alex Rivera',
      company: 'Northstar Studio',
      session: 'Watercolour without perfection',
      status: 'Valid Event Pass',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
      <div
        className="w-full max-w-sm bg-slate-900 text-white p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center animate-in zoom-in-95 duration-200 border border-slate-800"
        style={{ borderRadius: '24px 24px 48px 24px' }}
      >
        <button
          type="button"
          onClick={() => {
            setScannedResult(null);
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
        >
          <X size={18} weight="bold" />
        </button>

        <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">
          Attendee Check-in
        </p>
        <h3
          className="text-lg font-extrabold text-white mt-1"
          style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
        >
          Scan Client Pass QR
        </h3>

        {scannedResult ? (
          <div className="mt-6 w-full space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle size={40} weight="fill" />
            </div>

            <div className="bg-slate-800/80 p-4 border border-slate-700/80 text-left space-y-2" style={{ borderRadius: '16px 16px 32px 16px' }}>
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                  {scannedResult.status}
                </span>
                <span className="text-[10px] text-slate-400">{scannedResult.timestamp}</span>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase">GUEST NAME</p>
                <p className="text-sm font-extrabold text-white">{scannedResult.guestName}</p>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase">ORGANIZATION</p>
                <p className="text-xs font-bold text-slate-300">{scannedResult.company}</p>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase">WORKSHOP SESSION</p>
                <p className="text-xs font-bold text-[#33C4F0]">{scannedResult.session}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setScannedResult(null)}
              className="w-full py-3 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] text-xs font-extrabold transition cursor-pointer shadow-md"
              style={{ borderRadius: '14px 14px 28px 14px' }}
            >
              Scan Next Attendee
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center">
            {/* Viewfinder Frame */}
            <div className="w-52 h-52 relative border-2 border-dashed border-[#33C4F0]/60 rounded-3xl flex items-center justify-center p-4 bg-slate-800/40">
              <div className="absolute inset-2 border border-[#33C4F0]/30 rounded-2xl animate-pulse" />
              <QrCode size={110} className="text-[#33C4F0]/80" />
            </div>

            <p className="text-xs text-slate-400 mt-4 max-w-xs">
              Position the client's event pass QR code within the frame to verify entry.
            </p>

            <button
              type="button"
              onClick={handleSimulateScan}
              className="mt-6 px-6 py-3 bg-[#33C4F0] text-[#1A1A28] text-xs font-extrabold transition flex items-center gap-2 hover:bg-white cursor-pointer shadow-lg"
              style={{ borderRadius: '14px 14px 28px 14px' }}
            >
              <Lightning size={16} weight="fill" />
              <span>Simulate QR Scan</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. STORY / POST COMPOSER MODAL
// ==========================================
interface StoryComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: any) => void;
}

export function ProviderMobileStoryComposerModal({ isOpen, onClose, onPostCreated }: StoryComposerModalProps) {
  const [caption, setCaption] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onPostCreated({
        id: `story-${Date.now()}`,
        name: 'Studio Moment',
        title: caption || 'Behind the scenes at Studio Lumen',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
        quote: caption,
        category: 'Behind the Scenes',
      });
      setSubmitted(false);
      setCaption('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
      <div
        className="w-full max-w-md bg-white p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-250"
        style={{ borderRadius: '24px 24px 0 0' }}
      >
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E]">
              Content Studio
            </p>
            <h3
              className="text-lg font-extrabold text-[#1A1A28]"
              style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
            >
              New Brand Story
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto flex items-center justify-center mb-3">
              <CheckCircle size={32} weight="fill" />
            </div>
            <h4 className="text-lg font-extrabold text-[#1A1A28]">Story Published!</h4>
            <p className="text-xs text-slate-500 mt-1">
              Your story is now visible on the mobile feed and brand showcase.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePublish} className="mt-4 space-y-4">
            <div className="h-44 w-full bg-slate-100 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300">
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80"
                alt="Story preview"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center gap-3 text-white">
                <button
                  type="button"
                  onClick={() => setMediaType('image')}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                    mediaType === 'image' ? 'bg-[#33C4F0] text-[#1A1A28]' : 'bg-black/50'
                  }`}
                >
                  <ImageIcon size={14} /> Photo
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('video')}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                    mediaType === 'video' ? 'bg-[#33C4F0] text-[#1A1A28]' : 'bg-black/50'
                  }`}
                >
                  <Video size={14} /> Video
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">
                STORY CAPTION / HIGHLIGHT
              </label>
              <textarea
                rows={3}
                required
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Share a behind-the-scenes moment or creative takeaway..."
                className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-medium text-[#1A1A28] focus:bg-white focus:border-[#33C4F0] focus:outline-hidden"
                style={{ borderRadius: '12px 12px 24px 12px' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              style={{ borderRadius: '14px 14px 28px 14px' }}
            >
              <PaperPlaneRight size={16} weight="fill" />
              <span>Share to Mobile Feed</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
