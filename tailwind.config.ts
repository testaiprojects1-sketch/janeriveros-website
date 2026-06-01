import type { Config } from 'tailwindcss';

// Ported 1:1 from the original Tailwind Play CDN config in Jane Riveros.html.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // near-black / charcoal base + layered surfaces
        ink:    { DEFAULT: '#08090B', 900: '#0A0C0F', 800: '#0E1115', 700: '#13171C', 600: '#191E24' },
        line:   'rgba(255,255,255,0.08)',
        // type
        fg:     { DEFAULT: '#EBEEF2', muted: '#9BA3AD', dim: '#5B6470', faint: '#3A4048' },
        // ONE signal accent — amber
        signal: { DEFAULT: '#FFC24A', deep: '#EBA52E', dim: '#7A5A1E' },
        // live / active states ONLY
        live:   { DEFAULT: '#FFC24A', deep: '#C9821C' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontWeight: { '400': '400', '500': '500', '600': '600', '700': '700' } as any,
      letterSpacing: { mono: '0.14em' },
      maxWidth: { shell: '1180px' },
    },
  },
  plugins: [],
} satisfies Config;
