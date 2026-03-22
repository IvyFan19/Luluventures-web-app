import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { Header } from './Header';
import { getText } from '../i18n';

const DURATIONS = [9000, 7500, 10000, 9000, 9000, 8500, 10000, 10000, 9000];

const ThemeContext = createContext<'dark' | 'light'>('dark');
function useTheme() { return useContext(ThemeContext); }

const LangContext = createContext<'en' | 'zh'>('en');
function useLang() { return useContext(LangContext); }

interface User {
  username: string;
  [key: string]: unknown;
}

interface HomePageProps {
  user?: User;
  signOut?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  lang?: 'en' | 'zh';
  onToggleLang?: () => void;
}

// ─── Scene Content Components ───────────────────────────────

function SceneProblem() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  return (
    <div className="st text-center max-w-4xl mx-auto">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        {g('problem.eyebrow')}
        <span className={`w-8 h-px bg-gradient-to-l ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
      </p>
      <h2 className={`text-3xl sm:text-4xl md:text-6xl lg:text-[80px] font-extrabold tracking-tight leading-[1.05]`}>
        <span className={isDark ? 'text-white/40' : 'text-gray-700'}>{g('problem.h1a')}</span>{' '}
        <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>{g('problem.h1b')}</span>
        <br />
        <span className="text-red-500">{g('problem.h1c')}</span>
      </h2>
      <p className={`text-base md:text-[22px] mt-6 md:mt-8 max-w-[600px] mx-auto leading-relaxed whitespace-pre-line ${isDark ? 'text-white/45' : 'text-gray-700'}`}>
        {g('problem.sub')}
      </p>
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-8 md:mt-12 justify-center">
        {(['problem.p1', 'problem.p2', 'problem.p3'] as const).map((k, i) => (
          <p key={i} className={`text-sm md:text-[15px] leading-relaxed border-l-2 pl-5 text-left max-w-[240px] whitespace-pre-line ${isDark ? 'text-white/30 border-red-500/30' : 'text-gray-500 border-red-400/30'}`}>
            {g(k)}
          </p>
        ))}
      </div>
    </div>
  );
}

function SceneLegends() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  const legends = [
    { name: 'Buffett', key: 'legends.buffett' as const },
    { name: 'Munger', key: 'legends.munger' as const },
    { name: 'Lynch', key: 'legends.lynch' as const },
    { name: 'Druckenmiller', key: 'legends.druckenmiller' as const },
    { name: 'Marks', key: 'legends.marks' as const },
  ];

  return (
    <div className="st text-center max-w-[1060px] mx-auto">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        {g('legends.eyebrow')}
        <span className={`w-8 h-px bg-gradient-to-l ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
      </p>
      <h2 className={`text-2xl sm:text-3xl md:text-5xl lg:text-[60px] font-extrabold tracking-tight leading-tight`}>
        <span className={isDark ? 'text-white/40' : 'text-gray-700'}>{g('legends.h1a')}</span>
        <br />
        <span className="aurora-grad">{g('legends.h1b')}</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mt-8 md:mt-14">
        {legends.map((lg) => (
          <div key={lg.name} className={`relative flex-1 min-w-[110px] sm:min-w-[150px] max-w-[200px] p-4 md:p-6 text-center rounded-2xl md:rounded-3xl overflow-hidden ${isDark ? 'border border-white/[.06] bg-white/[.04] backdrop-blur-[30px]' : 'apple-card'}`}>
            <div className={`absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent ${isDark ? 'via-emerald-500/25' : 'via-emerald-500/15'} to-transparent`} />
            <p className={`text-base md:text-xl font-extrabold tracking-tight mb-1 md:mb-2 ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>{lg.name}</p>
            <p className={`text-[11px] md:text-[13px] leading-snug italic whitespace-pre-line ${isDark ? 'text-white/45' : 'text-gray-700'}`}>{g(lg.key)}</p>
          </div>
        ))}
      </div>
      <p className={`text-base md:text-2xl mt-8 md:mt-12 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
        {g('legends.pivot')}<span className="aurora-grad font-semibold">{g('legends.pivot2')}</span>{g('legends.pivot3')}
      </p>
    </div>
  );
}

// Brand & CTA always render dark (Apple-style contrast shift in light mode)
function SceneBrand() {
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  return (
    <div className="st text-center max-w-4xl mx-auto">
      <p className="text-xs font-bold uppercase tracking-[5px] text-emerald-400/80 mb-7 flex items-center justify-center gap-2.5">
        <span className="w-8 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
        {g('brand.eyebrow')}
        <span className="w-8 h-px bg-gradient-to-l from-emerald-500 to-transparent" />
      </p>
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[140px] font-black tracking-tighter leading-[0.9] aurora-grad">
        Deep Values
      </h1>
      <p className="text-lg md:text-2xl text-white/50 mt-7 max-w-[700px] mx-auto leading-relaxed">
        {g('brand.sub')}<br className="hidden md:block" />
        {g('brand.sub2')}
      </p>
      <a href="https://research.deepvalues.ai/" target="_blank" rel="noopener noreferrer"
        className="inline-block mt-11 text-emerald-500 text-2xl md:text-[30px] font-extrabold tracking-tight hover:text-emerald-400 transition-colors">
        {g('brand.cta')}
      </a>
    </div>
  );
}

function SceneHowItWorks() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  const benefits = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>, titleKey: 'how.b1.title' as const, descKey: 'how.b1.desc' as const },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z"/><path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z"/></svg>, titleKey: 'how.b2.title' as const, descKey: 'how.b2.desc' as const },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, titleKey: 'how.b3.title' as const, descKey: 'how.b3.desc' as const },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>, titleKey: 'how.b4.title' as const, descKey: 'how.b4.desc' as const, highlight: true },
  ];

  return (
    <div className="st max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-24">
        <div className="flex-1">
          <p className={`text-xs font-bold uppercase tracking-[5px] mb-4 md:mb-7 flex items-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
            <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
            {g('how.eyebrow')}
          </p>
          <h2 className={`text-2xl sm:text-3xl md:text-5xl lg:text-[68px] font-extrabold tracking-tight leading-[1.02]`}>
            <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>{g('how.h1a')}</span><br />
            <span className="aurora-grad">{g('how.h1b')}</span><br />
            <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>{g('how.h1c')}</span>
          </h2>
          <p className={`text-base md:text-xl mt-4 md:mt-6 max-w-[500px] leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-700'}`}>
            {g('how.sub')}
          </p>
        </div>
        <div className="flex-1 w-full max-w-[520px] flex flex-col gap-2.5 md:gap-3">
          {benefits.map((b) => (
            <div key={g(b.titleKey)} className={`relative flex items-center gap-4 md:gap-5 py-4 md:py-5 px-5 md:px-6 rounded-xl md:rounded-2xl ${isDark ? `border bg-white/[.03] backdrop-blur-[20px] ${b.highlight ? 'border-emerald-500/15 shadow-[0_0_30px_rgba(16,185,129,.05)]' : 'border-white/[.05]'}` : `apple-card ${b.highlight ? 'shadow-[0_4px_24px_rgba(16,185,129,.1)]' : ''}`}`}>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-sm bg-gradient-to-b from-emerald-500 to-cyan-500" />
              <div className={`w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${b.highlight ? 'bg-gradient-to-br from-emerald-500 to-cyan-500' : 'bg-emerald-500/10'}`}>
                <span className={b.highlight ? 'text-white' : isDark ? 'text-emerald-400' : 'text-emerald-600'}>{b.icon}</span>
              </div>
              <div>
                <p className={`text-[17px] font-semibold ${b.highlight ? 'text-emerald-600' : isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>{g(b.titleKey)}</p>
                <p className={`text-[13px] mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-700'}`}>{g(b.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SceneDeliverables() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  const deliverables = [
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>, nameKey: 'del.d1.name' as const, subKey: 'del.d1.sub' as const },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>, nameKey: 'del.d2.name' as const, subKey: 'del.d2.sub' as const },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m10 9 5 3-5 3V9z"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, nameKey: 'del.d3.name' as const, subKey: 'del.d3.sub' as const },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, nameKey: 'del.d4.name' as const, subKey: 'del.d4.sub' as const },
  ];

  return (
    <div className="st text-center max-w-5xl mx-auto">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        {g('del.eyebrow')}
        <span className={`w-8 h-px bg-gradient-to-l ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
      </p>
      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-extrabold tracking-tight`}>
        <span className={isDark ? 'text-white/40' : 'text-gray-700'}>{g('del.h1a')}</span>{' '}
        <span className="aurora-grad">{g('del.h1b')}</span>
      </h2>
      <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-5 mt-8 md:mt-14">
        {deliverables.map((d) => (
          <div key={g(d.nameKey)} className={`p-5 md:p-7 md:min-w-[170px] text-center rounded-xl md:rounded-2xl ${isDark ? 'border border-white/[.05] bg-white/[.03] backdrop-blur-[30px]' : 'apple-card'}`}>
            <div className={`mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{d.icon}</div>
            <p className={`text-[15px] font-semibold ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>{g(d.nameKey)}</p>
            <p className={`text-[12px] mt-1.5 leading-snug whitespace-pre-line ${isDark ? 'text-white/35' : 'text-gray-700'}`}>{g(d.subKey)}</p>
          </div>
        ))}
      </div>
      <p className={`text-sm mt-10 ${isDark ? 'text-white/35' : 'text-gray-400'}`}>{g('del.footer')}</p>
    </div>
  );
}

function SceneWhy() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  const props = [
    { labelKey: 'why.p1.label' as const, titleKey: 'why.p1.title' as const, bodyKey: 'why.p1.body' as const },
    { labelKey: 'why.p2.label' as const, titleKey: 'why.p2.title' as const, bodyKey: 'why.p2.body' as const },
    { labelKey: 'why.p3.label' as const, titleKey: 'why.p3.title' as const, bodyKey: 'why.p3.body' as const },
    { labelKey: 'why.p4.label' as const, titleKey: 'why.p4.title' as const, bodyKey: 'why.p4.body' as const },
  ];

  return (
    <div className="st text-center max-w-6xl mx-auto">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        {g('why.eyebrow')}
        <span className={`w-8 h-px bg-gradient-to-l ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
      </p>
      <h2 className={`text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-bold tracking-tight`}>
        <span className={isDark ? 'text-white/40' : 'text-gray-700'}>{g('why.h1a')}</span>{' '}
        <span className="aurora-grad">{g('why.h1b')}</span>
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-8 md:mt-14">
        {props.map((p) => (
          <div key={g(p.labelKey)} className={`relative p-5 md:p-8 rounded-xl md:rounded-2xl text-left overflow-hidden ${isDark ? 'border border-white/[.05] bg-white/[.03] backdrop-blur-[30px]' : 'apple-card md:p-9'}`}>
            <div className={`absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent ${isDark ? 'via-emerald-500/25' : 'via-emerald-500/10'} to-transparent`} />
            <p className={`text-[11px] font-bold uppercase tracking-[2px] mb-3 ${isDark ? 'text-emerald-400/60' : 'text-emerald-600/60'}`}>{g(p.labelKey)}</p>
            <p className={`text-lg md:text-2xl font-extrabold tracking-tight leading-tight whitespace-pre-line ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>{g(p.titleKey)}</p>
            <p className={`text-[11px] md:text-[13px] mt-2 md:mt-3 leading-snug ${isDark ? 'text-white/35' : 'text-gray-700'}`}>{g(p.bodyKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneVerdict() {
  const isDark = useTheme() === 'dark';
  return (
    <div className="st text-center max-w-4xl mx-auto">
      <h2 className={`text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight`}>
        <span className={isDark ? 'text-white/40' : 'text-gray-700'}>One clear,</span>
        <br />
        <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>battle-tested answer.</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-14">
        <div className="px-10 md:px-14 py-5 md:py-6 rounded-2xl text-2xl md:text-[28px] font-black tracking-tight bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-[0_8px_40px_rgba(16,185,129,.12)]">ADVOCATE</div>
        <div className="px-10 md:px-14 py-5 md:py-6 rounded-2xl text-2xl md:text-[28px] font-black tracking-tight bg-yellow-500/[.06] text-yellow-600 border border-yellow-500/[.12]">WATCH</div>
        <div className="px-10 md:px-14 py-5 md:py-6 rounded-2xl text-2xl md:text-[28px] font-black tracking-tight bg-red-500/[.06] text-red-500 border border-red-500/[.12]">AVOID</div>
      </div>
      <p className={`text-lg mt-8 max-w-lg mx-auto leading-relaxed ${isDark ? 'text-white/45' : 'text-gray-700'}`}>
        Every verdict backed by a complete trail<br />
        of adversarial reasoning you can read yourself.
      </p>
    </div>
  );
}

function SceneCommunity() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  const channels = [
    { name: 'Deep Value Investing', url: 'https://www.youtube.com/@TheDeepValues', avatar: '/images/youtube-Deep-Value-Investing .jpg' },
    { name: 'Deep Values', url: 'https://www.youtube.com/@DeepValues', avatar: '/images/youtube-deep-values.png' },
    { name: '深度价值', url: 'https://www.youtube.com/@%E6%B7%B1%E5%BA%A6%E4%BB%B7%E5%80%BC', avatar: '/images/youtube-deep-values.png' },
  ];

  return (
    <div className="st max-w-5xl mx-auto w-full">
      <div className="text-center mb-10">
        <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
          <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
          {g('community.eyebrow')}
        </p>
        <h2 className={`text-2xl sm:text-3xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.02] ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
          {g('community.h1a')}<span className="aurora-grad">{g('community.h1b')}</span>
        </h2>
      </div>

      <div className="flex justify-center gap-6 md:gap-16 mb-8 md:mb-12">
        {channels.map((ch) => (
          <a key={ch.name} href={ch.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
            <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 ${isDark ? 'ring-2 ring-white/10 group-hover:ring-emerald-500/30' : 'ring-2 ring-gray-200 group-hover:ring-emerald-500/40 shadow-md'}`}>
              <img src={ch.avatar} alt={ch.name} className="w-full h-full object-cover" />
            </div>
            <span className={`text-sm font-medium transition-colors ${isDark ? 'text-white/60 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'}`}>{ch.name}</span>
          </a>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
        <a href="https://podcasts.apple.com/us/podcast/deep-value-investing/id1811057697" target="_blank" rel="noopener noreferrer"
          className={`flex items-center gap-5 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDark ? 'bg-white/[.04] border border-white/[.06] hover:border-emerald-500/20' : 'apple-card hover:shadow-lg'}`}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          </div>
          <div>
            <p className={`font-semibold text-[17px] ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>{g('community.podcast')}</p>
            <p className={`text-[13px] mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-700'}`}>{g('community.podcast.sub')}</p>
          </div>
        </a>

        <div className={`flex items-center gap-5 p-6 rounded-2xl ${isDark ? 'bg-white/[.04] border border-white/[.06]' : 'apple-card'}`}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </div>
          <div>
            <p className={`font-semibold text-[17px] ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>{g('community.newsletter')}</p>
            <p className={`text-[13px] mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-700'}`}>{g('community.newsletter.sub')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneStory() {
  const isDark = useTheme() === 'dark';
  return (
    <div className="st max-w-4xl mx-auto w-full text-center">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        Our Story
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[68px] font-extrabold tracking-tight leading-[1.02] mb-6 md:mb-10">
        <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>Research that </span>
        <span className="aurora-grad">serves you.</span>
      </h2>
      <div className={`space-y-4 md:space-y-5 text-base md:text-xl leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-700'}`}>
        <p>
          Institutional-grade investment research has long been locked behind expensive terminals
          and exclusive networks. We built DeepValues.AI to challenge that.
        </p>
        <p>
          Rooted in the principles of value investing, we use AI-powered agents to
          deliver the depth of a professional research team — to every investor.
        </p>
      </div>
    </div>
  );
}

function SceneMission() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  const cards = [
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 0 1 4 4v1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2V6a4 4 0 0 1 4-4z"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 12v6"/></svg>, titleKey: 'mission.c1.title' as const, descKey: 'mission.c1.desc' as const },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>, titleKey: 'mission.c2.title' as const, descKey: 'mission.c2.desc' as const },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, titleKey: 'mission.c3.title' as const, descKey: 'mission.c3.desc' as const },
  ];
  return (
    <div className="st max-w-4xl mx-auto w-full text-center">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        {g('mission.eyebrow')}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[68px] font-extrabold tracking-tight leading-[1.02] mb-4 md:mb-6">
        <span className="aurora-grad">{g('mission.h1a')}</span><br />
        <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>{g('mission.h1b')}</span>
      </h2>
      <p className={`text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 md:mb-10 ${isDark ? 'text-white/50' : 'text-gray-700'}`}>
        {g('mission.sub')}
      </p>
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3 md:gap-5">
        {cards.map((item) => (
          <div key={g(item.titleKey)} className={`p-4 md:p-6 rounded-xl md:rounded-2xl text-center ${isDark ? 'bg-white/[.04] border border-white/[.06] backdrop-blur-[20px]' : 'apple-card'}`}>
            <div className={`mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{item.icon}</div>
            <p className={`font-semibold text-[17px] mb-1 ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>{g(item.titleKey)}</p>
            <p className={`text-[13px] ${isDark ? 'text-white/40' : 'text-gray-700'}`}>{g(item.descKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneTeam() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  return (
    <div className="st max-w-4xl mx-auto w-full text-center">
      <p className={`text-xs font-bold uppercase tracking-[5px] mb-7 flex items-center justify-center gap-2.5 ${isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'}`}>
        <span className={`w-8 h-px bg-gradient-to-r ${isDark ? 'from-emerald-500' : 'from-emerald-600'} to-transparent`} />
        {g('team.eyebrow')}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.02] mb-6 md:mb-10">
        <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>{g('team.h1a')}</span>
        <span className="aurora-grad">{g('team.h1b')}</span>
      </h2>
      <div className={`max-w-2xl mx-auto rounded-xl md:rounded-2xl p-6 md:p-10 text-left ${isDark ? 'bg-white/[.04] border border-white/[.06] backdrop-blur-[20px]' : 'apple-card'}`}>
        <div className="flex items-center gap-3 mb-5">
          <div>
            <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
              Xinwei Fan
              <a href="https://www.linkedin.com/in/xinwei-fan/" target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${isDark ? 'text-white/30 hover:text-emerald-400' : 'text-gray-400 hover:text-emerald-600'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </h3>
            <p className="text-emerald-500 font-semibold text-[15px]">{g('team.role')}</p>
          </div>
        </div>
        <p className={`leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-700'}`}>
          {g('team.bio')}
        </p>
      </div>
    </div>
  );
}

// CTA always renders dark (Apple-style contrast shift)
function SceneCTA() {
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  return (
    <div className="st text-center max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[140px] font-black tracking-tighter leading-[0.9] aurora-grad">
        Deep Values
      </h1>
      <p className="text-xl md:text-2xl text-white/50 mt-7 max-w-[700px] mx-auto leading-relaxed">
        {g('cta.sub')}
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
  { id: 's0', component: SceneProblem, darkInsert: false },
  { id: 's1', component: SceneLegends, darkInsert: false },
  { id: 's2', component: SceneBrand, darkInsert: true },
  { id: 's3', component: SceneHowItWorks, darkInsert: false },
  { id: 's4', component: SceneDeliverables, darkInsert: false },
  { id: 's5', component: SceneWhy, darkInsert: false },
  { id: 's6', component: SceneCommunity, darkInsert: false },
  { id: 's7', component: SceneMission, darkInsert: false },
  { id: 's8', component: SceneTeam, darkInsert: false },
  { id: 's9', component: SceneCTA, darkInsert: true },
];

// ─── Main Component ─────────────────────────────────────────

export function HomePage({ user, signOut, theme = 'dark', onToggleTheme, lang = 'en', onToggleLang }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [exitingScene, setExitingScene] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [sceneKey, setSceneKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

  // Determine if current scene is a dark insert (for dot styling)
  const currentIsDarkInsert = !isDark ? false : false; // dark mode always dark
  const sceneDarkInsert = !isDark && SCENES[currentScene]?.darkInsert;

  return (
    <ThemeContext.Provider value={theme}>
      <LangContext.Provider value={lang}>
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

        <Header
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          signOut={signOut}
          user={user}
          theme={theme}
          onToggleTheme={onToggleTheme}
          goToScene={showScene}
          lang={lang}
          onToggleLang={onToggleLang}
        />

        <div className="scene-container" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {SCENES.map((s, i) => {
            const Component = s.component;
            const isActive = i === currentScene && exitingScene !== i;
            const isExiting = i === exitingScene;
            if (!isActive && !isExiting) return null;

            // In light mode, Brand (s2) and CTA (s7) render as dark inserts
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
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}
