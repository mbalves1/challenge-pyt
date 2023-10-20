/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: "#fff",
      orange: '#FF6905',
      grey:  '#f6f6f6',
      red: '#FF0000',
      secondary: '#CED4DA',
      lightOrange: '#FDF2E9'
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('@/assets/card.png')",
        'mastercard': "url('@/assets/mastercard.svg')",
        'visa': "url('@/assets/visa.svg')"
      }
    },
  },
  plugins: [],
}

