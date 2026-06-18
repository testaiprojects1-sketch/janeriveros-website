import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

// Minimal config — the site is a single self-contained HTML file
// served by Astro's static output. No React, Tailwind, or other
// integrations needed.
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});
