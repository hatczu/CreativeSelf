import { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router";
import { UniversalSidebar } from "../components/layout/UniversalSidebar";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getPostById, samplePostsData, type PostData } from "../data/postsData";
import {
  ArrowLeft,
  CalendarBlank as CalendarDays,
  Check,
  CaretLeft as ChevronLeft,
  CaretRight as ChevronRight,
  Heart,
  ChatCircle as MessageCircle,
  PaperPlaneRight as Send,
  BookmarkSimple as Bookmark,
  ShareNetwork as Share,
  Sparkle as Sparkles,
  Users,
  ShieldCheck,
  Clock,
  Images as PhotosIcon,
  Eye,
  CursorClick,
} from "@phosphor-icons/react";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isVendorView = pathname.startsWith("/vendor");
  const isCorporateView = pathname.startsWith("/corporate");

  const post = getPostById(postId || "") || samplePostsData[0];
  const allImages = post.images && post.images.length > 0 ? post.images : post.image ? [post.image] : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Thu, Aug 8");
  const [teamSize, setTeamSize] = useState("15 people");
  const [bookingSent, setBookingSent] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState(post.commentsList || []);

  const brandColor = post.color || "#33C4F0";

  const handleNextPhoto = () => {
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrevPhoto = () => {
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleLikeToggle = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentsList([
      ...commentsList,
      {
        id: `comment-${Date.now()}`,
        user: "Alex Rivera",
        avatar: "🎭",
        time: "Just now",
        text: newComment.trim(),
      },
    ]);
    setNewComment("");
  };

  const backUrl = isVendorView
    ? "/vendor/content"
    : isCorporateView
    ? "/corporate"
    : "/dashboard";

  const backLabel = isVendorView
    ? "Back to Content Studio"
    : isCorporateView
    ? "Back to Team Marketplace"
    : "Back to Wellbeing Feed";

  return (
    <div
      className="min-h-screen bg-[#F8FCFF] text-[#1A1A28]"
      style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}
    >
      <UniversalSidebar />

      <div className="mx-auto max-w-[1380px] px-4 py-8 pb-16 lg:px-8 lg:py-10 lg:pl-[84px]">
        {/* Top Back Navigation Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(backUrl)}
            className="inline-flex items-center gap-2 rounded-full border border-[#33C4F0]/25 bg-white px-5 py-2.5 text-xs font-extrabold text-[#1A1A28] shadow-sm transition hover:bg-[#E8F9FF] hover:border-[#33C4F0]"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#717182]">
            <span>Feed Post</span>
            <span>/</span>
            <span style={{ color: brandColor }}>{post.category}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div
          className="relative overflow-hidden bg-white p-6 shadow-[0_16px_48px_rgba(28,118,155,.08)] sm:p-8 lg:p-10"
          style={{ borderRadius: "24px 24px 64px 24px" }}
        >
          {/* Category & Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="grid h-12 w-12 place-items-center rounded-2xl text-2xl shadow-sm"
                style={{ background: `${brandColor}18` }}
              >
                {post.emoji}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-[#1A1A28]">{post.provider}</span>
                  <span className="text-xs font-medium text-[#717182]">{post.handle}</span>
                  <ShieldCheck size={16} className="text-[#33C4F0]" />
                </div>
                <p className="text-xs text-[#717182] mt-0.5">{post.date}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider"
                style={{ background: `${brandColor}15`, color: brandColor }}
              >
                {post.category}
              </span>
              {post.label && (
                <span
                  className="rounded-full px-3 py-1 text-xs font-extrabold uppercase text-white shadow-sm"
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
              )}
            </div>
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A28] leading-tight">
            {post.title}
          </h1>

          {/* Featured Multi-Photo Interactive Carousel */}
          {allImages.length > 0 && (
            <div className="mt-8">
              <div
                className="relative h-[340px] sm:h-[460px] lg:h-[540px] w-full overflow-hidden bg-gray-100 shadow-lg"
                style={{ borderRadius: "20px 20px 48px 20px" }}
              >
                <ImageWithFallback
                  src={allImages[activeImageIndex]}
                  alt={`${post.title} photo ${activeImageIndex + 1}`}
                  className="h-full w-full object-cover transition-all duration-500 hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A28]/50 via-transparent to-transparent pointer-events-none" />

                {/* Photo Badge */}
                {allImages.length > 1 && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-[#1A1A28]/80 px-4 py-1.5 text-xs font-extrabold text-white backdrop-blur-md shadow-md">
                    <PhotosIcon size={16} />
                    <span>
                      Photo {activeImageIndex + 1} of {allImages.length}
                    </span>
                  </div>
                )}

                {/* Carousel Arrow Navigation */}
                {allImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[#1A1A28] shadow-lg backdrop-blur-md transition hover:bg-white hover:scale-110"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      type="button"
                      onClick={handleNextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[#1A1A28] shadow-lg backdrop-blur-md transition hover:bg-white hover:scale-110"
                      aria-label="Next photo"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Clickable Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {allImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                        activeImageIndex === idx
                          ? "border-[#33C4F0] scale-105 shadow-md"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <ImageWithFallback src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content Layout Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left Column: Post Story & Album */}
          <div className="space-y-8">
            {/* Story Card */}
            <div
              className="bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              <h2 className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33C4F0]">
                The Story Behind the Session
              </h2>
              <p className="mt-3 text-lg font-bold text-[#1A1A28] leading-relaxed">
                {post.copy}
              </p>

              {post.fullStory && (
                <div className="mt-5 whitespace-pre-line text-sm sm:text-base leading-relaxed text-[#525266]">
                  {post.fullStory}
                </div>
              )}

              {/* Tags / Details Bar */}
              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[#33C4F0]/15 pt-5 text-xs font-extrabold">
                {post.duration && (
                  <span className="rounded-full bg-[#F2FBFE] px-4 py-2.5 text-[#147C9E] flex items-center gap-2">
                    <Clock size={16} />
                    {post.duration}
                  </span>
                )}
                {post.seats && (
                  <span className="rounded-full bg-[#F2FBFE] px-4 py-2.5 text-[#147C9E] flex items-center gap-2">
                    <Users size={16} />
                    {post.seats}
                  </span>
                )}
                {post.service && (
                  <span className="rounded-full bg-[#E8F9FF] px-4 py-2.5 text-[#147C9E]">
                    🎨 Service: {post.service}
                  </span>
                )}
              </div>
            </div>

            {/* Session Highlights Card */}
            {post.highlights && post.highlights.length > 0 && (
              <div
                className="bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
                style={{ borderRadius: "20px 20px 64px 20px" }}
              >
                <h3 className="text-xs font-extrabold uppercase tracking-[.18em] text-[#147C9E]">
                  What Makes This Experience Special
                </h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {post.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-2xl bg-[#F8FCFF] p-4 border border-[#33C4F0]/15"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#10B981]/15 text-[#087E58]">
                        <Check size={14} />
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1A1A28] leading-snug">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Album Mosaic Grid */}
            {allImages.length > 1 && (
              <div
                className="bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
                style={{ borderRadius: "20px 20px 64px 20px" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33C4F0]">
                      Photo Gallery
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold text-[#1A1A28]">
                      A Glimpse Into the Moment
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#E8F9FF] px-3.5 py-1.5 text-xs font-extrabold text-[#147C9E]">
                    {allImages.length} Photos
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {allImages.map((imgUrl, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className="group cursor-pointer overflow-hidden rounded-2xl bg-gray-100 h-52 relative"
                    >
                      <ImageWithFallback
                        src={imgUrl}
                        alt={`Gallery photo ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#1A1A28]/20 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
                        <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-extrabold text-[#1A1A28] shadow-md backdrop-blur">
                          View Photo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement & Community Bar */}
            <div
              className="bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)] flex flex-wrap items-center justify-between gap-4"
              style={{ borderRadius: "20px 20px 48px 20px" }}
            >
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={handleLikeToggle}
                  className="flex items-center gap-2 text-sm font-extrabold transition hover:scale-105"
                  style={{ color: liked ? brandColor : "#717182" }}
                >
                  <Heart size={22} fill={liked ? brandColor : "none"} />
                  <span>{likesCount} Likes</span>
                </button>

                <div className="flex items-center gap-2 text-sm font-bold text-[#717182]">
                  <MessageCircle size={22} />
                  <span>{commentsList.length} Comments</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSaved(!saved)}
                  className="flex items-center gap-2 rounded-full border border-[#33C4F0]/25 px-4 py-2 text-xs font-extrabold text-[#1A1A28] transition hover:bg-[#E8F9FF]"
                  style={{ color: saved ? brandColor : "#1A1A28" }}
                >
                  <Bookmark size={16} />
                  {saved ? "Saved" : "Save Experience"}
                </button>
                <button
                  type="button"
                  onClick={() => alert("Post link copied to clipboard!")}
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#F2FBFE] text-[#147C9E] hover:bg-[#E8F9FF] transition"
                  title="Share"
                >
                  <Share size={18} />
                </button>
              </div>
            </div>

            {/* Comments Thread Section */}
            <div
              className="bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(28,118,155,.07)] space-y-6"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              <h3 className="text-xl font-extrabold text-[#1A1A28]">
                Team Discussion ({commentsList.length})
              </h3>

              <div className="space-y-4">
                {commentsList.map((comm) => (
                  <div key={comm.id} className="flex items-start gap-3 rounded-2xl bg-[#F8FCFF] p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#33C4F0]/15 text-lg">
                      {comm.avatar}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-extrabold text-[#1A1A28]">{comm.user}</p>
                        <span className="text-xs text-[#717182]">{comm.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-[#525266]">{comm.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="flex gap-3 pt-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your thoughts or ask a question..."
                  className="flex-1 rounded-full border border-[#33C4F0]/25 bg-[#F9FDFF] px-5 py-3 text-sm text-[#1A1A28] placeholder:text-[#717182] focus:outline-none focus:border-[#33C4F0]"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="rounded-full bg-[#1A1A28] px-6 py-3 text-xs font-extrabold text-white transition hover:bg-[#33C4F0] hover:text-[#1A1A28] disabled:opacity-40"
                >
                  Post
                </button>
              </form>
            </div>
          </div>

          {/* Right Sticky Sidebar Column */}
          <div className="space-y-6 lg:sticky lg:top-8 h-fit">
            {/* Provider Spotlight Card */}
            <div
              className="bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#717182]">
                Provider Profile
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl text-2xl shadow-sm"
                  style={{ background: `${brandColor}18` }}
                >
                  {post.emoji}
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-[#1A1A28]">{post.provider}</h4>
                  <p className="text-xs text-[#717182]">{post.authorRole || post.handle}</p>
                </div>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-[#717182] leading-relaxed">
                Trusted CreativeSelf partner providing curated wellbeing experiences for teams.
              </p>
              <Link
                to="/discover/providers"
                className="mt-5 inline-flex w-full items-center justify-center gap-1 rounded-full border border-[#33C4F0]/30 py-3 text-xs font-extrabold text-[#147C9E] transition hover:bg-[#E8F9FF]"
              >
                View Provider Profile
              </Link>
            </div>

            {/* Action Card: Client Booking or Vendor Management */}
            {!isVendorView ? (
              <div
                className="overflow-hidden bg-[#1A1A28] p-6 text-white shadow-2xl border-2 border-[#33C4F0]/40 relative"
                style={{ borderRadius: "20px 20px 64px 20px" }}
              >
                {bookingSent ? (
                  <div className="py-6 text-center">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#10B981]/20 text-[#10B981]">
                      <Check size={28} />
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold">Booking Request Sent!</h3>
                    <p className="mt-2 text-xs text-white/70">
                      {post.provider} will confirm availability for {selectedDate}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBookingSent(false)}
                      className="mt-5 rounded-full bg-[#33C4F0] px-5 py-2.5 text-xs font-extrabold text-[#1A1A28]"
                    >
                      Book Another Slot
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33C4F0]">
                        Book Experience
                      </p>
                      <span className="rounded-full bg-[#33C4F0]/20 px-3 py-1 text-[10px] font-extrabold text-[#33C4F0]">
                        Instant Request
                      </span>
                    </div>

                    <h3 className="mt-2 text-2xl font-extrabold">Book this session</h3>
                    <p className="mt-1 text-xs text-white/70 leading-relaxed">
                      Select your preferred date & team size to confirm availability.
                    </p>

                    <label className="mt-5 block text-xs font-extrabold text-white/70">
                      PREFERRED DATE
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Thu, Aug 8", "Tue, Aug 13", "Fri, Aug 16"].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className="rounded-full px-3.5 py-2 text-xs font-bold transition"
                          style={{
                            background: selectedDate === d ? brandColor : "rgba(255,255,255,0.1)",
                            color: selectedDate === d ? "#1A1A28" : "#ffffff",
                          }}
                        >
                          {d}
                        </button>
                      ))}
                    </div>

                    <label className="mt-4 block text-xs font-extrabold text-white/70">
                      ESTIMATED TEAM SIZE
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white focus:outline-none"
                    >
                      <option className="text-[#1A1A28]">10 people</option>
                      <option className="text-[#1A1A28]">15 people</option>
                      <option className="text-[#1A1A28]">25 people</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => setBookingSent(true)}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold text-white shadow-xl transition hover:scale-[1.02] active:scale-[0.98]"
                      style={{ background: brandColor }}
                    >
                      <Send size={18} />
                      {isCorporateView ? "Book for Team Now" : "Book Experience Now"}
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div
                className="bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)] space-y-4"
                style={{ borderRadius: "20px 20px 64px 20px" }}
              >
                <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33C4F0]">
                  Content Performance
                </p>
                <h3 className="text-xl font-extrabold text-[#1A1A28]">Provider Stats</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#F8FCFF] p-3 border border-[#33C4F0]/15">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#717182]">
                      <Eye size={14} /> Views
                    </div>
                    <p className="mt-1 text-xl font-extrabold text-[#1A1A28]">342</p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FCFF] p-3 border border-[#33C4F0]/15">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#717182]">
                      <CursorClick size={14} /> Taps
                    </div>
                    <p className="mt-1 text-xl font-extrabold text-[#1A1A28]">28</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/vendor/content")}
                  className="mt-2 w-full rounded-full bg-[#1A1A28] py-3 text-xs font-extrabold text-white transition hover:bg-[#33C4F0] hover:text-[#1A1A28]"
                >
                  Manage in Content Studio
                </button>
              </div>
            )}

            {/* Acumen AI Recommendation Cue */}
            <div
              className="border border-[#33C4F0]/25 bg-[#E8F9FF] p-6 text-[#1A1A28]"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#147C9E]">
                <Sparkles size={16} />
                Acumen AI Wellbeing Insight
              </div>
              <p className="mt-2 text-base font-extrabold leading-snug">
                Sessions like this boost team morale by 34%.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#4F7180]">
                Mid-week creative breaks help prevent cognitive overload and encourage cross-functional bonding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
