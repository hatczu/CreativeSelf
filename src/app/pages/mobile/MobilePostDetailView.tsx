import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CaretLeft,
  Heart,
  ShieldCheck,
  Images as PhotosIcon,
  CaretRight,
  Clock,
  Users,
  Check,
  Sparkle,
  ChatCircle,
  PaperPlaneRight,
  PaperPlaneRight as Send,
  QrCode,
  X,
  BookmarkSimple,
  ShareNetwork,
  CalendarBlank,
} from '@phosphor-icons/react';
import { PostData } from '@/app/data/postsData';
import { MobileBookingWizardModal } from './MobileBookingWizardModal';

interface MobilePostDetailViewProps {
  selectedPost: PostData | null;
  setSelectedPost: (post: PostData | null) => void;
  likedPostIds: string[];
  setLikedPostIds: React.Dispatch<React.SetStateAction<string[]>>;
  savedPostIds?: string[];
  toggleSavePost?: (id: string) => void;
  postDetailImgIdx: number;
  setPostDetailImgIdx: (idx: number) => void;
  postDetailCommentText: string;
  setPostDetailCommentText: (text: string) => void;
  postDetailComments: Record<string, any[]>;
  setPostDetailComments: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
  regName: string;
  myBookings: any[];
  setMyBookings: React.Dispatch<React.SetStateAction<any[]>>;
  setBookingSuccessMsg: (msg: string | null) => void;
  selectedQrPass: any;
  setSelectedQrPass: (pass: any) => void;
  onViewProvider?: (brandId: string) => void;
}

export function MobilePostDetailView({
  selectedPost,
  setSelectedPost,
  likedPostIds,
  setLikedPostIds,
  savedPostIds = [],
  toggleSavePost,
  postDetailImgIdx,
  setPostDetailImgIdx,
  postDetailCommentText,
  setPostDetailCommentText,
  postDetailComments,
  setPostDetailComments,
  regName,
  myBookings,
  setMyBookings,
  setBookingSuccessMsg,
  selectedQrPass,
  setSelectedQrPass,
  onViewProvider,
}: MobilePostDetailViewProps) {
  const [selectedDate, setSelectedDate] = useState('Thu, Aug 8');
  const [teamSize, setTeamSize] = useState('15 people');
  const [bookingSent, setBookingSent] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [showWizardModal, setShowWizardModal] = useState(false);

  if (!selectedPost) return null;

  const isLiked = likedPostIds.includes(selectedPost.id);
  const isSaved = savedPostIds.includes(selectedPost.id);
  const brandColor = selectedPost.color || '#33C4F0';

  const postImages =
    selectedPost.images && selectedPost.images.length > 0
      ? selectedPost.images
      : selectedPost.image
      ? [selectedPost.image]
      : [];
  const safeIndex = postDetailImgIdx % (postImages.length || 1);

  const handleConfirmSessionBooking = () => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      activityName: selectedPost.title,
      vendorName: selectedPost.provider,
      date: selectedDate,
      time: '2:00 PM - 3:30 PM',
      location: 'Creative Hub • Studio 4B',
      status: 'Confirmed',
      seats: teamSize.includes('10') ? 10 : teamSize.includes('25') ? 25 : 15,
      color: brandColor,
      symbol: selectedPost.emoji || '✨',
      qrCode: `CS-PASS-${Date.now()}`,
      image: selectedPost.image || '',
    };

    setMyBookings([newBooking, ...myBookings]);
    setBookingSent(true);
    setBookingSuccessMsg(`Successfully booked "${selectedPost.title}" for ${selectedDate}!`);
  };

  const handleShareClick = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  return (
    <>
      {/* FULL PAGE VIEW: POST DETAIL SCREEN */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {/* Sticky Top Header Navigation */}
            <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedPost(null);
                  setPostDetailImgIdx(0);
                  setBookingSent(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition"
              >
                <CaretLeft size={16} weight="bold" /> Back to Feed
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#147C9E] bg-[#E8F9FF] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedPost.category}
                </span>

                {selectedPost.label && (
                  <span
                    className="text-[9px] font-extrabold uppercase text-white px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        selectedPost.label === 'Published'
                          ? '#10b981'
                          : selectedPost.label === 'Scheduled'
                          ? '#33c4f0'
                          : '#f59e0b',
                    }}
                  >
                    {selectedPost.label}
                  </span>
                )}
              </div>
            </div>

            {/* Notification Toast for Share */}
            {shareToast && (
              <div className="bg-[#1A1A28] text-white text-xs font-bold px-4 py-2 text-center sticky top-[53px] z-30 animate-pulse">
                🔗 Link copied to clipboard!
              </div>
            )}

            {/* Scrollable Content Body */}
            <div className="pb-24 flex-1 space-y-4 divide-y divide-slate-100">
              {/* Header & Hero Image Section */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-xs"
                      style={{ background: `${brandColor}18` }}
                    >
                      {selectedPost.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-extrabold text-[#1A1A28]">{selectedPost.provider}</p>
                        <ShieldCheck size={14} className="text-[#33C4F0]" weight="fill" />
                      </div>
                      <p className="text-[10px] text-[#717182]">
                        {selectedPost.handle || `@${selectedPost.provider.toLowerCase().replace(/\s+/g, '')}`} • {selectedPost.date || 'Today'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {(selectedPost as any).readTime || '3 min read'}
                  </span>
                </div>

                <h1 className="text-xl font-black text-slate-900 leading-snug tracking-tight pt-1">
                  {selectedPost.title}
                </h1>

                {/* Interactive Multi-Photo Carousel */}
                {postImages.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div
                      className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 shadow-xs"
                      style={{ borderRadius: '24px 24px 64px 24px' }}
                    >
                      <img
                        src={postImages[safeIndex]}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover transition-all duration-300"
                      />

                      {/* Photo Badge Counter */}
                      {postImages.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <PhotosIcon size={12} />
                          <span>Photo {safeIndex + 1} of {postImages.length}</span>
                        </div>
                      )}

                      {/* Navigation Arrows */}
                      {postImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => setPostDetailImgIdx(safeIndex === 0 ? postImages.length - 1 : safeIndex - 1)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1A1A28] shadow-md flex items-center justify-center hover:bg-white transition"
                            aria-label="Previous image"
                          >
                            <CaretLeft size={16} weight="bold" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setPostDetailImgIdx(safeIndex === postImages.length - 1 ? 0 : safeIndex + 1)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1A1A28] shadow-md flex items-center justify-center hover:bg-white transition"
                            aria-label="Next image"
                          >
                            <CaretRight size={16} weight="bold" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Clickable Thumbnail Strip */}
                    {postImages.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {postImages.map((imgUrl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setPostDetailImgIdx(idx)}
                            className={`relative h-12 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition ${
                              safeIndex === idx
                                ? 'border-[#33C4F0] scale-105 shadow-2xs'
                                : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Story Narrative Section */}
              <div className="p-4 space-y-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0] block">
                  The Story Behind the Session
                </span>
                <p className="text-sm font-bold text-slate-900 leading-relaxed">
                  {selectedPost.copy}
                </p>

                {selectedPost.fullStory && (
                  <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pt-2 border-t border-slate-50">
                    {selectedPost.fullStory}
                  </div>
                )}

                {/* Details Bar Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-extrabold">
                  {selectedPost.duration && (
                    <span className="rounded-full bg-[#F2FBFE] px-3 py-1.5 text-[#147C9E] flex items-center gap-1.5">
                      <Clock size={14} />
                      {selectedPost.duration}
                    </span>
                  )}
                  {selectedPost.seats && (
                    <span className="rounded-full bg-[#F2FBFE] px-3 py-1.5 text-[#147C9E] flex items-center gap-1.5">
                      <Users size={14} />
                      {selectedPost.seats}
                    </span>
                  )}
                  {selectedPost.service && (
                    <span className="rounded-full bg-[#E8F9FF] px-3 py-1.5 text-[#147C9E]">
                      🎨 Service: {selectedPost.service}
                    </span>
                  )}
                </div>
              </div>

              {/* Experience Highlights */}
              {selectedPost.highlights && selectedPost.highlights.length > 0 && (
                <div className="p-4 space-y-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E] block">
                    What Makes This Experience Special
                  </span>
                  <div className="space-y-2 pt-1">
                    {selectedPost.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3 border border-slate-100"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58] mt-0.5">
                          <Check size={12} weight="bold" />
                        </span>
                        <span className="text-xs font-semibold text-slate-800 leading-tight">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Gallery Mosaic Grid ("A Glimpse Into the Moment") */}
              {postImages.length > 1 && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0] block">
                        Photo Gallery
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900">A Glimpse Into the Moment</h3>
                    </div>
                    <span className="text-[10px] font-extrabold text-[#147C9E] bg-[#E8F9FF] px-2.5 py-1 rounded-full">
                      {postImages.length} Photos
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {postImages.map((imgUrl, index) => (
                      <div
                        key={index}
                        onClick={() => setPostDetailImgIdx(index)}
                        className="group cursor-pointer overflow-hidden rounded-2xl bg-slate-100 h-32 relative border border-slate-100"
                      >
                        <img
                          src={imgUrl}
                          alt={`Gallery photo ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#1A1A28]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold text-[#1A1A28] shadow-md backdrop-blur">
                            View Photo
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engagement & Community Action Bar */}
              <div className="p-4 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (isLiked) {
                        setLikedPostIds(likedPostIds.filter((id) => id !== selectedPost.id));
                      } else {
                        setLikedPostIds([...likedPostIds, selectedPost.id]);
                      }
                    }}
                    className={`flex items-center gap-1.5 text-xs font-extrabold transition ${
                      isLiked ? 'text-[#EF4444]' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Heart size={18} weight={isLiked ? 'fill' : 'bold'} />
                    <span>{selectedPost.likes + (isLiked ? 1 : 0)}</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <ChatCircle size={18} weight="bold" />
                    <span>
                      {postDetailComments[selectedPost.id]?.length ??
                        (selectedPost.commentsList?.length || selectedPost.comments || 0)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSavePost && toggleSavePost(selectedPost.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-extrabold transition ${
                      isSaved
                        ? 'bg-[#E8F9FF] border-[#33C4F0] text-[#147C9E]'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <BookmarkSimple size={15} weight={isSaved ? 'fill' : 'bold'} />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareClick}
                    className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                    title="Share post"
                  >
                    <ShareNetwork size={16} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Provider Profile Spotlight Card (Web Aligned) */}
              <div className="p-4">
                <div
                  className="bg-white p-4 border border-slate-100 shadow-xs space-y-3"
                  style={{ borderRadius: '20px 20px 48px 20px' }}
                >
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#717182]">
                    Provider Profile
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs"
                      style={{ background: `${brandColor}18` }}
                    >
                      {selectedPost.emoji}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#1A1A28]">{selectedPost.provider}</h4>
                      <p className="text-[11px] text-[#717182]">{selectedPost.authorRole || selectedPost.handle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#717182] leading-relaxed">
                    Trusted CreativeSelf partner providing curated wellbeing experiences for individuals and corporate teams.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPost(null);
                      if (onViewProvider) {
                        const vendorSlug = selectedPost.provider.toLowerCase().replace(/\s+/g, '-');
                        onViewProvider(vendorSlug);
                      }
                    }}
                    className="w-full py-2.5 rounded-full border border-[#33C4F0]/30 text-xs font-extrabold text-[#147C9E] bg-[#F2FBFE] hover:bg-[#E8F9FF] transition text-center"
                  >
                    View Provider Profile
                  </button>
                </div>
              </div>

              {/* Acumen AI Wellbeing Insight (Web Aligned) */}
              <div className="px-4 py-2">
                <div
                  className="border border-[#33C4F0]/30 bg-[#E8F9FF] p-4 text-[#1A1A28]"
                  style={{ borderRadius: '20px 20px 48px 20px' }}
                >
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#147C9E]">
                    <Sparkle size={16} weight="fill" />
                    Acumen AI Wellbeing Insight
                  </div>
                  <p className="mt-1 text-sm font-extrabold leading-snug">
                    Sessions like this boost team morale by 34%.
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#4F7180]">
                    Mid-week creative breaks help prevent cognitive overload and encourage cross-functional bonding.
                  </p>
                </div>
              </div>

              {/* Interactive Session Booking Section (Web Aligned) */}
              <div className="p-4 space-y-3">
                <div
                  className="bg-[#1A1A28] p-5 text-white shadow-xl relative overflow-hidden"
                  style={{ borderRadius: '20px 20px 56px 20px' }}
                >
                  {bookingSent ? (
                    <div className="py-4 text-center space-y-3">
                      <div className="mx-auto w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center">
                        <Check size={24} weight="bold" />
                      </div>
                      <h3 className="text-base font-extrabold">Booking Request Sent!</h3>
                      <p className="text-xs text-white/70">
                        {selectedPost.provider} will confirm availability for {selectedDate}. Added to your Bookings tab.
                      </p>
                      <button
                        type="button"
                        onClick={() => setBookingSent(false)}
                        className="rounded-full bg-[#33C4F0] px-4 py-2 text-xs font-extrabold text-[#1A1A28]"
                      >
                        Book Another Slot
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">
                          Book Experience
                        </p>
                        <span className="rounded-full bg-[#33C4F0]/20 px-2.5 py-0.5 text-[9px] font-extrabold text-[#33C4F0]">
                          Instant Request
                        </span>
                      </div>

                      <h3 className="mt-1 text-lg font-extrabold">Book this session</h3>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Select your preferred date & team size to confirm availability.
                      </p>

                      <label className="mt-4 block text-[10px] font-extrabold text-white/70 uppercase tracking-wider">
                        PREFERRED DATE
                      </label>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {['Thu, Aug 8', 'Tue, Aug 13', 'Fri, Aug 16'].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setSelectedDate(d)}
                            className="rounded-full px-3 py-1.5 text-xs font-bold transition"
                            style={{
                              background: selectedDate === d ? brandColor : 'rgba(255, 255, 255, 0.1)',
                              color: selectedDate === d ? '#1A1A28' : '#FFFFFF',
                            }}
                          >
                            {d}
                          </button>
                        ))}
                      </div>

                      <label className="mt-3 block text-[10px] font-extrabold text-white/70 uppercase tracking-wider">
                        ESTIMATED TEAM SIZE
                      </label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white focus:outline-none"
                      >
                        <option className="text-[#1A1A28]">10 people</option>
                        <option className="text-[#1A1A28]">15 people</option>
                        <option className="text-[#1A1A28]">25 people</option>
                      </select>

                      <button
                        type="button"
                        onClick={handleConfirmSessionBooking}
                        className="mt-5 w-full py-3 text-xs font-extrabold rounded-full text-white shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        style={{ background: brandColor }}
                      >
                        <Send size={16} weight="bold" />
                        Quick Reserve Session
                      </button>

                      <div className="pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => setShowWizardModal(true)}
                          className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-[#33C4F0] border border-[#33C4F0]/40 text-xs font-extrabold rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Sparkle size={15} weight="fill" />
                          Customize Flow: Date Range, Team Range & Bulk Invites →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ENHANCED BOOKING FLOW WIZARD MODAL */}
              <MobileBookingWizardModal
                isOpen={showWizardModal}
                onClose={() => setShowWizardModal(false)}
                title={selectedPost.title}
                provider={selectedPost.provider}
                symbol={selectedPost.emoji}
                image={selectedPost.image}
                color={brandColor}
                onCompleteBooking={(newBooking) => {
                  setMyBookings([newBooking, ...myBookings]);
                  setBookingSuccessMsg(`Successfully booked "${newBooking.activityName}" for ${newBooking.date}!`);
                  setBookingSent(true);
                  setTimeout(() => setBookingSuccessMsg(null), 4000);
                }}
              />

              {/* Interactive Comments Section */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <ChatCircle size={18} className="text-[#33C4F0]" weight="bold" />
                    Team Discussion ({postDetailComments[selectedPost.id]?.length ?? (selectedPost.commentsList?.length || selectedPost.comments || 0)})
                  </h3>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {(postDetailComments[selectedPost.id] || selectedPost.commentsList || [
                    { id: 'c1', user: 'Sophia Lin', avatar: '👩‍🎨', time: '2h ago', text: 'This session looks absolutely incredible! Can wait for next week.' },
                    { id: 'c2', user: 'Marcus Vance', avatar: '🧘‍♂️', time: '5h ago', text: 'Loved the ceramic grounding technique. High quality instruction!' },
                  ]).map((c: any) => (
                    <div key={c.id} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-lg shrink-0">{c.avatar || '👤'}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-bold text-[#1A1A28]">{c.user}</p>
                          <span className="text-[9px] text-[#717182]">{c.time}</span>
                        </div>
                        <p className="text-xs text-[#525266] mt-0.5 leading-snug">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!postDetailCommentText.trim()) return;

                    const currentList = postDetailComments[selectedPost.id] || selectedPost.commentsList || [
                      { id: 'c1', user: 'Sophia Lin', avatar: '👩‍🎨', time: '2h ago', text: 'This session looks absolutely incredible! Can wait for next week.' },
                      { id: 'c2', user: 'Marcus Vance', avatar: '🧘‍♂️', time: '5h ago', text: 'Loved the ceramic grounding technique. High quality instruction!' },
                    ];

                    setPostDetailComments({
                      ...postDetailComments,
                      [selectedPost.id]: [
                        ...currentList,
                        {
                          id: `cm-${Date.now()}`,
                          user: regName || 'Alex Morgan',
                          avatar: '✨',
                          time: 'Just now',
                          text: postDetailCommentText.trim(),
                        },
                      ],
                    });
                    setPostDetailCommentText('');
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-slate-100"
                >
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={postDetailCommentText}
                    onChange={(e) => setPostDetailCommentText(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-slate-100 rounded-full text-xs font-medium text-[#1A1A28] focus:outline-none focus:bg-white border border-transparent focus:border-[#33C4F0]"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-[#33C4F0] text-white rounded-full hover:bg-[#1AB0DC] transition shadow-xs shrink-0"
                  >
                    <PaperPlaneRight size={14} weight="bold" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: QR CODE CHECK-IN PASS */}
      <AnimatePresence>
        {selectedQrPass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-xs p-5 text-center space-y-4 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedQrPass(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <X size={16} />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#E8F9FF] text-[#147C9E] flex items-center justify-center text-2xl mx-auto">
                {selectedQrPass.symbol}
              </div>

              <div>
                <p className="text-xs font-bold text-[#10B981]">Confirmed Mobile Pass</p>
                <h3 className="text-sm font-black text-[#1A1A28] line-clamp-1">{selectedQrPass.activityName}</h3>
                <p className="text-[11px] text-[#717182]">{selectedQrPass.vendorName}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col items-center justify-center">
                <QrCode size={120} className="text-[#1A1A28]" />
                <p className="text-[10px] font-mono font-bold text-gray-500 mt-2">{selectedQrPass.qrCode}</p>
              </div>

              <div className="text-[11px] text-[#717182] space-y-0.5">
                <p>📅 {selectedQrPass.date}</p>
                <p>⏰ {selectedQrPass.time}</p>
                <p>📍 {selectedQrPass.location}</p>
              </div>

              <button
                onClick={() => setSelectedQrPass(null)}
                className="w-full py-2.5 bg-[#1A1A28] text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
