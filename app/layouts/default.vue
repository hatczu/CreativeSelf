<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import type { RegisterCategory } from '~/composables/useRegister';

const FULL_LAYOUT_PATHS = ['/', '/test', '/services'];

const route = useRoute();
const { openRegister } = useRegister();

const isSignedInHome = computed(() => {
  const p = route.path;
  return (
    p === '/dashboard' ||
    p === '/corporate' ||
    p.startsWith('/discover') ||
    p === '/bookings' ||
    p.startsWith('/vendor') ||
    p.startsWith('/admin') ||
    p === '/register' ||
    p.startsWith('/mobile')
  );
});
const showFooter = computed(() => FULL_LAYOUT_PATHS.includes(route.path));

// Allow any component to request the register flow via a global DOM event.
const listener = (e: Event) => {
  const detail = (e as CustomEvent<{ planId?: string; category?: RegisterCategory }>).detail;
  openRegister(detail?.planId, detail?.category);
};
onMounted(() => window.addEventListener('open-register-modal', listener));
onBeforeUnmount(() => window.removeEventListener('open-register-modal', listener));
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavBar v-if="!isSignedInHome" @open-register="openRegister()" />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter v-if="showFooter" />
  </div>
</template>
