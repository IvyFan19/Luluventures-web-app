import { useState } from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { YouTubeSection } from './YouTubeSection';
import { PodcastSection } from './PodcastSection';
import { AppsSection } from './AppsSection';
import { ResearchSection } from './ResearchSection';
import { BlogSection } from './BlogSection';
import { Newsletter } from './Newsletter';
import { Footer } from './Footer';

interface HomePageProps {
  user?: {
    username: string;
    [key: string]: any;
  };
  signOut?: () => void;
}

export function HomePage({ user, signOut }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        signOut={signOut} 
        user={user} 
      />
      <main className="pt-16">
        <Hero />
        <PodcastSection />
        <YouTubeSection />
        <AppsSection />
        <ResearchSection />
        <BlogSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}