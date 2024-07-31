import type { Config } from "tailwindcss";

// const customVariants = ({ addVariant, matchVariant }: any) => {
//   // Strict version of `.group` to help with nesting.
//   matchVariant("parent-data", (value: string) => `.parent[data-${value}] > &`);

//   addVariant("hocus", ["&:hover", "&:focus-visible"]);
//   addVariant("group-hocus", [".group:hover &", ".group:focus-visible &"]);
// };

/** @type {Config} */
const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dmpBrand: {
          
        }
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@vidstack/react/tailwind.cjs")({
      prefix: "vds-media",
      selector: ".vds-media-player",
    }),
  ],
};

export default config;
