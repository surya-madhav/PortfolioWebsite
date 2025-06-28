import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Content } from '@/types/content';
import ContentMeta from './ContentMeta';

interface ContentCardProps {
  content: Content;
  variant?: 'grid' | 'list' | 'compact';
  showImage?: boolean;
  showExcerpt?: boolean;
  showMeta?: boolean;
}

export default function ContentCard({
  content,
  variant = 'list',
  showImage = true,
  showExcerpt = true,
  showMeta = true
}: ContentCardProps) {
  const href = `/${content.type === 'project' ? 'projects' : content.type === 'note' ? 'notes' : 'blog'}/${content.slug}`;
  
  if (variant === 'compact') {
    return (
      <Link href={href} className="block group">
        <article className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-all duration-200">
          <div className="flex-1">
            <h3 className="font-heading font-medium text-white group-hover:text-orange-400 transition-colors">
              {content.title}
            </h3>
            <div className="mt-1 flex items-center gap-4 text-sm text-gray-400">
              <time dateTime={content.date}>
                {new Date(content.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
              {content.readingTimeString && (
                <span>• {content.readingTimeString}</span>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }
  
  if (variant === 'list') {
    return (
      <Link href={href} className="block group">
        <article className="rounded-xl border border-gray-800/30 bg-gray-900/30 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 p-6">
          <div className="flex gap-6">
            {showImage && content.thumbnail && (
              <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={content.thumbnail}
                  alt={content.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="flex-1">
              <h2 className="text-xl font-heading font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                {content.title}
              </h2>
              
              {showExcerpt && (
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {content.excerpt}
                </p>
              )}
              
              {showMeta && (
                <ContentMeta
                  content={content}
                  showAuthor={content.type === 'blog'}
                  showReadingTime={true}
                  showDate={true}
                  showTags={true}
                  compact={true}
                />
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }
  
  // Grid variant
  return (
    <Link href={href} className="block group h-full">
      <article className="h-full rounded-xl border border-gray-800/30 bg-gray-900/30 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col">
        {showImage && content.thumbnail && (
          <div className="relative w-full aspect-video">
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
          </div>
        )}
        
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-heading font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
            {content.title}
          </h2>
          
          {showExcerpt && (
            <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
              {content.excerpt}
            </p>
          )}
          
          {showMeta && (
            <ContentMeta
              content={content}
              showAuthor={content.type === 'blog'}
              showReadingTime={true}
              showDate={true}
              showTags={false}
              compact={true}
            />
          )}
        </div>
      </article>
    </Link>
  );
}
