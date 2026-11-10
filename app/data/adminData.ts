export type AdminSection = 'overview' | 'clients' | 'vendors' | 'content' | 'categories' | 'users' | 'reports' | 'audit';

export type ContentItem = {
  id: string;
  title: string;
  by: string;
  state: 'Published' | 'Reported';
  date: string;
  category: string;
  snippet: string;
  color: string;
  image: string;
  additionalImages?: string[];
  likes?: number;
  comments?: number;
};

export const clientRows = [
  { name: 'Northstar Studio', plan: 'Advanced Corporate', people: 84, state: 'Active' },
  { name: 'HiNote Consulting', plan: 'Enterprise', people: 210, state: 'Active' },
  { name: 'Mosaic Labs', plan: 'Starter Corporate', people: 32, state: 'Trial' },
];
export const vendorRows = [
  { name: 'Studio Lumen', type: 'Activity provider', service: 'Heart of Art', state: 'Active' },
  { name: 'Maya Ellison', type: 'Trainer', service: 'Athletic Fanatics', state: 'Active' },
  { name: 'Cocoa Collective', type: 'Talent', service: 'Chowdown', state: 'Review' },
];
export const initialContentRows: ContentItem[] = [
  {
    id: '1',
    title: 'A gentle kind of team reset: Desk-to-mat guided flow',
    by: 'Studio Lumen',
    state: 'Published',
    date: '2 hours ago',
    category: 'Team Reset',
    snippet: 'Discover how short 15-minute guided breathwork sessions can rebuild team focus, align energy, and reduce afternoon workplace burnout.',
    color: '#33c4f0',
    image: 'https://images.unsplash.com/photo-1758874384683-0accd9fb26ee?w=800&h=500&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop&auto=format'
    ],
    likes: 42,
    comments: 6
  },
  {
    id: '2',
    title: 'The five-sense chocolate workshop for team bonding',
    by: 'Cocoa Collective',
    state: 'Reported',
    date: '5 hours ago',
    category: 'Workshops',
    snippet: 'Interactive chocolate tasting experience designed for corporate team bonding, sensory mindfulness, and artisanal flavor exploration.',
    color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=500&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=500&fit=crop&auto=format'
    ],
    likes: 18,
    comments: 3
  },
  {
    id: '3',
    title: 'Why a midweek stretch works for sedentary teams',
    by: 'Maya Ellison',
    state: 'Published',
    date: '1 day ago',
    category: 'Fitness & Ergonomics',
    snippet: 'Simple desk-friendly mobility exercises to alleviate back strain and improve posture throughout the workday without sweating.',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=500&fit=crop&auto=format',
    likes: 89,
    comments: 14
  },
  {
    id: '4',
    title: 'Mindful pottery & creative expressions studio session',
    by: 'Studio Lumen',
    state: 'Published',
    date: '2 days ago',
    category: 'Art & Creativity',
    snippet: 'Hands-on ceramic pottery workshop designed to ignite creative problem-solving and relaxation among team members.',
    color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1510832842230-87253f48d74f?w=800&h=500&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&h=500&fit=crop&auto=format'
    ],
    likes: 64,
    comments: 9
  }
];
export const auditRows = [
  { time: '9:42 AM', actor: 'Amelia Rose', action: 'approved vendor profile', target: 'Studio Lumen' },
  { time: '9:15 AM', actor: 'Leon Chen', action: 'updated user role', target: 'Julian Price' },
  { time: 'Yesterday', actor: 'System', action: 'flagged content for review', target: 'Chocolate workshop post' },
];

export const userRows = [
  { name: 'Amelia Rose', role: 'Platform admin', joined: 'Jan 2024', state: 'Active' },
  { name: 'Julian Price', role: 'Client manager', joined: 'Feb 2024', state: 'Active' },
  { name: 'Sofia Reyes', role: 'Vendor owner', joined: 'Mar 2024', state: 'Invite sent' },
];

export const initialCategories = ['Heart of Art', 'Athletic Fanatics', 'Chowdown', 'Moves & Grooves', 'Technut', 'Trip and Tell'];
