<script setup lang="ts">
import { computed } from 'vue';
import { PhHouse, PhPackage, PhCalendarBlank, PhUser } from '@phosphor-icons/vue';
import type { ProviderTabType } from '~/composables/useProviderMobileApp';

const app = useProviderMobileApp();

const tabs = computed(() => [
  { id: 'home' as ProviderTabType, label: 'Home', icon: PhHouse, badge: 0 },
  { id: 'services' as ProviderTabType, label: 'Services', icon: PhPackage, badge: 0 },
  { id: 'bookings' as ProviderTabType, label: 'Bookings', icon: PhCalendarBlank, badge: app.pendingBookingCount },
  { id: 'profile' as ProviderTabType, label: 'Profile', icon: PhUser, badge: 0 },
]);

const isDark = computed(() => app.navBarStyle === 'liquid-glass-dark');
const isClassic = computed(() => app.navBarStyle === 'classic');
const isIconOnly = computed(() => app.navBarStyle === 'liquid-glass-icon' || isDark.value);

const glassInnerStyle = computed(() => ({
  display: 'flex',
  flexDirection: 'row' as const,
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: isIconOnly.value ? '6px 12px' : '6px 8px',
  height: isIconOnly.value ? '64px' : '68px',
  background: isClassic.value ? '#FFFFFF' : isDark.value ? 'rgba(21, 52, 61, 0.85)' : 'rgba(255, 255, 255, 0.78)',
  boxShadow: isClassic.value
    ? '0 10px 30px rgba(0, 0, 0, 0.08)'
    : isDark.value
      ? '0px 20px 40px rgba(0, 0, 0, 0.4), inset 0px 1px 1px rgba(255, 255, 255, 0.15)'
      : '0px 20px 40px rgba(28, 118, 155, 0.12), inset 0px 1px 1px rgba(255, 255, 255, 0.6)',
  backdropFilter: isClassic.value ? 'none' : 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: isClassic.value ? 'none' : 'blur(20px) saturate(180%)',
  borderRadius: 'var(--radius-brand-lg)',
  border: isClassic.value ? '1px solid #E2E8F0' : isDark.value ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.55)',
}));

const iconColor = (active: boolean) => (isDark.value ? (active ? '#33C4F0' : 'rgba(255, 255, 255, 0.45)') : active ? '#007595' : '#64748B');
</script>

<template>
  <!-- LIQUID GLASS BOTTOM NAVIGATION BAR -->
  <nav class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40" aria-label="Provider Mobile Bottom Navigation">
    <div :style="glassInnerStyle">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4px',
          gap: '2px',
          flex: 1,
          height: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
        }"
        @click="app.setActiveTab(tab.id)"
      >
        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isIconOnly ? '40px' : '36px',
            height: isIconOnly ? '40px' : '32px',
            borderRadius: 'var(--radius-brand-sm)',
            background: app.activeTab === tab.id ? (isDark ? 'rgba(51, 196, 240, 0.15)' : 'rgba(51, 196, 240, 0.18)') : 'transparent',
            transition: 'all 0.2s ease',
          }"
        >
          <component
            :is="tab.icon"
            :size="isIconOnly ? 22 : 20"
            :weight="app.activeTab === tab.id ? 'fill' : 'regular'"
            :style="{ color: iconColor(app.activeTab === tab.id) }"
          />
        </div>

        <span
          v-if="!isIconOnly"
          :style="{
            fontFamily: 'Century Gothic, Poppins, sans-serif',
            fontWeight: app.activeTab === tab.id ? 700 : 500,
            fontSize: '10px',
            lineHeight: '12px',
            textAlign: 'center',
            color: iconColor(app.activeTab === tab.id),
          }"
        >
          {{ tab.label }}
        </span>

        <div
          v-if="tab.badge"
          :style="{
            position: 'absolute',
            right: '12px',
            top: isIconOnly ? '6px' : '4px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#EF4444',
            color: '#FFFFFF',
            fontSize: '9px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)',
          }"
        >
          {{ tab.badge }}
        </div>
      </button>
    </div>
  </nav>
</template>
