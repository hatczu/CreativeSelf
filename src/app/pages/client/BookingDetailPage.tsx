import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { useSubscription, ActivityItem } from '../context/SubscriptionContext';
import { mockActivities, mockVendors } from '../data/subscriptionData';
import { SubscriptionEntitlementHeader } from '../components/shared/SubscriptionEntitlementHeader';
import { EmployeeSlotManagerModal } from '../components/corporate/EmployeeSlotManagerModal';
import { UniversalSidebar } from '../components/layout/UniversalSidebar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  CaretLeft as ChevronLeft,
  CalendarBlank as CalendarDays,
  Clock,
  MapPin,
  Users,
  Check,
  CheckCircle,
  XCircle,
  Plus,
  Lock,
  Sparkle as Sparkles,
  Ticket,
  Info,
  Compass,
  Buildings as Building2,
  Envelope as Mail,
  User,
} from '@phosphor-icons/react';

export function BookingDetailPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const {
    planName,
    planType,
    employeeSlotsPerActivity,
    selectedActivities,
    employeeInvites,
    getInvitesForActivity,
    isVendorConfirmed,
  } = useSubscription();

  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);

  // 1. Try finding in user's selected activities
  const selectedMatch = selectedActivities.find((a) => a.id === bookingId);

  // 2. Try finding in global mock activities
  const mockMatch = mockActivities.find((a) => a.id === bookingId);

  // 3. Fallback default booking details
  const fallbackActivity: ActivityItem & { highlights?: string[]; whatToExpect?: { time: string; title: string; detail: string }[]; requirements?: string[]; whatToBring?: string[] } = {
    id: bookingId || 'ceramic-pottery-workshop',
    name: 'Watercolour without perfection',
    vendorId: 'studio-lumen',
    vendorName: 'Studio Lumen',
    category: 'Heart of Art',
    duration: '90 min',
    location: 'Lumen Studio, Shoreditch',
    description: 'Designed to help individuals re-engage their creative intuition without the pressure of perfection. Explore color flows and wet-on-wet brush techniques.',
    color: '#EF4444',
    symbol: '🎨',
    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Guided watercolor blending techniques',
      'High quality cold-press paper & paints included',
      'Calming studio ambiance with herbal teas',
      'Take home your finished mounted artwork',
    ],
    whatToExpect: [
      { time: '00:00 - 00:15', title: 'Color Theory & Brush Warmup', detail: 'Exploring wet-on-wet wash and paint ratios.' },
      { time: '00:15 - 01:15', title: 'Guided Painting Session', detail: 'Creating your intuitive watercolor piece.' },
      { time: '01:15 - 01:30', title: 'Matting & Studio Showcase', detail: 'Frame mounting and drying time.' },
    ],
    requirements: ['No prior painting experience required.'],
    whatToBring: ['All materials are provided by the studio.'],
  };

  const activity = selectedMatch || mockMatch || fallbackActivity;
  const vendor = mockVendors.find((v) => v.id === activity.vendorId);

  const actId = activity.id;
  const isConfirmed = isVendorConfirmed(actId);
  const invites = getInvitesForActivity(actId);
  const capacity = employeeSlotsPerActivity || 8;
  const usedCount = invites.length;
  const percent = Math.min(100, Math.round((usedCount / capacity) * 100));

  const goingCount = invites.filter((i) => i.status === 'Going').length;
  const pendingCount = invites.filter((i) => i.status === 'Pending').length;

  return (
    <div
      className="min-h-screen bg-[#f7fcff] text-[#1a1a28]"
      style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}
    >
      <UniversalSidebar />

      <EmployeeSlotManagerModal
        isOpen={isSlotModalOpen}
        onClose={() => setIsSlotModalOpen(false)}
        activityId={actId}
        activityName={activity.name}
      />

      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_1fr_340px] lg:px-8 lg:py-12 lg:pl-[76px]">
        {/* Left Sidebar Navigation */}
        <aside className="hidden lg:block">
          <SubscriptionEntitlementHeader
            variant="sidebar"
            showLogo={true}
            hideCounters={true}
            topChildren={
              <div className="mt-3.5 space-y-1.5 border-t border-white/10 pt-3">
                <Link
                  to="/bookings"
                  className="flex w-full items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
                >
                  <ChevronLeft size={16} /> Back to Bookings
                </Link>
              </div>
            }
          />
        </aside>

        {/* Main Content Area */}
        <main className="space-y-6">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <Link to="/bookings" className="hover:text-cyan-600 transition flex items-center gap-1">
                <ChevronLeft size={14} /> Bookings
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-extrabold truncate max-w-[280px] sm:max-w-md">
                {activity.name}
              </span>
            </div>

            {/* Vendor Status Badge */}
            {isConfirmed ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-extrabold text-emerald-700 shadow-sm">
                <Check size={14} /> Confirmed by Vendor
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-extrabold text-amber-800 shadow-sm">
                <Clock size={14} /> Awaiting Vendor Confirmation
              </span>
            )}
          </div>

          {/* Hero Banner Card */}
          <div
            className="overflow-hidden bg-white shadow-[0_16px_42px_rgba(28,118,155,.08)] border border-gray-100/80"
            style={{ borderRadius: '24px 24px 64px 24px' }}
          >
            {activity.image && (
              <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-gray-900">
                <ImageWithFallback
                  src={activity.image}
                  alt={activity.name}
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-md backdrop-blur-md"
                    style={{ backgroundColor: `${activity.color || '#33c4f0'}` }}
                  >
                    <span>{activity.symbol || '🎨'}</span> {activity.category}
                  </span>
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-extrabold text-gray-900 shadow-md">
                    Included in {planName}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">
                {activity.vendorName}
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1a1a28] leading-tight">
                {activity.name}
              </h1>

              {/* Quick Info Grid */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-gray-100 py-4 text-xs font-medium text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-50 text-[#33c4f0]">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase text-gray-400">Duration</span>
                    <span className="font-extrabold text-gray-800">{activity.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-50 text-[#33c4f0]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase text-gray-400">Location</span>
                    <span className="font-extrabold text-gray-800">{activity.location}</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-50 text-[#33c4f0]">
                    <Users size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase text-gray-400">Capacity</span>
                    <span className="font-extrabold text-gray-800">
                      {usedCount}/{capacity} Corporate Slots
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-900">
                  About This Experience
                </h3>
                <p className="text-sm leading-relaxed text-[#717182]">
                  {activity.description}
                </p>
              </div>

              {/* Highlights */}
              {activity.highlights && activity.highlights.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-900">
                    Session Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activity.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-gray-700 bg-cyan-50/50 p-2.5 rounded-xl border border-cyan-100/60">
                        <Check size={14} className="text-cyan-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline / What to Expect */}
          {activity.whatToExpect && activity.whatToExpect.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100/80 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-[#1a1a28] flex items-center gap-2">
                <Clock size={18} className="text-[#33c4f0]" />
                What to Expect During the Session
              </h3>
              <div className="space-y-3 pt-2">
                {activity.whatToExpect.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
                    <span className="shrink-0 rounded-lg bg-cyan-100 px-2.5 py-1 font-mono text-xs font-bold text-cyan-800">
                      {step.time}
                    </span>
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900">{step.title}</h4>
                      <p className="text-xs text-gray-600 mt-0.5">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements & Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#ffffff] p-6 rounded-3xl border border-gray-100/80 shadow-sm space-y-3">
              <h3 className="text-sm font-extrabold text-[#1a1a28] flex items-center gap-2">
                <Info size={16} className="text-[#33c4f0]" />
                What to Bring
              </h3>
              <ul className="text-xs text-gray-600 space-y-2 list-disc pl-4">
                {activity.whatToBring && activity.whatToBring.length > 0 ? (
                  activity.whatToBring.map((item, idx) => <li key={idx}>{item}</li>)
                ) : (
                  <li>All materials and gear are fully supplied by the host studio.</li>
                )}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm space-y-3">
              <h3 className="text-sm font-extrabold text-[#1a1a28] flex items-center gap-2">
                <MapPin size={16} className="text-[#33c4f0]" />
                Venue & Location
              </h3>
              <p className="text-xs font-bold text-gray-900">{activity.location}</p>
              <p className="text-xs text-gray-500">
                Please arrive 10 minutes prior to session start time. Present your booking confirmation or invite code upon check-in.
              </p>
            </div>
          </div>
        </main>

        {/* Right Card: Members & Invites Status */}
        <aside className="space-y-6">
          <div
            className="bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)] border border-gray-100/80 space-y-5 sticky top-8"
            style={{ borderRadius: '24px 24px 64px 24px' }}
          >
            {/* Right Card Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#33c4f0]">
                  Team Invites Roster
                </span>
                <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-[10px] font-black text-[#147c9e]">
                  {planType === 'corporate' ? 'Corporate Slots' : 'Personal Slot'}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#1a1a28] mt-1">
                Invited Members & Status
              </h3>
            </div>

            {/* Corporate Slot Capacity Progress Bar */}
            {planType === 'corporate' && (
              <div className="p-4 rounded-2xl bg-[#f4fbfe] border border-cyan-100/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold">
                  <span className="text-gray-800 flex items-center gap-1.5">
                    <Users size={15} className="text-[#147c9e]" />
                    Slots Allocated
                  </span>
                  <span className="text-[#147c9e]">
                    {usedCount} / {capacity}
                  </span>
                </div>

                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      !isConfirmed
                        ? 'bg-gray-300'
                        : percent >= 100
                        ? 'bg-amber-500'
                        : 'bg-gradient-to-r from-[#33c4f0] to-[#10b981]'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 pt-0.5">
                  <span className="text-emerald-700 font-extrabold">✓ {goingCount} Confirmed</span>
                  <span className="text-amber-700 font-extrabold">⌛ {pendingCount} Pending</span>
                </div>
              </div>
            )}

            {/* Member List with Confirmation Status */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
                  Assigned Team ({invites.length})
                </h4>
              </div>

              {invites.length === 0 ? (
                <div className="p-5 text-center bg-gray-50/80 border border-dashed border-gray-200 rounded-2xl space-y-2">
                  <Users size={24} className="mx-auto text-gray-400" />
                  <p className="text-xs font-bold text-gray-700">No members invited yet</p>
                  <p className="text-[11px] text-gray-500">
                    Invite colleagues from your corporate account to fill your allocated slots for this activity.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {invites.map((inv) => {
                    const isGoing = inv.status === 'Going';
                    const isPending = inv.status === 'Pending';
                    const isDeclined = inv.status === 'Not Going' || inv.status === 'Cancelled';

                    return (
                      <div
                        key={inv.id}
                        className="p-3.5 rounded-2xl border border-gray-100 bg-white hover:border-cyan-200/80 hover:shadow-sm transition-all space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-100 to-blue-200 text-[#147c9e] font-extrabold text-xs flex items-center justify-center shrink-0 border border-cyan-200/50">
                              {inv.employeeName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-extrabold text-gray-900 leading-tight">
                                {inv.employeeName}
                              </p>
                              <p className="text-[10px] text-gray-500 truncate max-w-[140px]">
                                {inv.employeeEmail}
                              </p>
                            </div>
                          </div>

                          {/* Explicit Confirmation Status Badge */}
                          {isGoing && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                              <Check size={11} /> Confirmed
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                              <Clock size={11} /> Pending
                            </span>
                          )}
                          {isDeclined && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                              <XCircle size={11} /> Declined
                            </span>
                          )}
                        </div>

                        {/* Additional Info Row */}
                        <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-gray-100">
                          <span className="font-medium">{inv.department || 'Corporate Member'}</span>
                          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-gray-700">
                            {inv.inviteCode}
                          </code>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Manage Invites Button */}
            <div className="pt-2 border-t border-gray-100">
              {isConfirmed ? (
                <button
                  type="button"
                  onClick={() => setIsSlotModalOpen(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#33c4f0] to-[#147c9e] hover:from-[#2ab2dc] hover:to-[#0f6885] text-white font-extrabold text-xs shadow-md shadow-cyan-300/30 transition flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Manage Invites ({usedCount}/{capacity})
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSlotModalOpen(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs border border-gray-200 transition flex items-center justify-center gap-2"
                >
                  <Lock size={15} className="text-amber-600" />
                  Manage Invites (Pending Vendor)
                </button>
              )}
              <p className="text-[10px] text-center text-gray-400 mt-2 font-medium">
                {isConfirmed
                  ? 'Send email invitations or re-assign available corporate slots.'
                  : 'Invites are locked until the vendor confirms session availability.'}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
