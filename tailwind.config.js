/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xsm: '412px',
        sm: '468px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
    },
    extend: {
      colors: {
        primaryColor: "hsl(150, 60%, 30%)", // A nice medium green
        secondaryColor: 'hsl(210, 9%, 45%)', //6C757D
        hoverColor: "hsl(150, 60%, 50%)", // Lightened green for hover
        bgColor: "hsl(0, 0%, 100%)", //FFFFFF
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '35ch' },
        },
        caret: {
          '50%': { borderColor: 'transparent' },
          '100%': { borderColor: 'currentColor' },
        },
      },
      animation: {
        caret: "caret 0.7s steps(1) infinite", // Blinking caret animation
      },
    },
  },
  plugins: [],
};
