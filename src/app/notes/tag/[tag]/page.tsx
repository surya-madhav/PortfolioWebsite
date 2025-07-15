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
  const notes = await getAllContent('note', { published: true });
  const tags = new Set<string>();
  
  notes.forEach(note => {
    note.tags.forEach(tag => tags.add(tag.toLowerCase().replace(/\s+/g, '-')));
  });
  
  return Array.from(tags).map(tag => ({
    tag,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagName = params.tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `Notes tagged "${tagName}" | Portfolio`,
    description: `Browse all notes tagged with "${tagName}".`,
  };
}

export default async function NotesTagPage({ params }: Props) {
  const allNotes = await getAllContent('note', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  // Normalize tag for comparison
  const normalizedTag = params.tag.replace(/-/g, ' ').toLowerCase();
  
  // Filter notes by tag
  const notes = allNotes.filter(note => 
    note.tags.some(tag => tag.toLowerCase() === normalizedTag)
  );
  
  if (notes.length === 0) {
    notFound();
  }
  
  // Get the actual tag name
  const tagName = notes[0].tags.find(tag => 
    tag.toLowerCase() === normalizedTag
  ) || params.tag;
  
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
          Notes tagged &quot;{tagName}&quot;
        </h1>
        <p className="text-lg text-gray-300">
          {notes.length} note{notes.length !== 1 ? 's' : ''} with this tag
        </p>
      </header>
      
      {/* Filters */}
      <ContentFilters
        categories={categories}
        tags={tags}
        activeTag={tagName}
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
