/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#040b08',
          900: '#07150f',
          850: '#0b1d16',
          800: '#10271e',
          750: '#153126',
          700: '#1c3e32',
          600: '#265444',
          500: '#346d59',
          400: '#4c8c74',
        },
        sand: {
          50: '#fdfcf9',
          100: '#f7f4ee',
          200: '#efe9dd',
          300: '#dfd5c3',
          400: '#c8bba6',
          500: '#ab9b82',
        },
        gold: {
          100: '#fbf4dc',
          200: '#f4e4b1',
          300: '#eacb7c',
          400: '#dfb752',
          500: '#c89d34',
          600: '#a87e22',
          700: '#845e17',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Didot', 'Georgia', 'serif'],
        sans: ['Inter', 'Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        'widest-plus': '0.3em',
        'super-wide': '0.4em',
        'ultra-wide': '0.55em',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-very-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.96)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FBF4DC 0%, #DFB752 50%, #A87E22 100%)',
        'gold-metallic': 'linear-gradient(90deg, #DFB752 0%, #FFF2C8 45%, #C89D34 70%, #DFB752 100%)',
        'radial-vignette': 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(4, 11, 8, 0.85) 85%, rgba(4, 11, 8, 0.98) 100%)',
      },
    },
  },
  plugins: [],
};

