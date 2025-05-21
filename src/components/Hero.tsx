export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-yellow-400 -mr-20 -mb-20"></div>
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full bg-blue-400 -ml-20 -mt-20"></div>
      </div>
      
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