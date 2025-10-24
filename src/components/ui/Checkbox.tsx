import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';
import { toneAccentClasses } from '@/theme/toneStyles';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  tone?: ToneKey;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, tone = 'brand', ...props }, ref) => {
    return (
      <label
        className={cn(
          'group flex w-full cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50',
          className,
        )}
      >
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            {...props}
            ref={ref as ForwardedRef<HTMLInputElement>}
            type="checkbox"
            className={cn(
              'peer h-5 w-5 appearance-none rounded-md border border-slate-300 bg-white transition duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0',
              toneAccentClasses[tone],
            )}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition duration-150 peer-checked:opacity-100"
          >
            <path
              d="M5 10.5l2.5 2.5L15 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-800 transition group-hover:text-slate-900">
            {label}
          </span>
          {description ? (
            <span className="text-xs text-slate-500">{description}</span>
          ) : null}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

