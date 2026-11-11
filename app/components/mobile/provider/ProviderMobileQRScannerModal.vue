<script setup lang="ts">
import { ref } from 'vue';
import { PhX, PhQrCode, PhCheckCircle, PhLightning } from '@phosphor-icons/vue';

interface ScanResult {
  code: string;
  guestName: string;
  company: string;
  session: string;
  status: string;
  timestamp: string;
}

const app = useProviderMobileApp();
const scannedResult = ref<ScanResult | null>(null);

const handleSimulateScan = () => {
  scannedResult.value = {
    code: 'CS-PAS-88219',
    guestName: 'Alex Rivera',
    company: 'Northstar Studio',
    session: 'Watercolour without perfection',
    status: 'Valid Event Pass',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
};

const close = () => {
  scannedResult.value = null;
  app.showQRScanner = false;
};
</script>

<template>
  <div v-if="app.showQRScanner" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
    <div
      class="w-full max-w-sm bg-slate-900 text-white p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center animate-in zoom-in-95 duration-200 border border-slate-800"
      style="border-radius: 24px 24px 48px 24px"
    >
      <button
        type="button"
        class="absolute top-4 right-4 w-9 h-9 rounded-brand-sm bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
        @click="close"
      >
        <PhX :size="18" weight="bold" />
      </button>

      <p class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">Attendee Check-in</p>
      <h3 class="text-lg font-extrabold text-white mt-1" style="font-family: Century Gothic, Poppins, sans-serif">Scan Client Pass QR</h3>

      <div v-if="scannedResult" class="mt-6 w-full space-y-4 animate-in fade-in">
        <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
          <PhCheckCircle :size="40" weight="fill" />
        </div>

        <div class="bg-slate-800/80 p-4 border border-slate-700/80 text-left space-y-2" style="border-radius: 16px 16px 32px 16px">
          <div class="flex items-center justify-between border-b border-slate-700 pb-2">
            <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-2 py-0.5 rounded-brand-sm border border-emerald-800">
              {{ scannedResult.status }}
            </span>
            <span class="text-[10px] text-slate-400">{{ scannedResult.timestamp }}</span>
          </div>
          <div>
            <p class="text-[10px] font-extrabold text-slate-400 uppercase">GUEST NAME</p>
            <p class="text-sm font-extrabold text-white">{{ scannedResult.guestName }}</p>
          </div>
          <div>
            <p class="text-[10px] font-extrabold text-slate-400 uppercase">ORGANIZATION</p>
            <p class="text-xs font-bold text-slate-300">{{ scannedResult.company }}</p>
          </div>
          <div>
            <p class="text-[10px] font-extrabold text-slate-400 uppercase">WORKSHOP SESSION</p>
            <p class="text-xs font-bold text-[#33C4F0]">{{ scannedResult.session }}</p>
          </div>
        </div>

        <button
          type="button"
          class="w-full py-3 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] text-xs font-extrabold transition cursor-pointer shadow-md"
          style="border-radius: 14px 14px 28px 14px"
          @click="scannedResult = null"
        >
          Scan Next Attendee
        </button>
      </div>
      <div v-else class="mt-6 flex flex-col items-center">
        <!-- Viewfinder Frame -->
        <div class="w-52 h-52 relative border-2 border-dashed border-[#33C4F0]/60 rounded-3xl flex items-center justify-center p-4 bg-slate-800/40">
          <div class="absolute inset-2 border border-[#33C4F0]/30 rounded-2xl animate-pulse" />
          <PhQrCode :size="110" class="text-[#33C4F0]/80" />
        </div>

        <p class="text-xs text-slate-400 mt-4 max-w-xs">Position the client's event pass QR code within the frame to verify entry.</p>

        <button
          type="button"
          class="mt-6 px-6 py-3 bg-[#33C4F0] text-[#1A1A28] text-xs font-extrabold transition flex items-center gap-2 hover:bg-white cursor-pointer shadow-lg"
          style="border-radius: 14px 14px 28px 14px"
          @click="handleSimulateScan"
        >
          <PhLightning :size="16" weight="fill" />
          <span>Simulate QR Scan</span>
        </button>
      </div>
    </div>
  </div>
</template>
