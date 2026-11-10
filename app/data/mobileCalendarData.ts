export interface CalendarDay {
  day: string;
  date: number;
  month: string;
  year: number;
  hasBooking: boolean;
}

export const bookingWeeks: CalendarDay[][] = [
  // July 2026
  [
    { day: 'Mon', date: 20, month: 'July', year: 2026, hasBooking: false },
    { day: 'Tue', date: 21, month: 'July', year: 2026, hasBooking: false },
    { day: 'Wed', date: 22, month: 'July', year: 2026, hasBooking: true },
    { day: 'Thu', date: 23, month: 'July', year: 2026, hasBooking: false },
    { day: 'Fri', date: 24, month: 'July', year: 2026, hasBooking: false },
    { day: 'Sat', date: 25, month: 'July', year: 2026, hasBooking: false },
    { day: 'Sun', date: 26, month: 'July', year: 2026, hasBooking: false },
  ],
  [
    { day: 'Mon', date: 27, month: 'July', year: 2026, hasBooking: false },
    { day: 'Tue', date: 28, month: 'July', year: 2026, hasBooking: false },
    { day: 'Wed', date: 29, month: 'July', year: 2026, hasBooking: false },
    { day: 'Thu', date: 30, month: 'July', year: 2026, hasBooking: false },
    { day: 'Fri', date: 31, month: 'July', year: 2026, hasBooking: true },
    { day: 'Sat', date: 1, month: 'August', year: 2026, hasBooking: false },
    { day: 'Sun', date: 2, month: 'August', year: 2026, hasBooking: false },
  ],
  // August 2026
  [
    { day: 'Mon', date: 17, month: 'August', year: 2026, hasBooking: false },
    { day: 'Tue', date: 18, month: 'August', year: 2026, hasBooking: false },
    { day: 'Wed', date: 19, month: 'August', year: 2026, hasBooking: false },
    { day: 'Thu', date: 20, month: 'August', year: 2026, hasBooking: false },
    { day: 'Fri', date: 21, month: 'August', year: 2026, hasBooking: true },
    { day: 'Sat', date: 22, month: 'August', year: 2026, hasBooking: false },
    { day: 'Sun', date: 23, month: 'August', year: 2026, hasBooking: true },
  ],
  [
    { day: 'Mon', date: 24, month: 'August', year: 2026, hasBooking: false },
    { day: 'Tue', date: 25, month: 'August', year: 2026, hasBooking: false },
    { day: 'Wed', date: 26, month: 'August', year: 2026, hasBooking: false },
    { day: 'Thu', date: 27, month: 'August', year: 2026, hasBooking: false },
    { day: 'Fri', date: 28, month: 'August', year: 2026, hasBooking: false },
    { day: 'Sat', date: 29, month: 'August', year: 2026, hasBooking: false },
    { day: 'Sun', date: 30, month: 'August', year: 2026, hasBooking: false },
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
  [
    { day: 'Mon', date: 7, month: 'September', year: 2026, hasBooking: false },
    { day: 'Tue', date: 8, month: 'September', year: 2026, hasBooking: false },
    { day: 'Wed', date: 9, month: 'September', year: 2026, hasBooking: false },
    { day: 'Thu', date: 10, month: 'September', year: 2026, hasBooking: false },
    { day: 'Fri', date: 11, month: 'September', year: 2026, hasBooking: true },
    { day: 'Sat', date: 12, month: 'September', year: 2026, hasBooking: false },
    { day: 'Sun', date: 13, month: 'September', year: 2026, hasBooking: false },
  ],
  // October 2026
  [
    { day: 'Mon', date: 28, month: 'September', year: 2026, hasBooking: false },
    { day: 'Tue', date: 29, month: 'September', year: 2026, hasBooking: false },
    { day: 'Wed', date: 30, month: 'September', year: 2026, hasBooking: false },
    { day: 'Thu', date: 1, month: 'October', year: 2026, hasBooking: false },
    { day: 'Fri', date: 2, month: 'October', year: 2026, hasBooking: true },
    { day: 'Sat', date: 3, month: 'October', year: 2026, hasBooking: false },
    { day: 'Sun', date: 4, month: 'October', year: 2026, hasBooking: false },
  ],
];

export const sampleAttendees = [
  { id: 'att-1', name: 'Sarah J.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
  { id: 'att-2', name: 'Marcus V.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
  { id: 'att-3', name: 'Elena R.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
];
