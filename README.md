# CreativeSelf

CreativeSelf is a creativity, wellness and employee-engagement platform. This app is built with
[Nuxt 4](https://nuxt.com) (Vue 3 + TypeScript) and Tailwind CSS v4. The original design is
available on [Figma](https://www.figma.com/design/EI1HJWrpqcxhXoKw1RGlj0/CreativeSelf--orig-enhanced-).

## Getting started

```bash
npm install
npm run dev        # start the dev server on http://localhost:3000
npm run build      # production build (.output/)
npm run generate   # static build
npm run preview    # preview the production build
npm run typecheck  # type-check .vue and .ts files with vue-tsc
```

The app runs as a client-rendered SPA (`ssr: false` in `nuxt.config.ts`) because all demo
state is kept in the browser (`localStorage`).

## Project structure

```
app/
  app.vue                 # root component (<NuxtLayout> + <NuxtPage>)
  layouts/default.vue     # marketing/client shell: NavBar + Footer
  pages/                  # file-based routes (see below)
  components/             # auto-imported by file name (no path prefix)
    landing/              # landing page sections
    layout/               # NavBar, AppFooter, UniversalSidebar, RoleSwitcher
    shared/               # modals, entitlement header, image/blob helpers
    corporate/            # employee slot manager
    vendor/               # vendor workspace rail, shell, cards
    admin/                # admin workspace building blocks
    mobile/client/        # client mobile app screens
    mobile/provider/      # provider (vendor) mobile app screens
  composables/            # useSubscription, useRegister, mobile app state
  data/                   # typed mock data
  types/                  # shared TypeScript types
  utils/                  # auto-imported helpers (images, applyStyles)
  assets/css/             # Tailwind entry + theme tokens
public/images/            # static image assets
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/services`, `/test`, `/register` | Brand services, personality test, registration |
| `/dashboard`, `/corporate` | Wellbeing feed (individual / HR mode) |
| `/posts/:postId` (+ `/dashboard/…`, `/corporate/…`, `/vendor/…`) | Post detail |
| `/discover/services`, `/discover/providers` | Discover service brands |
| `/discover/services/:serviceId`, `/discover/providers/:vendorId` | Activity / provider detail |
| `/bookings`, `/bookings/:bookingId`, `/invites` | Bookings and employee invites |
| `/vendor`, `/vendor/services`, `/vendor/content`, `/vendor/bookings`, `/vendor/insights` | Vendor workspace |
| `/vendors` | Vendor management |
| `/admin`, `/admin/:section` | Admin workspace |
| `/mobile/…` | Client mobile app |
| `/vendor/mobile/…`, `/mobile/provider/…` | Provider mobile app |
