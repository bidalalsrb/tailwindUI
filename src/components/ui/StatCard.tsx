import { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';

type StatTrend = 'up' | 'down' | 'flat';

const trendMap: Record<StatTrend, { label: string; className: string; arrow: string }> = {
  up: { label: '상승', className: 'text-green-600', arrow: '↑' },
  down: { label: '하락', className: 'text-red-600', arrow: '↓' },
  flat: { label: '변동 없음', className: 'text-slate-500', arrow: '→' },
};

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  trend?: StatTrend;
  caption?: string;
  icon?: ReactNode;
  tone?: ToneKey;
  className?: string;
}

const toneStyles: Record<ToneKey, { bg: string; icon: string }> = {
  brand: { bg: 'bg-brand-50 text-brand-600', icon: 'bg-brand-100 text-brand-500' },
  navy: { bg: 'bg-navy-50 text-navy-600', icon: 'bg-navy-100 text-navy-500' },
  blue: { bg: 'bg-blue-50 text-blue-600', icon: 'bg-blue-100 text-blue-500' },
  green: { bg: 'bg-green-50 text-green-600', icon: 'bg-green-100 text-green-500' },
  red: { bg: 'bg-red-50 text-red-600', icon: 'bg-red-100 text-red-500' },
  brown: { bg: 'bg-brown-50 text-brown-600', icon: 'bg-brown-100 text-brown-500' },
};

export function StatCard({
  label,
  value,
  delta,
  trend = 'flat',
  caption,
  icon,
  tone = 'brand',
  className,
}: StatCardProps) {
  const toneStyle = toneStyles[tone] ?? toneStyles.brand;
  const trendInfo = trendMap[trend];

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-card',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        {icon ? (
          <div className={cn('rounded-2xl p-3', toneStyle.icon)}>{icon}</div>
        ) : null}
      </div>
      {(delta || caption) && (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {delta ? (
            <span className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold', toneStyle.bg)}>
              <span>{trendInfo.arrow}</span>
              {delta}
            </span>
          ) : null}
          {caption ? <span className="text-slate-500">{caption}</span> : null}
        </div>
      )}
    </div>
  );
}
