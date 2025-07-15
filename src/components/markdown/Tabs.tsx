'use client';

import React, { useState, useMemo } from 'react';
import { ComponentProps } from '@/types/content';

interface TabsProps extends ComponentProps {
  defaultTab?: number;
  className?: string;
}

export default function Tabs({
  children,
  defaultTab = 0,
  className = ''
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Parse children to extract tab panels
  const tabs = useMemo(() => {
    const childArray = React.Children.toArray(children);
    const tabData: Array<{ title: string; content: any[] }> = [];
    
    let currentTab: { title: string; content: any[] } | null = null;
    
    const processChild = (child: any): void => {
      if (React.isValidElement(child)) {
        // Check various ways h3 might appear
        const isH3 = 
          (child as any).type === 'h3' || 
          (child as any).props?.mdxType === 'h3' ||
          (typeof (child as any).type === 'string' && (child as any).type.toLowerCase() === 'h3') ||
          (child as any).props?.tagName === 'h3';
        
        if (isH3) {
          // Save previous tab if exists
          if (currentTab && currentTab.content.length > 0) {
            tabData.push(currentTab);
          }
          
          // Extract title text from various formats
          let title = '';
          if (typeof (child as any).props.children === 'string') {
            title = (child as any).props.children;
          } else if (Array.isArray((child as any).props.children)) {
            title = (child as any).props.children
              .map((c: any) => typeof c === 'string' ? c : '')
              .join('');
          } else if ((child as any).props.children) {
            title = String((child as any).props.children);
          }
          
          currentTab = { title, content: [] };
        } else if (currentTab) {
          // Add content to current tab
          currentTab.content.push(child);
        } else {
          // No tab started yet, might be content before first h3
          // Start a default tab
          if (tabData.length === 0 && !currentTab) {
            currentTab = { title: 'Tab 1', content: [child] };
          }
        }
      } else if (currentTab) {
        // Add non-element content to current tab
        currentTab.content.push(child);
      }
    };
    
    // Process all children
    childArray.forEach(processChild);
    
    // Don't forget the last tab
    if (currentTab && (currentTab as { content: any[] }).content.length > 0) {
      tabData.push(currentTab as { title: string; content: any[] });
    }
    
    return tabData;
  }, [children]);
  
  if (tabs.length === 0) {
    // Provide helpful debug info
    const childTypes = React.Children.toArray(children).map((child: any) => {
      if (React.isValidElement(child)) {
        return `${child.type} (${typeof child.type})`;
      }
      return typeof child;
    });
    
    return (
      <div className="markdown-tabs-error border border-orange-500/50 bg-orange-900/20 rounded-lg p-4 my-4">
        <p className="text-orange-400 font-medium">No tabs found</p>
        <p className="text-orange-300 text-sm mt-2">
          Structure your content with h3 headings as tab titles:
        </p>
        <pre className="text-xs mt-2 text-gray-400 bg-gray-800/50 p-2 rounded">
{`:::tabs
### Tab Title 1
Content for tab 1

### Tab Title 2
Content for tab 2
:::`}
        </pre>
        <details className="mt-2">
          <summary className="text-xs text-gray-500 cursor-pointer">Debug info</summary>
          <pre className="text-xs text-gray-600 mt-1">
            Child types: {JSON.stringify(childTypes, null, 2)}
          </pre>
        </details>
      </div>
    );
  }
  
  return (
    <div className={`markdown-tabs ${className}`}>
      {/* Tab list */}
      <div className="markdown-tabs-list" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
              className={`markdown-tab-trigger ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          );
        })}
      </div>
      {/* Tab panels */}
      <div className="markdown-tabs-content">
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          return (
            <div
              key={index}
              role="tabpanel"
              id={`tabpanel-${index}`}
              aria-labelledby={`tab-${index}`}
              hidden={!isActive}
              className={`markdown-tab-panel ${isActive ? 'active' : ''}`}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}