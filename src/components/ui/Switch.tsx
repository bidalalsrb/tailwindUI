import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  tone?: ToneKey;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { checked, onChange, label, description, className, disabled, tone = 'brand', ...props },
    ref,
  ) => {
    const barTone: Record<ToneKey, string> = {
      brand: 'bg-brand-500',
      navy: 'bg-navy-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      brown: 'bg-brown-500',
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'flex w-full items-center justify-between gap-4 rounded-xl border border-transparent px-3 py-2 text-left',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-slate-200',
          className,
        )}
        {...props}
      >
        <span className="flex flex-col">
          {label ? (
            <span className="text-sm font-medium text-slate-800">{label}</span>
          ) : null}
          {description ? (
            <span className="text-xs text-slate-500">{description}</span>
          ) : null}
        </span>
        <span
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 transition',
            checked && barTone[tone],
          )}
        >
          <span
            className={cn(
              'size-5 translate-x-1 rounded-full bg-white shadow transition',
              checked && 'translate-x-5',
            )}
          />
        </span>
      </button>
    );
  },
);

Switch.displayName = 'Switch';
