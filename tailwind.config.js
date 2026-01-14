/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New color palette
        'deep-blue': '#1F3A5F',
        'coral': '#FF6B6B',
        'soft-yellow': '#FFE08A',
        'text-main': '#333333',
        // Keep old colors for easy revert
        'cream': '#FDFBF7',
        'cream-light': '#FFF8E7',
        'sky-light': '#ECF9FF',
      },
    },
  },
  plugins: [],
}

