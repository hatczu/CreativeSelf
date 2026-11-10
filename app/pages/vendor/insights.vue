<script setup lang="ts">
const bars = [
  { label: 'Week 1', value: 42 },
  { label: 'Week 2', value: 66 },
  { label: 'Week 3', value: 54 },
  { label: 'Week 4', value: 84 },
];
</script>

<template>
  <VendorWorkspaceShell page="insights">
    <section class="mt-7 grid gap-4 sm:grid-cols-3">
      <VendorMetric label="Profile views" value="451" detail="+18% over last month" />
      <VendorMetric label="Booking conversion" value="12.6%" detail="Above category average" />
      <VendorMetric label="Repeat bookers" value="6" detail="Teams returning this quarter" />
    </section>
    <section class="mt-7 bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
      <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Interest over time</p>
      <h2 class="mt-1 text-2xl font-extrabold">A steadier pull each week.</h2>
      <div class="mt-8 flex h-44 items-end justify-between gap-4">
        <div v-for="bar in bars" :key="bar.label" class="flex flex-1 flex-col items-center gap-3">
          <div class="w-full rounded-t-[14px] bg-[#33c4f0]" :style="{ height: `${bar.value}%` }" />
          <p class="text-[11px] font-bold text-[#717182]">{{ bar.label }}</p>
        </div>
      </div>
    </section>
    <section class="mt-7 bg-[#e8f9ff] p-6" style="border-radius: 20px 20px 64px 20px">
      <p class="text-xs font-bold uppercase tracking-[.14em] text-[#147c9e]">Acumen interpretation</p>
      <p class="mt-3 max-w-xl text-lg font-extrabold leading-7">
        Your short, low-pressure sessions are converting best with teams booking mid-week.
      </p>
      <p class="mt-3 text-sm leading-6 text-[#4f7180]">Consider adding another 45–60 minute option for Tuesday through Thursday.</p>
    </section>
  </VendorWorkspaceShell>
</template>
