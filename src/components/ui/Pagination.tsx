import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  tone?: ToneKey;
}

type PageItem = number | 'ellipsis';

function getPaginationItems(total: number, current: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) {
    items.push('ellipsis');
  }

  for (let page = left; page <= right; page += 1) {
    items.push(page);
  }

  if (right < total - 1) {
    items.push('ellipsis');
  }

  items.push(total);
  return items;
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  className,
  tone = 'brand',
}: PaginationProps) {
  const items = getPaginationItems(totalPages, currentPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  const toneAccent: Record<ToneKey, { button: string; hover: string }> = {
    brand: { button: 'bg-brand-600 text-white shadow-sm', hover: 'hover:border-brand-200 hover:text-brand-500' },
    navy: { button: 'bg-navy-600 text-white shadow-sm', hover: 'hover:border-navy-200 hover:text-navy-500' },
    blue: { button: 'bg-blue-600 text-white shadow-sm', hover: 'hover:border-blue-200 hover:text-blue-500' },
    green: { button: 'bg-green-600 text-white shadow-sm', hover: 'hover:border-green-200 hover:text-green-500' },
    red: { button: 'bg-red-600 text-white shadow-sm', hover: 'hover:border-red-200 hover:text-red-500' },
    brown: { button: 'bg-brown-500 text-white shadow-sm', hover: 'hover:border-brown-200 hover:text-brown-500' },
  };
  const toneHover = toneAccent[tone].hover;

  return (
    <nav className={cn('flex items-center justify-between gap-2', className)} aria-label="페이지 네비게이션">
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 transition disabled:pointer-events-none disabled:opacity-40',
          toneHover,
        )}
        disabled={currentPage === 1}
      >
        <span aria-hidden="true">←</span>
        이전
      </button>

      <ul className="flex items-center gap-1">
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} className="px-3 text-sm text-slate-400">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => goToPage(item)}
                className={cn(
                  'size-10 rounded-xl text-sm font-semibold transition',
                  item === currentPage
                    ? toneAccent[tone].button
                    : 'text-slate-500 hover:bg-slate-100',
                )}
                aria-current={item === currentPage ? 'page' : undefined}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 transition disabled:pointer-events-none disabled:opacity-40',
          toneHover,
        )}
        disabled={currentPage === totalPages}
      >
        다음
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}
