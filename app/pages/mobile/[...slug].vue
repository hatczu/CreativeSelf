<script setup lang="ts">
// Client mobile app. Handles /mobile, /mobile/:screen, /mobile/discover/:brandId and
// /mobile/discover/:brandId/:serviceId — the app reads its screen state from the URL.
// A fixed key keeps the app (and its in-memory state) mounted while the URL changes.
definePageMeta({ layout: false, key: 'client-mobile-app' });
</script>

<template>
  <ClientMobileApp />
</template>
