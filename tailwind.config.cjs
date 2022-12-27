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
      backgroundImage: {
        'cardback-md': `url('src/assets/cardback-md.svg')`,
        'cardback-sm': `url('src/assets/cardback-sm.svg')`
      },
      animation: {
        'modal-slide-in': '0.8s ease-in-out slide-in forwards',
        'modal-slide-out': '0.8s ease-in-out slide-in reverse both',
        radiate: '0.8s radiate infinite',
        grow: '0.6s ease-in grow',
        'text-grow': '0.6s ease-out text-grow'
      },
      keyframes: {
        'slide-in': {
          '0%': { top: '140%' },
          '75%': { top: '46%' },
          '90%': { top: '52%' },
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
        }
      }
    }
  },
  plugins: []
};
