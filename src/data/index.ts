// Static data imports (safe for client and server components)
import projectsData from '../../data/projects.json';
import technologiesData from '../../data/technologies.json';
import { Project } from '@/types/project';
import { TechStack, TechStackItem } from '@/types/techstack';
import { getRouteProjects } from '@/lib/route-projects';

// Import JSON directly - Next.js allows this
export const projects: Project[] = projectsData;
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
  const enrichedProject = { ...project };
  
  // If the project already has detailed tech stack, return as is
  if (typeof enrichedProject.techStack[0] !== 'string') {
    return enrichedProject;
  }
  
  // Map string tech names to full tech objects
  enrichedProject.techStack = enrichedProject.techStack.map((tech) => {
    const techName = tech as string;
    if (technologies[techName]) {
      return technologies[techName];
    }
    // Return a placeholder if tech not found
    console.warn(`Tech stack item not found: ${techName}`);
    return {
      name: techName,
      icon: '/icons/placeholder.svg',
      category: 'Unknown'
    };
  });
  
  return enrichedProject;
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
