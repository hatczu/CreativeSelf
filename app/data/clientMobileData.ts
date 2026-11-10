export interface BrandStory {
  id: string;
  name: string;
  emoji: string;
  vendorId: string;
  vendorName: string;
  title: string;
  image: string;
  gradient: string;
  quote: string;
  category: string;
}

export interface OnboardingSlide {
  titlePrefix: string;
  titleHighlight: string;
  highlightColor: string;
  subtext: string;
  buttonColor: string;
  buttonText: string;
  accentGradient: string;
}

export interface MobileBooking {
  id: string;
  activityName: string;
  vendorName: string;
  vendorLogo?: string;
  date: string;
  time: string;
  location: string;
  status: string;
  seats: number;
  color: string;
  symbol: string;
  qrCode: string;
  image: string;
}

/** Booking produced by the multi-step booking wizard (includes the invited roster). */
export type WizardBooking = MobileBooking & { invitedEmails: string[] };

export interface MobileComment {
  id: string;
  user: string;
  avatar: string;
  time: string;
  text: string;
}

export const brandStories: BrandStory[] = [
  {
    id: 'art',
    name: 'Heart of Art',
    emoji: '🎨',
    vendorId: 'abc-creative-studio',
    vendorName: 'Studio Lumen',
    title: 'Watercolour & Expressive Painting Masterclass',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-purple-500 via-pink-400 to-[#33C4F0]',
    quote: 'Express yourself freely without worrying about perfection.',
    category: 'Art',
  },
  {
    id: 'yoga',
    name: 'Athletic Fanatics',
    emoji: '🧘',
    vendorId: 'maya-ellison-studio',
    vendorName: 'Maya Ellison Mindful Movement',
    title: 'Restorative Desk-to-Mat Yoga Flow',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-[#33C4F0] via-teal-400 to-emerald-400',
    quote: 'Reset your spine and calm your thoughts with daily breathwork.',
    category: 'Yoga',
  },
  {
    id: 'tasting',
    name: 'Chowdown',
    emoji: '🍫',
    vendorId: 'cocoa-collective',
    vendorName: 'Cocoa Collective',
    title: 'Artisanal Dark Chocolate & Cocoa Bean Pairing',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-amber-400 via-orange-400 to-rose-400',
    quote: 'Savor rich cocoa aromas and learn bean-to-bar tempering secrets.',
    category: 'Tasting',
  },
  {
    id: 'rhythm',
    name: 'Moves & Grooves',
    emoji: '💃',
    vendorId: 'rhythm-room',
    vendorName: 'The Rhythm Room',
    title: 'Expressive Dance & Vinyl DJ Jam Sessions',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-purple-500 via-indigo-500 to-sky-400',
    quote: 'Unlock high energy and joy through improvisational movement.',
    category: 'Rhythm',
  },
  {
    id: 'robotics',
    name: 'Technut',
    emoji: '🤖',
    vendorId: 'digital-makers-lab',
    vendorName: 'Technut Makers Studio',
    title: 'Creative Robotics & 3D Printed Prototyping',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    quote: 'Build interactive electronic widgets with code & hands-on assembly.',
    category: 'Robotics',
  },
  {
    id: 'photo',
    name: 'Trip and Tell',
    emoji: '📸',
    vendorId: 'outward-exploration-co',
    vendorName: 'Outward Exploration Co.',
    title: 'Urban Heritage & Mobile Portrait Walk',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-rose-400 via-[#33C4F0] to-purple-500',
    quote: 'Capture secret architectural angles and natural light contrasts.',
    category: 'Photo',
  },
];

export const onboardingSlides: OnboardingSlide[] = [
  {
    titlePrefix: 'Discover ',
    titleHighlight: 'Creative Wellness',
    highlightColor: '#33C4F0',
    subtext: 'Nurture your mind, body & soul through curated artistic experiences.',
    buttonColor: '#00B0D9',
    buttonText: 'Next',
    accentGradient: 'linear-gradient(180deg, #33C4F0 0%, rgba(255, 255, 255, 0) 100%)',
  },
  {
    titlePrefix: 'Personalized ',
    titleHighlight: 'Archetypes',
    highlightColor: '#A5289E',
    subtext: 'Tailored recommendations based on your personality test results.',
    buttonColor: '#A5289E',
    buttonText: 'Next',
    accentGradient: 'linear-gradient(180deg, #ED33F0 0%, rgba(255, 255, 255, 0) 100%)',
  },
  {
    titlePrefix: 'Corporate ',
    titleHighlight: 'Benefits',
    highlightColor: '#FE7A03',
    subtext: 'Seamlessly redeem company wellbeing allowances & join team sessions.',
    buttonColor: '#FE7A03',
    buttonText: 'Next',
    accentGradient: 'linear-gradient(180deg, #F0D733 0%, rgba(255, 255, 255, 0) 100%)',
  },
  {
    titlePrefix: 'Book & Track ',
    titleHighlight: 'Growth',
    highlightColor: '#6FD352',
    subtext: 'Scan QR tickets at studios and monitor your creative rhythm over time.',
    buttonColor: '#6FD352',
    buttonText: 'Get Started',
    accentGradient: 'linear-gradient(180deg, #6FD352 0%, rgba(255, 255, 255, 0) 100%)',
  },
];

export const initialMobileBookings: MobileBooking[] = [
  {
    id: 'bk-101',
    activityName: 'Desk-to-Mat Restorative Yoga',
    vendorName: 'Maya Ellison Mindful Movement',
    vendorLogo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    date: 'Wed, Aug 21, 2026',
    time: '12:15 PM - 1:00 PM',
    location: 'Ortigas Studio • Room 302',
    status: 'Confirmed',
    seats: 1,
    color: '#10B981',
    symbol: '🧘',
    qrCode: 'CS-YOGA-8921-2026',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bk-102',
    activityName: 'Watercolour Without Perfection',
    vendorName: 'Studio Lumen',
    vendorLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    date: 'Fri, Aug 23, 2026',
    time: '3:00 PM - 4:30 PM',
    location: 'Shoreditch Studio',
    status: 'Confirmed',
    seats: 2,
    color: '#EF4444',
    symbol: '🎨',
    qrCode: 'CS-ART-4412-2026',
    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=800&q=80',
  },
];
