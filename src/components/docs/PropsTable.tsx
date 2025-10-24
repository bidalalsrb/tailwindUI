import { cn } from '@/utils/cn';

export interface PropDefinition {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description?: string;
}

interface PropsTableProps {
  title?: string;
  props: PropDefinition[];
  className?: string;
}

export function PropsTable({ title, props, className }: PropsTableProps) {
  if (props.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-3 rounded-2xl border border-slate-200 bg-white p-5', className)}>
      <div>
        <p className="text-sm font-semibold text-slate-800">
          {title ?? 'Props'}
        </p>
        <p className="text-xs text-slate-400">
          필수 항목은 강조 표시되어 있습니다.
        </p>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">이름</th>
              <th className="px-3 py-2 font-medium">타입</th>
              <th className="px-3 py-2 font-medium">기본값</th>
              <th className="px-3 py-2 font-medium">설명</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {props.map((prop) => (
              <tr key={prop.name} className="align-top">
                <td className="px-3 py-3 font-medium text-slate-800">
                  {prop.name}
                  {prop.required ? (
                    <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-600">
                      필수
                    </span>
                  ) : null}
                </td>
                <td className="px-3 py-3 font-mono text-[11px] text-slate-500">
                  {prop.type}
                </td>
                <td className="px-3 py-3 text-slate-500">
                  {prop.defaultValue ?? '-'}
                </td>
                <td className="px-3 py-3 text-slate-500">
                  {prop.description ?? '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

