import { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  tabs: Tab[];
  className?: string;
  tone?: ToneKey;
}

const tabTextTone: Record<ToneKey, string> = {
  brand: 'text-brand-600',
  navy: 'text-navy-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
  red: 'text-red-600',
  brown: 'text-brown-600',
};

export function Tabs({ activeTab, onTabChange, tabs, className, tone = 'brand' }: TabsProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex-1 rounded-lg px-3 py-2 text-sm font-medium transition',
                isActive
                  ? cn('bg-white shadow-sm', tabTextTone[tone])
                  : 'text-slate-500 hover:text-slate-700',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_16px_40px_-40px_rgba(15,23,42,0.3)]">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
