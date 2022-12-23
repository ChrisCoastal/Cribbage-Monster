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
        'modal-slide': '0.8s ease-in-out slide-in both',
        radiate: '0.8s ease-in-out radiate infinite'
      },
      keyframes: {
        'slide-in': {
          '0%': { bottom: '-100%' },
          '75%': { bottom: '54%' },
          '90%': { bottom: '46%' },
          '100%': { bottom: '50%' }
        },
        radiate: {
          '0%': { border: 'none' },
          '80%': { border: 'solid 0.8rem border-red-300', opacity: '0.9' },
          '100%': { border: 'solid 1rem border-red-300', opacity: '0' }
        }
      }
    }
  },
  plugins: []
};
