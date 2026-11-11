<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  PhQrCode,
  PhCalendarDots,
  PhCaretLeft,
  PhCaretRight,
  PhCaretDown,
  PhCaretUp,
  PhBuilding,
  PhListNumbers,
  PhX,
  PhMagnifyingGlass,
  PhClock,
  PhMapPin,
} from '@phosphor-icons/vue';
import { providerBookingWeeks as weeksList, providerSampleAttendees as sampleAttendees, type ProviderBooking } from '~/data/providerMobileData';

type CategoryTab = 'all' | 'needs-response' | 'confirmed';

const app = useProviderMobileApp();

const searchQuery = ref('');
const selectedCategoryTab = ref<CategoryTab>('all');
const selectedDateNum = ref<number | null>(null);
const expandedBookingId = ref<string | null>(null);
const currentWeekIndex = ref(2); // Default August 2026
const isFullCalendarOpen = ref(false);
const selectedRosterBooking = ref<ProviderBooking | null>(null);

const rosterGuests = [
  { name: 'Alex Rivera (Team Lead)', role: 'Creative Director', status: 'Checked In' },
  { name: 'Sarah Chen', role: 'UX Designer', status: 'Confirmed' },
  { name: 'Marcus Vance', role: 'Frontend Engineer', status: 'Confirmed' },
  { name: 'Elena Rostova', role: 'Brand Strategist', status: 'Checked In' },
  { name: 'Derrick Wu', role: 'Product Manager', status: 'Confirmed' },
];

const currentWeek = computed(() => weeksList[currentWeekIndex.value] || weeksList[1]!);
const currentMonth = computed(() => currentWeek.value[0]!.month);

const filteredBookings = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return app.bookingsList.filter((b) => {
    const matchesSearch = !searchQuery.value || b.session?.toLowerCase().includes(q) || b.company?.toLowerCase().includes(q) || b.group?.toLowerCase().includes(q);
    let matchesStatus = true;
    if (selectedCategoryTab.value === 'needs-response') matchesStatus = b.status === 'Needs response';
    if (selectedCategoryTab.value === 'confirmed') matchesStatus = b.status === 'Confirmed';
    const matchesDate = selectedDateNum.value === null || b.date?.includes(`${selectedDateNum.value}`);
    return matchesSearch && matchesStatus && matchesDate;
  });
});

const categoryTabs = computed(() => [
  { id: 'all' as CategoryTab, label: 'All Bookings', count: app.bookingsList.length },
  { id: 'needs-response' as CategoryTab, label: 'Needs Response', count: app.bookingsList.filter((b) => b.status === 'Needs response').length },
  { id: 'confirmed' as CategoryTab, label: 'Confirmed Bookings', count: app.bookingsList.filter((b) => b.status === 'Confirmed').length },
]);

const hasBookingOnDate = (dayNum: number) =>
  weeksList.some((w) => w.some((item) => item.month === currentMonth.value && item.date === dayNum && item.hasBooking));

const toggleDate = (date: number) => {
  selectedDateNum.value = selectedDateNum.value === date ? null : date;
};
const toggleExpand = (id: string) => {
  expandedBookingId.value = expandedBookingId.value === id ? null : id;
};
const bookingKey = (bk: ProviderBooking) => bk.id || bk.session;

const gridDayClass = (dayNum: number) => [
  'h-10 flex flex-col items-center justify-center text-[13px] font-bold transition relative cursor-pointer border-0',
  selectedDateNum.value === dayNum
    ? 'bg-[#1AB0DC] text-white shadow-xs'
    : hasBookingOnDate(dayNum)
      ? 'bg-[#ECFEFF] text-[#007595] hover:bg-[#E0F2FE]'
      : 'bg-transparent text-[#1A1A28] hover:bg-slate-100',
];
const stripTextClass = (date: number, hasBooking: boolean, base: string, idle: string) => [
  base,
  selectedDateNum.value === date ? 'text-white' : hasBooking ? 'text-[#1AB0DC]' : idle,
];
</script>

<template>
  <div
    class="flex-1 h-full overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
  >
    <!-- TOP HEADER BLOCK -->
    <div class="w-full px-4 pt-5 pb-4 space-y-3 border-b border-slate-100/80" style="background: linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 60%, #ffffff 100%)">
      <div class="flex items-start justify-between">
        <div>
          <div class="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full w-fit mb-2">
            <span class="text-[10px] font-semibold text-[#007595] leading-[15px]" style="font-family: Poppins, sans-serif">
              {{ app.bookingsList.length }} {{ app.bookingsList.length === 1 ? 'Booking Request' : 'Booking Requests' }}
            </span>
          </div>

          <h2 class="text-[18px] font-semibold text-[#1A1A28] leading-tight" style="font-family: Century Gothic, Poppins, sans-serif">Team Bookings &amp; Requests</h2>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            :class="[
              'w-[44px] h-[40px] border flex items-center justify-center transition shrink-0 cursor-pointer',
              isFullCalendarOpen ? 'bg-[#007595] border-[#007595] text-white shadow-xs' : 'bg-[#F8FDFF] border-[#33C4F0] text-[#147C9E] hover:bg-[#E8F9FF]',
            ]"
            style="border-radius: 20px 20px 48px 20px"
            :title="isFullCalendarOpen ? 'Hide Booking Dates' : 'View Booking Dates'"
            @click="isFullCalendarOpen = !isFullCalendarOpen"
          >
            <PhCalendarDots :size="18" :weight="isFullCalendarOpen ? 'fill' : 'regular'" />
          </button>

          <button
            type="button"
            class="h-[40px] px-3 bg-[#1AB0DC] hover:bg-[#007595] text-white text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
            @click="app.showQRScanner = true"
          >
            <PhQrCode :size="16" weight="bold" />
            <span class="hidden sm:inline">Scan Pass</span>
          </button>
        </div>
      </div>

      <!-- Month Navigator Row -->
      <div class="bg-[#F8FAFC] px-3 py-2 flex items-center justify-between border border-[#E2E8F0]/60 h-[44px]" style="border-radius: 16px 16px 36px 16px">
        <button
          type="button"
          :disabled="currentWeekIndex === 0"
          class="w-7 h-7 flex items-center justify-center text-[#45556C] hover:text-slate-900 disabled:opacity-30 transition cursor-pointer"
          title="Previous Month"
          @click="currentWeekIndex > 0 && currentWeekIndex--"
        >
          <PhCaretLeft :size="14" weight="bold" />
        </button>
        <span class="text-[13px] font-bold text-[#0F172B] leading-[20px]" style="font-family: Century Gothic, sans-serif">
          {{ currentWeek[0]!.month }} {{ currentWeek[0]!.year }}
        </span>
        <button
          type="button"
          :disabled="currentWeekIndex === weeksList.length - 1"
          class="w-7 h-7 flex items-center justify-center text-[#45556C] hover:text-slate-900 disabled:opacity-30 transition cursor-pointer"
          title="Next Month"
          @click="currentWeekIndex < weeksList.length - 1 && currentWeekIndex++"
        >
          <PhCaretRight :size="14" weight="bold" />
        </button>
      </div>

      <!-- INLINE FULL MONTH CALENDAR VIEW -->
      <div v-if="isFullCalendarOpen" class="bg-white/90 p-3.5 border border-slate-100/80 space-y-2.5 rounded-2xl animate-in fade-in duration-200 shadow-2xs">
        <div class="grid grid-cols-7 gap-1 text-center">
          <span v-for="d in ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']" :key="d" class="text-[9px] font-semibold text-[#64748B]" style="font-family: Poppins, sans-serif">
            {{ d }}
          </span>
        </div>

        <div class="grid grid-cols-7 gap-1.5">
          <button
            v-for="dayNum in 31"
            :key="dayNum"
            type="button"
            :class="gridDayClass(dayNum)"
            style="border-radius: 14px 14px 28px 14px; font-family: Century Gothic, sans-serif"
            @click="toggleDate(dayNum)"
          >
            <span>{{ dayNum }}</span>
            <span v-if="hasBookingOnDate(dayNum)" :class="['w-1.5 h-1.5 rounded-full mt-0.5', selectedDateNum === dayNum ? 'bg-white' : 'bg-[#EF4444]']" />
          </button>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
          <button v-if="selectedDateNum !== null" type="button" class="text-[#007595] font-semibold hover:underline cursor-pointer" @click="selectedDateNum = null">
            Clear Filter ({{ currentWeek[0]!.month }} {{ selectedDateNum }})
          </button>
          <span v-else class="text-[10px] text-slate-400">Tap a date to filter bookings</span>
          <button
            type="button"
            class="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-brand-sm transition cursor-pointer"
            @click="isFullCalendarOpen = false"
          >
            Collapse
          </button>
        </div>
      </div>

      <!-- HORIZONTAL WEEKLY STRIP -->
      <div v-else class="flex items-center gap-1.5 justify-between pt-0.5">
        <button
          type="button"
          :disabled="currentWeekIndex === 0"
          class="w-4 h-7 p-0 bg-transparent border-0 flex items-center justify-center text-[#45556C] hover:text-[#0F172B] disabled:opacity-30 transition shrink-0 cursor-pointer"
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
            :class="[
              'flex flex-col items-center justify-center flex-1 min-w-[42px] max-w-[52px] h-[58px] pt-[6px] pb-[8px] transition relative shrink-0 cursor-pointer border-0',
              selectedDateNum === item.date ? 'bg-[#1AB0DC] text-white shadow-xs' : 'bg-white hover:bg-slate-50',
            ]"
            style="border-radius: 14px 14px 34px 14px"
            @click="toggleDate(item.date)"
          >
            <span :class="stripTextClass(item.date, item.hasBooking, 'text-[9px] font-semibold uppercase', 'text-[#314158] opacity-80')" style="font-family: Poppins, sans-serif">
              {{ item.day }}
            </span>
            <span :class="stripTextClass(item.date, item.hasBooking, 'text-[14px] font-bold mt-0.5', 'text-[#314158]')" style="font-family: Century Gothic, sans-serif">
              {{ item.date }}
            </span>
            <span v-if="item.hasBooking" :class="['w-1.5 h-1.5 rounded-full mt-0.5', selectedDateNum === item.date ? 'bg-white' : 'bg-[#EF4444]']" />
          </button>
        </div>

        <button
          type="button"
          :disabled="currentWeekIndex === weeksList.length - 1"
          class="w-4 h-7 p-0 bg-transparent border-0 flex items-center justify-center text-[#45556C] hover:text-[#0F172B] disabled:opacity-30 transition shrink-0 cursor-pointer"
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
          placeholder="Search bookings, companies, guests..."
          class="w-full h-full bg-transparent text-[12px] font-medium text-slate-900 placeholder:text-[#90A1B9] focus:outline-none"
          style="font-family: Poppins, sans-serif"
        />
        <button v-if="searchQuery" type="button" class="text-[#90A1B9] hover:text-slate-700 transition p-1 cursor-pointer" @click="searchQuery = ''">
          <PhX :size="14" />
        </button>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex gap-2 overflow-x-auto pt-1 pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button
          v-for="tab in categoryTabs"
          :key="tab.id"
          type="button"
          style="border-radius: 20px 20px 48px 20px"
          :class="[
            'h-[30.5px] px-3.5 text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer',
            selectedCategoryTab === tab.id ? 'bg-[#1AB0DC] text-white shadow-xs' : 'bg-white text-[#45556C] border border-[#E2E8F0] hover:border-slate-300',
          ]"
          @click="selectedCategoryTab = tab.id"
        >
          <span style="font-family: Poppins, sans-serif">{{ tab.label }} ({{ tab.count }})</span>
        </button>
      </div>
    </div>

    <!-- BOOKINGS CONTENT LIST -->
    <div class="p-2.5 space-y-2.5 relative z-10 pb-6">
      <div v-if="filteredBookings.length === 0" class="py-16 text-center text-slate-400 font-medium text-xs">No team bookings match the selected date or filter.</div>
      <div
        v-for="bk in filteredBookings"
        v-else
        :key="bookingKey(bk)"
        class="bg-white border border-[#E2E8F0] p-4 shadow-2xs hover:border-[#1AB0DC] transition cursor-pointer space-y-3 group"
        style="border-radius: 20px 20px 48px 20px"
        @click="toggleExpand(bookingKey(bk))"
      >
        <!-- Main Card Header Row -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <div
              class="w-[46px] h-[46px] rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-2xs"
              :style="{ borderRadius: '14px 14px 32px 14px', background: `${bk.color || '#1AB0DC'}18` }"
            >
              {{ bk.emoji || '🎨' }}
            </div>

            <div class="min-w-0">
              <p class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: bk.color || '#007595' }">{{ bk.date }}</p>
              <h3 class="text-[15px] font-bold text-[#1A1A28] leading-tight mt-0.5 truncate" style="font-family: Century Gothic, Poppins, sans-serif">{{ bk.session }}</h3>
              <p class="text-[11px] text-[#6A7282] font-medium flex items-center gap-1.5 mt-0.5">
                <PhBuilding :size="13" class="text-[#1AB0DC]" />
                <span>{{ bk.company }} · {{ bk.group }}</span>
              </p>
            </div>
          </div>

          <div class="flex flex-col items-end gap-1 shrink-0">
            <span
              :class="[
                'text-[10px] font-bold px-2.5 py-0.5 rounded-brand-sm',
                bk.status === 'Confirmed' ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]' : 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]',
              ]"
            >
              {{ bk.status }}
            </span>
            <button type="button" class="text-slate-400 group-hover:text-slate-700 transition p-1">
              <PhCaretUp v-if="expandedBookingId === bookingKey(bk)" :size="14" />
              <PhCaretDown v-else :size="14" />
            </button>
          </div>
        </div>

        <!-- EXPANDABLE DETAILS BOX -->
        <div v-if="expandedBookingId === bookingKey(bk)" class="bg-[#F8FAFC] p-3.5 border border-[#E2E8F0]/80 rounded-2xl space-y-3 animate-in fade-in duration-150">
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="flex items-center gap-2 text-[#45556C]">
              <PhClock :size="15" class="text-[#1AB0DC]" />
              <div>
                <p class="text-[9px] font-bold text-slate-400 uppercase">BOOKING TIME SLOT</p>
                <p class="font-bold text-[#1A1A28] text-[11px]">3:00 PM – 4:30 PM</p>
              </div>
            </div>

            <div class="flex items-center gap-2 text-[#45556C]">
              <PhMapPin :size="15" class="text-[#1AB0DC]" />
              <div>
                <p class="text-[9px] font-bold text-slate-400 uppercase">SESSION LOCATION</p>
                <p class="font-bold text-[#1A1A28] text-[11px]">Studio Lumen HQ</p>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2 overflow-hidden">
                <img v-for="att in sampleAttendees" :key="att.id" :src="att.image" :alt="att.name" class="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" />
              </div>
              <span class="text-[10px] font-semibold text-[#6A7282]">+ {{ bk.group || '12 guests' }}</span>
            </div>

            <span class="text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded-brand-sm border border-[#A7F3D0]">Est. Payout: $675.00</span>
          </div>
        </div>

        <!-- Bottom Action Controls -->
        <div class="flex items-center gap-2 pt-1" @click.stop>
          <button
            v-if="bk.status !== 'Confirmed'"
            type="button"
            class="flex-1 py-2 bg-[#EF4444] hover:bg-rose-600 text-white text-[11px] font-semibold transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
            style="border-radius: 14px 14px 28px 14px; font-family: Poppins, sans-serif"
            @click="app.selectedBooking = bk"
          >
            Review Request
          </button>
          <button
            v-else
            type="button"
            class="flex-1 py-2 bg-[#F8FAFC] hover:bg-[#E8F9FF] hover:text-[#007595] text-slate-700 text-[11px] font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer border border-[#E2E8F0]"
            style="border-radius: 14px 14px 28px 14px; font-family: Poppins, sans-serif"
            @click="selectedRosterBooking = bk"
          >
            <PhListNumbers :size="14" />
            <span>View Guest Roster</span>
          </button>

          <button
            type="button"
            class="px-3.5 py-2 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-[11px] font-semibold transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
            style="border-radius: 14px 14px 28px 14px"
            title="Scan Pass"
            @click="app.showQRScanner = true"
          >
            <PhQrCode :size="15" />
          </button>
        </div>
      </div>
    </div>

    <!-- ROSTER MODAL DRAWER -->
    <div v-if="selectedRosterBooking" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
      <div
        class="w-full max-w-md bg-white p-5 shadow-2xl relative animate-in slide-in-from-bottom duration-250 max-h-[85vh] flex flex-col"
        style="border-radius: 24px 24px 0 0"
      >
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div>
            <p class="text-[10px] font-semibold uppercase tracking-wider text-[#007595]">Attendee Roster</p>
            <h3 class="text-sm font-bold text-[#1A1A28]">{{ selectedRosterBooking.company }} ({{ selectedRosterBooking.group }})</h3>
          </div>
          <button type="button" class="w-7 h-7 rounded-brand-sm bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer" @click="selectedRosterBooking = null">
            <PhX :size="15" weight="bold" />
          </button>
        </div>

        <div class="mt-3 space-y-2 overflow-y-auto pr-1 flex-1">
          <div
            v-for="guest in rosterGuests"
            :key="guest.name"
            class="bg-slate-50 p-2.5 border border-slate-100 flex items-center justify-between text-xs"
            style="border-radius: 12px 12px 24px 12px"
          >
            <div>
              <p class="font-semibold text-[#1A1A28]">{{ guest.name }}</p>
              <p class="text-[10px] text-slate-400">{{ guest.role }}</p>
            </div>
            <span :class="['text-[9px] font-semibold px-2 py-0.5 rounded-brand-sm', guest.status === 'Checked In' ? 'bg-[#ECFDF5] text-[#047857]' : 'bg-slate-200 text-slate-600']">
              {{ guest.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
