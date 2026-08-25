import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkle } from '@phosphor-icons/react';

interface MobileStoryViewerModalProps {
  activeStoryIdx: number | null;
  setActiveStoryIdx: (idx: number | null) => void;
  brandStories: any[];
  setSelectedBrandId: (id: string | null) => void;
  setActiveTab: (tab: any) => void;
}

export function MobileStoryViewerModal({
  activeStoryIdx,
  setActiveStoryIdx,
  brandStories,
  setSelectedBrandId,
  setActiveTab,
}: MobileStoryViewerModalProps) {
  if (activeStoryIdx === null) return null;

  const currentStory = brandStories[activeStoryIdx];
  if (!currentStory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between overflow-hidden text-white font-sans"
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentStory.image}
            alt={currentStory.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        </div>

        {/* Top Navigation & Segmented Progress Bars */}
        <div className="relative z-10 p-4 pt-3 space-y-3">
          <div className="flex items-center gap-1.5">
            {brandStories.map((s: any, idx: number) => (
              <div
                key={s.id}
                className="flex-1 h-1 rounded-full overflow-hidden bg-white/30"
              >
                <div
                  className={`h-full transition-all duration-300 ${
                    idx === activeStoryIdx
                      ? 'bg-white w-full'
                      : idx < activeStoryIdx
                      ? 'bg-white w-full'
                      : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`p-[2px] rounded-full bg-gradient-to-tr ${currentStory.gradient}`}>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-base">
                  {currentStory.emoji}
                </div>
              </div>
              <div>
                <p className="text-xs font-black tracking-wide text-white leading-tight">{currentStory.vendorName}</p>
                <p className="text-[10px] text-sky-300 font-semibold">{currentStory.category} • Active Story</p>
              </div>
            </div>

            <button
              onClick={() => setActiveStoryIdx(null)}
              className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/20 transition"
            >
              <X size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Touch/Click Navigation Areas */}
        <div className="absolute inset-0 z-10 flex">
          <div
            onClick={() => setActiveStoryIdx(activeStoryIdx > 0 ? activeStoryIdx - 1 : null)}
            className="w-1/3 h-full cursor-pointer"
          />
          <div
            onClick={() => setActiveStoryIdx(activeStoryIdx < brandStories.length - 1 ? activeStoryIdx + 1 : null)}
            className="w-2/3 h-full cursor-pointer"
          />
        </div>

        {/* Bottom Story Card Overlay */}
        <div className="relative z-20 p-5 space-y-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
          <div className="space-y-2">
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#33C4F0] text-slate-950 inline-block shadow-sm">
              {currentStory.name} Studio Experience
            </span>
            <h2 className="text-xl font-black text-white leading-tight drop-shadow-md">
              {currentStory.title}
            </h2>
            <p className="text-xs text-slate-200 font-medium italic border-l-2 border-[#33C4F0] pl-3 py-0.5">
              "{currentStory.quote}"
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                setSelectedBrandId(currentStory.vendorId);
                setActiveTab('discover');
                setActiveStoryIdx(null);
              }}
              className="flex-1 py-3.5 px-4 bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] text-white text-xs font-black rounded-2xl shadow-lg shadow-[#33C4F0]/30 hover:opacity-95 transition flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <Sparkle size={15} weight="fill" /> View Studio & Book Session
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
