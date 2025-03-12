"use client";

import { BentoImageCard } from '@/components/BentoImageCard';
import {
  CloudIcon,
  BrainCircuitIcon,
  CpuIcon,
  BarChartIcon,
  DatabaseIcon
} from "lucide-react";

// Icon mapping for projects
const getIconForProject = (slug: string) => {
  switch (slug) {
    case 'gcpInfraAutomation':
      return CloudIcon;
    case 'LearnLab':
      return BrainCircuitIcon;
    case 'hpcTusimple':
      return CpuIcon;
    case 'bikeSharing':
      return BarChartIcon;
    case 'multiModalRag':
      return BrainCircuitIcon;
    default:
      return DatabaseIcon;
  }
};

interface ProjectCardProps {
  project: {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    categories: string[];
    videoUrl?: string;
  };
  sizeClass: string;
}

const ProjectCard = ({ project, sizeClass }: ProjectCardProps) => {
  const Icon = getIconForProject(project.slug);
  
  return (
    <BentoImageCard
      key={project.id}
      title={project.title}
      description={project.description}
      imageSrc={project.image}
      imageAlt={project.alt}
      href={`/projects/${project.slug}`}
      categories={project.categories}
      className={sizeClass}
      Icon={Icon}
      videoUrl={project.videoUrl}
    />
  );
};

export default ProjectCard;