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
  'grid h-10 w-10 place-items-center rounded-full transition',
  isActive ? 'bg-[#33c4f0] text-[#1a1a28]' : 'text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]',
];
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#33c4f0]/15 bg-white/90 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex"
  >
    <NuxtLink to="/" title="CreativeSelf Home" aria-label="CreativeSelf Home" class="grid h-10 w-10 place-items-center transition-transform hover:scale-105">
      <ImageWithFallback :src="images.logo" alt="CreativeSelf Logo" class="h-full w-full object-contain" />
    </NuxtLink>
    <nav class="mt-10 flex flex-col gap-3" aria-label="Vendor navigation">
      <NuxtLink v-for="item in items" :key="item.id" :to="item.to" :title="item.title" :aria-label="item.title" :class="iconClass(active === item.id)">
        <component :is="item.icon" :size="18" />
      </NuxtLink>
    </nav>
    <div class="mt-auto flex flex-col gap-3">
      <button
        type="button"
        title="Settings"
        aria-label="Settings"
        class="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
      >
        <PhGear :size="18" />
      </button>
      <NuxtLink
        to="/"
        title="Log out"
        aria-label="Log out"
        class="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#1a1a28] hover:text-white"
      >
        <PhSignOut :size="18" />
      </NuxtLink>
      <RoleSwitcher active-role="vendor" />
    </div>
  </aside>
</template>
