<script setup lang="ts">
import { ref } from 'vue';
import { PhX, PhPaperPlaneRight, PhImage, PhCheckCircle, PhVideo } from '@phosphor-icons/vue';

const app = useProviderMobileApp();

const caption = ref('');
const mediaType = ref<'image' | 'video'>('image');
const submitted = ref(false);
const previewImage = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80';

const close = () => {
  app.showStoryComposer = false;
};

const handlePublish = () => {
  submitted.value = true;
  setTimeout(() => {
    app.addStory({
      id: `story-${Date.now()}`,
      name: 'Studio Moment',
      title: caption.value || 'Behind the scenes at Studio Lumen',
      image: previewImage,
      quote: caption.value,
      category: 'Behind the Scenes',
    });
    submitted.value = false;
    caption.value = '';
    close();
  }, 1000);
};
</script>

<template>
  <div v-if="app.showStoryComposer" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
    <div class="w-full max-w-md bg-white p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-250" style="border-radius: 24px 24px 0 0">
      <div class="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <p class="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E]">Content Studio</p>
          <h3 class="text-lg font-extrabold text-[#1A1A28]" style="font-family: Century Gothic, Poppins, sans-serif">New Brand Story</h3>
        </div>
        <button type="button" class="w-8 h-8 rounded-brand-sm bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition" @click="close">
          <PhX :size="16" weight="bold" />
        </button>
      </div>

      <div v-if="submitted" class="py-10 text-center">
        <div class="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto flex items-center justify-center mb-3">
          <PhCheckCircle :size="32" weight="fill" />
        </div>
        <h4 class="text-lg font-extrabold text-[#1A1A28]">Story Published!</h4>
        <p class="text-xs text-slate-500 mt-1">Your story is now visible on the mobile feed and brand showcase.</p>
      </div>
      <form v-else class="mt-4 space-y-4" @submit.prevent="handlePublish">
        <div class="h-44 w-full bg-slate-100 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300">
          <img :src="previewImage" alt="Story preview" class="w-full h-full object-cover opacity-90" />
          <div class="absolute inset-0 bg-slate-900/40 flex items-center justify-center gap-3 text-white">
            <button
              type="button"
              :class="['px-3 py-1.5 rounded-brand-sm text-xs font-extrabold flex items-center gap-1', mediaType === 'image' ? 'bg-[#33C4F0] text-[#1A1A28]' : 'bg-black/50']"
              @click="mediaType = 'image'"
            >
              <PhImage :size="14" /> Photo
            </button>
            <button
              type="button"
              :class="['px-3 py-1.5 rounded-brand-sm text-xs font-extrabold flex items-center gap-1', mediaType === 'video' ? 'bg-[#33C4F0] text-[#1A1A28]' : 'bg-black/50']"
              @click="mediaType = 'video'"
            >
              <PhVideo :size="14" /> Video
            </button>
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">STORY CAPTION / HIGHLIGHT</label>
          <textarea
            v-model="caption"
            rows="3"
            required
            placeholder="Share a behind-the-scenes moment or creative takeaway..."
            class="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-medium text-[#1A1A28] focus:bg-white focus:border-[#33C4F0] focus:outline-hidden"
            style="border-radius: 12px 12px 24px 12px"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3.5 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          style="border-radius: 14px 14px 28px 14px"
        >
          <PhPaperPlaneRight :size="16" weight="fill" />
          <span>Share to Mobile Feed</span>
        </button>
      </form>
    </div>
  </div>
</template>
