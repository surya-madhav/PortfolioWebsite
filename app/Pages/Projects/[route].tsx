// pages/projects/[id].tsx
import { useRouter } from 'next/router';
import projects from '../../Data/projects';

const ProjectPage = () => {
    const router = useRouter();
    const { route } = router.query; // This gets the dynamic part of the URL

    // Find the project by ID
    const project = projects.find(p => p.route === route);

    if (!project) {
        return <p>Project not found</p>;
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <img src={project.imageUrl} alt={`Image of ${project.title}`} />
        </div>
    );
};

export default ProjectPage;
