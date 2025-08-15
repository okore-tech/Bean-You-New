// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bean: {
          brown: "#BD570F",
          clay: "#C25500",
          dusk: "#7C3200",
        },
        coffee: {
          yellow: "#F3B019",
          red: "#C51111",
        },
      },
      clipPath: {
        triangle: "polygon(0 0, 100% 5%, 100% 95%, 0 100%)",
        ellipse: "ellipse(120% 100% at 50% 0%)",
      },
      animation: {
        fadeInUp: "fadeInUp 0.4s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".clip-path-triangle": {
          "clip-path": "polygon(0 0, 100% 5%, 100% 95%, 0 100%)",
        },
        ".clip-path-ellipse": {
          "clip-path": "ellipse(120% 100% at 50% 0%)",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};

export default config;
