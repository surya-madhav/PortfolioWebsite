// pages/projects.tsx
import React from 'react';
import Card from '../components/Card';
import { Project } from '@/types/project';
import path from 'path';
import fs from 'fs';

interface ProjectsPageProps {
  projects: Project[];
}

// Server-side function to fetch project data
export const getServerSideProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(jsonData);

  return {
    props: {
      projects,
    },
  };
};

const Projects = ({ projects }: ProjectsPageProps) => {
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
