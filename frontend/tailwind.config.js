const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    colors: {
      transparent: "transparent",

      // Home Page
      "home-background": {
        light: "#F5F5F5",
        dark: "#121212"
      },

      "home-text": {
        light: "#333333",
        dark: "#E0E0E0"
      },

      "home-button-background": {
        light: "#3498db",
        dark: "#4a90e2"
      },

      "home-button-hover": {
        light: "#2980b9",
        dark: "#3e6f9e"
      },

      "home-button-text": {
        light: "#ffffff",
        dark: "#f8f9fa"
      },

      "footer-hover": {
        light: "#495057",
        dark: "#f8f9fa"
      },

      // Signup, signin, forgot-password page
      "Signup-background": {
        light: "#FFFFFF",
        dark: "#1F1F1F"
      },

      "Signup-button-background": "#2196F3",

      // Dashboard, board page
      "navbar-background": {
        light: "#f8f9fa",
        dark: "#1F1F1F",
      },

      "list-background": {
        light: "#E0E0E0",
        dark: "#424242",
      },

      "list-text-color": {
        light: "#333333",
        dark: "#E0E0E0",
      },

      "card-backgroung": {
        light: "#FFFFFF",
        dark: "#1F1F1F",
      },

      border: {
        light: "#e1e1e1",
        dark: "#595959"
      },

      error: "#F44336",

      link: "#2196F3",

      "link-hover": "#1976D2",

      "other-button": {
        light: "#78909C",
        dark: "#B0BEC5"
      }
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

