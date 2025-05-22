import { ExternalLink } from 'lucide-react';

export function PodcastSection() {
  return (
    <section id="podcast" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 text-blue-900 text-center">Deep Value Investing on Apple Podcast</h2>
            {/* <p className="text-lg text-gray-700 mb-6 text-center">
              Listen to our deep analysis of S&P500 companies, macro economic trends, and value investing principles wherever you go.
            </p> */}
            
            <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center mr-4">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-blue-400 ml-1"></div>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Deep Value Investing</h3>
                  <p className="text-purple-200">with LuLu Ventures</p>
                </div>
              </div>
              <p className="mb-6">
                Discover investment insights based on Warren Buffett's principles, focusing on fundamentals, 
                intrinsic value, and long-term growth.
              </p>
              <div className="flex justify-center">
                <a 
                  href="https://podcasts.apple.com/us/podcast/deep-value-investing/id1811057697" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Listen on Apple Podcasts <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}