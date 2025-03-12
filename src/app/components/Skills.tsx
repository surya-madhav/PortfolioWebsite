import React from 'react';
import { getTechnologiesByCategory } from '@/data';
import SkillCard from './SkillCard';

// Categories to display in order
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

const Skills = () => {
  // Get technologies from data module on the server
  const techByCategory = getTechnologiesByCategory();
  
  return (
    <div>
      <h1 className='text-4xl font-bold text-center lg:text-left mt-12 mb-6'>Skills</h1>
      
      <div className="space-y-8">
        {categoriesToShow.map(category => {
          const technologies = techByCategory[category];
          
          if (!technologies?.length) {
            return null;
          }

          return (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-orange-300">{category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {technologies.map(tech => (
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