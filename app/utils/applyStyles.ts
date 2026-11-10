/**
 * Imperatively apply inline styles to the event's current target.
 * Used for hover effects (mouseenter/mouseleave) that were previously written
 * as React onMouseEnter/onMouseLeave style mutations.
 */
export function applyStyles(event: Event, styles: Record<string, string>) {
  const el = event.currentTarget as HTMLElement | null;
  if (!el) return;
  Object.assign(el.style, styles);
}

/** `@error` handler that hides a broken image instead of showing the browser placeholder. */
export function hideOnError(event: Event) {
  (event.target as HTMLElement).style.display = 'none';
}
