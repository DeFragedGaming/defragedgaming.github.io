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
    {
      docs: {
        path: 'docs',
        routeBasePath: 'docs',
        sidebarPath: './sidebars.js',
        editUrl: 'https://github.com/defragedgaming/cybertrace.github.io/tree/main/',
      },

      blog: {
        routeBasePath: 'blog',
        blogListComponent: '@site/src/pages/blog/index.js',
        blogSidebarCount: 0,
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
    },
  ],
],


  themeConfig: {
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
    { to: '/docs', label: 'Docs', position: 'left' },
    { to: '/blog', label: 'Blog', position: 'left' },
    { to: '/tools', label: 'Tools', position: 'left' },
    { to: '/writeups', label: 'Writeups', position: 'left' },
    { to: '/projects', label: 'Projects', position: 'left' },
    { to: '/labs', label: 'Labs', position: 'left' },
    { to: '/notes', label: 'Notes', position: 'left' },
    {
      href: 'https://github.com/defragedgaming/cybertrace.github.io',
      label: 'GitHub',
      position: 'right',
    },
  ],
},



    footer: {},

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

// ⭐ THIS WAS MISSING
export default config;