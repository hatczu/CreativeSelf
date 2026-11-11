<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  PhCaretLeft,
  PhHeart,
  PhShieldCheck,
  PhImages,
  PhCaretRight,
  PhClock,
  PhUsers,
  PhCheck,
  PhSparkle,
  PhChatCircle,
  PhPaperPlaneRight,
  PhBookmarkSimple,
  PhShareNetwork,
} from '@phosphor-icons/vue';
import type { MobileBooking, MobileComment, WizardBooking } from '~/data/clientMobileData';

const app = useClientMobileApp();

const selectedDate = ref('Thu, Aug 8');
const teamSize = ref('15 people');
const bookingSent = ref(false);
const shareToast = ref(false);
const showWizardModal = ref(false);

const dates = ['Thu, Aug 8', 'Tue, Aug 13', 'Fri, Aug 16'];
const defaultComments: MobileComment[] = [
  { id: 'c1', user: 'Sophia Lin', avatar: '👩‍🎨', time: '2h ago', text: 'This session looks absolutely incredible! Can wait for next week.' },
  { id: 'c2', user: 'Marcus Vance', avatar: '🧘‍♂️', time: '5h ago', text: 'Loved the ceramic grounding technique. High quality instruction!' },
];

const post = computed(() => app.selectedPost);
const isLiked = computed(() => !!post.value && app.likedPostIds.includes(post.value.id));
const isSaved = computed(() => !!post.value && app.savedPostIds.includes(post.value.id));
const brandColor = computed(() => post.value?.color || '#33C4F0');

const postImages = computed(() => {
  const p = post.value;
  if (!p) return [];
  return p.images && p.images.length > 0 ? p.images : p.image ? [p.image] : [];
});
const safeIndex = computed(() => app.postDetailImgIdx % (postImages.value.length || 1));

const commentCount = computed(() => {
  const p = post.value;
  if (!p) return 0;
  return app.postDetailComments[p.id]?.length ?? (p.commentsList?.length || p.comments || 0);
});
const comments = computed<MobileComment[]>(() => {
  const p = post.value;
  if (!p) return [];
  return app.postDetailComments[p.id] || p.commentsList || defaultComments;
});

const labelColor = (label: string) => (label === 'Published' ? '#10b981' : label === 'Scheduled' ? '#33c4f0' : '#f59e0b');

const closePost = () => {
  app.selectedPost = null;
  app.postDetailImgIdx = 0;
  bookingSent.value = false;
};

const prevImage = () => {
  app.postDetailImgIdx = safeIndex.value === 0 ? postImages.value.length - 1 : safeIndex.value - 1;
};
const nextImage = () => {
  app.postDetailImgIdx = safeIndex.value === postImages.value.length - 1 ? 0 : safeIndex.value + 1;
};

const handleConfirmSessionBooking = () => {
  const p = post.value;
  if (!p) return;
  const newBooking: MobileBooking = {
    id: `bk-${Date.now()}`,
    activityName: p.title,
    vendorName: p.provider,
    date: selectedDate.value,
    time: '2:00 PM - 3:30 PM',
    location: 'Creative Hub • Studio 4B',
    status: 'Confirmed',
    seats: teamSize.value.includes('10') ? 10 : teamSize.value.includes('25') ? 25 : 15,
    color: brandColor.value,
    symbol: p.emoji || '✨',
    qrCode: `CS-PASS-${Date.now()}`,
    image: p.image || '',
  };
  app.myBookings = [newBooking, ...app.myBookings];
  bookingSent.value = true;
  app.bookingSuccessMsg = `Successfully booked "${p.title}" for ${selectedDate.value}!`;
};

const handleWizardComplete = (booking: WizardBooking) => {
  app.myBookings = [booking, ...app.myBookings];
  bookingSent.value = true;
  app.flash(`Successfully booked "${booking.activityName}" for ${booking.date}!`);
};

const handleShareClick = () => {
  shareToast.value = true;
  setTimeout(() => (shareToast.value = false), 3000);
};

const viewProvider = () => {
  const p = post.value;
  if (!p) return;
  app.selectedPost = null;
  app.setSelectedBrandId(p.provider.toLowerCase().replace(/\s+/g, '-'));
  app.setActiveTab('discover');
};

const handleAddComment = () => {
  const p = post.value;
  if (!p || !app.postDetailCommentText.trim()) return;
  const currentList = app.postDetailComments[p.id] || p.commentsList || defaultComments;
  app.postDetailComments = {
    ...app.postDetailComments,
    [p.id]: [
      ...currentList,
      { id: `cm-${Date.now()}`, user: app.regName || 'Alex Morgan', avatar: '✨', time: 'Just now', text: app.postDetailCommentText.trim() },
    ],
  };
  app.postDetailCommentText = '';
};
</script>

<template>
  <!-- FULL PAGE VIEW: POST DETAIL SCREEN -->
  <AnimatePresence>
    <Motion
      v-if="post"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: 20 }"
      class="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <!-- Sticky Top Header Navigation -->
      <div class="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-brand-sm transition"
          @click="closePost"
        >
          <PhCaretLeft :size="16" weight="bold" /> Back to Feed
        </button>

        <div class="flex items-center gap-2">
          <span class="text-[10px] font-bold text-[#147C9E] bg-[#E8F9FF] px-2.5 py-1 rounded-brand-sm uppercase tracking-wider">{{ post.category }}</span>
          <span v-if="post.label" class="text-[9px] font-extrabold uppercase text-white px-2 py-0.5 rounded-brand-sm" :style="{ background: labelColor(post.label) }">
            {{ post.label }}
          </span>
        </div>
      </div>

      <!-- Notification Toast for Share -->
      <div v-if="shareToast" class="bg-[#1A1A28] text-white text-xs font-bold px-4 py-2 text-center sticky top-[53px] z-30 animate-pulse">
        🔗 Link copied to clipboard!
      </div>

      <!-- Scrollable Content Body -->
      <div class="pb-24 flex-1 space-y-4 divide-y divide-slate-100">
        <!-- Header & Hero Image Section -->
        <div class="p-4 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-xs" :style="{ background: `${brandColor}18` }">
                {{ post.emoji }}
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <p class="text-xs font-extrabold text-[#1A1A28]">{{ post.provider }}</p>
                  <PhShieldCheck :size="14" class="text-[#33C4F0]" weight="fill" />
                </div>
                <p class="text-[10px] text-[#717182]">
                  {{ post.handle || `@${post.provider.toLowerCase().replace(/\s+/g, '')}` }} • {{ post.date || 'Today' }}
                </p>
              </div>
            </div>

            <span class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-brand-sm">3 min read</span>
          </div>

          <h1 class="text-xl font-black text-slate-900 leading-snug tracking-tight pt-1">{{ post.title }}</h1>

          <!-- Interactive Multi-Photo Carousel -->
          <div v-if="postImages.length > 0" class="space-y-2 pt-1">
            <div class="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 shadow-xs" style="border-radius: 24px 24px 64px 24px">
              <img :src="postImages[safeIndex]" :alt="post.title" class="w-full h-full object-cover transition-all duration-300" />

              <template v-if="postImages.length > 1">
                <div class="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-brand-sm flex items-center gap-1">
                  <PhImages :size="12" />
                  <span>Photo {{ safeIndex + 1 }} of {{ postImages.length }}</span>
                </div>

                <button
                  type="button"
                  class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-brand-sm bg-white/90 text-[#1A1A28] shadow-md flex items-center justify-center hover:bg-white transition"
                  aria-label="Previous image"
                  @click="prevImage"
                >
                  <PhCaretLeft :size="16" weight="bold" />
                </button>
                <button
                  type="button"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-brand-sm bg-white/90 text-[#1A1A28] shadow-md flex items-center justify-center hover:bg-white transition"
                  aria-label="Next image"
                  @click="nextImage"
                >
                  <PhCaretRight :size="16" weight="bold" />
                </button>
              </template>
            </div>

            <!-- Clickable Thumbnail Strip -->
            <div v-if="postImages.length > 1" class="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <button
                v-for="(imgUrl, idx) in postImages"
                :key="idx"
                type="button"
                :class="[
                  'relative h-12 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition',
                  safeIndex === idx ? 'border-[#33C4F0] scale-105 shadow-2xs' : 'border-transparent opacity-60 hover:opacity-100',
                ]"
                @click="app.postDetailImgIdx = idx"
              >
                <img :src="imgUrl" :alt="`Thumb ${idx + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </div>

        <!-- Story Narrative Section -->
        <div class="p-4 space-y-2.5">
          <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0] block">The Story Behind the Session</span>
          <p class="text-sm font-bold text-slate-900 leading-relaxed">{{ post.copy }}</p>

          <div v-if="post.fullStory" class="text-xs text-slate-600 leading-relaxed whitespace-pre-line pt-2 border-t border-slate-50">{{ post.fullStory }}</div>

          <div class="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-extrabold">
            <span v-if="post.duration" class="rounded-brand-sm bg-[#F2FBFE] px-3 py-1.5 text-[#147C9E] flex items-center gap-1.5">
              <PhClock :size="14" />
              {{ post.duration }}
            </span>
            <span v-if="post.seats" class="rounded-brand-sm bg-[#F2FBFE] px-3 py-1.5 text-[#147C9E] flex items-center gap-1.5">
              <PhUsers :size="14" />
              {{ post.seats }}
            </span>
            <span v-if="post.service" class="rounded-brand-sm bg-[#E8F9FF] px-3 py-1.5 text-[#147C9E]">🎨 Service: {{ post.service }}</span>
          </div>
        </div>

        <!-- Experience Highlights -->
        <div v-if="post.highlights && post.highlights.length > 0" class="p-4 space-y-2.5">
          <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E] block">What Makes This Experience Special</span>
          <div class="space-y-2 pt-1">
            <div v-for="(highlight, index) in post.highlights" :key="index" class="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <span class="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58] mt-0.5">
                <PhCheck :size="12" weight="bold" />
              </span>
              <span class="text-xs font-semibold text-slate-800 leading-tight">{{ highlight }}</span>
            </div>
          </div>
        </div>

        <!-- Photo Gallery Mosaic Grid -->
        <div v-if="postImages.length > 1" class="p-4 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0] block">Photo Gallery</span>
              <h3 class="text-sm font-extrabold text-slate-900">A Glimpse Into the Moment</h3>
            </div>
            <span class="text-[10px] font-extrabold text-[#147C9E] bg-[#E8F9FF] px-2.5 py-1 rounded-brand-sm">{{ postImages.length }} Photos</span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="(imgUrl, index) in postImages"
              :key="index"
              class="group cursor-pointer overflow-hidden rounded-2xl bg-slate-100 h-32 relative border border-slate-100"
              @click="app.postDetailImgIdx = index"
            >
              <img :src="imgUrl" :alt="`Gallery photo ${index + 1}`" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div class="absolute inset-0 bg-[#1A1A28]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="rounded-brand-sm bg-white/90 px-3 py-1 text-[10px] font-extrabold text-[#1A1A28] shadow-md backdrop-blur">View Photo</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Engagement & Community Action Bar -->
        <div class="p-4 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-4">
            <button
              type="button"
              :class="['flex items-center gap-1.5 text-xs font-extrabold transition', isLiked ? 'text-[#EF4444]' : 'text-slate-600 hover:text-slate-900']"
              @click="app.toggleLikePost(post.id)"
            >
              <PhHeart :size="18" :weight="isLiked ? 'fill' : 'bold'" />
              <span>{{ post.likes + (isLiked ? 1 : 0) }}</span>
            </button>

            <div class="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <PhChatCircle :size="18" weight="bold" />
              <span>{{ commentCount }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              :class="[
                'flex items-center gap-1 px-3 py-1.5 rounded-brand-sm border text-xs font-extrabold transition',
                isSaved ? 'bg-[#E8F9FF] border-[#33C4F0] text-[#147C9E]' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100',
              ]"
              @click="app.toggleSavePost(post.id)"
            >
              <PhBookmarkSimple :size="15" :weight="isSaved ? 'fill' : 'bold'" />
              <span>{{ isSaved ? 'Saved' : 'Save' }}</span>
            </button>

            <button type="button" class="p-2 rounded-brand bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition" title="Share post" @click="handleShareClick">
              <PhShareNetwork :size="16" weight="bold" />
            </button>
          </div>
        </div>

        <!-- Provider Profile Spotlight Card -->
        <div class="p-4">
          <div class="bg-white p-4 border border-slate-100 shadow-xs space-y-3" style="border-radius: 20px 20px 48px 20px">
            <p class="text-[10px] font-extrabold uppercase tracking-widest text-[#717182]">Provider Profile</p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs" :style="{ background: `${brandColor}18` }">{{ post.emoji }}</div>
              <div>
                <h4 class="text-sm font-extrabold text-[#1A1A28]">{{ post.provider }}</h4>
                <p class="text-[11px] text-[#717182]">{{ post.authorRole || post.handle }}</p>
              </div>
            </div>

            <p class="text-xs text-[#717182] leading-relaxed">
              Trusted CreativeSelf partner providing curated wellbeing experiences for individuals and corporate teams.
            </p>

            <button
              type="button"
              class="w-full py-2.5 rounded-brand-sm border border-[#33C4F0]/30 text-xs font-extrabold text-[#147C9E] bg-[#F2FBFE] hover:bg-[#E8F9FF] transition text-center"
              @click="viewProvider"
            >
              View Provider Profile
            </button>
          </div>
        </div>

        <!-- Acumen AI Wellbeing Insight -->
        <div class="px-4 py-2">
          <div class="border border-[#33C4F0]/30 bg-[#E8F9FF] p-4 text-[#1A1A28]" style="border-radius: 20px 20px 48px 20px">
            <div class="flex items-center gap-1.5 text-xs font-extrabold text-[#147C9E]">
              <PhSparkle :size="16" weight="fill" />
              Acumen AI Wellbeing Insight
            </div>
            <p class="mt-1 text-sm font-extrabold leading-snug">Sessions like this boost team morale by 34%.</p>
            <p class="mt-1 text-xs leading-relaxed text-[#4F7180]">
              Mid-week creative breaks help prevent cognitive overload and encourage cross-functional bonding.
            </p>
          </div>
        </div>

        <!-- Interactive Session Booking Section -->
        <div class="p-4 space-y-3">
          <div class="bg-[#1A1A28] p-5 text-white shadow-xl relative overflow-hidden" style="border-radius: 20px 20px 56px 20px">
            <div v-if="bookingSent" class="py-4 text-center space-y-3">
              <div class="mx-auto w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center">
                <PhCheck :size="24" weight="bold" />
              </div>
              <h3 class="text-base font-extrabold">Booking Request Sent!</h3>
              <p class="text-xs text-white/70">{{ post.provider }} will confirm availability for {{ selectedDate }}. Added to your Bookings tab.</p>
              <button type="button" class="rounded-brand-sm bg-[#33C4F0] px-4 py-2 text-xs font-extrabold text-[#1A1A28]" @click="bookingSent = false">
                Book Another Slot
              </button>
            </div>
            <template v-else>
              <div class="flex items-center justify-between">
                <p class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">Book Experience</p>
                <span class="rounded-brand-sm bg-[#33C4F0]/20 px-2.5 py-0.5 text-[9px] font-extrabold text-[#33C4F0]">Instant Request</span>
              </div>

              <h3 class="mt-1 text-lg font-extrabold">Book this session</h3>
              <p class="text-xs text-white/70 leading-relaxed">Select your preferred date &amp; team size to confirm availability.</p>

              <label class="mt-4 block text-[10px] font-extrabold text-white/70 uppercase tracking-wider">PREFERRED DATE</label>
              <div class="mt-1.5 flex flex-wrap gap-2">
                <button
                  v-for="d in dates"
                  :key="d"
                  type="button"
                  class="rounded-brand-sm px-3 py-1.5 text-xs font-bold transition"
                  :style="{
                    background: selectedDate === d ? brandColor : 'rgba(255, 255, 255, 0.1)',
                    color: selectedDate === d ? '#1A1A28' : '#FFFFFF',
                  }"
                  @click="selectedDate = d"
                >
                  {{ d }}
                </button>
              </div>

              <label class="mt-3 block text-[10px] font-extrabold text-white/70 uppercase tracking-wider">ESTIMATED TEAM SIZE</label>
              <select
                v-model="teamSize"
                class="mt-1.5 w-full rounded-brand border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white focus:outline-none"
              >
                <option class="text-[#1A1A28]">10 people</option>
                <option class="text-[#1A1A28]">15 people</option>
                <option class="text-[#1A1A28]">25 people</option>
              </select>

              <button
                type="button"
                class="mt-5 w-full py-3 text-xs font-extrabold rounded-brand-sm text-white shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                :style="{ background: brandColor }"
                @click="handleConfirmSessionBooking"
              >
                <PhPaperPlaneRight :size="16" weight="bold" />
                Quick Reserve Session
              </button>

              <div class="pt-2 text-center">
                <button
                  type="button"
                  class="w-full py-2.5 bg-white/10 hover:bg-white/20 text-[#33C4F0] border border-[#33C4F0]/40 text-xs font-extrabold rounded-brand-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                  @click="showWizardModal = true"
                >
                  <PhSparkle :size="15" weight="fill" />
                  Customize Flow: Date Range, Team Range &amp; Bulk Invites →
                </button>
              </div>
            </template>
          </div>
        </div>

        <!-- ENHANCED BOOKING FLOW WIZARD MODAL -->
        <MobileBookingWizardModal
          :is-open="showWizardModal"
          :title="post.title"
          :provider="post.provider"
          :symbol="post.emoji"
          :image="post.image"
          :color="brandColor"
          @close="showWizardModal = false"
          @complete-booking="handleWizardComplete"
        />

        <!-- Interactive Comments Section -->
        <div class="p-4 space-y-3">
          <div class="flex items-center justify-between pb-1">
            <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
              <PhChatCircle :size="18" class="text-[#33C4F0]" weight="bold" />
              Team Discussion ({{ commentCount }})
            </h3>
          </div>

          <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
            <div v-for="c in comments" :key="c.id" class="flex items-start gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span class="text-lg shrink-0">{{ c.avatar || '👤' }}</span>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-[11px] font-bold text-[#1A1A28]">{{ c.user }}</p>
                  <span class="text-[9px] text-[#717182]">{{ c.time }}</span>
                </div>
                <p class="text-xs text-[#525266] mt-0.5 leading-snug">{{ c.text }}</p>
              </div>
            </div>
          </div>

          <form class="flex items-center gap-2 pt-2 border-t border-slate-100" @submit.prevent="handleAddComment">
            <input
              v-model="app.postDetailCommentText"
              type="text"
              placeholder="Add a comment..."
              class="flex-1 px-3.5 py-2.5 bg-slate-100 rounded-brand-sm text-xs font-medium text-[#1A1A28] focus:outline-none focus:bg-white border border-transparent focus:border-[#33C4F0]"
            />
            <button type="submit" class="p-2.5 bg-[#33C4F0] text-white rounded-brand hover:bg-[#1AB0DC] transition shadow-xs shrink-0">
              <PhPaperPlaneRight :size="14" weight="bold" />
            </button>
          </form>
        </div>
      </div>
    </Motion>
  </AnimatePresence>
</template>
