<script setup lang="ts">
import { ref } from 'vue';
import {
  PhTrendUp,
  PhUsers,
  PhHeart,
  PhBrain,
  PhTrophy,
  PhLightning,
  PhArrowRight,
  PhX,
  PhWarningCircle,
} from '@phosphor-icons/vue';

const painPoints = [
  { icon: '📉', label: 'ATTRACTION', description: 'Struggling to attract top creative talent in a competitive market.', color: '#EF4444' },
  { icon: '🚪', label: 'ATTRITION', description: 'High turnover costing you time, money, and institutional knowledge.', color: '#F97316' },
  { icon: '💔', label: 'CULTURAL CRISIS', description: 'Disconnected teams with no shared purpose or creative energy.', color: '#8B5CF6' },
  { icon: '😔', label: 'BURNOUT ISSUES', description: 'Exhausted employees delivering less, caring less, staying less.', color: '#3B82F6' },
];

const solutions = [
  { icon: PhTrendUp, label: 'Attract & Retain Talent', description: "Stand out as a company that invests in people's whole selves.", color: '#10B981' },
  { icon: PhHeart, label: 'Improve Company Culture', description: 'Build a creative, connected culture that people are proud of.', color: '#EF4444' },
  { icon: PhUsers, label: 'Boost Employee Engagement', description: 'Activate participation with experiences employees actually want.', color: '#33C4F0' },
  { icon: PhTrophy, label: 'Meaningful Recognition', description: 'Replace generic rewards with personalized creative experiences.', color: '#F59E0B' },
  { icon: PhBrain, label: 'Improve Well-being', description: 'Reduce burnout with structured creative decompression programs.', color: '#8B5CF6' },
  { icon: PhLightning, label: 'Increase Productivity', description: 'Creative teams are more innovative, collaborative, and efficient.', color: '#3B82F6' },
];

const showReadMoreModal = ref(false);
</script>

<template>
  <section
    id="corporate"
    :style="{
      padding: '6rem 0',
      background: 'linear-gradient(160deg, #F8FCFF 0%, #F5F3FF 100%)',
      position: 'relative',
      overflow: 'hidden',
    }"
  >
    <!-- Bg blobs -->
    <div :style="{ position: 'absolute', top: '-80px', right: '-60px', zIndex: 0 }">
      <BlobShape color="#33C4F0" :opacity="0.06" :size="500" :variant="2" />
    </div>
    <div :style="{ position: 'absolute', bottom: '-80px', left: '-60px', zIndex: 0 }">
      <BlobShape color="#8B5CF6" :opacity="0.05" :size="450" :variant="4" />
    </div>

    <div class="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16" :style="{ position: 'relative', zIndex: 1 }">
      <!-- Label -->
      <Motion
        class="flex justify-center mb-4"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
      >
        <span
          :style="{
            padding: '0.35rem 1.1rem',
            borderRadius: '9999px',
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.25)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#8B5CF6',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }"
        >
          B2B Enterprise Solutions
        </span>
      </Motion>

      <!-- Headline -->
      <Motion
        class="text-center mb-12"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ delay: 0.1 }"
      >
        <h2
          :style="{
            fontSize: 'clamp(1.85rem, 4.2vw, 2.75rem)',
            fontWeight: 800,
            color: '#1A1A28',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            maxWidth: '920px',
            margin: '0 auto 1.25rem',
          }"
        >
          Enable your business growth, boost productivity, and empower your teams to be more creative and engaged
        </h2>

        <p
          :style="{
            fontSize: '1.1rem',
            color: '#4A5568',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.7,
            fontWeight: 500,
          }"
        >
          Attract and retain top talent, and enhance culture, rewards, and recognition with a custom, unique Creative
          Employee Engagement Solution.
        </p>
      </Motion>

      <!-- Teardrop Branded Corporate Challenge Spotlight Box -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ delay: 0.2 }"
        :style="{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 60%, #064E3B 100%)',
          borderRadius: '3rem 1.25rem 3rem 3rem',
          padding: '2.5rem 2.25rem',
          border: '2px solid rgba(51, 196, 240, 0.3)',
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.35)',
          position: 'relative',
          overflow: 'hidden',
        }"
        class="mb-14 text-white"
      >
        <!-- Ambient background drop glow -->
        <div :style="{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.15, pointerEvents: 'none' }">
          <BlobShape color="#33C4F0" :size="260" :variant="1" :opacity="1" />
        </div>

        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div class="flex items-start gap-5">
            <!-- Teardrop Icon Container -->
            <div
              :style="{
                width: '64px',
                height: '64px',
                borderRadius: '1.75rem 1.75rem 0.5rem 1.75rem',
                background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
              }"
              class="flex items-center justify-center shrink-0 text-white"
            >
              <PhWarningCircle :size="36" weight="bold" />
            </div>

            <div class="space-y-3">
              <div
                class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider"
              >
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Corporate Challenge Alert
              </div>

              <h3 class="text-xl sm:text-2xl font-extrabold text-white leading-snug max-w-2xl">
                Is your organization experiencing challenges in:
              </h3>

              <!-- Challenge Pills -->
              <div class="flex flex-wrap items-center gap-2 pt-1">
                <span
                  class="px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-extrabold tracking-wide flex items-center gap-1.5"
                >
                  <span class="text-sm">📉</span> ATTRACTION
                </span>
                <span
                  class="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold tracking-wide flex items-center gap-1.5"
                >
                  <span class="text-sm">🚪</span> ATTRITION
                </span>
                <span
                  class="px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-extrabold tracking-wide flex items-center gap-1.5"
                >
                  <span class="text-sm">💔</span> CULTURAL CRISIS
                </span>
                <span
                  class="px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-extrabold tracking-wide flex items-center gap-1.5"
                >
                  <span class="text-sm">😔</span> BURNOUT ISSUES
                </span>
              </div>
            </div>
          </div>

          <!-- Read More Action Button -->
          <button
            :style="{
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #33C4F0 0%, #8B5CF6 100%)',
              boxShadow: '0 8px 24px rgba(51, 196, 240, 0.4)',
            }"
            class="inline-flex items-center gap-2.5 px-8 py-4 text-white font-extrabold text-sm uppercase tracking-wider transition-all hover:scale-105 hover:shadow-cyan-500/50 shrink-0"
            @click="showReadMoreModal = true"
          >
            <span>READ MORE</span>
            <PhArrowRight :size="18" weight="bold" />
          </button>
        </div>
      </Motion>

      <!-- Pain points grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        <Motion
          v-for="(point, i) in painPoints"
          :key="point.label"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ delay: i * 0.1 }"
          :style="{
            background: '#ffffff',
            borderRadius: '2.5rem 1rem 2.5rem 2.5rem',
            padding: '1.75rem',
            border: `2px solid ${point.color}25`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }"
        >
          <div :style="{ fontSize: '2.25rem', marginBottom: '0.75rem' }">{{ point.icon }}</div>
          <h3 :style="{ fontSize: '1.05rem', fontWeight: 800, color: point.color, marginBottom: '0.375rem' }">
            {{ point.label }}
          </h3>
          <p :style="{ fontSize: '0.85rem', color: '#717182', lineHeight: 1.6 }">{{ point.description }}</p>
        </Motion>
      </div>

      <!-- Solutions grid -->
      <div class="mb-14">
        <Motion
          as="p"
          class="text-center mb-8"
          :style="{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '0.1em', color: '#33C4F0', textTransform: 'uppercase' }"
          :initial="{ opacity: 0 }"
          :while-in-view="{ opacity: 1 }"
          :in-view-options="{ once: true }"
        >
          How CreativeSelf Empowers Enterprise Growth
        </Motion>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Motion
            v-for="(solution, i) in solutions"
            :key="solution.label"
            :initial="{ opacity: 0, y: 30 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true }"
            :transition="{ delay: i * 0.08 }"
            :style="{
              background: '#ffffff',
              borderRadius: '2.5rem 1rem 2.5rem 2.5rem',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              border: '1.5px solid rgba(0,0,0,0.06)',
            }"
          >
            <div
              :style="{
                width: '48px',
                height: '48px',
                borderRadius: '9999px',
                background: `${solution.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }"
            >
              <component :is="solution.icon" :size="22" :color="solution.color" />
            </div>
            <div>
              <h4 :style="{ fontSize: '0.95rem', fontWeight: 700, color: '#1A1A28', marginBottom: '0.25rem' }">
                {{ solution.label }}
              </h4>
              <p :style="{ fontSize: '0.85rem', color: '#717182', lineHeight: 1.6 }">{{ solution.description }}</p>
            </div>
          </Motion>
        </div>
      </div>
    </div>

    <!-- READ MORE Detailed Corporate Modal -->
    <AnimatePresence>
      <div
        v-if="showReadMoreModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
      >
        <Motion
          :initial="{ opacity: 0, scale: 0.9, y: 20 }"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.9, y: 20 }"
          class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <button
            class="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
            @click="showReadMoreModal = false"
          >
            <PhX :size="20" weight="bold" />
          </button>

          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase">
              Enterprise Deep Dive
            </div>

            <h3 class="text-2xl font-extrabold text-slate-900 leading-snug">Creative Employee Engagement Solution</h3>

            <div class="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-200 space-y-2">
              <p class="text-sm font-bold text-slate-800">
                Attract and retain top talent, and enhance culture, rewards, and recognition with a custom, unique
                Creative Employee Engagement Solution.
              </p>
            </div>

            <div class="space-y-4 text-sm text-slate-600 leading-relaxed">
              <h4 class="font-bold text-slate-900 text-base">Key Solution Pillars:</h4>
              <ul class="space-y-2.5 list-disc list-inside">
                <li>
                  <strong class="text-slate-900">Custom Activity Subscription:</strong> Access to 11 curated service
                  brands tailored to employee personalities.
                </li>
                <li>
                  <strong class="text-slate-900">Corporate Decompression Workshops:</strong> Structured team retreats and
                  wellness sessions.
                </li>
                <li>
                  <strong class="text-slate-900">Acumen AI Culture Analytics:</strong> Continuous tracking of team
                  engagement, creativity growth, and burnout risks.
                </li>
                <li>
                  <strong class="text-slate-900">Personalized Employee Rewards:</strong> Swap generic gift cards for
                  inspiring creative experiences.
                </li>
              </ul>
            </div>

            <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                class="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
                @click="showReadMoreModal = false"
              >
                Close
              </button>
              <a
                href="#corporate-survey"
                class="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm shadow-md"
                @click="showReadMoreModal = false"
              >
                Take Free Corporate Survey
              </a>
            </div>
          </div>
        </Motion>
      </div>
    </AnimatePresence>
  </section>
</template>
