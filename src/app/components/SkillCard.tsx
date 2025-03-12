"use client";

import React from 'react';
import Image from 'next/image';

interface SkillCardProps {
  name: string;
  icon: string;
}

const SkillCard = ({ name, icon }: SkillCardProps) => {
  // Fallback icon in case the specified icon doesn't exist
  const fallbackIcon = "/icons/placeholder.svg";
  
  return (
    <div 
      className="p-2 flex flex-col items-center justify-center 
                border border-gray-700 rounded-md 
                hover:border-orange-400 hover:bg-gray-800/50
                bg-gray-900/30 backdrop-blur-sm 
                transition-all duration-200
                h-16 min-h-16"
    >
      <div className="h-7 w-7 relative mb-1">
        <Image 
          src={icon || fallbackIcon} 
          alt={`${name} icon`}
          fill
          sizes="28px"
          style={{objectFit: "contain"}}
          loading="lazy"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const imgElement = e.target as HTMLImageElement;
            imgElement.src = fallbackIcon;
          }}
        />
      </div>
      <span className="text-xs text-center font-light line-clamp-1" title={name}>
        {name}
      </span>
    </div>
  );
};

export default SkillCard;