export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[5px] text-emerald-400/80 mb-7 flex items-center justify-center gap-2.5">
          <span className="w-8 h-px bg-gradient-to-r from-emerald-500 to-transparent"></span>
          Deep Values Intelligence
          <span className="w-8 h-px bg-gradient-to-l from-emerald-500 to-transparent"></span>
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-[130px] font-black tracking-tighter leading-[0.9] aurora-grad">
          Deep Values
        </h1>

        <p className="text-lg md:text-2xl text-white/50 mt-7 max-w-[700px] mx-auto leading-relaxed">
          Your own institutional-grade research team —<br className="hidden md:block" />
          one that actually works in your best interest.
        </p>

        <a
          href="https://app.deepvalues.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-11 text-emerald-500 text-2xl md:text-[30px] font-extrabold tracking-tight hover:text-emerald-400 transition-colors"
        >
          Try it free →
        </a>
      </div>
    </section>
  );
}
