---
title: "Multi-Modal RAG System with Agentic Architectures"
slug: "multiModalRag"
date: "2024-06-01"
type: "project"
published: true
seo:
  title: "Multi-Modal RAG System with Agentic Architectures"
  description: "Designed and implemented a sophisticated multi-modal RAG system with specialized agents for processing diverse document formats, extracting text, images, and tables to enhance information retrieval and generation capabilities."
  keywords:
    - Python
    - LangChain
    - LangGraph
    - Generative AI
    - RAG
    - Multi-Modal
    - Apache Airflow
    - FastAPI
  image: "/images/multi-agent-rag.png"
summary: "Designed and implemented a sophisticated multi-modal RAG system with specialized agents for processing diverse document formats, extracting text, images, and tables to enhance information retrieval and generation capabilities."
tags:
  - Python
  - LangChain
  - LangGraph
  - Generative AI
  - RAG
  - Multi-Modal
  - Apache Airflow
  - FastAPI
categories:
  - Python
  - LangChain
  - LangGraph
  - Generative AI
  - RAG
  - Multi-Modal
  - Apache Airflow
  - FastAPI
featured: false
techStack:
  - Python
  - LangChain
  - LangGraph
  - OpenAI API
  - Pinecone
  - AWS S3
  - GPT-4o Vision
  - FastAPI
  - PostgreSQL
  - Apache Airflow
  - Docker
githubUrl: "https://github.com/surya-madhav/multi-modal-rag"
thumbnail: "/images/multi-agent-rag.png"
hero:
  type: "image"
  src: "/images/multi-agent-rag.png"
  alt: "Multi-Modal RAG System"
---

# Multi-Modal RAG Agent System with Agentic Architectures

## Introduction

I designed and developed a sophisticated multi-modal Retrieval Augmented Generation (RAG) system employing agentic architectures. This system integrates advanced language models with specialized agents to process diverse document formats, extracting and leveraging multimodal content including text, tables, and images to enhance information retrieval and generation capabilities.

## System Architecture

:::mermaid{theme=dark}
graph TD
    A[Document Processing Pipeline] --> B[Multi-Modal RAG System]
    B --> C[Agent Framework]
    
    subgraph "Document Processing"
    A1[PDF Parsing] --> A2[Image Extraction]
    A2 --> A3[Table Extraction]
    A3 --> A4[Vector Embedding]
    A4 --> A5[Vector Database]
    end
    
    subgraph "RAG Components"
    B1[Vector Search] --> B2[Multi-Modal Context]
    B2 --> B3[Content Integration]
    end
    
    subgraph "Agent System"
    C1[Research Assistant] --> C2[Multi-Modal Agent]
    C2 --> C3[Background Task Agent]
    end
    
    A5 --> B1
    B3 --> C1
:::

The system was built with several key components:

1. **Document Processing Pipeline**: Automated workflow for ingesting, parsing, and processing documents
2. **Multi-Modal RAG System**: Enhanced retrieval with vector embedding for text, images, and tables
3. **Agent Framework**: Orchestrated specialized agents through a structured interaction system

## Multi-Modal RAG Implementation

The multi-modal RAG system extends beyond traditional text-based retrieval to incorporate and process rich media content:

:::mermaid{theme=dark}
graph TD
    A[Input Document] --> B{Content Type}
    B -->|Text| C[Text Extraction]
    B -->|Images| D[Image Processing]
    B -->|Tables| E[Table Analysis]
    
    C --> F[Text Embedding]
    D --> G[Vision Model Analysis]
    E --> H[Table Text Extraction]
    E --> I[Table Image Processing]
    
    G --> J[Image Description Embedding]
    H --> K[Table Text Embedding]
    I --> L[Table Structure Embedding]
    
    F --> M[Vector Database]
    J --> M
    K --> M
    L --> M
    
    M --> N[Multi-Modal Context Retrieval]
    N --> O[Enhanced LLM Response]
:::

### Key RAG Features

1. **Multi-Modal Vectorization**: The system processes different content types with specialized approaches:

   | Content Type | Processing Method | Embedding Approach |
   |--------------|-------------------|-------------------|
   | Text Blocks | Direct text extraction | Text embedding (OpenAI) |
   | Images | GPT-4o vision analysis | Description embedding |
   | Tables (Text) | Cell text extraction | Combined text embedding |
   | Tables (Structure) | Vision model analysis | Structure description embedding |

2. **Vector Storage**: The system uses Pinecone for efficient vector storage and retrieval, with namespaces for different document collections.

3. **Context Enhancement**: Retrieved information includes original text, image descriptions, table structures, and source metadata for comprehensive context.

## Agent Framework

The system implements a sophisticated agent framework using LangChain and LangGraph for orchestrating different specialized agents.

:::mermaid{theme=dark}
graph TD
    A[Agent Registry] --> B[Chatbot Agent]
    A --> C[Research Assistant Agent]
    A --> D[Multi-Modal Agent]
    A --> E[Background Task Agent]
    
    subgraph "Agent Components"
    F[LLM Integration] --> F1[State Management]
    F --> F2[Tool Integration]
    F --> F3[Workflow Orchestration]
    F --> F4[Event System]
    end
    
    B --> F
    C --> F
    D --> F
    E --> F
:::

### Agent Types and Specializations

1. **Research Assistant Agent**: Implements a comprehensive research agent with web search, academic research tools, calculator functions, and content safety filtering.

   :::mermaid{theme=dark}
   graph TD
       A[Entry Point] --> B[Safety Filter]
       B -->|Safe Input| C[Model Processing]
       B -->|Unsafe Input| D[Block Unsafe Content]
       C -->|Tool Request| E[Tool Execution]
       C -->|No Tools| F[Final Response]
       D --> F
       E --> C
   :::

   The Research Assistant provides:
   - Web search via DuckDuckGo
   - Academic paper retrieval from arXiv
   - Calculator functions for mathematical operations
   - Content safety filtering with LlamaGuard

2. **Multi-Modal Agent**: Extends research capabilities to handle visual elements and create comprehensive reports.

   :::mermaid{theme=dark}
   graph TD
       A[User Query] --> B[Research Phase]
       B --> C[Multi-Modal Results]
       C --> D[Report Generation]
       D --> E[Final Response]
       
       subgraph "Visual Processing"
       F[Image Analysis] --> F1[Image Description]
       G[Table Analysis] --> G1[Table Structure]
       G --> G2[Table Content]
       end
       
       B --> F
       B --> G
       F1 --> C
       G1 --> C
       G2 --> C
   :::

   This agent:
   - Extracts and categorizes visual content from documents
   - Integrates web search, academic search, and RAG results
   - Creates structured reports with proper formatting
   - Maintains visual context throughout the process

3. **Background Task Agent**: Implements asynchronous task execution within the LangGraph framework.

   :::mermaid{theme=dark}
   graph TD
       A[Task Creation] --> B[New Task]
       B --> C[Running Task]
       C -->|Progress Updates| C
       C --> D[Completed Task]
       
       subgraph "Event System"
       E[Task Events] --> F[Status Updates]
       E --> G[Error Handling]
       end
       
       C --> E
       D --> E
   :::

   The Background Task Agent provides:
   - Asynchronous long-running operations
   - Progress monitoring and status updates
   - Structured task representation
   - Task lifecycle management

## Document Processing Workflow

The document processing pipeline is managed through Apache Airflow, orchestrating the complete workflow from document ingestion to vector embedding.

:::mermaid{theme=dark}
graph TD
    A[Start] --> B[Parse Documents]
    B --> C[Vectorize Documents]
    
    subgraph "Parsing Stage"
    B1[Download PDFs] --> B2[Convert Documents]
    B2 --> B3[Extract Images]
    B3 --> B4[Extract Tables]
    B4 --> B5[Generate JSON/MD]
    end
    
    subgraph "Vectorization Stage"
    C1[Process Text Blocks] --> C2[Process Tables]
    C2 --> C3[Process Images]
    end
::: 