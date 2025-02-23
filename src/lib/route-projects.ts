import { Project } from "@/types/project";

// This file serves as a registry for manually created project routes
// Each route-based project should have its metadata defined here to be included in the projects listing

/**
 * Collection of metadata for manually created project routes
 * These will be merged with JSON-defined projects for display on the home page
 */
export const routeProjects: Project[] = [  
];

/**
 * Retrieves all route-based projects that should be shown
 * @returns Array of Project objects for routes
 */
export function getRouteProjects(): Project[] {
  return routeProjects.filter(project => project.show);
}
