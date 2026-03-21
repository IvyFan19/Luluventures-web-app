import { useInView } from '../hooks/useInView';

const benefits = [
  { icon: '🔍', title: 'Deep Multi-Angle Analysis', desc: 'Value, growth, fundamentals, technicals, sentiment, news' },
  { icon: '⚔️', title: 'Adversarial Debate', desc: 'Bull vs bear cases argue across multiple rounds' },
  { icon: '🛡️', title: 'Risk Stress-Test', desc: 'Conservative, neutral & aggressive risk review' },
  { icon: '✓', title: 'Battle-Tested Verdict', desc: 'Conviction backed by every counter-argument', highlight: true },
];

export function HowItWorksSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="apps" className="relative z-10 py-24 md:py-32">
      <div
        ref={ref}
        className={`stagger-in ${isVisible ? 'visible' : ''} max-w-6xl mx-auto px-6`}
      >
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          {/* Left: text */}
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-[5px] text-emerald-400/80 mb-7 flex items-center gap-2.5">
              <span className="w-8 h-px bg-gradient-to-r from-emerald-500 to-transparent"></span>
              How It Works
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-[68px] font-extrabold tracking-tight leading-[1.02]">
              <span className="text-white">Like having</span>
              <br />
              <span className="aurora-grad">a full research desk</span>
              <br />
              <span className="text-white">working for you.</span>
            </h2>

            <p className="text-lg md:text-xl text-white/50 mt-6 max-w-[500px] leading-relaxed">
              Multiple specialists analyze every angle. Then they argue. A risk team challenges the winner. Only the strongest thesis survives.
            </p>
          </div>

          {/* Right: benefit cards */}
          <div className="flex-1 w-full max-w-[520px] flex flex-col gap-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className={`relative flex items-center gap-5 py-5 px-6 rounded-2xl border bg-white/[.03] backdrop-blur-[20px] ${
                  b.highlight
                    ? 'border-emerald-500/15 shadow-[0_0_30px_rgba(16,185,129,.05)]'
                    : 'border-white/[.05]'
                }`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-sm bg-gradient-to-b from-emerald-500 to-cyan-500"></div>
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                    b.highlight
                      ? 'bg-gradient-to-br from-emerald-500 to-cyan-500'
                      : 'bg-emerald-500/10'
                  }`}
                >
                  {b.highlight ? <span className="brightness-[10]">{b.icon}</span> : b.icon}
                </div>
                <div>
                  <p className={`text-[17px] font-semibold ${b.highlight ? 'text-emerald-500' : 'text-white'}`}>
                    {b.title}
                  </p>
                  <p className="text-[13px] text-white/40 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
