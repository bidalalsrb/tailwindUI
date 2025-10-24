import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface AppRoute {
  id: string;
  label: string;
  description?: string;
}

interface AppLayoutProps {
  routes: AppRoute[];
  activeRoute: string;
  onRouteChange: (routeId: string) => void;
  children: ReactNode;
}

export function AppLayout({
  routes,
  activeRoute,
  onRouteChange,
  children,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="flex w-full flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between xl:px-10">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-100 text-lg font-bold text-brand-600">
              Ui
            </span>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                Toss Inspired Design Kit
              </p>
              <p className="text-sm text-slate-500">
                간결하고 신뢰감 있는 인터페이스를 빠르게 구성하세요.
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {routes.map((route) => {
              const isActive = route.id === activeRoute;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => onRouteChange(route.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                  )}
                >
                  {route.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex w-full flex-col gap-10 px-6 py-10 xl:px-10">
        {children}
      </main>
      <footer className="border-t border-slate-100 bg-white py-6">
        <div className="flex w-full flex-col gap-1 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between xl:px-10">
          <span>© {new Date().getFullYear()} Toss Inspired UI</span>
          <span>Made for 빠른 프로토타이핑과 일관된 사용자 경험.</span>
        </div>
      </footer>
    </div>
  );
}
