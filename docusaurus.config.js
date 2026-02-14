// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'CyberTrace',
  tagline: 'Security Engineering • Pentesting • All Things Cyber',
  favicon: 'img/logo48x48.png',

  future: {
    v4: true,
  },

  url: 'https://defragedgaming.github.io',
  baseUrl: '/',

  organizationName: 'defragedgaming', 
  projectName: 'defragedgaming.github.io',
  deploymentBranch: 'gh-pages',
  githubHost: 'github.com',
  

  
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/defragedgaming/cybertrace.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/defragedgaming/cybertrace.github.io/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),

        },
      }),
    ],
  ],

  themeConfig: ({
    image: 'img/logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'CyberTrace',
      logo: {
        alt: 'CyberTrace Logo',
        src: 'img/logo48x48.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/defragedgaming/cybertrace.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/defragedgaming/cybertrace.github.io',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CyberTrace.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  }),
};

export default config;