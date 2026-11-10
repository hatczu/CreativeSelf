<script setup lang="ts">
import { ref } from 'vue';
import { PhSparkle, PhX } from '@phosphor-icons/vue';
import { vendorServices } from '~/data/vendorData';

const liveServices = ref(vendorServices.map((s) => ({ ...s })));
const showComposer = ref(false);

const toggleLive = (name: string) => {
  liveServices.value = liveServices.value.map((item) => (item.name === name ? { ...item, live: !item.live } : item));
};
</script>

<template>
  <VendorWorkspaceShell page="services" @new-service="showComposer = true">
    <section class="mt-7">
      <div class="mb-4 flex items-end justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Live and draft</p>
          <h2 class="mt-1 text-2xl font-extrabold">Your current offer</h2>
        </div>
        <p class="text-sm font-bold text-[#717182]">{{ liveServices.filter((service) => service.live).length }} live</p>
      </div>
      <div class="space-y-4">
        <article
          v-for="service in liveServices"
          :key="service.name"
          class="group overflow-hidden bg-white p-4 sm:p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)] transition hover:shadow-[0_18px_48px_rgba(28,118,155,.12)]"
          style="border-radius: 20px 20px 64px 20px"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div class="relative h-36 w-full sm:h-28 sm:w-36 shrink-0 overflow-hidden rounded-[16px_16px_36px_16px] bg-gray-100">
              <ImageWithFallback
                :src="service.image"
                :alt="service.name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a28]/60 via-transparent to-transparent" />
              <span class="absolute bottom-2 left-2 grid h-8 w-8 place-items-center rounded-xl bg-white/90 text-lg shadow-sm backdrop-blur">
                {{ service.emoji }}
              </span>
              <span
                class="absolute top-2 right-2 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase text-white backdrop-blur shadow-sm"
                :style="{ background: service.live ? '#10b981' : '#717182' }"
              >
                {{ service.live ? 'Published' : 'Draft' }}
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-extrabold uppercase tracking-[.14em]" :style="{ color: service.color }">{{ service.format }}</span>
                <span class="text-xs text-[#717182]">•</span>
                <span class="text-xs font-extrabold text-[#147c9e]">{{ service.price }}</span>
              </div>
              <h3 class="mt-1 text-lg font-extrabold text-[#1a1a28] group-hover:text-[#147c9e] transition">{{ service.name }}</h3>
              <div class="mt-3 flex flex-wrap items-center gap-4 text-xs font-bold text-[#717182]">
                <span class="rounded-full bg-[#f8fdff] border border-[#33c4f0]/20 px-3 py-1">👀 {{ service.views }} views</span>
                <span class="rounded-full bg-[#f8fdff] border border-[#33c4f0]/20 px-3 py-1">📅 {{ service.bookings }} bookings</span>
              </div>
            </div>
            <div class="flex items-center gap-3 sm:self-center">
              <button
                type="button"
                :class="[
                  'rounded-full px-5 py-2.5 text-xs font-extrabold transition',
                  service.live ? 'bg-[#e8f9ff] text-[#147c9e] hover:bg-[#d4f2fc]' : 'bg-[#1a1a28] text-white hover:bg-[#33c4f0] hover:text-[#1a1a28]',
                ]"
                @click="toggleLive(service.name)"
              >
                {{ service.live ? 'Unpublish' : 'Publish' }}
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <div v-if="showComposer" class="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5" role="dialog" aria-modal="true">
      <div class="relative w-full max-w-xl bg-white p-7 shadow-2xl" style="border-radius: 20px 20px 64px 20px">
        <button
          type="button"
          class="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe]"
          aria-label="Close"
          @click="showComposer = false"
        >
          <PhX :size="18" />
        </button>
        <p class="text-xs font-extrabold uppercase tracking-[.16em] text-[#147c9e]">New service</p>
        <h2 class="mt-2 text-3xl font-extrabold">Make it easy to say yes.</h2>
        <input class="mt-7 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] px-4 py-3 text-sm" placeholder="Service name" />
        <textarea
          class="mt-4 min-h-28 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] p-4 text-sm"
          placeholder="What will this experience make possible for a team?"
        />
        <button
          type="button"
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-6 py-3 text-sm font-extrabold text-white"
          @click="showComposer = false"
        >
          <PhSparkle :size="16" />Save draft
        </button>
      </div>
    </div>
  </VendorWorkspaceShell>
</template>
