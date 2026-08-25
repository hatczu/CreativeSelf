import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { UniversalSidebar } from "@/app/components/layout/UniversalSidebar";
import { samplePostsData, type PostData } from "@/app/data/postsData";
import {
  CalendarBlank as CalendarDays,
  Check,
  CaretRight as ChevronRight,
  Heart,
  ChatCircle as MessageCircle,
  Plus,
  MagnifyingGlass as Search,
  PaperPlaneRight as Send,
  X,
  Images as PhotosIcon,
} from "@phosphor-icons/react";

const filters = ["For your team", "Movement", "Creative reset", "Learning", "Food & connection"];

export function WellnessFeed() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hrMode = pathname.startsWith("/corporate");
  const [filter, setFilter] = useState(filters[0]);
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [composerOpen, setComposerOpen] = useState(false);
  const [providerTitle, setProviderTitle] = useState("");
  const [published, setPublished] = useState(false);
  const [bookingPost, setBookingPost] = useState<PostData | null>(null);
  const [date, setDate] = useState("Thu, Aug 8");
  const [bookingSent, setBookingSent] = useState(false);
  const [personalityOpen, setPersonalityOpen] = useState(false);

  const posts = samplePostsData.filter((p) => ["breathe", "colour", "rhythm", "food"].includes(p.id));

  const visiblePosts = useMemo(
    () =>
      filter === filters[0]
        ? posts
        : posts.filter((post) =>
            `${post.category} ${post.title}`.toLowerCase().includes(filter.split(" ")[0].toLowerCase())
          ),
    [filter, posts]
  );
  const feed = visiblePosts.length ? visiblePosts : posts.slice(0, 2);

  function closeBooking() {
    setBookingPost(null);
    setBookingSent(false);
  }

  function navigateToPostDetail(postId: string) {
    if (hrMode) {
      navigate(`/corporate/posts/${postId}`);
    } else {
      navigate(`/posts/${postId}`);
    }
  }

  return (
    <div
      className="min-h-screen bg-[#f7fcff] text-[#1a1a28]"
      style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}
    >
      <UniversalSidebar />

      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]">
        <aside className="hidden lg:block">
          <div
            className="sticky top-8 overflow-hidden bg-[#15343d] p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]"
            style={{ borderRadius: "20px 20px 64px 20px" }}
          >
            {!hrMode ? (
              <>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-white/45">
                  Your creative compass
                </p>
                <div className="mt-5 grid h-16 w-16 place-items-center rounded-[22px_22px_32px_22px] bg-[#33c4f0] text-3xl">
                  🧭
                </div>
                <p className="mt-5 text-2xl font-extrabold">The Explorer</p>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  New places, perspectives, and possibilities keep your creativity moving.
                </p>
                <button
                  type="button"
                  onClick={() => setPersonalityOpen(true)}
                  className="mt-6 inline-flex items-center gap-1 text-xs font-extrabold text-[#33c4f0]"
                >
                  View your profile <ChevronRight size={14} />
                </button>
                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="text-xs font-bold text-white/45">THIS MONTH</p>
                  <p className="mt-2 text-sm font-bold">2 sessions still to explore</p>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-white/45">
                  Team wellbeing
                </p>
                <p className="mt-5 text-2xl font-extrabold">The good kind of momentum.</p>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Discover sessions that make room for energy, connection, and fresh ideas.
                </p>
              </>
            )}
          </div>
        </aside>

        <main>
          <header
            className="mb-6 overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]"
            style={{ borderRadius: "20px 20px 64px 20px" }}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">
                  {hrMode ? "Team wellbeing marketplace" : "Your wellbeing feed"}
                </p>
                <h1 className="mt-2 text-3xl font-extrabold leading-tight">
                  {hrMode ? "Bring something good to the team." : "A little more you, today."}
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#717182]">
                  Fresh offers, ideas, and bookable sessions from trusted CreativeSelf providers.
                </p>
              </div>
              {hrMode && (
                <button
                  type="button"
                  onClick={() => {
                    setComposerOpen((open) => !open);
                    setPublished(false);
                  }}
                  className="shrink-0 rounded-full bg-[#1a1a28] p-3 text-white"
                  aria-label="Publish a post"
                >
                  <Plus size={18} />
                </button>
              )}
            </div>
            <div className="mt-5 inline-flex rounded-full bg-[#e8f9ff] px-4 py-2 text-xs font-bold text-[#147c9e]">
              Curated by Acumen AI
            </div>
          </header>

          {!hrMode && (
            <section
              className="mb-6 overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-white/45">
                    Your creative plan
                  </p>
                  <p className="mt-1 text-lg font-extrabold">
                    Advanced Creative{" "}
                    <span className="ml-2 rounded-full bg-[#33c4f0] px-2.5 py-1 text-[10px] text-[#1a1a28]">
                      Active
                    </span>
                  </p>
                </div>
                <p className="max-w-[13rem] text-right text-xs leading-5 text-white/50">
                  Your plan renews on 31 Aug.
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Link
                  to="/bookings"
                  className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 no-underline transition hover:bg-white/[.12]"
                >
                  <p className="text-2xl font-extrabold text-[#33c4f0]">2</p>
                  <p className="mt-1 text-xs font-bold text-white">Upcoming bookings</p>
                  <p className="mt-1 text-[11px] text-white/50">Next: Watercolour · Aug 8</p>
                </Link>
                <Link
                  to="/discover/services"
                  className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 no-underline transition hover:bg-white/[.12]"
                >
                  <p className="text-2xl font-extrabold text-[#33c4f0]">2</p>
                  <p className="mt-1 text-xs font-bold text-white">Services remaining</p>
                  <p className="mt-1 text-[11px] text-white/50">Use them before month end</p>
                </Link>
                <Link
                  to="/discover/providers"
                  className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 no-underline transition hover:bg-white/[.12]"
                >
                  <div className="flex -space-x-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#1a1a28] bg-[#ef4444]/70 text-xs">
                      🎨
                    </span>
                    <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#1a1a28] bg-[#10b981]/70 text-xs">
                      🧘
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-white">2 subscribed providers</p>
                  <p className="mt-1 text-[11px] text-white/50">
                    Heart of Art + Athletic Fanatics
                  </p>
                </Link>
              </div>
            </section>
          )}

          {composerOpen && (
            <section
              className="mb-6 bg-[#1a1a28] p-5 text-white"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              {published ? (
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#10b981]/20">
                    <Check className="text-[#10b981]" size={18} />
                  </span>
                  <div>
                    <p className="font-extrabold">Your provider post is live.</p>
                    <p className="mt-1 text-sm text-white/60">
                      HR teams can now discover it in their wellness feed.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-extrabold">Share a provider highlight</p>
                      <p className="mt-1 text-sm text-white/60">
                        Promote an activity, programme, or wellbeing insight to HR teams.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setComposerOpen(false)}
                      className="text-sm text-white/60"
                    >
                      Close
                    </button>
                  </div>
                  <input
                    value={providerTitle}
                    onChange={(event) => setProviderTitle(event.target.value)}
                    className="mt-5 w-full rounded-[14px_14px_36px_14px] border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40"
                    placeholder="What are you promoting?"
                  />
                  <div className="mt-3 flex flex-wrap gap-3">
                    <label className="cursor-pointer rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white/70">
                      <input type="file" accept="image/*" className="hidden" />
                      Add image
                    </label>
                    <button
                      type="button"
                      disabled={!providerTitle.trim()}
                      onClick={() => setPublished(true)}
                      className="rounded-full bg-[#33c4f0] px-4 py-2 text-xs font-extrabold text-[#1a1a28] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Publish to feed
                    </button>
                  </div>
                </>
              )}
            </section>
          )}

          <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className="shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition"
                style={{
                  background: filter === item ? "#1a1a28" : "#fff",
                  color: filter === item ? "#fff" : "#717182",
                  borderColor: filter === item ? "#1a1a28" : "rgba(51,196,240,.2)",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {feed.map((post) => {
              const isLiked = liked.includes(post.id);
              const isSaved = saved.includes(post.id);
              const postImages =
                post.images && post.images.length > 0
                  ? post.images
                  : post.image
                  ? [post.image]
                  : [];
              const coverImage = postImages[0] || post.image;

              return (
                <article
                  key={post.id}
                  onClick={() => navigateToPostDetail(post.id)}
                  className="cursor-pointer group overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,118,155,.07)] transition duration-300 hover:shadow-[0_18px_48px_rgba(28,118,155,.14)] hover:-translate-y-0.5"
                  style={{
                    borderRadius: post.featured
                      ? "20px 20px 96px 20px"
                      : "20px 20px 52px 20px",
                  }}
                >
                  <div className="flex items-center justify-between px-6 pt-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-11 w-11 place-items-center rounded-full text-xl"
                        style={{ background: `${post.color}18` }}
                      >
                        {post.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-extrabold group-hover:text-[#147c9e] transition">
                          {post.provider}
                        </p>
                        <p className="text-xs text-[#717182]">
                          {post.handle} · {post.category}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Save ${post.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSaved((current) =>
                          isSaved ? current.filter((id) => id !== post.id) : [...current, post.id]
                        );
                      }}
                      className="rounded-full p-2 hover:bg-[#f2fbfe] transition"
                      style={{ color: isSaved ? post.color : "#717182" }}
                    >
                      <Check size={18} />
                    </button>
                  </div>

                  {coverImage && (
                    <div
                      className="relative mx-6 mt-5 h-44 overflow-hidden bg-[#edf8fb] sm:h-52"
                      style={{ borderRadius: "20px 20px 48px 20px" }}
                    >
                      <img
                        src={coverImage}
                        alt={post.imageAlt ?? post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      {postImages.length > 1 && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[#1a1a28]/75 px-3 py-1 text-xs font-extrabold text-white backdrop-blur-md shadow-sm">
                          <PhotosIcon size={14} />
                          <span>{postImages.length} photos</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="px-6 pb-6 pt-5">
                    <p
                      className="text-xs font-extrabold uppercase tracking-[.15em]"
                      style={{ color: post.color }}
                    >
                      {post.date}
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold leading-tight transition group-hover:text-[#147c9e]">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#717182] line-clamp-2">
                      {post.copy}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#717182]">
                        <span className="rounded-full bg-[#f2fbfe] px-3 py-2">
                          <CalendarDays className="mr-1 inline" size={14} />
                          {post.duration}
                        </span>
                        <span className="rounded-full bg-[#f2fbfe] px-3 py-2">
                          {post.seats}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-[#33c4f0] opacity-0 group-hover:opacity-100 transition">
                        View post details →
                      </span>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLiked((current) =>
                              isLiked
                                ? current.filter((id) => id !== post.id)
                                : [...current, post.id]
                            );
                          }}
                          className="flex items-center gap-1.5 text-xs font-bold hover:opacity-80 transition"
                          style={{ color: isLiked ? post.color : "#717182" }}
                        >
                          <Heart size={17} fill={isLiked ? post.color : "none"} />
                          {post.likes + (isLiked ? 1 : 0)}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToPostDetail(post.id);
                          }}
                          className="flex items-center gap-1.5 text-xs font-bold text-[#717182] hover:text-[#1a1a28] transition"
                        >
                          <MessageCircle size={17} />
                          {post.comments}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToPostDetail(post.id);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full px-4.5 py-2 text-xs font-extrabold text-white transition hover:scale-105 shadow-md"
                        style={{ background: post.color }}
                      >
                        View post <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-5">
            <div
              className="border border-[#33c4f0]/15 bg-white/80 p-5 shadow-[0_10px_28px_rgba(28,118,155,.05)]"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              <div className="flex items-center gap-2 text-sm font-extrabold">
                <Search size={16} />
                Find your next reset
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-full border border-[#33c4f0]/25 px-4 py-3 text-left text-xs text-[#717182]"
              >
                Search providers & activities
              </button>
            </div>
            <div
              className="border border-[#33c4f0]/18 bg-[#e8f9ff] p-5 text-[#1a1a28]"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              <p className="text-xs font-bold uppercase tracking-[.14em] text-[#147c9e]">
                {hrMode ? "Team moment" : "Your next reset"}
              </p>
              <p className="mt-2 text-xl font-extrabold leading-tight">
                {hrMode
                  ? "Turn a good post into a booked team moment."
                  : "Save the ideas that feel like you."}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#4f7180]">
                Book without leaving your feed.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {personalityOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Your creative personality"
        >
          <div
            className="relative w-full max-w-lg overflow-hidden bg-white p-7 shadow-2xl sm:p-9"
            style={{ borderRadius: "20px 20px 64px 20px" }}
          >
            <button
              type="button"
              onClick={() => setPersonalityOpen(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe] text-[#1a1a28]"
              aria-label="Close personality profile"
            >
              <X size={18} />
            </button>
            <div className="grid h-16 w-16 place-items-center rounded-[22px_22px_32px_22px] bg-[#33c4f0] text-3xl">
              🧭
            </div>
            <p className="mt-7 text-xs font-extrabold uppercase tracking-[.16em] text-[#147c9e]">
              Your Acumen result
            </p>
            <h2 className="mt-2 text-4xl font-extrabold">The Explorer</h2>
            <p className="mt-4 text-base leading-7 text-[#717182]">
              You are drawn to the unfamiliar—the new route, the different point of view, the
              experience that changes the shape of a day.
            </p>
            <div className="mt-7 rounded-[20px_20px_64px_20px] bg-[#f2fbfe] p-5">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#147c9e]">
                Your energy grows through
              </p>
              <p className="mt-3 text-sm font-bold text-[#1a1a28]">
                Adventure · cultural discovery · hands-on learning
              </p>
            </div>
            <Link
              to="/discover/services"
              onClick={() => setPersonalityOpen(false)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-extrabold text-white no-underline"
            >
              Explore your matches <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      )}

      {bookingPost && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/45 p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Book an experience"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
            style={{ borderRadius: "20px 20px 64px 20px" }}
          >
            <button
              type="button"
              onClick={closeBooking}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe] text-[#1a1a28]"
              aria-label="Close booking"
            >
              <X size={18} />
            </button>
            {bookingSent ? (
              <div className="py-12 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#10b981]/15">
                  <Check className="text-[#10b981]" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold">Booking request sent.</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#717182]">
                  {bookingPost.provider} will confirm availability and follow up with next steps.
                </p>
                <button
                  type="button"
                  onClick={closeBooking}
                  className="mt-7 rounded-full bg-[#1a1a28] px-5 py-3 text-sm font-bold text-white"
                >
                  Return to feed
                </button>
              </div>
            ) : (
              <>
                <div className="pr-10">
                  <p
                    className="text-xs font-extrabold uppercase tracking-[.16em]"
                    style={{ color: bookingPost.color }}
                  >
                    Book a wellbeing experience
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold">{bookingPost.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#717182]">
                    {bookingPost.provider} · {bookingPost.duration} · {bookingPost.seats}
                  </p>
                </div>
                <label className="mt-7 block text-xs font-bold text-[#717182]">
                  PREFERRED DATE
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Thu, Aug 8", "Tue, Aug 13", "Fri, Aug 16"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDate(option)}
                      className="rounded-full px-4 py-3 text-sm font-bold"
                      style={{
                        background: date === option ? bookingPost.color : "#f2fbfe",
                        color: date === option ? "#fff" : "#1a1a28",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <label className="mt-7 block text-xs font-bold text-[#717182]">
                  TEAM SIZE
                </label>
                <select
                  className="mt-2 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] px-4 py-3 text-sm"
                  defaultValue="15 people"
                >
                  <option>10 people</option>
                  <option>15 people</option>
                  <option>25 people</option>
                </select>
                <label className="mt-6 block text-xs font-bold text-[#717182]">
                  NOTE FOR THE PROVIDER
                </label>
                <textarea
                  className="mt-2 min-h-24 w-full rounded-[16px_16px_40px_16px] border border-[#33c4f0]/25 bg-[#f9fdff] p-4 text-sm"
                  placeholder="Tell them a little about your team and preferred format."
                />
                <button
                  type="button"
                  onClick={() => setBookingSent(true)}
                  className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold text-white"
                  style={{ background: bookingPost.color }}
                >
                  <Send size={16} />
                  Send booking request
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
