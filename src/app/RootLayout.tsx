import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";

const FULL_LAYOUT_PATHS = ["/", "/test", "/services"];

export function RootLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSignedInHome = pathname === "/dashboard" || pathname === "/corporate" || pathname.startsWith("/discover") || pathname === "/bookings" || pathname.startsWith("/vendor") || pathname.startsWith("/admin") || pathname === "/register" || pathname.startsWith("/mobile");
  const showFooter = FULL_LAYOUT_PATHS.includes(pathname);

  const handleOpenRegister = (planId?: string, category?: 'individual' | 'corporate') => {
    const params = new URLSearchParams();
    if (planId) params.set('plan', planId);
    if (category) params.set('category', category);
    navigate(`/register?${params.toString()}`);
  };

  useEffect(() => {
    const listener = (e: Event) => {
      const customEv = e as CustomEvent<{ planId?: string; category?: 'individual' | 'corporate' }>;
      handleOpenRegister(customEv.detail?.planId, customEv.detail?.category);
    };
    window.addEventListener('open-register-modal', listener);
    return () => window.removeEventListener('open-register-modal', listener);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      {!isSignedInHome && <NavBar onOpenRegister={() => handleOpenRegister()} />}
      <main className="flex-1">
        <Outlet context={{ onOpenRegister: handleOpenRegister }} />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
