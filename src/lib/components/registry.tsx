import dynamic from 'next/dynamic';

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
  // We will register all our markdown components here in Epic 3.
  // Example:
  // registerComponent('Alert', 'Alert');
}

/**
 * Retrieves a component from the registry.
 * @param name The name of the component to retrieve.
 * @returns The lazy-loaded component or undefined if not found.
 */
export function getComponent(name: string): LazyComponent | undefined {
  return componentRegistry.get(name.toLowerCase());
} 