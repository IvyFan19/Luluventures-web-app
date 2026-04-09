import { Youtube, Podcast, Globe } from 'lucide-react';
import { getText, type Lang } from '../i18n';

function SpotifyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

interface FooterProps {
  lang?: Lang;
  onChangeLang?: (lang: Lang) => void;
}

export function Footer({ lang = 'en', onChangeLang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, lang);

  return (
    <footer className="relative z-10">
      <div className="container mx-auto px-6 py-4 pb-6 md:py-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-5">
            <a href="https://youtube.com/@TheDeepValues" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube size={18} />
            </a>
            <a href="https://podcasts.apple.com/us/podcast/deep-value-investing/id1811057697" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Podcast">
              <Podcast size={18} />
            </a>
            <a href="https://open.spotify.com/show/0s2EFnVEVeyFeKsMUtSfbH" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Spotify">
              <SpotifyIcon size={16} />
            </a>
          </div>

          <p className="text-xs text-white/80">
            DeepValues.AI &copy; {currentYear}
          </p>

          {onChangeLang && (
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs">
              <Globe size={14} className="text-white/40" />
              <button
                onClick={() => onChangeLang('en')}
                className={`px-1.5 py-0.5 rounded-full transition-colors ${
                  lang === 'en' ? 'text-white/80' : 'text-white/30 hover:text-white/60'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onChangeLang('zh')}
                className={`px-1.5 py-0.5 rounded-full transition-colors ${
                  lang === 'zh' ? 'text-white/80' : 'text-white/30 hover:text-white/60'
                }`}
              >
                中文
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
