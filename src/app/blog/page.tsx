import { getAllContent } from '@/lib/content';
import ContentCard from '@/components/content/ContentCard';
import ContentFilters from '@/components/content/ContentFilters';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Portfolio',
  description: 'Thoughts, tutorials, and insights on software development and technology.',
};

export default async function BlogPage() {
  const posts = await getAllContent('blog', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  // Get unique categories and tags
  const categoriesSet = new Set<string>();
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    post.categories.forEach(cat => categoriesSet.add(cat));
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  const categories = Array.from(categoriesSet).sort();
  const tags = Array.from(tagsSet).sort();
  
  // Get featured posts
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Blog
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl">
          Thoughts, tutorials, and insights on software development and technology. 
          Deep dives into problems I&apos;ve solved and lessons I&apos;ve learned.
        </p>
      </header>
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">
            Featured Posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map(post => (
              <ContentCard 
                key={post.slug}
                content={post}
                variant="grid"
                showImage={true}
                showExcerpt={true}
                showMeta={true}
              />
            ))}
          </div>
        </section>
      )}
      
      {/* Filters */}
      <ContentFilters
        categories={categories}
        tags={tags}
        basePath="/blog"
      />
      
      {/* Archive Link */}
      {posts.length > 10 && (
        <div className="mb-6 text-right">
          <Link
            href="/blog/archive"
            className="text-sm text-gray-400 hover:text-orange-300 transition-colors"
          >
            View complete archive →
          </Link>
        </div>
      )}
      
      {/* All Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No blog posts published yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {regularPosts.map(post => (
            <ContentCard 
              key={post.slug}
              content={post}
              variant="list"
              showImage={true}
              showExcerpt={true}
              showMeta={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
