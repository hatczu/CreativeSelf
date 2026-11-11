<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  PhCheck,
  PhCaretLeft,
  PhClock,
  PhHeart,
  PhMapPin,
  PhShareNetwork,
  PhStar,
  PhUsers,
  PhCalendarBlank,
} from '@phosphor-icons/vue';
import { mockActivities, mockVendors } from '~/data/subscriptionData';
import type { ActivityItem } from '~/types/subscription';

const route = useRoute();
const sub = useSubscription();

const activity = computed(() => mockActivities.find((a) => a.id === route.params.serviceId) || mockActivities[0]!);
const vendor = computed(() => mockVendors.find((v) => v.id === activity.value.vendorId) || mockVendors[0]!);

const selected = computed(() => sub.isActivitySelected(activity.value.id));
const isLimitReached = computed(() => sub.selectedActivities.length >= sub.maxActivities);

const selectedSlot = ref<string | null>(null);
watch(activity, (a) => (selectedSlot.value = a.schedule[0]?.id || null), { immediate: true });
const isSlotModalOpen = ref(false);

const assignedInvites = computed(() => sub.getInvitesForActivity(activity.value.id));

const handleSelectToggle = () => {
  const a = activity.value;
  if (selected.value) {
    sub.unselectActivity(a.id);
    return;
  }

  const activityItem: ActivityItem = {
    id: a.id,
    name: a.name,
    vendorId: a.vendorId,
    vendorName: a.vendorName,
    category: a.category,
    duration: a.duration,
    location: a.location,
    description: a.description,
    color: a.color,
    symbol: a.symbol,
    image: a.image,
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
    <EmployeeSlotManagerModal
      :is-open="isSlotModalOpen"
      :activity-id="activity.id"
      :activity-name="activity.name"
      @close="isSlotModalOpen = false"
    />

    <UniversalSidebar />

    <!-- Main Grid Layout -->
    <div class="mx-auto grid max-w-[1320px] gap-6 px-5 pt-6 pb-28 sm:px-8 sm:pt-8 lg:gap-8 lg:py-10 lg:pb-14 lg:pl-[104px] lg:pr-10 lg:grid-cols-[minmax(0,1fr)_300px]">
      <main class="min-w-0">
        <!-- Back Navigation -->
        <div class="mb-4 flex items-center justify-between">
          <NuxtLink :to="`/discover/providers/${vendor.id}`" class="inline-flex items-center gap-1 text-xs font-bold text-[#147c9e] hover:underline">
            <PhCaretLeft :size="16" /> Back to {{ vendor.name }}
          </NuxtLink>
        </div>

        <!-- Top Entitlement Header -->
        <SubscriptionEntitlementHeader />

        <!-- Hero Banner Section with Photo -->
        <div class="mt-6 overflow-hidden bg-white shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
          <!-- Visual Hero Header Photo -->
          <div class="relative h-64 w-full overflow-hidden bg-gray-100 sm:h-80">
            <ImageWithFallback :src="activity.image" :alt="activity.name" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a28] via-[#1a1a28]/40 to-transparent"></div>

            <div class="absolute left-6 bottom-6 right-6 z-10 flex flex-wrap items-end justify-between gap-4 text-white">
              <div>
                <span class="inline-block rounded-brand-sm bg-white/20 px-3.5 py-1 text-xs font-extrabold text-white backdrop-blur">
                  Included in your {{ sub.planName }} subscription
                </span>
                <h1 class="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">{{ activity.name }}</h1>
                <p class="mt-1 text-sm font-bold text-white/90">By {{ activity.vendorName }}</p>
              </div>

              <div class="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-3xl backdrop-blur">{{ activity.symbol }}</div>
            </div>
          </div>

          <!-- Quick Meta Info -->
          <div class="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-[#33c4f0]/15">
            <div class="flex flex-wrap items-center gap-5 text-xs font-bold text-[#717182]">
              <span class="flex items-center gap-1.5 text-[#1a1a28]">
                <PhClock :size="16" class="text-[#33c4f0]" /> {{ activity.duration }}
              </span>
              <span class="flex items-center gap-1.5 text-[#1a1a28]">
                <PhMapPin :size="16" class="text-[#33c4f0]" /> {{ activity.location }}
              </span>
              <span class="flex items-center gap-1 text-amber-500 font-extrabold">
                <PhStar :size="16" weight="fill" class="text-amber-400" />
                {{ activity.rating }} <span class="text-[#717182]">({{ activity.reviewsCount }} reviews)</span>
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button type="button" title="Share" class="grid h-9 w-9 place-items-center rounded-brand-sm bg-[#e8f9ff] text-[#147c9e]">
                <PhShareNetwork :size="16" />
              </button>
              <button type="button" title="Save" class="grid h-9 w-9 place-items-center rounded-brand-sm bg-[#e8f9ff] text-[#147c9e]">
                <PhHeart :size="16" />
              </button>
            </div>
          </div>

          <!-- Service Details Content -->
          <div class="p-6 space-y-8">
            <!-- Description -->
            <section>
              <h2 class="text-lg font-extrabold text-[#1a1a28]">About this Activity</h2>
              <p class="mt-3 text-sm leading-7 text-[#414153]">{{ activity.description }}</p>

              <!-- Corporate Slot Management Banner if Corporate -->
              <div
                v-if="sub.planType === 'corporate'"
                class="mt-5 rounded-2xl bg-gradient-to-r from-purple-50 via-cyan-50 to-blue-50 border border-purple-200 p-5 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <span class="text-[10px] uppercase font-black tracking-widest text-purple-700">Corporate Subscription Entitlement</span>
                  <h4 class="text-base font-extrabold text-gray-900 mt-0.5">{{ sub.employeeSlotsPerActivity }} Employee Slots Available</h4>
                  <p class="text-xs text-gray-600 mt-1">
                    Currently {{ assignedInvites.length }} of {{ sub.employeeSlotsPerActivity }} employee slots allocated with invite
                    codes.
                  </p>
                </div>

                <button
                  class="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-brand text-xs flex items-center gap-1.5 shadow"
                  @click="isSlotModalOpen = true"
                >
                  <PhUsers :size="15" />
                  Manage Employee Slots &amp; Invites
                </button>
              </div>

              <!-- Highlights -->
              <div class="mt-5 rounded-2xl bg-[#f8fdff] border border-[#33c4f0]/20 p-5">
                <h3 class="text-xs font-extrabold uppercase tracking-[.14em] text-[#33c4f0]">Activity Highlights</h3>
                <ul class="mt-3 space-y-2 text-xs font-bold text-[#1a1a28]">
                  <li v-for="(h, idx) in activity.highlights" :key="idx" class="flex items-center gap-2">
                    <PhCheck :size="14" class="text-[#10b981] shrink-0" />
                    <span>{{ h }}</span>
                  </li>
                </ul>
              </div>
            </section>

            <!-- What's Included -->
            <section class="border-t border-[#33c4f0]/15 pt-6">
              <h2 class="text-lg font-extrabold text-[#1a1a28]">What's Included</h2>
              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <div
                  v-for="(item, idx) in activity.included"
                  :key="idx"
                  class="flex items-center gap-3 rounded-xl border border-[#33c4f0]/15 bg-white p-3.5 text-xs font-bold text-[#1a1a28]"
                >
                  <div class="grid h-7 w-7 place-items-center rounded-full bg-[#10b981]/15 text-[#10b981]">
                    <PhCheck :size="14" />
                  </div>
                  <span>{{ item }}</span>
                </div>
              </div>
            </section>

            <!-- Agenda / What to Expect -->
            <section class="border-t border-[#33c4f0]/15 pt-6">
              <h2 class="text-lg font-extrabold text-[#1a1a28]">What to Expect</h2>
              <div class="mt-4 space-y-4">
                <div v-for="(agenda, idx) in activity.whatToExpect" :key="idx" class="flex gap-4 rounded-xl bg-[#f8fdff] p-4 border border-[#33c4f0]/15">
                  <span class="shrink-0 rounded-md bg-[#33c4f0]/20 px-2.5 py-1 text-xs font-extrabold text-[#147c9e]">{{ agenda.time }}</span>
                  <div>
                    <h4 class="text-sm font-extrabold text-[#1a1a28]">{{ agenda.title }}</h4>
                    <p class="mt-1 text-xs text-[#717182]">{{ agenda.detail }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Schedule & Availability -->
            <section class="border-t border-[#33c4f0]/15 pt-6">
              <h2 class="text-lg font-extrabold text-[#1a1a28]">Upcoming Schedule &amp; Availability</h2>
              <p class="mt-1 text-xs text-[#717182]">Select a slot for your subscription booking:</p>

              <div class="mt-4 space-y-3">
                <div
                  v-for="slot in activity.schedule"
                  :key="slot.id"
                  :class="[
                    'flex cursor-pointer flex-wrap items-center justify-between gap-4 rounded-2xl p-4 transition',
                    selectedSlot === slot.id ? 'border-2 border-[#33c4f0] bg-[#e8f9ff]' : 'border border-[#33c4f0]/20 bg-white hover:bg-[#f8fdff]',
                  ]"
                  @click="selectedSlot = slot.id"
                >
                  <div class="flex items-center gap-3">
                    <PhCalendarBlank :size="18" class="text-[#33c4f0]" />
                    <div>
                      <p class="text-sm font-extrabold text-[#1a1a28]">{{ slot.date }}</p>
                      <p class="text-xs text-[#717182]">{{ slot.time }}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <span class="rounded-brand-sm bg-[#10b981]/15 px-3 py-1 text-xs font-extrabold text-[#087e58]">Included in plan</span>
                    <span class="text-xs font-bold text-[#717182]">{{ slot.seatsLeft }} spots left</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <!-- Right Sticky Sidebar -->
      <aside class="min-w-0">
        <div class="sticky top-8 space-y-6">
          <div class="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
            <div class="border-b border-[#33c4f0]/15 pb-4">
              <div class="flex items-center justify-between">
                <p class="text-xs font-extrabold uppercase tracking-[.14em] text-[#33c4f0]">Your Subscription</p>
                <span class="text-[10px] font-black uppercase bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-brand-sm">{{ sub.planType }}</span>
              </div>
              <h3 class="mt-1 text-xl font-extrabold text-[#1a1a28]">{{ sub.planName }}</h3>
              <span class="mt-2 inline-block rounded-brand-sm bg-[#10b981]/15 px-3 py-1 text-xs font-extrabold text-[#087e58]">Included in your plan</span>
            </div>

            <div class="mt-5 space-y-4">
              <div class="rounded-xl bg-[#f8fdff] border border-[#33c4f0]/20 p-3.5">
                <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Service Brand</p>
                <p class="mt-1 text-sm font-extrabold text-[#1a1a28]">✓ {{ vendor.name }}</p>
              </div>

              <div class="rounded-xl bg-[#f8fdff] border border-[#33c4f0]/20 p-3.5">
                <div class="flex items-center justify-between text-xs font-extrabold text-[#1a1a28]">
                  <span>Monthly Allowance:</span>
                  <span class="text-[#10b981]">{{ sub.selectedActivities.length }} / {{ sub.maxActivities }} used</span>
                </div>
              </div>

              <div v-if="sub.planType === 'corporate'" class="rounded-xl bg-purple-50 border border-purple-200 p-3.5 text-xs">
                <p class="font-extrabold text-purple-900">Employee Slots per Activity</p>
                <p class="text-purple-700 mt-0.5 font-bold">{{ sub.employeeSlotsPerActivity }} slots</p>
                <button
                  class="mt-2.5 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1 shadow-sm"
                  @click="isSlotModalOpen = true"
                >
                  <PhUsers :size="13" />
                  Manage Employee Invites
                </button>
              </div>
            </div>

            <!-- Primary Action Button Area -->
            <div class="mt-6 space-y-3">
              <div v-if="selected" class="space-y-3">
                <div class="rounded-2xl bg-[#10b981]/15 p-4 text-center border border-[#10b981]/30">
                  <p class="flex items-center justify-center gap-1.5 text-xs font-extrabold text-[#087e58]">
                    <PhCheck :size="16" /> Activity Selected
                  </p>
                  <p class="mt-1 text-[11px] text-[#087e58]">Included in your {{ sub.planName }} subscription.</p>
                </div>

                <button
                  type="button"
                  class="w-full rounded-brand-sm bg-[#1a1a28] py-3 text-center text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                  @click="navigateTo('/bookings')"
                >
                  View My Activities
                </button>
                <button
                  type="button"
                  class="w-full rounded-brand-sm border border-gray-200 py-2.5 text-center text-xs font-bold text-[#717182] hover:bg-gray-50"
                  @click="handleSelectToggle"
                >
                  Unselect Activity
                </button>
              </div>
              <div v-else-if="isLimitReached" class="space-y-3">
                <button
                  type="button"
                  class="w-full rounded-brand-sm bg-amber-500 py-3 text-center text-xs font-extrabold text-white transition hover:bg-amber-600"
                  @click="sub.openLimitModal()"
                >
                  Monthly Activity Limit Reached
                </button>
                <button
                  type="button"
                  class="w-full rounded-brand-sm border border-[#33c4f0]/30 py-2.5 text-center text-xs font-extrabold text-[#1a1a28] hover:bg-[#f8fdff]"
                  @click="navigateTo('/bookings')"
                >
                  View My Activities
                </button>
              </div>
              <button
                v-else
                type="button"
                class="w-full rounded-brand-sm bg-[#1a1a28] py-3 text-center text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                @click="handleSelectToggle"
              >
                Select Activity
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
