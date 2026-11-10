<script setup lang="ts">
import { computed } from 'vue';
import { PhCalendarBlank, PhPlus } from '@phosphor-icons/vue';

export type VendorWorkspacePage = 'services' | 'bookings' | 'insights';

const props = defineProps<{ page: VendorWorkspacePage }>();
const emit = defineEmits<{ newService: [] }>();
defineSlots<{ default?: () => unknown }>();

const title = computed(() =>
  props.page === 'services'
    ? 'Services that teams can say yes to.'
    : props.page === 'bookings'
      ? 'Your team moments, all in one place.'
      : 'See what your creative work is opening up.',
);
const eyebrow = computed(() =>
  props.page === 'services' ? 'Your service catalogue' : props.page === 'bookings' ? 'Bookings & delivery' : 'Marketplace insights',
);
const description = computed(() =>
  props.page === 'services'
    ? 'Keep your offers current, clear, and easy for teams to book.'
    : props.page === 'bookings'
      ? 'Respond to requests, prepare sessions, and keep delivery feeling effortless.'
      : 'A clear picture of how teams are finding, choosing, and returning to Studio Lumen.',
);
const nextMove = computed(() =>
  props.page === 'services' ? 'Make one offer shorter.' : props.page === 'bookings' ? 'Confirm the HiNote request.' : 'Lean into mid-week formats.',
);

const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);
const dayClass = (day: number) => {
  const confirmed = day === 8 || day === 16 || day === 21;
  const pending = day === 13;
  return [
    'grid h-7 place-items-center rounded-full text-xs font-bold',
    confirmed ? 'bg-[#33c4f0] text-[#1a1a28]' : pending ? 'bg-[#f59e0b]/25 text-[#9a5d00]' : 'text-[#414153]',
  ];
};
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <VendorRail :active="page" />
    <div
      class="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]"
    >
      <aside class="hidden lg:block">
        <VendorProfileCard />
      </aside>

      <main>
        <header class="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">{{ eyebrow }}</p>
              <h1 class="mt-2 text-3xl font-extrabold leading-tight">{{ title }}</h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-[#717182]">{{ description }}</p>
            </div>
            <button
              v-if="page === 'services'"
              type="button"
              class="inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-4 py-3 text-xs font-extrabold text-white"
              @click="emit('newService')"
            >
              <PhPlus :size="16" />New service
            </button>
          </div>
        </header>

        <slot />
      </main>

      <aside class="hidden lg:block">
        <div class="sticky top-8 space-y-5">
          <template v-if="page === 'bookings'">
            <div class="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style="border-radius: 20px 20px 64px 20px">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-extrabold">August 2024</p>
                  <p class="mt-1 text-xs text-[#717182]">Delivery calendar</p>
                </div>
                <PhCalendarBlank :size="18" class="text-[#33c4f0]" />
              </div>
              <div class="mt-5 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#9aa1ae]">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>
              <div class="mt-2 grid grid-cols-7 gap-1">
                <div v-for="day in calendarDays" :key="day" :class="dayClass(day)">{{ day }}</div>
              </div>
              <div class="mt-5 space-y-2 border-t border-[#33c4f0]/15 pt-4 text-xs font-bold text-[#717182]">
                <p><span class="mr-2 inline-block h-2 w-2 rounded-full bg-[#33c4f0]" />Confirmed sessions</p>
                <p><span class="mr-2 inline-block h-2 w-2 rounded-full bg-[#f59e0b]" />Needs response</p>
              </div>
            </div>
            <div class="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style="border-radius: 20px 20px 64px 20px">
              <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Response time</p>
              <p class="mt-3 text-3xl font-extrabold">2h 14m</p>
              <p class="mt-2 text-sm leading-6 text-[#717182]">Fast replies make it easier for teams to commit.</p>
            </div>
          </template>
          <div v-else class="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Provider health</p>
            <p class="mt-3 text-3xl font-extrabold">94%</p>
            <p class="mt-2 text-sm leading-6 text-[#717182]">Your listing and response quality are helping you appear in more matches.</p>
          </div>
          <div class="border border-[#33c4f0]/18 bg-[#e8f9ff] p-5 text-[#1a1a28]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#147c9e]">Next good move</p>
            <p class="mt-2 text-xl font-extrabold leading-tight">{{ nextMove }}</p>
            <p class="mt-3 text-sm leading-6 text-[#4f7180]">Acumen uses current marketplace behaviour to surface practical next steps.</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
