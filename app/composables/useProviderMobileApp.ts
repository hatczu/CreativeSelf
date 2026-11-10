import { computed, inject, provide, reactive, ref, watch, type InjectionKey } from 'vue';
import type { NavBarStyle } from '~/composables/useClientMobileApp';
import { brandStories as defaultBrandStories } from '~/data/clientMobileData';
import {
  sampleProviderBookings,
  sampleProviderListings,
  type ProviderBooking,
  type ProviderService,
  type ProviderStory,
} from '~/data/providerMobileData';

export type ProviderTabType = 'home' | 'services' | 'bookings' | 'profile';

const TABS: ProviderTabType[] = ['home', 'services', 'bookings', 'profile'];
const NAVBAR_STYLE_KEY = 'cs_mobile_navbar_style';

const tabFromPath = (path: string): ProviderTabType | null => {
  const last = path.split('/').filter(Boolean).pop();
  return TABS.includes(last as ProviderTabType) ? (last as ProviderTabType) : null;
};

function createProviderMobileApp() {
  const route = useRoute();
  const router = useRouter();

  const activeTab = ref<ProviderTabType>(tabFromPath(route.path) ?? 'home');
  const servicesList = ref<ProviderService[]>(sampleProviderListings.map((s) => ({ ...s })));
  const bookingsList = ref<ProviderBooking[]>(sampleProviderBookings.map((b) => ({ ...b })));
  const brandStories = ref<ProviderStory[]>([...defaultBrandStories]);

  // Modals
  const showServiceModal = ref(false);
  const selectedBooking = ref<ProviderBooking | null>(null);
  const showQRScanner = ref(false);
  const showStoryComposer = ref(false);

  // Nav bar preference (shared with the client mobile app)
  const navBarStyle = ref<NavBarStyle>(
    ((typeof localStorage !== 'undefined' && localStorage.getItem(NAVBAR_STYLE_KEY)) as NavBarStyle) || 'liquid-glass-icon',
  );
  const setNavBarStyle = (style: NavBarStyle) => {
    navBarStyle.value = style;
    try {
      localStorage.setItem(NAVBAR_STYLE_KEY, style);
    } catch {
      /* ignore */
    }
  };

  watch(
    () => route.path,
    (path) => {
      const tab = tabFromPath(path);
      if (tab) activeTab.value = tab;
    },
  );

  const setActiveTab = (tab: ProviderTabType) => {
    activeTab.value = tab;
    router.push(route.path.startsWith('/vendor/mobile') ? `/vendor/mobile/${tab}` : `/mobile/provider/${tab}`);
  };

  const saveService = (service: ProviderService) => {
    servicesList.value = [service, ...servicesList.value];
  };

  const changeBookingStatus = (bookingId: string, status: 'Confirmed' | 'Declined') => {
    bookingsList.value = bookingsList.value.map((b) => (b.id === bookingId || b.session === bookingId ? { ...b, status } : b));
  };

  const addStory = (story: ProviderStory) => {
    brandStories.value = [story, ...brandStories.value];
  };

  const pendingBookingCount = computed(() => bookingsList.value.filter((b) => b.status === 'Needs response').length);

  return reactive({
    activeTab,
    setActiveTab,
    servicesList,
    bookingsList,
    brandStories,
    pendingBookingCount,
    showServiceModal,
    selectedBooking,
    showQRScanner,
    showStoryComposer,
    navBarStyle,
    setNavBarStyle,
    saveService,
    changeBookingStatus,
    addStory,
  });
}

export type ProviderMobileApp = ReturnType<typeof createProviderMobileApp>;

const PROVIDER_MOBILE_APP_KEY: InjectionKey<ProviderMobileApp> = Symbol('provider-mobile-app');

/** Create the provider mobile app state and make it available to descendant components. */
export function provideProviderMobileApp() {
  const app = createProviderMobileApp();
  provide(PROVIDER_MOBILE_APP_KEY, app);
  return app;
}

/** Access the provider mobile app state from any provider screen component. */
export function useProviderMobileApp() {
  const app = inject(PROVIDER_MOBILE_APP_KEY);
  if (!app) throw new Error('useProviderMobileApp() must be used inside the provider mobile app page');
  return app;
}
