<script setup lang="ts">
import type { StyleValue } from 'vue';

const props = withDefaults(defineProps<{ color?: string; size?: number; opacity?: number; style?: StyleValue }>(), {
  color: '#33C4F0',
  size: 200,
  opacity: 1,
});
</script>

<template>
  <svg
    viewBox="0 0 200 240"
    :width="props.size"
    :height="props.size * 1.2"
    :style="[{ opacity: props.opacity }, props.style]"
    aria-hidden="true"
  >
    <path
      d="M100 10 C100 10, 170 90, 170 150 C170 193.8 138.8 225 100 225 C61.2 225 30 193.8 30 150 C30 90 100 10 100 10Z"
      :fill="props.color"
    />
  </svg>
</template>
