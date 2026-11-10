<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>

<template>
  <div class="sticky top-8 overflow-hidden bg-[#15343d] p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]" style="border-radius: 20px 20px 64px 20px">
    <p class="text-xs font-bold uppercase tracking-[.14em] text-white/45">Your provider studio</p>
    <div class="mt-5 grid h-16 w-16 place-items-center rounded-[22px_22px_32px_22px] bg-[#ef4444] text-3xl">🎨</div>
    <p class="mt-5 text-2xl font-extrabold">Studio Lumen</p>
    <p class="mt-2 text-sm font-bold text-[#33c4f0]">Heart of Art</p>
    <p class="mt-4 text-sm leading-6 text-white/65">Thoughtful art experiences for teams that need more colour in their week.</p>
    <!-- Optional actions (e.g. "Create a service") -->
    <slot />
    <div class="mt-7 border-t border-white/10 pt-5">
      <p class="text-xs font-bold text-white/45">PROFILE HEALTH</p>
      <p class="mt-2 text-sm font-bold">Complete · ready to discover</p>
    </div>
  </div>
</template>
