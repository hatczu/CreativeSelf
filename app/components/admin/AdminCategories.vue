<script setup lang="ts">
import { ref } from 'vue';
import { PhX } from '@phosphor-icons/vue';
import { initialCategories } from '~/data/adminData';

const categories = ref([...initialCategories]);
const open = ref(false);
const category = ref('');

const saveCategory = () => {
  if (!category.value.trim()) return;
  categories.value = [...categories.value, category.value.trim()];
  category.value = '';
  open.value = false;
};
</script>

<template>
  <section class="mt-7">
    <div class="flex items-end justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Service taxonomy</p>
        <h2 class="mt-1 text-2xl font-extrabold">Categories that organise discovery.</h2>
      </div>
      <button type="button" class="rounded-brand-sm bg-[#1a1a28] px-4 py-2 text-xs font-extrabold text-white" @click="open = true">Add category</button>
    </div>
    <div class="mt-5 grid gap-4 sm:grid-cols-2">
      <div
        v-for="(item, index) in categories"
        :key="item"
        class="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
        style="border-radius: 20px 20px 64px 20px"
      >
        <p class="text-xs font-bold text-[#147c9e]">{{ 12 + index * 4 }} active providers</p>
        <p class="mt-2 text-xl font-extrabold">{{ item }}</p>
        <button type="button" class="mt-5 text-xs font-extrabold text-[#717182]">Edit category</button>
      </div>
    </div>
    <div v-if="open" class="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5">
      <div class="w-full max-w-md bg-white p-7 shadow-2xl" style="border-radius: 20px 20px 64px 20px">
        <button type="button" class="float-right" @click="open = false">
          <PhX :size="18" />
        </button>
        <h3 class="text-2xl font-extrabold">Add a category</h3>
        <input v-model="category" class="mt-6 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] px-4 py-3" placeholder="Category name" />
        <button type="button" class="mt-5 rounded-brand bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white" @click="saveCategory">Save category</button>
      </div>
    </div>
  </section>
</template>
