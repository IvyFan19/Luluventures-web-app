import { Play, Share } from 'lucide-react'
import { CompanyBadges } from './CompanyBadges'
import { TestimonialCard } from './TestimonialCard'
import { ChartPlaceholder } from './ChartPlaceholder'

export function ArticleContent() {
  return (
    <div className="pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-8">
        {/* Article Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-gray-400 text-sm">August 7, 2025</span>
            <span className="mx-3 text-gray-600">•</span>
            <span className="text-gray-400 text-sm">Product</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
            Introducing GPT-5
            <br />
            for developers
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            The best model for coding and agentic tasks.
          </p>

          {/* Audio Player */}
          <div className="flex items-center justify-center space-x-8 mb-12">
            <button className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded-md">
              <Play className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Listen to article</span>
              <span className="text-gray-400 text-sm">12:31</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Share className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="mb-16">
          <h2 className="article-heading">Introduction</h2>
          <div className="article-text space-y-4">
            <p>
              Today, we're releasing GPT-5 in our API platform—our best model yet for coding and agentic tasks.
            </p>
            <p>
              GPT-5 is state-of-the-art (SOTA) across key coding benchmarks, scoring 74.9% on SWE-bench Verified and 88% on Aider polyglot. We trained GPT-5 to be a true coding collaborator. It excels at producing high-quality code and handling tasks such as fixing bugs, editing code, and answering questions about complex codebases. The model is steerable and collaborative—it can follow very detailed instructions with high accuracy and can provide upfront explanations of its actions before and between tool calls. The model also excels at front-end coding, beating OpenAI o3 at frontend web development 70% of the time in internal testing.
            </p>
            <p>
              We trained GPT-5 on real-world coding tasks in collaboration with early testers across startups and enterprises. <strong>Cursor</strong> says GPT-5 is "the smartest model [they've] used" and "remarkably intelligent, easy to steer, and even has a personality [they] haven't seen in other models." <strong>Windsurf</strong> shared GPT-5 is SOTA on their evals and "has half the tool calling error rate over other frontier models." <strong>Vercel</strong> says "it's the best frontend AI model, hitting top performance across both the aesthetic sense and the code quality, putting it in a category of its own."
            </p>
          </div>
        </section>

        {/* Coding Section */}
        <section className="mb-16">
          <h2 className="article-heading">Coding</h2>
          <div className="article-text space-y-4">
            <p>
              GPT-5 is the strongest coding model we've ever released. It outperforms o3 across coding benchmarks and real-world use cases, and has been fine-tuned to shine in agentic coding products like Cursor, Windsurf, GitHub Copilot, and Codex CLI. GPT-5 impressed our alpha testers, setting records on many of their private internal evals.
            </p>
          </div>
        </section>

        {/* Early feedback section */}
        <section className="mb-16">
          <h3 className="text-lg text-gray-300 mb-8">Early feedback on GPT-5 for real-world coding tasks</h3>
          <CompanyBadges />
          <TestimonialCard
            quote="GPT-5 is the smartest coding model we've used. Our team has found GPT-5 to be remarkably intelligent, easy to steer, and even to have a personality we haven't seen in any other model. It not only catches tricky, deeply-hidden bugs but can also run long, multi-turn background agents to see complex tasks through to the finish—the kinds of problems that used to leave other models stuck. It's become our daily driver for everything from scoping and planning PRs to completing end-to-end builds."
            author="Michael Truell, Co-Founder & CEO at Cursor"
          />
        </section>

        {/* Charts Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <ChartPlaceholder
              title="SWE-bench Verified"
              subtitle="Software engineering"
              description="On SWE-bench Verified, an evaluation based on real-world software engineering tasks, GPT-5 scores 74.9%, up from o3's 69.1%."
            />
            <ChartPlaceholder
              title="Aider polyglot"
              subtitle="Multi-language code editing"
              description="On Aider polyglot, an evaluation of code editing, GPT-5 sets a new record of 88%, a one-third reduction in error rate compared to o3."
            />
          </div>
        </section>

        {/* Frontend Engineering Section */}
        <section className="mb-16">
          <h2 className="article-heading">Frontend engineering</h2>
          <div className="article-text space-y-4">
            <p>
              When producing frontend code for web apps, GPT-5 is more aesthetically-minded, ambitious, and accurate. In side-by-side comparisons with o3, GPT-5 was preferred by our testers 70% of the time.
            </p>
            <p>
              Here are some fun, cherry-picked examples of what GPT-5 can do with a single prompt:
            </p>
          </div>

          {/* Example showcase */}
          <div className="mt-8 bg-gray-900 rounded-lg p-6">
            <h4 className="text-white font-medium mb-4">Bay Area Espresso Lab</h4>
            <p className="text-sm text-gray-400 mb-4">Built for Bay Area homes</p>
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Master the art and science of espresso at home</h3>
              <p className="text-gray-300 mb-6">
                $200/month includes prosumer equipment rental and weekly 1:1 coaching.
                Commit to a six-month journey to pull café-quality shots, dial-in like a pro, and
                roast with intention.
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                $200/mo • 6-month program
                <span className="block text-sm text-orange-200 mt-1">Start</span>
              </button>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <strong>Prompt:</strong> Please generate a beautiful, realistic landing page for a service
              that provides the ultimate coffee enthusiast a $200/month subscription that provides
              equipment rental and coaching for coffee roasting and creating the ultimate espresso.
            </div>
          </div>
        </section>

        {/* More sections would continue here... */}
        <section className="mb-16">
          <h2 className="article-heading">Coding collaboration</h2>
          <div className="article-text space-y-4">
            <p>
              GPT-5 is a better collaborator, particularly in agentic coding products like Cursor, Windsurf, GitHub Copilot, and Codex CLI. While it works, GPT-5 can output plans, updates, and recaps in between tool calls. Relative to our past models, GPT-5 is more proactive at completing ambitious tasks without pausing for your go-ahead or balking at high complexity.
            </p>
            <p>
              Here's an example of how GPT-5 can look while tackling a complex task (in this case, creating a website for a restaurant):
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
