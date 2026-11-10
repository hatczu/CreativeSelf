import { inject, provide, reactive, ref, watch, type InjectionKey } from 'vue';
import type { PostData } from '~/data/postsData';
import { mockActivities, type Activity } from '~/data/subscriptionData';
import { initialMobileBookings, type MobileBooking, type MobileComment } from '~/data/clientMobileData';

export type ScreenType = 'onboarding' | 'login' | 'register' | 'feed' | 'discover' | 'bookings' | 'profile';
export type TabType = 'feed' | 'discover' | 'bookings' | 'profile';
export type NavBarStyle = 'liquid-glass-icon' | 'liquid-glass-text' | 'liquid-glass-dark' | 'classic';

const SCREENS: ScreenType[] = ['onboarding', 'login', 'register', 'feed', 'discover', 'bookings', 'profile'];
const TABS: TabType[] = ['feed', 'discover', 'bookings', 'profile'];
const NAVBAR_STYLE_KEY = 'cs_mobile_navbar_style';

const isScreen = (value: unknown): value is ScreenType => typeof value === 'string' && SCREENS.includes(value as ScreenType);
const isTab = (value: unknown): value is TabType => typeof value === 'string' && TABS.includes(value as TabType);

function toggleIn(list: string[], id: string) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

/**
 * All state of the client mobile app. Created once by the mobile page and shared with
 * every screen component through provide/inject (replaces the React prop drilling).
 */
function createClientMobileApp() {
  const route = useRoute();
  const router = useRouter();

  const getScreenFromUrl = (): ScreenType => {
    const parts = route.path.split('/').filter(Boolean);
    const mobileIdx = parts.indexOf('mobile');
    const screenPart = mobileIdx !== -1 ? parts[mobileIdx + 1] : parts[0];
    if (isScreen(screenPart)) return screenPart;
    const q = route.query.screen;
    if (isScreen(q)) return q;
    return 'onboarding';
  };

  const initialScreen = getScreenFromUrl();
  const activeScreen = ref<ScreenType>(initialScreen);
  const activeTab = ref<TabType>(isTab(initialScreen) ? initialScreen : 'feed');

  // Client app state
  const selectedCategory = ref('all');
  const searchQuery = ref('');
  const selectedActivity = ref<Activity | null>(null);
  const selectedPost = ref<PostData | null>(null);
  const selectedBooking = ref<MobileBooking | null>(null);
  const selectedQrPass = ref<MobileBooking | null>(null);
  const savedActivityIds = ref<string[]>(['beginner-painting-workshop', 'desk-to-mat-yoga']);
  const likedPostIds = ref<string[]>(['breathe', 'colour']);
  const savedPostIds = ref<string[]>(['breathe', 'colour']);
  const postDetailImgIdx = ref(0);
  const postDetailCommentText = ref('');
  const postDetailComments = ref<Record<string, MobileComment[]>>({});
  const selectedBrandId = ref<string | null>(null);
  const activeStoryIdx = ref<number | null>(null);

  // Mobile nav bar style preference
  const navBarStyle = ref<NavBarStyle>(
    (safeStorage.get(NAVBAR_STYLE_KEY) as NavBarStyle | null) || 'liquid-glass-icon',
  );
  const setNavBarStyle = (style: NavBarStyle) => {
    navBarStyle.value = style;
    safeStorage.set(NAVBAR_STYLE_KEY, style);
  };

  // Onboarding / auth state
  const onboardingStep = ref(0);
  const emailInput = ref('');
  const passwordInput = ref('');
  const jobTitleInput = ref('');
  const regStep = ref(1);
  const regName = ref('');
  const regAccountType = ref<'individual' | 'corporate'>('individual');
  const orgSize = ref('just-me');
  const companyNameInput = ref('');
  const industryInput = ref('Technology & Design');
  const planCategory = ref<'individual' | 'corporate'>('individual');
  const selectedPlanId = ref('advanced-creative');

  // Bookings
  const myBookings = ref<MobileBooking[]>(initialMobileBookings.map((b) => ({ ...b })));
  const bookingSuccessMsg = ref<string | null>(null);
  const bookingSelectedSlot = ref('');

  const flash = (message: string) => {
    bookingSuccessMsg.value = message;
    setTimeout(() => (bookingSuccessMsg.value = null), 4000);
  };

  // Routing helpers
  const setSelectedBrandId = (brandId: string | null) => {
    selectedBrandId.value = brandId;
    router.push(brandId ? `/mobile/discover/${brandId}` : '/mobile/discover');
  };

  const setSelectedActivity = (act: Activity | null) => {
    selectedActivity.value = act;
    if (act) {
      const brandId = act.vendorId || selectedBrandId.value || 'services';
      router.push(`/mobile/discover/${brandId}/${act.id}`);
    } else if (selectedBrandId.value) {
      router.push(`/mobile/discover/${selectedBrandId.value}`);
    } else {
      router.push('/mobile/discover');
    }
  };

  const setActiveScreen = (screen: ScreenType) => {
    activeScreen.value = screen;
    if (isTab(screen)) activeTab.value = screen;
    router.push(`/mobile/${screen}`);
  };

  const setActiveTab = (tab: TabType) => {
    activeTab.value = tab;
    activeScreen.value = tab;
    if (tab === 'discover' && selectedBrandId.value) router.push(`/mobile/discover/${selectedBrandId.value}`);
    else router.push(`/mobile/${tab}`);
  };

  // Keep state in sync with the URL (back/forward navigation, deep links)
  watch(
    () => route.path,
    (path) => {
      const parts = path.split('/').filter(Boolean);
      const mobileIdx = parts.indexOf('mobile');
      const at = (offset: number) => (mobileIdx !== -1 ? parts[mobileIdx + offset] : parts[offset - 1]);
      const screenPart = at(1);

      if (screenPart === 'discover') {
        activeScreen.value = 'discover';
        activeTab.value = 'discover';
        const brandPart = at(2);
        const servicePart = at(3);
        selectedBrandId.value = brandPart || null;
        selectedActivity.value = servicePart ? mockActivities.find((a) => a.id === servicePart) || null : null;
      } else if (isTab(screenPart)) {
        activeScreen.value = screenPart;
        activeTab.value = screenPart;
        selectedBrandId.value = null;
        selectedActivity.value = null;
      }
    },
    { immediate: true },
  );

  const handleDemoLogin = (type: string) => {
    regName.value = type === 'corporate' ? 'Alex Morgan (Corporate Client)' : 'Sophia Chen (Individual Client)';
    emailInput.value = type.includes('@') ? type : 'sophia.chen@example.com';
    setActiveScreen('feed');
  };

  const handleConfirmBooking = (act: Activity) => {
    const newBooking: MobileBooking = {
      id: `bk-${Date.now()}`,
      activityName: act.name,
      vendorName: act.vendorName,
      vendorLogo: act.image || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      date: bookingSelectedSlot.value.split('•')[0]?.trim() || 'Tomorrow',
      time: bookingSelectedSlot.value.split('•')[1]?.trim() || '2:00 PM - 3:30 PM',
      location: act.location,
      status: 'Confirmed',
      seats: 1,
      color: act.color || '#33C4F0',
      symbol: act.symbol || '🎨',
      qrCode: `CS-${act.vendorId.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}-2026`,
      image: act.image,
    };
    myBookings.value = [newBooking, ...myBookings.value];
    setSelectedActivity(null);
    flash(`Successfully booked "${act.name}"!`);
  };

  const cancelBooking = (bookingId: string) => {
    myBookings.value = myBookings.value.filter((b) => b.id !== bookingId);
    flash('Booking cancelled and pass credit refunded.');
  };

  return reactive({
    // navigation
    activeScreen,
    activeTab,
    setActiveScreen,
    setActiveTab,
    // discover
    selectedCategory,
    searchQuery,
    selectedActivity,
    selectedBrandId,
    setSelectedActivity,
    setSelectedBrandId,
    savedActivityIds,
    toggleSaveActivity: (id: string) => (savedActivityIds.value = toggleIn(savedActivityIds.value, id)),
    // feed / posts
    selectedPost,
    likedPostIds,
    savedPostIds,
    toggleLikePost: (id: string) => (likedPostIds.value = toggleIn(likedPostIds.value, id)),
    toggleSavePost: (id: string) => (savedPostIds.value = toggleIn(savedPostIds.value, id)),
    postDetailImgIdx,
    postDetailCommentText,
    postDetailComments,
    activeStoryIdx,
    // bookings
    myBookings,
    selectedBooking,
    selectedQrPass,
    bookingSuccessMsg,
    bookingSelectedSlot,
    handleConfirmBooking,
    cancelBooking,
    flash,
    // preferences
    navBarStyle,
    setNavBarStyle,
    // onboarding / auth
    onboardingStep,
    emailInput,
    passwordInput,
    jobTitleInput,
    regStep,
    regName,
    regAccountType,
    orgSize,
    companyNameInput,
    industryInput,
    planCategory,
    selectedPlanId,
    handleDemoLogin,
  });
}

export type ClientMobileApp = ReturnType<typeof createClientMobileApp>;

const CLIENT_MOBILE_APP_KEY: InjectionKey<ClientMobileApp> = Symbol('client-mobile-app');

/** Create the client mobile app state and make it available to descendant components. */
export function provideClientMobileApp() {
  const app = createClientMobileApp();
  provide(CLIENT_MOBILE_APP_KEY, app);
  return app;
}

/** Access the client mobile app state from any screen component. */
export function useClientMobileApp() {
  const app = inject(CLIENT_MOBILE_APP_KEY);
  if (!app) throw new Error('useClientMobileApp() must be used inside the client mobile app page');
  return app;
}
