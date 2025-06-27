'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ComponentProps } from '@/types/content';

interface MermaidWrapperProps extends ComponentProps {
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
  caption?: string;
  height?: string;
  content?: string;
}

export default function MermaidWrapper({ 
  children,
  theme = 'dark',
  caption,
  height,
  className = '',
  content
}: MermaidWrapperProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mermaidRef = useRef<HTMLDivElement>(null);
  const renderIdRef = useRef<string>('');
  
  // Get chart content from various sources
  const chartContent = content || (typeof children === 'string' ? children : '');

  useEffect(() => {
    if (!chartContent.trim()) {
      setError('No diagram content provided');
      setIsLoading(false);
      return;
    }

    const renderMermaid = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const mermaid = (await import('mermaid')).default;
        
        // Configure mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'base',
          securityLevel: 'loose',
          fontFamily: 'ui-monospace, monospace',
          themeVariables: theme === 'dark' ? {
            primaryColor: '#fb923c',
            primaryTextColor: '#f3f4f6',
            primaryBorderColor: '#374151',
            lineColor: '#6b7280',
            secondaryColor: '#374151',
            tertiaryColor: '#1f2937',
            background: '#111827',
            mainBkg: '#1f2937',
            secondBkg: '#374151',
            tertiaryBkg: '#111827',
            darkMode: true,
            nodeBorder: '#374151',
            clusterBkg: '#1f2937',
            clusterBorder: '#374151',
            defaultLinkColor: '#fb923c',
            textColor: '#f3f4f6',
            labelBackground: '#1f2937',
            edgeLabelBackground: '#1f2937'
          } : {}
        });

        // Generate unique ID
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        renderIdRef.current = id;
        
        // Clean up any previous diagram
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = '';
        }
        
        const { svg } = await mermaid.render(id, chartContent.trim());

        if (mermaidRef.current && renderIdRef.current === id) {
          mermaidRef.current.innerHTML = svg;
          
          // Apply custom styles to SVG
          const svgEl = mermaidRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = height || 'auto';
          }
        }
        setIsLoading(false);
      } catch (e: any) {
        console.error("Mermaid rendering error:", e);
        setError(`Failed to render diagram: ${e.message || 'Unknown error'}`);
        setIsLoading(false);
      }
    };
    
    renderMermaid();
  }, [chartContent, theme, height]);

  if (error) {
    return (
      <figure className={`mermaid-container my-8 ${className}`}>
        <div className="mermaid-error border border-red-500/50 bg-red-900/20 rounded-lg p-4">
          <p className="text-red-400 font-medium mb-2">{error}</p>
          {chartContent && (
            <details className="mt-2">
              <summary className="text-sm text-red-300 cursor-pointer">Show diagram code</summary>
              <pre className="mt-2 text-xs bg-gray-800/50 p-2 rounded overflow-x-auto">
                <code>{chartContent}</code>
              </pre>
            </details>
          )}
        </div>
      </figure>
    );
  }

  return (
    <figure className={`mermaid-container my-8 ${className}`}>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800/50 rounded-lg p-8 animate-pulse flex items-center justify-center" style={{ minHeight: height || '200px' }}>
            <div className="text-center text-gray-400">Rendering diagram...</div>
          </div>
        )}
        <div
          ref={mermaidRef}
          className={`mermaid-diagram ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          style={{ minHeight: height || '100px' }}
        />
      </div>
      {caption && !isLoading && (
        <figcaption className="text-sm text-gray-400 text-center mt-4 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
