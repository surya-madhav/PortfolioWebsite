import { notFound } from 'next/navigation';
import { getContentBySlug, getContentPaths, getRelatedContent } from '@/lib/content';
import MarkdownContent from '@/components/MarkdownContent';
import ContentMeta from '@/components/content/ContentMeta';
import ContentCard from '@/components/content/ContentCard';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getContentPaths('note');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getContentBySlug('note', params.slug);
  
  if (!note) {
    return {
      title: 'Note Not Found',
    };
  }
  
  return {
    title: note.seo.title || note.title,
    description: note.seo.description || note.summary,
    keywords: note.seo.keywords,
    openGraph: {
      title: note.seo.title || note.title,
      description: note.seo.description || note.summary,
      images: note.seo.image ? [note.seo.image] : undefined,
      type: 'article',
      publishedTime: note.date,
      modifiedTime: note.updated,
      authors: note.author ? [note.author] : undefined,
      tags: note.tags,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const note = await getContentBySlug('note', params.slug);
  
  if (!note) {
    notFound();
  }
  
  const relatedNotes = await getRelatedContent(note, 3);
  
  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-24">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-400">
          <li>
            <Link href="/" className="hover:text-orange-300 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-600">/</li>
          <li>
            <Link href="/notes" className="hover:text-orange-300 transition-colors">
              Notes
            </Link>
          </li>
          <li className="text-gray-600">/</li>
          <li className="text-gray-300">{note.title}</li>
        </ol>
      </nav>
      
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
          {note.title}
        </h1>
        
        <ContentMeta
          content={note}
          showAuthor={false}
          showReadingTime={true}
          showDate={true}
          showTags={true}
          compact={false}
        />
      </header>
      
      {/* Content */}
      <div className="prose-container">
        <MarkdownContent content={note} showToc={note.toc} />
      </div>
      
      {/* Related Notes */}
      {relatedNotes.length > 0 && (
        <section className="mt-16 pt-8 border-t border-gray-800">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">
            Related Notes
          </h2>
          <div className="grid gap-4">
            {relatedNotes.map(related => (
              <ContentCard
                key={related.slug}
                content={related}
                variant="compact"
                showImage={false}
                showExcerpt={false}
                showMeta={true}
              />
            ))}
          </div>
        </section>
      )}
      
      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Notes
        </Link>
      </div>
    </article>
  );
}
