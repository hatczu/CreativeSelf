<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  PhX,
  PhUsers,
  PhEnvelope,
  PhUser,
  PhBuildings,
  PhCheckCircle,
  PhPaperPlaneRight,
  PhCopy,
  PhCheck,
  PhTicket,
  PhUserMinus,
  PhWarningCircle,
} from '@phosphor-icons/vue';
import type { EmployeeInvite } from '~/types/subscription';

const props = defineProps<{ isOpen: boolean; activityId: string; activityName: string }>();
const emit = defineEmits<{ close: [] }>();

const sub = useSubscription();

const employeeName = ref('');
const employeeEmail = ref('');
const department = ref('Design & Engineering');
const lastSentInvite = ref<EmployeeInvite | null>(null);
const copiedCode = ref<string | null>(null);

const currentInvites = computed(() => sub.getInvitesForActivity(props.activityId));
const activeCount = computed(() => currentInvites.value.length);
const remainingSlots = computed(() => sub.employeeSlotsPerActivity - activeCount.value);
const isConfirmed = computed(() => sub.isVendorConfirmed(props.activityId));

const handleSendInvite = () => {
  if (!isConfirmed.value || !employeeName.value || !employeeEmail.value || remainingSlots.value <= 0) return;

  lastSentInvite.value = sub.sendEmployeeInvite({
    activityId: props.activityId,
    activityName: props.activityName,
    employeeName: employeeName.value,
    employeeEmail: employeeEmail.value,
    department: department.value,
    status: 'Pending',
  });
  employeeName.value = '';
  employeeEmail.value = '';
};

const handleCopyCode = (code: string) => {
  navigator.clipboard.writeText(code);
  copiedCode.value = code;
  setTimeout(() => (copiedCode.value = null), 2000);
};

const statusClass = (status: EmployeeInvite['status']) =>
  status === 'Going'
    ? 'bg-emerald-100 text-emerald-800'
    : status === 'Pending'
      ? 'bg-amber-100 text-amber-800'
      : 'bg-red-100 text-red-800';
</script>

<template>
  <AnimatePresence>
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      :style="{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }"
    >
      <Motion
        :initial="{ opacity: 0, scale: 0.95, y: 20 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.95, y: 20 }"
        class="relative w-full max-w-3xl bg-white shadow-2xl overflow-hidden my-8"
        :style="{ borderRadius: '28px 28px 72px 28px', border: '1px solid rgba(51, 196, 240, 0.25)' }"
      >
        <!-- Header -->
        <div class="px-6 py-5 bg-gradient-to-r from-cyan-50 via-blue-50 to-white border-b border-cyan-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-md shadow-cyan-300/50">
              <PhUsers :size="20" />
            </div>
            <div>
              <h3 class="font-extrabold text-gray-900 text-lg">Manage Corporate Employee Slots</h3>
              <p class="text-xs font-semibold text-cyan-700">{{ activityName }} • {{ sub.planName }}</p>
            </div>
          </div>
          <button
            class="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            @click="emit('close')"
          >
            <PhX :size="20" />
          </button>
        </div>

        <div class="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          <!-- Slot Counter Banner -->
          <div
            class="bg-gradient-to-r from-gray-900 to-slate-800 text-white p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg"
            style="border-radius: 20px 20px 48px 20px"
          >
            <div>
              <span class="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Employee Slot Entitlement</span>
              <h4 class="text-xl font-black text-white mt-0.5">
                {{ activeCount }} / {{ sub.employeeSlotsPerActivity }} Slots Allocated
              </h4>
              <p class="text-xs text-gray-300 mt-1">
                {{
                  remainingSlots > 0
                    ? `You can invite ${remainingSlots} more employee(s) to this activity.`
                    : 'All slots for this activity are currently assigned!'
                }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <div class="px-3.5 py-1.5 rounded-full bg-cyan-400/20 text-cyan-300 font-extrabold text-xs border border-cyan-400/30 flex items-center gap-1.5">
                <PhTicket :size="14" />
                {{ remainingSlots }} Available
              </div>
            </div>
          </div>

          <!-- Vendor Confirmation Warning Banner if Pending -->
          <div
            v-if="!isConfirmed"
            class="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-900 font-medium"
          >
            <PhWarningCircle :size="18" class="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p class="font-extrabold text-amber-900 text-sm">Vendor Confirmation Pending</p>
              <p class="mt-0.5 leading-relaxed text-amber-800">
                The provider has not confirmed this session booking request yet. Employee invites are locked and cannot
                be issued until the vendor confirms the booking in their workspace.
              </p>
            </div>
          </div>

          <!-- Invite Form -->
          <form
            v-if="remainingSlots > 0 && isConfirmed"
            class="bg-cyan-50/50 p-5 rounded-2xl border border-cyan-100 space-y-4"
            @submit.prevent="handleSendInvite"
          >
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                <PhPaperPlaneRight :size="16" class="text-cyan-600" />
                Send Employee Invite Code
              </h4>
              <span class="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">Email Notification</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Employee Name</label>
                <div class="relative">
                  <PhUser :size="16" class="absolute left-3 top-3 text-gray-400" />
                  <input
                    v-model="employeeName"
                    type="text"
                    required
                    placeholder="e.g. Jordan Lee"
                    class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-500 bg-white text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Work Email</label>
                <div class="relative">
                  <PhEnvelope :size="16" class="absolute left-3 top-3 text-gray-400" />
                  <input
                    v-model="employeeEmail"
                    type="email"
                    required
                    placeholder="jordan@company.com"
                    class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-500 bg-white text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Department</label>
                <div class="relative">
                  <PhBuildings :size="16" class="absolute left-3 top-3 text-gray-400" />
                  <input
                    v-model="department"
                    type="text"
                    placeholder="e.g. Engineering"
                    class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-500 bg-white text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold rounded-xl shadow-md shadow-cyan-300/30 text-xs flex items-center justify-center gap-2"
            >
              <PhPaperPlaneRight :size="14" />
              Send Email Invitation &amp; Assign Slot
            </button>
          </form>
          <div v-else class="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-3 text-xs text-amber-800 font-medium">
            <PhWarningCircle class="text-amber-600 shrink-0" :size="18" />
            <span>
              You have reached the maximum employee slots for this activity ({{ sub.employeeSlotsPerActivity }} slots).
              Upgrade your corporate plan or revoke existing invites to free up slots.
            </span>
          </div>

          <!-- Simulated Email Sent Notification -->
          <Motion
            v-if="lastSentInvite"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            class="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-900 text-xs"
          >
            <div class="flex items-center justify-between font-bold text-emerald-800 mb-1">
              <span class="flex items-center gap-1.5">
                <PhCheckCircle :size="16" class="text-emerald-600" />
                Invitation Sent to {{ lastSentInvite.employeeEmail }}!
              </span>
              <span class="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">Email Delivered</span>
            </div>
            <p class="text-emerald-700 mb-2">
              An email has been sent to <strong>{{ lastSentInvite.employeeName }}</strong> with their unique invite code:
            </p>
            <div class="bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between">
              <code class="font-mono font-bold text-emerald-800 text-sm">{{ lastSentInvite.inviteCode }}</code>
              <button
                class="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                @click="handleCopyCode(lastSentInvite.inviteCode)"
              >
                <PhCheck v-if="copiedCode === lastSentInvite.inviteCode" :size="14" />
                <PhCopy v-else :size="14" />
                {{ copiedCode === lastSentInvite.inviteCode ? 'Copied' : 'Copy Code' }}
              </button>
            </div>
          </Motion>

          <!-- Current Invites Table for this Activity -->
          <div>
            <h4 class="font-bold text-gray-900 text-sm mb-3">Assigned Employees ({{ currentInvites.length }})</h4>
            <p v-if="currentInvites.length === 0" class="text-xs text-gray-500 italic py-4 text-center border border-dashed rounded-2xl">
              No employees invited to this activity yet. Send an invite code above!
            </p>
            <div v-else class="space-y-2.5">
              <div
                v-for="inv in currentInvites"
                :key="inv.id"
                class="p-3.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50/50 flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 font-bold flex items-center justify-center">
                    {{ inv.employeeName.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-bold text-gray-900">{{ inv.employeeName }}</p>
                    <p class="text-gray-500 text-[11px]">{{ inv.employeeEmail }} • {{ inv.department || 'General' }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span class="font-mono text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200">
                    {{ inv.inviteCode }}
                  </span>

                  <!-- Status selector -->
                  <select
                    :value="inv.status"
                    :class="['text-[11px] font-bold px-2.5 py-1 rounded-full border border-transparent outline-none', statusClass(inv.status)]"
                    @change="sub.updateInviteStatus(inv.id, ($event.target as HTMLSelectElement).value as EmployeeInvite['status'])"
                  >
                    <option value="Going">Going</option>
                    <option value="Pending">Pending</option>
                    <option value="Not Going">Not Going</option>
                  </select>

                  <button
                    title="Revoke Invite"
                    class="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-lg transition-colors"
                    @click="sub.cancelEmployeeInvite(inv.id)"
                  >
                    <PhUserMinus :size="15" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </div>
  </AnimatePresence>
</template>
