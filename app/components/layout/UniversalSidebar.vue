<script setup lang="ts">
import { computed } from 'vue';
import { PhSquaresFour, PhCompass, PhCalendarBlank, PhGear, PhSignOut, PhDeviceMobile } from '@phosphor-icons/vue';

const route = useRoute();
const pathname = computed(() => route.path);

const isHomeActive = computed(() => pathname.value === '/dashboard' || pathname.value === '/corporate');
const isDiscoverActive = computed(
  () => pathname.value === '/discover/services' || pathname.value.startsWith('/discover/services/'),
);
const isBookingsActive = computed(() => pathname.value.startsWith('/bookings'));
const isMobileActive = computed(() => pathname.value.startsWith('/mobile'));

const navClass = (active: boolean) => [
  'grid h-10 w-10 shrink-0 place-items-center rounded-brand-sm transition',
  active ? 'bg-[#33c4f0] text-[#1a1a28] shadow-sm' : 'text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]',
];
</script>

<template>
  <aside
    class="fixed inset-x-0 bottom-0 z-40 flex h-16 flex-row items-center gap-1 border-t border-[#33c4f0]/15 bg-white/90 px-3 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[60px] lg:flex-col lg:gap-0 lg:border-r lg:border-t-0 lg:px-0 lg:py-6"
  >
    <NuxtLink
      to="/"
      title="CreativeSelf Home"
      aria-label="CreativeSelf Home"
      class="hidden h-10 w-10 shrink-0 place-items-center transition-transform lg:grid hover:scale-105"
    >
      <ImageWithFallback :src="images.logo" alt="CreativeSelf Logo" class="h-full w-full object-contain" />
    </NuxtLink>

    <nav class="flex min-w-0 flex-1 flex-row items-center justify-around gap-1 overflow-x-auto lg:mt-10 lg:flex-none lg:flex-col lg:justify-start lg:gap-3 lg:overflow-visible" aria-label="Universal navigation">
      <!-- Module 1: Home -->
      <NuxtLink to="/dashboard" title="Home" aria-label="Home" :class="navClass(isHomeActive)">
        <PhSquaresFour :size="18" />
      </NuxtLink>

      <!-- Module 2: Discover Services -->
      <NuxtLink
        to="/discover/services"
        title="Discover Services"
        aria-label="Discover Services"
        :class="navClass(isDiscoverActive)"
      >
        <PhCompass :size="18" />
      </NuxtLink>

      <!-- Module 3: Bookings -->
      <NuxtLink to="/bookings" title="Bookings" aria-label="Bookings" :class="navClass(isBookingsActive)">
        <PhCalendarBlank :size="18" />
      </NuxtLink>

      <!-- Module 4: Client Mobile App -->
      <NuxtLink
        to="/mobile"
        title="Client Mobile App"
        aria-label="Client Mobile App"
        :class="[
          'grid h-10 w-10 shrink-0 place-items-center rounded-brand-sm transition',
          isMobileActive
            ? 'bg-[#147c9e] text-white shadow-sm'
            : 'text-[#147c9e] bg-[#e8f9ff] hover:bg-[#33c4f0] hover:text-[#1a1a28]',
        ]"
      >
        <PhDeviceMobile :size="18" weight="bold" />
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
      <RoleSwitcher active-role="client" />
    </div>
  </aside>
</template>
