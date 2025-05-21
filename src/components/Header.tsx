import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SignInModal } from './SignInModal';

type HeaderProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) toggleMenu();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">LuLu Ventures</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('podcast')}
            className="text-gray-700 hover:text-blue-900 transition-colors"
          >
            Podcast
          </button>
          <button 
            onClick={() => scrollToSection('youtube')}
            className="text-gray-700 hover:text-blue-900 transition-colors"
          >
            YouTube
          </button>
          <button 
            onClick={() => scrollToSection('apps')}
            className="text-gray-700 hover:text-blue-900 transition-colors"
          >
            App Tools
          </button>
          <button 
            onClick={() => scrollToSection('research')}
            className="text-gray-700 hover:text-blue-900 transition-colors"
          >
            Research
          </button>
          {isAuthenticated ? (
            <button 
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => setIsSignInModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white hover:shadow-lg transition-all"
            >
              Sign In
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('podcast')}
              className="text-gray-700 hover:text-blue-900 py-2 transition-colors"
            >
              Podcast
            </button>
            <button 
              onClick={() => scrollToSection('youtube')}
              className="text-gray-700 hover:text-blue-900 py-2 transition-colors"
            >
              YouTube
            </button>
            <button 
              onClick={() => scrollToSection('apps')}
              className="text-gray-700 hover:text-blue-900 py-2 transition-colors"
            >
              App Tools
            </button>
            <button 
              onClick={() => scrollToSection('research')}
              className="text-gray-700 hover:text-blue-900 py-2 transition-colors"
            >
              Research
            </button>
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => setIsSignInModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white hover:shadow-lg transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </header>
  );
}