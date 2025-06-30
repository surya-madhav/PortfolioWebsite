---
title: "Sample Note with All Components"
slug: "sample-note"
date: "2024-01-20"
type: "note"
published: true
seo:
  title: "Sample Note with All Components"
  description: "A sample note demonstrating all custom markdown components."
  keywords: ["sample", "note", "components", "demo"]
  image: "/images/sampleImage.jpg"
summary: "A sample note demonstrating all custom markdown components."
tags: ["Demo", "Markdown", "Components"]
categories: ["Demo"]
author: "Your Name"
featured: false
updated: "2024-01-25"
thumbnail: "/images/sampleImage.jpg"
hero:
  type: "image"
  src: "/images/sampleImage.jpg"
  alt: "Sample Note Hero"
toc: true
readingTime: true
---

# Sample Note: All Components Demo

:::alert{type=tip title="Tip"}
You can use all custom components in notes too!
:::

:::toc{depth=2 title="Contents"}
:::

## Code Block Example

:::code{lang=python title="hello.py" showLineNumbers=true highlight="2"}
def hello():
    print("Hello, world!")
:::

## Columns Example

:::columns{ratio="1:1" gap=sm stack=sm}
### Left Column
Left column content with some information.

### Right Column
Right column content with more details.
:::

## Image With Caption Example

:::image{src="/images/sampleImage.jpg" alt="Sample Note" size=small}
This is a sample image in a note.
:::

## Tabs Example

:::tabs
### Python
```python
def foo():
    return "bar"
```

### JavaScript
```javascript
function foo() {
  return "bar";
}
```
:::

## Mermaid Diagram Example

:::mermaid{theme=forest}
graph TD;
  Start --> Option1;
  Start --> Option2;
  Option1 --> End;
  Option2 --> End;
:::