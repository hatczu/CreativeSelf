<script setup lang="ts">
import { ref } from 'vue';
import { PhCheck, PhCaretRight, PhPlus, PhSparkle, PhX, PhImages } from '@phosphor-icons/vue';

const samplePhotos = [
  'https://images.unsplash.com/photo-1510832842230-87253f48d74f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
];

const bookings = [
  { company: 'Northstar Studio', session: 'Watercolour without perfection', date: 'Thu, Aug 8 · 3:00 PM', group: '12 guests', status: 'Confirmed', color: '#EF4444', emoji: '🎨' },
  { company: 'HiNote Consulting', session: 'Colour as a way to reset', date: 'Tue, Aug 13 · 10:30 AM', group: '18 guests', status: 'Needs response', color: '#F59E0B', emoji: '🖌️' },
  { company: 'Mosaic Labs', session: 'Playful portrait workshop', date: 'Fri, Aug 16 · 2:00 PM', group: '10 guests', status: 'Confirmed', color: '#8B5CF6', emoji: '✨' },
];

const listings = [
  {
    id: 'watercolour',
    title: 'Watercolour without perfection',
    format: '90 min · Team workshop',
    views: '264',
    bookings: '8',
    published: true,
    color: '#EF4444',
    emoji: '🎨',
    image: samplePhotos[0],
    images: [samplePhotos[0], samplePhotos[1], samplePhotos[2]],
  },
  {
    id: 'behind-scenes',
    title: 'Colour as a way to reset',
    format: '60 min · Pop-up session',
    views: '187',
    bookings: '5',
    published: true,
    color: '#F59E0B',
    emoji: '🖌️',
    image: samplePhotos[1],
    images: [samplePhotos[1], samplePhotos[3], samplePhotos[0]],
  },
];

const marketplacePulse = [
  { value: '451', label: 'Profile views', detail: '+18% this month' },
  { value: '13', label: 'Booking requests', detail: '3 need your response' },
  { value: '4.9', label: 'Average rating', detail: 'From 28 reviews' },
];

const showComposer = ref(false);
const submitted = ref(false);
const selectedBooking = ref<string | null>(null);

const openComposer = () => {
  showComposer.value = true;
  submitted.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style="font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif">
    <VendorRail active="overview" />

    <div
      class="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]"
    >
      <aside class="hidden lg:block">
        <VendorProfileCard>
          <button
            type="button"
            class="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-extrabold text-[#1a1a28]"
            @click="openComposer"
          >
            <PhPlus :size="15" />Create a service
          </button>
        </VendorProfileCard>
      </aside>

      <main>
        <header class="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">Provider workspace</p>
              <h1 class="mt-2 text-3xl font-extrabold leading-tight">A good month to make an impression.</h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-[#717182]">
                Your service profile is live and reaching teams looking for a creative reset.
              </p>
            </div>
            <button type="button" class="inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-4 py-3 text-xs font-extrabold text-white" @click="openComposer">
              <PhPlus :size="16" />New service
            </button>
          </div>
        </header>

        <section class="mt-6 overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]" style="border-radius: 20px 20px 64px 20px">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-[.16em] text-white/45">Marketplace pulse</p>
              <p class="mt-1 text-lg font-extrabold">You are getting noticed.</p>
            </div>
            <p class="text-xs leading-5 text-white/50">Compared with the last 30 days</p>
          </div>
          <div class="mt-5 grid gap-3 sm:grid-cols-3">
            <div v-for="stat in marketplacePulse" :key="stat.label" class="rounded-[20px_20px_64px_20px] border border-white/10 bg-white/[.07] p-4">
              <p class="text-2xl font-extrabold text-[#33c4f0]">{{ stat.value }}</p>
              <p class="mt-1 text-xs font-bold">{{ stat.label }}</p>
              <p class="mt-1 text-[11px] text-white/50">{{ stat.detail }}</p>
            </div>
          </div>
        </section>

        <section class="mt-7">
          <div class="mb-4 flex items-end justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Upcoming bookings</p>
              <h2 class="mt-1 text-2xl font-extrabold">Your next team moments</h2>
            </div>
            <button type="button" class="text-xs font-extrabold text-[#147c9e]">View all</button>
          </div>
          <div class="space-y-4">
            <article
              v-for="booking in bookings"
              :key="booking.session"
              class="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
              style="border-radius: 20px 20px 64px 20px"
            >
              <div class="flex flex-wrap items-center gap-4">
                <div class="grid h-12 w-12 place-items-center rounded-full text-2xl" :style="{ background: `${booking.color}18` }">{{ booking.emoji }}</div>
                <div class="min-w-[13rem] flex-1">
                  <p class="text-xs font-extrabold uppercase tracking-[.14em]" :style="{ color: booking.color }">{{ booking.date }}</p>
                  <h3 class="mt-1 text-base font-extrabold">{{ booking.session }}</h3>
                  <p class="mt-1 text-sm text-[#717182]">{{ booking.company }} · {{ booking.group }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <span
                    :class="[
                      'rounded-full px-3 py-2 text-xs font-bold',
                      booking.status === 'Confirmed' ? 'bg-[#10b981]/15 text-[#087e58]' : 'bg-[#f59e0b]/15 text-[#9a5d00]',
                    ]"
                  >
                    {{ booking.status }}
                  </span>
                  <button
                    v-if="booking.status === 'Needs response'"
                    type="button"
                    class="rounded-full px-4 py-2 text-xs font-extrabold text-white"
                    :style="{ background: booking.color }"
                    @click="selectedBooking = booking.session"
                  >
                    Review
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="mt-7">
          <div class="mb-4 flex items-end justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Live listings</p>
              <h2 class="mt-1 text-2xl font-extrabold">Your services on CreativeSelf</h2>
            </div>
            <button type="button" class="text-xs font-extrabold text-[#147c9e]" @click="openComposer">Add service</button>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="listing in listings"
              :key="listing.title"
              class="group cursor-pointer overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)] transition duration-300 hover:shadow-[0_18px_48px_rgba(28,118,155,.12)] hover:-translate-y-0.5"
              style="border-radius: 20px 20px 64px 20px"
              @click="navigateTo(`/vendor/posts/${listing.id}`)"
            >
              <div class="relative h-36 w-full overflow-hidden bg-gray-100">
                <ImageWithFallback
                  :src="listing.image"
                  :alt="listing.title"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a28]/70 via-transparent to-transparent" />
                <span
                  class="absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase text-white backdrop-blur shadow-sm"
                  :style="{ background: listing.published ? '#10b981' : '#717182' }"
                >
                  {{ listing.published ? 'Published' : 'Draft' }}
                </span>
                <span
                  v-if="listing.images && listing.images.length > 1"
                  class="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[#1a1a28]/70 px-2.5 py-1 text-[10px] font-extrabold text-white backdrop-blur"
                >
                  <PhImages :size="12" />{{ listing.images.length }} photos
                </span>
                <span class="absolute bottom-3 left-4 grid h-9 w-9 place-items-center rounded-xl bg-white/90 text-xl shadow-md backdrop-blur">
                  {{ listing.emoji }}
                </span>
              </div>
              <div class="p-5">
                <h3 class="text-lg font-extrabold text-[#1a1a28] transition group-hover:text-[#147c9e]">{{ listing.title }}</h3>
                <p class="mt-1 text-sm text-[#717182]">{{ listing.format }}</p>
                <div class="mt-4 flex items-center justify-between border-t border-[#33c4f0]/12 pt-3 text-xs font-bold text-[#717182]">
                  <div class="flex gap-4">
                    <span>👀 {{ listing.views }} views</span><span>📅 {{ listing.bookings }} bookings</span>
                  </div>
                  <span class="text-[#33c4f0] font-extrabold opacity-0 group-hover:opacity-100 transition">View post details →</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <aside class="hidden lg:block">
        <div class="sticky top-8 space-y-5">
          <div class="border border-[#33c4f0]/15 bg-white/80 p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Action queue</p>
            <p class="mt-3 text-3xl font-extrabold">3</p>
            <p class="mt-1 text-sm leading-6 text-[#717182]">Booking requests need a response before they can be confirmed.</p>
            <button type="button" class="mt-5 rounded-full bg-[#1a1a28] px-4 py-2 text-xs font-extrabold text-white">Review requests</button>
          </div>
          <div class="border border-[#33c4f0]/18 bg-[#e8f9ff] p-5 text-[#1a1a28]" style="border-radius: 20px 20px 64px 20px">
            <p class="text-xs font-bold uppercase tracking-[.14em] text-[#147c9e]">Acumen suggestion</p>
            <p class="mt-2 text-xl font-extrabold leading-tight">Add a 45-minute express format.</p>
            <p class="mt-3 text-sm leading-6 text-[#4f7180]">Teams similar to your recent bookings are looking for shorter weekday resets.</p>
            <button type="button" class="mt-5 inline-flex items-center gap-1 text-xs font-extrabold text-[#147c9e]" @click="openComposer">
              Create a variation <PhCaretRight :size="14" />
            </button>
          </div>
        </div>
      </aside>
    </div>

    <div v-if="showComposer" class="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5" role="dialog" aria-modal="true" aria-label="Create a service">
      <div class="relative w-full max-w-xl bg-white p-7 shadow-2xl sm:p-8" style="border-radius: 20px 20px 64px 20px">
        <button
          type="button"
          class="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe]"
          aria-label="Close"
          @click="showComposer = false"
        >
          <PhX :size="18" />
        </button>
        <div v-if="submitted" class="py-10 text-center">
          <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#10b981]/15"><PhCheck class="text-[#10b981]" /></div>
          <h2 class="mt-6 text-3xl font-extrabold">Service saved.</h2>
          <p class="mx-auto mt-3 text-sm leading-6 text-[#717182]">It is ready for your final review before it goes live in the marketplace.</p>
          <button type="button" class="mt-7 rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white" @click="showComposer = false">
            Back to workspace
          </button>
        </div>
        <template v-else>
          <p class="text-xs font-extrabold uppercase tracking-[.16em] text-[#147c9e]">New service</p>
          <h2 class="mt-2 text-3xl font-extrabold">Make it easy to say yes.</h2>
          <label class="mt-7 block text-xs font-bold text-[#717182]">SERVICE NAME</label>
          <input class="mt-2 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] px-4 py-3 text-sm" placeholder="e.g. Watercolour reset" />
          <label class="mt-6 block text-xs font-bold text-[#717182]">FORMAT</label>
          <select class="mt-2 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] px-4 py-3 text-sm">
            <option>60-minute team workshop</option>
            <option>90-minute team workshop</option>
            <option>Half-day experience</option>
          </select>
          <label class="mt-6 block text-xs font-bold text-[#717182]">SHORT DESCRIPTION</label>
          <textarea
            class="mt-2 min-h-24 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] p-4 text-sm"
            placeholder="What will this experience make possible for a team?"
          />
          <button type="button" class="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-6 py-3 text-sm font-extrabold text-white" @click="submitted = true">
            <PhSparkle :size="16" />Save service
          </button>
        </template>
      </div>
    </div>

    <div v-if="selectedBooking" class="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5" role="dialog" aria-modal="true" aria-label="Review booking">
      <div class="relative w-full max-w-md bg-white p-7 shadow-2xl" style="border-radius: 20px 20px 64px 20px">
        <button
          type="button"
          class="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe]"
          aria-label="Close"
          @click="selectedBooking = null"
        >
          <PhX :size="18" />
        </button>
        <p class="text-xs font-extrabold uppercase tracking-[.16em] text-[#147c9e]">Booking request</p>
        <h2 class="mt-2 text-2xl font-extrabold">{{ selectedBooking }}</h2>
        <p class="mt-4 text-sm leading-6 text-[#717182]">
          HiNote Consulting would like to bring 18 people together for this session on Tuesday, Aug 13.
        </p>
        <div class="mt-7 flex gap-3">
          <button type="button" class="rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white" @click="selectedBooking = null">
            Confirm request
          </button>
          <button type="button" class="rounded-full border border-[#33c4f0]/25 px-5 py-3 text-sm font-extrabold" @click="selectedBooking = null">
            Ask a question
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
