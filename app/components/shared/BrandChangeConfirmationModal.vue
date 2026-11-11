<script setup lang="ts">
import { PhLock, PhWarning, PhX, PhTrash, PhArrowRight } from '@phosphor-icons/vue';

const sub = useSubscription();
</script>

<template>
  <AnimatePresence>
    <div
      v-if="sub.isBrandChangeModalOpen && sub.selectedBrand"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      :style="{ background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }"
    >
      <Motion
        :initial="{ opacity: 0, scale: 0.95, y: 20 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.95, y: 20 }"
        class="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden my-8"
        :style="{ borderRadius: '28px 28px 72px 28px', border: '1px solid rgba(239, 68, 68, 0.3)' }"
      >
        <!-- Header -->
        <div class="px-6 py-5 bg-gradient-to-r from-red-50 via-amber-50 to-white border-b border-red-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-300/50">
              <PhLock :size="20" />
            </div>
            <div>
              <h3 class="font-extrabold text-gray-900 text-lg">Service Brand Locked</h3>
              <p class="text-xs font-semibold text-rose-700">Confirmation required to change brand</p>
            </div>
          </div>
          <button
            class="w-9 h-9 rounded-brand-sm flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            @click="sub.cancelBrandChange()"
          >
            <PhX :size="20" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 sm:p-8 space-y-5">
          <!-- Warning Alert Banner -->
          <div class="bg-amber-50 border border-amber-200 p-4 flex items-start gap-3" style="border-radius: 16px 16px 36px 16px">
            <PhWarning class="text-amber-600 shrink-0 mt-0.5" :size="20" />
            <div>
              <h4 class="text-sm font-extrabold text-amber-900">Changing Service Brand Will Reset Activities</h4>
              <p class="text-xs text-amber-800 mt-1 leading-relaxed">
                Your current brand <strong class="text-amber-950 font-bold">{{ sub.selectedBrand.name }}</strong> is
                locked because you have <strong>{{ sub.selectedActivities.length }} active activity/activities</strong>
                selected this month.
              </p>
            </div>
          </div>

          <!-- Current Brand & Affected Activities Summary -->
          <div class="bg-gray-50 border border-gray-200 p-4" style="border-radius: 20px 20px 40px 20px">
            <div class="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <span>Current Locked Brand:</span>
              <span class="text-rose-600 flex items-center gap-1 font-extrabold">
                <PhLock :size="12" /> {{ sub.selectedActivities.length }} Activities Selected
              </span>
            </div>
            <p class="text-base font-extrabold text-gray-900">{{ sub.selectedBrand.name }}</p>

            <div v-if="sub.selectedActivities.length > 0" class="mt-3 pt-3 border-t border-gray-200 space-y-2">
              <p class="text-[11px] font-bold text-gray-600">The following selected activities will be unassigned:</p>
              <ul class="space-y-1.5 text-xs text-gray-700 font-semibold">
                <li v-for="act in sub.selectedActivities" :key="act.id" class="flex items-center gap-2 text-rose-700">
                  <PhTrash :size="13" class="shrink-0 text-rose-500" />
                  <span class="truncate">{{ act.name }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- New Target Brand (if switching to another vendor) -->
          <div v-if="sub.pendingBrandToSelect" class="flex items-center gap-3 p-3 bg-cyan-50 border border-cyan-200 rounded-2xl text-xs">
            <span class="font-bold text-gray-600">Switching to:</span>
            <div class="flex items-center gap-1.5 font-extrabold text-cyan-900">
              <PhArrowRight :size="14" class="text-cyan-600" />
              <span>{{ sub.pendingBrandToSelect.name }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              class="w-full sm:flex-1 py-3 px-4 rounded-brand-sm bg-gray-900 hover:bg-gray-800 text-white font-extrabold text-xs shadow-md transition"
              @click="sub.cancelBrandChange()"
            >
              Keep {{ sub.selectedBrand.name }} &amp; Activities
            </button>
            <button
              type="button"
              class="w-full sm:flex-1 py-3 px-4 rounded-brand-sm bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition"
              @click="sub.confirmBrandChange()"
            >
              Switch Brand &amp; Reset Activities
            </button>
          </div>
        </div>
      </Motion>
    </div>
  </AnimatePresence>
</template>
