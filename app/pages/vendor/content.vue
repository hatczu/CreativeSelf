<script setup lang="ts">
import { ref } from 'vue';
import { PhCheck, PhCaretRight, PhPlus, PhPaperPlaneRight, PhX, PhImages } from '@phosphor-icons/vue';
import { samplePostsData, type PostData } from '~/data/postsData';

const sampleImages = [
  'https://images.unsplash.com/photo-1510832842230-87253f48d74f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
];

const content = ref<PostData[]>(samplePostsData.filter((p) => ['watercolour', 'behind-scenes', 'team-story'].includes(p.id)));
const composer = ref(false);
const created = ref(false);
const selectedImgs = ref<string[]>([sampleImages[0]!, sampleImages[1]!]);

const feedImpact = [
  { value: '1,248', label: 'Post impressions' },
  { value: '86', label: 'Service taps' },
  { value: '11', label: 'Bookings influenced' },
];

const openComposer = () => {
  composer.value = true;
  created.value = false;
};

const publishDraft = (id: string) => {
  content.value = content.value.map((item) => (item.id === id ? { ...item, label: 'Scheduled', date: 'Fri, Aug 9 · 10:00 AM' } : item));
};

const toggleImageSelection = (imgUrl: string) => {
  selectedImgs.value = selectedImgs.value.includes(imgUrl)
    ? selectedImgs.value.filter((url) => url !== imgUrl)
    : [...selectedImgs.value, imgUrl];
};

const saveToQueue = () => {
  if (selectedImgs.value.length > 0) {
    const newPost: PostData = {
      id: `post-${Date.now()}`,
      label: 'Draft',
      date: 'Just created',
      title: 'New Story Moment',
      copy: 'A fresh post for client feed discovery.',
      service: 'Watercolour without perfection',
      color: '#33c4f0',
      emoji: '✨',
      image: selectedImgs.value[0],
      images: [...selectedImgs.value],
      provider: 'Studio Lumen',
      handle: '@studiolumen',
      category: 'Story Moment',
      duration: '60 min',
      seats: '15 guests',
      likes: 0,
      comments: 0,
    };
    content.value = [newPost, ...content.value];
  }
  created.value = true;
};

const imageCount = (post: PostData) => (post.images ? post.images.length : post.image ? 1 : 0);
const labelColor = (label?: string) => (label === 'Published' ? '#10b981' : label === 'Scheduled' ? '#33c4f0' : '#f59e0b');
const openPost = (id: string) => navigateTo(`/vendor/posts/${id}`);
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <VendorRail active="content" />

    <div
      class="mx-auto grid max-w-[1320px] gap-6 px-5 pt-6 pb-28 sm:px-8 sm:pt-8 lg:gap-8 lg:py-10 lg:pb-14 lg:pl-[104px] lg:pr-10 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_260px]"
    >
      <aside class="hidden lg:block">
        <div class="sticky top-8 overflow-hidden bg-[#15343d] p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]" style="border-radius: 20px 20px 64px 20px">
          <p class="text-xs font-bold uppercase tracking-[.14em] text-white/45">Studio Lumen</p>
          <div class="mt-5 grid h-16 w-16 place-items-center rounded-[22px_22px_32px_22px] bg-[#ef4444] text-3xl">🎨</div>
          <p class="mt-5 text-2xl font-extrabold">Content studio</p>
          <p class="mt-3 text-sm leading-6 text-white/65">The stories, images, and invitations clients discover in their wellbeing feed.</p>
          <button
            type="button"
            class="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-extrabold text-[#1a1a28]"
            @click="openComposer"
          >
            <PhPlus :size="15" />Create post
          </button>
          <div class="mt-7 border-t border-white/10 pt-5">
            <p class="text-xs font-bold text-white/45">POSTING RHYTHM</p>
            <p class="mt-2 text-sm font-bold">2 posts ready this week</p>
          </div>
        </div>
      </aside>

      <main class="min-w-0">
        <header class="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">Client feed content</p>
              <h1 class="mt-2 text-3xl font-extrabold leading-tight">Give teams a reason to stop scrolling.</h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-[#717182]">
                Create the posts, media, and service stories that appear in your client discovery feed.
              </p>
            </div>
            <button type="button" class="inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-4 py-3 text-xs font-extrabold text-white" @click="openComposer">
              <PhPlus :size="16" />New post
            </button>
          </div>
        </header>

        <section class="mt-6 overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-[.16em] text-white/45">Feed impact</p>
              <p class="mt-1 text-lg font-extrabold">Your stories are helping teams discover you.</p>
            </div>
            <span class="rounded-full bg-[#33c4f0] px-3 py-2 text-xs font-extrabold text-[#1a1a28]">Last 30 days</span>
          </div>
          <div class="mt-5 grid gap-3 sm:grid-cols-3">
            <div v-for="stat in feedImpact" :key="stat.label" class="rounded-[20px_20px_64px_20px] border border-white/10 bg-white/[.07] p-4">
              <p class="text-2xl font-extrabold text-[#33c4f0]">{{ stat.value }}</p>
              <p class="mt-1 text-xs font-bold">{{ stat.label }}</p>
            </div>
          </div>
        </section>

        <section class="mt-7">
          <div class="mb-4 flex items-end justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Content queue</p>
              <h2 class="mt-1 text-2xl font-extrabold">What clients will see next</h2>
            </div>
            <p class="text-sm font-bold text-[#717182]">{{ content.length }} posts</p>
          </div>

          <div class="space-y-4">
            <article
              v-for="post in content"
              :key="post.id"
              class="group cursor-pointer overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)] transition duration-300 hover:shadow-[0_18px_48px_rgba(28,118,155,.12)]"
              style="border-radius: 20px 20px 64px 20px"
              @click="openPost(post.id)"
            >
              <div class="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div class="relative h-40 w-full sm:h-32 sm:w-44 shrink-0 overflow-hidden rounded-[16px_16px_36px_16px] bg-gray-100">
                  <ImageWithFallback
                    :src="post.images?.[0] || post.image"
                    :alt="post.title"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a28]/60 via-transparent to-transparent" />
                  <span class="absolute bottom-2 left-2 grid h-8 w-8 place-items-center rounded-xl bg-white/90 text-lg shadow-sm backdrop-blur">
                    {{ post.emoji }}
                  </span>
                  <span
                    class="absolute top-2 right-2 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase text-white backdrop-blur shadow-sm"
                    :style="{ background: labelColor(post.label) }"
                  >
                    {{ post.label }}
                  </span>
                  <span
                    v-if="imageCount(post) > 1"
                    class="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-[#1a1a28]/80 px-2 py-0.5 text-[10px] font-extrabold text-white backdrop-blur"
                  >
                    <PhImages :size="12" />
                    {{ imageCount(post) }}
                  </span>
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <p class="text-xs font-extrabold uppercase tracking-[.14em]" :style="{ color: post.color }">{{ post.label }} · {{ post.date }}</p>
                    <span class="rounded-full bg-[#f2fbfe] px-3 py-1.5 text-[11px] font-bold text-[#147c9e]">{{ post.service }}</span>
                  </div>

                  <h3 class="mt-2 text-lg font-extrabold text-[#1a1a28] transition group-hover:text-[#147c9e]">{{ post.title }}</h3>

                  <p class="mt-2 text-sm leading-6 text-[#717182] line-clamp-2">{{ post.copy }}</p>

                  <div class="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      v-if="post.label === 'Draft'"
                      type="button"
                      class="rounded-full bg-[#1a1a28] px-4 py-2 text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                      @click.stop="publishDraft(post.id)"
                    >
                      Schedule post
                    </button>
                    <button
                      v-else
                      type="button"
                      class="rounded-full border border-[#33c4f0]/25 px-4 py-2 text-xs font-extrabold text-[#1a1a28] transition hover:bg-[#e8f9ff]"
                      @click.stop="openPost(post.id)"
                    >
                      Edit post
                    </button>

                    <button
                      type="button"
                      class="rounded-full border border-[#33c4f0]/25 px-4 py-2 text-xs font-extrabold text-[#1a1a28] transition hover:bg-[#e8f9ff]"
                      @click.stop="openPost(post.id)"
                    >
                      View Post Details
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <aside class="min-w-0 lg:col-start-2 xl:col-start-auto">
        <div class="sticky top-8 space-y-5">
          <div class="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Media library</p>
            <p class="mt-3 text-3xl font-extrabold">24</p>
            <p class="mt-2 text-sm leading-6 text-[#717182]">Images and visual assets ready to use in your next story.</p>
            <button type="button" class="mt-5 inline-flex items-center gap-1 text-xs font-extrabold text-[#147c9e]">
              Browse media <PhCaretRight :size="14" />
            </button>
          </div>

          <div class="border border-[#33c4f0]/18 bg-[#e8f9ff] p-5" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#147c9e]">Acumen cue</p>
            <p class="mt-2 text-xl font-extrabold leading-tight">Behind-the-scenes posts invite more taps.</p>
            <p class="mt-3 text-sm leading-6 text-[#4f7180]">
              Share a process image or a guest-made piece to help teams picture the experience.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Composer Modal -->
    <div v-if="composer" class="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5" role="dialog" aria-modal="true">
      <div class="relative w-full max-w-xl bg-white p-7 shadow-2xl" style="border-radius: 20px 20px 64px 20px">
        <button
          type="button"
          class="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe]"
          aria-label="Close"
          @click="composer = false"
        >
          <PhX :size="18" />
        </button>

        <div v-if="created" class="py-10 text-center">
          <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#10b981]/15"><PhCheck class="text-[#10b981]" /></div>
          <h2 class="mt-6 text-3xl font-extrabold">Post saved to your queue.</h2>
          <p class="mt-3 text-sm leading-6 text-[#717182]">It is ready to schedule for the client feed.</p>
          <button type="button" class="mt-7 rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white" @click="composer = false">
            Back to content
          </button>
        </div>
        <template v-else>
          <p class="text-xs font-extrabold uppercase tracking-[.16em] text-[#147c9e]">New feed post</p>
          <h2 class="mt-2 text-3xl font-extrabold">Make the moment feel real.</h2>

          <input class="mt-7 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] px-4 py-3 text-sm" placeholder="Post headline" />

          <textarea
            class="mt-4 min-h-28 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] p-4 text-sm"
            placeholder="Tell teams why this experience is worth making time for."
          />

          <!-- Multi-Photo Attachment Selector -->
          <div class="mt-5">
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs font-extrabold uppercase tracking-[.14em] text-[#717182]">Attach photos ({{ selectedImgs.length }} selected)</p>
              <span class="text-xs text-[#147c9e]">Click to select multiple</span>
            </div>

            <div class="flex gap-2.5 overflow-x-auto pb-2">
              <button
                v-for="(imgUrl, index) in sampleImages"
                :key="index"
                type="button"
                :class="[
                  'relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition',
                  selectedImgs.includes(imgUrl) ? 'border-[#33c4f0] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100',
                ]"
                @click="toggleImageSelection(imgUrl)"
              >
                <ImageWithFallback :src="imgUrl" :alt="`Photo option ${index + 1}`" class="h-full w-full object-cover" />
                <div v-if="selectedImgs.includes(imgUrl)" class="absolute inset-0 bg-[#33c4f0]/30 grid place-items-center">
                  <span class="grid h-6 w-6 place-items-center rounded-full bg-[#33c4f0] text-white text-xs font-bold shadow">✓</span>
                </div>
              </button>
            </div>
          </div>

          <button type="button" class="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-6 py-3 text-sm font-extrabold text-white" @click="saveToQueue">
            <PhPaperPlaneRight :size="16" />
            Save to queue ({{ selectedImgs.length }} photos)
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
