<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { PhCaretLeft, PhCaretRight, PhSparkle, PhArrowRight, PhBookmarkSimple, PhBookOpen } from '@phosphor-icons/vue';

const activeIndex = ref(0);
const isAutoPlaying = ref(true);

let timer: ReturnType<typeof setInterval> | undefined;
watch(
  isAutoPlaying,
  (playing) => {
    if (timer) clearInterval(timer);
    timer = undefined;
    if (!playing) return;
    timer = setInterval(() => {
      activeIndex.value = activeIndex.value === 0 ? 1 : 0;
    }, 7000);
  },
  { immediate: true },
);
onBeforeUnmount(() => timer && clearInterval(timer));

const navButtonClass = (index: number) => [
  'w-10 h-10 rounded-brand-sm flex items-center justify-center transition-all',
  activeIndex.value === index
    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-200 scale-105'
    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50',
];
</script>

<template>
  <section
    id="hero-carousel"
    :style="{
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #F0FBFF 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden',
    }"
    @mouseenter="isAutoPlaying = false"
    @mouseleave="isAutoPlaying = true"
  >
    <div class="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
      <!-- Navigation / Indicators header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <span
            class="text-xs font-bold tracking-widest text-cyan-600 uppercase bg-cyan-100/80 px-3.5 py-1.5 rounded-brand-sm border border-cyan-300/50 flex items-center gap-1.5"
          >
            <PhSparkle :size="14" class="text-cyan-500" />
            Creative Self Spotlight
          </span>
          <span class="text-xs font-semibold text-slate-400">0{{ activeIndex + 1 }} / 02</span>
        </div>

        <div class="flex items-center gap-2">
          <button :class="navButtonClass(0)" aria-label="Carousel 1" @click="activeIndex = 0">
            <PhCaretLeft :size="18" weight="bold" />
          </button>
          <button :class="navButtonClass(1)" aria-label="Carousel 2" @click="activeIndex = 1">
            <PhCaretRight :size="18" weight="bold" />
          </button>
        </div>
      </div>

      <!-- Carousel Container -->
      <div class="relative min-h-[500px] bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 overflow-hidden">
        <AnimatePresence mode="wait">
          <!-- CAROUSEL 1 -->
          <Motion
            v-if="activeIndex === 0"
            key="carousel-1"
            :initial="{ opacity: 0, x: 40 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -40 }"
            :transition="{ duration: 0.55 }"
            class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div class="lg:col-span-6 space-y-5">
              <div
                class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-brand-sm bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider"
              >
                ✨ Empower Your Journey
              </div>

              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                Discover Something <span class="gradient-text">NEW</span> and
                <span class="gradient-text">CREATIVE</span> That Empowers Your Life and Career.
              </h2>

              <div class="p-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-100/70 space-y-2">
                <p class="text-lg font-bold text-cyan-900 italic">"You can be anything but square!"</p>
                <p class="text-base font-semibold text-purple-800">
                  It's never too late to be <span class="underline decoration-cyan-400 font-extrabold">CREATIVE</span>,
                  <span class="underline decoration-amber-400 font-extrabold">FREE</span> and more
                  <span class="underline decoration-emerald-400 font-extrabold">PRODUCTIVE</span>.
                </p>
              </div>

              <div class="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="#test"
                  class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-brand bg-cyan-500 hover:bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-300/50 transition-all hover:-translate-y-0.5"
                >
                  Start Persona Transformation
                  <PhArrowRight :size="18" />
                </a>
              </div>
            </div>

            <div class="lg:col-span-6 flex justify-center">
              <div class="relative group w-full max-w-lg">
                <div
                  class="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"
                ></div>
                <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                  <img
                    :src="images.creativePersona"
                    alt="Transitioning Creative Persona"
                    class="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
                  />
                  <div
                    class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent text-white"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-xs font-semibold text-cyan-300 uppercase tracking-widest">Persona Shift Visual</p>
                        <p class="text-sm font-bold text-white">Routine Self ➔ Vibrant Creative Persona</p>
                      </div>
                      <span class="px-3 py-1 bg-cyan-500/80 backdrop-blur-md rounded-brand-sm text-xs font-bold">
                        Interactive Shift
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Motion>

          <!-- CAROUSEL 2 -->
          <Motion
            v-else
            key="carousel-2"
            :initial="{ opacity: 0, x: 40 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -40 }"
            :transition="{ duration: 0.55 }"
            class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div class="lg:col-span-6 space-y-5">
              <div
                class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-brand-sm bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider"
              >
                <PhBookOpen :size="14" class="text-purple-600" />
                Monthly Creative Spotlight
              </div>

              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                Cover of the Month <span class="gradient-text-warm">eZine</span>
              </h2>

              <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
                Step inside this month's featured story of extraordinary transformation. See how everyday professionals
                unlock their secondary creative persona through CreativeSelf.
              </p>

              <div
                class="p-5 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 border border-purple-100 space-y-2"
              >
                <p class="text-xs font-extrabold text-purple-600 uppercase tracking-widest">
                  Featured Creative Person of the Month
                </p>
                <p class="text-xl font-bold text-slate-900">
                  "I stopped trying to fit into a square box. CreativeSelf revealed my inner Explorer."
                </p>
                <p class="text-xs text-slate-500 font-medium">— Maya Lin, Design Lead &amp; Visual Storyteller</p>
              </div>

              <div class="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-brand bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-300/50 transition-all hover:-translate-y-0.5"
                >
                  <PhBookmarkSimple :size="18" />
                  Read eZine Feature Issue
                </button>
              </div>
            </div>

            <div class="lg:col-span-6 flex justify-center">
              <div class="relative group w-full max-w-md">
                <div
                  class="absolute -inset-3 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500"
                ></div>
                <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                  <img
                    :src="images.ezineCover"
                    alt="Cover of the Month eZine"
                    class="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
                  />
                  <div
                    class="absolute top-4 left-4 px-3.5 py-1 bg-black/70 backdrop-blur-md rounded-brand-sm text-white text-xs font-bold border border-white/20"
                  >
                    ISSUE #12 · CREATIVE SELF
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        </AnimatePresence>

        <!-- Dots Indicator -->
        <div class="flex justify-center items-center gap-2 mt-8">
          <button
            :class="[
              'h-2.5 rounded-brand-sm transition-all duration-300',
              activeIndex === 0 ? 'w-8 bg-cyan-500' : 'w-2.5 bg-slate-200 hover:bg-slate-300',
            ]"
            aria-label="Go to slide 1"
            @click="activeIndex = 0"
          />
          <button
            :class="[
              'h-2.5 rounded-brand-sm transition-all duration-300',
              activeIndex === 1 ? 'w-8 bg-purple-500' : 'w-2.5 bg-slate-200 hover:bg-slate-300',
            ]"
            aria-label="Go to slide 2"
            @click="activeIndex = 1"
          />
        </div>
      </div>
    </div>
  </section>
</template>
