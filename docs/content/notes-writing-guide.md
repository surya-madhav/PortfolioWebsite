# Notes Writing Guide for Portfolio

This guide provides comprehensive instructions for writing notes in markdown format for the portfolio website. Notes are quick, focused pieces of content that share insights, tips, learnings, or technical snippets.

## Table of Contents

1. [What are Notes?](#what-are-notes)
2. [Frontmatter Schema](#frontmatter-schema)
3. [Required Fields](#required-fields)
4. [Optional Fields](#optional-fields)
5. [Content Structure](#content-structure)
6. [Markdown Components](#markdown-components)
7. [Writing Best Practices](#writing-best-practices)
8. [SEO Guidelines](#seo-guidelines)
9. [Tone of Writing](#tone-of-writing)
10. [Complete Examples](#complete-examples)

## What are Notes?

Notes are:
- **Quick insights** and learnings from your development journey
- **Technical tips** and tricks you've discovered
- **Code snippets** and solutions to common problems
- **Tool recommendations** and configurations
- **Brief tutorials** on specific topics
- **Debugging solutions** you want to remember

Notes differ from blog posts in being:
- More concise (2-5 minute read)
- More focused on a single topic
- Less formal in structure
- More practical and actionable

## Frontmatter Schema

Every note markdown file MUST begin with YAML frontmatter between `---` markers.

### Complete Schema Structure

```yaml
---
# === REQUIRED FIELDS ===
title: "Clear, Descriptive Note Title"
slug: "url-friendly-slug"
date: "YYYY-MM-DD"
type: "note"
published: true
summary: "A concise 150-160 character description of what this note covers."
tags: ["git", "tips", "workflow", "productivity"]
categories: ["Quick Tips", "Tools & Setup", "Debugging", "Learning Notes"]

# === SEO CONFIGURATION ===
seo:
  title: "Custom SEO Title - Note | Your Portfolio"
  description: "SEO-optimized description with keywords naturally integrated"
  keywords: ["keyword1", "keyword2", "specific-tool", "technique"]
  image: "/images/notes/note-og-image.png"  # Optional for notes
  canonical: "https://yoursite.com/notes/note-slug"
  noindex: false
  nofollow: false

# === VISUAL ELEMENTS ===
thumbnail: "/images/notes/note-thumbnail.png"  # Optional for notes
hero:  # Usually not needed for notes unless sharing screenshots
  type: "image"
  src: "/images/notes/screenshot.png"
  alt: "Screenshot showing the technique in action"

# === OPTIONAL METADATA ===
featured: false  # Feature on notes listing page
updated: "YYYY-MM-DD"  # If you update the note
author: "Your Name"

# === CONTENT FEATURES ===
toc: false  # Table of contents (usually false for short notes)
readingTime: true  # Show reading time
relatedContent: ["another-note-slug", "related-tip-slug"]

# === ANALYTICS ===
trackingId: "note-specific-tracking"
experiments: ["experiment-id"]
---
```

## Required Fields

### 1. **title** (string)
- Clear, searchable title that describes the note
- Should be specific and keyword-rich
- Examples:
  - "Git Stash: 5 Powerful Commands You Should Know"
  - "Fix: Node.js Memory Leak in Production"
  - "Quick Tip: VS Code Snippet for React Components"

### 2. **slug** (string)
- URL-friendly identifier
- Use lowercase, hyphens for spaces
- Should be descriptive
- Examples: `git-stash-commands`, `nodejs-memory-leak-fix`, `vscode-react-snippets`

### 3. **date** (string)
- ISO 8601 format: `YYYY-MM-DD`
- Publication date of the note
- Example: `"2024-03-15"`

### 4. **type** (string)
- MUST be exactly: `"note"`

### 5. **published** (boolean)
- `true` = visible, `false` = draft

### 6. **summary** (string)
- Brief description (150-160 characters)
- Used in note cards and SEO
- Should clearly state what the reader will learn
- Example: `"Learn 5 powerful git stash commands that will improve your workflow, including stashing specific files and creating named stashes."`

### 7. **tags** (array)
- Specific technologies, tools, or concepts
- Used for filtering and discovery
- Be specific and relevant
- Examples: `["git", "version-control", "workflow", "cli"]`

### 8. **categories** (array)
Common note categories:
- `"Quick Tips"` - Short, actionable tips
- `"Code Snippets"` - Reusable code pieces
- `"Tools & Setup"` - Tool configurations and setups
- `"Debugging"` - Solutions to specific problems
- `"Learning Notes"` - Concepts you've learned
- `"Best Practices"` - Recommended approaches
- `"Performance"` - Optimization tips

## Optional Fields

### SEO Configuration

For notes, SEO is simpler but still important:

```yaml
seo:
  title: "Git Stash Commands - Quick Reference"  # Concise SEO title
  description: "5 essential git stash commands with examples for better version control workflow"
  keywords: ["git stash", "git commands", "version control tips"]
```

### Visual Elements

Most notes don't need hero images, but you can include:
- **thumbnail**: For visual interest in listings
- **hero**: For screenshots or diagrams when relevant

### Content Features

- **toc**: Usually `false` for notes due to brevity
- **readingTime**: Keep `true` to show estimated reading time
- **relatedContent**: Link to related notes or blog posts

## Content Structure

Notes should be concise and focused. Here's the recommended structure:

### Structure Pattern 1: Problem-Solution

```markdown
## The Problem
Brief description of the issue or challenge.

## The Solution
Direct solution with code or steps.

## Example
Practical example showing the solution in action.

## Key Points
- Bullet point summary
- Important considerations
- When to use this approach
```

### Structure Pattern 2: Tip/Technique

```markdown
## What You'll Learn
One sentence about what this note covers.

## The Technique
Step-by-step explanation or code snippet.

## Why This Works
Brief explanation of the underlying principle.

## Pro Tips
Additional insights or variations.
```

### Structure Pattern 3: Quick Reference

```markdown
## Overview
What this reference covers.

## Commands/Syntax
List of commands or syntax with explanations.

## Examples
Practical examples for each item.

## Common Pitfalls
What to watch out for.
```

## Markdown Components

Use components sparingly in notes to maintain focus:

### 1. Code Blocks (Most Common)

```markdown
:::code{lang=bash title="git-stash-commands.sh"}
# Stash with a custom message
git stash save "WIP: refactoring user authentication"

# Stash specific files
git stash push -m "Save config changes" -- config/*.json

# Apply stash without removing it
git stash apply stash@{2}
:::
```

### 2. Alert Boxes for Important Points

```markdown
:::alert{type=tip}
**Pro Tip**: Use `git stash push` instead of `git stash save` as it's more flexible and the recommended approach in newer Git versions.
:::
```

### 3. Simple Comparisons

```markdown
:::columns{ratio="1:1" gap=md}
### Before
```javascript
if (user) {
  if (user.isActive) {
    return user.data;
  }
}
return null;
```

### After
```javascript
return user?.isActive ? user.data : null;
```
:::
```

### 4. Terminal Output

```markdown
:::terminal
$ npm run build
✓ Building for production...
✓ Optimizing assets...
✓ Build complete in 2.3s
:::
```

## Writing Best Practices

### 1. Get to the Point Quickly
- Start with what the reader will learn
- No lengthy introductions
- State the problem or topic immediately

### 2. Be Specific
- Use concrete examples
- Include actual code that works
- Specify versions when relevant

### 3. Make it Scannable
- Use clear headings
- Employ bullet points for lists
- Highlight key commands or syntax
- Keep paragraphs short

### 4. Focus on Practicality
- Provide working examples
- Include copy-paste ready code
- Explain when and why to use something
- Add common variations

### 5. Keep it Concise
- Aim for 2-5 minute read time
- One main idea per note
- Link to detailed resources if needed
- Remove unnecessary explanations

## SEO Guidelines

### 1. Title Optimization
- Include the tool/technology name
- Add action words: "Fix", "Solve", "Quick", "Guide"
- Use numbers when applicable: "5 Ways", "3 Tips"
- Keep under 60 characters

### 2. Summary Writing
- Start with action verb
- Include primary keyword
- State the benefit clearly
- Keep to 150-160 characters

### 3. Tags and Keywords
- Use specific tool names
- Include problem-related keywords
- Add technique/method names
- Mix technical and common terms

### 4. Content Optimization
- Use keywords naturally in headings
- Include tool/command names in code blocks
- Add alt text to any images
- Link to official documentation when relevant

## Tone of Writing

[This section intentionally left blank for customization]

## Complete Examples

### Example 1: Git Tips Note

```yaml
---
title: "Git Stash: 5 Powerful Commands You Should Know"
slug: "git-stash-commands"
date: "2024-03-15"
type: "note"
published: true
summary: "Master git stash with these 5 commands: stash specific files, create named stashes, and apply stashes without removing them."
tags: ["git", "version-control", "cli", "workflow"]
categories: ["Quick Tips", "Tools & Setup"]

seo:
  title: "Git Stash Commands - Quick Reference"
  description: "Learn 5 essential git stash commands with practical examples to improve your Git workflow and version control."
  keywords: ["git stash", "git commands", "version control", "git workflow"]

featured: false
toc: false
readingTime: true
relatedContent: ["git-rebase-guide", "git-aliases-setup"]
---

## What You'll Learn

Five git stash commands that go beyond `git stash` and `git stash pop` to give you more control over your work-in-progress code.

## The Commands

### 1. Stash with a Custom Message

Instead of the generic stash message, add your own:

:::code{lang=bash}
git stash save "WIP: refactoring auth module"
# or in newer Git versions:
git stash push -m "WIP: refactoring auth module"
:::

### 2. Stash Specific Files

Don't want to stash everything? Target specific files:

:::code{lang=bash}
git stash push -m "Stashing config files" -- config/*.json src/config.js
:::

### 3. List Stashes with Details

See all your stashes with their messages:

:::code{lang=bash}
git stash list
# Output:
# stash@{0}: On main: WIP: refactoring auth module
# stash@{1}: On feature/api: Stashing config files
:::

### 4. Apply Without Removing

Apply a stash but keep it in the stash list:

:::code{lang=bash}
git stash apply stash@{1}
# The stash remains available for later use
:::

### 5. Create a Branch from Stash

Turn a stash directly into a new branch:

:::code{lang=bash}
git stash branch new-feature-branch stash@{0}
# Creates branch and applies stash in one command
:::

## Pro Tips

:::alert{type=tip}
**Name your stashes**: Always use descriptive messages. Future you will thank present you when you have 10 stashes and can't remember what each contains.
:::

- Use `git stash show -p stash@{0}` to see the diff of a stash
- `git stash drop stash@{1}` removes a specific stash
- `git stash clear` removes all stashes (use with caution!)

## When to Use These

- **Custom messages**: Always, for better organization
- **Specific files**: When experimenting with configs or partial changes
- **Apply without removing**: When testing if a stash works in current branch
- **Branch from stash**: When a quick fix becomes a feature

Remember: Stashes are local to your repository and not shared when pushing.
```

### Example 2: Debugging Note

```yaml
---
title: "Fix: Node.js Memory Leak in Production"
slug: "nodejs-memory-leak-fix"
date: "2024-02-20"
type: "note"
published: true
summary: "Diagnose and fix Node.js memory leaks using heap snapshots and the Chrome DevTools inspector with practical examples."
tags: ["nodejs", "debugging", "performance", "memory-management"]
categories: ["Debugging", "Performance"]

seo:
  title: "Fix Node.js Memory Leaks - Production Guide"
  description: "Step-by-step guide to diagnose and fix Node.js memory leaks in production using heap snapshots and profiling tools."
  keywords: ["nodejs memory leak", "heap snapshot", "node debugging", "production fix"]

toc: false
readingTime: true
---

## The Problem

Your Node.js app is consuming increasing amounts of memory in production, eventually crashing with:

:::terminal
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
:::

## The Solution

### Step 1: Enable Inspector in Production

Add this flag when starting your Node.js app:

:::code{lang=bash}
node --inspect=0.0.0.0:9229 app.js
:::

:::alert{type=warning}
**Security Note**: Only expose the inspector port through a secure tunnel or VPN in production.
:::

### Step 2: Take Heap Snapshots

Connect Chrome DevTools and take snapshots:

:::code{lang=javascript title="heap-snapshot.js"}
// Programmatically trigger heap snapshot
const v8 = require('v8');
const fs = require('fs');

function takeHeapSnapshot() {
  const filename = `heap-${Date.now()}.heapsnapshot`;
  const stream = fs.createWriteStream(filename);
  v8.writeHeapSnapshot(stream);
  console.log(`Heap snapshot written to ${filename}`);
}

// Take snapshot every 5 minutes
setInterval(takeHeapSnapshot, 5 * 60 * 1000);
:::

### Step 3: Analyze the Leak

Common culprits and their fixes:

#### Global Variable Accumulation
```javascript
// ❌ BAD: Accumulating in global scope
let cache = [];
app.get('/data', (req, res) => {
  cache.push(processData(req));  // Leak!
  res.json({ success: true });
});

// ✅ GOOD: Proper cleanup
const cache = new Map();
app.get('/data', (req, res) => {
  const key = req.sessionId;
  cache.set(key, processData(req));
  
  // Set TTL for cleanup
  setTimeout(() => cache.delete(key), 3600000);
  res.json({ success: true });
});
```

#### Event Listener Leaks
```javascript
// ❌ BAD: Listeners never removed
class DataProcessor {
  constructor() {
    process.on('message', this.handleMessage.bind(this));
  }
}

// ✅ GOOD: Proper cleanup
class DataProcessor {
  constructor() {
    this.messageHandler = this.handleMessage.bind(this);
    process.on('message', this.messageHandler);
  }
  
  destroy() {
    process.removeListener('message', this.messageHandler);
  }
}
```

## Quick Diagnostics Commands

Monitor memory usage in real-time:

:::code{lang=bash}
# Get Node.js process memory usage
ps aux | grep node

# Watch memory over time
watch -n 1 'ps aux | grep node | grep -v grep'

# Using built-in process.memoryUsage()
node -e "setInterval(() => console.log(process.memoryUsage()), 1000)"
:::

## Key Takeaways

- Always remove event listeners when done
- Be careful with global variables and closures
- Use WeakMap for object references when possible
- Implement proper cache expiration
- Monitor memory usage proactively

:::alert{type=tip}
**Pro Tip**: Use `clinic.js` for advanced memory profiling: `npx clinic doctor -- node app.js`
:::
```

### Example 3: Code Snippet Note

```yaml
---
title: "React Hook: useDebounce for Search Inputs"
slug: "react-use-debounce-hook"
date: "2024-01-10"
type: "note"
published: true
summary: "Custom React hook for debouncing search inputs and API calls, preventing excessive requests and improving performance."
tags: ["react", "hooks", "performance", "typescript"]
categories: ["Code Snippets", "Best Practices"]

seo:
  title: "useDebounce React Hook - Code Snippet"
  description: "Reusable React hook for debouncing user input with TypeScript support. Perfect for search boxes and API optimization."
  keywords: ["react hooks", "useDebounce", "debounce search", "react performance"]

toc: false
readingTime: true
relatedContent: ["react-search-optimization", "custom-hooks-collection"]
---

## The Hook

A TypeScript-ready `useDebounce` hook for optimal search performance:

:::code{lang=typescript title="useDebounce.ts" showLineNumbers=true}
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up on value change or unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
:::

## Usage Example

:::code{lang=tsx title="SearchComponent.tsx" highlight="7,12-14"}
import React, { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API call only happens after user stops typing for 300ms
      searchAPI(debouncedSearchTerm).then(setResults);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
:::

## Why This Works

- **Prevents API spam**: Only calls API after user stops typing
- **Configurable delay**: Adjust based on your use case
- **Properly typed**: Full TypeScript support with generics
- **Cleanup handled**: Cancels pending updates on unmount

## Pro Tips

:::alert{type=tip}
For search inputs, 300-500ms delay works well. For form validation, consider 1000ms.
:::

### Advanced Usage

You can also debounce objects or arrays:

:::code{lang=typescript}
const filters = { category: 'tech', sort: 'date' };
const debouncedFilters = useDebounce(filters, 500);
:::

### Performance Note

Combine with `React.memo` for optimal performance in large lists:

```typescript
const SearchResults = React.memo(({ results }) => {
  // Component only re-renders when results actually change
});
```

That's it! Drop this hook into your project and say goodbye to search input performance issues.
```

These examples demonstrate different note types:
1. **Quick Tips**: Git stash commands
2. **Debugging Guide**: Node.js memory leak
3. **Code Snippet**: React custom hook

Each follows the concise, practical format that makes notes valuable for quick reference and learning.