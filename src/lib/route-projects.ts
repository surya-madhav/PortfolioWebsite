import { Project } from "@/types/project";

// This file serves as a registry for manually created project routes
// Each route-based project should have its metadata defined here to be included in the projects listing

/**
 * Collection of metadata for manually created project routes
 * These will be merged with JSON-defined projects for display on the home page
 */
export const routeProjects: Project[] = [
  {
    id: 100, // Use a high number to avoid conflicts with JSON projects
    slug: "safetyInGoogleMaps",
    image: "/images/GCP.svg",
    alt: "Safety in Google Maps",
    title: "Safety in Google Maps",
    categories: ["Next.js", "Google Maps API"],
    techStack: ["Next.js", "React", "Google Maps API"],
    show: true,
    description: "Safety in Google Maps is a project that aims to provide a platform for users to report and view safety incidents in their area.",
    href: "projects/safetyInGoogleMaps",
    markdownContent: "", // Not used for route-based projects
    githubUrl: "https://github.com/yourusername/yourproject"
  },
  {
    id: 101,
    slug: "laneDetection",
    image: "/images/lane-detection.png", // This will need to be added to public/images
    alt: "Lane Detection through Parallel Computing",
    title: "Lane Detection through Parallel Computing",
    categories: ["PyTorch", "CUDA", "Parallel Computing"],
    techStack: ["PyTorch", "CUDA", "Python", "Dask"],
    show: true,
    description: "Optimization of lane detection algorithms using parallel computing techniques across multiple CPUs and GPUs.",
    href: "projects/laneDetection",
    markdownContent: "", // Not used for route-based projects
    githubUrl: "https://github.com/yourusername/lane-detection"
  }
];

/**
 * Retrieves all route-based projects that should be shown
 * @returns Array of Project objects for routes
 */
export function getRouteProjects(): Project[] {
  return routeProjects.filter(project => project.show);
}
