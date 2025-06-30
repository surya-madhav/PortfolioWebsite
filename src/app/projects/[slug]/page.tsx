import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from 'react';
import { Metadata } from 'next';

import { YouTubeEmbed } from '@/components/YouTubeEmbed';
import MarkdownContent from '@/components/MarkdownContent';
import { getAllContent, getContentBySlug } from '@/lib/content';
import { Content } from '@/types/content';
import { enrichProjectWithTechStack } from '@/data';
import { generateContentMetadata, generateStructuredData, generateBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const projects = await getAllContent('project');
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for projects: ", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getContentBySlug('project', params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return generateContentMetadata(project);
}

export default async function ProjectPage({ params }: Props) {
  const content = await getContentBySlug('project', params.slug);

  if (!content) {
    notFound();
  }

  // Type guard to ensure techStack is string[] before enrichment
  if (content.techStack && content.techStack.length > 0 && typeof content.techStack[0] !== 'string') {
    content.techStack = (content.techStack as any[]).map(t => t.name || t);
  }

  // Enrich with full tech stack objects for display
  const project = enrichProjectWithTechStack(content as Content & { techStack?: string[] });

  // Generate structured data
  const structuredData = generateStructuredData(content);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.title, url: `/projects/${project.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <div className="py-8 w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">{project.summary}</p>
          {project.githubUrl && (
            <div className="flex flex-col justify-center items-center mt-6">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="bg-gradient-to-tr from-purple-500 to-blue-400 rounded-full border-orange-400 hover:shadow-2xl hover:shadow-orange-300 hover:border-orange-200 border h-12 w-12 inline-block transition-all duration-300 transform hover:scale-110">
                <GitHubLogoIcon className='w-full h-full p-2 text-white' />
              </Link>
              <p className='text-xs text-gray-500 mt-2'>View Code on GitHub</p>
            </div>
          )}
        </header>
        
        <div className='w-full'>
          <div className="my-6 image-container w-full relative aspect-video rounded-lg overflow-hidden shadow-lg shadow-orange-500/10">
            {project.hero?.type === 'video' && project.videoUrl ? (
              <YouTubeEmbed
                videoId={project.videoUrl}
                title={project.title}
                autoplay={true}
                showControls={true}
                loop={true}
                className="w-full h-full"
              />
            ) : (
              <Image
                src={project.hero?.src || '/images/placeholder.png'}
                alt={project.hero?.alt || `Image of ${project.title}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            )}
          </div>

          {project.techStack && project.techStack.length > 0 && (
            <div className="w-full flex justify-center my-12">
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                {project.techStack.map(tech => (
                  <div 
                    key={tech.name} 
                    className="w-24 h-24 p-2 flex flex-col items-center justify-center text-white border border-gray-700 rounded-md bg-gray-900/30 backdrop-blur-sm hover:border-orange-400 transition-all duration-300"
                  >
                    <Image src={tech.icon} alt={`${tech.name} icon`} width={30} height={30} />
                    <div className='mt-2 text-xs font-medium text-center'>{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <MarkdownContent content={project as any} />
          </div>
        </div>
      </div>
    </>
  );
}
