/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        'w-15': '3.75rem'
      },
      padding: {
        '4px': '4px',
        '6px': '6px'
      },
      fontFamily: {
        molle: ['Molle']
      },
      backgroundImage: {
        'cardback-md': `url('src/assets/cardback-md.svg')`,
        'cardback-sm': `url('src/assets/cardback-sm.svg')`
      },
      animation: {
        'fade-up-delay-sm': '1.2s ease-out 0.8s fade-up-in both',
        'fade-up-delay-md': '1.5s ease-out 1.6s fade-up-in both',
        'fade-up-delay-lg': '1.5s ease-out 2s fade-up-in both',
        'modal-bounce-in': '0.6s ease-in-out bounce-in forwards',
        radiate: '0.8s radiate infinite',
        grow: '0.6s ease-in grow',
        'text-grow': '0.6s ease-out text-grow',
        'fade-in': '0.3s ease-in-out fade-in forwards',
        'fade-out': '0.3s ease-in-out fade-out forwards',
        'tooltip-in-out': '4s ease-in-out 0.3s fade-in-out'
      },
      keyframes: {
        'fade-up-in': {
          '0%': { opacity: '0', transform: 'translateY(8rem)' },
          '100%': { opacity: '1', transform: 'translateY(0rem)' }
        },
        'bounce-in': {
          '0%': { top: '140%' },
          '56%': { top: '46%' },
          '88%': { top: '52%' },
          '100%': { top: '50%' }
        },
        radiate: {
          '0%': { outline: 'solid 0.2rem rgba(160,44,44,1)' },
          '100%': { outline: 'solid 0.8rem rgba(160,44,44,0)' }
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
        }
      }
    }
  },
  plugins: []
};
