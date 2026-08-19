import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./RootLayout";
import { LandingPage } from "./pages/LandingPage";
import { PersonalityTest } from "./pages/PersonalityTest";
import { VendorManagement } from "./pages/VendorManagement";
import { WellnessFeed } from "./pages/WellnessFeed";
import { DiscoverPage } from "./pages/DiscoverPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { VendorDetailPage } from "./pages/VendorDetailPage";
import { BookingsPage } from "./pages/BookingsPage";
import { BookingDetailPage } from "./pages/BookingDetailPage";
import { VendorDashboard } from "./pages/VendorDashboard";
import { VendorWorkspacePages } from "./pages/VendorWorkspacePages";
import { VendorContentStudio } from "./pages/VendorContentStudio";
import { AdminWorkspace } from "./pages/AdminWorkspace";
import { EmployeeInvitesDashboard } from "./pages/EmployeeInvitesDashboard";
import { PostDetailPage } from "./pages/PostDetailPage";
import { BrandServicesPage } from "./pages/BrandServicesPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ClientMobileApp } from "./pages/ClientMobileApp";

export const router = createBrowserRouter([
  { path: "/mobile", Component: ClientMobileApp },
  { path: "/register", Component: RegisterPage },
  { path: "/bookings", Component: BookingsPage },
  { path: "/bookings/:bookingId", Component: BookingDetailPage },
  { path: "/invites", Component: EmployeeInvitesDashboard },
  { path: "/posts/:postId", Component: PostDetailPage },
  { path: "/vendor/posts/:postId", Component: PostDetailPage },
  { path: "/vendor", Component: VendorDashboard },
  { path: "/vendor/services", Component: VendorWorkspacePages },
  { path: "/vendor/content", Component: VendorContentStudio },
  { path: "/vendor/bookings", Component: VendorWorkspacePages },
  { path: "/vendor/insights", Component: VendorWorkspacePages },
  { path: "/admin", Component: AdminWorkspace },
  { path: "/admin/clients", Component: AdminWorkspace },
  { path: "/admin/vendors", Component: AdminWorkspace },
  { path: "/admin/content", Component: AdminWorkspace },
  { path: "/admin/categories", Component: AdminWorkspace },
  { path: "/admin/users", Component: AdminWorkspace },
  { path: "/admin/reports", Component: AdminWorkspace },
  { path: "/admin/audit", Component: AdminWorkspace },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "mobile", Component: ClientMobileApp },
      { path: "services", Component: BrandServicesPage },
      { path: "test", Component: PersonalityTest },
      { path: "dashboard", Component: WellnessFeed },
      { path: "corporate", Component: WellnessFeed },
      { path: "posts/:postId", Component: PostDetailPage },
      { path: "dashboard/posts/:postId", Component: PostDetailPage },
      { path: "corporate/posts/:postId", Component: PostDetailPage },
      { path: "invites", Component: EmployeeInvitesDashboard },
      {
        path: "discover",
        Component: () => (
          <Navigate to="/discover/services" replace />
        ),
      },
      { path: "bookings", Component: BookingsPage },
      { path: "bookings/:bookingId", Component: BookingDetailPage },
      { path: "discover/services", Component: DiscoverPage },
      {
        path: "discover/services/:serviceId",
        Component: ServiceDetailPage,
      },
      { path: "discover/providers", Component: DiscoverPage },
      {
        path: "discover/providers/:vendorId",
        Component: VendorDetailPage,
      },
      { path: "vendors", Component: VendorManagement },
      { path: "vendor", Component: VendorDashboard },
      {
        path: "vendor/services",
        Component: VendorWorkspacePages,
      },
      {
        path: "vendor/content",
        Component: VendorContentStudio,
      },
      {
        path: "vendor/posts/:postId",
        Component: PostDetailPage,
      },
      {
        path: "vendor/bookings",
        Component: VendorWorkspacePages,
      },
      {
        path: "vendor/insights",
        Component: VendorWorkspacePages,
      },
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