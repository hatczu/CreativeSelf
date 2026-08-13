import { motion } from 'motion/react';
import { MagnifyingGlass as Search, Compass, Lightning as Zap, Link as Link2 } from '@phosphor-icons/react';
import { BlobShape } from '../shared/BlobShape';

const discoverySteps = [
  { icon: Search, label: 'Search', description: 'Tell us about you' },
  { icon: Compass, label: 'Find', description: 'Match your personality' },
  { icon: Zap, label: 'Discover', description: 'Explore new experiences' },
  { icon: Link2, label: 'Connect', description: 'Join your community' },
];

const personaExamples = [
  {
    type: 'The Expressive',
    color: '#EF4444',
    bg: 'linear-gradient(135deg, #FFF1F2 0%, #FFF8E7 100%)',
    emoji: '🎭',
    activities: ['Music', 'Dance', 'Writing', 'Performance Arts'],
    brand: 'Local Vocals · Moves & Grooves · Heart of Art',
  },
  {
    type: 'The Innovative',
    color: '#10B981',
    bg: 'linear-gradient(135deg, #ECFDF5 0%, #EFF6FF 100%)',
    emoji: '🚀',
    activities: ['Technology', 'Robotics', 'Gaming', 'DIY Projects'],
    brand: 'Technut · Bubbly Hobbies · Athletic Fanatics',
  },
  {
    type: 'The Explorer',
    color: '#8B5CF6',
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #F0FBFF 100%)',
    emoji: '🧭',
    activities: ['Travel', 'Hiking', 'Diving', 'Cultural Experiences'],
    brand: 'Trip and Tell · Athletic Fanatics · Ride High',
  },
];

export function DiscoverySection() {
  return (
    <section
      id="discover"
      style={{
        padding: '6rem 0',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg blob */}
      <div style={{ position: 'absolute', top: '50%', left: '-80px', transform: 'translateY(-50%)', zIndex: 0 }}>
        <BlobShape color="#33C4F0" opacity={0.05} size={500} variant={3} />
      </div>

      <div className="max-w-6xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
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
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#10B981',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Personalized Discovery
          </span>
        </motion.div>

        <motion.div
          className="text-center mb-14"
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
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            Search. Find. Discover.{' '}
            <span className="gradient-text">Connect.</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#717182', maxWidth: '500px', margin: '1rem auto 0', lineHeight: 1.7 }}>
            Based on your personality, Acumen curates a universe of creative experiences made just for you.
          </p>
        </motion.div>

        {/* Discovery steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          {discoverySteps.map(({ icon: Icon, label, description }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, rgba(51,196,240,0.12) 0%, rgba(139,92,246,0.1) 100%)',
                    border: '2px solid rgba(51,196,240,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.5rem',
                  }}
                >
                  <Icon size={28} color="#33C4F0" />
                </div>
                <p style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28' }}>{label}</p>
                <p style={{ fontSize: '0.8rem', color: '#717182' }}>{description}</p>
              </div>
              {i < discoverySteps.length - 1 && (
                <div className="hidden md:block">
                  <svg width="40" height="2" viewBox="0 0 40 2">
                    <line x1="0" y1="1" x2="40" y2="1" stroke="#33C4F0" strokeWidth="2" strokeDasharray="4 3" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Persona example cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personaExamples.map((persona, i) => (
            <motion.div
              key={persona.type}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{
                background: persona.bg,
                borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
                padding: '2rem',
                border: `2px solid ${persona.color}20`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{persona.emoji}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: persona.color, marginBottom: '1rem' }}>
                {persona.type}
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#717182', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Recommended Activities
                </p>
                <div className="flex flex-wrap gap-2">
                  {persona.activities.map((activity) => (
                    <span
                      key={activity}
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: `${persona.color}12`,
                        color: persona.color,
                      }}
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '0.875rem', borderTop: `1px solid ${persona.color}20` }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#717182', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                  Matched Brands
                </p>
                <p style={{ fontSize: '0.82rem', color: persona.color, fontWeight: 600, lineHeight: 1.5 }}>
                  {persona.brand}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
