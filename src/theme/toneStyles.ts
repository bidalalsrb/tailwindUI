import { ToneKey } from './tones';

type ToneTokens = {
  solid: string;
  solidHover: string;
  solidRing: string;
  outline: string;
  outlineHover: string;
  text: string;
  softBg: string;
  softBorder: string;
  softText: string;
};

const createTone = (
  base: string,
  hover: string,
  ring: string,
  text: string,
  softBg: string,
  softText: string,
): ToneTokens => ({
  solid: `bg-${base}`,
  solidHover: `hover:bg-${hover}`,
  solidRing: `focus-visible:outline-${ring}`,
  outline: `border-${base} text-${text}`,
  outlineHover: `hover:border-${hover} hover:text-${hover}`,
  text: `text-${text}`,
  softBg: `bg-${softBg}`,
  softBorder: `border-${softBg}`,
  softText: `text-${softText}`,
});

export const toneStyles: Record<ToneKey, ToneTokens> = {
  brand: createTone('brand-600', 'brand-500', 'brand-400', 'brand-600', 'brand-50', 'brand-600'),
  navy: createTone('navy-600', 'navy-500', 'navy-400', 'navy-600', 'navy-50', 'navy-600'),
  blue: createTone('blue-600', 'blue-500', 'blue-400', 'blue-600', 'blue-50', 'blue-600'),
  green: createTone('green-600', 'green-500', 'green-400', 'green-600', 'green-50', 'green-600'),
  red: createTone('red-600', 'red-500', 'red-400', 'red-600', 'red-50', 'red-600'),
  brown: createTone('brown-500', 'brown-400', 'brown-400', 'brown-600', 'brown-50', 'brown-600'),
};

export const toneAccentClasses: Record<ToneKey, string> = {
  brand: 'peer-checked:bg-brand-500 peer-checked:border-brand-500 peer-focus-visible:ring-brand-200',
  navy: 'peer-checked:bg-navy-500 peer-checked:border-navy-500 peer-focus-visible:ring-navy-200',
  blue: 'peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-focus-visible:ring-blue-200',
  green: 'peer-checked:bg-green-500 peer-checked:border-green-500 peer-focus-visible:ring-green-200',
  red: 'peer-checked:bg-red-500 peer-checked:border-red-500 peer-focus-visible:ring-red-200',
  brown: 'peer-checked:bg-brown-500 peer-checked:border-brown-500 peer-focus-visible:ring-brown-200',
};

export const toneFocusRing: Record<ToneKey, string> = {
  brand: 'focus:border-brand-300 focus:ring-4 focus:ring-brand-100',
  navy: 'focus:border-navy-300 focus:ring-4 focus:ring-navy-100',
  blue: 'focus:border-blue-300 focus:ring-4 focus:ring-blue-100',
  green: 'focus:border-green-300 focus:ring-4 focus:ring-green-100',
  red: 'focus:border-red-300 focus:ring-4 focus:ring-red-100',
  brown: 'focus:border-brown-300 focus:ring-4 focus:ring-brown-100',
};
