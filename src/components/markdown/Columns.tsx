'use client';

import React, { useMemo, useEffect, Fragment } from 'react';
import { ComponentProps } from '@/types/content';

interface ColumnsProps extends ComponentProps {
  ratio?: string; // e.g., "2:1", "1:2:1"
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  stack?: 'sm' | 'md' | 'lg' | 'never';
  align?: 'start' | 'center' | 'end' | 'stretch';
}

export default function Columns({
  children,
  ratio = '1:1',
  gap = 'lg',
  stack = 'md',
  align = 'stretch',
  className = ''
}: ColumnsProps) {
  // Parse ratio string
  const ratios = ratio.split(':').map(Number);
  const numColumns = ratios.length;
  
  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Columns component rendered with', numColumns, 'columns');
    }
  }, [ratio, gap, stack, align, numColumns, ratios]);
  
  // Gap classes
  const gapClasses = {
    sm: 'gap-2 md:gap-3',
    md: 'gap-4 md:gap-6', 
    lg: 'gap-6 md:gap-8',
    xl: 'gap-8 md:gap-12'
  };
  
  // Align classes
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };
  
  // Parse children to split into columns
  const columns = useMemo(() => {
    const childArray = React.Children.toArray(children);
    const columnData: React.ReactNode[][] = [];
    let currentColumn: React.ReactNode[] = [];
    let columnIndex = 0;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Parsing columns with', childArray.length, 'children');
    }
    
    childArray.forEach((child, index) => {
      if (React.isValidElement(child)) {
        // Handle fragments that wrap the actual elements
        let elementToCheck = child;
        
        // If this is a Fragment, check its children
        if ((child.type === Fragment || child.type.toString() === 'Symbol(react.fragment)') && child.props?.children) {
          const fragmentChild = child.props.children;
          if (React.isValidElement(fragmentChild)) {
            elementToCheck = fragmentChild;
          }
        }
        
        // Check if this is an h3 element (column separator)
        const isH3 = elementToCheck.type === 'h3' || 
                     (typeof elementToCheck.type === 'string' && elementToCheck.type.toLowerCase() === 'h3') ||
                     (elementToCheck.props && (elementToCheck.props.mdxType === 'h3' || elementToCheck.props.originalType === 'h3'));
        
        if (process.env.NODE_ENV === 'development' && isH3) {
          console.log(`Found column separator at child ${index}`);
        }
        
        if (isH3) {
          // If we have content in current column, save it
          if (currentColumn.length > 0) {
            columnData.push(currentColumn);
            columnIndex++;
          }
          // Start new column with this heading
          currentColumn = [child];
        } else {
          // Add to current column
          currentColumn.push(child);
        }
      } else {
        // Add non-element content to current column
        currentColumn.push(child);
      }
    });
    
    // Don't forget the last column
    if (currentColumn.length > 0) {
      columnData.push(currentColumn);
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Created', columnData.length, 'columns');
    }
    
    return columnData;
  }, [children]);
  
  // Get grid classes based on column count - using explicit classes for Tailwind JIT
  const getGridClass = () => {
    // Base responsive classes
    let baseClass = 'grid grid-cols-1';
    
    // Add responsive breakpoints based on stack prop and column count
    switch (numColumns) {
      case 2:
        switch (stack) {
          case 'sm':
            return `${baseClass} sm:grid-cols-2`;
          case 'md':
            return `${baseClass} md:grid-cols-2`;
          case 'lg':
            return `${baseClass} lg:grid-cols-2`;
          case 'never':
            return 'grid grid-cols-2';
          default:
            return `${baseClass} md:grid-cols-2`;
        }
      case 3:
        switch (stack) {
          case 'sm':
            return `${baseClass} sm:grid-cols-3`;
          case 'md':
            return `${baseClass} md:grid-cols-3`;
          case 'lg':
            return `${baseClass} lg:grid-cols-3`;
          case 'never':
            return 'grid grid-cols-3';
          default:
            return `${baseClass} md:grid-cols-3`;
        }
      case 4:
        switch (stack) {
          case 'sm':
            return `${baseClass} sm:grid-cols-4`;
          case 'md':
            return `${baseClass} md:grid-cols-4`;
          case 'lg':
            return `${baseClass} lg:grid-cols-4`;
          case 'never':
            return 'grid grid-cols-4';
          default:
            return `${baseClass} md:grid-cols-4`;
        }
      default:
        // For other column counts, we'll use inline styles
        return baseClass;
    }
  };
  
  // Check if we need custom grid ratios
  const needsCustomGrid = ratios.length > 1 && !ratios.every(r => r === ratios[0]);
  
  // Build inline styles for custom ratios
  const getInlineStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    
    // Apply custom grid template for non-equal ratios or non-standard column counts
    if (needsCustomGrid || numColumns > 4) {
      const gridTemplate = ratios.map(r => `${r}fr`).join(' ');
      
      if (stack === 'never') {
        styles.gridTemplateColumns = gridTemplate;
      } else {
        // For responsive layouts, we'll use CSS custom properties
        (styles as React.CSSProperties & { [key: string]: string })['--columns-template'] = gridTemplate;
      }
    }
    
    return styles;
  };
  
  const gridClass = getGridClass();
  const inlineStyles = getInlineStyles();
  
  // Add responsive styles class if using custom ratios with responsive behavior
  const responsiveClass = needsCustomGrid && stack !== 'never' 
    ? `columns-responsive-${stack}` 
    : '';
  
  return (
    <div 
      className={`markdown-columns ${gridClass} ${responsiveClass} ${gapClasses[gap]} ${alignClasses[align]} my-8 ${className}`.trim()}
      style={inlineStyles}
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className="markdown-column"
        >
          {column}
        </div>
      ))}
    </div>
  );
}
