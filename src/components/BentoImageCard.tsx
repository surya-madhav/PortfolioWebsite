'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

interface BentoImageCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  categories: string[];
  className?: string;
  Icon: React.ElementType;
  videoUrl?: string;
}

export const BentoImageCard = ({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  categories,
  className = "",
  Icon,
  videoUrl
}: BentoImageCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-800/30 bg-gray-900/30 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:shadow-orange-500/10",
        className
      )}
    >
      {/* Image Top Section */}
      <div className={cn(
        "relative w-full overflow-hidden",
        className.includes("lg:col-span-2")
          ? "aspect-[2/1]"
          : "aspect-[3/2]",
        "transform transition-transform duration-300 group-hover:scale-[1.02]"
      )}>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/90" />
        {videoUrl ? (
          <div className="h-full w-full absolute inset-0">
            <YouTubeEmbed 
              videoId={videoUrl} 
              title={title}
              autoplay={true}
              showControls={false}
              loop={true}
              className="w-full h-full"
            />
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-all duration-500"
            priority={className.includes("sm:row-span-2")}
          />
        )}
        <div className="absolute bottom-0 left-0 z-20 p-3 sm:p-4">
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 3).map((category, idx) => (
              <span
                key={idx}
                className="rounded-md bg-gray-800/90 px-2 py-1 text-[10px] sm:text-xs text-orange-200 backdrop-blur-sm border border-orange-500/10"
              >
                {category}
              </span>
            ))}
            {categories.length > 3 && (
              <span className="rounded-md bg-gray-800/90 px-2 py-1 text-[10px] sm:text-xs text-orange-200 backdrop-blur-sm border border-orange-500/10">
                +{categories.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 shrink-0" />
          <h3 className="text-white text-base sm:text-lg font-medium leading-tight">{title}</h3>
        </div>
        <p className="text-gray-300 line-clamp-2 text-sm sm:text-base leading-relaxed">{description}</p>
        <div className="mt-3">
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="text-orange-400 hover:text-orange-300 hover:bg-gray-800/50 px-3 py-1 h-auto text-sm sm:text-base transition-colors duration-200"
          >
            <Link href={href} className="flex items-center">
              View Project
              <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
