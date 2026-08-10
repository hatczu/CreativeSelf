import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { useSubscription, ActivityItem } from '../context/SubscriptionContext';
import { mockActivities, mockVendors } from '../data/subscriptionData';
import { SubscriptionEntitlementHeader } from '../components/shared/SubscriptionEntitlementHeader';
import { ActivityLimitModal } from '../components/shared/ActivityLimitModal';
import { RoleSwitcher } from '../components/layout/RoleSwitcher';
import {
  CalendarDays,
  Check,
  ChevronLeft,
  Clock,
  Compass,
  Heart,
  Info,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Search,
  Settings,
  Share2,
  Sparkles,
  Star,
  Users,
  ShieldCheck,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import logoIcon from '../../imports/Logo.png';

export function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const {
    planName,
    maxBrands,
    maxActivities,
    selectedBrand,
    selectedActivities,
    selectActivity,
    unselectActivity,
    isActivitySelected,
    openLimitModal,
  } = useSubscription();

  const activity = mockActivities.find((a) => a.id === serviceId) || mockActivities[0];
  const vendor = mockVendors.find((v) => v.id === activity.vendorId) || mockVendors[0];

  const selected = isActivitySelected(activity.id);
  const isLimitReached = selectedActivities.length >= maxActivities;

  const [selectedSlot, setSelectedSlot] = useState<string | null>(activity.schedule[0]?.id || null);

  const handleSelectToggle = () => {
    if (selected) {
      unselectActivity(activity.id);
      return;
    }

    const activityItem: ActivityItem = {
      id: activity.id,
      name: activity.name,
      vendorId: activity.vendorId,
      vendorName: activity.vendorName,
      category: activity.category,
      duration: activity.duration,
      location: activity.location,
      description: activity.description,
      color: activity.color,
      symbol: activity.symbol,
      image: activity.image,
    };

    const res = selectActivity(activityItem);
    if (!res.success && res.reason === 'limit_reached') {
      openLimitModal();
    }
  };

  const relatedActivities = mockActivities.filter(
    (a) => a.vendorId === activity.vendorId && a.id !== activity.id
  );

  return (
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <ActivityLimitModal />

      {/* Universal Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#33c4f0]/15 bg-white/90 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex">
        <Link to="/" title="CreativeSelf Home" className="grid h-10 w-10 place-items-center transition-transform hover:scale-105">
          <ImageWithFallback src={logoIcon} alt="CreativeSelf Logo" className="h-full w-full object-contain" />
        </Link>
        <nav className="mt-10 flex flex-col gap-3">
          <Link to="/dashboard" title="Home" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] hover:bg-[#e8f9ff]">
            <LayoutDashboard size={18} />
          </Link>
          <Link to="/discover/providers" title="Discover" className="grid h-10 w-10 place-items-center rounded-full bg-[#33c4f0] text-[#1a1a28]">
            <Compass size={18} />
          </Link>
          <Link to="/bookings" title="Bookings" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] hover:bg-[#e8f9ff]">
            <CalendarDays size={18} />
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <button type="button" title="Settings" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] hover:bg-[#e8f9ff]">
            <Settings size={18} />
          </button>
          <Link to="/" title="Log out" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] hover:bg-[#1a1a28] hover:text-white">
            <LogOut size={18} />
          </Link>
          <RoleSwitcher activeRole="client" />
        </div>
      </aside>

      {/* Main Grid Layout */}
      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 pb-14 lg:grid-cols-[1fr_320px] lg:px-8 lg:py-12 lg:pl-[76px]">
        <main>
          {/* Back Navigation */}
          <div className="mb-4 flex items-center justify-between">
            <Link
              to={`/discover/providers/${vendor.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#147c9e] hover:underline"
            >
              <ChevronLeft size={16} /> Back to {vendor.name}
            </Link>
          </div>

          {/* Top Entitlement Header */}
          <SubscriptionEntitlementHeader />

          {/* Hero Banner Section with Photo */}
          <div
            className="mt-6 overflow-hidden bg-white shadow-[0_16px_42px_rgba(28,118,155,.08)]"
            style={{ borderRadius: '20px 20px 64px 20px' }}
          >
            {/* Visual Hero Header Photo */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-100 sm:h-80">
              <ImageWithFallback
                src={activity.image}
                alt={activity.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a28] via-[#1a1a28]/40 to-transparent"></div>

              <div className="absolute left-6 bottom-6 right-6 z-10 flex flex-wrap items-end justify-between gap-4 text-white">
                <div>
                  <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-extrabold text-white backdrop-blur">
                    Included in your {planName} subscription
                  </span>
                  <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                    {activity.name}
                  </h1>
                  <p className="mt-1 text-sm font-bold text-white/90">
                    By {activity.vendorName}
                  </p>
                </div>

                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-3xl backdrop-blur">
                  {activity.symbol}
                </div>
              </div>
            </div>

            {/* Quick Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-[#33c4f0]/15">
              <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-[#717182]">
                <span className="flex items-center gap-1.5 text-[#1a1a28]">
                  <Clock size={16} className="text-[#33c4f0]" /> {activity.duration}
                </span>
                <span className="flex items-center gap-1.5 text-[#1a1a28]">
                  <MapPin size={16} className="text-[#33c4f0]" /> {activity.location}
                </span>
                <span className="flex items-center gap-1 text-amber-500 font-extrabold">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  {activity.rating} <span className="text-[#717182]">({activity.reviewsCount} reviews)</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button type="button" title="Share" className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f9ff] text-[#147c9e]">
                  <Share2 size={16} />
                </button>
                <button type="button" title="Save" className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f9ff] text-[#147c9e]">
                  <Heart size={16} />
                </button>
              </div>
            </div>

            {/* Service Details Tabs & Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-lg font-extrabold text-[#1a1a28]">About this Activity</h2>
                <p className="mt-3 text-sm leading-7 text-[#414153]">{activity.description}</p>

                {/* Highlights */}
                <div className="mt-5 rounded-2xl bg-[#f8fdff] border border-[#33c4f0]/20 p-5">
                  <h3 className="text-xs font-extrabold uppercase tracking-[.14em] text-[#33c4f0]">Activity Highlights</h3>
                  <ul className="mt-3 space-y-2 text-xs font-bold text-[#1a1a28]">
                    {activity.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check size={14} className="text-[#10b981] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* What's Included */}
              <section className="border-t border-[#33c4f0]/15 pt-6">
                <h2 className="text-lg font-extrabold text-[#1a1a28]">What's Included</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {activity.included.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-xl border border-[#33c4f0]/15 bg-white p-3.5 text-xs font-bold text-[#1a1a28]">
                      <div className="grid h-7 w-7 place-items-center rounded-full bg-[#10b981]/15 text-[#10b981]">
                        <Check size={14} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Agenda / What to Expect */}
              <section className="border-t border-[#33c4f0]/15 pt-6">
                <h2 className="text-lg font-extrabold text-[#1a1a28]">What to Expect</h2>
                <div className="mt-4 space-y-4">
                  {activity.whatToExpect.map((agenda, idx) => (
                    <div key={idx} className="flex gap-4 rounded-xl bg-[#f8fdff] p-4 border border-[#33c4f0]/15">
                      <span className="shrink-0 rounded-md bg-[#33c4f0]/20 px-2.5 py-1 text-xs font-extrabold text-[#147c9e]">
                        {agenda.time}
                      </span>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#1a1a28]">{agenda.title}</h4>
                        <p className="mt-1 text-xs text-[#717182]">{agenda.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Schedule & Availability (No Prices!) */}
              <section className="border-t border-[#33c4f0]/15 pt-6">
                <h2 className="text-lg font-extrabold text-[#1a1a28]">Upcoming Schedule & Availability</h2>
                <p className="mt-1 text-xs text-[#717182]">Select a slot for your subscription booking:</p>

                <div className="mt-4 space-y-3">
                  {activity.schedule.map((slot) => {
                    const isSelectedSlot = selectedSlot === slot.id;
                    return (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`flex cursor-pointer flex-wrap items-center justify-between gap-4 rounded-2xl p-4 transition ${
                          isSelectedSlot
                            ? 'border-2 border-[#33c4f0] bg-[#e8f9ff]'
                            : 'border border-[#33c4f0]/20 bg-white hover:bg-[#f8fdff]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar size={18} className="text-[#33c4f0]" />
                          <div>
                            <p className="text-sm font-extrabold text-[#1a1a28]">{slot.date}</p>
                            <p className="text-xs text-[#717182]">{slot.time}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-[#10b981]/15 px-3 py-1 text-xs font-extrabold text-[#087e58]">
                            Included in plan
                          </span>
                          <span className="text-xs font-bold text-[#717182]">
                            {slot.seatsLeft} spots left
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Requirements & Policy */}
              <section className="grid gap-6 border-t border-[#33c4f0]/15 pt-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-extrabold text-[#1a1a28]">Requirements</h3>
                  <ul className="mt-2 space-y-1 text-xs text-[#717182]">
                    {activity.requirements.map((r, idx) => (
                      <li key={idx}>• {r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#1a1a28]">What to Bring</h3>
                  <ul className="mt-2 space-y-1 text-xs text-[#717182]">
                    {activity.whatToBring.map((b, idx) => (
                      <li key={idx}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Related Activities */}
              {relatedActivities.length > 0 && (
                <section className="border-t border-[#33c4f0]/15 pt-6">
                  <h2 className="text-lg font-extrabold text-[#1a1a28]">More Activities from {vendor.name}</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {relatedActivities.map((rel) => (
                      <div key={rel.id} className="overflow-hidden rounded-2xl border border-[#33c4f0]/20 bg-white">
                        <div className="h-32 w-full overflow-hidden bg-gray-100">
                          <ImageWithFallback src={rel.image} alt={rel.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="p-4">
                          <span className="text-xs font-extrabold uppercase" style={{ color: rel.color }}>{rel.category}</span>
                          <h4 className="mt-1 text-base font-extrabold text-[#1a1a28]">{rel.name}</h4>
                          <p className="mt-1 text-xs text-[#717182]">{rel.duration}</p>
                          <Link to={`/discover/services/${rel.id}`} className="mt-3 inline-block text-xs font-bold text-[#147c9e] hover:underline">
                            View Activity →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </main>

        {/* Right Sticky Sidebar */}
        <aside>
          <div className="sticky top-8 space-y-6">
            <div className="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style={{ borderRadius: '20px 20px 64px 20px' }}>
              <div className="border-b border-[#33c4f0]/15 pb-4">
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#33c4f0]">Your Subscription</p>
                <h3 className="mt-1 text-xl font-extrabold text-[#1a1a28]">{planName}</h3>
                <span className="mt-2 inline-block rounded-full bg-[#10b981]/15 px-3 py-1 text-xs font-extrabold text-[#087e58]">
                  Included in your plan
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-[#f8fdff] border border-[#33c4f0]/20 p-3.5">
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Service Brand</p>
                  <p className="mt-1 text-sm font-extrabold text-[#1a1a28]">✓ {vendor.name}</p>
                </div>

                <div className="rounded-xl bg-[#f8fdff] border border-[#33c4f0]/20 p-3.5">
                  <div className="flex items-center justify-between text-xs font-extrabold text-[#1a1a28]">
                    <span>Monthly Allowance:</span>
                    <span className="text-[#10b981]">{selectedActivities.length} / {maxActivities} used</span>
                  </div>
                </div>
              </div>

              {/* Primary Action Button Area */}
              <div className="mt-6 space-y-3">
                {selected ? (
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-[#10b981]/15 p-4 text-center border border-[#10b981]/30">
                      <p className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-[#087e58]">
                        <Check size={16} /> Activity Selected
                      </p>
                      <p className="mt-1 text-[11px] text-[#087e58]">
                        Included in your {planName} subscription.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate('/bookings')}
                      className="w-full rounded-full bg-[#1a1a28] py-3 text-center text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                    >
                      View My Activities
                    </button>
                    <button
                      type="button"
                      onClick={handleSelectToggle}
                      className="w-full rounded-full border border-gray-200 py-2.5 text-center text-xs font-bold text-[#717182] hover:bg-gray-50"
                    >
                      Unselect Activity
                    </button>
                  </div>
                ) : isLimitReached ? (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={openLimitModal}
                      className="w-full rounded-full bg-amber-500 py-3 text-center text-xs font-extrabold text-white transition hover:bg-amber-600"
                    >
                      Monthly Activity Limit Reached
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/bookings')}
                      className="w-full rounded-full border border-[#33c4f0]/30 py-2.5 text-center text-xs font-extrabold text-[#1a1a28] hover:bg-[#f8fdff]"
                    >
                      View My Activities
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSelectToggle}
                    className="w-full rounded-full bg-[#1a1a28] py-3 text-center text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                  >
                    Select Activity
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}