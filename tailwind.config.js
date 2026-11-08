/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#C45C3D',
          hover: '#B04F32',
          light: '#F8ECE8',
        },
        sand: {
          DEFAULT: '#E6D5C3',
          light: '#F4ECE4',
        },
        olive: {
          DEFAULT: '#4F5D46',
          dark: '#3A4533',
        },
        ivory: '#F7F3ED',
        cream: {
          DEFAULT: '#FBF9F5',
          soft: '#F4EFEA',
        },
        night: {
          DEFAULT: '#151D2A',
          dark: '#0E131C',
          surface: '#1E2838',
        },
        roast: {
          DEFAULT: '#43281C',
          dark: '#2B1A12',
        },
        gold: {
          DEFAULT: '#C7A14A',
          soft: '#DFBA63',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 8px 30px -4px rgba(67, 40, 28, 0.06)',
        'elevated': '0 20px 40px -10px rgba(21, 29, 42, 0.12)',
      }
    },
  },
  plugins: [],
}
