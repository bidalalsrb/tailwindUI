import { cn } from '@/utils/cn';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  tone?: 'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  tone = 'brand',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const toneClass: Record<NonNullable<ProgressBarProps['tone']>, string> = {
    brand: 'bg-brand-500',
    navy: 'bg-navy-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    brown: 'bg-brown-500',
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label ? <p className="text-sm font-medium text-slate-700">{label}</p> : null}
      <div className="h-3 w-full rounded-full bg-slate-100">
        <div
          className={cn('h-full rounded-full transition-all', toneClass[tone])}
          style={{ width: `${percentage}%` }}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          role="progressbar"
        />
      </div>
      <p className="text-xs font-medium text-slate-400">{Math.round(percentage)}%</p>
    </div>
  );
}
