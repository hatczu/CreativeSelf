<script setup lang="ts">
import { PhCaretLeft, PhCheck, PhUser, PhEnvelopeSimple, PhLockKey, PhBuildings } from '@phosphor-icons/vue';

const app = useClientMobileApp();

const plans = [
  { id: 'basic-creative', title: 'Basic Creative', price: '$7', period: '/month', popular: false, features: ['1 service brand', '2 activities'] },
  { id: 'advanced-creative', title: 'Advanced Creative', price: '$18', period: '/month', popular: true, features: ['2 service brands', '4 activities'] },
  {
    id: 'elite-creative',
    title: 'Elite Creative',
    price: '$35',
    period: '/month',
    popular: false,
    features: ['Unlimited service brands', 'Unlimited activities'],
  },
];

const industries = [
  'Technology & Design',
  'Creative Arts & Media',
  'Healthcare & Wellness',
  'Education & Non-Profit',
  'Corporate & Financial Services',
];

const inputClass =
  'w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] text-xs font-normal text-[#1A1A28] focus:outline-none focus:border-[#33C4F0] placeholder-[#2A2A3A]/50 shadow-2xs';
const inputStyle = { borderRadius: '14px 14px 32px 14px', fontFamily: 'Poppins, sans-serif' };
const optionClass = (selected: boolean) => [
  'cursor-pointer p-4 border text-left flex items-center justify-between transition-all',
  selected ? 'border-[#33C4F0] bg-white shadow-xs ring-1 ring-[#33C4F0]/30' : 'border-[#E5E7EB] bg-white',
];
const checkClass = (selected: boolean) => [
  'w-5 h-5 rounded-full border flex items-center justify-center',
  selected ? 'bg-[#33C4F0] border-[#33C4F0] text-white' : 'border-slate-300',
];

const goBack = () => {
  if (app.regStep > 1) app.regStep -= 1;
  else app.setActiveScreen('onboarding');
};

const selectIndividual = () => {
  app.regAccountType = 'individual';
  app.planCategory = 'individual';
  app.orgSize = 'just-me';
};

const selectCorporate = () => {
  app.regAccountType = 'corporate';
  app.planCategory = 'corporate';
  if (app.orgSize === 'just-me') app.orgSize = '0-50';
};

const handleContinue = () => {
  if (app.regStep < 4) app.regStep += 1;
  else app.handleDemoLogin('client');
};

const planClass = (plan: (typeof plans)[number]) => [
  'cursor-pointer p-4 sm:p-4.5 transition-all relative border',
  plan.popular
    ? 'bg-[#00B0D9] text-white shadow-md border-[#00B0D9]'
    : app.selectedPlanId === plan.id
      ? 'bg-white border-[#33C4F0] text-[#1A1A28] ring-1 ring-[#33C4F0]'
      : 'bg-white border-[#E5E7EB] text-[#1A1A28]',
];
const planCheckClass = (plan: (typeof plans)[number]) => [
  'w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all',
  app.selectedPlanId === plan.id
    ? plan.popular
      ? 'bg-white text-[#00B0D9] border-white'
      : 'bg-[#33C4F0] text-white border-[#33C4F0]'
    : 'border-slate-300',
];
</script>

<template>
  <div class="relative flex flex-col h-full bg-[#F7FCFF] text-[#1A1A28] justify-between p-5 overflow-hidden font-sans isolate">
    <!-- Inverted Prism Kaleidoscope Top Graphic -->
    <div class="absolute top-[-598px] left-[-437px] w-[839px] h-[839px] pointer-events-none z-0 flex items-center justify-center">
      <div class="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
        <img :src="images.kaleidoscopeDrop" alt="CreativeSelf Inverted Prism" class="w-full h-full object-cover scale-110 rotate-[-139.79deg]" />
      </div>
    </div>

    <!-- Soft Gradient Overlay -->
    <div
      class="absolute top-[-40px] left-0 right-0 h-[220px] pointer-events-none z-2"
      :style="{
        background: 'linear-gradient(180deg, rgba(247, 252, 255, 0.92) 0%, rgba(247, 252, 255, 0.7) 55%, rgba(247, 252, 255, 0) 100%)',
        filter: 'blur(45px)',
      }"
    />

    <!-- Top Navigation Row -->
    <div class="relative z-10 space-y-3 pt-1">
      <div class="flex items-center justify-between">
        <button
          type="button"
          class="w-9 h-9 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#1A1A28] hover:bg-slate-200 transition shadow-2xs"
          @click="goBack"
        >
          <PhCaretLeft :size="18" weight="bold" />
        </button>

        <button type="button" class="text-[14px] font-semibold text-[#33C4F0] hover:underline" style="font-family: Poppins, sans-serif" @click="app.setActiveScreen('login')">
          Log in
        </button>
      </div>

      <!-- 4-Segment Line Progress Bar -->
      <div class="flex items-center gap-2 w-full h-1">
        <div
          v-for="n in 4"
          :key="n"
          :class="['h-1 flex-1 rounded-full transition-all', app.regStep >= n ? 'bg-[#33C4F0]' : 'bg-[#E5E7EB]']"
        />
      </div>
    </div>

    <!-- Step Main Content -->
    <div
      class="relative z-10 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-10 pb-4 sm:pt-12 space-y-4"
    >
      <!-- Step 1: Enter Username & Details -->
      <Motion v-if="app.regStep === 1" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" class="space-y-4">
        <div>
          <h1 class="text-[24px] font-bold text-[#1A1A28] leading-[29px] font-sans" style="font-family: Century Gothic, Poppins, sans-serif">
            Enter Username
          </h1>
          <p class="text-[12px] font-normal text-[#6A7282] leading-[18px] mt-1.5" style="font-family: Poppins, sans-serif">
            This will be your public handle and part of your unique page link, fans will use this to support you.
          </p>
        </div>

        <div class="space-y-3.5 pt-1">
          <div>
            <label class="block text-[12px] font-medium text-[#1A1A28] mb-1" style="font-family: Poppins, sans-serif">Full Name</label>
            <div class="relative flex items-center">
              <PhUser :size="18" class="absolute left-3.5 text-[#99A1AF]" />
              <input v-model="app.regName" type="text" placeholder="e.g. Alex Morgan" :class="inputClass" :style="inputStyle" />
            </div>
          </div>

          <div>
            <label class="block text-[12px] font-medium text-[#1A1A28] mb-1" style="font-family: Poppins, sans-serif">Email</label>
            <div class="relative flex items-center">
              <PhEnvelopeSimple :size="18" class="absolute left-3.5 text-[#99A1AF]" />
              <input v-model="app.emailInput" type="email" placeholder="youname@email.com" :class="inputClass" :style="inputStyle" />
            </div>
          </div>

          <div>
            <label class="block text-[12px] font-medium text-[#1A1A28] mb-1" style="font-family: Poppins, sans-serif">Password</label>
            <div class="relative flex items-center">
              <PhLockKey :size="18" class="absolute left-3.5 text-[#99A1AF]" />
              <input v-model="app.passwordInput" type="password" placeholder="••••••••" :class="inputClass" :style="inputStyle" />
            </div>
          </div>
        </div>
      </Motion>

      <!-- Step 2: Account Purpose -->
      <Motion v-else-if="app.regStep === 2" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" class="space-y-4">
        <div>
          <h1 class="text-[24px] font-bold text-[#1A1A28] leading-[29px]" style="font-family: Century Gothic, Poppins, sans-serif">
            How will you use CreativeSelf?
          </h1>
          <p class="text-[12px] font-normal text-[#6A7282] leading-[18px] mt-1.5" style="font-family: Poppins, sans-serif">
            Select your account type to configure individual or corporate features.
          </p>
        </div>

        <div class="space-y-3 pt-1">
          <div :class="optionClass(app.regAccountType === 'individual')" style="border-radius: 14px 14px 32px 14px" @click="selectIndividual">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#ECFEFF] text-[#007595] flex items-center justify-center">
                <PhUser :size="20" weight="bold" />
              </div>
              <div>
                <p class="text-xs font-bold text-[#1A1A28]">Individual Explorer</p>
                <p class="text-[11px] text-[#6A7282]">Personal creative wellness &amp; AI</p>
              </div>
            </div>
            <div :class="checkClass(app.regAccountType === 'individual')">
              <PhCheck v-if="app.regAccountType === 'individual'" :size="12" weight="bold" />
            </div>
          </div>

          <div :class="optionClass(app.regAccountType === 'corporate')" style="border-radius: 14px 14px 32px 14px" @click="selectCorporate">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <PhBuildings :size="20" weight="bold" />
              </div>
              <div>
                <p class="text-xs font-bold text-[#1A1A28]">Corporate &amp; Team</p>
                <p class="text-[11px] text-[#6A7282]">Employee credits &amp; analytics</p>
              </div>
            </div>
            <div :class="checkClass(app.regAccountType === 'corporate')">
              <PhCheck v-if="app.regAccountType === 'corporate'" :size="12" weight="bold" />
            </div>
          </div>
        </div>
      </Motion>

      <!-- Step 3: Organization Details -->
      <Motion v-else-if="app.regStep === 3" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" class="space-y-4">
        <div>
          <h1 class="text-[24px] font-bold text-[#1A1A28] leading-[29px]" style="font-family: Century Gothic, Poppins, sans-serif">
            Tell us about your organization
          </h1>
          <p class="text-[12px] font-normal text-[#6A7282] leading-[18px] mt-1.5" style="font-family: Poppins, sans-serif">
            Provide your organization details to customize your workspace.
          </p>
        </div>

        <div class="space-y-3.5 pt-1">
          <div>
            <label class="block text-[12px] font-medium text-[#1A1A28] mb-1">Company / Organization Name</label>
            <input
              v-model="app.companyNameInput"
              type="text"
              placeholder="e.g. Acme Creative Agency"
              class="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-xs font-normal text-[#1A1A28] focus:outline-none focus:border-[#33C4F0] shadow-2xs"
              :style="inputStyle"
            />
          </div>

          <div>
            <label class="block text-[12px] font-medium text-[#1A1A28] mb-1">Industry / Focus Area</label>
            <select
              v-model="app.industryInput"
              class="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-xs font-normal text-[#1A1A28] focus:outline-none focus:border-[#33C4F0] shadow-2xs"
              :style="inputStyle"
            >
              <option v-for="industry in industries" :key="industry" :value="industry">{{ industry }}</option>
            </select>
          </div>
        </div>
      </Motion>

      <!-- Step 4: Plan Selection -->
      <Motion v-else :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" class="space-y-4">
        <div>
          <h1 class="text-[24px] font-bold text-[#1A1A28] leading-[29px]" style="font-family: Century Gothic, Poppins, sans-serif">
            Select your CreativeSelf plan
          </h1>
          <p class="text-[12px] font-normal text-[#6A7282] leading-[18px] mt-1.5" style="font-family: Poppins, sans-serif">
            Tailored learning &amp; wellness packages to elevate your creative growth.
          </p>
        </div>

        <div class="space-y-3 pt-1">
          <div v-for="plan in plans" :key="plan.id" :class="planClass(plan)" style="border-radius: 16px 16px 36px 16px" @click="app.selectedPlanId = plan.id">
            <span
              v-if="plan.popular"
              class="absolute -top-2.5 right-4 bg-amber-400 text-slate-950 font-semibold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs"
            >
              + Most Popular
            </span>
            <div class="flex items-start justify-between">
              <div class="space-y-1">
                <p :class="['text-[11px] font-extrabold uppercase tracking-wider', plan.popular ? 'text-white' : 'text-slate-500']">{{ plan.title }}</p>
                <p class="text-2xl font-black leading-none">
                  {{ plan.price }} <span class="text-xs font-medium opacity-80">{{ plan.period }}</span>
                </p>

                <div class="pt-2 space-y-1">
                  <div v-for="(feat, idx) in plan.features" :key="idx" class="flex items-center gap-2 text-[12px]">
                    <div
                      :class="[
                        'w-4 h-4 rounded-full flex items-center justify-center shrink-0',
                        plan.popular ? 'bg-white/20 text-white' : 'bg-[#ECFEFF] text-[#007595]',
                      ]"
                    >
                      <PhCheck :size="10" weight="bold" />
                    </div>
                    <span :class="plan.popular ? 'text-white/90 font-medium' : 'text-[#6A7282] font-medium'">{{ feat }}</span>
                  </div>
                </div>
              </div>

              <div :class="planCheckClass(plan)">
                <PhCheck v-if="app.selectedPlanId === plan.id" :size="12" weight="bold" />
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </div>

    <!-- Pinned Bottom Action Group -->
    <div class="relative z-20 shrink-0 pt-3 pb-1 space-y-2 bg-[#F7FCFF]">
      <button
        type="button"
        class="w-full h-[46px] flex items-center justify-center text-white text-[14px] font-bold shadow-md transition-all duration-200 active:scale-[0.99] hover:opacity-95"
        style="background-color: #33c4f0; border-radius: 26px 26px 62px 26px; font-family: Century Gothic, Poppins, sans-serif"
        @click="handleContinue"
      >
        {{ app.regStep === 4 ? 'Complete Registration' : 'Continue' }}
      </button>

      <button
        v-if="app.regStep > 1"
        type="button"
        class="w-full h-[46px] flex items-center justify-center bg-[#F0F9FF] text-[#33C4F0] text-[14px] font-bold transition hover:bg-[#E0F2FE] active:scale-[0.99]"
        style="border-radius: 26px 26px 62px 26px; font-family: Century Gothic, Poppins, sans-serif"
        @click="app.regStep -= 1"
      >
        Back
      </button>
      <button
        v-else
        type="button"
        class="w-full text-center text-[14px] font-semibold text-[#6A7282] hover:text-[#1A1A28] transition py-1"
        style="font-family: Poppins, sans-serif"
        @click="app.setActiveScreen('login')"
      >
        Already have an account? <span class="text-[#33C4F0] font-semibold underline">Log in</span>
      </button>
    </div>
  </div>
</template>
