'use client';

import { Project } from '@/types/project';
import { useRouter } from 'next/navigation';
import { BentoImageCard } from '@/components/BentoImageCard';
import { getAllProjects } from '@/data';
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

// Project size mapping (for grid layout)
const getProjectSize = (slug: string) => {
  switch (slug) {
    case 'gcpInfraAutomation':
      return 'col-span-1 md:col-span-2 md:row-span-2'; // Large
    case 'LearnLab':
      return 'col-span-1 md:col-span-1 md:row-span-2'; // Medium
    case 'hpcTusimple':
      return 'col-span-1 md:col-span-3 lg:col-span-2 md:row-span-1'; // Medium-wide
    case 'multiModalRag':
    case 'bikeSharing':
      return 'col-span-1 md:col-span-3 lg:col-span-1 md:row-span-1'; // Small
    default:
      return 'col-span-1 md:col-span-3 lg:col-span-1 md:row-span-1'; // Small
  }
};

// Order of projects (by slug)
const projectOrder = [
  'gcpInfraAutomation',
  'LearnLab',
  'hpcTusimple',
  'multiModalRag',
  'bikeSharing'
];

const Projects = () => {
  const router = useRouter();
  const allProjects = getAllProjects();
  
  // Sort projects according to the specified order
  const projects = [...allProjects].sort((a, b) => {
    const indexA = projectOrder.indexOf(a.slug);
    const indexB = projectOrder.indexOf(b.slug);
    
    // If both projects are in the order list, sort by their position
    if (indexA >= 0 && indexB >= 0) {
      return indexA - indexB;
    }
    
    // If only one project is in the order list, prioritize it
    if (indexA >= 0) return -1;
    if (indexB >= 0) return 1;
    
    // For projects not in the order list, maintain their original order
    return a.id - b.id;
  });

  return (
    <div>
      <h1 className='text-4xl font-bold text-center lg:text-left mt-12 mb-6'>Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {projects.map((project) => {
          const Icon = getIconForProject(project.slug);
          const sizeClass = getProjectSize(project.slug);
          
          // Log image path for debugging
          console.log(`Project: ${project.title}, Image: ${project.image}`);
          
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;