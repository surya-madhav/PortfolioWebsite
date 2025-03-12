'use client';

import { Project } from '@/types/project';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid';
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
      return 'col-span-3 md:col-span-2 md:row-span-2'; // Large
    case 'LearnLab':
      return 'col-span-3 md:col-span-1 md:row-span-2'; // Medium
    case 'hpcTusimple':
      return 'col-span-3 md:col-span-3 lg:col-span-2 md:row-span-1'; // Medium-wide
    case 'multiModalRag':
      return 'col-span-3 md:col-span-3 lg:col-span-1 md:row-span-1'; // Small
    default:
      return 'col-span-3 md:col-span-3 lg:col-span-1 md:row-span-1'; // Small
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
      
      <BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-auto md:auto-rows-[22rem] gap-6">
        {projects.map((project) => {
          const Icon = getIconForProject(project.slug);
          const sizeClass = getProjectSize(project.slug);
          
          return (
            <BentoCard
              key={project.id}
              name={project.title}
              description={project.description}
              className={sizeClass}
              Icon={Icon}
              href={`/projects/${project.slug}`}
              cta="View Project"
              background={
                <div className="relative h-full w-full overflow-hidden bg-gray-900/50">
                  <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-gray-900/90" />
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover object-center transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={project.slug === 'gcpInfraAutomation'}
                  />
                  <div className="absolute bottom-0 left-0 z-20 p-4">
                    <div className="flex flex-wrap gap-1">
                      {project.categories.slice(0, 3).map((category, idx) => (
                        <span 
                          key={idx}
                          className="text-orange-200 text-xs bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-md"
                        >
                          {category}
                        </span>
                      ))}
                      {project.categories.length > 3 && (
                        <span className="text-orange-200 text-xs bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-md">
                          +{project.categories.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              }
            />
          );
        })}
      </BentoGrid>
    </div>
  );
};

export default Projects;
