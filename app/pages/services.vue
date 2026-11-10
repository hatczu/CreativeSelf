<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhSparkle, PhArrowRight, PhMagnifyingGlass, PhTag, PhMapPin, PhClock, PhStar, PhCheckCircle } from '@phosphor-icons/vue';
import { themeCategories, mockVendors, mockActivities } from '~/data/subscriptionData';

const activeCategory = ref<string>('all');
const searchQuery = ref<string>('');

const categorySections = computed(() => {
  const categories =
    activeCategory.value === 'all'
      ? themeCategories.filter((c) => c.id !== 'all')
      : themeCategories.filter((c) => c.id === activeCategory.value);

  const query = searchQuery.value.toLowerCase();

  return categories
    .map((category) => {
      // Find vendors matching theme category
      const vendors = mockVendors.filter((v) => v.theme === category.id);
      // Collect subcategories from vendors
      const subcategories = Array.from(new Set(vendors.flatMap((v) => v.categories)));
      // Find activities matching theme category
      const activities = mockActivities.filter((a) => {
        const matchesCategory = vendors.some((v) => v.id === a.vendorId);
        const matchesSearch = query
          ? a.name.toLowerCase().includes(query) || a.category.toLowerCase().includes(query)
          : true;
        return matchesCategory && matchesSearch;
      });
      return { category, vendors, subcategories, activities };
    })
    .filter((section) => !(searchQuery.value && section.activities.length === 0));
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-28 pb-20">
    <!-- Hero Header -->
    <section class="max-w-6xl mx-auto px-6 mb-12">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
        class="text-center space-y-4"
      >
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-extrabold uppercase tracking-wider"
        >
          <PhSparkle :size="14" class="text-cyan-600" />
          Curated Service Brands &amp; Activities
        </div>

        <h1 class="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Brand Services &amp; <span class="gradient-text">Creative Categories</span>
        </h1>

        <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Explore our curated network of partner brands — from visual arts and gourmet crafts to tech labs and outdoor
          expeditions.
        </p>

        <!-- Search bar -->
        <div class="max-w-md mx-auto pt-2">
          <div class="relative flex items-center">
            <PhMagnifyingGlass :size="20" class="absolute left-4 text-slate-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search categories (e.g. Painting, Coffee, Robotics)..."
              class="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 shadow-sm text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>
      </Motion>
    </section>

    <!-- Category Filter Tabs -->
    <section class="max-w-6xl mx-auto px-6 mb-12">
      <div class="flex items-center justify-center gap-2 flex-wrap">
        <button
          v-for="cat in themeCategories"
          :key="cat.id"
          :class="[
            'flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200',
            activeCategory === cat.id
              ? 'bg-slate-900 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200',
          ]"
          @click="activeCategory = cat.id"
        >
          <span>{{ cat.symbol }}</span>
          <span>{{ cat.name }}</span>
        </button>
      </div>
    </section>

    <!-- Brands & Categories Detailed Grid -->
    <section class="max-w-6xl mx-auto px-6 space-y-16">
      <AnimatePresence>
        <Motion
          v-for="{ category, vendors, subcategories, activities } in categorySections"
          :key="category.id"
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -20 }"
          :transition="{ duration: 0.4 }"
          class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8"
        >
          <!-- Category Header Banner -->
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md"
                :style="{ background: `${category.color}15`, border: `2px solid ${category.color}30` }"
              >
                {{ category.symbol }}
              </div>
              <div>
                <span
                  class="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                  :style="{ background: category.color }"
                >
                  Brand Theme
                </span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{{ category.name }}</h2>
                <p class="text-sm text-slate-600 font-medium mt-0.5">{{ category.description }}</p>
              </div>
            </div>

            <!-- Subcategory Pills -->
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-1">Subcategories:</span>
              <span
                v-for="subcat in subcategories"
                :key="subcat"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200"
              >
                <PhTag :size="12" class="text-cyan-600" />
                {{ subcat }}
              </span>
            </div>
          </div>

          <!-- Vendors Row under this Brand Category -->
          <div>
            <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
              Verified Partner Studios &amp; Vendors
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="vendor in vendors"
                :key="vendor.id"
                class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4 hover:border-cyan-400 transition"
              >
                <img :src="vendor.image" :alt="vendor.name" class="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200" />
                <div class="flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <h4 class="font-bold text-slate-900 text-sm">{{ vendor.name }}</h4>
                    <span
                      class="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200"
                    >
                      <PhStar :size="12" weight="fill" />
                      {{ vendor.rating }} ({{ vendor.reviewsCount }})
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 line-clamp-1">{{ vendor.specialty }}</p>
                  <div class="flex items-center gap-2 text-xs text-slate-400 pt-1">
                    <PhMapPin :size="13" />
                    <span>{{ vendor.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Subcategory Activities Grid -->
          <div>
            <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
              Featured Activities &amp; Workshops ({{ activities.length }})
            </h3>

            <div v-if="activities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="activity in activities"
                :key="activity.id"
                class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition duration-200 group"
              >
                <div class="relative h-44 overflow-hidden">
                  <img
                    :src="activity.image"
                    :alt="activity.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div
                    class="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>{{ activity.symbol }}</span>
                    <span>{{ activity.category }}</span>
                  </div>
                  <div
                    class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-extrabold flex items-center gap-1"
                  >
                    <PhStar :size="12" class="text-amber-500" weight="fill" />
                    {{ activity.rating }}
                  </div>
                </div>

                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p class="text-xs font-bold text-cyan-600 mb-1">{{ activity.vendorName }}</p>
                    <h4 class="font-extrabold text-slate-900 text-base leading-snug group-hover:text-cyan-600 transition">
                      {{ activity.name }}
                    </h4>
                    <p class="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">{{ activity.description }}</p>
                  </div>

                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div class="flex items-center gap-1 text-slate-500 font-medium">
                      <PhClock :size="14" />
                      {{ activity.duration }}
                    </div>

                    <NuxtLink
                      :to="`/discover/services/${activity.id}`"
                      class="inline-flex items-center gap-1 font-extrabold text-cyan-600 hover:text-cyan-700"
                    >
                      View Activity
                      <PhArrowRight :size="14" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="p-6 rounded-2xl bg-slate-50 text-center text-slate-500 text-sm font-medium">
              No activities match your search query for this theme.
            </div>
          </div>
        </Motion>
      </AnimatePresence>
    </section>

    <!-- AI Recommendation Banner -->
    <section class="max-w-6xl mx-auto px-6 mt-16">
      <div
        class="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-cyan-950 text-white shadow-2xl border border-purple-800/40 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase">
            <PhCheckCircle :size="14" />
            Acumen AI Matching Enabled
          </div>
          <h3 class="text-2xl font-extrabold">Not sure which brand service fits your personality?</h3>
          <p class="text-sm text-cyan-100/80 max-w-xl">
            Take our 2-minute Creative Personality Test and let Acumen AI match you directly with your ideal service brand
            and activities.
          </p>
        </div>

        <NuxtLink
          to="/test"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-extrabold text-sm shadow-lg shrink-0 transition"
        >
          Take Personality Test
          <PhArrowRight :size="18" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
