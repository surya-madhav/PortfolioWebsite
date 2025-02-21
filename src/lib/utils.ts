import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Project } from "@/types/project"
import path from "path"
import fs from "fs"
import { getRouteProjects } from "./route-projects"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Loads project data from JSON file
 * @returns Promise<Project[]> Array of projects from JSON
 */
export async function getJsonProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json')
    const jsonData = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(jsonData)
  } catch (error) {
    console.error("Error loading JSON projects:", error)
    return []
  }
}

/**
 * Merges projects from JSON and manually created routes
 * @returns Promise<Project[]> Combined array of all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  const jsonProjects = await getJsonProjects()
  const routeProjects = getRouteProjects()
  
  // Combine both sources of projects
  const allProjects = [...jsonProjects, ...routeProjects]
  
  // Return only projects that should be shown
  return allProjects.filter(project => project.show)
}
