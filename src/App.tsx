// import { useState } from 'react';
// import { TestPage } from './components/TestPage';
// import { AuthProvider } from './context/AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       <div className="min-h-screen bg-white text-gray-900">
//         <TestPage />
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;


import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { YouTubeSection } from './components/YouTubeSection';
import { PodcastSection } from './components/PodcastSection';
import { AppsSection } from './components/AppsSection';
import { ResearchSection } from './components/ResearchSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-gray-900">
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <main className="pt-16">
          <Hero />
          <PodcastSection />
          <YouTubeSection />
          <AppsSection />
          <ResearchSection />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;