import { Outlet, useLocation } from "react-router";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";

const FULL_LAYOUT_PATHS = ["/", "/test"];

export function RootLayout() {
  const { pathname } = useLocation();
  const isSignedInHome = pathname === "/dashboard" || pathname === "/corporate" || pathname.startsWith("/discover") || pathname === "/bookings" || pathname.startsWith("/vendor") || pathname.startsWith("/admin");
  const showFooter = FULL_LAYOUT_PATHS.includes(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {!isSignedInHome && <NavBar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
