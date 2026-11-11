<script setup lang="ts">
import { PhArrowRight, PhSparkle } from '@phosphor-icons/vue';
import { personalityTypes } from '~/data/personalityTypes';
</script>

<template>
  <section id="personality" :style="{ padding: '5rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }">
    <div :style="{ position: 'absolute', top: '50%', right: '-100px', transform: 'translateY(-50%)', zIndex: 0 }">
      <BlobShape color="#8B5CF6" :opacity="0.04" :size="600" :variant="5" />
    </div>

    <div class="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16" :style="{ position: 'relative', zIndex: 1 }">
      <!-- Section Header -->
      <Motion
        class="text-center mb-10"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.5 }"
      >
        <span
          :style="{
            padding: '0.35rem 1.1rem',
            borderRadius: 'var(--radius-brand-sm)',
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.25)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#8B5CF6',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }"
        >
          Creative Personality
        </span>

        <h2
          :style="{
            fontSize: 'clamp(2rem, 4vw, 2.36rem)',
            fontWeight: 800,
            color: '#1A1A28',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            margin: '0.75rem 0',
          }"
        >
          Explore Your <span class="gradient-text-warm">Other Side</span>
        </h2>
        <p
          :style="{
            fontSize: '1.05rem',
            color: '#4A5568',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontWeight: 500,
          }"
        >
          Being CREATIVE is not just about being cool or artistic. It's an exploration of a person's other side.
        </p>
      </Motion>

      <!-- Unified Spotlight Half/Half Split Card -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.6 }"
        class="mb-12 bg-gradient-to-r from-slate-900 via-purple-950 to-cyan-950 rounded-3xl p-6 sm:p-8 shadow-xl text-white border border-purple-800/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div class="lg:col-span-6 space-y-4">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-brand-sm bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase"
          >
            <PhSparkle :size="14" />
            Powered by Acumen AI
          </div>

          <h3 class="text-xl sm:text-2xl font-extrabold text-white leading-snug">
            Are You the Original, Imaginative, Innovative, Expressive, or Explorer?
          </h3>

          <p class="text-xs sm:text-sm text-cyan-100/80 leading-relaxed">
            Take the test — Acumen AI matches your personality to custom service brands for your subscription.
          </p>

          <div class="pt-2">
            <NuxtLink
              to="/test"
              class="inline-flex items-center gap-2.5 px-6 py-3 rounded-brand bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-extrabold text-sm shadow-md transition-all hover:-translate-y-0.5"
            >
              Know Your Creative Personality
              <PhArrowRight :size="16" weight="bold" />
            </NuxtLink>
          </div>
        </div>

        <div class="lg:col-span-6 flex justify-center">
          <div class="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl w-full">
            <img
              :src="images.splitIndividualPersonality"
              alt="Half/Half Split Personality Visual"
              class="w-full h-auto object-cover max-h-[260px]"
            />
            <div
              class="absolute inset-x-0 bottom-0 p-2.5 bg-black/80 backdrop-blur-md flex justify-between items-center text-xs font-bold"
            >
              <span class="text-slate-300">Office Self</span>
              <span class="text-cyan-400">✦ Creative Expressive Self</span>
            </div>
          </div>
        </div>
      </Motion>

      <!-- 5 Archetype Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Motion
          v-for="(type, index) in personalityTypes"
          :key="type.name"
          :initial="{ opacity: 0, y: 40 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true, margin: '-40px' }"
          :transition="{ duration: 0.55, delay: index * 0.1 }"
          :while-hover="{ y: -6, transition: { duration: 0.2 } }"
          :style="{
            background: type.bg,
            border: `2px solid ${type.border}`,
            borderRadius: '20px 20px 90px 20px',
            padding: '2rem',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }"
        >
          <div
            :style="{
              width: '60px',
              height: '60px',
              borderRadius: '9999px',
              background: `${type.color}18`,
              border: `2px solid ${type.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '1.25rem',
            }"
          >
            {{ type.emoji }}
          </div>

          <h3 :style="{ fontSize: '1.2rem', fontWeight: 800, color: type.color, marginBottom: '0.5rem' }">
            {{ type.name }}
          </h3>
          <p :style="{ fontSize: '0.875rem', color: '#717182', lineHeight: 1.65, marginBottom: '1rem' }">
            {{ type.description }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="trait in type.traits"
              :key="trait"
              :style="{
                padding: '0.2rem 0.75rem',
                borderRadius: 'var(--radius-brand-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: type.color,
                background: `${type.color}12`,
              }"
            >
              {{ trait }}
            </span>
          </div>

          <div :style="{ marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${type.color}20` }">
            <p :style="{ fontSize: '0.75rem', fontWeight: 600, color: '#717182', marginBottom: '0.375rem' }">
              Activities you'd love:
            </p>
            <p :style="{ fontSize: '0.8rem', color: type.color, fontWeight: 600 }">{{ type.activities.join(' · ') }}</p>
          </div>

          <div :style="{ position: 'absolute', bottom: '-30px', right: '-30px', opacity: 0.07 }">
            <BlobShape :color="type.color" :size="180" :variant="1" :opacity="1" />
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
