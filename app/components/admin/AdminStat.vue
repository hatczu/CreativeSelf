<script setup lang="ts">
defineProps<{ label: string; value: string; detail: string }>();
</script>

<template>
  <div class="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
    <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">{{ label }}</p>
    <p class="mt-3 text-3xl font-extrabold">{{ value }}</p>
    <p class="mt-2 text-xs font-bold text-[#147c9e]">{{ detail }}</p>
  </div>
</template>
