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
      }
    }
  },
  plugins: []
};
