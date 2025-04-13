/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        color : {
            primary : '#10b547' ,
            secondery : '#33de6c'  
        },
        fontFamily: {
          sans: ['var(--font-montserrat)'],
        },
      },
    },
    plugins: [],
  };
  