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
  type: 'link',
  label: 'Tools',
  href: '/tools',
}


  ],
};

export default sidebars;
