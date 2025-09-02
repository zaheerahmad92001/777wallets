// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       width: {
      "90p": "90%",
      "50p": "50%",
    },
     colors: {
        bg: "rgb(48,50,57)",
        red: "red",
        headerColor: "rgb(30,34,38)",
        grayWhite: "rgb(164,168,173)",
        lightBlack: "rgb(61,68,74)",
        white: "#FFFFFF",
        green: "rgb(80,176,131)",
        textGreen: "rgb(80,176,131)",
        lightWhite: "#CCCCCC",
      },
    },
  },
  plugins: [],
};
