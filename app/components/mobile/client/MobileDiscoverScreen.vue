<script setup lang="ts">
import { computed } from 'vue';
import { PhSparkle, PhStar, PhCheck, PhEye, PhCaretLeft, PhCaretRight, PhMagnifyingGlass, PhBookmarkSimple, PhClock, PhMapPin } from '@phosphor-icons/vue';
import { mockVendors, mockActivities, themeCategories, type Activity, type Vendor } from '~/data/subscriptionData';

const app = useClientMobileApp();
const sub = useSubscription();

const planBadge = computed(
  () =>
    sub.planName ||
    (app.selectedPlanId === 'elite-creative' ? 'Elite Plan' : app.selectedPlanId === 'basic-creative' ? 'Basic Plan' : 'Pass Active'),
);

const filteredVendors = computed(() => {
  const cat = app.selectedCategory.toLowerCase();
  const q = app.searchQuery.toLowerCase();
  return mockVendors.filter((vendor) => {
    const matchesCat = app.selectedCategory === 'all' || vendor.theme.toLowerCase().includes(cat) || vendor.specialty.toLowerCase().includes(cat);
    const matchesSearch =
      !app.searchQuery || vendor.name.toLowerCase().includes(q) || vendor.specialty.toLowerCase().includes(q) || vendor.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });
});

const activitiesFor = (vendorId: string) => mockActivities.filter((a) => a.vendorId === vendorId);

const selectedVendor = computed(() => mockVendors.find((v) => v.id === app.selectedBrandId) || mockVendors[0]!);
const isSubscribedToSelectedVendor = computed(() => sub.selectedBrand?.id === selectedVendor.value.id);
const matchScore = computed(() => (selectedVendor.value.id === 'studio-lumen' ? 98 : selectedVendor.value.id === 'cocoa-collective' ? 95 : 92));

const openActivity = (vendor: Vendor, act: Activity) => {
  app.setSelectedBrandId(vendor.id);
  app.setSelectedActivity(act);
};

const subscribeToSelected = () => {
  const v = selectedVendor.value;
  sub.selectBrand({ id: v.id, name: v.name, rating: v.rating, specialty: v.specialty, color: v.color, avatar: v.avatar });
};
</script>

<template>
  <div
    :class="[
      'flex-1 overflow-y-auto overflow-x-hidden pb-28 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
      app.selectedBrandId === null ? 'bg-[#F1F5F9]' : 'bg-white',
    ]"
  >
    <!-- VIEW 1: SERVICE BRANDS LIST -->
    <div v-if="app.selectedBrandId === null">
      <!-- Top Header Block -->
      <div
        class="w-full px-4 pt-5 pb-4 space-y-3 rounded-none border-b border-slate-100/80"
        style="background: linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 60%, #ffffff 100%)"
      >
        <!-- Plan Badge -->
        <div class="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full w-fit">
          <span class="text-[10px] font-semibold text-[#007595] leading-[15px]" style="font-family: Poppins, sans-serif">{{ planBadge }}</span>
        </div>

        <h2 class="text-[20px] font-bold text-[#1A1A28] leading-tight" style="font-family: Century Gothic, Poppins, sans-serif">Discover</h2>

        <p class="text-[12px] text-[#6A7282] font-normal">Explore included brands &amp; activities.</p>

        <!-- Search Input -->
        <div
          class="w-full h-[40px] bg-white border border-[#E2E8F0] flex items-center px-[12px] pr-[20px] gap-[8px] transition focus-within:border-[#33C4F0]"
          style="border-radius: 20px 20px 48px 20px"
        >
          <PhMagnifyingGlass :size="16" class="text-[#90A1B9] shrink-0" />
          <input
            v-model="app.searchQuery"
            type="text"
            placeholder="Search service brands, specialty, location..."
            class="w-full h-full bg-transparent text-[12px] font-medium text-slate-900 placeholder:text-[#90A1B9] focus:outline-none"
            style="font-family: Poppins, sans-serif"
          />
        </div>

        <!-- Theme Category Pills -->
        <div class="flex gap-2 overflow-x-auto pt-1 pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            v-for="cat in themeCategories"
            :key="cat.id"
            style="border-radius: 20px 20px 48px 20px"
            :class="[
              'py-1.5 px-3.5 text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap transition',
              app.selectedCategory === cat.id ? 'bg-[#1AB0DC] text-white shadow-xs' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300',
            ]"
            @click="app.selectedCategory = cat.id"
          >
            <span>{{ cat.symbol }}</span>
            <span>{{ cat.name }}</span>
          </button>
        </div>
      </div>

      <!-- Service Brands Content List -->
      <div class="p-2.5 space-y-2.5 pb-6">
        <div
          v-for="vendor in filteredVendors"
          :key="vendor.id"
          class="w-full bg-white cursor-pointer py-4 hover:shadow-md transition-all duration-200 overflow-hidden"
          style="border-radius: 20px 20px 48px 20px; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05)"
          @click="app.setSelectedBrandId(vendor.id)"
        >
          <!-- Top Header Banner -->
          <div class="w-full bg-white border-b border-[#E2E8F0] px-4 pb-4 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2.5 min-w-0 flex-1">
              <div
                class="w-[38px] h-[38px] rounded-full bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center text-[18px] shrink-0"
              >
                {{ vendor.avatar }}
              </div>
              <div class="min-w-0 flex flex-col justify-start flex-1">
                <span class="text-[9px] font-semibold text-[#FF6467] uppercase tracking-[0.45px] leading-[14px]" style="font-family: Poppins, sans-serif">
                  {{ vendor.theme }}
                </span>
                <h3 class="text-[15px] font-bold text-[#101828] leading-[18px] truncate" style="font-family: Century Gothic, sans-serif">{{ vendor.name }}</h3>
              </div>
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <span
                v-if="sub.selectedBrand?.id === vendor.id"
                class="text-[10px] font-semibold text-[#059669] bg-[#ECFDF5] px-3 py-1 flex items-center gap-1 border border-[#10B981]/30"
                style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
              >
                <PhCheck :size="11" class="text-[#10B981]" /> Subscribed
              </span>
              <span
                v-else
                class="text-[10px] font-semibold text-[#147C9E] bg-[#DFF2FE] px-3 py-1 inline-block"
                style="border-radius: 20px 20px 48px 20px; font-family: Poppins, sans-serif"
              >
                Available in Plan
              </span>
              <PhCaretRight :size="14" class="text-[#45556C] shrink-0" />
            </div>
          </div>

          <!-- Rating & Short Description -->
          <div class="px-4 pt-3.5 pb-0 space-y-2">
            <div class="flex items-center gap-1.5 text-[12px] font-semibold text-[#FE9A00]" style="font-family: Poppins, sans-serif">
              <PhStar :size="14" weight="fill" class="text-[#FFB900]" />
              <span>{{ vendor.rating }}</span>
              <span class="text-[#717182] font-semibold">•</span>
              <span class="text-[#717182] font-semibold">{{ vendor.location }}</span>
            </div>

            <p class="text-[12px] font-normal text-[#475569] leading-[18px] line-clamp-2" style="font-family: Poppins, sans-serif">
              {{ vendor.description || vendor.specialty }}
            </p>
          </div>

          <!-- Featured Activities Carousel -->
          <div class="pt-4 px-4 pb-0">
            <div class="flex items-center gap-2.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-full">
              <div
                v-for="act in activitiesFor(vendor.id)"
                :key="act.id"
                style="border-radius: 16px 16px 38.4px 16px"
                class="relative w-[200px] h-[128px] overflow-hidden shrink-0 cursor-pointer p-3 flex flex-col justify-end group shadow-xs transition hover:scale-[1.01]"
                @click.stop="openActivity(vendor, act)"
              >
                <img
                  :src="act.image"
                  :alt="act.name"
                  class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
                  @error="hideOnError"
                />
                <div
                  class="absolute inset-0 z-[1]"
                  style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0) 100%)"
                />

                <div class="relative z-[2] space-y-0.5">
                  <span
                    class="text-[7.2px] font-semibold text-white bg-white/20 px-1.5 py-[1px] rounded-full uppercase backdrop-blur-md inline-block leading-[11px]"
                    style="font-family: Poppins, sans-serif"
                  >
                    {{ act.category || vendor.theme }}
                  </span>
                  <h5 class="text-[11.2px] font-bold text-white leading-[14px] line-clamp-2" style="font-family: Century Gothic, sans-serif">{{ act.name }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 2: SELECTED BRAND -->
    <div v-else class="bg-white space-y-4 p-4 min-h-full">
      <!-- Back Button -->
      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition"
        @click="app.setSelectedBrandId(null)"
      >
        <PhCaretLeft :size="16" weight="bold" /> Back to All Service Brands
      </button>

      <!-- 1. BRAND DETAILS -->
      <div class="py-[16px] border-b border-[#F1F5F9] space-y-3">
        <!-- Main Brand Image Container -->
        <div class="relative h-[176px] w-full bg-gradient-to-tr from-purple-800 via-indigo-700 to-sky-600 overflow-hidden isolate rounded-2xl">
          <img :src="selectedVendor.image" :alt="selectedVendor.name" class="w-full h-full object-cover relative z-0" @error="hideOnError" />
          <div class="absolute inset-0 z-[1]" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)" />

          <!-- Subscription Status Badge Top-Left -->
          <div class="absolute top-3 left-3 z-[2]">
            <span
              v-if="isSubscribedToSelectedVendor"
              class="text-[10px] font-semibold text-[#10B981] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md flex items-center gap-1"
              style="font-family: Poppins, sans-serif"
            >
              <PhCheck :size="11" /> Subscribed Brand
            </span>
            <span
              v-else
              class="text-[10px] font-semibold text-[#147C9E] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md"
              style="font-family: Poppins, sans-serif"
            >
              Preview Mode
            </span>
          </div>

          <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between z-[3]">
            <div class="flex items-center gap-[10px] min-w-0">
              <div class="w-[40px] h-[40px] rounded-[16px] bg-white shadow-md flex items-center justify-center text-[20px] shrink-0">{{ selectedVendor.avatar }}</div>
              <div class="min-w-0 flex flex-col justify-start">
                <span
                  class="text-[9px] font-semibold text-white bg-white/20 px-2 py-[2px] rounded-[19.6px] uppercase backdrop-blur-md inline-block w-fit mb-0.5"
                  style="font-family: Poppins, sans-serif"
                >
                  {{ selectedVendor.theme }}
                </span>
                <h3 class="text-[14px] font-semibold text-white leading-[20px] truncate" style="font-family: Century Gothic, sans-serif">
                  {{ selectedVendor.name }}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Rating, Location & AI Match -->
        <div class="flex items-center gap-2 text-[12px] font-semibold pt-1" style="font-family: Century Gothic, sans-serif">
          <span class="flex items-center gap-1 text-[#FE9A00]">
            <PhStar :size="14" weight="fill" class="text-[#FFB900]" />
            {{ selectedVendor.rating }}
          </span>
          <span class="text-[#717182]">•</span>
          <span class="text-[#717182] truncate">{{ selectedVendor.location }}</span>
          <!-- Conic Progress Ring Badge -->
          <div class="ml-auto inline-flex items-center gap-1.5 bg-[#FBF7FF] border border-[#E9D4FF] px-2 py-1 rounded-full shrink-0" :title="`${matchScore}% Acumen Match`">
            <div
              class="w-4 h-4 rounded-full flex items-center justify-center p-[2px] shrink-0"
              :style="{ background: `conic-gradient(#9333EA ${matchScore * 3.6}deg, #E9D4FF 0deg)` }"
            >
              <div class="w-full h-full bg-white rounded-full flex items-center justify-center">
                <PhSparkle :size="8" weight="fill" class="text-[#9333EA]" />
              </div>
            </div>
            <span class="text-[10px] font-bold text-[#7E22CE] leading-none" style="font-family: Poppins, sans-serif">{{ matchScore }}%</span>
          </div>
        </div>

        <p class="text-[12px] font-normal text-[#101828] leading-[20px] py-[4px]" style="font-family: Poppins, sans-serif">{{ selectedVendor.description }}</p>

        <!-- Subscription Status & Action Banner -->
        <div v-if="!isSubscribedToSelectedVendor" class="rounded-2xl bg-[#E8F9FF] border border-[#33C4F0]/30 p-3.5 space-y-2">
          <div class="flex items-center gap-2 text-xs font-semibold text-[#147C9E]">
            <PhEye :size="16" class="text-[#33C4F0] shrink-0" />
            <span>Preview Mode: You are exploring {{ selectedVendor.name }}'s activities.</span>
          </div>
          <p class="text-[11px] text-[#525266] font-medium leading-relaxed">
            Subscribe to this service brand with your {{ sub.planName || 'plan' }} entitlement to unlock activity bookings.
          </p>
          <button
            type="button"
            class="w-full h-[36px] bg-[#1A1A28] hover:bg-[#33C4F0] text-white text-[12px] font-semibold flex items-center justify-center gap-2 rounded-full transition shadow-xs"
            style="font-family: Century Gothic, sans-serif"
            @click="subscribeToSelected"
          >
            <PhCheck :size="15" />
            Subscribe to {{ selectedVendor.name }}
          </button>
        </div>
        <div v-else class="rounded-2xl bg-[#ECFDF5] border border-[#10B981]/30 p-3 flex items-center justify-between text-xs text-[#087E58] font-semibold">
          <span class="flex items-center gap-2">
            <PhCheck :size="16" class="text-[#10B981]" />
            Subscribed Brand — All workshops below are included in your pass.
          </span>
        </div>
      </div>

      <!-- 2. AVAILABLE SERVICES & WORKSHOPS -->
      <div class="space-y-3 pt-1">
        <div class="flex items-center justify-between">
          <h3 class="text-[10px] font-semibold text-[#6A7282] uppercase tracking-[1.54px] leading-[16px]" style="font-family: Century Gothic, sans-serif">
            AVAILABLE SERVICES &amp; WORKSHOPS ({{ activitiesFor(selectedVendor.id).length }})
          </h3>
          <span
            v-if="isSubscribedToSelectedVendor"
            class="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full"
            style="font-family: Poppins, sans-serif"
          >
            Included in Pass
          </span>
          <span
            v-else
            class="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60"
            style="font-family: Poppins, sans-serif"
          >
            Subscription Required
          </span>
        </div>

        <!-- List of Available Activities -->
        <div class="-mx-4 bg-[#F1F5F9] space-y-2.5 pt-2 pb-2">
          <div
            v-for="act in activitiesFor(selectedVendor.id)"
            :key="act.id"
            class="bg-white w-full py-4 px-4 space-y-3 cursor-pointer hover:bg-slate-50/80 transition"
            @click="app.setSelectedActivity(act)"
          >
            <!-- Activity Header Row -->
            <div class="flex items-center justify-between h-[36px]">
              <div class="flex items-center gap-[10px] min-w-0 flex-1">
                <div class="w-[32px] h-[32px] bg-[#E8F9FF] rounded-full flex items-center justify-center shrink-0 text-base">
                  {{ act.symbol || selectedVendor.avatar }}
                </div>
                <div class="flex flex-col justify-start min-w-0 flex-1">
                  <h4 class="text-[12px] font-semibold text-[#0F172B] leading-[16px] truncate" style="font-family: Poppins, sans-serif">{{ act.name }}</h4>
                  <p class="text-[11px] font-normal text-[#90A1B9] leading-[17px] truncate" style="font-family: Poppins, sans-serif">
                    {{ act.category }} • {{ act.duration }}
                  </p>
                </div>
              </div>
              <span class="text-[11px] font-semibold text-[#FE9A00] flex items-center gap-1 shrink-0 ml-2" style="font-family: Century Gothic, sans-serif">
                <PhStar :size="13" weight="fill" class="text-[#FFB900]" />
                {{ act.rating }}
              </span>
            </div>

            <!-- Activity Image -->
            <div class="relative h-[160px] w-full bg-slate-100 overflow-hidden isolate shadow-none" style="border-radius: 20px 20px 48px 20px">
              <img :src="act.image" :alt="act.name" class="w-full h-full object-cover relative z-0" @error="hideOnError" />
              <div class="absolute inset-0 z-[1]" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 60%)" />

              <button
                type="button"
                :class="[
                  'absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm transition z-[2]',
                  app.savedActivityIds.includes(act.id) ? 'text-[#EF4444]' : 'text-slate-600',
                ]"
                @click.stop="app.toggleSaveActivity(act.id)"
              >
                <PhBookmarkSimple :size="16" :weight="app.savedActivityIds.includes(act.id) ? 'fill' : 'regular'" />
              </button>

              <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between z-[3]">
                <span
                  class="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1"
                  style="font-family: Poppins, sans-serif"
                >
                  <span>{{ act.symbol }}</span> {{ act.category }}
                </span>
                <span
                  v-if="isSubscribedToSelectedVendor"
                  class="text-[10px] font-semibold text-[#10B981] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs"
                  style="font-family: Poppins, sans-serif"
                >
                  Included in Pass
                </span>
                <span
                  v-else
                  class="text-[10px] font-semibold text-amber-800 bg-amber-100/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs"
                  style="font-family: Poppins, sans-serif"
                >
                  Subscribe Brand First
                </span>
              </div>
            </div>

            <!-- Details row: Duration & Location -->
            <div class="flex items-center justify-between text-[11px] font-semibold text-[#717182] pt-1" style="font-family: Poppins, sans-serif">
              <span class="flex items-center gap-1"> <PhClock :size="14" class="text-[#33C4F0]" /> {{ act.duration }} </span>
              <span class="flex items-center gap-1"> <PhMapPin :size="14" class="text-[#33C4F0]" /> {{ act.location }} </span>
            </div>

            <p class="text-[12px] font-normal text-[#101828] leading-[18px]" style="font-family: Poppins, sans-serif">{{ act.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
