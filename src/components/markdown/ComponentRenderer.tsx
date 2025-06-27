'use client';

import React, { Component, ErrorInfo, ReactNode, Suspense } from 'react';
import { getComponent } from '@/lib/components/registry';

// --- Error Boundary (Client-Side) ---

interface ErrorBoundaryProps {
  children: ReactNode;
  componentName: string;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ComponentErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in component ${this.props.componentName}:`, error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="border border-red-500/50 bg-red-900/20 rounded-lg p-4 my-4">
          <div className="text-red-400 font-bold">Component Error: {this.props.componentName}</div>
          <div className="text-red-300 text-sm mt-1">{this.state.error?.message || 'An unknown error occurred.'}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Component Renderer (Client-Side Wrapper) ---

export default function ComponentRenderer({
  name,
  props = {},
  content,
  children,
}: {
  name: string;
  props?: Record<string, any>;
  content?: string;
  children?: ReactNode;
}) {
  const Component = getComponent(name);

  if (!Component) {
    return (
      <div className="border border-orange-500/50 bg-orange-900/20 rounded-lg p-4 my-4">
        <div className="text-orange-400 font-bold">Unknown Component: {name}</div>
        <div className="text-orange-300 text-sm mt-1">This component is not registered.</div>
        {(children || content) && (
          <pre className="mt-3 text-gray-400 text-xs bg-gray-900/50 p-2 rounded">{children || content}</pre>
        )}
      </div>
    );
  }

  return (
    <ComponentErrorBoundary componentName={name}>
      <Suspense fallback={<div className="animate-pulse bg-gray-800/50 rounded-lg p-4 h-24 my-4" />}>
        <Component {...props}>{children || content}</Component>
      </Suspense>
    </ComponentErrorBoundary>
  );
} 