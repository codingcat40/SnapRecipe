/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        cream: '#F7F3EC',
        ink: {
          DEFAULT: '#1C1A17',
          soft: '#4A4640',
          muted: '#9A9590',
        },
        forest: {
          DEFAULT: '#2D5A3D',
          mid: '#5A9B6E',
          light: '#EAF2EC',
        },
        amber: {
          recipe: '#C8762A',
          light: '#FBF0E4',
        },
      },
    },
  },
  plugins: [],
}
