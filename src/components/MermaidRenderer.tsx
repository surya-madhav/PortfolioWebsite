'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ComponentProps } from '@/types/content';

interface MermaidRendererProps extends ComponentProps {
  chart?: string;
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
  caption?: string;
  height?: string;
  content?: string;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ 
  children,
  chart,
  theme = 'dark',
  caption,
  height,
  className = '',
  content
}) => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mermaidRef = useRef<HTMLDivElement>(null);
  
  // Get chart content from various sources
  const chartContent = chart || content || (typeof children === 'string' ? children : '') || '';

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mermaidRef.current || !chartContent.trim()) {
      return;
    }

    const loadMermaid = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : theme,
          securityLevel: 'loose',
          fontFamily: 'ui-monospace, monospace',
          themeVariables: theme === 'dark' ? {
            primaryColor: '#1f2937',
            primaryTextColor: '#f3f4f6',
            primaryBorderColor: '#374151',
            lineColor: '#6b7280',
            secondaryColor: '#374151',
            tertiaryColor: '#1f2937',
            background: '#111827',
            mainBkg: '#1f2937',
            secondBkg: '#374151',
            tertiaryBkg: '#111827',
            darkMode: true
          } : {}
        });

        const id = `mermaid-${Math.random().toString(36).substring(7)}`;
        const { svg } = await mermaid.render(id, chartContent.trim());

        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
          
          // Apply height if specified
          if (height) {
            const svgEl = mermaidRef.current.querySelector('svg');
            if (svgEl) {
              svgEl.style.height = height;
              svgEl.style.width = '100%';
            }
          }
        }
        setIsLoading(false);
      } catch (e: any) {
        console.error("Mermaid rendering error:", e);
        setError(`Failed to render diagram: ${e.message || 'Unknown error'}`);
        setIsLoading(false);
      }
    };
    
    loadMermaid();

  }, [isClient, chartContent, theme, height]);

  if (!isClient) {
    return (
      <div className="mermaid-loading bg-gray-800/50 rounded-lg p-8 animate-pulse" style={{ height: height || '200px' }}>
        <div className="text-center text-gray-400">Loading diagram...</div>
      </div>
    );
  }

  return (
    <figure className={`mermaid-container my-8 ${className}`}>
      {error ? (
        <div className="mermaid-error border border-red-500/50 bg-red-900/20 rounded-lg p-4">
          <p className="text-red-400 font-medium mb-2">{error}</p>
          <details className="mt-2">
            <summary className="text-sm text-red-300 cursor-pointer">Show diagram code</summary>
            <pre className="mt-2 text-xs bg-gray-800/50 p-2 rounded overflow-x-auto">
              <code>{chartContent}</code>
            </pre>
          </details>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="mermaid-loading bg-gray-800/50 rounded-lg p-8 animate-pulse" style={{ height: height || '200px' }}>
              <div className="text-center text-gray-400">Rendering diagram...</div>
            </div>
          )}
          <div
            ref={mermaidRef}
            className={`mermaid-diagram ${isLoading ? 'hidden' : ''}`}
            style={{ minHeight: '100px' }}
          />
        </>
      )}
      {caption && !error && (
        <figcaption className="mermaid-caption text-sm text-gray-400 text-center mt-4 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MermaidRenderer;
