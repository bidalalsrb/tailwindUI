import { ReactNode, useEffect, useMemo, useState } from 'react';
import { cn } from '@/utils/cn';

export interface DocsNavItem {
  id: string;
  label: string;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavItem[];
}

interface DocsLayoutProps {
  title: string;
  description?: string;
  navSections: DocsNavSection[];
  headerSlot?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DocsLayout({
  title,
  description,
  navSections,
  headerSlot,
  children,
  className,
}: DocsLayoutProps) {
  const flatNavItems = useMemo(
    () => navSections.flatMap((section) => section.items),
    [navSections],
  );

  const [activeId, setActiveId] = useState<string>(() => {
    const fallback = flatNavItems[0]?.id ?? '';
    if (typeof window === 'undefined') {
      return fallback;
    }
    return window.location.hash.replace('#', '') || fallback;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveId(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveId(id);
    if (typeof document !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', `#${id}`);
        }
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className={cn('grid gap-8 lg:grid-cols-[280px_1fr]', className)}>
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] space-y-6 overflow-y-auto pr-1">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {section.title}
              </p>
              <nav className="space-y-1 text-sm">
                {section.items.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavigate(item.id)}
                      className={cn(
                        'block w-full rounded-lg px-3 py-2 text-left transition',
                        isActive
                          ? 'bg-brand-50 font-semibold text-brand-600 shadow-sm'
                          : 'text-slate-500 hover:bg-slate-100 hover:text-brand-600',
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
          {headerSlot}
        </div>
      </aside>

      <section className="space-y-12">
        <header className="space-y-3 rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
                Toss Inspired UI
              </p>
              <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
              {description ? (
                <p className="text-sm text-slate-500">{description}</p>
              ) : null}
            </div>
          </div>
        </header>

        <div className="space-y-16">{children}</div>
      </section>
    </div>
  );
}
