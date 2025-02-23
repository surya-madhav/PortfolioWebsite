// This file contains server-side utilities for file operations

import { Project } from "@/types/project";
import { TechStack } from "@/types/techstack";
import path from "path";
import fs from "fs";

/**
 * Loads project data from JSON file
 * @returns Promise<Project[]> Array of projects from JSON
 */
export async function getJsonProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error loading JSON projects:", error);
    return [];
  }
}

/**
 * Loads technology stack data from JSON file
 * @returns Promise<TechStack> Map of technology names to details
 */
export async function getTechStack(): Promise<TechStack> {
  try {
    const techStackPath = path.join(process.cwd(), 'data', 'technologies.json');
    const techStack = JSON.parse(fs.readFileSync(techStackPath, 'utf8'));
    return techStack;
  } catch (error) {
    console.error("Error reading tech stack data:", error);
    return {} as TechStack;
  }
}

/**
 * Validates that a project's tech stack items exist in the tech stack definitions
 * @param project Project to validate
 * @param techStack Tech stack definitions
 * @returns Promise<string[]> Array of missing tech stack items
 */
export async function validateTechStack(project: Project, techStack: TechStack): Promise<string[]> {
  const missingTech: string[] = [];
  for (const tech of project.techStack) {
    if (!techStack[tech]) {
      missingTech.push(tech as string);
    }
  }
  return missingTech;
}

/**
 * Gets all projects with tech stack information
 * @returns Promise<Project[]> Array of projects with mapped tech stack
 */
export async function getProjectsWithTechStack(): Promise<Project[]> {
  try {
    const projects = await getJsonProjects();
    const techStack = await getTechStack();
    
    // Validate and map tech stack for each project
    for (const project of projects) {
      const missingTech = await validateTechStack(project, techStack);
      if (missingTech.length > 0) {
        console.warn(`Project ${project.title} is missing tech stack definitions for: ${missingTech.join(', ')}`);
        // Filter out missing tech stack items
        project.techStack = project.techStack.filter(tech => !missingTech.includes(tech as string));
      }
      
      // Map tech stack strings to full objects
      project.techStack = project.techStack.map((tech) => techStack[tech as string]);
    }
    
    return projects;
  } catch (error) {
    console.error("Error getting projects with tech stack:", error);
    return [];
  }
}
