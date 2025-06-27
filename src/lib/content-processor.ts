import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Content, ContentMeta, ContentType } from '@/types/content';
import { processMarkdown, calculateReadingTime, stripMarkdown } from './markdown';
import { validateContentMeta, extractExcerpt, getContentDirectory } from './content';

/**
 * Process raw content from a file into a structured Content object.
 * @param type The type of the content.
 *slug The slug of the content.
 * @returns A promise that resolves to the full Content object or null.
 */
async function processContent(
  type: ContentType,
  slug: string
): Promise<Content | null> {
  const directory = getContentDirectory(type);
  const filePath = path.join(directory, `${slug}.md`);
    
  if (!fs.existsSync(filePath)) {
    console.warn(`Content not found: ${type}/${slug}`);
    return null;
  }
    
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: markdown } = matter(fileContent);

  const { meta, errors } = validateContentMeta(frontmatter, type);
  
  if (errors.length > 0 || !meta) {
    console.error(`Content validation failed for ${type}/${slug}:`, errors);
    return null;
  }
  
  try {
    const { html, hast, components, headings } = await processMarkdown(markdown);
    const { minutes, text: readingTimeString } = calculateReadingTime(markdown);
    const excerpt = meta.summary || extractExcerpt(stripMarkdown(markdown));
    
    return {
      ...meta,
      content: markdown,
      htmlContent: html,
      hast,
      components,
      readingTime: Math.ceil(minutes),
      readingTimeString,
      excerpt,
      headings,
    };
  } catch (error) {
    console.error(`Error processing content ${type}/${slug}:`, error);
    return null;
  }
}

// In-memory cache for processed content
const contentCache = new Map<string, Content>();

/**
 * Get processed content by slug, using a cache in development.
 * @param type The type of the content.
 * @param slug The slug of the content.
 * @returns A promise that resolves to the full Content object or null.
 */
export async function getProcessedContent(
  type: ContentType,
  slug: string
): Promise<Content | null> {
  if (process.env.NODE_ENV === 'development') {
    const cacheKey = `${type}:${slug}`;
    if (contentCache.has(cacheKey)) {
      return contentCache.get(cacheKey)!;
    }
    const content = await processContent(type, slug);
    if (content) {
      contentCache.set(cacheKey, content);
    }
    return content;
  }
  
  // In production, always process fresh
  return processContent(type, slug);
} 