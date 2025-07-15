---
title: "MCP Web Tools Server and Client"
slug: "mcpWebTools"
date: "2024-06-01"
type: "project"
published: true
seo:
  title: "MCP Web Tools Server and Client"
  description: "Developed a Model Context Protocol (MCP) server and client system that enables language models to interact with web content through standardized tools for web scraping, search, and content extraction."
  keywords:
    - Python
    - Model Context Protocol
    - FastAPI
    - Streamlit
    - Web Scraping
    - Generative AI
    - LLM Tools
  image: "/images/multi-agent-rag.png"
summary: "Developed a Model Context Protocol (MCP) server and client system that enables language models to interact with web content through standardized tools for web scraping, search, and content extraction."
tags:
  - Python
  - Model Context Protocol
  - FastAPI
  - Streamlit
  - Web Scraping
  - Generative AI
  - LLM Tools
categories:
  - Python
  - Model Context Protocol
  - FastAPI
  - Streamlit
  - Web Scraping
  - Generative AI
  - LLM Tools
featured: false
techStack:
  - Python
  - MCP Server-Client Architecture
  - FastAPI
  - Streamlit
  - Docker
  - Node.js
  - LangChain
  - LangGraph
githubUrl: "https://github.com/surya-madhav/MCP"
videoUrl: "https://youtu.be/t6aHh3GhQbs"
thumbnail: "/images/multi-agent-rag.png"
hero:
  type: "video"
  src: "https://youtu.be/t6aHh3GhQbs"
  alt: "MCP Web Tools Server and Client"
---

# MCP Web Tools Server and Client

## Introduction

I designed and developed a comprehensive Model Context Protocol (MCP) server and client system that enables large language models (LLMs) to interact with web content through standardized tools. This system facilitates seamless integration between AI models and external web resources, enhancing their capabilities for research, content analysis, and information retrieval.

## System Architecture

:::mermaid{theme=dark}
flowchart TD
    A[LLM Model] --- B[MCP Transport Layer]
    B --- C[MCP Server]
    C --> D1[Web Scraping Tool]
    C --> D2[DuckDuckGo Search Tool]
    C --> D3[Advanced Scraping Tool]
    C --> D4[Sequential Thinking Tool]
    
    subgraph ClientLayer
    A --> A1[Claude Desktop]
    A --> A2[Custom UI Clients]
    end
    
    subgraph TransportMechanisms
    B1[stdio Transport] --> B
    B2[SSE Transport] --> B
    end
    
    subgraph ToolImplementations
    D1 --> E1[r.jina.ai Integration]
    D2 --> E2[DuckDuckGo API]
    D3 --> E3[Crawl4AI Engine]
    D4 --> E4[Structured Thinking Framework]
    end
:::

The system is built on a modular architecture with several key components:

1. **MCP Server Core**: Central component that implements the Model Context Protocol standard, handling tool registration and execution.
2. **Transport Layer**: Supports multiple communication methods (stdio and SSE) for flexibility in different environments.
3. **Tool Modules**: Specialized web interaction capabilities including web scraping, search, and advanced content extraction.
4. **Client Interface**: Streamlit-based management UI for testing and configuring MCP servers.

## Web Tools Implementation

The MCP server implements several powerful web tools that expand AI capabilities:

:::mermaid{theme=dark}
flowchart TD
    A[User Query] --> B[LLM Processing]
    B -->|Tool Selection| C{Tool Dispatcher}
    
    C -->|Web Content| D[Web Scraping Tool]
    C -->|Search Query| E[DuckDuckGo Search]
    C -->|Complex Page| F[Advanced Scraping]
    C -->|Structured Thinking| G[Sequential Thinking]
    
    D -->|Convert URL| D1[Add HTTPS if needed]
    D1 -->|Transform| D2[Apply r.jina.ai prefix]
    D2 -->|Fetch| D3[Retrieve Markdown]
    
    E -->|Parse Query| E1[Configure Search Parameters]
    E1 -->|Execute| E2[Perform DuckDuckGo Search]
    E2 -->|Format| E3[Structure Results]
    
    F -->|Page Analysis| F1[Crawler Configuration]
    F1 -->|Content Extraction| F2[Remove Navigation/Ads]
    F2 -->|Structure Preservation| F3[Maintain Document Structure]
    
    D3 --> H[Return to LLM]
    E3 --> H
    F3 --> H
    G --> H
    
    subgraph ResultsProcessing
    H -->|Context Integration| I[Enhanced Response Generation]
    end
:::

### 1. Web Scraping Tool

The `web_scrape` tool enables seamless retrieval of web content as markdown, making it readily consumable by language models. It handles automatic URL scheme addition, transformation with r.jina.ai, and comprehensive error handling for various scenarios.

### 2. DuckDuckGo Search

The `ddg_search` tool enables comprehensive web searching with customizable parameters, including region settings, SafeSearch filtering, time limits for results, and maximum result counts. Search results are formatted consistently for easy consumption by language models.

### 3. Advanced Web Scraping

The `advanced_scrape` tool uses Crawl4AI to extract clean, structured content from complex web pages:

:::mermaid{theme=dark}
flowchart TD
    A[Input URL] --> B[Browser Configuration]
    B --> C[Content Filtering Strategy]
    C --> D[Markdown Generation]
    D --> E[Output Formatted Content]
    
    subgraph ExtractionProcess
    F[Remove Navigation] --> G[Remove Ads/Sidebars]
    G --> H[Extract Main Content]
    H --> I[Preserve Structure]
    end
    
    subgraph PostProcessing
    J[Fix Code Blocks] --> K[Fix Headings]
    K --> L[Fix Spacing]
    L --> M[Fix Bullet Points]
    end
    
    C --> F
    I --> J
    M --> E
:::

## Sequential Thinking Tool

This tool provides structured reasoning capabilities for complex problem-solving. It was integrated from [arben-adm/mcp-sequential-thinking](https://github.com/arben-adm/mcp-sequential-thinking) with enhancements for persistence and dataset generation.

:::mermaid{theme=dark}
stateDiagram-v2
    [*] --> ProblemDefinition
    
    ProblemDefinition --> Analysis
    Analysis --> Ideation
    Ideation --> Evaluation
    Evaluation --> Conclusion
    Evaluation --> Ideation: Revision Needed
    
    state "Thought Tracking" as TT {
        Sequence --> Branching
        Branching --> Revision
    }
    
    state "Data Persistence" as DP {
        StorageSystem --> DatasetGeneration
    }
    
    ProblemDefinition --> TT
    Analysis --> TT
    Ideation --> TT
    Evaluation --> TT
    Conclusion --> TT
    
    TT --> DP
:::

### Enhanced Features

- **Thought Persistence**: All thinking steps are stored for future reference and analysis
- **Dataset Generation**: Collected thought patterns can be used to train specialized models
- **Structured Reasoning**: Formal framework for breaking down complex problems

## MCP Server Management UI

The system includes a Streamlit-based management interface that enables:

:::mermaid{theme=dark}
flowchart TD
    A[Streamlit UI] --> B[Server Management]
    A --> C[Tool Testing]
    A --> D[Documentation]
    
    B --> B1[List Servers]
    B --> B2[Connect to Server]
    B --> B3[View Server Info]
    
    C --> C1[Select Tool]
    C1 --> C2[Configure Parameters]
    C2 --> C3[Execute Tool]
    C3 --> C4[View Results]
    
    D --> D1[MCP Documentation]
    D --> D2[Tool Reference]
:::

## Integration with Claude

The system integrates seamlessly with Claude and other LLMs through Claude for Desktop configuration. This integration allows for simple setup where the MCP server is registered with paths to appropriate Python scripts. The configuration supports different tools with distinct initialization parameters.

## Technical Implementation

### Transport Layer 

The system supports multiple transport mechanisms including stdio for command-line usage and SSE for web-based interfaces. The transport layer handles bidirectional communication between the LLM and the MCP server.

### Error Handling

The system implements comprehensive error handling to ensure robustness, including specific handling for HTTP status errors, request failures, and unexpected exceptions. Each error is formatted appropriately for user understanding.

### Asynchronous Processing

All tools use asynchronous programming for optimal performance, allowing non-blocking execution of potentially slow operations like web requests or complex processing tasks.

## Key Technologies 