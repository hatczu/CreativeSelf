# CreativeSelf UI guidelines

## Brand corner rule — "Be anything but square"

The brand line is *Be anything but square*, so the UI is never plain-square and never a
plain pill. Every labelled or interactive surface uses the **brand corner**: three soft
corners and a noticeably rounder **bottom-right** corner (about 2x the others).

Corner order in CSS is top-left, top-right, bottom-right, bottom-left.

| Token / utility | Value | Use for |
| --- | --- | --- |
| `rounded-brand-sm` / `var(--radius-brand-sm)` | `12px 12px 24px 12px` | chips, badges, tags, icon buttons |
| `rounded-brand` / `var(--radius-brand)` | `16px 16px 32px 16px` | buttons, inputs, selects, tabs, toggles |
| `rounded-brand-lg` / `var(--radius-brand-lg)` | `24px 24px 64px 24px` | cards, panels, modals, nav bars |

Large hero cards may go bigger (e.g. `28px 28px 80px 28px`) as long as bottom-right stays the largest.

Do:
- Use the utilities above (defined in `app/assets/css/main.css`) for new buttons, chips and cards.
- In inline styles use `borderRadius: 'var(--radius-brand)'` rather than a raw value.

Don't:
- Use `rounded-full` / `borderRadius: '9999px'` on buttons, links styled as buttons, chips, badges, inputs or bars.
- Use equal corners (`rounded-xl`, `rounded-2xl`, …) on cards or buttons.

Exceptions (stay fully round): avatars and profile photos, status dots, radio indicators,
progress tracks, step dots, decorative glows/blobs and circular icon medallions.
