import React, { useState } from "react";
import { Link } from "react-router";
import { useSubscription } from "../context/SubscriptionContext";
import { SubscriptionEntitlementHeader } from "../components/shared/SubscriptionEntitlementHeader";
import { UniversalSidebar } from "../components/layout/UniversalSidebar";
import { RoleSwitcher } from "../components/layout/RoleSwitcher";
import { EmployeeSlotManagerModal } from "../components/corporate/EmployeeSlotManagerModal";
import { CalendarDays, Check, Clock3, Compass, LayoutDashboard, LogOut, MapPin, Search, Settings, Users, Sparkles, X, Ticket, Plus } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logoIcon from "@/imports/Logo.png";

const defaultUpcoming = [
  { title: "Watercolour without perfection", provider: "Studio Lumen · Heart of Art", date: "Thursday, Aug 8", time: "3:00 PM · 90 min", place: "Lumen Studio, Shoreditch", color: "#EF4444", emoji: "🎨", guests: "Included in Basic Creative" },
];

const past = [
  { title: "The five-sense chocolate workshop", provider: "Cocoa Collective · Chowdown", date: "Tuesday, Jul 23", color: "#F59E0B", emoji: "🍫" },
  { title: "Bring the energy back: rhythm lab", provider: "The Rhythm Room · Moves & Grooves", date: "Friday, Jul 12", color: "#8B5CF6", emoji: "💃" },
];

export function BookingsPage() {
  const { selectedActivities, unselectActivity, planName, planType, employeeInvites, employeeSlotsPerActivity } = useSubscription();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [confirmed, setConfirmed] = useState<string[]>([]);

  // Modal State for Employee Invites / Slot Manager
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<{ id: string; name: string }>({
    id: selectedActivities[0]?.id || 'ceramic-pottery-workshop',
    name: selectedActivities[0]?.name || 'Ceramic Pottery Workshop',
  });

  const handleOpenInviteModal = (actId: string, actName: string) => {
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

  const allUpcoming = dynamicUpcoming.length > 0 ? dynamicUpcoming : defaultUpcoming;
  const sessions = tab === "upcoming" ? allUpcoming : past;
  const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
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

          {/* Active Activity Employee Slot Allocations Card Section */}
          {tab === 'upcoming' && planType === 'corporate' && (
            <div
              className="mt-6 bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]"
              style={{ borderRadius: '20px 20px 64px 20px' }}
            >
              <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <Ticket className="text-[#33c4f0]" size={20} />
                Active Activity Employee Slot Allocations
              </h3>

              {selectedActivities.length === 0 ? (
                <p className="text-xs text-gray-500 italic p-4 text-center border border-dashed rounded-2xl">
                  No activities selected yet in your subscription. Visit Discover Services to select your activities first!
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedActivities.map((act) => {
                    const activityInvites = employeeInvites.filter(
                      (i) => i.activityId === act.id && i.status !== 'Cancelled'
                    );
                    const used = activityInvites.length;
                    const capacity = employeeSlotsPerActivity || 8;
                    const percent = Math.min(100, Math.round((used / capacity) * 100));

                    return (
                      <div
                        key={act.id}
                        className="p-5 border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 transition-all shadow-sm"
                        style={{ borderRadius: '20px 20px 40px 20px' }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-2 rounded-xl bg-white shadow-sm border border-gray-100">{act.symbol || '🎨'}</span>
                            <div>
                              <h4 className="font-extrabold text-gray-900 text-sm leading-tight">{act.name}</h4>
                              <p className="text-xs text-gray-500 mt-0.5">{act.vendorName} • {act.duration}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleOpenInviteModal(act.id, act.name)}
                            className="px-3 py-1.5 bg-[#33c4f0] hover:bg-[#28b3de] text-[#1a1a28] font-extrabold rounded-xl text-xs flex items-center gap-1 shadow-sm shrink-0"
                          >
                            <Plus size={13} />
                            Slots ({used}/{capacity})
                          </button>
                        </div>

                        {/* Capacity Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-gray-700">
                            <span>Employee Slots Used</span>
                            <span className="text-[#147c9e]">{used} / {capacity} Slots</span>
                          </div>
                          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all rounded-full ${
                                percent >= 100 ? 'bg-amber-500' : 'bg-gradient-to-r from-[#33c4f0] to-[#10b981]'
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="mt-7 space-y-5">
            {sessions.map((session: any) =>
              "time" in session ? (
                <article
                  key={session.title}
                  className="overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)]"
                  style={{ borderRadius: "20px 20px 64px 20px" }}
                >
                  <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full text-3xl" style={{ background: `${session.color}18` }}>
                      {session.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#10b981]/15 px-3 py-1 text-[11px] font-extrabold text-[#087e58]">
                          Included in {planName}
                        </span>
                        <span className="text-xs font-extrabold uppercase tracking-[.14em]" style={{ color: session.color }}>
                          {session.date}
                        </span>
                      </div>
                      <h2 className="mt-2 text-xl font-extrabold">{session.title}</h2>
                      <p className="mt-1 text-sm text-[#717182]">{session.provider}</p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-[#717182]">
                        <span className="flex items-center gap-1.5">
                          <Clock3 size={14} /> {session.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {session.place}
                        </span>
                      </div>

                      {/* Employee Slots Progress Bar */}
                      {planType === 'corporate' && (
                        <div className="mt-4 rounded-2xl bg-[#e8f9ff]/80 border border-[#33c4f0]/20 p-3">
                          <div className="flex items-center justify-between text-xs font-bold text-[#1a1a28]">
                            <span className="flex items-center gap-1.5 text-[#147c9e]">
                              <Users size={14} className="text-[#33c4f0]" /> Employee Slots Allocation
                            </span>
                            <span className="text-[#147c9e]">
                              {employeeInvites.filter((i) => i.activityId === (session.id || 'act-1') && i.status === 'Going').length} / {employeeSlotsPerActivity} Accepted
                            </span>
                          </div>
                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#33c4f0]/20">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#33c4f0] to-[#10b981] transition-all"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round(
                                    (employeeInvites.filter((i) => i.activityId === (session.id || 'act-1') && i.status === 'Going').length /
                                      (employeeSlotsPerActivity || 8)) *
                                      100
                                  )
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col gap-2.5 sm:w-40">
                      <Link
                        to={session.id ? `/discover/services/${session.id}` : "/discover/services"}
                        className="rounded-full border border-[#33c4f0]/30 bg-white px-4 py-2.5 text-center text-xs font-extrabold text-[#1a1a28] no-underline hover:bg-[#e8f9ff] transition"
                      >
                        View Details
                      </Link>
                      <Link
                        to={session.id ? `/invites?activityId=${session.id}` : "/invites"}
                        className="rounded-full bg-[#1a1a28] px-4 py-2.5 text-center text-xs font-extrabold text-white no-underline hover:bg-[#33c4f0] hover:text-[#1a1a28] transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Users size={14} />
                        Manage Invites
                      </Link>
                      {session.isDynamic && (
                        <button
                          type="button"
                          onClick={() => unselectActivity(session.id)}
                          className="mt-0.5 text-center text-[10px] font-bold text-rose-500 hover:underline"
                        >
                          Unassign Activity
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ) : (
                <article
                  key={session.title}
                  className="flex items-center gap-5 bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
                  style={{ borderRadius: "20px 20px 64px 20px" }}
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full text-2xl" style={{ background: `${session.color}18` }}>
                    {session.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[.14em]" style={{ color: session.color }}>
                      {session.date}
                    </p>
                    <h2 className="mt-1 text-lg font-extrabold">{session.title}</h2>
                    <p className="mt-1 text-sm text-[#717182]">{session.provider}</p>
                  </div>
                </article>
              )
            )}
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
