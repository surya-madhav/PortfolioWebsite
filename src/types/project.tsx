export interface Project {
    id: number;
    slug: string;
    image: string;
    alt: string;
    title: string;
    categories: string[];
    techStack: string[];
    show: boolean;
    description: string;
    href: string;
    markdownContent: string;
  }