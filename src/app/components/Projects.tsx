import { getAllProjects } from '@/data';
import ProjectCard from './ProjectCard';

// Project size mapping (for grid layout)
const getProjectSize = (slug: string) => {
  switch (slug) {
    case 'gcpInfraAutomation':
      return 'col-span-1 sm:col-span-2 lg:col-span-2'; // Large
    case 'LearnLab':
      return 'col-span-1 sm:col-span-1 lg:col-span-1'; // Medium
    case 'hpcTusimple':
      return 'col-span-1 sm:col-span-2 lg:col-span-2'; // Medium-wide
    case 'multiModalRag':
    case 'bikeSharing':
      return 'col-span-1'; // Small
    default:
      return 'col-span-1'; // Small
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
  // Get projects data on the server
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <h1 className='text-center lg:text-left mt-12 mb-8 text-4xl font-bold'>Projects</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {projects.map((project) => {
          const sizeClass = getProjectSize(project.slug);
          
          return (
            <ProjectCard
              key={project.id}
              project={project}
              sizeClass={sizeClass}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;