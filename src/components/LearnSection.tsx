import { Podcast } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const channels = [
  {
    name: 'Deep Value Investing',
    label: 'English',
    url: 'https://www.youtube.com/@TheDeepValues',
    avatar: '/images/youtube-Deep-Value-Investing .jpg',
    type: 'youtube' as const,
  },
  {
    name: 'Deep Values',
    label: 'English',
    url: 'https://www.youtube.com/@DeepValues',
    avatar: '/images/youtube-deep-values.png',
    type: 'youtube' as const,
  },
  {
    name: '深度价值',
    label: '中文',
    url: 'https://www.youtube.com/@%E6%B7%B1%E5%BA%A6%E4%BB%B7%E5%80%BC',
    avatar: '/images/youtube-deep-values.png',
    type: 'youtube' as const,
  },
  {
    name: 'Apple Podcasts',
    label: 'Podcast',
    url: 'https://podcasts.apple.com/us/podcast/deep-value-investing/id1811057697',
    avatar: null,
    type: 'podcast' as const,
  },
];

export function LearnSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="learn" className="relative z-10 py-24 md:py-32">
      <div
        ref={ref}
        className={`stagger-in ${isVisible ? 'visible' : ''} max-w-4xl mx-auto px-6 text-center`}
      >
        <p className="text-xs font-bold uppercase tracking-[5px] text-emerald-400/80 mb-7 flex items-center justify-center gap-2.5">
          <span className="w-8 h-px bg-gradient-to-r from-emerald-500 to-transparent"></span>
          Learn With Us
          <span className="w-8 h-px bg-gradient-to-l from-emerald-500 to-transparent"></span>
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          <span className="text-white/40">Investment insights on</span>{' '}
          <span className="text-white">YouTube & Podcasts.</span>
        </h2>

        <div className="flex flex-wrap justify-center items-start gap-10 md:gap-14 mt-14">
          {channels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group w-28 transition-all duration-300 hover:-translate-y-1"
            >
              {channel.type === 'youtube' ? (
                <div className="w-24 h-24 rounded-full overflow-hidden ring-1 ring-white/10 group-hover:ring-emerald-500/30 transition-all duration-300 shadow-lg group-hover:shadow-emerald-500/10">
                  <img
                    src={channel.avatar!}
                    alt={channel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
                  <Podcast className="w-10 h-10 text-white" />
                </div>
              )}
              <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors text-center leading-tight">
                {channel.name}
              </span>
              <span className="text-[10px] text-white/30 -mt-1.5">{channel.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
