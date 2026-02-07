/**
 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */

const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Projects',
      items: [
        'projects/index',
        'projects/example-project',
      ],
    },
    {
      type: 'category',
      label: 'Writeups',
      items: [
        'writeups/index',
        'writeups/example-writeup',
      ],
    },
    {
      type: 'category',
      label: 'Notes',
      items: [
        'notes/index',
        'notes/example-note',
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      items: [
        'tools/index',
        'tools/example-tool',
      ],
    },
  ],
};

export default sidebars;