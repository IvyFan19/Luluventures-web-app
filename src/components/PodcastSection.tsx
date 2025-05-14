import { ExternalLink } from 'lucide-react';

type Episode = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export function PodcastSection() {
  const recentEpisodes: Episode[] = [
    {
      id: 'ep1',
      title: 'Understanding Warren Buffett\'s Investment Philosophy',
      description: 'A deep dive into Buffett\'s approach to value investing and how it applies today.',
      date: 'June 15, 2025'
    },
    {
      id: 'ep2',
      title: 'Analyzing Competitive Moats in Today\'s Market',
      description: 'How to identify companies with sustainable competitive advantages.',
      date: 'June 8, 2025'
    },
    {
      id: 'ep3',
      title: 'Current Market Valuations: Overpriced or Opportunity?',
      description: 'Examining the S&P500 through a value investor\'s lens.',
      date: 'June 1, 2025'
    }
  ];

  return (
    <section id="podcast" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Deep Value Investing Podcast</h2>
            <p className="text-lg text-gray-700 mb-6">
              Listen to our deep analysis of S&P500 companies, macro economic trends, and value investing principles wherever you go.
            </p>
            
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center mr-4">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-purple-600 ml-1"></div>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Deep Value Investing</h3>
                  <p className="text-purple-200">with LuLu Ventures</p>
                </div>
              </div>
              <p className="mb-6">
                Discover investment insights based on Warren Buffett\'s principles, focusing on fundamentals, 
                intrinsic value, and long-term growth.
              </p>
              <a 
                href="https://podcasts.apple.com/us/podcast/deep-value-investing/id1811057697" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Listen on Apple Podcasts <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Recent Episodes</h3>
              
              <div className="space-y-4">
                {recentEpisodes.map((episode) => (
                  <div key={episode.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-gray-900">{episode.title}</h4>
                      <span className="text-sm text-gray-500">{episode.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{episode.description}</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      Listen now <ExternalLink size={14} className="ml-1" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <a 
                  href="https://podcasts.apple.com/us/podcast/deep-value-investing/id1811057697" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View all episodes <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}