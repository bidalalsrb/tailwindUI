import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Select,
  TextField,
} from '@/components/ui';

export function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [jobRole, setJobRole] = useState('designer');

  return (
    <div className="space-y-8">
      <Alert
        tone="info"
        title="보안 강화를 위한 안내"
        description="토스 스타일의 UI 템플릿은 이메일 인증과 2단계 보호 흐름을 손쉽게 확장할 수 있습니다."
      />
      <div className="flex flex-col gap-4 text-center">
        <Badge tone="brand" className="mx-auto">
          인증 & 온보딩 플로우
        </Badge>
        <h2 className="text-3xl font-semibold text-slate-900">
          가입부터 로그인까지, 하나의 화면에서
        </h2>
        <p className="text-sm text-slate-500">
          Toss UI 패턴을 참고해 사용자 정보를 안전하게 수집하고, 눈에 익은 화면 경험을 제공합니다.
        </p>
        <div className="mx-auto flex items-center gap-2 rounded-full bg-slate-100 p-1 text-sm font-medium text-slate-500">
          <button
            type="button"
            onClick={() => setIsSignup(false)}
            className={`rounded-full px-4 py-2 transition ${!isSignup ? 'bg-white text-brand-600 shadow-sm' : ''}`}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => setIsSignup(true)}
            className={`rounded-full px-4 py-2 transition ${isSignup ? 'bg-white text-brand-600 shadow-sm' : ''}`}
          >
            회원가입
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card
          title={isSignup ? '새 계정 만들기' : '반가워요'}
          description={
            isSignup
              ? '기본 정보 입력만으로 빠르게 시작할 수 있습니다.'
              : '등록된 이메일과 비밀번호로 로그인하세요.'
          }
          footer={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" block>
                {isSignup ? '회원가입 완료' : '로그인'}
              </Button>
              <Button
                variant="ghost"
                block
                onClick={() => setIsSignup((prev) => !prev)}
              >
                {isSignup ? '이미 계정이 있어요' : '신규 회원가입'}
              </Button>
            </div>
          }
        >
          <form className="space-y-5">
            {isSignup ? (
              <>
                <TextField
                  label="이름"
                  placeholder="홍길동"
                  autoComplete="name"
                />
                <TextField
                  label="회사 이메일"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  description="회사 이메일을 사용하면 검수를 더 빠르게 진행할 수 있습니다."
                />
                <Select
                  label="업무 영역"
                  options={[
                    { label: '프로덕트 디자이너', value: 'designer' },
                    { label: '프론트엔드 개발자', value: 'frontend' },
                    { label: 'PM/기획자', value: 'pm' },
                    { label: '마케터', value: 'marketer' },
                  ]}
                  value={jobRole}
                  onChange={(event) => setJobRole(event.currentTarget.value)}
                />
              </>
            ) : (
              <>
                <TextField
                  label="이메일"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                />
                <TextField
                  label="비밀번호"
                  type="password"
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                  autoComplete="current-password"
                />
              </>
            )}
            <TextField
              label={isSignup ? '임시 비밀번호' : '비밀번호'}
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
            />
            {isSignup ? (
              <Checkbox
                label="서비스 업데이트 메일 수신"
                description="새로운 컴포넌트와 템플릿 소식을 받아볼 수 있어요."
                defaultChecked
              />
            ) : (
              <Checkbox
                label="로그인 상태 유지"
                description="개인 기기에서만 사용해주세요."
              />
            )}
          </form>
        </Card>
        <Card
          title="가입 플로우 메모"
          description="실제 서비스에 연결할 때 참고할 수 있는 정보입니다."
        >
          <ul className="space-y-3 text-sm text-slate-600">
            <li>
              <strong className="text-slate-800">보안</strong> · 비밀번호 입력란에 실시간 조건 검증 메시지를 넣어주세요.
            </li>
            <li>
              <strong className="text-slate-800">전환율</strong> · SNS 간편 로그인을 추가하면 전환율이 최대 15%p 개선됩니다.
            </li>
            <li>
              <strong className="text-slate-800">온보딩</strong> · 가입 완료 후 프로필 설정과 팀 합류 플로우를 유도하세요.
            </li>
          </ul>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            <p className="font-medium text-slate-700">토스 UX 팁</p>
            <p>주요 버튼은 사용자 시선을 끌 수 있도록 여백과 그림자를 활용해 강조합니다.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
