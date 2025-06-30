---
title: "Testing All Markdown Components"
slug: "test-components"
date: "2024-01-26"
type: "note"
published: true
summary: "Testing page for all markdown components and styling fixes"
tags: ["test", "components"]
categories: ["Testing"]
toc: true
---

# Testing All Markdown Components

This page tests all the markdown components and styling fixes.

## Heading Styles and Spacing

This is a paragraph after an h2. There should be proper spacing above and below the heading.

### Level 3 Heading

This is a paragraph after an h3. The heading should be blue.

#### Level 4 Heading

This is a paragraph after an h4.

## Text Styling

This paragraph contains **bold text that should be yellow** and *italic text* and ***bold italic text***.

Regular text with a [link to somewhere](https://example.com) should be cyan.

## Lists

### Unordered Lists

- First item in the list
- Second item in the list
  - Nested item 1
  - Nested item 2
- Third item in the list

### Ordered Lists

1. First numbered item
2. Second numbered item
   1. Nested numbered item
   2. Another nested item
3. Third numbered item

## Code Examples

### Inline Code

This is a paragraph with `inline code` that should be yellow.

### Code Blocks

:::code{lang="javascript" title="example.js" showLineNumbers=true highlight="2-4"}
const greeting = "Hello World";
console.log(greeting);
// This is a comment
const result = greeting.toUpperCase();
console.log(result);
:::

## Alerts

:::alert{type="info" title="Information Alert"}
This is an information alert with **bold text** and a [link](https://example.com).
:::

:::alert{type="warning" title="Warning Alert"}
This is a warning alert. Pay attention!
:::

:::alert{type="success" title="Success Alert"}
Operation completed successfully!
:::

## Columns

:::columns{ratio="2:1" gap="lg"}
### Main Content Column

This is the main content column that takes up 2/3 of the width. It contains more content than the sidebar.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Sidebar Column

This is the sidebar column that takes up 1/3 of the width.

- Sidebar item 1
- Sidebar item 2
- Sidebar item 3
:::

## Tabs

:::tabs
### JavaScript Tab

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

### Python Tab

```python
def greet(name):
    return f"Hello, {name}!"
```

### TypeScript Tab

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
:::

## Mermaid Diagram

:::mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> A
:::

## Images

:::image{src="/images/sampleImage.jpg" alt="Sample Image" size="medium"}
This is a caption for the image
:::

## Blockquotes

> This is a blockquote. It should have a blue left border and a slightly darker background.
> 
> It can span multiple lines.

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
| Cell 7   | Cell 8   | Cell 9   |

## Horizontal Rule

Above the line

---

Below the line

## Conclusion

All components and styling should be working correctly now.