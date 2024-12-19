/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Our gradient colors
        cv: {
          indigo: "#6366f1",
          purple: "#a855f7",
          pink: "#ec4899",
        },
        // Success/failure gradients
        "cv-success": {
          from: "#0ea5e9",
          to: "#2dd4bf",
        },
        "cv-error": {
          from: "#f43f5e",
          to: "#fb7185",
        },
        // Glass effects
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          lighter: "rgba(255, 255, 255, 0.2)",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
      },
      backgroundImage: {
        "gradient-cv": "linear-gradient(to right, var(--cv-gradient))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
