import { useOutletContext } from 'react-router';
import { HeroSection } from '../components/landing/HeroSection';
import { HeroCarouselSection } from '../components/landing/HeroCarouselSection';
import { WellbeingSection } from '../components/landing/WellbeingSection';
import { PersonalitySection } from '../components/landing/PersonalitySection';
import { PricingSection } from '../components/landing/PricingSection';
import { CorporateSection } from '../components/landing/CorporateSection';
import { CorporateSurveySection } from '../components/landing/CorporateSurveySection';

interface LayoutContext {
  onOpenRegister?: (planId?: string, category?: 'individual' | 'corporate') => void;
}

export function LandingPage() {
  const context = useOutletContext<LayoutContext>();
  const handleRegister = context?.onOpenRegister;

  return (
    <div className="landing-page overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection onOpenRegister={() => handleRegister?.()} />

      {/* 2. Section: Carousel Type (Carousel 1: NEW & CREATIVE + Carousel 2: eZine Cover) */}
      <HeroCarouselSection />

      {/* 3. Section: Creativity for Well-being and Enhanced Work Performance */}
      <WellbeingSection />

      {/* 4. Section: Explore Your Other Side */}
      <PersonalitySection />

      {/* 5. Section: Enable your business growth... (Corporate Engagement B2B) */}
      <CorporateSection />

      {/* 6. Section: Take the free corporate creativity survey! */}
      <CorporateSurveySection />

      {/* 7. Unified Pricing & Subscription Section (Toggled via Individual & Corporate Tabs) */}
      <PricingSection onOpenRegister={handleRegister} initialTab="individual" showToggle={true} />
    </div>
  );
}
