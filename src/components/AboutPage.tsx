import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';

interface TeamMember {
  name: string;
  initials: string;
  role: string;
  bio: string;
  linkedin?: string;
  hideAvatar?: boolean;
}

const teamMembers: TeamMember[] = [
  // {
  //   name: 'Fang Lin',
  //   initials: 'FL',
  //   role: 'Co-Founder & CEO',
  //   bio: 'Fang brings a deep passion for value investing and a sharp eye for market opportunities. With a background in business strategy and finance, he leads the company\'s vision of making institutional-grade investment research accessible to everyday investors. He believes that disciplined, fundamentals-driven investing should not be reserved for Wall Street.',
  // },
  {
    name: 'Xinwei Fan',
    initials: 'XF',
    role: 'Co-Founder & CTO',
    bio: 'Xinwei is the technical force behind DeepValues.AI\'s multi-agent research platform. With expertise in AI/ML engineering and full-stack development, she architects the systems that power intelligent stock analysis at scale. Her goal is to harness cutting-edge AI to replicate the rigor of a professional investment research team — available to anyone, anytime.',
    linkedin: 'https://www.linkedin.com/in/xinwei-fan/',
    hideAvatar: true,
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
                Institutional-grade investment research has long been locked behind expensive terminals
                and exclusive networks. We built DeepValues.AI to change that.
              </p>
              <p>
                Rooted in Warren Buffett's principles of value investing, we use AI-powered agents to
                deliver the depth of a professional research team — fundamentals, valuation, risk, and
                market trends — to every investor.
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
                  {!member.hideAvatar && (
                    <div className="flex-shrink-0">
                      <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <span className="text-4xl md:text-5xl font-bold text-white">
                          {member.initials}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Info */}
                  <div className={`text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2 justify-center md:justify-start">
                      {member.name}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
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
