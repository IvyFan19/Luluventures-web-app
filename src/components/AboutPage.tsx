import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';

interface TeamMember {
  name: string;
  initials: string;
  role: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Fang Lin',
    initials: 'FL',
    role: 'Co-Founder & CEO',
    bio: 'Fang brings a deep passion for value investing and a sharp eye for market opportunities. With a background in business strategy and finance, he leads the company\'s vision of making institutional-grade investment research accessible to everyday investors. He believes that disciplined, fundamentals-driven investing should not be reserved for Wall Street.',
  },
  {
    name: 'Ivy Fan',
    initials: 'IF',
    role: 'Co-Founder & CTO',
    bio: 'Ivy is the technical force behind DeepValues.AI\'s multi-agent research platform. With expertise in AI/ML engineering and full-stack development, she architects the systems that power intelligent stock analysis at scale. Her goal is to harness cutting-edge AI to replicate the rigor of a professional investment research team — available to anyone, anytime.',
  },
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Simple top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-blue-900 transition-colors mr-4"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span className="text-sm">Home</span>
          </button>
          <h1 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Deep Values
            </span>
          </h1>
        </div>
      </header>

      <main className="pt-20">
        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
              Our Story
            </h2>
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>
                We started DeepValues.AI because we saw a gap that frustrated us as individual investors.
                The best investment research — the kind that institutional funds rely on — was locked behind
                expensive terminals and exclusive networks. Meanwhile, retail investors were left with surface-level
                data and hype-driven noise.
              </p>
              <p>
                We asked ourselves: what if AI could level the playing field? What if every investor could
                have access to a team of specialized analysts — covering fundamentals, valuation, growth,
                risk, and market trends — powered by intelligent agents that work around the clock?
              </p>
              <p>
                That question became DeepValues.AI. Rooted in Warren Buffett's timeless principles of
                value investing, we're building tools that help investors cut through the noise, focus on
                what matters, and make decisions grounded in real data and sound reasoning.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
              To democratize institutional-quality investment research through AI,
              empowering every investor to make smarter, fundamentals-driven decisions.
            </p>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12 text-center">
              Meet the Team
            </h2>

            <div className="space-y-16">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center gap-8 md:gap-12`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        {member.initials}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className={`text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-lg font-semibold text-purple-600 mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
