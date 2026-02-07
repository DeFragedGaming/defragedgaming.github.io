/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
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
      ],
    },
    {
      type: 'category',
      label: 'Writeups',
      items: [
        'writeups/index',
      ],
    },
    {
      type: 'category',
      label: 'Notes',
      items: [
        'notes/index',
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      items: [
        'tools/index',
      ],
    },
  ],
};

export default sidebars;
