import React, { Fragment } from 'react';
import { Content } from '@/types/content';
import { initializeRegistry } from '@/lib/components/registry';
import { generateTocHtml } from '@/lib/markdown';
import ComponentRenderer from '@/components/markdown/ComponentRenderer';

interface MarkdownContentProps {
  content: Content;
  showToc?: boolean;
  className?: string;
}

// Initialize the component registry for the server
initializeRegistry();

// List of void/self-closing HTML elements
const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

// --- Manual HAST to React Renderer ---

function renderNode(node: any, content: Content): React.ReactNode {
  if (node.type === 'root') {
    return <>{node.children.map((child: any, i: number) => <Fragment key={i}>{renderNode(child, content)}</Fragment>)}</>;
  }

  if (node.type === 'element') {
    const { tagName, properties, children } = node;
    const { 'data-component-id': componentId, ...rest } = properties || {};

    if (componentId && content.components?.has(componentId)) {
      const componentData = content.components.get(componentId)!;
      
      // For container directives with children, render the children
      const hasChildren = children && children.length > 0 && 
        children.some((child: any) => child.type !== 'text' || child.value.trim() !== '');
      
      if (hasChildren) {
        // Filter out closing delimiter text nodes (:::)
        const filteredChildren = children.filter((child: any) => {
          if (child.type === 'text' && child.value.trim() === ':::') {
            return false;
          }
          return true;
        });
        
        const componentChildren = filteredChildren.map((child: any, i: number) => 
          <Fragment key={i}>{renderNode(child, content)}</Fragment>
        );
        
        return (
          <ComponentRenderer
            name={componentData.name}
            props={componentData.props}
            content={componentData.content}
          >
            {componentChildren}
          </ComponentRenderer>
        );
      } else {
        // For leaf directives or container directives with content property
        return (
          <ComponentRenderer
            name={componentData.name}
            props={componentData.props}
            content={componentData.content}
          />
        );
      }
    }
    
    // Convert HAST properties to React properties
    const reactProps: { [key: string]: any } = {};
    for (const key in rest) {
        if(key === 'className'){
            reactProps.className = Array.isArray(rest[key]) ? rest[key].join(' ') : rest[key];
        } else {
             reactProps[key] = rest[key];
        }
    }

    // Check if this is a void element
    if (VOID_ELEMENTS.has(tagName)) {
      // Void elements should not have children
      return React.createElement(tagName, reactProps);
    }

    // Filter out standalone ::: text nodes
    let childElements = null;
    if (children && children.length > 0) {
      const filteredChildren = children.filter((child: any) => {
        // Skip text nodes that are just ":::"
        if (child.type === 'text' && child.value.trim() === ':::') {
          return false;
        }
        return true;
      });
      
      if (filteredChildren.length > 0) {
        childElements = filteredChildren.map((child: any, i: number) => 
          <Fragment key={i}>{renderNode(child, content)}</Fragment>
        );
      }
    }

    return React.createElement(
      tagName,
      reactProps,
      childElements
    );
  }

  if (node.type === 'text') {
    // Filter out standalone ::: delimiters
    if (node.value.trim() === ':::') {
      return null;
    }
    return node.value;
  }

  return null;
}

export default function MarkdownContent({ 
  content, 
  showToc = true,
  className = '' 
}: MarkdownContentProps) {
  
  const tocHtml = (showToc && content.toc && content.headings && content.headings.length > 0)
    ? generateTocHtml(content.headings)
    : null;

  const renderedContent = renderNode(content.hast, content);

  return (
    <article className={`prose-container ${className}`}>
      {tocHtml && (
        <div 
          className="toc-container"
          dangerouslySetInnerHTML={{ __html: tocHtml }}
        />
      )}
      
      <div className="prose-invert max-w-none">
        {renderedContent}
      </div>
      
      {content.readingTimeString && (
        <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400">
          Reading Time: {content.readingTimeString}
        </div>
      )}
    </article>
  );
}
