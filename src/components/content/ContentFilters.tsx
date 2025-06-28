import React from 'react';
import Link from 'next/link';

interface ContentFiltersProps {
  categories: string[];
  tags: string[];
  activeCategory?: string;
  activeTag?: string;
  basePath: string;
}

export default function ContentFilters({
  categories,
  tags,
  activeCategory,
  activeTag,
  basePath
}: ContentFiltersProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href={basePath}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                !activeCategory && !activeTag
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                  : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:text-orange-300 hover:border-orange-500/50'
              }`}
            >
              All
            </Link>
            {categories.map(category => (
              <Link
                key={category}
                href={`${basePath}/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                    : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:text-orange-300 hover:border-orange-500/50'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map(tag => (
              <Link
                key={tag}
                href={`${basePath}/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                    : 'bg-gray-800/90 text-orange-200 border border-orange-500/10 hover:border-orange-400/30'
                }`}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Active Filter Display */}
      {(activeCategory || activeTag) && (
        <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <span className="text-sm text-gray-400">Filtering by:</span>
          {activeCategory && (
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-md text-sm font-medium">
              {activeCategory}
            </span>
          )}
          {activeTag && (
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-md text-sm font-medium">
              #{activeTag}
            </span>
          )}
          <Link
            href={basePath}
            className="ml-auto text-sm text-gray-400 hover:text-orange-300 transition-colors"
          >
            Clear filters
          </Link>
        </div>
      )}
    </div>
  );
}
