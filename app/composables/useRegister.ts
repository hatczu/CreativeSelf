export type RegisterCategory = 'individual' | 'corporate';

/** Navigate to the registration page, optionally preselecting a plan / category. */
export function useRegister() {
  const openRegister = (planId?: string, category?: RegisterCategory) => {
    const query: Record<string, string> = {};
    if (planId) query.plan = planId;
    if (category) query.category = category;
    return navigateTo({ path: '/register', query });
  };
  return { openRegister };
}
