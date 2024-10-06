// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
interface Project {
    id: number
    slug: string
    image: string
    alt: string
    title: string
    categories: string[]
    techStack: string[]
    show: boolean
    description: string
    href: string
    markdownContent: string
  }
export async function generateStaticParams() {
  const projects = await getProjectsData();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

async function getProjectsData(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: Props) {
  const projects = await getProjectsData();
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound(); // Show 404 if project is not found
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <Image
        src={project.image}
        alt={project.alt}
        width={800}
        height={600}
      />
      <p>{project.description}</p>
      <div dangerouslySetInnerHTML={{ __html: project.markdownContent }} />
    </div>
  );
}
