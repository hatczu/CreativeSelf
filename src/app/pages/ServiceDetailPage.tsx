import { useState } from "react";
import { Link, useParams } from "react-router";
import { RoleSwitcher } from "../components/layout/RoleSwitcher";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Compass,
  Heart,
  Info,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Search,
  Settings,
  Share2,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logoIcon from "../../imports/Logo.png";

export interface ServiceDetailData {
  id: string;
  name: string;
  theme: string;
  tagline: string;
  description: string;
  examples: string;
  color: string;
  symbol: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  matchScore: number;
  format: string;
  level: string;
  highlights: string[];
  instructors: {
    name: string;
    role: string;
    initials: string;
    bio: string;
    rating: number;
    avatarBg: string;
  }[];
  sessions: {
    id: string;
    title: string;
    date: string;
    time: string;
    provider: string;
    place: string;
    seatsLeft: number;
    price: string;
    badge?: string;
  }[];
  agenda: {
    time: string;
    title: string;
    detail: string;
  }[];
  reviews: {
    author: string;
    role: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export const servicesData: Record<string, ServiceDetailData> = {
  "heart-of-art": {
    id: "heart-of-art",
    name: "Heart of Art",
    theme: "Creative wellbeing",
    tagline:
      "Make room for colour, curiosity, and your own point of view.",
    description:
      "Heart of Art is designed to help individuals and teams re-engage their creative intuition without the pressure of perfection. Through guided watercolour exercises, expressive mark-making, visual journaling, and group art labs, you'll discover a quiet space to refresh your mindset and explore visual thinking.",
    examples: "Watercolour · photography · journaling",
    color: "#EF4444",
    symbol: "🎨",
    duration: "60–90 min",
    rating: 4.9,
    reviewsCount: 142,
    matchScore: 94,
    format: "In-person Studio & Virtual Live",
    level: "All Experience Levels Welcome",
    highlights: [
      "All premium art materials & watercolour kits provided",
      "Designed for stress reduction & creative flow",
      "Ideal for individual resets or collaborative team sessions",
      "Take home your personal framed masterpiece",
    ],
    instructors: [
      {
        name: "Studio Lumen",
        role: "Lead Creative Facilitator",
        initials: "SL",
        bio: "Specialising in mindful art practices, intuitive mark-making, and fostering open team environments.",
        rating: 4.9,
        avatarBg: "#EF4444",
      },
      {
        name: "Maya Ellison",
        role: "Guest Artist & Educator",
        initials: "ME",
        bio: "Contemporary visual artist passionate about colour theory as a tool for personal expression.",
        rating: 4.8,
        avatarBg: "#10B981",
      },
    ],
    sessions: [
      {
        id: "s1",
        title: "Watercolour without Perfection",
        date: "Thursday, Aug 8",
        time: "3:00 PM – 4:30 PM",
        provider: "Studio Lumen",
        place: "Lumen Studio, Shoreditch",
        seatsLeft: 12,
        price: "1 Credit / Included in Elite",
        badge: "Next Available",
      },
      {
        id: "s2",
        title: "Expressive Mark-Making & Journaling",
        date: "Saturday, Aug 10",
        time: "10:30 AM – 11:45 AM",
        provider: "Maya Ellison",
        place: "Online Live Studio",
        seatsLeft: 8,
        price: "1 Credit",
      },
      {
        id: "s3",
        title: "Color Therapy & Mindful Painting",
        date: "Tuesday, Aug 13",
        time: "5:30 PM – 7:00 PM",
        provider: "Studio Lumen",
        place: "Lumen Studio, Soho",
        seatsLeft: 5,
        price: "1 Credit",
      },
      {
        id: "s4",
        title: "Creative Flow Team Workshop",
        date: "Friday, Aug 16",
        time: "2:00 PM – 3:30 PM",
        provider: "Studio Lumen",
        place: "Central Innovation Hub",
        seatsLeft: 20,
        price: "Team Booking",
        badge: "Team Favorite",
      },
    ],
    agenda: [
      {
        time: "00-15 min",
        title: "Sensory Warm-up & Palette Exploration",
        detail:
          "Introduction to wet-on-wet techniques and finding your colour palette.",
      },
      {
        time: "15-50 min",
        title: "Guided Mark-Making & Layering",
        detail:
          "Hands-on painting prompts focusing on intuition rather than realistic outcomes.",
      },
      {
        time: "50-80 min",
        title: "Open Creative Lab & Music Pairing",
        detail:
          "Personal expression time accompanied by curated ambient soundscapes.",
      },
      {
        time: "80-90 min",
        title: "Quiet Reflection & Gallery Walk",
        detail:
          "Gentle group sharing, drying your work, and take-home framing.",
      },
    ],
    reviews: [
      {
        author: "Sarah K.",
        role: "Design Lead",
        avatar: "🎨",
        rating: 5,
        date: "3 days ago",
        comment:
          "Transformed our team's energy! I was nervous because I haven't painted since school, but Studio Lumen made it so welcoming.",
      },
      {
        author: "David M.",
        role: "Product Specialist",
        avatar: "☕",
        rating: 5,
        date: "1 week ago",
        comment:
          "The best 90 minutes of my week. Totally lost track of time in the best possible way. I keep my finished painting on my desk now.",
      },
      {
        author: "Elena R.",
        role: "People & Culture Director",
        avatar: "✨",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "A beautiful balance of mindfulness and creative expression. High quality materials provided and zero pressure.",
      },
    ],
  },
  "athletic-fanatics": {
    id: "athletic-fanatics",
    name: "Athletic Fanatics",
    theme: "Movement & mindfulness",
    tagline:
      "Find a happier rhythm through movement that meets you where you are.",
    description:
      "Athletic Fanatics brings energising physical wellness into your weekly routine. From restorative yoga flows and Pilates core work to social pickleball and mobility sessions, find movement designed to restore focus and build positive energy.",
    examples: "Yoga · Pilates · pickleball",
    color: "#10B981",
    symbol: "🧘",
    duration: "45–60 min",
    rating: 4.8,
    reviewsCount: 118,
    matchScore: 89,
    format: "In-person & Outdoor Parks",
    level: "Beginner to Intermediate",
    highlights: [
      "Mats, blocks, and mobility equipment provided",
      "Focused on post-desk posture & stress relief",
      "Friendly, low-pressure group atmosphere",
      "Includes hydration & recovery light snacks",
    ],
    instructors: [
      {
        name: "Maya Ellison",
        role: "Mindful Movement Coach",
        initials: "ME",
        bio: "Certified yoga practitioner with 8+ years coaching desk workers on mobility and breathwork.",
        rating: 4.9,
        avatarBg: "#10B981",
      },
    ],
    sessions: [
      {
        id: "s10",
        title: "Midday Desk Reset & Yoga Flow",
        date: "Wednesday, Aug 14",
        time: "12:15 PM – 1:00 PM",
        provider: "Maya Ellison",
        place: "Wellness Hub Studio",
        seatsLeft: 6,
        price: "1 Credit",
        badge: "Popular",
      },
      {
        id: "s11",
        title: "Sunset Outdoor Pilates",
        date: "Thursday, Aug 15",
        time: "6:00 PM – 7:00 PM",
        provider: "Maya Ellison",
        place: "Regent's Park Lawn",
        seatsLeft: 10,
        price: "1 Credit",
      },
    ],
    agenda: [
      {
        time: "00-10 min",
        title: "Grounding Breathwork & Joint Mobility",
        detail:
          "Releasing upper back, neck, and hip tension from desk posture.",
      },
      {
        time: "10-40 min",
        title: "Dynamic Flow & Core Strengthening",
        detail:
          "Accessible movement sequences to build heat and flexibility.",
      },
      {
        time: "40-45 min",
        title: "Savasana & Mindful Cool Down",
        detail:
          "Deep relaxation and guided mental reset to close the session.",
      },
    ],
    reviews: [
      {
        author: "Marcus B.",
        role: "Software Engineer",
        avatar: "🧘",
        rating: 5,
        date: "5 days ago",
        comment:
          "My lower back feels so much better after just two sessions with Maya! Perfect mid-day energy boost.",
      },
    ],
  },
  "moves-and-grooves": {
    id: "moves-and-grooves",
    name: "Moves & Grooves",
    theme: "Energy & connection",
    tagline:
      "Shake up the familiar with music, play, and feel-good movement.",
    description:
      "Step out of routine and into pure joy. Moves & Grooves combines rhythm workshops, fun dance routines, and communal music labs designed to unlock laughter and shared team bonding.",
    examples: "Dance · rhythm labs · DJ sessions",
    color: "#8B5CF6",
    symbol: "💃",
    duration: "60 min",
    rating: 4.9,
    reviewsCount: 96,
    matchScore: 92,
    format: "Dance Studio & Event Spaces",
    level: "No Dance Experience Needed",
    highlights: [
      "Uplifting playlists curated by professional DJs",
      "Uninhibited, fun movement for all body types",
      "Great team icebreaker and endorphin boost",
      "Complimentary refreshing botanical drinks",
    ],
    instructors: [
      {
        name: "The Rhythm Room",
        role: "Dance & Collective Energy Collective",
        initials: "RR",
        bio: "High-energy movement instructors bringing infectious enthusiasm to every beat.",
        rating: 4.9,
        avatarBg: "#8B5CF6",
      },
    ],
    sessions: [
      {
        id: "s20",
        title: "Friday Rhythm & Feel-Good Groove",
        date: "Friday, Aug 16",
        time: "5:00 PM – 6:00 PM",
        provider: "The Rhythm Room",
        place: "The Rhythm Room, Soho",
        seatsLeft: 14,
        price: "1 Credit",
        badge: "Weekend Kickoff",
      },
    ],
    agenda: [
      {
        time: "00-15 min",
        title: "Rhythm Warm-up & Groove Intro",
        detail:
          "Getting into the beat with simple, addictive steps.",
      },
      {
        time: "15-45 min",
        title: "Group Routine & Playful Challenges",
        detail:
          "Learning a celebratory team choreography step-by-step.",
      },
      {
        time: "45-60 min",
        title: "Freestyle Jam & Chill Out",
        detail:
          "Open floor celebration with high vibes and photo moments.",
      },
    ],
    reviews: [
      {
        author: "Chloe T.",
        role: "Marketing Manager",
        avatar: "🎶",
        rating: 5,
        date: "1 week ago",
        comment:
          "I haven't laughed this hard with colleagues in months! Pure joy from start to finish.",
      },
    ],
  },
  chowdown: {
    id: "chowdown",
    name: "Chowdown",
    theme: "Connection through food",
    tagline:
      "A delicious way to pause, share stories, and make something together.",
    description:
      "Chowdown brings people together around culinary craft. Master artisanal chocolate tempering, gourmet pasta shaping, or barista coffee skills in hands-on interactive masterclasses.",
    examples: "Chocolate · cooking · barista skills",
    color: "#F59E0B",
    symbol: "🍫",
    duration: "75–120 min",
    rating: 4.9,
    reviewsCount: 164,
    matchScore: 88,
    format: "Kitchen Studio & Tastings",
    level: "All Food Lovers Welcome",
    highlights: [
      "All organic ingredients and culinary tools supplied",
      "Hands-on creation with take-home treats",
      "Learn professional technique from artisan chefs",
      "Includes wine / herbal infusion pairings",
    ],
    instructors: [
      {
        name: "Cocoa Collective",
        role: "Master Chocolatiers",
        initials: "CC",
        bio: "Artisan chocolate makers bringing single-origin cacao knowledge and hands-on truffling skills.",
        rating: 4.9,
        avatarBg: "#F59E0B",
      },
    ],
    sessions: [
      {
        id: "s30",
        title: "Artisan Chocolate Tempering & Truffles",
        date: "Saturday, Aug 17",
        time: "2:00 PM – 4:00 PM",
        provider: "Cocoa Collective",
        place: "Cocoa Collective Kitchen",
        seatsLeft: 4,
        price: "1.5 Credits",
        badge: "Almost Full",
      },
    ],
    agenda: [
      {
        time: "00-20 min",
        title: "Cacao Origin Tasting & Science",
        detail:
          "Exploring single-origin flavor profiles and tempering fundamentals.",
      },
      {
        time: "20-90 min",
        title: "Hands-on Truffle Making & Moulding",
        detail:
          "Infusing ganaches, shaping, and dipping custom chocolates.",
      },
      {
        time: "90-120 min",
        title: "Packaging & Pairings",
        detail:
          "Boxing your creations to take home alongside drink pairings.",
      },
    ],
    reviews: [
      {
        author: "James L.",
        role: "Product Designer",
        avatar: "🍫",
        rating: 5,
        date: "4 days ago",
        comment:
          "Absolutely incredible experience! Came home with a box of beautiful handmade truffles that tasted divine.",
      },
    ],
  },
  technut: {
    id: "technut",
    name: "Technut",
    theme: "Curious making",
    tagline:
      "Try a practical new skill, powered by a little experimentation.",
    description:
      "For minds hungry to tinker and explore. Technut offers friendly, accessible entry points into creative technology—from micro-robotics and retro arcade coding to drone flying and sound synthesis.",
    examples: "Gaming · robotics · drone piloting",
    color: "#33C4F0",
    symbol: "🤖",
    duration: "90 min",
    rating: 4.8,
    reviewsCount: 76,
    matchScore: 91,
    format: "Makerspace & Innovation Lab",
    level: "No Tech Background Required",
    highlights: [
      "Hardware kits, soldering tools, & micro-controllers provided",
      "Hands-on build & test challenges",
      "Friendly guidance from tech mentors",
      "Keep your completed hardware build",
    ],
    instructors: [
      {
        name: "TechLab Studio",
        role: "Creative Tech Mentors",
        initials: "TS",
        bio: "Engineers and makers dedicated to making emerging technology playful and accessible.",
        rating: 4.8,
        avatarBg: "#33C4F0",
      },
    ],
    sessions: [
      {
        id: "s40",
        title: "Build Your First Micro-Bot",
        date: "Thursday, Aug 22",
        time: "4:00 PM – 5:30 PM",
        provider: "TechLab Studio",
        place: "Makerspace, Tech City",
        seatsLeft: 8,
        price: "1 Credit",
      },
    ],
    agenda: [
      {
        time: "00-15 min",
        title: "Hardware Overview & Concept",
        detail:
          "Unboxing micro-controllers and understanding sensor logic.",
      },
      {
        time: "15-60 min",
        title: "Assembly & Logic Programming",
        detail:
          "Building your robot chassis and uploading simple movement routines.",
      },
      {
        time: "60-90 min",
        title: "The Obstacle Arena Challenge",
        detail:
          "Testing your bot in friendly team race tracks.",
      },
    ],
    reviews: [
      {
        author: "Alex V.",
        role: "Frontend Developer",
        avatar: "🤖",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "So refreshing to build something physical! The instructors walked us through step by step.",
      },
    ],
  },
  "trip-and-tell": {
    id: "trip-and-tell",
    name: "Trip and Tell",
    theme: "Outward exploration",
    tagline:
      "Get a fresh perspective from somewhere beyond the usual routine.",
    description:
      "Step into nature and local culture. Trip and Tell curates restorative outdoor excursions, urban architecture walks, guided nature photography hikes, and micro-adventures.",
    examples: "Hiking · culture trips · outdoor days",
    color: "#0F766E",
    symbol: "⛰️",
    duration: "Half day+",
    rating: 4.9,
    reviewsCount: 88,
    matchScore: 95,
    format: "Outdoor & Guided Expeditions",
    level: "All Fitness Levels Welcome",
    highlights: [
      "Guided by experienced local outdoor leaders",
      "Includes transport coordination & trail maps",
      "Picnic lunches & botanical refreshment provided",
      "Focus on mindfulness in natural environments",
    ],
    instructors: [
      {
        name: "Wander Trails",
        role: "Outdoor Guides",
        initials: "WT",
        bio: "Wilderness leaders and local history enthusiasts guiding meaningful outdoor journeys.",
        rating: 4.9,
        avatarBg: "#0F766E",
      },
    ],
    sessions: [
      {
        id: "s50",
        title: "Woodland Mindful Hike & Photography",
        date: "Sunday, Aug 25",
        time: "9:30 AM – 1:30 PM",
        provider: "Wander Trails",
        place: "Epping Forest Meetpoint",
        seatsLeft: 15,
        price: "2 Credits",
        badge: "Special Event",
      },
    ],
    agenda: [
      {
        time: "09:30 AM",
        title: "Meet & Trail Briefing",
        detail:
          "Gear check, hot coffee, and setting intention for the hike.",
      },
      {
        time: "10:00 AM",
        title: "Mindful Forest Trail Walk",
        detail:
          "Paced walk through ancient woodland with sensory stops.",
      },
      {
        time: "12:00 PM",
        title: "Wilderness Picnic & Reflection",
        detail:
          "Shared organic lunch and group discussion under the canopy.",
      },
      {
        time: "01:30 PM",
        title: "Return & Wrap-up",
        detail: "Trail conclusion and transport return.",
      },
    ],
    reviews: [
      {
        author: "Hannah W.",
        role: "Operations Director",
        avatar: "🌲",
        rating: 5,
        date: "1 week ago",
        comment:
          "Exactly what I needed after an intense month at work. Air, fresh perspective, and lovely company.",
      },
    ],
  },
};

function UniversalSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[60px] flex-col items-center border-r border-[#33c4f0]/15 bg-white/90 py-6 shadow-[4px_0_20px_rgba(28,118,155,.04)] backdrop-blur lg:flex">
      <Link
        to="/"
        title="CreativeSelf Home"
        aria-label="CreativeSelf Home"
        className="grid h-10 w-10 place-items-center transition-transform hover:scale-105"
      >
        <ImageWithFallback
          src={logoIcon}
          alt="CreativeSelf Logo"
          className="h-full w-full object-contain"
        />
      </Link>
      <nav
        className="mt-10 flex flex-col gap-3"
        aria-label="Universal navigation"
      >
        <Link
          to="/dashboard"
          title="Home"
          aria-label="Home"
          className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
        >
          <LayoutDashboard size={18} />
        </Link>
        <Link
          to="/discover/services"
          title="Discover"
          aria-label="Discover"
          className="grid h-10 w-10 place-items-center rounded-full bg-[#33c4f0] text-[#1a1a28]"
        >
          <Compass size={18} />
        </Link>
        <Link
          to="/bookings"
          title="Bookings"
          aria-label="Bookings"
          className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
        >
          <CalendarDays size={18} />
        </Link>
        <Link
          to="/discover/providers"
          title="Providers"
          aria-label="Providers"
          className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
        >
          <Users size={18} />
        </Link>
      </nav>
      <div className="mt-auto flex flex-col gap-3">
        <button
          type="button"
          title="Settings"
          aria-label="Settings"
          className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
        >
          <Settings size={18} />
        </button>
        <Link
          to="/"
          title="Log out"
          aria-label="Log out"
          className="grid h-10 w-10 place-items-center rounded-full text-[#717182] transition hover:bg-[#1a1a28] hover:text-white"
        >
          <LogOut size={18} />
        </Link>
        <RoleSwitcher activeRole="client" />
      </div>
    </aside>
  );
}

export function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const serviceKey =
    serviceId && servicesData[serviceId]
      ? serviceId
      : "heart-of-art";
  const service = servicesData[serviceKey];

  const [activeTab, setActiveTab] = useState<
    "overview" | "sessions" | "instructors" | "reviews"
  >("overview");
  const [isSaved, setIsSaved] = useState(false);
  const [selectedSession, setSelectedSession] = useState<
    (typeof service.sessions)[0] | null
  >(null);
  const [guestCount, setGuestCount] = useState(1);
  const [userNote, setUserNote] = useState("");
  const [bookedSessions, setBookedSessions] = useState<
    string[]
  >([]);
  const [showToast, setShowToast] = useState<string | null>(
    null,
  );

  function handleBookingConfirm() {
    if (!selectedSession) return;
    setBookedSessions((prev) => [...prev, selectedSession.id]);
    setShowToast(
      `Successfully booked "${selectedSession.title}" for ${selectedSession.date}!`,
    );
    setSelectedSession(null);
    setGuestCount(1);
    setUserNote("");
    setTimeout(() => {
      setShowToast(null);
    }, 6000);
  }

  const otherServices = Object.values(servicesData).filter(
    (s) => s.id !== service.id,
  );

  return (
    <div
      className="min-h-screen bg-[#f7fcff] text-[#1a1a28]"
      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
    >
      <UniversalSidebar />

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[20px] bg-[#1a1a28] p-4 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#10b981] text-white">
            <Check size={20} />
          </div>
          <div>
            <p className="text-sm font-extrabold">
              {showToast}
            </p>
            <Link
              to="/bookings"
              className="text-xs font-bold text-[#33c4f0] underline"
            >
              View in your bookings calendar →
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(null)}
            className="ml-2 text-white/50 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_minmax(0,1fr)_300px] lg:px-8 lg:py-12 lg:pl-[76px]">
        {/* Left Navigation Sidebar */}
        <aside className="hidden lg:block">
          <div
            className="sticky top-8 bg-[#1a1a28] p-5 text-white"
            style={{ borderRadius: "20px 20px 64px 20px" }}
          >
            <Link
              to="/"
              className="flex items-center gap-3 no-underline"
            >
              <ImageWithFallback
                src={logoIcon}
                alt="CreativeSelf Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-lg font-extrabold">
                <span className="text-[#33c4f0]">creative</span>
                <span className="text-white">self</span>
              </span>
            </Link>

            <Link
              to="/discover/services"
              className="mt-6 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#33c4f0] hover:underline"
            >
              <ChevronLeft size={16} /> Back to Services
            </Link>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div
                className="grid h-12 w-12 place-items-center rounded-[16px] text-2xl"
                style={{ background: `${service.color}25` }}
              >
                {service.symbol}
              </div>
              <p className="mt-3 text-lg font-extrabold">
                {service.name}
              </p>
              <p
                className="mt-1 text-xs font-bold"
                style={{ color: service.color }}
              >
                {service.theme}
              </p>
            </div>

            <nav className="mt-6 space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm font-bold transition ${
                  activeTab === "overview"
                    ? "bg-[#33c4f0] text-[#1a1a28]"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Sparkles size={16} /> Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sessions")}
                className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm font-bold transition ${
                  activeTab === "sessions"
                    ? "bg-[#33c4f0] text-[#1a1a28]"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <CalendarDays size={16} /> Sessions (
                {service.sessions.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("instructors")}
                className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm font-bold transition ${
                  activeTab === "instructors"
                    ? "bg-[#33c4f0] text-[#1a1a28]"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Users size={16} /> Facilitators (
                {service.instructors.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm font-bold transition ${
                  activeTab === "reviews"
                    ? "bg-[#33c4f0] text-[#1a1a28]"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <MessageSquare size={16} /> Reviews (
                {service.reviewsCount})
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main>
          {/* Top Breadcrumb mobile link */}
          <div className="mb-4 lg:hidden">
            <Link
              to="/discover/services"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#147c9e]"
            >
              <ChevronLeft size={16} /> Back to all services
            </Link>
          </div>

          {/* Hero Banner Header */}
          <header
            className="relative overflow-hidden bg-white p-7 shadow-[0_16px_42px_rgba(28,118,155,.08)]"
            style={{ borderRadius: "20px 20px 64px 20px" }}
          >
            <div
              className="absolute -right-8 -top-8 grid h-36 w-36 place-items-center rounded-full text-6xl opacity-20"
              style={{ background: `${service.color}30` }}
            >
              {service.symbol}
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold"
                  style={{
                    background: `${service.color}18`,
                    color: service.color,
                  }}
                >
                  <span>{service.symbol}</span>
                  <span>{service.theme}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSaved(!isSaved)}
                    className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-extrabold transition ${
                      isSaved
                        ? "border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444]"
                        : "border-[#33c4f0]/30 bg-white text-[#717182] hover:bg-[#e8f9ff]"
                    }`}
                  >
                    <Heart
                      size={14}
                      className={isSaved ? "fill-current" : ""}
                    />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      alert("Link copied to clipboard!")
                    }
                    className="flex items-center gap-1.5 rounded-full border border-[#33c4f0]/30 bg-white px-3.5 py-1.5 text-xs font-extrabold text-[#717182] transition hover:bg-[#e8f9ff]"
                  >
                    <Share2 size={14} /> Share
                  </button>
                </div>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-[#1a1a28] sm:text-4xl">
                {service.name}
              </h1>
              <p
                className="mt-2 text-lg font-bold"
                style={{ color: service.color }}
              >
                {service.tagline}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#717182]">
                {service.description}
              </p>

              {/* Key Quick Stats */}
              <div className="mt-6 flex flex-wrap gap-4 border-t border-[#33c4f0]/15 pt-5 text-xs font-extrabold text-[#414153]">
                <div className="flex items-center gap-1.5">
                  <Star
                    size={15}
                    className="fill-[#f59e0b] text-[#f59e0b]"
                  />
                  <span>{service.rating}</span>
                  <span className="font-normal text-[#717182]">
                    ({service.reviewsCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock3
                    size={15}
                    className="text-[#33c4f0]"
                  />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin
                    size={15}
                    className="text-[#33c4f0]"
                  />
                  <span>{service.format}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={15} className="text-[#10b981]" />
                  <span>{service.level}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Tab Selection Bar (Mobile/Tablet & Quick Switch) */}
          <div className="mt-4 flex gap-1 overflow-x-auto pb-1 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition ${
                activeTab === "overview"
                  ? "bg-[#1a1a28] text-white"
                  : "bg-white text-[#717182] hover:bg-[#e8f9ff]"
              }`}
            >Overview & Agenda</button>
            <button
              type="button"
              onClick={() => setActiveTab("sessions")}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition ${
                activeTab === "sessions"
                  ? "bg-[#1a1a28] text-white"
                  : "bg-white text-[#717182] hover:bg-[#e8f9ff]"
              }`}
            >
              Book Sessions ({service.sessions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("instructors")}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition ${
                activeTab === "instructors"
                  ? "bg-[#1a1a28] text-white"
                  : "bg-white text-[#717182] hover:bg-[#e8f9ff]"
              }`}
            >
              Facilitators ({service.instructors.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition ${
                activeTab === "reviews"
                  ? "bg-[#1a1a28] text-white"
                  : "bg-white text-[#717182] hover:bg-[#e8f9ff]"
              }`}
            >
              Reviews ({service.reviewsCount})
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="mt-6 space-y-6">
              {/* Highlights Card */}
              <section
                className="bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
                style={{ borderRadius: "20px 20px 64px 20px" }}
              >
                <h3 className="text-xs font-extrabold uppercase tracking-[.16em] text-[#33c4f0]">
                  Why choose this experience
                </h3>
                <h2 className="mt-2 text-xl font-extrabold text-[#1a1a28]">
                  Experience Highlights
                </h2>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-[16px] bg-[#f8fdff] p-3.5 border border-[#33c4f0]/15"
                    >
                      <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#33c4f0] text-xs text-[#1a1a28]">
                        <Check size={14} />
                      </div>
                      <p className="text-xs font-bold leading-5 text-[#414153]">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Agenda / Timeline */}
              <section
                className="bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
                style={{ borderRadius: "20px 20px 64px 20px" }}
              >
                <h3 className="text-xs font-extrabold uppercase tracking-[.16em] text-[#33c4f0]">
                  Session structure
                </h3>
                <h2 className="mt-2 text-xl font-extrabold text-[#1a1a28]">
                  What to expect during your time
                </h2>

                <div className="mt-6 space-y-4">
                  {service.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-[#1a1a28] text-xs font-extrabold text-white">
                          {index + 1}
                        </div>
                        {index < service.agenda.length - 1 && (
                          <div className="h-full w-0.5 bg-[#33c4f0]/20 my-1" />
                        )}
                      </div>
                      <div className="flex-1 rounded-[16px] bg-[#f8fdff] p-4 border border-[#33c4f0]/15">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-extrabold text-[#1a1a28]">
                            {item.title}
                          </h4>
                          <span className="rounded-full bg-[#e8f9ff] px-2.5 py-1 text-[11px] font-bold text-[#147c9e]">
                            {item.time}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#717182]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Sessions Preview CTA */}
              <section
                className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1a1a28] p-6 text-white shadow-xl"
                style={{ borderRadius: "20px 20px 64px 20px" }}
              >
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#33c4f0]">
                    Ready to join?
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold">
                    Next available session:{" "}
                    {service.sessions[0]?.date}
                  </h3>
                  <p className="mt-1 text-xs text-white/60">
                    {service.sessions[0]?.title} ·{" "}
                    {service.sessions[0]?.time}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedSession(service.sessions[0])
                  }
                  className="shrink-0 rounded-full bg-[#33c4f0] px-6 py-3 text-xs font-extrabold text-[#1a1a28] transition hover:scale-105"
                >
                  Book Next Slot →
                </button>
              </section>
            </div>
          )}

          {/* TAB 2: UPCOMING SESSIONS */}
          {activeTab === "sessions" && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold">
                    Available Sessions & Workshops
                  </h2>
                  <p className="text-xs text-[#717182]">
                    Select a time slot to reserve your spot or
                    team allocation.
                  </p>
                </div>
                <span className="rounded-full bg-[#e8f9ff] px-3 py-1 text-xs font-bold text-[#147c9e]">
                  {service.sessions.length} upcoming slots
                </span>
              </div>

              {service.sessions.map((session) => {
                const isBooked = bookedSessions.includes(
                  session.id,
                );

                return (
                  <article
                    key={session.id}
                    className="overflow-hidden bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)] transition hover:shadow-md"
                    style={{
                      borderRadius: "20px 20px 64px 20px",
                    }}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-extrabold uppercase tracking-[.14em]"
                            style={{ color: service.color }}
                          >
                            {session.date}
                          </span>
                          {session.badge && (
                            <span className="rounded-full bg-[#e8f9ff] px-2.5 py-0.5 text-[10px] font-extrabold text-[#147c9e]">
                              {session.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-extrabold text-[#1a1a28]">
                          {session.title}
                        </h3>
                        <p className="text-xs text-[#717182]">
                          Facilitated by {session.provider}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-[#717182]">
                          <span className="flex items-center gap-1">
                            <Clock3
                              size={14}
                              className="text-[#33c4f0]"
                            />
                            {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin
                              size={14}
                              className="text-[#33c4f0]"
                            />
                            {session.place}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users
                              size={14}
                              className="text-[#10b981]"
                            />
                            {session.seatsLeft} spots left
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center justify-between sm:flex-col sm:items-end gap-3 border-t border-[#33c4f0]/15 pt-3 sm:border-t-0 sm:pt-0">
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-[#147c9e]">
                            {session.price}
                          </span>
                        </div>

                        {isBooked ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#10b981]/15 px-5 py-2.5 text-xs font-extrabold text-[#087e58]">
                            <Check size={15} /> Booked!
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedSession(session)
                            }
                            className="rounded-full px-5 py-2.5 text-xs font-extrabold text-white transition hover:opacity-90"
                            style={{
                              background: service.color,
                            }}
                          >
                            Reserve Seat
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* TAB 3: FACILITATORS / INSTRUCTORS */}
          {activeTab === "instructors" && (
            <div className="mt-6 space-y-5">
              <div>
                <h2 className="text-xl font-extrabold">
                  Meet Your Creative Guides
                </h2>
                <p className="text-xs text-[#717182]">
                  Experienced leaders dedicated to making your
                  experience joyful and inclusive.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {service.instructors.map((inst) => (
                  <article
                    key={inst.name}
                    className="bg-white p-6 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
                    style={{
                      borderRadius: "20px 20px 64px 20px",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="grid h-14 w-14 place-items-center rounded-full text-base font-extrabold text-white"
                        style={{ background: inst.avatarBg }}
                      >
                        {inst.initials}
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-[#fef3c7] px-2.5 py-1 text-xs font-bold text-[#b45309]">
                        <Star
                          size={13}
                          className="fill-current"
                        />{" "}
                        {inst.rating}
                      </div>
                    </div>

                    <h3 className="mt-4 text-xl font-extrabold">
                      {inst.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-bold text-[#147c9e]">
                      {inst.role}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-[#717182]">
                      {inst.bio}
                    </p>

                    <Link
                      to="/discover/providers"
                      className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#33c4f0]/25 px-4 py-2 text-xs font-extrabold text-[#1a1a28] no-underline hover:bg-[#e8f9ff]"
                    >
                      View Provider Profile →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="mt-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold">
                    Community Feedback
                  </h2>
                  <p className="text-xs text-[#717182]">
                    What participants say about {service.name}.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold shadow-sm">
                  <Star
                    size={16}
                    className="fill-[#f59e0b] text-[#f59e0b]"
                  />
                  <span>{service.rating} out of 5</span>
                </div>
              </div>

              <div className="space-y-4">
                {service.reviews.map((rev, i) => (
                  <article
                    key={i}
                    className="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
                    style={{
                      borderRadius: "20px 20px 64px 20px",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#e8f9ff] text-lg">
                          {rev.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold">
                            {rev.author}
                          </p>
                          <p className="text-[11px] text-[#717182]">
                            {rev.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rev.rating }).map(
                          (_, idx) => (
                            <Star
                              key={idx}
                              size={13}
                              className="fill-[#f59e0b] text-[#f59e0b]"
                            />
                          ),
                        )}
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-6 text-[#414153]">
                      "{rev.comment}"
                    </p>
                    <p className="mt-2 text-[10px] font-bold text-[#717182]">
                      {rev.date}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Right Info & Acumen AI Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-5">
            {/* Acumen AI Recommendation Widget */}
            <div
              className="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#e8f9ff] px-3 py-1 text-xs font-bold text-[#147c9e]">
                  Acumen AI Fit
                </span>
                <span className="text-lg font-extrabold text-[#10b981]">
                  {service.matchScore}% Match
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-[16px] bg-[#f2fbfe] p-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#33c4f0] text-xl text-[#1a1a28]">
                  🧭
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#1a1a28]">
                    Great for "The Explorer"
                  </p>
                  <p className="text-[11px] text-[#717182]">
                    Matches your curiosity & desire for hands-on
                    creation.
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-[#33c4f0]/15 pt-4 text-xs space-y-2 text-[#414153]">
                <div className="flex items-center justify-between">
                  <span className="text-[#717182]">
                    Duration:
                  </span>
                  <span className="font-bold">
                    {service.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#717182]">
                    Group Size:
                  </span>
                  <span className="font-bold">
                    8–20 participants
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#717182]">
                    Materials:
                  </span>
                  <span className="font-bold text-[#10b981]">
                    100% Provided
                  </span>
                </div>
              </div>
            </div>

            {/* Other Services You Might Like */}
            <div
              className="bg-white p-5 shadow-[0_12px_36px_rgba(28,118,155,.07)]"
              style={{ borderRadius: "20px 20px 64px 20px" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#717182]">
                More to discover
              </p>
              <h3 className="mt-1 text-sm font-extrabold text-[#1a1a28]">
                Related Service Brands
              </h3>

              <div className="mt-4 space-y-3">
                {otherServices.slice(0, 3).map((other) => (
                  <Link
                    key={other.id}
                    to={`/discover/services/${other.id}`}
                    className="flex items-center gap-3 rounded-[16px] p-2.5 no-underline transition hover:bg-[#f2fbfe]"
                  >
                    <div
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-base"
                      style={{ background: `${other.color}20` }}
                    >
                      {other.symbol}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-extrabold text-[#1a1a28]">
                        {other.name}
                      </p>
                      <p className="truncate text-[10px] text-[#717182]">
                        {other.theme}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* BOOKING MODAL */}
      {selectedSession && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#1a1a28]/60 p-4 backdrop-blur-sm animate-in fade-in"
          role="dialog"
        >
          <div
            className="relative w-full max-w-lg overflow-hidden bg-white p-6 shadow-2xl sm:p-8"
            style={{ borderRadius: "20px 20px 64px 20px" }}
          >
            <button
              type="button"
              onClick={() => setSelectedSession(null)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f2fbfe] text-[#1a1a28] transition hover:bg-[#e8f9ff]"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div
                className="grid h-12 w-12 place-items-center rounded-[18px] text-2xl"
                style={{ background: `${service.color}20` }}
              >
                {service.symbol}
              </div>
              <div>
                <p
                  className="text-xs font-extrabold uppercase tracking-[.14em]"
                  style={{ color: service.color }}
                >
                  {service.name}
                </p>
                <h2 className="text-xl font-extrabold text-[#1a1a28]">
                  {selectedSession.title}
                </h2>
              </div>
            </div>

            <div className="mt-6 rounded-[20px] bg-[#f8fdff] p-4 border border-[#33c4f0]/20 space-y-2 text-xs font-bold text-[#414153]">
              <div className="flex items-center justify-between">
                <span className="text-[#717182]">
                  Date & Time:
                </span>
                <span>
                  {selectedSession.date} ·{" "}
                  {selectedSession.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#717182]">
                  Location:
                </span>
                <span>{selectedSession.place}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#717182]">
                  Facilitator:
                </span>
                <span>{selectedSession.provider}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#33c4f0]/15 pt-2 text-[#147c9e]">
                <span>Cost / Credits:</span>
                <span className="font-extrabold">
                  {selectedSession.price}
                </span>
              </div>
            </div>

            {/* Guest counter */}
            <div className="mt-5">
              <label className="text-xs font-extrabold text-[#1a1a28]">
                Number of Participants
              </label>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setGuestCount((g) => Math.max(1, g - 1))
                  }
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#33c4f0]/30 font-bold text-[#1a1a28] hover:bg-[#e8f9ff]"
                >
                  -
                </button>
                <span className="text-sm font-extrabold text-[#1a1a28]">
                  {guestCount} person{guestCount > 1 ? "s" : ""}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setGuestCount((g) =>
                      Math.min(
                        selectedSession.seatsLeft,
                        g + 1,
                      ),
                    )
                  }
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#33c4f0]/30 font-bold text-[#1a1a28] hover:bg-[#e8f9ff]"
                >
                  +
                </button>
                <span className="ml-auto text-xs text-[#717182]">
                  ({selectedSession.seatsLeft} seats remaining)
                </span>
              </div>
            </div>

            {/* Special Requests / Goals Note */}
            <div className="mt-5">
              <label className="text-xs font-extrabold text-[#1a1a28]">
                Personal Goal / Special Note (Optional)
              </label>
              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="e.g. Excited to try watercolour for the first time! Looking for a peaceful reset."
                rows={2}
                className="mt-2 w-full rounded-[16px] border border-[#33c4f0]/25 bg-[#f9fdff] p-3 text-xs text-[#1a1a28] outline-none focus:border-[#33c4f0]"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                className="rounded-full px-4 py-2.5 text-xs font-extrabold text-[#717182] hover:bg-[#f2fbfe]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBookingConfirm}
                className="rounded-full px-6 py-2.5 text-xs font-extrabold text-white transition hover:opacity-90"
                style={{ background: service.color }}
              >
                Confirm & Reserve Slot →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}