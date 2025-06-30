import { getAllContent } from '@/lib/content';
import ContentCard from '@/components/content/ContentCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of my software development projects, featuring web applications, tools, and open-source contributions.',
  keywords: ['projects', 'portfolio', 'web development', 'software engineering', 'React', 'Next.js'],
  alternates: {
    canonical: 'https://rssmv.in/projects',
  },
  openGraph: {
    title: 'Projects | Sai Surya\'s Portfolio',
    description: 'Explore my software development projects showcasing various technologies and problem-solving approaches.',
    url: 'https://rssmv.in/projects',
    type: 'website',
  },
};

export default async function ProjectsListingPage() {
  const projects = await getAllContent('project', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl">
          A collection of projects I&apos;ve worked on, showcasing different technologies 
          and problem-solving approaches.
        </p>
      </header>
      
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">
            Featured Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map(project => (
              <ContentCard 
                key={project.slug}
                content={project}
                variant="grid"
                showImage={true}
                showExcerpt={true}
                showMeta={false}
              />
            ))}
          </div>
        </section>
      )}
      
      {/* All Projects */}
      <section>
        {featuredProjects.length > 0 && (
          <h2 className="text-2xl font-heading font-bold text-white mb-6">
            All Projects
          </h2>
        )}
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects to display yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularProjects.map(project => (
              <ContentCard 
                key={project.slug}
                content={project}
                variant="grid"
                showImage={true}
                showExcerpt={true}
                showMeta={false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
