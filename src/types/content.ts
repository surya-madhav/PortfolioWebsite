// Content type definitions for the flat-file CMS
export type ContentType = 'project' | 'note' | 'blog';

// SEO metadata interface
export interface SEOMetadata {
  title?: string;              // Custom SEO title (falls back to content title)
  description?: string;        // Meta description (falls back to summary)
  keywords?: string[];         // SEO keywords
  image?: string;             // OG image path
  canonical?: string;         // Canonical URL
  noindex?: boolean;          // Prevent indexing
  nofollow?: boolean;         // Prevent following links
}

// Hero content configuration
export interface HeroContent {
  type: 'image' | 'video' | 'code';  // Hero content type
  src: string;                       // Source path/URL
  alt?: string;                      // Alt text for images
  caption?: string;                  // Optional caption
  position?: 'center' | 'top' | 'bottom';  // Focal point
}

// Base content metadata interface
export interface ContentMeta {
  // Required fields
  title: string;              // Display title
  slug: string;               // URL slug
  date: string;               // ISO date string
  type: ContentType;          // Content type
  published: boolean;         // Publication status
  
  // SEO configuration
  seo: SEOMetadata;
  
  // Content metadata
  summary: string;            // Brief description
  tags: string[];             // Content tags
  categories: string[];       // Content categories
  author?: string;            // Author name
  featured?: boolean;         // Featured flag
  updated?: string;           // Last update date
  
  // Visual elements
  thumbnail?: string;         // Thumbnail image path
  hero?: HeroContent;         // Hero configuration
  
  // Project-specific fields (optional for other types)
  techStack?: string[];       // Technology stack
  githubUrl?: string;         // GitHub repository
  demoUrl?: string;          // Live demo URL
  videoUrl?: string;         // Video URL (YouTube, etc)
  duration?: string;         // Project duration
  role?: string;             // Your role in project
  team?: string[];           // Team members
  
  // Content features
  toc?: boolean;             // Show table of contents
  comments?: boolean;        // Enable comments (future)
  readingTime?: boolean;     // Show reading time
  relatedContent?: string[]; // Related content slugs
  
  // Analytics
  trackingId?: string;       // Custom tracking ID
  experiments?: string[];    // A/B test experiments

  // Added for metadata-only fetches
  readingTimeString?: string; // Formatted reading time
  excerpt?: string;           // Auto-generated excerpt
}

// Processed content interface
export interface Content extends Omit<ContentMeta, 'readingTime'> {
  content: string;           // Raw markdown content
  htmlContent: string;       // Processed HTML for client-side hydration
  hast: any;                 // Processed HAST for server-side rendering
  components?: Map<string, ComponentInstance>; // Map of used components
  readingTime: number;       // Estimated reading time (minutes)
  readingTimeString?: string; // Formatted reading time
  excerpt: string;           // Auto-generated excerpt
  headings: Heading[];       // Extracted headings for TOC
}

// Heading structure for table of contents
export interface Heading {
  id: string;               // Anchor ID
  text: string;             // Heading text
  level: number;            // Heading level (1-6)
}

// Component instance in markdown
export interface ComponentInstance {
  id:string;               // Unique component ID
  name: string;             // Component name
  props: Record<string, any>; // Component props
  content?: string;         // Component content
  children?: ComponentInstance[]; // Nested components
  position: {
    start: number;          // Start position in markdown
    end: number;            // End position in markdown
  };
}

// Content validation error
export interface ValidationError {
  field: string;            // Field name
  message: string;          // Error message
  value?: any;             // Invalid value
}

// Content query options
export interface ContentQueryOptions {
  limit?: number;           // Result limit
  offset?: number;          // Pagination offset
  tags?: string[];          // Filter by tags
  categories?: string[];    // Filter by categories
  featured?: boolean;       // Filter by featured
  published?: boolean;      // Filter by published
  sortBy?: 'date' | 'updated' | 'title'; // Sort field
  sortOrder?: 'asc' | 'desc'; // Sort order
}

// Props for custom markdown components
export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// Re-export tech stack types for compatibility
export type { TechStackItem } from './techstack'; 