import { Project } from '@/types/project';
import Card from './Card';
import { getAllProjects } from '@/lib/utils';

const Projects = async () => {
  // Fetch both JSON projects and route-based projects
  const projects = await getAllProjects();

  return (
    <section>
      <h1 className='text-4xl font-bold text-center lg:text-left mt-12 mb-6'>Projects</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6'>
      {projects.map((project, index) => (
          <Card key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
