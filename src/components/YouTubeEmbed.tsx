'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
  showControls?: boolean;
  loop?: boolean;
  thumbnailUrl?: string; // Thumbnail to show while loading
}

export const YouTubeEmbed = ({ 
  videoId, 
  title = "YouTube video player", 
  autoplay = true,
  className = "w-full h-full aspect-video",
  showControls = false,
  loop = true,
  thumbnailUrl
}: YouTubeEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Extract video ID from URL if full URL is provided
  const extractedVideoId = videoId.includes('youtube.com') || videoId.includes('youtu.be')
    ? videoId.includes('v=')
      ? videoId.split('v=')[1].split('&')[0]
      : videoId.split('/').pop()?.split('?')[0]
    : videoId;

  // If no thumbnail provided, use YouTube's thumbnail service
  const defaultThumbnail = `https://img.youtube.com/vi/${extractedVideoId}/hqdefault.jpg`;
  const finalThumbnailUrl = thumbnailUrl || defaultThumbnail;

  // Set up a timer to simulate loading (YouTube doesn't provide reliable load events)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulated load time
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${className} relative overflow-hidden`}>
      {/* Thumbnail/placeholder that shows while loading */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
          <Image 
            src={finalThumbnailUrl}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-white animate-spin"></div>
          </div>
        </div>
      )}
      
      {/* YouTube iframe (always rendered but only visible after loading) */}
      <iframe
        src={`https://www.youtube.com/embed/${extractedVideoId}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}&controls=${showControls ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${extractedVideoId}&modestbranding=1&showinfo=0&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`w-full h-full rounded-md ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
      />
    </div>
  );
};
