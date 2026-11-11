<script setup lang="ts">
import { PhInstagramLogo, PhTwitterLogo, PhLinkedinLogo, PhYoutubeLogo } from '@phosphor-icons/vue';

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Platform: [
    { label: 'Creative Personality', href: '#personality' },
    { label: 'Take the Test', href: '/test' },
    { label: 'Activity Discovery', href: '#discover' },
    { label: 'Service Brands', href: '#brands' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Company: [
    { label: 'About CreativeSelf', href: '#about' },
    { label: 'For Business', href: '#corporate' },
    { label: 'Vendor Partners', href: '/vendors' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Resources: [
    { label: 'Blog', href: '#' },
    { label: 'Research', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: PhInstagramLogo, label: 'Instagram', href: '#' },
  { icon: PhTwitterLogo, label: 'X / Twitter', href: '#' },
  { icon: PhLinkedinLogo, label: 'LinkedIn', href: '#' },
  { icon: PhYoutubeLogo, label: 'YouTube', href: '#' },
];
</script>

<template>
  <footer style="background: #1a1a28; color: #ffffff">
    <!-- Top wave -->
    <div style="margin-bottom: -2px; line-height: 0">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; width: 100%">
        <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#1A1A28" />
      </svg>
    </div>

    <div class="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div
            style="
              background: rgba(255, 255, 255, 0.08);
              border-radius: 2.6rem 0.9rem 2.6rem 1.15rem;
              padding: 1.25rem;
              display: inline-block;
              margin-bottom: 1.25rem;
            "
          >
            <ImageWithFallback
              :src="images.logoWordmark"
              alt="CreativeSelf"
              style="height: 56px; width: auto; object-fit: contain"
            />
          </div>
          <p
            style="
              color: rgba(255, 255, 255, 0.55);
              font-size: 0.95rem;
              line-height: 1.7;
              max-width: 280px;
              margin-bottom: 1.5rem;
            "
          >
            A creativity, wellness, and personal development platform. Powered by Acumen AI.
          </p>
          <div class="flex items-center gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              style="
                width: 40px;
                height: 40px;
                border-radius: 9999px;
                background: rgba(51, 196, 240, 0.12);
                border: 1px solid rgba(51, 196, 240, 0.25);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #33c4f0;
                transition: all 0.2s ease;
                text-decoration: none;
              "
              @mouseenter="applyStyles($event, { background: '#33C4F0', color: '#ffffff' })"
              @mouseleave="applyStyles($event, { background: 'rgba(51,196,240,0.12)', color: '#33C4F0' })"
            >
              <component :is="social.icon" :size="16" />
            </a>
          </div>
        </div>

        <!-- Link columns -->
        <div v-for="(links, section) in footerLinks" :key="section">
          <h4
            style="
              font-size: 0.8125rem;
              font-weight: 700;
              letter-spacing: 0.1em;
              color: #33c4f0;
              text-transform: uppercase;
              margin-bottom: 1rem;
            "
          >
            {{ section }}
          </h4>
          <ul class="flex flex-col gap-3" style="list-style: none; padding: 0; margin: 0">
            <li v-for="link in links" :key="link.label">
              <NuxtLink
                :to="link.href"
                style="color: rgba(255, 255, 255, 0.55); text-decoration: none; font-size: 0.9rem; transition: color 0.2s ease"
                @mouseenter="applyStyles($event, { color: '#33C4F0' })"
                @mouseleave="applyStyles($event, { color: 'rgba(255,255,255,0.55)' })"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Acumen badge -->
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-4"
        style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 1.5rem"
      >
        <p style="color: rgba(255, 255, 255, 0.3); font-size: 0.85rem">
          © 2026 CreativeSelf™. All rights reserved. Be anything but square.
        </p>
        <div
          style="
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.375rem 1rem;
            border-radius: 9999px;
            background: rgba(51, 196, 240, 0.1);
            border: 1px solid rgba(51, 196, 240, 0.2);
            font-size: 0.8rem;
            font-weight: 600;
            color: #33c4f0;
          "
        >
          <span
            style="
              width: 6px;
              height: 6px;
              border-radius: 9999px;
              background: #33c4f0;
              display: inline-block;
              animation: pulseGlow 2s ease-in-out infinite;
            "
          />
          Powered by Acumen AI
        </div>
      </div>
    </div>
  </footer>
</template>
