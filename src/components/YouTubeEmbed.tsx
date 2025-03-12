'use client';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
}

export const YouTubeEmbed = ({ 
  videoId, 
  title = "YouTube video player", 
  autoplay = true,
  className = "w-full h-full aspect-video"
}: YouTubeEmbedProps) => {
  // Extract video ID from URL if full URL is provided
  let extractedVideoId = videoId;
  
  console.log('Original videoId:', videoId);
  
  // Handle different YouTube URL formats
  if (videoId.includes('youtube.com/watch?v=')) {
    extractedVideoId = videoId.split('watch?v=')[1].split('&')[0];
  } else if (videoId.includes('youtu.be/')) {
    extractedVideoId = videoId.split('youtu.be/')[1].split('?')[0];
  } else if (videoId.includes('youtube.com/embed/')) {
    extractedVideoId = videoId.split('embed/')[1].split('?')[0];
  }
  
  console.log('Extracted videoId:', extractedVideoId);

  return (
    <div className={`${className} relative overflow-hidden`} style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${extractedVideoId}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}&controls=0&showinfo=0&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-md"
      />
    </div>
  );
};
