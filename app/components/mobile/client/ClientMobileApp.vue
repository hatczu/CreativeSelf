<script setup lang="ts">
import { PhX } from '@phosphor-icons/vue';

const app = provideClientMobileApp();
</script>

<template>
  <div class="w-full min-h-screen h-dvh bg-white text-slate-900 font-sans relative overflow-hidden flex flex-col items-center justify-center">
    <!-- MOBILE APPLICATION CONTAINER -->
    <div class="w-full h-full max-w-md mx-auto bg-white text-slate-900 overflow-hidden relative flex flex-col shrink-0">
      <div class="flex-1 overflow-hidden relative">
        <MobileOnboardingScreen v-if="app.activeScreen === 'onboarding'" />
        <MobileLoginScreen v-else-if="app.activeScreen === 'login'" />
        <MobileRegisterScreen v-else-if="app.activeScreen === 'register'" />

        <!-- MAIN CLIENT APP CONTENT (Tabs: Feed, Discover, Bookings, Profile) -->
        <div v-else class="flex flex-col h-full bg-white justify-between relative overflow-hidden">
          <!-- NOTIFICATION TOAST -->
          <AnimatePresence>
            <Motion
              v-if="app.bookingSuccessMsg"
              :initial="{ opacity: 0, y: -20 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -20 }"
              class="absolute top-14 inset-x-3 z-50 bg-[#10B981] text-white p-3.5 shadow-xl text-xs font-bold flex items-center justify-between rounded-2xl"
            >
              <span>{{ app.bookingSuccessMsg }}</span>
              <button @click="app.bookingSuccessMsg = null">
                <PhX :size="14" />
              </button>
            </Motion>
          </AnimatePresence>

          <MobileFeedScreen v-if="app.activeTab === 'feed'" />
          <MobileDiscoverScreen v-else-if="app.activeTab === 'discover'" />
          <MobileBookingsScreen v-else-if="app.activeTab === 'bookings'" />
          <MobileProfileScreen v-else-if="app.activeTab === 'profile'" />

          <MobileClientBottomNav />

          <!-- Full-screen overlays -->
          <MobileActivityDetailView />
          <MobilePostDetailView />
          <MobileBookingDetailView />
          <MobileQrPassModal />
          <MobileStoryViewerModal />
        </div>
      </div>
    </div>
  </div>
</template>
