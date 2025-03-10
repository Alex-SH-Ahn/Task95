/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    fontFamily: {
      'sans': ['DungGeunMo', 'sans-serif'],
      'serif': ['DungGeunMo', 'serif'],
      'mono': ['DungGeunMo', 'monospace'],
      'dunggeunmo': ['DungGeunMo', 'sans-serif']
    },
    extend: {
      colors: {
        navy: '#050081',
        background: {
          teal: '#038182',
          gray: '#BEBEBE',
          navy: '#050081',
          white: '#FFFFFF',
          darkGray: '#A1A1A1'
        },
        shadow: {
          dark: '#393939',
          medium: '#565656',
          light: '#E9ECEB'
        },
        text: {
          DEFAULT: '#2D2D2D',
          light: '#FFFFFF'
        }
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.5rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-gutter': {
          'scrollbar-gutter': 'stable',
        },
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '20px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#D9D9D9',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#BCBCBC',
            borderRight: '2px solid #393939',
            borderBottom: '2px solid #393939',
            borderLeft: '2px solid #E9ECEB',
            borderTop: '2px solid #E9ECEB',
            '&:hover': {
              background: '#A0A0A0',
            },
          },
          '&::-webkit-scrollbar-button': {
            display: 'block',
            background: '#D9D9D9',
            height: '20px',
            width: '20px',
            borderRight: '2px solid #393939',
            borderBottom: '2px solid #393939',
            borderLeft: '2px solid #E9ECEB',
            borderTop: '2px solid #E9ECEB',
            position: 'relative',
          },
          '&::-webkit-scrollbar-button:vertical:decrement': {
            height: '20px',
            width: '20px',
            backgroundPosition: 'center 5px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '10px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(96, 96, 96)'%3E%3Cpolygon points='50,0 0,50 100,50'/%3E%3C/svg%3E")`,
          },
          '&::-webkit-scrollbar-button:vertical:increment': {
            height: '20px',
            width: '20px',
            backgroundPosition: 'center 1px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '10px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(96, 96, 96)'%3E%3Cpolygon points='0,50 50,100 100,50'/%3E%3C/svg%3E")`,
          },
          '&::-webkit-scrollbar-button:start:increment': {
            display: 'none',
          },
          '&::-webkit-scrollbar-button:end:decrement': {
            display: 'none',
          },
        },
      });
    },
  ],
} 