// components/Projects.tsx
import Link from 'next/link';
import projects from '../Data/projects';

const Projects = () => {
    return (
        <div>
            <h2>My Projects</h2>
            {projects.map(project => (
                <div key={project.route}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <Link href={`/projects/${project.route}`}>
                        <a>Learn More</a>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Projects;
