<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhCaretLeft, PhCaretRight, PhCheck, PhSparkle, PhX, PhEnvelope } from '@phosphor-icons/vue';
import type { WizardBooking } from '~/data/clientMobileData';

const props = withDefaults(
  defineProps<{ isOpen: boolean; title: string; provider: string; symbol?: string; image?: string; color?: string }>(),
  { symbol: '🎨', image: '', color: '#33C4F0' },
);
const emit = defineEmits<{ close: []; completeBooking: [booking: WizardBooking] }>();

type Step = 1 | 2 | 3 | 4;
type Preset = 'small' | 'medium' | 'large' | 'custom';

const step = ref<Step>(1);

// STEP 1: DATE RANGE & CALENDAR SELECTION
const selectionType = ref<'single' | 'range'>('single');
const selectedStartDate = ref(8);
const selectedEndDate = ref(10);
const selectedTimeSlot = ref('02:00 PM - 03:30 PM');
const occupiedDates = [5, 12, 15, 19, 22, 26];

// STEP 2: TEAM RANGE & CAPACITY SELECTION
const teamRangePreset = ref<Preset>('small');
const seatsCount = ref(5);

// STEP 3: BULK INVITES & ROSTER MANAGEMENT
const bulkEmailText = ref('');
const invitedEmails = ref<string[]>(['sarah.j@company.com', 'david.k@company.com', 'elena.r@company.com']);
const singleEmailInput = ref('');

const monthName = 'August';
const year = 2026;

const timeSlots = [
  { slot: '09:30 AM - 11:00 AM', label: 'Morning Session' },
  { slot: '02:00 PM - 03:30 PM', label: 'Afternoon Session' },
  { slot: '04:30 PM - 06:00 PM', label: 'Evening Sunset Flow' },
];
const presets = [
  { id: 'small', label: 'Small Team', range: '2 – 5 seats', count: 5 },
  { id: 'medium', label: 'Medium Team', range: '6 – 10 seats', count: 10 },
  { id: 'large', label: 'Large Team', range: '11 – 20 seats', count: 20 },
] as const;
const stepLabels: Record<Step, string> = { 1: 'Date & Time', 2: 'Team Range', 3: 'Bulk Invites', 4: 'Review Summary' };

const handleDateClick = (dayNum: number) => {
  if (occupiedDates.includes(dayNum)) return;
  if (selectionType.value === 'single') {
    selectedStartDate.value = dayNum;
    selectedEndDate.value = dayNum;
  } else if (dayNum < selectedStartDate.value) {
    selectedStartDate.value = dayNum;
  } else {
    selectedEndDate.value = dayNum;
  }
};

const isDateSelected = (dayNum: number) =>
  selectionType.value === 'single' ? selectedStartDate.value === dayNum : dayNum >= selectedStartDate.value && dayNum <= selectedEndDate.value;

const handlePresetSelect = (preset: (typeof presets)[number]) => {
  teamRangePreset.value = preset.id;
  seatsCount.value = preset.count;
};

const handleParseBulkEmails = () => {
  if (!bulkEmailText.value.trim()) return;
  const extracted = bulkEmailText.value
    .split(/[\n,;]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.includes('@') && !invitedEmails.value.includes(e));
  if (extracted.length > 0) {
    invitedEmails.value = [...invitedEmails.value, ...extracted];
    bulkEmailText.value = '';
  }
};

const handleAddSingleEmail = () => {
  const clean = singleEmailInput.value.trim().toLowerCase();
  if (clean && clean.includes('@') && !invitedEmails.value.includes(clean)) {
    invitedEmails.value = [...invitedEmails.value, clean];
    singleEmailInput.value = '';
  }
};

const handleRemoveEmail = (email: string) => {
  invitedEmails.value = invitedEmails.value.filter((e) => e !== email);
};

const formattedDateString = computed(() =>
  selectedStartDate.value === selectedEndDate.value
    ? `${monthName} ${selectedStartDate.value}, ${year}`
    : `${monthName} ${selectedStartDate.value} – ${selectedEndDate.value}, ${year}`,
);

const goBack = () => {
  if (step.value > 1) step.value = (step.value - 1) as Step;
  else emit('close');
};
const goNext = () => {
  if (step.value < 4) step.value = (step.value + 1) as Step;
};

const handleFinalConfirm = () => {
  emit('completeBooking', {
    id: `bk-${Date.now()}`,
    activityName: props.title,
    vendorName: props.provider,
    date: formattedDateString.value,
    time: selectedTimeSlot.value,
    location: 'Creative Hub • Studio Studio 4B',
    status: 'Confirmed',
    seats: seatsCount.value,
    color: props.color,
    symbol: props.symbol,
    qrCode: `CS-PASS-${Date.now()}`,
    image: props.image,
    invitedEmails: [...invitedEmails.value],
  });
  emit('close');
};

const dayClass = (dayNum: number) => [
  'h-8 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition relative',
  occupiedDates.includes(dayNum)
    ? 'bg-rose-50 text-rose-300 border border-rose-100 cursor-not-allowed'
    : isDateSelected(dayNum)
      ? 'bg-[#33C4F0] text-white shadow-xs'
      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-100',
];
const toggleClass = (active: boolean) => [
  'flex-1 py-1.5 text-xs font-bold rounded-xl transition',
  active ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900',
];
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="isOpen"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: 20 }"
      class="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <!-- Top Sticky Screen Header -->
      <div class="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition cursor-pointer"
          @click="goBack"
        >
          <PhCaretLeft :size="16" weight="bold" /> {{ step > 1 ? 'Back' : 'Cancel' }}
        </button>

        <div class="flex items-center gap-2">
          <span class="text-xs font-black text-[#147C9E] bg-[#E8F9FF] px-2.5 py-1 rounded-full">Step {{ step }} of 4</span>
          <span class="text-xs font-bold text-slate-500">{{ stepLabels[step] }}</span>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition cursor-pointer"
          @click="emit('close')"
        >
          <PhX :size="16" />
        </button>
      </div>

      <!-- Progress Indicator Line -->
      <div class="w-full bg-slate-100 h-1">
        <div class="bg-[#33C4F0] h-full transition-all duration-300" :style="{ width: `${(step / 4) * 100}%` }" />
      </div>

      <!-- Step Body Content -->
      <div class="p-4 space-y-4 flex-1">
        <!-- STEP 1: DATE RANGE & CALENDAR SELECTION -->
        <div v-if="step === 1" class="space-y-4">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">Select Availability</span>
            <h3 class="text-base font-extrabold text-slate-900 mt-0.5">Pick Date Range &amp; Time Slot</h3>
            <p class="text-xs text-slate-500">Occupied dates are highlighted in red and unavailable for booking.</p>
          </div>

          <!-- Single vs Range Toggle -->
          <div class="flex bg-slate-100 p-1 rounded-2xl">
            <button type="button" :class="toggleClass(selectionType === 'single')" @click="selectionType = 'single'">Single Date</button>
            <button type="button" :class="toggleClass(selectionType === 'range')" @click="selectionType = 'range'">Date Range Selection</button>
          </div>

          <!-- Interactive Calendar Month Grid -->
          <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold text-slate-900">{{ monthName }} {{ year }}</span>
              <div class="flex items-center gap-2 text-[10px] font-bold">
                <span class="flex items-center gap-1 text-emerald-600"> <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Available </span>
                <span class="flex items-center gap-1 text-rose-500"> <span class="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Occupied </span>
              </div>
            </div>

            <div class="grid grid-cols-7 gap-1 text-center text-[9px] font-extrabold text-slate-400">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>

            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="dayNum in 31"
                :key="dayNum"
                type="button"
                :disabled="occupiedDates.includes(dayNum)"
                :class="dayClass(dayNum)"
                @click="handleDateClick(dayNum)"
              >
                <span>{{ dayNum }}</span>
                <span v-if="occupiedDates.includes(dayNum)" class="w-1 h-1 rounded-full bg-rose-400 absolute bottom-1" />
              </button>
            </div>
          </div>

          <!-- Selected Date Range Preview -->
          <div class="bg-[#E8F9FF] p-3 rounded-2xl border border-[#33C4F0]/30 flex items-center justify-between text-xs text-[#147C9E]">
            <span class="font-bold">Selected Dates:</span>
            <span class="font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-full border border-[#A2F4FD]">{{ formattedDateString }}</span>
          </div>

          <!-- Time Slot Picker -->
          <div class="space-y-1.5">
            <label class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Available Time Slots</label>
            <div class="grid grid-cols-1 gap-2">
              <button
                v-for="t in timeSlots"
                :key="t.slot"
                type="button"
                :class="[
                  'p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition',
                  selectedTimeSlot === t.slot
                    ? 'border-[#33C4F0] bg-white ring-2 ring-[#33C4F0]/30 text-slate-900 font-extrabold'
                    : 'border-slate-200 bg-slate-50 text-slate-600 font-medium hover:bg-white',
                ]"
                @click="selectedTimeSlot = t.slot"
              >
                <div>
                  <p class="font-extrabold">{{ t.slot }}</p>
                  <p class="text-[10px] text-slate-400">{{ t.label }}</p>
                </div>
                <span class="text-[10px] font-extrabold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">Open</span>
              </button>
            </div>
          </div>
        </div>

        <!-- STEP 2: TEAM RANGE & CAPACITY SELECTION -->
        <div v-else-if="step === 2" class="space-y-4">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">Seat Allocation</span>
            <h3 class="text-base font-extrabold text-slate-900 mt-0.5">Pick Team Range &amp; Capacity</h3>
            <p class="text-xs text-slate-500">Select your team size range to calculate pass credits required.</p>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="p in presets"
              :key="p.id"
              type="button"
              :class="[
                'p-3 rounded-2xl border text-center transition',
                teamRangePreset === p.id
                  ? 'border-[#33C4F0] bg-[#E8F9FF] text-[#147C9E] font-extrabold shadow-2xs'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white',
              ]"
              @click="handlePresetSelect(p)"
            >
              <p class="text-xs font-extrabold">{{ p.label }}</p>
              <p class="text-[10px] text-slate-400 mt-0.5">{{ p.range }}</p>
            </button>
          </div>

          <!-- Seat Counter Stepper -->
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold text-slate-900">Exact Allocated Seats:</span>
              <div class="flex items-center gap-3 bg-white p-1 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  class="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold hover:bg-slate-200"
                  @click="seatsCount = Math.max(1, seatsCount - 1)"
                >
                  -
                </button>
                <span class="text-base font-black text-slate-900 w-6 text-center">{{ seatsCount }}</span>
                <button
                  type="button"
                  class="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold hover:bg-slate-200"
                  @click="seatsCount = Math.min(25, seatsCount + 1)"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- Pass Credit Calculation Card -->
          <div class="bg-[#1A1A28] p-4 text-white space-y-2.5 shadow-md" style="border-radius: 20px 20px 40px 20px">
            <div class="flex items-center justify-between text-xs font-extrabold">
              <span class="text-[#33C4F0] flex items-center gap-1"> <PhSparkle :size="15" weight="fill" /> Pass Credits Required </span>
              <span class="text-white bg-white/10 px-2.5 py-0.5 rounded-full">{{ seatsCount }} Pass Credits</span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/10">
              <div>
                <span class="text-[10px] text-white/50 block">Your Account Entitlement</span>
                <span class="font-extrabold text-emerald-400">12 Active Credits</span>
              </div>
              <div>
                <span class="text-[10px] text-white/50 block">Balance After Booking</span>
                <span class="font-extrabold text-white">{{ 12 - seatsCount }} Credits</span>
              </div>
            </div>
          </div>
        </div>

        <!-- STEP 3: BULK INVITES & ROSTER MANAGEMENT -->
        <div v-else-if="step === 3" class="space-y-4">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">Roster Allocation</span>
            <h3 class="text-base font-extrabold text-slate-900 mt-0.5">Manage Bulk Invites</h3>
            <p class="text-xs text-slate-500">Paste multiple colleague emails at once to assign your {{ seatsCount }} allocated slots.</p>
          </div>

          <div class="bg-[#E8F9FF] p-3 rounded-2xl border border-[#33C4F0]/40 flex items-center justify-between text-xs text-[#147C9E]">
            <span class="font-extrabold">Assigned Slots:</span>
            <span class="font-extrabold text-slate-900 bg-white px-3 py-1 rounded-full border border-[#A2F4FD]">
              {{ invitedEmails.length }} of {{ seatsCount }} Seats Assigned
            </span>
          </div>

          <!-- Bulk Email Paste Box -->
          <div class="space-y-2">
            <label class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Paste Bulk Emails (comma or line separated)</label>
            <textarea
              v-model="bulkEmailText"
              rows="3"
              placeholder="e.g. alex@acme.com, marcus@acme.co, chris@acme.co"
              class="w-full p-3 bg-slate-50 rounded-2xl text-xs text-slate-900 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#33C4F0]"
            />
            <button
              type="button"
              :disabled="!bulkEmailText.trim()"
              class="w-full py-2 bg-[#1A1A28] text-white text-xs font-extrabold rounded-xl hover:bg-[#33C4F0] hover:text-[#1A1A28] transition disabled:opacity-40"
              @click="handleParseBulkEmails"
            >
              + Add Bulk Emails to Roster
            </button>
          </div>

          <!-- Single Add Email Form -->
          <form class="flex gap-2" @submit.prevent="handleAddSingleEmail">
            <input
              v-model="singleEmailInput"
              type="email"
              placeholder="Add single colleague email..."
              class="flex-1 px-3.5 py-2 bg-slate-50 rounded-xl text-xs text-slate-900 border border-slate-200 focus:outline-none focus:bg-white"
            />
            <button
              type="submit"
              :disabled="!singleEmailInput.trim()"
              class="px-4 py-2 bg-[#33C4F0] text-white text-xs font-extrabold rounded-xl hover:bg-[#1AB0DC] disabled:opacity-40"
            >
              Add
            </button>
          </form>

          <!-- Invited Emails Roster Chips -->
          <div class="space-y-1.5 pt-1">
            <label class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Invited Colleagues ({{ invitedEmails.length }})</label>
            <div class="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-100">
              <span
                v-for="email in invitedEmails"
                :key="email"
                class="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-800 border border-slate-200 shadow-2xs"
              >
                <PhEnvelope :size="12" class="text-[#33C4F0]" />
                <span>{{ email }}</span>
                <button type="button" class="text-slate-400 hover:text-rose-500 ml-1" @click="handleRemoveEmail(email)">
                  <PhX :size="12" />
                </button>
              </span>
              <p v-if="invitedEmails.length === 0" class="text-xs text-slate-400 py-2 text-center w-full">
                No emails added yet. Paste emails above or send invites later.
              </p>
            </div>
          </div>
        </div>

        <!-- STEP 4: REVIEW SUMMARY & CONFIRMATION -->
        <div v-else class="space-y-4">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">Final Review</span>
            <h3 class="text-base font-extrabold text-slate-900 mt-0.5">Review Booking Summary</h3>
            <p class="text-xs text-slate-500">Confirm your details to instantly reserve your team session.</p>
          </div>

          <div class="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3" style="border-radius: 20px 20px 48px 20px">
            <div class="flex items-center gap-3">
              <span class="text-2xl p-2 bg-white rounded-2xl shadow-2xs">{{ symbol }}</span>
              <div>
                <h4 class="text-sm font-black text-slate-900">{{ title }}</h4>
                <p class="text-xs font-bold text-[#33C4F0]">{{ provider }}</p>
              </div>
            </div>

            <div class="divide-y divide-slate-200/60 text-xs font-semibold text-slate-700">
              <div class="py-2 flex justify-between">
                <span class="text-slate-400">Date Range</span>
                <span class="font-extrabold text-slate-900">{{ formattedDateString }}</span>
              </div>
              <div class="py-2 flex justify-between">
                <span class="text-slate-400">Time Slot</span>
                <span class="font-extrabold text-slate-900">{{ selectedTimeSlot }}</span>
              </div>
              <div class="py-2 flex justify-between">
                <span class="text-slate-400">Allocated Seats</span>
                <span class="font-extrabold text-slate-900">{{ seatsCount }} Pass Seats</span>
              </div>
              <div class="py-2 flex justify-between">
                <span class="text-slate-400">Bulk Invites</span>
                <span class="font-extrabold text-[#10B981]">{{ invitedEmails.length }} Emails Sent</span>
              </div>
            </div>
          </div>

          <div class="bg-[#ECFDF5] p-3 rounded-2xl border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
            <PhCheck :size="18" class="text-emerald-600 shrink-0" weight="bold" />
            <span>Instant confirmation with your CreativeSelf corporate pass.</span>
          </div>
        </div>
      </div>

      <!-- Modal Footer Controls -->
      <div class="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
        <button
          type="button"
          :class="[
            'px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-extrabold text-slate-700 transition cursor-pointer',
            step > 1 ? 'flex items-center gap-1' : '',
          ]"
          @click="goBack"
        >
          <template v-if="step > 1"><PhCaretLeft :size="14" weight="bold" /> Back</template>
          <template v-else>Cancel</template>
        </button>

        <button
          v-if="step < 4"
          type="button"
          class="px-6 py-2.5 rounded-full bg-[#33C4F0] hover:bg-[#1AB0DC] text-white text-xs font-extrabold shadow-md transition flex items-center gap-1 cursor-pointer ml-auto"
          @click="goNext"
        >
          Next <PhCaretRight :size="14" weight="bold" />
        </button>
        <button
          v-else
          type="button"
          class="px-6 py-2.5 rounded-full bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold shadow-md transition flex items-center gap-1.5 cursor-pointer ml-auto"
          @click="handleFinalConfirm"
        >
          <PhSparkle :size="15" weight="fill" class="text-amber-400" /> Confirm &amp; Complete Booking
        </button>
      </div>
    </Motion>
  </AnimatePresence>
</template>
