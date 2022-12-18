/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './containers/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': {transform: 'translateY(20%)'},
          '60%': {transform: 'translateY(-40%)'},
          '100%': {transform: 'translateY(-15%)'}
        }
      },
      animation: {
        wiggle: 'wiggle .3s ease-in forwards'
      },
      colors: {
        'grey-1': '#F3F6F9',
        'grey-2': '#C4CCD0',
        'grey-3': '#6C7577',
        'grey-4': '#5D66680',
        'grey-5': '#272929'
      }
    }
  },
  plugins: []
};
