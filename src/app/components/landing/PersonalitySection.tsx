import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BlobShape } from '../shared/BlobShape';

export const personalityTypes = [
  {
    name: 'The Original',
    emoji: '⚡',
    color: '#F59E0B',
    bg: '#FFF8E7',
    border: '#F59E0B30',
    description: 'You challenge the status quo and redefine what\'s possible. Your ideas are fresh, bold, and unlike anything seen before.',
    traits: ['Unconventional', 'Bold', 'Trailblazing'],
    activities: ['Conceptual Art', 'Experimental Music', 'Creative Writing'],
  },
  {
    name: 'The Imaginative',
    emoji: '🌌',
    color: '#3B82F6',
    bg: '#EFF6FF',
    border: '#3B82F630',
    description: 'You think in metaphors and visions. Your mind paints vivid worlds that others can barely picture.',
    traits: ['Visionary', 'Dreamy', 'Abstract'],
    activities: ['Photography', 'Filmmaking', 'Illustration'],
  },
  {
    name: 'The Innovative',
    emoji: '🚀',
    color: '#10B981',
    bg: '#ECFDF5',
    border: '#10B98130',
    description: 'You build and invent. You see problems as puzzles and love turning ideas into working solutions.',
    traits: ['Inventive', 'Problem-Solver', 'Systematic'],
    activities: ['Robotics', 'Gaming', 'DIY Technology'],
  },
  {
    name: 'The Expressive',
    emoji: '🎭',
    color: '#EF4444',
    bg: '#FFF1F2',
    border: '#EF444430',
    description: 'You communicate through emotion, art, and performance. Your creativity lives in how you make people feel.',
    traits: ['Emotional', 'Performing', 'Authentic'],
    activities: ['Dance', 'Music', 'Theatre', 'Storytelling'],
  },
  {
    name: 'The Explorer',
    emoji: '🧭',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    border: '#8B5CF630',
    description: 'You seek new experiences, places, and perspectives. Discovery is your most creative act.',
    traits: ['Adventurous', 'Curious', 'Cultural'],
    activities: ['Travel', 'Hiking', 'Diving', 'Cultural Trips'],
  },
];

function PersonalityCard({ type, index }: { type: typeof personalityTypes[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        background: type.bg,
        border: `2px solid ${type.border}`,
        borderRadius: '20px 20px 90px 20px',
        padding: '2rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Emoji icon */}
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '9999px',
          background: `${type.color}18`,
          border: `2px solid ${type.color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          marginBottom: '1.25rem',
        }}
      >
        {type.emoji}
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: type.color, marginBottom: '0.5rem' }}>
        {type.name}
      </h3>
      <p style={{ fontSize: '0.875rem', color: '#717182', lineHeight: 1.65, marginBottom: '1rem' }}>
        {type.description}
      </p>

      {/* Trait pills */}
      <div className="flex flex-wrap gap-2">
        {type.traits.map((trait) => (
          <span
            key={trait}
            style={{
              padding: '0.2rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: type.color,
              background: `${type.color}12`,
            }}
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Activities hint */}
      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${type.color}20` }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#717182', marginBottom: '0.375rem' }}>Activities you'd love:</p>
        <p style={{ fontSize: '0.8rem', color: type.color, fontWeight: 600 }}>{type.activities.join(' · ')}</p>
      </div>

      {/* Bg blob */}
      <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', opacity: 0.07 }}>
        <BlobShape color={type.color} size={180} variant={1} opacity={1} />
      </div>
    </motion.div>
  );
}

export function PersonalitySection() {
  return (
    <section
      id="personality"
      style={{
        padding: '6rem 0',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg decoration */}
      <div style={{ position: 'absolute', top: '50%', right: '-100px', transform: 'translateY(-50%)', zIndex: 0 }}>
        <BlobShape color="#8B5CF6" opacity={0.04} size={600} variant={5} />
      </div>

      <div className="max-w-6xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        {/* Label */}
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
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#8B5CF6',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Creative Personality
          </span>
        </motion.div>

        <motion.div
          className="text-center mb-14"
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
            Explore Your{' '}
            <span className="gradient-text-warm">Other Side</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#717182', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Creativity isn't about being artistic. It's about discovering something new, different, and unexplored within yourself.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
          {personalityTypes.map((type, i) => (
            <PersonalityCard key={type.name} type={type} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/test"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.9rem 2.25rem',
              borderRadius: '9999px',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#ffffff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #33C4F0 100%)',
              boxShadow: '0 8px 28px rgba(139,92,246,0.35)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(139,92,246,0.45)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(139,92,246,0.35)';
            }}
          >
            Know Your Creative Personality
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
