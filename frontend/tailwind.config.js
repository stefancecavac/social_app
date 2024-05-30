/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#0866ff",
        "textColor": "#475569"
      }
    },
   
  },
  plugins: [],
}

