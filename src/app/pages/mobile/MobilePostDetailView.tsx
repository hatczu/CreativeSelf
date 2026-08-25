import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, Heart, ShieldCheck, Images as PhotosIcon, CaretRight, Clock, Users, Check, Sparkle, ChatCircle, PaperPlaneRight, QrCode, X } from '@phosphor-icons/react';
import { PostData } from '@/app/data/postsData';

interface MobilePostDetailViewProps {
  selectedPost: PostData | null;
  setSelectedPost: (post: PostData | null) => void;
  likedPostIds: string[];
  setLikedPostIds: React.Dispatch<React.SetStateAction<string[]>>;
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
}

export function MobilePostDetailView({
  selectedPost,
  setSelectedPost,
  likedPostIds,
  setLikedPostIds,
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
}: MobilePostDetailViewProps) {
  return (
    <>
      {/* FULL PAGE VIEW: POST DETAIL SCREEN */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans"
          >
            {/* Sticky Top Header Navigation */}
            <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setSelectedPost(null);
                  setPostDetailImgIdx(0);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition"
              >
                <CaretLeft size={16} weight="bold" /> Back
              </button>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-200/60">
                  {selectedPost.category}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (likedPostIds.includes(selectedPost.id)) {
                      setLikedPostIds(likedPostIds.filter((id) => id !== selectedPost.id));
                    } else {
                      setLikedPostIds([...likedPostIds, selectedPost.id]);
                    }
                  }}
                  className={`p-2 rounded-full border transition ${
                    likedPostIds.includes(selectedPost.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Heart size={16} weight={likedPostIds.includes(selectedPost.id) ? 'fill' : 'bold'} />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="pb-16 flex-1 divide-y divide-slate-100">
              {/* Header & Hero Image Section */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#E8F9FF] text-[#147C9E] flex items-center justify-center text-xl shadow-xs">
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

                {(() => {
                  const postImages = selectedPost.images && selectedPost.images.length > 0
                    ? selectedPost.images
                    : selectedPost.image
                    ? [selectedPost.image]
                    : [];

                  if (postImages.length === 0) return null;

                  const safeIndex = postDetailImgIdx % postImages.length;

                  return (
                    <div className="space-y-2 pt-1">
                      <div
                        className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 shadow-xs"
                        style={{ borderRadius: '24px 24px 72px 24px' }}
                      >
                        <img
                          src={postImages[safeIndex]}
                          alt={selectedPost.title}
                          className="w-full h-full object-cover transition-all duration-300"
                        />

                        {postImages.length > 1 && (
                          <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <PhotosIcon size={12} />
                            <span>{safeIndex + 1} of {postImages.length}</span>
                          </div>
                        )}

                        {postImages.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={() => setPostDetailImgIdx(safeIndex === 0 ? postImages.length - 1 : safeIndex - 1)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1A1A28] shadow-md flex items-center justify-center hover:bg-white transition"
                            >
                              <CaretLeft size={16} weight="bold" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setPostDetailImgIdx(safeIndex === postImages.length - 1 ? 0 : safeIndex + 1)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1A1A28] shadow-md flex items-center justify-center hover:bg-white transition"
                            >
                              <CaretRight size={16} weight="bold" />
                            </button>
                          </>
                        )}
                      </div>

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
                  );
                })()}
              </div>

              {/* Story Narrative Section */}
              <div className="p-4 space-y-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0] block">
                  Session Narrative
                </span>
                <h2 className="text-base font-black text-slate-900 leading-snug">
                  The Story Behind the Session
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {selectedPost.copy}
                </p>

                {selectedPost.fullStory && (
                  <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pt-2 border-t border-slate-50">
                    {selectedPost.fullStory}
                  </div>
                )}

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
                      🎨 {selectedPost.service}
                    </span>
                  )}
                </div>
              </div>

              {/* Experience Highlights */}
              {selectedPost.highlights && selectedPost.highlights.length > 0 && (
                <div className="p-4 space-y-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E] block">
                    Key Highlights
                  </span>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    What Makes This Experience Special
                  </h3>
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

              {/* Session Booking Section */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Book This Session</h3>
                    <p className="text-[10px] text-slate-500 font-medium">Included with your CreativeSelf Pro Pass</p>
                  </div>
                  <span className="text-xs font-black text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-emerald-200">
                    1 Pass Credit
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMyBookings([
                      {
                        id: `bk-${Date.now()}`,
                        activityName: selectedPost.title,
                        vendorName: selectedPost.provider,
                        date: 'Tomorrow, 10:00 AM',
                        time: '10:00 AM - 11:00 AM',
                        location: 'Creative Hub • Studio 4B',
                        status: 'Confirmed',
                        seats: 1,
                        color: '#33C4F0',
                        symbol: selectedPost.emoji || '✨',
                        qrCode: `CS-PASS-${Date.now()}`,
                        image: selectedPost.image || '',
                      },
                      ...myBookings,
                    ]);
                    setBookingSuccessMsg(`Successfully booked "${selectedPost.title}"! Added to your Bookings tab.`);
                    setSelectedPost(null);
                  }}
                  className="w-full py-3 bg-[#1A1A28] text-white hover:bg-black text-xs font-extrabold rounded-full shadow-xs transition active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Sparkle size={16} weight="fill" className="text-amber-400" />
                  Reserve Experience Now
                </button>
              </div>

              {/* Interactive Comments Section */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <ChatCircle size={18} className="text-[#33C4F0]" weight="bold" />
                    Comments ({postDetailComments[selectedPost.id]?.length ?? (selectedPost.commentsList?.length || selectedPost.comments || 0)})
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
