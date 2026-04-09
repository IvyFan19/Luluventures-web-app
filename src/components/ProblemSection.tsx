import { useInView } from '../hooks/useInView';

const kickers = [
  { text: 'Conflicted analysts.\n"Buy" ratings on stocks\nthey\'re paid to promote.' },
  { text: 'Consensus-driven research\ndesigned to protect careers,\nnot find the truth.' },
  { text: 'ETFs built to drive trading,\nnot to align with your\nlong-term interest.' },
];

export function ProblemSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="relative z-10 py-24 md:py-32">
      <div
        ref={ref}
        className={`stagger-in ${isVisible ? 'visible' : ''} max-w-4xl mx-auto px-6 text-center`}
      >
        <p className="text-xs font-bold uppercase tracking-[5px] text-[#08c4e4] mb-7 flex items-center justify-center gap-2.5">
          <span className="w-8 h-px bg-gradient-to-r from-[#08c4e4] to-transparent"></span>
          The Problem
          <span className="w-8 h-px bg-gradient-to-l from-[#08c4e4] to-transparent"></span>
        </p>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
          <span className="text-white/40">Wall Street</span>{' '}
          <span className="text-white">works for Wall Street.</span>
          <br />
          <span className="text-red-500">Not for you.</span>
        </h2>

        <p className="text-lg md:text-[22px] text-white/45 mt-7 max-w-[600px] mx-auto leading-relaxed">
          2% of your portfolio — gone every year.<br />
          Whether they're right or wrong.
        </p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-10 justify-center">
          {kickers.map((k, i) => (
            <p
              key={i}
              className="text-sm md:text-[15px] text-white/30 leading-relaxed border-l-2 border-red-500/30 pl-5 text-left max-w-[240px]"
              style={{ whiteSpace: 'pre-line' }}
            >
              {k.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
