import { computed, reactive, ref, watch } from 'vue';
import type { ActivityItem, EmployeeInvite, VendorBrand } from '~/types/subscription';
import { PLAN_PRESETS } from '~/data/planPresets';
import {
  DEFAULT_ACTIVITIES,
  DEFAULT_BRAND,
  DEFAULT_INVITES,
  DEFAULT_VENDOR_CONFIRMED,
} from '~/data/subscriptionDefaults';

const STORAGE_KEY_PLAN = 'creative_self_selected_plan';
const STORAGE_KEY_BRAND = 'creative_self_selected_brand';
const STORAGE_KEY_ACTIVITIES = 'creative_self_selected_activities';
const STORAGE_KEY_INVITES = 'creative_self_employee_invites';
const STORAGE_KEY_VENDOR_CONFIRMED = 'creative_self_vendor_confirmed_activities';

export type SelectActivityResult = {
  success: boolean;
  reason?: 'brand_not_selected' | 'limit_reached';
};

function readJson<T>(key: string): T | undefined {
  if (typeof localStorage === 'undefined') return undefined;
  const saved = localStorage.getItem(key);
  if (!saved) return undefined;
  try {
    return JSON.parse(saved) as T;
  } catch {
    return undefined;
  }
}

/** Merge persisted items with any defaults that are missing from storage. */
function withMissingDefaults<T extends { id: string }>(saved: unknown, defaults: T[]): T[] {
  if (Array.isArray(saved) && saved.length > 0) {
    const existingIds = new Set((saved as T[]).map((item) => item.id));
    return [...(saved as T[]), ...defaults.filter((item) => !existingIds.has(item.id))];
  }
  return [...defaults];
}

function createSubscriptionStore() {
  const currentPlanKey = ref<string>(
    (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY_PLAN)) || 'advanced-creative-team',
  );
  const activePlan = computed(() => PLAN_PRESETS[currentPlanKey.value] ?? PLAN_PRESETS['advanced-creative-team']!);

  const selectedBrand = ref<VendorBrand | null>(readJson<VendorBrand>(STORAGE_KEY_BRAND) ?? { ...DEFAULT_BRAND });
  const selectedActivities = ref<ActivityItem[]>(
    withMissingDefaults(readJson(STORAGE_KEY_ACTIVITIES), DEFAULT_ACTIVITIES),
  );
  const employeeInvites = ref<EmployeeInvite[]>(withMissingDefaults(readJson(STORAGE_KEY_INVITES), DEFAULT_INVITES));

  const savedConfirmed = readJson<unknown>(STORAGE_KEY_VENDOR_CONFIRMED);
  const vendorConfirmedActivities = ref<string[]>(
    Array.isArray(savedConfirmed)
      ? Array.from(new Set([...(savedConfirmed as string[]), ...DEFAULT_VENDOR_CONFIRMED]))
      : [...DEFAULT_VENDOR_CONFIRMED],
  );

  const isLimitModalOpen = ref(false);
  const isBrandChangeModalOpen = ref(false);
  const pendingBrandToSelect = ref<VendorBrand | null>(null);

  const isBrandLocked = computed(() => Boolean(selectedBrand.value && selectedActivities.value.length > 0));

  if (typeof localStorage !== 'undefined') {
    watch(currentPlanKey, (value) => localStorage.setItem(STORAGE_KEY_PLAN, value), { immediate: true });
    watch(
      selectedBrand,
      (value) => {
        if (value) localStorage.setItem(STORAGE_KEY_BRAND, JSON.stringify(value));
        else localStorage.removeItem(STORAGE_KEY_BRAND);
      },
      { deep: true, immediate: true },
    );
    watch(selectedActivities, (value) => localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(value)), {
      deep: true,
      immediate: true,
    });
    watch(employeeInvites, (value) => localStorage.setItem(STORAGE_KEY_INVITES, JSON.stringify(value)), {
      deep: true,
      immediate: true,
    });
    watch(
      vendorConfirmedActivities,
      (value) => localStorage.setItem(STORAGE_KEY_VENDOR_CONFIRMED, JSON.stringify(value)),
      { deep: true, immediate: true },
    );
  }

  const isVendorConfirmed = (activityId: string) => vendorConfirmedActivities.value.includes(activityId);

  const confirmActivityByVendor = (activityId: string) => {
    if (!vendorConfirmedActivities.value.includes(activityId)) {
      vendorConfirmedActivities.value = [...vendorConfirmedActivities.value, activityId];
    }
  };

  const setPlan = (planKeyOrName: string) => {
    if (PLAN_PRESETS[planKeyOrName]) {
      currentPlanKey.value = planKeyOrName;
      return;
    }
    const foundKey = Object.keys(PLAN_PRESETS).find(
      (k) => PLAN_PRESETS[k]!.name.toLowerCase() === planKeyOrName.toLowerCase(),
    );
    if (foundKey) currentPlanKey.value = foundKey;
  };

  const selectBrand = (vendor: VendorBrand) => {
    if (selectedBrand.value && selectedBrand.value.id === vendor.id) return;
    if (isBrandLocked.value) {
      pendingBrandToSelect.value = vendor;
      isBrandChangeModalOpen.value = true;
      return;
    }
    selectedActivities.value = [];
    selectedBrand.value = vendor;
  };

  const unselectBrand = () => {
    if (isBrandLocked.value) {
      pendingBrandToSelect.value = null;
      isBrandChangeModalOpen.value = true;
      return;
    }
    selectedBrand.value = null;
    selectedActivities.value = [];
  };

  const requestBrandChange = (newVendor?: VendorBrand | null) => {
    if (isBrandLocked.value) {
      pendingBrandToSelect.value = newVendor || null;
      isBrandChangeModalOpen.value = true;
      return;
    }
    selectedBrand.value = newVendor || null;
    selectedActivities.value = [];
  };

  const confirmBrandChange = () => {
    selectedBrand.value = pendingBrandToSelect.value;
    selectedActivities.value = [];
    pendingBrandToSelect.value = null;
    isBrandChangeModalOpen.value = false;
  };

  const cancelBrandChange = () => {
    pendingBrandToSelect.value = null;
    isBrandChangeModalOpen.value = false;
  };

  const selectActivity = (activity: ActivityItem): SelectActivityResult => {
    if (!selectedBrand.value) {
      selectedBrand.value = {
        id: activity.vendorId,
        name: activity.vendorName,
        rating: 4.8,
        color: activity.color || '#EF4444',
      };
    } else if (selectedBrand.value.id !== activity.vendorId) {
      return { success: false, reason: 'brand_not_selected' };
    }

    if (selectedActivities.value.some((item) => item.id === activity.id)) {
      return { success: true };
    }

    if (selectedActivities.value.length >= activePlan.value.maxActivities) {
      isLimitModalOpen.value = true;
      return { success: false, reason: 'limit_reached' };
    }

    selectedActivities.value = [...selectedActivities.value, activity];
    return { success: true };
  };

  const unselectActivity = (activityId: string) => {
    selectedActivities.value = selectedActivities.value.filter((item) => item.id !== activityId);
  };

  const isActivitySelected = (activityId: string) => selectedActivities.value.some((item) => item.id === activityId);

  const canSelectActivity = (vendorId: string) => {
    if (selectedActivities.value.length >= activePlan.value.maxActivities) return false;
    if (selectedBrand.value && selectedBrand.value.id !== vendorId) return false;
    return true;
  };

  const canSelectBrand = (vendorId: string) => {
    if (!selectedBrand.value) return true;
    return selectedBrand.value.id === vendorId;
  };

  const openLimitModal = () => {
    isLimitModalOpen.value = true;
  };
  const closeLimitModal = () => {
    isLimitModalOpen.value = false;
  };

  const sendEmployeeInvite = (newInvite: Omit<EmployeeInvite, 'id' | 'sentAt' | 'inviteCode'>): EmployeeInvite => {
    const randomCode = `CS-INV-${Math.floor(1000 + Math.random() * 9000)}-${newInvite.employeeName
      .substring(0, 2)
      .toUpperCase()}`;
    const invite: EmployeeInvite = {
      ...newInvite,
      id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      inviteCode: randomCode,
      sentAt: new Date().toISOString().split('T')[0]!,
    };
    employeeInvites.value = [invite, ...employeeInvites.value];
    return invite;
  };

  const updateInviteStatus = (inviteId: string, status: EmployeeInvite['status']) => {
    employeeInvites.value = employeeInvites.value.map((item) => (item.id === inviteId ? { ...item, status } : item));
  };

  const cancelEmployeeInvite = (inviteId: string) => updateInviteStatus(inviteId, 'Cancelled');

  const getInvitesForActivity = (activityId: string) =>
    employeeInvites.value.filter((inv) => inv.activityId === activityId && inv.status !== 'Cancelled');

  return reactive({
    planName: computed(() => activePlan.value.name),
    planType: computed(() => activePlan.value.type),
    maxBrands: computed(() => activePlan.value.maxBrands),
    maxActivities: computed(() => activePlan.value.maxActivities),
    employeeSlotsPerActivity: computed(() => activePlan.value.employeeSlotsPerActivity),
    selectedBrand,
    selectedActivities,
    isLimitModalOpen,
    isBrandLocked,
    isBrandChangeModalOpen,
    pendingBrandToSelect,
    employeeInvites,
    vendorConfirmedActivities,
    setPlan,
    selectBrand,
    unselectBrand,
    requestBrandChange,
    confirmBrandChange,
    cancelBrandChange,
    selectActivity,
    unselectActivity,
    isActivitySelected,
    canSelectActivity,
    canSelectBrand,
    openLimitModal,
    closeLimitModal,
    sendEmployeeInvite,
    updateInviteStatus,
    cancelEmployeeInvite,
    getInvitesForActivity,
    isVendorConfirmed,
    confirmActivityByVendor,
  });
}

let store: ReturnType<typeof createSubscriptionStore> | undefined;

/**
 * Global subscription / plan state (replaces the former React SubscriptionContext).
 * Returns a reactive object — access properties as `sub.selectedBrand` rather than
 * destructuring, so reactivity is preserved.
 */
export function useSubscription() {
  if (!store) store = createSubscriptionStore();
  return store;
}
