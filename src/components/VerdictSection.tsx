import { useInView } from '../hooks/useInView';

export function VerdictSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="relative z-10 py-24 md:py-32">
      <div
        ref={ref}
        className={`stagger-in ${isVisible ? 'visible' : ''} max-w-4xl mx-auto px-6 text-center`}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-white/40">One clear,</span>
          <br />
          <span className="text-white">battle-tested answer.</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-14">
          <div className="px-10 md:px-14 py-5 md:py-6 rounded-2xl text-2xl md:text-[28px] font-black tracking-tight bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-[0_8px_40px_rgba(16,185,129,.15)]">
            ADVOCATE
          </div>
          <div className="px-10 md:px-14 py-5 md:py-6 rounded-2xl text-2xl md:text-[28px] font-black tracking-tight bg-yellow-500/[.06] text-yellow-500/90 border border-yellow-500/[.12]">
            WATCH
          </div>
          <div className="px-10 md:px-14 py-5 md:py-6 rounded-2xl text-2xl md:text-[28px] font-black tracking-tight bg-red-500/[.06] text-red-500/90 border border-red-500/[.12]">
            AVOID
          </div>
        </div>

        <p className="text-lg text-white/45 mt-8 max-w-lg mx-auto leading-relaxed">
          Every verdict backed by a complete trail<br />
          of adversarial reasoning you can read yourself.
        </p>
      </div>
    </section>
  );
}
