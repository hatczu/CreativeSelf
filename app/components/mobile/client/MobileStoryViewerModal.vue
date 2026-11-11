<script setup lang="ts">
import { computed } from 'vue';
import { PhX, PhSparkle } from '@phosphor-icons/vue';
import { brandStories } from '~/data/clientMobileData';

const app = useClientMobileApp();
const currentStory = computed(() => (app.activeStoryIdx === null ? null : brandStories[app.activeStoryIdx] ?? null));

const prev = () => {
  const idx = app.activeStoryIdx ?? 0;
  app.activeStoryIdx = idx > 0 ? idx - 1 : null;
};
const next = () => {
  const idx = app.activeStoryIdx ?? 0;
  app.activeStoryIdx = idx < brandStories.length - 1 ? idx + 1 : null;
};
const viewStudio = () => {
  if (!currentStory.value) return;
  app.setSelectedBrandId(currentStory.value.vendorId);
  app.setActiveTab('discover');
  app.activeStoryIdx = null;
};
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="currentStory && app.activeStoryIdx !== null"
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.95 }"
      class="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between overflow-hidden text-white font-sans"
    >
      <!-- Background Image with Dark Overlay -->
      <div class="absolute inset-0 z-0">
        <img :src="currentStory.image" :alt="currentStory.title" class="w-full h-full object-cover opacity-80" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
      </div>

      <!-- Top Navigation & Segmented Progress Bars -->
      <div class="relative z-10 p-4 pt-3 space-y-3">
        <div class="flex items-center gap-1.5">
          <div v-for="(s, idx) in brandStories" :key="s.id" class="flex-1 h-1 rounded-full overflow-hidden bg-white/30">
            <div :class="['h-full transition-all duration-300', idx <= app.activeStoryIdx ? 'bg-white w-full' : 'w-0']" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div :class="['p-[2px] rounded-full bg-gradient-to-tr', currentStory.gradient]">
              <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-base">{{ currentStory.emoji }}</div>
            </div>
            <div>
              <p class="text-xs font-black tracking-wide text-white leading-tight">{{ currentStory.vendorName }}</p>
              <p class="text-[10px] text-sky-300 font-semibold">{{ currentStory.category }} • Active Story</p>
            </div>
          </div>

          <button
            class="w-8 h-8 rounded-brand-sm bg-black/50 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/20 transition"
            @click="app.activeStoryIdx = null"
          >
            <PhX :size="16" weight="bold" />
          </button>
        </div>
      </div>

      <!-- Touch/Click Navigation Areas -->
      <div class="absolute inset-0 z-10 flex">
        <div class="w-1/3 h-full cursor-pointer" @click="prev" />
        <div class="w-2/3 h-full cursor-pointer" @click="next" />
      </div>

      <!-- Bottom Story Card Overlay -->
      <div class="relative z-20 p-5 space-y-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
        <div class="space-y-2">
          <span class="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-brand-sm bg-[#33C4F0] text-slate-950 inline-block shadow-sm">
            {{ currentStory.name }} Studio Experience
          </span>
          <h2 class="text-xl font-black text-white leading-tight drop-shadow-md">{{ currentStory.title }}</h2>
          <p class="text-xs text-slate-200 font-medium italic border-l-2 border-[#33C4F0] pl-3 py-0.5">"{{ currentStory.quote }}"</p>
        </div>

        <div class="flex gap-2 pt-2">
          <button
            class="flex-1 py-3.5 px-4 bg-gradient-to-r from-[#33C4F0] to-[#1AB0DC] text-white text-xs font-black rounded-brand shadow-lg shadow-[#33C4F0]/30 hover:opacity-95 transition flex items-center justify-center gap-2 active:scale-[0.99]"
            @click="viewStudio"
          >
            <PhSparkle :size="15" weight="fill" /> View Studio &amp; Book Session
          </button>
        </div>
      </div>
    </Motion>
  </AnimatePresence>
</template>
