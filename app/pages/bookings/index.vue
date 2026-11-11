<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhCalendarBlank, PhCheck, PhClock, PhMapPin, PhMagnifyingGlass, PhUsers, PhPlus, PhLock } from '@phosphor-icons/vue';

interface UpcomingSession {
  id: string;
  title: string;
  provider: string;
  date: string;
  time: string;
  place: string;
  color: string;
  emoji: string;
  guests: string;
  isDynamic?: boolean;
}

interface PastSession {
  title: string;
  provider: string;
  date: string;
  color: string;
  emoji: string;
}

const defaultUpcoming: UpcomingSession[] = [
  {
    id: 'watercolour-without-perfection',
    title: 'Watercolour without perfection',
    provider: 'Studio Lumen · Heart of Art',
    date: 'Thursday, Aug 8',
    time: '3:00 PM · 90 min',
    place: 'Lumen Studio, Shoreditch',
    color: '#EF4444',
    emoji: '🎨',
    guests: 'Included in Basic Creative',
  },
];

const past: PastSession[] = [
  { title: 'The five-sense chocolate workshop', provider: 'Cocoa Collective · Chowdown', date: 'Tuesday, Jul 23', color: '#F59E0B', emoji: '🍫' },
  { title: 'Bring the energy back: rhythm lab', provider: 'The Rhythm Room · Moves & Grooves', date: 'Friday, Jul 12', color: '#8B5CF6', emoji: '💃' },
];

const sub = useSubscription();
const tab = ref<'upcoming' | 'past'>('upcoming');

// Modal State for Employee Invites / Slot Manager
const isSlotModalOpen = ref(false);
const selectedActivityForModal = ref({
  id: sub.selectedActivities[0]?.id || 'ceramic-pottery-workshop',
  name: sub.selectedActivities[0]?.name || 'Ceramic Pottery Workshop',
});

const handleOpenInviteModal = (actId: string, actName: string) => {
  if (!sub.isVendorConfirmed(actId)) return;
  selectedActivityForModal.value = { id: actId, name: actName };
  isSlotModalOpen.value = true;
};

// Format selected activities from subscription state into upcoming sessions
const allUpcoming = computed<UpcomingSession[]>(() => {
  const dynamicUpcoming: UpcomingSession[] = sub.selectedActivities.map((act) => ({
    id: act.id,
    title: act.name,
    provider: `${act.vendorName} · ${act.category}`,
    date: 'Confirmed for this month',
    time: act.duration,
    place: act.location,
    color: act.color || '#33C4F0',
    emoji: act.symbol || '🎨',
    guests: `Included in ${sub.planName}`,
    isDynamic: true,
  }));
  return [...dynamicUpcoming, ...defaultUpcoming.filter((d) => !dynamicUpcoming.some((dyn) => dyn.id === d.id))];
});

const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

const sessionStats = (actId: string) => {
  const isConfirmed = sub.isVendorConfirmed(actId);
  const activityInvites = sub.employeeInvites.filter((i) => i.activityId === actId && i.status !== 'Cancelled');
  const used = activityInvites.length;
  const capacity = sub.employeeSlotsPerActivity || 8;
  const percent = Math.min(100, Math.round((used / capacity) * 100));
  const going = activityInvites.filter((i) => i.status === 'Going').length;
  return { isConfirmed, used, capacity, percent, going };
};

const tabButtonClass = (value: 'upcoming' | 'past') => [
  'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition',
  tab.value === value ? 'bg-[#33c4f0] text-[#15343d] shadow-sm' : 'text-white/70 hover:bg-white/10 hover:text-white',
];
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <UniversalSidebar />

    <EmployeeSlotManagerModal
      :is-open="isSlotModalOpen"
      :activity-id="selectedActivityForModal.id"
      :activity-name="selectedActivityForModal.name"
      @close="isSlotModalOpen = false"
    />

    <div
      class="mx-auto grid max-w-[1320px] gap-6 px-5 pt-6 pb-28 sm:px-8 sm:pt-8 lg:gap-8 lg:py-10 lg:pb-14 lg:pl-[104px] lg:pr-10 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_260px]"
    >
      <aside class="hidden lg:block">
        <SubscriptionEntitlementHeader variant="sidebar" :show-logo="true" :hide-counters="true">
          <template #top>
            <div class="mt-3.5 space-y-1.5 border-t border-white/10 pt-3">
              <p class="text-[10px] font-bold uppercase tracking-[.14em] text-white/45 mb-1.5">Your Calendar View</p>
              <button type="button" :class="tabButtonClass('upcoming')" @click="tab = 'upcoming'">
                <span class="flex items-center gap-2"> <PhCalendarBlank :size="14" /> Upcoming </span>
                <span class="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black">{{ allUpcoming.length }}</span>
              </button>
              <button type="button" :class="tabButtonClass('past')" @click="tab = 'past'">
                <span class="flex items-center gap-2"> <PhCheck :size="14" /> Past sessions </span>
                <span class="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black">{{ past.length }}</span>
              </button>
            </div>
          </template>
        </SubscriptionEntitlementHeader>
      </aside>

      <main class="min-w-0">
        <!-- Mobile view subscription entitlement header -->
        <div class="lg:hidden mb-6">
          <SubscriptionEntitlementHeader variant="horizontal" />
        </div>

        <header class="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
          <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">Your creative calendar</p>
          <div class="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 class="text-3xl font-extrabold leading-tight">
                {{ tab === 'upcoming' ? 'Your Subscription Activities' : 'The moments you made time for' }}
              </h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-[#717182]">
                {{
                  tab === 'upcoming'
                    ? 'Activities selected as part of your Basic Creative monthly allowance.'
                    : 'A small record of creative time well spent.'
                }}
              </p>
            </div>
            <div class="rounded-full bg-[#e8f9ff] px-4 py-2 text-xs font-bold text-[#147c9e]">{{ allUpcoming.length }} sessions selected</div>
          </div>
        </header>

        <!-- Subscription Sessions List -->
        <div class="mt-6 space-y-4">
          <template v-if="tab === 'past'">
            <article
              v-for="session in past"
              :key="session.title"
              class="flex items-center gap-4 bg-white p-5 rounded-3xl border border-gray-100/80 shadow-sm"
            >
              <div class="grid h-12 w-12 place-items-center rounded-2xl text-xl shadow-sm border border-gray-100" :style="{ background: `${session.color}15` }">
                {{ session.emoji }}
              </div>
              <div>
                <p class="text-xs font-extrabold uppercase tracking-[.14em]" :style="{ color: session.color }">{{ session.date }}</p>
                <h2 class="mt-0.5 text-base font-extrabold text-gray-900">{{ session.title }}</h2>
                <p class="text-xs text-gray-500 font-medium">{{ session.provider }}</p>
              </div>
            </article>
          </template>

          <template v-else>
            <article
              v-for="session in allUpcoming"
              :key="session.title"
              class="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <!-- Top Header Row -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div
                    class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl shadow-sm border border-gray-100"
                    :style="{ background: `${session.color}15` }"
                  >
                    {{ session.emoji }}
                  </div>

                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-extrabold text-[#1a1a28] text-lg leading-snug">{{ session.title }}</h3>
                      <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-extrabold text-gray-700">{{ session.provider }}</span>
                    </div>

                    <div class="flex items-center gap-3 text-xs font-medium text-gray-500 mt-1 flex-wrap">
                      <span class="flex items-center gap-1 font-semibold text-gray-700">
                        <PhClock :size="13" class="text-[#33c4f0]" /> {{ session.time }}
                      </span>
                      <span>•</span>
                      <span class="flex items-center gap-1"> <PhMapPin :size="13" class="text-[#33c4f0]" /> {{ session.place }} </span>
                    </div>
                  </div>
                </div>

                <!-- Status & View Details -->
                <div class="flex items-center gap-3 shrink-0 sm:self-center">
                  <span
                    v-if="sessionStats(session.id).isConfirmed"
                    class="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-extrabold text-emerald-700"
                  >
                    <PhCheck :size="12" /> Confirmed by Vendor
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-extrabold text-amber-800"
                  >
                    <PhClock :size="12" /> Awaiting Confirmation
                  </span>

                  <NuxtLink
                    :to="session.id ? `/bookings/${session.id}` : '/bookings'"
                    class="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-center text-xs font-extrabold text-[#1a1a28] no-underline hover:bg-gray-50 transition"
                  >
                    View Details
                  </NuxtLink>

                  <button
                    v-if="session.isDynamic"
                    type="button"
                    class="text-[10px] font-bold text-rose-500 hover:underline px-1"
                    @click="sub.unselectActivity(session.id)"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <!-- Single-Row Capacity & Manage Invites Bar -->
              <div v-if="sub.planType === 'corporate'" class="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div class="flex flex-wrap items-center gap-x-3 gap-y-2 flex-1 min-w-0 sm:min-w-[240px]">
                  <div class="flex items-center gap-1.5 font-bold text-gray-800 shrink-0">
                    <PhUsers :size="14" class="text-[#147c9e]" />
                    <span>{{ sessionStats(session.id).used }}/{{ sessionStats(session.id).capacity }} Corporate Slots</span>
                    <span class="text-emerald-600 font-extrabold">({{ sessionStats(session.id).going }} Going)</span>
                  </div>

                  <div class="w-full sm:w-48 h-2 bg-gray-100 rounded-full overflow-hidden sm:shrink-0">
                    <div
                      :class="[
                        'h-full rounded-full transition-all',
                        !sessionStats(session.id).isConfirmed
                          ? 'bg-gray-300'
                          : sessionStats(session.id).percent >= 100
                            ? 'bg-amber-500'
                            : 'bg-gradient-to-r from-[#33c4f0] to-[#10b981]',
                      ]"
                      :style="{ width: sessionStats(session.id).isConfirmed ? `${sessionStats(session.id).percent}%` : '0%' }"
                    />
                  </div>
                </div>

                <button
                  v-if="sessionStats(session.id).isConfirmed"
                  type="button"
                  class="inline-flex items-center gap-1.5 rounded-full bg-cyan-50/80 hover:bg-cyan-100/80 px-3.5 py-1.5 text-xs font-extrabold text-[#147c9e] border border-cyan-200/60 transition shadow-sm shrink-0"
                  @click="handleOpenInviteModal(session.id, session.title)"
                >
                  <PhPlus :size="13" />
                  Manage Invites ({{ sessionStats(session.id).used }}/{{ sessionStats(session.id).capacity }})
                </button>
                <button
                  v-else
                  type="button"
                  disabled
                  title="Vendor confirmation pending."
                  class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-extrabold text-gray-400 border border-gray-200 shrink-0 cursor-not-allowed"
                >
                  <PhLock :size="13" />
                  Invites Locked
                </button>
              </div>
            </article>
          </template>
        </div>

        <NuxtLink
          to="/discover/services"
          class="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white no-underline transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
        >
          <PhMagnifyingGlass :size="16" /> Discover another experience
        </NuxtLink>
      </main>

      <aside class="min-w-0 lg:col-start-2 xl:col-start-auto">
        <div class="sticky top-8 bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-extrabold">August 2024</p>
              <p class="mt-1 text-xs text-[#717182]">Your booked moments</p>
            </div>
            <PhCalendarBlank :size="18" class="text-[#33c4f0]" />
          </div>
          <div class="mt-5 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#9aa1ae]">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
          <div class="mt-2 grid grid-cols-7 gap-1">
            <div
              v-for="day in calendarDays"
              :key="day"
              :class="[
                'grid h-7 place-items-center rounded-full text-xs font-bold',
                day === 8 || day === 14 ? 'bg-[#33c4f0] text-[#1a1a28]' : 'text-[#414153]',
              ]"
            >
              {{ day }}
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
