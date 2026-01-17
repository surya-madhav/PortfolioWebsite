'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComponentProps } from '@/types/content';

interface CodeBlockProps extends ComponentProps {
  lang?: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlight?: string;
  startLine?: number;
  theme?: 'dark' | 'light';
  content?: string;
}

export default function CodeBlock({ 
  children,
  lang,
  language,
  title,
  showLineNumbers = false,
  highlight,
  startLine = 1,
  theme = 'dark',
  className = '',
  content
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  // Use lang or language prop
  const codeLang = lang || language || 'plaintext';
  
  // Parse highlight ranges (e.g., "1-3,5,7-9")
  const highlightLines = new Set<number>();
  if (highlight) {
    highlight.split(',').forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          highlightLines.add(i);
        }
      } else {
        highlightLines.add(Number(part));
      }
    });
  }
  
  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Load Prism for syntax highlighting
  useEffect(() => {
    if (!mounted) return;
    
    const loadPrism = async () => {
      if (typeof window !== 'undefined' && !window.Prism) {
        // Load Prism CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
        document.head.appendChild(link);
        
        // Load Prism JS
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
        script.async = true;
        document.body.appendChild(script);
        
        // Load language component if needed
        if (codeLang !== 'plaintext') {
          const langScript = document.createElement('script');
          langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${codeLang}.min.js`;
          langScript.async = true;
          document.body.appendChild(langScript);
        }
        
        // Wait for Prism to load
        script.onload = () => {
          if (window.Prism && codeRef.current) {
            window.Prism.highlightElement(codeRef.current);
          }
        };
      } else if (window.Prism && codeRef.current) {
        window.Prism.highlightElement(codeRef.current);
      }
    };
    
    loadPrism();
  }, [mounted, codeLang, children, content]);
  
  const handleCopy = async () => {
    if (!codeRef.current) return;
    
    try {
      const text = codeRef.current.textContent || '';
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };
  
  // Get code content as string - prioritize content prop, then children
  const codeContent = content || (typeof children === 'string' 
    ? children 
    : React.Children.toArray(children).join(''));
  
  // Split into lines for line numbers
  // Ensure that blank lines and trailing newlines are preserved.
  const lines = (codeContent.endsWith('\n') ? codeContent : codeContent + '\n').split('\n');
  
  return (
    <div className={`markdown-code-block ${className}`}>
      {/* Header */}
      {(title || codeLang !== 'plaintext') && (
        <div className="markdown-code-header">
          <div className="flex items-center gap-2">
            {title && (
              <span className="markdown-code-title">{title}</span>
            )}
            {codeLang !== 'plaintext' && !title && (
              <span className="markdown-code-title">{codeLang}</span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="markdown-code-copy"
            aria-label="Copy code"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      
      {/* Code content */}
      <div className="markdown-code-content">
        <pre className={`language-${codeLang} ${showLineNumbers ? 'line-numbers' : ''}`}>
          {showLineNumbers ? (
            <div className="flex">
              {/* Line numbers */}
              <div className="select-none pr-4 text-gray-500 text-right">
                {lines.map((_, index) => {
                  const lineNum = index + startLine;
                  const isHighlighted = highlightLines.has(lineNum);
                  return (
                    <div
                      key={index}
                      className={`${isHighlighted ? 'text-orange-400' : ''}`}
                    >
                      {lineNum}
                    </div>
                  );
                })}
              </div>
              
              {/* Code with highlighting */}
              <code ref={codeRef} className={`language-${codeLang} flex-1`}>
                {lines.map((line, index) => {
                  const lineNum = index + startLine;
                  const isHighlighted = highlightLines.has(lineNum);
                  return (
                    <div
                      key={index}
                      className={`${isHighlighted ? 'bg-orange-500/10 -mx-4 px-4' : ''}`}
                    >
                      {line || '\n'}
                    </div>
                  );
                })}
              </code>
            </div>
          ) : (
            <code ref={codeRef} className={`language-${codeLang}`}>
              {codeContent}
            </code>
          )}
        </pre>
      </div>
    </div>
  );
}

// Declare Prism types
declare global {
  interface Window {
    Prism: any;
  }
}