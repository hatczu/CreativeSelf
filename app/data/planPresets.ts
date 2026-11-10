import type { PlanConfig } from '~/types/subscription';

export const PLAN_PRESETS: Record<string, PlanConfig> = {
  'basic-creative': {
    name: 'Basic Creative',
    type: 'individual',
    maxBrands: 1,
    maxActivities: 2,
    employeeSlotsPerActivity: 1,
  },
  'advanced-creative': {
    name: 'Advanced Creative',
    type: 'individual',
    maxBrands: 2,
    maxActivities: 4,
    employeeSlotsPerActivity: 1,
  },
  'elite-creative': {
    name: 'Elite Creative',
    type: 'individual',
    maxBrands: 3,
    maxActivities: 6,
    employeeSlotsPerActivity: 1,
  },
  'one-on-one-creative': {
    name: 'One-on-One Creative',
    type: 'individual',
    maxBrands: 3,
    maxActivities: 6,
    employeeSlotsPerActivity: 1,
  },
  'basic-creative-team': {
    name: 'Basic Creative Team',
    type: 'corporate',
    maxBrands: 2,
    maxActivities: 4,
    employeeSlotsPerActivity: 8,
  },
  'advanced-creative-team': {
    name: 'Advanced Creative Team',
    type: 'corporate',
    maxBrands: 4,
    maxActivities: 6,
    employeeSlotsPerActivity: 10,
  },
  'elite-creative-team': {
    name: 'Elite Creative Team',
    type: 'corporate',
    maxBrands: 6,
    maxActivities: 12,
    employeeSlotsPerActivity: 15,
  },
  'custom-creative-corporate': {
    name: 'Custom Creative',
    type: 'corporate',
    maxBrands: 6,
    maxActivities: 12,
    employeeSlotsPerActivity: 20,
  },
};
