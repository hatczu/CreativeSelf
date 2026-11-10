export interface VendorBrand {
  id: string;
  name: string;
  rating: number;
  specialty?: string;
  color?: string;
  avatar?: string;
  tagline?: string;
}

export interface ActivityItem {
  id: string;
  name: string;
  vendorId: string;
  vendorName: string;
  category: string;
  duration: string;
  location: string;
  description: string;
  color?: string;
  symbol?: string;
  image?: string;
  highlights?: string[];
  whatToExpect?: { time: string; title: string; detail: string }[];
  requirements?: string[];
  whatToBring?: string[];
  included?: string[];
}

export interface EmployeeInvite {
  id: string;
  activityId: string;
  activityName: string;
  employeeName: string;
  employeeEmail: string;
  department?: string;
  inviteCode: string;
  sentAt: string;
  status: 'Going' | 'Pending' | 'Not Going' | 'Cancelled';
}

export interface PlanConfig {
  name: string;
  type: 'individual' | 'corporate';
  maxBrands: number;
  maxActivities: number;
  employeeSlotsPerActivity: number;
}
