---
title: "Sample Blog Post with All Components"
slug: "sample-post"
date: "2024-01-20"
type: "blog"
published: true
seo:
  title: "Sample Blog Post with All Components"
  description: "A sample blog post demonstrating all custom markdown components."
  keywords: ["sample", "blog", "components", "demo"]
  image: "/images/sampleImage.jpg"
summary: "A sample blog post demonstrating all custom markdown components."
tags: ["Demo", "Markdown", "Components"]
categories: ["Demo"]
author: "Your Name"
featured: false
updated: "2024-01-25"
thumbnail: "/images/sampleImage.jpg"
hero:
  type: "image"
  src: "/images/sampleImage.jpg"
  alt: "Sample Blog Hero"
toc: true
readingTime: true
---

# Sample Blog Post: All Components Demo

:::alert{type=warning title="Heads Up"}
This blog post demonstrates **all** custom markdown components.
:::

:::toc{depth=2 title="Contents"}
:::

## Code Block Example

:::code{lang=javascript title="hello.js" showLineNumbers=true highlight="2"}
function hello() {
  console.log("Hello, world!");
}
:::

## Columns Example

:::columns{ratio="1:2" gap=lg stack=lg}
### Narrow Column
Narrow column content with some text.

### Wide Column
Wide column content with more detailed information and examples.
:::

## Image With Caption Example

:::image{src="/images/sampleImage.jpg" alt="Sample Blog" size=large}
Blog image with a caption.
:::

## Tabs Example

:::tabs
### HTML
```html
<p>Hello, world!</p>
```

### CSS
```css
body { 
  color: orange; 
}
```

### JavaScript
```javascript
console.log('Hello tabs!');
```
:::

## Mermaid Diagram Example

:::mermaid{theme=neutral}
graph TD;
  Post --> Read;
  Post --> Comment;
  Read --> Share;
  Comment --> Reply;
:::