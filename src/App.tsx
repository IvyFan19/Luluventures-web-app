import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { YouTubeSection } from './components/YouTubeSection';
import { PodcastSection } from './components/PodcastSection';
import { AppsSection } from './components/AppsSection';
import { ResearchSection } from './components/ResearchSection';
import { BlogSection } from './components/BlogSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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

export default App;