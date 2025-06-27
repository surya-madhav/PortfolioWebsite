import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { unified, Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import { Node } from 'unist';
import {
  ComponentInstance,
  Heading,
  ContentType,
} from '@/types/content';
import readingTime from 'reading-time';
import remarkDirective from 'remark-directive';
import { toString } from 'mdast-util-to-string';

// --- Types and Interfaces ---

interface MarkdownProcessResult {
  html: string;
  hast: any;
  components: Map<string, ComponentInstance>;
  headings: Heading[];
}

// Custom Remark plugin to handle attributes and create component instances
const remarkComponentCompiler: Plugin = () => {
  return (tree, file) => {
    const components = new Map<string, ComponentInstance>();
    let componentCounter = 0;

    visit(tree, (node: any) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const id = `component-${componentCounter++}`;
        const data = node.data || (node.data = {});
        const attributes = node.attributes || {};

        // Debug: Log the node structure
        if (node.name === 'columns' || node.name === 'tabs') {
          console.log(`\n=== ${node.name.toUpperCase()} DIRECTIVE ===`);
          console.log('Node type:', node.type);
          console.log('Attributes:', attributes);
          console.log('Children count:', node.children?.length);
          console.log('Children types:', node.children?.map((c: any) => c.type));
          console.log('First few children:', node.children?.slice(0, 3));
        }

        // Parse attributes
        let props: Record<string, any> = {};
        for (const [key, value] of Object.entries(attributes)) {
          if (value === '' || value === true) {
            props[key] = true;
          } else {
            props[key] = value;
          }
        }
        
        // Extract content for specific components
        let content = '';
        
        // For components that need text content (like mermaid)
        if (node.name === 'mermaid' || node.name === 'code') {
          if (node.type === 'containerDirective' && node.children) {
            const extractText = (nodes: any[]): string => {
              return nodes.map((child: any) => {
                if (child.type === 'text') {
                  return child.value;
                } else if (child.type === 'paragraph' && child.children) {
                  return extractText(child.children);
                } else if (child.type === 'code') {
                  return child.value;
                } else if (child.children) {
                  return extractText(child.children);
                }
                return '';
              }).join('\n');
            };
            
            content = extractText(node.children).trim();
          }
        }
        
        // For image captions
        if (node.name === 'image' && node.children) {
          // Look for text after "caption:" or just get all text
          const textContent = toString(node);
          if (textContent.includes('caption:')) {
            content = textContent.split('caption:')[1]?.trim() || '';
          } else {
            content = textContent;
          }
        }

        const componentInstance: ComponentInstance = {
          id,
          name: node.name,
          props,
          content,
          position: { 
            start: node.position?.start?.offset || 0, 
            end: node.position?.end?.offset || 0 
          },
        };
        
        components.set(id, componentInstance);
        
        // For container directives, we want to keep the children for rendering
        // but mark it as a component
        data.hName = 'div';
        data.hProperties = { 
          'data-component-id': id
        };
      }
    });

    (file.data as any).components = components;
  };
};


// --- Main Processing Function ---

/**
 * Processes markdown content to extract components, headings, and convert to HTML.
 * @param markdown The raw markdown string.
 * @returns An object containing the processed HTML, a map of component instances, and a list of headings.
 */
export async function processMarkdown(
  markdown: string
): Promise<MarkdownProcessResult> {
  const headings: Heading[] = [];
  let hast: any;

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective) // Use the official directive plugin
    .use(remarkComponentCompiler) // Our custom plugin to process the directives
    .use(() => (tree) => {
      visit(tree, 'heading', (node: any) => {
        const depth = node.depth;
        const text = node.children
          .map((child: any) => (child.type === 'text' ? child.value : ''))
          .join('');
        
        if (text) {
          headings.push({
            level: depth,
            text: text,
            id: text.toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, ""),
          });
        }
      });
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(() => (tree) => {
      hast = tree;
      return tree;
    })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const file = await processor.process(markdown);
  const html = String(file);
  const components = (file.data.components || new Map()) as Map<string, ComponentInstance>;

  return { html, hast, components, headings };
}


// --- Utility Functions ---

/**
 * Calculates the estimated reading time for a given text.
 * @param text The text to analyze.
 * @returns An object with reading time statistics.
 */
export function calculateReadingTime(text: string) {
  return readingTime(text);
}

/**
 * Strips markdown syntax from a string to get plain text.
 * This is a simplified version and might not cover all edge cases.
 * @param markdown The markdown string.
 * @returns Plain text representation.
 */
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/(\*\*|__)(.*?)\1/g, '$2')      // Bold
    .replace(/(\*|_)(.*?)\1/g, '$2')        // Italic
    .replace(/`([^`]+)`/g, '$1')            // Inline code
    .replace(/```[\s\S]*?```/g, '')          // Code blocks
    .replace(/#+\s/g, '')                    // Headers
    .replace(/^>\s/g, '')                    // Blockquotes
    .replace(/!\[.*?\]\(.*?\)/g, '')        // Images
    .replace(/(\r\n|\n|\r)/gm, ' ');        // Newlines
}

/**
 * Generates a simple HTML table of contents from a list of headings.
 * @param headings The array of extracted headings.
 * @returns An HTML string for the ToC.
 */
export function generateTocHtml(headings: Heading[]): string {
  if (headings.length === 0) return '';

  const tocItems = headings
    .map(
      (heading) =>
        `<li class="toc-level-${heading.level}"><a href="#${heading.id}">${heading.text}</a></li>`
    )
    .join('');

  return `<nav class="toc"><h3 class="toc-title">Table of Contents</h3><ul>${tocItems}</ul></nav>`;
}
