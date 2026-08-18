import { motion } from 'motion/react';
import { BlobShape } from '../shared/BlobShape';

const transformations = [
  {
    from: 'STRESS',
    to: 'DISTRESS',
    fromColor: '#EF4444',
    toColor: '#33C4F0',
    description: 'Channel workplace stress into creative outlets that transform pressure into emotional distress relief.',
    gradient: 'linear-gradient(135deg, #FFF1F1 0%, #E8F9FF 100%)',
    icon: '🎨',
  },
  {
    from: 'PRESSURE',
    to: 'LEISURE',
    fromColor: '#F97316',
    toColor: '#10B981',
    description: 'Transform relentless pressure into meaningful leisure that fills your cup and fuels performance.',
    gradient: 'linear-gradient(135deg, #FFF7ED 0%, #ECFDF5 100%)',
    icon: '🌿',
  },
  {
    from: 'TENSION',
    to: 'DECOMPRESSION',
    fromColor: '#8B5CF6',
    toColor: '#3B82F6',
    description: 'Release tension through creative experiences designed to decompress mind, body, and spirit.',
    gradient: 'linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 100%)',
    icon: '✨',
  },
];

function TransformCard({ item, index }: { item: typeof transformations[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        background: item.gradient,
        borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
        padding: '2.25rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1.5px solid rgba(255,255,255,0.8)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        flex: 1,
      }}
    >
      {/* Icon */}
      <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{item.icon}</div>

      {/* Transformation labels */}
      <div className="flex items-center gap-3 mb-1">
        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: item.fromColor, letterSpacing: '-0.01em' }}>
          {item.from}
        </span>
        <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
          <path d="M0 7H26M26 7L20 1M26 7L20 13" stroke={item.toColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: item.toColor, letterSpacing: '-0.01em' }}>
          {item.to}
        </span>
      </div>

      <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: '#717182', marginTop: '0.75rem' }}>
        {item.description}
      </p>

      {/* Decorative blob */}
      <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', opacity: 0.08 }}>
        <BlobShape color={item.toColor} size={200} variant={2} opacity={1} />
      </div>
    </motion.div>
  );
}

export function WellbeingSection() {
  return (
    <section
      id="wellbeing"
      style={{
        background: '#F0FBFF',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg blob */}
      <div style={{ position: 'absolute', top: '-50px', left: '-80px', zIndex: 0 }}>
        <BlobShape color="#33C4F0" opacity={0.06} size={500} variant={1} />
      </div>

      <div className="max-w-6xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            style={{
              padding: '0.35rem 1.1rem',
              borderRadius: '9999px',
              background: 'rgba(51,196,240,0.12)',
              border: '1px solid rgba(51,196,240,0.3)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#1AB0DC',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Creative Well-being
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#1A1A28',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Creativity for <span className="gradient-text">Well-Being</span> and{' '}
            <span className="gradient-text-warm">Enhanced Work Performance</span>.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#717182', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Creative activities help people relax, grow, connect, and become more productive. Discover how CreativeSelf turns everyday pressure into personal power.
          </p>
        </motion.div>

        {/* Transformation cards */}
        <div className="flex flex-col md:flex-row gap-5">
          {transformations.map((item, i) => (
            <TransformCard key={item.from} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }}>
          <path d="M0 30C480 60 960 0 1440 30V60H0V30Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
