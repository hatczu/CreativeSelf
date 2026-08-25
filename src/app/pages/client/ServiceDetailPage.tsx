import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { useSubscription, ActivityItem } from '../context/SubscriptionContext';
import { mockActivities, mockVendors } from '../data/subscriptionData';
import { SubscriptionEntitlementHeader } from '../components/shared/SubscriptionEntitlementHeader';
import { ActivityLimitModal } from '../components/shared/ActivityLimitModal';
import { EmployeeSlotManagerModal } from '../components/corporate/EmployeeSlotManagerModal';
import { UniversalSidebar } from '../components/layout/UniversalSidebar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  CalendarBlank as CalendarDays,
  Check,
  CaretLeft as ChevronLeft,
  Clock,
  Compass,
  Heart,
  Info,
  SquaresFour as LayoutDashboard,
  SignOut as LogOut,
  MapPin,
  ChatTeardropText as MessageSquare,
  MagnifyingGlass as Search,
  Gear as Settings,
  ShareNetwork as Share2,
  Sparkle as Sparkles,
  Star,
  Users,
  ShieldCheck,
  CalendarBlank as Calendar,
  WarningCircle as AlertCircle,
} from '@phosphor-icons/react';

export function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const {
    planName,
    planType,
    maxBrands,
    maxActivities,
    employeeSlotsPerActivity,
    getInvitesForActivity,
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
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);

  const assignedInvites = getInvitesForActivity(activity.id);

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
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}>
      <ActivityLimitModal />
      <EmployeeSlotManagerModal
        isOpen={isSlotModalOpen}
        onClose={() => setIsSlotModalOpen(false)}
        activityId={activity.id}
        activityName={activity.name}
      />

      <UniversalSidebar />

      {/* Main Grid Layout */}
      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[850px_320px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]">
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

                {/* Corporate Slot Management Banner if Corporate */}
                {planType === 'corporate' && (
                  <div className="mt-5 rounded-2xl bg-gradient-to-r from-purple-50 via-cyan-50 to-blue-50 border border-purple-200 p-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-purple-700">Corporate Subscription Entitlement</span>
                      <h4 className="text-base font-extrabold text-gray-900 mt-0.5">
                        {employeeSlotsPerActivity} Employee Slots Available
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Currently {assignedInvites.length} of {employeeSlotsPerActivity} employee slots allocated with invite codes.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSlotModalOpen(true)}
                      className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                    >
                      <Users size={15} />
                      Manage Employee Slots & Invites
                    </button>
                  </div>
                )}

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

              {/* Schedule & Availability */}
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
            </div>
          </div>
        </main>

        {/* Right Sticky Sidebar */}
        <aside>
          <div className="sticky top-8 space-y-6">
            <div className="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style={{ borderRadius: '20px 20px 64px 20px' }}>
              <div className="border-b border-[#33c4f0]/15 pb-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#33c4f0]">Your Subscription</p>
                  <span className="text-[10px] font-black uppercase bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">{planType}</span>
                </div>
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

                {planType === 'corporate' && (
                  <div className="rounded-xl bg-purple-50 border border-purple-200 p-3.5 text-xs">
                    <p className="font-extrabold text-purple-900">Employee Slots per Activity</p>
                    <p className="text-purple-700 mt-0.5 font-bold">{employeeSlotsPerActivity} slots</p>
                    <button
                      onClick={() => setIsSlotModalOpen(true)}
                      className="mt-2.5 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Users size={13} />
                      Manage Employee Invites
                    </button>
                  </div>
                )}
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