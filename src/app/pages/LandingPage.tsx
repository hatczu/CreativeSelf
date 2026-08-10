import { HeroSection } from '../components/landing/HeroSection';
import { WellbeingSection } from '../components/landing/WellbeingSection';
import { PersonalitySection } from '../components/landing/PersonalitySection';
import { TestCTASection } from '../components/landing/TestCTASection';
import { DiscoverySection } from '../components/landing/DiscoverySection';
import { ServiceBrandsSection } from '../components/landing/ServiceBrandsSection';
import { PricingSection } from '../components/landing/PricingSection';
import { CorporateSection } from '../components/landing/CorporateSection';
import { CtaBanner } from '../components/landing/CtaBanner';

export function LandingPage() {
  return (
    <div>
      <HeroSection />
      <WellbeingSection />
      <PersonalitySection />
      <TestCTASection />
      <DiscoverySection />
      <ServiceBrandsSection />
      <PricingSection />
      <CorporateSection />
      <CtaBanner />
    </div>
  );
}
