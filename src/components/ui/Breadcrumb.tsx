import { Fragment } from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  tone?: ToneKey;
}

export function Breadcrumb({
  items,
  className,
  tone = 'brand',
  separator = (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4 text-slate-300"
      fill="none"
    >
      <path
        d="M7 5.75 11.25 10 7 14.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}: BreadcrumbProps) {
  const hoverTone: Record<ToneKey, string> = {
    brand: 'hover:text-brand-600 hover:bg-brand-50',
    navy: 'hover:text-navy-600 hover:bg-navy-50',
    blue: 'hover:text-blue-600 hover:bg-blue-50',
    green: 'hover:text-green-600 hover:bg-green-50',
    red: 'hover:text-red-600 hover:bg-red-50',
    brown: 'hover:text-brown-600 hover:bg-brown-50',
  };

  const activeTone: Record<ToneKey, string> = {
    brand: 'bg-brand-50 text-brand-600',
    navy: 'bg-navy-50 text-navy-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    brown: 'bg-brown-50 text-brown-600',
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-slate-400 sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li className="flex items-center gap-1 text-slate-500">
                {item.icon ? <span className="text-slate-400">{item.icon}</span> : null}
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className={cn(
                      'rounded-lg px-2 py-1 text-slate-500 transition',
                      hoverTone[tone],
                    )}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className={cn('rounded-lg px-2 py-1', isLast && activeTone[tone])}>
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast ? separator : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
