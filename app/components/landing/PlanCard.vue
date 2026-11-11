<script setup lang="ts">
import { PhCheck, PhArrowRight } from '@phosphor-icons/vue';
import type { PricingPlan } from '~/data/pricingPlans';
import type { RegisterCategory } from '~/composables/useRegister';

const props = defineProps<{ plan: PricingPlan; index: number; category: RegisterCategory }>();
const emit = defineEmits<{ selectPlan: [planId: string, category: RegisterCategory] }>();

const onEnter = (e: MouseEvent) => {
  if (!props.plan.highlighted) applyStyles(e, { background: props.plan.color, color: '#ffffff' });
  else applyStyles(e, { background: 'rgba(255,255,255,0.9)' });
};
const onLeave = (e: MouseEvent) => {
  if (!props.plan.highlighted) applyStyles(e, { background: `${props.plan.color}15`, color: props.plan.color });
  else applyStyles(e, { background: '#ffffff' });
};
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 40 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true }"
    :transition="{ duration: 0.5, delay: index * 0.1 }"
    :style="{
      borderRadius: '2.5rem 1.05rem 2.5rem 1.35rem',
      padding: '2rem',
      position: 'relative',
      background: plan.highlighted ? 'linear-gradient(160deg, #33C4F0 0%, #1A6FAD 100%)' : '#ffffff',
      border: plan.highlighted ? 'none' : `2px solid rgba(0,0,0,0.07)`,
      boxShadow: plan.highlighted ? '0 20px 60px rgba(51,196,240,0.4)' : '0 4px 20px rgba(0,0,0,0.05)',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div
      v-if="plan.highlighted"
      :style="{
        position: 'absolute',
        top: '-14px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '0.35rem 1rem',
        borderRadius: 'var(--radius-brand-sm)',
        background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#ffffff',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
      }"
    >
      ✦ Most Popular
    </div>

    <div :style="{ marginBottom: '1.5rem' }">
      <p
        :style="{
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: plan.highlighted ? 'rgba(255,255,255,0.75)' : plan.color,
          marginBottom: '0.5rem',
        }"
      >
        {{ plan.name }}
      </p>
      <div class="flex items-baseline gap-1">
        <span
          :style="{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: plan.highlighted ? '#ffffff' : '#1A1A28',
            letterSpacing: '-0.03em',
          }"
        >
          {{ plan.price }}
        </span>
        <span :style="{ fontSize: '0.875rem', color: plan.highlighted ? 'rgba(255,255,255,0.65)' : '#717182' }">
          {{ plan.sub }}
        </span>
      </div>
    </div>

    <ul :style="{ listStyle: 'none', padding: 0, margin: '0 0 2rem', flex: 1 }">
      <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2.5" :style="{ marginBottom: '0.75rem' }">
        <div
          :style="{
            width: '20px',
            height: '20px',
            borderRadius: '9999px',
            background: plan.highlighted ? 'rgba(255,255,255,0.2)' : `${plan.color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }"
        >
          <PhCheck :size="11" :color="plan.highlighted ? '#ffffff' : plan.color" weight="bold" />
        </div>
        <span
          :style="{ fontSize: '0.875rem', fontWeight: 500, color: plan.highlighted ? 'rgba(255,255,255,0.95)' : '#3A3A4A' }"
        >
          {{ feature }}
        </span>
      </li>
    </ul>

    <button
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%',
        padding: '0.875rem 1.5rem',
        borderRadius: 'var(--radius-brand)',
        fontSize: '0.95rem',
        fontWeight: 700,
        cursor: 'pointer',
        background: plan.highlighted ? '#ffffff' : `${plan.color}15`,
        color: plan.highlighted ? '#1A6FAD' : plan.color,
        border: plan.highlighted ? 'none' : `2px solid ${plan.color}30`,
        transition: 'all 0.2s ease',
      }"
      @click="emit('selectPlan', plan.id, category)"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      {{ plan.cta }}
      <PhArrowRight :size="16" />
    </button>
  </Motion>
</template>
