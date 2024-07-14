module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#1e1b4b',
        'light-purple': '#7c3aed',
      },
      backgroundColor: {
        'transparent-dark': 'rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}