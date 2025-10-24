import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const toneStyles: Record<AlertTone, string> = {
  info: 'bg-blue-50 border-blue-200 text-blue-700',
  success: 'bg-green-50 border-green-200 text-green-700',
  warning: 'bg-brown-50 border-brown-200 text-brown-700',
  danger: 'bg-red-50 border-red-200 text-red-700',
  neutral: 'bg-slate-50 border-slate-200 text-slate-600',
};

const iconPaths: Record<AlertTone, ReactNode> = {
  info: (
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  ),
  success: (
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  ),
  warning: (
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M12 9v3m0 3h.01m-.01-12a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z"
    />
  ),
  danger: (
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M12 9v3m0 3h.01m4.735 4.113-4.255-7.369a1 1 0 0 0-1.732 0l-4.255 7.369A1 1 0 0 0 7.255 20h9.49a1 1 0 0 0 .99-1.887Z"
    />
  ),
  neutral: (
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M12 8v4m0 4h.01m9.24-2.76a9 9 0 1 1-7.48-7.48 9 9 0 0 1 7.48 7.48Z"
    />
  ),
};

export interface AlertProps {
  tone?: AlertTone;
  title?: string;
  description?: string;
  actions?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function Alert({
  tone = 'info',
  title,
  description,
  actions,
  icon,
  className,
}: AlertProps) {
  const iconNode = icon ?? (
    <svg
      aria-hidden="true"
      className="mt-0.5 size-5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
    >
      {iconPaths[tone]}
    </svg>
  );

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-2xl border px-4 py-3 text-sm shadow-sm',
        toneStyles[tone],
        className,
      )}
    >
      {iconNode}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        {description ? <p className="text-sm leading-relaxed text-inherit/90">{description}</p> : null}
        {actions ? <div className="mt-3 flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}

