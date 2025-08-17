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
        primary: '#1E40AF',
        secondary: '#F59E0B',
        accent: '#10B981',
        neutral: '#6B7280'
      },
      borderRadius: { card: '0.75rem' }
    }
  },
  plugins: []
}

