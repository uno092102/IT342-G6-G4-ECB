/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Scans all your source files for Tailwind classes
    ],
    theme: {
      extend: {
        // You can extend your theme here (colors, fonts, spacing, etc.)
        colors: {
          brand: {
            light: '#f87171',
            DEFAULT: '#ef4444',
            dark: '#b91c1c',
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  