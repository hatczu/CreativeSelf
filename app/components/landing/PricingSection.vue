<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhSparkle } from '@phosphor-icons/vue';
import { corporatePlans, individualPlans } from '~/data/pricingPlans';
import type { RegisterCategory } from '~/composables/useRegister';

const props = withDefaults(defineProps<{ initialTab?: RegisterCategory; showToggle?: boolean }>(), {
  initialTab: 'individual',
  showToggle: true,
});
const emit = defineEmits<{ selectPlan: [planId: string, category: RegisterCategory] }>();

const tab = ref<RegisterCategory>(props.initialTab);
const plans = computed(() => (tab.value === 'individual' ? individualPlans : corporatePlans));
const tabs = ['individual', 'corporate'] as const;
</script>

<template>
  <section
    id="pricing"
    :style="{
      padding: '6rem 0',
      background: tab === 'individual' ? '#ffffff' : '#F8FCFF',
      position: 'relative',
      overflow: 'hidden',
    }"
  >
    <div class="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
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
            borderRadius: 'var(--radius-brand-sm)',
            background: tab === 'individual' ? 'rgba(51,196,240,0.1)' : 'rgba(139,92,246,0.1)',
            border: tab === 'individual' ? '1px solid rgba(51,196,240,0.25)' : '1px solid rgba(139,92,246,0.25)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: tab === 'individual' ? '#1AB0DC' : '#8B5CF6',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }"
        >
          {{ tab === 'individual' ? 'Individual Subscriptions' : 'Corporate Subscriptions' }}
        </span>
      </Motion>

      <Motion
        class="text-center mb-8"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ delay: 0.1 }"
      >
        <!-- Main Dynamic Headline -->
        <h2
          :style="{
            fontSize: 'clamp(1.85rem, 4.2vw, 2.58rem)',
            fontWeight: 800,
            color: '#1A1A28',
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
          }"
        >
          <template v-if="tab === 'individual'">
            Search. Find. Discover. <span class="gradient-text">Connect.</span>
          </template>
          <template v-else>
            Discover the Right <span class="gradient-text-warm">Corporate Subscription</span> for You
          </template>
        </h2>

        <!-- Tab Switcher Buttons -->
        <div
          v-if="showToggle"
          :style="{
            display: 'inline-flex',
            padding: '0.4rem',
            borderRadius: 'var(--radius-brand)',
            background: '#F0FBFF',
            border: '1.5px solid rgba(51,196,240,0.3)',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 16px rgba(51,196,240,0.1)',
          }"
        >
          <button
            v-for="t in tabs"
            :key="t"
            :style="{
              padding: '0.6rem 1.8rem',
              borderRadius: 'var(--radius-brand)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 700,
              transition: 'all 0.25s ease',
              background: tab === t ? (t === 'individual' ? '#33C4F0' : '#8B5CF6') : 'transparent',
              color: tab === t ? '#ffffff' : '#717182',
              boxShadow: tab === t ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
            }"
            @click="tab = t"
          >
            {{ t === 'individual' ? 'Individual Plans' : 'Corporate Plans' }}
          </button>
        </div>

        <!-- Sub-Tagline Box -->
        <AnimatePresence mode="wait">
          <Motion
            v-if="tab === 'individual'"
            key="ind-tag"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -10 }"
            class="max-w-xl mx-auto p-4 rounded-2xl bg-cyan-50/80 border border-cyan-100 mb-6 shadow-sm"
          >
            <p :style="{ fontSize: '1.05rem', fontWeight: 800, color: '#1AB0DC', marginBottom: '0.25rem' }">
              Individual Subscription Tier
            </p>
            <p :style="{ fontSize: '0.9rem', fontWeight: 600, color: '#4A5568' }">
              Choose the right creative activity and learning plan to empower you!
            </p>
          </Motion>
          <Motion
            v-else
            key="corp-tag"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -10 }"
            class="max-w-xl mx-auto p-4 rounded-2xl bg-purple-50/80 border border-purple-100 mb-6 shadow-sm"
          >
            <p :style="{ fontSize: '1.05rem', fontWeight: 800, color: '#8B5CF6', marginBottom: '0.25rem' }">
              Corporate Engagement Subscriptions
            </p>
            <p :style="{ fontSize: '0.9rem', fontWeight: 600, color: '#4A5568' }">
              Empower your teams with custom creative activities, learning plans, and consulting.
            </p>
          </Motion>
        </AnimatePresence>
      </Motion>

      <!-- Plans -->
      <AnimatePresence mode="wait">
        <Motion
          :key="tab"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -10 }"
          :transition="{ duration: 0.3 }"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
        >
          <PlanCard
            v-for="(plan, i) in plans"
            :key="plan.name"
            :plan="plan"
            :index="i"
            :category="tab"
            @select-plan="(id, cat) => emit('selectPlan', id, cat)"
          />
        </Motion>
      </AnimatePresence>

      <!-- Custom note -->
      <Motion
        class="text-center mt-10"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :in-view-options="{ once: true }"
        :transition="{ delay: 0.4 }"
      >
        <div
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.75rem',
            borderRadius: 'var(--radius-brand-sm)',
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.2)',
          }"
        >
          <PhSparkle :size="16" color="#8B5CF6" />
          <span :style="{ fontSize: '0.9rem', color: '#717182', fontWeight: 600 }">
            Custom Creative Activities, Learning Plans and Corporate Consulting.
          </span>
        </div>
      </Motion>
    </div>
  </section>
</template>
