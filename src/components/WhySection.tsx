import { useInView } from '../hooks/useInView';

const props = [
  { label: 'Objective', title: 'Zero conflicts\nof interest', body: 'No banking relationships. No commissions. Analysis that serves only the truth.' },
  { label: 'Adversarial', title: 'Every thesis\ngets challenged', body: 'Bull vs Bear ensures weak ideas don\'t survive. Only battle-tested convictions.' },
  { label: 'Transparent', title: 'See every\nargument', body: 'Full audit trail of debates and reasoning. Nothing hidden behind a rating.' },
  { label: 'Institutional', title: 'Hedge fund\nprocess, for you', body: 'The multi-stage research process used by the best funds — democratized.' },
];

export function WhySection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="relative z-10 py-24 md:py-32">
      <div
        ref={ref}
        className={`stagger-in ${isVisible ? 'visible' : ''} max-w-6xl mx-auto px-6 text-center`}
      >
        <p className="text-xs font-bold uppercase tracking-[5px] text-emerald-400/80 mb-7 flex items-center justify-center gap-2.5">
          <span className="w-8 h-px bg-gradient-to-r from-emerald-500 to-transparent"></span>
          Why Deep Values
          <span className="w-8 h-px bg-gradient-to-l from-emerald-500 to-transparent"></span>
        </p>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-white/40">Research</span>{' '}
          <span className="aurora-grad">aligned with you.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {props.map((p) => (
            <div
              key={p.label}
              className="relative p-8 rounded-2xl border border-white/[.05] bg-white/[.03] backdrop-blur-[30px] text-left overflow-hidden"
            >
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent"></div>
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-emerald-400/60 mb-3">{p.label}</p>
              <p className="text-2xl font-extrabold text-white tracking-tight leading-tight whitespace-pre-line">{p.title}</p>
              <p className="text-[13px] text-white/35 mt-2.5 leading-snug">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
