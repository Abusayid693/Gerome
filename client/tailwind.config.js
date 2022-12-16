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
      }
    }
  },
  plugins: []
};
