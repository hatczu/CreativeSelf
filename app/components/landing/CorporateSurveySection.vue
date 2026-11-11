<script setup lang="ts">
import { PhSparkle, PhArrowRight, PhCheckCircle, PhUsersThree } from '@phosphor-icons/vue';

const features = [
  'Group/Team Half & Half Personality Mapping',
  'Culture Crisis & Burnout Assessment Report',
  'Tailored Employee Engagement Action Plan',
];
</script>

<template>
  <section
    id="corporate-survey"
    :style="{
      padding: '6rem 0',
      background: 'linear-gradient(160deg, #1A1A28 0%, #2D1B69 60%, #0D3A52 100%)',
      position: 'relative',
      overflow: 'hidden',
    }"
  >
    <!-- Background ambient glow -->
    <div
      class="pulse-glow"
      :style="{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        borderRadius: '9999px',
        background: 'radial-gradient(circle, rgba(51,196,240,0.15) 0%, transparent 70%)',
        zIndex: 0,
      }"
    />

    <div class="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16" :style="{ position: 'relative', zIndex: 1 }">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Left Side: Headline & Acumen AI Survey CTA -->
        <Motion
          :initial="{ opacity: 0, x: -40 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
          class="lg:col-span-6 space-y-6 text-white text-left"
        >
          <!-- Acumen Badge -->
          <div
            class="inline-flex items-center gap-2 px-4 py-1.5 rounded-brand-sm bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider"
          >
            <PhSparkle :size="14" class="text-cyan-400" />
            Powered by Acumen AI
          </div>

          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            Take the Free Corporate Creativity Survey!
          </h2>

          <p class="text-base sm:text-lg text-cyan-100/80 leading-relaxed font-medium">
            Discover your organization's collective creative archetype, uncover hidden innovation potential, and measure
            group engagement dynamics across all teams.
          </p>

          <div class="space-y-3 pt-2">
            <div v-for="feature in features" :key="feature" class="flex items-center gap-3 text-sm text-slate-200 font-semibold">
              <PhCheckCircle :size="18" class="text-emerald-400 shrink-0" />
              <span>{{ feature }}</span>
            </div>
          </div>

          <div class="pt-4">
            <NuxtLink
              to="/corporate"
              class="inline-flex items-center gap-3 px-8 py-4 rounded-brand bg-gradient-to-r from-cyan-400 via-cyan-300 to-white text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
            >
              <PhUsersThree :size="22" weight="bold" />
              Start Corporate Survey — Free
              <PhArrowRight :size="20" weight="bold" />
            </NuxtLink>
          </div>
        </Motion>

        <!-- Right Side: Half/Half Personality by Group Visual -->
        <Motion
          :initial="{ opacity: 0, x: 40 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
          class="lg:col-span-6 flex justify-center"
        >
          <div class="relative group w-full max-w-lg">
            <div
              class="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500"
            ></div>
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900">
              <img
                :src="images.splitGroupPersonality"
                alt="Half/Half Personality by Group Visual"
                class="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 max-h-[380px]"
              />
              <div class="absolute bottom-0 inset-x-0 p-4 bg-slate-950/85 backdrop-blur-md text-white border-t border-white/10">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs font-bold text-cyan-400 uppercase tracking-wider">Group Personality Dynamics</p>
                    <p class="text-sm font-extrabold text-white">Half/Half Personality by Group Visual</p>
                  </div>
                  <span class="px-3 py-1 bg-purple-500/80 backdrop-blur-md rounded-brand-sm text-xs font-bold">
                    Team Acumen Analysis
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
