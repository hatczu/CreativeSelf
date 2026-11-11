<script setup lang="ts">
import { PhChartBar, PhCalendarBlank, PhSquaresFour, PhSignOut, PhPackage, PhImage, PhGear } from '@phosphor-icons/vue';

export type VendorSection = 'overview' | 'services' | 'content' | 'bookings' | 'insights';

defineProps<{ active: VendorSection }>();

const items = [
  { id: 'overview', to: '/vendor', title: 'Overview', icon: PhSquaresFour },
  { id: 'services', to: '/vendor/services', title: 'Services', icon: PhPackage },
  { id: 'content', to: '/vendor/content', title: 'Content studio', icon: PhImage },
  { id: 'bookings', to: '/vendor/bookings', title: 'Bookings', icon: PhCalendarBlank },
  { id: 'insights', to: '/vendor/insights', title: 'Insights', icon: PhChartBar },
] as const;

const iconClass = (isActive: boolean) => [
  'grid h-10 w-10 shrink-0 place-items-center rounded-brand-sm transition',
  isActive ? 'bg-[#33c4f0] text-[#1a1a28]' : 'text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]',
];
</script>

<template>
  <aside
    class="fixed inset-x-0 bottom-0 z-40 flex h-16 flex-row items-center gap-1 border-t border-[#33c4f0]/15 bg-white/90 px-3 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[60px] lg:flex-col lg:gap-0 lg:border-r lg:border-t-0 lg:px-0 lg:py-6"
  >
    <NuxtLink to="/" title="CreativeSelf Home" aria-label="CreativeSelf Home" class="hidden h-10 w-10 shrink-0 place-items-center transition-transform lg:grid hover:scale-105">
      <ImageWithFallback :src="images.logo" alt="CreativeSelf Logo" class="h-full w-full object-contain" />
    </NuxtLink>
    <nav class="flex min-w-0 flex-1 flex-row items-center justify-around gap-1 overflow-x-auto lg:mt-10 lg:flex-none lg:flex-col lg:justify-start lg:gap-3 lg:overflow-visible" aria-label="Vendor navigation">
      <NuxtLink v-for="item in items" :key="item.id" :to="item.to" :title="item.title" :aria-label="item.title" :class="iconClass(active === item.id)">
        <component :is="item.icon" :size="18" />
      </NuxtLink>
    </nav>
    <div class="flex shrink-0 flex-row items-center gap-1 lg:mt-auto lg:flex-col lg:gap-3">
      <button
        type="button"
        title="Settings"
        aria-label="Settings"
        class="grid h-10 w-10 shrink-0 place-items-center rounded-brand-sm text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
      >
        <PhGear :size="18" />
      </button>
      <NuxtLink
        to="/"
        title="Log out"
        aria-label="Log out"
        class="grid h-10 w-10 shrink-0 place-items-center rounded-brand-sm text-[#717182] transition hover:bg-[#1a1a28] hover:text-white"
      >
        <PhSignOut :size="18" />
      </NuxtLink>
      <RoleSwitcher active-role="vendor" />
    </div>
  </aside>
</template>
