/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5f9',
        accent: '#ffb703',
        accent2: '#8b5cf6',
        neon: '#06b6d4'
      }
    },
  },
  plugins: [],
}
