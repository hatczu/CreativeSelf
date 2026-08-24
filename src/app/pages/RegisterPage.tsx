import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Envelope as Mail,
  Lock,
  Phone,
  Briefcase,
  Buildings as Building2,
  Users,
  CheckCircle as CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
  Building,
  Globe,
  ShieldCheck,
  Sparkle as Sparkles,
  Trophy,
  Brain,
} from '@phosphor-icons/react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import kaleidoscope from '../../imports/CS_Kaleidescope_Juice_Drop.png';
import logoIcon from '../../imports/Logo.png';

const orgSizeOptions = [
  {
    id: 'just-me',
    label: 'Just me',
    sub: 'Individual Explorer or Freelancer',
    icon: User,
    badge: 'Individual',
    type: 'individual' as const,
  },
  {
    id: '0-50',
    label: '0 - 50 employees',
    sub: 'Small Team or Emerging Startup',
    icon: Users,
    badge: 'Small Business',
    type: 'corporate' as const,
  },
  {
    id: '51-200',
    label: '51 - 200 employees',
    sub: 'Growing Organization',
    icon: Building2,
    badge: 'Growth Enterprise',
    type: 'corporate' as const,
  },
  {
    id: '201-500',
    label: '201 - 500 employees',
    sub: 'Mid to Large Organization',
    icon: Building,
    badge: 'Large Business',
    type: 'corporate' as const,
  },
  {
    id: '500+',
    label: '500+ employees',
    sub: 'Global Enterprise & Corporate',
    icon: Globe,
    badge: 'Enterprise',
    type: 'corporate' as const,
  },
];

const individualPlans = [
  {
    id: 'basic-creative',
    name: 'BASIC CREATIVE',
    tagline: '1 Service Brand, 2 Activities Per Month',
    features: ['1 Service Brand', '2 Activities Per Month', 'Creative Personality Assessment', 'Acumen AI recommendations'],
    price: 'Free',
    period: 'forever',
    highlighted: false,
    color: '#3B82F6',
    icon: Sparkles,
  },
  {
    id: 'advanced-creative',
    name: 'ADVANCED CREATIVE',
    tagline: '2 Service Brands, 4 Activities Per Month',
    features: ['2 Service Brands', '4 Activities Per Month', 'Deep Acumen AI Insights', 'Personalized Learning Track', 'Priority Reservations'],
    price: '$49',
    period: 'per month',
    highlighted: true,
    color: '#33C4F0',
    icon: Trophy,
  },
  {
    id: 'elite-creative',
    name: 'ELITE CREATIVE',
    tagline: '3 Service Brands and 6 Activities Per Month',
    features: ['3 Service Brands', '6 Activities Per Month', 'Unlimited Acumen AI Consultation', 'Exclusive Masterclasses', 'VIP Community Perks'],
    price: '$99',
    period: 'per month',
    highlighted: false,
    color: '#8B5CF6',
    icon: Brain,
  },
  {
    id: 'one-on-one-creative',
    name: 'ONE-ON-ONE CREATIVE',
    tagline: 'Custom Consulting and Coaching Fees Apply',
    features: ['Custom Consulting & Coaching', 'Tailored Learning Plan', '1-on-1 Dedicated Mentor', 'Flexible Schedule'],
    price: 'Custom',
    period: 'fees apply',
    highlighted: false,
    color: '#F59E0B',
    icon: User,
  },
];

const corporatePlans = [
  {
    id: 'basic-creative-team',
    name: 'BASIC CREATIVE TEAM',
    tagline: '2 Service Brands, 4 Activities with 8 employees per Activity per Month',
    features: ['2 Service Brands', '4 Activities Per Month', '8 Employees per Activity', 'Team Engagement Analytics', 'Standard Support'],
    price: '$299',
    period: 'per month',
    highlighted: false,
    color: '#3B82F6',
    icon: Users,
  },
  {
    id: 'advanced-creative-team',
    name: 'ADVANCED CREATIVE TEAM',
    tagline: '4 Service Brands, 6 Activities with 10 employees per Activity per Month',
    features: ['4 Service Brands', '6 Activities Per Month', '10 Employees per Activity', 'Corporate Wellbeing Reports', 'Dedicated Account Manager'],
    price: '$599',
    period: 'per month',
    highlighted: true,
    color: '#33C4F0',
    icon: Trophy,
  },
  {
    id: 'elite-creative-team',
    name: 'ELITE CREATIVE TEAM',
    tagline: '6 Service Brands, 12 Activities with 15 employees per Activity per Month',
    features: ['6 Service Brands', '12 Activities Per Month', '15 Employees per Activity', 'Executive Insights Portal', 'On-site Facilitation', 'Vendor Management'],
    price: '$1,199',
    period: 'per month',
    highlighted: false,
    color: '#8B5CF6',
    icon: Building2,
  },
  {
    id: 'custom-creative-corporate',
    name: 'CUSTOM CREATIVE',
    tagline: 'Custom Creative Activities, Learning Plans and Corporate Consulting',
    features: ['Custom Creative Activities', 'Tailored Learning Plans', 'Corporate Consulting', 'Enterprise SLA & Security', 'Global Rollout Support'],
    price: 'Custom',
    period: 'contact sales',
    highlighted: false,
    color: '#F59E0B',
    icon: Globe,
  },
];

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialPlan = searchParams.get('plan') || 'advanced-creative';
  const initialCategory = (searchParams.get('category') as 'individual' | 'corporate') || 'individual';

  const [step, setStep] = useState(1);

  // Form details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  // Org size
  const [orgSize, setOrgSize] = useState<string>('just-me');

  // Company details
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Technology & Design');
  const [website, setWebsite] = useState('');

  // Subscription plan
  const [planCategory, setPlanCategory] = useState<'individual' | 'corporate'>(initialCategory);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlan);

  // Registration Complete State
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSelectOrgSize = (id: string, type: 'individual' | 'corporate') => {
    setOrgSize(id);
    setPlanCategory(type);
    if (type === 'corporate' && !companyName) {
      setCompanyName(`${fullName ? fullName.split(' ')[0] : 'My'} Organization`);
    } else if (type === 'individual' && !companyName) {
      setCompanyName('Independent Explorer');
    }
  };

  const handleNextStep2 = () => {
    setStep(3);
  };

  const handleNextStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const handleCompleteRegistration = (planId?: string) => {
    if (planId) setSelectedPlanId(planId);
    setIsCompleted(true);
  };

  const handleFinalRedirect = () => {
    navigate('/dashboard');
  };

  const activePlans = planCategory === 'individual' ? individualPlans : corporatePlans;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#f7fcff] to-[#eef9fd] flex flex-col justify-between relative overflow-hidden font-sans text-[#2A2A3A]">
      {/* Background Watermark Graphics */}
      <ImageWithFallback
        src={kaleidoscope}
        alt=""
        className="absolute -right-32 top-10 w-[500px] h-auto opacity-[0.06] pointer-events-none"
      />
      <div className="absolute -left-20 bottom-20 w-96 h-96 rounded-full bg-[#33C4F0]/10 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-full bg-[#33C4F0] p-1.5 flex items-center justify-center shadow-sm">
            <ImageWithFallback src={logoIcon} alt="CreativeSelf" className="w-full h-full object-contain brightness-200" />
          </div>
          <span className="font-extrabold text-[#2A2A3A] text-xl tracking-tight">creativeSelf</span>
          <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-[#33C4F0] px-2.5 py-0.5 rounded-full bg-[#33C4F0]/10 border border-[#33C4F0]/25 ml-1">
            Be Anything But Square
          </span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-medium text-[#717182]">
          <span>Already have an account?</span>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-[#f0fbff] text-[#1AB0DC] hover:bg-[#e8f9ff] font-semibold border border-[#33C4F0]/30 transition-all no-underline"
            style={{ borderRadius: '12px 12px 28px 12px' }}
          >
            Log in
          </Link>
        </div>
      </header>

      {/* Main Page Container (Open Page Onboarding Style) */}
      <main className="w-full max-w-6xl mx-auto px-6 py-6 sm:py-10 flex-1 flex flex-col justify-center relative z-10">
        {!isCompleted && (
          /* Segmented Progress Indicator Bar */
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4].map((sNum) => (
                <div
                  key={sNum}
                  className={`h-1.5 flex-1 transition-all duration-300 ${
                    step >= sNum ? 'bg-[#33C4F0]' : 'bg-gray-200'
                  }`}
                  style={{ borderRadius: '4px 4px 12px 4px' }}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[11px] font-medium text-[#717182]">
              <span>
                {step === 1 ? 'Personal Profile' : step === 2 ? 'Team Scale' : step === 3 ? 'Organization Identity' : 'Subscription'}
              </span>
              <span>Step {step} of 4</span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {isCompleted ? (
            /* Registration Complete View */
            <motion.div
              key="completed-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-lg mx-auto py-6"
            >
              <div
                className="w-16 h-16 bg-[#e8f9ff] text-[#33C4F0] flex items-center justify-center mx-auto mb-4 border border-[#33C4F0]/30 shadow-sm"
                style={{ borderRadius: '20px 20px 48px 20px' }}
              >
                <CheckCircle2 size={38} weight="bold" />
              </div>

              <h1 className="text-3xl font-extrabold text-[#2A2A3A] mb-2">Welcome to CreativeSelf, {fullName || 'Explorer'}!</h1>
              <p className="text-[#717182] text-sm leading-relaxed mb-6">
                Your account and subscription to{' '}
                <strong className="text-[#33C4F0] font-bold">{selectedPlanId.replace(/-/g, ' ').toUpperCase()}</strong> are active.
              </p>

              <div
                className="bg-white p-6 border border-[#e8f9ff] shadow-md text-left mb-8"
                style={{ borderRadius: '24px 24px 64px 24px' }}
              >
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#717182] uppercase tracking-wider font-semibold text-[10px]">Account Holder</span>
                    <p className="font-bold text-[#2A2A3A] text-sm mt-0.5">{fullName || 'Explorer'}</p>
                    <p className="text-[#717182]">{email || 'member@creativeself.io'}</p>
                  </div>
                  <div>
                    <span className="text-[#717182] uppercase tracking-wider font-semibold text-[10px]">Organization</span>
                    <p className="font-bold text-[#2A2A3A] text-sm mt-0.5">{companyName || 'Independent'}</p>
                    <p className="text-[#717182]">{orgSizeOptions.find((o) => o.id === orgSize)?.label}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleFinalRedirect}
                className="px-8 py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white font-bold shadow-md hover:shadow-lg transition-all text-sm inline-flex items-center gap-2"
                style={{ borderRadius: '14px 14px 36px 14px' }}
              >
                Explore Your Workspace
                <ArrowRight size={18} weight="bold" />
              </button>
            </motion.div>
          ) : step === 1 ? (
            /* Step 1: Personal Details */
            <motion.div key="s1-view" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="text-center max-w-xl mx-auto mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2A2A3A] tracking-tight mb-2">
                  Welcome to CreativeSelf
                </h1>
                <p className="text-[#717182] text-sm leading-relaxed">
                  Enter your details to create your personal profile and unlock curated activity recommendations.
                </p>
              </div>

              <form onSubmit={handleNextStep1} className="space-y-4 max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm bg-white"
                        style={{ borderRadius: '14px 14px 32px 14px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Work / Personal Email</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm bg-white"
                        style={{ borderRadius: '14px 14px 32px 14px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Password</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm bg-white"
                        style={{ borderRadius: '14px 14px 32px 14px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Phone Number (Optional)</label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm bg-white"
                        style={{ borderRadius: '14px 14px 32px 14px' }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Job Title / Role (Optional)</label>
                  <div className="relative flex items-center">
                    <Briefcase className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Creative Lead, HR Specialist, Founder"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm bg-white"
                      style={{ borderRadius: '14px 14px 32px 14px' }}
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white font-bold shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                    style={{ borderRadius: '14px 14px 36px 14px' }}
                  >
                    Continue to Team Scale
                    <ArrowRight size={18} weight="bold" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : step === 2 ? (
            /* Step 2: Scale Choice (Upwork-style Selection Cards with Teardrop Shape) */
            <motion.div key="s2-view" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="text-center max-w-xl mx-auto mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2A2A3A] tracking-tight mb-2">
                  How will you use CreativeSelf?
                </h1>
                <p className="text-[#717182] text-sm leading-relaxed">
                  Choose your scale so we can configure the ideal individual or corporate features for you.
                </p>
              </div>

              {/* Upwork-style Large Teardrop Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-8">
                {/* Individual Card */}
                <div
                  onClick={() => handleSelectOrgSize('just-me', 'individual')}
                  className={`cursor-pointer p-6 border transition-all flex flex-col justify-between ${
                    planCategory === 'individual' && orgSize === 'just-me'
                      ? 'border-[#33C4F0] bg-[#f0fbff] ring-2 ring-[#33C4F0]/30 shadow-md'
                      : 'border-gray-200 bg-white hover:border-[#33C4F0]/50 hover:shadow-sm'
                  }`}
                  style={{ borderRadius: '24px 24px 64px 24px' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 bg-[#33C4F0]/15 text-[#33C4F0] flex items-center justify-center"
                        style={{ borderRadius: '14px 14px 32px 14px' }}
                      >
                        <User size={26} weight="bold" />
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                          planCategory === 'individual' && orgSize === 'just-me'
                            ? 'border-[#33C4F0] bg-[#33C4F0] text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {planCategory === 'individual' && orgSize === 'just-me' && <Check size={14} weight="bold" />}
                      </div>
                    </div>

                    <h3 className="font-extrabold text-[#2A2A3A] text-lg mb-1">Individual Explorer</h3>
                    <p className="text-xs text-[#717182] leading-relaxed">
                      I'm looking for personal creative activities, wellness learning tracks, and Acumen AI guidance.
                    </p>
                  </div>

                  <span className="mt-4 inline-block text-[11px] font-bold text-[#1AB0DC] uppercase tracking-wider">
                    For Solo Explorers & Freelancers
                  </span>
                </div>

                {/* Corporate Team Card */}
                <div
                  onClick={() => handleSelectOrgSize('0-50', 'corporate')}
                  className={`cursor-pointer p-6 border transition-all flex flex-col justify-between ${
                    planCategory === 'corporate'
                      ? 'border-[#33C4F0] bg-[#f0fbff] ring-2 ring-[#33C4F0]/30 shadow-md'
                      : 'border-gray-200 bg-white hover:border-[#33C4F0]/50 hover:shadow-sm'
                  }`}
                  style={{ borderRadius: '24px 24px 64px 24px' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 bg-[#8B5CF6]/15 text-purple-600 flex items-center justify-center"
                        style={{ borderRadius: '14px 14px 32px 14px' }}
                      >
                        <Users size={26} weight="bold" />
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                          planCategory === 'corporate'
                            ? 'border-[#33C4F0] bg-[#33C4F0] text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {planCategory === 'corporate' && <Check size={14} weight="bold" />}
                      </div>
                    </div>

                    <h3 className="font-extrabold text-[#2A2A3A] text-lg mb-1">Corporate & Team Benefits</h3>
                    <p className="text-xs text-[#717182] leading-relaxed">
                      I'm configuring employee wellness credits, brand reservations, and team engagement analytics.
                    </p>
                  </div>

                  <span className="mt-4 inline-block text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                    For Teams of 2 to 500+ Employees
                  </span>
                </div>
              </div>

              {/* Granular Size Sub-options if Corporate chosen */}
              {planCategory === 'corporate' && (
                <div className="max-w-4xl mx-auto bg-white p-5 border border-[#e8f9ff] mb-8" style={{ borderRadius: '24px 24px 56px 24px' }}>
                  <label className="block text-xs font-bold text-[#2A2A3A] mb-3">Select Team Employee Count:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {orgSizeOptions.filter(o => o.id !== 'just-me').map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setOrgSize(opt.id)}
                        className={`py-2 px-3 text-xs font-semibold transition-all border ${
                          orgSize === opt.id
                            ? 'bg-[#33C4F0] text-white border-[#33C4F0] shadow-sm'
                            : 'bg-gray-50 text-[#2A2A3A] border-gray-200 hover:bg-gray-100'
                        }`}
                        style={{ borderRadius: '12px 12px 28px 12px' }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between max-w-4xl mx-auto pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-[#717182] hover:text-[#2A2A3A] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                  style={{ borderRadius: '12px 12px 24px 12px' }}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep2}
                  className="px-8 py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white font-bold shadow-md hover:shadow-lg transition-all text-sm flex items-center gap-2"
                  style={{ borderRadius: '14px 14px 36px 14px' }}
                >
                  Continue to Organization Info
                  <ArrowRight size={18} weight="bold" />
                </button>
              </div>
            </motion.div>
          ) : step === 3 ? (
            /* Step 3: Company Info */
            <motion.div key="s3-view" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="text-center max-w-xl mx-auto mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2A2A3A] tracking-tight mb-2">
                  Tell us about your organization
                </h1>
                <p className="text-[#717182] text-sm leading-relaxed">
                  Provide your company name and focus area to customize your workspace dashboard.
                </p>
              </div>

              <form onSubmit={handleNextStep3} className="space-y-4 max-w-xl mx-auto">
                <div>
                  <label className="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Company / Organization Name</label>
                  <div className="relative flex items-center">
                    <Building2 className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Creative Agency or Independent Studio"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm bg-white"
                      style={{ borderRadius: '14px 14px 32px 14px' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Industry / Focus Area</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm font-medium bg-white"
                      style={{ borderRadius: '14px 14px 32px 14px' }}
                    >
                      <option value="Technology & Design">Technology & Design</option>
                      <option value="Creative Arts & Media">Creative Arts & Media</option>
                      <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                      <option value="Education & Non-Profit">Education & Non-Profit</option>
                      <option value="Corporate & Financial Services">Corporate & Financial Services</option>
                      <option value="Freelance / Individual">Freelance / Individual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A2A3A] mb-1.5">Company Website (Optional)</label>
                    <div className="relative flex items-center">
                      <Globe className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://company.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#33C4F0] focus:ring-2 focus:ring-[#33C4F0]/20 transition-all text-[#2A2A3A] text-sm bg-white"
                        style={{ borderRadius: '14px 14px 32px 14px' }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 bg-[#f0fbff] border border-[#e8f9ff] flex items-center gap-3 mt-4"
                  style={{ borderRadius: '16px 16px 40px 16px' }}
                >
                  <Sparkles className="text-[#33C4F0] flex-shrink-0" size={20} />
                  <p className="text-xs text-[#2A2A3A] leading-relaxed">
                    Based on your selection of <strong className="text-[#33C4F0]">{orgSizeOptions.find(o => o.id === orgSize)?.label}</strong>, recommended plans are ready in the next step.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 text-[#717182] hover:text-[#2A2A3A] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                    style={{ borderRadius: '12px 12px 24px 12px' }}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white font-bold shadow-md hover:shadow-lg transition-all text-sm flex items-center gap-2"
                    style={{ borderRadius: '14px 14px 36px 14px' }}
                  >
                    Continue to Select Plan
                    <ArrowRight size={18} weight="bold" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* Step 4: Multi-Card Subscription Layout (Reference Image Design in CreativeSelf Theme) */
            <motion.div key="s4-view" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-5xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2A2A3A] tracking-tight mb-2">
                  Select your CreativeSelf plan
                </h1>
                <p className="text-[#717182] text-sm leading-relaxed">
                  Tailored learning & wellness packages to elevate your creative growth.
                </p>
              </div>

              {/* Category Toggle Tabs */}
              <div className="flex justify-center mb-8">
                <div
                  className="bg-gray-100 p-1 inline-flex border border-gray-200"
                  style={{ borderRadius: '20px 20px 48px 20px' }}
                >
                  <button
                    type="button"
                    onClick={() => setPlanCategory('individual')}
                    className={`px-5 py-2 text-xs font-bold transition-all ${
                      planCategory === 'individual'
                        ? 'bg-[#33C4F0] text-white shadow-sm'
                        : 'text-[#717182] hover:text-[#2A2A3A]'
                    }`}
                    style={{ borderRadius: '16px 16px 36px 16px' }}
                  >
                    Individual Plans
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlanCategory('corporate')}
                    className={`px-5 py-2 text-xs font-bold transition-all ${
                      planCategory === 'corporate'
                        ? 'bg-[#33C4F0] text-white shadow-sm'
                        : 'text-[#717182] hover:text-[#2A2A3A]'
                    }`}
                    style={{ borderRadius: '16px 16px 36px 16px' }}
                  >
                    Corporate Team Plans
                  </button>
                </div>
              </div>

              {/* 4-Card Plan Options Grid displaying ALL 4 subscription options with Rich Aesthetic Styling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 items-stretch">
                {activePlans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  const IconComp = plan.icon || Sparkles;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`cursor-pointer p-6 border transition-all flex flex-col justify-between relative overflow-hidden group ${
                        isSelected
                          ? 'border-[#33C4F0] bg-gradient-to-b from-[#f0fbff] via-white to-[#f0fbff] ring-2 ring-[#33C4F0]/30 shadow-xl'
                          : 'border-gray-200/90 bg-gradient-to-b from-white via-[#fafdfd] to-[#f7fcfe] hover:border-[#33C4F0]/60 hover:shadow-xl hover:-translate-y-1'
                      }`}
                      style={{ borderRadius: '24px 24px 64px 24px' }}
                    >
                      {/* Top Accent Color Bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1.5 transition-all"
                        style={{ backgroundColor: plan.color }}
                      />

                      <div>
                        {/* Header Row: Icon Badge + Popular Tag */}
                        <div className="flex items-center justify-between mb-4 pt-1">
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105"
                            style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                          >
                            <IconComp size={22} weight="bold" />
                          </div>

                          {plan.highlighted ? (
                            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                              <Sparkles size={11} weight="fill" />
                              Most Popular
                            </span>
                          ) : (
                            <span
                              className="font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border"
                              style={{ color: plan.color, borderColor: `${plan.color}30`, backgroundColor: `${plan.color}08` }}
                            >
                              Tier
                            </span>
                          )}
                        </div>

                        {/* Title & Pricing */}
                        <h3 className="font-extrabold text-sm text-[#2A2A3A] uppercase tracking-wider mb-1">
                          {plan.name}
                        </h3>

                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-3xl font-black text-[#2A2A3A] tracking-tight">{plan.price}</span>
                          <span className="text-xs text-[#717182] font-semibold">/{plan.period}</span>
                        </div>

                        {/* Tagline Container */}
                        <div
                          className="p-2.5 rounded-xl border text-[11px] font-medium leading-relaxed mb-4"
                          style={{
                            backgroundColor: isSelected ? `${plan.color}12` : `${plan.color}08`,
                            borderColor: `${plan.color}25`,
                            color: '#2A2A3A',
                          }}
                        >
                          {plan.tagline}
                        </div>

                        {/* Feature List Header */}
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#717182] mb-3 pb-1 border-b border-gray-100 flex items-center justify-between">
                          <span>What's Included</span>
                          <span className="text-[9px] font-normal text-gray-400">Full Access</span>
                        </div>

                        {/* Feature List */}
                        <ul className="space-y-2.5 mb-6">
                          {plan.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5 text-xs text-[#2A2A3A] font-medium">
                              <div
                                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs"
                                style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
                              >
                                <Check size={10} weight="bold" />
                              </div>
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom Select Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlanId(plan.id);
                        }}
                        className={`w-full py-3.5 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                          isSelected
                            ? 'bg-[#33C4F0] text-white shadow-md hover:bg-[#1AB0DC]'
                            : 'bg-gray-100/90 text-[#2A2A3A] hover:bg-[#33C4F0] hover:text-white'
                        }`}
                        style={{ borderRadius: '12px 12px 24px 12px' }}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 size={16} weight="bold" />
                            Plan Selected
                          </>
                        ) : (
                          'Select Plan'
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Navigation Row */}
              <div className="flex items-center justify-between max-w-5xl mx-auto pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-[#717182] hover:text-[#2A2A3A] font-semibold text-xs sm:text-sm flex items-center gap-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => handleCompleteRegistration()}
                  className="px-8 py-3.5 bg-[#33C4F0] hover:bg-[#1AB0DC] text-white font-bold shadow-md hover:shadow-lg transition-all text-sm flex items-center gap-2"
                  style={{ borderRadius: '14px 14px 28px 14px' }}
                >
                  Complete Registration
                  <CheckCircle2 size={18} weight="bold" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Page Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#717182] relative z-10">
        <p>© 2026 CreativeSelf. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-600 font-medium">
            <ShieldCheck size={16} />
            256-Bit SSL Encrypted & Secure
          </span>
          <Link to="/" className="text-[#717182] hover:text-[#2A2A3A] no-underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
