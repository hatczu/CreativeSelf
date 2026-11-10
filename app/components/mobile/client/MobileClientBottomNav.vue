<script setup lang="ts">
import { computed } from 'vue';
import { PhHouse, PhCompass, PhCalendarBlank, PhUser } from '@phosphor-icons/vue';
import type { TabType } from '~/composables/useClientMobileApp';

const app = useClientMobileApp();

const navItems = computed(() => [
  { id: 'feed' as TabType, label: 'Feed', icon: PhHouse, badge: 0 },
  { id: 'discover' as TabType, label: 'Discover', icon: PhCompass, badge: 0 },
  { id: 'bookings' as TabType, label: 'Bookings', icon: PhCalendarBlank, badge: app.myBookings.length },
  { id: 'profile' as TabType, label: 'Profile', icon: PhUser, badge: 0 },
]);

const isDark = computed(() => app.navBarStyle === 'liquid-glass-dark');
const isIconOnly = computed(() => app.navBarStyle === 'liquid-glass-icon');
const containerHeight = computed(() => (isIconOnly.value ? '65px' : '66px'));
const buttonHeight = computed(() => (isIconOnly.value ? '48px' : '49px'));
const iconSize = computed(() => (isIconOnly.value ? 24 : 20));

const itemColor = (active: boolean) => (active ? '#33C4F0' : isDark.value ? '#94A3B8' : '#6A7282');
</script>

<template>
  <!-- CLASSIC BOTTOM BAR -->
  <div
    v-if="app.navBarStyle === 'classic'"
    class="bg-white/95 backdrop-blur-md border-t border-slate-100 px-3 py-2 flex items-center justify-around absolute bottom-0 inset-x-0 z-30 shadow-lg"
  >
    <button
      v-for="tab in navItems"
      :key="tab.id"
      :class="[
        'flex flex-col items-center gap-0.5 py-1 px-3.5 rounded-xl transition relative',
        app.activeTab === tab.id ? 'text-[#33C4F0] font-bold' : 'text-slate-400 hover:text-slate-700',
      ]"
      @click="app.setActiveTab(tab.id)"
    >
      <component
        :is="tab.icon"
        :size="20"
        :weight="app.activeTab === tab.id ? 'fill' : 'regular'"
        :color="app.activeTab === tab.id ? '#33C4F0' : '#6A7282'"
      />
      <span class="text-[10px]" :style="{ color: app.activeTab === tab.id ? '#33C4F0' : '#6A7282' }">{{ tab.label }}</span>
      <span
        v-if="tab.badge"
        class="absolute top-0 right-2.5 w-4 h-4 bg-[#33C4F0] text-white text-[9px] font-black rounded-full flex items-center justify-center"
      >
        {{ tab.badge }}
      </span>
    </button>
  </div>

  <!-- LIQUID GLASS BOTTOM BAR -->
  <nav
    v-else
    :style="{
      position: 'absolute',
      bottom: '26px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '368px',
      height: containerHeight,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 30,
      pointerEvents: 'auto',
    }"
  >
    <div
      :style="{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px',
        width: '100%',
        height: containerHeight,
        background: isDark ? 'rgba(26, 26, 40, 0.85)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.7)',
        borderRadius: '60px',
        boxShadow: isDark
          ? '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 8px 32px rgba(31, 38, 135, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      }"
    >
      <button
        v-for="tab in navItems"
        :key="tab.id"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '6px 8px',
          gap: '2px',
          flex: '1 1 0%',
          maxWidth: '72px',
          height: buttonHeight,
          background: app.activeTab === tab.id ? (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)') : 'transparent',
          borderRadius: '25.6px',
          position: 'relative',
          transition: 'all 0.2s ease',
          isolation: 'isolate',
        }"
        @click="app.setActiveTab(tab.id)"
      >
        <div
          :style="{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
            flexGrow: 0,
            zIndex: 0,
          }"
        >
          <component :is="tab.icon" :size="iconSize" :color="itemColor(app.activeTab === tab.id)" :weight="app.activeTab === tab.id ? 'fill' : 'regular'" />
        </div>

        <div
          v-if="!isIconOnly"
          :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px', height: '15px', flex: 'none', flexGrow: 0, zIndex: 1 }"
        >
          <span
            :style="{
              fontFamily: `'Poppins', sans-serif`,
              fontStyle: 'normal',
              fontWeight: app.activeTab === tab.id ? 600 : 500,
              fontSize: '10px',
              lineHeight: '15px',
              textAlign: 'center',
              color: itemColor(app.activeTab === tab.id),
              display: 'block',
              whiteSpace: 'nowrap',
            }"
          >
            {{ tab.label }}
          </span>
        </div>

        <div
          v-if="tab.badge"
          :style="{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            position: 'absolute',
            width: '16px',
            height: '16px',
            right: '12px',
            top: isIconOnly ? '6px' : '2px',
            background: '#33C4F0',
            borderRadius: '33554432px',
            flex: 'none',
            zIndex: 2,
          }"
        >
          <span
            :style="{
              fontFamily: `'Poppins', sans-serif`,
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '9px',
              lineHeight: '14px',
              textAlign: 'center',
              color: '#FFFFFF',
            }"
          >
            {{ tab.badge }}
          </span>
        </div>
      </button>
    </div>
  </nav>
</template>
