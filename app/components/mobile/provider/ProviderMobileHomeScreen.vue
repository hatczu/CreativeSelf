<script setup lang="ts">
import { computed } from 'vue';
import { PhPlus, PhQrCode, PhSparkle, PhCaretRight, PhBell, PhImage, PhBuilding } from '@phosphor-icons/vue';

const app = useProviderMobileApp();

const pendingBooking = computed(() => app.bookingsList.find((b) => b.status === 'Needs response'));
const stats = [
  { value: '451', label: 'Profile Views' },
  { value: '13', label: 'Booking Requests' },
  { value: '4.9 ★', label: 'Avg Rating' },
];
</script>

<template>
  <div
    class="flex-1 h-full overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
  >
    <!-- 1. TOP HEADER BLOCK -->
    <div
      class="w-full px-4 pt-5 pb-4 space-y-3 border-b border-slate-100/80 relative overflow-hidden"
      style="background: linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 60%, #ffffff 100%)"
    >
      <div class="flex items-center justify-between">
        <div class="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full">
          <span class="text-[10px] font-semibold text-[#007595] leading-[15px]" style="font-family: Poppins, sans-serif">Provider Studio Portal</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="w-8 h-8 rounded-brand-sm bg-white text-slate-700 hover:bg-[#E8F9FF] hover:text-[#007595] border border-slate-200/80 flex items-center justify-center transition cursor-pointer shadow-2xs"
            title="Scan Attendee QR"
            @click="app.showQRScanner = true"
          >
            <PhQrCode :size="16" weight="bold" />
          </button>

          <button
            type="button"
            class="w-8 h-8 rounded-brand-sm bg-white text-slate-700 hover:bg-[#E8F9FF] hover:text-[#007595] border border-slate-200/80 flex items-center justify-center transition relative cursor-pointer shadow-2xs"
            title="Notifications"
            @click="app.setActiveTab('bookings')"
          >
            <PhBell :size="16" weight="bold" />
            <span
              v-if="app.pendingBookingCount > 0"
              class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#EF4444] text-white text-[8px] font-extrabold flex items-center justify-center"
            >
              {{ app.pendingBookingCount }}
            </span>
          </button>
        </div>
      </div>

      <!-- Studio Branding Title -->
      <div class="flex items-center gap-3 pt-1">
        <div class="w-12 h-12 rounded-2xl bg-[#EF4444] text-2xl flex items-center justify-center shadow-xs shrink-0 ring-2 ring-white">🎨</div>
        <div>
          <h1 class="text-[20px] font-bold text-[#1A1A28] leading-tight" style="font-family: Century Gothic, Poppins, sans-serif">Studio Lumen</h1>
          <p class="text-[12px] text-[#6A7282] font-normal">Heart of Art Studio · Live on Marketplace</p>
        </div>
      </div>

      <!-- Quick Studio Action Buttons -->
      <div class="flex gap-2 pt-2">
        <button
          type="button"
          class="flex-1 py-2 px-3 bg-[#1AB0DC] hover:bg-[#007595] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
          @click="app.showServiceModal = true"
        >
          <PhPlus :size="14" weight="bold" />
          <span>New Service</span>
        </button>

        <button
          type="button"
          class="flex-1 py-2 px-3 bg-white border border-slate-200 text-slate-700 hover:border-[#1AB0DC] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
          @click="app.showStoryComposer = true"
        >
          <PhImage :size="14" class="text-[#1AB0DC]" />
          <span>Post Story</span>
        </button>

        <button
          type="button"
          class="py-2 px-3 bg-white border border-slate-200 text-slate-700 hover:border-[#1AB0DC] text-[11px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs"
          style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
          title="Scan QR Pass"
          @click="app.showQRScanner = true"
        >
          <PhQrCode :size="15" class="text-[#007595]" />
        </button>
      </div>
    </div>

    <div class="p-3.5 space-y-3.5">
      <!-- 2. MARKETPLACE PULSE STATS CARD -->
      <div class="w-full bg-white border border-slate-100/80 p-4 shadow-2xs relative overflow-hidden space-y-3" style="border-radius: 28px 28px 84px 28px">
        <div
          class="absolute pointer-events-none rounded-full"
          style="width: 120px; height: 120px; right: -20px; top: -30px; background-color: rgba(51, 196, 240, 0.12); filter: blur(36px)"
        />

        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <span class="text-[10px] font-bold text-[#007595] uppercase tracking-wider">Marketplace Pulse</span>
            <h2 class="text-[14px] font-bold text-[#1A1A28] mt-0.5" style="font-family: Century Gothic, Poppins, sans-serif">Studio Performance (30 Days)</h2>
          </div>
          <span class="text-[10px] font-semibold text-[#007595] bg-[#ECFEFF] border border-[#A2F4FD] px-2.5 py-0.5 rounded-brand-sm">+18% Views</span>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center pt-1">
          <div v-for="stat in stats" :key="stat.label" class="bg-slate-50/80 p-2.5 border border-slate-100" style="border-radius: 14px 14px 28px 14px">
            <p class="text-[18px] font-extrabold text-[#1AB0DC]">{{ stat.value }}</p>
            <p class="text-[10px] font-semibold text-[#6A7282] mt-0.5">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- 3. PENDING BOOKING REQUEST ALERT CARD -->
      <div
        v-if="pendingBooking"
        class="w-full bg-[#FFFBEB] border border-[#FDE68A] p-4 shadow-2xs flex items-center justify-between"
        style="border-radius: 20px 20px 48px 20px"
      >
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-10 h-10 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            {{ app.pendingBookingCount }}
          </div>
          <div class="min-w-0">
            <span class="text-[10px] font-bold text-[#92400E] uppercase tracking-wider">Action Required</span>
            <h3 class="text-[13px] font-bold text-[#78350F] truncate mt-0.5">{{ pendingBooking.company }} Booking Request</h3>
            <p class="text-[11px] text-[#B45309] font-medium truncate">{{ pendingBooking.session }} ({{ pendingBooking.group }})</p>
          </div>
        </div>

        <button
          type="button"
          class="px-3.5 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-[11px] font-semibold transition shrink-0 cursor-pointer shadow-xs"
          style="border-radius: 14px 14px 28px 14px; font-family: Poppins, sans-serif"
          @click="app.selectedBooking = pendingBooking"
        >
          Review
        </button>
      </div>

      <!-- 4. UPCOMING TEAM SESSIONS LIST -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between px-1">
          <h2 class="text-[14px] font-bold text-[#1A1A28]" style="font-family: Century Gothic, Poppins, sans-serif">Upcoming Team Sessions</h2>
          <button type="button" class="text-[11px] font-semibold text-[#007595] hover:underline" @click="app.setActiveTab('bookings')">
            View all ({{ app.bookingsList.length }})
          </button>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="b in app.bookingsList"
            :key="b.session"
            class="bg-white border border-slate-100/80 p-3.5 shadow-2xs hover:border-[#1AB0DC] transition cursor-pointer space-y-2.5"
            style="border-radius: 20px 20px 48px 20px"
            @click="app.selectedBooking = b"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0" :style="{ background: `${b.color || '#1AB0DC'}18` }">
                  {{ b.emoji }}
                </div>
                <div class="min-w-0">
                  <p class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: b.color || '#007595' }">{{ b.date }}</p>
                  <h3 class="text-[13px] font-bold text-[#1A1A28] truncate mt-0.5">{{ b.session }}</h3>
                  <p class="text-[11px] text-[#6A7282] font-medium flex items-center gap-1 mt-0.5">
                    <PhBuilding :size="12" class="text-[#1AB0DC]" />
                    <span>{{ b.company }} · {{ b.group }}</span>
                  </p>
                </div>
              </div>

              <span
                :class="[
                  'text-[10px] font-bold px-2.5 py-0.5 rounded-brand-sm shrink-0',
                  b.status === 'Confirmed' ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]' : 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]',
                ]"
              >
                {{ b.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. ACUMEN SUGGESTION CARD -->
      <div class="w-full bg-[#1A1A28] text-white p-4 shadow-md flex items-center justify-between relative overflow-hidden" style="border-radius: 20px 20px 48px 20px">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-[#33C4F0]/20 rounded-full blur-xl pointer-events-none" />

        <div class="pr-2 min-w-0 z-10">
          <div class="flex items-center gap-1.5">
            <PhSparkle :size="15" class="text-[#33C4F0]" weight="fill" />
            <h3 class="text-xs font-bold text-white uppercase tracking-wider" style="font-family: Century Gothic, sans-serif">Acumen Recommendation</h3>
          </div>
          <p class="text-[11px] text-slate-300 font-medium leading-snug mt-1 max-w-[210px]">Add a 45-minute express workshop format for lunchtime team resets.</p>
        </div>

        <button
          type="button"
          class="px-3.5 py-2 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] font-bold text-[11px] transition flex items-center gap-1 cursor-pointer shrink-0 shadow-md z-10"
          style="border-radius: 14px 14px 28px 14px; font-family: Poppins, sans-serif"
          @click="app.showServiceModal = true"
        >
          <span>Create</span>
          <PhCaretRight :size="12" weight="bold" />
        </button>
      </div>
    </div>
  </div>
</template>
