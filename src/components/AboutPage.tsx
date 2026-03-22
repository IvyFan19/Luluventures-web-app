import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { ArrowLeft, Sun, Moon, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DURATIONS = [10000, 9000, 10000, 9000];

const ThemeContext = createContext<'dark' | 'light'>('dark');
function useTheme() { return useContext(ThemeContext); }

interface AboutPageProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

// ─── Scene: Our Story ────────────────────────────────────────

function SceneStory() {
  const isDark = useTheme() === 'dark';
  return (
    <div className="st max-w-4xl mx-auto w-full text-center">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        Our Story
      </p>
      <h2 className="text-4xl md:text-5xl lg:text-[68px] font-extrabold tracking-tight leading-[1.02] mb-10">
        <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>Research that </span>
        <span className="aurora-grad">serves you.</span>
      </h2>
      <div className={`space-y-5 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
        <p>
          Institutional-grade investment research has long been locked behind expensive terminals
          and exclusive networks. We built DeepValues.AI to change that.
        </p>
        <p>
          Rooted in the principles of value investing, we use AI-powered agents to
          deliver the depth of a professional research team — to every investor.
        </p>
      </div>
    </div>
  );
}

// ─── Scene: Mission ──────────────────────────────────────────

function SceneMission() {
  const isDark = useTheme() === 'dark';
  return (
    <div className="st max-w-4xl mx-auto w-full text-center">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        Our Mission
      </p>
      <h2 className="text-4xl md:text-5xl lg:text-[68px] font-extrabold tracking-tight leading-[1.02] mb-10">
        <span className="aurora-grad">Democratize</span><br />
        <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>investment research.</span>
      </h2>
      <div className={`max-w-3xl mx-auto grid md:grid-cols-3 gap-5`}>
        {[
          { icon: '🤖', title: 'AI-Powered', desc: 'Multi-agent research that replicates institutional workflows' },
          { icon: '📊', title: 'Fundamentals-First', desc: 'Every thesis grounded in real data, not hype' },
          { icon: '🌍', title: 'For Everyone', desc: 'Hedge fund process, available to any investor' },
        ].map((item) => (
          <div key={item.title} className={`p-6 rounded-2xl text-center ${isDark ? 'bg-white/[.04] border border-white/[.06] backdrop-blur-[20px]' : 'apple-card'}`}>
            <div className="text-3xl mb-3">{item.icon}</div>
            <p className={`font-semibold text-[17px] mb-1 ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>{item.title}</p>
            <p className={`text-[13px] ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Scene: Team ─────────────────────────────────────────────

function SceneTeam() {
  const isDark = useTheme() === 'dark';
  return (
    <div className="st max-w-4xl mx-auto w-full text-center">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        The Team
      </p>
      <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.02] mb-10">
        <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>Built by </span>
        <span className="aurora-grad">investors, for investors.</span>
      </h2>
      <div className={`max-w-2xl mx-auto rounded-2xl p-8 md:p-10 text-left ${isDark ? 'bg-white/[.04] border border-white/[.06] backdrop-blur-[20px]' : 'apple-card'}`}>
        <div className="flex items-center gap-3 mb-5">
          <div>
            <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
              Xinwei Fan
              <a
                href="https://www.linkedin.com/in/xinwei-fan/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${isDark ? 'text-white/30 hover:text-emerald-400' : 'text-gray-400 hover:text-emerald-600'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </h3>
            <p className="text-emerald-500 font-semibold text-[15px]">Founder & CTO</p>
          </div>
        </div>
        <p className={`leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
          Xinwei is the technical force behind DeepValues.AI's multi-agent research platform.
          With expertise in AI/ML engineering and full-stack development, she architects the systems
          that power intelligent stock analysis at scale. Her goal is to harness cutting-edge AI to
          replicate the rigor of a professional investment research team — available to anyone, anytime.
        </p>
      </div>
    </div>
  );
}

// ─── Scene: CTA (back to home) ──────────────────────────────

function SceneAboutCTA() {
  return (
    <div className="st text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl lg:text-[140px] font-black tracking-tighter leading-[0.9] aurora-grad">
        Deep Values
      </h1>
      <p className="text-xl md:text-2xl text-white/50 mt-7 max-w-[700px] mx-auto leading-relaxed">
        Built for Modern Intelligent Investors.
      </p>
      <a
        href="https://research.deepvalues.ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-11 text-emerald-500 text-2xl md:text-[30px] font-extrabold tracking-tight hover:text-emerald-400 transition-colors"
      >
        deepvalues.ai →
      </a>
    </div>
  );
}

// ─── Scene Definitions ──────────────────────────────────────

const SCENES = [
  { id: 'a0', component: SceneStory, darkInsert: false },
  { id: 'a1', component: SceneMission, darkInsert: false },
  { id: 'a2', component: SceneTeam, darkInsert: false },
  { id: 'a3', component: SceneAboutCTA, darkInsert: true },
];

// ─── Main Component ─────────────────────────────────────────

export function AboutPage({ theme = 'dark', onToggleTheme }: AboutPageProps) {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(0);
  const [exitingScene, setExitingScene] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [sceneKey, setSceneKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const showScene = useCallback((index: number) => {
    if (index === currentScene) return;
    setExitingScene(currentScene);
    setCurrentScene(index);
    setSceneKey(k => k + 1);
    setTimeout(() => setExitingScene(null), 800);
  }, [currentScene]);

  const nextScene = useCallback(() => {
    if (currentScene < SCENES.length - 1) {
      showScene(currentScene + 1);
    } else {
      setExitingScene(currentScene);
      setTimeout(() => {
        setExitingScene(null);
        setCurrentScene(0);
        setSceneKey(k => k + 1);
      }, 1200);
    }
  }, [currentScene, showScene]);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.style.width = `${((currentScene + 1) / SCENES.length) * 100}%`;
    }
  }, [currentScene]);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(() => nextScene(), DURATIONS[currentScene] || 8000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentScene, playing, nextScene]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentScene < SCENES.length - 1) showScene(currentScene + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentScene > 0) showScene(currentScene - 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setPlaying(p => !p);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentScene, showScene]);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0 && currentScene < SCENES.length - 1) showScene(currentScene + 1);
    else if (dx > 0 && currentScene > 0) showScene(currentScene - 1);
  };

  const sceneDarkInsert = !isDark && SCENES[currentScene]?.darkInsert;

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`min-h-screen overflow-hidden ${isDark ? 'bg-black text-white' : 'bg-white text-[#1d1d1f]'}`}>
        {/* Background */}
        {isDark ? (
          <>
            <div className="aurora-bg">
              <div className="aurora-blob aurora-blob-1" />
              <div className="aurora-blob aurora-blob-2" />
              <div className="aurora-blob aurora-blob-3" />
              <div className="aurora-blob aurora-blob-4" />
            </div>
            <div className="grain-overlay" />
            <div className="vignette-overlay" />
          </>
        ) : (
          <div className="light-wash" />
        )}

        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 ${isDark ? 'bg-transparent' : 'bg-transparent'}`}>
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-[160px]">
              <button
                onClick={() => navigate('/')}
                className={`flex items-center gap-1 transition-colors ${isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <ArrowLeft size={18} />
              </button>
              <h1
                className="text-xl md:text-2xl font-bold cursor-pointer"
                onClick={() => navigate('/')}
              >
                <span className="aurora-grad">DeepValues.AI</span>
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
              <a
                href="https://research.deepvalues.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:inline-block ${isDark
                  ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 px-5 py-2 rounded-full text-[15px] font-medium transition-colors border border-emerald-500/20'
                  : 'bg-[#1d1d1f] hover:bg-[#333] text-white px-6 py-2.5 rounded-full text-[15px] font-medium transition-colors'}`}
              >
                Explore Now
              </a>
            </div>
          </div>
        </header>

        {/* Scenes */}
        <div className="scene-container" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {SCENES.map((s, i) => {
            const Component = s.component;
            const isActive = i === currentScene && exitingScene !== i;
            const isExiting = i === exitingScene;
            if (!isActive && !isExiting) return null;

            const useDarkInsert = !isDark && s.darkInsert;

            return (
              <div
                key={isActive ? `${s.id}-${sceneKey}` : `${s.id}-exit`}
                className={`scene ${isActive ? 'active' : ''} ${isExiting ? 'exiting' : ''} ${useDarkInsert ? 'scene-dark-insert' : ''}`}
              >
                {useDarkInsert && <div className="aurora-insert" />}
                <Component />
              </div>
            );
          })}
        </div>

        {/* Navigation dots */}
        <div className="scene-nav">
          {SCENES.map((_, i) => (
            <button
              key={i}
              className={`scene-dot ${i === currentScene ? 'active' : ''} ${!isDark && !sceneDarkInsert ? 'scene-dot-light' : ''}`}
              onClick={() => showScene(i)}
              aria-label={`Go to scene ${i + 1}`}
            />
          ))}
        </div>

        {/* Timeline */}
        <div className={`scene-timeline ${!isDark ? 'scene-timeline-light' : ''}`}>
          <div ref={timelineRef} className="scene-timeline-bar" />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
