'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ContentType } from '@/types/content';
import ContentCard from './ContentCard';

interface SearchResult {
  slug: string;
  title: string;
  summary: string;
  type: ContentType;
  date: string;
  tags: string[];
  categories: string[];
  readingTime: number;
}

interface ContentSearchProps {
  contentType: ContentType;
  placeholder?: string;
}

function ContentSearchInner({ contentType, placeholder = 'Search...' }: ContentSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    
    setLoading(true);
    setSearched(true);
    
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&type=${contentType}&limit=20`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [contentType]);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        performSearch(query);
      } else {
        setResults([]);
        setSearched(false);
      }
    }, 300); // Debounce search
    
    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Update URL with search query
      router.push(`?q=${encodeURIComponent(query)}`);
    }
  };
  
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
    router.push(window.location.pathname);
  };
  
  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-10 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-gray-800/70 transition-all"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>
      
      {/* Search Results */}
      {searched && (
        <div className="mt-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
              <p className="mt-2 text-gray-400">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="text-sm text-gray-400 mb-4">
                Found {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
              </p>
              <div className="grid gap-4">
                {results.map((result) => (
                  <ContentCard
                    key={result.slug}
                    content={result as any}
                    variant="compact"
                    showImage={false}
                    showExcerpt={true}
                    showMeta={true}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No results found for &quot;{query}&quot;</p>
              <p className="text-sm text-gray-500 mt-2">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContentSearch(props: ContentSearchProps) {
  return (
    <Suspense fallback={
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder={props.placeholder || 'Search...'}
            className="w-full px-4 py-3 pl-12 pr-10 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400"
            disabled
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    }>
      <ContentSearchInner {...props} />
    </Suspense>
  );
}
