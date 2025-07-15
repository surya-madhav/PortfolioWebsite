// Static data imports (safe for client and server components)
import technologiesData from '../../content/data/technologies.json';
import { Project } from '@/types/project';
import { TechStackItem, TechStack } from '@/types/techstack';
import { getAllContent } from '@/lib/content';

// Correctly type and convert the technologies data
const technologies: TechStack = technologiesData as TechStack;
const allTechnologies: TechStackItem[] = Object.values(technologies);

/**
 * Get all projects using the new content system
 */
export async function getAllProjects(): Promise<Project[]> {
  const content = await getAllContent('project', { published: true });
  // Return the full Content object with legacy fields added/overridden
  return content.map((item, index) => ({
    ...item,
    id: index + 1,
    image: item.thumbnail || '',
    alt: item.hero?.alt || item.title,
    href: `/projects/${item.slug}`,
    show: item.published,
    description: item.summary,
    markdownContent: item.content,
    categories: item.tags,
    techStack: item.techStack || [],
    githubUrl: item.githubUrl || '',
    demoUrl: item.demoUrl,
    videoUrl: item.videoUrl,
  }));
}

/**
 * Enriches a project's tech stack (string[]) with full TechStackItem objects.
 * @param project - A project-like object with a techStack array of strings.
 * @returns The project with a fully populated techStack of TechStackItem objects.
 */
export function enrichProjectWithTechStack<T extends { techStack?: (string | TechStackItem)[] }>(
  project: T
): Omit<T, 'techStack'> & { techStack: TechStackItem[] } {
  const enrichedTechStack = project.techStack
    ? project.techStack
        .map(tech => {
          if (typeof tech === 'string') {
            return allTechnologies.find(t => t.name.toLowerCase() === tech.toLowerCase());
          }
          // It's already a TechStackItem object
          return tech;
        })
        .filter((t): t is TechStackItem => !!t) // Filter out undefined or invalid items
    : [];

  return {
    ...project,
    techStack: enrichedTechStack,
  };
}

/**
 * Group technologies by category
 */
export function getTechnologiesByCategory(): Record<string, TechStackItem[]> {
  const result: Record<string, TechStackItem[]> = {};
  
  // Iterate through all technologies
  Object.values(technologies).forEach(tech => {
    // Initialize the category array if it doesn't exist
    if (!result[tech.category]) {
      result[tech.category] = [];
    }
    
    // Add the technology to its category
    result[tech.category].push(tech);
  });
  
  // Sort technologies alphabetically by name within each category
  Object.keys(result).forEach(category => {
    result[category].sort((a, b) => a.name.localeCompare(b.name));
  });
  
  return result;
}
