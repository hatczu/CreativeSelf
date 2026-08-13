import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import kaleidoscope from '../../../imports/CS_Kaleidescope_Juice_Drop.png';

interface CtaBannerProps {
  onOpenRegister?: () => void;
}

export function CtaBanner({ onOpenRegister }: CtaBannerProps) {
  return (
    <section
      id="about"
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #0D3A52 0%, #1A1A28 40%, #2D1B69 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background kaleidoscope watermark */}
      <div
        style={{
          position: 'absolute',
          right: '-80px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.12,
          zIndex: 0,
        }}
        className="float-animation"
      >
        <ImageWithFallback
          src={kaleidoscope}
          alt=""
          style={{ width: '520px', height: 'auto' }}
        />
      </div>

      {/* Radial glow */}
      <div
        className="pulse-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(51,196,240,0.1) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div
        className="max-w-4xl mx-auto px-6 text-center"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            style={{
              padding: '0.4rem 1.25rem',
              borderRadius: '9999px',
              background: 'rgba(51,196,240,0.15)',
              border: '1px solid rgba(51,196,240,0.35)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#33C4F0',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Be Anything But Square
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
          }}
        >
          Your creative life{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #33C4F0 0%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            starts now.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}
        >
          Discover your creative personality, explore new experiences, and connect with a community of curious, expressive, and inspired people.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => onOpenRegister ? onOpenRegister() : null}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.625rem',
              padding: '1rem 2.25rem',
              borderRadius: '9999px',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#1A1A28',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #33C4F0 0%, #ffffff 150%)',
              boxShadow: '0 12px 40px rgba(51,196,240,0.45)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 18px 48px rgba(51,196,240,0.55)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(51,196,240,0.45)';
            }}
          >
            Register & Get Started
            <ArrowRight size={18} />
          </button>
          <Link
            to="/test"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.25)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.6)';
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            Take Creativity Test
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
