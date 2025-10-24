import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';
import { toneAccentClasses } from '@/theme/toneStyles';

export interface RadioOption {
  label: string;
  description?: string;
  value: string;
}

export interface RadioGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  direction?: 'horizontal' | 'vertical';
  tone?: ToneKey;
}

const radioActiveMap: Record<ToneKey, string> = {
  brand: 'border-brand-300 bg-brand-50',
  navy: 'border-navy-300 bg-navy-50',
  blue: 'border-blue-300 bg-blue-50',
  green: 'border-green-300 bg-green-50',
  red: 'border-red-300 bg-red-50',
  brown: 'border-brown-300 bg-brown-50',
};

const radioDotMap: Record<ToneKey, string> = {
  brand: 'bg-brand-500',
  navy: 'bg-navy-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  brown: 'bg-brown-500',
};

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      name,
      value,
      onChange,
      options,
      direction = 'vertical',
      className,
      tone = 'brand',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'grid gap-2',
          direction === 'horizontal' && 'grid-cols-1 sm:grid-cols-3',
        )}
      >
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50',
                checked && radioActiveMap[tone],
                className,
              )}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  {...props}
                  ref={ref as ForwardedRef<HTMLInputElement>}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={checked}
                  onChange={() => onChange(option.value)}
                  className={cn(
                    'peer h-5 w-5 appearance-none rounded-full border border-slate-300 bg-white transition duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0',
                    toneAccentClasses[tone],
                  )}
                />
                <span
                  className={cn(
                    'pointer-events-none absolute h-2.5 w-2.5 rounded-full opacity-0 transition peer-checked:opacity-100',
                    radioDotMap[tone],
                  )}
                />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-slate-800">
                  {option.label}
                </span>
                {option.description ? (
                  <span className="text-xs text-slate-500">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

