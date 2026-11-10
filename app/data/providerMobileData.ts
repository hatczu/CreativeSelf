import type { CalendarDay } from '~/data/mobileCalendarData';

export interface ProviderService {
  id: string;
  title: string;
  format: string;
  price: string;
  views: string;
  bookings: string;
  published: boolean;
  color: string;
  emoji: string;
  image: string;
  description: string;
  maxGuests?: string;
  category?: string;
}

export interface ProviderBooking {
  id: string;
  company: string;
  session: string;
  date: string;
  group: string;
  status: string;
  color: string;
  emoji: string;
}

/** Story posted from the provider mobile app (subset of a client-side brand story). */
export interface ProviderStory {
  id: string;
  name: string;
  title: string;
  image: string;
  quote: string;
  category: string;
  emoji?: string;
  gradient?: string;
  vendorId?: string;
  vendorName?: string;
}

export const sampleProviderListings: ProviderService[] = [
  {
    id: 'watercolour',
    title: 'Watercolour without perfection',
    format: '90 min · Team workshop',
    price: '$45/person',
    views: '264',
    bookings: '8',
    published: true,
    color: '#EF4444',
    emoji: '🎨',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Thoughtful art experience for teams that need an expressive creative reset.',
  },
  {
    id: 'behind-scenes',
    title: 'Colour as a way to reset',
    format: '60 min · Pop-up session',
    price: '$35/person',
    views: '187',
    bookings: '5',
    published: true,
    color: '#F59E0B',
    emoji: '🖌️',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    description: 'Quick desk-side color workshop designed for remote & hybrid teams.',
  },
];

export const sampleProviderBookings: ProviderBooking[] = [
  { id: 'b1', company: 'Northstar Studio', session: 'Watercolour without perfection', date: 'Thu, Aug 8 · 3:00 PM', group: '12 guests', status: 'Confirmed', color: '#EF4444', emoji: '🎨' },
  { id: 'b2', company: 'HiNote Consulting', session: 'Colour as a way to reset', date: 'Tue, Aug 13 · 10:30 AM', group: '18 guests', status: 'Needs response', color: '#F59E0B', emoji: '🖌️' },
  { id: 'b3', company: 'Mosaic Labs', session: 'Playful portrait workshop', date: 'Fri, Aug 16 · 2:00 PM', group: '10 guests', status: 'Confirmed', color: '#8B5CF6', emoji: '✨' },
];

export const providerBookingWeeks: CalendarDay[][] = [
  // August 2026
  [
    { day: 'Mon', date: 3, month: 'August', year: 2026, hasBooking: false },
    { day: 'Tue', date: 4, month: 'August', year: 2026, hasBooking: false },
    { day: 'Wed', date: 5, month: 'August', year: 2026, hasBooking: false },
    { day: 'Thu', date: 6, month: 'August', year: 2026, hasBooking: false },
    { day: 'Fri', date: 7, month: 'August', year: 2026, hasBooking: false },
    { day: 'Sat', date: 8, month: 'August', year: 2026, hasBooking: true },
    { day: 'Sun', date: 9, month: 'August', year: 2026, hasBooking: false },
  ],
  [
    { day: 'Mon', date: 10, month: 'August', year: 2026, hasBooking: false },
    { day: 'Tue', date: 11, month: 'August', year: 2026, hasBooking: false },
    { day: 'Wed', date: 12, month: 'August', year: 2026, hasBooking: false },
    { day: 'Thu', date: 13, month: 'August', year: 2026, hasBooking: true },
    { day: 'Fri', date: 14, month: 'August', year: 2026, hasBooking: false },
    { day: 'Sat', date: 15, month: 'August', year: 2026, hasBooking: false },
    { day: 'Sun', date: 16, month: 'August', year: 2026, hasBooking: true },
  ],
  // Mid August
  [
    { day: 'Mon', date: 17, month: 'August', year: 2026, hasBooking: false },
    { day: 'Tue', date: 18, month: 'August', year: 2026, hasBooking: false },
    { day: 'Wed', date: 19, month: 'August', year: 2026, hasBooking: false },
    { day: 'Thu', date: 20, month: 'August', year: 2026, hasBooking: false },
    { day: 'Fri', date: 21, month: 'August', year: 2026, hasBooking: true },
    { day: 'Sat', date: 22, month: 'August', year: 2026, hasBooking: false },
    { day: 'Sun', date: 23, month: 'August', year: 2026, hasBooking: false },
  ],
  // September 2026
  [
    { day: 'Mon', date: 31, month: 'August', year: 2026, hasBooking: false },
    { day: 'Tue', date: 1, month: 'September', year: 2026, hasBooking: false },
    { day: 'Wed', date: 2, month: 'September', year: 2026, hasBooking: false },
    { day: 'Thu', date: 3, month: 'September', year: 2026, hasBooking: true },
    { day: 'Fri', date: 4, month: 'September', year: 2026, hasBooking: false },
    { day: 'Sat', date: 5, month: 'September', year: 2026, hasBooking: false },
    { day: 'Sun', date: 6, month: 'September', year: 2026, hasBooking: false },
  ],
];

export const providerSampleAttendees = [
  { id: 'att-1', name: 'Alex R.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  { id: 'att-2', name: 'Sarah C.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
  { id: 'att-3', name: 'Marcus V.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
];
