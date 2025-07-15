import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { Content, ContentMeta, ContentType, ValidationError } from '@/types/content';
import { processMarkdown, calculateReadingTime, stripMarkdown } from './markdown';
import { extractExcerpt, getContentDirectory, validateContentMeta } from './content';

/**
 * Get and validate the frontmatter for a piece of content.
 * This is a lightweight version that does not process the markdown body.
 */
export const getContentMeta = cache((
  type: ContentType,
  slug: string
): ContentMeta | null => {
  const directory = getContentDirectory(type);
  const filePath = path.join(directory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    console.warn(`Content meta not found: ${type}/${slug}`);
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: markdown } = matter(fileContent);

  const { meta, errors } = validateContentMeta(frontmatter, type);

  if (errors.length > 0 || !meta) {
    console.error(`Content validation failed for ${type}/${slug}:`, errors);
    return null;
  }

  // Enhance meta with reading time and excerpt
  const { text: readingTimeString } = calculateReadingTime(markdown);
  const excerpt = meta.summary || extractExcerpt(stripMarkdown(markdown));

  return {
    ...meta,
    readingTimeString,
    excerpt,
  };
});

/**
 * Process raw content from a file into a structured Content object.
 * @param type The type of the content.
 * @param slug The slug of the content.
 * @returns A promise that resolves to the full Content object or null.
 */
export const getProcessedContent = cache(async (
  type: ContentType,
  slug: string
): Promise<Content | null> => {
    
  const meta = getContentMeta(type, slug);

  if (!meta) {
    return null;
  }

  // Find the file path again to read content for processing
  const directory = getContentDirectory(type);
  const filePath = path.join(directory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null; // Should not happen if meta was found
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content: markdown } = matter(fileContent);

  try {
    const { html, hast, components, headings } = await processMarkdown(markdown);
    const { minutes } = calculateReadingTime(markdown);
    
    return {
      ...meta,
      excerpt: meta.excerpt || '',
      content: markdown,
      htmlContent: html,
      hast,
      components,
      readingTime: Math.ceil(minutes),
      headings,
    };
  } catch (error) {
    console.error(`Error processing content ${type}/${slug}:`, error);
    return null;
  }
}); 