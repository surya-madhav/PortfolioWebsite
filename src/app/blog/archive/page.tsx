import { getAllContent } from '@/lib/content';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Archive | Portfolio',
  description: 'Complete archive of all blog posts organized by date.',
};

export default async function BlogArchivePage() {
  const posts = await getAllContent('blog', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  // Group posts by year and month
  const groupedPosts = posts.reduce((acc, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    
    if (!acc[year]) {
      acc[year] = {};
    }
    
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    
    acc[year][month].push(post);
    
    return acc;
  }, {} as Record<number, Record<string, typeof posts>>);
  
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Blog Archive
        </h1>
        <p className="text-lg text-gray-300">
          All blog posts organized by date. Total: {posts.length} posts.
        </p>
      </header>
      
      {years.map(year => (
        <section key={year} className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-orange-400 mb-6">
            {year}
          </h2>
          
          {Object.entries(groupedPosts[Number(year)])
            .sort((a, b) => {
              const months = ['January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'];
              return months.indexOf(b[0]) - months.indexOf(a[0]);
            })
            .map(([month, monthPosts]) => (
            <div key={month} className="mb-8">
              <h3 className="text-lg font-medium text-gray-400 mb-3">
                {month} ({monthPosts.length})
              </h3>
              
              <ul className="space-y-2">
                {monthPosts.map(post => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-all duration-200"
                    >
                      <time className="text-sm text-gray-500 mt-0.5 flex-shrink-0">
                        {new Date(post.date).getDate().toString().padStart(2, '0')}
                      </time>
                      <div className="flex-1">
                        <h4 className="font-medium text-white group-hover:text-orange-400 transition-colors">
                          {post.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-3 text-sm text-gray-400">
                          {post.author && (
                            <span>{post.author}</span>
                          )}
                          {post.readingTimeString && (
                            <>
                              <span className="text-gray-600">•</span>
                              <span>{post.readingTimeString}</span>
                            </>
                          )}
                          {post.categories.length > 0 && (
                            <>
                              <span className="text-gray-600">•</span>
                              <span>{post.categories[0]}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
      
      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
