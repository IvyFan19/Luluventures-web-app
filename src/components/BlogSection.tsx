import { useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
}

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 'aws-setup',
      title: 'Setting Up AWS CLI for Static Site Deployment',
      excerpt: 'Learn how to install and configure AWS CLI for deploying your static blog to S3 and CloudFront',
      content: `
# Setting Up AWS CLI for Static Site Deployment

Hello! Welcome to our technical setup guide. In this post, we'll walk through setting up AWS CLI for deploying static websites to S3 and CloudFront.

## Prerequisites

Before we begin, make sure you have the following:
- A macOS, Linux, or Windows system
- Terminal or command line access
- An AWS account

## Installing AWS CLI

For macOS users, the easiest way to install AWS CLI is using Homebrew:

\`\`\`bash
brew install awscli
\`\`\`

For other operating systems, you can use the official installer or pip:

\`\`\`bash
# Using pip
pip install awscli

# Using the official installer (Linux/macOS)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
\`\`\`

## Verification

After installation, verify that AWS CLI is properly installed:

\`\`\`bash
aws --version
\`\`\`

## Next Steps

Once AWS CLI is installed, you can configure it with your credentials and start deploying your static sites to S3 with CloudFront distribution for global content delivery.

Happy deploying! 🚀
      `,
      date: 'December 28, 2024',
      author: 'LuLu Ventures Team',
      category: 'Technical Setup'
    }
  ];

  const filteredPosts = blogPosts;

  if (selectedPost) {
    return (
      <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Blog
          </button>
          
          <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-4">
                {selectedPost.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar size={16} className="mr-2" />
                <span className="mr-4">{selectedPost.date}</span>
                <User size={16} className="mr-2" />
                <span>{selectedPost.author}</span>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ 
                  __html: selectedPost.content
                    .replace(/```bash\n([\s\S]*?)\n```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
                    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
                    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
                    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>')
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>')
                }}
              />
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Technical Blog</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Technical guides and tutorials for deploying and managing your investment analysis tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-2">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{post.author}</span>
                  <ArrowRight size={16} className="text-blue-600" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 