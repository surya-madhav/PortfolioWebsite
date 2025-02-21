# Lane Detection and Prediction Through Parallel Computing

## **1. Introduction**
### **1.1 Background**
Lane detection is a crucial component in autonomous driving and Advanced Driver Assistance Systems (ADAS). It involves identifying and tracking lane markers on roadways, ensuring vehicles maintain their lane positions. Robust lane detection is vital for enhancing road safety and enabling self-driving technology. However, challenges such as varying weather conditions, occlusions, and complex road geometries must be addressed to achieve high accuracy and real-time performance.

### **1.2 Motivation**
- Traditional lane detection techniques struggle with environmental variability.
- Parallel computing can **accelerate lane detection**, making real-time deployment feasible.
- Efficient **data loading and model training techniques** are necessary to scale systems effectively.

### **1.3 Goal**
This project aims to:
- **Optimize lane detection** using **parallel computing techniques**.
- Experiment with different **data loading strategies**:
  - PyTorch **DataLoader**
  - **Dask-based** parallel processing
  - **Memory-mapped (memmap) loading**
- Implement **multi-CPU and multi-GPU training** to maximize computational efficiency.

## **2. Dataset: TuSimple Lane Detection**
### **2.1 Overview**
The **TuSimple dataset** is widely used for benchmarking lane detection models. It includes:
- **6,408 highway images** at **1280×720 resolution**.
- **Sequential video frames** where only the last frame per clip is labeled.
- **23GB total dataset size**.

### **2.2 Label Format (JSON)**
```json
{
  "lanes": [
    [632, 625, 617, ...],  // Lane 1 coordinates
    [719, 734, 748, ...],  // Lane 2 coordinates
    ...
  ],
  "h_samples": [240, 250, 260, ...], // Vertical positions
  "raw_file": "path_to_clip"
}
```

### **2.3 Key Challenges**
- **Weather variability**: Sunny, cloudy, rainy conditions.
- **Occlusions & traffic variations**.
- **Complex road structures requiring adaptive lane tracking**.

## **3. Methodology**
### **3.1 Data Preprocessing**
- **Resized images** to **800×360 pixels**.
- **Converted grayscale images to RGB**.
- **Generated binary segmentation masks**.
- **Standardized inputs** for **PyTorch models**.

### **3.2 Model Architecture**
- **ResNet-18 & ResNet-50** backbones.
- Feature extraction refined using **Coordinate Attention Mechanism**.
- **U-Net-like upsampling network** for **segmentation mask prediction**.
- **Loss functions**: Dice Loss & IoU Loss.

### **3.3 Data Loading Techniques Compared**
| Method | Loading Time | Memory Usage | CPU Usage |
|--------|-------------|-------------|-----------|
| **Baseline DataLoader** | **1.10s** | **1.02GB** | **15.9%** |
| **Optimized DataLoader** | **1.11s** | **18GB** | **17.49%** |
| **Dask Parallel** | **1.65s** | **18GB** | **14.76%** |
| **Memmap Loader** | **0.67s** | **18GB** | **15.53%** |

> **Conclusion:** **Memmap** offers the **fastest data loading** but consumes **high memory**.

## **4. Multi-CPU and Multi-GPU Training**
### **4.1 Multi-CPU Training (PyTorch DDP)**
| CPUs | Elapsed Time (s) | Speedup |
|------|----------------|---------|
| **2** | **1.2s** | **2.5x** |
| **4** | **0.4s** | **3.5x** |
| **8** | **0.5s** | **2.8x** |
| **16** | **0.7s** | **2.0x** |

> **Key Insight**: **4 CPUs** achieved the **best speedup**, but adding more CPUs led to diminishing returns.

### **4.2 Multi-GPU Training (PyTorch DDP)**
| GPUs | Training Time (s) | Speedup | Efficiency (%) |
|------|----------------|---------|--------------|
| **1** | **403.41s** | **1.0x** | **100%** |
| **2** | **253.62s** | **1.59x** | **79.4%** |
| **3** | **174.74s** | **2.31x** | **77.1%** |
| **4** | **168.99s** | **2.39x** | **59.7%** |

> **Conclusion:** **3 GPUs provide the best trade-off** between **speedup and efficiency**.

### **4.3 Mixed Precision Training**
| Mode | Training Time (s) | Speedup (%) |
|------|----------------|-------------|
| **32-bit** | **96.63s** | **Baseline** |
| **Mixed Precision (16-bit)** | **78.61s** | **18.7% faster** |

> **Key Finding:** Mixed Precision **reduced training time by 18.7%** without affecting accuracy.

## **5. Final Insights and Recommendations**
### **5.1 Data Loading Optimization**
- **Memmap = Fastest**, but **high memory usage**.
- **Dask = Inefficient due to overhead**.
- **Optimized DataLoader = Stable balance between speed and memory**.

### **5.2 CPU and GPU Utilization**
- **4 CPUs offer optimal parallelization**.
- **3 GPUs provide the best scaling efficiency**.
- **Mixed Precision Training is highly effective for acceleration**.

### **5.3 Implementation Complexity vs. Benefits**
| Method | Speedup | Memory Usage | Implementation Complexity |
|--------|--------|-------------|---------------------------|
| **Baseline** | **1.0x** | **1GB** | **Simple** |
| **Optimized Loader** | **1.1x** | **18GB** | **Moderate** |
| **Dask** | **0.9x** | **18GB** | **Complex** |
| **Memmap** | **1.65x** | **18GB** | **High Complexity** |

> **Final Recommendation**: A **hybrid approach** using **Optimized DataLoader + Multi-GPU Training (3 GPUs) + Mixed Precision** is the **ideal balance** for **scalability and efficiency**.

## **6. References**
- Christofel, Kaggle, **RESA: Recurrent Feature-Shift Aggregator**
- **Papers with Code**: Self Pre-training with **Masked Sequential Autoencoders**
- **ZJULearning (GitHub)**: RESA in AAAI2021
- **TuSimple Lane Dataset**, Kaggle

for the above project. create an interactive webpage explaining all details of the proejct. add as many visualisations as possible