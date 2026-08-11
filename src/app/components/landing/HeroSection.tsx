import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BlobShape } from '../shared/BlobShape';
import kaleidoscope from '../../../imports/CS_Kaleidescope_Juice_Drop.png';

const personalityTags = [
  { label: 'The Original', color: '#F59E0B', delay: 0 },
  { label: 'The Imaginative', color: '#3B82F6', delay: 0.3 },
  { label: 'The Innovative', color: '#10B981', delay: 0.6 },
  { label: 'The Expressive', color: '#EF4444', delay: 0.9 },
  { label: 'The Explorer', color: '#8B5CF6', delay: 1.2 },
];

interface HeroSectionProps {
  onOpenRegister?: () => void;
}

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #F0FBFF 0%, #ffffff 50%, #F8F0FF 100%)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6rem',
      }}
    >
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-80px', zIndex: 0 }} className="pulse-glow">
        <BlobShape color="#33C4F0" opacity={0.08} size={600} variant={2} />
      </div>
      <div style={{ position: 'absolute', bottom: '-120px', left: '-100px', zIndex: 0 }} className="blob-float">
        <BlobShape color="#8B5CF6" opacity={0.06} size={500} variant={4} />
      </div>
      <div style={{ position: 'absolute', top: '30%', left: '42%', zIndex: 0 }} className="blob-float">
        <BlobShape color="#F59E0B" opacity={0.05} size={300} variant={3} />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            {/* Acumen badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1.1rem',
                borderRadius: '9999px',
                background: 'rgba(51,196,240,0.1)',
                border: '1px solid rgba(51,196,240,0.3)',
                marginBottom: '1.5rem',
              }}
            >
              <Sparkles size={14} color="#33C4F0" />
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1AB0DC', letterSpacing: '0.05em' }}>
                Powered by Acumen AI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#1A1A28',
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em',
              }}
            >
              Discover something{' '}
              <span className="gradient-text">NEW</span>{' '}
              and{' '}
              <span className="gradient-text">CREATIVE</span>{' '}
              that empowers your life and career.
            </motion.h1>

            {/* Sub-tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#717182',
                marginBottom: '2rem',
                fontStyle: 'italic',
              }}
            >
              You can be anything but square.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={() => onOpenRegister ? onOpenRegister() : null}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.875rem 2rem',
                  borderRadius: '9999px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #33C4F0 0%, #1A8EBF 100%)',
                  boxShadow: '0 8px 28px rgba(51,196,240,0.45)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(51,196,240,0.55)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(51,196,240,0.45)';
                }}
              >
                Register Now
                <ArrowRight size={18} />
              </button>

              <Link
                to="/test"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#2A2A3A',
                  textDecoration: 'none',
                  background: 'rgba(51,196,240,0.1)',
                  border: '1.5px solid rgba(51,196,240,0.3)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(51,196,240,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(51,196,240,0.1)';
                }}
              >
                Creativity Test
              </Link>
            </motion.div>

            {/* Personality type tags */}
          </div>

          {/* Right: Kaleidoscope visual */}
          <div className="flex justify-center items-center" style={{ position: 'relative' }}>
            {/* Cyan glow behind */}
            <div
              className="pulse-glow"
              style={{
                position: 'absolute',
                width: '480px',
                height: '480px',
                borderRadius: '9999px',
                background: 'radial-gradient(circle, rgba(51,196,240,0.25) 0%, transparent 70%)',
                zIndex: 0,
              }}
            />

            {/* Floating personality orbs */}
            {personalityTags.map(({ label, color }, i) => {
              const positions = [
                { top: '5%', left: '5%' },
                { top: '10%', right: '2%' },
                { bottom: '15%', left: '0%' },
                { bottom: '5%', right: '8%' },
                { top: '45%', right: '-5%' },
              ];
              return (
                <motion.div
                  key={label}
                  style={{
                    position: 'absolute',
                    ...positions[i],
                    zIndex: 2,
                    padding: '0.4rem 0.9rem',
                    borderRadius: '9999px',
                    background: 'rgba(255,255,255,0.92)',
                    boxShadow: `0 4px 20px ${color}30`,
                    border: `1.5px solid ${color}40`,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color,
                    whiteSpace: 'nowrap',
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                >
                  {label}
                </motion.div>
              );
            })}

            {/* Main kaleidoscope image */}
            <motion.div
              className="float-animation"
              style={{ position: 'relative', zIndex: 1 }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ImageWithFallback
                src={kaleidoscope}
                alt="CreativeSelf identity — a kaleidoscope of creative personalities"
                style={{
                  width: 'clamp(280px, 42vw, 480px)',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 24px 48px rgba(51,196,240,0.25))',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: '100%', height: '70px', display: 'block' }}>
          <path d="M0 35C360 70 720 0 1080 35L1440 20V70H0V35Z" fill="#F0FBFF" />
        </svg>
      </div>
    </section>
  );
}
