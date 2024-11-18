/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0A',
          100: '#121212',
          200: '#1A1A1A',
          300: '#242424',
          400: '#2D2D2D',
          500: '#363636',
        },
        gold: {
          DEFAULT: '#B8860B',
          light: '#FFD700',
          dark: '#8B6914',
        }
      },
      boxShadow: {
        'gold': '0 0 15px rgba(184, 134, 11, 0.3)',
        'gold-lg': '0 0 30px rgba(184, 134, 11, 0.4)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        },
      },
    },
  },
  plugins: [],
}