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
        cream: {
          50: '#FCFBF9',
          100: '#FAF8F5',
          200: '#F3EFEA',
        },
        neo: {
          peach: '#FFC4B0',
          blue: '#BAE6FD',
          mint: '#BBF7D0',
          yellow: '#FDE68A',
          purple: '#DDD6FE',
          dark: '#141416',
          coral: '#E54830',
        }
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #000000',
        'brutal': '3px 3px 0px #000000',
        'brutal-lg': '4px 4px 0px #000000',
        'brutal-xl': '6px 6px 0px #000000',
      }
    },
  },
  plugins: [],
};
