import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        'hk-blue': {
          200: '#2589FE',
          300: '#0070F3',
          600: '#232f3e',
        },
        "hkred" : "#ed1a2e",
        'hkcyan' : '#47b5e0',
        'hkivory' : '#d9e0d4',
        'hkdarkblue' : '#1d4681'
      },
      fontFamily:{
        dotum: ['var(--font-dotum)']
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('autoprefixer')],
};
export default config;
