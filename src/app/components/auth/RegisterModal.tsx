import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  Briefcase,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Building,
  Globe,
} from 'lucide-react';
import { useNavigate } from 'react-router';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  initialCategory?: 'individual' | 'corporate';
}

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
  },
];

export function triggerRegisterModal(planId?: string, category?: 'individual' | 'corporate') {
  window.dispatchEvent(new CustomEvent('open-register-modal', { detail: { planId, category } }));
}

export function RegisterModal({ isOpen, onClose, initialPlan, initialCategory }: RegisterModalProps) {
  const navigate = useNavigate();
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
  const [planCategory, setPlanCategory] = useState<'individual' | 'corporate'>(initialCategory || 'individual');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlan || 'advanced-creative');

  // Registration Complete State
  const [isCompleted, setIsCompleted] = useState(false);

  React.useEffect(() => {
    if (initialPlan) setSelectedPlanId(initialPlan);
    if (initialCategory) setPlanCategory(initialCategory);
  }, [initialPlan, initialCategory]);

  React.useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEv = e as CustomEvent<{ planId?: string; category?: 'individual' | 'corporate' }>;
      if (customEv.detail?.planId) setSelectedPlanId(customEv.detail.planId);
      if (customEv.detail?.category) setPlanCategory(customEv.detail.category);
      setStep(1);
      setIsCompleted(false);
    };
    window.addEventListener('open-register-modal', handleCustomEvent);
    return () => window.removeEventListener('open-register-modal', handleCustomEvent);
  }, []);

  if (!isOpen) return null;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
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
    onClose();
    navigate('/dashboard');
  };

  const activePlans = planCategory === 'individual' ? individualPlans : corporatePlans;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        style={{
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden my-8"
          style={{
            borderRadius: '28px 28px 72px 28px',
            border: '1px solid rgba(51, 196, 240, 0.25)',
            boxShadow: '0 25px 50px -12px rgba(51, 196, 240, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)',
          }}
        >
          {/* Header Bar */}
          <div
            className="px-6 py-4 flex items-center justify-between border-b"
            style={{
              background: 'linear-gradient(135deg, #F0FBFF 0%, #FFFFFF 100%)',
              borderColor: 'rgba(51,196,240,0.15)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #33C4F0 0%, #1AB0DC 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 14px rgba(51,196,240,0.4)',
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">Create Your CreativeSelf Account</h3>
                <p className="text-xs font-medium text-cyan-600">Empower your personal & organizational growth</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {!isCompleted && (
            /* Progress Bar */
            <div className="bg-cyan-50/50 px-8 py-3 border-b border-cyan-100/50 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4 w-full">
                {[
                  { num: 1, label: 'Your Details' },
                  { num: 2, label: 'Organization Size' },
                  { num: 3, label: 'Company Info' },
                  { num: 4, label: 'Subscription Plan' },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === s.num
                          ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-md shadow-cyan-300/50 ring-2 ring-cyan-200'
                          : step > s.num
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step > s.num ? <Check size={14} strokeWidth={3} /> : s.num}
                    </div>
                    <span
                      className={`text-xs font-semibold hidden md:inline truncate ${
                        step === s.num ? 'text-cyan-700 font-bold' : step > s.num ? 'text-cyan-600' : 'text-gray-400'
                      }`}
                    >
                      {s.label}
                    </span>
                    {s.num < 4 && <div className={`h-0.5 flex-1 rounded ${step > s.num ? 'bg-cyan-400' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {isCompleted ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 px-4"
              >
                <div className="w-20 h-20 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-cyan-300/50">
                  <CheckCircle2 size={44} />
                </div>

                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome to CreativeSelf, {fullName || 'Explorer'}!</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-8 font-medium">
                  Your account and subscription to <strong className="text-cyan-600 font-bold">{selectedPlanId.replace(/-/g, ' ').toUpperCase()}</strong> have been registered successfully.
                </p>

                <div className="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left border border-cyan-100">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 uppercase tracking-wider font-semibold">Account Holder</span>
                      <p className="font-bold text-gray-800 text-sm mt-0.5">{fullName}</p>
                      <p className="text-gray-500">{email}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 uppercase tracking-wider font-semibold">Organization</span>
                      <p className="font-bold text-gray-800 text-sm mt-0.5">{companyName || 'Independent'}</p>
                      <p className="text-gray-500">{orgSizeOptions.find(o => o.id === orgSize)?.label}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleFinalRedirect}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold rounded-full shadow-lg shadow-cyan-400/30 transform hover:-translate-y-0.5 transition-all text-base inline-flex items-center gap-2"
                >
                  Explore Your Workspace
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            ) : step === 1 ? (
              /* Step 1: User Details */
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900">Step 1: Enter Your Personal Details</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Provide your contact details so we can setup your profile and activity access.
                  </p>
                </div>

                <form onSubmit={handleNextStep1} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Work / Personal Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Job Title / Role
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Creative Lead, HR Specialist, Founder"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-cyan-400/25 transition-all text-sm flex items-center gap-2"
                    >
                      Next: Organization Size
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : step === 2 ? (
              /* Step 2: Organization Size */
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900">Step 2: How many people work in your organization?</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Select your team size so we can tailor the ideal individual or team subscription packages for you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {orgSizeOptions.map((opt) => {
                    const IconComp = opt.icon;
                    const isSelected = orgSize === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOrgSize(opt.id, opt.type)}
                        className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-50/70 shadow-md shadow-cyan-100'
                            : 'border-gray-200 bg-white hover:border-cyan-200 hover:bg-gray-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2.5 rounded-xl text-white ${
                              isSelected ? 'bg-gradient-to-br from-cyan-400 to-blue-600' : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            <IconComp size={20} className={isSelected ? 'text-white' : 'text-gray-600'} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900 text-base">{opt.label}</span>
                              <span
                                className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                                  isSelected ? 'bg-cyan-200 text-cyan-800' : 'bg-gray-100 text-gray-500'
                                }`}
                              >
                                {opt.badge}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
                            isSelected ? 'border-cyan-500 bg-cyan-500 text-white' : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 text-gray-600 hover:text-gray-900 font-semibold text-sm flex items-center gap-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep2}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-cyan-400/25 transition-all text-sm flex items-center gap-2"
                  >
                    Next: Company Info
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : step === 3 ? (
              /* Step 3: Company Details */
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900">Step 3: Enter Company / Brand Information</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Tell us about your organization or personal practice.
                  </p>
                </div>

                <form onSubmit={handleNextStep3} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Company / Organization Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Acme Creative Agency or Independent Studio"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Industry / Focus Area
                      </label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 text-sm font-medium bg-white"
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
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Company Website (Optional)
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://company.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-cyan-50/60 rounded-2xl border border-cyan-100 flex items-start gap-3 mt-4">
                    <Sparkles className="text-cyan-600 mt-0.5 flex-shrink-0" size={18} />
                    <p className="text-xs text-cyan-900 leading-relaxed font-medium">
                      Based on your selection of <strong>{orgSizeOptions.find(o => o.id === orgSize)?.label}</strong>, we have pre-configured recommended plans in the next step!
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 text-gray-600 hover:text-gray-900 font-semibold text-sm flex items-center gap-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-cyan-400/25 transition-all text-sm flex items-center gap-2"
                    >
                      Next: Choose Subscription
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* Step 4: Subscription Page */
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                {/* Category Toggle Tabs */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-100 p-1.5 rounded-full inline-flex border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setPlanCategory('individual')}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                        planCategory === 'individual'
                          ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Individual Offers
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlanCategory('corporate')}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                        planCategory === 'corporate'
                          ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Corporate Offers
                    </button>
                  </div>
                </div>

                {/* Specified Copy Header */}
                {planCategory === 'individual' ? (
                  <div className="text-center mb-6 bg-gradient-to-r from-cyan-50 via-blue-50 to-cyan-50 p-4 rounded-2xl border border-cyan-100">
                    <h3 className="text-lg font-extrabold text-cyan-900 tracking-tight">
                      Search. Find. Discover. Connect
                    </h3>
                    <p className="text-xs font-semibold text-cyan-700 mt-1">
                      Choose the right creative activity and learning plan to empower you!
                    </p>
                  </div>
                ) : (
                  <div className="text-center mb-6 bg-gradient-to-r from-purple-50 via-cyan-50 to-blue-50 p-4 rounded-2xl border border-purple-100">
                    <h3 className="text-lg font-extrabold text-purple-900 tracking-wider uppercase">
                      DISCOVER THE RIGHT CORPORATE SUBSCRIPTION FOR YOU.
                    </h3>
                    <p className="text-xs font-semibold text-purple-700 mt-1">
                      Empower your workforce with corporate activities, brands, and custom consulting.
                    </p>
                  </div>
                )}

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {activePlans.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`cursor-pointer relative p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                          plan.highlighted
                            ? isSelected
                              ? 'border-cyan-500 bg-gradient-to-b from-cyan-500 to-cyan-700 text-white shadow-xl shadow-cyan-300/40 ring-2 ring-cyan-400'
                              : 'border-cyan-400 bg-gradient-to-b from-cyan-500 to-cyan-600 text-white shadow-lg'
                            : isSelected
                            ? 'border-cyan-500 bg-cyan-50/80 shadow-md ring-2 ring-cyan-200'
                            : 'border-gray-200 bg-white hover:border-cyan-300 hover:shadow'
                        }`}
                      >
                        {plan.highlighted && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-extrabold text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full shadow">
                            ★ Recommended
                          </span>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4
                              className={`font-black text-sm uppercase tracking-wider ${
                                plan.highlighted ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {plan.name}
                            </h4>
                            <div className="text-right">
                              <span
                                className={`text-xl font-extrabold ${
                                  plan.highlighted ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {plan.price}
                              </span>
                              <span
                                className={`text-[10px] ml-1 block ${
                                  plan.highlighted ? 'text-cyan-100' : 'text-gray-500'
                                }`}
                              >
                                {plan.period}
                              </span>
                            </div>
                          </div>

                          <p
                            className={`text-xs font-semibold mb-4 leading-snug p-2 rounded-xl ${
                              plan.highlighted
                                ? 'bg-white/15 text-cyan-50'
                                : 'bg-cyan-50 text-cyan-800 border border-cyan-100'
                            }`}
                          >
                            {plan.tagline}
                          </p>

                          <ul className="space-y-1.5 mb-4">
                            {plan.features.map((feat) => (
                              <li key={feat} className="flex items-center gap-2 text-xs font-medium">
                                <Check
                                  size={13}
                                  className={plan.highlighted ? 'text-cyan-200' : 'text-cyan-600'}
                                  strokeWidth={3}
                                />
                                <span className={plan.highlighted ? 'text-cyan-50' : 'text-gray-700'}>
                                  {feat}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompleteRegistration(plan.id);
                          }}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                            plan.highlighted
                              ? 'bg-white text-cyan-700 hover:bg-cyan-50 shadow'
                              : isSelected
                              ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow'
                              : 'bg-gray-100 text-gray-800 hover:bg-cyan-500 hover:text-white'
                          }`}
                        >
                          Select & Complete Registration
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 text-gray-600 hover:text-gray-900 font-semibold text-sm flex items-center gap-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCompleteRegistration()}
                    className="px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-cyan-400/30 transition-all text-sm flex items-center gap-2"
                  >
                    Confirm & Complete
                    <CheckCircle2 size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
