import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    {
      files: ["./src/**/*.{ts,tsx,js,jsx}"],
      extract: {
        // Safelist dynamic classes like your priority badges
        safelist: [
          'bg-green-200', 'text-green-900', 'dark:bg-green-800', 'dark:text-green-100',
          'bg-yellow-200', 'text-yellow-900', 'dark:bg-yellow-800', 'dark:text-yellow-100',
          'bg-orange-200', 'text-orange-900', 'dark:bg-orange-800', 'dark:text-orange-100',
          'bg-red-200', 'text-red-900', 'dark:bg-red-800', 'dark:text-red-100',
        ],
      },
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          700: '#3f3f46',
          900: '#18181b',
        },
      },
    },
  },
  darkMode: "class",
};

export default config;
