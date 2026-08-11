import { useOutletContext } from 'react-router';
import { HeroSection } from '../components/landing/HeroSection';
import { WellbeingSection } from '../components/landing/WellbeingSection';
import { PersonalitySection } from '../components/landing/PersonalitySection';
import { TestCTASection } from '../components/landing/TestCTASection';
import { DiscoverySection } from '../components/landing/DiscoverySection';
import { ServiceBrandsSection } from '../components/landing/ServiceBrandsSection';
import { PricingSection } from '../components/landing/PricingSection';
import { CorporateSection } from '../components/landing/CorporateSection';
import { CtaBanner } from '../components/landing/CtaBanner';

interface LayoutContext {
  onOpenRegister?: (planId?: string, category?: 'individual' | 'corporate') => void;
}

export function LandingPage() {
  const context = useOutletContext<LayoutContext>();
  const handleRegister = context?.onOpenRegister;

  return (
    <div>
      <HeroSection onOpenRegister={() => handleRegister?.()} />
      <WellbeingSection />
      <PersonalitySection />
      <TestCTASection />
      <DiscoverySection />
      <ServiceBrandsSection />
      <PricingSection onOpenRegister={handleRegister} />
      <CorporateSection />
      <CtaBanner onOpenRegister={() => handleRegister?.()} />
    </div>
  );
}
