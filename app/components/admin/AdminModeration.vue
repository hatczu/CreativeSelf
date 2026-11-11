<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhEye, PhHeart, PhMagnifyingGlass, PhTrash, PhX } from '@phosphor-icons/vue';
import type { ContentItem } from '~/data/adminData';

const content = defineModel<ContentItem[]>('content', { required: true });

type FilterState = 'All' | 'Published' | 'Reported';
const filterTabs: FilterState[] = ['All', 'Published', 'Reported'];

const filterState = ref<FilterState>('All');
const searchQuery = ref('');
const removedToast = ref<string | null>(null);
const previewItem = ref<ContentItem | null>(null);
const activeImageIdx = ref(0);

const handleRemove = (id: string, title: string) => {
  content.value = content.value.filter((item) => item.id !== id);
  if (previewItem.value?.id === id) previewItem.value = null;
  removedToast.value = `"${title}" has been removed from the platform feed.`;
  setTimeout(() => (removedToast.value = null), 4000);
};

const openPreview = (item: ContentItem) => {
  previewItem.value = item;
  activeImageIdx.value = 0;
};

const filteredContent = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return content.value.filter((item) => {
    const matchesFilter = filterState.value === 'All' || item.state === filterState.value;
    const matchesSearch = item.title.toLowerCase().includes(q) || item.by.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });
});

const previewImages = computed(() => (previewItem.value ? [previewItem.value.image, ...(previewItem.value.additionalImages || [])] : []));
const tabCount = (tab: FilterState) => (tab === 'All' ? content.value.length : content.value.filter((c) => c.state === tab).length);
const stateClass = (state: ContentItem['state']) => (state === 'Reported' ? 'bg-[#f59e0b]/15 text-[#9a5d00]' : 'bg-[#10b981]/15 text-[#087e58]');
</script>

<template>
  <section class="mt-7 space-y-6">
    <div
      v-if="removedToast"
      class="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-800 shadow-sm transition-all"
    >
      <span>{{ removedToast }}</span>
      <button type="button" class="text-red-600 hover:text-red-900" @click="removedToast = null">
        <PhX :size="14" />
      </button>
    </div>

    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Content Moderation</p>
        <h2 class="mt-1 text-2xl font-extrabold">All Posted Vendor Contents</h2>
        <p class="mt-1 text-xs text-[#717182]">
          Vendor posts go live automatically upon creation. Preview media assets and remove any posts that violate guidelines.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <label class="flex items-center gap-2 rounded-brand border border-[#33c4f0]/20 bg-white px-4 py-2 text-sm text-[#717182]">
          <PhMagnifyingGlass :size="15" />
          <input v-model="searchQuery" class="w-36 bg-transparent outline-none" placeholder="Search posts..." />
        </label>
      </div>
    </div>

    <div class="flex items-center gap-2 border-b border-[#dfe5e7] pb-3">
      <button
        v-for="tab in filterTabs"
        :key="tab"
        type="button"
        :class="[
          'rounded-brand-sm px-4 py-1.5 text-xs font-extrabold transition',
          filterState === tab ? 'bg-[#1a1a28] text-white' : 'bg-white text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]',
        ]"
        @click="filterState = tab"
      >
        {{ tab === 'All' ? 'All Posted Content' : tab }} ({{ tabCount(tab) }})
      </button>
    </div>

    <div class="space-y-4">
      <div v-if="filteredContent.length === 0" class="bg-white p-8 text-center shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
        <p class="text-sm font-bold text-[#717182]">No posted contents match your filter.</p>
      </div>
      <article
        v-for="item in filteredContent"
        v-else
        :key="item.id"
        class="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)] transition hover:shadow-md"
        style="border-radius: 20px 20px 64px 20px"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <!-- Image Thumbnail with Overlay -->
          <div class="flex gap-4 items-start flex-1 min-w-[280px]">
            <div
              class="group relative h-24 w-32 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-[#eef1f3] shadow-inner transition transform hover:scale-[1.02]"
              @click="openPreview(item)"
            >
              <ImageWithFallback :src="item.image" :alt="item.title" class="h-full w-full object-cover transition duration-300 group-hover:scale-110" />
              <div
                class="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a28]/40 opacity-0 transition group-hover:opacity-100 backdrop-blur-[2px]"
              >
                <PhEye :size="20" class="text-white" />
                <span class="mt-1 text-[10px] font-extrabold text-white uppercase tracking-wider">Preview</span>
              </div>
              <div
                v-if="(item.additionalImages?.length || 0) > 0"
                class="absolute bottom-1.5 right-1.5 rounded-md bg-[#1a1a28]/80 px-1.5 py-0.5 text-[9px] font-extrabold text-white backdrop-blur"
              >
                +{{ item.additionalImages?.length }}
              </div>
            </div>

            <div class="space-y-1.5 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-bold text-[#147c9e]">Posted by {{ item.by }}</span>
                <span class="text-[11px] text-[#717182]">• {{ item.date }}</span>
                <span class="rounded-brand-sm bg-[#f3f5f6] px-2.5 py-0.5 text-[10px] font-bold text-[#536168]">{{ item.category }}</span>
              </div>
              <h3 class="text-lg font-extrabold text-[#19242a] cursor-pointer hover:text-[#147c9e] transition" @click="openPreview(item)">
                {{ item.title }}
              </h3>
              <p class="text-xs text-[#717182] leading-relaxed max-w-2xl line-clamp-2">{{ item.snippet }}</p>

              <!-- Stats -->
              <div class="flex items-center gap-4 pt-1 text-[11px] font-bold text-[#717182]">
                <span class="flex items-center gap-1"> <PhHeart :size="13" class="text-[#ef4444]" /> {{ item.likes || 0 }} </span>
                <span>•</span>
                <span>{{ item.comments || 0 }} comments</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0 self-end sm:self-start">
            <span :class="['rounded-brand-sm px-3 py-1.5 text-xs font-bold', stateClass(item.state)]">
              {{ item.state === 'Reported' ? 'Reported by Users' : 'Live Feed' }}
            </span>

            <button
              type="button"
              class="flex items-center gap-1.5 rounded-brand-sm bg-[#e8f9ff] px-3.5 py-2 text-xs font-extrabold text-[#147c9e] transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
              title="Preview content image"
              @click="openPreview(item)"
            >
              <PhEye :size="15" />
              <span class="hidden md:inline">Preview</span>
            </button>

            <button
              type="button"
              class="flex items-center gap-1.5 rounded-brand-sm bg-[#ef4444]/10 px-3.5 py-2 text-xs font-extrabold text-[#dc2626] transition hover:bg-[#ef4444] hover:text-white"
              title="Remove post from feed"
              @click="handleRemove(item.id, item.title)"
            >
              <PhTrash :size="15" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Full Image Preview Modal -->
    <div v-if="previewItem" class="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a28]/60 p-4 backdrop-blur-sm">
      <div class="relative flex flex-col md:flex-row w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white shadow-2xl" style="border-radius: 24px 24px 64px 24px">
        <!-- Close Button -->
        <button
          type="button"
          class="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-brand-sm bg-white/80 text-[#19242a] backdrop-blur transition hover:bg-[#1a1a28] hover:text-white"
          @click="previewItem = null"
        >
          <PhX :size="18" />
        </button>

        <!-- Left: Main Image & Gallery Selector -->
        <div class="flex-1 bg-[#1a1a28] p-6 flex flex-col items-center justify-center relative min-h-[280px] md:min-h-[420px]">
          <div class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
            <ImageWithFallback
              :src="previewImages[activeImageIdx] || previewItem.image"
              :alt="previewItem.title"
              class="max-h-[380px] w-full object-contain rounded-xl"
            />
          </div>

          <!-- Gallery Thumbnails Strip -->
          <div v-if="previewImages.length > 1" class="mt-4 flex items-center gap-2 overflow-x-auto p-1">
            <button
              v-for="(imgUrl, idx) in previewImages"
              :key="idx"
              type="button"
              :class="[
                'h-12 w-16 overflow-hidden rounded-lg border-2 transition',
                activeImageIdx === idx ? 'border-[#33c4f0] scale-105' : 'border-transparent opacity-60 hover:opacity-100',
              ]"
              @click="activeImageIdx = idx"
            >
              <ImageWithFallback :src="imgUrl" :alt="`Thumbnail ${idx + 1}`" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Right: Post Details & Moderation Actions -->
        <div class="w-full md:w-80 p-6 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-[#dfe5e7]">
          <div class="space-y-4 overflow-y-auto">
            <div class="flex items-center justify-between gap-2">
              <span class="text-xs font-extrabold text-[#147c9e]">{{ previewItem.by }}</span>
              <span :class="['rounded-brand-sm px-2.5 py-1 text-[10px] font-extrabold', stateClass(previewItem.state)]">
                {{ previewItem.state === 'Reported' ? 'Reported' : 'Live Feed' }}
              </span>
            </div>

            <div>
              <span class="inline-block rounded-brand-sm bg-[#f3f5f6] px-2.5 py-0.5 text-[10px] font-bold text-[#536168]">{{ previewItem.category }}</span>
              <h3 class="mt-2 text-xl font-extrabold leading-snug text-[#19242a]">{{ previewItem.title }}</h3>
              <p class="mt-1 text-[11px] text-[#717182]">Posted {{ previewItem.date }}</p>
            </div>

            <div class="rounded-2xl border border-[#dfe5e7] bg-[#f9fdff] p-4 text-xs text-[#536168] leading-relaxed">{{ previewItem.snippet }}</div>

            <div class="flex items-center justify-between text-xs font-bold text-[#717182] px-1">
              <span class="flex items-center gap-1.5"> <PhHeart :size="16" class="text-[#ef4444]" /> {{ previewItem.likes || 0 }} likes </span>
              <span>{{ previewItem.comments || 0 }} comments</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-6 pt-4 border-t border-[#dfe5e7] flex flex-col gap-2">
            <button
              type="button"
              class="w-full flex items-center justify-center gap-2 rounded-brand-sm bg-[#ef4444] px-4 py-3 text-xs font-extrabold text-white shadow-md transition hover:bg-[#dc2626]"
              @click="handleRemove(previewItem.id, previewItem.title)"
            >
              <PhTrash :size="16" />
              <span>Remove Post</span>
            </button>
            <button
              type="button"
              class="w-full rounded-brand-sm border border-[#dfe5e7] bg-white px-4 py-2.5 text-xs font-extrabold text-[#717182] transition hover:bg-[#f3f5f6] hover:text-[#19242a]"
              @click="previewItem = null"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
