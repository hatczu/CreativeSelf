import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  SquaresFour as LayoutDashboard, Users, CalendarBlank as Calendar, BookOpen, ChartBar as BarChart3,
  Gear as Settings, ShoppingBag, UserCheck, TrendUp as TrendingUp, Lightning as Zap,
  Bell, Plus, CaretRight as ChevronRight, Buildings as Building2
} from '@phosphor-icons/react';
import { BlobShape } from '../components/shared/BlobShape';

const company = {
  name: 'Nexus Creative Corp',
  plan: 'Elite Creative Team',
  employees: 145,
  avatar: '🏢',
};

const engagementStats = [
  { label: 'Participation Rate', value: '73%', change: '+12%', color: '#10B981', icon: '📊' },
  { label: 'Active Employees', value: '106', change: '+8', color: '#33C4F0', icon: '👥' },
  { label: 'Activities This Month', value: '24', change: '+6', color: '#8B5CF6', icon: '⚡' },
  { label: 'Brand Subscriptions', value: '6', change: 'Elite Plan', color: '#F59E0B', icon: '🏷️' },
];

const programs = [
  { name: 'Q3 Creativity Sprint', status: 'Active', participants: 34, brand: 'Heart of Art · Technut', color: '#10B981', progress: 65 },
  { name: 'Leadership Creative Retreat', status: 'Upcoming', participants: 12, brand: 'Trip and Tell', color: '#33C4F0', progress: 0 },
  { name: 'Team Dance & Wellness', status: 'Active', participants: 28, brand: 'Moves & Grooves', color: '#8B5CF6', progress: 40 },
  { name: 'Innovation Hackathon', status: 'Completed', participants: 45, brand: 'Technut · Bubbly Hobbies', color: '#717182', progress: 100 },
];

const scheduledActivities = [
  { title: 'Watercolor Team Workshop', date: 'Jul 29', time: '10:00 AM', participants: 15, brand: 'Heart of Art', color: '#F59E0B' },
  { title: 'Group Fitness & Yoga', date: 'Jul 31', time: '7:30 AM', participants: 22, brand: 'Athletic Fanatics', color: '#10B981' },
  { title: 'Robotics Challenge', date: 'Aug 5', time: '2:00 PM', participants: 10, brand: 'Technut', color: '#6366F1' },
];

const topEmployees = [
  { name: 'Maria Santos', type: 'The Expressive', activities: 7, avatar: '🎭', color: '#EF4444' },
  { name: 'James Okoro', type: 'The Explorer', activities: 6, avatar: '🧭', color: '#8B5CF6' },
  { name: 'Priya Nair', type: 'The Innovative', activities: 6, avatar: '🚀', color: '#10B981' },
  { name: 'Tom Chen', type: 'The Original', activities: 5, avatar: '⚡', color: '#F59E0B' },
];

const brandSubscriptions = [
  { name: 'Heart of Art', emoji: '🎨', usage: '85%', color: '#EF4444', employees: 42 },
  { name: 'Athletic Fanatics', emoji: '🏆', usage: '72%', color: '#10B981', employees: 38 },
  { name: 'Technut', emoji: '🤖', usage: '68%', color: '#6366F1', employees: 31 },
  { name: 'Moves & Grooves', emoji: '💃', usage: '60%', color: '#8B5CF6', employees: 28 },
  { name: 'Trip and Tell', emoji: '🌍', usage: '55%', color: '#3B82F6', employees: 25 },
  { name: 'Chowdown', emoji: '🍳', usage: '48%', color: '#F59E0B', employees: 22 },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', to: '/corporate' },
  { icon: Users, label: 'Employees', to: '/corporate/employees' },
  { icon: BarChart3, label: 'Engagement', to: '/corporate/engagement' },
  { icon: Calendar, label: 'Activities', to: '/corporate/activities' },
  { icon: BookOpen, label: 'Learning Plans', to: '/corporate/learning' },
  { icon: ShoppingBag, label: 'Service Brands', to: '/corporate/brands' },
  { icon: UserCheck, label: 'Vendors', to: '/vendors' },
  { icon: Settings, label: 'Settings', to: '/corporate/settings' },
];

export function CorporateDashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F3FF', display: 'flex', fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex"
        style={{
          width: '240px',
          flexShrink: 0,
          background: '#1A1A28',
          borderRadius: '0 2.5rem 2.5rem 0',
          padding: '2rem 1.25rem',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#8B5CF6' }}>creative</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>self</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', display: 'block', letterSpacing: '0.1em' }}>FOR BUSINESS</span>
          </Link>
        </div>

        {/* Company profile */}
        <div
          style={{
            background: 'rgba(139,92,246,0.15)',
            border: '1.5px solid rgba(139,92,246,0.3)',
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
              background: 'rgba(139,92,246,0.2)',
              border: '2px solid rgba(139,92,246,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '0.75rem',
            }}
          >
            {company.avatar}
          </div>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>{company.name}</p>
          <p style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: 600 }}>{company.plan}</p>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>{company.employees} employees</p>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map(({ icon: Icon, label, to }) => (
            <Link key={label} to={to} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: label === 'Overview' ? 700 : 500, color: label === 'Overview' ? '#1A1A28' : 'rgba(255,255,255,0.5)', background: label === 'Overview' ? '#8B5CF6' : 'transparent', marginBottom: '0.25rem', transition: 'all 0.2s ease', textAlign: 'left', textDecoration: 'none' }}><Icon size={17} />{label}</Link>
          ))}
        </nav>

        <Link
          to="/vendors"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <UserCheck size={17} />
          Vendor Portal
        </Link>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto', paddingTop: '5.5rem' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A28', marginBottom: '0.25rem' }}>
              {company.name}
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#717182' }}>
              Creative engagement dashboard · July 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#ffffff',
                background: '#8B5CF6',
                boxShadow: '0 4px 16px rgba(139,92,246,0.35)',
              }}
            >
              <Plus size={16} />
              New Program
            </button>
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
          </div>
        </div>

        {/* Engagement stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {engagementStats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: '#ffffff',
                borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                border: '1.5px solid rgba(0,0,0,0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1A1A28', lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontSize: '0.8rem', color: '#717182', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{stat.label}</p>
              <span
                style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: stat.color,
                  background: `${stat.color}15`,
                }}
              >
                {stat.change}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Programs + Schedule */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Active Programs */}
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
                  <Zap size={18} color="#8B5CF6" />
                  <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28' }}>Creative Programs</h2>
                </div>
                <button
                  style={{
                    padding: '0.35rem 0.875rem',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(139,92,246,0.25)',
                    background: 'rgba(139,92,246,0.06)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#8B5CF6',
                    cursor: 'pointer',
                  }}
                >
                  View all
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {programs.map((prog) => (
                  <div
                    key={prog.name}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
                      background: '#F8FCFF',
                      border: '1.5px solid rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A1A28' }}>{prog.name}</p>
                        <p style={{ fontSize: '0.75rem', color: '#717182' }}>{prog.brand}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            padding: '0.2rem 0.7rem',
                            borderRadius: '9999px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: prog.status === 'Active' ? '#10B981' : prog.status === 'Upcoming' ? '#33C4F0' : '#717182',
                            background: prog.status === 'Active' ? '#10B98115' : prog.status === 'Upcoming' ? '#33C4F015' : '#71718215',
                          }}
                        >
                          {prog.status}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#717182' }}>{prog.participants} people</span>
                      </div>
                    </div>
                    {prog.progress > 0 && (
                      <div style={{ height: '5px', borderRadius: '9999px', background: 'rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${prog.progress}%`, borderRadius: '9999px', background: prog.color, transition: 'width 0.5s ease' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled Activities */}
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
                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28' }}>Scheduled Activities</h2>
              </div>
              <div className="flex flex-col gap-3">
                {scheduledActivities.map((act) => (
                  <div
                    key={act.title}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      borderRadius: '9999px',
                      background: `${act.color}08`,
                      border: `1.5px solid ${act.color}20`,
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '9999px',
                        background: act.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        flexDirection: 'column',
                      }}
                    >
                      <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>{act.date.split(' ')[0]}</p>
                      <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{act.date.split(' ')[1]}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A1A28' }}>{act.title}</p>
                      <p style={{ fontSize: '0.75rem', color: '#717182' }}>{act.brand} · {act.time}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Users size={14} color="#717182" />
                      <span style={{ fontSize: '0.8rem', color: '#717182', fontWeight: 600 }}>{act.participants}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Top participants */}
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
                <TrendingUp size={18} color="#10B981" />
                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28' }}>Top Participants</h2>
              </div>
              <div className="flex flex-col gap-3">
                {topEmployees.map((emp, i) => (
                  <div
                    key={emp.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '9999px',
                      background: '#F8FCFF',
                      border: '1.5px solid rgba(0,0,0,0.05)',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#717182', width: '16px' }}>#{i + 1}</span>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '9999px',
                        background: `${emp.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                      }}
                    >
                      {emp.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A28' }}>{emp.name}</p>
                      <p style={{ fontSize: '0.7rem', color: emp.color, fontWeight: 600 }}>{emp.type}</p>
                    </div>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#10B981',
                        background: '#10B98115',
                      }}
                    >
                      {emp.activities} acts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand subscriptions */}
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
                <ShoppingBag size={18} color="#F59E0B" />
                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A28' }}>Brand Subscriptions</h2>
              </div>
              <div className="flex flex-col gap-3">
                {brandSubscriptions.map((brand) => (
                  <div key={brand.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: '1rem' }}>{brand.emoji}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A28' }}>{brand.name}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#717182' }}>{brand.employees} employees</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '9999px', background: 'rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: brand.usage, borderRadius: '9999px', background: brand.color }} />
                    </div>
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
