import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { List as Menu, X, DeviceMobile } from '@phosphor-icons/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logoTransparent from '../../../imports/image.png';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Brand Services', href: '/services' },
  { label: 'Personality Test', href: '/test' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'For Business', href: '#corporate' },
];

interface NavBarProps {
  onOpenRegister?: () => void;
}

export function NavBar({ onOpenRegister }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      if (isLanding) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to home then scroll
      }
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className="w-full max-w-6xl flex items-center justify-between px-5 py-3"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '9999px',
            boxShadow: scrolled ? '0 8px 40px rgba(51,196,240,0.15), 0 2px 12px rgba(0,0,0,0.08)' : '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid rgba(51,196,240,0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
            <ImageWithFallback
              src={logoTransparent}
              alt="CreativeSelf"
              style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isAnchor = link.href.startsWith('#');
              const Component = isAnchor ? 'a' : Link;
              const props = isAnchor ? { href: isLanding ? link.href : `/${link.href}` } : { to: link.href };

              return (
                <Component
                  key={link.label}
                  {...(props as any)}
                  onClick={(e: any) => handleNavClick(e, link.href)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: location.pathname === link.href ? '#1AB0DC' : '#2A2A3A',
                    textDecoration: 'none',
                    background: location.pathname === link.href ? 'rgba(51,196,240,0.1)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(51,196,240,0.12)';
                    (e.currentTarget as HTMLElement).style.color = '#1AB0DC';
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.href) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#2A2A3A';
                    }
                  }}
                >
                  {link.label}
                </Component>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              to="/mobile"
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#147C9E',
                textDecoration: 'none',
                background: 'rgba(51,196,240,0.1)',
                border: '1.5px solid rgba(51,196,240,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(51,196,240,0.2)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(51,196,240,0.1)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <DeviceMobile size={18} weight="bold" />
              Mobile App
            </Link>

            <Link
              to="/dashboard"
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#2A2A3A',
                textDecoration: 'none',
                border: '1.5px solid rgba(42,42,58,0.2)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#33C4F0';
                (e.currentTarget as HTMLElement).style.color = '#33C4F0';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(42,42,58,0.2)';
                (e.currentTarget as HTMLElement).style.color = '#2A2A3A';
              }}
            >
              Log In
            </Link>

            <button
              onClick={() => onOpenRegister ? onOpenRegister() : null}
              style={{
                padding: '0.5rem 1.35rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #33C4F0 0%, #1AB0DC 100%)',
                boxShadow: '0 4px 16px rgba(51,196,240,0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(51,196,240,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(51,196,240,0.4)';
              }}
            >
              Register
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex items-center justify-center"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '9999px',
              background: 'rgba(51,196,240,0.1)',
              border: 'none',
              cursor: 'pointer',
              color: '#2A2A3A',
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-x-4 top-24 z-40 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(20px)',
              borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
              padding: '1.5rem',
              boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
              border: '1px solid rgba(51,196,240,0.2)',
            }}
          >
            <nav className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => {
                const isAnchor = link.href.startsWith('#');
                const Component = isAnchor ? 'a' : Link;
                const props = isAnchor ? { href: isLanding ? link.href : `/${link.href}` } : { to: link.href };

                return (
                  <Component
                    key={link.label}
                    {...(props as any)}
                    onClick={(e: any) => handleNavClick(e, link.href)}
                    style={{
                      padding: '0.75rem 1.25rem',
                      borderRadius: '9999px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#2A2A3A',
                      textDecoration: 'none',
                      background: 'rgba(51,196,240,0.06)',
                      display: 'block',
                    }}
                  >
                    {link.label}
                  </Component>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3">
              <Link
                to="/mobile"
                style={{
                  padding: '0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#147C9E',
                  textDecoration: 'none',
                  background: 'rgba(51,196,240,0.12)',
                  border: '1.5px solid rgba(51,196,240,0.3)',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
                onClick={() => setMobileOpen(false)}
              >
                <DeviceMobile size={20} weight="bold" />
                Open Mobile App
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  if (onOpenRegister) onOpenRegister();
                }}
                style={{
                  padding: '0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#fff',
                  border: 'none',
                  background: 'linear-gradient(135deg, #33C4F0 0%, #1AB0DC 100%)',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(51,196,240,0.4)',
                  cursor: 'pointer',
                }}
              >
                Register Now
              </button>
              <Link
                to="/dashboard"
                style={{
                  padding: '0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#2A2A3A',
                  textDecoration: 'none',
                  border: '1.5px solid rgba(42,42,58,0.2)',
                  textAlign: 'center',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
