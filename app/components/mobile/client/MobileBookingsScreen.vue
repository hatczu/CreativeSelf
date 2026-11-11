<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  PhCalendarBlank,
  PhCalendarDots,
  PhClock,
  PhMapPin,
  PhQrCode,
  PhMagnifyingGlass,
  PhCaretLeft,
  PhCaretRight,
  PhSlidersHorizontal,
  PhCheck,
  PhEye,
  PhSparkle,
  PhChatCircleDots,
} from '@phosphor-icons/vue';
import { bookingWeeks as weeksList, sampleAttendees } from '~/data/mobileCalendarData';

type CategoryTab = 'sessions' | 'workshops' | 'passes';

const app = useClientMobileApp();

const searchQuery = ref('');
const selectedCategoryTab = ref<CategoryTab>('sessions');
const selectedDateNum = ref<number | null>(null);
const currentWeekIndex = ref(2); // Default to August 2026
const isFullCalendarOpen = ref(false);

const currentWeek = computed(() => weeksList[currentWeekIndex.value] || weeksList[2]!);
const currentMonth = computed(() => currentWeek.value[0]!.month);

const handlePrevMonth = () => {
  for (let i = currentWeekIndex.value - 1; i >= 0; i--) {
    if (weeksList[i]![0]!.month !== currentMonth.value) {
      const targetMonth = weeksList[i]![0]!.month;
      const firstWeekIdx = weeksList.findIndex((w) => w[0]!.month === targetMonth);
      currentWeekIndex.value = firstWeekIdx !== -1 ? firstWeekIdx : i;
      return;
    }
  }
};

const handleNextMonth = () => {
  const nextMonthIdx = weeksList.findIndex((w, idx) => idx > currentWeekIndex.value && w[0]!.month !== currentMonth.value);
  if (nextMonthIdx !== -1) currentWeekIndex.value = nextMonthIdx;
};

const canPrevMonth = computed(() => weeksList.slice(0, currentWeekIndex.value).some((w) => w[0]!.month !== currentMonth.value));
const canNextMonth = computed(() => weeksList.slice(currentWeekIndex.value + 1).some((w) => w[0]!.month !== currentMonth.value));

const hasBookingOnDate = (dayNum: number) =>
  weeksList.some((w) => w.some((item) => item.month === currentMonth.value && item.date === dayNum && item.hasBooking));

const filteredBookings = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return app.myBookings.filter((bk) => {
    const matchesSearch =
      !searchQuery.value ||
      bk.activityName?.toLowerCase().includes(q) ||
      bk.vendorName?.toLowerCase().includes(q) ||
      bk.location?.toLowerCase().includes(q);

    const matchesDate = selectedDateNum.value === null || bk.date?.includes(`${selectedDateNum.value}`);

    let matchesTab = true;
    if (selectedCategoryTab.value === 'passes') matchesTab = Boolean(bk.qrCode);
    else if (selectedCategoryTab.value === 'workshops')
      matchesTab = bk.activityName?.toLowerCase().includes('watercolour') || bk.activityName?.toLowerCase().includes('workshop');

    return matchesSearch && matchesDate && matchesTab;
  });
});

const categoryTabs = [
  { id: 'sessions', label: 'Sessions', icon: PhChatCircleDots },
  { id: 'workshops', label: 'Events & Workshops', icon: PhCalendarBlank },
  { id: 'passes', label: 'Mobile Passes', icon: PhQrCode },
] as const;

const toggleDate = (date: number) => {
  selectedDateNum.value = selectedDateNum.value === date ? null : date;
};

const resetAndDiscover = () => {
  selectedDateNum.value = null;
  searchQuery.value = '';
  app.setActiveTab('discover');
};

const stripDayClass = (date: number) => [
  'flex flex-col items-center justify-center flex-1 min-w-[42px] max-w-[52px] h-[61px] pt-[8px] pb-[14px] transition relative shrink-0 cursor-pointer',
  selectedDateNum.value === date ? 'bg-[#1AB0DC] text-white shadow-xs' : 'bg-white border border-[#E2E8F0]/80 hover:border-slate-300',
];
const stripTextClass = (date: number, hasBooking: boolean, base: string, idle: string) => [
  base,
  selectedDateNum.value === date ? 'text-white' : hasBooking ? 'text-[#1AB0DC]' : idle,
];
const gridDayClass = (dayNum: number) => [
  'h-9 flex flex-col items-center justify-center text-[12px] font-bold transition relative cursor-pointer',
  selectedDateNum.value === dayNum
    ? 'bg-[#1AB0DC] text-white shadow-xs'
    : hasBookingOnDate(dayNum)
      ? 'bg-[#ECFEFF] text-[#1AB0DC] border border-[#A2F4FD]'
      : 'bg-white text-[#314158] border border-slate-200/60 hover:bg-slate-100',
];
</script>

<template>
  <div class="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <!-- TOP HEADER BLOCK -->
    <div class="w-full px-4 pt-5 pb-4 space-y-3 border-b border-slate-100/80" style="background: linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 60%, #ffffff 100%)">
      <!-- Header Row -->
      <div class="flex items-start justify-between">
        <div>
          <div class="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full w-fit mb-2.5">
            <span class="text-[10px] font-semibold text-[#007595] leading-[15px]" style="font-family: Poppins, sans-serif">
              {{ app.myBookings.length }} {{ app.myBookings.length === 1 ? 'Active Booking' : 'Active Bookings' }}
            </span>
          </div>

          <h2 class="text-[18px] font-semibold text-[#1A1A28] leading-tight" style="font-family: Century Gothic, Poppins, sans-serif">Schedule</h2>
        </div>

        <!-- Calendar Toggle Button -->
        <button
          type="button"
          :class="[
            'w-[44px] h-[40px] border flex items-center justify-center pr-[2px] transition shrink-0 cursor-pointer',
            isFullCalendarOpen ? 'bg-[#007595] border-[#007595] text-white shadow-xs' : 'bg-[#F8FDFF] border-[#33C4F0] text-[#147C9E] hover:bg-[#E8F9FF]',
          ]"
          style="border-radius: 20px 20px 48px 20px"
          :title="isFullCalendarOpen ? 'Hide Full Calendar' : 'View Full Calendar'"
          @click="isFullCalendarOpen = !isFullCalendarOpen"
        >
          <PhCalendarDots :size="18" :weight="isFullCalendarOpen ? 'fill' : 'regular'" />
        </button>
      </div>

      <!-- Month Navigator Row -->
      <div class="bg-[#F8FAFC] px-3 py-2 flex items-center justify-between border border-[#E2E8F0]/60 h-[46px]" style="border-radius: 16px 16px 36px 16px">
        <button
          type="button"
          :disabled="!canPrevMonth"
          class="w-7 h-7 flex items-center justify-center text-[#45556C] hover:text-slate-900 disabled:opacity-30 transition cursor-pointer"
          title="Previous Month"
          @click="handlePrevMonth"
        >
          <PhCaretLeft :size="14" weight="bold" />
        </button>
        <span class="text-[13px] font-bold text-[#0F172B] leading-[20px]" style="font-family: Century Gothic, sans-serif">
          {{ currentWeek[0]!.month }} {{ currentWeek[0]!.year }}
        </span>
        <button
          type="button"
          :disabled="!canNextMonth"
          class="w-7 h-7 flex items-center justify-center text-[#45556C] hover:text-slate-900 disabled:opacity-30 transition cursor-pointer"
          title="Next Month"
          @click="handleNextMonth"
        >
          <PhCaretRight :size="14" weight="bold" />
        </button>
      </div>

      <!-- INLINE FULL MONTH CALENDAR VIEW -->
      <div v-if="isFullCalendarOpen" class="bg-[#F8FAFC]/80 p-3 border border-[#E2E8F0] space-y-2.5 rounded-2xl animate-in fade-in duration-200">
        <div class="grid grid-cols-7 gap-1 text-center">
          <span
            v-for="d in ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']"
            :key="d"
            class="text-[9px] font-semibold text-[#64748B]"
            style="font-family: Poppins, sans-serif"
          >
            {{ d }}
          </span>
        </div>

        <div class="grid grid-cols-7 gap-1.5">
          <button
            v-for="dayNum in 31"
            :key="dayNum"
            type="button"
            :class="gridDayClass(dayNum)"
            style="border-radius: 10px 10px 22px 10px; font-family: Century Gothic, sans-serif"
            @click="toggleDate(dayNum)"
          >
            {{ dayNum }}
          </button>
        </div>

        <div class="flex items-center justify-between pt-1.5 border-t border-slate-200/60 text-[11px]">
          <button v-if="selectedDateNum !== null" type="button" class="text-[#007595] font-semibold hover:underline cursor-pointer" @click="selectedDateNum = null">
            Clear Filter ({{ currentWeek[0]!.month }} {{ selectedDateNum }})
          </button>
          <span v-else class="text-[10px] text-slate-400">Tap a date to filter schedule</span>
          <button
            type="button"
            class="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-200/80 hover:bg-slate-300 rounded-brand-sm transition cursor-pointer"
            @click="isFullCalendarOpen = false"
          >
            Collapse Calendar
          </button>
        </div>
      </div>

      <!-- Horizontal Date Selector Strip -->
      <div v-else class="flex items-center gap-1.5 justify-between pt-0.5">
        <button
          type="button"
          :disabled="currentWeekIndex === 0"
          class="w-4 h-7 p-0 bg-transparent border-0 flex items-center justify-center text-[#45556C] hover:text-[#0F172B] disabled:opacity-30 transition shrink-0 self-center cursor-pointer shadow-none outline-none focus:outline-none"
          title="Previous Week"
          @click="currentWeekIndex = Math.max(0, currentWeekIndex - 1)"
        >
          <PhCaretLeft :size="16" weight="bold" />
        </button>

        <div class="flex items-center gap-1 overflow-x-auto py-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1 justify-between">
          <button
            v-for="item in currentWeek.slice(0, 7)"
            :key="`${item.month}-${item.date}`"
            type="button"
            :class="stripDayClass(item.date)"
            style="border-radius: 14px 14px 34px 14px"
            @click="toggleDate(item.date)"
          >
            <span
              :class="stripTextClass(item.date, item.hasBooking, 'text-[9px] font-semibold uppercase', 'text-[#314158] opacity-80')"
              style="font-family: Poppins, sans-serif"
            >
              {{ item.day }}
            </span>
            <span :class="stripTextClass(item.date, item.hasBooking, 'text-[14px] font-bold mt-0.5', 'text-[#314158]')" style="font-family: Century Gothic, sans-serif">
              {{ item.date }}
            </span>
          </button>
        </div>

        <button
          type="button"
          :disabled="currentWeekIndex === weeksList.length - 1"
          class="w-4 h-7 p-0 bg-transparent border-0 flex items-center justify-center text-[#45556C] hover:text-[#0F172B] disabled:opacity-30 transition shrink-0 self-center cursor-pointer shadow-none outline-none focus:outline-none"
          title="Next Week"
          @click="currentWeekIndex = Math.min(weeksList.length - 1, currentWeekIndex + 1)"
        >
          <PhCaretRight :size="16" weight="bold" />
        </button>
      </div>

      <!-- Search Input Box -->
      <div
        class="w-full h-[40px] bg-white border border-[#E2E8F0] flex items-center px-[12px] gap-[8px] transition focus-within:border-[#33C4F0]"
        style="border-radius: 20px 20px 48px 20px"
      >
        <PhMagnifyingGlass :size="16" class="text-[#90A1B9] shrink-0" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full h-full bg-transparent text-[12px] font-medium text-slate-900 placeholder:text-[#90A1B9] focus:outline-none"
          style="font-family: Poppins, sans-serif"
        />
        <button type="button" class="text-[#90A1B9] hover:text-slate-700 transition p-1" @click="searchQuery = ''">
          <PhSlidersHorizontal :size="16" />
        </button>
      </div>

      <!-- Category Pills -->
      <div class="flex gap-2 overflow-x-auto pt-1 pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button
          v-for="tab in categoryTabs"
          :key="tab.id"
          type="button"
          style="border-radius: 20px 20px 48px 20px"
          :class="[
            'h-[30.5px] px-3.5 text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap transition',
            selectedCategoryTab === tab.id ? 'bg-[#1AB0DC] text-white shadow-xs' : 'bg-white text-[#45556C] border border-[#E2E8F0] hover:border-slate-300',
          ]"
          @click="selectedCategoryTab = tab.id"
        >
          <component :is="tab.icon" :size="15" :class="selectedCategoryTab === tab.id ? 'text-white' : 'text-[#45556C]'" />
          <span style="font-family: Poppins, sans-serif">{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- SCHEDULE BOOKINGS CONTENT LIST -->
    <div class="p-2.5 space-y-2.5 relative z-10 pb-6">
      <div
        v-for="bk in filteredBookings"
        :key="bk.id"
        class="w-full bg-white p-4 space-y-3 transition-all duration-200 overflow-hidden hover:shadow-md cursor-pointer group"
        style="border-radius: 20px 20px 48px 20px; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05)"
        @click="app.selectedBooking = bk"
      >
        <!-- Card Header Row -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <img v-if="bk.vendorLogo" :src="bk.vendorLogo" :alt="bk.vendorName" class="w-8 h-8 rounded-full object-cover shrink-0" />
            <span v-else class="text-xl p-1 bg-slate-100 rounded-brand-sm flex items-center justify-center w-8 h-8 shrink-0">{{ bk.symbol || '🎨' }}</span>
            <div class="min-w-0 flex-1">
              <p class="text-xs font-semibold text-slate-900 truncate group-hover:text-[#33C4F0] transition">{{ bk.vendorName }}</p>
              <p class="text-[11px] text-slate-400 truncate">Host &amp; Studio Partner</p>
            </div>
          </div>

          <span class="text-[11px] font-bold text-[#147C9E] bg-[#E8F9FF] px-2.5 py-1 rounded-brand-sm group-hover:bg-[#33C4F0] group-hover:text-white transition">
            View Details →
          </span>
        </div>

        <!-- Media Image Banner -->
        <div v-if="bk.image" class="relative h-[150px] w-full bg-slate-100 overflow-hidden isolate shadow-2xs cursor-pointer group" style="border-radius: 20px 20px 50px 20px">
          <img
            :src="bk.image"
            :alt="bk.activityName"
            class="w-full h-full object-cover relative z-0 group-hover:scale-105 transition-transform duration-300"
            @error="hideOnError"
          />
          <div class="absolute inset-0 z-[1]" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" />

          <div class="absolute top-2.5 right-2.5 z-[2]">
            <span
              class="text-[10px] font-semibold text-[#10B981] bg-white/95 backdrop-blur-md px-2.5 py-0.5 shadow-sm flex items-center gap-1"
              style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
            >
              <PhCheck :size="11" class="text-[#10B981]" /> {{ bk.status || 'Confirmed' }}
            </span>
          </div>

          <div class="absolute bottom-2.5 left-3 z-[2]">
            <span
              class="text-[10px] font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-0.5 flex items-center gap-1"
              style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
            >
              <PhClock :size="12" class="text-[#33C4F0]" /> {{ bk.date }}
            </span>
          </div>
        </div>

        <!-- Activity Details: Title & Time -->
        <div class="pt-0.5 space-y-0.5">
          <h4
            class="text-[16px] font-semibold text-[#0F172B] leading-[22px] truncate group-hover:text-[#1AB0DC] transition"
            style="font-family: Century Gothic, sans-serif"
          >
            {{ bk.activityName }}
          </h4>
          <p class="text-[11px] font-medium text-[#64748B] flex items-center gap-1" style="font-family: Poppins, sans-serif">
            <PhClock :size="13" class="text-[#33C4F0] shrink-0" />
            <span>{{ bk.time }}</span>
          </p>
        </div>

        <!-- Attendee Avatars Row -->
        <div class="flex items-center justify-between pt-0.5 pb-0.5">
          <div class="flex items-center">
            <div class="flex -space-x-2 overflow-hidden">
              <img
                v-for="att in sampleAttendees"
                :key="att.id"
                :src="att.image"
                :alt="att.name"
                class="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-2xs"
              />
            </div>
            <span
              class="ml-2 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5"
              style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
            >
              +{{ bk.seats + 2 }} going
            </span>
          </div>
        </div>

        <!-- Bottom Card Footer: Location -->
        <div class="flex items-center justify-between text-[11px] font-medium text-slate-600 pt-1">
          <span class="flex items-center gap-1 truncate" style="font-family: Poppins, sans-serif">
            <PhMapPin :size="13" class="text-[#33C4F0] shrink-0" />
            <span class="truncate">{{ bk.location }}</span>
          </span>
        </div>

        <!-- Action Buttons Row -->
        <div class="flex items-center gap-2 pt-1 border-t border-slate-100">
          <button
            type="button"
            class="flex-1 h-[36px] bg-[#F8FDFF] border border-[#33C4F0]/40 text-[#147C9E] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition hover:bg-[#E8F9FF] cursor-pointer"
            style="border-radius: 20px 20px 48px 20px; font-family: Century Gothic, sans-serif"
            @click.stop="app.selectedBooking = bk"
          >
            <PhEye :size="15" class="text-[#147C9E]" />
            Open Booking Page
          </button>
          <button
            type="button"
            class="flex-1 h-[36px] bg-[#33C4F0] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition hover:opacity-90 shadow-xs cursor-pointer"
            style="border-radius: 20px 20px 48px 20px; font-family: Century Gothic, sans-serif"
            @click.stop="app.selectedQrPass = bk"
          >
            <PhQrCode :size="15" />
            Show Pass
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredBookings.length === 0" class="bg-white p-8 text-center space-y-3.5 my-2 border border-slate-100 shadow-2xs" style="border-radius: 28px 28px 84px 28px">
        <div class="w-14 h-14 rounded-full bg-[#E8F9FF] border border-[#A2F4FD] flex items-center justify-center text-[#1AB0DC] mx-auto shadow-xs">
          <PhCalendarBlank :size="28" />
        </div>
        <div>
          <h4 class="text-base font-semibold text-[#1A1A28]" style="font-family: Century Gothic, sans-serif">
            {{ searchQuery || selectedDateNum ? 'No Matching Sessions' : 'No Active Bookings' }}
          </h4>
          <p class="text-xs text-[#6A7282] max-w-xs mx-auto mt-1 leading-relaxed" style="font-family: Poppins, sans-serif">
            {{
              searchQuery || selectedDateNum
                ? 'No bookings found for your selected date or search term. Try resetting your filter.'
                : 'Discover upcoming creative sessions, workshops, and wellness experiences to book your first pass.'
            }}
          </p>
        </div>
        <button
          type="button"
          class="px-6 py-2.5 bg-[#33C4F0] text-white text-xs font-semibold hover:opacity-90 transition shadow-xs inline-flex items-center gap-1.5"
          style="border-radius: 20px 20px 48px 20px; font-family: Century Gothic, sans-serif"
          @click="resetAndDiscover"
        >
          <PhSparkle :size="15" />
          Discover Sessions
        </button>
      </div>
    </div>
  </div>
</template>
