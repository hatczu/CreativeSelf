<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhPulse, PhCaretRight } from '@phosphor-icons/vue';
import { auditRows, clientRows, initialContentRows, userRows, vendorRows, type AdminSection, type ContentItem } from '~/data/adminData';

const sectionLabels: Record<AdminSection, string> = {
  overview: 'Overview',
  clients: 'Clients',
  vendors: 'Vendors',
  content: 'Feed moderation',
  categories: 'Categories',
  users: 'Users',
  reports: 'Reports',
  audit: 'Audit log',
};

const route = useRoute();
const section = computed<AdminSection>(() => {
  const key = route.params.section as string | undefined;
  return key && key in sectionLabels ? (key as AdminSection) : 'overview';
});

const query = ref('');
const content = ref<ContentItem[]>(initialContentRows.map((item) => ({ ...item })));

const title = computed(() => (section.value === 'overview' ? 'Keep the whole ecosystem moving.' : sectionLabels[section.value]));

const todayStats = [
  { value: '34', label: 'New bookings' },
  { value: '19', label: 'New user sign-ups' },
  { value: '3', label: 'Provider profiles updated' },
];
const attentionQueue = ['3 vendor profiles need approval', '2 feed posts were reported by users', '1 client account needs plan confirmation'];
const trend = [42, 58, 64, 72, 89, 78];

const adminCue = computed(() =>
  section.value === 'content'
    ? 'Review posted vendor contents.'
    : section.value === 'vendors'
      ? 'Review Cocoa Collective.'
      : 'Keep an eye on the attention queue.',
);
</script>

<template>
  <div class="min-h-screen bg-[#f3f5f6] text-[#19242a]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <AdminRail :section="section" />

    <div class="mx-auto grid max-w-[1320px] gap-6 px-5 pt-6 pb-28 sm:px-8 sm:pt-8 lg:gap-8 lg:py-10 lg:pb-14 lg:pl-[104px] lg:pr-10 xl:grid-cols-[minmax(0,1fr)_280px]">
      <main class="min-w-0">
        <header class="border border-[#dfe5e7] bg-white p-6 shadow-[0_8px_24px_rgba(25,36,42,.05)]" style="border-radius: 20px 20px 64px 20px">
          <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#5f6d73]">Platform operations</p>
          <div class="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 class="text-3xl font-extrabold leading-tight">{{ title }}</h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-[#717182]">
                {{
                  section === 'overview'
                    ? 'A live view of the people, providers, and moments that make up CreativeSelf.'
                    : 'Review, organise, and take action with confidence.'
                }}
              </p>
            </div>
            <div class="rounded-brand-sm bg-[#eef1f3] px-4 py-2 text-xs font-bold text-[#536168]">Admin access</div>
          </div>
        </header>

        <!-- Overview -->
        <template v-if="section === 'overview'">
          <section class="mt-6 grid gap-4 sm:grid-cols-3">
            <AdminStat label="Active clients" value="128" detail="+12 this month" />
            <AdminStat label="Active vendors" value="84" detail="6 awaiting review" />
            <AdminStat label="Feed items this week" value="219" detail="8 need moderation" />
          </section>
          <section class="mt-7 overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.16em] text-white/45">Today across CreativeSelf</p>
            <div class="mt-5 grid gap-3 sm:grid-cols-3">
              <div v-for="stat in todayStats" :key="stat.label" class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4">
                <p class="text-2xl font-extrabold text-[#33c4f0]">{{ stat.value }}</p>
                <p class="mt-1 text-xs font-bold">{{ stat.label }}</p>
              </div>
            </div>
          </section>
          <section class="mt-7 bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Attention queue</p>
            <h2 class="mt-1 text-2xl font-extrabold">The few things worth handling now.</h2>
            <div class="mt-5 divide-y divide-[#33c4f0]/10">
              <div v-for="item in attentionQueue" :key="item" class="flex items-center justify-between gap-4 py-4">
                <p class="text-sm font-bold">{{ item }}</p>
                <PhCaretRight :size="17" class="text-[#147c9e]" />
              </div>
            </div>
          </section>
        </template>

        <AdminDirectory
          v-else-if="section === 'clients'"
          v-model:query="query"
          title="Client organisations"
          :rows="clientRows"
          :columns="['Plan', 'Team size', 'Status']"
          :values="(row) => [row.plan, `${row.people} people`, row.state]"
        />
        <AdminDirectory
          v-else-if="section === 'vendors'"
          v-model:query="query"
          title="Approved providers"
          :rows="vendorRows"
          :columns="['Type', 'Service brand', 'Status']"
          :values="(row) => [row.type, row.service, row.state]"
        />
        <AdminModeration v-else-if="section === 'content'" v-model:content="content" />
        <AdminCategories v-else-if="section === 'categories'" />
        <AdminDirectory
          v-else-if="section === 'users'"
          v-model:query="query"
          title="Platform users"
          :rows="userRows"
          :columns="['Role', 'Joined', 'Status']"
          :values="(row) => [row.role, row.joined, row.state]"
        />

        <!-- Reports -->
        <template v-else-if="section === 'reports'">
          <section class="mt-7 grid gap-4 sm:grid-cols-3">
            <AdminStat label="Monthly bookings" value="1,842" detail="+16% from July" />
            <AdminStat label="Booking value" value="£126k" detail="+11% from July" />
            <AdminStat label="Engaged users" value="4,286" detail="61% of active base" />
          </section>
          <section class="mt-7 bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Marketplace trend</p>
            <h2 class="mt-1 text-2xl font-extrabold">Bookings have a healthy upward curve.</h2>
            <div class="mt-8 flex h-44 items-end gap-4">
              <div v-for="(height, index) in trend" :key="index" class="flex flex-1 flex-col items-center gap-2">
                <div class="w-full rounded-t-[12px] bg-[#33c4f0]" :style="{ height: `${height}%` }" />
                <span class="text-[10px] font-bold text-[#717182]">W{{ index + 1 }}</span>
              </div>
            </div>
          </section>
        </template>

        <!-- Audit -->
        <section v-else class="mt-7">
          <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">System history</p>
          <h2 class="mt-1 text-2xl font-extrabold">A clear record of important actions.</h2>
          <div class="mt-5 bg-white p-2 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style="border-radius: 20px 20px 64px 20px">
            <div v-for="row in auditRows" :key="`${row.time}-${row.target}`" class="flex items-start gap-4 border-b border-[#33c4f0]/10 p-4 last:border-0">
              <span class="mt-1 grid h-8 w-8 place-items-center rounded-full bg-[#e8f9ff] text-[#147c9e]">
                <PhPulse :size="15" />
              </span>
              <div class="flex-1">
                <p class="text-sm">
                  <strong>{{ row.actor }}</strong> {{ row.action }} <strong>{{ row.target }}</strong>
                </p>
                <p class="mt-1 text-xs text-[#717182]">{{ row.time }}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="hidden lg:block">
        <div class="sticky top-8 space-y-5">
          <div class="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Platform health</p>
            <p class="mt-3 text-3xl font-extrabold">98.7%</p>
            <p class="mt-2 text-sm leading-6 text-[#717182]">All core marketplace systems are operating normally.</p>
          </div>
          <div class="border border-[#dfe5e7] bg-[#edf4f5] p-5" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#536f76]">Admin cue</p>
            <p class="mt-2 text-xl font-extrabold leading-tight">{{ adminCue }}</p>
            <p class="mt-3 text-sm leading-6 text-[#4f7180]">Small, timely actions keep the client and vendor experience feeling trustworthy.</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
