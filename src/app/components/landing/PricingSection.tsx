import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';

const individualPlans = [
  {
    name: 'Basic Creative',
    price: 'Free',
    sub: 'Forever',
    features: ['1 Service Brand', '2 Activities per month', 'Creative Personality Test', 'Basic Acumen recommendations'],
    cta: 'Get Started Free',
    highlighted: false,
    color: '#717182',
  },
  {
    name: 'Advanced Creative',
    price: '$49',
    sub: 'per month',
    features: ['2 Service Brands', '4 Activities per month', 'Full Acumen AI analysis', 'Personalized learning plan', 'Priority booking'],
    cta: 'Start Advanced',
    highlighted: true,
    color: '#33C4F0',
  },
  {
    name: 'Elite Creative',
    price: '$99',
    sub: 'per month',
    features: ['3 Service Brands', '6 Activities per month', 'Unlimited Acumen AI', 'Custom learning journeys', 'Exclusive experiences', 'Community access'],
    cta: 'Go Elite',
    highlighted: false,
    color: '#8B5CF6',
  },
  {
    name: 'One-on-One Creative',
    price: 'Custom',
    sub: 'pricing',
    features: ['Custom consulting', 'Personal creative coaching', 'Tailored program design', 'Direct expert access', 'Flexible scheduling'],
    cta: 'Talk to Us',
    highlighted: false,
    color: '#F59E0B',
  },
];

const corporatePlans = [
  {
    name: 'Basic Creative Team',
    price: '$299',
    sub: 'per month',
    features: ['2 Service Brands', '4 Activities', 'Up to 8 employees per activity', 'Team engagement dashboard', 'Acumen team analysis'],
    cta: 'Start Team Plan',
    highlighted: false,
    color: '#717182',
  },
  {
    name: 'Advanced Creative Team',
    price: '$599',
    sub: 'per month',
    features: ['4 Service Brands', '6 Activities', 'Up to 10 employees per activity', 'Corporate engagement reports', 'Custom learning plans', 'Dedicated account manager'],
    cta: 'Scale Your Team',
    highlighted: true,
    color: '#33C4F0',
  },
  {
    name: 'Elite Creative Team',
    price: '$1,199',
    sub: 'per month',
    features: ['6 Service Brands', '12 Activities', 'Up to 15 employees per activity', 'Executive insights dashboard', 'Custom activities & programs', 'Vendor management portal', 'On-site facilitation'],
    cta: 'Go Enterprise',
    highlighted: false,
    color: '#8B5CF6',
  },
];

function PlanCard({ plan, index }: { plan: typeof individualPlans[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
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
            color: plan.highlighted ? 'rgba(255,255,255,0.7)' : plan.color,
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
                color: plan.highlighted ? 'rgba(255,255,255,0.9)' : '#3A3A4A',
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to="/test"
        style={{
          display: 'block',
          padding: '0.875rem 1.5rem',
          borderRadius: '9999px',
          fontSize: '0.95rem',
          fontWeight: 700,
          textAlign: 'center' as const,
          textDecoration: 'none',
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
      </Link>
    </motion.div>
  );
}

export function PricingSection() {
  const [tab, setTab] = useState<'individual' | 'corporate'>('individual');
  const plans = tab === 'individual' ? individualPlans : corporatePlans;

  return (
    <section
      id="pricing"
      style={{
        padding: '6rem 0',
        background: '#ffffff',
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
              background: 'rgba(51,196,240,0.1)',
              border: '1px solid rgba(51,196,240,0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#1AB0DC',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Subscription Plans
          </span>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#1A1A28',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Choose Your Creative Journey
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#717182', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Plans for individuals exploring their creative potential, and organizations building creative teams.
          </p>

          {/* Toggle */}
          <div
            style={{
              display: 'inline-flex',
              padding: '0.375rem',
              borderRadius: '9999px',
              background: '#F0FBFF',
              border: '1.5px solid rgba(51,196,240,0.2)',
            }}
          >
            {(['individual', 'corporate'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  background: tab === t ? '#33C4F0' : 'transparent',
                  color: tab === t ? '#ffffff' : '#717182',
                  boxShadow: tab === t ? '0 4px 16px rgba(51,196,240,0.35)' : 'none',
                }}
              >
                {t === 'individual' ? 'Individual' : 'Corporate'} Plans
              </button>
            ))}
          </div>
        </motion.div>

        {/* Plans */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-5 items-stretch"
          >
            {plans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} />
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
            <span style={{ fontSize: '0.9rem', color: '#717182' }}>
              Need something custom? We offer{' '}
              <strong style={{ color: '#8B5CF6' }}>tailored activities, learning plans, and corporate consulting.</strong>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
