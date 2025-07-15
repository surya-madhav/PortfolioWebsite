# Project Writing Guide for Portfolio

This guide provides comprehensive instructions for writing project documentation in markdown format for the portfolio website. Following this guide ensures consistent, SEO-optimized, and feature-rich project pages.

## Table of Contents

1. [Frontmatter Schema](#frontmatter-schema)
2. [Required Fields](#required-fields)
3. [Optional Fields](#optional-fields)
4. [Content Structure](#content-structure)
5. [Markdown Components](#markdown-components)
6. [Writing Best Practices](#writing-best-practices)
7. [SEO Guidelines](#seo-guidelines)
8. [Tone of Writing](#tone-of-writing)
9. [Complete Example](#complete-example)

## Frontmatter Schema

Every project markdown file MUST begin with YAML frontmatter between `---` markers. The frontmatter contains metadata that controls how the project appears on the site, its SEO properties, and various features.

### Complete Schema Structure

```yaml
---
# === REQUIRED FIELDS ===
title: "Project Title - Clear and Descriptive"
slug: "url-friendly-slug"
date: "YYYY-MM-DD"
type: "project"
published: true
summary: "A concise 150-160 character description of the project for SEO and card displays."
tags: ["Technology1", "Technology2", "Framework1", "Tool1"]
categories: ["Web Development", "Mobile", "AI/ML", "DevOps"]

# === SEO CONFIGURATION ===
seo:
  title: "Custom SEO Title - Project Name | Your Portfolio"
  description: "SEO-optimized description (150-160 chars) with keywords naturally integrated"
  keywords: ["keyword1", "keyword2", "keyword3", "technology", "framework"]
  image: "/images/project-og-image.png"  # 1200x630px recommended
  canonical: "https://yoursite.com/projects/project-slug"  # Optional
  noindex: false  # Set true to prevent search indexing
  nofollow: false  # Set true to prevent link following

# === VISUAL ELEMENTS ===
thumbnail: "/images/project-thumbnail.png"  # For project cards
hero:
  type: "image"  # Options: "image", "video", "code"
  src: "/images/project-hero.png"
  alt: "Descriptive alt text for accessibility"
  caption: "Optional caption for the hero image"
  position: "center"  # Options: "center", "top", "bottom"

# === PROJECT-SPECIFIC FIELDS ===
techStack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"]
githubUrl: "https://github.com/username/repo-name"
demoUrl: "https://demo.example.com"
videoUrl: "https://youtube.com/watch?v=VIDEO_ID"  # YouTube video ID
duration: "3 months"
role: "Full Stack Developer"
team: ["John Doe - Frontend", "Jane Smith - Backend", "Alex Johnson - DevOps"]

# === OPTIONAL METADATA ===
featured: false  # Set true to feature on homepage
updated: "YYYY-MM-DD"  # Last update date
author: "Your Name"  # Defaults to site author

# === CONTENT FEATURES ===
toc: true  # Show table of contents (default: true)
comments: false  # Future feature placeholder
readingTime: true  # Show estimated reading time (default: true)
relatedContent: ["another-project-slug", "related-project-slug"]

# === ANALYTICS & TRACKING ===
trackingId: "custom-tracking-id"  # For specific tracking needs
experiments: ["experiment-a", "experiment-b"]  # For A/B testing
---
```

## Required Fields

These fields MUST be present in every project file:

### 1. **title** (string)
- The display title of your project
- Should be clear, descriptive, and compelling
- Example: `"LearnLab - AI-Powered Learning Platform"`

### 2. **slug** (string)
- URL-friendly identifier
- Use lowercase, hyphens instead of spaces
- Must be unique across all projects
- Example: `"learn-lab"` or `"ai-learning-platform"`

### 3. **date** (string)
- ISO 8601 format: `YYYY-MM-DD`
- Represents project completion or publication date
- Used for sorting and display
- Example: `"2024-06-01"`

### 4. **type** (string)
- MUST be exactly: `"project"`
- This identifies the content type for the system

### 5. **published** (boolean)
- Controls visibility on the site
- `true` = visible, `false` = draft/hidden
- Useful for work-in-progress projects

### 6. **summary** (string)
- Brief project description (150-160 characters)
- Used in project cards, SEO descriptions, and social shares
- Should capture the essence of the project
- Example: `"Developed an AI-powered platform that transforms PDFs into interactive learning content including podcasts, flashcards, and quizzes."`

### 7. **tags** (array)
- List of technologies, frameworks, and tools used
- Used for filtering and SEO keywords
- Be specific and relevant
- Example: `["React", "Node.js", "PostgreSQL", "Docker", "AWS"]`

### 8. **categories** (array)
- Broader classification of the project
- Common categories: `["Web Development", "Mobile", "AI/ML", "DevOps", "Data Science", "Full Stack"]`
- Used for filtering and organization

## Optional Fields

### SEO Configuration

The `seo` object allows fine-tuning of search engine optimization:

```yaml
seo:
  title: "Override the default title for SEO"
  description: "Custom meta description"
  keywords: ["specific", "seo", "keywords"]
  image: "/images/custom-og-image.png"
  canonical: "https://canonical-url.com"
  noindex: false
  nofollow: false
```

- **title**: Overrides the main title for `<title>` tag (defaults to project title)
- **description**: Custom meta description (defaults to summary)
- **keywords**: SEO keywords array (defaults to tags)
- **image**: Open Graph image for social sharing (1200x630px recommended)
- **canonical**: Canonical URL if content exists elsewhere
- **noindex/nofollow**: SEO directives (both default to false)

### Visual Elements

#### thumbnail
- Image shown in project cards and lists
- Recommended size: 800x600px
- Format: PNG or JPG
- Example: `"/images/project-thumbnail.png"`

#### hero
Complex object for the main project visual:

```yaml
hero:
  type: "video"  # For YouTube videos
  src: "VIDEO_ID"  # Just the ID, not full URL
  alt: "Project demo video"
```

Or for images:

```yaml
hero:
  type: "image"
  src: "/images/hero-image.png"
  alt: "Screenshot of the application dashboard"
  caption: "The main dashboard showing real-time analytics"
  position: "top"  # Focal point for cropping
```

### Project-Specific Fields

- **techStack**: Array of technologies used (will be enriched with icons)
- **githubUrl**: Link to source code repository
- **demoUrl**: Link to live demo
- **videoUrl**: YouTube video URL (extracts ID automatically)
- **duration**: Project timeline (e.g., "3 months", "6 weeks")
- **role**: Your role in the project
- **team**: Array of team members and their roles

### Content Features

- **toc**: Show/hide table of contents (default: true)
- **readingTime**: Show/hide reading time estimate (default: true)
- **relatedContent**: Array of related project slugs

## Content Structure

The markdown content should follow this structure:

```markdown
## Brief Introduction
Start with a compelling introduction that expands on the summary. Explain what the project is and why it matters.

### Key Features/Highlights
- Feature 1 with impact
- Feature 2 with benefit
- Feature 3 with outcome

## Technical Implementation

### Architecture Overview
Describe the system architecture, design patterns, and key technical decisions.

### Core Technologies
Elaborate on the tech stack and why each technology was chosen.

### Challenges & Solutions
Discuss significant challenges faced and how you overcame them.

## Results & Impact
- Performance metrics
- User feedback
- Business impact
- Technical achievements

## Key Learnings
What did you learn from this project? What would you do differently?

## Future Enhancements
Potential improvements or features for future iterations.
```

## Markdown Components

The portfolio supports custom markdown components using the `:::componentName{props}` syntax:

### 1. Code Blocks with Features

```markdown
:::code{lang=typescript title="server.ts" showLineNumbers=true highlight="2-4,7"}
import express from 'express';

const app = express();  // This line is highlighted
const PORT = 3000;      // This line is highlighted

app.get('/', (req, res) => {
  res.send('Hello World');  // This line is highlighted
});

app.listen(PORT);
:::
```

Properties:
- `lang`: Programming language for syntax highlighting
- `title`: Filename or description
- `showLineNumbers`: Display line numbers (true/false)
- `highlight`: Line ranges to highlight (e.g., "2-4,7")

### 2. Multi-Column Layouts

```markdown
:::columns{ratio="2:1" gap=lg stack=md}
### Main Content
This column takes 2/3 of the width on desktop.
Detailed technical explanation goes here.

### Side Notes
This column takes 1/3 of the width.
Additional context or quick facts.
:::
```

Properties:
- `ratio`: Column width ratios (e.g., "1:1", "2:1", "1:2:1")
- `gap`: Spacing between columns (sm, md, lg, xl)
- `stack`: Breakpoint for mobile stacking (sm, md, lg, never)

### 3. Alert/Callout Boxes

```markdown
:::alert{type=info title="Important Note"}
This feature requires authentication to be enabled in your environment.
:::

:::alert{type=warning dismissible}
**Warning**: This will delete all user data. Make sure to backup first.
:::
```

Types: `info`, `warning`, `error`, `success`, `tip`, `note`

### 4. Images with Captions

```markdown
:::image{src="/images/architecture.png" alt="System architecture diagram" size=large}
Figure 1: Microservices architecture showing service communication patterns
:::
```

Properties:
- `size`: small, medium, large, full
- `priority`: Load priority for Next.js Image optimization

### 5. Tabs for Code Examples

```markdown
:::tabs
### JavaScript
```javascript
const getData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};
```

### TypeScript
```typescript
const getData = async (): Promise<Data> => {
  const response = await fetch('/api/data');
  return response.json() as Promise<Data>;
};
```

### Python
```python
async def get_data():
    async with aiohttp.ClientSession() as session:
        async with session.get('/api/data') as response:
            return await response.json()
```
:::
```

### 6. Mermaid Diagrams

```markdown
:::mermaid{theme=dark}
graph TD
    A[Client] -->|HTTP Request| B[Load Balancer]
    B --> C[Web Server 1]
    B --> D[Web Server 2]
    C --> E[Database]
    D --> E
:::
```

## Writing Best Practices

### 1. Start Strong
- Begin with a compelling introduction that immediately communicates value
- Explain the problem solved and impact achieved
- Hook the reader with impressive metrics or outcomes

### 2. Use Clear Structure
- Organize content with logical headings
- Use bullet points for lists of features or technologies
- Include code examples where relevant
- Add diagrams for complex architectures

### 3. Be Specific
- Include concrete metrics and numbers
- Mention specific technologies and versions
- Describe your exact role and contributions
- Quantify impact where possible

### 4. Technical Depth
- Explain architectural decisions
- Discuss trade-offs considered
- Include implementation details that showcase expertise
- Share code snippets for key algorithms or patterns

### 5. Visual Enhancement
- Include architecture diagrams
- Add screenshots of the application
- Use code blocks for important implementations
- Consider adding demo videos

## SEO Guidelines

### 1. Title Optimization
- Include primary keywords naturally
- Keep under 60 characters for search results
- Make it descriptive and compelling
- Format: "Project Name - Brief Description"

### 2. Summary/Description
- Write compelling meta descriptions (150-160 characters)
- Include primary keywords naturally
- Focus on value proposition and outcomes
- Use action-oriented language

### 3. Keywords Strategy
- Use specific technology names in tags
- Include problem-domain keywords
- Add methodology keywords (e.g., "microservices", "real-time")
- Balance technical and business terms

### 4. Image Optimization
- Use descriptive filenames (e.g., `learnlab-dashboard-screenshot.png`)
- Always include alt text
- Optimize image sizes (use WebP when possible)
- Provide Open Graph images (1200x630px)

### 5. Content Optimization
- Use keywords naturally throughout content
- Include related terms and synonyms
- Create descriptive headings with keywords
- Link to related projects when relevant

## Tone of Writing

[This section intentionally left blank for customization]

## Complete Example

```yaml
---
title: "LearnLab - AI-Powered Learning Platform"
slug: "learn-lab"
date: "2024-06-01"
type: "project"
published: true
summary: "Developed an AI-powered platform that transforms PDFs into interactive learning content including podcasts, flashcards, and quizzes using multi-agent architecture."
tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "LangChain", "Docker", "AWS"]
categories: ["Web Development", "AI/ML", "Full Stack"]

seo:
  title: "LearnLab - AI Learning Platform | Portfolio"
  description: "AI-powered platform transforming PDFs into interactive podcasts, flashcards, and quizzes using multi-agent systems and LangChain."
  keywords: ["AI learning platform", "PDF to podcast", "LangChain", "multi-agent system", "educational technology"]
  image: "/images/learnlab-og.png"

thumbnail: "/images/learnlab-thumb.png"
hero:
  type: "image"
  src: "/images/learnlab-hero.png"
  alt: "LearnLab dashboard showing AI-generated learning content"
  caption: "The LearnLab dashboard displaying various learning formats generated from a single PDF"

techStack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "LangChain", "Docker", "AWS", "Pinecone"]
githubUrl: "https://github.com/username/learnlab"
demoUrl: "https://learnlab.demo.com"
duration: "4 months"
role: "Full Stack Developer & AI Engineer"
team: ["John Doe - Frontend", "Jane Smith - DevOps"]

featured: true
toc: true
relatedContent: ["multi-modal-rag", "ai-content-generator"]
---

## Transforming Static Documents into Dynamic Learning Experiences

LearnLab revolutionizes how we interact with educational content by leveraging cutting-edge AI to transform static PDF documents into engaging, multi-modal learning experiences. The platform employs **Multi-Agent Architecture** with specialized AI agents for different content types.

### Key Achievements
- **50% reduction** in content generation time
- **10,000+** learning materials generated
- **85% user satisfaction** rate
- **3x improvement** in learning retention

## Technical Architecture

### Multi-Agent System Design

:::mermaid{theme=dark}
graph TD
    A[PDF Input] --> B[Content Analyzer]
    B --> C{Router Agent}
    C --> D[Podcast Agent]
    C --> E[Quiz Agent]
    C --> F[Flashcard Agent]
    D --> G[Content Store]
    E --> G
    F --> G
    G --> H[User Interface]
:::

The system uses **LangGraph** for orchestrating multiple specialized agents:

- **Podcast Generator Agent**: Creates conversational audio content with dramatic elements
- **Quiz Generator Agent**: Produces interactive assessments with varying difficulty
- **Flashcard Agent**: Develops spaced repetition study materials
- **Content Router**: Intelligently distributes work based on content type

### Core Implementation

:::code{lang=python title="agent_orchestrator.py" showLineNumbers=true highlight="5-8"}
from langgraph import Graph
from langchain.agents import AgentExecutor

class ContentOrchestrator:
    def __init__(self):
        self.graph = Graph()
        self.podcast_agent = PodcastAgent()
        self.quiz_agent = QuizAgent()
        self.flashcard_agent = FlashcardAgent()
    
    async def process_document(self, pdf_content: str):
        # Extract and chunk content
        chunks = self.chunk_document(pdf_content)
        
        # Route to appropriate agents
        tasks = []
        for chunk in chunks:
            content_type = self.analyze_content_type(chunk)
            if content_type == "narrative":
                tasks.append(self.podcast_agent.generate(chunk))
            elif content_type == "factual":
                tasks.append(self.quiz_agent.generate(chunk))
        
        # Execute in parallel
        results = await asyncio.gather(*tasks)
        return self.merge_results(results)
:::

## Results and Impact

### Performance Metrics
- **Processing Speed**: 50% faster than traditional methods
- **Accuracy**: 92% content relevance score
- **Scalability**: Handles 100+ concurrent users

### User Feedback
> "LearnLab transformed how our students engage with course materials. The AI-generated podcasts are incredibly engaging!" - University Professor

## Key Learnings

Working on LearnLab taught me valuable lessons about:
- **AI orchestration** at scale
- **Prompt engineering** for consistent quality
- **Real-time processing** optimization
- **User experience** in AI applications

## Future Enhancements

- [ ] Video content generation
- [ ] Multi-language support
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
```

This guide provides a comprehensive framework for writing project documentation that is:
- **SEO-optimized** for maximum visibility
- **Feature-rich** using all available components
- **Consistent** in structure and quality
- **Engaging** for technical audiences
- **Comprehensive** in technical detail