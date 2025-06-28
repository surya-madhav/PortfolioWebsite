---
title: "High-Performance Computing for Lane Detection"
slug: "hpcTusimple"
date: "2024-06-01"
type: "project"
published: true
seo:
  title: "High-Performance Computing for Lane Detection"
  description: "Researched and implemented optimized lane detection for autonomous driving using high-performance computing techniques, with detailed parallel efficiency analysis and scaling across multiple CPUs and GPUs."
  keywords:
    - PyTorch
    - Distributed Computing
    - Deep Learning
    - Computer Vision
    - Parallel Computing
    - CUDA
    - HPC
  image: "/images/hpc/multi_gpu_performance_analysis.png"
summary: "Researched and implemented optimized lane detection for autonomous driving using high-performance computing techniques, with detailed parallel efficiency analysis and scaling across multiple CPUs and GPUs."
tags:
  - PyTorch
  - Distributed Computing
  - Deep Learning
  - Computer Vision
  - Parallel Computing
  - CUDA
  - HPC
categories:
  - PyTorch
  - Distributed Computing
  - Deep Learning
  - Computer Vision
  - Parallel Computing
  - CUDA
  - HPC
featured: false
techStack:
  - Python
  - PyTorch
  - CUDA
  - ResNet
  - U-Net
  - Dask
  - Attention Mechanisms
  - Distributed Data Parallel
  - Mixed Precision
githubUrl: "https://github.com/surya-madhav/hpc-tusimple"
thumbnail: "/images/hpc/multi_gpu_performance_analysis.png"
hero:
  type: "image"
  src: "/images/hpc/multi_gpu_performance_analysis.png"
  alt: "HPC Lane Detection Research"
---

# TuSimple Lane Detection HPC Project

## Introduction

I implemented an optimized lane detection system for autonomous driving using parallel computing techniques. This research explored various optimization strategies to improve performance through parallelization, with a focus on identifying the most efficient approaches for training and deploying lane detection models.

My empirical findings demonstrate that simply adding more computational resources does not always lead to proportional performance improvements due to communication overhead and resource contention.

## Project Overview

Using the TuSimple dataset, I implemented and evaluated comprehensive benchmarking tools to measure the impact of various optimization strategies including:

1. An efficient lane detection model using ResNet backbones with attention mechanisms
2. Optimized data loading and preprocessing through parallel computing techniques
3. Multi-CPU and multi-GPU training to identify communication bottlenecks and optimal configurations
4. Different parallelization approaches to determine scaling efficiency patterns

## Dataset

The TuSimple Lane Detection dataset comprises 6,408 highway images at 1280×720 resolution, totaling 23GB. The dataset presents several challenges that test model robustness: variable weather conditions, lane occlusions, diverse traffic densities, and complex road markings.

In my preprocessing pipeline, images were resized to 800×360 pixels to reduce computational demands while preserving sufficient detail. This preprocessing strategy significantly reduced memory requirements while maintaining detection accuracy above 98% in the final model.

![Lane Detection Dataset Samples](/images/hpc/lane_detection_dataset_samples.png)
*Sample images from the TuSimple dataset showing original images (left), segmentation labels (middle), and instance segmentation labels (right).*

## Model Architecture

:::mermaid{theme=dark}
graph TD
    A[Input Image] --> B[Preprocessing]
    B --> C[Feature Extraction - ResNet Backbone]
    C --> D[Coordinate Attention]
    D --> E[U-Net Decoder]
    E --> F[Segmentation Output]
:::

I designed a lane detection architecture following an encoder-decoder paradigm enhanced with attention mechanisms. The architecture includes:

### Feature Extraction Backbone

I implemented and compared two ResNet variants:

- **ResNet-18**: A lightweight backbone (11.7M parameters) providing faster inference
- **ResNet-50**: A deeper backbone (25.6M parameters) offering more robust feature extraction at increased computational cost

ResNet-50 delivered approximately 1.7% higher validation accuracy than ResNet-18, while requiring 2.2x more training time. Transfer learning with ImageNet pre-trained weights accelerated convergence by roughly 37%.

### Coordinate Attention Mechanism

:::mermaid{theme=dark}
graph TD
    A[Feature Map] --> B[Horizontal Pooling]
    A --> C[Vertical Pooling]
    B --> D[1×1 Conv - Dimension Reduction]
    C --> D
    D --> E[ReLU Activation]
    E --> F1[Horizontal Conv]
    E --> F2[Vertical Conv]
    F1 --> G[Attention Map Addition]
    F2 --> G
    G --> H[Sigmoid Activation]
    H --> I[Element-wise Multiplication with Input]
:::

I implemented a specialized spatial attention mechanism called Coordinate Attention that enhances lane feature detection by separately processing horizontal and vertical coordinate information. This mechanism offers:

1. **Directional Sensitivity**: Specifically targeting the directional nature of lane markings
2. **Parameter Efficiency**: Only ~0.5M additional parameters compared to ~2.5M for standard attention blocks
3. **Computational Efficiency**: Only 7.3% additional computation versus the base model

In my ablation studies, models with Coordinate Attention achieved 2.3% higher IoU scores compared to those without, with minimal computational overhead.

### U-Net Decoder Architecture

The decoder component progressively upsamples feature maps while leveraging skip connections to retain fine spatial details. The decoder structure automatically adapts based on the selected backbone, ensuring appropriate feature handling regardless of backbone choice.

## Data Processing and Loading

Efficient data loading is critical for deep learning pipelines. I evaluated four distinct approaches:

### Data Loading Strategies

1. **Base DataLoader (Baseline)**: Single-process loading with minimal configuration
2. **Optimized PyTorch DataLoader**: Multiple worker processes with pinned memory and prefetching
3. **Dask-based Parallelization**: Distributed computing with parallel task scheduling
4. **Memory-mapped Loading**: Direct mapping of files to memory space to avoid explicit read operations


### Performance Comparison

![All Methods Comparison](/images/hpc/all_methods_comparison.png)
*Comprehensive comparison of all four data loading implementations.*

| Method | Loading Time (s) | Memory Usage (MB) | CPU Usage (%) |
|--------|----------------|-------------|-----------|
| Baseline | 1.10 | 1,020 | 15.9% |
| Optimized Loader | 1.11 | 18,275 | 17.5% |
| Dask | 1.66 | 18,362 | 14.8% |
| Memmap | 0.67 | 18,380 | 15.5% |

The memory-mapped implementation delivered the fastest loading performance (39% faster than baseline), though at the cost of higher memory usage. For datasets that fit in memory and require moderate preprocessing, the coordination overhead of distributed systems like Dask can outweigh their computational advantages.

### DataLoader Optimization

I conducted a detailed analysis to determine the optimal configuration for the PyTorch DataLoader when processing the TuSimple dataset.

![DataLoader Performance Heatmap](/images/hpc/dataloader_performance_heatmap.png)
*Heatmap showing data loading times for different worker and batch size combinations. Darker colors indicate better performance.*

#### Key Findings

1. **Worker Count Effect**: The most significant factor was worker count, with diminishing returns beyond 4-8 workers
2. **Batch Size Effect**: For configurations with high worker counts (4-8), larger batch sizes generally performed better
3. **Optimal Configuration**: 8 workers + batch size 64 (35.92 seconds to load the entire dataset)

## Parallelization Techniques

### Multi-CPU Performance

![Speedup Graph](/images/hpc/multicpu_speedup.png)
*Speedup ratio relative to baseline configuration*

My analysis showed clear trends in training time with respect to CPU count:

1. **Initial Improvement**: Significant reduction in elapsed time when increasing from 2 to 4 CPUs
2. **Performance Decline**: Training time increases when adding more than 4 CPUs
3. **Maximum Speedup**: 4 CPUs provide the highest speedup compared to the baseline

The optimal configuration is 4 CPU processes, providing the best balance of parallelism and overhead with a speedup of approximately 2x faster than the 2-CPU baseline.

### Multi-GPU Performance

![Multi-GPU Performance Analysis](/images/hpc/multi_gpu_performance_analysis.png)
*Training time and speedup factor analysis for multiple GPU configurations.*

| GPU Count | Training Time | Speedup | Parallel Efficiency |
|-----------|---------------|---------|---------------------|
| 1 GPU     | 403.41s       | 1.00x   | 100.0%              |
| 2 GPUs    | 253.93s       | 1.59x   | 79.4%               |
| 3 GPUs    | 174.35s       | 2.31x   | 77.1%               |
| 4 GPUs    | 168.99s       | 2.39x   | 59.7%               |

My analysis showed:
1. **Sub-linear Scaling**: While adding GPUs improves performance, the scaling is sub-linear
2. **Diminishing Returns**: Minimal improvement from 3 GPUs (174.35s) to 4 GPUs (168.99s)
3. **Optimal Configuration**: 3 GPUs provide the best balance of speedup and efficiency

### Mixed Precision Training

:::mermaid{theme=dark}
flowchart TD
    A[Input in FP32] --> B[Model Forward in FP16]
    B --> C[Loss Calculation in FP32]
    C --> D[Backward Pass in FP16]
    D --> E[Gradient Scaling]
    E --> F[Optimizer Step in FP32]
:::

Mixed precision training provided substantial performance gains:

| Training Mode        | Time (seconds) | Improvement |
|----------------------|----------------|-------------|
| Mixed Precision      | 78.61          | 18.65%      |
| No Mixed Precision   | 96.63          | -           |

This approach uses FP16 (half precision) for most operations while maintaining FP32 (full precision) for critical operations, automatically handling scaling to prevent underflow.

## Performance Analysis

### Model Performance

The Lane Detection model achieved excellent performance in segmenting lane markings:

| Epoch | Train Loss | Train Accuracy | Validation Loss | Validation Accuracy |
|-------|------------|----------------|-----------------|---------------------|
| 1     | 0.0726     | 97.08%         | 0.0527          | 97.79%              |
| 5     | 0.0437     | 98.11%         | 0.0443          | 98.15%              |

![Model Evaluation Results](/images/hpc/lane_detection_model_evaluation.png)
*Comparison of ground truth segmentation (left) and model prediction (right) on a validation sample.*

### Scaling Efficiency Analysis

Key insights from my analysis:
1. Data parallelism scales efficiently up to 3 GPUs (77.1% efficiency)
2. Beyond 3 GPUs, communication overhead significantly impacts scaling efficiency (dropping to 59.7%)
3. CPU parallelization shows optimal performance at 4 CPUs, with resource contention causing performance degradation beyond this point

## Recommendations

### Data Loading Strategy

1. **Recommended Approach**: 
   - For general use: **Optimized DataLoader** with pinned memory and multiple workers
   - For performance-critical applications: **Memory-mapped loading**
   - For memory-constrained systems: **Baseline DataLoader**

2. **Configuration Settings**:
   - **Batch Size**: 64 (for high-performance systems) 