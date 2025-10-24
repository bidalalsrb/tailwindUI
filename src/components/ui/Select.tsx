import {
  ForwardedRef,
  SelectHTMLAttributes,
  forwardRef,
  useId,
} from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';
import { toneFocusRing } from '@/theme/toneStyles';

export interface OptionItem {
  label: string;
  value: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  optional?: boolean;
  containerClassName?: string;
  options: OptionItem[];
  tone?: ToneKey;
}

const arrowTone: Record<ToneKey, string> = {
  brand: 'text-brand-400',
  navy: 'text-navy-400',
  blue: 'text-blue-400',
  green: 'text-green-400',
  red: 'text-red-400',
  brown: 'text-brown-400',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      description,
      errorMessage,
      optional,
      className,
      containerClassName,
      id,
      options,
      tone = 'brand',
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const hintId =
      description || errorMessage ? `${fieldId}-description` : undefined;

    return (
      <div className={cn('grid gap-1.5', containerClassName)}>
        {label ? (
          <label
            htmlFor={fieldId}
            className="flex items-center justify-between text-sm font-medium text-slate-700"
          >
            <span>{label}</span>
            {optional ? (
              <span className="text-xs font-normal text-slate-400">선택</span>
            ) : null}
          </label>
        ) : null}
        <div className="relative">
          <select
            ref={ref as ForwardedRef<HTMLSelectElement>}
            id={fieldId}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={hintId}
            className={cn(
              'h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 transition focus:outline-none',
              toneFocusRing[tone],
              'hover:border-slate-300',
              errorMessage &&
                'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-200',
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={cn(
              'pointer-events-none absolute inset-y-0 right-3 my-auto h-4 w-4',
              arrowTone[tone],
            )}
          >
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {description && !errorMessage ? (
          <p id={hintId} className="text-xs text-slate-400">
            {description}
          </p>
        ) : null}
        {errorMessage ? (
          <p id={hintId} className="text-xs text-red-500">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = 'Select';
