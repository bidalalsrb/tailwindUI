import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 좌측 아이콘 영역 */
  leftIcon?: ReactNode;
  /** 버튼 우측 아이콘 영역 */
  rightIcon?: ReactNode;
  variant?: ButtonVariant;
  tone?: ToneKey;
  size?: ButtonSize;
  block?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

const primaryToneMap: Record<ToneKey, string> = {
  brand:
    'bg-brand-600 text-white shadow-sm shadow-brand-600/20 hover:bg-brand-500 focus-visible:outline-brand-400',
  navy:
    'bg-navy-600 text-white shadow-sm shadow-navy-600/20 hover:bg-navy-500 focus-visible:outline-navy-400',
  blue:
    'bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-500 focus-visible:outline-blue-400',
  green:
    'bg-green-600 text-white shadow-sm shadow-green-600/20 hover:bg-green-500 focus-visible:outline-green-400',
  red:
    'bg-red-600 text-white shadow-sm shadow-red-600/20 hover:bg-red-500 focus-visible:outline-red-400',
  brown:
    'bg-brown-500 text-white shadow-sm shadow-brown-500/20 hover:bg-brown-400 focus-visible:outline-brown-400',
};

const secondaryToneMap: Record<ToneKey, string> = {
  brand:
    'bg-white border border-brand-200 text-brand-600 hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-brand-300',
  navy:
    'bg-white border border-navy-200 text-navy-600 hover:border-navy-300 hover:bg-navy-50 focus-visible:outline-navy-300',
  blue:
    'bg-white border border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-blue-300',
  green:
    'bg-white border border-green-200 text-green-600 hover:border-green-300 hover:bg-green-50 focus-visible:outline-green-300',
  red:
    'bg-white border border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 focus-visible:outline-red-300',
  brown:
    'bg-white border border-brown-200 text-brown-600 hover:border-brown-300 hover:bg-brown-50 focus-visible:outline-brown-300',
};

const ghostToneMap: Record<ToneKey, string> = {
  brand: 'text-brand-600 hover:bg-brand-50 focus-visible:outline-brand-300',
  navy: 'text-navy-600 hover:bg-navy-50 focus-visible:outline-navy-300',
  blue: 'text-blue-600 hover:bg-blue-50 focus-visible:outline-blue-300',
  green: 'text-green-600 hover:bg-green-50 focus-visible:outline-green-300',
  red: 'text-red-600 hover:bg-red-50 focus-visible:outline-red-300',
  brown: 'text-brown-600 hover:bg-brown-50 focus-visible:outline-brown-300',
};

const dangerStyles =
  'bg-red-600 text-white shadow-sm shadow-red-600/20 hover:bg-red-500 focus-visible:outline-red-400';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      leftIcon,
      rightIcon,
      children,
      variant = 'primary',
      tone = 'brand',
      size = 'md',
      className,
      block = false,
      ...props
    },
    ref,
  ) => {
    const toneVariantClass =
      variant === 'primary'
        ? primaryToneMap[tone]
        : variant === 'secondary'
          ? secondaryToneMap[tone]
          : variant === 'ghost'
            ? ghostToneMap[tone]
            : dangerStyles;

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60',
          toneVariantClass,
          sizeStyles[size],
          block && 'w-full',
          className,
        )}
        {...props}
      >
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
