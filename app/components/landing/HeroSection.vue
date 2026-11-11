<script setup lang="ts">
import { PhArrowRight, PhSparkle } from '@phosphor-icons/vue';

const emit = defineEmits<{ openRegister: [] }>();

const personalityTags = [
  { label: 'The Original', color: '#F59E0B' },
  { label: 'The Imaginative', color: '#3B82F6' },
  { label: 'The Innovative', color: '#10B981' },
  { label: 'The Expressive', color: '#EF4444' },
  { label: 'The Explorer', color: '#8B5CF6' },
];

const positions: Record<string, string>[] = [
  { top: '5%', left: '5%' },
  { top: '10%', right: '2%' },
  { bottom: '15%', left: '0%' },
  { bottom: '5%', right: '8%' },
  { top: '45%', right: '-5%' },
];
</script>

<template>
  <section
    id="hero"
    :style="{
      minHeight: 'min(100vh, 820px)',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #F0FBFF 0%, #ffffff 50%, #F8F0FF 100%)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '7rem',
      paddingBottom: '4rem',
    }"
  >
    <!-- Background blobs -->
    <div :style="{ position: 'absolute', top: '-100px', right: '-80px', zIndex: 0 }" class="pulse-glow">
      <BlobShape color="#33C4F0" :opacity="0.08" :size="600" :variant="2" />
    </div>
    <div :style="{ position: 'absolute', bottom: '-120px', left: '-100px', zIndex: 0 }" class="blob-float">
      <BlobShape color="#8B5CF6" :opacity="0.06" :size="500" :variant="4" />
    </div>
    <div :style="{ position: 'absolute', top: '30%', left: '42%', zIndex: 0 }" class="blob-float">
      <BlobShape color="#F59E0B" :opacity="0.05" :size="300" :variant="3" />
    </div>

    <div class="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 w-full" :style="{ position: 'relative', zIndex: 1 }">
      <div class="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center">
        <!-- Left: Text content -->
        <div>
          <!-- Acumen badge -->
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5 }"
            class="mb-6"
          >
            <div
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1.1rem',
                borderRadius: '9999px',
                background: 'rgba(51,196,240,0.1)',
                border: '1px solid rgba(51,196,240,0.3)',
              }"
            >
              <PhSparkle :size="14" color="#33C4F0" />
              <span :style="{ fontSize: '0.8125rem', fontWeight: 700, color: '#1AB0DC', letterSpacing: '0.05em' }">
                Powered by Acumen AI
              </span>
            </div>
          </Motion>

          <!-- Headline -->
          <Motion
            as="h1"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.1 }"
            :style="{
              fontSize: 'clamp(2.5rem, 5.5vw, 3.61rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#1A1A28',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }"
          >
            Be Anything <br />
            <span class="gradient-text">But Square</span>
          </Motion>

          <!-- Description -->
          <Motion
            as="p"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.2 }"
            :style="{ fontSize: '1.15rem', fontWeight: 500, color: '#4A5568', marginBottom: '2rem', lineHeight: 1.6 }"
          >
            Creative employee engagement solutions, activities, and learning plans for corporate and individuals.
          </Motion>

          <!-- CTA buttons -->
          <Motion
            class="flex flex-wrap items-center gap-2.5"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.3 }"
          >
            <button
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #33C4F0 0%, #1A8EBF 100%)',
                boxShadow: '0 8px 28px rgba(51,196,240,0.45)',
                transition: 'all 0.25s ease',
              }"
              @click="emit('openRegister')"
              @mouseenter="applyStyles($event, { transform: 'translateY(-2px)', boxShadow: '0 12px 36px rgba(51,196,240,0.55)' })"
              @mouseleave="applyStyles($event, { transform: 'translateY(0)', boxShadow: '0 8px 28px rgba(51,196,240,0.45)' })"
            >
              Register Now
              <PhArrowRight :size="18" />
            </button>

            <NuxtLink
              to="/test"
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#2A2A3A',
                textDecoration: 'none',
                background: 'rgba(51,196,240,0.1)',
                border: '1.5px solid rgba(51,196,240,0.3)',
                transition: 'all 0.25s ease',
              }"
              @mouseenter="applyStyles($event, { background: 'rgba(51,196,240,0.2)' })"
              @mouseleave="applyStyles($event, { background: 'rgba(51,196,240,0.1)' })"
            >
              Creativity Test
            </NuxtLink>

            <NuxtLink
              to="/mobile"
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#147C9E',
                textDecoration: 'none',
                background: 'rgba(51,196,240,0.15)',
                border: '1.5px solid rgba(51,196,240,0.4)',
                boxShadow: '0 4px 16px rgba(51,196,240,0.2)',
                transition: 'all 0.25s ease',
              }"
              @mouseenter="applyStyles($event, { background: 'rgba(51,196,240,0.25)', transform: 'translateY(-2px)' })"
              @mouseleave="applyStyles($event, { background: 'rgba(51,196,240,0.15)', transform: 'translateY(0)' })"
            >
              📱 Mobile App
            </NuxtLink>
          </Motion>
        </div>

        <!-- Right: Kaleidoscope visual -->
        <div class="flex justify-center items-center" :style="{ position: 'relative' }">
          <!-- Cyan glow behind -->
          <div
            class="pulse-glow"
            :style="{
              position: 'absolute',
              width: '480px',
              height: '480px',
              borderRadius: '9999px',
              background: 'radial-gradient(circle, rgba(51,196,240,0.25) 0%, transparent 70%)',
              zIndex: 0,
            }"
          />

          <!-- Floating personality orbs -->
          <Motion
            v-for="(tag, i) in personalityTags"
            :key="tag.label"
            :style="{
              position: 'absolute',
              ...positions[i],
              zIndex: 2,
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.92)',
              boxShadow: `0 4px 20px ${tag.color}30`,
              border: `1.5px solid ${tag.color}40`,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: tag.color,
              whiteSpace: 'nowrap',
            }"
            :animate="{ y: [0, -8, 0] }"
            :transition="{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }"
          >
            {{ tag.label }}
          </Motion>

          <!-- Main kaleidoscope image -->
          <Motion
            class="float-animation"
            :style="{ position: 'relative', zIndex: 1 }"
            :initial="{ opacity: 0, scale: 0.85 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.8, delay: 0.3 }"
          >
            <ImageWithFallback
              :src="images.kaleidoscopeDrop"
              alt="CreativeSelf identity — a kaleidoscope of creative personalities"
              :style="{
                width: 'clamp(280px, 42vw, 480px)',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 24px 48px rgba(51,196,240,0.25))',
              }"
            />
          </Motion>
        </div>
      </div>
    </div>

    <!-- Wave bottom -->
    <div :style="{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 2 }">
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" :style="{ width: '100%', height: '70px', display: 'block' }">
        <path d="M0 35C360 70 720 0 1080 35L1440 20V70H0V35Z" fill="#F0FBFF" />
      </svg>
    </div>
  </section>
</template>
