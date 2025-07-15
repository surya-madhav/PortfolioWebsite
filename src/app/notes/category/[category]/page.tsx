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
  const notes = await getAllContent('note', { published: true });
  const categories = new Set<string>();
  
  notes.forEach(note => {
    note.categories.forEach(cat => categories.add(cat.toLowerCase().replace(/\s+/g, '-')));
  });
  
  return Array.from(categories).map(category => ({
    category,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${categoryName} Notes | Portfolio`,
    description: `Browse all notes in the ${categoryName} category.`,
  };
}

export default async function NotesCategoryPage({ params }: Props) {
  const allNotes = await getAllContent('note', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  // Normalize category for comparison
  const normalizedCategory = params.category.replace(/-/g, ' ').toLowerCase();
  
  // Filter notes by category
  const notes = allNotes.filter(note => 
    note.categories.some(cat => cat.toLowerCase() === normalizedCategory)
  );
  
  if (notes.length === 0) {
    notFound();
  }
  
  // Get the actual category name
  const categoryName = notes[0].categories.find(cat => 
    cat.toLowerCase() === normalizedCategory
  ) || params.category;
  
  // Get all categories and tags for filters
  const categoriesSet = new Set<string>();
  const tagsSet = new Set<string>();
  
  allNotes.forEach(note => {
    note.categories.forEach(cat => categoriesSet.add(cat));
    note.tags.forEach(tag => tagsSet.add(tag));
  });
  
  const categories = Array.from(categoriesSet).sort();
  const tags = Array.from(tagsSet).sort();
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          {categoryName} Notes
        </h1>
        <p className="text-lg text-gray-300">
          {notes.length} note{notes.length !== 1 ? 's' : ''} in this category
        </p>
      </header>
      
      {/* Filters */}
      <ContentFilters
        categories={categories}
        tags={tags}
        activeCategory={categoryName}
        basePath="/notes"
      />
      
      {/* Notes grid */}
      <div className="grid gap-6">
        {notes.map(note => (
          <ContentCard 
            key={note.slug}
            content={note}
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
