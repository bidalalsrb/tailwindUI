import {
  ForwardedRef,
  TextareaHTMLAttributes,
  forwardRef,
  useId,
} from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';
import { toneFocusRing } from '@/theme/toneStyles';

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  optional?: boolean;
  containerClassName?: string;
  tone?: ToneKey;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      description,
      errorMessage,
      optional,
      className,
      containerClassName,
      id,
      rows = 4,
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
        <textarea
          ref={ref as ForwardedRef<HTMLTextAreaElement>}
          id={fieldId}
          rows={rows}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={hintId}
          className={cn(
            'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none',
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

TextArea.displayName = 'TextArea';
