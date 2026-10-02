/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#D4AF37',
          dark: '#997A15',
          metallic: '#DFB76C',
        },
        emerald: {
          accent: '#2B6B67',
          dark: '#143533',
        },
        dark: {
          bg: '#0B0F15',
          card: '#121822',
          cardHover: '#192130',
          elevated: '#161E2B',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'emerald-glow': '0 0 25px rgba(43, 107, 103, 0.35)',
      }
    },
  },
  plugins: [],
}
