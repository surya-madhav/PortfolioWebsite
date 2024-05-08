/* eslint-disable react-hooks/rules-of-hooks */
// app/project-detail/page.tsx
"use client";
// Importing GitHub icon from lucide-react
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import "../projects.css"
import LottiePlayer from "react-lottie-player";
const gcpInfraAutomation = () => {
  // Filler data for the project

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the animation JSON from the public folder
    fetch('/icons/github.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      })
      .catch(error => console.log('Error loading animation data:', error));
  }, []);


  const projectData = {


    title: "GCP Infrastructure Automation",
    summary: "A comprehensive showcase of my work and skills, built using Next.js.",
    imageUrl: "/images/GCp.svg",
    githubUrl: "https://github.com/yourusername/yourproject",
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
      { name: "Continuous Deployment", icon: "/icons/", category: "DevOps" }
    ]
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8">
      <div className="container mx-auto">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{projectData.title}</h1>
          <p className="text-gray-700 dark:text-gray-300">{projectData.summary}</p>
          
          <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="bg-gradient-to-tr from-purple-500 to-blue-400 rounded-full border-orange-400 hover:shadow-2xl hover:shadow-orange-300 hover:border-orange-200 border inline-block mt-4 h-12 w-12">
          {animationData?(
            <LottiePlayer            
                animationData={animationData}
                play
                loop
                
                speed={0.5}
              />
          ):null}
          </a>
        </header>
        <div className="my-6 image-container">
          <Image src={projectData.imageUrl} alt={`Image of ${projectData.title}`} layout="fill" objectFit="contain" />
        </div>
        <section className="my-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Project Details</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            This project demonstrates the implementation of a comprehensive cloud-based architecture using Google Cloud Platform (GCP) to automate and manage a scalable cloud infrastructure. It features a cloud-native application developed as a RESTful API using Node.js and Prisma, which includes endpoints for user management and health checks. <br></br>The infrastructure automation is accomplished using Terraform for resource provisioning and Packer for creating custom machine images tailored for the application. Key components of the system include event-driven architecture utilizing Google Pub/Sub for messaging and user notification services, and robust monitoring and logging facilitated by GCP&apos;s Operations Suite. <br></br>The project also emphasizes security with the implementation of customer-managed encryption keys (CMEK) to enhance data protection. Load balancing and autoscaling are integral to maintaining application performance and availability, while continuous deployment practices ensure seamless updates through rolling updates in the managed instance groups. This architecture not only supports high availability and fault tolerance but also adheres to best practices in security and data management.
          </p>
        </section>
        <section className="my-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Technologies Used</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {projectData.technologies.map(tech => (
              <div key={tech.name} className={`p-2 flex items-center justify-center flex-col shadow-sm $ text-white border border-yellow-300 shadow-yellow-600 rounded-md hover:shadow hover:shadow-yellow-400`}>
                <div className="mb-2"><Image src={tech.icon} alt='icon' width={20} height={20} /></div>
                <div className='text-sm font-me text-center'>{tech.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default gcpInfraAutomation;