import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: colors.sky,
        neutral: colors.slate,
        navy: colors.indigo,
        red: colors.rose,
        blue: colors.blue,
        green: colors.emerald,
        brown: colors.orange,
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', ...defaultTheme.fontFamily.sans],
        display: ['"Pretendard Variable"', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [forms()],
};
