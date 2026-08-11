import React, { createContext, useContext, useState, useEffect } from 'react';

export interface VendorBrand {
  id: string;
  name: string;
  rating: number;
  specialty?: string;
  color?: string;
  avatar?: string;
  tagline?: string;
}

export interface ActivityItem {
  id: string;
  name: string;
  vendorId: string;
  vendorName: string;
  category: string;
  duration: string;
  location: string;
  description: string;
  color?: string;
  symbol?: string;
  image?: string;
}

export interface EmployeeInvite {
  id: string;
  activityId: string;
  activityName: string;
  employeeName: string;
  employeeEmail: string;
  department?: string;
  inviteCode: string;
  sentAt: string;
  status: 'Going' | 'Pending' | 'Not Going' | 'Cancelled';
}

export interface PlanConfig {
  name: string;
  type: 'individual' | 'corporate';
  maxBrands: number;
  maxActivities: number;
  employeeSlotsPerActivity: number;
}

export const PLAN_PRESETS: Record<string, PlanConfig> = {
  'basic-creative': {
    name: 'BASIC CREATIVE',
    type: 'individual',
    maxBrands: 1,
    maxActivities: 2,
    employeeSlotsPerActivity: 1,
  },
  'advanced-creative': {
    name: 'ADVANCED CREATIVE',
    type: 'individual',
    maxBrands: 2,
    maxActivities: 4,
    employeeSlotsPerActivity: 1,
  },
  'elite-creative': {
    name: 'ELITE CREATIVE',
    type: 'individual',
    maxBrands: 3,
    maxActivities: 6,
    employeeSlotsPerActivity: 1,
  },
  'one-on-one-creative': {
    name: 'ONE-ON-ONE CREATIVE',
    type: 'individual',
    maxBrands: 3,
    maxActivities: 6,
    employeeSlotsPerActivity: 1,
  },
  'basic-creative-team': {
    name: 'BASIC CREATIVE TEAM',
    type: 'corporate',
    maxBrands: 2,
    maxActivities: 4,
    employeeSlotsPerActivity: 8,
  },
  'advanced-creative-team': {
    name: 'ADVANCED CREATIVE TEAM',
    type: 'corporate',
    maxBrands: 4,
    maxActivities: 6,
    employeeSlotsPerActivity: 10,
  },
  'elite-creative-team': {
    name: 'ELITE CREATIVE TEAM',
    type: 'corporate',
    maxBrands: 6,
    maxActivities: 12,
    employeeSlotsPerActivity: 15,
  },
  'custom-creative-corporate': {
    name: 'CUSTOM CREATIVE',
    type: 'corporate',
    maxBrands: 6,
    maxActivities: 12,
    employeeSlotsPerActivity: 20,
  },
};

interface SubscriptionContextType {
  planName: string;
  planType: 'individual' | 'corporate';
  maxBrands: number;
  maxActivities: number;
  employeeSlotsPerActivity: number;
  selectedBrand: VendorBrand | null;
  selectedActivities: ActivityItem[];
  isLimitModalOpen: boolean;
  isBrandLocked: boolean;
  isBrandChangeModalOpen: boolean;
  pendingBrandToSelect: VendorBrand | null;
  employeeInvites: EmployeeInvite[];
  setPlan: (planKeyOrName: string) => void;
  selectBrand: (vendor: VendorBrand) => void;
  unselectBrand: () => void;
  requestBrandChange: (vendor?: VendorBrand | null) => void;
  confirmBrandChange: () => void;
  cancelBrandChange: () => void;
  selectActivity: (activity: ActivityItem) => { success: boolean; reason?: 'brand_not_selected' | 'limit_reached' };
  unselectActivity: (activityId: string) => void;
  isActivitySelected: (activityId: string) => boolean;
  canSelectActivity: (vendorId: string) => boolean;
  canSelectBrand: (vendorId: string) => boolean;
  openLimitModal: () => void;
  closeLimitModal: () => void;
  sendEmployeeInvite: (invite: Omit<EmployeeInvite, 'id' | 'sentAt' | 'inviteCode'>) => EmployeeInvite;
  updateInviteStatus: (inviteId: string, status: EmployeeInvite['status']) => void;
  cancelEmployeeInvite: (inviteId: string) => void;
  getInvitesForActivity: (activityId: string) => EmployeeInvite[];
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const STORAGE_KEY_PLAN = 'creative_self_selected_plan';
const STORAGE_KEY_BRAND = 'creative_self_selected_brand';
const STORAGE_KEY_ACTIVITIES = 'creative_self_selected_activities';
const STORAGE_KEY_INVITES = 'creative_self_employee_invites';

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlanKey, setCurrentPlanKey] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PLAN) || 'advanced-creative-team';
  });

  const activePlan = PLAN_PRESETS[currentPlanKey] || PLAN_PRESETS['advanced-creative-team'];

  const [selectedBrand, setSelectedBrand] = useState<VendorBrand | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_BRAND);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      id: "abc-creative-studio",
      name: "ABC Creative Studio",
      rating: 4.8,
      specialty: "Painting, creative workshops, photography, and more.",
      color: "#EF4444",
      avatar: "🎨",
    };
  });

  const [selectedActivities, setSelectedActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'ceramic-pottery-workshop',
        name: 'Ceramic Pottery & Clay Workshop',
        vendorId: 'abc-creative-studio',
        vendorName: 'ABC Creative Studio',
        category: 'Heart of Art',
        duration: '2 Hours',
        location: 'Downtown Studio',
        description: 'Hands-on clay sculpting and wheel throwing experience.',
        color: '#33C4F0',
        symbol: '🏺',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 'mindful-watercolor-painting',
        name: 'Mindful Watercolor Painting',
        vendorId: 'abc-creative-studio',
        vendorName: 'ABC Creative Studio',
        category: 'Heart of Art',
        duration: '1.5 Hours',
        location: 'Westside Loft',
        description: 'Express yourself through color gradients and gentle brushstrokes.',
        color: '#8B5CF6',
        symbol: '🎨',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=60',
      },
    ];
  });

  const [employeeInvites, setEmployeeInvites] = useState<EmployeeInvite[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_INVITES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'inv-1',
        activityId: 'ceramic-pottery-workshop',
        activityName: 'Ceramic Pottery & Clay Workshop',
        employeeName: 'Sarah Jenkins',
        employeeEmail: 'sarah.j@acme.corp',
        department: 'Design',
        inviteCode: 'CS-INV-8912-SJ',
        sentAt: '2026-08-10',
        status: 'Going',
      },
      {
        id: 'inv-2',
        activityId: 'ceramic-pottery-workshop',
        activityName: 'Ceramic Pottery & Clay Workshop',
        employeeName: 'Marcus Vance',
        employeeEmail: 'marcus.v@acme.corp',
        department: 'Engineering',
        inviteCode: 'CS-INV-4421-MV',
        sentAt: '2026-08-10',
        status: 'Pending',
      },
      {
        id: 'inv-3',
        activityId: 'ceramic-pottery-workshop',
        activityName: 'Ceramic Pottery & Clay Workshop',
        employeeName: 'Elena Rostova',
        employeeEmail: 'elena.r@acme.corp',
        department: 'Product',
        inviteCode: 'CS-INV-7730-ER',
        sentAt: '2026-08-09',
        status: 'Going',
      },
      {
        id: 'inv-4',
        activityId: 'mindful-watercolor-painting',
        activityName: 'Mindful Watercolor Painting',
        employeeName: 'David Kim',
        employeeEmail: 'david.k@acme.corp',
        department: 'Marketing',
        inviteCode: 'CS-INV-1109-DK',
        sentAt: '2026-08-11',
        status: 'Going',
      },
      {
        id: 'inv-5',
        activityId: 'mindful-watercolor-painting',
        activityName: 'Mindful Watercolor Painting',
        employeeName: 'Chloe Bennett',
        employeeEmail: 'chloe.b@acme.corp',
        department: 'Human Resources',
        inviteCode: 'CS-INV-3329-CB',
        sentAt: '2026-08-11',
        status: 'Cancelled',
      },
    ];
  });

  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isBrandChangeModalOpen, setIsBrandChangeModalOpen] = useState(false);
  const [pendingBrandToSelect, setPendingBrandToSelect] = useState<VendorBrand | null>(null);

  const isBrandLocked = Boolean(selectedBrand && selectedActivities.length > 0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PLAN, currentPlanKey);
  }, [currentPlanKey]);

  useEffect(() => {
    if (selectedBrand) {
      localStorage.setItem(STORAGE_KEY_BRAND, JSON.stringify(selectedBrand));
    } else {
      localStorage.removeItem(STORAGE_KEY_BRAND);
    }
  }, [selectedBrand]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(selectedActivities));
  }, [selectedActivities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INVITES, JSON.stringify(employeeInvites));
  }, [employeeInvites]);

  const setPlan = (planKeyOrName: string) => {
    if (PLAN_PRESETS[planKeyOrName]) {
      setCurrentPlanKey(planKeyOrName);
      return;
    }
    const foundKey = Object.keys(PLAN_PRESETS).find(
      (k) => PLAN_PRESETS[k].name.toLowerCase() === planKeyOrName.toLowerCase()
    );
    if (foundKey) setCurrentPlanKey(foundKey);
  };

  const selectBrand = (vendor: VendorBrand) => {
    if (selectedBrand && selectedBrand.id === vendor.id) return;
    if (isBrandLocked) {
      setPendingBrandToSelect(vendor);
      setIsBrandChangeModalOpen(true);
      return;
    }
    setSelectedActivities([]);
    setSelectedBrand(vendor);
  };

  const unselectBrand = () => {
    if (isBrandLocked) {
      setPendingBrandToSelect(null);
      setIsBrandChangeModalOpen(true);
      return;
    }
    setSelectedBrand(null);
    setSelectedActivities([]);
  };

  const requestBrandChange = (newVendor?: VendorBrand | null) => {
    if (isBrandLocked) {
      setPendingBrandToSelect(newVendor || null);
      setIsBrandChangeModalOpen(true);
      return;
    }
    setSelectedBrand(newVendor || null);
    setSelectedActivities([]);
  };

  const confirmBrandChange = () => {
    setSelectedBrand(pendingBrandToSelect);
    setSelectedActivities([]);
    setPendingBrandToSelect(null);
    setIsBrandChangeModalOpen(false);
  };

  const cancelBrandChange = () => {
    setPendingBrandToSelect(null);
    setIsBrandChangeModalOpen(false);
  };

  const selectActivity = (activity: ActivityItem): { success: boolean; reason?: 'brand_not_selected' | 'limit_reached' } => {
    if (!selectedBrand) {
      setSelectedBrand({
        id: activity.vendorId,
        name: activity.vendorName,
        rating: 4.8,
        color: activity.color || "#EF4444",
      });
    } else if (selectedBrand.id !== activity.vendorId) {
      return { success: false, reason: 'brand_not_selected' };
    }

    if (selectedActivities.some((item) => item.id === activity.id)) {
      return { success: true };
    }

    if (selectedActivities.length >= activePlan.maxActivities) {
      setIsLimitModalOpen(true);
      return { success: false, reason: 'limit_reached' };
    }

    setSelectedActivities((prev) => [...prev, activity]);
    return { success: true };
  };

  const unselectActivity = (activityId: string) => {
    setSelectedActivities((prev) => prev.filter((item) => item.id !== activityId));
  };

  const isActivitySelected = (activityId: string) => {
    return selectedActivities.some((item) => item.id === activityId);
  };

  const canSelectActivity = (vendorId: string) => {
    if (selectedActivities.length >= activePlan.maxActivities) return false;
    if (selectedBrand && selectedBrand.id !== vendorId) return false;
    return true;
  };

  const canSelectBrand = (vendorId: string) => {
    if (!selectedBrand) return true;
    return selectedBrand.id === vendorId;
  };

  const openLimitModal = () => setIsLimitModalOpen(true);
  const closeLimitModal = () => setIsLimitModalOpen(false);

  // Invite Methods
  const sendEmployeeInvite = (newInvite: Omit<EmployeeInvite, 'id' | 'sentAt' | 'inviteCode'>): EmployeeInvite => {
    const randomCode = `CS-INV-${Math.floor(1000 + Math.random() * 9000)}-${newInvite.employeeName.substring(0, 2).toUpperCase()}`;
    const invite: EmployeeInvite = {
      ...newInvite,
      id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      inviteCode: randomCode,
      sentAt: new Date().toISOString().split('T')[0],
    };

    setEmployeeInvites((prev) => [invite, ...prev]);
    return invite;
  };

  const updateInviteStatus = (inviteId: string, status: EmployeeInvite['status']) => {
    setEmployeeInvites((prev) =>
      prev.map((item) => (item.id === inviteId ? { ...item, status } : item))
    );
  };

  const cancelEmployeeInvite = (inviteId: string) => {
    setEmployeeInvites((prev) =>
      prev.map((item) => (item.id === inviteId ? { ...item, status: 'Cancelled' } : item))
    );
  };

  const getInvitesForActivity = (activityId: string) => {
    return employeeInvites.filter((inv) => inv.activityId === activityId && inv.status !== 'Cancelled');
  };

  return (
    <SubscriptionContext.Provider
      value={{
        planName: activePlan.name,
        planType: activePlan.type,
        maxBrands: activePlan.maxBrands,
        maxActivities: activePlan.maxActivities,
        employeeSlotsPerActivity: activePlan.employeeSlotsPerActivity,
        selectedBrand,
        selectedActivities,
        isLimitModalOpen,
        isBrandLocked,
        isBrandChangeModalOpen,
        pendingBrandToSelect,
        employeeInvites,
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
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
