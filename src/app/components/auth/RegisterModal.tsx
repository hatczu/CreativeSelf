import { RegisterPage } from '../../pages/client';

export function triggerRegisterModal(planId?: string, category?: 'individual' | 'corporate') {
  const params = new URLSearchParams();
  if (planId) params.set('plan', planId);
  if (category) params.set('category', category);
  window.location.href = `/register?${params.toString()}`;
}

export function RegisterModal({ isOpen }: { isOpen: boolean; onClose: () => void; initialPlan?: string; initialCategory?: 'individual' | 'corporate' }) {
  if (!isOpen) return null;
  return <RegisterPage />;
}
