import { useEffect, useMemo, useState } from 'react';
import { AppLayout, AppRoute } from '@/components/layout/AppLayout';
import { AuthPage } from '@/pages/AuthPage';
import { BoardPage } from '@/pages/BoardPage';
import { DocsPage } from '@/pages/DocsPage';
import { HomePage } from '@/pages/HomePage';

type RouteId = 'home' | 'auth' | 'board' | 'docs';

const ROUTES: Record<RouteId, AppRoute> = {
  home: { id: 'home', label: '메인' },
  auth: { id: 'auth', label: '로그인/회원가입' },
  board: { id: 'board', label: '게시판' },
  docs: { id: 'docs', label: '컴포넌트 문서' },
};

const DEFAULT_ROUTE: RouteId = 'home';

export function App() {
  const [activeRoute, setActiveRoute] = useState<RouteId>(DEFAULT_ROUTE);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as RouteId | '';
    if (hash && Object.keys(ROUTES).includes(hash)) {
      setActiveRoute(hash as RouteId);
    }
    const handleHashChange = () => {
      const nextHash = window.location.hash.replace('#', '') as RouteId | '';
      if (nextHash && Object.keys(ROUTES).includes(nextHash)) {
        setActiveRoute(nextHash as RouteId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleRouteChange = (routeId: string) => {
    if (!Object.keys(ROUTES).includes(routeId)) {
      return;
    }
    window.location.hash = routeId;
    setActiveRoute(routeId as RouteId);
  };

  const content = useMemo(() => {
    switch (activeRoute) {
      case 'home':
        return <HomePage />;
      case 'auth':
        return <AuthPage />;
      case 'board':
        return <BoardPage />;
      case 'docs':
        return <DocsPage />;
      default:
        return <HomePage />;
    }
  }, [activeRoute]);

  return (
    <AppLayout
      routes={Object.values(ROUTES)}
      activeRoute={activeRoute}
      onRouteChange={handleRouteChange}
    >
      {content}
    </AppLayout>
  );
}
