import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { useSubscription, ActivityItem } from '../context/SubscriptionContext';
import { mockVendors, mockActivities, themeCategories } from '../data/subscriptionData';
import { SubscriptionEntitlementHeader } from '../components/shared/SubscriptionEntitlementHeader';
import { ActivityLimitModal } from '../components/shared/ActivityLimitModal';
import { RoleSwitcher } from '../components/layout/RoleSwitcher';
import {
  CalendarDays,
  Check,
  Compass,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  X,
  ChevronRight,
  Eye,
  Building2,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import logoIcon from '../../imports/Logo.png';

function UniversalSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#33c4f0]/15 bg-white/90 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex">
      <Link to="/" title="CreativeSelf Home" aria-label="CreativeSelf Home" className="grid h-10 w-10 place-items-center transition-transform hover:scale-105">
        <ImageWithFallback src={logoIcon} alt="CreativeSelf Logo" className="h-full w-full object-contain" />
      </Link>
      <nav className="mt-10 flex flex-col gap-3" aria-label="Universal navigation">
        <Link to="/dashboard" title="Home" aria-label="Home" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]">
          <LayoutDashboard size={18} />
        </Link>
        <Link to="/discover/providers" title="Discover" aria-label="Discover" className="grid h-10 w-10 place-items-center rounded-full bg-[#33c4f0] text-[#1a1a28]">
          <Compass size={18} />
        </Link>
        <Link to="/bookings" title="Bookings" aria-label="Bookings" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]">
          <CalendarDays size={18} />
        </Link>
      </nav>
      <div className="mt-auto flex flex-col gap-3">
        <button type="button" title="Settings" aria-label="Settings" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]">
          <Settings size={18} />
        </button>
        <Link to="/" title="Log out" aria-label="Log out" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#1a1a28] hover:text-white">
          <LogOut size={18} />
        </Link>
        <RoleSwitcher activeRole="client" />
      </div>
    </aside>
  );
}

export function DiscoverPage() {
  const navigate = useNavigate();

  const {
    planName,
    maxBrands,
    selectedBrand,
    selectBrand,
  } = useSubscription();

  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = mockVendors.filter((v) => {
    const matchesTheme = selectedTheme === 'all' || v.theme === selectedTheme;
    const matchesSearch =
      searchQuery === '' ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.theme.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTheme && matchesSearch;
  });

  const activeThemeObj = themeCategories.find((t) => t.id === selectedTheme);

  return (
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <UniversalSidebar />
      <ActivityLimitModal />

      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_minmax(0,1fr)_250px] lg:px-8 lg:py-12 lg:pl-[76px]">
        {/* Navigation Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 bg-[#1a1a28] p-5 text-white" style={{ borderRadius: '20px 20px 64px 20px' }}>
            <Link to="/" className="flex items-center gap-3 no-underline">
              <ImageWithFallback src={logoIcon} alt="CreativeSelf Logo" className="h-8 w-8 object-contain" />
              <span className="text-lg font-extrabold">
                <span className="text-[#33c4f0]">creative</span>
                <span className="text-white">self</span>
              </span>
            </Link>

            <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-white/45">Step 1: Pick a Brand</p>
            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-3 rounded-full bg-[#33c4f0] px-4 py-3 text-sm font-bold text-[#1a1a28]">
                <Building2 size={17} /> Service Brands
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5 text-xs leading-5 text-white/55">
              Explore brands with photos and preview their included services before committing your 1 Service Brand entitlement.
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main>
          <SubscriptionEntitlementHeader />

          <header className="mt-6 overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style={{ borderRadius: '20px 20px 64px 20px' }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">
                  Step 1 · Pick Your Service Brand
                </p>
                <h1 className="mt-2 text-3xl font-extrabold leading-tight">
                  Choose a Service Brand for your {planName} plan
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#717182]">
                  Browse eligible brands categorized by experience theme. Preview their included photo activities before deciding which brand to commit to this month.
                </p>
              </div>

              <div className="rounded-full bg-[#e8f9ff] px-4 py-2 text-xs font-bold text-[#147c9e]">
                1 Brand Entitlement
              </div>
            </div>

            {/* Search Input */}
            <div className="mt-6 flex items-center gap-3 rounded-[16px_16px_40px_16px] border border-[#33c4f0]/20 bg-[#f8fdff] px-4 py-3 text-sm text-[#717182]">
              <Search size={17} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search service brands or experience themes (e.g. Heart of Art, Chowdown)..."
                className="w-full bg-transparent text-sm text-[#1a1a28] outline-none placeholder:text-[#717182]"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="text-xs text-[#717182] hover:text-[#1a1a28]">
                  Clear
                </button>
              )}
            </div>

            {/* Theme Category Filter Pills */}
            <div className="mt-6 border-t border-[#33c4f0]/15 pt-5">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#717182]">Filter by Experience Theme</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {themeCategories.map((theme) => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold transition ${
                        isSelected
                          ? 'bg-[#1a1a28] text-white shadow-md'
                          : 'bg-[#f8fdff] border border-[#33c4f0]/20 text-[#414153] hover:bg-[#e8f9ff] hover:text-[#1a1a28]'
                      }`}
                    >
                      <span>{theme.symbol}</span>
                      <span>{theme.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </header>

          {/* Category Subheader */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-[#1a1a28]">
                {activeThemeObj ? activeThemeObj.name : 'All Brands'}
              </h2>
              <p className="text-xs text-[#717182]">
                {activeThemeObj?.description || 'Select a service brand to access its included activities.'}
              </p>
            </div>
            <span className="text-xs font-bold text-[#717182]">{filteredVendors.length} brands</span>
          </div>

          {/* Service Brands Grid */}
          <section className="mt-4 grid gap-6 sm:grid-cols-1">
            {filteredVendors.map((vendor) => {
              const isSelectedBrand = selectedBrand?.id === vendor.id;
              const isOtherBrandSelected = selectedBrand !== null && selectedBrand.id !== vendor.id;
              const vendorActivities = mockActivities.filter((a) => a.vendorId === vendor.id);

              return (
                <article
                  key={vendor.id}
                  className="overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)] transition hover:shadow-[0_18px_48px_rgba(28,118,155,.12)]"
                  style={{ borderRadius: '20px 20px 64px 20px' }}
                >
                  {/* Brand Cover Photo Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={vendor.image}
                      alt={vendor.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a28]/80 via-[#1a1a28]/30 to-transparent"></div>

                    <div className="absolute left-6 bottom-4 right-6 flex items-end justify-between">
                      <div className="flex items-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl shadow-md">
                          {vendor.avatar}
                        </div>
                        <div>
                          <span
                            className="inline-block rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-extrabold uppercase text-white backdrop-blur"
                          >
                            {vendor.theme}
                          </span>
                          <h3 className="text-xl font-extrabold text-white">{vendor.name}</h3>
                        </div>
                      </div>

                      {isSelectedBrand ? (
                        <span className="rounded-full bg-[#10b981] px-3.5 py-1 text-xs font-extrabold text-white shadow-sm">
                          ✓ Selected Brand
                        </span>
                      ) : isOtherBrandSelected ? (
                        <span className="rounded-full bg-amber-500/90 px-3.5 py-1 text-xs font-bold text-white backdrop-blur">
                          Other Brand Selected
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#33c4f0] px-3.5 py-1 text-xs font-extrabold text-[#1a1a28] shadow-sm">
                          Available in Plan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Brand Body Info & Actions */}
                  <div className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#717182]">
                          <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            <span>{vendor.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{vendor.location}</span>
                        </div>
                        <p className="mt-1.5 text-sm leading-6 text-[#414153]">{vendor.specialty}</p>
                      </div>

                      <div className="flex flex-row items-center gap-2.5">
                        {isSelectedBrand ? (
                          <div className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#10b981] px-4 py-2 text-xs font-extrabold text-white">
                            <Check size={15} /> Selected
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              selectBrand({
                                id: vendor.id,
                                name: vendor.name,
                                rating: vendor.rating,
                                specialty: vendor.specialty,
                                color: vendor.color,
                                avatar: vendor.avatar,
                              });
                              navigate(`/discover/providers/${vendor.id}`);
                            }}
                            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1a1a28] px-5 py-2 text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                          >
                            Select
                          </button>
                        )}

                        <Link
                          to={`/discover/providers/${vendor.id}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#33c4f0]/30 bg-[#f8fdff] px-5 py-2 text-xs font-extrabold text-[#147c9e] no-underline transition hover:bg-[#e8f9ff]"
                        >
                          <Eye size={15} /> Preview
                        </Link>
                      </div>
                    </div>

                    {/* Services Preview Grid with Photos */}
                    <div className="mt-5 border-t border-[#33c4f0]/15 pt-4">
                      <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#717182]">
                        Included Services Photo Preview ({vendorActivities.length} available):
                      </p>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                        {vendorActivities.map((act) => (
                          <Link
                            key={act.id}
                            to={`/discover/services/${act.id}`}
                            className="group flex overflow-hidden rounded-xl border border-[#33c4f0]/20 bg-[#f8fdff] no-underline transition hover:border-[#33c4f0] hover:shadow-md"
                          >
                            <div className="h-16 w-16 shrink-0 overflow-hidden bg-gray-200">
                              <ImageWithFallback
                                src={act.image}
                                alt={act.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-center p-2.5">
                              <span className="font-extrabold text-[#1a1a28] group-hover:text-[#147c9e] truncate max-w-[130px]">
                                {act.name}
                              </span>
                              <span className="mt-0.5 text-[10px] font-bold text-[#717182]">{act.duration}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </main>

        {/* Right Sidebar Filters & Status */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-6">
            <div className="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: '20px 20px 64px 20px' }}>
              <span className="text-sm font-extrabold text-[#1a1a28]">Experience Themes</span>
              <div className="mt-3 space-y-2">
                {themeCategories.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`flex w-full items-center justify-between rounded-full px-3 py-2 text-left text-xs font-bold transition ${
                      selectedTheme === theme.id ? 'bg-[#33c4f0] text-[#1a1a28]' : 'text-[#717182] hover:bg-[#e8f9ff]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{theme.symbol}</span>
                      <span>{theme.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
