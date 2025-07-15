---
title: "Predictive Analytics for Bike Sharing Demand"
slug: "bikeSharing"
date: "2024-06-01"
type: "project"
published: true
seo:
  title: "Predictive Analytics for Bike Sharing Demand"
  description: "Developed a predictive model on Bike Sharing dataset, achieving 90% accuracy in demand prediction with Random Forest."
  keywords:
    - Python
    - scikit-learn
    - Seaborn
    - Pandas
    - NumPy
  image: "/images/BikeSharingFlow.png"
summary: "Developed a predictive model on Bike Sharing dataset, achieving 90% accuracy in demand prediction with Random Forest."
tags:
  - Python
  - scikit-learn
  - Seaborn
  - Pandas
  - NumPy
categories:
  - Python
  - scikit-learn
  - Seaborn
  - Pandas
  - NumPy
featured: false
techStack:
  - Python
  - scikit-learn
  - AutoML
  - Pandas
  - NumPy
githubUrl: "https://github.com/surya-madhav/BikeSharingDataScience"
thumbnail: "/images/BikeSharingFlow.png"
hero:
  type: "image"
  src: "/images/BikeSharingFlow.png"
  alt: "Predictive Analytics for Bike Sharing Demand"
---

## Bike Sharing Demand Prediction

This project utilizes **H2O AutoML** to predict daily bike rental counts, focusing on model accuracy and feature interpretability. Excluding ensemble models, the analysis uses **SHAP** and **LIME** to understand key drivers of bike rentals.

### AutoML Process
- **H2O AutoML** was employed to automatically train multiple models such as **Random Forest**, **Linear Regression**, and **XGBoost**.
- The goal was to predict the total daily bike rentals based on features like **temperature**, **humidity**, and **seasonality**.

### Feature Engineering and Data Preprocessing
- The dataset was preprocessed with **one-hot encoding** applied to categorical variables, while numerical features were already normalized.
- Features include **season**, **year**, **month**, **holiday status**, **weather conditions**, and normalized **temperature**, **humidity**, and **windspeed**.

### Results and Metrics
- The **Random Forest** model outperformed other models with the following metrics:
  - **R²**: 0.87
  - **MAE**: 471
  - **RMSE**: 716
- **Linear Regression** achieved:
  - **R²**: 0.84
  - **MAE**: 583
  - **RMSE**: 722
- **Temperature**, **year**, and **humidity** were identified as the most important factors influencing bike rental demand.

### Model Interpretability
- **SHAP (SHapley Additive exPlanations)** analysis revealed:
  - **Year (yr_1)**, **temperature (temp)**, and **feeling temperature (atemp)** had the highest impact on rental counts.
  - **SHAP values** were used to explain how individual predictions were made, providing insights into how feature values contributed to the overall rental predictions.

### Data Visualization
- Histograms and count plots were used to explore the distribution of bike rentals and feature values.
  - **Temperature** and **working days** were found to significantly influence the number of rentals, with moderate temperatures correlating with higher rentals.

### Limitations
- **H2O AutoML's** inability to compute SHAP values for ensemble models led to the exclusion of these models to maintain interpretability.
- The focus remained on simpler models like **Random Forest** and **Linear Regression** for transparent analysis.

For more information, visit the [Github Repository](https://github.com/surya-madhav/BikeSharingDataScience). 