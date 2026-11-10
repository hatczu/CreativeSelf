export interface VendorService {
  name: string;
  format: string;
  price: string;
  views: number;
  bookings: number;
  color: string;
  emoji: string;
  live: boolean;
  image: string;
}

export interface VendorRosterInvite {
  id: string;
  name: string;
  email: string;
  department: string;
  code: string;
  status: string;
}

export interface VendorCorporateBooking {
  id: string;
  client: string;
  planName: string;
  service: string;
  time: string;
  location: string;
  status: string;
  color: string;
  emoji: string;
  slotsAllocated: number;
  slotsClaimed: number;
  invites: VendorRosterInvite[];
}

export const vendorServices: VendorService[] = [
  { name: "Watercolour without perfection", format: "90 min · Team workshop", price: "From £420", views: 264, bookings: 8, color: "#EF4444", emoji: "🎨", live: true, image: "https://images.unsplash.com/photo-1510832842230-87253f48d74f?auto=format&fit=crop&w=800&q=80" },
  { name: "Colour as a way to reset", format: "60 min · Pop-up session", price: "From £310", views: 187, bookings: 5, color: "#F59E0B", emoji: "🖌️", live: true, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" },
  { name: "Playful portrait workshop", format: "75 min · Team workshop", price: "From £380", views: 0, bookings: 0, color: "#8B5CF6", emoji: "✨", live: false, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80" },
];

export const vendorCorporateBookings: VendorCorporateBooking[] = [
  {
    id: "vbook-1",
    client: "Northstar Studio",
    planName: "Basic Creative Corporate Plan",
    service: "Watercolour without perfection",
    time: "Thu, Aug 8 · 3:00 PM · 90 min",
    location: "Lumen Studio, Shoreditch",
    status: "Confirmed",
    color: "#EF4444",
    emoji: "🎨",
    slotsAllocated: 15,
    slotsClaimed: 12,
    invites: [
      { id: "e1", name: "Sarah Smith", email: "sarah.smith@northstar.com", department: "Design", code: "NS-ART-881", status: "Going" },
      { id: "e2", name: "Alex Rivera", email: "alex.r@northstar.com", department: "Product", code: "NS-ART-882", status: "Going" },
      { id: "e3", name: "Elena Rostova", email: "elena.r@northstar.com", department: "Engineering", code: "NS-ART-883", status: "Going" },
      { id: "e4", name: "Marcus Chen", email: "marcus.c@northstar.com", department: "Marketing", code: "NS-ART-884", status: "Pending" },
      { id: "e5", name: "Chloe Bennett", email: "chloe.b@northstar.com", department: "People Ops", code: "NS-ART-885", status: "Going" },
      { id: "e6", name: "Daniel Kim", email: "daniel.k@northstar.com", department: "Design", code: "NS-ART-886", status: "Going" },
    ]
  },
  {
    id: "vbook-2",
    client: "HiNote Consulting",
    planName: "Team Wellbeing Corporate Plan",
    service: "Colour as a way to reset",
    time: "Tue, Aug 13 · 10:30 AM · 60 min",
    location: "Online / Virtual Studio",
    status: "Needs response",
    color: "#F59E0B",
    emoji: "🖌️",
    slotsAllocated: 20,
    slotsClaimed: 16,
    invites: [
      { id: "e10", name: "David Vance", email: "d.vance@hinote.com", department: "Consulting", code: "HN-CLR-101", status: "Going" },
      { id: "e11", name: "Jessica Taylor", email: "j.taylor@hinote.com", department: "HR", code: "HN-CLR-102", status: "Going" },
      { id: "e12", name: "Tom Holland", email: "t.holland@hinote.com", department: "Strategy", code: "HN-CLR-103", status: "Pending" },
    ]
  },
  {
    id: "vbook-3",
    client: "Mosaic Labs",
    planName: "Basic Creative Corporate Plan",
    service: "Playful portrait workshop",
    time: "Fri, Aug 16 · 2:00 PM · 75 min",
    location: "Lumen Studio, Shoreditch",
    status: "Confirmed",
    color: "#8B5CF6",
    emoji: "✨",
    slotsAllocated: 12,
    slotsClaimed: 10,
    invites: [
      { id: "e20", name: "Rachel Adams", email: "r.adams@mosaic.io", department: "Research", code: "ML-PRT-201", status: "Going" },
      { id: "e21", name: "Liam Miller", email: "l.miller@mosaic.io", department: "Data Science", code: "ML-PRT-202", status: "Going" },
    ]
  }
];

export const vendorPastBookings: VendorCorporateBooking[] = [
  {
    id: "vbook-past-1",
    client: "Field Notes Agency",
    planName: "Basic Creative Corporate Plan",
    service: "Watercolour without perfection",
    time: "Tue, Jul 23 · 2:00 PM · 90 min",
    location: "Lumen Studio, Shoreditch",
    status: "Completed",
    color: "#EF4444",
    emoji: "🎨",
    slotsAllocated: 14,
    slotsClaimed: 14,
    invites: [
      { id: "ep1", name: "Hannah Lee", email: "hannah@fieldnotes.com", department: "Creative", code: "FN-WAT-901", status: "Going" },
      { id: "ep2", name: "James Wright", email: "james@fieldnotes.com", department: "Operations", code: "FN-WAT-902", status: "Going" },
    ]
  }
];
