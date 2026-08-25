import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { useSubscription, ActivityItem } from '@/app/context/SubscriptionContext';
import { mockVendors, mockActivities, themeCategories } from '@/app/data/subscriptionData';
import { SubscriptionEntitlementHeader } from '@/app/components/shared/SubscriptionEntitlementHeader';
import { ActivityLimitModal } from '@/app/components/shared/ActivityLimitModal';
import { RoleSwitcher } from '@/app/components/layout/RoleSwitcher';
import {
  CalendarBlank as CalendarDays,
  Check,
  Compass,
  SquaresFour as LayoutDashboard,
  SignOut as LogOut,
  MagnifyingGlass as Search,
  Gear as Settings,
  SlidersHorizontal,
  Sparkle as Sparkles,
  Star,
  Users,
  X,
  CaretRight as ChevronRight,
  Eye,
  Buildings as Building2,
} from '@phosphor-icons/react';
import { UniversalSidebar } from '@/app/components/layout/UniversalSidebar';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import logoIcon from '@/imports/Logo.png';

export function DiscoverPage() {
  const navigate = useNavigate();

  const {
    planName,
    maxBrands,
    selectedBrand,
    selectBrand,
  } = useSubscription();

  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedPersonality, setSelectedPersonality] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAiOnly, setShowAiOnly] = useState(false);

  // Personality types definition matching Acumen AI engine
  const personalityTypes = [
    { id: 'all', label: 'All Personalities', symbol: '✨' },
    { id: 'explorer', label: 'The Explorer', symbol: '🟣', desc: 'Restoration & Mindful', matchVendorId: 'studio-lumen' },
    { id: 'original', label: 'The Original', symbol: '🟡', desc: 'Art & Crafting', matchVendorId: 'cocoa-collective' },
    { id: 'imaginative', label: 'The Imaginative', symbol: '🔵', desc: 'Metaphors & Vision', matchVendorId: 'rhythm-room' },
    { id: 'expressive', label: 'The Expressive', symbol: '🔴', desc: 'Emotion & Performance', matchVendorId: 'rhythm-room' },
    { id: 'innovative', label: 'The Innovative', symbol: '🟢', desc: 'Design & Invention', matchVendorId: 'studio-lumen' },
  ];

  const filteredVendors = mockVendors.filter((v) => {
    const matchesTheme = selectedTheme === 'all' || v.theme === selectedTheme;
    const matchesSearch =
      searchQuery === '' ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.theme.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Acumen AI score matching
    const aiMatchScore = v.id === 'studio-lumen' ? 98 : v.id === 'cocoa-collective' ? 95 : 92;
    const matchesAiFilter = !showAiOnly || aiMatchScore >= 95;

    return matchesTheme && matchesSearch && matchesAiFilter;
  });

  const activeThemeObj = themeCategories.find((t) => t.id === selectedTheme);

  return (
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}>
      <UniversalSidebar />
      <ActivityLimitModal />

      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]">
        {/* Navigation Sidebar */}
        <aside className="hidden lg:block">
          <SubscriptionEntitlementHeader variant="sidebar" showLogo={true} />
        </aside>

        {/* Main Content Area */}
        <main>
          {/* Mobile view subscription entitlement header */}
          <div className="lg:hidden mb-6">
            <SubscriptionEntitlementHeader variant="horizontal" />
          </div>

          <header className="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style={{ borderRadius: '20px 20px 64px 20px' }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200/60 px-3 py-1 text-xs font-extrabold text-purple-700 mb-2">
                  <Sparkles size={13} className="text-purple-600 animate-pulse" />
                  Acumen AI Recommendation Engine Active
                </div>
                <h1 className="mt-1 text-3xl font-extrabold leading-tight">
                  Choose a Service Brand for your {planName} plan
                </h1>
                <p className="mt-2.5 max-w-2xl text-sm leading-6 text-[#717182]">
                  Acumen AI has analyzed your creative personality and team goals to recommend top-rated service brands and photo activities.
                </p>
              </div>

              <div className="rounded-full bg-[#e8f9ff] px-4 py-2 text-xs font-bold text-[#147c9e]">
                1 Brand Entitlement
              </div>
            </div>

            {/* Search Input & Acumen AI Filter Toggle */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-[16px_16px_40px_16px] border border-[#33c4f0]/20 bg-[#f8fdff] px-4 py-3 text-sm text-[#717182]">
                <Search size={17} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search service brands, experience themes, or ask Acumen AI..."
                  className="w-full bg-transparent text-sm text-[#1a1a28] outline-none placeholder:text-[#717182]"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="text-xs text-[#717182] hover:text-[#1a1a28]">
                    Clear
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowAiOnly(!showAiOnly)}
                className={`flex items-center gap-2 rounded-full px-4 py-3 text-xs font-extrabold transition shadow-sm ${
                  showAiOnly
                    ? 'bg-purple-600 text-white'
                    : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <Sparkles size={14} />
                {showAiOnly ? 'Showing Top AI Matches (95%+)' : 'Filter 95%+ Acumen AI Matches'}
              </button>
            </div>

            {/* Theme Category Filter Pills */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#717182]">Experience Themes</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {themeCategories.map((theme) => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold transition ${
                        isSelected
                          ? 'bg-[#33c4f0] text-[#1a1a28] shadow-sm'
                          : 'bg-white border border-gray-200 text-[#717182] hover:bg-gray-50'
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
              const aiMatchScore = vendor.id === 'studio-lumen' ? 98 : vendor.id === 'cocoa-collective' ? 95 : 92;

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

                    {/* Acumen AI Match Badge Top Right */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-900/80 px-3 py-1 text-xs font-extrabold text-purple-200 border border-purple-400/40 backdrop-blur shadow-md">
                        <Sparkles size={12} className="text-purple-300 fill-purple-300" />
                        {aiMatchScore}% Acumen Match
                      </span>
                    </div>

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

                        {/* Acumen AI Match Reason Tag */}
                        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700 border border-purple-100">
                          <Sparkles size={12} className="text-purple-600" />
                          Acumen Insight: Matches Explorer & Original personality profiles
                        </div>
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

        {/* Right Sidebar Filters & Acumen AI Curator */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-6">
            {/* Card 1: Acumen AI Curator Widget */}
            <div
              className="overflow-hidden bg-[#15343d] p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]"
              style={{ borderRadius: '20px 20px 64px 20px' }}
            >
              <div className="flex items-center gap-2 text-[#33c4f0] mb-2">
                <Sparkles size={16} className="fill-current" />
                <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-white/50">
                  ACUMEN AI CURATOR
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white">Smart Match of the Month</h3>
              <p className="mt-2 text-xs leading-5 text-white/70 font-medium">
                Acumen AI recommends <strong className="text-[#33c4f0]">Studio Lumen</strong> (98% match) based on your team restoration goals.
              </p>

              <div className="mt-4 rounded-xl bg-white/10 p-3 border border-white/10">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white/60">Match Confidence</span>
                  <span className="text-[#33c4f0]">98% High</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full rounded-full bg-[#33c4f0] w-[98%]" />
                </div>
              </div>
            </div>

            {/* Card 2: Experience Themes List */}
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
