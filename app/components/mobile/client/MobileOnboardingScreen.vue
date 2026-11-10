<script setup lang="ts">
import { computed } from 'vue';
import { onboardingSlides } from '~/data/clientMobileData';

const app = useClientMobileApp();
const slide = computed(() => onboardingSlides[app.onboardingStep]!);

const handleNext = () => {
  if (app.onboardingStep < onboardingSlides.length - 1) {
    app.onboardingStep += 1;
  } else {
    app.regStep = 1;
    app.setActiveScreen('register');
  }
};
</script>

<template>
  <div class="relative flex flex-col h-full bg-[#F7FCFF] text-[#1A1A28] justify-between overflow-hidden font-sans isolate">
    <!-- 1. BOTTOM LAYER: Prism Kaleidoscope Top Graphic -->
    <div
      class="absolute top-[-260px] sm:top-[-280px] left-1/2 -translate-x-1/2 w-[560px] h-[560px] sm:w-[660px] sm:h-[660px] pointer-events-none z-10 flex items-center justify-center"
    >
      <div class="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
        <img :src="images.kaleidoscopeDrop" alt="CreativeSelf Kaleidoscope Prism" class="w-full h-full object-cover scale-110 rotate-[2.3deg]" />
      </div>
    </div>

    <!-- 2. MIDDLE LAYER: Soft Cyan Blur Overlay -->
    <div
      class="absolute top-[-40px] left-0 right-0 h-[220px] pointer-events-none z-20"
      :style="{
        background: 'linear-gradient(180deg, rgba(247, 252, 255, 0.92) 0%, rgba(247, 252, 255, 0.7) 55%, rgba(247, 252, 255, 0) 100%)',
        filter: 'blur(45px)',
      }"
    />

    <!-- 3. TOP LAYER: CreativeSelf Logo -->
    <div class="absolute top-[40px] sm:top-[50px] left-1/2 -translate-x-1/2 pointer-events-none z-30 flex items-center justify-center">
      <img :src="images.logo" alt="CreativeSelf Logo" class="w-16 h-16 sm:w-18 sm:h-18 object-contain drop-shadow-lg" />
    </div>

    <!-- Bottom Gradient Accent Row -->
    <div
      class="absolute bottom-0 left-0 right-0 h-[135px] pointer-events-none z-0"
      :style="{ background: 'linear-gradient(180deg, #33C4F0 0%, rgba(255, 255, 255, 0) 100%)', opacity: 0.2, transform: 'scaleY(-1)' }"
    />

    <!-- Upper Right Teardrop Watermark Shape -->
    <div
      class="absolute left-[285px] bottom-[395px] w-[135px] h-[135px] pointer-events-none z-5 transition-all duration-500"
      :style="{ background: slide.accentGradient, opacity: 0.25, borderRadius: '999px 0px 999px 999px' }"
    />

    <!-- Top Skip Button Header -->
    <div class="relative z-30 flex items-center justify-end p-5 pt-3">
      <button
        class="text-[14px] font-medium text-white transition py-1 px-3 rounded-full hover:opacity-80 drop-shadow-md"
        style="font-family: Poppins, sans-serif"
        @click="app.handleDemoLogin('client')"
      >
        Skip
      </button>
    </div>

    <!-- Spacer positioning text lower down -->
    <div class="h-[265px] sm:h-[285px] shrink-0 z-3 pointer-events-none" />

    <!-- Middle Onboarding Content Box -->
    <div class="relative z-10 flex flex-col justify-start items-center px-6 flex-1 text-center overflow-y-auto">
      <div class="space-y-2.5 w-full max-w-[320px] pt-2">
        <Motion
          :key="`title-${app.onboardingStep}`"
          as="h2"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3 }"
          class="text-[24px] font-bold text-[#1A1A28] leading-[29px] tracking-tight"
          style="font-family: Century Gothic, Poppins, sans-serif"
        >
          {{ slide.titlePrefix }}<span :style="{ color: slide.highlightColor }">{{ slide.titleHighlight }}</span>
        </Motion>

        <Motion
          :key="`sub-${app.onboardingStep}`"
          as="p"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3, delay: 0.05 }"
          class="text-[14px] font-normal text-[#6A7282] leading-[21px]"
          style="font-family: Poppins, sans-serif"
        >
          {{ slide.subtext }}
        </Motion>
      </div>
    </div>

    <!-- Pinned Bottom Action Group -->
    <div class="relative z-20 shrink-0 px-6 pb-6 pt-2 flex flex-col items-center gap-3 w-full">
      <!-- Row of Pagination Dots -->
      <div class="flex items-center justify-center gap-1.5 h-2 mb-1">
        <button
          v-for="(s, idx) in onboardingSlides"
          :key="idx"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :style="{ backgroundColor: idx === app.onboardingStep ? s.buttonColor : '#D9D9D9' }"
          :aria-label="`Go to onboarding slide ${idx + 1}`"
          @click="app.onboardingStep = idx"
        />
      </div>

      <!-- Main Action Button -->
      <button
        class="w-full max-w-[340px] h-[46px] flex items-center justify-center text-white text-[14px] font-bold transition-all duration-200 active:scale-[0.99] hover:opacity-95"
        :style="{
          backgroundColor: slide.buttonColor,
          borderRadius: '26px 26px 62px 26px',
          boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
          fontFamily: 'Century Gothic, Poppins, sans-serif',
        }"
        @click="handleNext"
      >
        {{ slide.buttonText }}
      </button>

      <!-- Footer Login Link -->
      <button
        class="text-[14px] font-medium text-[#6A7282] hover:text-[#1A1A28] transition"
        style="font-family: Poppins, sans-serif"
        @click="app.setActiveScreen('login')"
      >
        Already have an account? <span class="text-[#00B0D9] font-medium underline">Log in</span>
      </button>
    </div>
  </div>
</template>
