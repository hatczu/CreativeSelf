<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhUsers, PhCheckCircle, PhUserMinus, PhMagnifyingGlass, PhCopy, PhCheck, PhPlus, PhSparkle, PhEnvelopeSimple } from '@phosphor-icons/vue';
import type { EmployeeInvite } from '~/types/subscription';

type StatusFilter = 'all' | 'Going' | 'Pending' | 'Cancelled';

const route = useRoute();
const urlActivityId = computed(() => (route.query.activityId as string | undefined) ?? null);

const sub = useSubscription();

const searchQuery = ref('');
const statusFilter = ref<StatusFilter>('all');
const copiedCode = ref<string | null>(null);

// Modal State
const isSlotModalOpen = ref(false);
const selectedActivityForModal = ref({
  id: sub.selectedActivities[0]?.id || 'ceramic-pottery-workshop',
  name: sub.selectedActivities[0]?.name || 'Ceramic Pottery Workshop',
});

// Metrics
const totalInvites = computed(() => sub.employeeInvites.length);
const goingCount = computed(() => sub.employeeInvites.filter((i) => i.status === 'Going').length);
const pendingCount = computed(() => sub.employeeInvites.filter((i) => i.status === 'Pending').length);
const cancelledCount = computed(
  () => sub.employeeInvites.filter((i) => i.status === 'Cancelled' || i.status === 'Not Going').length,
);

// Total available corporate slots across active activities
const totalSlotsCapacity = computed(() => sub.selectedActivities.length * sub.employeeSlotsPerActivity);
const activeAssignedSlots = computed(() => sub.employeeInvites.filter((i) => i.status !== 'Cancelled').length);

const filteredInvites = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return sub.employeeInvites.filter((inv) => {
    const matchesActivity = !urlActivityId.value || inv.activityId === urlActivityId.value;
    const matchesStatus = statusFilter.value === 'all' || inv.status === statusFilter.value;
    const matchesSearch =
      query === '' ||
      inv.employeeName.toLowerCase().includes(query) ||
      inv.employeeEmail.toLowerCase().includes(query) ||
      inv.inviteCode.toLowerCase().includes(query) ||
      inv.activityName.toLowerCase().includes(query);
    return matchesActivity && matchesStatus && matchesSearch;
  });
});

const statusTabs: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All Invites' },
  { id: 'Going', label: 'Going' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Cancelled', label: 'Cancelled' },
];

const handleCopyCode = (code: string) => {
  navigator.clipboard.writeText(code);
  copiedCode.value = code;
  setTimeout(() => (copiedCode.value = null), 2000);
};

const handleOpenInviteModal = (actId: string, actName: string) => {
  selectedActivityForModal.value = { id: actId, name: actName };
  isSlotModalOpen.value = true;
};

const statusClass = (status: EmployeeInvite['status']) =>
  status === 'Going'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : status === 'Pending'
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-red-50 text-red-700 border-red-200';

const policies = [
  {
    icon: PhCheckCircle,
    iconClass: 'text-[#147c9e]',
    title: 'Automatic Slot Reservation',
    body: 'Generating an invite code instantly holds 1 seat per employee for your active corporate plan.',
  },
  {
    icon: PhUsers,
    iconClass: 'text-purple-600',
    title: 'Revocable Invitations',
    body: 'If an employee declines or cancels, their slot is freed up immediately for another team member.',
  },
  {
    icon: PhSparkle,
    iconClass: 'text-emerald-600',
    title: 'Email Notifications',
    body: 'Employees receive single-use direct access codes via email to join their scheduled activities.',
  },
];
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <UniversalSidebar />

    <EmployeeSlotManagerModal
      :is-open="isSlotModalOpen"
      :activity-id="selectedActivityForModal.id"
      :activity-name="selectedActivityForModal.name"
      @close="isSlotModalOpen = false"
    />

    <div
      class="mx-auto grid max-w-[1320px] gap-6 px-5 pt-6 pb-28 sm:px-8 sm:pt-8 lg:gap-8 lg:py-10 lg:pb-14 lg:pl-[104px] lg:pr-10 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_260px]"
    >
      <!-- Left Sidebar Info -->
      <aside class="hidden lg:block">
        <SubscriptionEntitlementHeader variant="sidebar" :show-logo="true" />
      </aside>

      <!-- Main Content Dashboard -->
      <main class="space-y-6 min-w-0">
        <!-- Header Banner -->
        <div class="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">Corporate Employee Invites &amp; Slot Tracker</p>
              <h1 class="mt-2 text-3xl font-extrabold leading-tight text-[#1a1a28]">Manage Employee Invites</h1>
              <p class="mt-2 max-w-xl text-sm leading-6 text-[#717182]">
                Track employee attendance (Going, Pending, Cancelled), generate invite codes, send email notifications, and
                manage limited corporate slot allocations for {{ sub.planName }}.
              </p>
            </div>

            <button
              v-if="sub.selectedActivities.length > 0"
              class="shrink-0 rounded-brand-sm bg-[#1a1a28] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28] flex items-center gap-2"
              @click="handleOpenInviteModal(sub.selectedActivities[0]!.id, sub.selectedActivities[0]!.name)"
            >
              <PhPlus :size="16" />
              Send New Employee Invite
            </button>
          </div>
          <div class="mt-5 inline-flex rounded-brand-sm bg-[#e8f9ff] px-4 py-2 text-xs font-bold text-[#147c9e]">
            Active Corporate Plan: {{ sub.planName }}
          </div>
        </div>

        <!-- Key Metric Cards Widget -->
        <section class="overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex items-center justify-between gap-4 mb-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-[.16em] text-white/45">EMPLOYEE INVITES METRICS</p>
              <h3 class="text-lg font-extrabold text-white">Live Attendance &amp; Capacity Overview</h3>
            </div>
            <span class="rounded-brand-sm bg-[#33c4f0] px-2.5 py-1 text-[10px] font-extrabold text-[#1a1a28]">Real-time</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
              <p class="text-2xl font-extrabold text-[#33c4f0]">{{ totalInvites }}</p>
              <p class="mt-1 text-xs font-bold text-white">Total Invites Sent</p>
              <p class="mt-1 text-[11px] text-white/50">{{ activeAssignedSlots }} / {{ totalSlotsCapacity || 10 }} slots active</p>
            </div>

            <div class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
              <p class="text-2xl font-extrabold text-[#10B981]">{{ goingCount }}</p>
              <p class="mt-1 text-xs font-bold text-white">Going (Confirmed)</p>
              <p class="mt-1 text-[11px] text-white/50">{{ Math.round((goingCount / (totalInvites || 1)) * 100) }}% Acceptance Rate</p>
            </div>

            <div class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
              <p class="text-2xl font-extrabold text-amber-400">{{ pendingCount }}</p>
              <p class="mt-1 text-xs font-bold text-white">Pending Response</p>
              <p class="mt-1 text-[11px] text-white/50">Awaiting employee action</p>
            </div>

            <div class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
              <p class="text-2xl font-extrabold text-rose-400">{{ cancelledCount }}</p>
              <p class="mt-1 text-xs font-bold text-white">Cancelled / Declined</p>
              <p class="mt-1 text-[11px] text-white/50">Slots returned to pool</p>
            </div>
          </div>
        </section>

        <!-- Main Invites Table Section -->
        <div class="bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)] space-y-5" style="border-radius: 20px 20px 64px 20px">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-extrabold text-gray-900">Employee Invite Codes &amp; Status Roster</h3>
              <p class="text-xs text-gray-500 mt-0.5 font-medium">
                Track who is going, pending, or cancelled, and manage employee invite codes.
              </p>
            </div>

            <!-- Status Filter Pills -->
            <div class="flex max-w-full items-center gap-1.5 overflow-x-auto bg-gray-100 p-1 rounded-2xl border border-gray-200">
              <button
                v-for="tab in statusTabs"
                :key="tab.id"
                :class="[
                  'px-3.5 py-1.5 rounded-brand text-xs font-bold transition-all',
                  statusFilter === tab.id ? 'bg-white text-cyan-800 shadow-sm border border-gray-200/80' : 'text-gray-600 hover:text-gray-900',
                ]"
                @click="statusFilter = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="relative">
            <PhMagnifyingGlass :size="17" class="absolute left-3.5 top-3.5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search employee name, email, invite code, or activity name..."
              class="w-full pl-10 pr-4 py-3 rounded-brand border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 text-xs font-medium text-gray-800"
            />
          </div>

          <!-- Invites Roster Table -->
          <div class="overflow-x-auto">
            <table class="w-full min-w-[640px] text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
                  <th class="py-3 px-4">Employee</th>
                  <th class="py-3 px-4">Activity</th>
                  <th class="py-3 px-4">Invite Code</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-if="filteredInvites.length === 0">
                  <td :colspan="5" class="py-8 text-center text-gray-500 italic">
                    No employee invites match your current search or filter criteria.
                  </td>
                </tr>
                <tr v-for="inv in filteredInvites" v-else :key="inv.id" class="hover:bg-cyan-50/40 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 text-white font-bold flex items-center justify-center text-xs">
                        {{ inv.employeeName.substring(0, 2).toUpperCase() }}
                      </div>
                      <div>
                        <p class="font-extrabold text-gray-900">{{ inv.employeeName }}</p>
                        <p class="text-[11px] text-gray-500">{{ inv.employeeEmail }} • {{ inv.department || 'Team' }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-4 font-bold text-gray-800">{{ inv.activityName }}</td>
                  <td class="py-3.5 px-4 font-mono text-[11px]">
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200">
                      <span>{{ inv.inviteCode }}</span>
                      <button class="text-gray-400 hover:text-cyan-600 transition-colors" title="Copy Invite Code" @click="handleCopyCode(inv.inviteCode)">
                        <PhCheck v-if="copiedCode === inv.inviteCode" :size="12" class="text-emerald-500" />
                        <PhCopy v-else :size="12" />
                      </button>
                    </div>
                  </td>
                  <td class="py-3.5 px-4">
                    <select
                      :value="inv.status"
                      :class="['px-3 py-1 rounded-brand-sm text-xs font-bold border outline-none cursor-pointer', statusClass(inv.status)]"
                      @change="sub.updateInviteStatus(inv.id, ($event.target as HTMLSelectElement).value as EmployeeInvite['status'])"
                    >
                      <option value="Going">✓ Going</option>
                      <option value="Pending">⏳ Pending</option>
                      <option value="Not Going">× Not Going</option>
                      <option value="Cancelled">🚫 Cancelled</option>
                    </select>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      <button
                        class="p-1.5 text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                        title="Resend Invite / Copy Link"
                        @click="handleCopyCode(`https://creativeself.app/invite?code=${inv.inviteCode}`)"
                      >
                        <PhEnvelopeSimple :size="16" />
                      </button>
                      <button
                        class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Cancel / Revoke Slot"
                        @click="sub.cancelEmployeeInvite(inv.id)"
                      >
                        <PhUserMinus :size="16" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <!-- Right Sidebar Info Card -->
      <aside class="min-w-0 lg:col-start-2 xl:col-start-auto">
        <div class="sticky top-8 space-y-6">
          <!-- Card 1: Team Engagement Metrics Widget -->
          <div class="overflow-hidden bg-white p-5 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
            <span class="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">TEAM ENGAGEMENT</span>
            <div class="mt-3 flex items-center justify-between">
              <div>
                <p class="text-3xl font-black text-[#1a1a28]">88%</p>
                <p class="mt-0.5 text-xs font-bold text-[#1a1a28]">Monthly Attendance</p>
              </div>
              <div class="grid h-11 w-11 place-items-center rounded-[14px_14px_22px_14px] bg-[#e8f9ff] text-[#147c9e]">
                <PhUsers :size="20" />
              </div>
            </div>
            <p class="mt-3 text-xs leading-5 text-[#717182] font-medium">
              High team response rate across creative restoration and wellbeing activities.
            </p>
          </div>

          <!-- Card 2: Slot Policy & Invite Guidelines -->
          <div class="overflow-hidden bg-[#e8f9ff] p-5 shadow-sm" style="border-radius: 20px 20px 64px 20px">
            <div class="border-b border-[#33c4f0]/20 pb-3">
              <span class="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#147c9e]">SLOT POLICY</span>
              <h3 class="mt-1 text-base font-extrabold text-[#1a1a28]">Team Invite Rules</h3>
            </div>

            <div class="mt-4 space-y-3.5 text-xs text-[#717182]">
              <div v-for="policy in policies" :key="policy.title" class="flex items-start gap-2.5">
                <div :class="['grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white shadow-sm mt-0.5', policy.iconClass]">
                  <component :is="policy.icon" :size="13" />
                </div>
                <div>
                  <p class="font-bold text-[#1a1a28]">{{ policy.title }}</p>
                  <p class="mt-0.5 text-[11px] leading-4 text-[#556976]">{{ policy.body }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
