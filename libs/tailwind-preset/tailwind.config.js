module.exports = {
  theme: {
    colors: {
      primary: {
        light: '#a2d9a0', // Light Green for Hover states, light backgrounds
        DEFAULT: '#4caf50', // Default Green (Primary) Primary buttons, brand accents
        dark: '#2e7d32', // Dark Green Active states, text accents
      },
      gray: {
        light: '#f5f5f5', // Light Gray (Background) Main background
        DEFAULT: '#e0e0e0', // Default Gray (Card backgrounds, borders) Sections, cards, borders
        dark: '#9e9e9e', // Dark Gray (Dividers, disabled states) Dividers, disabled states
      },
      white: {
        DEFAULT: '#ffffff', // Default White (Background) Main
      },
      black: {
        light: '#757575', // Light Black (Secondary Text)
        DEFAULT: '#212121', // Default Black (Primary Text)
        dark: '#000000', // Dark Black (Headers, Titles)
      },
      alert: {
        error: '#f44336', // Error Red
        warning: '#ff9800', // Warning Orange
        info: '#2196f3', // Info Blue
      },
    },
    spacing: {
      primary: {
        radius: '0.5rem',
      },
    },
  },
  plugins: [],
};
