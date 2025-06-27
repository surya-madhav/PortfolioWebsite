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

// --- Types and Interfaces ---

interface MarkdownProcessResult {
  html: string;
  hast: any;
  components: Map<string, ComponentInstance>;
  headings: Heading[];
}

// Custom Remark plugin to parse ::: directives
const remarkCustomDirectives: Plugin = () => {
  return (tree, file) => {
    const components = new Map<string, ComponentInstance>();
    let componentCounter = 0;

    visit(tree, 'paragraph', (node: any, index, parent) => {
      const text = node.children.map((c:any) => c.value).join('');
      if (!text.startsWith(':::')) {
        return;
      }
      
      const componentRegex = /:::\s*(\w+)(?:\[([^\]]*)\])?(?:\s*({.*}))?\s*\n([\s\S]*?)\n:::/g;
      
      let match;

      if ((match = componentRegex.exec(text)) !== null) {
        const [fullMatch, name, inlineContent, propsString, content] = match;

        const id = `component-${componentCounter++}`;
        const props = propsString ? JSON.parse(propsString) : {};
        
        const componentInstance: ComponentInstance = {
          id,
          name,
          props,
          content: content.trim(),
          children: [], 
          position: { start: node.position.start.offset, end: node.position.end.offset },
        };
        components.set(id, componentInstance);

        const placeholderNode = {
          type: 'html',
          value: `<div data-component-id="${id}"></div>`
        };
        
        parent.children.splice(index, 1, placeholderNode);
        
        if (!file.data.components) {
          file.data.components = new Map<string, ComponentInstance>();
        }
        components.forEach((value, key) => (file.data.components as Map<string, ComponentInstance>).set(key, value));
      }
    });
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
    .use(remarkCustomDirectives)
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
    .replace(/#+\s/g, '')                   // Headers
    .replace(/>\s/g, '')                    // Blockquotes
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