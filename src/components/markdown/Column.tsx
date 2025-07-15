'use client';

import React from 'react';
import { ComponentProps } from '@/types/content';

interface ColumnProps extends ComponentProps {
  span?: number;
  className?: string;
}

export default function Column({
  children,
  span,
  className = ''
}: ColumnProps) {
  return (
    <div 
      className={`markdown-column ${className}`}
      style={span ? { gridColumn: `span ${span}` } : undefined}
    >
      {children}
    </div>
  );
} 