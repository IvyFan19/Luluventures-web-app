import { useEffect, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  AudioLines,
  Check,
  FileText,
  ScanSearch,
  Scale,
  ShieldCheck,
  Waves,
} from 'lucide-react';

type ConceptId =
  | 'quiet-conviction'
  | 'signal-grid'
  | 'founder-letter'
  | 'objective-lens'
  | 'atlas-noir';

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

interface ConceptMeta {
  id: ConceptId;
  name: string;
  palette: string;
  summary: string;
}

interface ProductPillar {
  title: string;
  body: string;
  icon: LucideIcon;
}

interface ValuePillar {
  title: string;
  body: string;
}

const CONCEPTS: ConceptMeta[] = [
  {
    id: 'quiet-conviction',
    name: 'Quiet Conviction',
    palette: 'Ivory, graphite, antique gold',
    summary: 'A calm editorial direction with a premium and trustworthy feel.',
  },
  {
    id: 'signal-grid',
    name: 'Signal Grid',
    palette: 'Midnight, mint, electric blue',
    summary: 'A sharper systems-led direction built around process and clarity.',
  },
  {
    id: 'founder-letter',
    name: 'Founder Letter',
    palette: 'Parchment, forest, ink',
    summary: 'A warmer founder-led direction centered on trust, mission, and craft.',
  },
  {
    id: 'objective-lens',
    name: 'Objective Lens',
    palette: 'White, cobalt, slate',
    summary: 'A minimal product-first direction focused on precision and restraint.',
  },
  {
    id: 'atlas-noir',
    name: 'Atlas Noir',
    palette: 'Black, champagne, ember',
    summary: 'A cinematic luxury direction with stronger emotion and contrast.',
  },
];

const SECTION_LINKS = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'mission', label: 'Mission' },
  { id: 'creator', label: 'Creator' },
] as const;

const PROBLEM_POINTS = [
  'Too much research is still shaped by sell-side incentives, consensus, or access.',
  'Individual investors often receive conclusions without the reasoning behind them.',
  'Serious business research remains too fragmented, too expensive, or too opaque.',
];

const PRODUCT_PILLARS: ProductPillar[] = [
  {
    title: 'Multi-angle analysis',
    body: 'One business studied through fundamentals, value, market structure, news, and context.',
    icon: ScanSearch,
  },
  {
    title: 'Adversarial debate',
    body: 'Bull and bear cases challenge the thesis before it reaches the investor.',
    icon: Scale,
  },
  {
    title: 'Risk review',
    body: 'A dedicated risk layer pushes against weak conviction and hidden downside.',
    icon: ShieldCheck,
  },
  {
    title: 'Investor-ready outputs',
    body: 'Research report, audio briefing, visual summary, and a clearer final stance.',
    icon: FileText,
  },
];

const OUTPUTS = [
  { title: 'Research report', icon: FileText },
  { title: 'Audio briefing', icon: AudioLines },
  { title: 'Visual summary', icon: Waves },
];

const VALUES: ValuePillar[] = [
  {
    title: 'Objective',
    body: 'Aligned with the user, not Wall Street analysts or financial institutions.',
  },
  {
    title: 'Transparent',
    body: 'Reasoning stays visible so conclusions can be inspected and challenged.',
  },
  {
    title: 'Accessible',
    body: 'High-quality business research should not be reserved for institutions.',
  },
];

const CREATOR = {
  name: 'Xinwei Fan',
  role: 'Founder & CTO',
  body:
    'Xinwei is building Deep Values at the intersection of investing, AI systems, and product design, with a focus on making rigorous business research understandable, objective, and usable for individual investors.',
  quote: 'Research should answer to the investor.',
};

function isConceptId(value: string | null): value is ConceptId {
  return CONCEPTS.some((concept) => concept.id === value);
}

function ReviewToolbar({
  activeConcept,
  onSelectConcept,
  researchHref,
  researchTarget,
  researchRel,
  user,
  signOut,
}: {
  activeConcept: ConceptMeta;
  onSelectConcept: (id: ConceptId) => void;
  researchHref: string;
  researchTarget?: string;
  researchRel?: string;
  user?: User;
  signOut?: () => void;
}) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-[30px] border border-white/12 bg-black/72 p-3 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="min-w-0 xl:w-[18rem]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">
              Homepage Review Lab
            </p>
            <p className="mt-2 text-sm text-white/72">{activeConcept.summary}</p>
          </div>

          <div className="min-w-0 flex-1 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2">
              {CONCEPTS.map((concept) => (
                <button
                  key={concept.id}
                  type="button"
                  onClick={() => onSelectConcept(concept.id)}
                  className={`rounded-full border px-4 py-2.5 text-left transition-colors ${
                    concept.id === activeConcept.id
                      ? 'border-white/22 bg-white text-black'
                      : 'border-white/10 bg-white/[0.04] text-white/78 hover:border-white/20 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  <span className="block text-sm font-semibold">{concept.name}</span>
                  <span
                    className={`mt-0.5 block text-[11px] uppercase tracking-[0.18em] ${
                      concept.id === activeConcept.id ? 'text-black/60' : 'text-white/38'
                    }`}
                  >
                    {concept.palette}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start xl:self-center">
            {user && signOut && (
              <button
                type="button"
                onClick={signOut}
                className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-white/74 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                Sign Out
              </button>
            )}
            <a
              href={researchHref}
              target={researchTarget}
              rel={researchRel}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              Open Research
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionNav({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {SECTION_LINKS.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="rounded-full border border-current/10 px-4 py-2 text-sm font-medium text-current opacity-70 transition-opacity hover:opacity-100"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function PrimaryAction({
  href,
  target,
  rel,
  className = '',
  children,
}: {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function ProblemList({ className = '' }: { className?: string }) {
  return (
    <div className={`grid gap-4 ${className}`}>
      {PROBLEM_POINTS.map((item) => (
        <div key={item} className="flex gap-3">
          <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-current/10 text-current">
            <Check className="h-3.5 w-3.5" />
          </div>
          <p className="text-sm leading-7 text-current/72 sm:text-base">{item}</p>
        </div>
      ))}
    </div>
  );
}

function ProductGrid({
  cardClassName,
  titleClassName,
  bodyClassName,
  iconWrapClassName,
}: {
  cardClassName: string;
  titleClassName: string;
  bodyClassName: string;
  iconWrapClassName: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PRODUCT_PILLARS.map((pillar) => {
        const Icon = pillar.icon;

        return (
          <article key={pillar.title} className={`${cardClassName} flex flex-col items-center text-center`}>
            <div className={iconWrapClassName}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className={titleClassName}>{pillar.title}</h3>
            <p className={bodyClassName}>{pillar.body}</p>
          </article>
        );
      })}
    </div>
  );
}

function ValuesGrid({
  cardClassName,
  titleClassName,
  bodyClassName,
}: {
  cardClassName: string;
  titleClassName: string;
  bodyClassName: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {VALUES.map((value) => (
        <article key={value.title} className={`${cardClassName} flex flex-col items-center text-center`}>
          <p className={titleClassName}>{value.title}</p>
          <p className={bodyClassName}>{value.body}</p>
        </article>
      ))}
    </div>
  );
}

function CreatorPanel({
  className,
  badgeClassName,
  nameClassName,
  roleClassName,
  bodyClassName,
  quoteClassName,
}: {
  className: string;
  badgeClassName: string;
  nameClassName: string;
  roleClassName: string;
  bodyClassName: string;
  quoteClassName: string;
}) {
  return (
    <article id="creator" className={`scroll-mt-36 ${className}`}>
      <div className={badgeClassName}>XF</div>
      <div className="mt-6">
        <p className={nameClassName}>{CREATOR.name}</p>
        <p className={roleClassName}>{CREATOR.role}</p>
      </div>
      <p className={bodyClassName}>{CREATOR.body}</p>
      <p className={quoteClassName}>"{CREATOR.quote}"</p>
    </article>
  );
}

function QuietConviction({
  researchHref,
  researchTarget,
  researchRel,
}: {
  researchHref: string;
  researchTarget?: string;
  researchRel?: string;
}) {
  return (
    <div className="min-h-screen bg-[#f5efe5] text-[#151515]">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <section className="grid items-center gap-10 pb-20 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-black/58">
              Quiet Conviction
              <span className="h-1 w-1 rounded-full bg-black/25" />
              Deep Values
            </div>
            <h1 className="font-newsreader mt-6 max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#161514] sm:text-7xl lg:text-[5.5rem]">
              Research that answers to the investor.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/68 sm:text-xl">
              Deep Values gives individual investors a clearer way to study a business, without
              the incentives, opacity, or institutional bias that shape too much of traditional
              research.
            </p>

            <SectionNav className="mt-8" />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <PrimaryAction
                href={researchHref}
                target={researchTarget}
                rel={researchRel}
                className="bg-[#171717] text-white"
              >
                Open Research
              </PrimaryAction>
              <a
                href="#mission"
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-black/70 transition-colors hover:text-black"
              >
                See the mission
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { value: '6', label: 'specialist views' },
                { value: '1', label: 'user-aligned thesis' },
                { value: '0', label: 'institutional incentives' },
              ].map((item) => (
                <div key={item.label} className="rounded-[28px] border border-black/8 bg-white/75 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                  <p className="font-newsreader text-4xl font-semibold tracking-[-0.05em]">{item.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-black/52">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-black/8 bg-white/88 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/42">
                  Product Engine
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.05em]">DeepValueIntelligence</p>
              </div>
              <img
                src="/images/icon-20.png"
                alt="Deep Values mark"
                className="h-12 w-12 rounded-2xl object-cover shadow-[0_12px_20px_rgba(0,0,0,0.08)]"
              />
            </div>

            <div className="mt-8 rounded-[30px] border border-black/8 bg-[#f7f2eb] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-black/44">What the product does</p>
              <div className="mt-5 grid gap-3">
                {[
                  'Reads a business from multiple perspectives.',
                  'Forces disagreement before conviction.',
                  'Returns a final view you can inspect.',
                ].map((item) => (
                  <div key={item} className="rounded-[20px] border border-black/8 bg-white/80 px-4 py-3 text-sm text-black/72">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {OUTPUTS.map((output) => {
                const Icon = output.icon;

                return (
                  <div key={output.title} className="rounded-[24px] border border-black/8 bg-[#171717] px-4 py-5 text-white flex flex-col items-center text-center">
                    <Icon className="h-5 w-5 text-[#d9b15c]" />
                    <p className="mt-4 text-sm font-semibold">{output.title}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[26px] border border-[#d6b56d]/30 bg-[#f6e6be] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/42">Final stance</p>
              <p className="mt-3 font-newsreader text-4xl font-semibold tracking-[-0.05em] text-[#181512]">
                Clearer than a rating.
              </p>
              <p className="mt-3 max-w-lg text-sm leading-7 text-black/66">
                The goal is not to decorate a stock with a label. The goal is to help an individual
                investor understand a business with more objectivity.
              </p>
            </div>
          </div>
        </section>

        <section id="problem" className="scroll-mt-36 grid gap-5 border-t border-black/8 py-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/44">Problem</p>
            <h2 className="font-newsreader mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
              Business research still works too hard for institutions.
            </h2>
          </div>
          <div className="rounded-[32px] border border-black/8 bg-white/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:p-8">
            <ProblemList />
          </div>
        </section>

        <section id="solution" className="scroll-mt-36 border-t border-black/8 py-16">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/44">Solution</p>
            <h2 className="font-newsreader mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
              A personal research system with a better point of view.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-black/68">
              Deep Values turns one company into a structured research workflow designed to act more
              objectively on behalf of the individual investor.
            </p>
          </div>

          <div className="mt-10">
            <ProductGrid
              cardClassName="rounded-[30px] border border-black/8 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]"
              iconWrapClassName="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#171717] text-[#d9b15c]"
              titleClassName="mt-5 text-2xl font-semibold tracking-[-0.04em]"
              bodyClassName="mt-3 text-sm leading-7 text-black/66 sm:text-base"
            />
          </div>
        </section>

        <section id="mission" className="scroll-mt-36 border-t border-black/8 py-16">
          <div className="rounded-[36px] border border-black/8 bg-[#171717] p-8 text-white sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/46">Mission</p>
            <h2 className="font-newsreader mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
              Democratize financial research on businesses for everyone.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
              The long-term goal is a personal financial assistant that acts objectively on behalf of
              the user&apos;s interests only, not the incentives of Wall Street analysts or financial
              institutions.
            </p>
            <div className="mt-10">
              <ValuesGrid
                cardClassName="rounded-[28px] border border-white/10 bg-white/[0.05] p-5"
                titleClassName="text-lg font-semibold"
                bodyClassName="mt-3 text-sm leading-7 text-white/66"
              />
            </div>
          </div>
        </section>

        <CreatorPanel
          className="border-t border-black/8 py-16"
          badgeClassName="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#171717] text-lg font-semibold text-[#f5efe5]"
          nameClassName="font-newsreader text-5xl font-semibold tracking-[-0.05em]"
          roleClassName="mt-2 text-sm uppercase tracking-[0.24em] text-black/48"
          bodyClassName="mt-6 max-w-3xl text-base leading-8 text-black/68 sm:text-lg"
          quoteClassName="font-newsreader mt-8 text-3xl italic tracking-[-0.04em] text-black/70"
        />
      </div>
    </div>
  );
}

function SignalGrid({
  researchHref,
  researchTarget,
  researchRel,
}: {
  researchHref: string;
  researchTarget?: string;
  researchRel?: string;
}) {
  return (
    <div className="concept-grid-bg concept-noise min-h-screen overflow-hidden bg-[#081120] text-[#ebf6ff]">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <section className="pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/56">
            Signal Grid
            <span className="h-1 w-1 rounded-full bg-[#74f0d0]" />
            Deep Values
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="font-space-grotesk max-w-4xl text-6xl font-bold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-[5.7rem]">
                Built for the individual. Not the institution.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9fb7c8] sm:text-xl">
                Deep Values brings objective business research into a modern product experience that
                is easier to trust, easier to understand, and easier to use.
              </p>

              <SectionNav className="mt-8 text-white" />

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <PrimaryAction
                  href={researchHref}
                  target={researchTarget}
                  rel={researchRel}
                  className="bg-[#74f0d0] text-[#06111f]"
                >
                  Open Research
                </PrimaryAction>
                <a
                  href="#solution"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white/72 transition-colors hover:text-white"
                >
                  Explore the system
                </a>
              </div>
            </div>

            <div className="rounded-[34px] border border-[#142942] bg-[#091a2d]/90 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#6d899d]">System overview</p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                    DeepValueIntelligence
                  </p>
                </div>
                <img src="/images/icon-20.png" alt="Deep Values mark" className="h-12 w-12 rounded-2xl" />
              </div>

              <div className="mt-8 grid gap-3">
                {[
                  '01  Specialist analysis',
                  '02  Bull vs bear debate',
                  '03  Risk committee review',
                  '04  Final user-aligned stance',
                ].map((step) => (
                  <div key={step} className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 font-plex-mono text-sm text-[#c5d8e3]">
                    {step}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['ADVOCATE', 'WATCH', 'AVOID'].map((stance, index) => (
                  <div
                    key={stance}
                    className={`rounded-[22px] px-4 py-4 text-center text-sm font-semibold tracking-[0.22em] ${
                      index === 0
                        ? 'bg-[#143829] text-[#74f0d0]'
                        : index === 1
                          ? 'bg-[#3a2d13] text-[#ffd36f]'
                          : 'bg-[#401c20] text-[#ff8f9e]'
                    }`}
                  >
                    {stance}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="scroll-mt-36 grid gap-5 border-t border-white/10 py-16 lg:grid-cols-2">
          <article className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.28em] text-[#6d899d]">Problem</p>
            <h2 className="font-space-grotesk mt-5 text-4xl font-bold leading-tight tracking-[-0.05em] text-white sm:text-5xl">
              Traditional research often hides incentives and skips reasoning.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#9fb7c8]">
              That makes individual investors depend on institutions they do not control and tools
              they cannot fully inspect.
            </p>
          </article>

          <article className="rounded-[32px] border border-white/10 bg-[#0b1f36]/90 p-6 sm:p-8">
            <ProblemList />
          </article>
        </section>

        <section id="solution" className="scroll-mt-36 border-t border-white/10 py-16">
          <div className="max-w-3xl">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.28em] text-[#6d899d]">Solution</p>
            <h2 className="font-space-grotesk mt-5 text-4xl font-bold leading-tight tracking-[-0.05em] text-white sm:text-5xl">
              A cleaner system for studying a business.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#9fb7c8] sm:text-lg">
              Deep Values structures company research as a process instead of a guess, so each view
              is stress-tested before it becomes a recommendation.
            </p>
          </div>

          <div className="mt-10">
            <ProductGrid
              cardClassName="rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
              iconWrapClassName="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#74f0d0]/10 text-[#74f0d0]"
              titleClassName="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white"
              bodyClassName="mt-3 text-sm leading-7 text-[#9fb7c8] sm:text-base"
            />
          </div>
        </section>

        <section id="mission" className="scroll-mt-36 border-t border-white/10 py-16">
          <div className="rounded-[36px] border border-[#74f0d0]/16 bg-[linear-gradient(135deg,rgba(116,240,208,0.12),rgba(116,240,208,0.02))] p-8 sm:p-10">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.28em] text-[#74f0d0]">Mission</p>
            <h2 className="font-space-grotesk mt-5 max-w-4xl text-5xl font-bold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
              Democratize financial research on businesses for everyone.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#cae1ee] sm:text-lg">
              The end state is a personal financial assistant that acts objectively on behalf of the
              user&apos;s interests only, not the incentive system surrounding institutional finance.
            </p>
            <div className="mt-10">
              <ValuesGrid
                cardClassName="rounded-[26px] border border-white/10 bg-[#081120]/72 p-5"
                titleClassName="text-lg font-semibold text-white"
                bodyClassName="mt-3 text-sm leading-7 text-[#9fb7c8]"
              />
            </div>
          </div>
        </section>

        <CreatorPanel
          className="border-t border-white/10 py-16"
          badgeClassName="flex h-16 w-16 items-center justify-center rounded-[20px] border border-[#74f0d0]/22 bg-[#74f0d0]/10 text-lg font-semibold text-[#74f0d0]"
          nameClassName="font-space-grotesk text-5xl font-bold tracking-[-0.05em] text-white"
          roleClassName="mt-2 font-plex-mono text-sm uppercase tracking-[0.24em] text-[#6d899d]"
          bodyClassName="mt-6 max-w-3xl text-base leading-8 text-[#9fb7c8] sm:text-lg"
          quoteClassName="font-space-grotesk mt-8 text-2xl font-semibold tracking-[-0.04em] text-white"
        />
      </div>
    </div>
  );
}

function FounderLetter({
  researchHref,
  researchTarget,
  researchRel,
}: {
  researchHref: string;
  researchTarget?: string;
  researchRel?: string;
}) {
  return (
    <div className="concept-paper-bg min-h-screen bg-[#f4ecdd] text-[#213126]">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <section className="rounded-[36px] border border-[#264331]/16 bg-[#fbf7ee]/90 p-8 shadow-[0_25px_80px_rgba(44,53,38,0.08)] sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#557260]">Founder Letter</p>
              <h1 className="font-display-serif mt-4 max-w-4xl text-6xl font-normal leading-[0.9] tracking-[-0.05em] text-[#1e2d23] sm:text-7xl lg:text-[5.6rem]">
                A more honest way to do financial research.
              </h1>
            </div>
            <div className="rounded-[28px] border border-[#264331]/12 bg-[#f2ebdc] px-5 py-4 text-sm leading-7 text-[#4d6154] lg:max-w-sm">
              Deep Values exists because individual investors deserve the same rigor as institutions,
              without inheriting the same incentives.
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-9 text-[#44564a] sm:text-xl">
            We are building objective business research for everyone, then extending it into a
            personal financial assistant that works only for the user. Not for a bank. Not for a
            fund. Not for the sell-side machine around the market.
          </p>

          <SectionNav className="mt-8 text-[#213126]" />

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <PrimaryAction
              href={researchHref}
              target={researchTarget}
              rel={researchRel}
              className="bg-[#213126] text-[#fbf7ee]"
            >
              Open Research
            </PrimaryAction>
            <a
              href="#creator"
              className="inline-flex items-center justify-center rounded-full border border-[#213126]/12 px-5 py-3 text-sm font-semibold text-[#213126]/72 transition-colors hover:text-[#213126]"
            >
              Meet the creator
            </a>
          </div>
        </section>

        <section id="problem" className="scroll-mt-36 grid gap-5 py-16 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[32px] border border-[#264331]/12 bg-[#fbf7ee]/86 p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#557260]">Problem</p>
            <h2 className="font-display-serif mt-5 text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl">
              Too much of the market speaks with someone else&apos;s incentives.
            </h2>
          </article>

          <article className="rounded-[32px] border border-[#264331]/12 bg-[#f6f0e3]/86 p-6 sm:p-8">
            <ProblemList />
          </article>
        </section>

        <section id="solution" className="scroll-mt-36 rounded-[36px] border border-[#264331]/12 bg-[#fbf7ee]/88 p-8 sm:p-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#557260]">Solution</p>
            <h2 className="font-display-serif mt-5 text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl">
              Deep Values treats company research like a craft, not a talking point.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#44564a]">
              The product uses DeepValueIntelligence to read a business from multiple sides, force
              disagreement, and produce a clearer final view for the individual investor.
            </p>
          </div>

          <div className="mt-10">
            <ProductGrid
              cardClassName="rounded-[28px] border border-[#264331]/10 bg-[#f3ede0] p-6"
              iconWrapClassName="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#213126] text-[#f4ecdd]"
              titleClassName="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#213126]"
              bodyClassName="mt-3 text-sm leading-7 text-[#4d6154] sm:text-base"
            />
          </div>
        </section>

        <section id="mission" className="scroll-mt-36 py-16">
          <div className="rounded-[36px] border border-[#264331]/12 bg-[#213126] p-8 text-[#f4ecdd] sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b7c8bc]">Mission</p>
            <h2 className="font-display-serif mt-5 max-w-4xl text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl">
              Democratize financial research on businesses for everyone.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#d4dfd7] sm:text-lg">
              We want the end product to feel like a personal financial assistant with integrity:
              objective, transparent, and aligned only with the user.
            </p>
            <div className="mt-10">
              <ValuesGrid
                cardClassName="rounded-[26px] border border-white/10 bg-white/[0.06] p-5"
                titleClassName="text-lg font-semibold text-[#f4ecdd]"
                bodyClassName="mt-3 text-sm leading-7 text-[#d4dfd7]"
              />
            </div>
          </div>
        </section>

        <CreatorPanel
          className="rounded-[36px] border border-[#264331]/12 bg-[#fbf7ee]/88 p-8 sm:p-10"
          badgeClassName="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#213126] text-lg font-semibold text-[#f4ecdd]"
          nameClassName="font-display-serif text-5xl tracking-[-0.05em] text-[#1f2d23]"
          roleClassName="mt-2 text-sm uppercase tracking-[0.24em] text-[#557260]"
          bodyClassName="mt-6 max-w-3xl text-base leading-8 text-[#44564a] sm:text-lg"
          quoteClassName="font-display-serif mt-8 text-3xl italic tracking-[-0.04em] text-[#2c4033]"
        />
      </div>
    </div>
  );
}

function ObjectiveLens({
  researchHref,
  researchTarget,
  researchRel,
}: {
  researchHref: string;
  researchTarget?: string;
  researchRel?: string;
}) {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-[#0d1628]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(67,108,255,0.12),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(72,186,255,0.1),transparent_26%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <section className="grid gap-10 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4c6fe2]">Objective Lens</p>
            <h1 className="mt-6 max-w-4xl text-6xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-[5.7rem]">
              A clearer way to study a company.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#556070] sm:text-xl">
              Deep Values makes business research more objective for individual investors by
              combining structured analysis, transparent reasoning, and a user-aligned product
              experience.
            </p>

            <SectionNav className="mt-8" />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <PrimaryAction
                href={researchHref}
                target={researchTarget}
                rel={researchRel}
                className="bg-[#0d1628] text-white"
              >
                Open Research
              </PrimaryAction>
              <a
                href="#solution"
                className="inline-flex items-center justify-center rounded-full border border-[#0d1628]/10 px-5 py-3 text-sm font-semibold text-[#0d1628]/70 transition-colors hover:text-[#0d1628]"
              >
                See the product
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[32px] border border-[#0d1628]/8 bg-[#f7f9ff] p-6 shadow-[0_22px_60px_rgba(13,22,40,0.08)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6d7b92]">Core engine</p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">DeepValueIntelligence</p>
                </div>
                <img src="/images/icon-20.png" alt="Deep Values mark" className="h-12 w-12 rounded-2xl" />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { value: 'Problem', body: 'Research is still too biased, fragmented, or institutional.' },
                  { value: 'System', body: 'Deep Values challenges a business before it reaches the user.' },
                  { value: 'Goal', body: 'A personal assistant aligned only with the investor.' },
                ].map((item) => (
                  <div key={item.value} className="rounded-[24px] border border-[#0d1628]/8 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4c6fe2]">{item.value}</p>
                    <p className="mt-3 text-sm leading-7 text-[#566173]">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#0d1628]/8 bg-[#0d1628] p-6 text-white shadow-[0_22px_60px_rgba(13,22,40,0.18)] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">Outputs</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {OUTPUTS.map((output) => {
                  const Icon = output.icon;

                  return (
                    <div key={output.title} className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-5 flex flex-col items-center text-center">
                      <Icon className="h-5 w-5 text-[#77a8ff]" />
                      <p className="mt-4 text-sm font-semibold">{output.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="scroll-mt-36 grid gap-5 border-t border-[#0d1628]/8 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4c6fe2]">Problem</p>
            <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-6xl">
              Investors deserve clearer research than the market usually provides.
            </h2>
          </div>
          <div className="rounded-[32px] border border-[#0d1628]/8 bg-[#f7f9ff] p-6 sm:p-8">
            <ProblemList />
          </div>
        </section>

        <section id="solution" className="scroll-mt-36 border-t border-[#0d1628]/8 py-16">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4c6fe2]">Solution</p>
            <h2 className="mt-5 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-6xl">
              Deep Values is a product layer for more objective research.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#566173]">
              The system separates analysis, challenge, and risk so a single opinion does not get to
              dominate the outcome.
            </p>
          </div>

          <div className="mt-10">
            <ProductGrid
              cardClassName="rounded-[30px] border border-[#0d1628]/8 bg-white p-6 shadow-[0_20px_45px_rgba(13,22,40,0.05)]"
              iconWrapClassName="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf2ff] text-[#4c6fe2]"
              titleClassName="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#0d1628]"
              bodyClassName="mt-3 text-sm leading-7 text-[#566173] sm:text-base"
            />
          </div>
        </section>

        <section id="mission" className="scroll-mt-36 border-t border-[#0d1628]/8 py-16">
          <div className="rounded-[36px] border border-[#0d1628]/8 bg-[#0d1628] p-8 text-white sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">Mission</p>
            <h2 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-6xl">
              Democratize financial research on businesses for everyone.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
              The end goal is a personal financial assistant that is objective by design and loyal to
              the user&apos;s interests only.
            </p>
            <div className="mt-10">
              <ValuesGrid
                cardClassName="rounded-[26px] border border-white/10 bg-white/[0.04] p-5"
                titleClassName="text-lg font-semibold text-white"
                bodyClassName="mt-3 text-sm leading-7 text-white/68"
              />
            </div>
          </div>
        </section>

        <CreatorPanel
          className="border-t border-[#0d1628]/8 py-16"
          badgeClassName="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#0d1628] text-lg font-semibold text-white"
          nameClassName="text-5xl font-semibold tracking-[-0.06em] text-[#0d1628]"
          roleClassName="mt-2 text-sm uppercase tracking-[0.24em] text-[#6d7b92]"
          bodyClassName="mt-6 max-w-3xl text-base leading-8 text-[#566173] sm:text-lg"
          quoteClassName="mt-8 text-2xl font-semibold tracking-[-0.05em] text-[#0d1628]"
        />
      </div>
    </div>
  );
}

function AtlasNoir({
  researchHref,
  researchTarget,
  researchRel,
}: {
  researchHref: string;
  researchTarget?: string;
  researchRel?: string;
}) {
  return (
    <div className="concept-noise min-h-screen overflow-hidden bg-[#090909] text-[#f7efe4]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_16%,rgba(255,113,67,0.18),transparent_22%),radial-gradient(circle_at_18%_20%,rgba(170,122,255,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <section className="grid gap-10 pb-20 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.3em] text-[#ffb48f]">Atlas Noir</p>
            <h1 className="font-display-serif mt-6 max-w-4xl text-6xl leading-[0.88] tracking-[-0.06em] text-[#f9f2e8] sm:text-7xl lg:text-[5.7rem]">
              Your interests.
              <br />
              First and only.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c5b8a8] sm:text-xl">
              Deep Values is designed for individual investors who want objective business research,
              visible reasoning, and a product experience that feels worthy of serious decisions.
            </p>

            <SectionNav className="mt-8 text-[#f7efe4]" />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <PrimaryAction
                href={researchHref}
                target={researchTarget}
                rel={researchRel}
                className="bg-[#f7efe4] text-[#111111]"
              >
                Open Research
              </PrimaryAction>
              <a
                href="#problem"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-[#f7efe4]/74 transition-colors hover:text-[#f7efe4]"
              >
                Read the thesis
              </a>
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.28em] text-[#b49f90]">Product stack</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#f9f2e8]">Deep Values</p>
              </div>
              <img src="/images/icon-20.png" alt="Deep Values mark" className="h-12 w-12 rounded-2xl" />
            </div>

            <div className="mt-8 grid gap-3">
              {[
                { title: 'Problem', body: 'Institutional research often serves institutional incentives.' },
                { title: 'Response', body: 'Deep Values builds a cleaner research layer for the individual.' },
                { title: 'Direction', body: 'A personal assistant that works only for the user.' },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-[24px] border px-5 py-5 ${
                    index === 1
                      ? 'border-[#ff8a66]/22 bg-[#1b1412]'
                      : 'border-white/8 bg-white/[0.03]'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb48f]">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[#cfbfb0]">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {OUTPUTS.map((output) => {
                const Icon = output.icon;

                return (
                  <div key={output.title} className="rounded-[22px] border border-white/8 bg-black/30 px-4 py-5 flex flex-col items-center text-center">
                    <Icon className="h-5 w-5 text-[#ff8a66]" />
                    <p className="mt-4 text-sm font-semibold text-[#f7efe4]">{output.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="problem" className="scroll-mt-36 grid gap-5 border-t border-white/10 py-16 lg:grid-cols-[0.84fr_1.16fr]">
          <div>
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.28em] text-[#b49f90]">Problem</p>
            <h2 className="font-display-serif mt-5 text-5xl leading-[0.92] tracking-[-0.06em] text-[#f9f2e8] sm:text-6xl">
              Investors should not need institutional access to get serious research.
            </h2>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <ProblemList />
          </div>
        </section>

        <section id="solution" className="scroll-mt-36 border-t border-white/10 py-16">
          <div className="max-w-3xl">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.28em] text-[#b49f90]">Solution</p>
            <h2 className="font-display-serif mt-5 text-5xl leading-[0.92] tracking-[-0.06em] text-[#f9f2e8] sm:text-6xl">
              Deep Values turns company research into a product with discipline.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#c5b8a8]">
              The system studies a business, forces disagreement, checks risk, and returns a view
              the investor can actually understand.
            </p>
          </div>

          <div className="mt-10">
            <ProductGrid
              cardClassName="rounded-[30px] border border-white/10 bg-white/[0.03] p-6"
              iconWrapClassName="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff8a66]/14 text-[#ff8a66]"
              titleClassName="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#f9f2e8]"
              bodyClassName="mt-3 text-sm leading-7 text-[#c5b8a8] sm:text-base"
            />
          </div>
        </section>

        <section id="mission" className="scroll-mt-36 border-t border-white/10 py-16">
          <div className="rounded-[36px] border border-[#ff8a66]/18 bg-[linear-gradient(135deg,rgba(255,138,102,0.14),rgba(255,255,255,0.02))] p-8 sm:p-10">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.28em] text-[#ffb48f]">Mission</p>
            <h2 className="font-display-serif mt-5 max-w-4xl text-5xl leading-[0.9] tracking-[-0.06em] text-[#f9f2e8] sm:text-6xl">
              Democratize financial research on businesses for everyone.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#d7cabc] sm:text-lg">
              The destination is a personal financial assistant that acts objectively on behalf of
              the user&apos;s interests only and refuses the incentive structure of institutional
              finance.
            </p>
            <div className="mt-10">
              <ValuesGrid
                cardClassName="rounded-[26px] border border-white/10 bg-black/20 p-5"
                titleClassName="text-lg font-semibold text-[#f9f2e8]"
                bodyClassName="mt-3 text-sm leading-7 text-[#d0c0b1]"
              />
            </div>
          </div>
        </section>

        <CreatorPanel
          className="border-t border-white/10 py-16"
          badgeClassName="flex h-16 w-16 items-center justify-center rounded-[20px] border border-[#ff8a66]/22 bg-[#ff8a66]/10 text-lg font-semibold text-[#ffb48f]"
          nameClassName="font-display-serif text-5xl tracking-[-0.05em] text-[#f9f2e8]"
          roleClassName="mt-2 font-plex-mono text-sm uppercase tracking-[0.24em] text-[#b49f90]"
          bodyClassName="mt-6 max-w-3xl text-base leading-8 text-[#c5b8a8] sm:text-lg"
          quoteClassName="font-display-serif mt-8 text-3xl italic tracking-[-0.04em] text-[#f4d1bc]"
        />
      </div>
    </div>
  );
}

function renderConcept(
  activeConcept: ConceptId,
  researchHref: string,
  researchTarget?: string,
  researchRel?: string,
) {
  const sharedProps = { researchHref, researchTarget, researchRel };

  switch (activeConcept) {
    case 'quiet-conviction':
      return <QuietConviction {...sharedProps} />;
    case 'signal-grid':
      return <SignalGrid {...sharedProps} />;
    case 'founder-letter':
      return <FounderLetter {...sharedProps} />;
    case 'objective-lens':
      return <ObjectiveLens {...sharedProps} />;
    case 'atlas-noir':
      return <AtlasNoir {...sharedProps} />;
    default:
      return <QuietConviction {...sharedProps} />;
  }
}

export function HomePage({ user, signOut }: HomePageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const conceptParam = searchParams.get('concept');
  const activeConceptId = isConceptId(conceptParam) ? conceptParam : CONCEPTS[0].id;
  const activeConcept = CONCEPTS.find((concept) => concept.id === activeConceptId) ?? CONCEPTS[0];

  const researchHref = user ? '/research-analysis' : 'https://research.deepvalues.ai/';
  const researchTarget = user ? undefined : '_blank';
  const researchRel = user ? undefined : 'noopener noreferrer';

  useEffect(() => {
    if (!isConceptId(conceptParam)) {
      setSearchParams({ concept: CONCEPTS[0].id }, { replace: true });
    }
  }, [conceptParam, setSearchParams]);

  const handleSelectConcept = (conceptId: ConceptId) => {
    setSearchParams({ concept: conceptId }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ReviewToolbar
        activeConcept={activeConcept}
        onSelectConcept={handleSelectConcept}
        researchHref={researchHref}
        researchTarget={researchTarget}
        researchRel={researchRel}
        user={user}
        signOut={signOut}
      />

      {renderConcept(activeConceptId, researchHref, researchTarget, researchRel)}
    </>
  );
}
