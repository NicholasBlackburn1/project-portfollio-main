import type { Feature } from "$lib/utils/types";

export default [ 
  {
    name: 'Open Paws & Purrs-onal Privacy',
    description:
      'I wholeheartedly support open-source projects, believing in the power of collaboration and transparency. By contributing to and promoting open-source initiatives, I aim to foster innovation and community-driven development. Join me in advocating for a tech ecosystem that values openness and integrity!',
    image: 'images/features/open-source.jpg',
    tags: [{ label: 'Open Source' }]
  },

  
  {
    name: 'Themeable',
    description:
      'You can easily theme the entire website by changing just a few colors in the _themes.scss file.',
    image: 'images/features/themeable.jpg',
    tags: [{ label: 'Primary Color' }, { label: 'Secondary Color', color: 'secondary' }]
  }, 
  {
    name: 'Modular Development',
    description:
      'I embrace a modular development approach across all my projects, enabling easy integration of new features and functionalities. Whether in web design, software development, or AI projects, modularity ensures flexibility and scalability.',
    image: 'images/features/extensible.jpg',
},

  {
    name: 'Well Optimized',
    description:
      'Images are automatically optimized and lazy loaded, to ensure the website loads as fast as possible regardless of connection speed.',
    image: 'images/features/optimized.jpg',
    tags: [{ label: 'Powered by Image Transmutation' }]
  }, 

  
] as Feature[];