import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { 
  Content, 
  ContentMeta, 
  ContentType, 
  ContentQueryOptions,
  ValidationError,
  Heading
} from '@/types/content';

// Content directory configuration
const CONTENT_ROOT = path.join(process.cwd(), 'content');

// Content type to directory mapping
const CONTENT_DIRECTORIES: Record<ContentType, string> = {
  project: 'projects',
  note: 'notes',
  blog: 'blog'
};

/**
 * Get the directory path for a content type
 */
function getContentDirectory(type: ContentType): string {
  return path.join(CONTENT_ROOT, CONTENT_DIRECTORIES[type]);
}

/**
 * Validate content metadata against requirements
 */
export function validateContentMeta(
  data: any,
  type: ContentType
): { meta: ContentMeta | null; errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  
  // Required field validation
  const requiredFields = ['title', 'slug', 'date', 'published', 'summary', 'tags'];
  
  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push({
        field,
        message: `${field} is required`,
        value: data[field]
      });
    }
  }
  
  // Type validation
  if (data.date && isNaN(Date.parse(data.date))) {
    errors.push({
      field: 'date',
      message: 'date must be a valid ISO date string',
      value: data.date
    });
  }
  
  if (data.published !== undefined && typeof data.published !== 'boolean') {
    errors.push({
      field: 'published',
      message: 'published must be a boolean',
      value: data.published
    });
  }
  
  // Array field validation
  const arrayFields = ['tags', 'categories', 'techStack', 'team', 'experiments'];
  for (const field of arrayFields) {
    if (data[field] && !Array.isArray(data[field])) {
      errors.push({
        field,
        message: `${field} must be an array`,
        value: data[field]
      });
    }
  }
  
  // SEO validation
  if (!data.seo) {
    data.seo = {}; // Initialize with empty object
  }
  
  // Return early if there are errors
  if (errors.length > 0) {
    return { meta: null, errors };
  }
  
  // Construct validated metadata
  const meta: ContentMeta = {
    title: data.title,
    slug: data.slug,
    date: data.date,
    type,
    published: data.published,
    seo: {
      title: data.seo.title || data.title,
      description: data.seo.description || data.summary,
      keywords: data.seo.keywords || data.tags,
      image: data.seo.image,
      canonical: data.seo.canonical,
      noindex: data.seo.noindex || false,
      nofollow: data.seo.nofollow || false
    },
    summary: data.summary,
    tags: data.tags || [],
    categories: data.categories || [],
    author: data.author,
    featured: data.featured || false,
    updated: data.updated,
    thumbnail: data.thumbnail,
    hero: data.hero,
    techStack: data.techStack,
    githubUrl: data.githubUrl,
    demoUrl: data.demoUrl,
    videoUrl: data.videoUrl,
    duration: data.duration,
    role: data.role,
    team: data.team,
    toc: data.toc !== false, // Default true
    comments: data.comments || false,
    readingTime: data.readingTime !== false, // Default true
    relatedContent: data.relatedContent,
    trackingId: data.trackingId,
    experiments: data.experiments
  };
  
  return { meta, errors: [] };
}

/**
 * Extract excerpt from content
 */
export function extractExcerpt(content: string, length: number = 160): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/^#+\s+/gm, '')           // Headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1')     // Italic  
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/`([^`]+)`/g, '$1')       // Inline code
    .replace(/```[\s\S]*?```/g, '')    // Code blocks
    .replace(/^>\s+/gm, '')            // Blockquotes
    .replace(/!\[.*?\]\(.*?\)/g, '')   // Images
    .replace(/\n{2,}/g, ' ')           // Multiple newlines
    .trim();
  
  if (plainText.length <= length) {
    return plainText;
  }
  
  // Cut at word boundary
  const truncated = plainText.substring(0, length);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Get content by slug
 */
export async function getContentBySlug(
  type: ContentType,
  slug: string
): Promise<Content | null> {
  try {
    const directory = getContentDirectory(type);
    const filePath = path.join(directory, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Content not found: ${type}/${slug}`);
      return null;
    }
    
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    // Validate metadata
    const { meta, errors } = validateContentMeta(data, type);
    
    if (errors.length > 0) {
      console.error(`Validation errors for ${type}/${slug}:`, errors);
      return null;
    }
    
    if (!meta) {
      return null;
    }
    
    // Calculate reading time
    const { minutes } = readingTime(content);
    
    // Extract excerpt
    const excerpt = meta.summary || extractExcerpt(content);
    
    // TODO: Process markdown to HTML (Epic 2)
    const htmlContent = content; // Placeholder
    const headings: Heading[] = []; // Placeholder
    
    return {
      ...meta,
      content,
      htmlContent,
      readingTime: Math.ceil(minutes),
      excerpt,
      headings
    };
  } catch (error) {
    console.error(`Error loading content ${type}/${slug}:`, error);
    return null;
  }
}

/**
 * Get all content of a specific type
 */
export async function getAllContent(
  type?: ContentType,
  options: ContentQueryOptions = {}
): Promise<Content[]> {
  try {
    const types = type ? [type] : ['project', 'note', 'blog'] as ContentType[];
    const allContent: Content[] = [];
    
    for (const contentType of types) {
      const directory = getContentDirectory(contentType);
      
      // Check if directory exists
      if (!fs.existsSync(directory)) {
        continue;
      }
      
      // Read all markdown files
      const files = fs.readdirSync(directory)
        .filter(file => file.endsWith('.md'));
      
      // Load each file
      for (const file of files) {
        const slug = file.replace('.md', '');
        const content = await getContentBySlug(contentType, slug);
        
        if (content) {
          allContent.push(content);
        }
      }
    }
    
    // Apply filters
    let filtered = allContent;
    
    if (options.published !== undefined) {
      filtered = filtered.filter(c => c.published === options.published);
    }
    
    if (options.featured !== undefined) {
      filtered = filtered.filter(c => c.featured === options.featured);
    }
    
    if (options.tags && options.tags.length > 0) {
      filtered = filtered.filter(c => 
        options.tags!.some(tag => c.tags.includes(tag))
      );
    }
    
    if (options.categories && options.categories.length > 0) {
      filtered = filtered.filter(c =>
        options.categories!.some(cat => c.categories.includes(cat))
      );
    }
    
    // Sort content
    const sortBy = options.sortBy || 'date';
    const sortOrder = options.sortOrder || 'desc';
    
    filtered.sort((a, b) => {
      let aVal: any, bVal: any;
      
      switch (sortBy) {
        case 'title':
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
          break;
        case 'updated':
          aVal = new Date(a.updated || a.date).getTime();
          bVal = new Date(b.updated || b.date).getTime();
          break;
        default: // date
          aVal = new Date(a.date).getTime();
          bVal = new Date(b.date).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    // Apply pagination
    if (options.offset || options.limit) {
      const start = options.offset || 0;
      const end = options.limit ? start + options.limit : undefined;
      filtered = filtered.slice(start, end);
    }
    
    return filtered;
  } catch (error) {
    console.error('Error loading content:', error);
    return [];
  }
}

/**
 * Get static paths for a content type
 */
export async function getContentPaths(
  type: ContentType
): Promise<{ params: { slug: string } }[]> {
  const directory = getContentDirectory(type);
  
  if (!fs.existsSync(directory)) {
    return [];
  }
  
  const files = fs.readdirSync(directory)
    .filter(file => file.endsWith('.md'));
  
  return files.map(file => ({
    params: { slug: file.replace('.md', '') }
  }));
}

/**
 * Get related content based on tags and categories
 */
export async function getRelatedContent(
  current: Content,
  limit: number = 3
): Promise<Content[]> {
  // Get all content of the same type
  const allContent = await getAllContent(current.type, {
    published: true
  });
  
  // Filter out current content
  const otherContent = allContent.filter(c => c.slug !== current.slug);
  
  // Score each content by relevance
  const scored = otherContent.map(content => {
    let score = 0;
    
    // Score by matching tags
    const matchingTags = content.tags.filter(tag => 
      current.tags.includes(tag)
    );
    score += matchingTags.length * 2;
    
    // Score by matching categories
    const matchingCategories = content.categories.filter(cat =>
      current.categories.includes(cat)
    );
    score += matchingCategories.length;
    
    // Boost if explicitly related
    if (current.relatedContent?.includes(content.slug)) {
      score += 5;
    }
    
    return { content, score };
  });
  
  // Sort by score and return top matches
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter(item => item.score > 0)
    .map(item => item.content);
}

/**
 * Search content by query
 */
export async function searchContent(
  query: string,
  type?: ContentType
): Promise<Content[]> {
  const allContent = await getAllContent(type, { published: true });
  const searchTerms = query.toLowerCase().split(' ');
  
  const scored = allContent.map(content => {
    let score = 0;
    const searchableText = [
      content.title,
      content.summary,
      content.tags.join(' '),
      content.categories.join(' '),
      content.content
    ].join(' ').toLowerCase();
    
    // Score each search term
    for (const term of searchTerms) {
      // Title match (highest score)
      if (content.title.toLowerCase().includes(term)) {
        score += 10;
      }
      
      // Summary match
      if (content.summary.toLowerCase().includes(term)) {
        score += 5;
      }
      
      // Tag match
      if (content.tags.some(tag => tag.toLowerCase().includes(term))) {
        score += 3;
      }
      
      // Content match
      const contentMatches = (searchableText.match(new RegExp(term, 'g')) || []).length;
      score += Math.min(contentMatches, 5); // Cap at 5 points per term
    }
    
    return { content, score };
  });
  
  // Return content with score > 0, sorted by score
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.content);
}