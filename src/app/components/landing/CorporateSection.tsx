import { Link } from 'react-router';
import { motion } from 'motion/react';
import { TrendingUp, Users, Heart, Brain, Award, Zap, Sparkles } from 'lucide-react';
import { BlobShape } from '../shared/BlobShape';

const painPoints = [
  { icon: '📉', label: 'Attraction', description: 'Struggling to attract top creative talent in a competitive market.', color: '#EF4444' },
  { icon: '🚪', label: 'Attrition', description: 'High turnover costing you time, money, and institutional knowledge.', color: '#F97316' },
  { icon: '💔', label: 'Cultural Crisis', description: 'Disconnected teams with no shared purpose or creative energy.', color: '#8B5CF6' },
  { icon: '😔', label: 'Burnout', description: 'Exhausted employees delivering less, caring less, staying less.', color: '#3B82F6' },
];

const solutions = [
  { icon: TrendingUp, label: 'Attract & Retain Talent', description: 'Stand out as a company that invests in people\'s whole selves.', color: '#10B981' },
  { icon: Heart, label: 'Improve Company Culture', description: 'Build a creative, connected culture that people are proud of.', color: '#EF4444' },
  { icon: Users, label: 'Boost Employee Engagement', description: 'Activate participation with experiences employees actually want.', color: '#33C4F0' },
  { icon: Award, label: 'Meaningful Recognition', description: 'Replace generic rewards with personalized creative experiences.', color: '#F59E0B' },
  { icon: Brain, label: 'Improve Well-being', description: 'Reduce burnout with structured creative decompression programs.', color: '#8B5CF6' },
  { icon: Zap, label: 'Increase Productivity', description: 'Creative teams are more innovative, collaborative, and efficient.', color: '#3B82F6' },
];

export function CorporateSection() {
  return (
    <section
      id="corporate"
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(160deg, #F8FCFF 0%, #F5F3FF 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg blobs */}
      <div style={{ position: 'absolute', top: '-80px', right: '-60px', zIndex: 0 }}>
        <BlobShape color="#33C4F0" opacity={0.06} size={500} variant={2} />
      </div>
      <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', zIndex: 0 }}>
        <BlobShape color="#8B5CF6" opacity={0.05} size={450} variant={4} />
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
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#8B5CF6',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            For Business
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#1A1A28',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              maxWidth: '760px',
              margin: '0 auto 1rem',
            }}
          >
            Enable Business Growth.{' '}
            <span className="gradient-text">Boost Productivity.</span>
            {' '}Empower Your Teams.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#717182', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            CreativeSelf provides customized employee engagement solutions designed to make your team more creative, productive, and happy.
          </p>
        </motion.div>

        {/* Pain points */}
        <div className="mb-14">
          <motion.p
            className="text-center mb-8"
            style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', color: '#717182', textTransform: 'uppercase' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Sound familiar?
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
                  padding: '1.5rem',
                  border: `2px solid ${point.color}20`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{point.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: point.color, marginBottom: '0.375rem' }}>
                  {point.label}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#717182', lineHeight: 1.6 }}>{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div className="mb-14">
          <motion.p
            className="text-center mb-8"
            style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', color: '#33C4F0', textTransform: 'uppercase' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            CreativeSelf can help you
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map(({ icon: Icon, label, description, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  border: '1.5px solid rgba(0,0,0,0.06)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '9999px',
                    background: `${color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color={color} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1A1A28', marginBottom: '0.25rem' }}>
                    {label}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#717182', lineHeight: 1.6 }}>{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corporate CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: '1rem',
              padding: '2.5rem 3rem',
              borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
              background: 'linear-gradient(135deg, #1A1A28 0%, #2D1B69 100%)',
              boxShadow: '0 16px 48px rgba(26,26,40,0.3)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(51,196,240,0.15)',
                border: '1px solid rgba(51,196,240,0.3)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#33C4F0',
                letterSpacing: '0.06em',
              }}
            >
              <Sparkles size={12} />
              Powered by Acumen AI
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 800,
                color: '#ffffff',
                textAlign: 'center' as const,
                lineHeight: 1.3,
              }}
            >
              Take the Free Corporate Creativity Survey
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', maxWidth: '400px', textAlign: 'center' as const, lineHeight: 1.6 }}>
              Discover your team's creative gaps and opportunities in under 10 minutes.
            </p>
            <Link
              to="/corporate"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                borderRadius: '9999px',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#1A1A28',
                textDecoration: 'none',
                background: '#33C4F0',
                boxShadow: '0 8px 28px rgba(51,196,240,0.4)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(51,196,240,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(51,196,240,0.4)';
              }}
            >
              Start the Survey — It's Free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
