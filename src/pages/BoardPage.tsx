import { useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  DataTable,
  Pagination,
  Select,
  Tabs,
  TextField,
} from '@/components/ui';
import type { BadgeProps, TableColumn } from '@/components/ui';

interface Post extends Record<string, unknown> {
  id: number;
  title: string;
  author: string;
  status: 'ready' | 'progress' | 'done';
  createdAt: string;
  viewCount: number;
}

const POSTS: Post[] = [
  {
    id: 318,
    title: '디자인 시스템 업데이트 안내',
    author: '이하나',
    status: 'done',
    createdAt: '2024-12-04',
    viewCount: 241,
  },
  {
    id: 317,
    title: '컴포넌트 접근성 체크리스트 공유',
    author: '김준영',
    status: 'progress',
    createdAt: '2024-12-03',
    viewCount: 326,
  },
  {
    id: 316,
    title: '12월 디자인 QA 일정 조율',
    author: '박서연',
    status: 'ready',
    createdAt: '2024-12-02',
    viewCount: 184,
  },
  {
    id: 315,
    title: '신규 컬러 토큰 검토 피드백',
    author: '김도현',
    status: 'progress',
    createdAt: '2024-12-01',
    viewCount: 402,
  },
  {
    id: 314,
    title: '다크 모드 적용 범위 논의',
    author: '최윤아',
    status: 'ready',
    createdAt: '2024-11-30',
    viewCount: 256,
  },
  {
    id: 313,
    title: '모바일 최적화 QA 체크리스트',
    author: '박지민',
    status: 'done',
    createdAt: '2024-11-29',
    viewCount: 312,
  },
  {
    id: 312,
    title: 'A/B 테스트 실험안 공유',
    author: '김서연',
    status: 'progress',
    createdAt: '2024-11-28',
    viewCount: 281,
  },
  {
    id: 311,
    title: '신규 플랜 가격 정책 초안',
    author: '정다빈',
    status: 'ready',
    createdAt: '2024-11-27',
    viewCount: 198,
  },
  {
    id: 310,
    title: '토스 페이먼츠 연동 가이드',
    author: '김하늘',
    status: 'done',
    createdAt: '2024-11-26',
    viewCount: 458,
  },
];

const statusLabel: Record<Post['status'], string> = {
  ready: '대기',
  progress: '진행 중',
  done: '완료',
};

export function BoardPage() {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<'all' | Post['status']>('all');
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filteredPosts = useMemo(() => {
    return POSTS.filter((post) => {
      const hit =
        post.title.includes(keyword) || post.author.includes(keyword);
      const statusMatch = status === 'all' || post.status === status;
      const tabMatch =
        activeTab === 'all' || (activeTab === 'progress' && post.status === 'progress') || (activeTab === 'done' && post.status === 'done');
      return hit && statusMatch && tabMatch;
    });
  }, [keyword, status, activeTab]);

  useEffect(() => {
    setPage(1);
  }, [keyword, status, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, page]);

  const columns: TableColumn<Post>[] = useMemo(
    () => [
      {
        key: 'id',
        header: '번호',
        align: 'left',
      },
      {
        key: 'title',
        header: '제목',
        render: (row) => (
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">{row.title}</p>
            <p className="text-xs text-slate-400">{row.author}</p>
          </div>
        ),
      },
      {
        key: 'status',
        header: '상태',
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: 'createdAt',
        header: '등록일',
        render: (row) =>
          new Date(row.createdAt).toLocaleDateString('ko-KR', {
            month: '2-digit',
            day: '2-digit',
          }),
      },
      {
        key: 'viewCount',
        header: '조회수',
        align: 'right',
        render: (row) => row.viewCount.toLocaleString(),
      },
    ],
    [],
  );

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: '메인', href: '#home' },
          { label: '샘플 페이지', href: '#docs' },
          { label: '게시판' },
        ]}
      />
      <div className="space-y-4">
        <Badge tone="neutral">프로젝트 위키</Badge>
        <h2 className="text-3xl font-semibold text-slate-900">
          팀 안에서 바로 쓰는 게시판 템플릿
        </h2>
        <p className="text-sm text-slate-500">
          진행 상황을 한눈에 볼 수 있는 보드형 탭과 검색 필터를 제공합니다. 디자이너·개발자가 동시에 쓰는 자료실에
          적합합니다.
        </p>
      </div>

      <Card
        title="게시판 검색 & 필터"
        description="토스형 입력 필드와 셀렉트를 활용한 필터 UI 예시입니다."
      >
        <div className="grid gap-4 md:grid-cols-4">
          <TextField
            label="검색어"
            placeholder="제목 또는 작성자"
            value={keyword}
            onChange={(event) => setKeyword(event.currentTarget.value)}
          />
          <Select
            label="상태"
            value={status}
            onChange={(event) => setStatus(event.currentTarget.value as typeof status)}
            options={[
              { label: '전체', value: 'all' },
              { label: '대기', value: 'ready' },
              { label: '진행 중', value: 'progress' },
              { label: '완료', value: 'done' },
            ]}
          />
          <div className="self-end">
            <Button block>검색 적용</Button>
          </div>
          <div className="self-end">
            <Button variant="ghost" block>
              필터 초기화
            </Button>
          </div>
        </div>
      </Card>

      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          {
            id: 'all',
            label: '전체',
            content: <DataTable<Post> columns={columns} data={paginatedPosts} />,
          },
          {
            id: 'progress',
            label: '진행 중',
            content: (
              <DataTable<Post>
                columns={columns}
                data={paginatedPosts.filter((post) => post.status === 'progress')}
              />
            ),
          },
          {
            id: 'done',
            label: '완료',
            content: (
              <DataTable<Post>
                columns={columns}
                data={paginatedPosts.filter((post) => post.status === 'done')}
              />
            ),
          },
        ]}
      />

      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </div>
  );
}

const statusToneMap: Record<Post['status'], NonNullable<BadgeProps['tone']>> = {
  done: 'success',
  progress: 'brand',
  ready: 'neutral',
};

function StatusBadge({ status }: { status: Post['status'] }) {
  return <Badge tone={statusToneMap[status]}>{statusLabel[status]}</Badge>;
}
