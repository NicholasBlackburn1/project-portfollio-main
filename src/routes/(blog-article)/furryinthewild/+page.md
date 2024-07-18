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




<Callout type="success">

</Callout>

## Project Goals

The primary goals of **Fursona of the Wild** are:

- **Create a DNN Model**: Develop a deep neural network model for OpenCV that can accurately recognize furries in various environments.

- **Learn and Improve**: Gain hands-on experience in creating both a detector model and a recognition model, enhancing my skills along the way.
- **Furry Community Contribution**: Provide the furry community with a customized recognition system based on fursuits, making it easier to identify and celebrate our unique characters.
- **Optimize Performance**: Train, learn, and improve the model's accuracy and speed to match the performance of advanced models like <a href="">`YOLO V4`</a>, but tailored specifically for furries.

## Training the Model

All the data used for training this model comes from <a href="http://furtrack.com">`Furtrack`</a>, a comprehensive furry fursona database. I used a custom web scraper to gather single furry shots from the site, ensuring a diverse and rich dataset for training.

## Data Structure

The dataset is meticulously organized into folders based on species, with each folder containing around 300 images. This organization helps in creating precise classifications for each different species of furries.

## Data Collection

For effective training, we need a vast collection of different fursonas tagged and sorted by species. Furtrack serves as the perfect database for this purpose, I created a webscraper.

Here's a snippet of the web scraper used to gather images from Furtrack:  



```python
# Function to download multiple images from a URL using Selenium
def download_multiple_images(driver, url, species):
    driver.get(url)
    scrolls_performed = 0

    while scrolls_performed < 100:  # Scroll down the page multiple times
        driver.execute_script(f"window.scrollBy(0, 400);")
        scrolls_performed += 1
        time.sleep(7)  # Allow time for the page to load

        # Find all image elements
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