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
import { VendorDashboard } from "./pages/VendorDashboard";
import { VendorWorkspacePages } from "./pages/VendorWorkspacePages";
import { VendorContentStudio } from "./pages/VendorContentStudio";
import { AdminWorkspace } from "./pages/AdminWorkspace";
import { EmployeeInvitesDashboard } from "./pages/EmployeeInvitesDashboard";

export const router = createBrowserRouter([
  { path: "/bookings", Component: BookingsPage },
  { path: "/invites", Component: EmployeeInvitesDashboard },
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
      { path: "test", Component: PersonalityTest },
      { path: "dashboard", Component: WellnessFeed },
      { path: "corporate", Component: WellnessFeed },
      { path: "invites", Component: EmployeeInvitesDashboard },
      {
        path: "discover",
        Component: () => (
          <Navigate to="/discover/services" replace />
        ),
      },
      { path: "bookings", Component: BookingsPage },
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