import { useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import {
  Trophy as Award, ChartBar as BarChart3, BookOpen, Buildings as Building2, CalendarBlank as Calendar, Check, CaretRight as ChevronRight,
  Compass, Heart, SquaresFour as LayoutDashboard, Gear as Settings, ShoppingBag, Sparkle as Sparkles, Users,
  UserCheck, Lightning as Zap,
} from "@phosphor-icons/react";

const personalNav = [
  { slug: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { slug: "discover", label: "Discover", icon: Compass },
  { slug: "activities", label: "Activities", icon: Calendar },
  { slug: "learning", label: "Learning Plan", icon: BookOpen },
  { slug: "saved", label: "Saved", icon: Heart },
  { slug: "personality", label: "Personality", icon: Award },
  { slug: "brands", label: "Brands", icon: ShoppingBag },
  { slug: "settings", label: "Settings", icon: Settings },
];

const corporateNav = [
  { slug: "overview", label: "Overview", icon: LayoutDashboard },
  { slug: "employees", label: "Employees", icon: Users },
  { slug: "engagement", label: "Engagement", icon: BarChart3 },
  { slug: "activities", label: "Activities", icon: Calendar },
  { slug: "learning", label: "Learning Plans", icon: BookOpen },
  { slug: "brands", label: "Service Brands", icon: ShoppingBag },
  { slug: "vendors", label: "Vendors", icon: UserCheck },
  { slug: "settings", label: "Settings", icon: Settings },
];

const personalContent: Record<string, { eyebrow: string; title: string; copy: string; accent: string; items: { title: string; detail: string; tag: string }[] }> = {
  discover: {
    eyebrow: "Acumen AI matchboard", title: "A good next move for your creative self.", copy: "Fresh experiences, selected for your Expressive profile and the rhythm you have this month.", accent: "#EF4444",
    items: [
      { title: "Spoken Word at Dusk", detail: "Local Vocals · Thu, 7:30 PM", tag: "98% match" },
      { title: "Gesture & Colour", detail: "Heart of Art · 2-hour studio", tag: "94% match" },
      { title: "Move Your Story", detail: "Moves & Grooves · Saturday", tag: "91% match" },
    ],
  },
  activities: {
    eyebrow: "Your creative calendar", title: "Make room for something that moves you.", copy: "Book your next moment or revisit the experiences that shaped your current streak.", accent: "#33C4F0",
    items: [
      { title: "Jazz Improvisation Workshop", detail: "Jul 26 · 3:00 PM · Local Vocals", tag: "Booked" },
      { title: "Contemporary Dance Class", detail: "Jul 28 · 6:00 PM · Moves & Grooves", tag: "2 seats left" },
      { title: "Creative Writing Lab", detail: "Aug 2 · 4:00 PM · Heart of Art", tag: "Recommended" },
    ],
  },
  learning: {
    eyebrow: "Learning plan", title: "Your expression is getting stronger.", copy: "Three focused learning paths turn your activity history into a practice you can keep.", accent: "#8B5CF6",
    items: [
      { title: "Foundations of Expressive Arts", detail: "6 of 8 lessons complete", tag: "80%" },
      { title: "Performance & Stage Presence", detail: "5 of 10 lessons complete", tag: "45%" },
      { title: "Creative Voice & Identity", detail: "1 of 6 lessons complete", tag: "20%" },
    ],
  },
  saved: {
    eyebrow: "Saved for later", title: "Keep the sparks you want to return to.", copy: "Your collection is private, personal, and ready whenever you need a fresh idea.", accent: "#F59E0B",
    items: [
      { title: "Abstract Oil Painting", detail: "Heart of Art · Studio session", tag: "Saved" },
      { title: "Urban Dance Battle", detail: "Moves & Grooves · Community", tag: "Saved" },
      { title: "Open Mic Night", detail: "Local Vocals · First Friday", tag: "Saved" },
    ],
  },
  personality: {
    eyebrow: "Your creative personality", title: "The Expressive", copy: "You make people feel something. Acumen sees a creator who finds clarity through story, performance, movement, and connection.", accent: "#EF4444",
    items: [
      { title: "Core strength", detail: "Emotional communication and presence", tag: "Expression" },
      { title: "Best environments", detail: "Collaborative, live, open-ended", tag: "Energy" },
      { title: "Explore next", detail: "Music, movement, theatre, storytelling", tag: "Pathway" },
    ],
  },
  brands: {
    eyebrow: "Service brands", title: "Find your next creative habitat.", copy: "Follow the service brands that understand how you like to create, recharge, and connect.", accent: "#10B981",
    items: [
      { title: "Heart of Art", detail: "Painting, photography, writing, filmmaking", tag: "Following" },
      { title: "Local Vocals", detail: "Music, performance, spoken word", tag: "Top match" },
      { title: "Moves & Grooves", detail: "Dance, rhythm, physical expression", tag: "New" },
    ],
  },
  settings: {
    eyebrow: "Account settings", title: "Make CreativeSelf feel like yours.", copy: "Manage the details behind your recommendations, membership, and notifications.", accent: "#717182",
    items: [
      { title: "Creative preferences", detail: "Expressive · Arts, music, movement", tag: "Edit" },
      { title: "Membership", detail: "Advanced Creative · Renews Aug 14", tag: "Manage" },
      { title: "Notifications", detail: "Weekly recommendations enabled", tag: "On" },
    ],
  },
};

const corporateContent: Record<string, { eyebrow: string; title: string; copy: string; accent: string; items: { title: string; detail: string; tag: string }[] }> = {
  employees: { eyebrow: "Creative team directory", title: "Keep the whole team in their creative element.", copy: "145 people are connected to tailored learning, activity, and wellbeing pathways.", accent: "#8B5CF6", items: [{ title: "106 active employees", detail: "73% participation across programs", tag: "+8 this month" }, { title: "Maria Santos", detail: "The Expressive · 7 activities", tag: "High momentum" }, { title: "James Okoro", detail: "The Explorer · 6 activities", tag: "High momentum" }] },
  engagement: { eyebrow: "Engagement insights", title: "Creativity is becoming a team habit.", copy: "Participation is up 12% since the last creative sprint, with movement and art leading the way.", accent: "#10B981", items: [{ title: "Participation rate", detail: "73% of enrolled employees", tag: "+12%" }, { title: "Repeat attendance", detail: "64% join more than one activity", tag: "+9%" }, { title: "Wellbeing signal", detail: "4.7 / 5 average experience score", tag: "Strong" }] },
  activities: { eyebrow: "Team activity calendar", title: "Programs with a pulse.", copy: "Coordinate memorable sessions across locations, teams, and service-brand partners.", accent: "#33C4F0", items: [{ title: "Watercolor Team Workshop", detail: "Jul 29 · 15 participants · Heart of Art", tag: "Scheduled" }, { title: "Group Fitness & Yoga", detail: "Jul 31 · 22 participants · Athletic Fanatics", tag: "Scheduled" }, { title: "Robotics Challenge", detail: "Aug 5 · 10 participants · Technut", tag: "Draft" }] },
  learning: { eyebrow: "Organisational learning", title: "Give growth a creative direction.", copy: "Curated plans make development visible, practical, and easy to share across teams.", accent: "#F59E0B", items: [{ title: "Creative leadership", detail: "24 people enrolled · 5 weeks", tag: "Active" }, { title: "Innovation habits", detail: "48 people enrolled · 4 weeks", tag: "Ready" }, { title: "Wellbeing through making", detail: "32 people enrolled · 6 weeks", tag: "Active" }] },
  brands: { eyebrow: "Service brand subscriptions", title: "A stronger creative ecosystem.", copy: "Your Elite plan connects six specialist brands to the goals your teams care about.", accent: "#EF4444", items: [{ title: "Heart of Art", detail: "42 employees engaged", tag: "85% usage" }, { title: "Athletic Fanatics", detail: "38 employees engaged", tag: "72% usage" }, { title: "Technut", detail: "31 employees engaged", tag: "68% usage" }] },
  vendors: { eyebrow: "Vendor management", title: "Your trusted creative partners.", copy: "Review partner readiness, approve new providers, and keep your service ecosystem healthy.", accent: "#8B5CF6", items: [{ title: "24 verified providers", detail: "Trainers, coaches, groups, and associations", tag: "View directory" }, { title: "3 pending reviews", detail: "New partners awaiting approval", tag: "Review" }, { title: "4.8 average partner rating", detail: "Based on 198 completed sessions", tag: "Insights" }] },
  settings: { eyebrow: "Organisation settings", title: "Shape the program around your people.", copy: "Control access, subscription details, communication, and program guidelines.", accent: "#717182", items: [{ title: "Elite Creative Team", detail: "6 service brands · 12 activities each month", tag: "Manage" }, { title: "Engagement notifications", detail: "Weekly leadership digest enabled", tag: "On" }, { title: "Program admins", detail: "6 admins with workspace access", tag: "Manage" }] },
};

export function WorkspaceModule() {
  const { module } = useParams();
  const { pathname } = useLocation();
  const [saved, setSaved] = useState<string[]>([]);
  const corporate = pathname.startsWith("/corporate");
  const nav = corporate ? corporateNav : personalNav;
  const defaultSlug = corporate ? "overview" : "dashboard";
  const slug = module ?? defaultSlug;
  const content = useMemo(() => {
    const source = corporate ? corporateContent : personalContent;
    return source[slug] ?? source[corporate ? "engagement" : "discover"];
  }, [corporate, slug]);
  const home = corporate ? "/corporate" : "/dashboard";

  return (
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28] md:flex" style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}>
      <aside className="hidden min-h-screen w-60 shrink-0 flex-col bg-[#1a1a28] px-5 py-8 md:flex" style={{ borderRadius: "0 52px 52px 0" }}>
        <Link to={home} className="mb-8 text-lg font-extrabold no-underline"><span className="text-[#33c4f0]">creative</span><span className="text-white">self</span></Link>
        <div className="mb-6 rounded-[20px_20px_64px_20px] border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#33c4f0]">{corporate ? "Workspace" : "Creative profile"}</p>
          <p className="mt-2 font-bold text-white">{corporate ? "Nexus Creative Corp" : "Alex Rivera"}</p>
          <p className="mt-1 text-xs text-white/55">{corporate ? "Elite Creative Team" : "The Expressive · Advanced"}</p>
        </div>
        <nav className="flex-1">
          {nav.map(({ slug: itemSlug, label, icon: Icon }) => {
            const active = slug === itemSlug || (!module && itemSlug === defaultSlug);
            const to = itemSlug === defaultSlug ? home : `${corporate ? "/corporate" : "/dashboard"}/${itemSlug}`;
            return <Link key={itemSlug} to={itemSlug === "vendors" && corporate ? "/vendors" : to} className="mb-1 flex items-center gap-3 rounded-full px-4 py-3 text-sm no-underline transition" style={{ background: active ? (corporate ? "#8b5cf6" : "#33c4f0") : "transparent", color: active ? "#fff" : "rgba(255,255,255,.58)", fontWeight: active ? 700 : 500 }}><Icon size={17} />{label}</Link>;
          })}
        </nav>
        <Link to={corporate ? "/dashboard" : "/corporate"} className="mt-5 flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-bold text-white/70 no-underline"><Building2 size={15} />Switch to {corporate ? "personal" : "team"}</Link>
      </aside>

      <main className="min-w-0 flex-1 px-5 pb-12 pt-24 md:px-10 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: content.accent }}>{content.eyebrow}</p><h1 className="mt-2 text-3xl font-extrabold leading-tight md:text-5xl">{content.title}</h1></div>
            <Link to={home} className="rounded-full border border-[#33c4f0]/30 bg-white px-5 py-3 text-sm font-bold text-[#1a1a28] no-underline shadow-sm">Back to overview</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
            <section className="overflow-hidden bg-white p-7 shadow-[0_16px_48px_rgba(35,100,125,.09)]" style={{ borderRadius: "20px 20px 90px 20px" }}>
              <div className="mb-7 flex items-start justify-between gap-5"><p className="max-w-2xl text-base leading-7 text-[#626273]">{content.copy}</p><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-xl" style={{ background: `${content.accent}18` }}><Sparkles size={20} style={{ color: content.accent }} /></span></div>
              <div className="space-y-3">{content.items.map((item, index) => { const isSaved = saved.includes(item.title); return <div key={item.title} className="flex flex-wrap items-center gap-4 border border-[#33c4f0]/15 bg-[#f9fdff] px-5 py-4 transition hover:-translate-y-0.5" style={{ borderRadius: index % 2 ? "20px 20px 52px 20px" : "20px 20px 20px 52px" }}><span className="grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold" style={{ color: content.accent, background: `${content.accent}16` }}>{index + 1}</span><div className="min-w-44 flex-1"><p className="font-bold">{item.title}</p><p className="mt-1 text-sm text-[#717182]">{item.detail}</p></div><span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${content.accent}14`, color: content.accent }}>{item.tag}</span><button type="button" onClick={() => setSaved((current) => isSaved ? current.filter((title) => title !== item.title) : [...current, item.title])} className="grid h-9 w-9 place-items-center rounded-full border border-[#1a1a28]/10 bg-white transition hover:scale-105" aria-label={`Save ${item.title}`}>{isSaved ? <Check size={16} style={{ color: content.accent }} /> : <Heart size={16} />}</button></div>; })}</div>
              <button type="button" className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: content.accent }}>Explore all <ChevronRight size={16} /></button>
            </section>
            <aside className="bg-[#1a1a28] p-7 text-white" style={{ borderRadius: "20px 20px 20px 90px" }}><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#33c4f0]">Acumen signal</p><p className="mt-4 text-2xl font-extrabold leading-tight">{corporate ? "Your people are showing up for creative time." : "Your next best experience is close."}</p><p className="mt-4 text-sm leading-6 text-white/60">{corporate ? "Activity participation is growing most in collaborative, hands-on experiences." : "A quick booking this week helps maintain your 3-week creative rhythm."}</p><div className="mt-7 rounded-[20px_20px_52px_20px] bg-white/8 p-4"><p className="text-3xl font-extrabold">{corporate ? "73%" : "98%"}</p><p className="mt-1 text-xs text-white/55">{corporate ? "participation rate" : "match confidence"}</p></div><Link to={corporate ? "/corporate/engagement" : "/dashboard/discover"} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#33c4f0] no-underline">Open insight <ChevronRight size={16} /></Link></aside>
          </div>
        </div>
      </main>
    </div>
  );
}
