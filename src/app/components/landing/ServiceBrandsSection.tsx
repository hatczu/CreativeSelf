import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import { BlobShape } from '../shared/BlobShape';

const brands = [
  {
    id: 'heart-of-art',
    name: 'Heart of Art',
    emoji: '🎨',
    color: '#EF4444',
    bg: '#FFF1F2',
    description: 'Express your inner artist through a spectrum of visual and literary arts.',
    activities: ['Painting', 'Sculpture', 'Photography', 'Filmmaking', 'Poetry', 'Journaling', 'Creative Writing'],
    personality: 'The Expressive · The Imaginative',
  },
  {
    id: 'athletic-fanatics',
    name: 'Athletic Fanatics',
    emoji: '🏆',
    color: '#10B981',
    bg: '#ECFDF5',
    description: 'Channel your energy through sport and physical mastery.',
    activities: ['Running', 'Pickleball', 'Badminton', 'Basketball', 'Tennis', 'Boxing', 'Yoga', 'Pilates'],
    personality: 'The Original · The Explorer',
  },
  {
    id: 'ride-high',
    name: 'Ride High',
    emoji: '🏍️',
    color: '#F97316',
    bg: '#FFF7ED',
    description: 'Live on two wheels — adventure at every turn.',
    activities: ['Cycling', 'Motorcycling', 'BMX', 'Mountain Biking', 'Scooter Tours', 'Adventure Rides'],
    personality: 'The Explorer · The Original',
  },
  {
    id: 'style-file',
    name: 'Style File',
    emoji: '✨',
    color: '#EC4899',
    bg: '#FDF2F8',
    description: 'Fashion is your language. Style is your art.',
    activities: ['Fashion Styling', 'Personal Branding', 'Wardrobe Curation', 'Color Analysis', 'Image Consulting'],
    personality: 'The Expressive · The Imaginative',
  },
  {
    id: 'technut',
    name: 'Technut',
    emoji: '🤖',
    color: '#6366F1',
    bg: '#EEF2FF',
    description: 'Where technology meets creativity. Build, code, and innovate.',
    activities: ['Gaming', 'Robotics', 'Drone Piloting', 'DIY Tech Projects', 'Coding', 'App Building'],
    personality: 'The Innovative · The Original',
  },
  {
    id: 'chowdown',
    name: 'Chowdown',
    emoji: '🍳',
    color: '#F59E0B',
    bg: '#FFF8E7',
    description: 'Food is the ultimate creative experience. Cook, bake, explore.',
    activities: ['Cooking', 'Baking', 'Chocolate Making', 'Wine Pairing', 'Bartending', 'Charcuterie', 'Barista Skills'],
    personality: 'The Expressive · The Imaginative',
  },
  {
    id: 'petbook',
    name: 'Petbook',
    emoji: '🐾',
    color: '#14B8A6',
    bg: '#F0FDFA',
    description: 'Deepen the bond with your furry companions through creative care.',
    activities: ['Pet Photography', 'Animal Training', 'Wellness Workshops', 'Pet Art', 'Companion Activities'],
    personality: 'The Expressive · The Explorer',
  },
  {
    id: 'bubbly-hobbies',
    name: 'Bubbly Hobbies',
    emoji: '🎯',
    color: '#EAB308',
    bg: '#FEFCE8',
    description: 'Discover the joy of crafts, collecting, and hands-on hobbies.',
    activities: ['Crafts', 'DIY Projects', 'Collecting', 'Knitting', 'Pottery', 'Social Hobbies', 'Board Games'],
    personality: 'The Innovative · The Imaginative',
  },
  {
    id: 'trip-and-tell',
    name: 'Trip and Tell',
    emoji: '🌍',
    color: '#3B82F6',
    bg: '#EFF6FF',
    description: 'Every journey is a story. Explore, experience, and share.',
    activities: ['Hiking', 'Rock Climbing', 'Trekking', 'Scuba Diving', 'Snorkeling', 'Cultural Trips', 'Corporate Outings'],
    personality: 'The Explorer · The Original',
  },
  {
    id: 'local-vocals',
    name: 'Local Vocals',
    emoji: '🎤',
    color: '#F97316',
    bg: '#FFF7ED',
    description: 'Your voice, your story. Connect through music and community.',
    activities: ['Singing', 'Open Mic Nights', 'Songwriting', 'Community Music', 'Storytelling', 'Local Events'],
    personality: 'The Expressive · The Explorer',
  },
  {
    id: 'moves-grooves',
    name: 'Moves & Grooves',
    emoji: '💃',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    description: 'Movement is the purest form of expression. Dance your story.',
    activities: ['Dance Classes', 'Choreography', 'Movement Arts', 'Fitness Dance', 'Performance', 'Dance Fitness'],
    personality: 'The Expressive · The Innovative',
  },
];

function BrandCard({ brand, index }: { brand: typeof brands[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? brand.bg : '#ffffff',
        borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
        padding: '1.75rem',
        border: `2px solid ${hovered ? brand.color + '30' : 'rgba(0,0,0,0.07)'}`,
        boxShadow: hovered ? `0 12px 40px ${brand.color}20` : '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Emoji badge */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '9999px',
          background: `${brand.color}15`,
          border: `2px solid ${brand.color}25`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          transition: 'transform 0.2s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {brand.emoji}
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: brand.color, marginBottom: '0.375rem' }}>
        {brand.name}
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#717182', lineHeight: 1.6, marginBottom: '1rem' }}>
        {brand.description}
      </p>

      {/* Activities */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {brand.activities.slice(0, 4).map((activity) => (
          <span
            key={activity}
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 600,
              background: `${brand.color}10`,
              color: brand.color,
            }}
          >
            {activity}
          </span>
        ))}
        {brand.activities.length > 4 && (
          <span
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 600,
              background: 'rgba(0,0,0,0.05)',
              color: '#717182',
            }}
          >
            +{brand.activities.length - 4} more
          </span>
        )}
      </div>

      <div style={{ paddingTop: '0.875rem', borderTop: `1px solid ${brand.color}15` }}>
        <p style={{ fontSize: '0.72rem', color: '#717182', fontWeight: 600 }}>
          For: <span style={{ color: brand.color }}>{brand.personality}</span>
        </p>
      </div>

      {/* Explore arrow */}
      <motion.div
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '9999px',
            background: brand.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowRight size={14} color="#ffffff" />
        </div>
      </motion.div>

      {/* Bg blob decoration */}
      {hovered && (
        <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', opacity: 0.08 }}>
          <BlobShape color={brand.color} size={160} variant={2} opacity={1} />
        </div>
      )}
    </motion.div>
  );
}

export function ServiceBrandsSection() {
  return (
    <section
      id="brands"
      style={{
        padding: '6rem 0',
        background: '#F8FCFF',
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
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#EF4444',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Service Brands
          </span>
        </motion.div>

        <motion.div
          className="text-center mb-12"
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
              marginBottom: '1rem',
            }}
          >
            11 Ways to Unlock Your{' '}
            <span className="gradient-text-warm">Creative Life</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#717182', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Explore our curated service categories, each designed to ignite a different dimension of your creativity.
          </p>
        </motion.div>

        {/* Brands grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {brands.map((brand, i) => (
            <BrandCard key={brand.id} brand={brand} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
