import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HeaderProps } from '../types';
import { UI_CONFIG } from '../utils/constants';

export function Header({ isMenuOpen, toggleMenu, signOut, user }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > UI_CONFIG.SCROLL_THRESHOLD);
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
        isScrolled ? 'shadow-md py-2' : 'bg-transparent py-4'
      }`}
      style={{ backgroundColor: isScrolled ? '#f3f4f6' : 'transparent' }}
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
            onClick={() => scrollToSection('podcast')}
            className="text-gray-700 hover:text-blue-900 transition-colors"
          >
            Podcast
          </button>
          {/* Temporarily hidden Research button - keep logic for future use
          <button 
            onClick={() => navigate('/research-analysis')}
            className="text-gray-700 hover:text-blue-900 transition-colors"
          >
            Research
          </button>
          */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hello, {user.username}</span>
              <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            // Temporarily hidden login button - keep logic for future use
            null
            // <button
            //   onClick={() => navigate('/login')}
            //   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            // >
            //   Login
            // </button>
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
        <div className="md:hidden shadow-md" style={{ backgroundColor: '#f3f4f6' }}>
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
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
              onClick={() => scrollToSection('podcast')}
              className="text-gray-700 hover:text-blue-900 py-2 transition-colors"
            >
              Podcast
            </button>
            {/* Temporarily hidden mobile Research button - keep logic for future use
            <button 
              onClick={() => navigate('/research-analysis')}
              className="text-gray-700 hover:text-blue-900 py-2 transition-colors"
            >
              Research
            </button>
            */}
            {user ? (
              <>
                <div className="py-2 border-t border-gray-200">
                  <span className="text-gray-700">Hello, {user.username}</span>
                </div>
                <button
                  onClick={signOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Temporarily hidden mobile login button - keep logic for future use
              null
              // <button
              //   onClick={() => navigate('/login')}
              //   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors mt-4"
              // >
              //   Login
              // </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}