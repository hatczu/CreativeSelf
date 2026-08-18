import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Pulse as Activity,
  ArrowsLeftRight as ArrowLeftRight,
  ChartBar as BarChart3,
  Buildings as Building2,
  Check,
  CaretRight as ChevronRight,
  ClipboardText as ClipboardList,
  Eye,
  FileText as FileCheck2,
  Folders as FolderTree,
  Heart,
  SquaresFour as LayoutDashboard,
  SignOut as LogOut,
  DotsThree as MoreHorizontal,
  MagnifyingGlass as Search,
  Gear as Settings,
  ShieldCheck,
  Trash,
  Users,
  X,
} from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logoIcon from "@/imports/Logo.png";

type Section = "overview" | "clients" | "vendors" | "content" | "categories" | "users" | "reports" | "audit";

type ContentItem = {
  id: string;
  title: string;
  by: string;
  state: "Published" | "Reported";
  date: string;
  category: string;
  snippet: string;
  color: string;
  image: string;
  additionalImages?: string[];
  likes?: number;
  comments?: number;
};

const clientRows = [
  { name: "Northstar Studio", plan: "Advanced Corporate", people: 84, state: "Active" },
  { name: "HiNote Consulting", plan: "Enterprise", people: 210, state: "Active" },
  { name: "Mosaic Labs", plan: "Starter Corporate", people: 32, state: "Trial" },
];
const vendorRows = [
  { name: "Studio Lumen", type: "Activity provider", service: "Heart of Art", state: "Active" },
  { name: "Maya Ellison", type: "Trainer", service: "Athletic Fanatics", state: "Active" },
  { name: "Cocoa Collective", type: "Talent", service: "Chowdown", state: "Review" },
];
const initialContentRows: ContentItem[] = [
  {
    id: "1",
    title: "A gentle kind of team reset: Desk-to-mat guided flow",
    by: "Studio Lumen",
    state: "Published",
    date: "2 hours ago",
    category: "Team Reset",
    snippet: "Discover how short 15-minute guided breathwork sessions can rebuild team focus, align energy, and reduce afternoon workplace burnout.",
    color: "#33c4f0",
    image: "https://images.unsplash.com/photo-1758874384683-0accd9fb26ee?w=800&h=500&fit=crop&auto=format",
    additionalImages: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop&auto=format"
    ],
    likes: 42,
    comments: 6
  },
  {
    id: "2",
    title: "The five-sense chocolate workshop for team bonding",
    by: "Cocoa Collective",
    state: "Reported",
    date: "5 hours ago",
    category: "Workshops",
    snippet: "Interactive chocolate tasting experience designed for corporate team bonding, sensory mindfulness, and artisanal flavor exploration.",
    color: "#F59E0B",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=500&fit=crop&auto=format",
    additionalImages: [
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=500&fit=crop&auto=format"
    ],
    likes: 18,
    comments: 3
  },
  {
    id: "3",
    title: "Why a midweek stretch works for sedentary teams",
    by: "Maya Ellison",
    state: "Published",
    date: "1 day ago",
    category: "Fitness & Ergonomics",
    snippet: "Simple desk-friendly mobility exercises to alleviate back strain and improve posture throughout the workday without sweating.",
    color: "#10B981",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=500&fit=crop&auto=format",
    likes: 89,
    comments: 14
  },
  {
    id: "4",
    title: "Mindful pottery & creative expressions studio session",
    by: "Studio Lumen",
    state: "Published",
    date: "2 days ago",
    category: "Art & Creativity",
    snippet: "Hands-on ceramic pottery workshop designed to ignite creative problem-solving and relaxation among team members.",
    color: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1510832842230-87253f48d74f?w=800&h=500&fit=crop&auto=format",
    additionalImages: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&h=500&fit=crop&auto=format"
    ],
    likes: 64,
    comments: 9
  }
];
const auditRows = [
  { time: "9:42 AM", actor: "Amelia Rose", action: "approved vendor profile", target: "Studio Lumen" },
  { time: "9:15 AM", actor: "Leon Chen", action: "updated user role", target: "Julian Price" },
  { time: "Yesterday", actor: "System", action: "flagged content for review", target: "Chocolate workshop post" },
];

const nav: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "clients", label: "Clients", icon: Building2 },
  { id: "vendors", label: "Vendors", icon: ShieldCheck },
  { id: "content", label: "Feed moderation", icon: FileCheck2 },
  { id: "categories", label: "Categories", icon: FolderTree },
  { id: "users", label: "Users", icon: Users },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "audit", label: "Audit log", icon: ClipboardList },
];

function sectionFromPath(pathname: string): Section {
  const key = pathname.split("/").pop();
  return nav.some((item) => item.id === key) ? (key as Section) : "overview";
}

export function AdminWorkspace() {
  const { pathname } = useLocation();
  const section = sectionFromPath(pathname);
  const [query, setQuery] = useState("");
  const [content, setContent] = useState<ContentItem[]>(initialContentRows);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const title = section === "overview" ? "Keep the whole ecosystem moving." : nav.find((item) => item.id === section)?.label ?? "Admin";

  return (
    <div className="min-h-screen bg-[#f3f5f6] text-[#19242a]" style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#dbe2e5] bg-white/95 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex">
        <Link to="/" title="CreativeSelf Home" aria-label="CreativeSelf Home" className="grid h-10 w-10 place-items-center transition-transform hover:scale-105">
          <ImageWithFallback src={logoIcon} alt="CreativeSelf Logo" className="h-full w-full object-contain" />
        </Link>
        <nav className="mt-10 flex flex-col gap-2" aria-label="Admin navigation">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <Link
                key={item.id}
                to={item.id === "overview" ? "/admin" : `/admin/${item.id}`}
                title={item.label}
                aria-label={item.label}
                className={`grid h-9 w-9 place-items-center rounded-full transition ${active ? "bg-[#33c4f0] text-[#1a1a28]" : "text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]"}`}
              >
                <Icon size={16} />
              </Link>
            );
          })}
        </nav>
        <div className="relative mt-auto flex flex-col gap-3">
          <button type="button" title="Settings" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff]">
            <Settings size={18} />
          </button>
          <Link to="/" title="Log out" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#1a1a28] hover:text-white">
            <LogOut size={18} />
          </Link>
          <button type="button" onClick={() => setRoleOpen((open) => !open)} title="Switch role" aria-label="Switch role" className="grid h-10 w-10 place-items-center rounded-full border border-[#33c4f0]/25 text-[#147c9e] transition hover:bg-[#e8f9ff]">
            <ArrowLeftRight size={17} />
          </button>
          {roleOpen && (
            <div className="absolute bottom-0 left-14 w-44 overflow-hidden border border-[#dfe5e7] bg-white py-2 shadow-xl" style={{ borderRadius: "20px 20px 64px 20px" }}>
              <p className="px-4 pb-2 pt-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#717182]">Switch workspace</p>
              <Link to="/dashboard" onClick={() => setRoleOpen(false)} className="block px-4 py-2 text-sm font-bold text-[#19242a] no-underline hover:bg-[#f3f5f6]">Client</Link>
              <Link to="/vendor" onClick={() => setRoleOpen(false)} className="block px-4 py-2 text-sm font-bold text-[#19242a] no-underline hover:bg-[#f3f5f6]">Vendor</Link>
              <Link to="/admin" onClick={() => setRoleOpen(false)} className="block bg-[#e8f9ff] px-4 py-2 text-sm font-bold text-[#147c9e] no-underline">Admin</Link>
            </div>
          )}
        </div>
      </aside>

      <div className="mx-auto grid max-w-[1280px] gap-6 px-5 py-8 pb-14 lg:grid-cols-[850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]">
        <main>
          <header className="border border-[#dfe5e7] bg-white p-6 shadow-[0_8px_24px_rgba(25,36,42,.05)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#5f6d73]">Platform operations</p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold leading-tight">{title}</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#717182]">
                  {section === "overview" ? "A live view of the people, providers, and moments that make up CreativeSelf." : "Review, organise, and take action with confidence."}
                </p>
              </div>
              <div className="rounded-full bg-[#eef1f3] px-4 py-2 text-xs font-bold text-[#536168]">Admin access</div>
            </div>
          </header>

          {section === "overview" ? (
            <Overview />
          ) : section === "clients" ? (
            <Directory title="Client organisations" rows={clientRows} query={query} setQuery={setQuery} columns={["Plan", "Team size", "Status"]} values={(row) => [row.plan, `${row.people} people`, row.state]} />
          ) : section === "vendors" ? (
            <Directory title="Approved providers" rows={vendorRows} query={query} setQuery={setQuery} columns={["Type", "Service brand", "Status"]} values={(row) => [row.type, row.service, row.state]} />
          ) : section === "content" ? (
            <Moderation content={content} setContent={setContent} />
          ) : section === "categories" ? (
            <Categories open={categoryOpen} setOpen={setCategoryOpen} category={newCategory} setCategory={setNewCategory} />
          ) : section === "users" ? (
            <UsersPage query={query} setQuery={setQuery} />
          ) : section === "reports" ? (
            <Reports />
          ) : (
            <Audit />
          )}
        </main>
        <AdminAside section={section} />
      </div>
    </div>
  );
}

function Overview() {
  return (
    <>
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Active clients" value="128" detail="+12 this month" />
        <Stat label="Active vendors" value="84" detail="6 awaiting review" />
        <Stat label="Feed items this week" value="219" detail="8 need moderation" />
      </section>
      <section className="mt-7 overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
        <p className="text-xs font-bold uppercase tracking-[.16em] text-white/45">Today across CreativeSelf</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4">
            <p className="text-2xl font-extrabold text-[#33c4f0]">34</p>
            <p className="mt-1 text-xs font-bold">New bookings</p>
          </div>
          <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4">
            <p className="text-2xl font-extrabold text-[#33c4f0]">19</p>
            <p className="mt-1 text-xs font-bold">New user sign-ups</p>
          </div>
          <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4">
            <p className="text-2xl font-extrabold text-[#33c4f0]">3</p>
            <p className="mt-1 text-xs font-bold">Provider profiles updated</p>
          </div>
        </div>
      </section>
      <section className="mt-7 bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Attention queue</p>
        <h2 className="mt-1 text-2xl font-extrabold">The few things worth handling now.</h2>
        <div className="mt-5 divide-y divide-[#33c4f0]/10">
          {["3 vendor profiles need approval", "2 feed posts were reported by users", "1 client account needs plan confirmation"].map((item) => (
            <div key={item} className="flex items-center justify-between gap-4 py-4">
              <p className="text-sm font-bold">{item}</p>
              <ChevronRight size={17} className="text-[#147c9e]" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Directory({ title, rows, query, setQuery, columns, values }: { title: string; rows: any[]; query: string; setQuery: (value: string) => void; columns: string[]; values: (row: any) => string[] }) {
  const filtered = useMemo(() => rows.filter((row) => row.name.toLowerCase().includes(query.toLowerCase())), [rows, query]);
  return (
    <section className="mt-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Directory</p>
          <h2 className="mt-1 text-2xl font-extrabold">{title}</h2>
        </div>
        <label className="flex items-center gap-2 rounded-full border border-[#33c4f0]/20 bg-white px-4 py-2 text-sm text-[#717182]">
          <Search size={15} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-36 bg-transparent outline-none" placeholder="Search" />
        </label>
      </div>
      <div className="mt-5 overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
        <div className="hidden grid-cols-[1.4fr_1fr_1fr_.8fr_30px] gap-3 border-b border-[#33c4f0]/12 px-5 py-4 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#717182] md:grid">
          <span>Name</span>
          {columns.map((item) => (
            <span key={item}>{item}</span>
          ))}
          <span />
        </div>
        {filtered.map((row) => (
          <div key={row.name} className="grid gap-2 border-b border-[#33c4f0]/10 px-5 py-5 last:border-0 md:grid-cols-[1.4fr_1fr_1fr_.8fr_30px] md:items-center md:gap-3">
            <p className="font-extrabold">{row.name}</p>
            {values(row).map((value, index) => (
              <p key={index} className="text-sm text-[#717182]">
                {index === 2 ? <span className="rounded-full bg-[#e8f9ff] px-3 py-1.5 text-xs font-bold text-[#147c9e]">{value}</span> : value}
              </p>
            ))}
            <button type="button" className="text-[#717182]">
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Moderation({ content, setContent }: { content: ContentItem[]; setContent: React.Dispatch<React.SetStateAction<ContentItem[]>> }) {
  const [filterState, setFilterState] = useState<"All" | "Published" | "Reported">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [removedToast, setRemovedToast] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const handleRemove = (id: string, title: string) => {
    setContent((prev) => prev.filter((item) => item.id !== id));
    if (previewItem?.id === id) {
      setPreviewItem(null);
    }
    setRemovedToast(`"${title}" has been removed from the platform feed.`);
    setTimeout(() => setRemovedToast(null), 4000);
  };

  const filteredContent = useMemo(() => {
    return content.filter((item) => {
      const matchesFilter = filterState === "All" || item.state === filterState;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.by.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [content, filterState, searchQuery]);

  const previewImages = useMemo(() => {
    if (!previewItem) return [];
    return [previewItem.image, ...(previewItem.additionalImages || [])];
  }, [previewItem]);

  return (
    <section className="mt-7 space-y-6">
      {removedToast && (
        <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-800 shadow-sm transition-all">
          <span>{removedToast}</span>
          <button type="button" onClick={() => setRemovedToast(null)} className="text-red-600 hover:text-red-900">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Content Moderation</p>
          <h2 className="mt-1 text-2xl font-extrabold">All Posted Vendor Contents</h2>
          <p className="mt-1 text-xs text-[#717182]">
            Vendor posts go live automatically upon creation. Preview media assets and remove any posts that violate guidelines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 rounded-full border border-[#33c4f0]/20 bg-white px-4 py-2 text-sm text-[#717182]">
            <Search size={15} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-36 bg-transparent outline-none"
              placeholder="Search posts..."
            />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-[#dfe5e7] pb-3">
        {(["All", "Published", "Reported"] as const).map((tab) => {
          const count = tab === "All" ? content.length : content.filter((c) => c.state === tab).length;
          const active = filterState === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterState(tab)}
              className={`rounded-full px-4 py-1.5 text-xs font-extrabold transition ${
                active
                  ? "bg-[#1a1a28] text-white"
                  : "bg-white text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
              }`}
            >
              {tab === "All" ? "All Posted Content" : tab} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredContent.length === 0 ? (
          <div className="bg-white p-8 text-center shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <p className="text-sm font-bold text-[#717182]">No posted contents match your filter.</p>
          </div>
        ) : (
          filteredContent.map((item) => {
            const extraCount = item.additionalImages?.length || 0;
            return (
              <article
                key={item.id}
                className="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)] transition hover:shadow-md"
                style={{ borderRadius: "20px 20px 64px 20px" }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Image Thumbnail with Overlay */}
                  <div className="flex gap-4 items-start flex-1 min-w-[280px]">
                    <div
                      onClick={() => {
                        setPreviewItem(item);
                        setActiveImageIdx(0);
                      }}
                      className="group relative h-24 w-32 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-[#eef1f3] shadow-inner transition transform hover:scale-[1.02]"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a28]/40 opacity-0 transition group-hover:opacity-100 backdrop-blur-[2px]">
                        <Eye size={20} className="text-white" />
                        <span className="mt-1 text-[10px] font-extrabold text-white uppercase tracking-wider">Preview</span>
                      </div>
                      {extraCount > 0 && (
                        <div className="absolute bottom-1.5 right-1.5 rounded-md bg-[#1a1a28]/80 px-1.5 py-0.5 text-[9px] font-extrabold text-white backdrop-blur">
                          +{extraCount}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#147c9e]">Posted by {item.by}</span>
                        <span className="text-[11px] text-[#717182]">• {item.date}</span>
                        <span className="rounded-full bg-[#f3f5f6] px-2.5 py-0.5 text-[10px] font-bold text-[#536168]">
                          {item.category}
                        </span>
                      </div>
                      <h3
                        onClick={() => {
                          setPreviewItem(item);
                          setActiveImageIdx(0);
                        }}
                        className="text-lg font-extrabold text-[#19242a] cursor-pointer hover:text-[#147c9e] transition"
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#717182] leading-relaxed max-w-2xl line-clamp-2">{item.snippet}</p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 pt-1 text-[11px] font-bold text-[#717182]">
                        <span className="flex items-center gap-1">
                          <Heart size={13} className="text-[#ef4444]" /> {item.likes || 0}
                        </span>
                        <span>•</span>
                        <span>{item.comments || 0} comments</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-start">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                        item.state === "Reported" ? "bg-[#f59e0b]/15 text-[#9a5d00]" : "bg-[#10b981]/15 text-[#087e58]"
                      }`}
                    >
                      {item.state === "Reported" ? "Reported by Users" : "Live Feed"}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewItem(item);
                        setActiveImageIdx(0);
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-[#e8f9ff] px-3.5 py-2 text-xs font-extrabold text-[#147c9e] transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                      title="Preview content image"
                    >
                      <Eye size={15} />
                      <span className="hidden md:inline">Preview</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id, item.title)}
                      className="flex items-center gap-1.5 rounded-full bg-[#ef4444]/10 px-3.5 py-2 text-xs font-extrabold text-[#dc2626] transition hover:bg-[#ef4444] hover:text-white"
                      title="Remove post from feed"
                    >
                      <Trash size={15} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Full Image Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a28]/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className="relative flex flex-col md:flex-row w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white shadow-2xl"
            style={{ borderRadius: "24px 24px 64px 24px" }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setPreviewItem(null)}
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-[#19242a] backdrop-blur transition hover:bg-[#1a1a28] hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Left: Main Image & Gallery Selector */}
            <div className="flex-1 bg-[#1a1a28] p-6 flex flex-col items-center justify-center relative min-h-[280px] md:min-h-[420px]">
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src={previewImages[activeImageIdx] || previewItem.image}
                  alt={previewItem.title}
                  className="max-h-[380px] w-full object-contain rounded-xl"
                />
              </div>

              {/* Gallery Thumbnails Strip */}
              {previewImages.length > 1 && (
                <div className="mt-4 flex items-center gap-2 overflow-x-auto p-1">
                  {previewImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`h-12 w-16 overflow-hidden rounded-lg border-2 transition ${
                        activeImageIdx === idx ? "border-[#33c4f0] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <ImageWithFallback src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Post Details & Moderation Actions */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-[#dfe5e7]">
              <div className="space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#147c9e]">{previewItem.by}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                      previewItem.state === "Reported" ? "bg-[#f59e0b]/15 text-[#9a5d00]" : "bg-[#10b981]/15 text-[#087e58]"
                    }`}
                  >
                    {previewItem.state === "Reported" ? "Reported" : "Live Feed"}
                  </span>
                </div>

                <div>
                  <span className="inline-block rounded-full bg-[#f3f5f6] px-2.5 py-0.5 text-[10px] font-bold text-[#536168]">
                    {previewItem.category}
                  </span>
                  <h3 className="mt-2 text-xl font-extrabold leading-snug text-[#19242a]">{previewItem.title}</h3>
                  <p className="mt-1 text-[11px] text-[#717182]">Posted {previewItem.date}</p>
                </div>

                <div className="rounded-2xl border border-[#dfe5e7] bg-[#f9fdff] p-4 text-xs text-[#536168] leading-relaxed">
                  {previewItem.snippet}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#717182] px-1">
                  <span className="flex items-center gap-1.5">
                    <Heart size={16} className="text-[#ef4444]" /> {previewItem.likes || 0} likes
                  </span>
                  <span>{previewItem.comments || 0} comments</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#dfe5e7] flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleRemove(previewItem.id, previewItem.title)}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#ef4444] px-4 py-3 text-xs font-extrabold text-white shadow-md transition hover:bg-[#dc2626]"
                >
                  <Trash size={16} />
                  <span>Remove Post</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="w-full rounded-full border border-[#dfe5e7] bg-white px-4 py-2.5 text-xs font-extrabold text-[#717182] transition hover:bg-[#f3f5f6] hover:text-[#19242a]"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Categories({ open, setOpen, category, setCategory }: { open: boolean; setOpen: (value: boolean) => void; category: string; setCategory: (value: string) => void }) {
  const [categories, setCategories] = useState(["Heart of Art", "Athletic Fanatics", "Chowdown", "Moves & Grooves", "Technut", "Trip and Tell"]);
  return (
    <section className="mt-7">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Service taxonomy</p>
          <h2 className="mt-1 text-2xl font-extrabold">Categories that organise discovery.</h2>
        </div>
        <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-[#1a1a28] px-4 py-2 text-xs font-extrabold text-white">
          Add category
        </button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {categories.map((item, index) => (
          <div key={item} className="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <p className="text-xs font-bold text-[#147c9e]">{12 + index * 4} active providers</p>
            <p className="mt-2 text-xl font-extrabold">{item}</p>
            <button type="button" className="mt-5 text-xs font-extrabold text-[#717182]">
              Edit category
            </button>
          </div>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5">
          <div className="w-full max-w-md bg-white p-7 shadow-2xl" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <button type="button" onClick={() => setOpen(false)} className="float-right">
              <X size={18} />
            </button>
            <h3 className="text-2xl font-extrabold">Add a category</h3>
            <input value={category} onChange={(event) => setCategory(event.target.value)} className="mt-6 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] px-4 py-3" placeholder="Category name" />
            <button
              type="button"
              onClick={() => {
                if (category.trim()) {
                  setCategories([...categories, category.trim()]);
                  setCategory("");
                  setOpen(false);
                }
              }}
              className="mt-5 rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white"
            >
              Save category
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function UsersPage({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  return (
    <Directory
      title="Platform users"
      rows={[
        { name: "Amelia Rose", role: "Platform admin", joined: "Jan 2024", state: "Active" },
        { name: "Julian Price", role: "Client manager", joined: "Feb 2024", state: "Active" },
        { name: "Sofia Reyes", role: "Vendor owner", joined: "Mar 2024", state: "Invite sent" },
      ]}
      query={query}
      setQuery={setQuery}
      columns={["Role", "Joined", "Status"]}
      values={(row) => [row.role, row.joined, row.state]}
    />
  );
}

function Reports() {
  return (
    <>
      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        <Stat label="Monthly bookings" value="1,842" detail="+16% from July" />
        <Stat label="Booking value" value="£126k" detail="+11% from July" />
        <Stat label="Engaged users" value="4,286" detail="61% of active base" />
      </section>
      <section className="mt-7 bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Marketplace trend</p>
        <h2 className="mt-1 text-2xl font-extrabold">Bookings have a healthy upward curve.</h2>
        <div className="mt-8 flex h-44 items-end gap-4">
          {[42, 58, 64, 72, 89, 78].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-[12px] bg-[#33c4f0]" style={{ height: `${height}%` }} />
              <span className="text-[10px] font-bold text-[#717182]">W{index + 1}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Audit() {
  return (
    <section className="mt-7">
      <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">System history</p>
      <h2 className="mt-1 text-2xl font-extrabold">A clear record of important actions.</h2>
      <div className="mt-5 bg-white p-2 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
        {auditRows.map((row) => (
          <div key={`${row.time}-${row.target}`} className="flex items-start gap-4 border-b border-[#33c4f0]/10 p-4 last:border-0">
            <span className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-[#e8f9ff] text-[#147c9e]">
              <Activity size={15} />
            </span>
            <div className="flex-1">
              <p className="text-sm">
                <strong>{row.actor}</strong> {row.action} <strong>{row.target}</strong>
              </p>
              <p className="mt-1 text-xs text-[#717182]">{row.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
      <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">{label}</p>
      <p className="mt-3 text-3xl font-extrabold">{value}</p>
      <p className="mt-2 text-xs font-bold text-[#147c9e]">{detail}</p>
    </div>
  );
}

function AdminAside({ section }: { section: Section }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-8 space-y-5">
        <div className="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Platform health</p>
          <p className="mt-3 text-3xl font-extrabold">98.7%</p>
          <p className="mt-2 text-sm leading-6 text-[#717182]">All core marketplace systems are operating normally.</p>
        </div>
        <div className="border border-[#dfe5e7] bg-[#edf4f5] p-5" style={{ borderRadius: "20px 20px 64px 20px" }}>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#536f76]">Admin cue</p>
          <p className="mt-2 text-xl font-extrabold leading-tight">{section === "content" ? "Review posted vendor contents." : section === "vendors" ? "Review Cocoa Collective." : "Keep an eye on the attention queue."}</p>
          <p className="mt-3 text-sm leading-6 text-[#4f7180]">Small, timely actions keep the client and vendor experience feeling trustworthy.</p>
        </div>
      </div>
    </aside>
  );
}
