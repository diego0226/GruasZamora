import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { AboutEquipmentSection } from '../components/sections/AboutEquipmentSection';
import { SocialProofSection } from '../components/sections/SocialProofSection';
import { ContactSection } from '../components/sections/ContactSection';

export default function Home() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container w-full m-0 p-0 overflow-x-hidden min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutEquipmentSection />
        <SocialProofSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
