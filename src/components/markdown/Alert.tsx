'use client';

import React from 'react';
import { ComponentProps } from '@/types/content';
import { 
  InformationCircleIcon, 
  ExclamationTriangleIcon,
  XCircleIcon,
  CheckCircleIcon,
  LightBulbIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

interface AlertProps extends ComponentProps {
  type?: 'info' | 'warning' | 'error' | 'success' | 'tip' | 'note';
  title?: string;
  icon?: boolean;
  dismissible?: boolean;
}

const iconMap = {
  info: InformationCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
  success: CheckCircleIcon,
  tip: LightBulbIcon,
  note: BookOpenIcon
};

const typeStyles = {
  info: {
    container: 'bg-blue-900/20 border-blue-500/50',
    icon: 'text-blue-400',
    title: 'text-blue-300',
    content: 'text-blue-200'
  },
  warning: {
    container: 'bg-orange-900/20 border-orange-500/50',
    icon: 'text-orange-400',
    title: 'text-orange-300',
    content: 'text-orange-200'
  },
  error: {
    container: 'bg-red-900/20 border-red-500/50',
    icon: 'text-red-400',
    title: 'text-red-300',
    content: 'text-red-200'
  },
  success: {
    container: 'bg-green-900/20 border-green-500/50',
    icon: 'text-green-400',
    title: 'text-green-300',
    content: 'text-green-200'
  },
  tip: {
    container: 'bg-purple-900/20 border-purple-500/50',
    icon: 'text-purple-400',
    title: 'text-purple-300',
    content: 'text-purple-200'
  },
  note: {
    container: 'bg-gray-800/40 border-gray-600/50',
    icon: 'text-gray-400',
    title: 'text-gray-300',
    content: 'text-gray-200'
  }
};

export default function Alert({
  children,
  type = 'info',
  title,
  icon = true,
  dismissible = false,
  className = ''
}: AlertProps) {
  const [dismissed, setDismissed] = React.useState(false);
  
  if (dismissed) {
    return null;
  }
  
  const Icon = iconMap[type];
  const styles = typeStyles[type];
  
  // Default titles
  const defaultTitles = {
    info: 'Information',
    warning: 'Warning',
    error: 'Error',
    success: 'Success',
    tip: 'Tip',
    note: 'Note'
  };
  
  const displayTitle = title || defaultTitles[type];
  
  return (
    <div 
      className={`markdown-alert ${styles.container} ${className}`}
      role="alert"
    >
      <div className="flex">
        {icon && (
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${styles.icon}`} aria-hidden="true" />
          </div>
        )}
        
        <div className={`${icon ? 'ml-3' : ''} flex-1`}>
          {displayTitle && (
            <h3 className={`text-sm font-medium ${styles.title} mb-1`}>
              {displayTitle}
            </h3>
          )}
          
          <div className={`text-sm ${styles.content}`}>
            {children}
          </div>
        </div>
        
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 ${styles.icon} hover:bg-gray-800/50 transition-colors`}
              onClick={() => setDismissed(true)}
            >
              <span className="sr-only">Dismiss</span>
              <XCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 