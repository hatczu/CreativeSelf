export interface PersonalityType {
  name: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
  description: string;
  traits: string[];
  activities: string[];
}

export const personalityTypes: PersonalityType[] = [
  {
    name: 'The Original',
    emoji: '⚡',
    color: '#F59E0B',
    bg: '#FFF8E7',
    border: '#F59E0B30',
    description: 'Challenge the status quo with bold, trailblazing ideas.',
    traits: ['Unconventional', 'Bold', 'Trailblazing'],
    activities: ['Conceptual Art', 'Experimental Music'],
  },
  {
    name: 'The Imaginative',
    emoji: '🌌',
    color: '#3B82F6',
    bg: '#EFF6FF',
    border: '#3B82F630',
    description: 'Think in metaphors and paint vivid worlds.',
    traits: ['Visionary', 'Dreamy', 'Abstract'],
    activities: ['Photography', 'Filmmaking'],
  },
  {
    name: 'The Innovative',
    emoji: '🚀',
    color: '#10B981',
    bg: '#ECFDF5',
    border: '#10B98130',
    description: 'Solve puzzles, invent, and build solutions.',
    traits: ['Inventive', 'Problem-Solver', 'Systematic'],
    activities: ['Robotics', 'Gaming'],
  },
  {
    name: 'The Expressive',
    emoji: '🎭',
    color: '#EF4444',
    bg: '#FFF1F2',
    border: '#EF444430',
    description: 'Communicate through emotion, performance, and art.',
    traits: ['Emotional', 'Performing', 'Authentic'],
    activities: ['Dance', 'Music', 'Theatre'],
  },
  {
    name: 'The Explorer',
    emoji: '🧭',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    border: '#8B5CF630',
    description: 'Seek new experiences, places, and perspectives.',
    traits: ['Adventurous', 'Curious', 'Cultural'],
    activities: ['Travel', 'Hiking', 'Diving'],
  },
];
