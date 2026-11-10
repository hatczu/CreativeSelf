<script setup lang="ts">
import { ref } from 'vue';
import {
  PhCaretLeft,
  PhCaretRight,
  PhSun,
  PhGlobe,
  PhBell,
  PhStar,
  PhQuestion,
  PhShareNetwork,
  PhInfo,
  PhFileText,
  PhShieldCheck,
  PhSignOut,
  PhArrowUp,
  PhSparkle,
} from '@phosphor-icons/vue';

const app = useClientMobileApp();

const activeView = ref<'menu' | 'profile-details'>('menu');
const notificationsEnabled = ref(true);
const themeMode = ref<'System' | 'Light' | 'Dark'>('System');
const selectedLanguage = ref('English');

const avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';

const cycleTheme = () => {
  themeMode.value = themeMode.value === 'System' ? 'Light' : themeMode.value === 'Light' ? 'Dark' : 'System';
};

const engagementItems = [
  { icon: PhStar, label: 'Rate Us' },
  { icon: PhQuestion, label: 'Help Center', to: '/support' },
  { icon: PhShareNetwork, label: 'Share' },
];
const legalItems = [
  { icon: PhInfo, label: 'About CreativeSelf' },
  { icon: PhFileText, label: 'Terms of Service' },
  { icon: PhShieldCheck, label: 'Privacy Policy' },
];

const rowClass =
  'px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28] hover:bg-slate-50/50 transition cursor-pointer';
</script>

<template>
  <!-- SUBVIEW: PROFILE DETAILS -->
  <div
    v-if="activeView === 'profile-details'"
    class="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
  >
    <div class="bg-white px-4 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <button
        type="button"
        class="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
        @click="activeView = 'menu'"
      >
        <PhCaretLeft :size="16" weight="bold" />
      </button>
      <h2 class="text-base font-extrabold text-[#1A1A28]" style="font-family: Century Gothic, Poppins, sans-serif">Profile Details</h2>
      <div class="w-8" />
    </div>

    <div class="p-4 space-y-3">
      <div class="bg-white p-5 shadow-2xs border border-slate-100/80 space-y-4" style="border-radius: 20px 20px 48px 20px">
        <div class="flex items-center gap-3.5">
          <img :src="avatarUrl" alt="Profile" class="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-[#33C4F0]/30 shrink-0" />
          <div class="min-w-0">
            <h3 class="text-base font-extrabold text-[#1A1A28]">{{ app.regName || 'Eugenia Babajanyan' }}</h3>
            <p class="text-xs text-slate-500 font-medium">{{ app.emailInput || 'eugenia.bj@gmail.com' }}</p>
            <span
              class="inline-block mt-1 text-[10px] font-extrabold text-[#007595] bg-[#E8F9FF] border border-[#A2F4FD] px-2.5 py-0.5"
              style="border-radius: 12px 12px 24px 12px"
            >
              The Explorer 🧭
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
          <div class="bg-slate-50 p-3" style="border-radius: 14px 14px 28px 14px">
            <p class="text-[9px] font-extrabold text-slate-400 uppercase">ROLE / TITLE</p>
            <p class="font-extrabold text-[#1A1A28] truncate mt-0.5">{{ app.jobTitleInput || 'Creative Lead' }}</p>
          </div>
          <div class="bg-slate-50 p-3" style="border-radius: 14px 14px 28px 14px">
            <p class="text-[9px] font-extrabold text-slate-400 uppercase">COMPANY</p>
            <p class="font-extrabold text-[#1A1A28] truncate mt-0.5">{{ app.companyNameInput || 'Acme Agency' }}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="w-full py-3 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold transition cursor-pointer shadow-xs"
        style="border-radius: 20px 20px 48px 20px; font-family: Century Gothic, sans-serif"
        @click="activeView = 'menu'"
      >
        Done
      </button>
    </div>
  </div>

  <!-- MAIN VIEW -->
  <div
    v-else
    class="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
  >
    <!-- Top Navigation Bar -->
    <div class="px-5 pt-4 pb-2 flex items-center justify-between">
      <span class="text-xl font-black text-[#1A1A28] tracking-tight lowercase flex items-center gap-1" style="font-family: Century Gothic, Poppins, sans-serif">
        creativeself <span class="w-2 h-2 rounded-full bg-[#33C4F0] inline-block" />
      </span>

      <button
        type="button"
        class="w-9 h-9 text-slate-700 bg-white hover:bg-rose-50 hover:text-rose-600 border border-slate-100 flex items-center justify-center transition cursor-pointer shadow-2xs"
        style="border-radius: 12px 12px 24px 12px"
        title="Sign Out"
        @click="app.setActiveScreen('login')"
      >
        <PhSignOut :size="18" weight="bold" />
      </button>
    </div>

    <!-- User Profile Avatar & Header -->
    <div class="py-4 flex flex-col items-center text-center cursor-pointer group" @click="activeView = 'profile-details'">
      <div class="relative mb-2.5">
        <img
          :src="avatarUrl"
          alt="Profile Avatar"
          class="w-20 h-20 rounded-full object-cover shadow-sm ring-4 ring-[#33C4F0]/20 group-hover:ring-[#33C4F0] group-hover:scale-105 transition duration-200"
        />
      </div>

      <h2 class="text-base font-extrabold text-[#1A1A28] tracking-tight" style="font-family: Century Gothic, Poppins, sans-serif">
        {{ app.regName || 'Eugenia Babajanyan' }}
      </h2>
      <p class="text-xs text-slate-500 font-medium mt-0.5">{{ app.emailInput || 'eugenia.bj@gmail.com' }}</p>

      <span
        class="mt-2 text-[10px] font-extrabold text-[#007595] bg-[#E8F9FF] border border-[#A2F4FD] px-3 py-0.5 flex items-center gap-1 shadow-2xs"
        style="border-radius: 12px 12px 24px 12px"
      >
        The Explorer 🧭
      </span>
    </div>

    <!-- Upgrade to Pro Banner Card -->
    <div class="px-4 my-2">
      <div class="w-full bg-[#1A1A28] text-white p-4.5 shadow-md flex items-center justify-between relative overflow-hidden" style="border-radius: 20px 20px 48px 20px">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-[#33C4F0]/20 rounded-full blur-xl pointer-events-none" />

        <div class="pr-2 min-w-0 z-10">
          <div class="flex items-center gap-1.5">
            <PhSparkle :size="15" class="text-[#33C4F0]" weight="fill" />
            <h3 class="text-sm font-extrabold text-white" style="font-family: Century Gothic, sans-serif">Upgrade to Pro</h3>
          </div>
          <p class="text-[11px] text-slate-300 font-medium leading-snug mt-1 line-clamp-2 max-w-[210px]">
            Unlock full-body AI avatar, advanced try-on and unlimited looks
          </p>
        </div>

        <button
          type="button"
          class="px-3.5 py-1.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md z-10"
          style="border-radius: 14px 14px 28px 14px"
          @click="app.regStep = 4"
        >
          <span class="w-4 h-4 rounded-full bg-[#1A1A28]/15 flex items-center justify-center">
            <PhArrowUp :size="10" weight="bold" />
          </span>
          <span>Upgrade</span>
        </button>
      </div>
    </div>

    <!-- Settings Card Group 1: Preferences -->
    <div class="px-4 my-3">
      <div class="bg-white border border-slate-100/80 shadow-2xs overflow-hidden divide-y divide-slate-100/80" style="border-radius: 20px 20px 48px 20px">
        <div :class="rowClass">
          <div class="flex items-center gap-3">
            <PhSun :size="18" class="text-[#33C4F0]" />
            <span>Mode</span>
          </div>
          <button type="button" class="flex items-center gap-1 text-[#147C9E] font-bold hover:underline" @click="cycleTheme">
            <span>{{ themeMode }}</span>
            <PhCaretRight :size="14" />
          </button>
        </div>

        <div :class="rowClass">
          <div class="flex items-center gap-3">
            <PhGlobe :size="18" class="text-[#33C4F0]" />
            <span>Language</span>
          </div>
          <div class="flex items-center gap-1 text-[#147C9E] font-bold">
            <span>{{ selectedLanguage }}</span>
            <PhCaretRight :size="14" />
          </div>
        </div>

        <div class="px-4 py-3.5 flex items-center justify-between text-xs font-extrabold text-[#1A1A28]">
          <div class="flex items-center gap-3">
            <PhBell :size="18" class="text-[#33C4F0]" />
            <span>Notifications</span>
          </div>
          <button
            type="button"
            :class="['w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer', notificationsEnabled ? 'bg-[#33C4F0]' : 'bg-slate-200']"
            @click="notificationsEnabled = !notificationsEnabled"
          >
            <div :class="['w-5 h-5 rounded-full bg-white shadow-xs transition-transform', notificationsEnabled ? 'translate-x-5' : 'translate-x-0']" />
          </button>
        </div>
      </div>
    </div>

    <!-- Settings Card Group 2: Engagement -->
    <div class="px-4 my-3">
      <div class="bg-white border border-slate-100/80 shadow-2xs overflow-hidden divide-y divide-slate-100/80" style="border-radius: 20px 20px 48px 20px">
        <div v-for="item in engagementItems" :key="item.label" :class="rowClass" @click="item.to && navigateTo(item.to)">
          <div class="flex items-center gap-3">
            <component :is="item.icon" :size="18" class="text-[#33C4F0]" />
            <span>{{ item.label }}</span>
          </div>
          <PhCaretRight :size="14" class="text-slate-400" />
        </div>
      </div>
    </div>

    <!-- Settings Card Group 3: About & Legal -->
    <div class="px-4 my-3">
      <div class="bg-white border border-slate-100/80 shadow-2xs overflow-hidden divide-y divide-slate-100/80" style="border-radius: 20px 20px 48px 20px">
        <div v-for="item in legalItems" :key="item.label" :class="rowClass">
          <div class="flex items-center gap-3">
            <component :is="item.icon" :size="18" class="text-[#33C4F0]" />
            <span>{{ item.label }}</span>
          </div>
          <PhCaretRight :size="14" class="text-slate-400" />
        </div>
      </div>
    </div>

    <!-- App Version Label Footer -->
    <div class="text-center pt-2 pb-6">
      <p class="text-[11px] font-extrabold text-slate-400">Version 2.4.0 (Build 412)</p>
    </div>
  </div>
</template>
