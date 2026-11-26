/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      colors: {
        canvas: '#FBF9F5',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#1C1917',
          muted: '#57534E',
          subtle: '#78716C',
        },
        accent: {
          coral: '#C84B31',
          coralHover: '#B03E26',
          amber: '#F6E2A5',
          sage: '#E4F1E7',
          sageInk: '#1E5631',
        },
        tint: {
          blush: '#F7ECE6',
          mistBlue: '#EDF3F7',
          mistSage: '#EDF4EF',
          mistAmber: '#F9F3DF',
          mistLavender: '#F1EEF7',
          warmSand: '#F5F2EB',
        },
      },
      boxShadow: {
        'card': '2px 2px 0px #1C1917',
        'card-hover': '3px 3px 0px #1C1917',
        'pill': '1px 1px 0px #1C1917',
      },
    },
  },
  plugins: [],
};
