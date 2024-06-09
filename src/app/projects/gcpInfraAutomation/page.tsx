"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import "../projects.css"
import LottiePlayer from "react-lottie-player";
import Link from 'next/link';

const GCPInfraAutomation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/icons/github.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.log('Error loading animation data:', error));
  }, []);

  const projectData = {
    title: "GCP Infrastructure Automation",
    summary: "A comprehensive showcase of my work and skills, built using Next.js.",
    imageUrl: "/images/GCP.svg",
    githubUrl: "https://github.com/surya-madhav/InfraAutomation",
    technologies: [
      { name: "Node.js", icon: "/icons/nodejs.svg", category: "Programming Language" },
      { name: "Express", icon: "/icons/express.svg", category: "Framework" },
      { name: "MySQL", icon: "/icons/cloud_sql.svg", category: "Database" },
      { name: "Terraform", icon: "/icons/terraform.svg", category: "Infrastructure as Code" },
      { name: "Packer", icon: "/icons/packer.svg", category: "Infrastructure Automation" },
      { name: "Google Cloud Platform", icon: "/icons/my_cloud.svg", category: "Cloud Provider" },
      { name: "Pub/Sub", icon: "/icons/pubsub.svg", category: "Messaging Service" },
      { name: "Cloud Functions", icon: "/icons/cloud_functions.svg", category: "Serverless" },
      { name: "Compute Engine", icon: "/icons/compute_engine.svg", category: "Cloud Infrastructure" },
      { name: "CMEK", icon: "/icons/kms.svg", category: "Security & Compliance" },
      { name: "Load Balancing", icon: "/icons/load_bal.svg", category: "Networking" },
      { name: "Autoscaling", icon: "/icons/autoscale.svg", category: "Cloud Infrastructure" },
      { name: "Continuous Deployment", icon: "/icons/cicd.svg", category: "DevOps" }
    ]
  };

  return (
    <div className="py-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">{projectData.title}</h1>
        <div className="flex flex-col justify-center items-center">
          <Link href={projectData.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="bg-gradient-to-tr from-purple-500 to-blue-400 rounded-full border-orange-400 hover:shadow-2xl hover:shadow-orange-300 hover:border-orange-200 border inline-block mt-4 h-12 w-12">
            {animationData && (
              <LottiePlayer animationData={animationData} play loop speed={0.5} />
            )}
          </Link>
          <p className='text-xs text-gray-500 mt-2'>View Code On Github</p>
        </div>
      </header>
      <div className="my-6 image-container">
        <Image src={projectData.imageUrl} alt={`Image of ${projectData.title}`} layout="fill" objectFit="contain" />
      </div>
      <section className="my-4">
        <h2 className="text-lg font-semibold text-gray-400 dark:text-white mb-4">Project Overview</h2>
        <p className="mt-2">
          This project demonstrates the implementation of a comprehensive cloud-based architecture using Google Cloud Platform (GCP) to automate and manage a scalable cloud infrastructure. It focuses on creating an efficient, secure, and scalable system through various cloud-native tools and practices.
        </p>
        <section className="my-4">
        <h2 className="text-lg font-semibold text-gray-400 dark:text-white mb-6">Technologies Used</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {projectData.technologies.map(tech => (
            <div key={tech.name} className="p-2 flex items-center justify-center flex-col shadow-sm text-white border border-orange-300 shadow-yellow-600 rounded-md hover:shadow hover:shadow-yellow-400">
              <Image src={tech.icon} alt='icon' width={45} height={45} />
              <div className='text-sm font-me text-center'>{tech.name}</div>
            </div>
          ))}
        </div>
      </section>
        <h3 className="text-lg font-semibold text-gray-400 dark:text-white mt-4 mb-2">Cloud-Native Application</h3>
        <p className="mt-2">
          The application is developed as a RESTful API using Node.js and Prisma, featuring endpoints for user management and health checks. Prisma, acting as an ORM, ensures efficient database interactions. This setup provides a robust backend capable of handling high loads while maintaining performance and security.
        </p>
        <p className="mt-2">
          Node.js enables asynchronous operations, enhancing the API's responsiveness. The API design adheres to best practices, ensuring scalability and maintainability, crucial for cloud-native applications.
        </p>

        <h3 className="text-lg font-semibold text-gray-400 dark:text-white mt-4 mb-2">Infrastructure Automation</h3>
        <p className="mt-2">
          Terraform automates resource provisioning, ensuring consistency and version control across the infrastructure. Packer creates custom machine images, incorporating all necessary configurations and dependencies.
        </p>
        <p className="mt-2">
          This automation reduces manual intervention, minimizes errors, and accelerates deployment processes. By defining infrastructure as code, the project achieves repeatability and scalability, essential for managing complex cloud environments.
        </p>

        <h3 className="text-lg font-semibold text-gray-400 dark:text-white mt-4 mb-2">Event-Driven Architecture</h3>
        <p className="mt-2">
          Utilizing Google Pub/Sub for messaging and user notifications allows the application to handle real-time events efficiently. This decouples system components, enhancing scalability and fault tolerance.
        </p>
        <p className="mt-2">
          Pub/Sub supports asynchronous communication, ensuring that the application can manage high-throughput scenarios and provide timely updates to users. This architecture is vital for maintaining responsiveness under varying load conditions.
        </p>

        <h3 className="text-lg font-semibold text-gray-400 dark:text-white mt-4 mb-2">Monitoring and Logging</h3>
        <p className="mt-2">
          GCP's Operations Suite provides robust monitoring and logging, offering insights and alerts to maintain system health and performance. Cloud Monitoring tracks metrics and sends alerts for unusual activity.
        </p>
        <p className="mt-2">
          Cloud Logging collects and analyzes logs, aiding in troubleshooting and performance optimization. This comprehensive visibility ensures proactive maintenance and swift issue resolution.
        </p>

        <h3 className="text-lg font-semibold text-gray-400 dark:text-white mt-4 mb-2">Security</h3>
        <p className="mt-2">
          Security is a priority, with customer-managed encryption keys (CMEK) enhancing data protection. CMEK allows precise control over encryption keys, ensuring data security and compliance with regulatory standards.
        </p>
        <p className="mt-2">
          This approach safeguards data at rest and in transit, aligning with best practices in cloud security. Regular key rotations and strict access controls further enhance security measures.
        </p>

        <h3 className="text-lg font-semibold text-gray-400 dark:text-white mt-4 mb-2">Scalability and Performance</h3>
        <p className="mt-2">
          Load balancing and autoscaling maintain application performance and availability. GCP's Load Balancing service distributes traffic across instances, preventing bottlenecks.
        </p>
        <p className="mt-2">
          Autoscaling dynamically adjusts the number of instances based on demand, optimizing resource utilization and cost efficiency. This ensures the application remains responsive under varying loads.
        </p>

        <h3 className="text-lg font-semibold text-gray-400 dark:text-white mt-4 mb-2">Continuous Deployment</h3>
        <p className="mt-2">
          Continuous deployment practices ensure seamless updates through rolling updates in managed instance groups. CI/CD pipelines automate build, test, and deployment processes, enabling frequent, reliable releases.
        </p>
        <p className="mt-2">
          Rolling updates minimize downtime by incrementally deploying new versions. This approach maintains application integrity and user experience during updates.
        </p>

        <p className="mt-4">
          For more detailed information on this project, please visit the <a href="https://github.com/surya-madhav/InfraAutomation" className="text-blue-500 underline">Github Code</a>.
        </p>
      </section>
      
    </div>
  );
};

export default GCPInfraAutomation;
