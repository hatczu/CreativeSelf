import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Sparkle as Sparkles, CalendarBlank as Calendar, BookOpen, Heart, Star, TrendUp as TrendingUp,
  MusicNotes as Music, Mountains as Mountain, Cpu, Palette, CaretRight as ChevronRight, Bell, Gear as Settings,
  SquaresFour as LayoutDashboard, Compass, Trophy as Award, ShoppingBag, User
} from '@phosphor-icons/react';
import { personalityTypes } from '../components/landing/PersonalitySection';
import { BlobShape } from '../components/shared/BlobShape';

const user = {
  name: 'Alex Rivera',
  type: personalityTypes[3], // Expressive
  plan: 'Advanced Creative',
  joinedDate: 'June 2026',
  avatar: '🎭',
};

const upcomingActivities = [
  { title: 'Jazz Improvisation Workshop', brand: 'Local Vocals', date: 'Jul 26', time: '3:00 PM', color: '#EF4444' },
  { title: 'Contemporary Dance Class', brand: 'Moves & Grooves', date: 'Jul 28', time: '6:00 PM', color: '#8B5CF6' },
  { title: 'Creative Writing Lab', brand: 'Heart of Art', date: 'Aug 2', time: '4:00 PM', color: '#F59E0B' },
];

const completedActivities = [
  { title: 'Portrait Photography', brand: 'Heart of Art', date: 'Jul 15', rating: 5, color: '#EF4444' },
  { title: 'Salsa Dance Fundamentals', brand: 'Moves & Grooves', date: 'Jul 8', rating: 5, color: '#8B5CF6' },
  { title: 'Storytelling Circle', brand: 'Local Vocals', date: 'Jun 30', rating: 4, color: '#F97316' },
];

const recommendations = [
  { title: 'Spoken Word Poetry Night', brand: 'Local Vocals', match: 98, icon: '🎤', color: '#EF4444' },
  { title: 'Watercolor Painting Class', brand: 'Heart of Art', match: 94, icon: '🎨', color: '#F59E0B' },
  { title: 'Film Making Bootcamp', brand: 'Heart of Art', match: 91, icon: '🎬', color: '#3B82F6' },
  { title: 'Improv Theater Workshop', brand: 'Local Vocals', match: 89, icon: '🎭', color: '#8B5CF6' },
];

const savedActivities = [
  { title: 'Abstract Oil Painting', brand: 'Heart of Art', icon: '🖼️', color: '#F59E0B' },
  { title: 'Urban Dance Battle', brand: 'Moves & Grooves', icon: '💃', color: '#8B5CF6' },
  { title: 'Open Mic Night', brand: 'Local Vocals', icon: '🎙️', color: '#EF4444' },
  { title: 'Creative Writing Retreat', brand: 'Heart of Art', icon: '✍️', color: '#10B981' },
];

const learningPlan = [
  { title: 'Foundations of Expressive Arts', progress: 80, lessons: 8, completed: 6, color: '#EF4444' },
  { title: 'Performance & Stage Presence', progress: 45, lessons: 10, completed: 5, color: '#8B5CF6' },
  { title: 'Creative Voice & Identity', progress: 20, lessons: 6, completed: 1, color: '#F59E0B' },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: Compass, label: 'Discover', to: '/dashboard/discover' },
  { icon: Calendar, label: 'Activities', to: '/dashboard/activities' },
  { icon: BookOpen, label: 'Learning Plan', to: '/dashboard/learning' },
  { icon: Heart, label: 'Saved', to: '/dashboard/saved' },
  { icon: Award, label: 'Personality', to: '/dashboard/personality' },
  { icon: ShoppingBag, label: 'Brands', to: '/dashboard/brands' },
  { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
];

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
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
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A28', lineHeight: 1 }}>{value}</p>
        <p style={{ fontSize: '0.8rem', color: '#717182', marginTop: '0.125rem' }}>{label}</p>
      </div>
    </div>
  );
}

export function UserDashboard() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F8FCFF',
        display: 'flex',
        fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif",
        paddingTop: '0',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          flexShrink: 0,
          background: '#1A1A28',
          borderRadius: '0 2.5rem 2.5rem 0',
          padding: '2rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
        className="hidden md:flex"
      >
        {/* Logo area */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#33C4F0' }}>creative</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>self</span>
          </Link>
        </div>

        {/* User profile */}
        <div
          style={{
            background: `${user.type.color}15`,
            border: `1.5px solid ${user.type.color}30`,
            borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '9999px',
              background: `${user.type.color}20`,
              border: `2px solid ${user.type.color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '0.75rem',
            }}
          >
            {user.avatar}
          </div>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>{user.name}</p>
          <p style={{ fontSize: '0.75rem', color: user.type.color, fontWeight: 600 }}>{user.type.name}</p>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>{user.plan}</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {navItems.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '9999px',
                fontSize: '0.875rem', fontWeight: label === 'Dashboard' ? 700 : 500, color: label === 'Dashboard' ? '#1A1A28' : 'rgba(255,255,255,0.5)',
                background: label === 'Dashboard' ? '#33C4F0' : 'transparent', marginBottom: '0.25rem', transition: 'all 0.2s ease', textAlign: 'left', textDecoration: 'none',
              }}
            ><Icon size={17} />{label}</Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto', paddingTop: '5.5rem' }}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A28', marginBottom: '0.25rem' }}>
              Welcome back, {user.name.split(' ')[0]} 👋
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#717182' }}>
              Your creative type:{' '}
              <span style={{ fontWeight: 700, color: user.type.color }}>{user.type.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                background: '#ffffff',
                border: '1.5px solid rgba(0,0,0,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Bell size={17} color="#717182" />
            </button>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                background: `${user.type.color}20`,
                border: `2px solid ${user.type.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              {user.avatar}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Music size={20} color="#EF4444" />} label="Activities Completed" value="8" color="#EF4444" />
          <StatCard icon={<Calendar size={20} color="#33C4F0" />} label="Upcoming Sessions" value="3" color="#33C4F0" />
          <StatCard icon={<BookOpen size={20} color="#10B981" />} label="Lessons Completed" value="12" color="#10B981" />
          <StatCard icon={<Star size={20} color="#F59E0B" />} label="Average Rating" value="4.8" color="#F59E0B" />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* AI Recommendations */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
                padding: '1.75rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                border: '1.5px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} color="#33C4F0" />
                  <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28' }}>Acumen Recommends</h2>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#33C4F0', fontWeight: 600 }}>Based on your profile</span>
              </div>
              <div className="flex flex-col gap-3">
                {recommendations.map((rec) => (
                  <div
                    key={rec.title}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.875rem 1rem',
                      borderRadius: '9999px',
                      background: `${rec.color}07`,
                      border: `1.5px solid ${rec.color}15`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${rec.color}12`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${rec.color}07`; }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{rec.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A1A28' }}>{rec.title}</p>
                      <p style={{ fontSize: '0.75rem', color: '#717182' }}>{rec.brand}</p>
                    </div>
                    <div
                      style={{
                        padding: '0.2rem 0.7rem',
                        borderRadius: '9999px',
                        background: rec.color,
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                      }}
                    >
                      {rec.match}% match
                    </div>
                    <ChevronRight size={16} color="#717182" />
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Plan */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
                padding: '1.75rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                border: '1.5px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} color="#10B981" />
                  <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28' }}>Your Learning Plan</h2>
                </div>
                <TrendingUp size={16} color="#10B981" />
              </div>
              <div className="flex flex-col gap-4">
                {learningPlan.map((item) => (
                  <div key={item.title}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A28' }}>{item.title}</p>
                      <p style={{ fontSize: '0.8rem', color: '#717182' }}>{item.completed}/{item.lessons} lessons</p>
                    </div>
                    <div style={{ height: '8px', borderRadius: '9999px', background: 'rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{ height: '100%', borderRadius: '9999px', background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Activities */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
                padding: '1.75rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                border: '1.5px solid rgba(0,0,0,0.06)',
              }}
            >
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28', marginBottom: '1rem' }}>Recent Activities</h2>
              <div className="flex flex-col gap-3">
                {completedActivities.map((act) => (
                  <div
                    key={act.title}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.875rem 1rem',
                      borderRadius: '9999px',
                      background: '#F8FCFF',
                      border: '1.5px solid rgba(0,0,0,0.05)',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '9999px',
                        background: `${act.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ width: '10px', height: '10px', borderRadius: '9999px', background: act.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A28' }}>{act.title}</p>
                      <p style={{ fontSize: '0.75rem', color: '#717182' }}>{act.brand} · {act.date}</p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: act.rating }).map((_, i) => (
                        <Star key={i} size={12} color="#F59E0B" fill="#F59E0B" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Personality card */}
            <div
              style={{
                background: `linear-gradient(160deg, ${user.type.bg} 0%, #ffffff 100%)`,
                borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
                padding: '1.75rem',
                border: `2px solid ${user.type.color}20`,
                boxShadow: `0 8px 32px ${user.type.color}15`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{user.type.emoji}</div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#717182', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Your Creative Type
              </p>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: user.type.color, marginBottom: '0.5rem' }}>
                {user.type.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#717182', lineHeight: 1.6, marginBottom: '1rem' }}>
                {user.type.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {user.type.traits.map((t) => (
                  <span key={t} style={{ padding: '0.2rem 0.7rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 600, color: user.type.color, background: `${user.type.color}12` }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.08 }}>
                <BlobShape color={user.type.color} size={140} variant={2} opacity={1} />
              </div>
            </div>

            {/* Upcoming activities */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
                padding: '1.75rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                border: '1.5px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} color="#33C4F0" />
                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28' }}>Upcoming</h2>
              </div>
              <div className="flex flex-col gap-3">
                {upcomingActivities.map((act) => (
                  <div
                    key={act.title}
                    style={{
                      padding: '1rem',
                      borderRadius: '1.85rem 0.7rem 1.85rem 0.9rem',
                      background: `${act.color}08`,
                      border: `1.5px solid ${act.color}20`,
                    }}
                  >
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A28', marginBottom: '0.25rem' }}>{act.title}</p>
                    <p style={{ fontSize: '0.75rem', color: '#717182' }}>{act.brand}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span style={{ padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, background: act.color, color: '#ffffff' }}>
                        {act.date}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#717182' }}>{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
                padding: '1.75rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                border: '1.5px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart size={18} color="#EF4444" />
                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28' }}>Saved Experiences</h2>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {savedActivities.map((act) => (
                  <div
                    key={act.title}
                    style={{
                      padding: '0.875rem',
                      borderRadius: '1.85rem 0.7rem 1.85rem 0.9rem',
                      background: `${act.color}08`,
                      border: `1.5px solid ${act.color}18`,
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem', display: 'block', marginBottom: '0.375rem' }}>{act.icon}</span>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1A1A28', lineHeight: 1.3 }}>{act.title}</p>
                    <p style={{ fontSize: '0.65rem', color: act.color, fontWeight: 600, marginTop: '0.2rem' }}>{act.brand}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
