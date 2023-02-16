/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    letterSpacing: {
      normal: '0.2em',
      ...defaultTheme.letterSpacing
    },
    fontSize: {
      '2xs': ['0.6rem', { lineHeight: '0.75rem', letterSpacing: '0.08em' }],
      ...defaultTheme.fontSize
    },
    lineHeight: {
      below: '0.75',
      ...defaultTheme.lineHeight
    },
    extend: {
      screens: {
        xs: '380px'
      },
      width: {
        'w-15': '3.75rem'
      },
      padding: {
        '4px': '4px',
        '6px': '6px'
      },
      fontFamily: {
        sans: ['"Outfit"', ...defaultTheme.fontFamily.sans],
        molle: ['Molle'],
        annie: ['Annie Use Your Telescope'],
        outfit: ['Outfit']
      },
      backgroundImage: {
        'cardback-md': `url('src/assets/cardback-md.svg')`,
        'cardback-sm': `url('src/assets/cardback-sm.svg')`,
        hero: `url('src/assets/hero.jpg')`,
        'hero-2': `url('src/assets/hero-2.jpg')`,
        cardbacks: `url('src/assets/cardbacks.jpg')`,
        card: `url('src/assets/card.png')`
      },
      animation: {
        'fade-up-delay-xs': '0.3s ease-out 0.2s fade-up-in-xs both',
        'fade-up-delay-sm': '1.2s ease-out 0.8s fade-up-in both',
        'fade-up-delay-md': '1.5s ease-out 1.6s fade-up-in both',
        'fade-up-delay-lg': '1.5s ease-out 2s fade-up-in both',
        'slide-in-out': '6s ease-in-out slide-in-out forwards',
        'modal-bounce-in': '0.6s ease-in-out bounce-in forwards',
        radiate: '0.6s ease-in radiate infinite alternate',
        grow: '0.6s ease-in grow',
        'text-grow': '0.6s ease-out text-grow',
        'fade-in': '0.3s ease-in-out fade-in forwards',
        'fade-out': '0.3s ease-in-out fade-out forwards',
        'tooltip-in-out': '4s ease-in-out 0.3s fade-in-out',
        'move-peg': '0.3s ease-in-out move-peg forwards',
        tailpath: '3s ease-in-out tail-path infinte'
      },
      keyframes: {
        'fade-up-in': {
          '0%': { opacity: '0', transform: 'translateY(8rem)' },
          '100%': { opacity: '1', transform: 'translateY(0rem)' }
        },
        'fade-up-in-xs': {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0rem)' }
        },
        'bounce-in': {
          '0%': { top: '140%' },
          '56%': { top: '46%' },
          '88%': { top: '52%' },
          '100%': { top: '50%' }
        },
        'slide-in-out': {
          '0%': { transform: 'translateX(6rem)', opacity: '0' },
          '4%': { transform: 'translateX(0)', opacity: '1' },
          '98%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-6rem)', opacity: '0' }
        },
        radiate: {
          '0%': { boxShadow: '0 0 0 0.25rem rgba(52, 211, 153,0)' },
          '100%': { boxShadow: '0 0 0.3rem 0.3rem rgba(52, 211, 153,0.5)' }
        },
        grow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.6)' }
        },
        'text-grow': {
          '40%': { 'font-size': '200%' },
          '70%': { 'font-size': '80%' },
          '80%': { 'font-size': '120%' },
          '90%': { 'font-size': '90%' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'fade-in-out': {
          '0%': { opacity: '0' },
          '8%': { opacity: '1' },
          '92%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'move-peg': {
          '0%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' }
        },
        'tail-path': {
          from: { strokeDashoffset: '0' },
          to: { strokeDashoffset: '2000' }
        }
      }
    }
  },
  plugins: []
};
