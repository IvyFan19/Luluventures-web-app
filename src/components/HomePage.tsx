import { useState } from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { ProblemSection } from './ProblemSection';
import { LegendsSection } from './LegendsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { DeliverablesSection } from './DeliverablesSection';
import { WhySection } from './WhySection';
import { VerdictSection } from './VerdictSection';
import { LearnSection } from './LearnSection';
import { Newsletter } from './Newsletter';
import { Footer } from './Footer';

interface User {
  username: string;
  [key: string]: unknown;
}

interface HomePageProps {
  user?: User;
  signOut?: () => void;
}

export function HomePage({ user, signOut }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Aurora background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1"></div>
        <div className="aurora-blob aurora-blob-2"></div>
        <div className="aurora-blob aurora-blob-3"></div>
        <div className="aurora-blob aurora-blob-4"></div>
      </div>
      <div className="grain-overlay"></div>
      <div className="vignette-overlay"></div>

      <Header
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        signOut={signOut}
        user={user}
      />
      <main>
        <Hero />
        <ProblemSection />
        <LegendsSection />
        <HowItWorksSection />
        <DeliverablesSection />
        <WhySection />
        <VerdictSection />
        <LearnSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
