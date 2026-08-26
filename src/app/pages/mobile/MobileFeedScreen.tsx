import React from 'react';
import { useNavigate } from 'react-router';
import { CaretRight, Heart, ChatCircle } from '@phosphor-icons/react';
import { samplePostsData, PostData } from '@/app/data/postsData';

interface BrandStory {
  id: string;
  name: string;
  emoji: string;
  vendorId: string;
  vendorName: string;
  title: string;
  image: string;
  gradient: string;
  quote: string;
  category: string;
}

interface MobileFeedScreenProps {
  brandStories: BrandStory[];
  setActiveStoryIdx: (idx: number | null) => void;
  setSelectedPost: (post: PostData | null) => void;
  likedPostIds: string[];
  toggleLikePost: (id: string) => void;
}

export function MobileFeedScreen({
  brandStories,
  setActiveStoryIdx,
  setSelectedPost,
  likedPostIds,
  toggleLikePost,
}: MobileFeedScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Top Header Background Gradient from Figma (Rectangle 4) */}
      <div
        className="absolute top-0 left-0 right-0 h-[260px] pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, #1AB0DC 0%, #8DEEEA 34.22%, #FFFFFF 82.86%)',
        }}
      />

      <div className="relative z-10">
        {/* THE EXPLORER ARCHETYPE FEATURE CARD */}
        <div className="p-4 pb-2">
          <div
            onClick={() => navigate('/test')}
            className="w-full h-[126px] bg-white border border-[#F3F4F6] cursor-pointer hover:shadow-xs transition-all duration-200 relative overflow-hidden group shrink-0"
            style={{ borderRadius: '28px 28px 84px 28px' }}
          >
            {/* Background Glow 1 */}
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: '128px',
                height: '128px',
                right: '-10px',
                top: '-39px',
                backgroundColor: 'rgba(51, 196, 240, 0.15)',
                filter: 'blur(40px)',
              }}
            />

            {/* Background Glow 2 */}
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: '128px',
                height: '128px',
                left: '-39px',
                top: '25px',
                backgroundColor: 'rgba(178, 223, 255, 0.2)',
                filter: 'blur(40px)',
              }}
            />

            {/* Gradient Shape Watermark */}
            <div
              className="absolute pointer-events-none opacity-20"
              style={{
                width: '49px',
                height: '49px',
                left: '174px',
                bottom: '46px',
                background: 'linear-gradient(180deg, #33B4F0 0%, rgba(255, 255, 255, 0) 100%)',
                borderRadius: '362.6px 0px 362.6px 362.6px',
              }}
            />

            {/* Top Row Container */}
            <div className="absolute left-[19px] right-[19px] top-[19px] h-[21px] flex items-center justify-between z-10">
              <div
                className="flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px]"
                style={{ borderRadius: '9999px' }}
              >
                <span
                  className="text-[10px] font-semibold text-[#007595] leading-[15px]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Pass Active
                </span>
              </div>
              <CaretRight size={18} className="text-[#90A1B9] group-hover:text-[#0F172B] transition-colors" />
            </div>

            {/* Content Container */}
            <div className="absolute left-[19px] right-[19px] top-[52px] h-[55px] flex items-center gap-[14px] z-10">
              <div
                className="w-[48px] h-[48px] bg-white rounded-[16px] flex items-center justify-center shrink-0"
                style={{
                  boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
                }}
              >
                <span className="text-[24px] leading-[32px] text-[#0F172B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  🧭
                </span>
              </div>
              <div className="flex flex-col items-start justify-center flex-1 min-w-0 h-[55px]">
                <div className="flex items-center gap-[6px] h-[20px] w-full">
                  <h3
                    className="text-[16px] font-semibold text-[#0F172B] leading-[20px] truncate"
                    style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
                  >
                    The Explorer 🧭
                  </h3>
                </div>
                <div className="pt-[2px] w-full">
                  <p
                    className="text-[12px] font-normal text-[#90A1B9] leading-[16px] line-clamp-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    New places & creative experiences to keep your inspiration moving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICE BRAND STORIES SECTION */}
        <div className="py-2">

          <div className="grid grid-cols-6 gap-1 px-3 py-1 text-center">
            {brandStories.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => setActiveStoryIdx(idx)}
                className="flex flex-col items-center shrink-0 group focus:outline-none"
              >
                <div className={`p-[2px] rounded-full bg-gradient-to-tr ${story.gradient} shadow-xs group-hover:scale-105 transition-transform duration-200`}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-xl border border-white shadow-xs">
                    {story.emoji}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#1A1A28] mt-1 text-center tracking-tight truncate w-full">
                  {story.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FEED POST LIST WITH DIVIDED GAPS */}
        <div className="bg-[#F1F5F9] pt-2 pb-6 space-y-2">
          {samplePostsData.map((post) => {
            const isLiked = likedPostIds.includes(post.id);
            return (
              <div key={post.id} className="bg-white w-full py-4 space-y-3">
                {/* Post Header */}
                <div className="px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl p-1 bg-slate-100 rounded-full">{post.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{post.provider}</p>
                      <p className="text-[11px] text-slate-400">{post.category}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#1AB0DC] bg-[#E8F9FF] px-2.5 py-0.5 rounded-full">
                    {post.duration}
                  </span>
                </div>

                {/* Post Preview Image (Full Width, rounded-none) */}
                {post.image && (
                  <div
                    className="h-52 w-full overflow-hidden relative cursor-pointer shadow-none rounded-none"
                    onClick={() => setSelectedPost(post)}
                  >
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Post Title, Body & Actions */}
                <div className="px-4 space-y-2">
                  <h3
                    onClick={() => setSelectedPost(post)}
                    className="text-base font-semibold text-slate-900 leading-snug tracking-tight cursor-pointer hover:text-[#1AB0DC] transition"
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.copy}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-4 text-slate-400">
                      <button
                        onClick={() => toggleLikePost(post.id)}
                        className={`flex items-center gap-1 font-semibold text-[11px] transition ${
                          isLiked ? 'text-[#EF4444]' : 'hover:text-slate-700'
                        }`}
                      >
                        <Heart size={14} weight={isLiked ? 'fill' : 'regular'} />
                        <span className="text-[11px] font-semibold">{post.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center gap-1 font-semibold text-[11px] hover:text-slate-700 transition"
                      >
                        <ChatCircle size={14} />
                        <span className="text-[11px] font-semibold">{post.comments}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-[11px] font-semibold text-[#1AB0DC] hover:underline flex items-center gap-0.5"
                    >
                      Read More <CaretRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  </div>
);
}
