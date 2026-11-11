<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhCaretLeft, PhClock, PhMapPin, PhUsers, PhCheck, PhXCircle, PhPlus, PhLock, PhInfo } from '@phosphor-icons/vue';
import { mockActivities } from '~/data/subscriptionData';
import type { ActivityItem } from '~/types/subscription';

const route = useRoute();
const sub = useSubscription();
const bookingId = computed(() => route.params.bookingId as string);

const isSlotModalOpen = ref(false);

const fallbackActivity = computed<ActivityItem>(() => ({
  id: bookingId.value || 'ceramic-pottery-workshop',
  name: 'Watercolour without perfection',
  vendorId: 'studio-lumen',
  vendorName: 'Studio Lumen',
  category: 'Heart of Art',
  duration: '90 min',
  location: 'Lumen Studio, Shoreditch',
  description:
    'Designed to help individuals re-engage their creative intuition without the pressure of perfection. Explore color flows and wet-on-wet brush techniques.',
  color: '#EF4444',
  symbol: '🎨',
  image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1200&q=80',
  highlights: [
    'Guided watercolor blending techniques',
    'High quality cold-press paper & paints included',
    'Calming studio ambiance with herbal teas',
    'Take home your finished mounted artwork',
  ],
  whatToExpect: [
    { time: '00:00 - 00:15', title: 'Color Theory & Brush Warmup', detail: 'Exploring wet-on-wet wash and paint ratios.' },
    { time: '00:15 - 01:15', title: 'Guided Painting Session', detail: 'Creating your intuitive watercolor piece.' },
    { time: '01:15 - 01:30', title: 'Matting & Studio Showcase', detail: 'Frame mounting and drying time.' },
  ],
  requirements: ['No prior painting experience required.'],
  whatToBring: ['All materials are provided by the studio.'],
}));

// 1. user's selected activities, 2. global mock activities, 3. fallback default booking details
const activity = computed<ActivityItem>(
  () =>
    sub.selectedActivities.find((a) => a.id === bookingId.value) ||
    mockActivities.find((a) => a.id === bookingId.value) ||
    fallbackActivity.value,
);

const actId = computed(() => activity.value.id);
const isConfirmed = computed(() => sub.isVendorConfirmed(actId.value));
const invites = computed(() => sub.getInvitesForActivity(actId.value));
const capacity = computed(() => sub.employeeSlotsPerActivity || 8);
const usedCount = computed(() => invites.value.length);
const percent = computed(() => Math.min(100, Math.round((usedCount.value / capacity.value) * 100)));
const goingCount = computed(() => invites.value.filter((i) => i.status === 'Going').length);
const pendingCount = computed(() => invites.value.filter((i) => i.status === 'Pending').length);
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <UniversalSidebar />

    <EmployeeSlotManagerModal :is-open="isSlotModalOpen" :activity-id="actId" :activity-name="activity.name" @close="isSlotModalOpen = false" />

    <div class="mx-auto grid max-w-[1320px] gap-6 px-5 pt-6 pb-28 sm:px-8 sm:pt-8 lg:gap-8 lg:py-10 lg:pb-14 lg:pl-[104px] lg:pr-10 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_300px]">
      <!-- Left Sidebar Navigation -->
      <aside class="hidden lg:block">
        <SubscriptionEntitlementHeader variant="sidebar" :show-logo="true" :hide-counters="true">
          <template #top>
            <div class="mt-3.5 space-y-1.5 border-t border-white/10 pt-3">
              <NuxtLink
                to="/bookings"
                class="flex w-full items-center gap-2 rounded-brand bg-white/10 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
              >
                <PhCaretLeft :size="16" /> Back to Bookings
              </NuxtLink>
            </div>
          </template>
        </SubscriptionEntitlementHeader>
      </aside>

      <!-- Main Content Area -->
      <main class="min-w-0 space-y-6">
        <!-- Breadcrumb & Navigation -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-xs font-bold text-gray-500">
            <NuxtLink to="/bookings" class="hover:text-cyan-600 transition flex items-center gap-1"> <PhCaretLeft :size="14" /> Bookings </NuxtLink>
            <span>/</span>
            <span class="text-gray-900 font-extrabold truncate max-w-[280px] sm:max-w-md">{{ activity.name }}</span>
          </div>

          <!-- Vendor Status Badge -->
          <span
            v-if="isConfirmed"
            class="inline-flex items-center gap-1.5 rounded-brand-sm bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-extrabold text-emerald-700 shadow-sm"
          >
            <PhCheck :size="14" /> Confirmed by Vendor
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1.5 rounded-brand-sm bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-extrabold text-amber-800 shadow-sm"
          >
            <PhClock :size="14" /> Awaiting Vendor Confirmation
          </span>
        </div>

        <!-- Hero Banner Card -->
        <div class="overflow-hidden bg-white shadow-[0_16px_42px_rgba(28,118,155,.08)] border border-gray-100/80" style="border-radius: 24px 24px 64px 24px">
          <div v-if="activity.image" class="relative h-56 sm:h-72 w-full overflow-hidden bg-gray-900">
            <ImageWithFallback :src="activity.image" :alt="activity.name" class="h-full w-full object-cover opacity-90" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div class="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <span
                class="inline-flex items-center gap-1.5 rounded-brand-sm px-3 py-1 text-xs font-extrabold text-white shadow-md backdrop-blur-md"
                :style="{ backgroundColor: `${activity.color || '#33c4f0'}` }"
              >
                <span>{{ activity.symbol || '🎨' }}</span> {{ activity.category }}
              </span>
              <span class="rounded-brand-sm bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-extrabold text-gray-900 shadow-md">
                Included in {{ sub.planName }}
              </span>
            </div>
          </div>

          <div class="p-6 sm:p-8">
            <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">{{ activity.vendorName }}</p>
            <h1 class="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1a1a28] leading-tight">{{ activity.name }}</h1>

            <!-- Quick Info Grid -->
            <div class="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-gray-100 py-4 text-xs font-medium text-gray-600">
              <div class="flex items-center gap-2">
                <div class="p-2 rounded-xl bg-cyan-50 text-[#33c4f0]"><PhClock :size="16" /></div>
                <div>
                  <span class="block text-[10px] font-extrabold uppercase text-gray-400">Duration</span>
                  <span class="font-extrabold text-gray-800">{{ activity.duration }}</span>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <div class="p-2 rounded-xl bg-cyan-50 text-[#33c4f0]"><PhMapPin :size="16" /></div>
                <div>
                  <span class="block text-[10px] font-extrabold uppercase text-gray-400">Location</span>
                  <span class="font-extrabold text-gray-800">{{ activity.location }}</span>
                </div>
              </div>

              <div class="col-span-2 sm:col-span-1 flex items-center gap-2">
                <div class="p-2 rounded-xl bg-cyan-50 text-[#33c4f0]"><PhUsers :size="16" /></div>
                <div>
                  <span class="block text-[10px] font-extrabold uppercase text-gray-400">Capacity</span>
                  <span class="font-extrabold text-gray-800">{{ usedCount }}/{{ capacity }} Corporate Slots</span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mt-6 space-y-4">
              <h3 class="text-sm font-extrabold uppercase tracking-wider text-gray-900">About This Experience</h3>
              <p class="text-sm leading-relaxed text-[#717182]">{{ activity.description }}</p>
            </div>

            <!-- Highlights -->
            <div v-if="activity.highlights && activity.highlights.length > 0" class="mt-6 space-y-3">
              <h4 class="text-xs font-extrabold uppercase tracking-wider text-gray-900">Session Highlights</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div
                  v-for="(item, idx) in activity.highlights"
                  :key="idx"
                  class="flex items-start gap-2 text-xs font-semibold text-gray-700 bg-cyan-50/50 p-2.5 rounded-xl border border-cyan-100/60"
                >
                  <PhCheck :size="14" class="text-cyan-600 shrink-0 mt-0.5" />
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline / What to Expect -->
        <div v-if="activity.whatToExpect && activity.whatToExpect.length > 0" class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100/80 shadow-sm space-y-4">
          <h3 class="text-base font-extrabold text-[#1a1a28] flex items-center gap-2">
            <PhClock :size="18" class="text-[#33c4f0]" />
            What to Expect During the Session
          </h3>
          <div class="space-y-3 pt-2">
            <div v-for="(step, i) in activity.whatToExpect" :key="i" class="flex items-start gap-4 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
              <span class="shrink-0 rounded-lg bg-cyan-100 px-2.5 py-1 font-mono text-xs font-bold text-cyan-800">{{ step.time }}</span>
              <div>
                <h4 class="text-xs font-extrabold text-gray-900">{{ step.title }}</h4>
                <p class="text-xs text-gray-600 mt-0.5">{{ step.detail }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Requirements & Venue -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="bg-[#ffffff] p-6 rounded-3xl border border-gray-100/80 shadow-sm space-y-3">
            <h3 class="text-sm font-extrabold text-[#1a1a28] flex items-center gap-2">
              <PhInfo :size="16" class="text-[#33c4f0]" />
              What to Bring
            </h3>
            <ul class="text-xs text-gray-600 space-y-2 list-disc pl-4">
              <template v-if="activity.whatToBring && activity.whatToBring.length > 0">
                <li v-for="(item, idx) in activity.whatToBring" :key="idx">{{ item }}</li>
              </template>
              <li v-else>All materials and gear are fully supplied by the host studio.</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm space-y-3">
            <h3 class="text-sm font-extrabold text-[#1a1a28] flex items-center gap-2">
              <PhMapPin :size="16" class="text-[#33c4f0]" />
              Venue &amp; Location
            </h3>
            <p class="text-xs font-bold text-gray-900">{{ activity.location }}</p>
            <p class="text-xs text-gray-500">
              Please arrive 10 minutes prior to session start time. Present your booking confirmation or invite code upon
              check-in.
            </p>
          </div>
        </div>
      </main>

      <!-- Right Card: Members & Invites Status -->
      <aside class="min-w-0 space-y-6 lg:col-start-2 xl:col-start-auto">
        <div
          class="bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)] border border-gray-100/80 space-y-5 sticky top-8"
          style="border-radius: 24px 24px 64px 24px"
        >
          <!-- Right Card Header -->
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33c4f0]">Team Invites Roster</span>
              <span class="rounded-brand-sm bg-cyan-50 px-2.5 py-0.5 text-[10px] font-black text-[#147c9e]">
                {{ sub.planType === 'corporate' ? 'Corporate Slots' : 'Personal Slot' }}
              </span>
            </div>
            <h3 class="text-lg font-extrabold text-[#1a1a28] mt-1">Invited Members &amp; Status</h3>
          </div>

          <!-- Corporate Slot Capacity Progress Bar -->
          <div v-if="sub.planType === 'corporate'" class="p-4 rounded-2xl bg-[#f4fbfe] border border-cyan-100/80 space-y-2">
            <div class="flex items-center justify-between text-xs font-extrabold">
              <span class="text-gray-800 flex items-center gap-1.5">
                <PhUsers :size="15" class="text-[#147c9e]" />
                Slots Allocated
              </span>
              <span class="text-[#147c9e]">{{ usedCount }} / {{ capacity }}</span>
            </div>

            <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                :class="[
                  'h-full rounded-full transition-all',
                  !isConfirmed ? 'bg-gray-300' : percent >= 100 ? 'bg-amber-500' : 'bg-gradient-to-r from-[#33c4f0] to-[#10b981]',
                ]"
                :style="{ width: `${percent}%` }"
              />
            </div>

            <div class="flex items-center justify-between text-[11px] font-bold text-gray-500 pt-0.5">
              <span class="text-emerald-700 font-extrabold">✓ {{ goingCount }} Confirmed</span>
              <span class="text-amber-700 font-extrabold">⌛ {{ pendingCount }} Pending</span>
            </div>
          </div>

          <!-- Member List with Confirmation Status -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-xs font-extrabold uppercase tracking-wider text-gray-700">Assigned Team ({{ invites.length }})</h4>
            </div>

            <div v-if="invites.length === 0" class="p-5 text-center bg-gray-50/80 border border-dashed border-gray-200 rounded-2xl space-y-2">
              <PhUsers :size="24" class="mx-auto text-gray-400" />
              <p class="text-xs font-bold text-gray-700">No members invited yet</p>
              <p class="text-[11px] text-gray-500">
                Invite colleagues from your corporate account to fill your allocated slots for this activity.
              </p>
            </div>
            <div v-else class="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              <div
                v-for="inv in invites"
                :key="inv.id"
                class="p-3.5 rounded-2xl border border-gray-100 bg-white hover:border-cyan-200/80 hover:shadow-sm transition-all space-y-2"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2.5">
                    <div
                      class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-100 to-blue-200 text-[#147c9e] font-extrabold text-xs flex items-center justify-center shrink-0 border border-cyan-200/50"
                    >
                      {{ inv.employeeName.charAt(0) }}
                    </div>
                    <div>
                      <p class="text-xs font-extrabold text-gray-900 leading-tight">{{ inv.employeeName }}</p>
                      <p class="text-[10px] text-gray-500 truncate max-w-[140px]">{{ inv.employeeEmail }}</p>
                    </div>
                  </div>

                  <!-- Explicit Confirmation Status Badge -->
                  <span
                    v-if="inv.status === 'Going'"
                    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-brand-sm text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0"
                  >
                    <PhCheck :size="11" /> Confirmed
                  </span>
                  <span
                    v-else-if="inv.status === 'Pending'"
                    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-brand-sm text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 shrink-0"
                  >
                    <PhClock :size="11" /> Pending
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-brand-sm text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200 shrink-0"
                  >
                    <PhXCircle :size="11" /> Declined
                  </span>
                </div>

                <!-- Additional Info Row -->
                <div class="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-gray-100">
                  <span class="font-medium">{{ inv.department || 'Corporate Member' }}</span>
                  <code class="bg-gray-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-gray-700">{{ inv.inviteCode }}</code>
                </div>
              </div>
            </div>
          </div>

          <!-- Manage Invites Button -->
          <div class="pt-2 border-t border-gray-100">
            <button
              v-if="isConfirmed"
              type="button"
              class="w-full py-3 px-4 rounded-brand bg-gradient-to-r from-[#33c4f0] to-[#147c9e] hover:from-[#2ab2dc] hover:to-[#0f6885] text-white font-extrabold text-xs shadow-md shadow-cyan-300/30 transition flex items-center justify-center gap-2"
              @click="isSlotModalOpen = true"
            >
              <PhPlus :size="16" />
              Manage Invites ({{ usedCount }}/{{ capacity }})
            </button>
            <button
              v-else
              type="button"
              class="w-full py-3 px-4 rounded-brand bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs border border-gray-200 transition flex items-center justify-center gap-2"
              @click="isSlotModalOpen = true"
            >
              <PhLock :size="15" class="text-amber-600" />
              Manage Invites (Pending Vendor)
            </button>
            <p class="text-[10px] text-center text-gray-400 mt-2 font-medium">
              {{
                isConfirmed
                  ? 'Send email invitations or re-assign available corporate slots.'
                  : 'Invites are locked until the vendor confirms session availability.'
              }}
            </p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
