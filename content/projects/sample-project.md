---
title: "Component Showcase"
slug: "sample-project"
date: "2024-01-20"
type: "project"
published: true
seo:
  title: "Markdown Component Showcase"
  description: "A comprehensive demonstration of all custom markdown components available in the portfolio."
  keywords: ["markdown", "components", "showcase", "demo"]
  image: "/images/sampleImage.jpg"
summary: "A comprehensive showcase of all custom markdown components with examples and usage patterns."
tags: ["Demo", "Markdown", "Components", "Documentation"]
categories: ["Demo"]
author: "Portfolio Owner"
featured: true
updated: "2024-01-25"
thumbnail: "/images/sampleImage.jpg"
hero:
  type: "image"
  src: "/images/sampleImage.jpg"
  alt: "Component Showcase Hero"
techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Remark"]
githubUrl: "https://github.com/username/portfolio"
demoUrl: "https://portfolio.example.com"
duration: "Ongoing"
role: "Full Stack Developer"
team: ["Solo Project"]
toc: true
readingTime: true
---

# Markdown Component Showcase

Welcome to the comprehensive showcase of all custom markdown components available in this portfolio system. Each component is demonstrated with examples and usage patterns.

## 📢 Alert Components

Alerts are used to display important messages with different levels of severity.

:::alert{type=info title="Information Alert"}
This is an **informational** alert. Use it to provide helpful context or additional information to readers.
:::

:::alert{type=warning title="Warning Alert"}
⚠️ This is a warning alert. Use it to highlight important considerations or potential issues.
:::

:::alert{type=error title="Error Alert"}
This is an error alert. Use it to indicate problems or failures that need attention.
:::

:::alert{type=success title="Success Alert" dismissible=true}
✅ Great job! This is a success alert that can be dismissed by clicking the X button.
:::

:::alert{type=tip title="Pro Tip" icon=true}
💡 This is a tip alert. Share helpful hints and best practices with your readers.
:::

:::alert{type=note title="Note"}
📝 This is a note alert. Use it for additional context or side information.
:::

## 📑 Table of Contents

The table of contents component automatically generates navigation from your headings.

:::toc{depth=3 title="Page Navigation"}
:::

## 💻 Code Blocks

Code blocks support syntax highlighting, line numbers, and line highlighting.

### Basic Code Block

:::code{lang=javascript title="app.js"}
// Simple JavaScript example
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
:::

### Code Block with Line Numbers and Highlighting

:::code{lang=typescript title="server.ts" showLineNumbers=true highlight="3-5,8"}
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello, TypeScript!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
:::

### CSS Example

:::code{lang=css title="styles.css" showLineNumbers=true}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #ffffff;
  }
}
:::

## 📐 Column Layouts

Columns allow you to create multi-column layouts. Content is separated by h3 headings.

### Two Column Layout

:::columns{ratio="1:1" gap=lg stack=md}
### Left Column

This is the content for the left column. It can contain any markdown content including:

- Lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)

### Right Column

This is the content for the right column. Both columns will stack on mobile devices for better readability.

You can include code blocks, images, or any other markdown content here.
:::

### Three Column Layout

:::columns{ratio="1:1:1" gap=md stack=lg}
### Column 1

First column content with equal width distribution.

### Column 2

Middle column content. All three columns have the same width.

### Column 3

Third column content. They stack on large screens and below.
:::

### Asymmetric Layout

:::columns{ratio="2:1" gap=lg stack=md}
### Main Content

This column takes up 2/3 of the available space on desktop. Perfect for main content with a sidebar.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Sidebar

This narrow column takes up 1/3 of the space. Great for:

- Quick links
- Related content
- Call-to-action items
:::

## 🖼️ Images with Captions

Images can include captions and various size options.

:::image{src="/images/sampleImage.jpg" alt="Beautiful landscape photo" size=large}
Figure 1: A stunning landscape photograph showcasing the component's caption capabilities.
:::

:::image{src="/images/sampleImage.jpg" alt="Medium sized image" size=medium}
Figure 2: The same image displayed at medium size.
:::

## 📑 Tabbed Content

Tabs organize content into switchable panels. Use h3 headings as tab titles.

:::tabs{defaultTab=0}
### React Example

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
```

### Vue Example

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">
      Increment
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};
</script>
```

### Angular Example

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">
        Increment
      </button>
    </div>
  `
})
export class CounterComponent {
  count = 0;
  
  increment() {
    this.count++;
  }
}
```
:::

## 📊 Mermaid Diagrams

Create flowcharts and diagrams using Mermaid syntax.

:::mermaid{theme=dark}
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix Issues]
    E --> B
    C --> F[Deploy]
    F --> G[End]
:::

:::mermaid{theme=dark}
sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server
    participant D as Database
    
    U->>B: Click button
    B->>S: HTTP Request
    S->>D: Query data
    D-->>S: Return results
    S-->>B: JSON Response
    B-->>U: Update UI
:::

## 🎯 Nested Components

Components can be nested for complex layouts.

:::columns{ratio="1:1" gap=lg}
### Alerts in Columns

:::alert{type=info title="Left Column Alert"}
This alert is nested inside the left column.
:::

### More Alerts

:::alert{type=success title="Right Column Alert"}
This alert is nested inside the right column.
:::
:::

## 🚀 Advanced Examples

### Code Comparison

:::columns{ratio="1:1" gap=md}
### Old Approach

:::code{lang=javascript}
// Callback hell
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      console.log(c);
    });
  });
});
:::

### Modern Approach

:::code{lang=javascript}
// Async/await
async function fetchData() {
  const a = await getData();
  const b = await getMoreData(a);
  const c = await getMoreData(b);
  console.log(c);
}
:::
:::

### Feature Comparison

:::columns{ratio="1:1:1" gap=sm}
### Basic Plan

- 10 GB Storage
- 1 User
- Email Support
- Basic Features

**$9/month**

### Pro Plan

- 100 GB Storage
- 5 Users
- Priority Support
- Advanced Features
- API Access

**$29/month**

### Enterprise

- Unlimited Storage
- Unlimited Users
- 24/7 Phone Support
- All Features
- Custom Integration

**Contact Sales**
:::

## 🎨 Styling Examples

The component system respects the portfolio's dark theme and design system.

:::alert{type=info}
All components automatically adapt to the dark theme with proper color schemes and contrast ratios.
:::

## 📝 Best Practices

1. **Use semantic component names** - Choose the right component for your content
2. **Follow the syntax guide** - Use `key=value` format, not JSON
3. **Test responsiveness** - Ensure content looks good on all devices
4. **Keep it simple** - Don't over-complicate with too many nested components

## 🔗 Resources

- [Markdown Component Documentation](/docs/Markdown_Component_System.md)
- [Quick Reference Guide](/docs/Markdown_Component_Quick_Reference.md)
- [GitHub Repository](https://github.com/username/portfolio)

---

This showcase demonstrates the power and flexibility of the custom markdown component system. Each component is designed to enhance content presentation while maintaining the simplicity of markdown authoring.
