/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#07192E',
        blue: {
          DEFAULT: '#1A8FD1',
          light: '#4DAFEE',
          glow: 'rgba(26, 143, 209, 0.18)',
        },
        gray: {
          50: '#F7F9FC',
          100: '#EEF2F7',
          300: '#C8D3E0',
          400: '#8FA3B8',
          500: '#5C7590',
          800: '#1A2B3C',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
