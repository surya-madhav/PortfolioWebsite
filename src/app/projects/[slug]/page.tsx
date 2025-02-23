import { notFound } from 'next/navigation';
import Image from 'next/image';
import "../projects.css";
import { Project } from '@/types/project';
import Link from 'next/link';
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from 'react';

import { remark } from 'remark';
import html from 'remark-html';
// Import from data module instead of server utils
import { getProjectsWithTechStack, getProjectBySlug } from '@/data';

/**
 * Converts a markdown string to HTML.
 * @param markdown - The markdown content to convert.
 * @returns A promise that resolves to the HTML string.
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}


interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const projects = await getProjectsWithTechStack();
    
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error("Error generating static params: ", error);
    return [];
  }
}

export default async function ProjectPage({ params }: Props) {
  let project: Project | undefined;
  try {
    const projects = await getProjectsWithTechStack();
    project = projects.find((p) => p.slug === params.slug);
  } catch (error) {
    console.error("Error fetching project data: ", error);
  }

  if (!project) {
    console.error("Project not found for slug: ", params.slug);
    notFound(); // Show 404 if project is not found
  }

  // Convert markdownContent to HTML
  const contentHtml = await markdownToHtml(project.markdownContent || '');
  

  return (
    <div className="py-8 w-full">
      <header className="text-center">

        <div className='w-full'>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <div className="flex flex-col justify-center items-center">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="bg-gradient-to-tr from-purple-500 to-blue-400 rounded-full border-orange-400 hover:shadow-2xl hover:shadow-orange-300 hover:border-orange-200 border mt-4 h-12 w-12 inline-block">
              <GitHubLogoIcon className='w-full h-full' />
            </Link>
            <p className='text-xs text-gray-500 mt-2'>View Code On Github</p>
          </div>
        </div>

      </header>

      <div className='w-full'>
        <div className="my-6 image-container w-full relative"> {/* Added relative and height for Image component */}
          <Image
            src={project.image}
            alt={`Image of ${project.title}`}
            layout="fill"
            objectFit="contain"
            priority // Optional: prioritize loading
          />
        </div>
        <div className="w-full flex justify-center">
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {project.techStack.map(tech => (
          <div 
            key={tech.name} 
            className="w-24 h-24 p-2 flex flex-col items-center justify-center 
                       shadow-sm text-white border border-orange-300 
                       shadow-yellow-600 rounded-md hover:shadow 
                       hover:shadow-yellow-400 transition-shadow duration-300"
          >
            <Image src={tech.icon} alt={`${tech.name} icon`} width={30} height={30} />
            <div className='mt-2 text-xs font-medium text-center'>{tech.name}</div>
          </div>
        ))}
      </div>
    </div>
        {/* Render the HTML content */}
        <div className="prose-container">
          <div className="prose prose-lg my-6">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </div>
      </div>

    </div>
  );
}
