import { getAllContent } from '@/lib/content';
import ContentCard from '@/components/content/ContentCard';
import ContentFilters from '@/components/content/ContentFilters';
import ContentSearch from '@/components/content/ContentSearch';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Quick technical notes and learnings from AI engineering, distributed systems, and full-stack development. Tips on LLMs, cloud architecture, and best practices.',
  keywords: ['technical notes', 'AI engineering', 'LLMs', 'distributed systems', 'cloud architecture', 'development tips', 'best practices', 'GenAI', 'machine learning'],
  alternates: {
    canonical: 'https://rssmv.in/notes',
  },
  openGraph: {
    title: 'Notes | Sai Surya\'s Portfolio',
    description: 'Quick technical notes and learnings from AI engineering, distributed systems, and full-stack development.',
    url: 'https://rssmv.in/notes',
    type: 'website',
  },
};

export default async function NotesPage() {
  const notes = await getAllContent('note', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  // Get unique categories and tags
  const categoriesSet = new Set<string>();
  const tagsSet = new Set<string>();
  
  notes.forEach(note => {
    note.categories.forEach(cat => categoriesSet.add(cat));
    note.tags.forEach(tag => tagsSet.add(tag));
  });
  
  const categories = Array.from(categoriesSet).sort();
  const tags = Array.from(tagsSet).sort();
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Notes
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl">
          Quick technical notes and learnings from AI engineering, distributed systems, 
          and full-stack development. Tips on LLMs, cloud architecture, and best practices.
        </p>
      </header>
      
      {/* Search */}
      <ContentSearch contentType="note" placeholder="Search notes..." />
      
      {/* Filters */}
      <ContentFilters
        categories={categories}
        tags={tags}
        basePath="/notes"
      />
      
      {/* Archive Link */}
      {notes.length > 10 && (
        <div className="mb-6 text-right">
          <Link
            href="/notes/archive"
            className="text-sm text-gray-400 hover:text-orange-300 transition-colors"
          >
            View complete archive →
          </Link>
        </div>
      )}
      
      {/* Notes grid */}
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No notes published yet. Check back soon!</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
