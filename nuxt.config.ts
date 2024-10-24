import { resolve } from 'path'

import { APP_TITLE } from './settings/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
const properties = [
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'pl_PL'
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website'
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: 'ROBOCOMP'
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content:
      'Festiwal robotyki ROBOCOMP to inicjatywa Koła Naukowego Integra. Główną atrakcją będą zawody robotów oraz pokazy firm związanych z robotyką, automatyką i elektroniką.'
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://robocomp.info'
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Festiwal Robotyki ROBOCOMP'
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: 'https://robocomp.info/icon.png'
  }
]

const twitterProperties = [
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'https://robocomp.info/icon.png'
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: 'Festiwal Robotyki ROBOCOMP'
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content:
      'Festiwal robotyki ROBOCOMP to inicjatywa Koła Naukowego Integra. Główną atrakcją będą zawody robotów oraz pokazy firm związanych z robotyką, automatyką i elektroniką.'
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: 'https://robocomp.info/icon.png'
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: 'https://robocomp.info'
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: '@integra_agh'
  }
]

const icons = [
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/favicon.ico'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/favicon-16x16.png',
    sizes: '16x16'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/favicon-32x32.png',
    sizes: '32x32'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/android-chrome-192x192.png',
    sizes: '192x192'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/android-chrome-384x384.png',
    sizes: '384x384'
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    href: '/icons/apple-touch-icon.png',
    sizes: '180x180'
  },
  {
    rel: 'mask-icon',
    href: '/icons/safari-pinned-tab.svg',
    color: '#5bbad5'
  }
]

const manifest = {
  name: 'Festiwal Robotyki ROBOCOMP',
  short_name: 'ROBOCOMP',
  theme_color: '#ffffff',
  icons: icons.map((icon) => ({
    ...icon,
    src: icon.href
  }))
}

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in'
    },
    head: {
      title: APP_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Festiwal robotyki ROBOCOMP to inicjatywa Koła Naukowego Integra. Główną atrakcją będą zawody robotów oraz pokazy firm związanych z robotyką, automatyką i elektroniką.'
        },
        {
          name: 'msapplication-TileImage',
          content: '/icons/mstile-150x150.png'
        },
        ...properties,
        ...twitterProperties
      ],
      link: [...icons],
      htmlAttrs: {
        lang: 'pl'
      }
    }
  },

  /* nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }, */

  css: [
    '@/assets/css/main.css',
    '@/assets/css/tailwind.css',
    '@/assets/css/flowbite.css',
    '@/assets/css/content.css',
    '@/assets/css/diana.css',
    'vue3-treeview/dist/style.css',
    '@/assets/css/treeview.css'
  ],

  components: true,

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  content: {
    documentDriven: true,
    ignores: ['README.md', 'LICENSE.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md'],
    sources: {
      content: {
        driver: 'fs',
        prefix: '',
        base: resolve(__dirname, 'content/content')
      }
    }
  },

  pwa: {
    devOptions: { enabled: true },
    registerType: 'autoUpdate',
    manifest
  },

  modules: [
    '@nuxtjs/robots',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    META_API_KEY: process.env.META_API_KEY,
    META_GRAPH_ENDPOINT: process.env.META_GRAPH_ENDPOINT,
    META_GRAPH_VERSION: process.env.META_GRAPH_VERSION,
    ROBOCOMP_PAGE_ID: process.env.ROBOCOMP_PAGE_ID
  },

  compatibilityDate: '2024-10-24'
})
