import { getAllContent } from '@/lib/content';
import ContentCard from '@/components/content/ContentCard';
import ContentFilters from '@/components/content/ContentFilters';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllContent('blog', { published: true });
  const tags = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag.toLowerCase().replace(/\s+/g, '-')));
  });
  
  return Array.from(tags).map(tag => ({
    tag,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagName = params.tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `Blog posts tagged "${tagName}" | Portfolio`,
    description: `Browse all blog posts tagged with "${tagName}".`,
  };
}

export default async function BlogTagPage({ params }: Props) {
  const allPosts = await getAllContent('blog', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  // Normalize tag for comparison
  const normalizedTag = params.tag.replace(/-/g, ' ').toLowerCase();
  
  // Filter posts by tag
  const posts = allPosts.filter(post => 
    post.tags.some(tag => tag.toLowerCase() === normalizedTag)
  );
  
  if (posts.length === 0) {
    notFound();
  }
  
  // Get the actual tag name
  const tagName = posts[0].tags.find(tag => 
    tag.toLowerCase() === normalizedTag
  ) || params.tag;
  
  // Get all categories and tags for filters
  const categoriesSet = new Set<string>();
  const tagsSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.categories.forEach(cat => categoriesSet.add(cat));
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  const categories = Array.from(categoriesSet).sort();
  const tags = Array.from(tagsSet).sort();
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Posts tagged &quot;{tagName}&quot;
        </h1>
        <p className="text-lg text-gray-300">
          {posts.length} post{posts.length !== 1 ? 's' : ''} with this tag
        </p>
      </header>
      
      {/* Filters */}
      <ContentFilters
        categories={categories}
        tags={tags}
        activeTag={tagName}
        basePath="/blog"
      />
      
      {/* Posts grid */}
      <div className="grid gap-6">
        {posts.map(post => (
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
    </div>
  );
}
