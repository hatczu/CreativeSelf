import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { RegisterModal } from "./components/auth/RegisterModal";

const FULL_LAYOUT_PATHS = ["/", "/test"];

export function RootLayout() {
  const { pathname } = useLocation();
  const isSignedInHome = pathname === "/dashboard" || pathname === "/corporate" || pathname.startsWith("/discover") || pathname === "/bookings" || pathname.startsWith("/vendor") || pathname.startsWith("/admin");
  const showFooter = FULL_LAYOUT_PATHS.includes(pathname);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerPlan, setRegisterPlan] = useState<string | undefined>(undefined);
  const [registerCategory, setRegisterCategory] = useState<'individual' | 'corporate' | undefined>(undefined);

  const handleOpenRegister = (planId?: string, category?: 'individual' | 'corporate') => {
    setRegisterPlan(planId);
    setRegisterCategory(category);
    setIsRegisterOpen(true);
  };

  useEffect(() => {
    const listener = (e: Event) => {
      const customEv = e as CustomEvent<{ planId?: string; category?: 'individual' | 'corporate' }>;
      setRegisterPlan(customEv.detail?.planId);
      setRegisterCategory(customEv.detail?.category);
      setIsRegisterOpen(true);
    };
    window.addEventListener('open-register-modal', listener);
    return () => window.removeEventListener('open-register-modal', listener);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {!isSignedInHome && <NavBar onOpenRegister={() => handleOpenRegister()} />}
      <main className="flex-1">
        <Outlet context={{ onOpenRegister: handleOpenRegister }} />
      </main>
      {showFooter && <Footer />}

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialPlan={registerPlan}
        initialCategory={registerCategory}
      />
    </div>
  );
}
