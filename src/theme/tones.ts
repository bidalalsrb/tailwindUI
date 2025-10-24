export const tones = ['brand', 'navy', 'blue', 'green', 'red', 'brown'] as const;

export type ToneKey = (typeof tones)[number];

export const toneLabels: Record<ToneKey, string> = {
  brand: '브랜드',
  navy: '남색',
  blue: '파랑',
  green: '초록',
  red: '빨강',
  brown: '갈색',
};

