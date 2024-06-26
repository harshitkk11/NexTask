/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    colors: {
      transparent: "transparent",

      "background": {
        light: "#ffffff",
        dark: "#121212",
      },

      "dashboard-bg": {
        light: "#f8f9fa",
        dark: "#2c2f33",
      },

      "text-color": {
        light: "#333333",
        dark: "#f5f5f5",
      },

      "navbar-background": {
        light: "#f8f9fa",
        dark: "#343a40",
      },

      "dashboard-navbar-bg": {
        light: "#ffffff",
        dark: "#1f1f1f",
      },

      "navbar-text": {
        light: "#495057",
        dark: "#f8f9fa",
      },

      "footer-background": {
        light: " #f8f9fa",
        dark: "#343a40",
      },

      "footer-text": {
        light: "#495057",
        dark: " #f8f9fa",
      },

      "border-color": {
        light: "#e1e1e1",
        dark: "#595959",
      },

      "button-background": {
        light: "#3498db",
        dark: "#4a90e2",
      },

      "button-hover": {
        light: "#2980b9",
        dark: "#3e6f9e",
      },

      "button-text": {
        light: "#ffffff",
        dark: "#f8f9fa",
      },

      "link-color": {
        light: "#007bff",
        dark: "#4ab3ff",
      },

      "link-hover": {
        light: "#0056b3",
        dark: "#6dc5ff",
      },

      "input-background": {
        light: "#ffffff",
        dark: "#343a40",
      },

      "input-text": {
        light: "#495057",
        dark: "#f8f9fa",
      },

      "disabled": {
        light: "#6c757d",
        dark: "#adb5bd",
      },

      "error": {
        light: "#dc3545",
        dark: "#ff5050",
      },

      "highlight": {
        light: "#ffcc00",
        dark: "#ffcc66",
      },

      "signup-screen": {
        light: "#dfcfb9",
        dark: "#ffcc66",
      },
    },
    fontFamily: {
      inter: ["Inter", 'sans-serif'],
      "nextask-regular": ["nextask-regular", 'sans-serif']
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

