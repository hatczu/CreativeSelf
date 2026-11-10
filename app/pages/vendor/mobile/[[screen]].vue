<script setup lang="ts">
// Provider (vendor) mobile app. Reachable as /vendor/mobile/:screen? and /mobile/provider/:screen?
definePageMeta({
  layout: false,
  alias: ['/mobile/provider/:screen?'],
  // A fixed key keeps the app (and its in-memory state) mounted while the URL changes.
  key: 'provider-mobile-app',
});
</script>

<template>
  <ProviderMobileApp />
</template>
