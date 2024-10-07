import { Project } from '@/types/project';
import path from 'path';
import fs from 'fs';
import Card from './Card';

// Load the project data from the server-side
async function getProjectsData(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}

const Projects = async () => {
  const projects = await getProjectsData(); // Fetch data on the server

  return (
    <section>
      <h1 className='text-4xl font-bold text-center lg:text-left mt-12 mb-6'>Projects</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6'>
      {projects.map((project, index) => (
          project.show ? <Card key={index} project={project} /> : null
        ))}
      </div>
    </section>
  );
};

export default Projects;
