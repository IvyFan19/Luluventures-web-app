import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { Header } from './Header';
import { getText } from '../i18n';

const ThemeContext = createContext<'dark' | 'light'>('dark');
function useTheme() {
  return useContext(ThemeContext);
}

const LangContext = createContext<'en' | 'zh'>('en');
function useLang() {
  return useContext(LangContext);
}

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

function getSectionTheme(index: number, baseTheme: 'dark' | 'light') {
  if (index % 2 === 0) return baseTheme;
  return baseTheme === 'dark' ? 'light' : 'dark';
}

function SceneProblem() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);

  return (
    <div className="st text-center max-w-4xl mx-auto">
      <p
        className={`mb-7 flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[5px] ${
          isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'
        }`}
      >
        <span
          className={`h-px w-8 bg-gradient-to-r ${
            isDark ? 'from-emerald-500' : 'from-emerald-600'
          } to-transparent`}
        />
        {g('problem.eyebrow')}
        <span
          className={`h-px w-8 bg-gradient-to-l ${
            isDark ? 'from-emerald-500' : 'from-emerald-600'
          } to-transparent`}
        />
      </p>
      <h2 className="text-4xl font-extrabold tracking-tight leading-[1.05] md:text-6xl lg:text-[80px]">
        <span className={isDark ? 'text-white/40' : 'text-gray-700'}>{g('problem.h1a')}</span>{' '}
        <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>{g('problem.h1b')}</span>
        <br />
        <span className="text-red-500">{g('problem.h1c')}</span>
      </h2>
      <p
        className={`mx-auto mt-8 max-w-[600px] whitespace-pre-line text-lg leading-relaxed md:text-[22px] ${
          isDark ? 'text-white/45' : 'text-gray-700'
        }`}
      >
        {g('problem.sub')}
      </p>
      <div className="mt-12 flex flex-col justify-center gap-6 md:flex-row md:gap-12">
        {(['problem.p1', 'problem.p2', 'problem.p3'] as const).map((k, i) => (
          <p
            key={i}
            className={`max-w-[240px] border-l-2 pl-5 text-left text-sm leading-relaxed whitespace-pre-line md:text-[15px] ${
              isDark ? 'border-red-500/30 text-white/30' : 'border-red-400/30 text-gray-500'
            }`}
          >
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
      <p
        className={`mb-7 flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[5px] ${
          isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'
        }`}
      >
        <span
          className={`h-px w-8 bg-gradient-to-r ${
            isDark ? 'from-emerald-500' : 'from-emerald-600'
          } to-transparent`}
        />
        {g('legends.eyebrow')}
        <span
          className={`h-px w-8 bg-gradient-to-l ${
            isDark ? 'from-emerald-500' : 'from-emerald-600'
          } to-transparent`}
        />
      </p>
      <h2 className="text-3xl font-extrabold tracking-tight leading-tight md:text-5xl lg:text-[60px]">
        <span className={isDark ? 'text-white/40' : 'text-gray-700'}>{g('legends.h1a')}</span>
        <br />
        <span className="aurora-grad">{g('legends.h1b')}</span>
      </h2>
      <div className="mt-14 flex flex-wrap justify-center gap-3">
        {legends.map((legend) => (
          <div
            key={legend.name}
            className={`relative min-w-[150px] max-w-[200px] flex-1 overflow-hidden rounded-3xl p-6 text-center ${
              isDark ? 'border border-white/[.06] bg-white/[.04] backdrop-blur-[30px]' : 'apple-card'
            }`}
          >
            <div
              className={`absolute left-[15%] right-[15%] top-0 h-px bg-gradient-to-r from-transparent ${
                isDark ? 'via-emerald-500/25' : 'via-emerald-500/15'
              } to-transparent`}
            />
            <p className={`mb-2 text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
              {legend.name}
            </p>
            <p
              className={`whitespace-pre-line text-[13px] leading-snug italic ${
                isDark ? 'text-white/45' : 'text-gray-700'
              }`}
            >
              {g(legend.key)}
            </p>
          </div>
        ))}
      </div>
      <p className={`mt-12 text-xl leading-relaxed md:text-2xl ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
        {g('legends.pivot')}
        <span className="aurora-grad font-semibold">{g('legends.pivot2')}</span>
        {g('legends.pivot3')}
      </p>
    </div>
  );
}

function SceneHowItWorks() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  const benefits = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
      labelKey: 'why.p1.label' as const,
      titleKey: 'why.p1.title' as const,
      descKey: 'why.p1.body' as const,
      highlight: true,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h6" />
          <path d="M14 7h6" />
          <path d="M8 7l4 4 4-4" />
          <path d="M8 17l4-4 4 4" />
        </svg>
      ),
      labelKey: 'why.p2.label' as const,
      titleKey: 'why.p2.title' as const,
      descKey: 'why.p2.body' as const,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      labelKey: 'why.p3.label' as const,
      titleKey: 'why.p3.title' as const,
      descKey: 'why.p3.body' as const,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18" />
          <path d="M6 21V9" />
          <path d="M12 21V3" />
          <path d="M18 21v-6" />
        </svg>
      ),
      labelKey: 'why.p4.label' as const,
      titleKey: 'why.p4.title' as const,
      descKey: 'why.p4.body' as const,
    },
  ];

  return (
    <div className="st max-w-6xl mx-auto w-full">
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-24">
        <div className="flex-1">
          <p
            className={`mb-7 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[5px] ${
              isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'
            }`}
          >
            <span
              className={`h-px w-8 bg-gradient-to-r ${
                isDark ? 'from-emerald-500' : 'from-emerald-600'
              } to-transparent`}
            />
            {g('how.eyebrow')}
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight leading-[1.02] md:text-5xl lg:text-[68px]">
            <span className={isDark ? 'text-white/40' : 'text-gray-700'}>{g('why.h1a')}</span>{' '}
            <span className="aurora-grad">{g('why.h1b')}</span>
          </h2>
          <p className={`mt-6 max-w-[500px] text-lg leading-relaxed md:text-xl ${isDark ? 'text-white/50' : 'text-gray-700'}`}>
            {g('why.sub')}
          </p>
        </div>
        <div className="flex-1 w-full max-w-[520px] flex-col gap-3 flex">
          {benefits.map((benefit) => (
            <div
              key={g(benefit.titleKey)}
              className={`relative flex items-center gap-5 rounded-2xl px-6 py-5 ${
                isDark
                  ? `border bg-white/[.03] backdrop-blur-[20px] ${
                      benefit.highlight
                        ? 'border-emerald-500/15 shadow-[0_0_30px_rgba(16,185,129,.05)]'
                        : 'border-white/[.05]'
                    }`
                  : `apple-card ${benefit.highlight ? 'shadow-[0_4px_24px_rgba(16,185,129,.1)]' : ''}`
              }`}
            >
              <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-sm bg-gradient-to-b from-emerald-500 to-cyan-500" />
              <div
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-lg ${
                  benefit.highlight ? 'bg-gradient-to-br from-emerald-500 to-cyan-500' : 'bg-emerald-500/10'
                }`}
              >
                <span className={benefit.highlight ? 'text-white' : isDark ? 'text-emerald-400' : 'text-emerald-600'}>
                  {benefit.icon}
                </span>
              </div>
              <div>
                <p className={`mb-1 text-[11px] font-bold uppercase tracking-[2px] ${isDark ? 'text-emerald-400/60' : 'text-emerald-600/60'}`}>
                  {g(benefit.labelKey)}
                </p>
                <p className={`text-[17px] font-semibold ${benefit.highlight ? 'text-emerald-600' : isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
                  {g(benefit.titleKey)}
                </p>
                <p className={`mt-1 text-[13px] leading-snug ${isDark ? 'text-white/40' : 'text-gray-700'}`}>
                  {g(benefit.descKey)}
                </p>
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
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      ),
      nameKey: 'del.d1.name' as const,
      subKey: 'del.d1.sub' as const,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      ),
      nameKey: 'del.d2.name' as const,
      subKey: 'del.d2.sub' as const,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="m10 9 5 3-5 3V9z" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      nameKey: 'del.d3.name' as const,
      subKey: 'del.d3.sub' as const,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      nameKey: 'del.d4.name' as const,
      subKey: 'del.d4.sub' as const,
    },
  ];

  return (
    <div className="st text-center max-w-5xl mx-auto">
      <p
        className={`mb-7 flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[5px] ${
          isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'
        }`}
      >
        <span
          className={`h-px w-8 bg-gradient-to-r ${
            isDark ? 'from-emerald-500' : 'from-emerald-600'
          } to-transparent`}
        />
        {g('del.eyebrow')}
        <span
          className={`h-px w-8 bg-gradient-to-l ${
            isDark ? 'from-emerald-500' : 'from-emerald-600'
          } to-transparent`}
        />
      </p>
      <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-[56px]">
        <span className={isDark ? 'text-white/40' : 'text-gray-700'}>{g('del.h1a')}</span>{' '}
        <span className="aurora-grad">{g('del.h1b')}</span>
      </h2>
      <div className="mt-14 flex flex-wrap justify-center gap-5">
        {deliverables.map((deliverable) => (
          <div
            key={g(deliverable.nameKey)}
            className={`min-w-[170px] rounded-2xl p-7 text-center ${
              isDark ? 'border border-white/[.05] bg-white/[.03] backdrop-blur-[30px]' : 'apple-card'
            }`}
          >
            <div className={`mb-4 flex items-center justify-center ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {deliverable.icon}
            </div>
            <p className={`text-[15px] font-semibold ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
              {g(deliverable.nameKey)}
            </p>
            <p
              className={`mt-1.5 whitespace-pre-line text-[12px] leading-snug ${
                isDark ? 'text-white/35' : 'text-gray-700'
              }`}
            >
              {g(deliverable.subKey)}
            </p>
          </div>
        ))}
      </div>
      <p className={`mt-10 text-sm ${isDark ? 'text-white/35' : 'text-gray-400'}`}>{g('del.footer')}</p>
    </div>
  );
}

function SceneCommunity() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);
  const podcastUrl =
    l === 'zh'
      ? 'https://podcasts.apple.com/us/podcast/%E6%B7%B1%E5%BA%A6%E4%BB%B7%E5%80%BC/id1813017485'
      : 'https://podcasts.apple.com/us/podcast/deep-value-investing/id1811057697';
  const channels =
    l === 'zh'
      ? [
          {
            name: '深度价值投资',
            url: 'https://www.youtube.com/@TheDeepValues',
            avatar: '/images/youtube-Deep-Value-Investing .jpg',
          },
          {
            name: '深度价值',
            url: 'https://www.youtube.com/@%E6%B7%B1%E5%BA%A6%E4%BB%B7%E5%80%BC',
            avatar: '/images/youtube-deep-values.png',
          },
        ]
      : [
          {
            name: 'Deep Value Investing',
            url: 'https://www.youtube.com/@TheDeepValues',
            avatar: '/images/youtube-Deep-Value-Investing .jpg',
          },
          {
            name: 'Deep Values',
            url: 'https://www.youtube.com/@DeepValues',
            avatar: '/images/youtube-deep-values.png',
          },
        ];

  return (
    <div className="st max-w-5xl mx-auto w-full">
      <div className="mb-10 text-center">
        <p
          className={`mb-7 flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[5px] ${
            isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'
          }`}
        >
          <span
            className={`h-px w-8 bg-gradient-to-r ${
              isDark ? 'from-emerald-500' : 'from-emerald-600'
            } to-transparent`}
          />
          {g('community.eyebrow')}
        </p>
        <h2 className={`text-4xl font-extrabold tracking-tight leading-[1.02] md:text-5xl lg:text-[56px] ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
          {g('community.h1a')}
          <span className="aurora-grad">{g('community.h1b')}</span>
        </h2>
      </div>

      <div className="mb-12 flex justify-center gap-10 md:gap-16">
        {channels.map((channel) => (
          <a
            key={channel.name}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3"
          >
            <div
              className={`h-20 w-20 overflow-hidden rounded-full transition-all duration-300 group-hover:scale-105 md:h-24 md:w-24 ${
                isDark
                  ? 'ring-2 ring-white/10 group-hover:ring-emerald-500/30'
                  : 'shadow-md ring-2 ring-gray-200 group-hover:ring-emerald-500/40'
              }`}
            >
              <img
                src={channel.avatar}
                alt={channel.name}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width="96"
                height="96"
                sizes="(max-width: 768px) 80px, 96px"
              />
            </div>
            <span className={`text-sm font-medium transition-colors ${isDark ? 'text-white/60 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'}`}>
              {channel.name}
            </span>
          </a>
        ))}
      </div>

      <div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2">
        <a
          href={podcastUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-5 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
            isDark ? 'border border-white/[.06] bg-white/[.04] hover:border-emerald-500/20' : 'apple-card hover:shadow-lg'
          }`}
        >
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </div>
          <div>
            <p className={`text-[17px] font-semibold ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
              {g('community.podcast')}
            </p>
            <p className={`mt-0.5 text-[13px] ${isDark ? 'text-white/40' : 'text-gray-700'}`}>
              {g('community.podcast.sub')}
            </p>
          </div>
        </a>

        <div className={`flex items-center gap-5 rounded-2xl p-6 ${isDark ? 'border border-white/[.06] bg-white/[.04]' : 'apple-card'}`}>
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <div>
            <p className={`text-[17px] font-semibold ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
              {g('community.newsletter')}
            </p>
            <p className={`mt-0.5 text-[13px] ${isDark ? 'text-white/40' : 'text-gray-700'}`}>
              {g('community.newsletter.sub')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneMission() {
  const isDark = useTheme() === 'dark';
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);

  return (
    <div className="st max-w-4xl mx-auto w-full text-center">
      <div className="mx-auto max-w-3xl">
        <p
          className={`mb-7 flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[5px] ${
            isDark ? 'text-emerald-400/80' : 'text-emerald-600/70'
          }`}
        >
          <span
            className={`h-px w-8 bg-gradient-to-r ${
              isDark ? 'from-emerald-500' : 'from-emerald-600'
            } to-transparent`}
          />
          {g('team.eyebrow')}
        </p>
        <h2 className="mb-10 text-4xl font-extrabold tracking-tight leading-[1.02] md:text-5xl lg:text-[56px]">
          <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>{g('team.h1a')}</span>
          <span className="aurora-grad">{g('team.h1b')}</span>
        </h2>
        <div id="team" className="scroll-mt-28">
          <div
            className={`mx-auto max-w-2xl rounded-2xl p-8 text-left md:p-10 ${
              isDark ? 'border border-white/[.06] bg-white/[.04] backdrop-blur-[20px]' : 'apple-card'
            }`}
          >
            <div className="mb-5 flex items-center gap-3">
              <div>
                <h3 className={`flex items-center gap-2 text-xl font-bold ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}>
                  Xinwei (Ivy) Fan
                  <a
                    href="https://www.linkedin.com/in/xinwei-fan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors ${
                      isDark ? 'text-white/30 hover:text-emerald-400' : 'text-gray-400 hover:text-emerald-600'
                    }`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </h3>
                <p className="text-[15px] font-semibold text-emerald-500">{g('team.role')}</p>
              </div>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-700'}`}>{g('team.bio')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneCTA() {
  const l = useLang();
  const g = (k: Parameters<typeof getText>[0]) => getText(k, l);

  return (
    <div className="relative -mt-24 md:-mt-40">
      <div className="hero-bg" />
      <div className="st relative text-center max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <img
            src="/images/deepvalues-icon.png"
            alt="DeepValues.ai"
            className="h-6 w-auto md:h-8"
          />
          <span className="aurora-grad text-2xl font-bold tracking-tight md:text-4xl">
            DeepValues.ai
          </span>
        </div>
        <p className="mt-12 text-xl font-light tracking-[0.04em] text-white/55 md:mt-14 md:text-3xl lg:text-4xl">
          {g('cta.sub')}
        </p>
        <h1 className="hero-headline mt-5 text-4xl font-black leading-[1.05] tracking-[-0.02em] md:mt-7 md:text-5xl lg:text-[66px]">
          {g('cta.headline')}
        </h1>
      </div>
    </div>
  );
}

function MobileExploreDock({
  isDark,
  lang,
  isVisible,
}: {
  isDark: boolean;
  lang: 'en' | 'zh';
  isVisible: boolean;
}) {
  const g = (k: Parameters<typeof getText>[0]) => getText(k, lang);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] md:hidden">
      <div
        className={`pointer-events-auto mx-auto flex max-w-md items-center gap-3 rounded-[22px] border px-3 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.18)] backdrop-blur-xl ${
          isDark ? 'border-white/10 bg-black/70' : 'border-black/10 bg-white/88'
        }`}
      >
        <div className="min-w-0 flex-1 pl-2">
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-white/35' : 'text-gray-500'}`}>
            Deep Values
          </p>
          <p className={`truncate text-[13px] ${isDark ? 'text-white/65' : 'text-gray-600'}`}>
            {g('cta.sub')}
          </p>
        </div>
        <a
          href="https://app.deepvalues.ai"
          target="_blank"
          rel="noopener noreferrer"
          className={`shrink-0 rounded-full px-5 py-3 text-[14px] font-semibold transition-colors ${
            isDark
              ? 'bg-emerald-500 text-black hover:bg-emerald-400'
              : 'bg-[#1d1d1f] text-white hover:bg-black'
          }`}
          aria-label={g('nav.explore')}
        >
          {g('nav.explore')}
        </a>
      </div>
    </div>
  );
}

const PAGE_SECTIONS = [
  { id: 'brand', component: SceneCTA },
  { id: 'problem', component: SceneProblem },
  { id: 'legends', component: SceneLegends },
  { id: 'how', component: SceneHowItWorks },
  { id: 'deliverables', component: SceneDeliverables },
  { id: 'community', component: SceneCommunity },
  { id: 'mission', component: SceneMission },
] as const;

const SECTION_INDEX_TO_ID: Record<number, string> = {
  0: 'page-top',
  3: 'how',
  4: 'deliverables',
  5: 'community',
  6: 'mission',
  7: 'team',
};

function PageSection({
  id,
  index,
  isDark,
  isFirst,
  children,
}: {
  id: string;
  index: number;
  isDark: boolean;
  isFirst: boolean;
  children: ReactNode;
}) {
  const sectionTheme = getSectionTheme(index, isDark ? 'dark' : 'light');
  const isDarkSection = sectionTheme === 'dark';

  return (
    <section
      id={id}
      className={`relative scroll-mt-28 overflow-hidden ${
        isFirst ? '' : 'page-section-deferred'
      } ${
        isFirst ? '' : isDarkSection ? 'border-t border-white/[0.05]' : 'border-t border-black/[0.06]'
      } ${isDarkSection ? 'scene-dark-insert' : 'page-section-light'}`}
    >
      {isDarkSection ? <div className="aurora-insert" /> : <div className="page-section-light-wash" />}
      <div className="relative z-10 flex min-h-[82vh] items-center px-6 py-24 md:min-h-screen md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <ThemeContext.Provider value={sectionTheme}>{children}</ThemeContext.Provider>
        </div>
      </div>
    </section>
  );
}

export function HomePage({
  user,
  signOut,
  theme = 'dark',
  onToggleTheme,
  lang = 'en',
  onToggleLang,
}: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const isDark = theme === 'dark';
  const headerTheme = getSectionTheme(activeSectionIndex, theme);
  const showMobileExploreDock = !isMenuOpen && activeSectionIndex < PAGE_SECTIONS.length - 1;

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const scrollToSection = useCallback((index: number) => {
    const id = SECTION_INDEX_TO_ID[index] ?? 'page-top';
    const element = document.getElementById(id);
    if (!element) return;

    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', id === 'page-top' ? window.location.pathname : `#${id}`);
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = PAGE_SECTIONS.map((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return null;
      element.dataset.sectionIndex = String(index);
      return element;
    }).filter((element): element is HTMLElement => element !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const visibleIndex = Number(visibleEntries[0].target.getAttribute('data-section-index') ?? '0');
        setActiveSectionIndex(visibleIndex);
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-18% 0px -28% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <LangContext.Provider value={lang}>
      <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-[#1d1d1f]'}`}>

        <Header
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          signOut={signOut}
          user={user}
          theme={headerTheme}
          onToggleTheme={onToggleTheme}
          goToScene={scrollToSection}
          lang={lang}
          onToggleLang={onToggleLang}
        />

        <main id="page-top" className="relative z-10 pb-28 md:pb-0">
          {PAGE_SECTIONS.map((section, index) => {
            const Component = section.component;

            return (
              <PageSection
                key={section.id}
                id={section.id}
                index={index}
                isDark={isDark}
                isFirst={index === 0}
              >
                <Component />
              </PageSection>
            );
          })}
        </main>

        <MobileExploreDock
          isDark={headerTheme === 'dark'}
          lang={lang}
          isVisible={showMobileExploreDock}
        />
      </div>
    </LangContext.Provider>
  );
}
