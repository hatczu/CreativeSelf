<script setup lang="ts" generic="Row extends { name: string }">
import { computed } from 'vue';
import { PhDotsThree, PhMagnifyingGlass } from '@phosphor-icons/vue';

const props = defineProps<{ title: string; rows: Row[]; columns: string[]; values: (row: Row) => string[] }>();
const query = defineModel<string>('query', { default: '' });

const filtered = computed(() => props.rows.filter((row) => row.name.toLowerCase().includes(query.value.toLowerCase())));
</script>

<template>
  <section class="mt-7">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Directory</p>
        <h2 class="mt-1 text-2xl font-extrabold">{{ title }}</h2>
      </div>
      <label class="flex items-center gap-2 rounded-full border border-[#33c4f0]/20 bg-white px-4 py-2 text-sm text-[#717182]">
        <PhMagnifyingGlass :size="15" />
        <input v-model="query" class="w-36 bg-transparent outline-none" placeholder="Search" />
      </label>
    </div>
    <div class="mt-5 overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
      <div
        class="hidden grid-cols-[1.4fr_1fr_1fr_.8fr_30px] gap-3 border-b border-[#33c4f0]/12 px-5 py-4 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#717182] md:grid"
      >
        <span>Name</span>
        <span v-for="item in columns" :key="item">{{ item }}</span>
        <span />
      </div>
      <div
        v-for="row in filtered"
        :key="row.name"
        class="grid gap-2 border-b border-[#33c4f0]/10 px-5 py-5 last:border-0 md:grid-cols-[1.4fr_1fr_1fr_.8fr_30px] md:items-center md:gap-3"
      >
        <p class="font-extrabold">{{ row.name }}</p>
        <p v-for="(value, index) in values(row)" :key="index" class="text-sm text-[#717182]">
          <span v-if="index === 2" class="rounded-full bg-[#e8f9ff] px-3 py-1.5 text-xs font-bold text-[#147c9e]">{{ value }}</span>
          <template v-else>{{ value }}</template>
        </p>
        <button type="button" class="text-[#717182]">
          <PhDotsThree :size="18" />
        </button>
      </div>
    </div>
  </section>
</template>
