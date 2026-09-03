export type PostData = {
  id: string;
  provider: string;
  handle: string;
  category: string;
  title: string;
  copy: string;
  fullStory?: string;
  date: string;
  duration: string;
  seats: string;
  color: string;
  emoji: string;
  likes: number;
  comments: number;
  featured?: boolean;
  image?: string;
  images: string[];
  imageAlt?: string;
  service?: string;
  label?: string;
  authorRole?: string;
  authorAvatar?: string;
  highlights?: string[];
  commentsList?: { id: string; user: string; avatar: string; time: string; text: string }[];
};

export const samplePostsData: PostData[] = [
  {
    id: "breathe",
    provider: "Maya Ellison Mindful Movement",
    handle: "@mayaellison",
    category: "Athletic Fanatics",
    title: "Reset the room: 45-minute desk-to-mat yoga",
    copy: "A gentle, team-friendly flow designed for the middle of a full workday. No experience or changing rooms needed.",
    fullStory:
      "Modern workdays leave us holding tension in our shoulders, hips, and lower back without even realizing it. 'Reset the Room' is designed specifically to shift team energy in under an hour.\n\nGuided by certified movement practitioners from Maya Ellison Mindful Movement, this experience transitions your team smoothly from desk posture into restorative grounding poses. We provide mats, gentle background soundscapes, and options for every mobility level.",
    date: "Wed, Aug 7 · 12:15 PM",
    duration: "45 min",
    seats: "18 places",
    color: "#10B981",
    emoji: "🧘",
    likes: 84,
    comments: 12,
    featured: true,
    image: "https://images.unsplash.com/photo-1758874384683-0accd9fb26ee?w=900&h=480&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1758874384683-0accd9fb26ee?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&h=480&fit=crop&auto=format",
    ],
    imageAlt: "Person taking a mindful pause at a desk",
    service: "Desk-to-Mat Yoga Flow",
    label: "Published",
    authorRole: "Mindfulness Lead · Maya Ellison Studio",
    authorAvatar: "🌿",
    highlights: [
      "No specialized activewear or changing rooms needed",
      "Focused breathwork techniques to lower mid-day stress",
      "Ergonomic stretches tailored for desk workers",
      "Includes sound bowls and post-session herbal refreshments",
    ],
    commentsList: [
      { id: "c1", user: "Sarah Jenkins", avatar: "👩‍💼", time: "2 days ago", text: "Our engineering team loved this! Perfect break between back-to-back sprints." },
      { id: "c2", user: "David Kim", avatar: "👨‍💻", time: "Yesterday", text: "Felt so refreshed afterwards. Would highly recommend for team offsites!" },
    ],
  },
  {
    id: "colour",
    provider: "Studio Lumen",
    handle: "@studiolumen",
    category: "Heart of Art",
    title: "Watercolour without perfection",
    copy: "A guided studio session where teams slow down, make a little mess, and leave with something that is entirely theirs.",
    fullStory:
      "Creativity often gets lost in the pursuit of perfection. This hands-on watercolor experience invites team members to let go of expectations and embrace organic expression.\n\nStudio Lumen provides premium cold-pressed paper, vivid watercolor pigments, and brushes. Participants are guided through soothing wash techniques, gradient blending, and intuitive mark-making. At the end of the session, each participant takes home a framed original piece.",
    date: "Thu, Aug 8 · 3:00 PM",
    duration: "90 min",
    seats: "12 places",
    color: "#EF4444",
    emoji: "🎨",
    likes: 126,
    comments: 18,
    image: "https://images.unsplash.com/photo-1510832842230-87253f48d74f?w=900&h=480&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1510832842230-87253f48d74f?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&h=480&fit=crop&auto=format",
    ],
    imageAlt: "Paintbrush dipped into a colourful paint palette",
    service: "Watercolour without perfection",
    label: "Scheduled",
    authorRole: "Studio Director · Studio Lumen",
    authorAvatar: "🎨",
    highlights: [
      "All art materials supplied & delivered directly to your venue",
      "No prior painting experience required",
      "Guided color mixing and atmospheric wash techniques",
      "Custom protective packaging for participants to take home art",
    ],
    commentsList: [
      { id: "c3", user: "Elena Rostova", avatar: "👩‍🎨", time: "3 days ago", text: "Such a beautiful experience! Everyone was proud of what they made." },
      { id: "c4", user: "Marcus Vance", avatar: "👨‍💼", time: "1 day ago", text: "Brought our design department for this. Truly therapeutic afternoon." },
    ],
  },
  {
    id: "rhythm",
    provider: "The Rhythm Room",
    handle: "@rhythmroom",
    category: "Moves & Grooves",
    title: "Bring the energy back: rhythm lab",
    copy: "An all-level movement break built to shift the mood, wake up the body, and make a team laugh together.",
    fullStory:
      "Rhythm Lab breaks down barriers through high-energy percussion and accessible choreography. Designed to recharge team dynamics, this session builds camaraderie and laughter in equal measure.\n\nWhether held outdoors or in a multi-purpose room, participants synchronize movements to uplifting beats led by professional choreographers.",
    date: "Fri, Aug 9 · 4:30 PM",
    duration: "60 min",
    seats: "25 places",
    color: "#8B5CF6",
    emoji: "💃",
    likes: 91,
    comments: 9,
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&h=480&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&h=480&fit=crop&auto=format",
    ],
    service: "Rhythm & Movement Lab",
    label: "Published",
    authorRole: "Performance Coach · The Rhythm Room",
    authorAvatar: "✨",
    highlights: [
      "High-vibe energy booster perfect for Friday afternoons",
      "Encourages spontaneous teamwork and coordination",
      "Custom playlists tailored to team preferences",
    ],
    commentsList: [
      { id: "c5", user: "Chloe Bennett", avatar: "👩‍💻", time: "4 days ago", text: "The energy in the room was unbelievable!" },
    ],
  },
  {
    id: "food",
    provider: "Cocoa Collective",
    handle: "@cocoacollective",
    category: "Chowdown",
    title: "The five-sense chocolate workshop",
    copy: "A deliciously hands-on tasting session that blends conversation, craft, and a small moment of indulgence.",
    fullStory:
      "Explore single-origin cocoa beans, artisan temperings, and flavor pairings in an interactive tasting workshop. Led by master chocolatiers, teams learn the art of bean-to-bar crafting while creating custom truffles.",
    date: "Tue, Aug 13 · 2:00 PM",
    duration: "75 min",
    seats: "16 places",
    color: "#F59E0B",
    emoji: "🍫",
    likes: 142,
    comments: 23,
    image: "https://images.unsplash.com/photo-1621134283184-5e7881013013?w=900&h=480&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1621134283184-5e7881013013?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=900&h=480&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=900&h=480&fit=crop&auto=format",
    ],
    imageAlt: "Artisan chocolate on a ceramic plate",
    service: "Artisan Chocolate Tasting",
    label: "Published",
    authorRole: "Master Chocolatier · Cocoa Collective",
    authorAvatar: "🍫",
    highlights: [
      "Guided tasting of rare single-origin chocolates",
      "Hands-on truffle rolling and custom topping bar",
      "Includes takeaway gift boxes for each participant",
    ],
    commentsList: [
      { id: "c6", user: "Liam O'Connor", avatar: "👨‍🍳", time: "5 days ago", text: "Delicious and educational! 10/10 recommendation." },
    ],
  },
  {
    id: "watercolour",
    provider: "Studio Lumen",
    handle: "@studiolumen",
    category: "Heart of Art",
    title: "A gentle kind of team reset",
    copy: "Watercolour gives busy minds a reason to slow down, notice more, and make something together.",
    fullStory: "A serene studio workshop curated to foster deep focus and collective quietude through medium exploration.",
    date: "Thu, Aug 1 · 9:00 AM",
    duration: "90 min",
    seats: "12 guests",
    color: "#EF4444",
    emoji: "🎨",
    likes: 42,
    comments: 8,
    image: "https://images.unsplash.com/photo-1510832842230-87253f48d74f?w=800&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1510832842230-87253f48d74f?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop&auto=format",
    ],
    service: "Watercolour without perfection",
    label: "Scheduled",
    highlights: ["Mindful color theory", "Guided wash practice", "Framed takeaway piece"],
  },
  {
    id: "behind-scenes",
    provider: "Studio Lumen",
    handle: "@studiolumen",
    category: "Heart of Art",
    title: "A little colour goes a long way",
    copy: "A peek into how a Studio Lumen session turns a meeting room into a creative pause.",
    fullStory: "Inside look at how we transform sterile corporate boardroom spaces into warm, welcoming creative studios.",
    date: "Not scheduled",
    duration: "60 min",
    seats: "15 guests",
    color: "#F59E0B",
    emoji: "🖌️",
    likes: 19,
    comments: 3,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=800&fit=crop&auto=format",
    ],
    service: "Colour as a way to reset",
    label: "Draft",
    highlights: ["Room setup transformation guide", "Lighting and ambiance tips"],
  },
  {
    id: "team-story",
    provider: "Studio Lumen",
    handle: "@studiolumen",
    category: "Heart of Art",
    title: "What Northstar Studio made together",
    copy: "Twelve people, a table of colour, and a surprisingly good afternoon.",
    fullStory: "Case study of Northstar Studio's quarter-end creative retreat with Studio Lumen.",
    date: "Mon, Jul 29 · 11:30 AM",
    duration: "90 min",
    seats: "12 guests",
    color: "#8B5CF6",
    emoji: "✨",
    likes: 98,
    comments: 14,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1510832842230-87253f48d74f?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=800&fit=crop&auto=format",
    ],
    service: "Watercolour without perfection",
    label: "Published",
    highlights: ["Client interview quotes", "Group mosaic project showcase"],
  },
];

export function getPostById(id: string): PostData | undefined {
  return samplePostsData.find((p) => p.id === id) || samplePostsData.find((p) => p.id.toLowerCase().includes(id.toLowerCase()));
}
