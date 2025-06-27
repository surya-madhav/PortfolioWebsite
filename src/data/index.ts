// Static data imports (safe for client and server components)
import projectsData from '../../data/projects.json';
import technologiesData from '../../content/data/technologies.json';
import { Project } from '@/types/project';
import { TechStack, TechStackItem } from '@/types/techstack';
import { getRouteProjects } from '@/lib/route-projects';

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

export const technologies: TechStack = technologiesData;

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
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  const allProjects = getAllProjects();
  return allProjects.find((project) => project.slug === slug);
}

/**
 * Add tech stack details to project
 */
export function enrichProjectWithTechStack(project: Project): Project {
  // If the project has no tech stack or it's already enriched, return as is
  if (!project.techStack || typeof project.techStack[0] !== 'string') {
    return project;
  }

  const enrichedTechStack = project.techStack.map((techName) => {
    if (typeof techName === 'string') {
      if (technologies[techName]) {
        return technologies[techName];
      }
      console.warn(`Tech stack item not found: ${techName}`);
      return {
        name: techName,
        icon: '/icons/placeholder.svg',
        category: 'Unknown'
      };
    }
    return techName; // Already a TechStackItem object
  });

  return { ...project, techStack: enrichedTechStack };
}

/**
 * Get all projects with tech stack details
 */
export function getProjectsWithTechStack(): Project[] {
  const allProjects = getAllProjects();
  return allProjects.map(project => enrichProjectWithTechStack(project));
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
