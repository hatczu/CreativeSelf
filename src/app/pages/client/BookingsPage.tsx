import React, { useState } from "react";
import { Link } from "react-router";
import { useSubscription } from "../context/SubscriptionContext";
import { SubscriptionEntitlementHeader } from "../components/shared/SubscriptionEntitlementHeader";
import { UniversalSidebar } from "../components/layout/UniversalSidebar";
import { RoleSwitcher } from "../components/layout/RoleSwitcher";
import { EmployeeSlotManagerModal } from "../components/corporate/EmployeeSlotManagerModal";
import { CalendarBlank as CalendarDays, Check, Clock as Clock3, Compass, SquaresFour as LayoutDashboard, SignOut as LogOut, MapPin, MagnifyingGlass as Search, Gear as Settings, Users, Sparkle as Sparkles, X, Ticket, Plus, Lock, Clock } from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logoIcon from "@/imports/Logo.png";

const defaultUpcoming = [
  { id: "watercolour-without-perfection", title: "Watercolour without perfection", provider: "Studio Lumen · Heart of Art", date: "Thursday, Aug 8", time: "3:00 PM · 90 min", place: "Lumen Studio, Shoreditch", color: "#EF4444", emoji: "🎨", guests: "Included in Basic Creative" },
];

const past = [
  { title: "The five-sense chocolate workshop", provider: "Cocoa Collective · Chowdown", date: "Tuesday, Jul 23", color: "#F59E0B", emoji: "🍫" },
  { title: "Bring the energy back: rhythm lab", provider: "The Rhythm Room · Moves & Grooves", date: "Friday, Jul 12", color: "#8B5CF6", emoji: "💃" },
];

export function BookingsPage() {
  const { selectedActivities, unselectActivity, planName, planType, employeeInvites, employeeSlotsPerActivity, isVendorConfirmed } = useSubscription();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [confirmed, setConfirmed] = useState<string[]>([]);

  // Modal State for Employee Invites / Slot Manager
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<{ id: string; name: string }>({
    id: selectedActivities[0]?.id || 'ceramic-pottery-workshop',
    name: selectedActivities[0]?.name || 'Ceramic Pottery Workshop',
  });

  const handleOpenInviteModal = (actId: string, actName: string) => {
    if (!isVendorConfirmed(actId)) return;
    setSelectedActivityForModal({ id: actId, name: actName });
    setIsSlotModalOpen(true);
  };

  // Format selected activities from subscription context into upcoming sessions
  const dynamicUpcoming = selectedActivities.map((act) => ({
    id: act.id,
    title: act.name,
    provider: `${act.vendorName} · ${act.category}`,
    date: "Confirmed for this month",
    time: act.duration,
    place: act.location,
    color: act.color || "#33C4F0",
    emoji: act.symbol || "🎨",
    guests: `Included in ${planName}`,
    isDynamic: true,
  }));

  const mergedUpcoming = [
    ...dynamicUpcoming,
    ...defaultUpcoming.filter((d) => !dynamicUpcoming.some((dyn) => dyn.id === d.id)),
  ];

  const allUpcoming = mergedUpcoming;
  const sessions = tab === "upcoming" ? allUpcoming : past;
  const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}>
      <UniversalSidebar />

      <EmployeeSlotManagerModal
        isOpen={isSlotModalOpen}
        onClose={() => setIsSlotModalOpen(false)}
        activityId={selectedActivityForModal.id}
        activityName={selectedActivityForModal.name}
      />

      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]">
        <aside className="hidden lg:block">
          <SubscriptionEntitlementHeader
            variant="sidebar"
            showLogo={true}
            hideCounters={true}
            topChildren={
              <div className="mt-3.5 space-y-1.5 border-t border-white/10 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/45 mb-1.5">Your Calendar View</p>
                <button
                  type="button"
                  onClick={() => setTab("upcoming")}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                    tab === "upcoming" ? "bg-[#33c4f0] text-[#15343d] shadow-sm" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays size={14} /> Upcoming
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black">
                    {allUpcoming.length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setTab("past")}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                    tab === "past" ? "bg-[#33c4f0] text-[#15343d] shadow-sm" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Check size={14} /> Past sessions
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black">
                    {past.length}
                  </span>
                </button>
              </div>
            }
          />
        </aside>

        <main>
          {/* Mobile view subscription entitlement header */}
          <div className="lg:hidden mb-6">
            <SubscriptionEntitlementHeader variant="horizontal" />
          </div>

          <header className="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">Your creative calendar</p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold leading-tight">
                  {tab === "upcoming" ? "Your Subscription Activities" : "The moments you made time for"}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#717182]">
                  {tab === "upcoming"
                    ? "Activities selected as part of your Basic Creative monthly allowance."
                    : "A small record of creative time well spent."}
                </p>
              </div>
              <div className="rounded-full bg-[#e8f9ff] px-4 py-2 text-xs font-bold text-[#147c9e]">
                {allUpcoming.length} sessions selected
              </div>
            </div>
          </header>

          {/* Subscription Sessions List (Unified, De-cluttered & Identical to Vendor List) */}
          <div className="mt-6 space-y-4">
            {sessions.map((session: any) => {
              if (!("time" in session)) {
                return (
                  <article
                    key={session.title}
                    className="flex items-center gap-4 bg-white p-5 rounded-3xl border border-gray-100/80 shadow-sm"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl text-xl shadow-sm border border-gray-100" style={{ background: `${session.color}15` }}>
                      {session.emoji}
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[.14em]" style={{ color: session.color }}>
                        {session.date}
                      </p>
                      <h2 className="mt-0.5 text-base font-extrabold text-gray-900">{session.title}</h2>
                      <p className="text-xs text-gray-500 font-medium">{session.provider}</p>
                    </div>
                  </article>
                );
              }

              const actId = session.id || 'ceramic-pottery-workshop';
              const isConfirmed = isVendorConfirmed(actId);
              const activityInvites = employeeInvites.filter(
                (i) => i.activityId === actId && i.status !== 'Cancelled'
              );
              const used = activityInvites.length;
              const capacity = employeeSlotsPerActivity || 8;
              const percent = Math.min(100, Math.round((used / capacity) * 100));

              return (
                <article
                  key={session.title}
                  className="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl shadow-sm border border-gray-100"
                        style={{ background: `${session.color}15` }}
                      >
                        {session.emoji}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-[#1a1a28] text-lg leading-snug">{session.title}</h3>
                          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-extrabold text-gray-700">
                            {session.provider}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mt-1 flex-wrap">
                          <span className="flex items-center gap-1 font-semibold text-gray-700">
                            <Clock3 size={13} className="text-[#33c4f0]" /> {session.time}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-[#33c4f0]" /> {session.place}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & View Details */}
                    <div className="flex items-center gap-3 shrink-0 sm:self-center">
                      {tab === "upcoming" && (
                        isConfirmed ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-extrabold text-emerald-700">
                            <Check size={12} /> Confirmed by Vendor
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-extrabold text-amber-800">
                            <Clock size={12} /> Awaiting Confirmation
                          </span>
                        )
                      )}

                      <Link
                        to={session.id ? `/bookings/${session.id}` : "/bookings"}
                        className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-center text-xs font-extrabold text-[#1a1a28] no-underline hover:bg-gray-50 transition"
                      >
                        View Details
                      </Link>

                      {session.isDynamic && (
                        <button
                          type="button"
                          onClick={() => unselectActivity(session.id)}
                          className="text-[10px] font-bold text-rose-500 hover:underline px-1"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Single-Row Capacity & Manage Invites Bar (Identical to Vendor Roster Bar) */}
                  {tab === 'upcoming' && planType === 'corporate' && (
                    <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                        <div className="flex items-center gap-1.5 font-bold text-gray-800 shrink-0">
                          <Users size={14} className="text-[#147c9e]" />
                          <span>{used}/{capacity} Corporate Slots</span>
                          <span className="text-emerald-600 font-extrabold">({activityInvites.filter(i => i.status === 'Going').length} Going)</span>
                        </div>

                        <div className="w-32 sm:w-48 h-2 bg-gray-100 rounded-full overflow-hidden shrink-0">
                          <div
                            className={`h-full rounded-full transition-all ${
                              !isConfirmed
                                ? 'bg-gray-300'
                                : percent >= 100
                                ? 'bg-amber-500'
                                : 'bg-gradient-to-r from-[#33c4f0] to-[#10b981]'
                            }`}
                            style={{ width: isConfirmed ? `${percent}%` : '0%' }}
                          />
                        </div>
                      </div>

                      {isConfirmed ? (
                        <button
                          type="button"
                          onClick={() => handleOpenInviteModal(actId, session.title)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50/80 hover:bg-cyan-100/80 px-3.5 py-1.5 text-xs font-extrabold text-[#147c9e] border border-cyan-200/60 transition shadow-sm shrink-0"
                        >
                          <Plus size={13} />
                          Manage Invites ({used}/{capacity})
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          title="Vendor confirmation pending."
                          className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-extrabold text-gray-400 border border-gray-200 shrink-0 cursor-not-allowed"
                        >
                          <Lock size={13} />
                          Invites Locked
                        </button>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <Link
            to="/discover/services"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white no-underline transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
          >
            <Search size={16} /> Discover another experience
          </Link>
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-8 bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-extrabold">August 2024</p>
                <p className="mt-1 text-xs text-[#717182]">Your booked moments</p>
              </div>
              <CalendarDays size={18} className="text-[#33c4f0]" />
            </div>
            <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#9aa1ae]">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {calendarDays.map((day) => {
                const hasBooking = day === 8 || day === 14;
                return (
                  <div
                    key={day}
                    className={`grid h-7 place-items-center rounded-full text-xs font-bold ${
                      hasBooking ? "bg-[#33c4f0] text-[#1a1a28]" : "text-[#414153]"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
