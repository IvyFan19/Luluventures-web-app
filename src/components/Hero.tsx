import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToNextSection = () => {
    const youtubeSection = document.getElementById('youtube');
    if (youtubeSection) {
      youtubeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-yellow-400 -mr-20 -mb-20"></div>
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full bg-blue-400 -ml-20 -mt-20"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 z-10 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Master Warren Buffett-Style Investing with The Deep Value
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Your Gateway to S&P500 Analysis, Macro Economics, and Timeless Principles.
        </p>
        
        <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto">
          We break down company financials based on the Warren Buffett way: focusing on strong fundamentals, 
          intrinsic value, durable competitive advantages, and long-term growth.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-yellow-500 text-blue-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-lg"
          >
            Explore Research
          </button>
          
          <button 
            onClick={() => document.getElementById('youtube')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
          >
            Watch on YouTube
          </button>
          
          <button 
            onClick={() => document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
          >
            Listen to Podcast
          </button>
          
          <button 
            onClick={() => document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
          >
            Explore App Tools
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center animate-bounce">
        <button 
          onClick={scrollToNextSection}
          className="text-white opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={36} />
        </button>
      </div>
    </section>
  );
}