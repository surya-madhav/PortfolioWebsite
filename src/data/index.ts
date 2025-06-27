// Static data imports (safe for client and server components)
import projectsData from '../../data/projects.json';
import technologiesData from '../../content/data/technologies.json';
import { Project } from '@/types/project';
import { TechStackItem, TechStack } from '@/types/techstack';
import { getRouteProjects } from '@/lib/route-projects';
import { Content, ContentMeta } from '@/types/content';

// Correctly type and convert the technologies data
const technologies: TechStack = technologiesData as TechStack;
const allTechnologies: TechStackItem[] = Object.values(technologies);

// Import JSON directly - Next.js allows this
export const projects: Project[] = (projectsData as any[]).map((p) => ({
  ...p,
  date: '2023-01-01T00:00:00.000Z', // Placeholder date
  published: p.show,
  seo: {
    title: p.title,
    description: p.description,
  },
  summary: p.description,
  tags: p.categories,
  content: p.markdownContent || '',
  htmlContent: '', // Will be processed later
  readingTime: 0, // Placeholder
  excerpt: (p.description || '').slice(0, 155) + '...', // Simple excerpt
  headings: [], // Placeholder
  thumbnail: p.image,
  author: undefined,
  featured: false,
  updated: undefined,
  hero: undefined,
  demoUrl: undefined,
  duration: undefined,
  role: undefined,
  team: undefined,
  toc: true,
  comments: false,
  relatedContent: undefined,
  trackingId: undefined,
  experiments: undefined
}));

/**
 * Get all projects, combining JSON and route-based projects
 */
export function getAllProjects(): Project[] {
  const jsonProjects = projects;
  const routeProjects = getRouteProjects();
  
  // Combine both sources of projects
  const allProjects = [...jsonProjects, ...routeProjects];
  
  // Return only projects that should be shown
  return allProjects.filter(project => project.show);
}

/**
 * Retrieves a single legacy project by its slug, with its tech stack enriched.
 * @param slug - The slug of the project to retrieve.
 * @returns A promise that resolves to the project, or undefined if not found.
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects: Project[] = projectsData as Project[];
  const project = projects.find(p => p.slug === slug);
  if (!project) return undefined;
  return enrichProjectWithTechStack(project) as unknown as Project;
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
 * Retrieves all legacy projects from JSON with their tech stacks enriched.
 * @returns A promise that resolves to an array of projects.
 */
export async function getProjectsWithTechStack(): Promise<Project[]> {
  const projects: Project[] = projectsData as Project[];
  return projects.map(p => enrichProjectWithTechStack(p) as unknown as Project);
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
