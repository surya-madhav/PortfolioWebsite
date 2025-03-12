"use client";

import React from 'react';
import Image from 'next/image';

interface SkillCardProps {
  name: string;
  icon: string;
}

const SkillCard = ({ name, icon }: SkillCardProps) => {
  return (
    <div 
      className="p-4 flex flex-col items-center justify-center 
                border border-gray-700 rounded-lg 
                hover:border-orange-400 bg-gray-900/30
                backdrop-blur-sm transition-all duration-300"
    >
      <div className="h-10 w-10 relative mb-2">
        <Image 
          src={icon} 
          alt={`${name} icon`}
          fill
          sizes="40px"
          style={{objectFit: "contain"}}
          loading="lazy"
        />
      </div>
      <span className="text-sm text-center">{name}</span>
    </div>
  );
};

export default SkillCard;