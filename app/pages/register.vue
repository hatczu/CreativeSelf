<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import {
  PhUser,
  PhEnvelope,
  PhLock,
  PhPhone,
  PhBriefcase,
  PhBuildings,
  PhUsers,
  PhCheckCircle,
  PhArrowRight,
  PhArrowLeft,
  PhCheck,
  PhBuilding,
  PhGlobe,
  PhShieldCheck,
  PhSparkle,
  PhTrophy,
  PhBrain,
} from '@phosphor-icons/vue';
import type { RegisterCategory } from '~/composables/useRegister';

interface RegisterPlan {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  price: string;
  period: string;
  highlighted: boolean;
  color: string;
  icon: Component;
}

const orgSizeOptions: { id: string; label: string; sub: string; icon: Component; badge: string; type: RegisterCategory }[] = [
  { id: 'just-me', label: 'Just me', sub: 'Individual Explorer or Freelancer', icon: PhUser, badge: 'Individual', type: 'individual' },
  { id: '0-50', label: '0 - 50 employees', sub: 'Small Team or Emerging Startup', icon: PhUsers, badge: 'Small Business', type: 'corporate' },
  { id: '51-200', label: '51 - 200 employees', sub: 'Growing Organization', icon: PhBuildings, badge: 'Growth Enterprise', type: 'corporate' },
  { id: '201-500', label: '201 - 500 employees', sub: 'Mid to Large Organization', icon: PhBuilding, badge: 'Large Business', type: 'corporate' },
  { id: '500+', label: '500+ employees', sub: 'Global Enterprise & Corporate', icon: PhGlobe, badge: 'Enterprise', type: 'corporate' },
];

const individualPlans: RegisterPlan[] = [
  {
    id: 'basic-creative',
    name: 'Basic Creative',
    tagline: '1 Service Brand, 2 Activities Per Month',
    features: ['1 Service Brand', '2 Activities Per Month', 'Creative Personality Assessment', 'Acumen AI recommendations'],
    price: 'Free',
    period: 'forever',
    highlighted: false,
    color: '#3B82F6',
    icon: PhSparkle,
  },
  {
    id: 'advanced-creative',
    name: 'Advanced Creative',
    tagline: '2 Service Brands, 4 Activities Per Month',
    features: ['2 Service Brands', '4 Activities Per Month', 'Deep Acumen AI Insights', 'Personalized Learning Track', 'Priority Reservations'],
    price: '$49',
    period: 'per month',
    highlighted: true,
    color: '#33C4F0',
    icon: PhTrophy,
  },
  {
    id: 'elite-creative',
    name: 'Elite Creative',
    tagline: '3 Service Brands and 6 Activities Per Month',
    features: ['3 Service Brands', '6 Activities Per Month', 'Unlimited Acumen AI Consultation', 'Exclusive Masterclasses', 'VIP Community Perks'],
    price: '$99',
    period: 'per month',
    highlighted: false,
    color: '#8B5CF6',
    icon: PhBrain,
  },
  {
    id: 'one-on-one-creative',
    name: 'One-on-One Creative',
    tagline: 'Custom Consulting and Coaching Fees Apply',
    features: ['Custom Consulting & Coaching', 'Tailored Learning Plan', '1-on-1 Dedicated Mentor', 'Flexible Schedule'],
    price: 'Custom',
    period: 'fees apply',
    highlighted: false,
    color: '#F59E0B',
    icon: PhUser,
  },
];

const corporatePlans: RegisterPlan[] = [
  {
    id: 'basic-creative-team',
    name: 'Basic Creative Team',
    tagline: '2 Service Brands, 4 Activities with 8 employees per Activity per Month',
    features: ['2 Service Brands', '4 Activities Per Month', '8 Employees per Activity', 'Team Engagement Analytics', 'Standard Support'],
    price: '$299',
    period: 'per month',
    highlighted: false,
    color: '#3B82F6',
    icon: PhUsers,
  },
  {
    id: 'advanced-creative-team',
    name: 'Advanced Creative Team',
    tagline: '4 Service Brands, 6 Activities with 10 employees per Activity per Month',
    features: ['4 Service Brands', '6 Activities Per Month', '10 Employees per Activity', 'Corporate Wellbeing Reports', 'Dedicated Account Manager'],
    price: '$599',
    period: 'per month',
    highlighted: true,
    color: '#33C4F0',
    icon: PhTrophy,
  },
  {
    id: 'elite-creative-team',
    name: 'Elite Creative Team',
    tagline: '6 Service Brands, 12 Activities with 15 employees per Activity per Month',
    features: ['6 Service Brands', '12 Activities Per Month', '15 Employees per Activity', 'Executive Insights Portal', 'On-site Facilitation', 'Vendor Management'],
    price: '$1,199',
    period: 'per month',
    highlighted: false,
    color: '#8B5CF6',
    icon: PhBuildings,
  },
  {
    id: 'custom-creative-corporate',
    name: 'Custom Creative',
    tagline: 'Custom Creative Activities, Learning Plans and Corporate Consulting',
    features: ['Custom Creative Activities', 'Tailored Learning Plans', 'Corporate Consulting', 'Enterprise SLA & Security', 'Global Rollout Support'],
    price: 'Custom',
    period: 'contact sales',
    highlighted: false,
    color: '#F59E0B',
    icon: PhGlobe,
  },
];

const industries = [
  'Technology & Design',
  'Creative Arts & Media',
  'Healthcare & Wellness',
  'Education & Non-Profit',
  'Corporate & Financial Services',
  'Freelance / Individual',
];

const route = useRoute();
const initialPlan = (route.query.plan as string) || 'advanced-creative';
const initialCategory = (route.query.category as RegisterCategory) || 'individual';

const step = ref(1);

// Form details
const fullName = ref('');
const email = ref('');
const password = ref('');
const phone = ref('');
const jobTitle = ref('');

// Org size
const orgSize = ref<string>('just-me');

// Company details
const companyName = ref('');
const industry = ref('Technology & Design');
const website = ref('');

// Subscription plan
const planCategory = ref<RegisterCategory>(initialCategory);
const selectedPlanId = ref<string>(initialPlan);

// Registration Complete State
const isCompleted = ref(false);

const handleSelectOrgSize = (id: string, type: RegisterCategory) => {
  orgSize.value = id;
  planCategory.value = type;
  if (type === 'corporate' && !companyName.value) {
    companyName.value = `${fullName.value ? fullName.value.split(' ')[0] : 'My'} Organization`;
  } else if (type === 'individual' && !companyName.value) {
    companyName.value = 'Independent Explorer';
  }
};

const handleCompleteRegistration = (planId?: string) => {
  if (planId) selectedPlanId.value = planId;
  isCompleted.value = true;
};

const activePlans = computed(() => (planCategory.value === 'individual' ? individualPlans : corporatePlans));
const orgSizeLabel = computed(() => orgSizeOptions.find((o) => o.id === orgSize.value)?.label);
const stepLabel = computed(() =>
  step.value === 1 ? 'Personal Profile' : step.value === 2 ? 'Team Scale' : step.value === 3 ? 'Organization Identity' : 'Subscription',
);

const inputClass =
  'w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm bg-white';
const inputStyle = { borderRadius: '14px 14px 32px 14px' };
const primaryButtonClass =
  'px-8 py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white font-bold shadow-md hover:shadow-lg transition-all text-sm flex items-center gap-2';
const backButtonClass =
  'px-5 py-2.5 text-[#717182] hover:text-[#2A2A3A] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors';
const isIndividualSelected = computed(() => planCategory.value === 'individual' && orgSize.value === 'just-me');
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#f7fcff] to-[#eef9fd] flex flex-col justify-between relative overflow-hidden font-sans text-[#2A2A3A]"
  >
    <!-- Background Watermark Graphics -->
    <ImageWithFallback
      :src="images.kaleidoscopeDrop"
      alt=""
      class="absolute -right-32 top-10 w-[500px] h-auto opacity-[0.06] pointer-events-none"
    />
    <div class="absolute -left-20 bottom-20 w-96 h-96 rounded-full bg-[#33C4F0]/10 blur-3xl pointer-events-none" />

    <!-- Top Header Bar -->
    <header class="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
      <NuxtLink to="/" class="flex items-center gap-2.5 no-underline">
        <div class="w-9 h-9 rounded-full bg-[#33C4F0] p-1.5 flex items-center justify-center shadow-sm">
          <ImageWithFallback :src="images.logo" alt="CreativeSelf" class="w-full h-full object-contain brightness-200" />
        </div>
        <span class="font-extrabold text-[#2A2A3A] text-xl tracking-tight">creativeSelf</span>
        <span
          class="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-[#33C4F0] px-2.5 py-0.5 rounded-full bg-[#33C4F0]/10 border border-[#33C4F0]/25 ml-1"
        >
          Be Anything But Square
        </span>
      </NuxtLink>

      <div class="flex items-center gap-4 text-xs font-medium text-[#717182]">
        <span>Already have an account?</span>
        <NuxtLink
          to="/dashboard"
          class="px-4 py-2 bg-[#f0fbff] text-[#1AB0DC] hover:bg-[#e8f9ff] font-semibold border border-[#33C4F0]/30 transition-all no-underline"
          style="border-radius: 12px 12px 28px 12px"
        >
          Log in
        </NuxtLink>
      </div>
    </header>

    <!-- Main Page Container (Open Page Onboarding Style) -->
    <main class="w-full max-w-6xl mx-auto px-6 py-6 sm:py-10 flex-1 flex flex-col justify-center relative z-10">
      <!-- Segmented Progress Indicator Bar -->
      <div v-if="!isCompleted" class="w-full max-w-md mx-auto mb-8">
        <div class="flex items-center gap-2 mb-2">
          <div
            v-for="sNum in [1, 2, 3, 4]"
            :key="sNum"
            :class="['h-1.5 flex-1 transition-all duration-300', step >= sNum ? 'bg-[#33C4F0]' : 'bg-gray-200']"
            style="border-radius: 4px 4px 12px 4px"
          />
        </div>
        <div class="flex justify-between items-center text-[11px] font-medium text-[#717182]">
          <span>{{ stepLabel }}</span>
          <span>Step {{ step }} of 4</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <!-- Registration Complete View -->
        <Motion
          v-if="isCompleted"
          key="completed-step"
          :initial="{ opacity: 0, y: 15 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0 }"
          class="text-center max-w-lg mx-auto py-6"
        >
          <div
            class="w-16 h-16 bg-[#e8f9ff] text-[#33C4F0] flex items-center justify-center mx-auto mb-4 border border-[#33C4F0]/30 shadow-sm"
            style="border-radius: 20px 20px 48px 20px"
          >
            <PhCheckCircle :size="38" weight="bold" />
          </div>

          <h1 class="text-3xl font-extrabold text-[#2A2A3A] mb-2">Welcome to CreativeSelf, {{ fullName || 'Explorer' }}!</h1>
          <p class="text-[#717182] text-sm leading-relaxed mb-6">
            Your account and subscription to
            <strong class="text-[#33C4F0] font-bold">{{ selectedPlanId.replace(/-/g, ' ').toUpperCase() }}</strong> are
            active.
          </p>

          <div class="bg-white p-6 border border-[#e8f9ff] shadow-md text-left mb-8" style="border-radius: 24px 24px 64px 24px">
            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span class="text-[#717182] uppercase tracking-wider font-semibold text-[10px]">Account Holder</span>
                <p class="font-bold text-[#2A2A3A] text-sm mt-0.5">{{ fullName || 'Explorer' }}</p>
                <p class="text-[#717182]">{{ email || 'member@creativeself.io' }}</p>
              </div>
              <div>
                <span class="text-[#717182] uppercase tracking-wider font-semibold text-[10px]">Organization</span>
                <p class="font-bold text-[#2A2A3A] text-sm mt-0.5">{{ companyName || 'Independent' }}</p>
                <p class="text-[#717182]">{{ orgSizeLabel }}</p>
              </div>
            </div>
          </div>

          <button
            class="px-8 py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white font-bold shadow-md hover:shadow-lg transition-all text-sm inline-flex items-center gap-2"
            style="border-radius: 14px 14px 36px 14px"
            @click="navigateTo('/dashboard')"
          >
            Explore Your Workspace
            <PhArrowRight :size="18" weight="bold" />
          </button>
        </Motion>

        <!-- Step 1: Personal Details -->
        <Motion v-else-if="step === 1" key="s1-view" :initial="{ opacity: 0, y: 15 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0 }">
          <div class="text-center max-w-xl mx-auto mb-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-[#2A2A3A] tracking-tight mb-2">Welcome to CreativeSelf</h1>
            <p class="text-[#717182] text-sm leading-relaxed">
              Enter your details to create your personal profile and unlock curated activity recommendations.
            </p>
          </div>

          <form class="space-y-4 max-w-xl mx-auto" @submit.prevent="step = 2">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Full Name</label>
                <div class="relative flex items-center">
                  <PhUser class="absolute left-3.5 text-gray-400 pointer-events-none" :size="18" />
                  <input v-model="fullName" type="text" placeholder="e.g. Alex Morgan" :class="inputClass" :style="inputStyle" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Work / Personal Email</label>
                <div class="relative flex items-center">
                  <PhEnvelope class="absolute left-3.5 text-gray-400 pointer-events-none" :size="18" />
                  <input v-model="email" type="email" placeholder="alex@company.com" :class="inputClass" :style="inputStyle" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Password</label>
                <div class="relative flex items-center">
                  <PhLock class="absolute left-3.5 text-gray-400 pointer-events-none" :size="18" />
                  <input v-model="password" type="password" placeholder="••••••••" :class="inputClass" :style="inputStyle" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Phone Number (Optional)</label>
                <div class="relative flex items-center">
                  <PhPhone class="absolute left-3.5 text-gray-400 pointer-events-none" :size="18" />
                  <input v-model="phone" type="tel" placeholder="+1 (555) 000-0000" :class="inputClass" :style="inputStyle" />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Job Title / Role (Optional)</label>
              <div class="relative flex items-center">
                <PhBriefcase class="absolute left-3.5 text-gray-400 pointer-events-none" :size="18" />
                <input
                  v-model="jobTitle"
                  type="text"
                  placeholder="e.g. Creative Lead, HR Specialist, Founder"
                  :class="inputClass"
                  :style="inputStyle"
                />
              </div>
            </div>

            <div class="pt-6 flex justify-center">
              <button
                type="submit"
                class="w-full sm:w-auto px-8 py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white font-bold shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                style="border-radius: 14px 14px 36px 14px"
              >
                Continue to Team Scale
                <PhArrowRight :size="18" weight="bold" />
              </button>
            </div>
          </form>
        </Motion>

        <!-- Step 2: Scale Choice -->
        <Motion v-else-if="step === 2" key="s2-view" :initial="{ opacity: 0, y: 15 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0 }">
          <div class="text-center max-w-xl mx-auto mb-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-[#2A2A3A] tracking-tight mb-2">How will you use CreativeSelf?</h1>
            <p class="text-[#717182] text-sm leading-relaxed">
              Choose your scale so we can configure the ideal individual or corporate features for you.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-8">
            <!-- Individual Card -->
            <div
              :class="[
                'cursor-pointer p-6 border transition-all flex flex-col justify-between',
                isIndividualSelected
                  ? 'border-[#33C4F0] bg-[#f0fbff] ring-2 ring-[#33C4F0]/30 shadow-md'
                  : 'border-gray-200 bg-white hover:border-[#33C4F0]/50 hover:shadow-sm',
              ]"
              style="border-radius: 24px 24px 64px 24px"
              @click="handleSelectOrgSize('just-me', 'individual')"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 bg-[#33C4F0]/15 text-[#33C4F0] flex items-center justify-center" style="border-radius: 14px 14px 32px 14px">
                    <PhUser :size="26" weight="bold" />
                  </div>
                  <div
                    :class="[
                      'w-6 h-6 rounded-full border flex items-center justify-center transition-colors',
                      isIndividualSelected ? 'border-[#33C4F0] bg-[#33C4F0] text-white' : 'border-gray-300 bg-white',
                    ]"
                  >
                    <PhCheck v-if="isIndividualSelected" :size="14" weight="bold" />
                  </div>
                </div>

                <h3 class="font-extrabold text-[#2A2A3A] text-lg mb-1">Individual Explorer</h3>
                <p class="text-xs text-[#717182] leading-relaxed">
                  I'm looking for personal creative activities, wellness learning tracks, and Acumen AI guidance.
                </p>
              </div>

              <span class="mt-4 inline-block text-[11px] font-bold text-[#1AB0DC] uppercase tracking-wider">
                For Solo Explorers &amp; Freelancers
              </span>
            </div>

            <!-- Corporate Team Card -->
            <div
              :class="[
                'cursor-pointer p-6 border transition-all flex flex-col justify-between',
                planCategory === 'corporate'
                  ? 'border-[#33C4F0] bg-[#f0fbff] ring-2 ring-[#33C4F0]/30 shadow-md'
                  : 'border-gray-200 bg-white hover:border-[#33C4F0]/50 hover:shadow-sm',
              ]"
              style="border-radius: 24px 24px 64px 24px"
              @click="handleSelectOrgSize('0-50', 'corporate')"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 bg-[#8B5CF6]/15 text-purple-600 flex items-center justify-center" style="border-radius: 14px 14px 32px 14px">
                    <PhUsers :size="26" weight="bold" />
                  </div>
                  <div
                    :class="[
                      'w-6 h-6 rounded-full border flex items-center justify-center transition-colors',
                      planCategory === 'corporate' ? 'border-[#33C4F0] bg-[#33C4F0] text-white' : 'border-gray-300 bg-white',
                    ]"
                  >
                    <PhCheck v-if="planCategory === 'corporate'" :size="14" weight="bold" />
                  </div>
                </div>

                <h3 class="font-extrabold text-[#2A2A3A] text-lg mb-1">Corporate &amp; Team Benefits</h3>
                <p class="text-xs text-[#717182] leading-relaxed">
                  I'm configuring employee wellness credits, brand reservations, and team engagement analytics.
                </p>
              </div>

              <span class="mt-4 inline-block text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                For Teams of 2 to 500+ Employees
              </span>
            </div>
          </div>

          <!-- Granular Size Sub-options if Corporate chosen -->
          <div
            v-if="planCategory === 'corporate'"
            class="max-w-4xl mx-auto bg-white p-5 border border-[#e8f9ff] mb-8"
            style="border-radius: 24px 24px 56px 24px"
          >
            <label class="block text-xs font-bold text-[#2A2A3A] mb-3">Select Team Employee Count:</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="opt in orgSizeOptions.filter((o) => o.id !== 'just-me')"
                :key="opt.id"
                type="button"
                :class="[
                  'py-2 px-3 text-xs font-semibold transition-all border',
                  orgSize === opt.id
                    ? 'bg-[#33C4F0] text-white border-[#33C4F0] shadow-sm'
                    : 'bg-gray-50 text-[#2A2A3A] border-gray-200 hover:bg-gray-100',
                ]"
                style="border-radius: 12px 12px 28px 12px"
                @click="orgSize = opt.id"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between max-w-4xl mx-auto pt-4 border-t border-gray-200">
            <button type="button" :class="backButtonClass" style="border-radius: 12px 12px 24px 12px" @click="step = 1">
              <PhArrowLeft :size="16" />
              Back
            </button>
            <button type="button" :class="primaryButtonClass" style="border-radius: 14px 14px 36px 14px" @click="step = 3">
              Continue to Organization Info
              <PhArrowRight :size="18" weight="bold" />
            </button>
          </div>
        </Motion>

        <!-- Step 3: Company Info -->
        <Motion v-else-if="step === 3" key="s3-view" :initial="{ opacity: 0, y: 15 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0 }">
          <div class="text-center max-w-xl mx-auto mb-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-[#2A2A3A] tracking-tight mb-2">Tell us about your organization</h1>
            <p class="text-[#717182] text-sm leading-relaxed">
              Provide your company name and focus area to customize your workspace dashboard.
            </p>
          </div>

          <form class="space-y-4 max-w-xl mx-auto" @submit.prevent="step = 4">
            <div>
              <label class="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Company / Organization Name</label>
              <div class="relative flex items-center">
                <PhBuildings class="absolute left-3.5 text-gray-400 pointer-events-none" :size="18" />
                <input
                  v-model="companyName"
                  type="text"
                  placeholder="e.g. Acme Creative Agency or Independent Studio"
                  :class="inputClass"
                  :style="inputStyle"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Industry / Focus Area</label>
                <select
                  v-model="industry"
                  class="w-full px-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm font-medium bg-white"
                  :style="inputStyle"
                >
                  <option v-for="ind in industries" :key="ind" :value="ind">{{ ind }}</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Company Website (Optional)</label>
                <div class="relative flex items-center">
                  <PhGlobe class="absolute left-3.5 text-gray-400 pointer-events-none" :size="18" />
                  <input v-model="website" type="url" placeholder="https://company.com" :class="inputClass" :style="inputStyle" />
                </div>
              </div>
            </div>

            <div class="p-4 bg-[#f0fbff] border border-[#e8f9ff] flex items-center gap-3 mt-4" style="border-radius: 16px 16px 40px 16px">
              <PhSparkle class="text-[#33C4F0] flex-shrink-0" :size="20" />
              <p class="text-xs text-[#2A2A3A] leading-relaxed">
                Based on your selection of <strong class="text-[#33C4F0]">{{ orgSizeLabel }}</strong>, recommended plans
                are ready in the next step.
              </p>
            </div>

            <div class="flex items-center justify-between pt-6 border-t border-gray-200">
              <button type="button" :class="backButtonClass" style="border-radius: 12px 12px 24px 12px" @click="step = 2">
                <PhArrowLeft :size="16" />
                Back
              </button>
              <button type="submit" :class="primaryButtonClass" style="border-radius: 14px 14px 36px 14px">
                Continue to Select Plan
                <PhArrowRight :size="18" weight="bold" />
              </button>
            </div>
          </form>
        </Motion>

        <!-- Step 4: Multi-Card Subscription Layout -->
        <Motion
          v-else
          key="s4-view"
          :initial="{ opacity: 0, y: 15 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0 }"
          class="w-full max-w-5xl mx-auto"
        >
          <div class="text-center max-w-xl mx-auto mb-6">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-[#2A2A3A] tracking-tight mb-2">Select your CreativeSelf plan</h1>
            <p class="text-[#717182] text-sm leading-relaxed">
              Tailored learning &amp; wellness packages to elevate your creative growth.
            </p>
          </div>

          <!-- Category Toggle Tabs -->
          <div class="flex justify-center mb-8">
            <div class="bg-gray-100 p-1 inline-flex border border-gray-200" style="border-radius: 20px 20px 48px 20px">
              <button
                v-for="cat in ['individual', 'corporate'] as const"
                :key="cat"
                type="button"
                :class="[
                  'px-5 py-2 text-xs font-bold transition-all',
                  planCategory === cat ? 'bg-[#33C4F0] text-white shadow-sm' : 'text-[#717182] hover:text-[#2A2A3A]',
                ]"
                style="border-radius: 16px 16px 36px 16px"
                @click="planCategory = cat"
              >
                {{ cat === 'individual' ? 'Individual Plans' : 'Corporate Team Plans' }}
              </button>
            </div>
          </div>

          <!-- 4-Card Plan Options Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 items-stretch">
            <div
              v-for="plan in activePlans"
              :key="plan.id"
              :class="[
                'cursor-pointer p-6 border transition-all flex flex-col justify-between relative overflow-hidden group',
                selectedPlanId === plan.id
                  ? 'border-[#33C4F0] bg-gradient-to-b from-[#f0fbff] via-white to-[#f0fbff] ring-2 ring-[#33C4F0]/30 shadow-xl'
                  : 'border-gray-200/90 bg-gradient-to-b from-white via-[#fafdfd] to-[#f7fcfe] hover:border-[#33C4F0]/60 hover:shadow-xl hover:-translate-y-1',
              ]"
              style="border-radius: 24px 24px 64px 24px"
              @click="selectedPlanId = plan.id"
            >
              <!-- Top Accent Color Bar -->
              <div class="absolute top-0 left-0 right-0 h-1.5 transition-all" :style="{ backgroundColor: plan.color }" />

              <div>
                <!-- Header Row: Icon Badge + Popular Tag -->
                <div class="flex items-center justify-between mb-4 pt-1">
                  <div
                    class="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105"
                    :style="{ backgroundColor: `${plan.color}15`, color: plan.color }"
                  >
                    <component :is="plan.icon" :size="22" weight="bold" />
                  </div>

                  <span
                    v-if="plan.highlighted"
                    class="bg-gradient-to-r from-amber-400 to-amber-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1"
                  >
                    <PhSparkle :size="11" weight="fill" />
                    Most Popular
                  </span>
                  <span
                    v-else
                    class="font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border"
                    :style="{ color: plan.color, borderColor: `${plan.color}30`, backgroundColor: `${plan.color}08` }"
                  >
                    Tier
                  </span>
                </div>

                <!-- Title & Pricing -->
                <h3 class="font-extrabold text-sm text-[#2A2A3A] uppercase tracking-wider mb-1">{{ plan.name }}</h3>

                <div class="flex items-baseline gap-1 mb-3">
                  <span class="text-3xl font-black text-[#2A2A3A] tracking-tight">{{ plan.price }}</span>
                  <span class="text-xs text-[#717182] font-semibold">/{{ plan.period }}</span>
                </div>

                <!-- Tagline Container -->
                <div
                  class="p-2.5 rounded-xl border text-[11px] font-medium leading-relaxed mb-4"
                  :style="{
                    backgroundColor: selectedPlanId === plan.id ? `${plan.color}12` : `${plan.color}08`,
                    borderColor: `${plan.color}25`,
                    color: '#2A2A3A',
                  }"
                >
                  {{ plan.tagline }}
                </div>

                <!-- Feature List Header -->
                <div
                  class="text-[10px] font-extrabold uppercase tracking-wider text-[#717182] mb-3 pb-1 border-b border-gray-100 flex items-center justify-between"
                >
                  <span>What's Included</span>
                  <span class="text-[9px] font-normal text-gray-400">Full Access</span>
                </div>

                <!-- Feature List -->
                <ul class="space-y-2.5 mb-6">
                  <li v-for="feat in plan.features" :key="feat" class="flex items-start gap-2.5 text-xs text-[#2A2A3A] font-medium">
                    <div
                      class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs"
                      :style="{ backgroundColor: `${plan.color}20`, color: plan.color }"
                    >
                      <PhCheck :size="10" weight="bold" />
                    </div>
                    <span class="leading-snug">{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <!-- Bottom Select Button -->
              <button
                type="button"
                :class="[
                  'w-full py-3.5 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm',
                  selectedPlanId === plan.id
                    ? 'bg-[#33C4F0] text-white shadow-md hover:bg-[#1AB0DC]'
                    : 'bg-gray-100/90 text-[#2A2A3A] hover:bg-[#33C4F0] hover:text-white',
                ]"
                style="border-radius: 12px 12px 24px 12px"
                @click.stop="selectedPlanId = plan.id"
              >
                <template v-if="selectedPlanId === plan.id">
                  <PhCheckCircle :size="16" weight="bold" />
                  Plan Selected
                </template>
                <template v-else>Select Plan</template>
              </button>
            </div>
          </div>

          <!-- Bottom Navigation Row -->
          <div class="flex items-center justify-between max-w-5xl mx-auto pt-4 border-t border-gray-200">
            <button
              type="button"
              class="px-5 py-2.5 text-[#717182] hover:text-[#2A2A3A] font-semibold text-xs sm:text-sm flex items-center gap-2 rounded-xl hover:bg-gray-100 transition-colors"
              @click="step = 3"
            >
              <PhArrowLeft :size="16" />
              Back
            </button>
            <button
              type="button"
              :class="primaryButtonClass"
              style="border-radius: 14px 14px 28px 14px"
              @click="handleCompleteRegistration()"
            >
              Complete Registration
              <PhCheckCircle :size="18" weight="bold" />
            </button>
          </div>
        </Motion>
      </AnimatePresence>
    </main>

    <!-- Page Footer -->
    <footer
      class="w-full max-w-6xl mx-auto px-6 py-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#717182] relative z-10"
    >
      <p>© 2026 CreativeSelf. All rights reserved.</p>
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1.5 text-cyan-600 font-medium">
          <PhShieldCheck :size="16" />
          256-Bit SSL Encrypted &amp; Secure
        </span>
        <NuxtLink to="/" class="text-[#717182] hover:text-[#2A2A3A] no-underline">Privacy Policy</NuxtLink>
      </div>
    </footer>
  </div>
</template>
