import { Link } from 'react-router';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import logoWhite from '../../../imports/image.png';

const footerLinks = {
  Platform: [
    { label: 'Creative Personality', href: '#personality' },
    { label: 'Take the Test', href: '/test' },
    { label: 'Activity Discovery', href: '#discover' },
    { label: 'Service Brands', href: '#brands' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Company: [
    { label: 'About CreativeSelf', href: '#about' },
    { label: 'For Business', href: '#corporate' },
    { label: 'Vendor Partners', href: '/vendors' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Resources: [
    { label: 'Blog', href: '#' },
    { label: 'Research', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'X / Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export function Footer() {
  return (
    <footer style={{ background: '#1A1A28', color: '#ffffff' }}>
      {/* Top wave */}
      <div style={{ marginBottom: '-2px', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#1A1A28" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
                padding: '1.25rem',
                display: 'inline-block',
                marginBottom: '1.25rem',
              }}
            >
              <ImageWithFallback
                src={logoWhite}
                alt="CreativeSelf"
                style={{ height: '56px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '280px', marginBottom: '1.5rem' }}>
              A creativity, wellness, and personal development platform. Powered by Acumen AI.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '9999px',
                    background: 'rgba(51,196,240,0.12)',
                    border: '1px solid rgba(51,196,240,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#33C4F0',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#33C4F0';
                    (e.currentTarget as HTMLElement).style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(51,196,240,0.12)';
                    (e.currentTarget as HTMLElement).style.color = '#33C4F0';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', color: '#33C4F0', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {section}
              </h4>
              <ul className="flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      style={{
                        color: 'rgba(255,255,255,0.55)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#33C4F0'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Acumen badge */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '1.5rem',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
            © 2026 CreativeSelf™. All rights reserved. Be anything but square.
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 1rem',
              borderRadius: '9999px',
              background: 'rgba(51,196,240,0.1)',
              border: '1px solid rgba(51,196,240,0.2)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#33C4F0',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: '#33C4F0', display: 'inline-block', animation: 'pulseGlow 2s ease-in-out infinite' }} />
            Powered by Acumen AI
          </div>
        </div>
      </div>
    </footer>
  );
}
