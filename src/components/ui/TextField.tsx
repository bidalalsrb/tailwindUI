import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useId,
} from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';
import { toneFocusRing } from '@/theme/toneStyles';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  optional?: boolean;
  containerClassName?: string;
  tone?: ToneKey;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      description,
      errorMessage,
      optional,
      className,
      containerClassName,
      id,
      type = 'text',
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
        <input
          ref={ref as ForwardedRef<HTMLInputElement>}
          id={fieldId}
          type={type}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={hintId}
          className={cn(
            'h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none',
            toneFocusRing[tone],
            errorMessage &&
              'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-200',
            className,
          )}
          {...props}
        />
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

TextField.displayName = 'TextField';
