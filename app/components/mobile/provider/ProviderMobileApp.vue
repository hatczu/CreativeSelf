<script setup lang="ts">
const app = provideProviderMobileApp();
</script>

<template>
  <div class="w-full min-h-screen h-dvh bg-white text-slate-900 font-sans relative overflow-hidden flex flex-col items-center justify-center">
    <!-- MOBILE APPLICATION CONTAINER -->
    <div class="w-full h-full max-w-md mx-auto bg-white text-slate-900 overflow-hidden relative flex flex-col shrink-0">
      <div class="flex-1 flex flex-col h-full overflow-hidden relative">
        <!-- TAB CONTENT SCREEN RENDER -->
        <ProviderMobileHomeScreen v-if="app.activeTab === 'home'" />
        <ProviderMobileServicesScreen v-else-if="app.activeTab === 'services'" />
        <ProviderMobileBookingsScreen v-else-if="app.activeTab === 'bookings'" />
        <ProviderMobileProfileScreen v-else-if="app.activeTab === 'profile'" />

        <ProviderMobileBottomNav />

        <!-- MODALS -->
        <ProviderMobileServiceModal />
        <ProviderMobileBookingModal />
        <ProviderMobileQRScannerModal />
        <ProviderMobileStoryComposerModal />
      </div>
    </div>
  </div>
</template>
