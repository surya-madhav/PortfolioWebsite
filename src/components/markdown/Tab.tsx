'use client';

import React from 'react';
import { ComponentProps } from '@/types/content';

interface TabProps extends ComponentProps {
  title: string;
  icon?: React.ReactNode;
}

export default function Tab({
  children,
  title,
  icon,
  className = ''
}: TabProps) {
  return (
    <div className={`markdown-tab-content ${className}`}>
      {children}
    </div>
  );
} 