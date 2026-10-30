/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B1220",
        navy: "#14243A",
        cyan: {
          DEFAULT: "#16C4D9",
          400: "#16C4D9",
        },
        blue: {
          accent: "#397BFF",
        },
        text: "#E8EEF5",
        bone: "#EDEAE3",
        alert: "#FF5A36",
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', "Anton", "sans-serif"],
        accent: ['"Instrument Serif"', "serif"],
        body: ["Inter", '"Instrument Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        widest: "0.25em",
      },
      lineHeight: {
        display: "0.88",
        tight: "1.0",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
