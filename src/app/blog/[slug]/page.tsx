import { notFound } from 'next/navigation';
import { getContentBySlug, getContentPaths, getRelatedContent } from '@/lib/content';
import MarkdownContent from '@/components/MarkdownContent';
import ContentMeta from '@/components/content/ContentMeta';
import ContentCard from '@/components/content/ContentCard';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { generateContentMetadata, generateStructuredData, generateBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getContentPaths('blog');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getContentBySlug('blog', params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return generateContentMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getContentBySlug('blog', params.slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = await getRelatedContent(post, 3);
  
  // Generate structured data
  const structuredData = generateStructuredData(post);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
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
            <Link href="/blog" className="hover:text-orange-300 transition-colors">
              Blog
            </Link>
          </li>
          <li className="text-gray-600">/</li>
          <li className="text-gray-300 truncate">{post.title}</li>
        </ol>
      </nav>
      
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
          {post.title}
        </h1>
        
        <ContentMeta
          content={post}
          showAuthor={true}
          showReadingTime={true}
          showDate={true}
          showTags={true}
          compact={false}
        />
        
        {/* Hero Image */}
        {post.hero && (
          <div className="mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="relative w-full aspect-video">
              <Image
                src={post.hero.src}
                alt={post.hero.alt || post.title}
                fill
                className="object-cover"
                priority
              />
              {post.hero.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
                  <p className="text-sm text-gray-300 text-center">
                    {post.hero.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Content */}
      <div className="prose-container">
        <MarkdownContent content={post} showToc={post.toc} />
      </div>
      
      {/* Share Section */}
      <section className="mt-12 pt-8 border-t border-gray-800">
        <h3 className="text-lg font-medium text-gray-400 mb-4">Share this post</h3>
        <div className="flex gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://rssmv.in'}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white rounded-md transition-all duration-200"
          >
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://rssmv.in'}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white rounded-md transition-all duration-200"
          >
            LinkedIn
          </a>
        </div>
      </section>
      
      {/* Author Info */}
      {post.author && (
        <section className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700">
          <h3 className="text-lg font-medium text-gray-400 mb-2">About the Author</h3>
          <p className="text-white font-medium">{post.author}</p>
        </section>
      )}
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t border-gray-800">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">
            Related Posts
          </h2>
          <div className="grid gap-4">
            {relatedPosts.map(related => (
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
          href="/blog"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </article>
    </>
  );
}
