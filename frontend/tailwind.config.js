/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "border-color": "#999999",
      // "nav-background": "#333333",
      "text-color": "#1a1a1a",
      // "background-color": "#ecf0f1",
      "button-bg": "#3F51B5",
      "button-hover": "#5566c3",
      "button-color": "#FFFFFF",
      "gray-40": "#666666",
    },
    fontFamily: {
      inter: ["Inter", 'sans-serif'],
      "nextask-regular": ["nextask-regular", 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

