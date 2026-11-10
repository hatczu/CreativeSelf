<script setup lang="ts">
import { ref } from 'vue';
import { PhCaretRight, PhSignOut, PhDesktop, PhDeviceMobile, PhPlus, PhImage, PhStar, PhMapPin, PhBell, PhCheck } from '@phosphor-icons/vue';
import type { NavBarStyle } from '~/composables/useClientMobileApp';

const app = useProviderMobileApp();
const notificationsEnabled = ref(true);

const navStyleOptions: { id: NavBarStyle; label: string }[] = [
  { id: 'liquid-glass-icon', label: 'Liquid Glass (Icon)' },
  { id: 'liquid-glass-text', label: 'Liquid Glass (Text)' },
  { id: 'liquid-glass-dark', label: 'Dark Glass' },
  { id: 'classic', label: 'Classic Solid' },
];

const quickActionClass =
  'w-full p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#1A1A28] flex items-center justify-between text-[11px] font-semibold transition cursor-pointer';
</script>

<template>
  <div
    class="flex-1 h-full overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
  >
    <!-- TOP APP HEADER BAR -->
    <div class="px-4 pt-4 pb-2 flex items-center justify-between bg-white border-b border-slate-100">
      <span class="text-lg font-black text-[#1A1A28] tracking-tight lowercase flex items-center gap-1" style="font-family: Century Gothic, Poppins, sans-serif">
        creativeself <span class="w-2 h-2 rounded-full bg-[#1AB0DC] inline-block" />
      </span>

      <button
        type="button"
        class="w-8 h-8 text-slate-600 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 flex items-center justify-center transition cursor-pointer"
        style="border-radius: 10px 10px 20px 10px"
        title="Log Out"
        @click="navigateTo('/')"
      >
        <PhSignOut :size="16" weight="bold" />
      </button>
    </div>

    <div class="px-3.5 pt-3 space-y-3">
      <!-- STUDIO PROFILE HEADER CARD -->
      <div class="bg-white border border-slate-200/80 p-4 shadow-2xs space-y-3" style="border-radius: 20px 20px 48px 20px">
        <div class="flex items-center gap-3.5">
          <div
            class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#B91C1C] text-2xl flex items-center justify-center shadow-xs shrink-0 ring-2 ring-slate-100"
            style="border-radius: 14px 14px 32px 14px"
          >
            🎨
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <h2 class="text-[16px] font-bold text-[#1A1A28] leading-tight" style="font-family: Century Gothic, Poppins, sans-serif">Studio Lumen</h2>
              <span class="text-[9px] font-bold text-[#007595] bg-[#ECFEFF] border border-[#A2F4FD] px-2 py-0.5" style="border-radius: 8px 8px 16px 8px">
                Verified Studio ✓
              </span>
            </div>
            <p class="text-[11px] text-[#007595] font-semibold mt-0.5">Heart of Art Studio · Creative Workshops</p>
            <p class="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
              <PhMapPin :size="11" class="text-[#1AB0DC]" />
              <span>Orchard Art District, Singapore</span>
            </p>
          </div>
        </div>

        <!-- Quick Metrics Bar -->
        <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
          <div class="bg-slate-50 p-2 border border-slate-100 rounded-xl">
            <div class="flex items-center justify-center gap-0.5 text-amber-500 text-[11px] font-bold">
              <PhStar :size="11" weight="fill" />
              <span>4.95</span>
            </div>
            <p class="text-[8px] font-semibold text-slate-400 uppercase mt-0.5">RATING</p>
          </div>

          <div class="bg-slate-50 p-2 border border-slate-100 rounded-xl">
            <p class="text-[12px] font-bold text-[#1A1A28]">84</p>
            <p class="text-[8px] font-semibold text-slate-400 uppercase mt-0.5">BOOKINGS</p>
          </div>

          <div class="bg-slate-50 p-2 border border-slate-100 rounded-xl">
            <p class="text-[12px] font-bold text-[#007595]">{{ app.servicesList.length }}</p>
            <p class="text-[8px] font-semibold text-slate-400 uppercase mt-0.5">SERVICES</p>
          </div>
        </div>
      </div>

      <!-- POSTED SERVICES LIST -->
      <div class="bg-white border border-slate-200/80 p-4 shadow-2xs space-y-3" style="border-radius: 20px 20px 48px 20px">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <span class="text-[10px] font-bold text-[#007595] uppercase tracking-wider">Catalog</span>
            <h3 class="text-[14px] font-bold text-[#1A1A28] mt-0.5" style="font-family: Century Gothic, Poppins, sans-serif">Posted Services ({{ app.servicesList.length }})</h3>
          </div>

          <button
            type="button"
            class="py-1 px-3 bg-[#1AB0DC] hover:bg-[#007595] text-white text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shadow-2xs"
            style="border-radius: 12px 12px 24px 12px; font-family: Poppins, sans-serif"
            @click="app.showServiceModal = true"
          >
            <PhPlus :size="13" weight="bold" />
            <span>+ Add Service</span>
          </button>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="svc in app.servicesList"
            :key="svc.id"
            class="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl flex items-center justify-between gap-3 hover:border-[#1AB0DC] transition"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div
                class="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 flex items-center justify-center text-xl border border-slate-200"
                style="border-radius: 10px 10px 20px 10px"
              >
                <img v-if="svc.image" :src="svc.image" :alt="svc.title" class="w-full h-full object-cover" />
                <span v-else>{{ svc.emoji || '🎨' }}</span>
              </div>

              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <h4 class="text-[12px] font-bold text-[#1A1A28] truncate" style="font-family: Century Gothic, Poppins, sans-serif">{{ svc.title }}</h4>
                  <span :class="['text-[8px] font-bold px-1.5 py-0.2 rounded-full', svc.published ? 'bg-[#ECFDF5] text-[#047857]' : 'bg-slate-200 text-slate-600']">
                    {{ svc.published ? 'Active' : 'Draft' }}
                  </span>
                </div>
                <p class="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                  {{ svc.format }} · <span class="font-bold text-[#007595]">{{ svc.price }}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              class="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:text-[#007595] text-[10px] font-bold transition shrink-0 cursor-pointer"
              style="border-radius: 8px 8px 16px 8px"
              @click="app.setActiveTab('services')"
            >
              Manage
            </button>
          </div>
        </div>
      </div>

      <!-- QUICK CONTENT & WORKSPACE ACTIONS -->
      <div class="bg-white border border-slate-200/80 p-4 shadow-2xs space-y-2.5" style="border-radius: 20px 20px 48px 20px">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions</span>

        <button
          type="button"
          class="w-full p-2.5 bg-slate-50 hover:bg-[#ECFEFF] border border-slate-200 text-[#1A1A28] flex items-center justify-between text-[11px] font-semibold transition cursor-pointer"
          style="border-radius: 12px 12px 24px 12px"
          @click="app.showStoryComposer = true"
        >
          <div class="flex items-center gap-2">
            <PhImage :size="16" class="text-[#1AB0DC]" />
            <span>Post Brand Story / Feed Update</span>
          </div>
          <PhCaretRight :size="13" class="text-slate-400" />
        </button>

        <button type="button" :class="quickActionClass" style="border-radius: 12px 12px 24px 12px" @click="navigateTo('/mobile')">
          <div class="flex items-center gap-2">
            <PhDeviceMobile :size="16" class="text-[#1AB0DC]" />
            <span>Switch to Client Mobile App</span>
          </div>
          <PhCaretRight :size="13" class="text-slate-400" />
        </button>

        <button type="button" :class="quickActionClass" style="border-radius: 12px 12px 24px 12px" @click="navigateTo('/vendor')">
          <div class="flex items-center gap-2">
            <PhDesktop :size="16" class="text-[#1AB0DC]" />
            <span>Switch to Desktop Vendor Portal</span>
          </div>
          <PhCaretRight :size="13" class="text-slate-400" />
        </button>
      </div>

      <!-- NAVIGATION BAR STYLE PREFERENCE -->
      <div class="bg-white border border-slate-200/80 p-4 shadow-2xs space-y-2.5" style="border-radius: 20px 20px 48px 20px">
        <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Mobile Navigation Theme</p>

        <div class="grid grid-cols-2 gap-2 text-xs">
          <button
            v-for="option in navStyleOptions"
            :key="option.id"
            type="button"
            :class="[
              'p-2.5 border text-left font-semibold transition flex items-center justify-between cursor-pointer',
              app.navBarStyle === option.id ? 'border-[#1AB0DC] bg-[#ECFEFF] text-[#007595]' : 'border-slate-200 bg-slate-50 text-slate-700',
            ]"
            style="border-radius: 10px 10px 20px 10px"
            @click="app.setNavBarStyle(option.id)"
          >
            <span class="text-[11px] truncate">{{ option.label }}</span>
            <PhCheck v-if="app.navBarStyle === option.id" :size="14" weight="bold" />
          </button>
        </div>
      </div>

      <!-- SETTINGS TOGGLE -->
      <div
        class="bg-white border border-slate-200/80 p-4 shadow-2xs flex items-center justify-between text-xs font-semibold text-[#1A1A28]"
        style="border-radius: 20px 20px 48px 20px"
      >
        <div class="flex items-center gap-3">
          <PhBell :size="18" class="text-[#1AB0DC]" />
          <span>Booking Notifications</span>
        </div>
        <button
          type="button"
          :class="['w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer', notificationsEnabled ? 'bg-[#1AB0DC]' : 'bg-slate-200']"
          @click="notificationsEnabled = !notificationsEnabled"
        >
          <div :class="['w-4 h-4 rounded-full bg-white shadow-xs transition-transform', notificationsEnabled ? 'translate-x-5' : 'translate-x-0']" />
        </button>
      </div>
    </div>

    <div class="text-center pt-4 pb-6">
      <p class="text-[11px] font-semibold text-slate-400">Provider Mobile v2.4.0</p>
    </div>
  </div>
</template>
