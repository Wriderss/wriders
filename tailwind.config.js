/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["'Roboto', sans-serif"],
      mono: ["'Roboto', sans-serif"],
    },
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
      },
      backgroundImage: {
        "profile-background": "url('/background-profile.jpg')",
      },
    },
  },
  plugins: [],
};
