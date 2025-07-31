import { Lock } from 'lucide-react';

export function ResearchSection() {

  return (
    <section id="research" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Premium Research Analysis</h2>
          {/* <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Access our premium collection of in-depth research on value investing, company analyses, and market reports.
          </p> */}
        </div>

        <div className="text-center">
          <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
            <Lock className="text-blue-900" size={24} />
          </div>
          <h6 className="text-xl font-semibold mb-2 flex items-center justify-center">
            Premium Access
            <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Temporarily Free</span>
          </h6>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            Sign in to access our collection of in-depth research and analysis.
          </p>
          <button
            className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Sign In to Access
          </button>
        </div>
      </div>
    </section>
  );
}