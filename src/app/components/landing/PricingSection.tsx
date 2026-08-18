import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkle as Sparkles, ArrowRight } from '@phosphor-icons/react';

export const individualPlans = [
  {
    id: 'basic-creative',
    name: 'Basic Creative',
    price: 'Free',
    sub: 'Forever',
    features: ['1 service brand', '2 activities per month', 'Creative Personality Assessment', 'Acumen AI recommendations'],
    cta: 'Select Basic',
    highlighted: false,
    color: '#717182',
  },
  {
    id: 'advanced-creative',
    name: 'Advanced Creative',
    price: '$49',
    sub: 'per month',
    features: ['2 service brands', '4 activities per month', 'Full Acumen AI analysis', 'Personalized learning plan', 'Priority reservations'],
    cta: 'Select Advanced',
    highlighted: true,
    color: '#33C4F0',
  },
  {
    id: 'elite-creative',
    name: 'Elite Creative',
    price: '$99',
    sub: 'per month',
    features: ['3 service brands', '6 activities per month', 'Unlimited Acumen AI', 'Custom learning journeys', 'Exclusive experiences'],
    cta: 'Select Elite',
    highlighted: false,
    color: '#8B5CF6',
  },
  {
    id: 'one-on-one-creative',
    name: 'One-on-One Creative',
    price: 'Custom',
    sub: 'pricing',
    features: ['Custom consulting and coaching fees apply.', 'Personal creative coaching', 'Direct expert access', 'Flexible scheduling'],
    cta: 'Apply One-on-One',
    highlighted: false,
    color: '#F59E0B',
  },
];

export const corporatePlans = [
  {
    id: 'basic-creative-team',
    name: 'Basic Creative Team',
    price: '$299',
    sub: 'per month',
    features: ['2 service brands', '4 activities with 8 employees per month', 'Team engagement dashboard'],
    cta: 'Start Team Plan',
    highlighted: false,
    color: '#717182',
  },
  {
    id: 'advanced-creative-team',
    name: 'Advanced Creative Team',
    price: '$599',
    sub: 'per month',
    features: ['4 service brands', '6 activities with 10 employees per month', 'Corporate engagement reports', 'Dedicated account manager'],
    cta: 'Scale Your Team',
    highlighted: true,
    color: '#33C4F0',
  },
  {
    id: 'elite-creative-team',
    name: 'Elite Creative Team',
    price: '$1,199',
    sub: 'per month',
    features: ['6 service brands', '12 activities with 15 employees per month', 'Executive insights dashboard', 'On-site facilitation'],
    cta: 'Go Enterprise',
    highlighted: false,
    color: '#8B5CF6',
  },
  {
    id: 'custom-creative-corporate',
    name: 'Custom Creative Activities',
    price: 'Custom',
    sub: 'pricing',
    features: ['Custom Creative Activities', 'Learning Plans and Consulting', 'Corporate Consulting', 'Enterprise SLA & Support'],
    cta: 'Inquire Custom',
    highlighted: false,
    color: '#F59E0B',
  },
];

interface PlanCardProps {
  plan: typeof individualPlans[0];
  index: number;
  category: 'individual' | 'corporate';
  onSelectPlan?: (planId: string, category: 'individual' | 'corporate') => void;
}

function PlanCard({ plan, index, category, onSelectPlan }: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        borderRadius: '2.5rem 1.05rem 2.5rem 1.35rem',
        padding: '2rem',
        position: 'relative',
        background: plan.highlighted
          ? 'linear-gradient(160deg, #33C4F0 0%, #1A6FAD 100%)'
          : '#ffffff',
        border: plan.highlighted ? 'none' : `2px solid rgba(0,0,0,0.07)`,
        boxShadow: plan.highlighted
          ? '0 20px 60px rgba(51,196,240,0.4)'
          : '0 4px 20px rgba(0,0,0,0.05)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
      }}
    >
      {plan.highlighted && (
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#ffffff',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
          }}
        >
          ✦ Most Popular
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <p
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: plan.highlighted ? 'rgba(255,255,255,0.75)' : plan.color,
            marginBottom: '0.5rem',
          }}
        >
          {plan.name}
        </p>
        <div className="flex items-baseline gap-1">
          <span
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: plan.highlighted ? '#ffffff' : '#1A1A28',
              letterSpacing: '-0.03em',
            }}
          >
            {plan.price}
          </span>
          <span style={{ fontSize: '0.875rem', color: plan.highlighted ? 'rgba(255,255,255,0.65)' : '#717182' }}>
            {plan.sub}
          </span>
        </div>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', flex: 1 }}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5" style={{ marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '9999px',
                background: plan.highlighted ? 'rgba(255,255,255,0.2)' : `${plan.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Check size={11} color={plan.highlighted ? '#ffffff' : plan.color} strokeWidth={3} />
            </div>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: plan.highlighted ? 'rgba(255,255,255,0.95)' : '#3A3A4A',
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelectPlan ? onSelectPlan(plan.id, category) : null}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
          padding: '0.875rem 1.5rem',
          borderRadius: '9999px',
          fontSize: '0.95rem',
          fontWeight: 700,
          cursor: 'pointer',
          background: plan.highlighted ? '#ffffff' : `${plan.color}15`,
          color: plan.highlighted ? '#1A6FAD' : plan.color,
          border: plan.highlighted ? 'none' : `2px solid ${plan.color}30`,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!plan.highlighted) {
            (e.currentTarget as HTMLElement).style.background = plan.color;
            (e.currentTarget as HTMLElement).style.color = '#ffffff';
          } else {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)';
          }
        }}
        onMouseLeave={(e) => {
          if (!plan.highlighted) {
            (e.currentTarget as HTMLElement).style.background = `${plan.color}15`;
            (e.currentTarget as HTMLElement).style.color = plan.color;
          } else {
            (e.currentTarget as HTMLElement).style.background = '#ffffff';
          }
        }}
      >
        {plan.cta}
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}

interface PricingSectionProps {
  onOpenRegister?: (planId?: string, category?: 'individual' | 'corporate') => void;
  initialTab?: 'individual' | 'corporate';
  showToggle?: boolean;
}

export function PricingSection({ onOpenRegister, initialTab = 'individual', showToggle = true }: PricingSectionProps) {
  const [tab, setTab] = useState<'individual' | 'corporate'>(initialTab);
  const plans = tab === 'individual' ? individualPlans : corporatePlans;

  return (
    <section
      id="pricing"
      style={{
        padding: '6rem 0',
        background: tab === 'individual' ? '#ffffff' : '#F8FCFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            style={{
              padding: '0.35rem 1.1rem',
              borderRadius: '9999px',
              background: tab === 'individual' ? 'rgba(51,196,240,0.1)' : 'rgba(139,92,246,0.1)',
              border: tab === 'individual' ? '1px solid rgba(51,196,240,0.25)' : '1px solid rgba(139,92,246,0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: tab === 'individual' ? '#1AB0DC' : '#8B5CF6',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {tab === 'individual' ? 'Individual Subscriptions' : 'Corporate Subscriptions'}
          </span>
        </motion.div>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {/* Main Dynamic Headline */}
          <h2
            style={{
              fontSize: 'clamp(1.85rem, 4.2vw, 3rem)',
              fontWeight: 800,
              color: '#1A1A28',
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
            }}
          >
            {tab === 'individual' ? (
              <>
                Search. Find. Discover. <span className="gradient-text">Connect.</span>
              </>
            ) : (
              <>
                Discover the Right <span className="gradient-text-warm">Corporate Subscription</span> for You
              </>
            )}
          </h2>

          {/* Tab Switcher Buttons */}
          {showToggle && (
            <div
              style={{
                display: 'inline-flex',
                padding: '0.4rem',
                borderRadius: '9999px',
                background: '#F0FBFF',
                border: '1.5px solid rgba(51,196,240,0.3)',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 16px rgba(51,196,240,0.1)',
              }}
            >
              {(['individual', 'corporate'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: '0.6rem 1.8rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    transition: 'all 0.25s ease',
                    background: tab === t ? (t === 'individual' ? '#33C4F0' : '#8B5CF6') : 'transparent',
                    color: tab === t ? '#ffffff' : '#717182',
                    boxShadow: tab === t ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  {t === 'individual' ? 'Individual Plans' : 'Corporate Plans'}
                </button>
              ))}
            </div>
          )}

          {/* Sub-Tagline Box */}
          <AnimatePresence mode="wait">
            {tab === 'individual' ? (
              <motion.div
                key="ind-tag"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-xl mx-auto p-4 rounded-2xl bg-cyan-50/80 border border-cyan-100 mb-6 shadow-sm"
              >
                <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1AB0DC', marginBottom: '0.25rem' }}>
                  Individual Subscription Tier
                </p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#4A5568' }}>
                  Choose the right creative activity and learning plan to empower you!
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="corp-tag"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-xl mx-auto p-4 rounded-2xl bg-purple-50/80 border border-purple-100 mb-6 shadow-sm"
              >
                <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#8B5CF6', marginBottom: '0.25rem' }}>
                  Corporate Engagement Subscriptions
                </p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#4A5568' }}>
                  Empower your teams with custom creative activities, learning plans, and consulting.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Plans */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
          >
            {plans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} category={tab} onSelectPlan={onOpenRegister} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Custom note */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              background: 'rgba(139,92,246,0.06)',
              border: '1px solid rgba(139,92,246,0.2)',
            }}
          >
            <Sparkles size={16} color="#8B5CF6" />
            <span style={{ fontSize: '0.9rem', color: '#717182', fontWeight: 600 }}>
              Custom Creative Activities, Learning Plans and Corporate Consulting.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
