declare const __ARTIFACT_BUILD__: boolean;

/**
 * In the artifact build, the host can put its own plain `#name` in the URL, which the
 * hash router would read as an unknown page. Send any unmatched route to the home page
 * instead of showing "Page not found".
 */
export default defineNuxtPlugin(() => {
  if (!__ARTIFACT_BUILD__) return;
  const router = useRouter();
  router.beforeEach((to) => (to.matched.length === 0 ? { path: '/', replace: true } : undefined));
});
