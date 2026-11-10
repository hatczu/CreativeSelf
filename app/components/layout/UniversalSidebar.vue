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
  'grid h-10 w-10 place-items-center rounded-full transition',
  active ? 'bg-[#33c4f0] text-[#1a1a28] shadow-sm' : 'text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]',
];
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#33c4f0]/15 bg-white/90 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex"
  >
    <NuxtLink
      to="/"
      title="CreativeSelf Home"
      aria-label="CreativeSelf Home"
      class="grid h-10 w-10 place-items-center transition-transform hover:scale-105"
    >
      <ImageWithFallback :src="images.logo" alt="CreativeSelf Logo" class="h-full w-full object-contain" />
    </NuxtLink>

    <nav class="mt-10 flex flex-col gap-3" aria-label="Universal navigation">
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
          'grid h-10 w-10 place-items-center rounded-full transition',
          isMobileActive
            ? 'bg-[#147c9e] text-white shadow-sm'
            : 'text-[#147c9e] bg-[#e8f9ff] hover:bg-[#33c4f0] hover:text-[#1a1a28]',
        ]"
      >
        <PhDeviceMobile :size="18" weight="bold" />
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
      <RoleSwitcher active-role="client" />
    </div>
  </aside>
</template>
