import { useInView } from '../hooks/useInView';

const legends = [
  { name: 'Buffett', philosophy: '"Find wonderful companies\nat fair prices"' },
  { name: 'Munger', philosophy: '"Invert, always invert —\nthink about what can go wrong"' },
  { name: 'Lynch', philosophy: '"Know what you own\nand why you own it"' },
  { name: 'Druckenmiller', philosophy: '"Concentrate your bets\nwhen conviction is highest"' },
  { name: 'Marks', philosophy: '"The most important thing\nis being aware of risk"' },
];

export function LegendsSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="relative z-10 py-24 md:py-32">
      <div
        ref={ref}
        className={`stagger-in ${isVisible ? 'visible' : ''} max-w-[1060px] mx-auto px-6 text-center`}
      >
        <p className="text-xs font-bold uppercase tracking-[5px] text-emerald-400/80 mb-7 flex items-center justify-center gap-2.5">
          <span className="w-8 h-px bg-gradient-to-r from-emerald-500 to-transparent"></span>
          Your Research Team
          <span className="w-8 h-px bg-gradient-to-l from-emerald-500 to-transparent"></span>
        </p>

        <h2 className="text-3xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-tight">
          <span className="text-white/40">What if you could invest alongside</span>
          <br />
          <span className="aurora-grad">the greatest minds in history?</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {legends.map((l) => (
            <div
              key={l.name}
              className="relative flex-1 min-w-[150px] max-w-[200px] p-6 text-center rounded-3xl border border-white/[.06] bg-white/[.04] backdrop-blur-[30px] overflow-hidden"
            >
              <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent"></div>
              <p className="text-xl font-extrabold text-white tracking-tight mb-2">{l.name}</p>
              <p className="text-[13px] text-white/45 leading-snug italic whitespace-pre-line">{l.philosophy}</p>
            </div>
          ))}
        </div>

        <p className="text-xl md:text-2xl text-white/60 mt-11 leading-relaxed">
          Their frameworks. <span className="aurora-grad font-semibold">16 AI super analysts.</span> Working for you.
        </p>
      </div>
    </section>
  );
}
