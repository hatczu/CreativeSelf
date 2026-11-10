<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhClock, PhMapPin, PhUsers, PhX, PhDownloadSimple, PhEye } from '@phosphor-icons/vue';
import { vendorCorporateBookings, vendorPastBookings, type VendorCorporateBooking } from '~/data/vendorData';

const sub = useSubscription();

const requestStatus = ref<Record<string, string>>({});
const tab = ref<'upcoming' | 'past'>('upcoming');
const activeRosterBooking = ref<VendorCorporateBooking | null>(null);

const activeList = computed(() => (tab.value === 'upcoming' ? vendorCorporateBookings : vendorPastBookings));

const statusOf = (booking: VendorCorporateBooking) => requestStatus.value[booking.client] ?? booking.status;
const percentUsed = (booking: VendorCorporateBooking) => Math.min(100, Math.round((booking.slotsClaimed / booking.slotsAllocated) * 100));
const countWithStatus = (booking: VendorCorporateBooking, status: string) => booking.invites.filter((i) => i.status === status).length;

const confirmBooking = (booking: VendorCorporateBooking) => {
  requestStatus.value = { ...requestStatus.value, [booking.client]: 'Confirmed' };
  sub.confirmActivityByVendor('mindful-watercolor-painting');
  sub.confirmActivityByVendor('ceramic-pottery-workshop');
};

const statusClass = (status: string) =>
  status === 'Confirmed'
    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
    : status === 'Completed'
      ? 'bg-gray-100 text-gray-700 border border-gray-200'
      : 'bg-amber-50 text-amber-800 border border-amber-200';
const statusLabel = (status: string) => (status === 'Confirmed' ? '✓ Confirmed' : status === 'Completed' ? 'Completed' : '⏳ Needs Response');

const downloadRosterCsv = (booking: VendorCorporateBooking) => {
  const csv = booking.invites.map((i) => `${i.name},${i.email},${i.department},${i.code},${i.status}`).join('\n');
  const blob = new Blob([`Name,Email,Department,Code,Status\n${csv}`], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${booking.client}_Attendee_Roster.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const tabClass = (value: 'upcoming' | 'past') => [
  'rounded-full px-5 py-2 text-xs font-extrabold transition-all',
  tab.value === value ? 'bg-[#1a1a28] text-white shadow-sm' : 'text-[#717182] hover:text-[#1a1a28]',
];
</script>

<template>
  <VendorWorkspaceShell page="bookings">
    <section class="mt-7 space-y-6">
      <!-- Tab Controls & Schedule Header -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Delivery Schedule</p>
          <h2 class="mt-1 text-2xl font-extrabold text-[#1a1a28]">
            {{ tab === 'upcoming' ? 'Upcoming Sessions & Employee Invites' : 'Completed Corporate Sessions' }}
          </h2>
        </div>

        <!-- Tab Toggle Pills -->
        <div class="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-full border border-gray-200">
          <button type="button" :class="tabClass('upcoming')" @click="tab = 'upcoming'">Upcoming ({{ vendorCorporateBookings.length }})</button>
          <button type="button" :class="tabClass('past')" @click="tab = 'past'">Past Sessions ({{ vendorPastBookings.length }})</button>
        </div>
      </div>

      <!-- Booking Cards List -->
      <div class="space-y-4">
        <article
          v-for="booking in activeList"
          :key="booking.id"
          class="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all space-y-4"
        >
          <!-- Main Info Row -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div
                class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl shadow-sm border border-gray-100"
                :style="{ background: `${booking.color}12` }"
              >
                {{ booking.emoji }}
              </div>

              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-extrabold text-[#1a1a28] text-lg leading-snug">{{ booking.service }}</h3>
                  <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-extrabold text-gray-700">{{ booking.client }}</span>
                </div>

                <div class="flex items-center gap-3 text-xs font-medium text-gray-500 mt-1 flex-wrap">
                  <span class="flex items-center gap-1 font-semibold text-gray-700"> <PhClock :size="13" class="text-[#33c4f0]" /> {{ booking.time }} </span>
                  <span>•</span>
                  <span class="flex items-center gap-1"> <PhMapPin :size="13" class="text-[#33c4f0]" /> {{ booking.location }} </span>
                </div>
              </div>
            </div>

            <!-- Status & Confirm Action -->
            <div class="flex items-center gap-3 shrink-0 sm:self-center">
              <span :class="['rounded-full px-3 py-1 text-xs font-extrabold flex items-center gap-1', statusClass(statusOf(booking))]">
                {{ statusLabel(statusOf(booking)) }}
              </span>

              <button
                v-if="statusOf(booking) === 'Needs response'"
                type="button"
                class="rounded-full bg-[#1a1a28] hover:bg-[#33c4f0] hover:text-[#1a1a28] px-4 py-1.5 text-xs font-extrabold text-white transition shadow-sm"
                @click="confirmBooking(booking)"
              >
                Confirm Booking
              </button>
            </div>
          </div>

          <!-- Capacity & Roster Section -->
          <div class="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3 flex-1 min-w-[240px]">
              <div class="flex items-center gap-1.5 font-bold text-gray-800 shrink-0">
                <PhUsers :size="14" class="text-[#147c9e]" />
                <span>{{ booking.slotsClaimed }}/{{ booking.slotsAllocated }} Slots</span>
                <span class="text-emerald-600 font-extrabold">({{ countWithStatus(booking, 'Going') }} Going)</span>
              </div>

              <div class="w-32 sm:w-48 h-2 bg-gray-100 rounded-full overflow-hidden shrink-0">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-[#33c4f0] to-[#10b981] transition-all"
                  :style="{ width: `${percentUsed(booking)}%` }"
                />
              </div>
            </div>

            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-full bg-cyan-50/80 hover:bg-cyan-100/80 px-3.5 py-1.5 text-xs font-extrabold text-[#147c9e] border border-cyan-200/60 transition shadow-sm shrink-0"
              @click="activeRosterBooking = booking"
            >
              <PhEye :size="13" />
              Roster ({{ booking.invites.length }})
            </button>
          </div>
        </article>
      </div>

      <!-- Vendor Employee Roster & Invites Modal -->
      <div
        v-if="activeRosterBooking"
        class="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/50 p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div class="relative w-full max-w-2xl bg-white p-6 sm:p-8 shadow-2xl space-y-6" style="border-radius: 20px 20px 64px 20px">
          <button
            type="button"
            class="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Close"
            @click="activeRosterBooking = null"
          >
            <PhX :size="18" />
          </button>

          <div>
            <div class="inline-flex items-center gap-1.5 rounded-full bg-[#e8f9ff] px-3 py-1 text-xs font-bold text-[#147c9e]">
              <PhUsers :size="13" /> Corporate Attendee Roster
            </div>
            <h2 class="mt-2 text-2xl font-extrabold text-[#1a1a28]">{{ activeRosterBooking.client }} Roster</h2>
            <p class="mt-1 text-xs font-medium text-[#717182]">{{ activeRosterBooking.service }} • {{ activeRosterBooking.time }}</p>
          </div>

          <!-- Metrics Header -->
          <div class="grid grid-cols-3 gap-3">
            <div class="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p class="text-xl font-extrabold text-[#1a1a28]">{{ activeRosterBooking.slotsAllocated }}</p>
              <p class="text-[10px] font-bold text-gray-500 uppercase">Allocated Slots</p>
            </div>
            <div class="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <p class="text-xl font-extrabold text-emerald-700">{{ countWithStatus(activeRosterBooking, 'Going') }}</p>
              <p class="text-[10px] font-bold text-emerald-700 uppercase">Confirmed Going</p>
            </div>
            <div class="p-3 bg-amber-50 rounded-2xl border border-amber-100 text-center">
              <p class="text-xl font-extrabold text-amber-700">{{ countWithStatus(activeRosterBooking, 'Pending') }}</p>
              <p class="text-[10px] font-bold text-amber-700 uppercase">Pending RSVP</p>
            </div>
          </div>

          <!-- Attendees Table -->
          <div class="overflow-x-auto border border-gray-200 rounded-2xl">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase">
                  <th class="py-2.5 px-3">Employee Name</th>
                  <th class="py-2.5 px-3">Email &amp; Dept</th>
                  <th class="py-2.5 px-3">Invite Code</th>
                  <th class="py-2.5 px-3">RSVP Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="emp in activeRosterBooking.invites" :key="emp.id" class="hover:bg-gray-50/60 transition">
                  <td class="py-3 px-3 font-extrabold text-gray-900">{{ emp.name }}</td>
                  <td class="py-3 px-3 text-gray-600">
                    {{ emp.email }} <span class="text-gray-400">• {{ emp.department }}</span>
                  </td>
                  <td class="py-3 px-3 font-mono text-[11px] text-gray-700">{{ emp.code }}</td>
                  <td class="py-3 px-3">
                    <span
                      :class="[
                        'inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px]',
                        emp.status === 'Going' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800',
                      ]"
                    >
                      {{ emp.status === 'Going' ? '✓ Going' : '⏳ Pending' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-between pt-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-5 py-2.5 text-xs font-extrabold text-white hover:bg-[#33c4f0] hover:text-[#1a1a28] transition"
              @click="downloadRosterCsv(activeRosterBooking)"
            >
              <PhDownloadSimple :size="14" /> Download Roster CSV
            </button>

            <button
              type="button"
              class="rounded-full border border-gray-200 px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
              @click="activeRosterBooking = null"
            >
              Close Roster
            </button>
          </div>
        </div>
      </div>
    </section>
  </VendorWorkspaceShell>
</template>
