import { useState } from "react";
import { Link, useLocation } from "react-router";
import { RoleSwitcher } from "../components/layout/RoleSwitcher";
import { useSubscription } from "../context/SubscriptionContext";
import {
  ChartBar as BarChart3,
  CalendarBlank as CalendarDays,
  Check,
  CaretRight as ChevronRight,
  Clock as Clock3,
  SquaresFour as LayoutDashboard,
  SignOut as LogOut,
  Package as PackageOpen,
  Image as ImageIcon,
  Plus,
  Gear as Settings,
  Sparkle as Sparkles,
  Users,
  X,
  Ticket,
  DownloadSimple as Download,
  MapPin,
  Eye,
  CheckCircle as CheckCircle2,
  Clock,
  UserMinus as UserX,
  MagnifyingGlass as Search,
  EnvelopeSimple as MailCheck,
  Copy,
  Lock,
  Columns,
  Funnel as ListFilter,
  ArrowRight,
} from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logoIcon from "@/imports/Logo.png";

const services = [
  { name: "Watercolour without perfection", format: "90 min · Team workshop", price: "From £420", views: 264, bookings: 8, color: "#EF4444", emoji: "🎨", live: true, image: "https://images.unsplash.com/photo-1510832842230-87253f48d74f?auto=format&fit=crop&w=800&q=80" },
  { name: "Colour as a way to reset", format: "60 min · Pop-up session", price: "From £310", views: 187, bookings: 5, color: "#F59E0B", emoji: "🖌️", live: true, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" },
  { name: "Playful portrait workshop", format: "75 min · Team workshop", price: "From £380", views: 0, bookings: 0, color: "#8B5CF6", emoji: "✨", live: false, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80" },
];

const vendorCorporateBookings = [
  {
    id: "vbook-1",
    client: "Northstar Studio",
    planName: "Basic Creative Corporate Plan",
    service: "Watercolour without perfection",
    time: "Thu, Aug 8 · 3:00 PM · 90 min",
    location: "Lumen Studio, Shoreditch",
    status: "Confirmed",
    color: "#EF4444",
    emoji: "🎨",
    slotsAllocated: 15,
    slotsClaimed: 12,
    invites: [
      { id: "e1", name: "Sarah Smith", email: "sarah.smith@northstar.com", department: "Design", code: "NS-ART-881", status: "Going" },
      { id: "e2", name: "Alex Rivera", email: "alex.r@northstar.com", department: "Product", code: "NS-ART-882", status: "Going" },
      { id: "e3", name: "Elena Rostova", email: "elena.r@northstar.com", department: "Engineering", code: "NS-ART-883", status: "Going" },
      { id: "e4", name: "Marcus Chen", email: "marcus.c@northstar.com", department: "Marketing", code: "NS-ART-884", status: "Pending" },
      { id: "e5", name: "Chloe Bennett", email: "chloe.b@northstar.com", department: "People Ops", code: "NS-ART-885", status: "Going" },
      { id: "e6", name: "Daniel Kim", email: "daniel.k@northstar.com", department: "Design", code: "NS-ART-886", status: "Going" },
    ]
  },
  {
    id: "vbook-2",
    client: "HiNote Consulting",
    planName: "Team Wellbeing Corporate Plan",
    service: "Colour as a way to reset",
    time: "Tue, Aug 13 · 10:30 AM · 60 min",
    location: "Online / Virtual Studio",
    status: "Needs response",
    color: "#F59E0B",
    emoji: "🖌️",
    slotsAllocated: 20,
    slotsClaimed: 16,
    invites: [
      { id: "e10", name: "David Vance", email: "d.vance@hinote.com", department: "Consulting", code: "HN-CLR-101", status: "Going" },
      { id: "e11", name: "Jessica Taylor", email: "j.taylor@hinote.com", department: "HR", code: "HN-CLR-102", status: "Going" },
      { id: "e12", name: "Tom Holland", email: "t.holland@hinote.com", department: "Strategy", code: "HN-CLR-103", status: "Pending" },
    ]
  },
  {
    id: "vbook-3",
    client: "Mosaic Labs",
    planName: "Basic Creative Corporate Plan",
    service: "Playful portrait workshop",
    time: "Fri, Aug 16 · 2:00 PM · 75 min",
    location: "Lumen Studio, Shoreditch",
    status: "Confirmed",
    color: "#8B5CF6",
    emoji: "✨",
    slotsAllocated: 12,
    slotsClaimed: 10,
    invites: [
      { id: "e20", name: "Rachel Adams", email: "r.adams@mosaic.io", department: "Research", code: "ML-PRT-201", status: "Going" },
      { id: "e21", name: "Liam Miller", email: "l.miller@mosaic.io", department: "Data Science", code: "ML-PRT-202", status: "Going" },
    ]
  }
];

const vendorPastBookings = [
  {
    id: "vbook-past-1",
    client: "Field Notes Agency",
    planName: "Basic Creative Corporate Plan",
    service: "Watercolour without perfection",
    time: "Tue, Jul 23 · 2:00 PM · 90 min",
    location: "Lumen Studio, Shoreditch",
    status: "Completed",
    color: "#EF4444",
    emoji: "🎨",
    slotsAllocated: 14,
    slotsClaimed: 14,
    invites: [
      { id: "ep1", name: "Hannah Lee", email: "hannah@fieldnotes.com", department: "Creative", code: "FN-WAT-901", status: "Going" },
      { id: "ep2", name: "James Wright", email: "james@fieldnotes.com", department: "Operations", code: "FN-WAT-902", status: "Going" },
    ]
  }
];

const requests = vendorCorporateBookings;

function VendorRail({ page }: { page: "services" | "bookings" | "insights" }) {
  const iconClass = (active: boolean) => `grid h-10 w-10 place-items-center rounded-full transition ${active ? "bg-[#33c4f0] text-[#1a1a28]" : "text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]"}`;
  return <aside className="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#33c4f0]/15 bg-white/90 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex"><Link to="/" title="CreativeSelf Home" aria-label="CreativeSelf Home" className="grid h-10 w-10 place-items-center transition-transform hover:scale-105"><ImageWithFallback src={logoIcon} alt="CreativeSelf Logo" className="h-full w-full object-contain" /></Link><nav className="mt-10 flex flex-col gap-3" aria-label="Vendor navigation"><Link to="/vendor" title="Overview" className={iconClass(false)}><LayoutDashboard size={18} /></Link><Link to="/vendor/services" title="Services" className={iconClass(page === "services")}><PackageOpen size={18} /></Link><Link to="/vendor/content" title="Content studio" className={iconClass(false)}><ImageIcon size={18} /></Link><Link to="/vendor/bookings" title="Bookings" className={iconClass(page === "bookings")}><CalendarDays size={18} /></Link><Link to="/vendor/insights" title="Insights" className={iconClass(page === "insights")}><BarChart3 size={18} /></Link></nav><div className="mt-auto flex flex-col gap-3"><button type="button" title="Settings" className={iconClass(false)}><Settings size={18} /></button><Link to="/" title="Log out" className={iconClass(false)}><LogOut size={18} /></Link><RoleSwitcher activeRole="vendor" /></div></aside>;
}

function VendorProfile() {
  return <aside className="hidden lg:block"><div className="sticky top-8 overflow-hidden bg-[#15343d] p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]" style={{ borderRadius: "20px 20px 64px 20px" }}><p className="text-xs font-bold uppercase tracking-[.14em] text-white/45">Your provider studio</p><div className="mt-5 grid h-16 w-16 place-items-center rounded-[22px_22px_32px_22px] bg-[#ef4444] text-3xl">🎨</div><p className="mt-5 text-2xl font-extrabold">Studio Lumen</p><p className="mt-2 text-sm font-bold text-[#33c4f0]">Heart of Art</p><p className="mt-4 text-sm leading-6 text-white/65">Thoughtful art experiences for teams that need more colour in their week.</p><div className="mt-7 border-t border-white/10 pt-5"><p className="text-xs font-bold text-white/45">PROFILE HEALTH</p><p className="mt-2 text-sm font-bold">Complete · ready to discover</p></div></div></aside>;
}

export function VendorWorkspacePages() {
  const { pathname } = useLocation();
  const page = pathname.endsWith("/services") ? "services" : pathname.endsWith("/bookings") ? "bookings" : "insights";
  const [liveServices, setLiveServices] = useState(services);
  const [requestStatus, setRequestStatus] = useState<Record<string, string>>({});
  const [showComposer, setShowComposer] = useState(false);

  const title = page === "services" ? "Services that teams can say yes to." : page === "bookings" ? "Your team moments, all in one place." : "See what your creative work is opening up.";
  const eyebrow = page === "services" ? "Your service catalogue" : page === "bookings" ? "Bookings & delivery" : "Marketplace insights";

  return <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}><VendorRail page={page} /><div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]"><VendorProfile /><main><header className="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style={{ borderRadius: "20px 20px 64px 20px" }}><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">{eyebrow}</p><h1 className="mt-2 text-3xl font-extrabold leading-tight">{title}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#717182]">{page === "services" ? "Keep your offers current, clear, and easy for teams to book." : page === "bookings" ? "Respond to requests, prepare sessions, and keep delivery feeling effortless." : "A clear picture of how teams are finding, choosing, and returning to Studio Lumen."}</p></div>{page === "services" && <button type="button" onClick={() => setShowComposer(true)} className="inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-4 py-3 text-xs font-extrabold text-white"><Plus size={16} />New service</button>}</div></header>{page === "services" ? <Services liveServices={liveServices} setLiveServices={setLiveServices} /> : page === "bookings" ? <Bookings requestStatus={requestStatus} setRequestStatus={setRequestStatus} /> : <Insights />}</main><VendorSide page={page} /></div>{showComposer && <div className="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5" role="dialog" aria-modal="true"><div className="relative w-full max-w-xl bg-white p-7 shadow-2xl" style={{ borderRadius: "20px 20px 64px 20px" }}><button type="button" onClick={() => setShowComposer(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe]" aria-label="Close"><X size={18} /></button><p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#147c9e]">New service</p><h2 className="mt-2 text-3xl font-extrabold">Make it easy to say yes.</h2><input className="mt-7 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] px-4 py-3 text-sm" placeholder="Service name" /><textarea className="mt-4 min-h-28 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] p-4 text-sm" placeholder="What will this experience make possible for a team?" /><button type="button" onClick={() => setShowComposer(false)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-6 py-3 text-sm font-extrabold text-white"><Sparkles size={16} />Save draft</button></div></div>}</div>;
}

type ServiceItem = typeof services[number];

function Services({ liveServices, setLiveServices }: { liveServices: ServiceItem[]; setLiveServices: (nextServices: ServiceItem[]) => void }) {
  return (
    <section className="mt-7">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Live and draft</p>
          <h2 className="mt-1 text-2xl font-extrabold">Your current offer</h2>
        </div>
        <p className="text-sm font-bold text-[#717182]">{liveServices.filter((service) => service.live).length} live</p>
      </div>
      <div className="space-y-4">
        {liveServices.map((service) => (
          <article
            key={service.name}
            className="group overflow-hidden bg-white p-4 sm:p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)] transition hover:shadow-[0_18px_48px_rgba(28,118,155,.12)]"
            style={{ borderRadius: "20px 20px 64px 20px" }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-36 w-full sm:h-28 sm:w-36 shrink-0 overflow-hidden rounded-[16px_16px_36px_16px] bg-gray-100">
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a28]/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 grid h-8 w-8 place-items-center rounded-xl bg-white/90 text-lg shadow-sm backdrop-blur">
                  {service.emoji}
                </span>
                <span
                  className="absolute top-2 right-2 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase text-white backdrop-blur shadow-sm"
                  style={{ background: service.live ? "#10b981" : "#717182" }}
                >
                  {service.live ? "Published" : "Draft"}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-[.14em]" style={{ color: service.color }}>
                    {service.format}
                  </span>
                  <span className="text-xs text-[#717182]">•</span>
                  <span className="text-xs font-extrabold text-[#147c9e]">{service.price}</span>
                </div>
                <h3 className="mt-1 text-lg font-extrabold text-[#1a1a28] group-hover:text-[#147c9e] transition">
                  {service.name}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-bold text-[#717182]">
                  <span className="rounded-full bg-[#f8fdff] border border-[#33c4f0]/20 px-3 py-1">
                    👀 {service.views} views
                  </span>
                  <span className="rounded-full bg-[#f8fdff] border border-[#33c4f0]/20 px-3 py-1">
                    📅 {service.bookings} bookings
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:self-center">
                <button
                  type="button"
                  onClick={() =>
                    setLiveServices(
                      liveServices.map((item) => (item.name === service.name ? { ...item, live: !item.live } : item))
                    )
                  }
                  className={`rounded-full px-5 py-2.5 text-xs font-extrabold transition ${
                    service.live
                      ? "bg-[#e8f9ff] text-[#147c9e] hover:bg-[#d4f2fc]"
                      : "bg-[#1a1a28] text-white hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                  }`}
                >
                  {service.live ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Bookings({
  requestStatus,
  setRequestStatus,
}: {
  requestStatus: Record<string, string>;
  setRequestStatus: (status: Record<string, string>) => void;
}) {
  const { confirmActivityByVendor } = useSubscription();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [activeRosterBooking, setActiveRosterBooking] = useState<any | null>(null);

  const activeList = tab === "upcoming" ? vendorCorporateBookings : vendorPastBookings;

  return (
    <section className="mt-7 space-y-6">
      {/* Tab Controls & Schedule Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Delivery Schedule</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#1a1a28]">
            {tab === "upcoming" ? "Upcoming Sessions & Employee Invites" : "Completed Corporate Sessions"}
          </h2>
        </div>

        {/* Tab Toggle Pills */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-full border border-gray-200">
          <button
            type="button"
            onClick={() => setTab("upcoming")}
            className={`rounded-full px-5 py-2 text-xs font-extrabold transition-all ${
              tab === "upcoming" ? "bg-[#1a1a28] text-white shadow-sm" : "text-[#717182] hover:text-[#1a1a28]"
            }`}
          >
            Upcoming ({vendorCorporateBookings.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("past")}
            className={`rounded-full px-5 py-2 text-xs font-extrabold transition-all ${
              tab === "past" ? "bg-[#1a1a28] text-white shadow-sm" : "text-[#717182] hover:text-[#1a1a28]"
            }`}
          >
            Past Sessions ({vendorPastBookings.length})
          </button>
        </div>
      </div>

      {/* Booking Cards List (Sleek, De-cluttered & Spacious Layout) */}
      <div className="space-y-4">
        {activeList.map((booking) => {
          const status = requestStatus[booking.client] ?? booking.status;
          const percentUsed = Math.min(100, Math.round((booking.slotsClaimed / booking.slotsAllocated) * 100));
          const goingCount = booking.invites.filter((i) => i.status === "Going").length;

          return (
            <article
              key={booking.id}
              className="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Main Info Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl shadow-sm border border-gray-100"
                    style={{ background: `${booking.color}12` }}
                  >
                    {booking.emoji}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-[#1a1a28] text-lg leading-snug">{booking.service}</h3>
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-extrabold text-gray-700">
                        {booking.client}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 font-semibold text-gray-700">
                        <Clock3 size={13} className="text-[#33c4f0]" /> {booking.time}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-[#33c4f0]" /> {booking.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Confirm Action */}
                <div className="flex items-center gap-3 shrink-0 sm:self-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-extrabold flex items-center gap-1 ${
                      status === "Confirmed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                        : status === "Completed"
                        ? "bg-gray-100 text-gray-700 border border-gray-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {status === "Confirmed" ? "✓ Confirmed" : status === "Completed" ? "Completed" : "⏳ Needs Response"}
                  </span>

                  {status === "Needs response" && (
                    <button
                      type="button"
                      onClick={() => {
                        setRequestStatus({ ...requestStatus, [booking.client]: "Confirmed" });
                        confirmActivityByVendor("mindful-watercolor-painting");
                        confirmActivityByVendor("ceramic-pottery-workshop");
                      }}
                      className="rounded-full bg-[#1a1a28] hover:bg-[#33c4f0] hover:text-[#1a1a28] px-4 py-1.5 text-xs font-extrabold text-white transition shadow-sm"
                    >
                      Confirm Booking
                    </button>
                  )}
                </div>
              </div>

              {/* Clean Capacity & Roster Section (Single Row, Un-crowded) */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                  <div className="flex items-center gap-1.5 font-bold text-gray-800 shrink-0">
                    <Users size={14} className="text-[#147c9e]" />
                    <span>{booking.slotsClaimed}/{booking.slotsAllocated} Slots</span>
                    <span className="text-emerald-600 font-extrabold">({goingCount} Going)</span>
                  </div>

                  <div className="w-32 sm:w-48 h-2 bg-gray-100 rounded-full overflow-hidden shrink-0">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#33c4f0] to-[#10b981] transition-all"
                      style={{ width: `${percentUsed}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveRosterBooking(booking)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50/80 hover:bg-cyan-100/80 px-3.5 py-1.5 text-xs font-extrabold text-[#147c9e] border border-cyan-200/60 transition shadow-sm shrink-0"
                >
                  <Eye size={13} />
                  Roster ({booking.invites.length})
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Vendor Employee Roster & Invites Modal */}
      {activeRosterBooking && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/50 p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-white p-6 sm:p-8 shadow-2xl space-y-6"
            style={{ borderRadius: "20px 20px 64px 20px" }}
          >
            <button
              type="button"
              onClick={() => setActiveRosterBooking(null)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f9ff] px-3 py-1 text-xs font-bold text-[#147c9e]">
                <Users size={13} /> Corporate Attendee Roster
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-[#1a1a28]">
                {activeRosterBooking.client} Roster
              </h2>
              <p className="mt-1 text-xs font-medium text-[#717182]">
                {activeRosterBooking.service} • {activeRosterBooking.time}
              </p>
            </div>

            {/* Metrics Header */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                <p className="text-xl font-extrabold text-[#1a1a28]">{activeRosterBooking.slotsAllocated}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Allocated Slots</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                <p className="text-xl font-extrabold text-emerald-700">
                  {activeRosterBooking.invites.filter((i: any) => i.status === "Going").length}
                </p>
                <p className="text-[10px] font-bold text-emerald-700 uppercase">Confirmed Going</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                <p className="text-xl font-extrabold text-amber-700">
                  {activeRosterBooking.invites.filter((i: any) => i.status === "Pending").length}
                </p>
                <p className="text-[10px] font-bold text-amber-700 uppercase">Pending RSVP</p>
              </div>
            </div>

            {/* Attendees Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase">
                    <th className="py-2.5 px-3">Employee Name</th>
                    <th className="py-2.5 px-3">Email & Dept</th>
                    <th className="py-2.5 px-3">Invite Code</th>
                    <th className="py-2.5 px-3">RSVP Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeRosterBooking.invites.map((emp: any) => (
                    <tr key={emp.id} className="hover:bg-gray-50/60 transition">
                      <td className="py-3 px-3 font-extrabold text-gray-900">{emp.name}</td>
                      <td className="py-3 px-3 text-gray-600">
                        {emp.email} <span className="text-gray-400">• {emp.department}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-gray-700">{emp.code}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            emp.status === "Going"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {emp.status === "Going" ? "✓ Going" : "⏳ Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  const csv = activeRosterBooking.invites
                    .map((i: any) => `${i.name},${i.email},${i.department},${i.code},${i.status}`)
                    .join("\n");
                  const blob = new Blob([`Name,Email,Department,Code,Status\n${csv}`], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${activeRosterBooking.client}_Attendee_Roster.csv`;
                  a.click();
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-5 py-2.5 text-xs font-extrabold text-white hover:bg-[#33c4f0] hover:text-[#1a1a28] transition"
              >
                <Download size={14} /> Download Roster CSV
              </button>

              <button
                type="button"
                onClick={() => setActiveRosterBooking(null)}
                className="rounded-full border border-gray-200 px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
              >
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Insights() {
  const bars = [{ label: "Week 1", value: 42 }, { label: "Week 2", value: 66 }, { label: "Week 3", value: 54 }, { label: "Week 4", value: 84 }];
  return <><section className="mt-7 grid gap-4 sm:grid-cols-3"><Metric label="Profile views" value="451" detail="+18% over last month" /><Metric label="Booking conversion" value="12.6%" detail="Above category average" /><Metric label="Repeat bookers" value="6" detail="Teams returning this quarter" /></section><section className="mt-7 bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}><p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Interest over time</p><h2 className="mt-1 text-2xl font-extrabold">A steadier pull each week.</h2><div className="mt-8 flex h-44 items-end justify-between gap-4">{bars.map((bar) => <div key={bar.label} className="flex flex-1 flex-col items-center gap-3"><div className="w-full rounded-t-[14px] bg-[#33c4f0]" style={{ height: `${bar.value}%` }} /><p className="text-[11px] font-bold text-[#717182]">{bar.label}</p></div>)}</div></section><section className="mt-7 bg-[#e8f9ff] p-6" style={{ borderRadius: "20px 20px 64px 20px" }}><p className="text-xs font-bold uppercase tracking-[.14em] text-[#147c9e]">Acumen interpretation</p><p className="mt-3 max-w-xl text-lg font-extrabold leading-7">Your short, low-pressure sessions are converting best with teams booking mid-week.</p><p className="mt-3 text-sm leading-6 text-[#4f7180]">Consider adding another 45–60 minute option for Tuesday through Thursday.</p></section></>;
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}><p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">{label}</p><p className="mt-3 text-3xl font-extrabold">{value}</p><p className="mt-2 text-xs font-bold text-[#147c9e]">{detail}</p></div>; }

function VendorSide({ page }: { page: "services" | "bookings" | "insights" }) { return <aside className="hidden lg:block"><div className="sticky top-8 space-y-5">{page === "bookings" ? <><div className="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style={{ borderRadius: "20px 20px 64px 20px" }}><div className="flex items-center justify-between"><div><p className="text-sm font-extrabold">August 2024</p><p className="mt-1 text-xs text-[#717182]">Delivery calendar</p></div><CalendarDays size={18} className="text-[#33c4f0]" /></div><div className="mt-5 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#9aa1ae]"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div><div className="mt-2 grid grid-cols-7 gap-1">{Array.from({ length: 31 }, (_, index) => index + 1).map((day) => { const confirmed = day === 8 || day === 16 || day === 21; const pending = day === 13; return <div key={day} className={`grid h-7 place-items-center rounded-full text-xs font-bold ${confirmed ? "bg-[#33c4f0] text-[#1a1a28]" : pending ? "bg-[#f59e0b]/25 text-[#9a5d00]" : "text-[#414153]"}`}>{day}</div>; })}</div><div className="mt-5 space-y-2 border-t border-[#33c4f0]/15 pt-4 text-xs font-bold text-[#717182]"><p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#33c4f0]" />Confirmed sessions</p><p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#f59e0b]" />Needs response</p></div></div><div className="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style={{ borderRadius: "20px 20px 64px 20px" }}><p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Response time</p><p className="mt-3 text-3xl font-extrabold">2h 14m</p><p className="mt-2 text-sm leading-6 text-[#717182]">Fast replies make it easier for teams to commit.</p></div></> : <div className="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style={{ borderRadius: "20px 20px 64px 20px" }}><p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Provider health</p><p className="mt-3 text-3xl font-extrabold">94%</p><p className="mt-2 text-sm leading-6 text-[#717182]">Your listing and response quality are helping you appear in more matches.</p></div>}<div className="border border-[#33c4f0]/18 bg-[#e8f9ff] p-5 text-[#1a1a28]" style={{ borderRadius: "20px 20px 64px 20px" }}><p className="text-xs font-bold uppercase tracking-[.14em] text-[#147c9e]">Next good move</p><p className="mt-2 text-xl font-extrabold leading-tight">{page === "services" ? "Make one offer shorter." : page === "bookings" ? "Confirm the HiNote request." : "Lean into mid-week formats."}</p><p className="mt-3 text-sm leading-6 text-[#4f7180]">Acumen uses current marketplace behaviour to surface practical next steps.</p></div></div></aside>; }
