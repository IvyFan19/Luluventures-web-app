// import { useState } from 'react';
// import { Play, BellRing } from 'lucide-react';
// import { YOUTUBE_PLAYLISTS, EXTERNAL_LINKS } from '../utils/constants';
// import { Video } from '../types';

// Original design: 4 playlist album entries (grid layout with thumbnail cards)
// export function YouTubeSection() {
//   const [featuredVideos] = useState<Video[]>([
//     {
//       id: YOUTUBE_PLAYLISTS.BUFFETT_WAY.id,
//       thumbnail: YOUTUBE_PLAYLISTS.BUFFETT_WAY.thumbnail,
//       playlistUrl: YOUTUBE_PLAYLISTS.BUFFETT_WAY.url,
//       episodeCount: YOUTUBE_PLAYLISTS.BUFFETT_WAY.episodeCount,
//     },
//     {
//       id: YOUTUBE_PLAYLISTS.COMPANY_ANALYSIS.id,
//       thumbnail: YOUTUBE_PLAYLISTS.COMPANY_ANALYSIS.thumbnail,
//       playlistUrl: YOUTUBE_PLAYLISTS.COMPANY_ANALYSIS.url,
//       episodeCount: YOUTUBE_PLAYLISTS.COMPANY_ANALYSIS.episodeCount,
//     },
//     {
//       id: YOUTUBE_PLAYLISTS.BUSINESS_PRINCIPLES.id,
//       thumbnail: YOUTUBE_PLAYLISTS.BUSINESS_PRINCIPLES.thumbnail,
//       playlistUrl: YOUTUBE_PLAYLISTS.BUSINESS_PRINCIPLES.url,
//       episodeCount: YOUTUBE_PLAYLISTS.BUSINESS_PRINCIPLES.episodeCount,
//     },
//     {
//       id: YOUTUBE_PLAYLISTS.MODERN_PHILOSOPHER.id,
//       thumbnail: YOUTUBE_PLAYLISTS.MODERN_PHILOSOPHER.thumbnail,
//       playlistUrl: YOUTUBE_PLAYLISTS.MODERN_PHILOSOPHER.url,
//       episodeCount: YOUTUBE_PLAYLISTS.MODERN_PHILOSOPHER.episodeCount,
//     },
//   ]);
//
//   return (
//     <section id="youtube" className="py-12 md:py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="mb-8 md:mb-12 flex items-center justify-center gap-6">
//           <h2 className="text-4xl font-bold text-blue-900">Youtube</h2>
//           <a
//             href={EXTERNAL_LINKS.YOUTUBE_CHANNEL}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg"
//           >
//             <BellRing className="w-6 h-6 mr-3" />
//             Subscribe
//           </a>
//         </div>
//
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 mb-10">
//           {featuredVideos.map((video) => (
//             <a
//               key={video.id}
//               href={video.playlistUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
//               style={{
//                 boxShadow: '0 5px 15px rgba(0,0,0,0.3), 8px 8px 0 rgba(0,0,0,0.2), 12px 12px 0 rgba(0,0,0,0.1)'
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.4), 8px 8px 0 rgba(0,0,0,0.2), 12px 12px 0 rgba(0,0,0,0.1)';
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLElement).style.boxShadow = '0 5px 15px rgba(0,0,0,0.3), 8px 8px 0 rgba(0,0,0,0.2), 12px 12px 0 rgba(0,0,0,0.1)';
//               }}
//             >
//               <div className="relative">
//                 <img
//                   src={video.thumbnail}
//                   alt=""
//                   className="w-full aspect-video object-cover"
//                 />
//                 <div className="absolute bottom-4 right-4 bg-red-600 text-white text-sm py-1 px-3 rounded-full flex items-center shadow-md">
//                   <Play size={16} className="mr-2" fill="white" />
//                   <span>{video.episodeCount} videos</span>
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// New design: 3 channel entries with circular avatars in a horizontal row
const channels = [
  {
    name: 'Deep Value Investing',
    url: 'https://www.youtube.com/@TheDeepValue',
    avatar: '/images/youtube-Deep-Value-Investing .jpg',
  },
  {
    name: 'Deep Values',
    url: 'https://www.youtube.com/@DeepValues',
    avatar: '/images/youtube-deep-values.png',
  },
  {
    name: '深度价值',
    url: 'https://www.youtube.com/@%E6%B7%B1%E5%BA%A6%E4%BB%B7%E5%80%BC',
    avatar: '/images/youtube-deep-values.png',
  },
];

export function YouTubeSection() {
  return (
    <section id="youtube" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 md:mb-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">YouTube Channels</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-36">
          {channels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group w-44"
              style={{ outline: 'none', WebkitTapHighlightColor: 'transparent', textDecoration: 'none' }}
            >
              <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105" style={{ transform: 'translateZ(0)', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-300 whitespace-nowrap">
                {channel.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}