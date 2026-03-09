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
        isScrolled ? 'shadow-sm py-3' : 'bg-transparent py-5'
      }`}
      style={{ backgroundColor: isScrolled ? '#ffffff' : 'transparent' }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center min-w-[160px]">
          <h1
            className="text-xl md:text-2xl font-bold cursor-pointer"
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              DeepValues.AI
            </span>
          </h1>
        </div>

        {/* Center - Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          <button
            onClick={() => scrollToSection('youtube')}
            className="text-gray-600 hover:text-black transition-colors text-[15px]"
          >
            YouTube
          </button>
          <button
            onClick={() => scrollToSection('apps')}
            className="text-gray-600 hover:text-black transition-colors text-[15px]"
          >
            App Tools
          </button>
          <button
            onClick={() => scrollToSection('podcast')}
            className="text-gray-600 hover:text-black transition-colors text-[15px]"
          >
            Podcast
          </button>
          <button
            onClick={() => navigate('/about')}
            className="text-gray-600 hover:text-black transition-colors text-[15px]"
          >
            About
          </button>
          {/* Temporarily hidden Research button - keep logic for future use
          <button
            onClick={() => navigate('/research-analysis')}
            className="text-gray-600 hover:text-black transition-colors text-[15px]"
          >
            Research
          </button>
          */}
        </nav>

        {/* Right - Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4 min-w-[160px] justify-end">
          {user ? (
            <>
              <span className="text-gray-600 text-[15px]">Hello, {user.username}</span>
              <button
                onClick={signOut}
                className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full text-[15px] transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Temporarily hidden login/signup buttons - keep logic for future use */}
              {/*
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-black transition-colors text-[15px]"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full text-[15px] transition-colors"
              >
                Sign Up
              </button>
              */}
            </>
          )}
        </div>

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
        <div className="md:hidden shadow-md" style={{ backgroundColor: '#ffffff' }}>
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('youtube')}
              className="text-gray-600 hover:text-black py-2 transition-colors text-left"
            >
              YouTube
            </button>
            <button
              onClick={() => scrollToSection('apps')}
              className="text-gray-600 hover:text-black py-2 transition-colors text-left"
            >
              App Tools
            </button>
            <button
              onClick={() => scrollToSection('podcast')}
              className="text-gray-600 hover:text-black py-2 transition-colors text-left"
            >
              Podcast
            </button>
            <button
              onClick={() => { navigate('/about'); toggleMenu(); }}
              className="text-gray-600 hover:text-black py-2 transition-colors text-left"
            >
              About
            </button>
            {/* Temporarily hidden mobile Research button - keep logic for future use
            <button
              onClick={() => navigate('/research-analysis')}
              className="text-gray-600 hover:text-black py-2 transition-colors text-left"
            >
              Research
            </button>
            */}
            {user ? (
              <>
                <div className="py-2 border-t border-gray-200">
                  <span className="text-gray-600">Hello, {user.username}</span>
                </div>
                <button
                  onClick={signOut}
                  className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Temporarily hidden mobile login button - keep logic for future use
              null
              // <div className="flex flex-col space-y-3 pt-2 border-t border-gray-200">
              //   <button
              //     onClick={() => { navigate('/login'); toggleMenu(); }}
              //     className="text-gray-600 hover:text-black py-2 transition-colors text-left"
              //   >
              //     Log in
              //   </button>
              //   <button
              //     onClick={() => { navigate('/login'); toggleMenu(); }}
              //     className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full transition-colors"
              //   >
              //     Sign Up
              //   </button>
              // </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
