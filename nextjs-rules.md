# Next.js Rule Files for AI Coding Assistants

This document contains three rule files you can use with AI coding assistants to avoid common Next.js mistakes.

## 1. `.cursorrules` for Cursor Editor

```
You are an expert Next.js developer with deep knowledge of React, server components, and client components.

# CRITICAL NEXT.JS APP ROUTER PRINCIPLES

## Server vs Client Components

- All components in Next.js App Router are SERVER components by default
- Only add "use client" directive to components that NEED client-side interactivity
- Keep "use client" directives at the EDGES of your component tree (typically UI components like buttons, forms, inputs)
- NEVER place "use client" unnecessarily high in the component tree as this eliminates server component benefits
- When a component needs interactivity, extract just that interactive part into a separate client component
- Components imported into a file with "use client" automatically become client components
- Server components can remain server components when passed as children or props to client components (interleaving)

## State Management

- NEVER use Context API, Zustand, Redux or other state management in server components
- State management ONLY works on the client side
- Server components should focus on data fetching and rendering

## Data Security

- NEVER pass sensitive data (API keys, passwords, tokens) from server to client components
- Filter sensitive data before passing it to client components
- Use server-side data access layers to keep sensitive information on the server

## Execution Context

- Remember client components execute TWICE: once on server during pre-rendering, once in browser during hydration
- NEVER access browser APIs (window, document, localStorage) without proper checks:
  - Check if window exists: `if (typeof window !== 'undefined') { /* browser code */ }`
  - Use useEffect for browser API access: `useEffect(() => { /* browser code */ }, [])`
  - Use dynamic imports with `{ ssr: false }` for components that should only render client-side

## Hydration

- Ensure consistent rendering between server and client to avoid hydration errors
- Use `suppressHydrationWarning` for unavoidable mismatches (like dynamic dates)
- Fix incorrect HTML nesting (like div inside p)
- Use useEffect for client-only rendering of dynamic content

## Third-Party Components

- Create wrapper components for third-party libraries that use React hooks:
  1. Create a new file with "use client" at the top
  2. Import the third-party component
  3. Re-export it as default
  4. Use your wrapper instead of the original component
- For components using browser APIs, use dynamic imports with `{ ssr: false }`

## Data Fetching

- Fetch data directly in server components instead of creating API routes just for internal data fetching
- Don't worry about duplicate fetches - Next.js automatically deduplicates requests with the same URL
- Avoid data fetching waterfalls by fetching in parallel when possible
- Use Promise.all for multiple fetches

## Forms and Data Mutations

- You CANNOT submit form data directly to server components
- Use server actions or API routes for form submissions
- Always use appropriate revalidation techniques after data mutations:
  - `revalidatePath()` to refresh specific routes
  - `revalidateTag()` for fetch requests using tags
  - `Router.refresh()` for client-side refreshes

## Server Actions

- Server actions can be used in both server AND client components
- In client components, import server actions marked with "use server" from other files
- Always validate inputs and implement proper security in server actions
- "use server" is for creating server actions, not for general code security
- For module-level security, use the "server-only" package

## Routing and URLs

- Understand the difference between params and searchParams:
  - params: Path parameters from dynamic segments (like [id] in route)
  - searchParams: Query parameters from URL (after the ? in URL)
- In server components: Access searchParams from page props
- In client components: Use the useSearchParams hook
- Remember searchParams values are always strings

## Loading States and Suspense

- Implement proper loading states using loading.js files, Suspense boundaries, or skeleton components
- Use granular Suspense boundaries around specific data-dependent components
- Place Suspense boundaries around the smallest possible components that need to wait for data
- Always provide a unique key prop to Suspense when its children depend on dynamic data

## Rendering and Performance

- Be aware of what makes a page dynamic vs. static:
  - Using cookies() or headers() APIs makes pages dynamic
  - Using dynamic functions like searchParams or dynamic route segments
- Use environment variables properly:
  - NEXT_PUBLIC_* for client-accessible variables
  - Regular environment variables for server-only secrets
- Create separate utility files for client and server functionality:
  - /utils/server/... for server-only utilities
  - /utils/client/... for client-only utilities
  - /utils/shared/... for utilities that work in both environments
- Don't use redirect() inside try/catch without special handling:
  ```jsx
  try {
    // code that might throw
    redirect('/success')
  } catch (error) {
    if (error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error; // Re-throw redirect errors
    }
    // Handle other errors
  }
  ```

## Code Style
- Use descriptive variable and function names
- Organize imports: React first, then libraries, then components, then styles
- Comment complex logic but avoid obvious comments
- Use TypeScript for type safety
- Utilize Next.js Image component for optimized images
- Use CSS Modules or Tailwind for styling
```

## 2. `.clientrules` for Client-Side Specific Rules

```
# Next.js Client Component Rules

## Client Component Creation
- Create client components ONLY when you need:
  - Interactivity (event listeners, click handlers)
  - Browser APIs (localStorage, navigator)
  - React hooks (useState, useEffect, useContext)
  - Client-side-only libraries

## Client Component Placement
- Keep client components at the EDGES of your component tree
- Extract interactive parts into dedicated client components
- Name client components with a descriptive suffix (e.g., ButtonClient, FormClient)

## Client Component Performance
- Use memo() for expensive render components
- Implement useMemo() and useCallback() for expensive calculations and callback functions
- Avoid unnecessary re-renders by using proper key props for lists
- Implement proper loading and error states
- Use React.lazy() and dynamic imports for code splitting

## Client Component Data Fetching
- Prefer SWR or React Query for client-side data fetching
- Implement proper loading, error, and empty states
- Use optimistic UI updates for better user experience
- Handle race conditions in async operations

## Forms and Input Handling
- Validate form inputs on the client side before submission
- Use controlled components for form elements
- Implement proper form state handling
- Show loading states during form submission
- Display clear error messages

## Client-Side Navigation
- Use the Next.js Link component for client-side navigation
- Implement loading indicators for navigation
- Handle back button and history navigation properly
- Scroll to top on navigation (or maintain scroll position when appropriate)

## State Management
- Keep state as local as possible
- Only use global state when absolutely necessary
- Consider using the Context API for theme, auth, and other global app state
- Break down large context providers into smaller, focused ones

## Hydration Errors Prevention
- Don't use browser APIs during initial render
- Generate the same markup on the server and client
- Use useEffect for client-only logic
- Implement suppressHydrationWarning when appropriate
- Avoid manipulating the DOM directly (use refs instead)

## Browser API Usage
- Always check if window/document exists before using browser APIs
- Use useEffect hooks for browser API access
- Encapsulate browser API calls in custom hooks
- Handle browser compatibility issues

## Error Handling
- Implement error boundaries for client components
- Use try/catch for async operations
- Display user-friendly error messages
- Log errors for debugging
- Fallback to degraded UI instead of crashing

## Security
- Sanitize user inputs
- Don't store sensitive information in localStorage or sessionStorage
- Implement proper CSRF protection
- Use HTTPS for all API requests
- Don't trust client-side data validation alone
```

## 3. `.windsurf` Rules File

```
# Next.js Rules for Windsurf

You are an expert Next.js developer. When helping with Next.js code, follow these strict guidelines to avoid common mistakes:

## Server vs Client Components
- Next.js App Router components are server components by default
- Only add "use client" when component needs:
  - Interactivity through event handlers
  - React hooks (useState, useEffect, useContext)
  - Browser APIs (window, document, localStorage)
  - Client-side libraries that use hooks
- Keep "use client" at leaf nodes of the component tree
- Remember: Adding "use client" to a component makes all its imports client components too
- Server components can be passed as children or props to client components (interleaving)

## Data Fetching
- Fetch data directly in server components
- Don't create API routes just for internal data fetching
- Next.js automatically deduplicates identical fetch requests
- Use Promise.all for parallel data fetching
- Implement proper loading states with Suspense
- Avoid fetch waterfalls by lifting data fetching up

## Forms and Mutations
- Use server actions (functions with "use server") for form submissions
- Never submit form data directly to server components
- Validate inputs on both client and server
- Implement proper security in server actions
- After mutations, use revalidatePath() or revalidateTag() to refresh data

## Component Structure
- Extract client-specific logic into separate client components
- Keep server components focused on data fetching and rendering
- Organize related components in feature folders
- Implement proper error boundaries

## State Management
- Never use state management in server components
- Use React Context only in client components
- Keep state as local as possible
- Consider using server actions for state that needs server processing

## Browser APIs
- Only use browser APIs in client components
- Always check if window is defined before accessing browser APIs
- Wrap browser API calls in useEffect
- Consider using dynamic imports with { ssr: false } for browser-heavy components

## Routing and Navigation
- Use Next.js Link component for client-side navigation
- Access URL params in server components from props
- Use useParams() and useSearchParams() in client components
- Implement loading indicators for navigation

## Hydration Errors
- Ensure server and client render the same content
- Don't use dynamic content generation in initial render
- Use useEffect for client-only content
- Fix invalid HTML nesting (like div inside p)
- Use suppressHydrationWarning for unavoidable differences

## Performance
- Don't add "use client" unnecessarily high in component tree
- Implement code splitting with dynamic imports
- Use the Image component for optimized images
- Consider static vs dynamic rendering appropriately
- Use incremental static regeneration when possible

## Security
- Never expose API keys or secrets in client components
- Filter sensitive data before passing to client components
- Use environment variables properly (.env vs .env.local)
- Validate all inputs, especially in server actions
- Sanitize user-generated content

## Error Handling
- Use try/catch for async operations
- Implement error boundaries for client components
- Display user-friendly error messages
- With redirect(), be careful inside try/catch blocks as they throw a NEXT_REDIRECT error
```

Feel free to use these rule files with your preferred AI coding assistant. They're specifically designed to prevent the 29 common Next.js mistakes outlined in the document you shared, plus some additional best practices.

## Usage Instructions

1. Choose the appropriate rule file for your AI coding assistant:
   - `.cursorrules` for Cursor
   - `.clientrules` for client-component specific guidance
   - `.windsurf` for Windsurf (formerly Codeium)

2. Save the file in the root directory of your Next.js project with the appropriate extension.

3. The AI coding assistant will automatically use these rules when helping you write and refactor code.

4. Customize the rules based on your project's specific needs and your team's coding standards.
