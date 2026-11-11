<script setup lang="ts">
import { computed } from 'vue';
import { PhSparkle } from '@phosphor-icons/vue';

withDefaults(defineProps<{ variant?: 'horizontal' | 'sidebar'; showLogo?: boolean; hideCounters?: boolean }>(), {
  variant: 'horizontal',
  showLogo: true,
  hideCounters: false,
});

defineSlots<{
  /** Content rendered right below the plan title (sidebar variant). */
  top?: () => unknown;
  /** Content rendered at the bottom of the card (sidebar variant). */
  default?: () => unknown;
}>();

const sub = useSubscription();

const brandCount = computed(() => (sub.selectedBrand ? 1 : 0));
const activityCount = computed(() => sub.selectedActivities.length);
const remainingActivities = computed(() => sub.maxActivities - activityCount.value);
</script>

<template>
  <div
    v-if="variant === 'sidebar'"
    class="sticky top-8 overflow-hidden bg-[#15343d] p-4 sm:p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]"
    style="border-radius: 20px 20px 64px 20px"
  >
    <BrandChangeConfirmationModal />

    <!-- Top Cyan Icon Container -->
    <div class="grid h-10 w-10 place-items-center rounded-[14px_14px_22px_14px] bg-[#33c4f0] text-[#15343d] mb-3 shadow-md shadow-[#33c4f0]/20">
      <PhSparkle :size="18" weight="fill" />
    </div>

    <!-- Header Title -->
    <div>
      <p class="text-[10px] font-bold uppercase tracking-[.14em] text-white/45">YOUR MONTHLY PLAN</p>
      <div class="mt-0.5 flex items-center justify-between gap-2">
        <div class="flex items-center gap-1.5 min-w-0">
          <PhSparkle :size="14" class="text-[#33c4f0] shrink-0" />
          <h2 class="text-sm sm:text-base font-extrabold text-white truncate">{{ sub.planName }}</h2>
        </div>
      </div>
    </div>

    <!-- Top slot (for top-positioned navigation tabs) -->
    <slot name="top" />

    <!-- Compact Stacked Metric Cards (Hidden when hideCounters is true) -->
    <div v-if="!hideCounters" class="mt-3.5 space-y-2.5">
      <!-- Card 1: BRANDS -->
      <div class="rounded-xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/15">
        <div class="flex items-center justify-between">
          <p class="text-[9px] font-bold uppercase tracking-wider text-white/50">BRANDS</p>
          <button
            v-if="sub.selectedBrand"
            type="button"
            class="text-[9px] text-white/50 hover:text-white underline"
            @click="sub.unselectBrand()"
          >
            Change
          </button>
        </div>
        <p class="mt-0.5 text-lg font-black text-white">{{ brandCount }} / {{ sub.maxBrands }}</p>
        <p v-if="sub.selectedBrand" class="mt-0.5 text-[10px] font-semibold text-[#33c4f0] truncate">
          ✓ {{ sub.selectedBrand.name }}
        </p>
      </div>

      <!-- Card 2: ACTIVITIES -->
      <div class="rounded-xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/15">
        <p class="text-[9px] font-bold uppercase tracking-wider text-white/50">ACTIVITIES</p>
        <p class="mt-0.5 text-lg font-black text-white">{{ activityCount }} / {{ sub.maxActivities }}</p>
        <p class="mt-0.5 text-[10px] text-white/50 truncate">
          {{ remainingActivities > 0 ? `${remainingActivities} remaining this month` : 'Limit reached' }}
        </p>
      </div>

      <!-- Card 3: EMPLOYEE SLOTS (If corporate) -->
      <div v-if="sub.planType === 'corporate'" class="rounded-xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/15">
        <p class="text-[9px] font-bold uppercase tracking-wider text-white/50">EMPLOYEE SLOTS</p>
        <p class="mt-0.5 text-lg font-black text-purple-300">{{ sub.employeeSlotsPerActivity }}</p>
        <p class="mt-0.5 text-[10px] text-white/50">Slots per activity</p>
      </div>
    </div>

    <!-- Bottom Helper Description -->
    <p class="mt-3.5 text-[11px] sm:text-xs text-white/65 leading-relaxed font-medium">
      Choose a service brand, then build a month of restorative experiences.
    </p>

    <!-- Default slot for page-specific navigation tabs -->
    <slot />
  </div>

  <!-- Horizontal variant -->
  <section
    v-else
    class="overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]"
    style="border-radius: 20px 20px 64px 20px"
  >
    <BrandChangeConfirmationModal />

    <!-- Top Title Line -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-[.16em] text-white/45">YOUR CREATIVE PLAN</p>
        <div class="mt-1 flex items-center gap-2">
          <h2 class="text-xl font-extrabold text-white">{{ sub.planName }}</h2>
          <span class="rounded-brand-sm bg-[#33c4f0] px-2.5 py-1 text-[10px] font-extrabold text-[#1a1a28]">Active</span>
        </div>
      </div>

      <p class="text-xs text-white/50">Your plan renews on 31 Aug.</p>
    </div>

    <!-- 3-Column Inner Card Grid -->
    <div class="mt-5 grid gap-3 sm:grid-cols-3">
      <!-- Card 1: Subscribed Brands -->
      <div class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
        <div class="flex items-center justify-between">
          <p class="text-2xl font-extrabold text-[#33c4f0]">{{ brandCount }} / {{ sub.maxBrands }}</p>
        </div>
        <p class="mt-1 text-xs font-bold text-white">Subscribed Service Brands</p>
        <div class="mt-1 flex items-center justify-between">
          <p class="text-[11px] text-white/70 font-semibold truncate">
            {{ sub.selectedBrand ? sub.selectedBrand.name : 'Select a brand to start' }}
          </p>
          <button
            v-if="sub.selectedBrand"
            type="button"
            class="text-[11px] text-[#33c4f0] hover:underline font-bold ml-2 shrink-0"
            @click="sub.unselectBrand()"
          >
            Change brand
          </button>
        </div>
      </div>

      <!-- Card 2: Services Remaining -->
      <div class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
        <p class="text-2xl font-extrabold text-[#33c4f0]">{{ remainingActivities }}</p>
        <p class="mt-1 text-xs font-bold text-white">Services remaining</p>
        <p class="mt-1 text-[11px] text-white/50">{{ activityCount }} of {{ sub.maxActivities }} activities selected this month</p>
      </div>

      <!-- Card 3: Employee Slots / Selected Activities -->
      <div
        v-if="sub.planType === 'corporate'"
        class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]"
      >
        <p class="text-2xl font-extrabold text-purple-400">{{ sub.employeeSlotsPerActivity }}</p>
        <p class="mt-1 text-xs font-bold text-white">Employee slots per activity</p>
        <p class="mt-1 text-[11px] text-white/50">Corporate team allocation</p>
      </div>
      <div v-else class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
        <div class="flex -space-x-2">
          <span class="grid h-7 w-7 place-items-center rounded-full border-2 border-[#1a1a28] bg-[#ef4444]/70 text-xs">🎨</span>
          <span class="grid h-7 w-7 place-items-center rounded-full border-2 border-[#1a1a28] bg-[#10b981]/70 text-xs">🧘</span>
        </div>
        <p class="mt-2 text-xs font-bold text-white">Selected activities</p>
        <p class="mt-1 text-[11px] text-white/50 truncate">
          {{ sub.selectedActivities.map((a) => a.name).join(', ') || 'No activities selected yet' }}
        </p>
      </div>
    </div>
  </section>
</template>
