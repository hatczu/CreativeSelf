<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { PhList, PhX, PhDeviceMobile } from '@phosphor-icons/vue';

const emit = defineEmits<{ openRegister: [] }>();

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Brand Services', href: '/services' },
  { label: 'Personality Test', href: '/test' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'For Business', href: '#corporate' },
];

const scrolled = ref(false);
const mobileOpen = ref(false);
const route = useRoute();
const isLanding = computed(() => route.path === '/');

const onScroll = () => {
  scrolled.value = window.scrollY > 40;
};
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));

const anchorHref = (href: string) => (isLanding.value ? href : `/${href}`);

const handleNavClick = (e: MouseEvent, href: string) => {
  if (href.startsWith('#') && isLanding.value) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
  mobileOpen.value = false;
};

const desktopLinkStyle = (href: string) => ({
  padding: '0.5rem 1rem',
  borderRadius: '9999px',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: route.path === href ? '#1AB0DC' : '#2A2A3A',
  textDecoration: 'none',
  background: route.path === href ? 'rgba(51,196,240,0.1)' : 'transparent',
  transition: 'all 0.2s ease',
});

const onLinkEnter = (e: MouseEvent) => applyStyles(e, { background: 'rgba(51,196,240,0.12)', color: '#1AB0DC' });
const onLinkLeave = (e: MouseEvent, href: string) => {
  if (route.path !== href) applyStyles(e, { background: 'transparent', color: '#2A2A3A' });
};

const mobileLinkStyle = {
  padding: '0.75rem 1.25rem',
  borderRadius: '9999px',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#2A2A3A',
  textDecoration: 'none',
  background: 'rgba(51,196,240,0.06)',
  display: 'block',
};

const openRegister = () => {
  mobileOpen.value = false;
  emit('openRegister');
};
</script>

<template>
  <Motion
    as="header"
    class="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    :initial="{ y: -100, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.6, ease: 'easeOut' }"
  >
    <div
      class="w-full max-w-6xl flex items-center justify-between px-5 py-3"
      :style="{
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '9999px',
        boxShadow: scrolled
          ? '0 8px 40px rgba(51,196,240,0.15), 0 2px 12px rgba(0,0,0,0.08)'
          : '0 2px 16px rgba(0,0,0,0.06)',
        border: '1px solid rgba(51,196,240,0.2)',
        transition: 'all 0.3s ease',
      }"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center" style="text-decoration: none">
        <ImageWithFallback
          :src="images.logoWordmark"
          alt="CreativeSelf"
          style="height: 44px; width: auto; object-fit: contain"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-1">
        <template v-for="link in navLinks" :key="link.label">
          <a
            v-if="link.href.startsWith('#')"
            :href="anchorHref(link.href)"
            :style="desktopLinkStyle(link.href)"
            @click="handleNavClick($event, link.href)"
            @mouseenter="onLinkEnter"
            @mouseleave="onLinkLeave($event, link.href)"
          >
            {{ link.label }}
          </a>
          <NuxtLink
            v-else
            :to="link.href"
            :style="desktopLinkStyle(link.href)"
            @click="handleNavClick($event, link.href)"
            @mouseenter="onLinkEnter"
            @mouseleave="onLinkLeave($event, link.href)"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
      </nav>

      <!-- Desktop Action Buttons -->
      <div class="hidden md:flex items-center gap-2.5">
        <NuxtLink
          to="/mobile"
          style="
            padding: 0.5rem 1.1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 700;
            color: #147c9e;
            text-decoration: none;
            background: rgba(51, 196, 240, 0.1);
            border: 1.5px solid rgba(51, 196, 240, 0.3);
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s ease;
          "
          @mouseenter="applyStyles($event, { background: 'rgba(51,196,240,0.2)', transform: 'translateY(-1px)' })"
          @mouseleave="applyStyles($event, { background: 'rgba(51,196,240,0.1)', transform: 'translateY(0)' })"
        >
          <PhDeviceMobile :size="18" weight="bold" />
          Mobile App
        </NuxtLink>

        <NuxtLink
          to="/dashboard"
          style="
            padding: 0.5rem 1.1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 600;
            color: #2a2a3a;
            text-decoration: none;
            border: 1.5px solid rgba(42, 42, 58, 0.2);
            transition: all 0.2s ease;
          "
          @mouseenter="applyStyles($event, { borderColor: '#33C4F0', color: '#33C4F0' })"
          @mouseleave="applyStyles($event, { borderColor: 'rgba(42,42,58,0.2)', color: '#2A2A3A' })"
        >
          Log In
        </NuxtLink>

        <button
          style="
            padding: 0.5rem 1.35rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 700;
            color: #ffffff;
            border: none;
            cursor: pointer;
            background: linear-gradient(135deg, #33c4f0 0%, #1ab0dc 100%);
            box-shadow: 0 4px 16px rgba(51, 196, 240, 0.4);
            transition: all 0.2s ease;
          "
          @click="emit('openRegister')"
          @mouseenter="applyStyles($event, { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(51,196,240,0.5)' })"
          @mouseleave="applyStyles($event, { transform: 'translateY(0)', boxShadow: '0 4px 16px rgba(51,196,240,0.4)' })"
        >
          Register
        </button>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden flex items-center justify-center"
        style="
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          background: rgba(51, 196, 240, 0.1);
          border: none;
          cursor: pointer;
          color: #2a2a3a;
        "
        @click="mobileOpen = !mobileOpen"
      >
        <PhX v-if="mobileOpen" :size="20" />
        <PhList v-else :size="20" />
      </button>
    </div>
  </Motion>

  <!-- Mobile Menu -->
  <AnimatePresence>
    <Motion
      v-if="mobileOpen"
      class="fixed inset-x-4 top-24 z-40 md:hidden"
      :initial="{ opacity: 0, y: -20 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: -20 }"
      :transition="{ duration: 0.2 }"
      style="
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(20px);
        border-radius: 2.6rem 0.9rem 2.6rem 1.15rem;
        padding: 1.5rem;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
        border: 1px solid rgba(51, 196, 240, 0.2);
      "
    >
      <nav class="flex flex-col gap-2 mb-4">
        <template v-for="link in navLinks" :key="link.label">
          <a
            v-if="link.href.startsWith('#')"
            :href="anchorHref(link.href)"
            :style="mobileLinkStyle"
            @click="handleNavClick($event, link.href)"
          >
            {{ link.label }}
          </a>
          <NuxtLink v-else :to="link.href" :style="mobileLinkStyle" @click="handleNavClick($event, link.href)">
            {{ link.label }}
          </NuxtLink>
        </template>
      </nav>
      <div class="flex flex-col gap-3">
        <NuxtLink
          to="/mobile"
          style="
            padding: 0.75rem;
            border-radius: 9999px;
            font-size: 0.95rem;
            font-weight: 700;
            color: #147c9e;
            text-decoration: none;
            background: rgba(51, 196, 240, 0.12);
            border: 1.5px solid rgba(51, 196, 240, 0.3);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          "
          @click="mobileOpen = false"
        >
          <PhDeviceMobile :size="20" weight="bold" />
          Open Mobile App
        </NuxtLink>
        <button
          style="
            padding: 0.75rem;
            border-radius: 9999px;
            font-size: 0.95rem;
            font-weight: 700;
            color: #fff;
            border: none;
            background: linear-gradient(135deg, #33c4f0 0%, #1ab0dc 100%);
            text-align: center;
            box-shadow: 0 4px 16px rgba(51, 196, 240, 0.4);
            cursor: pointer;
          "
          @click="openRegister"
        >
          Register Now
        </button>
        <NuxtLink
          to="/dashboard"
          style="
            padding: 0.75rem;
            border-radius: 9999px;
            font-size: 0.95rem;
            font-weight: 600;
            color: #2a2a3a;
            text-decoration: none;
            border: 1.5px solid rgba(42, 42, 58, 0.2);
            text-align: center;
          "
          @click="mobileOpen = false"
        >
          Log In
        </NuxtLink>
      </div>
    </Motion>
  </AnimatePresence>
</template>
