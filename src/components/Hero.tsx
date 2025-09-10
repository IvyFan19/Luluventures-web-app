import { useEffect, useRef } from 'react';

// Declare global variables for CDN libraries
declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export function Hero() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current && window.VANTA && window.THREE) {
      vantaEffect.current = window.VANTA.FOG({
        el: vantaRef.current,
        THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0xd9aa14,
          midtoneColor: 0x892f59,
          lowlightColor: 0x413c64,
          baseColor: 0x363698,
          blurFactor: 0.82,
          speed: 1.30,
          zoom: 0.40

          // THREE: THREE,
          // mouseControls: true,
          // touchControls: true,
          // gyroControls: false,
          // minHeight: 200.00,
          // minWidth: 200.00,
          // highlightColor: 0x304575,
          // midtoneColor: 0x304574,
          // lowlightColor: 0x314575,
          // baseColor:0x4f3264 ,
          // speed: 1.0
        });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section 
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="container mx-auto px-4 py-16 z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Master Buffett-Style Value Investing with <br />
          The Deep Value Intelligence
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Your Gateway to S&P500 Analysis, Macro Economics, and Timeless Principles.
        </p>
        
        {/* <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto">
          We break down company financials based on the Warren Buffett way: focusing on strong fundamentals, 
          intrinsic value, durable competitive advantages, and long-term growth.
        </p> */}
        
        {/* <div className="flex flex-wrap justify-center gap-4">

        <button 
            onClick={() => document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
          >
            Podcast
          </button>
          
          <button 
            onClick={() => document.getElementById('youtube')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
          >
            YouTube
          </button>
          

          
          <button 
            onClick={() => document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
          >
            App Tools
          </button>


          <button 
            onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
          >
            Research
          </button>

        </div> */}
      </div>
    </section>
  );
}