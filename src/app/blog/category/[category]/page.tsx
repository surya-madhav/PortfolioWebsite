import { getAllContent } from '@/lib/content';
import ContentCard from '@/components/content/ContentCard';
import ContentFilters from '@/components/content/ContentFilters';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllContent('blog', { published: true });
  const categories = new Set<string>();
  
  posts.forEach(post => {
    post.categories.forEach(cat => categories.add(cat.toLowerCase().replace(/\s+/g, '-')));
  });
  
  return Array.from(categories).map(category => ({
    category,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${categoryName} Blog Posts | Portfolio`,
    description: `Browse all blog posts in the ${categoryName} category.`,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const allPosts = await getAllContent('blog', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  // Normalize category for comparison
  const normalizedCategory = params.category.replace(/-/g, ' ').toLowerCase();
  
  // Filter posts by category
  const posts = allPosts.filter(post => 
    post.categories.some(cat => cat.toLowerCase() === normalizedCategory)
  );
  
  if (posts.length === 0) {
    notFound();
  }
  
  // Get the actual category name
  const categoryName = posts[0].categories.find(cat => 
    cat.toLowerCase() === normalizedCategory
  ) || params.category;
  
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
          {categoryName} Posts
        </h1>
        <p className="text-lg text-gray-300">
          {posts.length} post{posts.length !== 1 ? 's' : ''} in this category
        </p>
      </header>
      
      {/* Filters */}
      <ContentFilters
        categories={categories}
        tags={tags}
        activeCategory={categoryName}
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
