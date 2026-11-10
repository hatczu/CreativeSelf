<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhCheck, PhMagnifyingGlass, PhSparkle, PhStar, PhEye } from '@phosphor-icons/vue';
import { mockVendors, mockActivities, themeCategories, type Vendor } from '~/data/subscriptionData';

// Services and providers share the same brand-discovery view.
definePageMeta({ alias: ['/discover/providers'] });

const sub = useSubscription();

const selectedTheme = ref<string>('all');
const searchQuery = ref('');
const showAiOnly = ref(false);

// Acumen AI score matching
const aiMatchScore = (vendorId: string) => (vendorId === 'studio-lumen' ? 98 : vendorId === 'cocoa-collective' ? 95 : 92);

const filteredVendors = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return mockVendors.filter((v) => {
    const matchesTheme = selectedTheme.value === 'all' || v.theme === selectedTheme.value;
    const matchesSearch =
      query === '' ||
      v.name.toLowerCase().includes(query) ||
      v.specialty.toLowerCase().includes(query) ||
      v.theme.toLowerCase().includes(query);
    const matchesAiFilter = !showAiOnly.value || aiMatchScore(v.id) >= 95;
    return matchesTheme && matchesSearch && matchesAiFilter;
  });
});

const activeThemeObj = computed(() => themeCategories.find((t) => t.id === selectedTheme.value));
const vendorActivities = (vendorId: string) => mockActivities.filter((a) => a.vendorId === vendorId);

const handleSelect = (vendor: Vendor) => {
  sub.selectBrand({
    id: vendor.id,
    name: vendor.name,
    rating: vendor.rating,
    specialty: vendor.specialty,
    color: vendor.color,
    avatar: vendor.avatar,
  });
  navigateTo(`/discover/providers/${vendor.id}`);
};
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <UniversalSidebar />
    <ActivityLimitModal />

    <div
      class="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]"
    >
      <!-- Navigation Sidebar -->
      <aside class="hidden lg:block">
        <SubscriptionEntitlementHeader variant="sidebar" :show-logo="true" />
      </aside>

      <!-- Main Content Area -->
      <main>
        <!-- Mobile view subscription entitlement header -->
        <div class="lg:hidden mb-6">
          <SubscriptionEntitlementHeader variant="horizontal" />
        </div>

        <header class="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div
                class="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200/60 px-3 py-1 text-xs font-extrabold text-purple-700 mb-2"
              >
                <PhSparkle :size="13" class="text-purple-600 animate-pulse" />
                Acumen AI Recommendation Engine Active
              </div>
              <h1 class="mt-1 text-3xl font-extrabold leading-tight">Choose a Service Brand for your {{ sub.planName }} plan</h1>
              <p class="mt-2.5 max-w-2xl text-sm leading-6 text-[#717182]">
                Acumen AI has analyzed your creative personality and team goals to recommend top-rated service brands and
                photo activities.
              </p>
            </div>

            <div class="rounded-full bg-[#e8f9ff] px-4 py-2 text-xs font-bold text-[#147c9e]">1 Brand Entitlement</div>
          </div>

          <!-- Search Input & Acumen AI Filter Toggle -->
          <div class="mt-5 flex flex-wrap items-center gap-3">
            <div
              class="flex flex-1 items-center gap-3 rounded-[16px_16px_40px_16px] border border-[#33c4f0]/20 bg-[#f8fdff] px-4 py-3 text-sm text-[#717182]"
            >
              <PhMagnifyingGlass :size="17" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search service brands, experience themes, or ask Acumen AI..."
                class="w-full bg-transparent text-sm text-[#1a1a28] outline-none placeholder:text-[#717182]"
              />
              <button v-if="searchQuery" type="button" class="text-xs text-[#717182] hover:text-[#1a1a28]" @click="searchQuery = ''">
                Clear
              </button>
            </div>

            <button
              type="button"
              :class="[
                'flex items-center gap-2 rounded-full px-4 py-3 text-xs font-extrabold transition shadow-sm',
                showAiOnly ? 'bg-purple-600 text-white' : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50',
              ]"
              @click="showAiOnly = !showAiOnly"
            >
              <PhSparkle :size="14" />
              {{ showAiOnly ? 'Showing Top AI Matches (95%+)' : 'Filter 95%+ Acumen AI Matches' }}
            </button>
          </div>

          <!-- Theme Category Filter Pills -->
          <div class="mt-4 border-t border-gray-100 pt-4">
            <p class="text-xs font-extrabold uppercase tracking-[.14em] text-[#717182]">Experience Themes</p>
            <div class="mt-2.5 flex flex-wrap gap-2">
              <button
                v-for="theme in themeCategories"
                :key="theme.id"
                type="button"
                :class="[
                  'flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold transition',
                  selectedTheme === theme.id
                    ? 'bg-[#33c4f0] text-[#1a1a28] shadow-sm'
                    : 'bg-white border border-gray-200 text-[#717182] hover:bg-gray-50',
                ]"
                @click="selectedTheme = theme.id"
              >
                <span>{{ theme.symbol }}</span>
                <span>{{ theme.name }}</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Category Subheader -->
        <div class="mt-6 flex items-center justify-between">
          <div>
            <h2 class="text-lg font-extrabold text-[#1a1a28]">{{ activeThemeObj ? activeThemeObj.name : 'All Brands' }}</h2>
            <p class="text-xs text-[#717182]">
              {{ activeThemeObj?.description || 'Select a service brand to access its included activities.' }}
            </p>
          </div>
          <span class="text-xs font-bold text-[#717182]">{{ filteredVendors.length }} brands</span>
        </div>

        <!-- Service Brands Grid -->
        <section class="mt-4 grid gap-6 sm:grid-cols-1">
          <article
            v-for="vendor in filteredVendors"
            :key="vendor.id"
            class="overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)] transition hover:shadow-[0_18px_48px_rgba(28,118,155,.12)]"
            style="border-radius: 20px 20px 64px 20px"
          >
            <!-- Brand Cover Photo Banner -->
            <div class="relative h-44 w-full overflow-hidden bg-gray-100">
              <ImageWithFallback
                :src="vendor.image"
                :alt="vendor.name"
                class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a28]/80 via-[#1a1a28]/30 to-transparent"></div>

              <!-- Acumen AI Match Badge Top Right -->
              <div class="absolute top-4 right-4 flex items-center gap-2">
                <span
                  class="inline-flex items-center gap-1 rounded-full bg-purple-900/80 px-3 py-1 text-xs font-extrabold text-purple-200 border border-purple-400/40 backdrop-blur shadow-md"
                >
                  <PhSparkle :size="12" weight="fill" class="text-purple-300" />
                  {{ aiMatchScore(vendor.id) }}% Acumen Match
                </span>
              </div>

              <div class="absolute left-6 bottom-4 right-6 flex items-end justify-between">
                <div class="flex items-center gap-3">
                  <div class="grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl shadow-md">{{ vendor.avatar }}</div>
                  <div>
                    <span class="inline-block rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-extrabold uppercase text-white backdrop-blur">
                      {{ vendor.theme }}
                    </span>
                    <h3 class="text-xl font-extrabold text-white">{{ vendor.name }}</h3>
                  </div>
                </div>

                <span
                  v-if="sub.selectedBrand?.id === vendor.id"
                  class="rounded-full bg-[#10b981] px-3.5 py-1 text-xs font-extrabold text-white shadow-sm"
                >
                  ✓ Selected Brand
                </span>
                <span v-else-if="sub.selectedBrand !== null" class="rounded-full bg-amber-500/90 px-3.5 py-1 text-xs font-bold text-white backdrop-blur">
                  Other Brand Selected
                </span>
                <span v-else class="rounded-full bg-[#33c4f0] px-3.5 py-1 text-xs font-extrabold text-[#1a1a28] shadow-sm">
                  Available in Plan
                </span>
              </div>
            </div>

            <!-- Brand Body Info & Actions -->
            <div class="p-6">
              <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div class="flex items-center gap-2 text-xs font-bold text-[#717182]">
                    <div class="flex items-center gap-1 text-amber-500 font-extrabold">
                      <PhStar :size="14" weight="fill" class="text-amber-400" />
                      <span>{{ vendor.rating }}</span>
                    </div>
                    <span>•</span>
                    <span>{{ vendor.location }}</span>
                  </div>
                  <p class="mt-1.5 text-sm leading-6 text-[#414153]">{{ vendor.specialty }}</p>

                  <!-- Acumen AI Match Reason Tag -->
                  <div
                    class="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700 border border-purple-100"
                  >
                    <PhSparkle :size="12" class="text-purple-600" />
                    Acumen Insight: Matches Explorer &amp; Original personality profiles
                  </div>
                </div>

                <div class="flex flex-row items-center gap-2.5">
                  <div
                    v-if="sub.selectedBrand?.id === vendor.id"
                    class="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#10b981] px-4 py-2 text-xs font-extrabold text-white"
                  >
                    <PhCheck :size="15" /> Selected
                  </div>
                  <button
                    v-else
                    type="button"
                    class="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1a1a28] px-5 py-2 text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                    @click="handleSelect(vendor)"
                  >
                    Select
                  </button>

                  <NuxtLink
                    :to="`/discover/providers/${vendor.id}`"
                    class="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#33c4f0]/30 bg-[#f8fdff] px-5 py-2 text-xs font-extrabold text-[#147c9e] no-underline transition hover:bg-[#e8f9ff]"
                  >
                    <PhEye :size="15" /> Preview
                  </NuxtLink>
                </div>
              </div>

              <!-- Services Preview Grid with Photos -->
              <div class="mt-5 border-t border-[#33c4f0]/15 pt-4">
                <p class="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#717182]">
                  Included Services Photo Preview ({{ vendorActivities(vendor.id).length }} available):
                </p>

                <div class="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  <NuxtLink
                    v-for="act in vendorActivities(vendor.id)"
                    :key="act.id"
                    :to="`/discover/services/${act.id}`"
                    class="group flex overflow-hidden rounded-xl border border-[#33c4f0]/20 bg-[#f8fdff] no-underline transition hover:border-[#33c4f0] hover:shadow-md"
                  >
                    <div class="h-16 w-16 shrink-0 overflow-hidden bg-gray-200">
                      <ImageWithFallback
                        :src="act.image"
                        :alt="act.name"
                        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div class="flex flex-1 flex-col justify-center p-2.5">
                      <span class="font-extrabold text-[#1a1a28] group-hover:text-[#147c9e] truncate max-w-[130px]">{{ act.name }}</span>
                      <span class="mt-0.5 text-[10px] font-bold text-[#717182]">{{ act.duration }}</span>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>

      <!-- Right Sidebar Filters & Acumen AI Curator -->
      <aside class="hidden lg:block">
        <div class="sticky top-8 space-y-6">
          <!-- Card 1: Acumen AI Curator Widget -->
          <div class="overflow-hidden bg-[#15343d] p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]" style="border-radius: 20px 20px 64px 20px">
            <div class="flex items-center gap-2 text-[#33c4f0] mb-2">
              <PhSparkle :size="16" weight="fill" />
              <span class="text-[10px] font-extrabold uppercase tracking-[.18em] text-white/50">ACUMEN AI CURATOR</span>
            </div>
            <h3 class="text-lg font-extrabold text-white">Smart Match of the Month</h3>
            <p class="mt-2 text-xs leading-5 text-white/70 font-medium">
              Acumen AI recommends <strong class="text-[#33c4f0]">Studio Lumen</strong> (98% match) based on your team
              restoration goals.
            </p>

            <div class="mt-4 rounded-xl bg-white/10 p-3 border border-white/10">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-white/60">Match Confidence</span>
                <span class="text-[#33c4f0]">98% High</span>
              </div>
              <div class="mt-1.5 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                <div class="h-full rounded-full bg-[#33c4f0] w-[98%]" />
              </div>
            </div>
          </div>

          <!-- Card 2: Experience Themes List -->
          <div class="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
            <span class="text-sm font-extrabold text-[#1a1a28]">Experience Themes</span>
            <div class="mt-3 space-y-2">
              <button
                v-for="theme in themeCategories"
                :key="theme.id"
                type="button"
                :class="[
                  'flex w-full items-center justify-between rounded-full px-3 py-2 text-left text-xs font-bold transition',
                  selectedTheme === theme.id ? 'bg-[#33c4f0] text-[#1a1a28]' : 'text-[#717182] hover:bg-[#e8f9ff]',
                ]"
                @click="selectedTheme = theme.id"
              >
                <span class="flex items-center gap-2">
                  <span>{{ theme.symbol }}</span>
                  <span>{{ theme.name }}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
