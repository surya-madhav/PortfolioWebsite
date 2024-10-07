import { TechStackItem } from "./techstack";

export interface Project {
    id: number;
    slug: string;
    image: string;
    alt: string;
    title: string;
    categories: string[];
    techStack: any[];
    show: boolean;
    description: string;
    href: string;
    markdownContent: string;
    githubUrl: string;
  }