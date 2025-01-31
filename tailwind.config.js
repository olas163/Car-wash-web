/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        linear: "linear",
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
        steps: "steps(3)",
        cubic: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        move: "move 4s linear infinite",
      },
    },
  },
  plugins: [],
};
