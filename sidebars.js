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
      items: ['projects/index'],
    },

    {
      type: 'category',
      label: 'Writeups',
      items: ['writeups/index'],
    },

    {
      type: 'category',
      label: 'Notes',
      items: ['notes/index'],
    },

    {
      type: 'category',
      label: 'Tools',
      items: [
        {
          type: 'link',
          label: 'Tools Overview',
          href: '/tools',
        },
        {
          type: 'link',
          label: 'Hashing & Encoding Playground',
          href: '/tools/hashing',
        },
        {
          type: 'link',
          label: 'Log Analyzer',
          href: '/tools/log-analyzer',
        },
        {
          type: 'link',
          label: 'Packet Parser',
          href: '/tools/packet-parser',
        },
      ],
    },

    {
      type: 'category',
      label: 'Labs',
      items: [
        {
          type: 'link',
          label: 'Mock Brute-Force Simulation',
          href: '/labs/mock-bruteforce',
        },
      ],
    },
  ],
};

export default sidebars;