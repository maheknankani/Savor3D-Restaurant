/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        savor: {
          dark: '#0a0a0f',
          card: 'rgba(255, 255, 255, 0.03)',
          cardLight: 'rgba(255, 255, 255, 0.9)',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#FF6B00',
          accentHover: '#FF8800',
          gold: '#FFC72C',
          emerald: '#10B981',
          rose: '#F43F5E',
          glow: 'rgba(255, 107, 0, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
