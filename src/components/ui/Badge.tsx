import { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';

type BadgeTone = ToneKey | 'neutral' | 'success' | 'warning' | 'danger';

const toneStyles: Record<BadgeTone, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-200/70',
  navy: 'bg-navy-50 text-navy-700 ring-navy-200/70',
  blue: 'bg-blue-50 text-blue-700 ring-blue-200/70',
  green: 'bg-green-50 text-green-700 ring-green-200/70',
  red: 'bg-red-50 text-red-700 ring-red-200/70',
  brown: 'bg-brown-50 text-brown-700 ring-brown-200/70',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-200/70',
  success: 'bg-emerald-100 text-emerald-700 ring-emerald-200/70',
  warning: 'bg-amber-100 text-amber-700 ring-amber-200/70',
  danger: 'bg-rose-100 text-rose-700 ring-rose-200/70',
};

export interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = 'brand', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition-colors',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

