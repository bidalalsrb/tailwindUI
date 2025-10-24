import { ReactNode, useState } from 'react';
import type { PropDefinition } from '@/components/docs/PropsTable';
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  DataTable,
  type TableColumn,
  Modal,
  Pagination,
  ProgressBar,
  RadioGroup,
  Select,
  StatCard,
  Switch,
  Tabs,
  TextArea,
  TextField,
} from '@/components/ui';
import { ToneKey } from '@/theme/tones';

export interface DocComponent {
  id: string;
  name: string;
  summary: string;
  preview: (tone: ToneKey) => ReactNode;
  code: string;
  props: PropDefinition[];
}

export interface DocSection {
  id: string;
  label: string;
  description: string;
  components: DocComponent[];
}

const ButtonPreview = ({ tone }: { tone: ToneKey }) => (
  <div className="flex flex-wrap gap-3">
    <Button tone={tone}>기본 버튼</Button>
    <Button tone={tone} variant="secondary">
      보조 버튼
    </Button>
    <Button tone={tone} variant="ghost">
      고스트 버튼
    </Button>
    <Button variant="danger">위험 액션</Button>
    <Button tone={tone} size="sm">
      소형
    </Button>
    <Button tone={tone} size="lg">
      대형
    </Button>
  </div>
);

const BadgePreview = ({ tone }: { tone: ToneKey }) => (
  <div className="flex flex-wrap gap-2">
    <Badge tone={tone}>브랜드</Badge>
    <Badge tone="neutral">중립</Badge>
    <Badge tone="success">성공</Badge>
    <Badge tone="warning">주의</Badge>
    <Badge tone="danger">위험</Badge>
  </div>
);

const CardPreview = ({ tone }: { tone: ToneKey }) => (
  <Card
    title="프로젝트 상태"
    description="일주일 동안 처리된 업무 현황입니다."
    footer={<Button tone={tone}>자세히 보기</Button>}
  >
    <ul className="space-y-2 text-sm">
      <li>완료 · 14건</li>
      <li>진행 중 · 3건</li>
      <li>대기 · 1건</li>
    </ul>
  </Card>
);

const AvatarPreview = () => (
  <div className="flex flex-wrap items-center gap-4">
    <Avatar name="김하늘" size="lg" status="online" />
    <Avatar name="이서준" size="md" status="away" />
    <Avatar name="박지민" size="md" status="offline" />
    <AvatarGroup
      size="sm"
      items={[
        { name: '프로덕트 리드' },
        { name: '프론트엔드 개발자' },
        { name: '디자이너' },
        { name: '마케터' },
      ]}
    />
  </div>
);

const CheckboxPreview = ({ tone }: { tone: ToneKey }) => (
  <div className="space-y-3">
    <Checkbox
      label="이용 약관 동의"
      description="서비스 이용을 위해 필수로 동의가 필요합니다."
      tone={tone}
      defaultChecked
    />
    <Checkbox
      label="마케팅 수신 동의"
      description="이벤트·프로모션 메일을 받아볼 수 있습니다."
      tone={tone}
    />
  </div>
);

const TextFieldPreview = ({ tone }: { tone: ToneKey }) => (
  <div className="grid gap-4 md:grid-cols-2">
    <TextField label="이메일" placeholder="name@company.com" tone={tone} />
    <TextField
      label="비밀번호"
      type="password"
      placeholder="8자 이상 입력"
      errorMessage="숫자와 특수문자를 포함해주세요."
      tone={tone}
    />
  </div>
);

const TextAreaPreview = ({ tone }: { tone: ToneKey }) => (
  <TextArea
    label="요청 사항"
    rows={4}
    description="최대 500자까지 입력할 수 있습니다."
    placeholder="필요한 기능이나 문의 내용을 입력해주세요."
    tone={tone}
  />
);

const SelectPreview = ({ tone }: { tone: ToneKey }) => {
  const [value, setValue] = useState('design');
  return (
    <Select
      label="업무 영역"
      options={[
        { label: '디자인', value: 'design' },
        { label: '개발', value: 'dev' },
        { label: '운영', value: 'ops' },
      ]}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      tone={tone}
    />
  );
};

const RadioGroupPreview = ({ tone }: { tone: ToneKey }) => {
  const [value, setValue] = useState('light');
  return (
    <RadioGroup
      name="theme-mode"
      value={value}
      onChange={setValue}
      options={[
        { label: '라이트 모드', description: '기본 밝은 배경', value: 'light' },
        { label: '다크 모드', description: '어두운 배경', value: 'dark' },
      ]}
      tone={tone}
    />
  );
};

const SwitchPreview = ({ tone }: { tone: ToneKey }) => {
  const [checked, setChecked] = useState(true);
  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      label="베타 기능 활성화"
      description="새로운 실험 기능을 먼저 경험할 수 있습니다."
      tone={tone}
    />
  );
};

const TabsPreview = ({ tone }: { tone: ToneKey }) => {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <Tabs
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={[
        { id: 'overview', label: '개요', content: <p className="text-sm text-slate-500">제품을 한눈에 요약합니다.</p> },
        { id: 'metrics', label: '지표', content: <p className="text-sm text-slate-500">핵심 KPI와 차트를 연결하세요.</p> },
      ]}
      tone={tone}
    />
  );
};

const BreadcrumbPreview = ({ tone }: { tone: ToneKey }) => (
  <Breadcrumb
    items={[
      { label: '홈', href: '#home' },
      { label: '컴포넌트', href: '#docs' },
      { label: '알림' },
    ]}
    tone={tone}
  />
);

const PaginationPreview = ({ tone }: { tone: ToneKey }) => {
  const [page, setPage] = useState(2);
  return <Pagination totalPages={9} currentPage={page} onPageChange={setPage} tone={tone} />;
};

const alertToneMap: Record<ToneKey, 'info' | 'success' | 'warning' | 'danger' | 'neutral'> = {
  brand: 'info',
  navy: 'info',
  blue: 'info',
  green: 'success',
  red: 'danger',
  brown: 'warning',
};

const AlertPreview = ({ tone }: { tone: ToneKey }) => (
  <Alert
    tone={alertToneMap[tone]}
    title="새로운 업데이트 준비 중"
    description="다음 주에 신규 UI 컴포넌트가 추가됩니다. 릴리즈 노트를 확인하세요."
    actions={
      <Button tone={tone} variant="secondary" size="sm">
        자세히 보기
      </Button>
    }
  />
);

const ProgressPreview = ({ tone }: { tone: ToneKey }) => (
  <div className="space-y-4">
    <ProgressBar label="UI 자산 정리" value={65} tone={tone} />
    <ProgressBar label="모듈 테스트" value={40} tone="navy" />
    <ProgressBar label="문서화" value={85} tone="green" />
  </div>
);

const ModalPreview = ({ tone }: { tone: ToneKey }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <Button tone={tone} onClick={() => setOpen(true)}>
        모달 열기
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        tone={tone}
        title="설정 업데이트"
        description="변경 사항을 저장하기 전에 입력 정보를 확인해주세요."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button tone={tone} onClick={() => setOpen(false)}>
              저장하기
            </Button>
          </div>
        }
      >
        <p>모든 입력값이 올바른지 확인한 후 저장을 진행하세요.</p>
      </Modal>
    </div>
  );
};

const StatCardPreview = ({ tone }: { tone: ToneKey }) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    <StatCard
      label="월간 활성 사용자"
      value="128,439"
      delta="+12.4%"
      trend="up"
      caption="전월 대비"
      tone={tone}
    />
    <StatCard
      label="구독 전환율"
      value="7.8%"
      delta="-0.6%"
      trend="down"
      caption="체험판 → 유료"
      tone="red"
    />
    <StatCard
      label="고객 만족도"
      value="4.7 / 5.0"
      delta="+0.3"
      trend="up"
      caption="CS 설문 응답 기준"
      tone="green"
    />
  </div>
);

interface TableRow extends Record<string, unknown> {
  title: string;
  owner: string;
  status: '진행중' | '완료' | '대기';
  updatedAt: string;
}

const createDataTableColumns = (tone: ToneKey): TableColumn<TableRow>[] => [
  { key: 'title', header: '제목' },
  { key: 'owner', header: '담당자' },
  {
    key: 'status',
    header: '상태',
    render: (row) => (
      <Badge tone={row.status === '진행중' ? tone : row.status === '완료' ? 'success' : 'neutral'}>
        {row.status}
      </Badge>
    ),
  },
  {
    key: 'updatedAt',
    header: '업데이트',
    align: 'right',
    render: (row) =>
      new Date(row.updatedAt).toLocaleDateString('ko-KR', {
        month: '2-digit',
        day: '2-digit',
      }),
  },
];

const dataTableRows: TableRow[] = [
  { title: '온보딩 플로우 개편', owner: '김하늘', status: '진행중', updatedAt: '2024-12-04' },
  { title: '결제 완료 화면 QA', owner: '이서준', status: '완료', updatedAt: '2024-12-02' },
  { title: '디자인 시스템 문서화', owner: '박지민', status: '대기', updatedAt: '2024-12-01' },
];

const DataTablePreview = ({ tone }: { tone: ToneKey }) => (
  <DataTable<TableRow> columns={createDataTableColumns(tone)} data={dataTableRows} />
);

export const componentDocs: DocSection[] = [
  {
    id: 'foundation',
    label: '기본 구성 요소',
    description: '서비스 전반에서 반복적으로 등장하는 핵심 UI 모듈입니다.',
    components: [
      {
        id: 'button',
        name: 'Button',
        summary:
          '명확한 CTA를 위해 대비 높은 컬러와 라운드를 적용했습니다. `variant`, `size`, `tone` 옵션으로 버튼 계층을 구분합니다.',
        preview: (tone) => <ButtonPreview tone={tone} />,
        code: `
import { Button } from '@/components/ui';

export function ButtonExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button tone="brand">기본 버튼</Button>
      <Button tone="brand" variant="secondary">보조 버튼</Button>
      <Button tone="brand" variant="ghost">고스트 버튼</Button>
      <Button variant="danger">위험 액션</Button>
    </div>
  );
}
        `,
        props: [
          { name: 'variant', type: `'primary' | 'secondary' | 'ghost' | 'danger'`, defaultValue: `'primary'`, description: '버튼 계층 및 스타일을 지정합니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '톤 컬러를 변경합니다.' },
          { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: `'md'`, description: '버튼 높이와 패딩을 지정합니다.' },
          { name: 'block', type: 'boolean', defaultValue: 'false', description: 'true일 경우 버튼 너비가 100%가 됩니다.' },
        ],
      },
      {
        id: 'badge',
        name: 'Badge',
        summary:
          '상태나 카테고리를 간단히 표시할 때 사용합니다. `tone`을 통해 브랜드 컬러를 비롯한 다양한 강조 색을 지원합니다.',
        preview: (tone) => <BadgePreview tone={tone} />,
        code: `
import { Badge } from '@/components/ui';

export function BadgeExample() {
  return (
    <div className="flex gap-2">
      <Badge tone="brand">브랜드</Badge>
      <Badge tone="neutral">중립</Badge>
    </div>
  );
}
        `,
        props: [
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown' | 'neutral' | 'success' | 'warning' | 'danger'`, defaultValue: `'brand'`, description: '배경/텍스트 색상을 지정합니다.' },
          { name: 'children', type: 'ReactNode', required: true, description: '뱃지 내부 콘텐츠입니다.' },
        ],
      },
      {
        id: 'card',
        name: 'Card',
        summary:
          '콘텐츠 블록을 시각적으로 묶어 표현합니다. 타이틀, 설명, 하단 CTA를 함께 구성할 수 있습니다.',
        preview: (tone) => <CardPreview tone={tone} />,
        code: `
import { Button, Card } from '@/components/ui';

export function CardExample() {
  return (
    <Card
      title="프로젝트 상태"
      description="일주일 동안 처리된 업무 현황입니다."
      footer={<Button tone="brand">자세히 보기</Button>}
    >
      <ul className="space-y-2 text-sm">
        <li>완료 · 14건</li>
        <li>진행 중 · 3건</li>
        <li>대기 · 1건</li>
      </ul>
    </Card>
  );
}
        `,
        props: [
          { name: 'title', type: 'string', description: '카드 상단 제목입니다.' },
          { name: 'description', type: 'string', description: '보조 설명 텍스트입니다.' },
          { name: 'footer', type: 'ReactNode', description: '하단 액션 영역입니다.' },
          { name: 'accent', type: 'boolean', defaultValue: 'false', description: 'true일 경우 카드 테두리를 강조합니다.' },
        ],
      },
      {
        id: 'avatar',
        name: 'Avatar',
        summary:
          '사용자 이니셜 또는 이미지를 표시합니다. 상태 점과 그룹 아바타도 지원합니다.',
        preview: () => <AvatarPreview />,
        code: `
import { Avatar, AvatarGroup } from '@/components/ui';

export function AvatarExample() {
  return (
    <div className="flex gap-4">
      <Avatar name="김하늘" status="online" />
      <AvatarGroup items={[{ name: '디자이너' }, { name: '개발자' }]} />
    </div>
  );
}
        `,
        props: [
          { name: 'name', type: 'string', description: '이니셜을 생성할 이름입니다.' },
          { name: 'src', type: 'string', description: '이미지 URL입니다.' },
          { name: 'size', type: `'sm' | 'md' | 'lg' | 'xl'`, defaultValue: `'md'`, description: '아바타 크기를 지정합니다.' },
          { name: 'status', type: `'online' | 'offline' | 'away'`, description: '상태 점 스타일을 지정합니다.' },
        ],
      },
    ],
  },
  {
    id: 'forms',
    label: '폼 입력',
    description: '정보를 수집하고 사용자 입력을 처리하는 폼 컴포넌트입니다.',
    components: [
      {
        id: 'textfield',
        name: 'TextField',
        summary:
          '단일 라인 입력 필드입니다. 라벨, 설명, 오류 메시지를 함께 제공하며 `tone`으로 포커스 색상을 조정할 수 있습니다.',
        preview: (tone) => <TextFieldPreview tone={tone} />,
        code: `
import { TextField } from '@/components/ui';

export function TextFieldExample() {
  return <TextField label="이메일" placeholder="name@company.com" tone="brand" />;
}
        `,
        props: [
          { name: 'label', type: 'string', description: '입력 필드 라벨입니다.' },
          { name: 'description', type: 'string', description: '힌트 문구입니다.' },
          { name: 'errorMessage', type: 'string', description: '검증 실패 시 메시지입니다.' },
          { name: 'optional', type: 'boolean', defaultValue: 'false', description: 'true면 “선택” 문구가 표시됩니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '포커스 색상을 지정합니다.' },
        ],
      },
      {
        id: 'textarea',
        name: 'TextArea',
        summary: '멀티라인 입력을 위한 컴포넌트입니다. `rows`와 `tone`을 통해 높이와 포커스 색을 조절합니다.',
        preview: (tone) => <TextAreaPreview tone={tone} />,
        code: `
import { TextArea } from '@/components/ui';

export function TextAreaExample() {
  return <TextArea label="요청 사항" tone="brand" />;
}
        `,
        props: [
          { name: 'rows', type: 'number', defaultValue: '4', description: '기본 표시 줄 수입니다.' },
          { name: 'label', type: 'string', description: '라벨 텍스트입니다.' },
          { name: 'description', type: 'string', description: '보조 설명입니다.' },
          { name: 'errorMessage', type: 'string', description: '오류 문구입니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '포커스 색상을 지정합니다.' },
        ],
      },
      {
        id: 'select',
        name: 'Select',
        summary:
          '네이티브 셀렉트를 토스 감성으로 커스터마이징했습니다. `tone`으로 포커스 색상을 지정할 수 있습니다.',
        preview: (tone) => <SelectPreview tone={tone} />,
        code: `
import { useState } from 'react';
import { Select } from '@/components/ui';

const OPTIONS = [
  { label: '디자인', value: 'design' },
  { label: '개발', value: 'dev' },
];

export function SelectExample() {
  const [value, setValue] = useState('design');
  return (
    <Select
      label="업무 영역"
      options={OPTIONS}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      tone="brand"
    />
  );
}
        `,
        props: [
          { name: 'options', type: 'Array<{ label: string; value: string }>', required: true, description: '선택 가능한 옵션 목록입니다.' },
          { name: 'value', type: 'string', description: '제어형 값입니다.' },
          { name: 'onChange', type: '(event: ChangeEvent<HTMLSelectElement>) => void', description: '값 변경 이벤트입니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '포커스 색상을 지정합니다.' },
        ],
      },
    ],
  },
  {
    id: 'controls',
    label: '선택 컨트롤',
    description: '사용자 결정을 돕는 토글, 라디오, 탭 등의 상호작용 컴포넌트입니다.',
    components: [
      {
        id: 'checkbox',
        name: 'Checkbox',
        summary:
          '동의 여부나 다중 선택 상황에 적합합니다. `tone`에 따라 체크 상태 색상이 변경됩니다.',
        preview: (tone) => <CheckboxPreview tone={tone} />,
        code: `
import { Checkbox } from '@/components/ui';

export function CheckboxExample() {
  return <Checkbox label="이용 약관 동의" tone="brand" />;
}
        `,
        props: [
          { name: 'label', type: 'string', required: true, description: '체크박스 라벨입니다.' },
          { name: 'description', type: 'string', description: '보조 설명입니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '체크 색상을 지정합니다.' },
        ],
      },
      {
        id: 'radiogroup',
        name: 'RadioGroup',
        summary:
          '단일 선택 항목을 그룹화합니다. 옵션별 설명을 추가할 수 있으며 `tone`으로 강조 색상을 조절합니다.',
        preview: (tone) => <RadioGroupPreview tone={tone} />,
        code: `
import { useState } from 'react';
import { RadioGroup } from '@/components/ui';

const OPTIONS = [
  { label: '라이트 모드', value: 'light' },
  { label: '다크 모드', value: 'dark' },
];

export function RadioGroupExample() {
  const [value, setValue] = useState('light');
  return (
    <RadioGroup
      name="theme-mode"
      value={value}
      onChange={setValue}
      options={OPTIONS}
      tone="brand"
    />
  );
}
        `,
        props: [
          { name: 'name', type: 'string', required: true, description: '네이티브 그룹화를 위한 name입니다.' },
          { name: 'value', type: 'string', required: true, description: '현재 선택된 값입니다.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: '선택 변경 시 호출됩니다.' },
          { name: 'options', type: 'Array<{ label: string; description?: string; value: string }>', required: true, description: '라디오 옵션 배열입니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '선택 시 강조 색을 지정합니다.' },
        ],
      },
      {
        id: 'switch',
        name: 'Switch',
        summary: '이진 상태 토글입니다. 클릭 영역 전체가 버튼으로 동작하며 `tone`으로 켜진 상태 색을 변경할 수 있습니다.',
        preview: (tone) => <SwitchPreview tone={tone} />,
        code: `
import { useState } from 'react';
import { Switch } from '@/components/ui';

export function SwitchExample() {
  const [checked, setChecked] = useState(true);
  return <Switch checked={checked} onChange={setChecked} tone="brand" />;
}
        `,
        props: [
          { name: 'checked', type: 'boolean', required: true, description: '현재 토글 상태입니다.' },
          { name: 'onChange', type: '(checked: boolean) => void', required: true, description: '상태 변경 시 호출됩니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '활성 색상을 지정합니다.' },
        ],
      },
      {
        id: 'tabs',
        name: 'Tabs',
        summary:
          '동일 계층의 콘텐츠를 전환하는 네비게이션 컴포넌트입니다. `tone`으로 활성 탭 색을 지정합니다.',
        preview: (tone) => <TabsPreview tone={tone} />,
        code: `
import { useState } from 'react';
import { Tabs } from '@/components/ui';

const TABS = [
  { id: 'overview', label: '개요', content: <p>요약</p> },
  { id: 'metrics', label: '지표', content: <p>지표</p> },
];

export function TabsExample() {
  const [activeTab, setActiveTab] = useState('overview');
  return <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} tone="brand" />;
}
        `,
        props: [
          { name: 'activeTab', type: 'string', required: true, description: '현재 활성화된 탭 ID입니다.' },
          { name: 'onTabChange', type: '(id: string) => void', required: true, description: '탭 변경 이벤트입니다.' },
          { name: 'tabs', type: 'Array<{ id: string; label: string; content: ReactNode }>', required: true, description: '탭 버튼 및 콘텐츠 정의입니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '활성 탭 색을 지정합니다.' },
        ],
      },
    ],
  },
  {
    id: 'navigation',
    label: '네비게이션',
    description: '사용자가 현재 위치를 파악하고 페이지를 이동하도록 돕는 컴포넌트입니다.',
    components: [
      {
        id: 'breadcrumb',
        name: 'Breadcrumb',
        summary: '현재 경로를 단계적으로 보여줍니다. 페이지 계층 구조에 사용합니다.',
        preview: (tone) => <BreadcrumbPreview tone={tone} />,
        code: `
import { Breadcrumb } from '@/components/ui';

export function BreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        { label: '홈', href: '#home' },
        { label: '컴포넌트', href: '#docs' },
        { label: '알림' },
      ]}
    />
  );
}
        `,
        props: [
          { name: 'items', type: 'Array<{ label: string; href?: string }>', required: true, description: '경로 단계 배열입니다.' },
          { name: 'separator', type: 'ReactNode', description: '단계 사이에 표시할 구분자입니다.' },
        ],
      },
      {
        id: 'pagination',
        name: 'Pagination',
        summary: '목록과 테이블 주변에서 페이지 이동을 제공합니다. 7페이지 이상일 경우 자동으로 줄임표를 처리합니다.',
        preview: (tone) => <PaginationPreview tone={tone} />,
        code: `
import { useState } from 'react';
import { Pagination } from '@/components/ui';

export function PaginationExample() {
  const [page, setPage] = useState(2);
  return <Pagination totalPages={9} currentPage={page} onPageChange={setPage} />;
}
        `,
        props: [
          { name: 'totalPages', type: 'number', required: true, description: '전체 페이지 수입니다.' },
          { name: 'currentPage', type: 'number', required: true, description: '현재 페이지입니다.' },
          { name: 'onPageChange', type: '(page: number) => void', required: true, description: '페이지 변경 시 호출됩니다.' },
        ],
      },
    ],
  },
  {
    id: 'feedback',
    label: '피드백 & 상태',
    description: '사용자에게 시스템 상태와 진행 상황을 전달합니다.',
    components: [
      {
        id: 'alert',
        name: 'Alert',
        summary: '정보, 성공, 경고, 오류 상황을 구분해 메시지를 전달합니다. 버튼 등 보조 액션을 포함할 수 있습니다.',
        preview: (tone) => <AlertPreview tone={tone} />,
        code: `
import { Alert, Button } from '@/components/ui';

export function AlertExample() {
  return (
    <Alert
      tone="info"
      title="새로운 업데이트 준비 중"
      description="다음 주에 신규 UI 컴포넌트가 추가됩니다. 릴리즈 노트를 확인하세요."
      actions={<Button tone="brand" variant="secondary" size="sm">자세히 보기</Button>}
    />
  );
}
        `,
        props: [
          { name: 'tone', type: `'info' | 'success' | 'warning' | 'danger' | 'neutral'`, defaultValue: `'info'`, description: '알림 유형을 지정합니다.' },
          { name: 'title', type: 'string', description: '메시지 제목입니다.' },
          { name: 'description', type: 'string', description: '본문 메시지입니다.' },
          { name: 'actions', type: 'ReactNode', description: '추가 액션 영역입니다.' },
          { name: 'icon', type: 'ReactNode', description: '커스텀 아이콘을 제공할 수 있습니다.' },
        ],
      },
      {
        id: 'progressbar',
        name: 'ProgressBar',
        summary: '작업 진행률을 시각화합니다. 브랜드 색상 확장을 활용해 여러 상태를 구분합니다.',
        preview: (tone) => <ProgressPreview tone={tone} />,
        code: `
import { ProgressBar } from '@/components/ui';

export function ProgressBarExample() {
  return <ProgressBar label="UI 자산 정리" value={65} tone="brand" />;
}
        `,
        props: [
          { name: 'value', type: 'number', required: true, description: '현재 진행 값입니다.' },
          { name: 'max', type: 'number', defaultValue: '100', description: '최대 값입니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '바 색상을 지정합니다.' },
          { name: 'label', type: 'string', description: '상단에 표시할 제목입니다.' },
        ],
      },
      {
        id: 'modal',
        name: 'Modal',
        summary: '오버레이 레이어로 중요한 정보를 집중시켜 보여줍니다. 버튼과 함께 사용해 사용자 액션을 유도하세요.',
        preview: (tone) => <ModalPreview tone={tone} />,
        code: `
import { useState } from 'react';
import { Button, Modal } from '@/components/ui';

export function ModalExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button tone="brand" onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="설정 업데이트"
        description="변경 사항을 저장하기 전에 입력 정보를 확인해주세요."
        tone="brand"
      >
        <p>모든 입력값이 올바른지 확인한 후 저장을 진행하세요.</p>
      </Modal>
    </>
  );
}
        `,
        props: [
          { name: 'isOpen', type: 'boolean', required: true, description: '모달 표시 여부입니다.' },
          { name: 'onClose', type: '() => void', required: true, description: '모달 닫기 핸들러입니다.' },
          { name: 'title', type: 'string', description: '모달 제목입니다.' },
          { name: 'description', type: 'string', description: '모달 상단 보조 설명입니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red' | 'brown'`, defaultValue: `'brand'`, description: '제목 강조 색을 지정합니다.' },
          { name: 'footer', type: 'ReactNode', description: '하단 액션 영역입니다.' },
        ],
      },
    ],
  },
  {
    id: 'analytics',
    label: '지표 & 데이터',
    description: '핵심 수치와 데이터를 강조해 보여주는 컴포넌트입니다.',
    components: [
      {
        id: 'statcard',
        name: 'StatCard',
        summary: '핵심 지표를 강조하여 보여줍니다. 증감률과 추세 아이콘을 함께 제공할 수 있습니다.',
        preview: (tone) => <StatCardPreview tone={tone} />,
        code: `
import { StatCard } from '@/components/ui';

export function StatCardExample() {
  return <StatCard label="월간 활성 사용자" value="128,439" delta="+12.4%" trend="up" tone="brand" />;
}
        `,
        props: [
          { name: 'label', type: 'string', required: true, description: '지표 이름입니다.' },
          { name: 'value', type: 'string', required: true, description: '주요 수치입니다.' },
          { name: 'delta', type: 'string', description: '증감 수치나 퍼센티지입니다.' },
          { name: 'trend', type: `'up' | 'down' | 'flat'`, defaultValue: `'flat'`, description: '증감 방향을 표시합니다.' },
          { name: 'caption', type: 'string', description: '보조 설명입니다.' },
          { name: 'tone', type: `'brand' | 'navy' | 'blue' | 'green' | 'red'`, defaultValue: `'brand'`, description: '카드 강조 색입니다.' },
        ],
      },
      {
        id: 'datatable',
        name: 'DataTable',
        summary: '컬럼 정의와 데이터를 전달하면 일관된 스타일의 테이블을 생성합니다.',
        preview: (tone) => <DataTablePreview tone={tone} />,
        code: `
import { Badge, DataTable } from '@/components/ui';

const columns = [
  { key: 'title', header: '제목' },
  { key: 'owner', header: '담당자' },
];

const rows = [
  { title: '온보딩 플로우 개편', owner: '김하늘', status: '진행중', updatedAt: '2024-12-04' },
];

export function DataTableExample() {
  return <DataTable columns={columns} data={rows} />;
}
        `,
        props: [
          { name: 'columns', type: 'Array<TableColumn<T>>', required: true, description: '헤더 및 셀 렌더러 정의입니다.' },
          { name: 'data', type: 'T[]', required: true, description: '표시할 데이터 배열입니다.' },
          { name: 'emptyState', type: 'ReactNode', description: '데이터가 없을 때 표시할 콘텐츠입니다.' },
        ],
      },
    ],
  },
];
