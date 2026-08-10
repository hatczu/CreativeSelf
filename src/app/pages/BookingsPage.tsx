import React, { useState } from "react";
import { Link } from "react-router";
import { useSubscription } from "../context/SubscriptionContext";
import { SubscriptionEntitlementHeader } from "../components/shared/SubscriptionEntitlementHeader";
import { RoleSwitcher } from "../components/layout/RoleSwitcher";
import { CalendarDays, Check, Clock3, Compass, LayoutDashboard, LogOut, MapPin, Search, Settings, Users, Sparkles, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logoIcon from "../../imports/Logo.png";

const defaultUpcoming = [
  { title: "Watercolour without perfection", provider: "Studio Lumen · Heart of Art", date: "Thursday, Aug 8", time: "3:00 PM · 90 min", place: "Lumen Studio, Shoreditch", color: "#EF4444", emoji: "🎨", guests: "Included in Basic Creative" },
];

const past = [
  { title: "The five-sense chocolate workshop", provider: "Cocoa Collective · Chowdown", date: "Tuesday, Jul 23", color: "#F59E0B", emoji: "🍫" },
  { title: "Bring the energy back: rhythm lab", provider: "The Rhythm Room · Moves & Grooves", date: "Friday, Jul 12", color: "#8B5CF6", emoji: "💃" },
];

export function BookingsPage() {
  const { selectedActivities, unselectActivity, planName } = useSubscription();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [confirmed, setConfirmed] = useState<string[]>([]);

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
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#33c4f0]/15 bg-white/90 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex">
        <Link to="/" title="CreativeSelf Home" aria-label="CreativeSelf Home" className="grid h-10 w-10 place-items-center transition-transform hover:scale-105">
          <ImageWithFallback src={logoIcon} alt="CreativeSelf Logo" className="h-full w-full object-contain" />
        </Link>
        <nav className="mt-10 flex flex-col gap-3" aria-label="Universal navigation">
          <Link to="/dashboard" title="Home" aria-label="Home" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]">
            <LayoutDashboard size={18} />
          </Link>
          <Link to="/discover/services" title="Discover" aria-label="Discover" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]">
            <Compass size={18} />
          </Link>
          <Link to="/bookings" title="Bookings" aria-label="Bookings" className="grid h-10 w-10 place-items-center rounded-full bg-[#33c4f0] text-[#1a1a28]">
            <CalendarDays size={18} />
          </Link>
          <Link to="/discover/providers" title="Providers" aria-label="Providers" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]">
            <Users size={18} />
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

      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_minmax(0,1fr)_250px] lg:px-8 lg:py-12 lg:pl-[76px]">
        <aside className="hidden lg:block">
          <div className="sticky top-8 bg-[#1a1a28] p-5 text-white" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <p className="text-lg font-extrabold">
              <span className="text-[#33c4f0]">creative</span>self
            </p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-white/45">Your calendar</p>
            <div className="mt-3 space-y-1">
              <button
                type="button"
                onClick={() => setTab("upcoming")}
                className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm font-bold ${
                  tab === "upcoming" ? "bg-[#33c4f0] text-[#1a1a28]" : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <CalendarDays size={17} /> Upcoming
              </button>
              <button
                type="button"
                onClick={() => setTab("past")}
                className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm font-bold ${
                  tab === "past" ? "bg-[#33c4f0] text-[#1a1a28]" : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Check size={17} /> Past sessions
              </button>
            </div>
            <Link
              to="/discover/services"
              className="mt-8 block rounded-full bg-white px-4 py-3 text-center text-xs font-extrabold text-[#1a1a28] no-underline"
            >
              Find something new
            </Link>
          </div>
        </aside>

        <main>
          <SubscriptionEntitlementHeader />

          <header className="mt-6 overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
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
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-[#717182]">
                        <span className="flex items-center gap-1.5">
                          <Clock3 size={14} /> {session.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {session.place}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
                      {session.isDynamic && (
                        <button
                          type="button"
                          onClick={() => unselectActivity(session.id)}
                          className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-extrabold text-red-600 hover:bg-red-100"
                        >
                          Remove
                        </button>
                      )}
                      <Link
                        to={session.id ? `/discover/services/${session.id}` : "/discover/services"}
                        className="rounded-full border border-[#33c4f0]/20 px-4 py-2 text-center text-xs font-extrabold text-[#1a1a28] no-underline hover:bg-[#e8f9ff]"
                      >
                        Details
                      </Link>
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
