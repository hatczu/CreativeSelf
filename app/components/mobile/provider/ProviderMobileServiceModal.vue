<script setup lang="ts">
import { ref } from 'vue';
import { PhX, PhSparkle, PhCheckCircle } from '@phosphor-icons/vue';

const app = useProviderMobileApp();

const title = ref('');
const format = ref('90 min · Team workshop');
const price = ref('45');
const maxGuests = ref('20');
const category = ref('Art & Creativity');
const description = ref('');
const submitted = ref(false);

const formats = ['60 min · Express Workshop', '90 min · Team Workshop', '120 min · Deep Dive Masterclass', 'Half-day Retreat'];

const close = () => {
  app.showServiceModal = false;
};

const handleSubmit = () => {
  submitted.value = true;
  setTimeout(() => {
    app.saveService({
      id: `svc-${Date.now()}`,
      title: title.value || 'New Creative Session',
      format: format.value,
      price: `$${price.value}/person`,
      maxGuests: maxGuests.value,
      category: category.value,
      description: description.value,
      published: true,
      views: '1',
      bookings: '0',
      color: '#33C4F0',
      emoji: '✨',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    });
    submitted.value = false;
    title.value = '';
    description.value = '';
    close();
  }, 1200);
};

const inputClass = 'w-full bg-slate-50 border border-slate-200 p-3 text-xs font-bold text-[#1A1A28] focus:bg-white focus:border-[#33C4F0] focus:outline-hidden';
</script>

<template>
  <div v-if="app.showServiceModal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
    <div
      class="w-full max-w-md bg-white p-6 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-250"
      style="border-radius: 24px 24px 0 0"
    >
      <!-- Top Handle bar -->
      <div class="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 shrink-0 sm:hidden" />

      <div class="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
        <div>
          <p class="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E]">Studio Offering</p>
          <h3 class="text-lg font-extrabold text-[#1A1A28]" style="font-family: Century Gothic, Poppins, sans-serif">New Service Package</h3>
        </div>
        <button type="button" class="w-8 h-8 rounded-brand-sm bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition" @click="close">
          <PhX :size="16" weight="bold" />
        </button>
      </div>

      <div v-if="submitted" class="py-12 flex flex-col items-center justify-center text-center">
        <div class="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-4">
          <PhCheckCircle :size="36" weight="fill" />
        </div>
        <h4 class="text-xl font-extrabold text-[#1A1A28]">Service Published!</h4>
        <p class="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
          Your service is now live on the CreativeSelf marketplace for team leaders to discover.
        </p>
      </div>
      <form v-else class="mt-4 space-y-4 overflow-y-auto pr-1 flex-1" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">SERVICE TITLE</label>
          <input
            v-model="title"
            type="text"
            required
            placeholder="e.g. Expressive Watercolor & Tea Tasting"
            :class="inputClass"
            style="border-radius: 12px 12px 24px 12px"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">PRICE / GUEST</label>
            <div class="relative">
              <span class="absolute left-3 top-3 text-xs font-extrabold text-slate-400">$</span>
              <input v-model="price" type="number" required :class="[inputClass, 'pl-7']" style="border-radius: 12px 12px 24px 12px" />
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">MAX GROUP SIZE</label>
            <input v-model="maxGuests" type="number" required :class="inputClass" style="border-radius: 12px 12px 24px 12px" />
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">SESSION FORMAT</label>
          <select v-model="format" :class="inputClass" style="border-radius: 12px 12px 24px 12px">
            <option v-for="f in formats" :key="f" :value="f">{{ f }}</option>
          </select>
        </div>

        <div>
          <label class="block text-[11px] font-extrabold uppercase text-slate-400 mb-1">DESCRIPTION</label>
          <textarea
            v-model="description"
            rows="3"
            required
            placeholder="Describe what teams will experience and learn..."
            class="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-medium text-[#1A1A28] focus:bg-white focus:border-[#33C4F0] focus:outline-hidden"
            style="border-radius: 12px 12px 24px 12px"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3.5 bg-[#1A1A28] hover:bg-[#33C4F0] hover:text-[#1A1A28] text-white text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4"
          style="border-radius: 16px 16px 36px 16px; font-family: Century Gothic, sans-serif"
        >
          <PhSparkle :size="16" weight="fill" class="text-[#33C4F0]" />
          <span>Publish Service Listing</span>
        </button>
      </form>
    </div>
  </div>
</template>
