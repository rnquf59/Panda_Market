import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Pretendard", "sans-serif"],
    },
    extend: {
      colors: {
        // Primary Colors
        primary: {
          100: "#3692FF",
          200: "#1967D6",
          300: "#1251AA",
        },
        // Error Color
        error: "#F74747",
        // Secondary Colors (Gray Scale)
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#687280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      fontSize: {
        "3xl": ["32px", { lineHeight: "42px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        xl: ["20px", { lineHeight: "32px" }],
        "2lg": ["18px", { lineHeight: "26px" }],
        lg: ["16px", { lineHeight: "26px" }],
        md: ["14px", { lineHeight: "24px" }],
        sm: ["13px", { lineHeight: "22px" }],
        xs: ["12px", { lineHeight: "20px" }],
      },
      fontWeight: {
        extrabold: "800",
        bold: "700",
        semibold: "600",
        medium: "500",
        regular: "400",
      },
    },
  },
  plugins: [],
};

export default config;
