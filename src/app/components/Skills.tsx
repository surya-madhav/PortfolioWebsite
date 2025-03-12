"use client";
import React from 'react';
import Image from 'next/image';
import { getTechnologiesByCategory } from '@/data';

const Skills = () => {
  // Get technologies from data module, grouped by category
  const techByCategory = getTechnologiesByCategory();
  
  // Categories we want to display, in the order we want to display them
  const categoriesToShow = [
    "Frontend Framework", 
    "Backend Framework", 
    "Programming Language", 
    "Database", 
    "Cloud Provider", 
    "DevOps",
    "AI Framework",
    "Machine Learning"
  ];
  
  return (
    <div>
      <h1 className='text-4xl font-bold text-center lg:text-left mt-12 mb-6'>Skills</h1>
      
      <div className="space-y-8">
        {categoriesToShow.map(category => (
          // Only display categories that have technologies
          techByCategory[category] && techByCategory[category].length > 0 ? (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-orange-300">{category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {techByCategory[category].map(tech => (
                  <div 
                    key={tech.name} 
                    className="p-4 flex flex-col items-center justify-center 
                             border border-gray-700 rounded-lg hover:border-orange-400 
                             transition-all duration-300 bg-gray-800/50 backdrop-blur-sm
                             hover:shadow-md hover:shadow-orange-500/10"
                  >
                    <div className="h-10 w-10 relative mb-2">
                      <Image 
                        src={tech.icon} 
                        alt={`${tech.name} icon`}
                        fill
                        style={{objectFit: "contain"}}
                      />
                    </div>
                    <span className="text-sm text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default Skills;