import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx,json}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
          hover: "var(--color-primary-hover)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
          hover: "var(--color-accent-hover)",
          soft: "var(--color-accent-soft)",
        },
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        surface: "var(--color-surface)",

        /* 🎨 Paleta Oficial SOTAQUE */
        petroleo: {
          DEFAULT: "var(--sotaque-petroleo)",
          surface: "var(--sotaque-petroleo-surface)",
          card: "var(--sotaque-petroleo-card)",
        },
        areia: {
          DEFAULT: "var(--sotaque-areia)",
          soft: "var(--sotaque-areia-soft)",
          surface: "var(--sotaque-areia-surface)",
          card: "var(--sotaque-areia-card)",
        },
        goiaba: {
          DEFAULT: "var(--sotaque-goiaba)",
          hover: "var(--sotaque-goiaba-hover)",
        },
        solar: {
          DEFAULT: "var(--sotaque-solar)",
          hover: "var(--sotaque-solar-hover)",
        },
        folha: {
          DEFAULT: "var(--sotaque-folha)",
        },
        terracota: {
          DEFAULT: "var(--sotaque-terracota)",
        },

        /* Aliases de compatibilidade */
        cream: "var(--sotaque-areia)",
        "cream-soft": "var(--sotaque-areia-soft)",
        creme: "var(--sotaque-areia)",
        midnight: "var(--sotaque-petroleo)",
        obsidian: "var(--sotaque-petroleo)",
        "dark-surface": "var(--sotaque-petroleo-surface)",
        "dark-card": "var(--sotaque-petroleo-card)",
        mel: "var(--sotaque-solar)",
        mostarda: "var(--sotaque-solar)",
        amber: "var(--sotaque-solar)",
        vermelho: "var(--sotaque-goiaba)",
        vinho: "var(--sotaque-goiaba)",
        earth: "var(--sotaque-goiaba)",
        terracotta: "var(--sotaque-terracota)",
        clay: "var(--sotaque-terracota)",
        "verde-mata": "var(--sotaque-folha)",
        verde: "var(--sotaque-folha)",
        emerald: "var(--sotaque-folha)",
        ink: "var(--sotaque-petroleo)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        sans: ["var(--font-body)"],
        chroma: ["var(--font-chroma)", "'Chroma Venue'", "'Chroma Avenue'", "sans-serif"],
        Chroma_Venue: ["var(--font-chroma)", "'Chroma Venue'", "'Chroma_Venue'", "'Chroma Avenue'", "sans-serif"],
        "Chroma Venue": ["var(--font-chroma)", "'Chroma Venue'", "'Chroma Avenue'", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        accent: "var(--shadow-accent)",
        terracotta: "var(--shadow-terracotta)",
        emerald: "var(--shadow-emerald)",
        spotlight: "var(--shadow-spotlight)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;