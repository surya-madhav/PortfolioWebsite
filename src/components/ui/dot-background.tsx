"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useId, useRef, useState } from "react";

interface DotBackgroundProps {
  width?: number;
  height?: number;
  cr?: number;
  opacity?: number;
  className?: string;
  children: React.ReactNode;
}

export function DotBackground({
  width = 24,
  height = 24,
  cr = 1,
  opacity = 0.2,
  className,
  children,
}: DotBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Only render dots after the component is mounted to avoid SSR issues
  if (!mounted) {
    return (
      <div ref={containerRef} className={cn("relative w-full", className)}>
        {children}
      </div>
    );
  }

  // Generate dots based on container dimensions
  const dots = [];
  if (dimensions.width > 0 && dimensions.height > 0) {
    const cols = Math.ceil(dimensions.width / width);
    const rows = Math.ceil(dimensions.height / height);
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * width + width / 2,
          y: row * height + height / 2,
        });
      }
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: opacity }}
      >
        {dots.map((dot, index) => (
          <circle
            key={`dot-${index}`}
            cx={dot.x}
            cy={dot.y}
            r={cr}
            className="fill-current text-neutral-400"
          />
        ))}
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
