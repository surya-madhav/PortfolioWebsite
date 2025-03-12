import { notFound } from 'next/navigation';
import Image from 'next/image';
import "../projects.css";
import { Project } from '@/types/project';
import Link from 'next/link';
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from 'react';
import path from 'path';
import fs from 'fs';
import dynamic from 'next/dynamic';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';

import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
// Import from data module instead of server utils
import { getProjectsWithTechStack, getProjectBySlug } from '@/data';

// Dynamically import the client component with no SSR
const MermaidRenderer = dynamic(
  () => import('@/components/MermaidRenderer'),
  { ssr: false }
);

/**
 * Reads markdown content from a file.
 * @param filePath - The path to the markdown file.
 * @returns A promise that resolves to the markdown content.
 */
async function readMarkdownFile(filePath: string): Promise<string> {
  try {
    // Resolve the absolute path to the file
    const absolutePath = path.join(process.cwd(), filePath);
    // Read the file content
    const content = await fs.promises.readFile(absolutePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    return ''; // Return empty string on error
  }
}

/**
 * Processes markdown content, whether it's a direct string or from a file path.
 * @param project - The project containing either markdownContent or markdownPath.
 * @returns A promise that resolves to the HTML string.
 */
async function processMarkdown(project: Project): Promise<string> {
  let markdownContent = '';
  
  // If markdownPath is provided, read content from file
  if (project.markdownPath) {
    markdownContent = await readMarkdownFile(project.markdownPath);
  } 
  // Otherwise use direct markdown content if available
  else if (project.markdownContent) {
    markdownContent = project.markdownContent;
  }
  
  // Convert markdown to HTML with GFM support (tables, etc.)
  const result = await remark()
    .use(remarkGfm)  // Adds GitHub Flavored Markdown support (tables, etc.)
    .use(html, { sanitize: false })  // Don't sanitize to allow script tags
    .process(markdownContent);
    
  let htmlContent = result.toString();
  
  return htmlContent;
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
    console.log('Found project:', project?.title, 'Video URL:', project?.videoUrl);
  } catch (error) {
    console.error("Error fetching project data: ", error);
  }

  if (!project) {
    console.error("Project not found for slug: ", params.slug);
    notFound(); // Show 404 if project is not found
  }

  // Convert markdownContent to HTML
  const contentHtml = await processMarkdown(project);
  

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
        <div className="my-6 image-container w-full relative">
          {project.videoUrl ? (
            <div className="w-full aspect-video pb-[56.25%] relative">
              <YouTubeEmbed
                videoId={project.videoUrl}
                title={project.title}
                autoplay={true}
                className="w-full h-full"
              />
            </div>
          ) : (
            <Image
              src={project.image}
              alt={`Image of ${project.title}`}
              layout="fill"
              objectFit="contain"
              priority // Optional: prioritize loading
            />
          )}
        </div>
        <div className="w-full flex justify-center">
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {project.techStack.map(tech => (
          <div 
            key={tech.name} 
            className="w-24 h-24 p-2 flex flex-col items-center justify-center 
                       text-white border border-gray-700 rounded-md 
                       bg-gray-900/30 backdrop-blur-sm 
                       hover:border-orange-400 transition-all duration-300"
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
            <MermaidRenderer htmlContent={contentHtml} />
          </div>
        </div>
      </div>
    </div>
  );
}
