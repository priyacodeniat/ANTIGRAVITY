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
          50: '#f2f9f4',
          100: '#e1f2e5',
          200: '#c4e5ce',
          300: '#97d1a9',
          400: '#64b67f',
          500: '#3f9a5d',
          600: '#2f7c48',
          700: '#27623b',
          800: '#224e31',
          900: '#1d412b',
          950: '#0c2316',
        },
        amberGold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        earth: {
          50: '#fbf7f4',
          100: '#f5ebe2',
          200: '#ecd5c3',
          300: '#dfb79e',
          400: '#cf9477',
          500: '#c27958',
          600: '#b46346',
          700: '#964f3a',
          800: '#7a4233',
          900: '#63372c',
        }
      },
    },
  },
  plugins: [],
}

