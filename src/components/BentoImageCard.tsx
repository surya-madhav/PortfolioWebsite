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
        "group relative overflow-hidden rounded-xl border border-gray-800/30 bg-gray-900/30 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 flex flex-col h-full",
        className
      )}
    >
      {/* Image Top Section */}
      <div className={cn(
        "relative w-full overflow-hidden",
        className.includes("md:row-span-2") ? "flex-grow md:h-72" : "h-48"
      )}>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/90" />
        {videoUrl ? (
          <div className="h-full w-full absolute inset-0">
            <YouTubeEmbed 
              videoId={videoUrl} 
              title={title}
              autoplay={true}
              className="w-full h-full"
            />
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={300}
            className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute bottom-0 left-0 z-20 p-4">
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 3).map((category, idx) => (
              <span
                key={idx}
                className="rounded-md bg-gray-800/80 px-2 py-1 text-xs text-orange-200 backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
            {categories.length > 3 && (
              <span className="rounded-md bg-gray-800/80 px-2 py-1 text-xs text-orange-200 backdrop-blur-sm">
                +{categories.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-orange-400" />
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-2 text-gray-300 line-clamp-2">{description}</p>
        <div className="mt-3">
          <Button variant="ghost" asChild size="sm" className="text-orange-400 hover:text-orange-300 hover:bg-gray-800/50 px-3 py-1 h-auto">
            <Link href={href}>
              View Project
              <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
