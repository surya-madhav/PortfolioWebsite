'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ComponentProps } from '@/types/content';

interface ImageWithCaptionProps extends ComponentProps {
  src: string;
  alt?: string;
  caption?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  showCaption?: boolean;
  priority?: boolean;
  quality?: number;
  content?: string;
}

export default function ImageWithCaption({
  src,
  alt = '',
  caption,
  size = 'large',
  showCaption = true,
  priority = false,
  quality = 90,
  className = '',
  children,
  content
}: ImageWithCaptionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Get caption from various sources
  const displayCaption = caption || content || (typeof children === 'string' ? children : '');
  
  // Size classes
  const sizeClasses = {
    small: 'max-w-sm mx-auto',
    medium: 'max-w-2xl mx-auto',
    large: 'max-w-4xl mx-auto',
    full: 'w-full'
  };
  
  // Aspect ratio based on size
  const aspectRatios = {
    small: 'aspect-square',
    medium: 'aspect-video',
    large: 'aspect-video',
    full: 'aspect-video'
  };
  
  if (error) {
    return (
      <div className={`markdown-image-error ${sizeClasses[size]} ${className}`}>
        <div className="bg-gray-800/50 rounded-lg p-8 text-center">
          <div className="text-gray-400">
            Failed to load image
          </div>
          <div className="text-gray-500 text-sm mt-2">
            {src}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <figure className={`markdown-image-container ${sizeClasses[size]} ${className} my-8`}>
      <div className={`relative ${aspectRatios[size]} overflow-hidden rounded-lg`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        
        <Image
          src={src}
          alt={alt || displayCaption || ''}
          fill
          sizes={
            size === 'small' ? '(max-width: 384px) 100vw, 384px' :
            size === 'medium' ? '(max-width: 768px) 100vw, 768px' :
            size === 'large' ? '(max-width: 1024px) 100vw, 1024px' :
            '100vw'
          }
          priority={priority}
          quality={quality}
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      </div>
      
      {displayCaption && showCaption && (
        <figcaption className="text-sm text-gray-400 text-center mt-4 italic px-4">
          {displayCaption}
        </figcaption>
      )}
    </figure>
  );
}
