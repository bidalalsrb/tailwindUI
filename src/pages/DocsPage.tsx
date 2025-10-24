import { DocsLayout, DocsNavSection } from '@/components/docs/DocsLayout';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PropsTable } from '@/components/docs/PropsTable';
import { componentDocs } from '@/docs/componentDocs';
import { Button, Card } from '@/components/ui';

export function DocsPage() {
  const componentNavItems = componentDocs
    .filter((section) => section.id !== 'data')
    .flatMap((section) =>
      section.components.map((component) => ({
        id: `${section.id}-${component.id}`,
        label: component.name,
      })),
    );

  const tableNavItems = componentDocs
    .filter((section) => section.id === 'data')
    .flatMap((section) =>
      section.components.map((component) => ({
        id: `${section.id}-${component.id}`,
        label: component.name,
      })),
    );

  const sampleSections = [
    {
      id: 'sample-home',
      title: '메인 페이지',
      description: '브랜드 메시지, 지표 카드, 진행 상황, 컴포넌트 하이라이트로 구성된 랜딩 화면입니다.',
      link: '#home',
    },
    {
      id: 'sample-auth',
      title: '로그인/회원가입',
      description: '로그인과 회원가입을 한 화면에서 전환하며 사용할 수 있는 토스형 인증 플로우입니다.',
      link: '#auth',
    },
    {
      id: 'sample-board',
      title: '게시판',
      description: '검색, 필터, 탭, 페이지네이션까지 포함된 실무형 게시판 템플릿입니다.',
      link: '#board',
    },
  ];

  const navSections: DocsNavSection[] = [
    { title: '컴포넌트', items: componentNavItems },
    { title: '테이블', items: tableNavItems },
    {
      title: '샘플 화면',
      items: sampleSections.map((item) => ({ id: item.id, label: item.title })),
    },
  ];

  return (
    <DocsLayout
      title="컴포넌트 문서"
      description="실제 프로덕트에서 바로 활용할 수 있도록 상태, 속성, 코드 예시를 함께 제공합니다."
      navSections={navSections}
      headerSlot={
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-800">빠른 사용법</p>
          <ol className="list-decimal space-y-2 pl-4 text-xs text-slate-500">
            <li>`npm install`로 의존성을 설치한 뒤 `npm run dev`를 실행합니다.</li>
            <li>좌측 목차에서 필요한 컴포넌트를 선택하고 코드 스니펫을 복사하세요.</li>
            <li>필요 시 props 표를 참고해 변형하거나 새로운 패턴으로 확장합니다.</li>
          </ol>
        </div>
      }
    >
      {componentDocs.map((section) => (
        <section key={section.id} id={section.id} className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-brand-500">{section.label}</p>
            <h2 className="text-2xl font-semibold text-slate-900">{section.description}</h2>
          </div>

          <div className="space-y-10">
            {section.components.map((component) => (
              <ComponentPreview
                key={component.id}
                id={`${section.id}-${component.id}`}
                title={component.name}
                description={component.summary}
                preview={component.preview}
                code={component.code}
                propsTable={<PropsTable props={component.props} />}
              />
            ))}
          </div>
        </section>
      ))}

      <section id="samples" className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-brand-500">샘플 화면</p>
          <h2 className="text-2xl font-semibold text-slate-900">템플릿에 포함된 대표 페이지</h2>
          <p className="text-sm text-slate-500">
            실제 페이지 구조를 살펴보고, 필요한 경우 URL 해시를 통해 바로 이동해 구성 요소를 확인하세요.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sampleSections.map((sample) => (
            <Card
              key={sample.id}
              title={sample.title}
              description={sample.description}
              className="space-y-4"
            >
              <div id={sample.id} className="space-y-4">
                <p className="text-sm text-slate-500">
                  템플릿 상단 네비게이션에서{' '}
                  <span className="font-semibold text-brand-600">{sample.link}</span>
                  로 이동하면 실 페이지를 바로 확인할 수 있습니다.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.location.hash = sample.link;
                    }
                  }}
                >
                  페이지 이동
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </DocsLayout>
  );
}
