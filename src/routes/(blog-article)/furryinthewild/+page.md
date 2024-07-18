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
- **Optimize Performance**: Train, learn, and improve the model's accuracy and speed to match the performance of advanced models like YOLO V4, but tailored specifically for furries.

## Training the Model

All the data used for training this model comes from <a href="http://furtrack.com">`Furtrack`</a>, a comprehensive furry fursona database. I used a custom web scraper to gather single furry shots from the site, ensuring a diverse and rich dataset for training.

## Data Structure

The dataset is meticulously organized into folders based on species, with each folder `containing around 300 images`. This organization helps in creating precise classifications for each different species of furries.


## Managing blog posts

I highly recommend the [Front Matter VS Code extension](https://frontmatter.codes/) to manage blog posts. It gives you a nice CMS-like UI to manage the front matter of all blog posts, as well as a preview of their content. It is, of course, optional, and you can manage everything directly in the Markdown files if you prefer.

<Image fullBleed src="/images/posts/frontmatter-preview-dashboard.png" alt="Screenshot of the Front Matter VS Code extension, showing the dashboard with all posts" />

<Image fullBleed src="/images/posts/frontmatter-preview-edit.png" alt="Screenshot of the Front Matter VS Code extension, showing the post editing UI" />

## RSS

This template automatically generates a RSS feed of your blog posts. It is generated in the `src/routes/rss.xml/+server.ts` file, and it is available at the `/rss.xml` URL.
