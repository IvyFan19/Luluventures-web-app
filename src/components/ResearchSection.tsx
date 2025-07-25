import { useState } from 'react';
import { Lock, File, ChevronRight } from 'lucide-react';

type ResearchDocument = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

export function ResearchSection() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const researchDocuments: ResearchDocument[] = [
    {
      id: 'doc1',
      title: 'S&P 500 Valuation Analysis: Q2 2025',
      description: 'A comprehensive analysis of S&P 500 valuations with insights on current market trends.',
      date: 'June 15, 2025',
      category: 'market'
    },
    {
      id: 'doc2',
      title: 'Deep Dive: Apple Inc. Intrinsic Value',
      description: 'Detailed breakdown of Apple\'s business model, competitive advantages, and intrinsic value.',
      date: 'June 1, 2025',
      category: 'company'
    },
    {
      id: 'doc3',
      title: 'Interest Rates and Equity Valuations Correlation',
      description: 'Research on how interest rate changes historically impact equity valuations across different sectors.',
      date: 'May 15, 2025',
      category: 'economics'
    },
    {
      id: 'doc4',
      title: 'Value Investing in High Inflation Environments',
      description: 'Strategies for value investors during periods of elevated inflation based on historical data.',
      date: 'May 1, 2025',
      category: 'strategy'
    },
    {
      id: 'doc5',
      title: 'Microsoft Corporation: Competitive Advantage Analysis',
      description: 'Analysis of Microsoft\'s economic moat and competitive positioning in key markets.',
      date: 'April 15, 2025',
      category: 'company'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'company', name: 'Company Analysis' },
    { id: 'market', name: 'Market Reports' },
    { id: 'economics', name: 'Economic Research' },
    { id: 'strategy', name: 'Investment Strategy' }
  ];

  const filteredDocuments = activeTab === 'all'
    ? researchDocuments
    : researchDocuments.filter(doc => doc.category === activeTab);

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