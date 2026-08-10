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

interface SubscriptionContextType {
  planName: string;
  maxBrands: number;
  maxActivities: number;
  selectedBrand: VendorBrand | null;
  selectedActivities: ActivityItem[];
  isLimitModalOpen: boolean;
  selectBrand: (vendor: VendorBrand) => void;
  unselectBrand: () => void;
  selectActivity: (activity: ActivityItem) => { success: boolean; reason?: 'brand_not_selected' | 'limit_reached' };
  unselectActivity: (activityId: string) => void;
  isActivitySelected: (activityId: string) => boolean;
  canSelectActivity: (vendorId: string) => boolean;
  canSelectBrand: (vendorId: string) => boolean;
  openLimitModal: () => void;
  closeLimitModal: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const STORAGE_KEY_BRAND = 'creative_self_selected_brand';
const STORAGE_KEY_ACTIVITIES = 'creative_self_selected_activities';

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const planName = "Basic Creative";
  const maxBrands = 1;
  const maxActivities = 2;

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
    return [];
  });

  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

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

  const selectBrand = (vendor: VendorBrand) => {
    if (selectedBrand && selectedBrand.id !== vendor.id) {
      setSelectedActivities([]);
    }
    setSelectedBrand(vendor);
  };

  const unselectBrand = () => {
    setSelectedBrand(null);
    setSelectedActivities([]);
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

    if (selectedActivities.length >= maxActivities) {
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
    if (selectedActivities.length >= maxActivities) return false;
    if (selectedBrand && selectedBrand.id !== vendorId) return false;
    return true;
  };

  const canSelectBrand = (vendorId: string) => {
    if (!selectedBrand) return true;
    return selectedBrand.id === vendorId;
  };

  const openLimitModal = () => setIsLimitModalOpen(true);
  const closeLimitModal = () => setIsLimitModalOpen(false);

  return (
    <SubscriptionContext.Provider
      value={{
        planName,
        maxBrands,
        maxActivities,
        selectedBrand,
        selectedActivities,
        isLimitModalOpen,
        selectBrand,
        unselectBrand,
        selectActivity,
        unselectActivity,
        isActivitySelected,
        canSelectActivity,
        canSelectBrand,
        openLimitModal,
        closeLimitModal,
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
