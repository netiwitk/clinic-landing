import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://netiwitk.github.io',
  // GitHub Pages serves the repo under /<repo>/; CI passes it in, local builds stay at /.
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Anuphan',
      cssVariable: '--font-anuphan',
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['thai', 'latin'],
      fallbacks: ['sans-serif'],
    },
  ],
});
