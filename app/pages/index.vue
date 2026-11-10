<script setup lang="ts">
const { openRegister } = useRegister();
</script>

<template>
  <div class="landing-page overflow-hidden">
    <!-- 1. Hero Section -->
    <HeroSection @open-register="openRegister()" />

    <!-- 2. Section: Carousel Type (Carousel 1: NEW & CREATIVE + Carousel 2: eZine Cover) -->
    <HeroCarouselSection />

    <!-- 3. Section: Creativity for Well-being and Enhanced Work Performance -->
    <WellbeingSection />

    <!-- 4. Section: Explore Your Other Side -->
    <PersonalitySection />

    <!-- 5. Section: Enable your business growth... (Corporate Engagement B2B) -->
    <CorporateSection />

    <!-- 6. Section: Take the free corporate creativity survey! -->
    <CorporateSurveySection />

    <!-- 7. Unified Pricing & Subscription Section (Toggled via Individual & Corporate Tabs) -->
    <PricingSection initial-tab="individual" :show-toggle="true" @select-plan="openRegister" />
  </div>
</template>
