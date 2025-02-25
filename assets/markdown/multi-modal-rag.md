# Multi-Modal RAG Agent System with Agentic Architectures

## Introduction

I designed and developed a sophisticated multi-modal Retrieval Augmented Generation (RAG) system employing agentic architectures. This system integrates advanced language models with specialized agents to process diverse document formats, extracting and leveraging multimodal content including text, tables, and images to enhance information retrieval and generation capabilities.

## System Architecture

<div class="mermaid">
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
</div>

The system was built with several key components:

1. **Document Processing Pipeline**: Automated workflow for ingesting, parsing, and processing documents
2. **Multi-Modal RAG System**: Enhanced retrieval with vector embedding for text, images, and tables
3. **Agent Framework**: Orchestrated specialized agents through a structured interaction system

## Multi-Modal RAG Implementation

The multi-modal RAG system extends beyond traditional text-based retrieval to incorporate and process rich media content:

<div class="mermaid">
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
</div>

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

<div class="mermaid">
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
</div>

### Agent Types and Specializations

1. **Research Assistant Agent**: Implements a comprehensive research agent with web search, academic research tools, calculator functions, and content safety filtering.

   <div class="mermaid">
   graph TD
       A[Entry Point] --> B[Safety Filter]
       B -->|Safe Input| C[Model Processing]
       B -->|Unsafe Input| D[Block Unsafe Content]
       C -->|Tool Request| E[Tool Execution]
       C -->|No Tools| F[Final Response]
       D --> F
       E --> C
   </div>

   The Research Assistant provides:
   - Web search via DuckDuckGo
   - Academic paper retrieval from arXiv
   - Calculator functions for mathematical operations
   - Content safety filtering with LlamaGuard

2. **Multi-Modal Agent**: Extends research capabilities to handle visual elements and create comprehensive reports.

   <div class="mermaid">
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
   </div>

   This agent:
   - Extracts and categorizes visual content from documents
   - Integrates web search, academic search, and RAG results
   - Creates structured reports with proper formatting
   - Maintains visual context throughout the process

3. **Background Task Agent**: Implements asynchronous task execution within the LangGraph framework.

   <div class="mermaid">
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
   </div>

   The Background Task Agent provides:
   - Asynchronous long-running operations
   - Progress monitoring and status updates
   - Structured task representation
   - Task lifecycle management

## Document Processing Workflow

The document processing pipeline is managed through Apache Airflow, orchestrating the complete workflow from document ingestion to vector embedding.

<div class="mermaid">
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
    C3 --> C4[Upsert to Vector DB]
    end
    
    B --> B1
    B5 --> C
    C --> C1
</div>

The Airflow DAG manages:
1. Document parsing from PDF sources
2. Text extraction and structure recognition
3. Image and table isolation
4. Multi-modal vectorization
5. Vector database insertion

## Multi-Modal Processing Features

The system's multi-modal processing capabilities include:

### 1. Table Processing

Tables are processed both as structured data and as images:

```python
def process_table(table, doc_name):
    # Extract structured data
    table_text = []
    for cell in table['data']['grid']:
        if 'text' in cell:
            table_text.append(cell['text'])
    
    # Create text embedding
    text_embedding = create_embedding(" ".join(table_text))
    
    # Process table image with vision model
    image_data = s3_handler.download_fileobj(table_image_key)
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this table's content and structure in detail."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{base64.b64encode(image_data.getvalue()).decode()}"
                        }
                    }
                ]
            }
        ]
    )
    image_description = response.choices[0].message.content
```

### 2. Image Analysis

Images are processed using vision models to extract rich descriptions:

```python
def process_picture(picture, doc_name):
    # Get image from storage
    image_data = s3_handler.download_fileobj(picture_key)
    
    # Generate detailed description with vision model
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this image in detail, including any text or diagrams visible."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{base64.b64encode(image_data.getvalue()).decode()}"
                        }
                    }
                ]
            }
        ]
    )
    image_description = response.choices[0].message.content
    embedding = create_embedding(image_description)
```

### 3. Multi-Modal Report Generation

The Multi-Modal Agent compiles research into comprehensive reports with visual elements:

```python
def generate_report(state):
    # Extract all research results
    research_results = state.rag_results
    visual_elements = state.visual_elements
    
    # Create structured report sections
    sections = [
        "# Executive Summary",
        create_summary(research_results),
        "# Key Findings",
        generate_findings(research_results, visual_elements),
        "# Visual Analysis",
        compile_visual_analysis(visual_elements),
        "# References",
        generate_references(research_results)
    ]
    
    # Format with proper references to visual elements
    return "\n\n".join(sections)
```

## Technical Implementation

### Vector Database Integration

The system integrates with Pinecone for efficient vector storage and retrieval:

```python
def setup_pinecone_index(index_name):
    # Check if index exists
    index_list = pc.list_indexes()
    existing_indexes = index_list.get('indexes', [])
    index_exists = any(idx.get('name') == index_name for idx in existing_indexes)
    
    if index_exists:
        pc.delete_index(index_name)
    
    # Create new index
    pc.create_index(
        name=index_name,
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
```

### LangGraph Agent Implementation

The agent framework uses LangGraph for state management and workflow:

```python
def build_multi_modal_agent():
    # Define state object with fields for multi-modal content
    class MultiModalState(MessagesState):
        tool_outputs: Dict = {}
        rag_results: Dict = {}
        visual_elements: List = []
        final_report: str = ""
        report_metadata: Dict = {}
    
    # Create state graph
    agent = StateGraph(MultiModalState)
    
    # Add processing nodes
    agent.add_node("research", conduct_research)
    agent.add_node("report", generate_report)
    
    # Define workflow
    agent.set_entry_point("research")
    agent.add_edge("research", "report")
    agent.add_edge("report", END)
    
    # Compile agent
    return agent.compile()
```

## Outcomes and Applications

This multi-modal RAG system with agentic architectures enables:

1. **Comprehensive Research**: The system can conduct thorough research across multiple modalities, understanding content in context.

2. **Rich Content Analysis**: By analyzing images and tables alongside text, the system provides more complete understanding of documents.

3. **Structured Output Generation**: The agents can create well-formatted reports that incorporate both textual and visual elements.

4. **Asynchronous Processing**: The background task agent enables long-running operations without blocking user interactions.

5. **Safety-First Design**: Content filtering for both inputs and outputs ensures appropriate responses.

## Conclusion

The multi-modal RAG system with agentic architectures represents a significant advancement in AI-assisted research and knowledge work. By incorporating multiple content types and specialized agent behaviors, the system provides more comprehensive, contextually aware, and useful responses than traditional text-only approaches.

The modular design allows for easy extension with new capabilities, while the LangGraph framework provides a robust foundation for managing complex agent workflows and state. This architecture demonstrates the power of combining retrieval augmented generation with specialized agents for enhanced AI applications.
