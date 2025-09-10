import { useState } from 'react';
import { ExternalLink, Play, BellRing } from 'lucide-react';
import { YOUTUBE_PLAYLISTS, EXTERNAL_LINKS } from '../utils/constants';
import { Video } from '../types';

export function YouTubeSection() {
  const [featuredVideos] = useState<Video[]>([
    {
      id: YOUTUBE_PLAYLISTS.BUFFETT_WAY.id,
      thumbnail: YOUTUBE_PLAYLISTS.BUFFETT_WAY.thumbnail,
      playlistUrl: YOUTUBE_PLAYLISTS.BUFFETT_WAY.url,
      episodeCount: YOUTUBE_PLAYLISTS.BUFFETT_WAY.episodeCount,
    },
    {
      id: YOUTUBE_PLAYLISTS.COMPANY_ANALYSIS.id,
      thumbnail: YOUTUBE_PLAYLISTS.COMPANY_ANALYSIS.thumbnail,
      playlistUrl: YOUTUBE_PLAYLISTS.COMPANY_ANALYSIS.url,
      episodeCount: YOUTUBE_PLAYLISTS.COMPANY_ANALYSIS.episodeCount,
    },
    {
      id: YOUTUBE_PLAYLISTS.BUSINESS_PRINCIPLES.id,
      thumbnail: YOUTUBE_PLAYLISTS.BUSINESS_PRINCIPLES.thumbnail,
      playlistUrl: YOUTUBE_PLAYLISTS.BUSINESS_PRINCIPLES.url,
      episodeCount: YOUTUBE_PLAYLISTS.BUSINESS_PRINCIPLES.episodeCount,
    },
    {
      id: YOUTUBE_PLAYLISTS.MODERN_PHILOSOPHER.id,
      thumbnail: YOUTUBE_PLAYLISTS.MODERN_PHILOSOPHER.thumbnail,
      playlistUrl: YOUTUBE_PLAYLISTS.MODERN_PHILOSOPHER.url,
      episodeCount: YOUTUBE_PLAYLISTS.MODERN_PHILOSOPHER.episodeCount,
    },
  ]);

  return (
    <section id="youtube" className="py-12 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Youtube Channel</h2>
          {/* <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Dive deep into S&P500 companies, macro economics, and investing philosophies through our detailed video analyses.
          </p> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 mb-10">
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
                <div className="absolute bottom-4 right-4 bg-red-600 text-white text-sm py-1 px-3 rounded-full flex items-center shadow-md">
                  <Play size={16} className="mr-2" fill="white" />
                  <span>{video.episodeCount} videos</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href={EXTERNAL_LINKS.YOUTUBE_CHANNEL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            Subscribe
            <BellRing className="w-6 h-6 ml-3" />
          </a>
        </div>
      </div>
    </section>
  );
}