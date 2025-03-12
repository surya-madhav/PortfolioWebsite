import React from 'react';
import { getTechnologiesByCategory } from '@/data';
import SkillCard from './SkillCard';
import { TechStackItem } from '@/types/techstack';

// Define the valid category names
type CategoryName =
  | "Programming Languages"
  | "Web Technologies"
  | "Database & Data Engineering"
  | "Distributed Systems & Cloud"
  | "Machine Learning & High-Performance Computing"
  | "Generative AI";

// Order of categories to display
const categoryOrder = [
  "Programming Languages",
  "Web Technologies", 
  "Database & Data Engineering",
  "Distributed Systems & Cloud",
  "Machine Learning & High-Performance Computing",
  "Generative AI"
] as const;

const Skills = () => {
  // Get technologies from data module on the server, already grouped by category
  const techByCategory = getTechnologiesByCategory();
  
  return (
    <div>
      <h1 className='text-4xl font-bold text-center lg:text-left mt-12 mb-6'>Skills</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categoryOrder.map((category) => {
          const technologies = techByCategory[category] || [];
          
          if (!technologies.length) {
            return null;
          }

          // Determine grid columns based on number of items
          const gridColsClass =
            technologies.length <= 3 ? "grid-cols-3" :
            technologies.length <= 6 ? "grid-cols-3" :
            technologies.length <= 9 ? "grid-cols-3" :
            "grid-cols-4";

          return (
            <div
              key={category}
              className="p-4 border border-gray-700 rounded-lg bg-gray-900/50 backdrop-blur-sm
                          hover:border-orange-400 transition-all duration-300"
            >
              <h2 className="text-lg font-semibold mb-3 text-orange-300">
                {category}
              </h2>
              <div className={`grid ${gridColsClass} gap-2`}>
                {technologies.map((tech) => (
                  <SkillCard
                    key={tech.name}
                    name={tech.name}
                    icon={tech.icon}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;