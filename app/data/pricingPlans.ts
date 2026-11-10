export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  sub: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  color: string;
}

export const individualPlans: PricingPlan[] = [
  {
    id: 'basic-creative',
    name: 'Basic Creative',
    price: 'Free',
    sub: 'Forever',
    features: ['1 service brand', '2 activities per month', 'Creative Personality Assessment', 'Acumen AI recommendations'],
    cta: 'Select Basic',
    highlighted: false,
    color: '#717182',
  },
  {
    id: 'advanced-creative',
    name: 'Advanced Creative',
    price: '$49',
    sub: 'per month',
    features: ['2 service brands', '4 activities per month', 'Full Acumen AI analysis', 'Personalized learning plan', 'Priority reservations'],
    cta: 'Select Advanced',
    highlighted: true,
    color: '#33C4F0',
  },
  {
    id: 'elite-creative',
    name: 'Elite Creative',
    price: '$99',
    sub: 'per month',
    features: ['3 service brands', '6 activities per month', 'Unlimited Acumen AI', 'Custom learning journeys', 'Exclusive experiences'],
    cta: 'Select Elite',
    highlighted: false,
    color: '#8B5CF6',
  },
  {
    id: 'one-on-one-creative',
    name: 'One-on-One Creative',
    price: 'Custom',
    sub: 'pricing',
    features: ['Custom consulting and coaching fees apply.', 'Personal creative coaching', 'Direct expert access', 'Flexible scheduling'],
    cta: 'Apply One-on-One',
    highlighted: false,
    color: '#F59E0B',
  },
];

export const corporatePlans: PricingPlan[] = [
  {
    id: 'basic-creative-team',
    name: 'Basic Creative Team',
    price: '$299',
    sub: 'per month',
    features: ['2 service brands', '4 activities with 8 employees per month', 'Team engagement dashboard'],
    cta: 'Start Team Plan',
    highlighted: false,
    color: '#717182',
  },
  {
    id: 'advanced-creative-team',
    name: 'Advanced Creative Team',
    price: '$599',
    sub: 'per month',
    features: ['4 service brands', '6 activities with 10 employees per month', 'Corporate engagement reports', 'Dedicated account manager'],
    cta: 'Scale Your Team',
    highlighted: true,
    color: '#33C4F0',
  },
  {
    id: 'elite-creative-team',
    name: 'Elite Creative Team',
    price: '$1,199',
    sub: 'per month',
    features: ['6 service brands', '12 activities with 15 employees per month', 'Executive insights dashboard', 'On-site facilitation'],
    cta: 'Go Enterprise',
    highlighted: false,
    color: '#8B5CF6',
  },
  {
    id: 'custom-creative-corporate',
    name: 'Custom Creative Activities',
    price: 'Custom',
    sub: 'pricing',
    features: ['Custom Creative Activities', 'Learning Plans and Consulting', 'Corporate Consulting', 'Enterprise SLA & Support'],
    cta: 'Inquire Custom',
    highlighted: false,
    color: '#F59E0B',
  },
];
