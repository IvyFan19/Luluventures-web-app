import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const subscriptionDate = new Date().toISOString();

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATES.ADMIN_NOTIFICATION,
        { user_email: email, subscription_date: subscriptionDate },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATES.USER_WELCOME,
        { email: email, to_name: 'Valued Investor' },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative z-10 py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-[130px] font-black tracking-tighter leading-[0.9] aurora-grad">
          Deep Values
        </h2>
        <p className="text-xl md:text-[28px] text-white/60 mt-5">
          Built for Modern Intelligent Investors.
        </p>

        <a
          href="https://app.deepvalues.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 text-emerald-500 text-2xl md:text-[30px] font-extrabold tracking-tight hover:text-emerald-400 transition-colors"
        >
          deepvalues.ai →
        </a>

        {/* Newsletter signup */}
        <div className="mt-16 pt-16 border-t border-white/[.06]">
          <p className="text-lg font-semibold text-white mb-2">Join the Deep Value Club</p>
          <p className="text-sm text-white/40 mb-6">
            Free research, insights, and ideas — delivered to your inbox.
          </p>

          {isSubmitted ? (
            <div className="inline-flex items-center gap-3 px-6 py-3.5 bg-white/[.06] rounded-full">
              <div className="bg-emerald-500 p-1.5 rounded-full">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Welcome to the club! Check your email.</span>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-500/20 rounded-lg px-4 py-2.5 mb-4 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-grow px-5 py-3 rounded-full bg-white/[.06] border border-white/[.1] text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    isLoading
                      ? 'bg-white/10 cursor-not-allowed text-white/50'
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    <>Subscribe <Send className="w-3.5 h-3.5" /></>
                  )}
                </button>
              </form>

              <p className="text-xs text-white/20 mt-4">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
