import { useState } from 'react';
import { Send, Check } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Investing Club</h2>
          <p className="text-blue-100 mb-8">
          Get exclusive research, market insights, and investment ideas delivered to you for free!
          </p>
          
          {isSubmitted ? (
            <div className="bg-green-800 rounded-lg p-6 inline-block">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-green-700 p-2 rounded-full">
                  <Check className="text-white" size={20} />
                </div>
              </div>
              <p className="font-medium">Thank you for subscribing!</p>
              <p className="text-sm text-green-200 mt-1">
                We've sent a confirmation to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center ${
                  isLoading
                    ? 'bg-blue-700 cursor-not-allowed'
                    : 'bg-yellow-500 text-blue-900 hover:bg-yellow-400'
                } transition-colors`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Subscribe <Send size={16} className="ml-2" />
                  </span>
                )}
              </button>
            </form>
          )}
          
          <p className="text-sm text-blue-300 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}