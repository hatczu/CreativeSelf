export interface Vendor {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  theme: string;
  themeTagline: string;
  specialty: string;
  description: string;
  location: string;
  avatar: string;
  color: string;
  image: string;
  categories: string[];
}

export interface Activity {
  id: string;
  name: string;
  vendorId: string;
  vendorName: string;
  category: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  included: string[];
  whatToExpect: { time: string; title: string; detail: string }[];
  requirements: string[];
  whatToBring: string[];
  schedule: { id: string; date: string; time: string; seatsLeft: number }[];
  color: string;
  symbol: string;
  image: string;
  rating: number;
  reviewsCount: number;
}

export const mockVendors: Vendor[] = [
  // Heart of Art Theme
  {
    id: "abc-creative-studio",
    name: "ABC Creative Studio",
    rating: 4.8,
    reviewsCount: 124,
    theme: "Heart of Art",
    themeTagline: "Creative wellbeing & visual expression",
    specialty: "Painting, creative workshops, photography, and more.",
    description: "ABC Creative Studio is a premier multi-disciplinary creative hub dedicated to accessible hands-on art & photography education.",
    location: "Makati, PH",
    avatar: "🎨",
    color: "#EF4444",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    categories: ["Painting", "Photography"],
  },
  {
    id: "studio-lumen",
    name: "Studio Lumen",
    rating: 4.9,
    reviewsCount: 142,
    theme: "Heart of Art",
    themeTagline: "Creative wellbeing & visual expression",
    specialty: "Mindful watercolour, intuitive mark-making & visual journaling.",
    description: "Designed to help individuals re-engage their creative intuition without the pressure of perfection.",
    location: "Manila, PH",
    avatar: "🖌️",
    color: "#EF4444",
    image: "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1200&q=80",
    categories: ["Watercolour", "Journaling"],
  },

  // Athletic Fanatics Theme
  {
    id: "maya-ellison-studio",
    name: "Maya Ellison Mindful Movement",
    rating: 4.9,
    reviewsCount: 110,
    theme: "Athletic Fanatics",
    themeTagline: "Movement & mindfulness",
    specialty: "Desk-to-mat yoga, Pilates, and guided restorative flow.",
    description: "Find a happier rhythm through movement that meets you where you are, from stress resets to energising flows.",
    location: "Pasig, PH",
    avatar: "🧘",
    color: "#10B981",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
    categories: ["Yoga", "Pilates"],
  },
  {
    id: "movement-lab",
    name: "The Movement Lab",
    rating: 4.7,
    reviewsCount: 78,
    theme: "Athletic Fanatics",
    themeTagline: "Movement & mindfulness",
    specialty: "Functional mobility, pickleball basics, and breathwork.",
    description: "Active wellness classes tailored for beginners wanting to build sustainable energy habits.",
    location: "Taguig, PH",
    avatar: "🏆",
    color: "#10B981",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    categories: ["Pickleball", "Breathwork"],
  },

  // Moves & Grooves Theme
  {
    id: "rhythm-room",
    name: "The Rhythm Room",
    rating: 4.8,
    reviewsCount: 95,
    theme: "Moves & Grooves",
    themeTagline: "Energy & connection",
    specialty: "Expressive dance, rhythm labs, and DJ vinyl basics.",
    description: "Shake up the familiar with music, play, and feel-good group movement sessions.",
    location: "Quezon City, PH",
    avatar: "💃",
    color: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    categories: ["Dance", "Rhythm Labs"],
  },

  // Chowdown Theme
  {
    id: "cocoa-collective",
    name: "Cocoa Collective",
    rating: 4.9,
    reviewsCount: 96,
    theme: "Chowdown",
    themeTagline: "Connection through food",
    specialty: "Chocolate-making, truffle tempering, and bean tasting.",
    description: "A delicious way to pause, share stories, and master artisanal chocolate techniques with chocolatiers.",
    location: "Quezon City, PH",
    avatar: "🍫",
    color: "#F59E0B",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80",
    categories: ["Confectionery", "Tasting"],
  },
  {
    id: "barista-craft-studio",
    name: "Barista Craft Studio",
    rating: 4.8,
    reviewsCount: 82,
    theme: "Chowdown",
    themeTagline: "Connection through food",
    specialty: "Espresso extraction, latte art, and coffee bean pairing.",
    description: "Hands-on coffee brewing experience for passionate coffee lovers and beginners alike.",
    location: "Makati, PH",
    avatar: "☕",
    color: "#F59E0B",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80",
    categories: ["Barista Skills", "Coffee Tasting"],
  },

  // Technut Theme
  {
    id: "digital-makers-lab",
    name: "Technut Makers Studio",
    rating: 4.8,
    reviewsCount: 64,
    theme: "Technut",
    themeTagline: "Curious making & experimentation",
    specialty: "3D printing, drone piloting, and creative robotics.",
    description: "Try a practical new tech skill, powered by a little curiosity and hands-on experimentation.",
    location: "Taguig, PH",
    avatar: "🤖",
    color: "#33C4F0",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80",
    categories: ["Robotics", "3D Printing"],
  },

  // Trip and Tell Theme
  {
    id: "outward-exploration-co",
    name: "Outward Exploration Co.",
    rating: 4.7,
    reviewsCount: 54,
    theme: "Trip and Tell",
    themeTagline: "Outward exploration",
    specialty: "Urban photography walks, nature hikes, and heritage trips.",
    description: "Get a fresh perspective from somewhere beyond the usual routine with curated group outings.",
    location: "Manila, PH",
    avatar: "⛰️",
    color: "#0F766E",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    categories: ["Hiking", "Culture Trips"],
  },
];

export const mockActivities: Activity[] = [
  // ABC Creative Studio
  {
    id: "beginner-painting-workshop",
    name: "Beginner Painting Workshop",
    vendorId: "abc-creative-studio",
    vendorName: "ABC Creative Studio",
    category: "Painting",
    duration: "2 hours",
    location: "Makati Studio",
    description: "Learn foundational painting techniques through a guided hands-on workshop designed specifically for complete beginners.",
    highlights: [
      "Guided acrylic & oil color blending techniques",
      "All professional painting materials included",
      "Friendly atmosphere with expert step-by-step instruction",
      "Take home your completed 12x16 canvas artwork",
    ],
    included: ["Art materials & canvas", "Instructor guidance", "Studio access & refreshments", "Finished artwork to take home"],
    whatToExpect: [
      { time: "00:00 - 00:20", title: "Color Theory & Brush Intro", detail: "Learn about primary palettes and canvas preparation." },
      { time: "00:20 - 01:30", title: "Guided Painting Session", detail: "Step-by-step painting process with live instruction." },
      { time: "01:30 - 02:00", title: "Final Touches & Sharing", detail: "Dry your canvas, add accents, and share your masterpiece." },
    ],
    requirements: ["No previous painting experience required.", "Open to all age 16+"],
    whatToBring: ["An open mind and comfortable clothes that can get a splash of paint!"],
    schedule: [
      { id: "s1", date: "Thursday, Aug 12", time: "3:00 PM - 5:00 PM", seatsLeft: 6 },
      { id: "s2", date: "Saturday, Aug 14", time: "10:00 AM - 12:00 PM", seatsLeft: 4 },
    ],
    color: "#EF4444",
    symbol: "🎨",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 48,
  },
  {
    id: "advanced-painting-workshop",
    name: "Advanced Painting Workshop",
    vendorId: "abc-creative-studio",
    vendorName: "ABC Creative Studio",
    category: "Painting",
    duration: "2.5 hours",
    location: "Makati Studio",
    description: "Develop advanced painting techniques, textural palette knife application, and lighting composition with a master instructor.",
    highlights: ["Impasto knife techniques and layering", "Complex light and shadow composition", "Personalized feedback"],
    included: ["Heavyweight linen canvas", "Professional artist grade paints & mediums", "Master artist feedback"],
    whatToExpect: [
      { time: "00:00 - 00:30", title: "Textural Techniques", detail: "Demonstration of impasto mediums." },
      { time: "00:30 - 02:30", title: "Guided Execution", detail: "Working on your canvas with coaching." },
    ],
    requirements: ["Basic painting experience recommended."],
    whatToBring: ["Reference photo (optional)."],
    schedule: [{ id: "s3", date: "Friday, Aug 13", time: "4:00 PM - 6:30 PM", seatsLeft: 5 }],
    color: "#EF4444",
    symbol: "🖼️",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 32,
  },
  {
    id: "portrait-photography-session",
    name: "Portrait Photography Session",
    vendorId: "abc-creative-studio",
    vendorName: "ABC Creative Studio",
    category: "Photography",
    duration: "2 hours",
    location: "Makati Studio & Outdoor Garden",
    description: "Learn portrait photography through a guided practical session focusing on natural light, posing, and framing.",
    highlights: ["Master natural lighting", "Posing techniques for authentic expressions", "Hands-on practice"],
    included: ["Studio lighting equipment access", "Guided portrait model practice"],
    whatToExpect: [
      { time: "00:00 - 00:30", title: "Framing & Light Angles", detail: "Understanding soft light." },
      { time: "00:30 - 02:00", title: "Practical Shooting", detail: "Partner & model photography drills." },
    ],
    requirements: ["DSLR, mirrorless, or smartphone."],
    whatToBring: ["Camera/phone."],
    schedule: [{ id: "s4", date: "Wednesday, Aug 11", time: "2:00 PM - 4:00 PM", seatsLeft: 7 }],
    color: "#10B981",
    symbol: "📷",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 44,
  },

  // Studio Lumen
  {
    id: "heart-of-art",
    name: "Watercolour Without Perfection",
    vendorId: "studio-lumen",
    vendorName: "Studio Lumen",
    category: "Watercolour",
    duration: "90 min",
    location: "Shoreditch Studio",
    description: "Make room for colour, curiosity, and your own point of view with intuitive watercolour exercises.",
    highlights: ["Wet-on-wet technique drills", "Mindful color mixing", "Framed take-home artwork"],
    included: ["Watercolour paper & palette kit", "Studio instructor guidance"],
    whatToExpect: [
      { time: "00:00 - 00:20", title: "Mindful Mark Making", detail: "Loosening up with water washes." },
      { time: "00:20 - 01:30", title: "Layering & Painting", detail: "Creating visual depth." },
    ],
    requirements: ["No art background necessary."],
    whatToBring: ["None."],
    schedule: [{ id: "s5", date: "Thursday, Aug 8", time: "3:00 PM - 4:30 PM", seatsLeft: 12 }],
    color: "#EF4444",
    symbol: "🎨",
    image: "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 142,
  },
  {
    id: "visual-journaling-lab",
    name: "Visual Journaling & Collage",
    vendorId: "studio-lumen",
    vendorName: "Studio Lumen",
    category: "Journaling",
    duration: "75 min",
    location: "Shoreditch Studio",
    description: "Combine mixed media, magazine cutouts, and ink sketches into a personalized reflective journal.",
    highlights: ["Mixed media techniques", "Expressive prompt exercises"],
    included: ["Hardcover art journal", "Collage materials & inks"],
    whatToExpect: [{ time: "00:00 - 01:15", title: "Journal Creation", detail: "Layering paper and textures." }],
    requirements: ["Open to all."],
    whatToBring: ["Personal photos (optional)."],
    schedule: [{ id: "s6", date: "Saturday, Aug 10", time: "11:00 AM - 12:15 PM", seatsLeft: 8 }],
    color: "#EF4444",
    symbol: "📖",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 38,
  },

  // Maya Ellison Mindful Movement
  {
    id: "desk-to-mat-yoga",
    name: "Desk-to-Mat Restorative Yoga",
    vendorId: "maya-ellison-studio",
    vendorName: "Maya Ellison Mindful Movement",
    category: "Yoga",
    duration: "45 min",
    location: "Ortigas Studio",
    description: "Release posture tension in hips, shoulders, and lower back with gentle restorative stretches.",
    highlights: ["Spinal alignment & shoulder release", "Guided deep breathing"],
    included: ["Mat rental", "Aromatherapy oils"],
    whatToExpect: [{ time: "00:00 - 00:45", title: "Flow & Relaxation", detail: "Gentle postures." }],
    requirements: ["Suitable for all fitness levels."],
    whatToBring: ["Comfortable activewear."],
    schedule: [{ id: "s7", date: "Wednesday, Aug 14", time: "12:15 PM - 1:00 PM", seatsLeft: 10 }],
    color: "#10B981",
    symbol: "🧘",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 72,
  },

  // The Rhythm Room
  {
    id: "rhythm-and-groove-lab",
    name: "Bring the Energy Back: Rhythm Lab",
    vendorId: "rhythm-room",
    vendorName: "The Rhythm Room",
    category: "Dance",
    duration: "60 min",
    location: "Quezon City Studio",
    description: "High-energy, feel-good group dance session focused on rhythm, freedom, and play.",
    highlights: ["Accessible street dance moves", "UP-beat live DJ set"],
    included: ["Towel & hydration station"],
    whatToExpect: [{ time: "00:00 - 01:00", title: "Warmup & Routine", detail: "Fun choreography." }],
    requirements: ["No dance experience needed."],
    whatToBring: ["Sneakers and water bottle."],
    schedule: [{ id: "s8", date: "Friday, Aug 16", time: "6:00 PM - 7:00 PM", seatsLeft: 15 }],
    color: "#8B5CF6",
    symbol: "💃",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 65,
  },

  // Cocoa Collective
  {
    id: "five-sense-chocolate-workshop",
    name: "The Five-Sense Chocolate Workshop",
    vendorId: "cocoa-collective",
    vendorName: "Cocoa Collective",
    category: "Confectionery",
    duration: "2 hours",
    location: "Quezon City Studio",
    description: "A delicious way to pause, share stories, and craft custom truffles and single-origin chocolate bars.",
    highlights: ["Single-origin bean tasting", "Tempering chocolate techniques", "Custom truffle box creation"],
    included: ["Single-origin cocoa ingredients", "Gift packaging for your truffles"],
    whatToExpect: [
      { time: "00:00 - 00:30", title: "Tasting Flight", detail: "Discover bean-to-bar flavors." },
      { time: "00:30 - 02:00", title: "Truffle Making & Packaging", detail: "Infusing ganache and molding chocolate." },
    ],
    requirements: ["Notify us of any nut allergies."],
    whatToBring: ["Sweet tooth!"],
    schedule: [{ id: "s9", date: "Friday, Aug 13", time: "5:00 PM - 7:00 PM", seatsLeft: 8 }],
    color: "#F59E0B",
    symbol: "🍫",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 96,
  },

  // Barista Craft Studio
  {
    id: "latte-art-espresso-lab",
    name: "Latte Art & Espresso Extraction",
    vendorId: "barista-craft-studio",
    vendorName: "Barista Craft Studio",
    category: "Barista Skills",
    duration: "90 min",
    location: "Makati Roastery",
    description: "Steam silky microfoam milk and pour hearts, rosettas, and tulips on fresh espresso shots.",
    highlights: ["Commercial espresso machine operation", "Microfoam steaming technique"],
    included: ["Unlimited specialty coffee beans", "Dairy & plant milk options"],
    whatToExpect: [{ time: "00:00 - 01:30", title: "Steaming & Pouring", detail: "Hands-on latte art practice." }],
    requirements: ["No barista experience needed."],
    whatToBring: ["Love for coffee!"],
    schedule: [{ id: "s10", date: "Saturday, Aug 17", time: "1:00 PM - 2:30 PM", seatsLeft: 6 }],
    color: "#F59E0B",
    symbol: "☕",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 45,
  },

  // Technut Makers Studio
  {
    id: "drone-piloting-basics",
    name: "Drone Piloting & Aerial Tech",
    vendorId: "digital-makers-lab",
    vendorName: "Technut Makers Studio",
    category: "Robotics",
    duration: "90 min",
    location: "BGC Tech Zone",
    description: "Learn flight physics, obstacle navigation, and aerial camera controls in a safe indoor flight arena.",
    highlights: ["FPV drone headset experience", "Precision landing drills"],
    included: ["Training drone provided", "Safety gear"],
    whatToExpect: [{ time: "00:00 - 01:30", title: "Flight Arena Drills", detail: "Obstacle course flying." }],
    requirements: ["Age 12+"],
    whatToBring: ["None."],
    schedule: [{ id: "s11", date: "Sunday, Aug 18", time: "2:00 PM - 3:30 PM", seatsLeft: 6 }],
    color: "#33C4F0",
    symbol: "🤖",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 30,
  },

  // Outward Exploration Co.
  {
    id: "urban-photography-walk",
    name: "Heritage & Urban Photography Walk",
    vendorId: "outward-exploration-co",
    vendorName: "Outward Exploration Co.",
    category: "Culture Trips",
    duration: "Half day",
    location: "Intramuros & Manila",
    description: "Explore historical streets while capturing architectural details and street portraits with a guide.",
    highlights: ["Guided photowalk route", "Street composition tips"],
    included: ["Guide & snacks", "Intramuros museum entry"],
    whatToExpect: [{ time: "00:00 - 03:00", title: "Guided Photowalk", detail: "Exploring historical landmarks." }],
    requirements: ["Comfortable walking shoes."],
    whatToBring: ["Camera or smartphone."],
    schedule: [{ id: "s12", date: "Saturday, Aug 24", time: "8:00 AM - 11:30 AM", seatsLeft: 12 }],
    color: "#0F766E",
    symbol: "⛰️",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviewsCount: 28,
  },
];

export const themeCategories = [
  { id: "all", name: "All Service Brands", symbol: "✨", color: "#1a1a28", description: "Browse all verified subscription service brands." },
  { id: "Heart of Art", name: "Heart of Art", symbol: "🎨", color: "#EF4444", description: "Creative wellbeing: watercolour, painting, visual journaling." },
  { id: "Athletic Fanatics", name: "Athletic Fanatics", symbol: "🧘", color: "#10B981", description: "Movement & mindfulness: yoga, Pilates, breathwork." },
  { id: "Moves & Grooves", name: "Moves & Grooves", symbol: "💃", color: "#8B5CF6", description: "Energy & connection: dance, rhythm labs, music." },
  { id: "Chowdown", name: "Chowdown", symbol: "🍫", color: "#F59E0B", description: "Connection through food: chocolate making, barista skills." },
  { id: "Technut", name: "Technut", symbol: "🤖", color: "#33C4F0", description: "Curious making: robotics, drones, 3D printing." },
  { id: "Trip and Tell", name: "Trip and Tell", symbol: "⛰️", color: "#0F766E", description: "Outward exploration: hiking, culture trips, outdoor days." },
];
