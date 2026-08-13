import { useState } from "react";
import {
  X,
  CaretLeft as ChevronLeft,
  CaretRight as ChevronRight,
  Heart,
  ChatCircle as MessageCircle,
  CalendarBlank as CalendarDays,
  Check,
  PaperPlaneRight as Send,
  BookmarkSimple as Bookmark,
} from "@phosphor-icons/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export type PostItem = {
  id: string;
  provider?: string;
  handle?: string;
  category?: string;
  title: string;
  copy: string;
  date?: string;
  duration?: string;
  seats?: string;
  color?: string;
  emoji?: string;
  likes?: number;
  comments?: number;
  images?: string[];
  image?: string;
  service?: string;
  label?: string;
  featured?: boolean;
};

interface PostDetailModalProps {
  post: PostItem;
  onClose: () => void;
  onBook?: (post: PostItem) => void;
  isVendorView?: boolean;
  hrMode?: boolean;
  onLikeToggle?: (postId: string) => void;
  isLiked?: boolean;
  onSaveToggle?: (postId: string) => void;
  isSaved?: boolean;
}

export function PostDetailModal({
  post,
  onClose,
  onBook,
  isVendorView = false,
  hrMode = false,
  onLikeToggle,
  isLiked = false,
  onSaveToggle,
  isSaved = false,
}: PostDetailModalProps) {
  // Normalize images array
  const allImages = post.images && post.images.length > 0 
    ? post.images 
    : post.image ? [post.image] : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const brandColor = post.color || "#33C4F0";

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/60 p-4 sm:p-6 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${post.title}`}
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-2xl bg-white p-6 sm:p-8 shadow-2xl overflow-hidden transition-all"
        style={{ borderRadius: "24px 24px 64px 24px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full bg-[#f2fbfe] text-[#1a1a28] hover:bg-[#e2f5fc] transition"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        {/* Header: Provider & Category */}
        <div className="flex items-center gap-3 pr-12">
          {post.emoji && (
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl shadow-sm"
              style={{ background: `${brandColor}18` }}
            >
              {post.emoji}
            </span>
          )}
          <div className="min-w-0 flex-1">
            {post.provider && (
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-extrabold text-[#1a1a28]">{post.provider}</h3>
                {post.handle && (
                  <span className="text-xs font-medium text-[#717182]">{post.handle}</span>
                )}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              {post.category && (
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider"
                  style={{ background: `${brandColor}15`, color: brandColor }}
                >
                  {post.category}
                </span>
              )}
              {post.label && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-white shadow-sm"
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
              {post.date && (
                <span className="text-xs font-semibold text-[#717182]">
                  {post.date}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Multi-Photo Gallery Section */}
        {allImages.length > 0 && (
          <div className="mt-6">
            <div
              className="relative h-64 sm:h-80 w-full overflow-hidden bg-gray-100 shadow-inner"
              style={{ borderRadius: "20px 20px 40px 20px" }}
            >
              <ImageWithFallback
                src={allImages[activeImageIndex]}
                alt={`${post.title} photo ${activeImageIndex + 1}`}
                className="h-full w-full object-cover transition-opacity duration-300"
              />
              
              {/* Photo Counter Badge */}
              {allImages.length > 1 && (
                <div className="absolute top-3 right-3 rounded-full bg-[#1a1a28]/70 px-3 py-1 text-xs font-extrabold text-white backdrop-blur-md">
                  📷 {activeImageIndex + 1} / {allImages.length}
                </div>
              )}

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-[#1a1a28] shadow-md backdrop-blur hover:bg-white hover:scale-105 transition"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-[#1a1a28] shadow-md backdrop-blur hover:bg-white hover:scale-105 transition"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {allImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      activeImageIndex === index
                        ? "border-[#33c4f0] scale-105 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <ImageWithFallback
                      src={imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Post Title & Full Copy */}
        <div className="mt-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a28] leading-tight">
            {post.title}
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#525266]">
            {post.copy}
          </p>

          {/* Details / Tags */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold text-[#717182]">
            {post.duration && (
              <span className="rounded-full bg-[#f2fbfe] px-3.5 py-2 text-[#147c9e] flex items-center gap-1.5">
                <CalendarDays size={15} />
                {post.duration}
              </span>
            )}
            {post.seats && (
              <span className="rounded-full bg-[#f2fbfe] px-3.5 py-2 text-[#147c9e]">
                {post.seats}
              </span>
            )}
            {post.service && (
              <span className="rounded-full bg-[#e8f9ff] px-3.5 py-2 text-[#147c9e]">
                Linked Service: {post.service}
              </span>
            )}
          </div>
        </div>

        {/* Engagement & Actions Footer */}
        <div className="mt-8 pt-5 border-t border-[#33c4f0]/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {onLikeToggle && (
              <button
                type="button"
                onClick={() => onLikeToggle(post.id)}
                className="flex items-center gap-2 text-xs font-extrabold transition hover:scale-105"
                style={{ color: isLiked ? brandColor : "#717182" }}
              >
                <Heart size={20} fill={isLiked ? brandColor : "none"} />
                <span>{(post.likes ?? 0) + (isLiked ? 1 : 0)} Likes</span>
              </button>
            )}

            {post.comments !== undefined && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#717182]">
                <MessageCircle size={20} />
                <span>{post.comments} Comments</span>
              </div>
            )}

            {onSaveToggle && (
              <button
                type="button"
                onClick={() => onSaveToggle(post.id)}
                className="flex items-center gap-1.5 text-xs font-bold transition hover:opacity-80"
                style={{ color: isSaved ? brandColor : "#717182" }}
              >
                {isSaved ? <Check size={18} /> : <Bookmark size={18} />}
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {!isVendorView && onBook ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBook(post);
                }}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg transition hover:scale-105"
                style={{ background: brandColor }}
              >
                <Send size={16} />
                {hrMode ? "Book for team" : "Book experience"}
              </button>
            ) : isVendorView ? (
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#1a1a28] px-6 py-3 text-xs sm:text-sm font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28]"
              >
                Close Preview
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
