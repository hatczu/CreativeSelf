<script setup lang="ts">
import { PhWarningCircle, PhCheck, PhX, PhCalendarBlank, PhSparkle } from '@phosphor-icons/vue';

const sub = useSubscription();

const goTo = (path: string) => {
  sub.closeLimitModal();
  navigateTo(path);
};
</script>

<template>
  <div v-if="sub.isLimitModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a28]/60 p-4 backdrop-blur-sm">
    <div
      class="w-full max-w-md overflow-hidden bg-white p-6 shadow-[0_24px_60px_rgba(28,118,155,.2)]"
      style="border-radius: 24px 24px 64px 24px"
    >
      <div class="flex items-start justify-between gap-4 border-b border-[#33c4f0]/15 pb-4">
        <div class="flex items-center gap-3">
          <div class="grid h-10 w-10 place-items-center rounded-full bg-amber-100 text-amber-600">
            <PhWarningCircle :size="22" />
          </div>
          <div>
            <p class="text-xs font-extrabold uppercase tracking-[.14em] text-amber-600">Limit Reached</p>
            <h3 class="text-xl font-extrabold text-[#1a1a28]">Activity Limit Reached</h3>
          </div>
        </div>
        <button
          type="button"
          class="grid h-8 w-8 place-items-center rounded-brand-sm bg-[#f2fbfe] text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
          @click="sub.closeLimitModal()"
        >
          <PhX :size="18" />
        </button>
      </div>

      <div class="mt-5 space-y-4">
        <p class="text-sm leading-6 text-[#414153]">
          Your <strong>{{ sub.planName }}</strong> subscription includes
          <strong>{{ sub.maxActivities }} activities per month</strong>.
        </p>

        <div class="rounded-2xl border border-[#33c4f0]/20 bg-[#f8fdff] p-4">
          <p class="text-xs font-extrabold uppercase tracking-[.14em] text-[#717182]">You've already selected:</p>
          <div class="mt-3 space-y-2">
            <div v-for="act in sub.selectedActivities" :key="act.id" class="flex items-center gap-2 text-sm font-bold text-[#1a1a28]">
              <div class="grid h-5 w-5 place-items-center rounded-full bg-[#10b981] text-white">
                <PhCheck :size="12" />
              </div>
              <span>{{ act.name }}</span>
            </div>
            <p v-if="sub.selectedActivities.length === 0" class="text-xs italic text-[#717182]">
              2 activities selected for this month.
            </p>
          </div>
        </div>

        <p class="text-xs leading-5 text-[#717182]">
          You can browse other activities, but you cannot select another activity this month.
        </p>
      </div>

      <div class="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-brand-sm bg-[#33c4f0] px-5 py-2.5 text-xs font-extrabold text-[#1a1a28] transition hover:bg-[#20b3df]"
          @click="goTo('/bookings')"
        >
          <PhCalendarBlank :size="16" />
          View My Activities
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-brand-sm border border-[#33c4f0]/30 bg-white px-5 py-2.5 text-xs font-extrabold text-[#1a1a28] transition hover:bg-[#f2fbfe]"
          @click="goTo('/dashboard')"
        >
          <PhSparkle :size="16" />
          Explore Plans
        </button>
      </div>
    </div>
  </div>
</template>
