// image:string,alt:string,title:string, categories:string[], description:string, href:string. Generate dummy data based on this

const ProjectsListData:{
    image:string,
    alt:string,
    title:string,
    categories:string[],
    description:string,
    show?:boolean,
    href:string
}[] = [
    
    {
        image: '/images/GCP.svg',
        alt: 'GCP Infrastructure Automation',
        title: 'GCP Infrastructure Automation',
        categories: ['Terraform', 'Google Cloud Platform', 'Packer', 'Github CI/CD', 'Serverless', 'NodeJS'],
        show: true,
        description: 'Utilized Terraform for infrastructure provisioning and Packer for GCP machine image creation, enhancing system reliability.',
        href: 'projects/gcpInfraAutomation'
    },
    {
        image: '/images/bikeSharing.webp',
        alt: 'Predictive Analytics for Bike Sharing Demand',
        title: 'Predictive Analytics for Bike Sharing Demand',
        categories: ['Python', 'scikit-learn', 'Seaborn', 'Pandas', 'NumPy'],
        description: 'Developed a predictive model on Bike Sharing dataset, achieving 90% accuracy in demand prediction with Random Forest. Streamlined model selection and feature engineering with AutoML, reducing development time by 30%.',
        show: true,
        href: 'projects/bikeSharing'
    },
    {
        image: '/images/gmapsSafety.jpg',
        alt: 'Safety In Google Maps',
        title: 'Safety In Google Maps',
        show: true,
        categories: ['User Research', 'Design Thinking', 'Figma', 'Competitive Analysis'],
        description: 'Employed design thinking and user research to develop low-fidelity and high-fidelity prototypes in Figma for safety feature enhancements in Google Maps.',
        href: 'projects/safetyInGoogleMaps'
    },
    {
        image: '/images/linuxFileWatcher.jpg',
        alt: 'Linux-Based Filesystem Watcher',
        title: 'Linux-Based Filesystem Watcher',
        categories: ['C', 'Linux', 'System Programming'],
        description: 'Developed a C-based Linux filesystem monitoring tool, enhancing data integrity and system administration efficiency with improved tracking of filesystem events.',
        href: 'http://linuxfilewatcher.rssmv.in'
    },
    {
        image: '/images/mediaServer.jpg',
        alt: 'Media Server',
        title: 'Media Server',
        categories: ['Python', 'Flask', 'AWS S3', 'Docker', 'Kubernetes'],
        description: 'Engineered a Python/Flask media server backend for concurrent streams with <100ms response time. Utilized Docker and Kubernetes for auto-scaling during peak demands.',
        href: 'http://mediaserver.rssmv.in'
    },
    {
        image: '/images/quill-logo.svg',  // Use your project logo
        alt: 'Quill - Chat with your PDFs',
        title: 'Quill',
        categories: ['Next.js', 'TypeScript', 'OpenAI', 'LangChain', 'Pinecone'],
        show: true,
        description: 'Conversational AI for PDFs, powered by OpenAI and semantic search.',
        href: 'projects/chatWithPdf'  // Adjust the path if needed
      }
      
];

export default ProjectsListData;
