import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, Brain, Zap, Users } from 'lucide-react';
import { DropletShape } from '../shared/BlobShape';

const outcomes = [
  { icon: Brain, label: 'Your Creative Personality Type', color: '#8B5CF6' },
  { icon: Zap, label: 'Recommended Creative Activities', color: '#33C4F0' },
  { icon: Users, label: 'Matched Service Brands', color: '#10B981' },
  { icon: Sparkles, label: 'Personalized Learning Plan', color: '#F59E0B' },
];

export function TestCTASection() {
  return (
    <section
      id="test"
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(160deg, #1A1A28 0%, #2D1B69 50%, #0D3A52 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative droplets */}
      <div style={{ position: 'absolute', top: '-60px', right: '-40px', opacity: 0.08 }} className="blob-float">
        <DropletShape color="#33C4F0" size={320} />
      </div>
      <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', opacity: 0.06 }} className="pulse-glow">
        <DropletShape color="#8B5CF6" size={280} />
      </div>

      {/* Radial glow */}
      <div
        className="pulse-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(51,196,240,0.12) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
        {/* Acumen badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: '9999px',
              background: 'rgba(51,196,240,0.15)',
              border: '1px solid rgba(51,196,240,0.4)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#33C4F0',
              letterSpacing: '0.05em',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '9999px',
                background: '#33C4F0',
                display: 'inline-block',
                animation: 'pulseGlow 2s ease-in-out infinite',
              }}
            />
            Powered by Acumen AI
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
          }}
        >
          Take the{' '}
          <span style={{
            background: 'linear-gradient(135deg, #33C4F0 0%, #8B5CF6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Creative Personality Test
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}
        >
          A few questions is all it takes. Acumen AI analyzes your responses and reveals your unique creative archetype — then builds your personal creative universe.
        </motion.p>

        {/* Outcome pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {outcomes.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                background: `${color}18`,
                border: `1px solid ${color}35`,
              }}
            >
              <Icon size={14} color={color} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/test"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              borderRadius: '9999px',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#1A1A28',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #33C4F0 0%, #ffffff 100%)',
              boxShadow: '0 12px 40px rgba(51,196,240,0.45)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 18px 48px rgba(51,196,240,0.55)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(51,196,240,0.45)';
            }}
          >
            <Sparkles size={20} />
            Start the Test — It's Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
