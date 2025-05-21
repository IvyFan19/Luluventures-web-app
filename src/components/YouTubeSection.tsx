import { useState } from 'react';
import { ExternalLink, Headphones } from 'lucide-react';

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  playlistUrl: string;
  episodeCount: number;
};

export function YouTubeSection() {
  const [featuredVideos] = useState<Video[]>([
    {
      id: 'playlist1',
      title: 'The Buffett Way',
      thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      playlistUrl: 'https://www.youtube.com/watch?v=4QC92OWkDvc&list=PLKC11J8aIwXRinHFFK_OODlTpthX8L5Qt',
      episodeCount: 52
    },
    {
      id: 'playlist2',
      title: 'Company Analysis',
      thumbnail: 'https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      playlistUrl: 'https://www.youtube.com/watch?v=4QC92OWkDvc&list=PLKC11J8aIwXSLxVwF-zaxYEFaYNXwnB4O',
      episodeCount: 38
    },
    {
      id: 'playlist3',
      title: 'Everything Economics',
      thumbnail: 'https://images.pexels.com/photos/7567448/pexels-photo-7567448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      playlistUrl: 'http://youtube.com/watch?v=UisvRx8VflI&list=PLKC11J8aIwXQkh57dq3rUwXN2R8LT3PVR',
      episodeCount: 24
    },
    {
      id: 'playlist4',
      title: 'Modern Capitalism Philosophers',
      thumbnail: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      playlistUrl: 'https://www.youtube.com/watch?v=GJJG-dClvpI&list=PLKC11J8aIwXQZVX0GjwpzO-afv8wn4Xa2',
      episodeCount: 16
    }
  ]);

  return (
    <section id="youtube" className="py-20 bg-gray-50">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {featuredVideos.map((video) => (
            <a 
              key={video.id} 
              href={video.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-xl font-bold text-white mb-1">{video.title}</h3>
                  <div className="flex items-center text-white/90">
                    <Headphones size={16} className="mr-2" />
                    <span>{video.episodeCount} episodes</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
                  PLAYLIST
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}