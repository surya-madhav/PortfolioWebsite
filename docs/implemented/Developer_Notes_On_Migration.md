# Developer Notes: Avoiding Type Errors During Migration

This document contains a set of best practices and reminders to prevent common TypeScript-related build errors during the migration from the legacy `projects.json` system to the new flat-file content system.

The core of the recent build failures stems from a **data shape mismatch**. Our new TypeScript types (`Content`, `Project`) are much stricter than the old JSON structure. The application will fail if the data passed to a component does not perfectly match the types it expects.

---

## Key Principles & Best Practices

### 1. Always Enrich Raw Data Before Use

The raw data from `projects.json` is just a collection of strings and simple types. It **must** be transformed before being used in components.

- **What to do:** Always use the `enrichProjectWithTechStack` function after fetching a project that needs its tech stack displayed. This function safely maps the `string[]` of tech names to the full `TechStackItem[]` of objects that components expect.

- **Example (`[slug]/page.tsx`):**

  ```typescript
  // Before
  // const project = projects.find((p) => p.slug === params.slug);
  // This is wrong because `project` is not enriched.

  // After (Correct)
  const foundProject = allProjects.find((p) => p.slug === params.slug);
  if (foundProject) {
    project = enrichProjectWithTechStack(foundProject);
  }
  ```

### 2. Guard Against `undefined` and `null` Values

Our new `Project` type has many optional fields (`githubUrl`, `videoUrl`, `techStack`, etc.). The build will fail if you try to use an optional value directly, as it could be `undefined`.

- **What to do:** Always wrap components or code blocks that use optional properties in a conditional check.

- **Example (`[slug]/page.tsx`):**
  - **Error:** Passing `project.githubUrl` (which could be `undefined`) directly to a `<Link>` component.
  - **Fix:** Check for its existence first.

  ```tsx
  {/* Correct: Only render the Link if the URL exists */}
  {project.githubUrl && (
    <Link href={project.githubUrl}>
      <GitHubLogoIcon />
    </Link>
  )}
  ```

### 3. Be Careful with Legacy Utility Files

Some older files were designed to work with the old data structure and may not be fully compatible with the new types.

- **Be Wary Of:** `src/lib/server-utils.ts` is a key example. It was written for the old system.
- **What to do:** When using functions from these files, be extra vigilant. The error in `validateTechStack` occurred because it didn't check if `project.techStack` existed before trying to loop over it. When in doubt, add defensive checks.

### 4. Understand the Data Flow

If you encounter a type error, trace the data from its source to the component where the error occurs. The most likely cause is that a necessary data transformation step was missed somewhere along the way.

**Typical Data Flow:**
1.  **Raw Data**: `projects.json` (simple, untyped)
2.  **Initial Load**: `src/data/index.ts` loads and applies a basic transformation to match the `Project` type.
3.  **Enrichment**: `enrichProjectWithTechStack` is called to map `techStack` strings to objects.
4.  **Component Render**: The fully enriched, type-safe `project` object is passed to the page/component.

---

By following these guidelines, we can ensure the data always has the shape our components expect, preventing these types of build errors in the future. 