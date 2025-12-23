import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1320px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card-hover))",
        },
        cinema: {
          purple: "hsl(var(--cinema-purple))",
          teal: "hsl(var(--cinema-teal))",
          coral: "hsl(var(--cinema-coral))",
          success: "hsl(var(--cinema-success))",
          warning: "hsl(var(--cinema-warning))",
          gold: "hsl(var(--cinema-gold))",
          surface: "hsl(var(--cinema-surface))",
        },
        seat: {
          available: "hsl(var(--seat-available))",
          selected: "hsl(var(--seat-selected))",
          sold: "hsl(var(--seat-sold))",
          vip: "hsl(var(--seat-vip))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Light theme specific colors
        charcoal: "#1F2937",
        slate: {
          light: "#64748B",
          DEFAULT: "#334155",
          muted: "#94A3B8",
        },
        lavender: "#E9D5FF",
        "pale-blue": "#DBEAFE",
        "light-peach": "#FED7AA",
        pearl: "#F8FAFC",
        champagne: "#FEF3C7",
        blush: "#FECDD3",
        "soft-cyan": "#A5F3FC",
        "soft-violet": "#DDD6FE",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      transitionDuration: {
        "250": "250ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "slide-down": "slide-down 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient-light": "linear-gradient(to right, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.7) 70%, transparent)",
        "gradient-hero": "linear-gradient(135deg, rgba(233,213,255,0.3), rgba(219,234,254,0.3), rgba(254,215,170,0.2))",
        "gradient-card": "linear-gradient(160deg, #FFFFFF, #FAF5FF)",
        "gradient-accent": "linear-gradient(90deg, #A5F3FC, #DDD6FE)",
        "gradient-premium": "linear-gradient(120deg, #F8FAFC, #FEF3C7, #FECDD3)",
        "gradient-border": "linear-gradient(90deg, #C4B5FD, #A5F3FC)",
      },
      boxShadow: {
        "subtle": "0 1px 3px rgba(0,0,0,0.08)",
        "medium": "0 4px 16px rgba(0,0,0,0.06)",
        "elevated": "0 8px 32px rgba(0,0,0,0.08)",
        "hover": "0 20px 40px rgba(139,92,246,0.12)",
        "card": "0 2px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 12px 32px rgba(139,92,246,0.15)",
        "button": "0 4px 12px rgba(139,92,246,0.25)",
        "button-hover": "0 6px 20px rgba(139,92,246,0.35)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
