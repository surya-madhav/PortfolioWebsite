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
      return (
        <ComponentRenderer
          name={componentData.name}
          props={componentData.props}
          content={componentData.content}
        />
      );
    }
    
    // Convert HAST properties to React properties
    const reactProps: { [key: string]: any } = {};
    for (const key in rest) {
        if(key === 'className'){
            reactProps.className = rest[key].join(' ');
        } else {
             reactProps[key] = rest[key];
        }
    }

    return React.createElement(
      tagName,
      reactProps,
      children.map((child: any, i: number) => <Fragment key={i}>{renderNode(child, content)}</Fragment>)
    );
  }

  if (node.type === 'text') {
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
      
      <div className="prose dark:prose-invert max-w-none">
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