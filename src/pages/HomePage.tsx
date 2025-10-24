import { useState } from 'react';
import {
  AvatarGroup,
  Badge,
  Button,
  Card,
  ProgressBar,
  Select,
  StatCard,
  Switch,
  Tabs,
  TextArea,
  TextField,
} from '@/components/ui';

const personas = [
  { label: '프로덕트 디자이너', value: 'designer' },
  { label: '프론트엔드 개발자', value: 'frontend' },
  { label: '스타트업 창업자', value: 'startup' },
];

const brandTones = [
  { name: 'brand-100', className: 'bg-brand-100' },
  { name: 'brand-200', className: 'bg-brand-200' },
  { name: 'brand-300', className: 'bg-brand-300' },
  { name: 'brand-400', className: 'bg-brand-400' },
  { name: 'brand-500', className: 'bg-brand-500' },
  { name: 'brand-600', className: 'bg-brand-600' },
];

const stats = [
  {
    label: '월간 활성 사용자',
    value: '128,439명',
    delta: '+12.4%',
    trend: 'up' as const,
    caption: '이전 달 대비 증가',
    tone: 'brand' as const,
  },
  {
    label: '프로젝트 완료율',
    value: '87%',
    delta: '+4.1%',
    trend: 'up' as const,
    caption: '스프린트 기준',
    tone: 'navy' as const,
  },
  {
    label: '고객 만족도',
    value: '4.7 / 5.0',
    delta: '-0.3',
    trend: 'down' as const,
    caption: '최근 CS 설문',
    tone: 'green' as const,
  },
];

export function HomePage() {
  const [persona, setPersona] = useState(personas[0].value);
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState(true);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 p-10 text-white shadow-[0_30px_80px_-50px_rgba(56,189,248,0.8)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-5">
            <Badge tone="neutral" className="bg-white/15 text-white">
              토스 감성의 깨끗한 UI 키트
            </Badge>
            <h1 className="text-3xl font-semibold leading-snug md:text-4xl">
              빠르게 브랜딩하고 일관된 경험을 만드는
              <br />
              Toss Inspired UI 템플릿
            </h1>
            <p className="text-base text-white/80">
              정제된 컬러 팔레트와 타이포그래피, 실무에서 바로 쓰는 컴포넌트까지
              한 번에 구성했습니다. 팀의 온보딩과 제품 실험 속도를 높여보세요.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">샘플 페이지 열어보기</Button>
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                문서 살펴보기
              </Button>
            </div>
          </div>
          <Card
            className="w-full max-w-md bg-white/95 shadow-[0_25px_60px_-45px_rgba(8,47,73,0.75)] backdrop-blur"
            title="빠른 시작 가이드"
            description="3분 만에 기본 페이지를 구성할 수 있도록 설계되었습니다."
            footer={
              <Button block size="lg">
                템플릿 다운로드
              </Button>
            }
          >
            <div className="space-y-4 text-slate-600">
              <Select
                label="사용자 역할"
                options={personas}
                value={persona}
                onChange={(event) => setPersona(event.currentTarget.value)}
              />
              <Switch
                checked={notification}
                onChange={setNotification}
                label="릴리즈 알림 받기"
                description="새로운 컴포넌트와 문서를 이메일로 받아보세요."
              />
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: '일관된 디자인 언어',
            description: '타이포그래피, 컬러 스케일, 그림자를 사전 정의하여 화면 간 결을 유지합니다.',
          },
          {
            title: '접근성을 고려한 상호작용',
            description:
              '포커스 아웃라인, 대비, ARIA 속성을 반영해 신뢰감을 주는 사용자 경험을 제공합니다.',
          },
          {
            title: '실무에 맞춘 샘플 페이지',
            description:
              '로그인·회원가입, 메인, 게시판 페이지를 기반으로 다양한 변형을 빠르게 시도할 수 있습니다.',
          },
        ].map((feature) => (
          <Card key={feature.title} title={feature.title}>
            <p>{feature.description}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {stats.map((item) => (
            <StatCard
              key={item.label}
              label={item.label}
              value={item.value}
              delta={item.delta}
              trend={item.trend}
              caption={item.caption}
              tone={item.tone}
            />
          ))}
        </div>

        <Card
          title="팀 진행 상황"
          description="단일 대시보드에서 협업 현황을 추적하세요."
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">디자인 시스템 업데이트</span>
              <span className="text-xs font-medium text-slate-400">Due in 3 days</span>
            </div>
            <ProgressBar value={72} tone="brand" />
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">참여 팀원</p>
              <AvatarGroup
                items={[
                  { name: '김하늘' },
                  { name: '이서준' },
                  { name: '박지민' },
                  { name: '최윤아' },
                  { name: '정다빈' },
                ]}
              />
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card
          title="디자인 토큰 한눈에 보기"
          description="Tailwind 색상 시스템을 그대로 활용하면서 브랜드 톤을 확장했습니다."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-2xl bg-brand-50 p-4">
              <p className="text-sm font-semibold text-brand-700">브랜드 컬러</p>
              <div className="flex gap-2">
                {brandTones.map((tone) => (
                  <div key={tone.name} className="flex w-full flex-col items-center gap-2">
                    <span className={`h-12 w-full rounded-xl ${tone.className}`} />
                    <span className="text-xs text-slate-500">{tone.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2 rounded-2xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-700">타이포그래피</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <strong className="text-slate-800">Pretendard</strong> 기본 폰트
                </li>
                <li>라인 높이, 자간을 Toss UI에 맞게 조정</li>
                <li>헤드라인과 본문 간 대비를 강조</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card
          title="빠른 폼 구성"
          description="컴포넌트를 조합해 반복되는 폼 화면을 쉽게 완성할 수 있습니다."
        >
          <div className="space-y-4">
            <TextField label="이메일" placeholder="name@company.com" />
            <TextField label="회사명" placeholder="주식회사 토스" />
            <TextArea label="요청 내용" placeholder="필요한 기능이나 문의 내용을 간단히 적어주세요." />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            {
              id: 'overview',
              label: '콘셉트',
              content: (
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Toss Inspired UI는 결제·금융 서비스에서 기대하는 신뢰감과 사용성을 그대로 담았습니다.
                    공백감과 대비를 활용해 핵심 정보에 집중할 수 있도록 도와줍니다.
                  </p>
                </div>
              ),
            },
            {
              id: 'usage',
              label: '적용 방식',
              content: (
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Tailwind 구성 파일을 그대로 가져와 프로젝트에 연결합니다.</li>
                  <li>샘플 페이지를 기반으로 폴더 구조와 네이밍을 참고합니다.</li>
                  <li>디자인 토큰을 유지하면서 서비스 맞춤 색상을 확장할 수 있습니다.</li>
                </ul>
              ),
            },
            {
              id: 'upgrade',
              label: '확장 전략',
              content: (
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>문서 시스템에 스토리북이나 MDX 문서를 추가해 팀과 공유합니다.</li>
                  <li>컴포넌트에 상태 관리와 데이터 연동을 붙여 프로덕션에 적용합니다.</li>
                  <li>반응형 그리드 가이드를 적용해 모바일/데스크톱 모두 깔끔하게 표현하세요.</li>
                </ul>
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}
