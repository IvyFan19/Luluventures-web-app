import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

export function YouTubeSection() {
  const [featuredVideos] = useState<Video[]>([
    {
      id: 'video1',
      title: 'Warren Buffett\'s Investment Strategy Explained',
      thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'video2',
      title: 'How to Analyze S&P 500 Companies',
      thumbnail: 'https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'video3',
      title: 'Understanding Intrinsic Value',
      thumbnail: 'https://images.pexels.com/photos/7567448/pexels-photo-7567448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'video4',
      title: 'Finding Companies with Durable Competitive Advantages',
      thumbnail: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]);

  return (
    <section id="youtube" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Deep Value Investing on YouTube</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Dive deep into S&P500 companies, macro economics, and investing philosophies through our detailed video analyses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featuredVideos.map((video) => (
            <div 
              key={video.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                <a 
                  href="https://www.youtube.com/@TheDeepValue" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
                >
                  Watch video <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="https://www.youtube.com/@TheDeepValue" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
          >
            Subscribe on YouTube <ExternalLink size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}