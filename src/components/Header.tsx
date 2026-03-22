import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { HeaderProps } from '../types';
import { UI_CONFIG } from '../utils/constants';
import { getText } from '../i18n';

// Scene index mapping for nav buttons
const SCENE_HOW_IT_WORKS = 3;
const SCENE_DELIVERABLES = 4;
const SCENE_COMMUNITY = 6;
const SCENE_ABOUT = 7; // Mission scene

export function Header({ isMenuOpen, toggleMenu, signOut, user, theme, onToggleTheme, goToScene, lang = 'en', onToggleLang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isLight = theme === 'light';
  const g = (k: Parameters<typeof getText>[0]) => getText(k, lang);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > UI_CONFIG.SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sceneIndex: number) => {
    goToScene?.(sceneIndex);
    if (isMenuOpen) toggleMenu();
  };

  const navTextClass = isLight
    ? 'text-gray-700 hover:text-gray-900 transition-colors text-[15px]'
    : 'text-white/50 hover:text-white transition-colors text-[15px]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isLight
            ? 'shadow-sm py-3 backdrop-blur-xl bg-white/80'
            : 'shadow-sm py-3 backdrop-blur-xl bg-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center min-w-[160px]">
          <h1
            className="text-xl md:text-2xl font-bold cursor-pointer"
            onClick={() => {
              goToScene?.(0);
            }}
          >
            <span className="aurora-grad">DeepValues.AI</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          <button onClick={() => handleNavClick(SCENE_HOW_IT_WORKS)} className={navTextClass}>{g('nav.howItWorks')}</button>
          <button onClick={() => handleNavClick(SCENE_DELIVERABLES)} className={navTextClass}>{g('nav.learn')}</button>
          <button onClick={() => handleNavClick(SCENE_COMMUNITY)} className={navTextClass}>{g('nav.community')}</button>
          <button onClick={() => handleNavClick(SCENE_ABOUT)} className={navTextClass}>{g('nav.about')}</button>
        </nav>

        {/* Desktop: Theme toggle + CTA */}
        <div className="hidden md:flex items-center space-x-4 min-w-[200px] justify-end">
          {onToggleLang && (
            <button
              onClick={onToggleLang}
              className={`px-2 py-1 rounded-full text-[13px] font-medium transition-colors ${isLight ? 'text-gray-400 hover:text-gray-700 hover:bg-gray-100' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
          )}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-colors ${isLight ? 'text-gray-400 hover:text-gray-700 hover:bg-gray-100' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          )}
          {user ? (
            <>
              <span className={isLight ? 'text-gray-500 text-[15px]' : 'text-white/50 text-[15px]'}>Hello, {user.username}</span>
              <button
                onClick={signOut}
                className={isLight
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-2 rounded-full text-[15px] transition-colors'
                  : 'bg-white/10 hover:bg-white/15 text-white px-5 py-2 rounded-full text-[15px] transition-colors border border-white/10'}
              >
                {g('nav.signOut')}
              </button>
            </>
          ) : (
            <a
              href="https://research.deepvalues.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className={isLight
                ? 'bg-[#1d1d1f] hover:bg-[#333] text-white px-6 py-2.5 rounded-full text-[15px] font-medium transition-colors'
                : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 px-5 py-2 rounded-full text-[15px] font-medium transition-colors border border-emerald-500/20'}
            >
              {g('nav.explore')}
            </a>
          )}
        </div>

        {/* Mobile: lang + theme + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          {onToggleLang && (
            <button onClick={onToggleLang}
              className={`px-2 py-1 rounded-full text-[12px] font-medium transition-colors ${isLight ? 'text-gray-400 hover:text-gray-700' : 'text-white/40 hover:text-white'}`}>
              {lang === 'en' ? '中文' : 'EN'}
            </button>
          )}
          {onToggleTheme && (
            <button onClick={onToggleTheme}
              className={`p-2 rounded-full transition-colors ${isLight ? 'text-gray-400 hover:text-gray-700' : 'text-white/40 hover:text-white'}`}>
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          )}
          <button className={isLight ? 'text-gray-500' : 'text-white/70'} onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={isLight
          ? 'md:hidden backdrop-blur-xl bg-white/90 border-t border-gray-200'
          : 'md:hidden backdrop-blur-xl bg-black/80 border-t border-white/[.06]'}>
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <button onClick={() => handleNavClick(SCENE_HOW_IT_WORKS)} className={isLight ? 'text-gray-700 hover:text-gray-900 py-2 transition-colors text-left' : 'text-white/50 hover:text-white py-2 transition-colors text-left'}>{g('nav.howItWorks')}</button>
            <button onClick={() => handleNavClick(SCENE_DELIVERABLES)} className={isLight ? 'text-gray-700 hover:text-gray-900 py-2 transition-colors text-left' : 'text-white/50 hover:text-white py-2 transition-colors text-left'}>{g('nav.learn')}</button>
            <button onClick={() => handleNavClick(SCENE_COMMUNITY)} className={isLight ? 'text-gray-700 hover:text-gray-900 py-2 transition-colors text-left' : 'text-white/50 hover:text-white py-2 transition-colors text-left'}>{g('nav.community')}</button>
            <button onClick={() => handleNavClick(SCENE_ABOUT)} className={isLight ? 'text-gray-700 hover:text-gray-900 py-2 transition-colors text-left' : 'text-white/50 hover:text-white py-2 transition-colors text-left'}>{g('nav.about')}</button>
            <a href="https://research.deepvalues.ai/" target="_blank" rel="noopener noreferrer" className={isLight ? 'text-[#1d1d1f] py-2 font-medium' : 'text-emerald-400 py-2 font-medium'}>{g('nav.explore')} →</a>
            {user && (
              <>
                <div className={`py-2 border-t ${isLight ? 'border-gray-200' : 'border-white/[.06]'}`}>
                  <span className={isLight ? 'text-gray-500' : 'text-white/50'}>Hello, {user.username}</span>
                </div>
                <button onClick={signOut} className={isLight ? 'bg-gray-100 text-gray-900 px-5 py-2 rounded-full transition-colors' : 'bg-white/10 text-white px-5 py-2 rounded-full transition-colors'}>{g('nav.signOut')}</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
