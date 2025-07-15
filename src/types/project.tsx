import { Content } from './content';
import { TechStackItem } from './techstack';

// Legacy Project interface for backward compatibility
// New code should use Content interface
export interface Project extends Omit<Content, 'type' | 'techStack'> {
  id: number;              // Legacy ID field
  image: string;           // Legacy image field (use thumbnail)
  alt: string;             // Legacy alt field
  href: string;            // Legacy href field
  show: boolean;           // Legacy show field (use published)
  description: string;     // Legacy description (use summary)
  markdownContent?: string; // Legacy markdown content
  markdownPath?: string;   // Legacy markdown path
  techStack?: (string | TechStackItem)[];
}

// Type guard to check if content is a project
export function isProject(content: Content): content is Content & { type: 'project' } {
  return content.type === 'project';
}

// Convert Content to legacy Project format
export function contentToProject(content: Content, id: number): Project {
  return {
    ...content,
    id,
    image: content.thumbnail || '',
    alt: content.hero?.alt || content.title,
    href: `/projects/${content.slug}`,
    show: content.published,
    description: content.summary,
    markdownContent: content.content,
  };
}