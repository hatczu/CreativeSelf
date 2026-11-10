<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhPlus, PhMagnifyingGlass, PhEye, PhCalendarBlank, PhPencilSimple } from '@phosphor-icons/vue';

type FilterTab = 'all' | 'published' | 'draft';

const app = useProviderMobileApp();

const searchQuery = ref('');
const filterTab = ref<FilterTab>('all');

const filteredServices = computed(() =>
  app.servicesList.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    if (filterTab.value === 'published') return matchesSearch && s.published;
    if (filterTab.value === 'draft') return matchesSearch && !s.published;
    return matchesSearch;
  }),
);

const filters = computed(() => [
  { id: 'all' as FilterTab, label: `All Services (${app.servicesList.length})`, activeClass: 'bg-[#1AB0DC] text-white shadow-xs' },
  { id: 'published' as FilterTab, label: `Published (${app.servicesList.filter((s) => s.published).length})`, activeClass: 'bg-[#10B981] text-white shadow-xs' },
  { id: 'draft' as FilterTab, label: `Drafts (${app.servicesList.filter((s) => !s.published).length})`, activeClass: 'bg-slate-700 text-white shadow-xs' },
]);
</script>

<template>
  <div
    class="flex-1 h-full overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
  >
    <!-- Top Header Block -->
    <div class="w-full px-4 pt-5 pb-4 space-y-3 border-b border-slate-100/80" style="background: linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 60%, #ffffff 100%)">
      <div class="flex items-center justify-between">
        <div class="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full">
          <span class="text-[10px] font-semibold text-[#007595] leading-[15px]" style="font-family: Poppins, sans-serif">Services Catalog</span>
        </div>

        <button
          type="button"
          class="py-1.5 px-3 bg-[#1AB0DC] hover:bg-[#007595] text-white text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer shadow-2xs"
          style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
          @click="app.showServiceModal = true"
        >
          <PhPlus :size="14" weight="bold" />
          <span>Add Service</span>
        </button>
      </div>

      <h2 class="text-[20px] font-bold text-[#1A1A28] leading-tight" style="font-family: Century Gothic, Poppins, sans-serif">Services &amp; Workshops</h2>

      <p class="text-[12px] text-[#6A7282] font-normal">Manage your creative workshop packages available for corporate booking.</p>

      <!-- Search Bar -->
      <div
        class="w-full h-[40px] bg-white border border-[#E2E8F0] flex items-center px-[12px] pr-[20px] gap-[8px] transition focus-within:border-[#1AB0DC]"
        style="border-radius: 20px 20px 48px 20px"
      >
        <PhMagnifyingGlass :size="16" class="text-[#90A1B9] shrink-0" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search service packages..."
          class="w-full h-full bg-transparent text-[12px] font-medium text-slate-900 placeholder:text-[#90A1B9] focus:outline-none"
          style="font-family: Poppins, sans-serif"
        />
      </div>

      <!-- Category Filter Pills -->
      <div class="flex gap-2 overflow-x-auto pt-1 pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          style="border-radius: 20px 20px 48px 20px"
          :class="[
            'py-1.5 px-3.5 text-[11px] font-semibold whitespace-nowrap transition cursor-pointer',
            filterTab === f.id ? f.activeClass : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300',
          ]"
          @click="filterTab = f.id"
        >
          {{ f.label }}
        </button>
      </div>
    </div>

    <!-- Services List Content -->
    <div class="p-3.5 space-y-3 pb-6">
      <div v-if="filteredServices.length === 0" class="py-16 text-center">
        <p class="text-xs font-medium text-[#6A7282]">No service packages found.</p>
        <button type="button" class="mt-2 text-xs font-semibold text-[#007595] inline-flex items-center gap-1" @click="app.showServiceModal = true">
          <PhPlus :size="14" /> Add new service
        </button>
      </div>
      <div
        v-for="listing in filteredServices"
        v-else
        :key="listing.id || listing.title"
        class="bg-white border border-slate-100/80 shadow-2xs overflow-hidden hover:border-[#1AB0DC] transition space-y-3"
        style="border-radius: 20px 20px 48px 20px"
      >
        <div class="relative h-36 w-full bg-slate-100 overflow-hidden">
          <img :src="listing.image" :alt="listing.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          <span
            :class="[
              'absolute top-3 right-3 text-[9px] font-bold uppercase px-2.5 py-0.5 text-white backdrop-blur-xs shadow-xs',
              listing.published ? 'bg-[#10B981]' : 'bg-slate-600',
            ]"
            style="border-radius: 10px 10px 20px 10px"
          >
            {{ listing.published ? 'Published' : 'Draft' }}
          </span>

          <span class="absolute bottom-3 left-3 w-8 h-8 rounded-xl bg-white/90 text-lg flex items-center justify-center shadow-xs">{{ listing.emoji || '✨' }}</span>
        </div>

        <div class="p-4 pt-0 space-y-2.5">
          <div>
            <h3 class="text-[15px] font-bold text-[#1A1A28] leading-tight" style="font-family: Century Gothic, Poppins, sans-serif">{{ listing.title }}</h3>
            <p class="text-[11px] text-[#6A7282] font-medium mt-1 flex items-center gap-2">
              <span>{{ listing.format }}</span>
              <span v-if="listing.price" class="font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">{{ listing.price }}</span>
            </p>
          </div>

          <p v-if="listing.description" class="text-[11px] text-slate-600 leading-relaxed line-clamp-2">{{ listing.description }}</p>

          <div class="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6A7282] font-semibold">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <PhEye :size="13" class="text-[#1AB0DC]" />
                <span>{{ listing.views || '0' }} views</span>
              </span>
              <span class="flex items-center gap-1">
                <PhCalendarBlank :size="13" class="text-[#1AB0DC]" />
                <span>{{ listing.bookings || '0' }} bookings</span>
              </span>
            </div>

            <button type="button" class="p-1.5 text-slate-400 hover:text-[#1AB0DC] transition" title="Edit Service" @click="app.showServiceModal = true">
              <PhPencilSimple :size="15" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
