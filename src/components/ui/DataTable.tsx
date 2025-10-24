import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface TableColumn<T extends Record<string, unknown>> {
  key: keyof T;
  header: string;
  align?: Align;
  render?: (row: T) => ReactNode;
}

type Align = 'left' | 'center' | 'right';

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  emptyState?: ReactNode;
  className?: string;
}

const alignClassMap: Record<Align, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyState = <p className="py-8 text-center text-sm text-slate-400">데이터가 없습니다.</p>,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-slate-200 bg-white', className)}>
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className={cn('px-5 py-4', column.align ? alignClassMap[column.align] : undefined)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td className="px-5" colSpan={columns.length}>
                {emptyState}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={cn(
                      'px-5 py-4',
                      column.align ? alignClassMap[column.align] : undefined,
                      'text-sm text-slate-600',
                    )}
                  >
                    {column.render ? column.render(row) : String(row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
