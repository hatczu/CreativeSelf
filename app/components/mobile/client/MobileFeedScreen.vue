<script setup lang="ts">
import { PhCaretRight, PhHeart, PhChatCircle, PhShieldCheck } from '@phosphor-icons/vue';
import { samplePostsData } from '~/data/postsData';
import { brandStories } from '~/data/clientMobileData';

const app = useClientMobileApp();

const categoryStyles: Record<string, { bg: string; color: string }> = {
  'Athletic Fanatics': { bg: '#ECFDF5', color: '#059669' },
  'Heart of Art': { bg: '#FFF1F2', color: '#E11D48' },
  'Moves & Grooves': { bg: '#F5F3FF', color: '#7C3AED' },
  Chowdown: { bg: '#FEF3C7', color: '#D97706' },
};
const categoryStyle = (category: string) => {
  const style = categoryStyles[category] ?? { bg: '#F1F5F9', color: '#475569' };
  return { backgroundColor: style.bg, color: style.color };
};
</script>

<template>
  <div class="flex-1 overflow-y-auto overflow-x-hidden pb-28 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <!-- Top Header Background Gradient -->
    <div
      class="absolute top-0 left-0 right-0 h-[260px] pointer-events-none z-0"
      style="background: linear-gradient(180deg, #1ab0dc 0%, #8deeea 34.22%, #ffffff 82.86%)"
    />

    <div class="relative z-10">
      <!-- THE EXPLORER ARCHETYPE FEATURE CARD -->
      <div class="p-4 pb-2">
        <div
          class="w-full h-[126px] bg-white border border-[#F3F4F6] cursor-pointer hover:shadow-xs transition-all duration-200 relative overflow-hidden group shrink-0"
          style="border-radius: 28px 28px 84px 28px"
          @click="navigateTo('/test')"
        >
          <!-- Background Glow 1 -->
          <div
            class="absolute pointer-events-none rounded-full"
            style="width: 128px; height: 128px; right: -10px; top: -39px; background-color: rgba(51, 196, 240, 0.15); filter: blur(40px)"
          />
          <!-- Background Glow 2 -->
          <div
            class="absolute pointer-events-none rounded-full"
            style="width: 128px; height: 128px; left: -39px; top: 25px; background-color: rgba(178, 223, 255, 0.2); filter: blur(40px)"
          />
          <!-- Gradient Shape Watermark -->
          <div
            class="absolute pointer-events-none opacity-20"
            style="
              width: 49px;
              height: 49px;
              left: 174px;
              bottom: 46px;
              background: linear-gradient(180deg, #33b4f0 0%, rgba(255, 255, 255, 0) 100%);
              border-radius: 362.6px 0px 362.6px 362.6px;
            "
          />

          <!-- Top Row Container -->
          <div class="absolute left-[19px] right-[19px] top-[19px] h-[21px] flex items-center justify-between z-10">
            <div class="flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px]" style="border-radius: 9999px">
              <span class="text-[10px] font-semibold text-[#007595] leading-[15px]" style="font-family: Poppins, sans-serif">Pass Active</span>
            </div>
            <PhCaretRight :size="18" class="text-[#90A1B9] group-hover:text-[#0F172B] transition-colors" />
          </div>

          <!-- Content Container -->
          <div class="absolute left-[19px] right-[19px] top-[52px] h-[55px] flex items-center gap-[14px] z-10">
            <div
              class="w-[48px] h-[48px] bg-white rounded-[16px] flex items-center justify-center shrink-0"
              style="box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
            >
              <span class="text-[24px] leading-[32px] text-[#0F172B]" style="font-family: Poppins, sans-serif">🧭</span>
            </div>
            <div class="flex flex-col items-start justify-center flex-1 min-w-0 h-[55px]">
              <div class="flex items-center gap-[6px] h-[20px] w-full">
                <h3 class="text-[16px] font-semibold text-[#0F172B] leading-[20px] truncate" style="font-family: Century Gothic, Poppins, sans-serif">
                  The Explorer 🧭
                </h3>
              </div>
              <div class="pt-[2px] w-full">
                <p class="text-[12px] font-normal text-[#90A1B9] leading-[16px] line-clamp-2" style="font-family: Poppins, sans-serif">
                  New places &amp; creative experiences to keep your inspiration moving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SERVICE BRAND STORIES SECTION -->
      <div class="py-2">
        <div class="grid grid-cols-6 gap-1 px-3 py-1 text-center">
          <button
            v-for="(story, idx) in brandStories"
            :key="story.id"
            class="flex flex-col items-center shrink-0 group focus:outline-none"
            @click="app.activeStoryIdx = idx"
          >
            <div :class="['p-[2px] rounded-full bg-gradient-to-tr shadow-xs group-hover:scale-105 transition-transform duration-200', story.gradient]">
              <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-xl border border-white shadow-xs">
                {{ story.emoji }}
              </div>
            </div>
            <span class="text-[11px] font-semibold text-[#1A1A28] mt-1 text-center tracking-tight truncate w-full">{{ story.name }}</span>
          </button>
        </div>
      </div>

      <!-- FEED POST LIST -->
      <div class="bg-[#F1F5F9] pt-2 pb-6 space-y-2">
        <div v-for="post in samplePostsData" :key="post.id" class="bg-white w-full py-4 space-y-3">
          <!-- Post Header -->
          <div class="px-4 flex items-center justify-between">
            <div class="flex items-center gap-2.5 cursor-pointer group" @click="app.selectedPost = post">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform"
                :style="{ background: `${post.color || '#1AB0DC'}18` }"
              >
                {{ post.emoji }}
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <p class="text-xs font-extrabold text-slate-900 leading-tight group-hover:text-[#1AB0DC] transition">{{ post.provider }}</p>
                  <PhShieldCheck :size="14" class="text-[#1AB0DC] shrink-0" weight="fill" />
                </div>
                <p class="text-[11px] font-medium text-slate-400 leading-tight mt-0.5">
                  {{ post.handle || `@${post.provider.toLowerCase().replace(/\s+/g, '')}` }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-brand-sm" :style="categoryStyle(post.category)">{{ post.category }}</span>
              <span v-if="post.duration" class="text-[10px] font-semibold text-[#1AB0DC] bg-[#E8F9FF] px-2.5 py-0.5 rounded-brand-sm">{{ post.duration }}</span>
            </div>
          </div>

          <!-- Post Preview Image -->
          <div v-if="post.image" class="h-52 w-full overflow-hidden relative cursor-pointer shadow-none rounded-none" @click="app.selectedPost = post">
            <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
          </div>

          <!-- Post Title, Body & Actions -->
          <div class="px-4 space-y-2">
            <h3
              class="text-base font-semibold text-slate-900 leading-snug tracking-tight cursor-pointer hover:text-[#1AB0DC] transition"
              @click="app.selectedPost = post"
            >
              {{ post.title }}
            </h3>
            <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">{{ post.copy }}</p>

            <div class="flex items-center justify-between text-xs pt-1">
              <div class="flex items-center gap-4 text-slate-400">
                <button
                  :class="['flex items-center gap-1 font-semibold text-[11px] transition', app.likedPostIds.includes(post.id) ? 'text-[#EF4444]' : 'hover:text-slate-700']"
                  @click="app.toggleLikePost(post.id)"
                >
                  <PhHeart :size="14" :weight="app.likedPostIds.includes(post.id) ? 'fill' : 'regular'" />
                  <span class="text-[11px] font-semibold">{{ post.likes + (app.likedPostIds.includes(post.id) ? 1 : 0) }}</span>
                </button>
                <button class="flex items-center gap-1 font-semibold text-[11px] hover:text-slate-700 transition" @click="app.selectedPost = post">
                  <PhChatCircle :size="14" />
                  <span class="text-[11px] font-semibold">{{ post.comments }}</span>
                </button>
              </div>

              <button class="text-[11px] font-semibold text-[#1AB0DC] hover:underline flex items-center gap-0.5" @click="app.selectedPost = post">
                Read More <PhCaretRight :size="12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
