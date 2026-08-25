import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { RoleSwitcher } from "@/app/components/layout/RoleSwitcher";
import { ChartBar as BarChart3, CalendarBlank as CalendarDays, Check, CaretRight as ChevronRight, Image as ImageIcon, SquaresFour as LayoutDashboard, SignOut as LogOut, Package as PackageOpen, Plus, PaperPlaneRight as Send, Gear as Settings, Sparkle as Sparkles, X, Images as PhotosIcon } from "@phosphor-icons/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { samplePostsData, type PostData } from "@/app/data/postsData";
import logoIcon from "@/imports/Logo.png";

const sampleImages = [
  "https://images.unsplash.com/photo-1510832842230-87253f48d74f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80"
];

export function VendorContentStudio() {
  const navigate = useNavigate();
  const [content, setContent] = useState<PostData[]>(samplePostsData.filter((p) => ["watercolour", "behind-scenes", "team-story"].includes(p.id)));
  const [composer, setComposer] = useState(false);
  const [created, setCreated] = useState(false);
  const [selectedImgs, setSelectedImgs] = useState<string[]>([sampleImages[0], sampleImages[1]]);

  function publishDraft(id: string) {
    setContent((items) =>
      items.map((item) =>
        item.id === id ? { ...item, label: "Scheduled", date: "Fri, Aug 9 · 10:00 AM" } : item
      )
    );
  }

  function toggleImageSelection(imgUrl: string) {
    setSelectedImgs((current) =>
      current.includes(imgUrl)
        ? current.filter((url) => url !== imgUrl)
        : [...current, imgUrl]
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#33c4f0]/15 bg-white/90 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex">
        <Link to="/" title="CreativeSelf Home" aria-label="CreativeSelf Home" className="grid h-10 w-10 place-items-center transition-transform hover:scale-105">
          <ImageWithFallback src={logoIcon} alt="CreativeSelf Logo" className="h-full w-full object-contain" />
        </Link>
        <nav className="mt-10 flex flex-col gap-3" aria-label="Vendor navigation">
          <Link to="/vendor" title="Overview" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff]">
            <LayoutDashboard size={18} />
          </Link>
          <Link to="/vendor/services" title="Services" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff]">
            <PackageOpen size={18} />
          </Link>
          <Link to="/vendor/content" title="Content studio" className="grid h-10 w-10 place-items-center rounded-full bg-[#33c4f0] text-[#1a1a28]">
            <ImageIcon size={18} />
          </Link>
          <Link to="/vendor/bookings" title="Bookings" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff]">
            <CalendarDays size={18} />
          </Link>
          <Link to="/vendor/insights" title="Insights" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff]">
            <BarChart3 size={18} />
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <button type="button" title="Settings" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff]">
            <Settings size={18} />
          </button>
          <Link to="/" title="Log out" className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#1a1a28] hover:text-white">
            <LogOut size={18} />
          </Link>
          <RoleSwitcher activeRole="vendor" />
        </div>
      </aside>

      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]">
        <aside className="hidden lg:block">
          <div className="sticky top-8 overflow-hidden bg-[#15343d] p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <p className="text-xs font-bold uppercase tracking-[.14em] text-white/45">Studio Lumen</p>
            <div className="mt-5 grid h-16 w-16 place-items-center rounded-[22px_22px_32px_22px] bg-[#ef4444] text-3xl">🎨</div>
            <p className="mt-5 text-2xl font-extrabold">Content studio</p>
            <p className="mt-3 text-sm leading-6 text-white/65">The stories, images, and invitations clients discover in their wellbeing feed.</p>
            <button type="button" onClick={() => { setComposer(true); setCreated(false); }} className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-extrabold text-[#1a1a28]">
              <Plus size={15} />Create post
            </button>
            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="text-xs font-bold text-white/45">POSTING RHYTHM</p>
              <p className="mt-2 text-sm font-bold">2 posts ready this week</p>
            </div>
          </div>
        </aside>

        <main>
          <header className="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">Client feed content</p>
                <h1 className="mt-2 text-3xl font-extrabold leading-tight">Give teams a reason to stop scrolling.</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#717182]">Create the posts, media, and service stories that appear in your client discovery feed.</p>
              </div>
              <button type="button" onClick={() => { setComposer(true); setCreated(false); }} className="inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-4 py-3 text-xs font-extrabold text-white">
                <Plus size={16} />New post
              </button>
            </div>
          </header>

          <section className="mt-6 overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-white/45">Feed impact</p>
                <p className="mt-1 text-lg font-extrabold">Your stories are helping teams discover you.</p>
              </div>
              <span className="rounded-full bg-[#33c4f0] px-3 py-2 text-xs font-extrabold text-[#1a1a28]">Last 30 days</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px_20px_64px_20px] border border-white/10 bg-white/[.07] p-4">
                <p className="text-2xl font-extrabold text-[#33c4f0]">1,248</p>
                <p className="mt-1 text-xs font-bold">Post impressions</p>
              </div>
              <div className="rounded-[20px_20px_64px_20px] border border-white/10 bg-white/[.07] p-4">
                <p className="text-2xl font-extrabold text-[#33c4f0]">86</p>
                <p className="mt-1 text-xs font-bold">Service taps</p>
              </div>
              <div className="rounded-[20px_20px_64px_20px] border border-white/10 bg-white/[.07] p-4">
                <p className="text-2xl font-extrabold text-[#33c4f0]">11</p>
                <p className="mt-1 text-xs font-bold">Bookings influenced</p>
              </div>
            </div>
          </section>

          <section className="mt-7">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Content queue</p>
                <h2 className="mt-1 text-2xl font-extrabold">What clients will see next</h2>
              </div>
              <p className="text-sm font-bold text-[#717182]">{content.length} posts</p>
            </div>

            <div className="space-y-4">
              {content.map((post) => {
                const imgCount = post.images ? post.images.length : post.image ? 1 : 0;
                return (
                  <article
                    key={post.id}
                    onClick={() => navigate(`/vendor/posts/${post.id}`)}
                    className="group cursor-pointer overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)] transition duration-300 hover:shadow-[0_18px_48px_rgba(28,118,155,.12)]"
                    style={{ borderRadius: "20px 20px 64px 20px" }}
                  >
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                      <div className="relative h-40 w-full sm:h-32 sm:w-44 shrink-0 overflow-hidden rounded-[16px_16px_36px_16px] bg-gray-100">
                        <ImageWithFallback
                          src={post.images?.[0] || post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a28]/60 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-2 grid h-8 w-8 place-items-center rounded-xl bg-white/90 text-lg shadow-sm backdrop-blur">
                          {post.emoji}
                        </span>
                        <span
                          className="absolute top-2 right-2 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase text-white backdrop-blur shadow-sm"
                          style={{
                            background:
                              post.label === "Published"
                                ? "#10b981"
                                : post.label === "Scheduled"
                                ? "#33c4f0"
                                : "#f59e0b",
                          }}
                        >
                          {post.label}
                        </span>

                        {imgCount > 1 && (
                          <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-[#1a1a28]/80 px-2 py-0.5 text-[10px] font-extrabold text-white backdrop-blur">
                            <PhotosIcon size={12} />
                            {imgCount}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs font-extrabold uppercase tracking-[.14em]" style={{ color: post.color }}>
                            {post.label} · {post.date}
                          </p>
                          <span className="rounded-full bg-[#f2fbfe] px-3 py-1.5 text-[11px] font-bold text-[#147c9e]">
                            {post.service}
                          </span>
                        </div>

                        <h3 className="mt-2 text-lg font-extrabold text-[#1a1a28] transition group-hover:text-[#147c9e]">
                          {post.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#717182] line-clamp-2">
                          {post.copy}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {post.label === "Draft" ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                publishDraft(post.id);
                              }}
                              className="rounded-full bg-[#1a1a28] px-4 py-2 text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
                            >
                              Schedule post
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/vendor/posts/${post.id}`);
                              }}
                              className="rounded-full border border-[#33c4f0]/25 px-4 py-2 text-xs font-extrabold text-[#1a1a28] transition hover:bg-[#e8f9ff]"
                            >
                              Edit post
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/vendor/posts/${post.id}`);
                            }}
                            className="rounded-full border border-[#33c4f0]/25 px-4 py-2 text-xs font-extrabold text-[#1a1a28] transition hover:bg-[#e8f9ff]"
                          >
                            View Post Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-5">
            <div className="bg-white p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]" style={{ borderRadius: "20px 20px 64px 20px" }}>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-[#717182]">Media library</p>
              <p className="mt-3 text-3xl font-extrabold">24</p>
              <p className="mt-2 text-sm leading-6 text-[#717182]">Images and visual assets ready to use in your next story.</p>
              <button type="button" className="mt-5 inline-flex items-center gap-1 text-xs font-extrabold text-[#147c9e]">
                Browse media <ChevronRight size={14} />
              </button>
            </div>

            <div className="border border-[#33c4f0]/18 bg-[#e8f9ff] p-5" style={{ borderRadius: "20px 20px 64px 20px" }}>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-[#147c9e]">Acumen cue</p>
              <p className="mt-2 text-xl font-extrabold leading-tight">Behind-the-scenes posts invite more taps.</p>
              <p className="mt-3 text-sm leading-6 text-[#4f7180]">Share a process image or a guest-made piece to help teams picture the experience.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Composer Modal */}
      {composer && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-xl bg-white p-7 shadow-2xl" style={{ borderRadius: "20px 20px 64px 20px" }}>
            <button
              type="button"
              onClick={() => setComposer(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe]"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {created ? (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#10b981]/15">
                  <Check className="text-[#10b981]" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold">Post saved to your queue.</h2>
                <p className="mt-3 text-sm leading-6 text-[#717182]">It is ready to schedule for the client feed.</p>
                <button
                  type="button"
                  onClick={() => setComposer(false)}
                  className="mt-7 rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white"
                >
                  Back to content
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#147c9e]">New feed post</p>
                <h2 className="mt-2 text-3xl font-extrabold">Make the moment feel real.</h2>

                <input
                  className="mt-7 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] px-4 py-3 text-sm"
                  placeholder="Post headline"
                />

                <textarea
                  className="mt-4 min-h-28 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] p-4 text-sm"
                  placeholder="Tell teams why this experience is worth making time for."
                />

                {/* Multi-Photo Attachment Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#717182]">
                      Attach photos ({selectedImgs.length} selected)
                    </p>
                    <span className="text-xs text-[#147c9e]">Click to select multiple</span>
                  </div>

                  <div className="flex gap-2.5 overflow-x-auto pb-2">
                    {sampleImages.map((imgUrl, index) => {
                      const isSelected = selectedImgs.includes(imgUrl);
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => toggleImageSelection(imgUrl)}
                          className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                            isSelected
                              ? "border-[#33c4f0] scale-105 shadow-md"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <ImageWithFallback src={imgUrl} alt={`Photo option ${index + 1}`} className="h-full w-full object-cover" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#33c4f0]/30 grid place-items-center">
                              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#33c4f0] text-white text-xs font-bold shadow">
                                ✓
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (selectedImgs.length > 0) {
                      const newPost: PostData = {
                        id: `post-${Date.now()}`,
                        label: "Draft",
                        date: "Just created",
                        title: "New Story Moment",
                        copy: "A fresh post for client feed discovery.",
                        service: "Watercolour without perfection",
                        color: "#33c4f0",
                        emoji: "✨",
                        image: selectedImgs[0],
                        images: selectedImgs,
                        provider: "Studio Lumen",
                        handle: "@studiolumen",
                        category: "Story Moment",
                        duration: "60 min",
                        seats: "15 guests",
                        likes: 0,
                        comments: 0,
                      };
                      setContent([newPost, ...content]);
                    }
                    setCreated(true);
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-6 py-3 text-sm font-extrabold text-white"
                >
                  <Send size={16} />
                  Save to queue ({selectedImgs.length} photos)
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


