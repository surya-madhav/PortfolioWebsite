'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import all components explicitly to avoid dynamic import expression issues
const componentLoaders = {
  alert: () => import('@/components/markdown/Alert'),
  codeblock: () => import('@/components/markdown/CodeBlock'),
  code: () => import('@/components/markdown/CodeBlock'),
  columns: () => import('@/components/markdown/Columns'),
  column: () => import('@/components/markdown/Column'),
  toc: () => import('@/components/markdown/TableOfContents'),
  tableofcontents: () => import('@/components/markdown/TableOfContents'),
  image: () => import('@/components/markdown/ImageWithCaption'),
  tabs: () => import('@/components/markdown/Tabs'),
  tab: () => import('@/components/markdown/Tab'),
  mermaid: () => import('@/components/markdown/MermaidWrapper'),
  youtube: () => import('@/components/YouTubeEmbed'),
};

interface ComponentRendererProps {
  name: string;
  props: Record<string, any>;
  children?: React.ReactNode;
  content?: string;
}

const ErrorComponent = ({ componentName, error }: { componentName: string; error?: string }) => (
  <div className="border border-red-500/50 bg-red-900/20 rounded-lg p-4 my-4">
    <div className="text-red-400 font-medium">
      Component Error: {componentName}
    </div>
    <div className="text-red-300 text-sm mt-1">
      {error || 'An error occurred while rendering this component.'}
    </div>
  </div>
);

const UnknownComponent = ({ componentName }: { componentName: string }) => (
  <div className="border border-orange-500/50 bg-orange-900/20 rounded-lg p-4 my-4">
    <div className="text-orange-400 font-medium">
      Unknown Component: {componentName}
    </div>
    <div className="text-orange-300 text-sm mt-1">
      This component is not registered in the component system.
    </div>
  </div>
);

// Helper to get dynamic component with type suppression
function getDynamicComponent(loader: any, name: string) {
  // @ts-ignore
  return dynamic(loader, {
    loading: () => <div className="animate-pulse bg-gray-800/50 rounded p-4 my-4 h-24"></div>,
    ssr: name.toLowerCase() === 'mermaid' ? false : true
  }) as React.ComponentType<any>;
}

export default function ComponentRenderer({ name, props, children, content }: ComponentRendererProps) {
  const loader = componentLoaders[name.toLowerCase() as keyof typeof componentLoaders];

  const Component = React.useMemo(() => {
    if (!loader) return null;
    return getDynamicComponent(loader, name);
  }, [loader, name]);

  if (!loader || !Component) {
    console.warn(`Unknown component: ${name}`);
    return <UnknownComponent componentName={name} />;
  }

  return (
    <ErrorBoundary componentName={name} fallback={<ErrorComponent componentName={name} />}>
      <Component {...props} content={content}>
        {children}
      </Component>
    </ErrorBoundary>
  );
}

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode; componentName: string },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode; componentName: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Component ${this.props.componentName} failed to render:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
