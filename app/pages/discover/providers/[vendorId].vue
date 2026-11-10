<script setup lang="ts">
import { computed } from 'vue';
import { PhCheck, PhCaretLeft, PhMapPin, PhBuildings, PhSparkle, PhShieldCheck, PhEye } from '@phosphor-icons/vue';
import { mockVendors, mockActivities, type Activity } from '~/data/subscriptionData';
import type { ActivityItem } from '~/types/subscription';

const route = useRoute();
const sub = useSubscription();

const vendor = computed(() => mockVendors.find((v) => v.id === route.params.vendorId) || mockVendors[0]!);
const vendorActivities = computed(() => mockActivities.filter((a) => a.vendorId === vendor.value.id));

const isCurrentBrandSelected = computed(() => sub.selectedBrand?.id === vendor.value.id);
const isActivityLimitReached = computed(() => sub.selectedActivities.length >= sub.maxActivities);

const categories = computed(() => Array.from(new Set(vendorActivities.value.map((a) => a.category))));
const activitiesInCategory = (category: string) => vendorActivities.value.filter((a) => a.category === category);

const handleCommitBrand = () => {
  const v = vendor.value;
  sub.selectBrand({
    id: v.id,
    name: v.name,
    rating: v.rating,
    specialty: v.specialty,
    color: v.color,
    avatar: v.avatar,
  });
};

const handleActivityToggle = (act: Activity) => {
  if (sub.isActivitySelected(act.id)) {
    sub.unselectActivity(act.id);
    return;
  }

  if (!isCurrentBrandSelected.value) handleCommitBrand();

  const activityItem: ActivityItem = {
    id: act.id,
    name: act.name,
    vendorId: act.vendorId,
    vendorName: act.vendorName,
    category: act.category,
    duration: act.duration,
    location: act.location,
    description: act.description,
    color: act.color,
    symbol: act.symbol,
    image: act.image,
  };

  const res = sub.selectActivity(activityItem);
  if (!res.success && res.reason === 'limit_reached') {
    sub.openLimitModal();
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <ActivityLimitModal />

    <UniversalSidebar />

    <!-- Main Layout Container -->
    <div
      class="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]"
    >
      <!-- Navigation Sidebar -->
      <aside class="hidden lg:block">
        <div class="sticky top-8 bg-[#1a1a28] p-5 text-white" style="border-radius: 20px 20px 64px 20px">
          <NuxtLink to="/discover/providers" class="inline-flex items-center gap-2 text-xs font-bold text-[#33c4f0] hover:underline">
            <PhCaretLeft :size="16" /> All Service Brands
          </NuxtLink>
          <div class="mt-6">
            <div class="grid h-12 w-12 place-items-center rounded-full text-2xl" :style="{ background: `${vendor.color}25` }">
              {{ vendor.avatar }}
            </div>
            <h2 class="mt-3 text-lg font-extrabold">{{ vendor.name }}</h2>
            <p class="mt-1 text-xs text-white/70">{{ vendor.location }}</p>
          </div>
          <div class="mt-6 border-t border-white/10 pt-4">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-white/45">Categories</p>
            <div class="mt-2 space-y-1">
              <a
                v-for="cat in categories"
                :key="cat"
                :href="`#cat-${cat}`"
                class="block rounded-lg px-3 py-1.5 text-xs font-bold text-white/70 hover:bg-white/10 hover:text-white"
              >
                {{ cat }}
              </a>
            </div>
          </div>
        </div>
      </aside>

      <!-- Center Content Area -->
      <main>
        <!-- Top Entitlement Banner -->
        <SubscriptionEntitlementHeader />

        <!-- Preview vs Committed Banner -->
        <div
          v-if="!isCurrentBrandSelected"
          class="mt-4 rounded-2xl bg-[#e8f9ff] border border-[#33c4f0]/30 p-4 text-xs text-[#147c9e] flex items-center justify-between shadow-xs"
        >
          <span class="flex items-center gap-2 font-bold">
            <PhEye :size="16" class="text-[#33c4f0]" />
            Preview Mode: You are exploring {{ vendor.name }}'s activities before committing.
          </span>
          <button
            type="button"
            class="rounded-full bg-[#1a1a28] px-4 py-1.5 text-xs font-extrabold text-white hover:bg-[#33c4f0] hover:text-[#1a1a28]"
            @click="handleCommitBrand"
          >
            Select
          </button>
        </div>

        <!-- Vendor Hero Banner with Photo -->
        <header class="mt-4 overflow-hidden bg-white shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
          <div class="relative h-52 w-full overflow-hidden">
            <ImageWithFallback :src="vendor.image" :alt="vendor.name" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a28] via-[#1a1a28]/40 to-transparent"></div>

            <div class="absolute left-6 bottom-5 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
              <div class="flex items-center gap-4">
                <div class="grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow-lg">{{ vendor.avatar }}</div>
                <div>
                  <span class="inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-extrabold uppercase text-white backdrop-blur">
                    {{ vendor.theme }}
                  </span>
                  <h1 class="mt-1 text-3xl font-extrabold text-white">{{ vendor.name }}</h1>
                </div>
              </div>

              <div>
                <div
                  v-if="isCurrentBrandSelected"
                  class="inline-flex items-center gap-2 rounded-full bg-[#10b981] px-4 py-2 text-xs font-extrabold text-white shadow-md"
                >
                  <PhCheck :size="16" /> Selected
                </div>
                <button
                  v-else
                  type="button"
                  class="rounded-full bg-[#33c4f0] px-5 py-2 text-xs font-extrabold text-[#1a1a28] shadow-md transition hover:bg-white"
                  @click="handleCommitBrand"
                >
                  Select
                </button>
              </div>
            </div>
          </div>

          <div class="p-6">
            <p class="text-sm leading-6 text-[#414153]">{{ vendor.description }}</p>
            <div class="mt-4 flex flex-wrap gap-5 border-t border-[#33c4f0]/15 pt-4 text-xs font-bold text-[#717182]">
              <span class="flex items-center gap-1.5"> <PhMapPin :size="15" class="text-[#33c4f0]" /> {{ vendor.location }} </span>
              <span class="flex items-center gap-1.5"> <PhShieldCheck :size="15" class="text-[#10b981]" /> Verified Subscription Partner </span>
              <span class="flex items-center gap-1.5">
                <PhBuildings :size="15" class="text-[#8B5CF6]" /> {{ vendorActivities.length }} Activities Included
              </span>
            </div>
          </div>
        </header>

        <!-- Grouped Services / Activities List with Photos -->
        <div class="mt-8 space-y-8">
          <section v-for="category in categories" :id="`cat-${category}`" :key="category" class="space-y-4">
            <div class="flex items-center justify-between border-b border-[#33c4f0]/20 pb-2">
              <h2 class="text-xl font-extrabold text-[#1a1a28]">{{ category }}</h2>
              <span class="text-xs font-bold text-[#717182]">{{ activitiesInCategory(category).length }} activities</span>
            </div>

            <div class="grid gap-5 sm:grid-cols-1">
              <article
                v-for="act in activitiesInCategory(category)"
                :key="act.id"
                class="group relative overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)] transition hover:shadow-[0_18px_48px_rgba(28,118,155,.12)]"
                style="border-radius: 20px 20px 64px 20px"
              >
                <div class="flex flex-col sm:flex-row">
                  <!-- Photo Thumbnail -->
                  <div class="h-48 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-auto sm:w-56">
                    <ImageWithFallback
                      :src="act.image"
                      :alt="act.name"
                      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <!-- Activity Info & Actions -->
                  <div class="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div class="flex items-center justify-between gap-2">
                        <span class="rounded-full bg-[#e8f9ff] px-3 py-1 text-[11px] font-extrabold text-[#147c9e]">Included in plan</span>
                        <span class="text-xs font-bold text-[#717182]">{{ act.duration }}</span>
                      </div>

                      <h3 class="mt-2 text-xl font-extrabold text-[#1a1a28]">
                        <NuxtLink :to="`/discover/services/${act.id}`" class="hover:text-[#33c4f0] transition">{{ act.name }}</NuxtLink>
                      </h3>
                      <p class="mt-1 text-sm text-[#717182] line-clamp-2">{{ act.description }}</p>
                    </div>

                    <div class="mt-4 flex items-center justify-between border-t border-[#33c4f0]/15 pt-3">
                      <NuxtLink :to="`/discover/services/${act.id}`" class="text-xs font-bold text-[#147c9e] hover:underline">
                        Preview Details →
                      </NuxtLink>

                      <button
                        v-if="sub.isActivitySelected(act.id)"
                        type="button"
                        class="inline-flex items-center gap-2 rounded-full bg-[#10b981] px-5 py-2 text-xs font-extrabold text-white transition hover:bg-[#087e58]"
                        @click="handleActivityToggle(act)"
                      >
                        <PhCheck :size="16" /> Activity Selected
                      </button>
                      <button
                        v-else-if="isActivityLimitReached"
                        type="button"
                        class="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-extrabold text-[#717182] hover:bg-gray-200"
                        @click="sub.openLimitModal()"
                      >
                        Limit Reached
                      </button>
                      <button
                        v-else
                        type="button"
                        class="inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-5 py-2 text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                        @click="handleActivityToggle(act)"
                      >
                        Select Activity
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>

      <!-- Right Sidebar: Plan Overview Card -->
      <aside class="hidden lg:block">
        <div class="sticky top-8 space-y-6">
          <div class="overflow-hidden bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
            <div class="flex items-center justify-between border-b border-[#33c4f0]/15 pb-4">
              <div>
                <p class="text-xs font-extrabold uppercase tracking-[.14em] text-[#33c4f0]">Your Plan</p>
                <h3 class="text-lg font-extrabold text-[#1a1a28]">{{ sub.planName }}</h3>
              </div>
              <PhSparkle class="text-[#33c4f0]" :size="20" />
            </div>

            <div class="mt-5 space-y-4">
              <div>
                <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Selected Service Brand</p>
                <div class="mt-2 rounded-2xl bg-[#f8fdff] border border-[#33c4f0]/20 p-3">
                  <p class="text-sm font-extrabold text-[#1a1a28]">{{ sub.selectedBrand ? sub.selectedBrand.name : 'None selected yet' }}</p>
                  <p class="mt-0.5 text-xs font-bold text-[#147c9e]">{{ sub.selectedBrand ? '1 / 1 selected' : '0 / 1 selected' }}</p>
                </div>
              </div>

              <div>
                <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Activities</p>
                <div class="mt-2 rounded-2xl bg-[#f8fdff] border border-[#33c4f0]/20 p-3">
                  <div class="flex items-center justify-between text-xs font-extrabold text-[#1a1a28]">
                    <span>Selected:</span>
                    <span class="text-[#10b981]">{{ sub.selectedActivities.length }} / {{ sub.maxActivities }}</span>
                  </div>

                  <div class="mt-3 space-y-2">
                    <div
                      v-for="act in sub.selectedActivities"
                      :key="act.id"
                      class="flex items-start justify-between gap-2 text-xs font-bold text-[#1a1a28]"
                    >
                      <span class="flex items-center gap-1.5">
                        <PhCheck :size="14" class="text-[#10b981] shrink-0" />
                        <span class="truncate">{{ act.name }}</span>
                      </span>
                      <button type="button" class="text-[#717182] hover:text-red-500" @click="sub.unselectActivity(act.id)">×</button>
                    </div>
                    <p v-if="sub.selectedActivities.length === 0" class="text-xs italic text-[#717182]">No activities selected yet.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-[#33c4f0]/15">
              <button
                v-if="!isCurrentBrandSelected"
                type="button"
                class="w-full rounded-full bg-[#1a1a28] py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                @click="handleCommitBrand"
              >
                Select {{ vendor.name }}
              </button>
              <NuxtLink
                v-else
                to="/bookings"
                class="block w-full rounded-full bg-[#1a1a28] py-2.5 text-center text-xs font-extrabold text-white no-underline transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
              >
                View My Booked Activities
              </NuxtLink>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
