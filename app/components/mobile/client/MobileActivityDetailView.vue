<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhCaretLeft, PhBookmarkSimple, PhStar, PhShieldCheck, PhClock, PhMapPin, PhCheck, PhSparkle, PhEye, PhCheckCircle, PhX, PhCalendarPlus } from '@phosphor-icons/vue';
import { mockVendors } from '~/data/subscriptionData';

const app = useClientMobileApp();
const sub = useSubscription();

const selectedSlotIdx = ref<number | null>(0);
const customDate = ref<string | null>(null);
const showCustomDatePicker = ref(false);
const selectedCustomDay = ref(14);
const selectedCustomTime = ref('02:00 PM - 03:30 PM');
const seatsCount = ref(1);
const isBookedSuccess = ref(false);

const activity = computed(() => app.selectedActivity);
const isSubscribedToBrand = computed(() => sub.selectedBrand?.id === activity.value?.vendorId);
const isSaved = computed(() => !!activity.value && app.savedActivityIds.includes(activity.value.id));

const timeSlots = ['09:30 AM - 11:00 AM', '02:00 PM - 03:30 PM', '05:00 PM - 06:30 PM'];

const handleSimpleBooking = () => {
  const act = activity.value;
  if (!act) return;
  if (!isSubscribedToBrand.value) {
    const vendor = mockVendors.find((v) => v.id === act.vendorId);
    if (vendor) {
      sub.selectBrand({ id: vendor.id, name: vendor.name, rating: vendor.rating, specialty: vendor.specialty, color: vendor.color, avatar: vendor.avatar });
    }
  }
  app.handleConfirmBooking(act);
  isBookedSuccess.value = true;
};

const handleSelectCustomDate = () => {
  customDate.value = `Aug ${selectedCustomDay.value}, 2026 • ${selectedCustomTime.value}`;
  selectedSlotIdx.value = null;
  showCustomDatePicker.value = false;
};

const selectSlot = (idx: number) => {
  selectedSlotIdx.value = idx;
  customDate.value = null;
};

const clearCustomDate = () => {
  customDate.value = null;
  selectedSlotIdx.value = 0;
};
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="activity"
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
          @click="app.setSelectedActivity(null)"
        >
          <PhCaretLeft :size="16" weight="bold" /> Back to Discover
        </button>

        <button
          type="button"
          :class="[
            'p-2 rounded-brand border transition cursor-pointer',
            isSaved ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100',
          ]"
          @click="app.toggleSaveActivity(activity.id)"
        >
          <PhBookmarkSimple :size="16" :weight="isSaved ? 'fill' : 'regular'" />
        </button>
      </div>

      <!-- Scrollable Content Body -->
      <div class="pb-28 flex-1 divide-y divide-slate-100">
        <!-- Preview Mode Notice -->
        <div
          v-if="!isSubscribedToBrand"
          class="bg-[#E8F9FF] border-b border-[#33C4F0]/30 px-4 py-2.5 flex items-center justify-between text-xs text-[#147C9E] font-semibold"
        >
          <span class="flex items-center gap-2">
            <PhEye :size="16" class="text-[#33C4F0] shrink-0" />
            Preview Mode — Subscribe to {{ activity.vendorName }} to redeem.
          </span>
        </div>

        <!-- Hero Section -->
        <div class="p-4 space-y-3">
          <div class="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 shadow-2xs" style="border-radius: 20px 20px 48px 20px">
            <img :src="activity.image" :alt="activity.name" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#1A1A28] text-xs font-bold px-3 py-1 rounded-brand-sm shadow-md flex items-center gap-1.5">
              <span>{{ activity.symbol }}</span> {{ activity.category }}
            </div>

            <div class="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs font-black px-2.5 py-1 rounded-brand-sm shadow-md flex items-center gap-1">
              <PhStar :size="13" weight="fill" /> {{ activity.rating }}
            </div>
          </div>

          <div class="pt-1 space-y-1">
            <div class="flex items-center gap-1.5">
              <p class="text-xs font-extrabold text-[#33C4F0]">{{ activity.vendorName }}</p>
              <PhShieldCheck :size="14" class="text-[#33C4F0]" weight="fill" />
            </div>
            <h1 class="text-xl font-black text-[#1A1A28] leading-snug tracking-tight">{{ activity.name }}</h1>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            <div class="bg-slate-50 p-3 rounded-2xl flex items-center gap-2.5 border border-slate-100">
              <PhClock :size="18" class="text-[#33C4F0] shrink-0" />
              <div>
                <p class="text-[9px] text-slate-400 font-bold uppercase">DURATION</p>
                <p class="text-xs font-extrabold text-[#1A1A28]">{{ activity.duration }}</p>
              </div>
            </div>
            <div class="bg-slate-50 p-3 rounded-2xl flex items-center gap-2.5 border border-slate-100">
              <PhMapPin :size="18" class="text-[#33C4F0] shrink-0" />
              <div>
                <p class="text-[9px] text-slate-400 font-bold uppercase">LOCATION</p>
                <p class="text-xs font-extrabold text-[#1A1A28] truncate">{{ activity.location }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Description & Overview -->
        <div class="p-4 space-y-2">
          <h2 class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">About This Experience</h2>
          <p class="text-xs text-slate-600 leading-relaxed font-semibold">{{ activity.description }}</p>
        </div>

        <!-- Session Highlights -->
        <div class="p-4 space-y-3">
          <h3 class="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E]">What's Included in Your Session</h3>
          <div class="space-y-2">
            <div v-for="(highlight, index) in activity.highlights" :key="index" class="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <span class="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58] mt-0.5">
                <PhCheck :size="12" weight="bold" />
              </span>
              <span class="text-xs font-semibold text-[#1A1A28] leading-tight">{{ highlight }}</span>
            </div>
          </div>
        </div>

        <!-- BOOKING SECTION -->
        <div class="p-4 space-y-3">
          <div class="bg-[#1A1A28] p-5 text-white shadow-xl relative overflow-hidden space-y-4" style="border-radius: 20px 20px 48px 20px">
            <!-- SUCCESS CONFIRMATION -->
            <div v-if="isBookedSuccess" class="py-4 text-center space-y-3">
              <div class="mx-auto w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center text-2xl">
                <PhCheckCircle :size="32" weight="fill" />
              </div>
              <h3 class="text-base font-extrabold text-white">Booking Confirmed!</h3>
              <p class="text-xs text-white/70">
                Your seat for "{{ activity.name }}" is confirmed for {{ customDate || 'your selected slot' }}. View check-in ticket in My Bookings.
              </p>
              <button
                type="button"
                class="px-4 py-2 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] text-xs font-extrabold rounded-brand-sm transition cursor-pointer"
                @click="isBookedSuccess = false"
              >
                Book Another Slot
              </button>
            </div>

            <!-- SLOT PICKER -->
            <template v-else>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">Reserve Session</span>
                  <h3 class="text-base font-extrabold text-white mt-0.5">Select Date &amp; Schedule</h3>
                </div>
                <span class="text-[10px] font-extrabold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-brand-sm">Instant Confirmation</span>
              </div>

              <!-- Standard Schedule Slots List -->
              <div class="space-y-1.5">
                <label class="text-[10px] font-extrabold text-white/60 uppercase tracking-wider block">Available Upcoming Dates</label>
                <div class="space-y-2">
                  <button
                    v-for="(sch, idx) in activity.schedule"
                    :key="sch.id"
                    type="button"
                    :class="[
                      'w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition cursor-pointer',
                      selectedSlotIdx === idx && !customDate
                        ? 'border-[#33C4F0] bg-white/15 text-white font-extrabold ring-2 ring-[#33C4F0]'
                        : 'border-white/10 bg-white/5 text-white/80 font-medium hover:bg-white/10',
                    ]"
                    @click="selectSlot(idx)"
                  >
                    <div>
                      <p class="font-extrabold text-white">{{ sch.date }}</p>
                      <p class="text-[10px] text-white/60">{{ sch.time }}</p>
                    </div>
                    <span class="text-[10px] font-extrabold text-[#33C4F0] bg-[#33C4F0]/15 px-2 py-0.5 rounded-brand-sm border border-[#33C4F0]/30">
                      {{ sch.seatsLeft }} slots left
                    </span>
                  </button>

                  <!-- Custom Date Slot -->
                  <div
                    v-if="customDate"
                    class="w-full p-3 rounded-2xl border border-[#33C4F0] bg-[#33C4F0]/20 text-white flex items-center justify-between text-xs ring-2 ring-[#33C4F0]"
                  >
                    <div>
                      <p class="font-extrabold text-white flex items-center gap-1.5">
                        <PhSparkle :size="14" class="text-amber-300" weight="fill" /> {{ customDate.split('•')[0] }}
                      </p>
                      <p class="text-[10px] text-[#A2F4FD]">{{ customDate.split('•')[1] }}</p>
                    </div>
                    <button type="button" class="text-xs text-white/70 hover:text-white" @click="clearCustomDate">
                      <PhX :size="14" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- SELECT OTHER DATES BUTTON -->
              <button
                type="button"
                class="w-full py-2.5 bg-white/10 hover:bg-white/20 text-[#33C4F0] border border-[#33C4F0]/40 text-xs font-extrabold rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                @click="showCustomDatePicker = true"
              >
                <PhCalendarPlus :size="16" weight="bold" />
                Select Other Dates / Custom Calendar →
              </button>

              <!-- Seat Quantity Stepper -->
              <div class="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                <span class="font-extrabold text-white/80">Number of Seats:</span>
                <div class="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-2xl border border-white/10">
                  <button
                    type="button"
                    class="w-6 h-6 rounded-lg bg-white/10 text-white font-black flex items-center justify-center hover:bg-white/20"
                    @click="seatsCount = Math.max(1, seatsCount - 1)"
                  >
                    -
                  </button>
                  <span class="font-black text-white w-4 text-center">{{ seatsCount }}</span>
                  <button
                    type="button"
                    class="w-6 h-6 rounded-lg bg-white/10 text-white font-black flex items-center justify-center hover:bg-white/20"
                    @click="seatsCount = Math.min(10, seatsCount + 1)"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Primary CTA -->
              <button
                type="button"
                class="w-full py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] text-xs font-black rounded-brand-sm shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-2"
                @click="handleSimpleBooking"
              >
                <PhSparkle :size="16" weight="fill" class="text-[#1A1A28]" />
                {{
                  isSubscribedToBrand
                    ? `Confirm & Book (${seatsCount} ${seatsCount === 1 ? 'Seat' : 'Seats'})`
                    : `Subscribe to ${activity.vendorName} & Book`
                }}
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- CUSTOM DATE SELECTION MODAL -->
      <div v-if="showCustomDatePicker" class="absolute inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl w-full max-w-xs p-5 text-left space-y-4 shadow-2xl relative">
          <button
            type="button"
            class="absolute top-3.5 right-3.5 w-8 h-8 rounded-brand-sm bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
            @click="showCustomDatePicker = false"
          >
            <PhX :size="16" />
          </button>

          <div>
            <span class="text-[10px] font-extrabold text-[#33C4F0] uppercase tracking-wider">Custom Booking</span>
            <h3 class="text-base font-black text-slate-900 mt-0.5">Select Other Date</h3>
            <p class="text-xs text-slate-500">Pick any preferred date for August 2026.</p>
          </div>

          <!-- Month Days Grid -->
          <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
            <div class="flex items-center justify-between text-xs font-extrabold text-slate-900">
              <span>August 2026</span>
              <span class="text-[10px] font-bold text-[#33C4F0]">Select Day</span>
            </div>
            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="d in 31"
                :key="d"
                type="button"
                :class="[
                  'h-7 rounded-lg text-xs font-bold transition',
                  selectedCustomDay === d ? 'bg-[#33C4F0] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-100',
                ]"
                @click="selectedCustomDay = d"
              >
                {{ d }}
              </button>
            </div>
          </div>

          <!-- Time Slot Picker -->
          <div class="space-y-1.5">
            <label class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Select Time Slot</label>
            <div class="grid grid-cols-1 gap-1.5">
              <button
                v-for="t in timeSlots"
                :key="t"
                type="button"
                :class="[
                  'p-2.5 rounded-xl border text-xs font-bold text-left transition',
                  selectedCustomTime === t ? 'border-[#33C4F0] bg-[#E8F9FF] text-[#147C9E]' : 'border-slate-200 bg-slate-50 text-slate-700',
                ]"
                @click="selectedCustomTime = t"
              >
                {{ t }}
              </button>
            </div>
          </div>

          <button
            type="button"
            class="w-full py-3 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] font-extrabold text-xs rounded-brand-sm shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            @click="handleSelectCustomDate"
          >
            <PhCheck :size="16" weight="bold" /> Confirm Custom Date
          </button>
        </div>
      </div>
    </Motion>
  </AnimatePresence>
</template>
