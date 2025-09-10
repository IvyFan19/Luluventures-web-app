import { Youtube, Podcast, Mail, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">LuLu Ventures</h3>
            <p className="mb-4">
              Your trusted partner for value investing insights, following 
              Warren Buffett's timeless principles for long-term wealth creation.
            </p>
            <div className="flex space-x-4">
              <a href="https://youtube.com/@TheDeepValue" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://podcasts.apple.com/us/podcast/deep-value-investing/id1811057697" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Podcast">
                <Podcast size={20} />
              </a>
              {/* <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a> */}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              </li>
              <li>
                <p className="text-sm text-gray-500 mt-4">
                  The content provided is for informational purposes only and does not 
                  constitute financial advice. Consult a professional before making investment decisions.
                </p>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <a href="mailto:contact@luluventures.com" className="hover:text-white transition-colors">
                  contact@luluventures.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-500 text-center">
          <p>&copy; {currentYear} LuLu Ventures LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}