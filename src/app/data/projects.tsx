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
        image: '/images/GCp.jpg',
        alt: 'GCP Infrastructure Automation',
        title: 'GCP Infrastructure Automation',
        categories: ['Terraform', 'Google Cloud Platform', 'Packer', 'Github CI/CD', 'Serverless', 'NodeJS'],
        show: true,
        description: 'Utilized Terraform for infrastructure provisioning and Packer for GCP machine image creation, enhancing system reliability. Implemented DNS management and serverless functions for automated user verification emails.',
        href: 'projects/gcpInfraAutomation'
    },
    {
        image: '/images/bikeSharing.jpg',
        alt: 'Predictive Analytics for Bike Sharing Demand',
        title: 'Predictive Analytics for Bike Sharing Demand',
        categories: ['Python', 'scikit-learn', 'Seaborn', 'Pandas', 'NumPy'],
        description: 'Developed a predictive model on Bike Sharing dataset, achieving 90% accuracy in demand prediction with Random Forest. Streamlined model selection and feature engineering with AutoML, reducing development time by 30%.',
        href: 'http://bikesharing.rssmv.in'
    },
    {
        image: '/images/docSearchAI.jpg',
        alt: 'DocSearchAI',
        title: 'DocSearchAI',
        categories: ['ReactJS', 'NodeJS', 'GPT-3.5 API', 'MongoDB', 'ElasticSearch', 'AWS'],
        description: 'Built an AI-powered documentation chat application for conversational search and context-aware responses. Implemented ReactJS\'s hooks and context for efficient state management.',
        href: 'http://docsearch.rssmv.in'
    },
    {
        image: '/images/gmapsSafety.jpg',
        alt: 'Safety In Google Maps',
        title: 'Safety In Google Maps',
        categories: ['User Research', 'Design Thinking', 'Figma', 'Competitive Analysis'],
        description: 'Employed design thinking and user research to develop low-fidelity and high-fidelity prototypes in Figma for safety feature enhancements in Google Maps.',
        href: 'http://gmaps.rssmv.in'
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
        image: '/images/ytnotes.jpg',
        alt: 'YouTube Playlist to Interactive Course Converter',
        title: 'YouTube Playlist to Interactive Course Converter',
        categories: ['React', 'Redux', 'Jest', 'Notion API'],
        description: 'Collaborated on a React app integrating Notion as CMS for content management. Optimized Redux for state handling and implemented Storybook and Jest for UI reliability.',
        href: 'http://ytnotes.rssmv.in'
    }
];

export default ProjectsListData;
