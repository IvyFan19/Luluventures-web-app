import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { HeaderProps } from '../types';
import { UI_CONFIG } from '../utils/constants';
import { getText } from '../i18n';

const SCENE_HOW_IT_WORKS = 3;
const SCENE_DELIVERABLES = 4;
const SCENE_COMMUNITY = 5;
const SCENE_TEAM = 7;

export function Header({
  isMenuOpen,
  toggleMenu,
  signOut,
  user,
  theme,
  onToggleTheme,
  goToScene,
  lang = 'en',
  onToggleLang,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isLight = theme === 'light';
  const hasSceneNav = Boolean(goToScene);
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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isLight
            ? 'bg-white/80 py-3 shadow-sm backdrop-blur-xl'
            : 'bg-black/60 py-3 shadow-sm backdrop-blur-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex min-w-[160px] items-center">
          <h1
            className="cursor-pointer text-xl font-bold md:text-2xl"
            onClick={() => {
              goToScene?.(0);
            }}
          >
            <span className="aurora-grad">DeepValues.ai</span>
          </h1>
        </div>

        {hasSceneNav && (
          <nav className="hidden items-center space-x-10 md:flex">
            <button onClick={() => handleNavClick(SCENE_HOW_IT_WORKS)} className={navTextClass}>
              {g('nav.howItWorks')}
            </button>
            <button onClick={() => handleNavClick(SCENE_DELIVERABLES)} className={navTextClass}>
              {g('nav.learn')}
            </button>
            <button onClick={() => handleNavClick(SCENE_COMMUNITY)} className={navTextClass}>
              {g('nav.community')}
            </button>
            <button onClick={() => handleNavClick(SCENE_TEAM)} className={navTextClass}>
              {g('nav.team')}
            </button>
          </nav>
        )}

        <div className="hidden min-w-[200px] items-center justify-end space-x-4 md:flex">
          {onToggleLang && (
            <button
              onClick={onToggleLang}
              className={`rounded-full px-2 py-1 text-[13px] font-medium transition-colors ${
                isLight ? 'text-gray-400 hover:bg-gray-100 hover:text-gray-700' : 'text-white/40 hover:bg-white/10 hover:text-white'
              }`}
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
          )}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`rounded-full p-2 transition-colors ${
                isLight ? 'text-gray-400 hover:bg-gray-100 hover:text-gray-700' : 'text-white/40 hover:bg-white/10 hover:text-white'
              }`}
              aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          )}
          {user ? (
            <>
              <span className={isLight ? 'text-[15px] text-gray-500' : 'text-[15px] text-white/50'}>
                Hello, {user.username}
              </span>
              <button
                onClick={signOut}
                className={
                  isLight
                    ? 'rounded-full bg-gray-100 px-5 py-2 text-[15px] text-gray-900 transition-colors hover:bg-gray-200'
                    : 'rounded-full border border-white/10 bg-white/10 px-5 py-2 text-[15px] text-white transition-colors hover:bg-white/15'
                }
              >
                {g('nav.signOut')}
              </button>
            </>
          ) : (
            <a
              href="https://app.deepvalues.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={
                isLight
                  ? 'rounded-full bg-[#1d1d1f] px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#333]'
                  : 'rounded-full border border-emerald-500/20 bg-emerald-500/15 px-5 py-2 text-[15px] font-medium text-emerald-400 transition-colors hover:bg-emerald-500/25'
              }
            >
              {g('nav.explore')}
            </a>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {onToggleLang && (
            <button
              onClick={onToggleLang}
              className={`rounded-full px-2 py-1 text-[12px] font-medium transition-colors ${
                isLight ? 'text-gray-400 hover:text-gray-700' : 'text-white/40 hover:text-white'
              }`}
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
          )}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`rounded-full p-2 transition-colors ${
                isLight ? 'text-gray-400 hover:text-gray-700' : 'text-white/40 hover:text-white'
              }`}
              aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          )}
          <button className={isLight ? 'text-gray-500' : 'text-white/70'} onClick={toggleMenu} aria-label={isMenuOpen ? 'Close menu' : 'Toggle menu'}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={
            isLight
              ? 'border-t border-gray-200 bg-white/90 backdrop-blur-xl md:hidden'
              : 'border-t border-white/[.06] bg-black/80 backdrop-blur-xl md:hidden'
          }
        >
          <div className="container mx-auto flex flex-col space-y-4 px-6 py-4">
            {hasSceneNav && (
              <>
                <button
                  onClick={() => handleNavClick(SCENE_HOW_IT_WORKS)}
                  className={isLight ? 'py-2 text-left text-gray-700 transition-colors hover:text-gray-900' : 'py-2 text-left text-white/50 transition-colors hover:text-white'}
                >
                  {g('nav.howItWorks')}
                </button>
                <button
                  onClick={() => handleNavClick(SCENE_DELIVERABLES)}
                  className={isLight ? 'py-2 text-left text-gray-700 transition-colors hover:text-gray-900' : 'py-2 text-left text-white/50 transition-colors hover:text-white'}
                >
                  {g('nav.learn')}
                </button>
                <button
                  onClick={() => handleNavClick(SCENE_COMMUNITY)}
                  className={isLight ? 'py-2 text-left text-gray-700 transition-colors hover:text-gray-900' : 'py-2 text-left text-white/50 transition-colors hover:text-white'}
                >
                  {g('nav.community')}
                </button>
                <button
                  onClick={() => handleNavClick(SCENE_TEAM)}
                  className={isLight ? 'py-2 text-left text-gray-700 transition-colors hover:text-gray-900' : 'py-2 text-left text-white/50 transition-colors hover:text-white'}
                >
                  {g('nav.team')}
                </button>
              </>
            )}
            <a
              href="https://app.deepvalues.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={isLight ? 'py-2 font-medium text-[#1d1d1f]' : 'py-2 font-medium text-emerald-400'}
            >
              {g('nav.explore')} →
            </a>
            {user && (
              <>
                <div className={`py-2 ${isLight ? 'border-t border-gray-200' : 'border-t border-white/[.06]'}`}>
                  <span className={isLight ? 'text-gray-500' : 'text-white/50'}>Hello, {user.username}</span>
                </div>
                <button
                  onClick={signOut}
                  className={isLight ? 'rounded-full bg-gray-100 px-5 py-2 text-gray-900 transition-colors' : 'rounded-full bg-white/10 px-5 py-2 text-white transition-colors'}
                >
                  {g('nav.signOut')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
