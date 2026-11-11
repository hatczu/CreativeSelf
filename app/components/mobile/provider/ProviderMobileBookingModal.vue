<script setup lang="ts">
import { ref } from 'vue';
import { PhX, PhCheck, PhUsers, PhCurrencyCircleDollar, PhChatCircleText } from '@phosphor-icons/vue';

const app = useProviderMobileApp();
const confirmedSuccess = ref(false);

const close = () => {
  app.selectedBooking = null;
};

const handleConfirm = () => {
  const booking = app.selectedBooking;
  if (!booking) return;
  confirmedSuccess.value = true;
  setTimeout(() => {
    app.changeBookingStatus(booking.id || booking.session, 'Confirmed');
    confirmedSuccess.value = false;
    close();
  }, 1000);
};

const handleDecline = () => {
  const booking = app.selectedBooking;
  if (!booking) return;
  app.changeBookingStatus(booking.id || booking.session, 'Declined');
  close();
};
</script>

<template>
  <div v-if="app.selectedBooking" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
    <div class="w-full max-w-md bg-white p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-250" style="border-radius: 24px 24px 0 0">
      <div class="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#007595] bg-[#E8F9FF] px-2.5 py-0.5 rounded-brand-sm border border-[#A2F4FD]">Booking Request</span>
          <h3 class="text-lg font-extrabold text-[#1A1A28] mt-1" style="font-family: Century Gothic, Poppins, sans-serif">
            {{ app.selectedBooking.company || 'Corporate Team' }}
          </h3>
        </div>
        <button type="button" class="w-8 h-8 rounded-brand-sm bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition" @click="close">
          <PhX :size="16" weight="bold" />
        </button>
      </div>

      <div v-if="confirmedSuccess" class="py-10 text-center">
        <div class="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto flex items-center justify-center mb-3">
          <PhCheck :size="28" weight="bold" />
        </div>
        <h4 class="text-lg font-extrabold text-[#1A1A28]">Booking Confirmed!</h4>
        <p class="text-xs text-slate-500 mt-1">Confirmation and QR pass details sent to {{ app.selectedBooking.company }}.</p>
      </div>
      <div v-else class="mt-4 space-y-4">
        <div class="bg-slate-50 p-4 border border-slate-100 space-y-3" style="border-radius: 16px 16px 36px 16px">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0" :style="{ background: `${app.selectedBooking.color || '#33C4F0'}20` }">
              {{ app.selectedBooking.emoji || '🎨' }}
            </div>
            <div>
              <h4 class="text-sm font-extrabold text-[#1A1A28]">{{ app.selectedBooking.session }}</h4>
              <p class="text-xs text-slate-500 font-medium">{{ app.selectedBooking.date }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
            <div>
              <p class="text-[10px] font-extrabold text-slate-400 uppercase">ATTENDEES</p>
              <p class="font-extrabold text-[#1A1A28] flex items-center gap-1 mt-0.5">
                <PhUsers :size="14" class="text-[#33C4F0]" />
                <span>{{ app.selectedBooking.group || '15 guests' }}</span>
              </p>
            </div>
            <div>
              <p class="text-[10px] font-extrabold text-slate-400 uppercase">ESTIMATED REVENUE</p>
              <p class="font-extrabold text-[#087E58] flex items-center gap-1 mt-0.5">
                <PhCurrencyCircleDollar :size="14" />
                <span>$675.00</span>
              </p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50/60 p-3.5 border border-blue-100 flex items-start gap-2.5" style="border-radius: 14px 14px 28px 14px">
          <PhChatCircleText :size="18" class="text-[#007595] shrink-0 mt-0.5" />
          <p class="text-xs text-slate-600 leading-snug">
            <span class="font-extrabold text-[#1A1A28]">Note from Team Lead:</span> "Looking forward to this creative reset for our design squad!"
          </p>
        </div>

        <div class="flex gap-2.5 pt-2">
          <button
            type="button"
            class="flex-1 py-3 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            style="border-radius: 14px 14px 28px 14px"
            @click="handleConfirm"
          >
            <PhCheck :size="16" weight="bold" />
            <span>Accept Booking</span>
          </button>

          <button
            type="button"
            class="px-4 py-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
            style="border-radius: 14px 14px 28px 14px"
            @click="handleDecline"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
