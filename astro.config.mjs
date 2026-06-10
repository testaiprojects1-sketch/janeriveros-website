import { defineConfig } from 'astro/config';

// Minimal config — the site is a single self-contained HTML file
// served by Astro's static output. No React, Tailwind, or other
// integrations needed.
export default defineConfig({
  output: 'static',
});
