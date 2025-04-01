/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'disco': {
          'neon': {
            'pink': '#FF2A6D',
            'blue': '#05D9E8',
            'purple': '#B026FF',
            'yellow': '#FFD700',
            'green': '#00FF9F',
            'orange': '#FF6B00',
          },
          'dark': {
            'base': '#0A0A0F',
            'card': '#1A1A2E',
            'accent': '#2A2A4A',
          },
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'display': ['Orbitron', 'sans-serif'],
      },
      fontWeight: {
        'normal': 400,
        'bold': 900,
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 42, 109, 0.5)',
        'neon-blue': '0 0 20px rgba(5, 217, 232, 0.5)',
        'neon-purple': '0 0 20px rgba(176, 38, 255, 0.5)',
        'neon-orange': '0 0 20px rgba(255, 107, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'slide-out': 'slideOut 0.3s ease-in-out',
        'thought-appear': 'thoughtAppear 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        thoughtAppear: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 