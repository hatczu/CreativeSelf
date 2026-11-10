<script setup lang="ts">
import { ref } from 'vue';
import { PhArrowsLeftRight } from '@phosphor-icons/vue';

export type Role = 'client' | 'vendor' | 'admin' | 'mobile' | 'vendor-mobile';

defineProps<{ activeRole: Role }>();

const open = ref(false);
const roles: { label: string; path: string; role: Role }[] = [
  { label: 'Client Desktop', path: '/dashboard', role: 'client' },
  { label: 'Client Mobile App 📱', path: '/mobile', role: 'mobile' },
  { label: 'Vendor Portal Desktop', path: '/vendor', role: 'vendor' },
  { label: 'Vendor Mobile App 📱', path: '/vendor/mobile', role: 'vendor-mobile' },
  { label: 'Admin Workspace', path: '/admin', role: 'admin' },
];
</script>

<template>
  <div class="relative">
    <button
      type="button"
      title="Switch role"
      aria-label="Switch role"
      class="grid h-10 w-10 place-items-center rounded-full border border-[#33c4f0]/25 text-[#147c9e] transition hover:bg-[#e8f9ff]"
      @click="open = !open"
    >
      <PhArrowsLeftRight :size="17" />
    </button>
    <div
      v-if="open"
      class="absolute bottom-0 left-14 w-44 overflow-hidden border border-[#dfe5e7] bg-white py-2 shadow-xl"
      style="border-radius: 20px 20px 64px 20px"
    >
      <p class="px-4 pb-2 pt-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#717182]">
        Switch workspace
      </p>
      <NuxtLink
        v-for="item in roles"
        :key="item.role"
        :to="item.path"
        :class="[
          'block px-4 py-2 text-sm font-bold no-underline hover:bg-[#f3f5f6]',
          activeRole === item.role ? 'bg-[#e8f9ff] text-[#147c9e]' : 'text-[#19242a]',
        ]"
        @click="open = false"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>
