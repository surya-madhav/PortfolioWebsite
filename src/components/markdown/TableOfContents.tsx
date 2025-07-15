'use client';

import React, { useEffect, useState } from 'react';
import { ComponentProps, Heading } from '@/types/content';

interface TableOfContentsProps extends ComponentProps {
  headings?: Heading[];
  depth?: number;
  ordered?: boolean;
  title?: string;
  sticky?: boolean;
}

export default function TableOfContents({
  headings = [],
  depth = 3,
  ordered = false,
  title = 'Table of Contents',
  sticky = false,
  className = ''
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    
    // Get all headings from the page if not provided
    const pageHeadings = headings.length > 0 ? headings : [];
    
    if (pageHeadings.length === 0) {
      // Extract headings from DOM
      const elements = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
      elements.forEach(element => {
        const level = parseInt(element.tagName[1]);
        if (level <= depth) {
          pageHeadings.push({
            id: element.id,
            text: element.textContent || '',
            level
          });
        }
      });
    }
    
    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0
      }
    );
    
    // Observe all headings
    pageHeadings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      observer.disconnect();
    };
  }, [mounted, headings, depth]);
  
  // Filter headings by depth
  const filteredHeadings = headings.filter(h => h.level <= depth);
  
  if (filteredHeadings.length === 0) {
    return null;
  }
  
  // Group headings by level for nested rendering
  const renderHeadings = (items: Heading[], minLevel: number) => {
    const ListTag = ordered ? 'ol' : 'ul';
    
    return (
      <ListTag className="toc-list">
        {items.map((heading, index) => {
          const isActive = heading.id === activeId;
          const nextHeading = items[index + 1];
          const hasChildren = nextHeading && nextHeading.level > heading.level;
          
          // Get child headings
          const children: Heading[] = [];
          if (hasChildren) {
            let i = index + 1;
            while (i < items.length && items[i].level > heading.level) {
              if (items[i].level === heading.level + 1) {
                children.push(items[i]);
              }
              i++;
            }
          }
          
          return (
            <li key={heading.id} className="toc-item">
              <a
                href={`#${heading.id}`}
                className={`toc-link level-${heading.level} ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {heading.text}
              </a>
              {children.length > 0 && renderHeadings(children, heading.level + 1)}
            </li>
          );
        })}
      </ListTag>
    );
  };
  
  const containerClasses = sticky
    ? 'sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto'
    : '';
  
  return (
    <nav 
      className={`markdown-toc ${containerClasses} ${className}`}
      aria-label="Table of contents"
    >
      {title && (
        <h2 className="toc-title">{title}</h2>
      )}
      {renderHeadings(filteredHeadings, Math.min(...filteredHeadings.map(h => h.level)))}
    </nav>
  );
} 