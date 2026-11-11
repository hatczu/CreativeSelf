<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhCaretLeft, PhCheck, PhClock, PhMapPin, PhUsers, PhQrCode, PhShareNetwork, PhShieldCheck, PhCalendarPlus, PhTrash, PhCaretRight } from '@phosphor-icons/vue';

const app = useClientMobileApp();

const toastMsg = ref<string | null>(null);
const showCancelModal = ref(false);
const showRosterPage = ref(false);

const booking = computed(() => app.selectedBooking);
const brandColor = computed(() => booking.value?.color || '#33C4F0');

const showToast = (msg: string) => {
  toastMsg.value = msg;
  setTimeout(() => (toastMsg.value = null), 3000);
};

const highlights = [
  'Guided by certified movement & creative practitioners',
  'All equipment, mats, and materials fully provided',
  'Restorative soundscapes & post-session herbal tea',
  'Designed for all experience and mobility levels',
];

const agendaSteps = [
  { time: '10 min before', title: 'Arrival & Check-in', detail: 'Scan your QR pass at studio reception.' },
  { time: 'First 15 min', title: 'Welcome & Warmup', detail: 'Gentle posture alignment & breathwork.' },
  { time: 'Main 45 min', title: 'Guided Session', detail: 'Core activity flow and hands-on practice.' },
  { time: 'Final 10 min', title: 'Cool Down & Tea', detail: 'Restorative stretch and herbal refreshments.' },
];

const sampleAvatars = ['👩‍🎨', '👩‍💼', '👨‍💻', '👩‍🔬', '👨‍💼'];

const confirmCancel = () => {
  showCancelModal.value = false;
  if (booking.value) app.cancelBooking(booking.value.id);
  app.selectedBooking = null;
};
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="booking"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: 20 }"
      class="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <!-- Sticky Header Navigation -->
      <div class="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-brand-sm transition cursor-pointer"
          @click="app.selectedBooking = null"
        >
          <PhCaretLeft :size="16" weight="bold" /> Back to Schedule
        </button>

        <div class="flex items-center gap-2">
          <span class="text-[10px] font-extrabold text-[#10B981] bg-[#ECFDF5] border border-emerald-200 px-2.5 py-1 rounded-brand-sm flex items-center gap-1">
            <PhCheck :size="12" weight="bold" /> {{ booking.status || 'Confirmed' }}
          </span>
          <button
            type="button"
            class="p-1.5 rounded-brand bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            title="Share"
            @click="showToast('🔗 Booking link copied to clipboard!')"
          >
            <PhShareNetwork :size="16" weight="bold" />
          </button>
        </div>
      </div>

      <!-- Toast Notification -->
      <AnimatePresence>
        <Motion
          v-if="toastMsg"
          :initial="{ opacity: 0, y: -10 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -10 }"
          class="bg-[#1A1A28] text-white text-xs font-bold px-4 py-2.5 text-center sticky top-[53px] z-30 shadow-md"
        >
          {{ toastMsg }}
        </Motion>
      </AnimatePresence>

      <!-- Main Scrollable Content -->
      <div class="pb-28 flex-1 space-y-4 divide-y divide-slate-100">
        <!-- Hero Image Section -->
        <div class="p-4 space-y-3">
          <div v-if="booking.image" class="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 shadow-xs" style="border-radius: 24px 24px 64px 24px">
            <img :src="booking.image" :alt="booking.activityName" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span
                class="text-xs font-extrabold text-white px-3 py-1 rounded-brand-sm shadow-md backdrop-blur-md flex items-center gap-1.5"
                :style="{ backgroundColor: brandColor }"
              >
                <span>{{ booking.symbol || '✨' }}</span> Confirmed Booking
              </span>
              <button
                type="button"
                class="text-xs font-extrabold bg-white text-[#1A1A28] px-3 py-1 rounded-brand-sm shadow-md flex items-center gap-1 hover:bg-slate-100 transition cursor-pointer"
                @click="app.selectedQrPass = booking"
              >
                <PhQrCode :size="14" weight="bold" /> Show Pass
              </button>
            </div>
          </div>

          <div class="pt-1 space-y-1">
            <div class="flex items-center gap-1.5">
              <p class="text-xs font-extrabold text-[#33C4F0]">{{ booking.vendorName }}</p>
              <PhShieldCheck :size="14" class="text-[#33C4F0]" weight="fill" />
            </div>
            <h1 class="text-xl font-black text-slate-900 leading-snug tracking-tight">{{ booking.activityName }}</h1>
          </div>

          <!-- Digital Check-in Ticket Card -->
          <div class="bg-[#E8F9FF] border border-[#33C4F0]/40 p-4 space-y-3 relative overflow-hidden" style="border-radius: 20px 20px 48px 20px">
            <div class="flex items-center justify-between text-xs font-extrabold text-[#147C9E]">
              <span class="flex items-center gap-1.5"> <PhQrCode :size="18" class="text-[#33C4F0]" /> Mobile Check-in Pass </span>
              <span class="font-mono bg-white px-2 py-0.5 rounded border border-[#A2F4FD] text-[10px] text-slate-800">{{ booking.qrCode }}</span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#33C4F0]/20">
              <div>
                <span class="text-[10px] font-bold text-slate-400 block uppercase">Date</span>
                <span class="font-extrabold text-slate-800">{{ booking.date }}</span>
              </div>
              <div>
                <span class="text-[10px] font-bold text-slate-400 block uppercase">Time</span>
                <span class="font-extrabold text-slate-800">{{ booking.time }}</span>
              </div>
            </div>

            <button
              type="button"
              class="w-full py-2.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white text-xs font-extrabold rounded-brand-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              @click="app.selectedQrPass = booking"
            >
              <PhQrCode :size="16" weight="bold" /> Present QR Ticket at Venue
            </button>
          </div>
        </div>

        <!-- TEAM SLOTS & ROSTER SUMMARY CARD -->
        <div class="p-4">
          <div
            class="bg-white p-4 border border-slate-100 shadow-xs hover:shadow-md transition duration-200 cursor-pointer group space-y-3"
            style="border-radius: 20px 20px 48px 20px"
            @click="showRosterPage = true"
          >
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E] block">Team Roster &amp; Capacity</span>
                <h3 class="text-sm font-extrabold text-slate-900 mt-0.5">Occupied &amp; Vacant Slots</h3>
              </div>
              <span
                class="text-xs font-extrabold text-[#33C4F0] bg-[#E8F9FF] px-3 py-1 rounded-brand-sm group-hover:bg-[#33C4F0] group-hover:text-white transition flex items-center gap-1"
              >
                Manage Roster <PhCaretRight :size="12" weight="bold" />
              </span>
            </div>

            <div class="flex items-center justify-between pt-1 border-t border-slate-100">
              <div class="flex items-center gap-2">
                <div class="flex -space-x-2 overflow-hidden">
                  <span v-for="(av, idx) in sampleAvatars" :key="idx" class="inline-flex h-7 w-7 rounded-full bg-slate-100 text-xs items-center justify-center ring-2 ring-white">
                    {{ av }}
                  </span>
                </div>
                <span class="text-xs font-bold text-slate-700">7 / 10 Slots Occupied</span>
              </div>

              <span class="text-[11px] font-extrabold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-brand-sm border border-emerald-200">3 Vacant Available</span>
            </div>
          </div>
        </div>

        <!-- Quick Metadata Grid -->
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
              <div class="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <PhClock :size="16" class="text-[#33C4F0]" />
                <span>Session Time</span>
              </div>
              <p class="text-xs font-extrabold text-slate-900">{{ booking.time }}</p>
            </div>

            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
              <div class="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <PhUsers :size="16" class="text-[#33C4F0]" />
                <span>Reserved Seats</span>
              </div>
              <p class="text-xs font-extrabold text-slate-900">7/10 Slots Occupied</p>
            </div>
          </div>

          <!-- Location Box -->
          <div class="mt-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <PhMapPin :size="16" class="text-[#33C4F0]" />
                <span>Venue Location</span>
              </div>
              <button type="button" class="text-[10px] font-extrabold text-[#33C4F0] hover:underline" @click="showToast('📍 Opening studio location in Maps...')">
                Get Directions
              </button>
            </div>
            <p class="text-xs font-extrabold text-slate-900">{{ booking.location }}</p>
            <p class="text-[11px] text-slate-500 pt-0.5">Please arrive 10 minutes prior to session start. Show your QR pass upon check-in.</p>
          </div>
        </div>

        <!-- Highlights Section -->
        <div class="p-4 space-y-2.5">
          <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E] block">Session Highlights</span>
          <h3 class="text-sm font-extrabold text-slate-900">What to Expect</h3>
          <div class="space-y-2 pt-1">
            <div v-for="(item, idx) in highlights" :key="idx" class="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <span class="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58] mt-0.5">
                <PhCheck :size="12" weight="bold" />
              </span>
              <span class="text-xs font-semibold text-slate-800 leading-tight">{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- Session Timeline / Agenda -->
        <div class="p-4 space-y-2.5">
          <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0] block">Schedule Breakdown</span>
          <h3 class="text-sm font-extrabold text-slate-900">Session Timeline</h3>
          <div class="space-y-2 pt-1">
            <div v-for="(step, idx) in agendaSteps" :key="idx" class="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span class="shrink-0 rounded-lg bg-[#E8F9FF] px-2 py-1 font-mono text-[10px] font-bold text-[#147C9E]">{{ step.time }}</span>
              <div>
                <h4 class="text-xs font-extrabold text-slate-900">{{ step.title }}</h4>
                <p class="text-[11px] text-slate-600 mt-0.5">{{ step.detail }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="p-4 space-y-2.5">
          <button
            type="button"
            class="w-full py-3 bg-[#1A1A28] text-white hover:bg-black text-xs font-extrabold rounded-brand-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            @click="showToast('📅 Added session to your calendar!')"
          >
            <PhCalendarPlus :size="16" weight="bold" /> Add to Phone Calendar
          </button>

          <button
            type="button"
            class="w-full py-2.5 border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-brand-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
            @click="showCancelModal = true"
          >
            <PhTrash :size="14" /> Cancel or Reschedule Booking
          </button>
        </div>
      </div>

      <!-- CANCEL CONFIRMATION MODAL -->
      <div v-if="showCancelModal" class="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl w-full max-w-xs p-5 text-center space-y-4 shadow-2xl">
          <div class="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-xl mx-auto">
            <PhTrash :size="24" />
          </div>
          <div>
            <h3 class="text-sm font-black text-slate-900">Cancel Booking?</h3>
            <p class="text-xs text-slate-500 mt-1">Are you sure you want to cancel "{{ booking.activityName }}"? Your pass credit will be refunded.</p>
          </div>
          <div class="flex gap-2 pt-2">
            <button type="button" class="flex-1 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200" @click="showCancelModal = false">
              Keep Booking
            </button>
            <button type="button" class="flex-1 py-2.5 bg-rose-500 text-white text-xs font-bold rounded-xl hover:bg-rose-600" @click="confirmCancel">
              Confirm Cancel
            </button>
          </div>
        </div>
      </div>
    </Motion>
  </AnimatePresence>

  <!-- DEDICATED TEAM ROSTER SUB-PAGE -->
  <MobileBookingRosterView :booking="booking" :is-open="showRosterPage" @close="showRosterPage = false" />
</template>
