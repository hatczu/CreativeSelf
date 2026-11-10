<script setup lang="ts">
import { ref } from 'vue';
import {
  PhArrowsLeftRight,
  PhChartBar,
  PhBuildings,
  PhClipboardText,
  PhFileText,
  PhFolders,
  PhSquaresFour,
  PhSignOut,
  PhGear,
  PhShieldCheck,
  PhUsers,
} from '@phosphor-icons/vue';
import type { AdminSection } from '~/data/adminData';

defineProps<{ section: AdminSection }>();

const nav = [
  { id: 'overview', label: 'Overview', icon: PhSquaresFour },
  { id: 'clients', label: 'Clients', icon: PhBuildings },
  { id: 'vendors', label: 'Vendors', icon: PhShieldCheck },
  { id: 'content', label: 'Feed moderation', icon: PhFileText },
  { id: 'categories', label: 'Categories', icon: PhFolders },
  { id: 'users', label: 'Users', icon: PhUsers },
  { id: 'reports', label: 'Reports', icon: PhChartBar },
  { id: 'audit', label: 'Audit log', icon: PhClipboardText },
] as const;

const roleOpen = ref(false);
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#dbe2e5] bg-white/95 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex"
  >
    <NuxtLink to="/" title="CreativeSelf Home" aria-label="CreativeSelf Home" class="grid h-10 w-10 place-items-center transition-transform hover:scale-105">
      <ImageWithFallback :src="images.logo" alt="CreativeSelf Logo" class="h-full w-full object-contain" />
    </NuxtLink>
    <nav class="mt-10 flex flex-col gap-2" aria-label="Admin navigation">
      <NuxtLink
        v-for="item in nav"
        :key="item.id"
        :to="item.id === 'overview' ? '/admin' : `/admin/${item.id}`"
        :title="item.label"
        :aria-label="item.label"
        :class="[
          'grid h-9 w-9 place-items-center rounded-full transition',
          section === item.id ? 'bg-[#33c4f0] text-[#1a1a28]' : 'text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]',
        ]"
      >
        <component :is="item.icon" :size="16" />
      </NuxtLink>
    </nav>
    <div class="relative mt-auto flex flex-col gap-3">
      <button type="button" title="Settings" class="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff]">
        <PhGear :size="18" />
      </button>
      <NuxtLink to="/" title="Log out" class="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#1a1a28] hover:text-white">
        <PhSignOut :size="18" />
      </NuxtLink>
      <button
        type="button"
        title="Switch role"
        aria-label="Switch role"
        class="grid h-10 w-10 place-items-center rounded-full border border-[#33c4f0]/25 text-[#147c9e] transition hover:bg-[#e8f9ff]"
        @click="roleOpen = !roleOpen"
      >
        <PhArrowsLeftRight :size="17" />
      </button>
      <div
        v-if="roleOpen"
        class="absolute bottom-0 left-14 w-44 overflow-hidden border border-[#dfe5e7] bg-white py-2 shadow-xl"
        style="border-radius: 20px 20px 64px 20px"
      >
        <p class="px-4 pb-2 pt-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#717182]">Switch workspace</p>
        <NuxtLink to="/dashboard" class="block px-4 py-2 text-sm font-bold text-[#19242a] no-underline hover:bg-[#f3f5f6]" @click="roleOpen = false">
          Client
        </NuxtLink>
        <NuxtLink to="/vendor" class="block px-4 py-2 text-sm font-bold text-[#19242a] no-underline hover:bg-[#f3f5f6]" @click="roleOpen = false">
          Vendor
        </NuxtLink>
        <NuxtLink to="/admin" class="block bg-[#e8f9ff] px-4 py-2 text-sm font-bold text-[#147c9e] no-underline" @click="roleOpen = false">
          Admin
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>
