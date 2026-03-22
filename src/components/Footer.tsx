import { Youtube, Podcast, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[.06]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold aurora-grad mb-4">DeepValues.AI</h3>
            <p className="text-sm text-white/35 leading-relaxed mb-4">
              Your trusted partner for value investing insights, following
              Warren Buffett's timeless principles for long-term wealth creation.
            </p>
            <div className="flex space-x-4">
              <a href="https://youtube.com/@TheDeepValues" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://podcasts.apple.com/us/podcast/deep-value-investing/id1811057697" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors" aria-label="Podcast">
                <Podcast size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white/70 mb-4 text-sm">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/30 hover:text-white/50 transition-colors text-sm">Disclaimer</a>
              </li>
              <li>
                <p className="text-xs text-white/20 mt-3 leading-relaxed">
                  The content provided is for informational purposes only and does not
                  constitute financial advice. Consult a professional before making investment decisions.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white/70 mb-4 text-sm">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={16} className="mr-2 mt-0.5 flex-shrink-0 text-white/30" />
                <a href="mailto:team@deepvalues.ai" className="text-white/30 hover:text-white/50 transition-colors text-sm">
                  team@deepvalues.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[.06] mt-10 pt-6 text-xs text-white/20 text-center">
          <p>&copy; {currentYear} DeepValues.AI. Built for modern intelligent investors.</p>
        </div>
      </div>
    </footer>
  );
}
