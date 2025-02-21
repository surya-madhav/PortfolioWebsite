"use client";

import React from 'react';
import Image from 'next/image';
import "../projects.css";
import Link from 'next/link';
import { GitHubLogoIcon } from "@radix-ui/react-icons";

// Define project metadata (should match entry in route-projects.ts)
const projectData = {
  title: "Lane Detection through Parallel Computing",
  githubUrl: "https://github.com/yourusername/lane-detection"
};

const LaneDetection = () => {
  return (
    <div className="py-8 w-full">
      <header className="text-center">
        <div className='w-full'>
          <h1 className="text-3xl font-bold">{projectData.title}</h1>
          <div className="flex flex-col justify-center items-center">
            <Link href={projectData.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="bg-gradient-to-tr from-purple-500 to-blue-400 rounded-full border-orange-400 hover:shadow-2xl hover:shadow-orange-300 hover:border-orange-200 border mt-4 h-12 w-12 inline-block">
              <GitHubLogoIcon className='w-full h-full' />
            </Link>
            <p className='text-xs text-gray-500 mt-2'>View Code On Github</p>
          </div>
        </div>
      </header>

      <div className='w-full max-w-4xl mx-auto'>
        <div className="my-6 image-container w-full relative h-64">
          <Image
            src="/images/lane-detection.png"
            alt="Lane Detection Visualization"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <div className="prose prose-invert">
            <p>Lane detection is a crucial component in autonomous driving and Advanced Driver Assistance Systems (ADAS). It involves identifying and tracking lane markers on roadways, ensuring vehicles maintain their lane positions. Robust lane detection is vital for enhancing road safety and enabling self-driving technology.</p>
            
            <p className="mt-4">This project aims to optimize lane detection algorithms using parallel computing techniques, experimenting with different data loading strategies, and implementing multi-CPU and multi-GPU training to maximize computational efficiency.</p>
          </div>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Dataset: TuSimple Lane Detection</h2>
          <div className="prose prose-invert">
            <p>The TuSimple dataset includes 6,408 highway images at 1280×720 resolution with sequential video frames where only the last frame per clip is labeled. The total dataset size is 23GB.</p>
            
            <div className="bg-gray-800 p-4 rounded-md my-4">
              <p className="font-mono text-sm">
                {`{
  "lanes": [
    [632, 625, 617, ...],  // Lane 1 coordinates
    [719, 734, 748, ...],  // Lane 2 coordinates
    ...
  ],
  "h_samples": [240, 250, 260, ...], // Vertical positions
  "raw_file": "path_to_clip"
}`}
              </p>
            </div>
            
            <p>Key challenges include weather variability (sunny, cloudy, rainy conditions), occlusions & traffic variations, and complex road structures requiring adaptive lane tracking.</p>
          </div>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Methodology</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Data Preprocessing</h3>
          <ul className="list-disc list-inside">
            <li>Resized images to 800×360 pixels</li>
            <li>Converted grayscale images to RGB</li>
            <li>Generated binary segmentation masks</li>
            <li>Standardized inputs for PyTorch models</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Model Architecture</h3>
          <ul className="list-disc list-inside">
            <li>ResNet-18 & ResNet-50 backbones</li>
            <li>Feature extraction refined using Coordinate Attention Mechanism</li>
            <li>U-Net-like upsampling network for segmentation mask prediction</li>
            <li>Loss functions: Dice Loss & IoU Loss</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Data Loading Techniques Compared</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Method</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Loading Time</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Memory Usage</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">CPU Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">Baseline DataLoader</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.10s</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.02GB</td>
                  <td className="py-2 px-4 border-b border-gray-700">15.9%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">Optimized DataLoader</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.11s</td>
                  <td className="py-2 px-4 border-b border-gray-700">18GB</td>
                  <td className="py-2 px-4 border-b border-gray-700">17.49%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">Dask Parallel</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.65s</td>
                  <td className="py-2 px-4 border-b border-gray-700">18GB</td>
                  <td className="py-2 px-4 border-b border-gray-700">14.76%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">Memmap Loader</td>
                  <td className="py-2 px-4 border-b border-gray-700">0.67s</td>
                  <td className="py-2 px-4 border-b border-gray-700">18GB</td>
                  <td className="py-2 px-4 border-b border-gray-700">15.53%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 font-semibold text-blue-400">Conclusion: Memmap offers the fastest data loading but consumes high memory.</p>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Multi-CPU and Multi-GPU Training</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Multi-CPU Training (PyTorch DDP)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">CPUs</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Elapsed Time (s)</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Speedup</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">2</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.2s</td>
                  <td className="py-2 px-4 border-b border-gray-700">2.5x</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">4</td>
                  <td className="py-2 px-4 border-b border-gray-700">0.4s</td>
                  <td className="py-2 px-4 border-b border-gray-700">3.5x</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">8</td>
                  <td className="py-2 px-4 border-b border-gray-700">0.5s</td>
                  <td className="py-2 px-4 border-b border-gray-700">2.8x</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">16</td>
                  <td className="py-2 px-4 border-b border-gray-700">0.7s</td>
                  <td className="py-2 px-4 border-b border-gray-700">2.0x</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 font-semibold text-blue-400">Key Insight: 4 CPUs achieved the best speedup, but adding more CPUs led to diminishing returns.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Multi-GPU Training (PyTorch DDP)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">GPUs</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Training Time (s)</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Speedup</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Efficiency (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">1</td>
                  <td className="py-2 px-4 border-b border-gray-700">403.41s</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.0x</td>
                  <td className="py-2 px-4 border-b border-gray-700">100%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">2</td>
                  <td className="py-2 px-4 border-b border-gray-700">253.62s</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.59x</td>
                  <td className="py-2 px-4 border-b border-gray-700">79.4%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">3</td>
                  <td className="py-2 px-4 border-b border-gray-700">174.74s</td>
                  <td className="py-2 px-4 border-b border-gray-700">2.31x</td>
                  <td className="py-2 px-4 border-b border-gray-700">77.1%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">4</td>
                  <td className="py-2 px-4 border-b border-gray-700">168.99s</td>
                  <td className="py-2 px-4 border-b border-gray-700">2.39x</td>
                  <td className="py-2 px-4 border-b border-gray-700">59.7%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 font-semibold text-blue-400">Conclusion: 3 GPUs provide the best trade-off between speedup and efficiency.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Mixed Precision Training</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Mode</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Training Time (s)</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Speedup (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">32-bit</td>
                  <td className="py-2 px-4 border-b border-gray-700">96.63s</td>
                  <td className="py-2 px-4 border-b border-gray-700">Baseline</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">Mixed Precision (16-bit)</td>
                  <td className="py-2 px-4 border-b border-gray-700">78.61s</td>
                  <td className="py-2 px-4 border-b border-gray-700">18.7% faster</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 font-semibold text-blue-400">Key Finding: Mixed Precision reduced training time by 18.7% without affecting accuracy.</p>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Final Insights and Recommendations</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Data Loading Optimization</h3>
          <ul className="list-disc list-inside">
            <li>Memmap = Fastest, but high memory usage</li>
            <li>Dask = Inefficient due to overhead</li>
            <li>Optimized DataLoader = Stable balance between speed and memory</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">CPU and GPU Utilization</h3>
          <ul className="list-disc list-inside">
            <li>4 CPUs offer optimal parallelization</li>
            <li>3 GPUs provide the best scaling efficiency</li>
            <li>Mixed Precision Training is highly effective for acceleration</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Implementation Complexity vs. Benefits</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Method</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Speedup</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Memory Usage</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left">Implementation Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">Baseline</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.0x</td>
                  <td className="py-2 px-4 border-b border-gray-700">1GB</td>
                  <td className="py-2 px-4 border-b border-gray-700">Simple</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">Optimized Loader</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.1x</td>
                  <td className="py-2 px-4 border-b border-gray-700">18GB</td>
                  <td className="py-2 px-4 border-b border-gray-700">Moderate</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">Dask</td>
                  <td className="py-2 px-4 border-b border-gray-700">0.9x</td>
                  <td className="py-2 px-4 border-b border-gray-700">18GB</td>
                  <td className="py-2 px-4 border-b border-gray-700">Complex</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-700">Memmap</td>
                  <td className="py-2 px-4 border-b border-gray-700">1.65x</td>
                  <td className="py-2 px-4 border-b border-gray-700">18GB</td>
                  <td className="py-2 px-4 border-b border-gray-700">High Complexity</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
            <p className="font-semibold text-blue-300 text-lg">Final Recommendation</p>
            <p className="mt-2">A hybrid approach using <span className="font-bold text-blue-300">Optimized DataLoader + Multi-GPU Training (3 GPUs) + Mixed Precision</span> is the ideal balance for scalability and efficiency.</p>
          </div>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">References</h2>
          <ul className="list-disc list-inside">
            <li>Christofel, Kaggle, RESA: Recurrent Feature-Shift Aggregator</li>
            <li>Papers with Code: Self Pre-training with Masked Sequential Autoencoders</li>
            <li>ZJULearning (GitHub): RESA in AAAI2021</li>
            <li>TuSimple Lane Dataset, Kaggle</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LaneDetection;