# CreativeSelf Platform UI — Updated Implementation Plan

## Context

CreativeSelf is a creativity, wellness, personal development, and employee engagement platform. It serves two audiences:
- **Individuals**: Discover their creative personality, find activities, connect with service providers
- **Businesses**: Customized employee engagement to improve creativity, productivity, well-being, and retention

Powered by **Acumen** — an AI that analyzes personality assessment results to recommend activities, service brands, and learning plans.

The full product comprises: a marketing landing page, a personality test, personalized discovery, 11 service brand categories, individual + corporate pricing, a user dashboard, a corporate dashboard, and a vendor management system.

**Core design principle**: "Be Anything But Square" — zero sharp square corners anywhere. All shapes are organic, rounded, fluid, droplet-inspired, or pill-shaped.

---

## Brand & Design System

| Element | Value |
|---|---|
| Brand cyan | `#33C4F0` |
| Brand cyan dark | `#1A9FC4` |
| Charcoal text | `#3A3A4A` |
| Light surface | `#F0FAFF` |
| Rainbow accent | red→orange→yellow→green→cyan→blue→purple |
| Border radius | Minimum `2rem`; pill shapes use `9999px` |
| Font | Plus Jakarta Sans (400/600/700/800) |
| Motion | Subtle floating animations, section fade-in on scroll |

**Image assets** (imported as ES modules via `figma:asset`):
- `figma:asset/1_CS_Logo_Transparent_TAG.png` — nav, dark backgrounds
- `figma:asset/2_CS_Logo_White_BG_TAG.png` — light backgrounds, footer
- `figma:asset/CS_Kaleidescope_Juice_Drop.png` — hero, CTA banner, decoration

---

## Routing Structure (React Router)

```
/                     → Landing page
/test                 → Creative Personality Test (Acumen)
/discover             → Activity & brand discovery
/dashboard            → Individual user dashboard
/corporate            → Corporate dashboard
/vendors              → Vendor management system
```

Use `Skill("make:react-router")` guidance before implementing routes.

---

## File Structure

```
src/app/
  App.tsx                         ← React Router setup + layout shell
  components/
    figma/ImageWithFallback.tsx   ← already exists
    layout/
      NavBar.tsx                  ← top nav (sticky floating pill)
      Footer.tsx                  ← dark charcoal footer
    landing/
      HeroSection.tsx             ← hero + kaleidoscope visual
      WellbeingSection.tsx        ← stress→leisure transformation
      PersonalitySection.tsx      ← 5 creative types
      TestCTASection.tsx          ← Acumen test CTA
      DiscoverySection.tsx        ← Search. Find. Discover. Connect.
      ServiceBrandsSection.tsx    ← 11 brand categories
      PricingSection.tsx          ← individual + corporate pricing toggle
      CorporateSection.tsx        ← B2B pitch + pain points
      CtaBanner.tsx               ← bottom conversion banner
    test/
      PersonalityTest.tsx         ← interactive Acumen assessment
    dashboard/
      UserDashboard.tsx           ← individual logged-in view
      CorporateDashboard.tsx      ← corporate admin view
    vendors/
      VendorManagement.tsx        ← vendor/trainer/coach management table
    shared/
      BlobShape.tsx               ← reusable organic blob SVG decorator
      DropletBadge.tsx            ← teardrop icon container
      SectionLabel.tsx            ← overline pill labels
```

---

## Detailed Section Plans

### NavBar
- Floating, frosted-glass pill (`backdrop-blur`, `rounded-full`, white/90% bg)
- Logo left: transparent logo PNG
- Center links: Discover · Creative Personality · Activities · For Business · About
- Right: "Log In" ghost pill + "Take the Creativity Test" cyan filled pill
- Stick on scroll; hides/shows with Motion scroll listener

### Landing Page (`/`)

#### 1. HeroSection
- Headline: **"Discover something NEW and CREATIVE that empowers your life and career."**
- Sub-tagline: **"You can be anything but square."**
- CTA: `Discover Your Creative Personality` (cyan pill) + `Take the Test` (ghost pill)
- Right visual: Kaleidoscope Juice Drop floating with `motion` `y` oscillation
- Cyan radial gradient blob behind drop
- SVG wave divider at bottom

#### 2. WellbeingSection
- Background: very light cyan tint
- Three transformation cards (organic rounded `rounded-[3rem]`):
  - **STRESS → DELIGHT** (red glow → cyan glow gradient)
  - **PRESSURE → LEISURE** (orange → green)
  - **TENSION → DECOMPRESSION** (purple → blue)
- Supporting copy: creativity helps people relax, grow, connect, and become more productive
- Connector: animated SVG arrow/flow path between the three states

#### 3. PersonalitySection (Explore Your Other Side)
- Headline: **"Creativity is not about being artistic. It's about discovering what's unexplored within you."**
- Five personality type pills/blobs in a radial or orbital layout:
  - 🟡 **The Original** — challenges the status quo
  - 🔵 **The Imaginative** — thinks in metaphors and vision
  - 🟢 **The Innovative** — builds and invents solutions
  - 🔴 **The Expressive** — communicates through art and emotion
  - 🟣 **The Explorer** — seeks new experiences and perspectives
- Each type: colored teardrop badge + name + 1-line description
- CTA: `Know Your Creative Personality` pill button

#### 4. TestCTASection
- Full-width section with diagonal/organic shape background
- Headline: **"Take the Creative Personality Test"**
- Sub: **"Powered by Acumen"** — small AI badge
- Description: After completing, Acumen AI recommends activities, service brands, learning plans
- Large CTA pill button
- Visual: animated pulsing droplet graphic

#### 5. DiscoverySection
- Headline flow: **Search. Find. Discover. Connect.**
- Three example personas shown as cards:
  - Expressive → music, dance, writing, performance
  - Innovative → technology, robotics, gaming, DIY
  - Explorer → travel, hiking, diving, cultural experiences
- Cards: organic blob containers, not rectangular

#### 6. ServiceBrandsSection
- Section headline: **"11 Ways to Unlock Your Creative Life"**
- Horizontal scrollable carousel of brand tiles (react-slick)
- 11 categories, each tile: unique color, category name, short description, example activities, CTA
  1. **Heart of Art** — Painting, sculpture, photography, filmmaking, poetry, journaling
  2. **Athletic Fanatics** — Running, pickleball, badminton, basketball, tennis, boxing, yoga
  3. **Ride High** — Cycling, motorcycling, adventure rides
  4. **Style File** — Fashion, styling, personal branding, wardrobe
  5. **Technut** — Gaming, robotics, drone piloting, DIY technology
  6. **Chowdown** — Cooking, baking, chocolate making, wine pairing, barista skills
  7. **Petbook** — Pet care, training, animal wellness
  8. **Bubbly Hobbies** — Crafts, DIY, collecting, social hobbies
  9. **Trip and Tell** — Hiking, rock climbing, scuba diving, cultural trips
  10. **Local Vocals** — Community, music, local experiences, storytelling
  11. **Moves & Grooves** — Dance, movement, fitness arts, performance

#### 7. PricingSection
- Toggle pill: `Individual Plans` / `Corporate Plans`
- **Individual Plans** (4 cards):
  - Basic Creative — 1 Service Brand, 2 Activities/month
  - Advanced Creative — 2 Service Brands, 4 Activities/month
  - Elite Creative — 3 Service Brands, 6 Activities/month
  - One-on-One Creative — Custom consulting & coaching, custom pricing
- **Corporate Plans** (3 cards):
  - Basic Creative Team — 2 brands, 4 activities, up to 8 employees/activity/month
  - Advanced Creative Team — 4 brands, 6 activities, up to 10 employees/activity/month
  - Elite Creative Team — 6 brands, 12 activities, up to 15 employees/activity/month
- Cards: pill-shaped (`rounded-[3rem]`), middle highlighted in cyan
- Animated toggle transition via Motion layout animation

#### 8. CorporateSection
- Headline: **"Enable Your Business Growth. Boost Productivity. Empower Your Teams."**
- Pain points as 4 problem blobs: Attraction · Attrition · Cultural Crisis · Burnout
- Solutions grid (6 items): attract/retain talent, improve culture, employee engagement, rewards & recognition, well-being, creativity & productivity
- CTA: `Take the Free Corporate Creativity Survey` — Powered by Acumen badge

#### 9. CtaBanner
- Full-bleed cyan→purple gradient
- Large kaleidoscope drop as watermark (low opacity, right-aligned)
- Headline + CTA button

---

### Creative Personality Test (`/test`)
- Multi-step questionnaire (5–8 questions) with visual answer options (not text lists)
- Progress indicator: organic wavy progress bar
- Each question: illustrated/emoji answer tiles (pill shapes)
- Results screen: reveals personality type with animated droplet reveal, color-coded
- Post-result: Acumen AI recommendations panel (activities, brands, learning plan)
- Mock data simulates all 5 personality type outcomes

### User Dashboard (`/dashboard`)
- Left sidebar: circular avatar + name + personality type badge, nav links
- **Hero strip**: "Welcome back, [Name]. Your Creative Type: The Expressive"
- Panels (organic rounded containers, NOT square cards):
  - **AI Recommendations** — activity + brand suggestions from Acumen
  - **Upcoming Activities** — calendar strip
  - **Your Service Brands** — subscribed brands with quick-access buttons
  - **Learning Plan** — progress rings, milestones
  - **Completed Activities** — history timeline
  - **Discover New** — discovery feed of new experiences
  - **Saved Favorites** — wishlist grid
  - **Subscription Status** — current plan + upgrade CTA

### Corporate Dashboard (`/corporate`)
- Top bar with company name + logo
- **Summary row**: 4 engagement metric blobs (participation rate, active employees, activities this month, brand subscriptions)
- Side panels:
  - **Employee Engagement Map** — bubble/blob chart of team creativity participation
  - **Program Management** — active creative programs + status
  - **Activity Scheduler** — calendar view for scheduling
  - **Participation Tracking** — table with employee stats
  - **Learning Plans** — create/manage team learning paths
  - **Service Brands** — manage subscribed brands
  - **Vendor & Provider Directory** — browse trainers, coaches
  - **Subscription Management** — plan details, employee seats

### Vendor Management System (`/vendors`)
- Data table with filters: category (Talent/Trainer/Coach/Group/Association/Service Brand/Activity Provider)
- Vendor profile panel: name, category, status badge (Active/Pending/Inactive), services offered, rating
- Actions: Add Vendor, Edit, Approve, Deactivate
- All table rows use pill-shaped status badges, rounded container

---

## Animation Plan

| Element | Animation |
|---|---|
| Kaleidoscope drop (hero) | `y: [0, -20, 0]` 4s ease loop |
| Blob decorators | `scale: [1, 1.05, 1]` 6s opacity pulse |
| Section entrance | `whileInView` fadeIn + `y: 20→0` |
| Pricing toggle | `layout` animation on card width |
| Test progress bar | `width` spring animation |
| Personality reveal | Droplet scale-in with color flash |

---

## Font Setup (`/src/styles/fonts.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
```

Apply via global body: `font-family: 'Plus Jakarta Sans', sans-serif`

---

## Implementation Order

1. Font + global styles setup
2. NavBar + Footer (shared layout)
3. React Router routes in App.tsx
4. Landing page sections (top to bottom)
5. Creative Personality Test page
6. User Dashboard
7. Corporate Dashboard
8. Vendor Management System

---

## Verification Checklist

- [ ] No square/sharp-cornered elements anywhere in the UI
- [ ] All 3 image assets render (`figma:asset` imports)
- [ ] All 6 routes navigate correctly
- [ ] Pricing toggle switches Individual ↔ Corporate
- [ ] Personality test runs through all steps and shows results
- [ ] Service brands carousel scrolls (react-slick)
- [ ] Motion animations play without errors
- [ ] Responsive: hero stacks on mobile, nav becomes hamburger
- [ ] No TypeScript errors
- [ ] Dashboard feels like a discovery platform, not a generic admin UI
