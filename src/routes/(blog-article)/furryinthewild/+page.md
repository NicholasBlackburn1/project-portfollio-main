---
title: "Fursona of the Wild: A Fursona Species Detector"
slug: furryinthewild
coverImage: /images/posts/20230629_162009~2.jpg
date: 2024-07-18T21:55:15.361Z
excerpt: |
  A DNN model for OpenCV to recognize and classify furries in the wild (FITW).
tags:
  - Opencv
  - ML
---

<script>
  import Callout from "$lib/components/molecules/Callout.svelte";
  import CodeBlock from "$lib/components/molecules/CodeBlock.svelte";
  import Image from "$lib/components/atoms/Image.svelte";
</script>


## Introduction

Hey there, fellow fur enthusiasts! 🦊 Welcome to an exciting journey into the wild world of AI and furries. Today, we're diving into my latest project, Fursona of the Wild, where we're building a deep neural network (DNN) model using OpenCV to recognize furries in the wild (FITW). Whether you're a tech-savvy fur or just curious about the magic behind furry recognition, this project has something for everyone.




<Callout type="warning">
Cuda is HIGHLY Reconmended for running this project, since its a pretty big model
</Callout>

## Project Goals

The primary goals of **Fursona of the Wild** are:

- **Create a DNN Model**: Develop a deep neural network model for OpenCV that can accurately recognize furries in various environments.

- **Learn and Improve**: Gain hands-on experience in creating both a detector model and a recognition model, enhancing my skills along the way.
- **Furry Community Contribution**: Provide the furry community with a customized recognition system based on fursuits, making it easier to identify and celebrate our unique characters.
- **Optimize Performance**: Train, learn, and improve the model's accuracy and speed to match the performance of advanced models like <a href="">`YOLO V4`, but tailored specifically for furries.

## Data Structure

The dataset is meticulously organized into folders based on species, with each folder containing around 300 images. This organization helps in creating precise classifications for each different species of furries.
Certainly! Let's break down the web scraping snippet and provide detailed explanations for your blog post:

### Data Collection

For effective training, we need a vast collection of different fursonas tagged and sorted by species. Furtrack serves as the perfect database for this purpose, and I created a custom web scraper to gather these images.

#### Web Scraping Code Snippet:

```python
import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Function to download multiple images from a URL using Selenium
def download_multiple_images(driver, url, species):
    driver.get(url)
    scrolls_performed = 0

    while scrolls_performed < 100:  # Scroll down the page multiple times
        driver.execute_script(f"window.scrollBy(0, 400);")
        scrolls_performed += 1
        time.sleep(7)  # Allow time for the page to load

        # Find all image elements using Selenium's WebDriverWait
        img_tags = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'img.index-image-actual'))
        )

        # Download each image
        for img_tag in img_tags:
            link = img_tag.get_attribute('src')
            image_name = link.split('/')[-1]  # Extract image name from URL
            directory = f"/home/nicky-blackburn/Documents/Fursona-Detector/webscraper/dataset/{species}"

            if not os.path.exists(directory):
                os.makedirs(directory)

            output_path = os.path.join(directory, image_name)
            download_image(link, output_path)  # Function to download the image
```

**Explanation:**

- **WebDriver Setup**: Imports necessary modules (`os`, `time`, `selenium`) and initializes a Selenium WebDriver (`driver`) for web scraping.
  
- **Scrolling and Loading**: Scrolls down the page multiple times (`100` times in this case) to load more images dynamically.

- **Waiting for Elements**: Uses `WebDriverWait` to wait up to `10` seconds until all image elements (`img.index-image-actual`) are present on the page. This ensures that all images are loaded before attempting to download.

- **Downloading Images**: Iterates through each found image (`img_tags`), retrieves the source URL (`link`), extracts the image name from the URL (`image_name`), creates a directory based on the species (`species`), and downloads the image to the specified directory using a custom `download_image` function.

#### Key Considerations:
- **Data Diversity**: By scraping Furtrack, a comprehensive furry fursona database, you ensure a diverse dataset crucial for training your classification model effectively.
  
- **Automation**: Selenium automates the scrolling and image downloading process, making it efficient for gathering a large number of images automatically.

- **Organization**: Images are organized into directories based on the species, facilitating structured data management for subsequent training steps.

## Training the Model

All the data used for training this model comes from <a href="http://furtrack.com">`Furtrack`</a>, a comprehensive furry fursona database. I used a custom web scraper to gather single furry shots from the site, ensuring a diverse and rich dataset for training.

#### Setting up the Environment and Data Loading:

```python
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.callbacks import TensorBoard
from datetime import datetime

# Ensure TensorFlow uses CPU only
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

# Set up TensorBoard for visualization
log_dir = "logs/fit/" + datetime.now().strftime("%Y%m%d-%H%M%S")
tensorboard_callback = TensorBoard(log_dir=log_dir, histogram_freq=1)

# Directory where the dataset is stored
dataset_path = '/home/nicky-blackburn/Documents/Fursona-Detector/webscraper/dataset'
class_labels = sorted(os.listdir(dataset_path))
num_classes = len(class_labels)
```

**Explanation:**
- **Environment Setup**: TensorFlow is configured to use only the CPU (`os.environ['CUDA_VISIBLE_DEVICES'] = '-1'`), ensuring compatibility and possibly faster debugging on non-GPU setups.
- **TensorBoard Setup**: Sets up TensorBoard to log training metrics and visualize them later.
- **Dataset Information**: Defines the path where the dataset is stored (`dataset_path`) and retrieves the class labels (folder names) from this directory.

#### Loading and Preprocessing the Dataset:

```python
# ImageDataGenerator for training data augmentation and loading
train_datagen = ImageDataGenerator(
    rescale=1./255,  # Normalize pixel values to [0,1]
    shear_range=0.2,  # Shear transformations
    zoom_range=0.2,  # Zoom transformations
    horizontal_flip=True,  # Horizontal flipping
    validation_split=0.2  # Split for validation set
)

# Flow from directory for training and validation datasets
train_generator = train_datagen.flow_from_directory(
    dataset_path,
    target_size=(300, 300),  # Resizes images to 300x300 pixels
    batch_size=16,  # Number of images per batch
    class_mode='categorical',  # Class mode for categorical labels
    subset='training'  # Subset of data for training
)

validation_generator = train_datagen.flow_from_directory(
    dataset_path,
    target_size=(300, 300),  # Resizes images to 300x300 pixels
    batch_size=16,  # Number of images per batch
    class_mode='categorical',  # Class mode for categorical labels
    subset='validation'  # Subset of data for validation
)
```

**Explanation:**
- **ImageDataGenerator**: Configures data augmentation and normalization for training (`train_datagen`) and validation datasets.
- **Flow from Directory**: Loads images from the specified `dataset_path`, resizes them to 300x300 pixels, and prepares batches of images and labels (`train_generator` and `validation_generator`) for training and validation.

#### Building the Model Architecture:

```python
# Build Model Architecture
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(300, 300, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(512, activation='relu'),
    Dense(num_classes, activation='softmax')
])
```

**Explanation:**
- **Sequential Model**: Defines a sequential stack of layers for the neural network model.
- **Convolutional Layers**: Two sets of convolutional (`Conv2D`) and pooling (`MaxPooling2D`) layers to extract features and reduce dimensionality.
- **Flatten and Dense Layers**: Flattens the input and adds dense layers (`Dense`) for classification, with the final layer using softmax activation for multi-class classification.

#### Compiling and Training the Model:

```python
# Compile Model
model.compile(optimizer='nadam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train Model with TensorBoard callback
history = model.fit(
    train_generator,
    epochs=50,  # Number of training epochs
    validation_data=validation_generator,
    callbacks=[tensorboard_callback]  # TensorBoard callback for logging
)
```

**Explanation:**
- **Compilation**: Configures the model for training with optimizer (`nadam`), loss function (`categorical_crossentropy` for multi-class classification), and metrics (`accuracy` for evaluation).
- **Training**: Fits the model to the training data (`train_generator`) for 50 epochs, validating against the validation data (`validation_generator`). The `TensorBoard` callback logs metrics for visualization.

#### Saving the Trained Model and Visualizing Performance:

```python
# Save Model
model.save('fursonaclassifiyer.keras')

# Plot training & validation accuracy values
import matplotlib.pyplot as plt

plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend(loc='lower right')

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend(loc='upper right')

plt.tight_layout()
plt.show()
```

**Explanation:**
- **Model Saving**: Saves the trained model to a file (`fursonaclassifiyer.keras`) for future use or deployment.
- **Performance Visualization**: Plots the training and validation accuracy (`accuracy`) and loss (`loss`) over epochs using `matplotlib`, providing insights into model performance and potential overfitting.

Certainly! Here's how you can describe the model's recognition and accuracy analysis without specific accuracy numbers, focusing on the ongoing nature of the project:

### Model Recognition and Accuracy Analysis

After training your classification model using a dataset collected from Furtrack, it's essential to evaluate its performance in recognizing various species within the furry community.

#### Model Performance Evaluation

The model's performance is currently being evaluated using standard metrics such as accuracy and loss on a validation dataset. This evaluation process helps assess how well the model has learned to classify different fursonas based on their visual characteristics. During the evaluation phase, it has become apparent that the model's performance on both the training and validation datasets is not yet optimal. This indicates that there are challenges in effectively distinguishing between different species of fursonas.

#### Work in Progress

While the initial results may show suboptimal performance, it's important to note that this project is still a work in progress. Machine learning projects often involve iterative improvements and adjustments to enhance model accuracy and reliability. Moving forward, efforts will focus on refining the model training process, potentially augmenting the dataset with more diverse and representative images of various fursonas. These steps aim to improve the model's ability to generalize and accurately classify unseen fursonas in real-world scenarios.




## Conclusion

In conclusion, while our current training and validation results show there's room for improvement, this project is an ongoing quest to build a strong classification model for recognizing fursonas. By tackling challenges and refining our model step by step, our aim is to achieve better accuracy and reliability in identifying different species within our furry community.

By putting it this way, we're acknowledging where we're at right now while showing our dedication to making continuous strides in machine learning techniques for furry-related applications. Together, let's push the boundaries and make our furry world even more amazing with the magic of AI! 🦊🌟