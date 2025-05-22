import { useState } from 'react';
import { ExternalLink, Headphones, Play } from 'lucide-react';

type Video = {
  id: string;
  thumbnail: string;
  playlistUrl: string;
  episodeCount: number;
};

export function YouTubeSection() {
  const [featuredVideos] = useState<Video[]>([
    {
      id: 'playlist1',
      // title: 'The Buffett Way',
      thumbnail: '/images/The Buffet Way_3000x3000.jpeg',
      playlistUrl: 'https://www.youtube.com/watch?v=4QC92OWkDvc&list=PLKC11J8aIwXRinHFFK_OODlTpthX8L5Qt',
      episodeCount: 52
    },
    {
      id: 'playlist2',
      // title: 'Company Analysis',
      thumbnail: '/images/company-analysis.jpeg',
      playlistUrl: 'https://www.youtube.com/watch?v=4QC92OWkDvc&list=PLKC11J8aIwXSLxVwF-zaxYEFaYNXwnB4O',
      episodeCount: 38
    },
    {
      id: 'playlist3',
      // title: 'Business First Principles',
      thumbnail: '/images/business-first-principles.jpeg',
      playlistUrl: 'http://youtube.com/watch?v=UisvRx8VflI&list=PLKC11J8aIwXQkh57dq3rUwXN2R8LT3PVR',
      episodeCount: 24
    },
    {
      id: 'playlist4',
      // title: 'Modern Philosopher',
      thumbnail: '/images/modern-philosopher.jpeg',
      playlistUrl: 'https://www.youtube.com/watch?v=GJJG-dClvpI&list=PLKC11J8aIwXQZVX0GjwpzO-afv8wn4Xa2',
      episodeCount: 16
    }
  ]);

  return (
    <section id="youtube" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Deep Value Investing on YouTube</h2>
          <a 
            href="https://www.youtube.com/@TheDeepValue" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
          >
            Subscribe on YouTube <ExternalLink size={18} className="ml-2" />
          </a>
          {/* <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Dive deep into S&P500 companies, macro economics, and investing philosophies through our detailed video analyses.
          </p> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {featuredVideos.map((video) => (
            <a 
              key={video.id} 
              href={video.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
              style={{
                boxShadow: '0 5px 15px rgba(0,0,0,0.3), 8px 8px 0 rgba(0,0,0,0.2), 12px 12px 0 rgba(0,0,0,0.1)'
              }}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt="" 
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-red-600 text-white text-sm py-1 px-3 rounded-md flex items-center shadow-md">
                  <Play size={16} className="mr-2" fill="white" />
                  <span>{video.episodeCount} videos</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}