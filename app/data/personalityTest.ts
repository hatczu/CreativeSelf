import { personalityTypes, type PersonalityType } from '~/data/personalityTypes';

export type PersonalityKey = 'original' | 'imaginative' | 'innovative' | 'expressive' | 'explorer';

export interface TestQuestion {
  id: number;
  question: string;
  options: { label: string; scores: Partial<Record<PersonalityKey, number>> }[];
}

export const personalityQuestions: TestQuestion[] = [
  {
    id: 1,
    question: 'When you have free time, what calls to you most?',
    options: [
      { label: 'Creating something entirely new and different', scores: { original: 3, imaginative: 1 } },
      { label: 'Getting lost in daydreams and visions', scores: { imaginative: 3, expressive: 1 } },
      { label: 'Building or fixing something with your hands', scores: { innovative: 3, original: 1 } },
      { label: 'Performing, writing, or making something emotional', scores: { expressive: 3, imaginative: 1 } },
      { label: 'Going somewhere new and discovering it', scores: { explorer: 3, innovative: 1 } },
    ],
  },
  {
    id: 2,
    question: 'How do you usually solve a challenging problem?',
    options: [
      { label: 'I flip it upside down and approach it totally differently', scores: { original: 3, innovative: 1 } },
      { label: 'I imagine all the possibilities and pick the most vivid one', scores: { imaginative: 3, original: 1 } },
      { label: 'I break it into parts and systematically find a solution', scores: { innovative: 3, explorer: 1 } },
      { label: 'I trust my gut and express what feels right', scores: { expressive: 3, imaginative: 1 } },
      { label: 'I explore different perspectives and learn from others', scores: { explorer: 3, expressive: 1 } },
    ],
  },
  {
    id: 3,
    question: 'Which kind of experience excites you most?',
    options: [
      { label: 'Starting a creative project nobody has tried before', scores: { original: 3 } },
      { label: 'An immersive experience that sparks your imagination', scores: { imaginative: 3, expressive: 1 } },
      { label: 'Learning a new technical skill or building something', scores: { innovative: 3 } },
      { label: 'Performing, sharing art, or connecting emotionally', scores: { expressive: 3, original: 1 } },
      { label: 'Traveling somewhere culturally rich and unfamiliar', scores: { explorer: 3, imaginative: 1 } },
    ],
  },
  {
    id: 4,
    question: 'When you think of creativity, what comes to mind first?',
    options: [
      { label: 'Breaking rules and setting new standards', scores: { original: 3 } },
      { label: 'Painting vivid pictures in your mind and on canvas', scores: { imaginative: 3 } },
      { label: 'Inventing something that solves a real problem', scores: { innovative: 3, original: 1 } },
      { label: 'Expressing feelings that words alone cannot capture', scores: { expressive: 3 } },
      { label: 'Wandering without a plan and finding unexpected beauty', scores: { explorer: 3, imaginative: 1 } },
    ],
  },
  {
    id: 5,
    question: 'Which environment helps you thrive?',
    options: [
      { label: 'A blank canvas with total freedom to experiment', scores: { original: 3, expressive: 1 } },
      { label: 'A calm, dreamy space full of inspiration and wonder', scores: { imaginative: 3 } },
      { label: 'A lab, workshop, or space full of tools and materials', scores: { innovative: 3, original: 1 } },
      { label: 'A stage, studio, or community where you can share', scores: { expressive: 3, explorer: 1 } },
      { label: 'Outdoors, on the move, discovering the world', scores: { explorer: 3, expressive: 1 } },
    ],
  },
];

export const personalityMap: Record<PersonalityKey, PersonalityType> = {
  original: personalityTypes[0]!,
  imaginative: personalityTypes[1]!,
  innovative: personalityTypes[2]!,
  expressive: personalityTypes[3]!,
  explorer: personalityTypes[4]!,
};
