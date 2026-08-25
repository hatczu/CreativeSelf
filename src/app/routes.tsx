import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./RootLayout";
import {
  LandingPage,
  PersonalityTest,
  WellnessFeed,
  DiscoverPage,
  ServiceDetailPage,
  VendorDetailPage,
  BookingsPage,
  BookingDetailPage,
  EmployeeInvitesDashboard,
  PostDetailPage,
  BrandServicesPage,
  RegisterPage,
} from "./pages/client";
import {
  VendorDashboard,
  VendorWorkspacePages,
  VendorContentStudio,
  VendorManagement,
} from "./pages/vendor";
import { AdminWorkspace } from "./pages/admin";
import { ClientMobileApp } from "./pages/mobile";

export const router = createBrowserRouter([
  // Standalone mobile routes
  { path: "/mobile", Component: ClientMobileApp },
  { path: "/mobile/:screen", Component: ClientMobileApp },

  // Main application routes wrapped in RootLayout
  {
    path: "/",
    Component: RootLayout,
    children: [
      // Mobile app routes
      { path: "mobile", Component: ClientMobileApp },
      { path: "mobile/:screen", Component: ClientMobileApp },

      // Client Pages
      { index: true, Component: LandingPage },
      { path: "register", Component: RegisterPage },
      { path: "services", Component: BrandServicesPage },
      { path: "test", Component: PersonalityTest },
      { path: "dashboard", Component: WellnessFeed },
      { path: "corporate", Component: WellnessFeed },
      { path: "posts/:postId", Component: PostDetailPage },
      { path: "dashboard/posts/:postId", Component: PostDetailPage },
      { path: "corporate/posts/:postId", Component: PostDetailPage },
      { path: "invites", Component: EmployeeInvitesDashboard },
      { path: "bookings", Component: BookingsPage },
      { path: "bookings/:bookingId", Component: BookingDetailPage },
      {
        path: "discover",
        Component: () => <Navigate to="/discover/services" replace />,
      },
      { path: "discover/services", Component: DiscoverPage },
      { path: "discover/services/:serviceId", Component: ServiceDetailPage },
      { path: "discover/providers", Component: DiscoverPage },
      { path: "discover/providers/:vendorId", Component: VendorDetailPage },

      // Vendor Pages
      { path: "vendors", Component: VendorManagement },
      { path: "vendor", Component: VendorDashboard },
      { path: "vendor/services", Component: VendorWorkspacePages },
      { path: "vendor/content", Component: VendorContentStudio },
      { path: "vendor/posts/:postId", Component: PostDetailPage },
      { path: "vendor/bookings", Component: VendorWorkspacePages },
      { path: "vendor/insights", Component: VendorWorkspacePages },

      // Admin Pages
      { path: "admin", Component: AdminWorkspace },
      { path: "admin/clients", Component: AdminWorkspace },
      { path: "admin/vendors", Component: AdminWorkspace },
      { path: "admin/content", Component: AdminWorkspace },
      { path: "admin/categories", Component: AdminWorkspace },
      { path: "admin/users", Component: AdminWorkspace },
      { path: "admin/reports", Component: AdminWorkspace },
      { path: "admin/audit", Component: AdminWorkspace },
    ],
  },
]);