<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  PhArrowLeft,
  PhCheck,
  PhCaretLeft,
  PhCaretRight,
  PhHeart,
  PhChatCircle,
  PhPaperPlaneRight,
  PhBookmarkSimple,
  PhShareNetwork,
  PhSparkle,
  PhUsers,
  PhShieldCheck,
  PhClock,
  PhImages,
  PhEye,
  PhCursorClick,
} from '@phosphor-icons/vue';
import { getPostById, samplePostsData } from '~/data/postsData';

// The same post detail view is reachable from the client feed, the corporate feed and the vendor studio.
definePageMeta({
  alias: ['/dashboard/posts/:postId', '/corporate/posts/:postId', '/vendor/posts/:postId'],
});

const route = useRoute();
const isVendorView = computed(() => route.path.startsWith('/vendor'));
const isCorporateView = computed(() => route.path.startsWith('/corporate'));

const post = computed(() => getPostById((route.params.postId as string) || '') || samplePostsData[0]!);
const allImages = computed(() =>
  post.value.images && post.value.images.length > 0 ? post.value.images : post.value.image ? [post.value.image] : [],
);

const activeImageIndex = ref(0);
const liked = ref(false);
const likesCount = ref(0);
const saved = ref(false);
const selectedDate = ref('Thu, Aug 8');
const teamSize = ref('15 people');
const bookingSent = ref(false);
const newComment = ref('');
const commentsList = ref<NonNullable<(typeof samplePostsData)[number]['commentsList']>>([]);

watch(
  post,
  (p) => {
    activeImageIndex.value = 0;
    likesCount.value = p.likes;
    commentsList.value = [...(p.commentsList || [])];
  },
  { immediate: true },
);

const brandColor = computed(() => post.value.color || '#33C4F0');

const handleNextPhoto = () => {
  activeImageIndex.value = activeImageIndex.value === allImages.value.length - 1 ? 0 : activeImageIndex.value + 1;
};
const handlePrevPhoto = () => {
  activeImageIndex.value = activeImageIndex.value === 0 ? allImages.value.length - 1 : activeImageIndex.value - 1;
};

const handleLikeToggle = () => {
  likesCount.value += liked.value ? -1 : 1;
  liked.value = !liked.value;
};

const handleAddComment = () => {
  if (!newComment.value.trim()) return;
  commentsList.value = [
    ...commentsList.value,
    { id: `comment-${Date.now()}`, user: 'Alex Rivera', avatar: '🎭', time: 'Just now', text: newComment.value.trim() },
  ];
  newComment.value = '';
};

const backUrl = computed(() => (isVendorView.value ? '/vendor/content' : isCorporateView.value ? '/corporate' : '/dashboard'));
const backLabel = computed(() =>
  isVendorView.value ? 'Back to Content Studio' : isCorporateView.value ? 'Back to Team Marketplace' : 'Back to Wellbeing Feed',
);

const labelColor = (label: string) => (label === 'Published' ? '#10b981' : label === 'Scheduled' ? '#33c4f0' : '#f59e0b');
const dates = ['Thu, Aug 8', 'Tue, Aug 13', 'Fri, Aug 16'];
const showAlert = (message: string) => window.alert(message);
</script>

<template>
  <div class="min-h-screen bg-[#F8FCFF] text-[#1A1A28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <UniversalSidebar />

    <div class="mx-auto max-w-[1380px] px-4 py-8 pb-16 lg:px-8 lg:py-10 lg:pl-[84px]">
      <!-- Top Back Navigation Bar -->
      <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-[#33C4F0]/25 bg-white px-5 py-2.5 text-xs font-extrabold text-[#1A1A28] shadow-sm transition hover:bg-[#E8F9FF] hover:border-[#33C4F0]"
          @click="navigateTo(backUrl)"
        >
          <PhArrowLeft :size="16" />
          {{ backLabel }}
        </button>

        <div class="flex items-center gap-2 text-xs font-bold text-[#717182]">
          <span>Feed Post</span>
          <span>/</span>
          <span :style="{ color: brandColor }">{{ post.category }}</span>
        </div>
      </div>

      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-white p-6 shadow-[0_16px_48px_rgba(28,118,155,.08)] sm:p-8 lg:p-10" style="border-radius: 24px 24px 64px 24px">
        <!-- Category & Metadata Header -->
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-3">
            <span class="grid h-12 w-12 place-items-center rounded-2xl text-2xl shadow-sm" :style="{ background: `${brandColor}18` }">
              {{ post.emoji }}
            </span>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base font-extrabold text-[#1A1A28]">{{ post.provider }}</span>
                <span class="text-xs font-medium text-[#717182]">{{ post.handle }}</span>
                <PhShieldCheck :size="16" class="text-[#33C4F0]" />
              </div>
              <p class="text-xs text-[#717182] mt-0.5">{{ post.date }}</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <span
              class="rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider"
              :style="{ background: `${brandColor}15`, color: brandColor }"
            >
              {{ post.category }}
            </span>
            <span
              v-if="post.label"
              class="rounded-full px-3 py-1 text-xs font-extrabold uppercase text-white shadow-sm"
              :style="{ background: labelColor(post.label) }"
            >
              {{ post.label }}
            </span>
          </div>
        </div>

        <h1 class="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A28] leading-tight">{{ post.title }}</h1>

        <!-- Featured Multi-Photo Interactive Carousel -->
        <div v-if="allImages.length > 0" class="mt-8">
          <div class="relative h-[340px] sm:h-[460px] lg:h-[540px] w-full overflow-hidden bg-gray-100 shadow-lg" style="border-radius: 20px 20px 48px 20px">
            <ImageWithFallback
              :src="allImages[activeImageIndex]"
              :alt="`${post.title} photo ${activeImageIndex + 1}`"
              class="h-full w-full object-cover transition-all duration-500 hover:scale-[1.02]"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-[#1A1A28]/50 via-transparent to-transparent pointer-events-none" />

            <template v-if="allImages.length > 1">
              <!-- Photo Badge -->
              <div
                class="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-[#1A1A28]/80 px-4 py-1.5 text-xs font-extrabold text-white backdrop-blur-md shadow-md"
              >
                <PhImages :size="16" />
                <span>Photo {{ activeImageIndex + 1 }} of {{ allImages.length }}</span>
              </div>

              <!-- Carousel Arrow Navigation -->
              <button
                type="button"
                class="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[#1A1A28] shadow-lg backdrop-blur-md transition hover:bg-white hover:scale-110"
                aria-label="Previous photo"
                @click="handlePrevPhoto"
              >
                <PhCaretLeft :size="22" />
              </button>
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[#1A1A28] shadow-lg backdrop-blur-md transition hover:bg-white hover:scale-110"
                aria-label="Next photo"
                @click="handleNextPhoto"
              >
                <PhCaretRight :size="22" />
              </button>
            </template>
          </div>

          <!-- Clickable Thumbnail Strip -->
          <div v-if="allImages.length > 1" class="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            <button
              v-for="(imgUrl, idx) in allImages"
              :key="idx"
              type="button"
              :class="[
                'relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border-2 transition',
                activeImageIndex === idx ? 'border-[#33C4F0] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100',
              ]"
              @click="activeImageIndex = idx"
            >
              <ImageWithFallback :src="imgUrl" :alt="`Thumbnail ${idx + 1}`" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Layout Grid -->
      <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <!-- Left Column: Post Story & Album -->
        <div class="space-y-8">
          <!-- Story Card -->
          <div class="bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
            <h2 class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33C4F0]">The Story Behind the Session</h2>
            <p class="mt-3 text-lg font-bold text-[#1A1A28] leading-relaxed">{{ post.copy }}</p>

            <div v-if="post.fullStory" class="mt-5 whitespace-pre-line text-sm sm:text-base leading-relaxed text-[#525266]">{{ post.fullStory }}</div>

            <!-- Tags / Details Bar -->
            <div class="mt-7 flex flex-wrap items-center gap-3 border-t border-[#33C4F0]/15 pt-5 text-xs font-extrabold">
              <span v-if="post.duration" class="rounded-full bg-[#F2FBFE] px-4 py-2.5 text-[#147C9E] flex items-center gap-2">
                <PhClock :size="16" />
                {{ post.duration }}
              </span>
              <span v-if="post.seats" class="rounded-full bg-[#F2FBFE] px-4 py-2.5 text-[#147C9E] flex items-center gap-2">
                <PhUsers :size="16" />
                {{ post.seats }}
              </span>
              <span v-if="post.service" class="rounded-full bg-[#E8F9FF] px-4 py-2.5 text-[#147C9E]">🎨 Service: {{ post.service }}</span>
            </div>
          </div>

          <!-- Session Highlights Card -->
          <div
            v-if="post.highlights && post.highlights.length > 0"
            class="bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
            style="border-radius: 20px 20px 64px 20px"
          >
            <h3 class="text-xs font-extrabold uppercase tracking-[.18em] text-[#147C9E]">What Makes This Experience Special</h3>
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <div
                v-for="(highlight, index) in post.highlights"
                :key="index"
                class="flex items-start gap-3 rounded-2xl bg-[#F8FCFF] p-4 border border-[#33C4F0]/15"
              >
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58]">
                  <PhCheck :size="14" />
                </span>
                <p class="text-xs sm:text-sm font-extrabold text-[#1A1A28] leading-snug">{{ highlight }}</p>
              </div>
            </div>
          </div>

          <!-- Photo Album Mosaic Grid -->
          <div v-if="allImages.length > 1" class="bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
            <div class="flex items-center justify-between mb-5">
              <div>
                <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33C4F0]">Photo Gallery</p>
                <h3 class="mt-1 text-xl font-extrabold text-[#1A1A28]">A Glimpse Into the Moment</h3>
              </div>
              <span class="rounded-full bg-[#E8F9FF] px-3.5 py-1.5 text-xs font-extrabold text-[#147C9E]">{{ allImages.length }} Photos</span>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="(imgUrl, index) in allImages"
                :key="index"
                class="group cursor-pointer overflow-hidden rounded-2xl bg-gray-100 h-52 relative"
                @click="activeImageIndex = index"
              >
                <ImageWithFallback
                  :src="imgUrl"
                  :alt="`Gallery photo ${index + 1}`"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-[#1A1A28]/20 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
                  <span class="rounded-full bg-white/90 px-4 py-2 text-xs font-extrabold text-[#1A1A28] shadow-md backdrop-blur">View Photo</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Engagement & Community Bar -->
          <div
            class="bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)] flex flex-wrap items-center justify-between gap-4"
            style="border-radius: 20px 20px 48px 20px"
          >
            <div class="flex items-center gap-6">
              <button
                type="button"
                class="flex items-center gap-2 text-sm font-extrabold transition hover:scale-105"
                :style="{ color: liked ? brandColor : '#717182' }"
                @click="handleLikeToggle"
              >
                <PhHeart :size="22" :weight="liked ? 'fill' : 'regular'" />
                <span>{{ likesCount }} Likes</span>
              </button>

              <div class="flex items-center gap-2 text-sm font-bold text-[#717182]">
                <PhChatCircle :size="22" />
                <span>{{ commentsList.length }} Comments</span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button
                type="button"
                class="flex items-center gap-2 rounded-full border border-[#33C4F0]/25 px-4 py-2 text-xs font-extrabold text-[#1A1A28] transition hover:bg-[#E8F9FF]"
                :style="{ color: saved ? brandColor : '#1A1A28' }"
                @click="saved = !saved"
              >
                <PhBookmarkSimple :size="16" />
                {{ saved ? 'Saved' : 'Save Experience' }}
              </button>
              <button
                type="button"
                class="grid h-9 w-9 place-items-center rounded-full bg-[#F2FBFE] text-[#147C9E] hover:bg-[#E8F9FF] transition"
                title="Share"
                @click="showAlert('Post link copied to clipboard!')"
              >
                <PhShareNetwork :size="18" />
              </button>
            </div>
          </div>

          <!-- Comments Thread Section -->
          <div class="bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(28,118,155,.07)] space-y-6" style="border-radius: 20px 20px 64px 20px">
            <h3 class="text-xl font-extrabold text-[#1A1A28]">Team Discussion ({{ commentsList.length }})</h3>

            <div class="space-y-4">
              <div v-for="comm in commentsList" :key="comm.id" class="flex items-start gap-3 rounded-2xl bg-[#F8FCFF] p-4">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#33C4F0]/15 text-lg">{{ comm.avatar }}</span>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-extrabold text-[#1A1A28]">{{ comm.user }}</p>
                    <span class="text-xs text-[#717182]">{{ comm.time }}</span>
                  </div>
                  <p class="mt-1 text-sm text-[#525266]">{{ comm.text }}</p>
                </div>
              </div>
            </div>

            <form class="flex gap-3 pt-2" @submit.prevent="handleAddComment">
              <input
                v-model="newComment"
                type="text"
                placeholder="Add your thoughts or ask a question..."
                class="flex-1 rounded-full border border-[#33C4F0]/25 bg-[#F9FDFF] px-5 py-3 text-sm text-[#1A1A28] placeholder:text-[#717182] focus:outline-none focus:border-[#33C4F0]"
              />
              <button
                type="submit"
                :disabled="!newComment.trim()"
                class="rounded-full bg-[#1A1A28] px-6 py-3 text-xs font-extrabold text-white transition hover:bg-[#33C4F0] hover:text-[#1A1A28] disabled:opacity-40"
              >
                Post
              </button>
            </form>
          </div>
        </div>

        <!-- Right Sticky Sidebar Column -->
        <div class="space-y-6 lg:sticky lg:top-8 h-fit">
          <!-- Provider Spotlight Card -->
          <div class="bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#717182]">Provider Profile</p>
            <div class="mt-4 flex items-center gap-4">
              <div class="grid h-14 w-14 place-items-center rounded-2xl text-2xl shadow-sm" :style="{ background: `${brandColor}18` }">
                {{ post.emoji }}
              </div>
              <div>
                <h4 class="text-lg font-extrabold text-[#1A1A28]">{{ post.provider }}</h4>
                <p class="text-xs text-[#717182]">{{ post.authorRole || post.handle }}</p>
              </div>
            </div>
            <p class="mt-4 text-xs sm:text-sm text-[#717182] leading-relaxed">
              Trusted CreativeSelf partner providing curated wellbeing experiences for teams.
            </p>
            <NuxtLink
              to="/discover/providers"
              class="mt-5 inline-flex w-full items-center justify-center gap-1 rounded-full border border-[#33C4F0]/30 py-3 text-xs font-extrabold text-[#147C9E] transition hover:bg-[#E8F9FF]"
            >
              View Provider Profile
            </NuxtLink>
          </div>

          <!-- Action Card: Client Booking or Vendor Management -->
          <div
            v-if="!isVendorView"
            class="overflow-hidden bg-[#1A1A28] p-6 text-white shadow-2xl border-2 border-[#33C4F0]/40 relative"
            style="border-radius: 20px 20px 64px 20px"
          >
            <div v-if="bookingSent" class="py-6 text-center">
              <div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#10B981]/20 text-[#10B981]">
                <PhCheck :size="28" />
              </div>
              <h3 class="mt-4 text-xl font-extrabold">Booking Request Sent!</h3>
              <p class="mt-2 text-xs text-white/70">{{ post.provider }} will confirm availability for {{ selectedDate }}.</p>
              <button type="button" class="mt-5 rounded-full bg-[#33C4F0] px-5 py-2.5 text-xs font-extrabold text-[#1A1A28]" @click="bookingSent = false">
                Book Another Slot
              </button>
            </div>
            <template v-else>
              <div class="flex items-center justify-between">
                <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33C4F0]">Book Experience</p>
                <span class="rounded-full bg-[#33C4F0]/20 px-3 py-1 text-[10px] font-extrabold text-[#33C4F0]">Instant Request</span>
              </div>

              <h3 class="mt-2 text-2xl font-extrabold">Book this session</h3>
              <p class="mt-1 text-xs text-white/70 leading-relaxed">Select your preferred date &amp; team size to confirm availability.</p>

              <label class="mt-5 block text-xs font-extrabold text-white/70">PREFERRED DATE</label>
              <div class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="d in dates"
                  :key="d"
                  type="button"
                  class="rounded-full px-3.5 py-2 text-xs font-bold transition"
                  :style="{
                    background: selectedDate === d ? brandColor : 'rgba(255,255,255,0.1)',
                    color: selectedDate === d ? '#1A1A28' : '#ffffff',
                  }"
                  @click="selectedDate = d"
                >
                  {{ d }}
                </button>
              </div>

              <label class="mt-4 block text-xs font-extrabold text-white/70">ESTIMATED TEAM SIZE</label>
              <select
                v-model="teamSize"
                class="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white focus:outline-none"
              >
                <option class="text-[#1A1A28]">10 people</option>
                <option class="text-[#1A1A28]">15 people</option>
                <option class="text-[#1A1A28]">25 people</option>
              </select>

              <button
                type="button"
                class="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold text-white shadow-xl transition hover:scale-[1.02] active:scale-[0.98]"
                :style="{ background: brandColor }"
                @click="bookingSent = true"
              >
                <PhPaperPlaneRight :size="18" />
                {{ isCorporateView ? 'Book for Team Now' : 'Book Experience Now' }}
              </button>
            </template>
          </div>
          <div v-else class="bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)] space-y-4" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33C4F0]">Content Performance</p>
            <h3 class="text-xl font-extrabold text-[#1A1A28]">Provider Stats</h3>

            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-2xl bg-[#F8FCFF] p-3 border border-[#33C4F0]/15">
                <div class="flex items-center gap-1.5 text-xs font-bold text-[#717182]"><PhEye :size="14" /> Views</div>
                <p class="mt-1 text-xl font-extrabold text-[#1A1A28]">342</p>
              </div>
              <div class="rounded-2xl bg-[#F8FCFF] p-3 border border-[#33C4F0]/15">
                <div class="flex items-center gap-1.5 text-xs font-bold text-[#717182]"><PhCursorClick :size="14" /> Taps</div>
                <p class="mt-1 text-xl font-extrabold text-[#1A1A28]">28</p>
              </div>
            </div>

            <button
              type="button"
              class="mt-2 w-full rounded-full bg-[#1A1A28] py-3 text-xs font-extrabold text-white transition hover:bg-[#33C4F0] hover:text-[#1A1A28]"
              @click="navigateTo('/vendor/content')"
            >
              Manage in Content Studio
            </button>
          </div>

          <!-- Acumen AI Recommendation Cue -->
          <div class="border border-[#33C4F0]/25 bg-[#E8F9FF] p-6 text-[#1A1A28]" style="border-radius: 20px 20px 64px 20px">
            <div class="flex items-center gap-2 text-xs font-extrabold text-[#147C9E]">
              <PhSparkle :size="16" />
              Acumen AI Wellbeing Insight
            </div>
            <p class="mt-2 text-base font-extrabold leading-snug">Sessions like this boost team morale by 34%.</p>
            <p class="mt-2 text-xs leading-relaxed text-[#4F7180]">
              Mid-week creative breaks help prevent cognitive overload and encourage cross-functional bonding.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
