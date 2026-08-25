import React from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useSubscription, ActivityItem } from '@/app/context/SubscriptionContext';
import { mockVendors, mockActivities } from '@/app/data/subscriptionData';
import { SubscriptionEntitlementHeader } from '@/app/components/shared/SubscriptionEntitlementHeader';
import { ActivityLimitModal } from '@/app/components/shared/ActivityLimitModal';
import { UniversalSidebar } from '@/app/components/layout/UniversalSidebar';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import {
  Star,
  Check,
  CaretLeft as ChevronLeft,
  MapPin,
  Clock,
  Buildings as Building2,
  Sparkle as Sparkles,
  Stack as Layers,
  Compass,
  CalendarBlank as CalendarDays,
  Users,
  Gear as Settings,
  SignOut as LogOut,
  Info,
  ShieldCheck,
  Eye,
  WarningCircle as AlertCircle,
} from '@phosphor-icons/react';

export function VendorDetailPage() {
  const { vendorId } = useParams<{ vendorId: string }>();
  const navigate = useNavigate();

  const {
    planName,
    maxBrands,
    maxActivities,
    selectedBrand,
    selectedActivities,
    selectBrand,
    selectActivity,
    unselectActivity,
    isActivitySelected,
    openLimitModal,
  } = useSubscription();

  const vendor = mockVendors.find((v) => v.id === vendorId) || mockVendors[0];
  const vendorActivities = mockActivities.filter((a) => a.vendorId === vendor.id);

  const isCurrentBrandSelected = selectedBrand?.id === vendor.id;
  const isOtherBrandSelected = selectedBrand !== null && selectedBrand.id !== vendor.id;
  const isActivityLimitReached = selectedActivities.length >= maxActivities;

  const categories = Array.from(new Set(vendorActivities.map((a) => a.category)));

  const handleCommitBrand = () => {
    selectBrand({
      id: vendor.id,
      name: vendor.name,
      rating: vendor.rating,
      specialty: vendor.specialty,
      color: vendor.color,
      avatar: vendor.avatar,
    });
  };

  const handleActivityToggle = (act: (typeof mockActivities)[0]) => {
    if (isActivitySelected(act.id)) {
      unselectActivity(act.id);
      return;
    }

    if (!isCurrentBrandSelected) {
      selectBrand({
        id: vendor.id,
        name: vendor.name,
        rating: vendor.rating,
        specialty: vendor.specialty,
        color: vendor.color,
        avatar: vendor.avatar,
      });
    }

    const activityItem: ActivityItem = {
      id: act.id,
      name: act.name,
      vendorId: act.vendorId,
      vendorName: act.vendorName,
      category: act.category,
      duration: act.duration,
      location: act.location,
      description: act.description,
      color: act.color,
      symbol: act.symbol,
      image: act.image,
    };

    const res = selectActivity(activityItem);
    if (!res.success && res.reason === 'limit_reached') {
      openLimitModal();
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}>
      <ActivityLimitModal />

      <UniversalSidebar />

      {/* Main Layout Container */}
      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]">
        {/* Navigation Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 bg-[#1a1a28] p-5 text-white" style={{ borderRadius: '20px 20px 64px 20px' }}>
            <Link to="/discover/providers" className="inline-flex items-center gap-2 text-xs font-bold text-[#33c4f0] hover:underline">
              <ChevronLeft size={16} /> All Service Brands
            </Link>
            <div className="mt-6">
              <div className="grid h-12 w-12 place-items-center rounded-full text-2xl" style={{ background: `${vendor.color}25` }}>
                {vendor.avatar}
              </div>
              <h2 className="mt-3 text-lg font-extrabold">{vendor.name}</h2>
              <p className="mt-1 text-xs text-white/70">{vendor.location}</p>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-white/45">Categories</p>
              <div className="mt-2 space-y-1">
                {categories.map((cat) => (
                  <a key={cat} href={`#cat-${cat}`} className="block rounded-lg px-3 py-1.5 text-xs font-bold text-white/70 hover:bg-white/10 hover:text-white">
                    {cat}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Center Content Area */}
        <main>
          {/* Top Entitlement Banner */}
          <SubscriptionEntitlementHeader />

          {/* Preview vs Committed Banner */}
          {!isCurrentBrandSelected && (
            <div className="mt-4 rounded-2xl bg-[#e8f9ff] border border-[#33c4f0]/30 p-4 text-xs text-[#147c9e] flex items-center justify-between shadow-xs">
              <span className="flex items-center gap-2 font-bold">
                <Eye size={16} className="text-[#33c4f0]" />
                Preview Mode: You are exploring {vendor.name}'s activities before committing.
              </span>
              <button
                type="button"
                onClick={handleCommitBrand}
                className="rounded-full bg-[#1a1a28] px-4 py-1.5 text-xs font-extrabold text-white hover:bg-[#33c4f0] hover:text-[#1a1a28]"
              >
                Select
              </button>
            </div>
          )}

          {/* Vendor Hero Banner with Photo */}
          <header className="mt-4 overflow-hidden bg-white shadow-[0_16px_42px_rgba(28,118,155,.08)]" style={{ borderRadius: '20px 20px 64px 20px' }}>
            <div className="relative h-52 w-full overflow-hidden">
              <ImageWithFallback src={vendor.image} alt={vendor.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a28] via-[#1a1a28]/40 to-transparent"></div>

              <div className="absolute left-6 bottom-5 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow-lg">
                    {vendor.avatar}
                  </div>
                  <div>
                    <span className="inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-extrabold uppercase text-white backdrop-blur">
                      {vendor.theme}
                    </span>
                    <h1 className="mt-1 text-3xl font-extrabold text-white">{vendor.name}</h1>
                  </div>
                </div>

                <div>
                  {isCurrentBrandSelected ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#10b981] px-4 py-2 text-xs font-extrabold text-white shadow-md">
                      <Check size={16} /> Selected
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCommitBrand}
                      className="rounded-full bg-[#33c4f0] px-5 py-2 text-xs font-extrabold text-[#1a1a28] shadow-md transition hover:bg-white"
                    >
                      Select
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-6 text-[#414153]">{vendor.description}</p>
              <div className="mt-4 flex flex-wrap gap-5 border-t border-[#33c4f0]/15 pt-4 text-xs font-bold text-[#717182]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#33c4f0]" /> {vendor.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-[#10b981]" /> Verified Subscription Partner
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 size={15} className="text-[#8B5CF6]" /> {vendorActivities.length} Activities Included
                </span>
              </div>
            </div>
          </header>

          {/* Grouped Services / Activities List with Photos */}
          <div className="mt-8 space-y-8">
            {categories.map((category) => {
              const activities = vendorActivities.filter((a) => a.category === category);
              return (
                <section key={category} id={`cat-${category}`} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#33c4f0]/20 pb-2">
                    <h2 className="text-xl font-extrabold text-[#1a1a28]">{category}</h2>
                    <span className="text-xs font-bold text-[#717182]">{activities.length} activities</span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-1">
                    {activities.map((act) => {
                      const selected = isActivitySelected(act.id);
                      const cantSelect = !selected && isActivityLimitReached;

                      return (
                        <article
                          key={act.id}
                          className="group relative overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)] transition hover:shadow-[0_18px_48px_rgba(28,118,155,.12)]"
                          style={{ borderRadius: '20px 20px 64px 20px' }}
                        >
                          <div className="flex flex-col sm:flex-row">
                            {/* Photo Thumbnail */}
                            <div className="h-48 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-auto sm:w-56">
                              <ImageWithFallback
                                src={act.image}
                                alt={act.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>

                            {/* Activity Info & Actions */}
                            <div className="flex flex-1 flex-col justify-between p-6">
                              <div>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="rounded-full bg-[#e8f9ff] px-3 py-1 text-[11px] font-extrabold text-[#147c9e]">
                                    Included in plan
                                  </span>
                                  <span className="text-xs font-bold text-[#717182]">{act.duration}</span>
                                </div>

                                <h3 className="mt-2 text-xl font-extrabold text-[#1a1a28]">
                                  <Link to={`/discover/services/${act.id}`} className="hover:text-[#33c4f0] transition">
                                    {act.name}
                                  </Link>
                                </h3>
                                <p className="mt-1 text-sm text-[#717182] line-clamp-2">{act.description}</p>
                              </div>

                              <div className="mt-4 flex items-center justify-between border-t border-[#33c4f0]/15 pt-3">
                                <Link
                                  to={`/discover/services/${act.id}`}
                                  className="text-xs font-bold text-[#147c9e] hover:underline"
                                >
                                  Preview Details →
                                </Link>

                                {selected ? (
                                  <button
                                    type="button"
                                    onClick={() => handleActivityToggle(act)}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#10b981] px-5 py-2 text-xs font-extrabold text-white transition hover:bg-[#087e58]"
                                  >
                                    <Check size={16} /> Activity Selected
                                  </button>
                                ) : cantSelect ? (
                                  <button
                                    type="button"
                                    onClick={openLimitModal}
                                    className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-extrabold text-[#717182] hover:bg-gray-200"
                                  >
                                    Limit Reached
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleActivityToggle(act)}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-5 py-2 text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                                  >
                                    Select Activity
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </main>

        {/* Right Sidebar: Plan Overview Card */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-6">
            <div className="overflow-hidden bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: '20px 20px 64px 20px' }}>
              <div className="flex items-center justify-between border-b border-[#33c4f0]/15 pb-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#33c4f0]">Your Plan</p>
                  <h3 className="text-lg font-extrabold text-[#1a1a28]">{planName}</h3>
                </div>
                <Sparkles className="text-[#33c4f0]" size={20} />
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Selected Service Brand</p>
                  <div className="mt-2 rounded-2xl bg-[#f8fdff] border border-[#33c4f0]/20 p-3">
                    <p className="text-sm font-extrabold text-[#1a1a28]">{selectedBrand ? selectedBrand.name : 'None selected yet'}</p>
                    <p className="mt-0.5 text-xs font-bold text-[#147c9e]">
                      {selectedBrand ? '1 / 1 selected' : '0 / 1 selected'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Activities</p>
                  <div className="mt-2 rounded-2xl bg-[#f8fdff] border border-[#33c4f0]/20 p-3">
                    <div className="flex items-center justify-between text-xs font-extrabold text-[#1a1a28]">
                      <span>Selected:</span>
                      <span className="text-[#10b981]">{selectedActivities.length} / {maxActivities}</span>
                    </div>

                    <div className="mt-3 space-y-2">
                      {selectedActivities.map((act) => (
                        <div key={act.id} className="flex items-start justify-between gap-2 text-xs font-bold text-[#1a1a28]">
                          <span className="flex items-center gap-1.5">
                            <Check size={14} className="text-[#10b981] shrink-0" />
                            <span className="truncate">{act.name}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => unselectActivity(act.id)}
                            className="text-[#717182] hover:text-red-500"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {selectedActivities.length === 0 && (
                        <p className="text-xs italic text-[#717182]">No activities selected yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#33c4f0]/15">
                {!isCurrentBrandSelected ? (
                  <button
                    type="button"
                    onClick={handleCommitBrand}
                    className="w-full rounded-full bg-[#1a1a28] py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                  >
                    Select {vendor.name}
                  </button>
                ) : (
                  <Link
                    to="/bookings"
                    className="block w-full rounded-full bg-[#1a1a28] py-2.5 text-center text-xs font-extrabold text-white no-underline transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                  >
                    View My Booked Activities
                  </Link>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
