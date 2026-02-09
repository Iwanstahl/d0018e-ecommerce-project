/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This allows you to use className="font-brand"
        brand: ['Questrial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}