import React from 'react';
import { Content } from '@/types/content';

interface ContentMetaProps {
  content: Content;
  showAuthor?: boolean;
  showReadingTime?: boolean;
  showDate?: boolean;
  showTags?: boolean;
  compact?: boolean;
}

export default function ContentMeta({
  content,
  showAuthor = false,
  showReadingTime = true,
  showDate = true,
  showTags = true,
  compact = false
}: ContentMetaProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: compact ? 'short' : 'long',
      day: 'numeric'
    });
  };
  
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
        {showDate && (
          <time dateTime={content.date}>
            {formatDate(content.date)}
          </time>
        )}
        
        {showAuthor && content.author && (
          <>
            <span className="text-gray-600">•</span>
            <span>{content.author}</span>
          </>
        )}
        
        {showReadingTime && content.readingTimeString && (
          <>
            <span className="text-gray-600">•</span>
            <span>{content.readingTimeString}</span>
          </>
        )}
        
        {showTags && content.tags.length > 0 && (
          <>
            <span className="text-gray-600">•</span>
            <div className="flex gap-2">
              {content.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="rounded-md bg-gray-800/90 px-2 py-1 text-xs text-orange-200 backdrop-blur-sm border border-orange-500/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-gray-300">
        {showDate && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={content.date}>
              {formatDate(content.date)}
            </time>
          </div>
        )}
        
        {showAuthor && content.author && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{content.author}</span>
          </div>
        )}
        
        {showReadingTime && content.readingTimeString && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{content.readingTimeString}</span>
          </div>
        )}
      </div>
      
      {showTags && content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {content.tags.map(tag => (
            <span
              key={tag}
              className="rounded-md bg-gray-800/90 px-3 py-1 text-sm text-orange-200 backdrop-blur-sm border border-orange-500/10 hover:border-orange-400/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {content.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {content.categories.map(category => (
            <span
              key={category}
              className="text-sm text-gray-400"
            >
              #{category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
