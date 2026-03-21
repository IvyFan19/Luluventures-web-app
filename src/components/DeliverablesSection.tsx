import { useInView } from '../hooks/useInView';

const deliverables = [
  { icon: '📊', name: 'Research Report', sub: 'Models, charts &\ndebate transcripts' },
  { icon: '🎙️', name: 'Audio Briefing', sub: 'Executive summary\nyou can listen to' },
  { icon: '🎬', name: 'Visual Presentation', sub: 'Animated financial\nvisualizations' },
  { icon: '💬', name: 'AI Q&A Chat', sub: 'Ask follow-ups about\nany finding' },
];

function RevenueChart() {
  return (
    <div className="relative p-5 md:p-6 rounded-2xl border border-white/[.06] bg-gradient-to-br from-white/[.04] to-white/[.02] backdrop-blur-[30px] overflow-hidden flex-1">
      <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent"></div>
      <p className="text-[10px] font-bold uppercase tracking-[2px] text-emerald-400/60 mb-3">10-Year Revenue & Net Income</p>
      <svg viewBox="0 0 400 180" className="w-full">
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity=".4"/><stop offset="100%" stopColor="#10b981" stopOpacity="0"/></linearGradient>
          <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#06b6d4" stopOpacity=".35"/><stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/></linearGradient>
        </defs>
        <line x1="40" y1="20" x2="40" y2="150" stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
        <line x1="40" y1="150" x2="390" y2="150" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
        {[110, 70, 30].map(y => (
          <line key={y} x1="40" y1={y} x2="390" y2={y} stroke="rgba(255,255,255,.03)" strokeWidth="1" strokeDasharray="4"/>
        ))}
        {['$0','$40B','$80B','$120B'].map((t, i) => (
          <text key={t} x="38" y={153 - i * 40} fill="rgba(255,255,255,.08)" fontSize="7" textAnchor="end">{t}</text>
        ))}
        {['2015','2017','2019','2021','2023','2025'].map((t, i) => (
          <text key={t} x={60 + i * 64} y="165" fill="rgba(255,255,255,.1)" fontSize="7" textAnchor="middle">{t}</text>
        ))}
        <path d="M60,142 L95,140 L130,136 L165,138 L200,130 L235,120 L270,105 L305,80 L340,50 L375,25" fill="none" stroke="#10b981" strokeWidth="2"/>
        <path d="M60,142 L95,140 L130,136 L165,138 L200,130 L235,120 L270,105 L305,80 L340,50 L375,25 L375,150 L60,150 Z" fill="url(#revGrad)"/>
        <path d="M60,148 L95,147 L130,146 L165,147 L200,144 L235,140 L270,132 L305,115 L340,90 L375,60" fill="none" stroke="#06b6d4" strokeWidth="2"/>
        <path d="M60,148 L95,147 L130,146 L165,147 L200,144 L235,140 L270,132 L305,115 L340,90 L375,60 L375,150 L60,150 Z" fill="url(#incGrad)"/>
        <circle cx="375" cy="25" r="3" fill="#10b981" opacity=".9"/><circle cx="375" cy="25" r="6" fill="#10b981" opacity=".2"/>
        <circle cx="375" cy="60" r="3" fill="#06b6d4" opacity=".9"/><circle cx="375" cy="60" r="6" fill="#06b6d4" opacity=".2"/>
      </svg>
      <div className="flex gap-4 mt-2 justify-center">
        <span className="flex items-center gap-1.5 text-[10px] text-white/40"><span className="w-2 h-[3px] bg-emerald-500 rounded-sm inline-block"></span>Revenue</span>
        <span className="flex items-center gap-1.5 text-[10px] text-white/40"><span className="w-2 h-[3px] bg-cyan-500 rounded-sm inline-block"></span>Net Income</span>
      </div>
    </div>
  );
}

function MetricsChart() {
  const bars = [
    { label: 'ROE', value: '91.5%', width: 250, color: '#34d399', gradId: 'bg1', baseColor: '#10b981' },
    { label: 'Gross Margin', value: '75.0%', width: 230, color: '#22d3ee', gradId: 'bg2', baseColor: '#06b6d4' },
    { label: 'FCF Yield', value: '2.8%', width: 70, color: '#34d399', gradId: 'bg3', baseColor: '#10b981' },
    { label: 'D/E Ratio', value: '0.41', width: 90, color: '#eab308', gradId: 'bg4', baseColor: '#eab308' },
    { label: 'Piotroski F', value: '8 / 9', width: 210, color: '#22d3ee', gradId: 'bg5', baseColor: '#06b6d4' },
  ];

  return (
    <div className="relative p-5 md:p-6 rounded-2xl border border-white/[.06] bg-gradient-to-br from-white/[.04] to-white/[.02] backdrop-blur-[30px] overflow-hidden flex-1">
      <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent"></div>
      <p className="text-[10px] font-bold uppercase tracking-[2px] text-emerald-400/60 mb-3">Key Financial Metrics</p>
      <svg viewBox="0 0 400 180" className="w-full">
        <defs>
          {bars.map(b => (
            <linearGradient key={b.gradId} id={b.gradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={b.baseColor} stopOpacity=".08"/>
              <stop offset="100%" stopColor={b.baseColor} stopOpacity=".35"/>
            </linearGradient>
          ))}
        </defs>
        {bars.map((b, i) => {
          const y = 18 + i * 32;
          return (
            <g key={b.label}>
              <text x="70" y={y + 10} fill="rgba(255,255,255,.4)" fontSize="9" textAnchor="end">{b.label}</text>
              <rect x="80" y={y} width={b.width} height="16" rx="4" fill={`url(#${b.gradId})`}/>
              <rect x="80" y={y} width={b.width} height="16" rx="4" fill="none" stroke={`${b.baseColor}22`} strokeWidth=".5"/>
              <text x={80 + b.width + 10} y={y + 11} fill={b.color} fontSize="9" fontWeight="600">{b.value}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function DeliverablesSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="relative z-10 py-24 md:py-32">
      <div
        ref={ref}
        className={`stagger-in ${isVisible ? 'visible' : ''} max-w-5xl mx-auto px-6 text-center`}
      >
        <p className="text-xs font-bold uppercase tracking-[5px] text-emerald-400/80 mb-7 flex items-center justify-center gap-2.5">
          <span className="w-8 h-px bg-gradient-to-r from-emerald-500 to-transparent"></span>
          What You Get
          <span className="w-8 h-px bg-gradient-to-l from-emerald-500 to-transparent"></span>
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          <span className="text-white/40">Type a ticker.</span>{' '}
          <span className="aurora-grad">Get everything.</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {deliverables.map((d) => (
            <div
              key={d.name}
              className="p-6 min-w-[160px] text-center rounded-2xl border border-white/[.05] bg-white/[.03] backdrop-blur-[30px]"
            >
              <p className="text-[28px] mb-3.5">{d.icon}</p>
              <p className="text-[15px] font-semibold text-white">{d.name}</p>
              <p className="text-[12px] text-white/35 mt-1.5 leading-snug whitespace-pre-line">{d.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-5 mt-8">
          <RevenueChart />
          <MetricsChart />
        </div>

        <p className="text-sm text-white/35 mt-5">Delivered to your inbox. No barriers.</p>
      </div>
    </section>
  );
}
