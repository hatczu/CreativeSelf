<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  PhCalendarBlank,
  PhCheck,
  PhCaretRight,
  PhHeart,
  PhChatCircle,
  PhPlus,
  PhMagnifyingGlass,
  PhX,
  PhImages,
} from '@phosphor-icons/vue';
import { samplePostsData } from '~/data/postsData';

// The same feed powers both the individual dashboard and the corporate (HR) view.
definePageMeta({ alias: ['/corporate'] });

const filters = ['For your team', 'Movement', 'Creative reset', 'Learning', 'Food & connection'];

const route = useRoute();
const hrMode = computed(() => route.path.startsWith('/corporate'));
const filter = ref(filters[0]!);
const liked = ref<string[]>([]);
const saved = ref<string[]>([]);
const composerOpen = ref(false);
const providerTitle = ref('');
const published = ref(false);
const personalityOpen = ref(false);

const posts = samplePostsData.filter((p) => ['breathe', 'colour', 'rhythm', 'food'].includes(p.id));

const visiblePosts = computed(() =>
  filter.value === filters[0]
    ? posts
    : posts.filter((post) =>
        `${post.category} ${post.title}`.toLowerCase().includes(filter.value.split(' ')[0]!.toLowerCase()),
      ),
);
const feed = computed(() => (visiblePosts.value.length ? visiblePosts.value : posts.slice(0, 2)));

const toggleIn = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
const toggleSaved = (id: string) => (saved.value = toggleIn(saved.value, id));
const toggleLiked = (id: string) => (liked.value = toggleIn(liked.value, id));

const postImages = (post: (typeof posts)[number]) =>
  post.images && post.images.length > 0 ? post.images : post.image ? [post.image] : [];

const navigateToPostDetail = (postId: string) =>
  navigateTo(hrMode.value ? `/corporate/posts/${postId}` : `/posts/${postId}`);

const toggleComposer = () => {
  composerOpen.value = !composerOpen.value;
  published.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <UniversalSidebar />

    <div
      class="mx-auto grid max-w-[1320px] gap-6 px-5 pt-6 pb-28 sm:px-8 sm:pt-8 lg:gap-8 lg:py-10 lg:pb-14 lg:pl-[104px] lg:pr-10 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_260px]"
    >
      <aside class="hidden lg:block">
        <div
          class="sticky top-8 overflow-hidden bg-[#15343d] p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]"
          style="border-radius: 20px 20px 64px 20px"
        >
          <template v-if="!hrMode">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-white/45">Your creative compass</p>
            <div class="mt-5 grid h-16 w-16 place-items-center rounded-[22px_22px_32px_22px] bg-[#33c4f0] text-3xl">🧭</div>
            <p class="mt-5 text-2xl font-extrabold">The Explorer</p>
            <p class="mt-3 text-sm leading-6 text-white/65">
              New places, perspectives, and possibilities keep your creativity moving.
            </p>
            <button
              type="button"
              class="mt-6 inline-flex items-center gap-1 text-xs font-extrabold text-[#33c4f0]"
              @click="personalityOpen = true"
            >
              View your profile <PhCaretRight :size="14" />
            </button>
            <div class="mt-7 border-t border-white/10 pt-5">
              <p class="text-xs font-bold text-white/45">THIS MONTH</p>
              <p class="mt-2 text-sm font-bold">2 sessions still to explore</p>
            </div>
          </template>
          <template v-else>
            <p class="text-xs font-bold uppercase tracking-[.14em] text-white/45">Team wellbeing</p>
            <p class="mt-5 text-2xl font-extrabold">The good kind of momentum.</p>
            <p class="mt-3 text-sm leading-6 text-white/65">
              Discover sessions that make room for energy, connection, and fresh ideas.
            </p>
          </template>
        </div>
      </aside>

      <main class="min-w-0">
        <header class="mb-6 overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex items-start justify-between gap-5">
            <div>
              <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">
                {{ hrMode ? 'Team wellbeing marketplace' : 'Your wellbeing feed' }}
              </p>
              <h1 class="mt-2 text-3xl font-extrabold leading-tight">
                {{ hrMode ? 'Bring something good to the team.' : 'A little more you, today.' }}
              </h1>
              <p class="mt-2 max-w-xl text-sm leading-6 text-[#717182]">
                Fresh offers, ideas, and bookable sessions from trusted CreativeSelf providers.
              </p>
            </div>
            <button
              v-if="hrMode"
              type="button"
              class="shrink-0 rounded-full bg-[#1a1a28] p-3 text-white"
              aria-label="Publish a post"
              @click="toggleComposer"
            >
              <PhPlus :size="18" />
            </button>
          </div>
          <div class="mt-5 inline-flex rounded-full bg-[#e8f9ff] px-4 py-2 text-xs font-bold text-[#147c9e]">Curated by Acumen AI</div>
        </header>

        <section
          v-if="!hrMode"
          class="mb-6 overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]"
          style="border-radius: 20px 20px 64px 20px"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-[.16em] text-white/45">Your creative plan</p>
              <p class="mt-1 text-lg font-extrabold">
                Advanced Creative
                <span class="ml-2 rounded-full bg-[#33c4f0] px-2.5 py-1 text-[10px] text-[#1a1a28]">Active</span>
              </p>
            </div>
            <p class="max-w-[13rem] text-right text-xs leading-5 text-white/50">Your plan renews on 31 Aug.</p>
          </div>
          <div class="mt-5 grid gap-3 sm:grid-cols-3">
            <NuxtLink
              to="/bookings"
              class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 no-underline transition hover:bg-white/[.12]"
            >
              <p class="text-2xl font-extrabold text-[#33c4f0]">2</p>
              <p class="mt-1 text-xs font-bold text-white">Upcoming bookings</p>
              <p class="mt-1 text-[11px] text-white/50">Next: Watercolour · Aug 8</p>
            </NuxtLink>
            <NuxtLink
              to="/discover/services"
              class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 no-underline transition hover:bg-white/[.12]"
            >
              <p class="text-2xl font-extrabold text-[#33c4f0]">2</p>
              <p class="mt-1 text-xs font-bold text-white">Services remaining</p>
              <p class="mt-1 text-[11px] text-white/50">Use them before month end</p>
            </NuxtLink>
            <NuxtLink
              to="/discover/providers"
              class="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 no-underline transition hover:bg-white/[.12]"
            >
              <div class="flex -space-x-2">
                <span class="grid h-7 w-7 place-items-center rounded-full border-2 border-[#1a1a28] bg-[#ef4444]/70 text-xs">🎨</span>
                <span class="grid h-7 w-7 place-items-center rounded-full border-2 border-[#1a1a28] bg-[#10b981]/70 text-xs">🧘</span>
              </div>
              <p class="mt-2 text-xs font-bold text-white">2 subscribed providers</p>
              <p class="mt-1 text-[11px] text-white/50">Heart of Art + Athletic Fanatics</p>
            </NuxtLink>
          </div>
        </section>

        <section v-if="composerOpen" class="mb-6 bg-[#1a1a28] p-5 text-white" style="border-radius: 20px 20px 64px 20px">
          <div v-if="published" class="flex items-center gap-3">
            <span class="grid h-10 w-10 place-items-center rounded-full bg-[#10b981]/20">
              <PhCheck class="text-[#10b981]" :size="18" />
            </span>
            <div>
              <p class="font-extrabold">Your provider post is live.</p>
              <p class="mt-1 text-sm text-white/60">HR teams can now discover it in their wellness feed.</p>
            </div>
          </div>
          <template v-else>
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="font-extrabold">Share a provider highlight</p>
                <p class="mt-1 text-sm text-white/60">Promote an activity, programme, or wellbeing insight to HR teams.</p>
              </div>
              <button type="button" class="text-sm text-white/60" @click="composerOpen = false">Close</button>
            </div>
            <input
              v-model="providerTitle"
              class="mt-5 w-full rounded-[14px_14px_36px_14px] border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder="What are you promoting?"
            />
            <div class="mt-3 flex flex-wrap gap-3">
              <label class="cursor-pointer rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white/70">
                <input type="file" accept="image/*" class="hidden" />
                Add image
              </label>
              <button
                type="button"
                :disabled="!providerTitle.trim()"
                class="rounded-full bg-[#33c4f0] px-4 py-2 text-xs font-extrabold text-[#1a1a28] disabled:cursor-not-allowed disabled:opacity-40"
                @click="published = true"
              >
                Publish to feed
              </button>
            </div>
          </template>
        </section>

        <div class="mb-5 flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="item in filters"
            :key="item"
            type="button"
            class="shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition"
            :style="{
              background: filter === item ? '#1a1a28' : '#fff',
              color: filter === item ? '#fff' : '#717182',
              borderColor: filter === item ? '#1a1a28' : 'rgba(51,196,240,.2)',
            }"
            @click="filter = item"
          >
            {{ item }}
          </button>
        </div>

        <div class="space-y-6">
          <article
            v-for="post in feed"
            :key="post.id"
            class="cursor-pointer group overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)] transition duration-300 hover:shadow-[0_18px_48px_rgba(28,118,155,.14)] hover:-translate-y-0.5"
            :style="{ borderRadius: post.featured ? '20px 20px 96px 20px' : '20px 20px 52px 20px' }"
            @click="navigateToPostDetail(post.id)"
          >
            <div class="flex items-center justify-between px-6 pt-6">
              <div class="flex items-center gap-3">
                <span class="grid h-11 w-11 place-items-center rounded-full text-xl" :style="{ background: `${post.color}18` }">
                  {{ post.emoji }}
                </span>
                <div>
                  <p class="text-sm font-extrabold group-hover:text-[#147c9e] transition">{{ post.provider }}</p>
                  <p class="text-xs text-[#717182]">{{ post.handle }} · {{ post.category }}</p>
                </div>
              </div>
              <button
                type="button"
                :aria-label="`Save ${post.title}`"
                class="rounded-full p-2 hover:bg-[#f2fbfe] transition"
                :style="{ color: saved.includes(post.id) ? post.color : '#717182' }"
                @click.stop="toggleSaved(post.id)"
              >
                <PhCheck :size="18" />
              </button>
            </div>

            <div
              v-if="postImages(post)[0] || post.image"
              class="relative mx-6 mt-5 h-44 overflow-hidden bg-[#edf8fb] sm:h-52"
              style="border-radius: 20px 20px 48px 20px"
            >
              <img
                :src="postImages(post)[0] || post.image"
                :alt="post.imageAlt ?? post.title"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div
                v-if="postImages(post).length > 1"
                class="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[#1a1a28]/75 px-3 py-1 text-xs font-extrabold text-white backdrop-blur-md shadow-sm"
              >
                <PhImages :size="14" />
                <span>{{ postImages(post).length }} photos</span>
              </div>
            </div>

            <div class="px-6 pb-6 pt-5">
              <p class="text-xs font-extrabold uppercase tracking-[.15em]" :style="{ color: post.color }">{{ post.date }}</p>
              <h2 class="mt-2 text-2xl font-extrabold leading-tight transition group-hover:text-[#147c9e]">{{ post.title }}</h2>
              <p class="mt-3 text-sm leading-6 text-[#717182] line-clamp-2">{{ post.copy }}</p>
              <div class="mt-5 flex flex-wrap items-center justify-between gap-2">
                <div class="flex flex-wrap items-center gap-2 text-xs font-bold text-[#717182]">
                  <span class="rounded-full bg-[#f2fbfe] px-3 py-2">
                    <PhCalendarBlank class="mr-1 inline" :size="14" />
                    {{ post.duration }}
                  </span>
                  <span class="rounded-full bg-[#f2fbfe] px-3 py-2">{{ post.seats }}</span>
                </div>
                <span class="text-xs font-extrabold text-[#33c4f0] opacity-0 group-hover:opacity-100 transition">View post details →</span>
              </div>
              <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <button
                    type="button"
                    class="flex items-center gap-1.5 text-xs font-bold hover:opacity-80 transition"
                    :style="{ color: liked.includes(post.id) ? post.color : '#717182' }"
                    @click.stop="toggleLiked(post.id)"
                  >
                    <PhHeart :size="17" :weight="liked.includes(post.id) ? 'fill' : 'regular'" />
                    {{ post.likes + (liked.includes(post.id) ? 1 : 0) }}
                  </button>
                  <button
                    type="button"
                    class="flex items-center gap-1.5 text-xs font-bold text-[#717182] hover:text-[#1a1a28] transition"
                    @click.stop="navigateToPostDetail(post.id)"
                  >
                    <PhChatCircle :size="17" />
                    {{ post.comments }}
                  </button>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 rounded-full px-4.5 py-2 text-xs font-extrabold text-white transition hover:scale-105 shadow-md"
                  :style="{ background: post.color }"
                  @click.stop="navigateToPostDetail(post.id)"
                >
                  View post <PhCaretRight :size="15" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>

      <aside class="min-w-0 lg:col-start-2 xl:col-start-auto">
        <div class="sticky top-8 space-y-5">
          <div
            class="border border-[#33c4f0]/15 bg-white/80 p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]"
            style="border-radius: 20px 20px 64px 20px"
          >
            <div class="flex items-center gap-2 text-sm font-extrabold">
              <PhMagnifyingGlass :size="16" />
              Find your next reset
            </div>
            <button type="button" class="mt-4 w-full rounded-full border border-[#33c4f0]/25 px-4 py-3 text-left text-xs text-[#717182]">
              Search providers &amp; activities
            </button>
          </div>
          <div class="border border-[#33c4f0]/18 bg-[#e8f9ff] p-5 text-[#1a1a28]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#147c9e]">{{ hrMode ? 'Team moment' : 'Your next reset' }}</p>
            <p class="mt-2 text-xl font-extrabold leading-tight">
              {{ hrMode ? 'Turn a good post into a booked team moment.' : 'Save the ideas that feel like you.' }}
            </p>
            <p class="mt-3 text-sm leading-6 text-[#4f7180]">Book without leaving your feed.</p>
          </div>
        </div>
      </aside>
    </div>

    <div
      v-if="personalityOpen"
      class="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Your creative personality"
    >
      <div class="relative w-full max-w-lg overflow-hidden bg-white p-7 shadow-2xl sm:p-9" style="border-radius: 20px 20px 64px 20px">
        <button
          type="button"
          class="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe] text-[#1a1a28]"
          aria-label="Close personality profile"
          @click="personalityOpen = false"
        >
          <PhX :size="18" />
        </button>
        <div class="grid h-16 w-16 place-items-center rounded-[22px_22px_32px_22px] bg-[#33c4f0] text-3xl">🧭</div>
        <p class="mt-7 text-xs font-extrabold uppercase tracking-[.16em] text-[#147c9e]">Your Acumen result</p>
        <h2 class="mt-2 text-4xl font-extrabold">The Explorer</h2>
        <p class="mt-4 text-base leading-7 text-[#717182]">
          You are drawn to the unfamiliar—the new route, the different point of view, the experience that changes the
          shape of a day.
        </p>
        <div class="mt-7 rounded-[20px_20px_64px_20px] bg-[#f2fbfe] p-5">
          <p class="text-xs font-extrabold uppercase tracking-[.14em] text-[#147c9e]">Your energy grows through</p>
          <p class="mt-3 text-sm font-bold text-[#1a1a28]">Adventure · cultural discovery · hands-on learning</p>
        </div>
        <NuxtLink
          to="/discover/services"
          class="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white no-underline"
          @click="personalityOpen = false"
        >
          Explore your matches <PhCaretRight :size="16" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
