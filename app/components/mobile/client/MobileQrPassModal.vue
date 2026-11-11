<script setup lang="ts">
import { PhQrCode, PhX } from '@phosphor-icons/vue';

const app = useClientMobileApp();
</script>

<template>
  <!-- MODAL: QR CODE CHECK-IN PASS -->
  <AnimatePresence>
    <Motion
      v-if="app.selectedQrPass"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      class="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <Motion
        :initial="{ scale: 0.9, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :exit="{ scale: 0.9, opacity: 0 }"
        class="bg-white rounded-3xl w-full max-w-xs p-5 text-center space-y-4 shadow-2xl relative"
      >
        <button
          class="absolute top-3 right-3 w-8 h-8 rounded-brand-sm bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
          @click="app.selectedQrPass = null"
        >
          <PhX :size="16" />
        </button>

        <div class="w-12 h-12 rounded-full bg-[#E8F9FF] text-[#147C9E] flex items-center justify-center text-2xl mx-auto">
          {{ app.selectedQrPass.symbol }}
        </div>

        <div>
          <p class="text-xs font-bold text-[#10B981]">Confirmed Mobile Pass</p>
          <h3 class="text-sm font-black text-[#1A1A28] line-clamp-1">{{ app.selectedQrPass.activityName }}</h3>
          <p class="text-[11px] text-[#717182]">{{ app.selectedQrPass.vendorName }}</p>
        </div>

        <div class="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col items-center justify-center">
          <PhQrCode :size="120" class="text-[#1A1A28]" />
          <p class="text-[10px] font-mono font-bold text-gray-500 mt-2">{{ app.selectedQrPass.qrCode }}</p>
        </div>

        <div class="text-[11px] text-[#717182] space-y-0.5">
          <p>📅 {{ app.selectedQrPass.date }}</p>
          <p>⏰ {{ app.selectedQrPass.time }}</p>
          <p>📍 {{ app.selectedQrPass.location }}</p>
        </div>

        <button class="w-full py-2.5 bg-[#1A1A28] text-white text-xs font-bold rounded-xl" @click="app.selectedQrPass = null">Done</button>
      </Motion>
    </Motion>
  </AnimatePresence>
</template>
