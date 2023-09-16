/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/**/*.sass", "./assets/**/*.scss", "./app/**/*.js"],
  theme: {
    fontFamily: {
      sans: ["sans-serif"]
    },
    extend: {
      colors: {
        primary: "#E63132",
        secondary: "#5167AE",
        accent: "#FFCD29",

        white: '#F9F9F9',
        light_gray: '#E0E0E0',
        mid_gray: '#A8A8A7', 
        dark_gray: '#5B5C5F',
        black: '#090A0A',

        bug: '#92BC2C',
        dark: '#595761',
        dragon: '#0C69C8',
        electric: '#F2D94E',
        fire: '#FBA54C',
        fairy: '#EE90E6',
        fighting: '#D3425F',
        flying: '#A1BBEC',
        ghost: '#5F6DBC',
        grass: '#5FBD58',
        ground: '#DA7C4D',
        ice: '#75D0C1',
        normal: '#A0A29F',
        poison: '#B763CF',
        psychic: '#FA8581',
        rock: '#C9BB8A',
        steel: '#5695A3',
        water: '#539DDF',


        neutral: "#191D24",
        base100: "#E0E0E0",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
        alert: "#F87272",
      },
      fontSize: {
        base: ".95rem"
      },
      fontFamily: {
        source_sans: "'Source Sans Pro'",
      },
    },
  },
  // variants: {
  //   extend: {
  //     scrollbar: 'dark',
  //   }
  // },
  daisyui: {
    themes: [
      {
        pokedextheme: {
          "primary": "#E63132",
          "secondary": "#5167AE",
          "accent": "#FFCD29",

          "neutral": "#191D24",
          "base-100": "#E0E0E0",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",

          "--rounded-btn": "9999999999px",
        },
        
      },
    ],
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
