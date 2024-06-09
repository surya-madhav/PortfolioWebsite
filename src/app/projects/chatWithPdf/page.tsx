"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import "../projects.css";
import LottiePlayer from "react-lottie-player";
import Link from 'next/link';

const ChatWithPDF = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/icons/github.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.log('Error loading animation data:', error));
  }, []);

  const projectData = {
    title: "Chat With PDF",
    summary: "A SaaS platform allowing users to interact with PDF documents conversationally.",
    imageUrl: "/images/ChatWithPDF.svg",
    githubUrl: "https://github.com/surya-madhav/DocSearchAI",
    technologies: [
      { name: "Next.js 13", icon: "/icons/next.svg", category: "Framework" },
      { name: "TypeScript", icon: "/icons/typescript-svgrepo-com.svg", category: "Programming Language" },
      { name: "Tailwind CSS", icon: "/icons/icons8-tailwindcss.svg", category: "CSS Framework" },
      { name: "Prisma", icon: "/icons/icons8-prisma-orm.svg", category: "ORM" },
      // { name: "PlanetScale", icon: "https://planetscale.com/favicon-32x32.png", category: "Database" },
      { name: "tRPC", icon: "https://trpc.io/img/logo.svg", category: "API" },
      // { name: "React Query", icon: "https://react-query.tanstack.com/_next/static/images/logo-24e2ecb65d9a27e7d29e35b0a9dcbcd5.svg", category: "Data Fetching" },
      { name: "Stripe", icon: "/icons/stripe-logo-white-on-blue.png", category: "Payments" },

      { name: "Pinecone", icon: "/icons/pinecone.svg", category: "Vector Database" },
      { name: "LangChain", icon: "/icons/langchain.png", category: "Language Models" },
      { name: "OpenAI", icon: "/icons/icons8-chat-gpt.svg", category: "Language Models" },
      // { name: "Zod", icon: "https://zod.dev/img/logo.svg", category: "Validation" },
      // { name: "clsx", icon: "https://clsx.dev/favicon.ico", category: "CSS Utilities" },
      // { name: "Shadcn/ui", icon: "https://shadcn.dev/favicon.ico", category: "UI Components" },
      // { name: "React Hook Form", icon: "https://react-hook-form.com/favicon.ico", category: "Form Handling" },
      // { name: "React Dropzone", icon: "https://react-dropzone.js.org/favicon.ico", category: "File Uploads" },
      // { name: "date-fns", icon: "https://date-fns.org/static/favicon-32x32.png", category: "Date Manipulation" }
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
          This project aims to develop a SaaS platform enabling users to interact with PDF documents through natural language conversations. Users can upload PDFs, ask questions about their content, and receive real-time responses, enhancing their document interaction experience. The platform leverages cutting-edge technologies to provide accurate and contextually relevant answers to user queries.
        </p>

        <section className="my-4">
          <h2 className="text-lg font-semibold text-gray-400 dark:text-white mb-6">Technologies Used</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {projectData.technologies.map(tech => (
              <div key={tech.name} className="p-2 flex items-center justify-center flex-col shadow-sm text-white border border-orange-300 shadow-yellow-600 rounded-md hover:shadow hover:shadow-yellow-400">
                <Image src={tech.icon} alt={`Icon of ${tech.name}`} width={45} height={45} />
                <div className='text-sm font-me text-center'>{tech.name}</div>
              </div>
            ))}
          </div>
        </section>

        <h3 className="text-lg font-semibold text-gray-400 dark:text-white mt-4 mb-2">Core Functionality</h3>
        <p className="mt-2">
          The platform&apos;s core functionality revolves around the seamless interaction between users and their PDF documents. By leveraging advanced language models, the platform can understand and respond to user queries, providing accurate and contextually relevant answers. This interaction is facilitated by integrating Pinecone for efficient semantic search, LangChain for orchestrating the retrieval of relevant document chunks, and OpenAI&apos;s GPT-3.5 Turbo for generating precise answers. Users can effortlessly upload their PDFs, pose questions, and receive immediate responses, making document analysis and information retrieval intuitive and efficient.
        </p>

        <h3 className="text-lg font-semibold text-gray-400 dark:text-white mt-4 mb-2">Technical Architecture</h3>
        <p className="mt-2">
          The application is built using Next.js 13, chosen for its speed and server-side capabilities. TypeScript ensures type safety and enhances code maintainability. Tailwind CSS is used for styling, providing a modern and responsive user interface. Prisma and PlanetScale handle database interactions, offering a scalable and efficient data storage solution. tRPC and React Query manage data fetching and state synchronization, ensuring smooth and responsive user interactions. Stripe handles subscription payments, enabling a robust and seamless user experience.
        </p>

        <p className="mt-4">
          For more detailed information on this project, please visit the <a href={projectData.githubUrl} className="text-blue-500 underline">Github Code</a>.
        </p>
      </section>

    </div>
  );
};

export default ChatWithPDF;
