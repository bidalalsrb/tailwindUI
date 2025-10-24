import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface CardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  accent?: boolean;
}

export function Card({
  title,
  description,
  children,
  className,
  footer,
  accent,
}: CardProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]',
        accent && 'border-brand-100',
        className,
      )}
    >
      {(title || description) && (
        <header className="mb-4 flex flex-col gap-1">
          {title ? (
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          ) : null}
          {description ? (
            <p className="text-sm text-slate-500">{description}</p>
          ) : null}
        </header>
      )}
      <div className="space-y-5 text-sm text-slate-600">{children}</div>
      {footer ? <footer className="mt-6">{footer}</footer> : null}
    </section>
  );
}

