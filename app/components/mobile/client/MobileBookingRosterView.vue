<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhCaretLeft, PhCheck, PhClock, PhUserPlus, PhPlus, PhX } from '@phosphor-icons/vue';
import type { MobileBooking } from '~/data/clientMobileData';

interface RosterAttendee {
  id: string;
  name: string;
  role: string;
  email?: string;
  avatar: string;
  status: 'Confirmed' | 'Pending';
  inviteCode: string;
}

defineProps<{ booking: MobileBooking | null; isOpen: boolean }>();
const emit = defineEmits<{ close: [] }>();

const toastMsg = ref<string | null>(null);
const showInviteModal = ref(false);
const inviteName = ref('');
const inviteEmail = ref('');
const inviteDept = ref('Design & Product');
const departments = ['Design & Product', 'Engineering & Tech', 'Marketing & Sales', 'HR & Operations'];

const attendeeList = ref<RosterAttendee[]>([
  { id: 'att-1', name: 'Sophia Chen', role: 'Design Director', email: 'sophia.chen@example.com', avatar: '👩‍🎨', status: 'Confirmed', inviteCode: 'CS-INV-801' },
  { id: 'att-2', name: 'Sarah Jenkins', role: 'UX Lead', email: 'sarah.j@acme.co', avatar: '👩‍💼', status: 'Confirmed', inviteCode: 'CS-INV-802' },
  { id: 'att-3', name: 'David Kim', role: 'Senior Developer', email: 'david.k@acme.co', avatar: '👨‍💻', status: 'Confirmed', inviteCode: 'CS-INV-803' },
  { id: 'att-4', name: 'Elena Rostova', role: 'Product Manager', avatar: '👩‍🔬', status: 'Confirmed', inviteCode: 'CS-INV-804' },
  { id: 'att-5', name: 'Marcus Vance', role: 'Talent & HR', email: 'marcus.v@acme.co', avatar: '👨‍💼', status: 'Pending', inviteCode: 'CS-INV-805' },
  { id: 'att-6', name: 'Alex Rivera', role: 'Research Analyst', email: 'alex.r@acme.co', avatar: '🎭', status: 'Pending', inviteCode: 'CS-INV-806' },
  { id: 'att-7', name: 'Chris Taylor', role: 'Operations', email: 'chris.t@acme.co', avatar: '🧘‍♂️', status: 'Confirmed', inviteCode: 'CS-INV-807' },
]);
const totalCapacity = 10;

const occupiedCount = computed(() => attendeeList.value.length);
const vacantCount = computed(() => Math.max(0, totalCapacity - occupiedCount.value));
const confirmedCount = computed(() => attendeeList.value.filter((a) => a.status === 'Confirmed').length);
const pendingCount = computed(() => attendeeList.value.filter((a) => a.status === 'Pending').length);
const percentFilled = computed(() => Math.min(100, Math.round((occupiedCount.value / totalCapacity) * 100)));

const showToast = (msg: string) => {
  toastMsg.value = msg;
  setTimeout(() => (toastMsg.value = null), 3000);
};

const handleSendInvite = () => {
  if (!inviteName.value.trim() || !inviteEmail.value.trim()) return;
  const email = inviteEmail.value.trim();
  attendeeList.value = [
    ...attendeeList.value,
    {
      id: `att-${Date.now()}`,
      name: inviteName.value.trim(),
      role: inviteDept.value,
      email,
      avatar: '✨',
      status: 'Pending',
      inviteCode: `CS-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    },
  ];
  inviteName.value = '';
  inviteEmail.value = '';
  showInviteModal.value = false;
  showToast(`📩 Invite sent to ${email}! Vacant slot assigned.`);
};

const inputClass = 'w-full px-3.5 py-2.5 bg-slate-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white border border-transparent focus:border-[#33C4F0]';
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="isOpen && booking"
      :initial="{ opacity: 0, x: '100%' }"
      :animate="{ opacity: 1, x: 0 }"
      :exit="{ opacity: 0, x: '100%' }"
      :transition="{ type: 'spring', damping: 25, stiffness: 200 }"
      class="absolute inset-0 bg-white z-50 overflow-y-auto flex flex-col text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <!-- Sticky Sub-page Top Header -->
      <div class="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition cursor-pointer"
          @click="emit('close')"
        >
          <PhCaretLeft :size="16" weight="bold" /> Back to Booking Details
        </button>

        <span class="text-xs font-extrabold text-[#147C9E] bg-[#E8F9FF] px-3 py-1 rounded-full">Manage Slots ({{ occupiedCount }}/{{ totalCapacity }})</span>
      </div>

      <!-- Toast Notification -->
      <AnimatePresence>
        <Motion
          v-if="toastMsg"
          :initial="{ opacity: 0, y: -10 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -10 }"
          class="bg-[#1A1A28] text-white text-xs font-bold px-4 py-2.5 text-center sticky top-[53px] z-30 shadow-md"
        >
          {{ toastMsg }}
        </Motion>
      </AnimatePresence>

      <!-- Main Content Area -->
      <div class="p-4 space-y-4 flex-1 pb-24">
        <div class="space-y-1">
          <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">{{ booking.vendorName }}</span>
          <h1 class="text-xl font-black text-slate-900 leading-snug">Team Roster &amp; Slot Management</h1>
          <p class="text-xs text-slate-500">{{ booking.activityName }} • {{ booking.date }}</p>
        </div>

        <!-- CAPACITY & SLOTS BREAKDOWN OVERVIEW CARD -->
        <div class="bg-[#1A1A28] p-4 text-white shadow-md space-y-3 relative overflow-hidden" style="border-radius: 20px 20px 48px 20px">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#33C4F0]">Corporate Allowance</span>
              <h3 class="text-base font-extrabold text-white mt-0.5">Slot Allocation Summary</h3>
            </div>
            <span class="rounded-full bg-[#33C4F0]/20 px-2.5 py-1 text-[10px] font-extrabold text-[#33C4F0] border border-[#33C4F0]/30">{{ percentFilled }}% Capacity</span>
          </div>

          <div class="grid grid-cols-3 gap-2 pt-1 text-center">
            <div class="bg-white/10 p-2.5 rounded-2xl border border-white/10">
              <p class="text-[10px] font-bold text-white/60">Total Slots</p>
              <p class="text-lg font-black text-white mt-0.5">{{ totalCapacity }}</p>
            </div>
            <div class="bg-[#10B981]/20 p-2.5 rounded-2xl border border-[#10B981]/40">
              <p class="text-[10px] font-bold text-[#10B981]">Occupied</p>
              <p class="text-lg font-black text-[#10B981] mt-0.5">{{ occupiedCount }}</p>
            </div>
            <div class="bg-[#33C4F0]/20 p-2.5 rounded-2xl border border-[#33C4F0]/40">
              <p class="text-[10px] font-bold text-[#33C4F0]">Vacant</p>
              <p class="text-lg font-black text-[#33C4F0] mt-0.5">{{ vacantCount }}</p>
            </div>
          </div>

          <div class="space-y-1 pt-1">
            <div class="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-gradient-to-r from-[#33C4F0] to-[#10B981] transition-all duration-500" :style="{ width: `${percentFilled}%` }" />
            </div>
            <div class="flex items-center justify-between text-[10px] font-bold text-white/70">
              <span>✓ {{ confirmedCount }} Confirmed</span>
              <span>⏳ {{ pendingCount }} Pending</span>
              <span>🔓 {{ vacantCount }} Vacant Available</span>
            </div>
          </div>

          <button
            v-if="vacantCount > 0"
            type="button"
            class="w-full py-2.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] text-xs font-extrabold rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            @click="showInviteModal = true"
          >
            <PhUserPlus :size="16" weight="bold" /> Assign Vacant Slot ({{ vacantCount }} Available)
          </button>
        </div>

        <!-- FULL ATTENDEE & VACANT ROSTER -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#147C9E] block">Assigned Team ({{ occupiedCount }}/{{ totalCapacity }})</span>
              <h3 class="text-base font-extrabold text-slate-900">Member List &amp; Invites</h3>
            </div>

            <button
              v-if="vacantCount > 0"
              type="button"
              class="text-xs font-extrabold text-[#33C4F0] bg-[#E8F9FF] px-3 py-1 rounded-full hover:bg-[#33C4F0] hover:text-white transition flex items-center gap-1 cursor-pointer"
              @click="showInviteModal = true"
            >
              <PhPlus :size="14" weight="bold" /> Invite
            </button>
          </div>

          <div class="space-y-2">
            <div
              v-for="att in attendeeList"
              :key="att.id"
              class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 hover:border-cyan-200 transition"
            >
              <div class="flex items-center gap-3 min-w-0 flex-1">
                <span class="text-xl p-1.5 bg-white rounded-2xl shadow-2xs shrink-0">{{ att.avatar }}</span>
                <div class="min-w-0 flex-1">
                  <p class="text-xs font-extrabold text-slate-900 truncate">{{ att.name }}</p>
                  <p class="text-[10px] text-slate-500 truncate">{{ att.role }} • {{ att.email }}</p>
                </div>
              </div>

              <div class="text-right shrink-0">
                <span
                  v-if="att.status === 'Confirmed'"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  <PhCheck :size="11" weight="bold" /> Confirmed
                </span>
                <span v-else class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                  <PhClock :size="11" weight="bold" /> Pending
                </span>
                <p class="text-[9px] font-mono text-slate-400 mt-0.5">{{ att.inviteCode }}</p>
              </div>
            </div>

            <!-- Vacant Slot Cards -->
            <div
              v-for="idx in vacantCount"
              :key="`vacant-${idx}`"
              class="p-3.5 rounded-2xl bg-white border-2 border-dashed border-cyan-200/80 flex items-center justify-between gap-3 hover:bg-cyan-50/50 transition cursor-pointer"
              @click="showInviteModal = true"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-2xl bg-[#E8F9FF] text-[#147C9E] flex items-center justify-center font-bold text-xs">🔓</div>
                <div>
                  <p class="text-xs font-bold text-slate-700">Vacant Corporate Slot #{{ occupiedCount + idx }}</p>
                  <p class="text-[10px] text-[#33C4F0] font-semibold">Tap to assign team member</p>
                </div>
              </div>
              <span class="text-[10px] font-extrabold text-[#147C9E] bg-[#E8F9FF] px-2.5 py-1 rounded-full border border-[#A2F4FD]">Available</span>
            </div>
          </div>
        </div>
      </div>

      <!-- INVITE FORM MODAL -->
      <div v-if="showInviteModal" class="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl w-full max-w-xs p-5 text-left space-y-4 shadow-2xl relative">
          <button
            type="button"
            class="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
            @click="showInviteModal = false"
          >
            <PhX :size="16" />
          </button>

          <div>
            <span class="text-[10px] font-extrabold text-[#33C4F0] uppercase tracking-wider">Assign Vacant Slot</span>
            <h3 class="text-base font-black text-slate-900 mt-0.5">Invite Team Member</h3>
            <p class="text-xs text-slate-500">Fill an available slot for this session ({{ vacantCount }} vacant left).</p>
          </div>

          <form class="space-y-3" @submit.prevent="handleSendInvite">
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Colleague Name</label>
              <input v-model="inviteName" type="text" required placeholder="e.g. Jordan Lee" :class="inputClass" />
            </div>

            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Work Email</label>
              <input v-model="inviteEmail" type="email" required placeholder="e.g. jordan.l@company.com" :class="inputClass" />
            </div>

            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Department / Role</label>
              <select v-model="inviteDept" :class="inputClass">
                <option v-for="dept in departments" :key="dept">{{ dept }}</option>
              </select>
            </div>

            <button
              type="submit"
              class="w-full py-3 bg-[#33C4F0] hover:bg-[#1AB0DC] text-[#1A1A28] font-extrabold text-xs rounded-full shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <PhUserPlus :size="16" weight="bold" /> Send Invite &amp; Assign Slot
            </button>
          </form>
        </div>
      </div>
    </Motion>
  </AnimatePresence>
</template>
