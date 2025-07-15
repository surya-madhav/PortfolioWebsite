import dynamic from 'next/dynamic';

/**
 * Component Registry
 * 
 * This file maintains a map of component names (used in markdown :::name)
 * to their corresponding file paths. This allows for dynamic loading
 * of components without needing to import them all upfront.
 * 
 * The ComponentRenderer uses this map to dynamically import components.
 */

// A map of component names to their file names (without extension)
export const componentMap: Record<string, string> = {
  // Essential components (Epic 3)
  'code': 'CodeBlock',
  'codeblock': 'CodeBlock', // Alias
  'columns': 'Columns',
  'column': 'Column',
  'toc': 'TableOfContents',
  'tableofcontents': 'TableOfContents', // Alias
  'image': 'ImageWithCaption',
  'alert': 'Alert',
  'tabs': 'Tabs',
  'tab': 'Tab',
  'mermaid': 'MermaidWrapper', // Use wrapper for SSR compatibility

  // Interactive/advanced components (Future Epics)
  'youtube': 'YouTubeEmbed'
};

/**
 * Retrieves a component's file name from the map.
 * @param name The name of the component to retrieve.
 * @returns The file name or undefined if not found.
 */
export function getComponentFileName(name: string): string | undefined {
  return componentMap[name.toLowerCase()];
}

// --- Component Registry ---

// A flexible type for dynamically imported components
type LazyComponent = React.ComponentType<any>;

const componentRegistry = new Map<string, LazyComponent>();

/**
 * Register a component for use in markdown.
 * Components are lazy-loaded for better performance.
 * @param name The name of the component (used in :::name).
 * @param componentPath The path to the component file relative to `src/components/markdown`.
 */
export function registerComponent(name: string, componentPath: string) {
  if (!componentRegistry.has(name)) {
    componentRegistry.set(
      name.toLowerCase(),
      dynamic(() => import(`@/components/markdown/${componentPath}`), {
        suspense: true,
      })
    );
  }
}

/**
 * Initializes the component registry with all known components.
 */
export function initializeRegistry() {
  // This function is kept for backward compatibility but is not currently used
  // Components are loaded via componentMap in ComponentRenderer
}

/**
 * Retrieves a component from the registry.
 * @param name The name of the component to retrieve.
 * @returns The lazy-loaded component or undefined if not found.
 */
export function getComponent(name: string): LazyComponent | undefined {
  return componentRegistry.get(name.toLowerCase());
}
