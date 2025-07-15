import { MetadataRoute } from 'next';
import { getAllContent } from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rssmv.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all content
  const projects = await getAllContent('project', { published: true });
  const notes = await getAllContent('note', { published: true });
  const blogs = await getAllContent('blog', { published: true });
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/notes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];
  
  // Project pages
  const projectPages: MetadataRoute.Sitemap = projects.map(project => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updated || project.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  
  // Note pages
  const notePages: MetadataRoute.Sitemap = notes.map(note => ({
    url: `${SITE_URL}/notes/${note.slug}`,
    lastModified: new Date(note.updated || note.date),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));
  
  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogs.map(blog => ({
    url: `${SITE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated || blog.date),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  
  // Archive pages
  const archivePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/notes/archive`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/blog/archive`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.4,
    },
  ];
  
  // Combine all pages
  return [
    ...staticPages,
    ...projectPages,
    ...notePages,
    ...blogPages,
    ...archivePages,
  ];
}
