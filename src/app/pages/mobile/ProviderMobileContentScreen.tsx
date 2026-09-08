import React from 'react';
import {
  Plus,
  Image as ImageIcon,
  Heart,
  Eye,
  Sparkle,
} from '@phosphor-icons/react';

interface ProviderMobileContentScreenProps {
  onOpenStoryComposer: () => void;
  brandStories: any[];
}

export function ProviderMobileContentScreen({
  onOpenStoryComposer,
  brandStories,
}: ProviderMobileContentScreenProps) {
  return (
    <div className="flex-1 h-full overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Top Header Block */}
      <div
        className="w-full px-4 pt-5 pb-4 space-y-3 border-b border-slate-100/80"
        style={{
          background: 'linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 60%, #FFFFFF 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full">
            <span
              className="text-[10px] font-semibold text-[#007595] leading-[15px]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Brand Stories & Feed
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenStoryComposer}
            className="py-1.5 px-3 bg-[#1AB0DC] hover:bg-[#007595] text-white text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer shadow-2xs"
            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
          >
            <Plus size={14} weight="bold" />
            <span>New Story</span>
          </button>
        </div>

        <h2
          className="text-[20px] font-bold text-[#1A1A28] leading-tight"
          style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
        >
          Content Studio
        </h2>

        <p className="text-[12px] text-[#6A7282] font-normal">
          Share behind-the-scenes moments and inspire teams on the mobile feed.
        </p>
      </div>

      <div className="p-3.5 space-y-3.5 pb-6">
        {/* COMPOSER BANNER CARD */}
        <div
          onClick={onOpenStoryComposer}
          className="w-full bg-[#1A1A28] text-white p-4 shadow-md flex items-center justify-between cursor-pointer group relative overflow-hidden"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#33C4F0]/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-[#33C4F0]/20 border border-[#33C4F0]/40 text-[#33C4F0] flex items-center justify-center shrink-0">
              <ImageIcon size={20} weight="bold" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Share a Workshop Moment</h3>
              <p className="text-[11px] text-slate-300">Inspire corporate teams with recent photos</p>
            </div>
          </div>

          <span className="w-7 h-7 rounded-full bg-[#33C4F0] text-[#1A1A28] flex items-center justify-center group-hover:scale-110 transition shrink-0 relative z-10">
            <Plus size={15} weight="bold" />
          </span>
        </div>

        {/* ACTIVE STORIES GRID */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3
              className="text-[14px] font-bold text-[#1A1A28]"
              style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
            >
              Published Brand Stories
            </h3>
            <span className="text-[11px] text-slate-400 font-semibold">
              {brandStories.length} Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {brandStories.map((story) => (
              <div
                key={story.id}
                className="bg-white border border-slate-100/80 shadow-2xs overflow-hidden flex flex-col group hover:border-[#1AB0DC] transition"
                style={{ borderRadius: '18px 18px 36px 18px' }}
              >
                <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <span className="absolute top-2 left-2 text-base">{story.emoji}</span>
                  <span className="absolute bottom-2 left-2 text-[9px] font-bold text-white bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    {story.category}
                  </span>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <h4 className="text-[12px] font-bold text-[#1A1A28] line-clamp-2 leading-snug">
                    {story.title}
                  </h4>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#6A7282] font-semibold">
                    <span className="flex items-center gap-1">
                      <Eye size={12} className="text-[#1AB0DC]" />
                      <span>342</span>
                    </span>
                    <span className="flex items-center gap-1 text-rose-500">
                      <Heart size={12} weight="fill" />
                      <span>48</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEED PERFORMANCE TIPS CARD */}
        <div
          className="bg-white border border-slate-100/80 p-4 shadow-2xs space-y-1.5"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <div className="flex items-center gap-1.5 text-[#007595]">
            <Sparkle size={15} weight="fill" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Studio Feed Tip
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Listings with active brand stories receive <span className="text-[#007595] font-bold">2.4x more booking inquiries</span> from corporate HR leaders.
          </p>
        </div>
      </div>
    </div>
  );
}
