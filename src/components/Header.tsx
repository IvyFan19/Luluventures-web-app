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
        isScrolled ? 'shadow-sm py-3 backdrop-blur-xl bg-black/60' : 'bg-transparent py-5'
      }`}
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
            <span className="aurora-grad">DeepValues.AI</span>
          </h1>
        </div>

        {/* Center - Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          <button
            onClick={() => scrollToSection('apps')}
            className="text-white/50 hover:text-white transition-colors text-[15px]"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('learn')}
            className="text-white/50 hover:text-white transition-colors text-[15px]"
          >
            Learn
          </button>
          <button
            onClick={() => navigate('/about')}
            className="text-white/50 hover:text-white transition-colors text-[15px]"
          >
            About
          </button>
        </nav>

        {/* Right - Auth / CTA */}
        <div className="hidden md:flex items-center space-x-4 min-w-[160px] justify-end">
          {user ? (
            <>
              <span className="text-white/50 text-[15px]">Hello, {user.username}</span>
              <button
                onClick={signOut}
                className="bg-white/10 hover:bg-white/15 text-white px-5 py-2 rounded-full text-[15px] transition-colors border border-white/10"
              >
                Sign Out
              </button>
            </>
          ) : (
            <a
              href="https://research.deepvalues.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 px-5 py-2 rounded-full text-[15px] font-medium transition-colors border border-emerald-500/20"
            >
              Try It Free
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/70"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-black/80 border-t border-white/[.06]">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('apps')}
              className="text-white/50 hover:text-white py-2 transition-colors text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="text-white/50 hover:text-white py-2 transition-colors text-left"
            >
              Learn
            </button>
            <button
              onClick={() => { navigate('/about'); toggleMenu(); }}
              className="text-white/50 hover:text-white py-2 transition-colors text-left"
            >
              About
            </button>
            <a
              href="https://research.deepvalues.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 py-2 font-medium"
            >
              Try It Free →
            </a>
            {user ? (
              <>
                <div className="py-2 border-t border-white/[.06]">
                  <span className="text-white/50">Hello, {user.username}</span>
                </div>
                <button
                  onClick={signOut}
                  className="bg-white/10 text-white px-5 py-2 rounded-full transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
