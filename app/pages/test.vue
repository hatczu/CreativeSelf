<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhArrowLeft, PhArrowRight, PhSparkle, PhArrowCounterClockwise } from '@phosphor-icons/vue';
import type { PersonalityType } from '~/data/personalityTypes';
import { personalityMap, personalityQuestions as questions, type PersonalityKey } from '~/data/personalityTest';

const step = ref(0);
const answers = ref<number[]>([]);
const selected = ref<number | null>(null);
const result = ref<PersonalityType | null>(null);
const revealing = ref(false);

const q = computed(() => questions[step.value]!);
const progress = computed(() => (step.value / questions.length) * 100);

const handleNext = () => {
  if (selected.value === null) return;
  const newAnswers = [...answers.value, selected.value];
  answers.value = newAnswers;
  selected.value = null;

  if (step.value < questions.length - 1) {
    step.value += 1;
    return;
  }

  // Calculate result
  const scores: Record<PersonalityKey, number> = { original: 0, imaginative: 0, innovative: 0, expressive: 0, explorer: 0 };
  newAnswers.forEach((answerIdx, qIdx) => {
    const option = questions[qIdx]!.options[answerIdx]!;
    Object.entries(option.scores).forEach(([key, val]) => {
      scores[key as PersonalityKey] += val ?? 0;
    });
  });
  const topKey = (Object.keys(scores) as PersonalityKey[]).reduce((a, b) => (scores[a] >= scores[b] ? a : b));
  revealing.value = true;
  setTimeout(() => {
    result.value = personalityMap[topKey];
    revealing.value = false;
  }, 1200);
};

const handleBack = () => {
  step.value = Math.max(0, step.value - 1);
  selected.value = null;
};

const handleReset = () => {
  step.value = 0;
  answers.value = [];
  selected.value = null;
  result.value = null;
  revealing.value = false;
};

const onOptionEnter = (e: MouseEvent, i: number) => {
  if (selected.value !== i) applyStyles(e, { borderColor: '#33C4F0', background: 'rgba(51,196,240,0.1)' });
};
const onOptionLeave = (e: MouseEvent, i: number) => {
  if (selected.value !== i) applyStyles(e, { borderColor: 'rgba(51,196,240,0.2)', background: 'rgba(51,196,240,0.05)' });
};
</script>

<template>
  <!-- Revealing state -->
  <div
    v-if="revealing"
    :style="{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1A1A28 0%, #2D1B69 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
    }"
  >
    <Motion :initial="{ scale: 0.5, opacity: 0 }" :animate="{ scale: 1, opacity: 1 }" :transition="{ duration: 0.8, ease: 'easeOut' }">
      <DropletShape color="#33C4F0" :size="180" />
    </Motion>
    <Motion
      as="p"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 0.4 }"
      :style="{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 600 }"
    >
      Acumen is analyzing your results…
    </Motion>
  </div>

  <!-- Result -->
  <div
    v-else-if="result"
    :style="{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1A1A28 0%, #2D1B69 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 1.5rem 3rem',
    }"
  >
    <div :style="{ maxWidth: '700px', width: '100%' }">
      <Motion
        :initial="{ opacity: 0, y: 40, scale: 0.9 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.7 }"
        :style="{
          background: result.bg,
          borderRadius: '3.5rem 1.15rem 3.5rem 1.4rem',
          padding: '3rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }"
      >
        <!-- Big emoji -->
        <div :style="{ fontSize: '5rem', marginBottom: '1rem' }">{{ result.emoji }}</div>

        <div
          :style="{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            background: `${result.color}15`,
            border: `1.5px solid ${result.color}30`,
            fontSize: '0.8rem',
            fontWeight: 700,
            color: result.color,
            marginBottom: '1rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }"
        >
          Your Creative Type
        </div>

        <h1
          :style="{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: result.color,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }"
        >
          {{ result.name }}
        </h1>

        <p :style="{ fontSize: '1.05rem', color: '#3A3A4A', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }">
          {{ result.description }}
        </p>

        <!-- Traits -->
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <span
            v-for="trait in result.traits"
            :key="trait"
            :style="{
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: result.color,
              background: `${result.color}12`,
              border: `1px solid ${result.color}25`,
            }"
          >
            {{ trait }}
          </span>
        </div>

        <!-- Recommended activities -->
        <div
          :style="{
            background: 'rgba(255,255,255,0.6)',
            borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
            padding: '1.5rem',
            marginBottom: '2rem',
          }"
        >
          <p
            :style="{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#717182',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }"
          >
            Acumen Recommends
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <span
              v-for="activity in result.activities"
              :key="activity"
              :style="{
                padding: '0.35rem 0.875rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: result.color,
                color: '#ffffff',
              }"
            >
              {{ activity }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <NuxtLink
            to="/dashboard"
            :style="{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#ffffff',
              textDecoration: 'none',
              background: result.color,
              boxShadow: `0 8px 28px ${result.color}40`,
            }"
          >
            Explore Your Dashboard
            <PhArrowRight :size="16" />
          </NuxtLink>
          <button
            :style="{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              borderRadius: '9999px',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: result.color,
              background: `${result.color}12`,
              border: `1.5px solid ${result.color}25`,
              cursor: 'pointer',
            }"
            @click="handleReset"
          >
            <PhArrowCounterClockwise :size="14" />
            Retake Test
          </button>
        </div>
      </Motion>
    </div>
  </div>

  <!-- Questions -->
  <div
    v-else
    :style="{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #F0FBFF 0%, #ffffff 60%, #F5F3FF 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 1.5rem 3rem',
      position: 'relative',
      overflow: 'hidden',
    }"
  >
    <!-- Decorative kaleidoscope -->
    <div :style="{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', opacity: 0.08, zIndex: 0 }">
      <ImageWithFallback :src="images.kaleidoscopeDrop" alt="" :style="{ width: '400px' }" />
    </div>

    <div :style="{ maxWidth: '640px', width: '100%', position: 'relative', zIndex: 1 }">
      <!-- Header -->
      <div class="text-center mb-10">
        <div
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            borderRadius: '9999px',
            background: 'rgba(51,196,240,0.1)',
            border: '1px solid rgba(51,196,240,0.3)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: '#1AB0DC',
            marginBottom: '1.25rem',
          }"
        >
          <PhSparkle :size="13" />
          Powered by Acumen AI
        </div>
        <h1
          :style="{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: '#1A1A28',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }"
        >
          Creative Personality Test
        </h1>
        <p :style="{ color: '#717182', fontSize: '1rem', lineHeight: 1.6 }">5 questions · Takes about 3 minutes</p>
      </div>

      <!-- Progress bar -->
      <div
        :style="{
          height: '6px',
          borderRadius: '9999px',
          background: 'rgba(51,196,240,0.15)',
          marginBottom: '2.5rem',
          overflow: 'hidden',
        }"
      >
        <Motion
          :style="{ height: '100%', borderRadius: '9999px', background: 'linear-gradient(90deg, #33C4F0 0%, #8B5CF6 100%)' }"
          :initial="{ width: '0%' }"
          :animate="{ width: `${progress}%` }"
          :transition="{ duration: 0.4, ease: 'easeOut' }"
        />
      </div>

      <!-- Question -->
      <AnimatePresence mode="wait">
        <Motion
          :key="step"
          :initial="{ opacity: 0, x: 40 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -40 }"
          :transition="{ duration: 0.35 }"
        >
          <div
            :style="{
              background: '#ffffff',
              borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
              padding: '2.5rem',
              boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
              border: '1.5px solid rgba(51,196,240,0.12)',
            }"
          >
            <p
              :style="{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#33C4F0',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }"
            >
              Question {{ step + 1 }} of {{ questions.length }}
            </p>
            <h2 :style="{ fontSize: '1.35rem', fontWeight: 800, color: '#1A1A28', lineHeight: 1.35, marginBottom: '1.75rem' }">
              {{ q.question }}
            </h2>

            <div class="flex flex-col gap-3">
              <button
                v-for="(option, i) in q.options"
                :key="i"
                :style="{
                  padding: '1rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: selected === i ? 700 : 500,
                  color: selected === i ? '#ffffff' : '#2A2A3A',
                  background: selected === i ? 'linear-gradient(135deg, #33C4F0 0%, #8B5CF6 100%)' : 'rgba(51,196,240,0.05)',
                  border: selected === i ? 'none' : '2px solid rgba(51,196,240,0.2)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  boxShadow: selected === i ? '0 6px 24px rgba(51,196,240,0.35)' : 'none',
                }"
                @click="selected = i"
                @mouseenter="onOptionEnter($event, i)"
                @mouseleave="onOptionLeave($event, i)"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </Motion>
      </AnimatePresence>

      <!-- Navigation -->
      <div class="flex justify-between items-center mt-6">
        <button
          :disabled="step === 0"
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: step === 0 ? '#ccc' : '#717182',
            background: 'transparent',
            border: `1.5px solid ${step === 0 ? '#eee' : 'rgba(0,0,0,0.12)'}`,
            cursor: step === 0 ? 'not-allowed' : 'pointer',
          }"
          @click="handleBack"
        >
          <PhArrowLeft :size="16" />
          Back
        </button>

        <div class="flex gap-2">
          <div
            v-for="(_, i) in questions"
            :key="i"
            :style="{
              width: '8px',
              height: '8px',
              borderRadius: '9999px',
              background: i === step ? '#33C4F0' : i < step ? '#10B981' : 'rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
            }"
          />
        </div>

        <button
          :disabled="selected === null"
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#ffffff',
            background: selected !== null ? 'linear-gradient(135deg, #33C4F0 0%, #8B5CF6 100%)' : '#ccc',
            border: 'none',
            cursor: selected !== null ? 'pointer' : 'not-allowed',
            boxShadow: selected !== null ? '0 6px 20px rgba(51,196,240,0.35)' : 'none',
            transition: 'all 0.2s ease',
          }"
          @click="handleNext"
        >
          {{ step === questions.length - 1 ? 'Reveal My Type' : 'Next' }}
          <PhArrowRight :size="16" />
        </button>
      </div>

      <!-- Back to home -->
      <div class="text-center mt-8">
        <NuxtLink
          to="/"
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.85rem',
            color: '#717182',
            textDecoration: 'none',
          }"
        >
          <PhArrowLeft :size="13" />
          Back to CreativeSelf
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
